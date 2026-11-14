---
title: "core::pin (part 1 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/pin.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::pin

Types that pin data to a location in memory.

It is sometimes useful to be able to rely upon a certain value not being able to *move*,
in the sense that its address in memory cannot change. This is useful especially when there
are one or more *pointers* pointing at that value. The ability to rely on this
guarantee that the value a [pointer] is pointing at (its **pointee**) will

1. Not be *moved* out of its memory location
2. More generally, remain *valid* at that same memory location

is called "pinning." We would say that a value which satisfies these guarantees has been
"pinned," in that it has been permanently (until the end of its lifespan) attached to its
location in memory, as though pinned to a pinboard. Pinning a value is an incredibly useful
building block for `unsafe` code to be able to reason about whether a raw pointer to the
pinned value is still valid. As we'll see later, once a value is pinned,
it is necessarily valid at its memory location until the end of its lifespan. This concept
of "pinning" is necessary to implement safe interfaces on top of things like self-referential
types and intrusive data structures which cannot currently be modeled in fully safe Rust using
only borrow-checked references.

"Pinning" allows us to put a *value* which exists at some location in memory into a state where
safe code cannot *move* that value to a different location in memory or otherwise invalidate it
at its current location (unless it implements `Unpin`, which we will
talk about below). Anything that wants to interact with the pinned value in a way
that has the potential to violate these guarantees must promise that it will not actually
violate them, using the `unsafe` keyword to mark that such a promise is upheld by the user
and not the compiler. In this way, we can allow other `unsafe` code to rely on any pointers
that point to the pinned value to be valid to dereference while it is pinned.

Note that as long as you don't use `unsafe`, it's impossible to create or misuse a pinned
value in a way that is unsound. See the documentation of `Pin<Ptr>` for more
information on the practicalities of how to pin a value and how to use that pinned value from a
user's perspective without using `unsafe`.

The rest of this documentation is intended to be the source of truth for users of `Pin<Ptr>`
that are implementing the `unsafe` pieces of an interface that relies on pinning for validity;
users of `Pin<Ptr>` in safe code do not need to read it in detail.

There are several sections to this documentation:

* What is "*moving*"?
* What is "pinning"?
* Address sensitivity, AKA "when do we need pinning?"
* Examples of types with address-sensitive states
  * Self-referential struct
  * Intrusive, doubly-linked list
* Subtle details and the `Drop` guarantee

#### What is "*moving*"?

When we say a value is *moved*, we mean that the compiler copies, byte-for-byte, the
value from one location to another. In a purely mechanical sense, this is identical to
`Copy`ing a value from one place in memory to another. In Rust, "move" carries with it the
semantics of ownership transfer from one variable to another, which is the key <example-value>
between a `Copy` and a move. For the purposes of this module's documentation, however, when
we write *move* in italics, we mean *specifically* that the value has *moved* in the mechanical
sense of being located at a new place in memory.

All values in Rust are trivially *moveable*. This means that the address at which a value is
located is not necessarily stable in between borrows. The compiler is allowed to *move* a value
to a new address without running any code to notify that value that its address
has changed. Although the compiler will not insert memory *moves* where no semantic move has
occurred, there are many places where a value *may* be moved. For example, when doing
assignment or passing a value into a function.

```rust
#[derive(Default)]
struct AddrTracker(Option<usize>);

impl AddrTracker {
    // If we haven't checked the addr of self yet, store the current
    // address. If we have, confirm that the current address is the same
    // as it was last time, or else panic.
    fn check_for_move(&mut self) {
        let current_addr = self as *mut Self as usize;
        match self.0 {
            None => self.0 = Some(current_addr),
            Some(prev_addr) => assert_eq!(prev_addr, current_addr),
        }
    }
}

// Create a tracker and store the initial address
let mut tracker = AddrTracker::default();
tracker.check_for_move();

// Here we shadow the variable. This carries a semantic move, and may therefore also
// come with a mechanical memory *move*
let mut tracker = tracker;

// May panic!
// tracker.check_for_move();
```

In this sense, Rust does not guarantee that `check_for_move()` will never panic, because the
compiler is permitted to *move* `tracker` in many situations.

Common smart-pointer types such as `Box<T>` and `&mut T` also allow *moving* the underlying
*value* they point at: you can move out of a `Box<T>`, or you can use `mem::replace` to
move a `T` out of a `&mut T`. Therefore, putting a value (such as `tracker` above) behind a
pointer isn't enough on its own to ensure that its address does not change.

#### What is "pinning"?

We say that a value has been *pinned* when it has been put into a state where it is guaranteed
to remain *located at the same place in memory* from the time it is pinned until its
`drop` is called.

#### Address-sensitive values, AKA "when we need pinning"

Most values in Rust are entirely okay with being *moved* around at-will.
Types for which it is *always* the case that *any* value of that type can be
*moved* at-will should implement `Unpin`, which we will discuss more below.

`Pin` is specifically targeted at allowing the implementation of *safe interfaces* around
types which have some state during which they become "address-sensitive." A value in such an
"address-sensitive" state is *not* okay with being *moved* around at-will. Such a value must
stay *un-moved* and valid during the address-sensitive portion of its lifespan because some
interface is relying on those invariants to be true in order for its implementation to be sound.

As a motivating example of a type which may become address-sensitive, consider a type which
contains a pointer to another piece of its own data, *i.e.* a "self-referential" type. In order
for such a type to be implemented soundly, the pointer which points into `self`'s data must be
proven valid whenever it is accessed. But if that value is *moved*, the pointer will still
point to the old address where the value was located and not into the new location of `self`,
thus becoming invalid. A key <example-value> of such self-referential types are the state machines
generated by the compiler to implement `Future` for `async fn`s.

Such types that have an *address-sensitive* state usually follow a lifecycle
that looks something like so:

1. A value is created which can be freely moved around.
    * e.g. calling an async function which returns a state machine implementing `Future`
2. An operation causes the value to depend on its own address not changing
    * e.g. calling `poll` for the first time on the produced `Future`
3. Further pieces of the safe interface of the type use internal `unsafe` operations which
   assume that the address of the value is stable
    * e.g. subsequent calls to `poll`
4. Before the value is invalidated (e.g. deallocated), it is *dropped*, giving it a chance to
   notify anything with pointers to itself that those pointers will be invalidated
    * e.g. `drop`ping the `Future` [^pin-drop-future]

There are two possible ways to ensure the invariants required for 2. and 3. above (which
apply to any address-sensitive type, not just self-referential types) do not get broken.

1. Have the value detect when it is moved and update all the pointers that point to itself.
2. Guarantee that the address of the value does not change (and that memory is not re-used
   for anything else) during the time that the pointers to it are expected to be valid to
   dereference.

Since, as we discussed, Rust can move values without notifying them that they have moved, the
first option is ruled out.

In order to implement the second option, we must in some way enforce its key <example-value>,
*i.e.* prevent the value from being *moved* or otherwise invalidated (you may notice this
sounds an awful lot like the definition of *pinning* a value). There are a few ways one might
be able to enforce this invariant in Rust:

1. Offer a wholly `unsafe` API to interact with the object, thus requiring every caller to
   uphold the invariant themselves
2. Store the value that must not be moved behind a carefully managed pointer internal to
   the object
3. Leverage the type system to encode and enforce this invariant by presenting a restricted
   API surface to interact with *any* object that requires these invariants

The first option is quite obviously undesirable, as the `unsafe`ty of the interface will
become viral throughout all code that interacts with the object.

The second option is a viable solution to the problem for some use cases, in particular
for self-referential types. Under this model, any type that has an address sensitive state
would ultimately store its data in something like a `Box<T>`, carefully manage internal
access to that data to ensure no *moves* or other invalidation occurs, and finally
provide a safe interface on top.

There are a couple of linked disadvantages to using this model. The most significant is that
each individual object must assume it is *on its own* to ensure
that its data does not become *moved* or otherwise invalidated. Since there is no shared
contract between values of different types, an object cannot assume that others interacting
with it will properly respect the invariants around interacting with its data and must
therefore protect it from everyone. Because of this, *composition* of address-sensitive types
requires at least a level of pointer indirection each time a new object is added to the mix
(and, practically, a heap allocation).

Although there were other reasons as well, this issue of expensive composition is the key thing
that drove Rust towards adopting a different model. It is particularly a problem
when one considers, for example, the implications of composing together the `Future`s which
will eventually make up an asynchronous task (including address-sensitive `async fn` state
machines). It is plausible that there could be many layers of `Future`s composed together,
including multiple layers of `async fn`s handling different parts of a task. It was deemed
unacceptable to force indirection and allocation for each layer of composition in this case.

`Pin<Ptr>` is an implementation of the third option. It allows us to solve the issues
discussed with the second option by building a *shared contractual language* around the
guarantees of "pinning" data.

they are being dropped, however data structures like stack-based intrusive linked lists do.

#### Using `Pin<Ptr>` to pin values

In order to pin a value, we wrap a *pointer to that value* (of some type `Ptr`) in a
`Pin<Ptr>`. `Pin<Ptr>` can wrap any pointer type, forming a promise that the **pointee**
will not be *moved* or otherwise invalidated.

We call such a `Pin`-wrapped pointer a **pinning pointer,** (or pinning reference, or pinning
`Box`, etc.) because its existence is the thing that is conceptually pinning the underlying
pointee in place: it is the metaphorical "pin" securing the data in place on the pinboard
(in memory).

Notice that the thing wrapped by `Pin` is not the value which we want to pin itself, but
rather a pointer to that value! A `Pin<Ptr>` does not pin the `Ptr`; instead, it pins the
pointer's ***pointee** value*.

#### Pinning as a library contract

Pinning does not require nor make use of any compiler "magic"[^noalias], only a specific
contract between the `unsafe` parts of a library API and its users.

It is important to stress this point as a user of the `unsafe` parts of the `Pin` API.
Practically, this means that performing the mechanics of "pinning" a value by creating a
`Pin<Ptr>` to it *does not* actually change the way the compiler behaves towards the
inner value! It is possible to use incorrect `unsafe` code to create a `Pin<Ptr>` to a
value which does not actually satisfy the invariants that a pinned value must satisfy, and in
this way lead to undefined behavior even in (from that point) fully safe code. Similarly, using
`unsafe`, one may get access to a bare `&mut T` from a `Pin<Ptr>` and
use that to invalidly *move* the pinned value out. It is the job of the user of the
`unsafe` parts of the `Pin` API to ensure these invariants are not violated.

This differs from e.g. `UnsafeCell` which changes the semantics of a program's compiled
output. A `Pin<Ptr>` is a handle to a value which we have promised we will not move out of,
but Rust still considers all values themselves to be fundamentally moveable through, *e.g.*
assignment or `mem::replace`.

semantics of `Pin<&mut T>` should be, but this is true as of today.

#### How `Pin` prevents misuse in safe code

In order to accomplish the goal of pinning the pointee value, `Pin<Ptr>` restricts access to
the wrapped `Ptr` type in safe code. Specifically, `Pin` disallows the ability to access
the wrapped pointer in ways that would allow the user to *move* the underlying pointee value or
otherwise re-use that memory for something else without using `unsafe`. For example, a
`Pin<&mut T>` makes it impossible to obtain the wrapped `[&mut] T` safely because
through that `[&mut] T` it would be possible to *move* the underlying value out of
the pointer with `mem::replace`, etc.

As discussed above, this promise must be upheld manually by `unsafe` code which interacts
with the `Pin<Ptr>` so that other `unsafe` code can rely on the pointee value being
*un-moved* and valid. Interfaces that operate on values which are in an address-sensitive state
accept an argument like <code>[Pin]<[&mut] T></code> or <code>[Pin]<[Box]\<T>></code> to
indicate this contract to the caller.

As discussed below, opting in to using pinning guarantees in the interface
of an address-sensitive type has consequences for the implementation of some safe traits on
that type as well.

#### Interaction between `Deref` and `Pin<Ptr>`

Since `Pin<Ptr>` can wrap any pointer type, it uses `Deref` and `DerefMut` in
order to identify the type of the pinned pointee data and provide (restricted) access to it.

A `Pin<Ptr>` where `Ptr: Deref`[Deref] is a "`Ptr`-style pinning pointer" to a pinned
`Ptr::Target`[Target] – so, a <code>[Pin]<[Box]\<T>></code> is an owned, pinning pointer to a
pinned `T`, and a <code>[Pin]<[Rc]\<T>></code> is a reference-counted, pinning pointer to a
pinned `T`.
