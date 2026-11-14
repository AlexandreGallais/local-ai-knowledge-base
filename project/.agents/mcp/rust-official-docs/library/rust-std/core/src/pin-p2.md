---
title: "core::pin (part 2 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/pin.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::pin (part 2 of 5)

`Pin<Ptr>` also uses the `<Ptr as Deref>::Target`[Target] type information to modify the
interface it is allowed to provide for interacting with that data (for example, when a
pinning pointer points at pinned data which implements `Unpin`, as
discussed below).

`Pin<Ptr>` requires that implementations of `Deref` and `DerefMut` on `Ptr` return a
pointer to the pinned data directly and do not *move* out of the `self` parameter during their
implementation of `DerefMut::deref_mut`. It is unsound for `unsafe` code to wrap pointer
types with such "malicious" implementations of `Deref`; see `Pin<Ptr>::new_unchecked` for
details.

#### Fixing `AddrTracker`

The guarantee of a stable address is necessary to make our `AddrTracker` example work. When
`check_for_move` sees a <code>[Pin]<&mut AddrTracker></code>, it can safely assume that value
will exist at that same address until said value goes out of scope, and thus multiple calls
to it *cannot* panic.

```rust
use std::marker::PhantomPinned;
use std::pin::Pin;
use std::pin::pin;

#[derive(Default)]
struct AddrTracker {
    prev_addr: Option<usize>,
    // remove auto-implemented `Unpin` bound to mark this type as having some
    // address-sensitive state. This is essential for our expected pinning
    // guarantees to work, and is discussed more below.
    _pin: PhantomPinned,
}

impl AddrTracker {
    fn check_for_move(self: Pin<&mut Self>) {
        let current_addr = &*self as *const Self as usize;
        match self.prev_addr {
            None => {
                // SAFETY: we do not move out of self
                let self_data_mut = unsafe { self.get_unchecked_mut() };
                self_data_mut.prev_addr = Some(current_addr);
            },
            Some(prev_addr) => assert_eq!(prev_addr, current_addr),
        }
    }
}

// 1. Create the value, not yet in an address-sensitive state
let tracker = AddrTracker::default();

// 2. Pin the value by putting it behind a pinning pointer, thus putting
// it into an address-sensitive state
let mut ptr_to_pinned_tracker: Pin<&mut AddrTracker> = pin!(tracker);
ptr_to_pinned_tracker.as_mut().check_for_move();

// Trying to access `tracker` or pass `ptr_to_pinned_tracker` to anything that requires
// mutable access to a non-pinned version of it will no longer compile

// 3. We can now assume that the tracker value will never be moved, thus
// this will never panic!
ptr_to_pinned_tracker.as_mut().check_for_move();
```

Note that this invariant is enforced by simply making it impossible to call code that would
perform a move on the pinned value. This is the case since the only way to access that pinned
value is through the pinning <code>[Pin]<[&mut] T></code>, which in turn restricts our access.

#### `Unpin`

The vast majority of Rust types have no address-sensitive states. These types
implement the `Unpin` auto-trait, which cancels the restrictive effects of
`Pin` when the *pointee* type `T` is `Unpin`. When `T: Unpin`[Unpin],
<code>[Pin]<[Box]\<T>></code> functions identically to a non-pinning `Box<T>`; similarly,
<code>[Pin]<[&mut] T></code> would impose no additional restrictions above a regular
`&mut T`.

The idea of this trait is to alleviate the reduced ergonomics of APIs that require the use
of `Pin` for soundness for some types, but which also want to be used by other types that
don't care about pinning. The prime example of such an API is `Future::poll`. There are many
`Future` types that don't care about pinning. These futures can implement `Unpin` and
therefore get around the pinning related restrictions in the API, while still allowing the
subset of `Future`s which *do* require pinning to be implemented soundly.

Note that the interaction between a `Pin<Ptr>` and `Unpin` is through the type of the
**pointee** value, `<Ptr as Deref>::Target`[Target]. Whether the `Ptr` type itself
implements `Unpin` does not affect the behavior of a `Pin<Ptr>`. For example, whether or not
`Box` is `Unpin` has no effect on the behavior of <code>[Pin]<[Box]\<T>></code>, because
`T` is the type of the pointee value, not `Box`. So, whether `T` implements `Unpin` is
the thing that will affect the behavior of the <code>[Pin]<[Box]\<T>></code>.

Builtin types that are `Unpin` include all of the primitive types, like `bool`, `i32`,
and `f32`, references (`[&]T` and `[&mut] T`), etc., as well as many
core and standard library types like `Box<T>`, `String`, and more.
These types are marked `Unpin` because they do not have an address-sensitive state like the
ones we discussed above. If they did have such a state, those parts of their interface would be
unsound without being expressed through pinning, and they would then need to not
implement `Unpin`.

The compiler is free to take the conservative stance of marking types as `Unpin` so long as
all of the types that compose its fields are also `Unpin`. This is because if a type
implements `Unpin`, then it is unsound for that type's implementation to rely on
pinning-related guarantees for soundness, *even* when viewed through a "pinning" pointer! It is
the responsibility of the implementor of a type that relies upon pinning for soundness to
ensure that type is *not* marked as `Unpin` by adding `PhantomPinned` field. This is
exactly what we did with our `AddrTracker` example above. Without doing this, you *must not*
rely on pinning-related guarantees to apply to your type!

If you really need to pin a value of a foreign or built-in type that implements `Unpin`,
you'll need to create your own wrapper type around the `Unpin` type you want to pin and then
opt-out of `Unpin` using `PhantomPinned`.

Exposing access to the inner field which you want to remain pinned must then be carefully
considered as well! Remember, exposing a method that gives access to a
<code>[Pin]<[&mut] InnerT></code> where `InnerT: [Unpin]` would allow safe code to
trivially move the inner value out of that pinning pointer, which is precisely what you're
seeking to prevent! Exposing a field of a pinned value through a pinning pointer is called
"projecting" a pin, and the more general case of deciding in which cases a pin should be able
to be projected or not is called "structural pinning." We will go into more detail about this
below.

#### Examples of address-sensitive types

#### A self-referential struct

Self-referential structs are the simplest kind of address-sensitive type.

It is often useful for a struct to hold a pointer back into itself, which
allows the program to efficiently track subsections of the struct.
Below, the `slice` field is a pointer into the `data` field, which
we could imagine being used to track a sliding window of `data` in parser
code.

As mentioned before, this pattern is also used extensively by compiler-generated
`Future`s.

```rust
use std::pin::Pin;
use std::marker::PhantomPinned;
use std::ptr::NonNull;

/// This is a self-referential struct because `self.slice` points into `self.data`.
struct Unmovable {
    /// Backing buffer.
    data: [u8; 64],
    /// Points at `self.data` which we know is itself non-null. Raw pointer because we can't do
    /// this with a normal reference.
    slice: NonNull<[u8]>,
    /// Suppress `Unpin` so that this cannot be moved out of a `Pin` once constructed.
    _pin: PhantomPinned,
}

impl Unmovable {
    /// Creates a new `Unmovable`.
    ///
    /// To ensure the data doesn't move we place it on the heap behind a pinning Box.
    /// Note that the data is pinned, but the `Pin<Box<Self>>` which is pinning it can
    /// itself still be moved. This is important because it means we can return the pinning
    /// pointer from the function, which is itself a kind of move!
    fn new() -> Pin<Box<Self>> {
        let res = Unmovable {
            data: [0; 64],
            // We only create the pointer once the data is in place
            // otherwise it will have already moved before we even started.
            slice: NonNull::from(&[]),
            _pin: PhantomPinned,
        };
        // First we put the data in a box, which will be its final resting place
        let mut boxed = Box::new(res);

        // Then we make the slice field point to the proper part of that boxed data.
        // From now on we need to make sure we don't move the boxed data.
        boxed.slice = NonNull::from(&boxed.data);

        // To do that, we pin the data in place by pointing to it with a pinning
        // (`Pin`-wrapped) pointer.
        //
        // `Box::into_pin` makes existing `Box` pin the data in-place without moving it,
        // so we can safely do this now *after* inserting the slice pointer above, but we have
        // to take care that we haven't performed any other semantic moves of `res` in between.
        let pin = Box::into_pin(boxed);

        // Now we can return the pinned (through a pinning Box) data
        pin
    }
}

let unmovable: Pin<Box<Unmovable>> = Unmovable::new();

// The inner pointee `Unmovable` struct will now never be allowed to move.
// Meanwhile, we are free to move the pointer around.
let mut still_unmoved = unmovable;
assert_eq!(still_unmoved.slice, NonNull::from(&still_unmoved.data));

// We cannot mutably dereference a `Pin<Ptr>` unless the pointee is `Unpin` or we use unsafe.
// Since our type doesn't implement `Unpin`, this will fail to compile.
// let mut new_unmoved = Unmovable::new();
// std::mem::swap(&mut *still_unmoved, &mut *new_unmoved);
```

#### An intrusive, doubly-linked list

In an intrusive doubly-linked list, the collection itself does not own the memory in which
each of its elements is stored. Instead, each client is free to allocate space for elements it
adds to the list in whichever manner it likes, including on the stack! Elements can be stored
in a stack frame shorter-lived than the collection, provided they are removed from the list
before that frame goes out of scope.

To make such an intrusive data structure work, every element stores pointers to its predecessor
and successor within its own data, rather than having the list structure itself managing those
pointers. It is in this sense that the structure is "intrusive": the details of how an
element is stored within the larger structure "intrudes" on the implementation of the element
type itself!

The full implementation details of such a data structure are outside the scope of this
documentation, but we will discuss how `Pin` can help to do so.

Using such an intrusive pattern, elements may only be added when they are pinned. If we think
about the consequences of adding non-pinned values to such a list, this becomes clear:

*Moving* or otherwise invalidating an element's data would invalidate the pointers back to it
which are stored in the elements ahead and behind it. Thus, in order to soundly dereference
the pointers stored to the next and previous elements, we must satisfy the guarantee that
nothing has invalidated those pointers (which point to data that we do not own).

Moreover, the `Drop`[Drop] implementation of each element must in some way notify its
predecessor and successor elements that it should be removed from the list before it is fully
destroyed, otherwise the pointers back to it would again become invalidated.

Crucially, this means we have to be able to rely on `drop` always being called before an
element is invalidated. If an element could be deallocated or otherwise invalidated without
calling `drop`, the pointers to it stored in its neighboring elements would
become invalid, which would break the data structure.

Therefore, pinning data also comes with the "`Drop` guarantee".

#### Subtle details and the `Drop` guarantee

The purpose of pinning is not *just* to prevent a value from being *moved*, but more
generally to be able to rely on the pinned value *remaining valid **at a specific place*** in
memory.

To do so, pinning a value adds an *additional* invariant that must be upheld in order for use
of the pinned data to be valid, on top of the ones that must be upheld for a non-pinned value
of the same type to be valid:

From the moment a value is pinned by constructing a `Pin`ning pointer to it, that value
must *remain, **valid***, at that same address in memory, *until its `drop` handler is
called.*

There is some subtlety to this which we have not yet talked about in detail. The invariant
described above means that, yes,

1. The value must not be moved out of its location in memory

but it also implies that,

2. The memory location that stores the value must not get invalidated or otherwise repurposed
   during the lifespan of the pinned value until its `drop` returns or panics

This point is subtle but required for intrusive data structures to be implemented soundly.

#### `Drop` guarantee

There needs to be a way for a pinned value to notify any code that is relying on its pinned
status that it is about to be destroyed. In this way, the dependent code can remove the
pinned value's address from its data structures or otherwise change its behavior with the
knowledge that it can no longer rely on that value existing at the location it was pinned to.

Thus, in any situation where we may want to overwrite a pinned value, that value's `drop` must
be called beforehand (unless the pinned value implements `Unpin`, in which case we can ignore
all of `Pin`'s guarantees, as usual).

The most common storage-reuse situations occur when a value on the stack is destroyed as part
of a function return and when heap storage is freed. In both cases, `drop` gets run for us
by Rust when using standard safe code. However, for manual heap allocations or otherwise
custom-allocated storage, `unsafe` code must make sure to call `ptr::drop_in_place` before
deallocating and re-using said storage.

In addition, storage "re-use"/invalidation can happen even if no storage is (de-)allocated.
For example, if we had an `Option` which contained a `Some(v)` where `v` is pinned, then `v`
would be invalidated by setting that option to `None`.

Similarly, if a `Vec` was used to store pinned values and `Vec::set_len` was used to
manually "kill" some elements of a vector, all of the items "killed" would become invalidated,
which would be *undefined behavior* if those items were pinned.

Both of these cases are somewhat contrived, but it is crucial to remember that `Pin`ned data
*must* be `drop`ped before it is invalidated; not just to prevent memory leaks, but as a
matter of soundness. As a corollary, the following code can *never* be made safe:

```rust
// Pin something inside a `ManuallyDrop`. This is fine on its own.
let mut pin: Pin<Box<ManuallyDrop<Type>>> = Box::pin(ManuallyDrop::new(Type));

// However, creating a pinning mutable reference to the type *inside*
// the `ManuallyDrop` is not!
let inner: Pin<&mut Type> = unsafe {
    Pin::map_unchecked_mut(pin.as_mut(), |x| &mut **x)
};
```
