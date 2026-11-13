---
title: "ch17-05-traits-for-async (part 3 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch17-05-traits-for-async.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch17-05-traits-for-async (part 3 of 4)

### The `Pin` Type and the `Unpin` Trait

Back in Listing 17-13, we used the `trpl::join!` macro to await three
futures. However, it’s common to have a collection such as a vector containing
some number of futures that won’t be known until runtime. Let’s change Listing
17-13 to the code in Listing 17-23 that puts the three futures into a vector
and calls the `trpl::join_all` function instead, which won’t compile yet.

**Listing 17-23: Awaiting futures in a collection** (src/main.rs)

```rust
let tx_fut = async move {
    // --snip--
```

We put each future within a `Box` to make them into _trait objects_, just as
we did in the “Returning Errors from `run`” section in Chapter 12. (We’ll cover
trait objects in detail in Chapter 18.) Using trait objects lets us treat each
of the anonymous futures produced by these types as the same type, because all
of them implement the `Future` trait.

This might be surprising. After all, none of the async blocks returns anything,
so each one produces a `Future<Output = ()>`. Remember that `Future` is a
trait, though, and that the compiler creates a unique enum for each async
block, even when they have identical output types. Just as you can’t put two
different handwritten structs in a `Vec`, you can’t mix compiler-generated
enums.

Then we pass the collection of futures to the `trpl::join_all` function and
await the result. However, this doesn’t compile; here’s the relevant part of
the error messages.

```text
error[E0277]: `dyn Future<Output = ()>` cannot be unpinned
  --> src/main.rs:48:33
   |
48 |         trpl::join_all(futures).await;
   |                                 ^^^^^ the trait `Unpin` is not implemented for `dyn Future<Output = ()>`
   |
   = note: consider using the `pin!` macro
           consider using `Box::pin` if you need to access the pinned value outside of the current scope
   = note: required for `Box<dyn Future<Output = ()>>` to implement `Future`
note: required by a bound in `futures_util::future::join_all::JoinAll`
  --> file:///home/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/futures-util-0.3.30/src/future/join_all.rs:29:8
   |
27 | pub struct JoinAll<F>
   |            ------- required by a bound in this struct
28 | where
29 |     F: Future,
   |        ^^^^^^ required by this bound in `JoinAll`
```

The note in this error message tells us that we should use the `pin!` macro to
_pin_ the values, which means putting them inside the `Pin` type that
guarantees the values won’t be moved in memory. The error message says pinning
is required because `dyn Future<Output = ()>` needs to implement the `Unpin`
trait and it currently does not.

The `trpl::join_all` function returns a struct called `JoinAll`. That struct is
generic over a type `F`, which is constrained to implement the `Future` trait.
Directly awaiting a future with `await` pins the future implicitly. That’s why
we don’t need to use `pin!` everywhere we want to await futures.

However, we’re not directly awaiting a future here. Instead, we construct a new
future, JoinAll, by passing a collection of futures to the `join_all` function.
The signature for `join_all` requires that the types of the items in the
collection all implement the `Future` trait, and `Box<T>` implements `Future`
only if the `T` it wraps is a future that implements the `Unpin` trait.

That’s a lot to absorb! To really understand it, let’s dive a little further
into how the `Future` trait actually works, in particular around pinning. Look
again at the definition of the `Future` trait:

```rust
use std::pin::Pin;
use std::task::{Context, Poll};

pub trait Future {
    type Output;

    // Required method
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}
```

The `cx` parameter and its `Context` type are the key to how a runtime actually
knows when to check any given future while still being lazy. Again, the details
of how that works are beyond the scope of this chapter, and you generally only
need to think about this when writing a custom `Future` implementation. We’ll
focus instead on the type for `self`, as this is the first time we’ve seen a
method where `self` has a type annotation. A type annotation for `self` works
like type annotations for other function parameters but with two key
differences:

- It tells Rust what type `self` must be for the method to be called.
- It can’t be just any type. It’s restricted to the type on which the method is
  implemented, a reference or smart pointer to that type, or a `Pin` wrapping a
  reference to that type.

We’ll see more on this syntax in Chapter 18. For now,
it’s enough to know that if we want to poll a future to check whether it is
`Pending` or `Ready(Output)`, we need a `Pin`-wrapped mutable reference to the
type.

`Pin` is a wrapper for pointer-like types such as `&`, `&mut`, `Box`, and `Rc`.
(Technically, `Pin` works with types that implement the `Deref` or `DerefMut`
traits, but this is effectively equivalent to working only with references and
smart pointers.) `Pin` is not a pointer itself and doesn’t have any behavior of
its own like `Rc` and `Arc` do with reference counting; it’s purely a tool the
compiler can use to enforce constraints on pointer usage.

Recalling that `await` is implemented in terms of calls to `poll` starts to
explain the error message we saw earlier, but that was in terms of `Unpin`, not
`Pin`. So how exactly does `Pin` relate to `Unpin`, and why does `Future` need
`self` to be in a `Pin` type to call `poll`?

Remember from earlier in this chapter that a series of await points in a future
get compiled into a state machine, and the compiler makes sure that state
machine follows all of Rust’s normal rules around safety, including borrowing
and ownership. To make that work, Rust looks at what data is needed between one
await point and either the next await point or the end of the async block. It
then creates a corresponding variant in the compiled state machine. Each
variant gets the access it needs to the data that will be used in that section
of the source code, whether by taking ownership of that data or by getting a
mutable or immutable reference to it.

So far, so good: if we get anything wrong about the ownership or references in
a given async block, the borrow checker will tell us. When we want to move
around the future that corresponds to that block—like moving it into a `Vec` to
pass to `join_all`—things get trickier.

When we move a future—whether by pushing it into a data structure to use as an
iterator with `join_all` or by returning it from a function—that actually means
moving the state machine Rust creates for us. And unlike most other types in
Rust, the futures Rust creates for async blocks can end up with references to
themselves in the fields of any given variant, as shown in the simplified illustration in Figure 17-4.

Figure 17-4: A self-referential data type

By default, though, any object that has a reference to itself is unsafe to move,
because references always point to the actual memory address of whatever they
refer to (see Figure 17-5). If you move the data structure itself, those
internal references will be left pointing to the old location. However, that
memory location is now invalid. For one thing, its value will not be updated
when you make changes to the data structure. For another—more important—thing,
the computer is now free to reuse that memory for other purposes! You could end
up reading completely unrelated data later.

Figure 17-5: The unsafe result of moving a self-referential data type

Theoretically, the Rust compiler could try to update every reference to an
object whenever it gets moved, but that could add a lot of performance overhead,
especially if a whole web of references needs updating. If we could instead make
sure the data structure in question _doesn’t move in memory_, we wouldn’t have
to update any references. This is exactly what Rust’s borrow checker is for:
in safe code, it prevents you from moving any item with an active reference to
it.

`Pin` builds on that to give us the exact guarantee we need. When we _pin_ a
value by wrapping a pointer to that value in `Pin`, it can no longer move. Thus,
if you have `Pin<Box<SomeType>>`, you actually pin the `SomeType` value, _not_
the `Box` pointer. Figure 17-6 illustrates this process.

Figure 17-6: Pinning a `Box` that points to a self-referential future type

In fact, the `Box` pointer can still move around freely. Remember: we care about
making sure the data ultimately being referenced stays in place. If a pointer
moves around, _but the data it points to_ is in the same place, as in Figure
17-7, there’s no potential problem. (As an independent exercise, look at the docs
for the types as well as the `std::pin` module and try to work out how you’d do
this with a `Pin` wrapping a `Box`.) The key is that the self-referential type
itself cannot move, because it is still pinned.

Figure 17-7: Moving a `Box` which points to a self-referential future type

However, most types are perfectly safe to move around, even if they happen to be
behind a `Pin` pointer. We only need to think about pinning when items have
internal references. Primitive values such as numbers and Booleans are safe
because they obviously don’t have any internal references.
Neither do most types you normally work with in Rust. You can move around
a `Vec`, for example, without worrying. Given what we have seen so far, if
you have a `Pin<Vec<String>>`, you’d have to do everything via the safe but
restrictive APIs provided by `Pin`, even though a `Vec<String>` is always safe
to move if there are no other references to it. We need a way to tell the
compiler that it’s fine to move items around in cases like this—and that’s
where `Unpin` comes into play.

`Unpin` is a marker trait, similar to the `Send` and `Sync` traits we saw in
Chapter 16, and thus has no functionality of its own. Marker traits exist only
to tell the compiler it’s safe to use the type implementing a given trait in a
particular context. `Unpin` informs the compiler that a given type does _not_
need to uphold any guarantees about whether the value in question can be safely
moved.

Just as with `Send` and `Sync`, the compiler implements `Unpin` automatically
for all types where it can prove it is safe. A special case, again similar to
`Send` and `Sync`, is where `Unpin` is _not_ implemented for a type. The
notation for this is <code>impl !Unpin for SomeType</code>, where
<code>SomeType</code> is the name of a type that _does_ need to uphold
those guarantees to be safe whenever a pointer to that type is used in a `Pin`.

In other words, there are two things to keep in mind about the relationship
between `Pin` and `Unpin`. First, `Unpin` is the “normal” case, and `!Unpin` is
the special case. Second, whether a type implements `Unpin` or `!Unpin` _only_
matters when you’re using a pinned pointer to that type like <code>Pin<&mut
SomeType></code>.

To make that concrete, think about a `String`: it has a length and the Unicode
characters that make it up. We can wrap a `String` in `Pin`, as seen in Figure
17-8. However, `String` automatically implements `Unpin`, as do most other types
in Rust.

Figure 17-8: Pinning a `String`; the dotted line indicates that the `String` implements the `Unpin` trait and thus is not pinned

As a result, we can do things that would be illegal if `String` implemented
`!Unpin` instead, such as replacing one string with another at the exact same
location in memory as in Figure 17-9. This doesn’t violate the `Pin` contract,
because `String` has no internal references that make it unsafe to move around.
That is precisely why it implements `Unpin` rather than `!Unpin`.

Figure 17-9: Replacing the `String` with an entirely different `String` in memory

Now we know enough to understand the errors reported for that `join_all` call
from back in Listing 17-23. We originally tried to move the futures produced by
async blocks into a `Vec<Box<dyn Future<Output = ()>>>`, but as we’ve seen,
those futures may have internal references, so they don’t automatically
implement `Unpin`. Once we pin them, we can pass the resulting `Pin` type into
the `Vec`, confident that the underlying data in the futures will _not_ be
moved. Listing 17-24 shows how to fix the code by calling the `pin!` macro
where each of the three futures are defined and adjusting the trait object type.

**Listing 17-24: Pinning the futures to enable moving them into the vector**

```rust
use std::pin::{Pin, pin};

// --snip--
```

This example now compiles and runs, and we could add or remove futures from the
vector at runtime and join them all.

`Pin` and `Unpin` are mostly important for building lower-level libraries, or
when you’re building a runtime itself, rather than for day-to-day Rust code.
When you see these traits in error messages, though, now you’ll have a better
idea of how to fix your code!

> Note: This combination of `Pin` and `Unpin` makes it possible to safely
> implement a whole class of complex types in Rust that would otherwise prove
> challenging because they’re self-referential. Types that require `Pin` show up
> most commonly in async Rust today, but every once in a while, you might see
> them in other contexts, too.
>
> The specifics of how `Pin` and `Unpin` work, and the rules they’re required
> to uphold, are covered extensively in the API documentation for `std::pin`, so
> if you’re interested in learning more, that’s a great place to start.
>
> If you want to understand how things work under the hood in even more detail,
> see Chapters 2 and
> 4 of
> _Asynchronous Programming in Rust_.
