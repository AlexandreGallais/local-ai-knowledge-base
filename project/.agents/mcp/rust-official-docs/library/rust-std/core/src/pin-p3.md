---
title: "core::pin (part 3 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/pin.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::pin (part 3 of 5)

Because `mem::ManuallyDrop` inhibits the destructor of `Type`, it won't get run when the
<code>[Box]<[ManuallyDrop]\<Type>></code> is dropped, thus violating the drop guarantee of the
<code>[Pin]<[&mut] Type>></code>.

Of course, *leaking* memory in such a way that its underlying storage will never get invalidated
or re-used is still fine: `mem::forget`ing a `Box<T>` prevents its storage from ever getting
re-used, so the `drop` guarantee is still satisfied.

#### Implementing an address-sensitive type.

This section goes into detail on important considerations for implementing your own
address-sensitive types, which are different from merely using `Pin<Ptr>` in a generic
way.

#### Implementing `Drop` for types with address-sensitive states

The `drop` function takes `&mut self`, but this is called *even if that `self` has been
pinned*! Implementing `Drop` for a type with address-sensitive states requires some care, because if `self` was
indeed in an address-sensitive state before `drop` was called, it is as if the compiler
automatically called `Pin::get_unchecked_mut`.

This can never cause a problem in purely safe code because creating a pinning pointer to
a type which has address-sensitive states (and thus does not implement `Unpin`) requires `unsafe`,
but it is important to note that choosing to take advantage of pinning-related guarantees
to justify validity in the implementation of your type has consequences for that type's
`Drop`[Drop] implementation as well: if an element of your type could have been pinned,
you must treat `Drop`[Drop] as implicitly taking <code>self: [Pin]<[&mut] Self></code>.

You should implement `Drop` as follows:

```rust
impl Drop for Type {
    fn drop(&mut self) {
        // `new_unchecked` is okay because we know this value is never used
        // again after being dropped.
        inner_drop(unsafe { Pin::new_unchecked(self)});
        fn inner_drop(this: Pin<&mut Type>) {
            // Actual drop code goes here.
        }
    }
}
```

The function `inner_drop` has the signature that `drop` *should* have in this situation.
This makes sure that you do not accidentally use `self`/`this` in a way that is in conflict
with pinning's invariants.

Moreover, if your type is `#[repr(packed)]`, the compiler will automatically
move fields around to be able to drop them. It might even do
that for fields that happen to be sufficiently aligned. As a consequence, you cannot use
pinning with a `#[repr(packed)]` type.

#### Implementing `Drop` for pointer types which will be used as `Pin`ning pointers

It should further be noted that creating a pinning pointer of some type `Ptr` *also* carries
with it implications on the way that `Ptr` type must implement `Drop`
(as well as `Deref` and `DerefMut`)! When implementing a pointer type that may be used as
a pinning pointer, you must also take the same care described above not to *move* out of or
otherwise invalidate the pointee during `Drop`, `Deref`, or `DerefMut`
implementations.

#### "Assigning" pinned data

Although in general it is not valid to swap data or assign through a `Pin<Ptr>` for the same
reason that reusing a pinned object's memory is invalid, it is possible to do validly when
implemented with special care for the needs of the exact data structure which is being
modified. For example, the assigning function must know how to update all uses of the pinned
address (and any other invariants necessary to satisfy validity for that type). For
`Unmovable` (from the example above), we could write an assignment function like so:

```rust
impl Unmovable {
    // Copies the contents of `src` into `self`, fixing up the self-pointer
    // in the process.
    fn assign(self: Pin<&mut Self>, src: Pin<&mut Self>) {
        unsafe {
            let unpinned_self = Pin::into_inner_unchecked(self);
            let unpinned_src = Pin::into_inner_unchecked(src);
            *unpinned_self = Self {
                data: unpinned_src.data,
                slice: NonNull::from(&mut []),
                _pin: PhantomPinned,
            };

            let data_ptr = unpinned_src.data.as_ptr() as *const u8;
            let slice_ptr = unpinned_src.slice.as_ptr() as *const u8;
            let offset = slice_ptr.offset_from(data_ptr) as usize;
            let len = unpinned_src.slice.as_ptr().len();

            unpinned_self.slice = NonNull::from(&mut unpinned_self.data[offset..offset+len]);
        }
    }
}
```

Even though we can't have the compiler do the assignment for us, it's possible to write
such specialized functions for types that might need it.

Note that it _is_ possible to assign generically through a `Pin<Ptr>` by way of `Pin::set()`.
This does not violate any guarantees, since it will run `drop` on the pointee value before
assigning the new value. Thus, the `drop` implementation still has a chance to perform the
necessary notifications to dependent values before the memory location of the original pinned
value is overwritten.

#### Projections and Structural Pinning

With ordinary structs, it is natural that we want to add *projection* methods that allow
borrowing one or more of the inner fields of a struct when the caller has access to a
borrow of the whole struct:

```rust
struct Struct {
    field: Field,
    // ...
}

impl Struct {
    fn field(&mut self) -> &mut Field { &mut self.field }
}
```

When working with address-sensitive types, it's not obvious what the signature of these
functions should be. If `field` takes <code>self: [Pin]<&mut Struct></code>, should it
return `&mut Field` or <code>[Pin]<`&mut Field`></code>? This question also arises with
`enum`s and wrapper types like `Vec<T>`, `Box<T>`, and `RefCell<T>`. (This question
applies just as well to shared references, but we'll examine the more common case of mutable
references for illustration)

It turns out that it's up to the author of `Struct` to decide which type the "projection"
should produce. The choice must be *consistent* though: if a pin is projected to a field
in one place, then it should very likely not be exposed elsewhere without projecting the
pin.

As the author of a data structure, you get to decide for each field whether pinning
"propagates" to this field or not. Pinning that propagates is also called "structural",
because it follows the structure of the type.

This choice depends on what guarantees you need from the field for your `unsafe` code to work.
If the field is itself address-sensitive, or participates in the parent struct's address
sensitivity, it will need to be structurally pinned.

A useful test is if `unsafe` code that consumes <code>[Pin]\<&mut Struct></code>
also needs to take note of the address of the field itself, it may be evidence that that field
is structurally pinned. Unfortunately, there are no hard-and-fast rules.

#### Choosing pinning *not to be* structural for `field`...

While counter-intuitive, it's often the easier choice: if you do not expose a
<code>[Pin]<[&mut] Field></code>, you do not need to be careful about other code
moving out of that field, you just have to ensure that you never create a pinning
reference to that field. This does of course also mean that if you decide a field does not
have structural pinning, you must not write `unsafe` code that assumes (invalidly) that the
field *is* structurally pinned!

Fields without structural pinning may have a projection method that turns
<code>[Pin]<[&mut] Struct></code> into `&mut Field`:

```rust
impl Struct {
    fn field(self: Pin<&mut Self>) -> &mut Field {
        // This is okay because `field` is never considered pinned, therefore we do not
        // need to uphold any pinning guarantees for this field in particular. Of course,
        // we must not elsewhere assume this field *is* pinned if we choose to expose
        // such a method!
        unsafe { &mut self.get_unchecked_mut().field }
    }
}
```

You may also in this situation `impl [Unpin] for Struct {}` *even if* the type of
`field` is not `Unpin`. Since we have explicitly chosen not to care about pinning guarantees
for `field`, the way `field`'s type interacts with pinning is no longer relevant in the
context of its use in `Struct`.

#### Choosing pinning *to be* structural for `field`...

The other option is to decide that pinning is "structural" for `field`,
meaning that if the struct is pinned then so is the field.

This allows writing a projection that creates a <code>[Pin]<`&mut Field`></code>, thus
witnessing that the field is pinned:

```rust
impl Struct {
    fn field(self: Pin<&mut Self>) -> Pin<&mut Field> {
        // This is okay because `field` is pinned when `self` is.
        unsafe { self.map_unchecked_mut(|s| &mut s.field) }
    }
}
```

Structural pinning comes with a few extra requirements:

1.  *Structural `Unpin`.* A struct can be `Unpin` only if all of its
    structurally-pinned fields are, too. This is `Unpin`'s behavior by default.
    However, as a library author, it is your responsibility not to write something like
    <code>impl\<T> [Unpin] for Struct\<T> {}</code> and then offer a method that provides
    structural pinning to an inner field of `T`, which may not be `Unpin`! (Adding *any*
    projection operation requires unsafe code, so the fact that `Unpin` is a safe trait does
    not break the principle that you only have to worry about any of this if you use
    `unsafe`)

2.  *Pinned Destruction.* As discussed above, `drop` takes
    `&mut self`, but the struct (and hence its fields) might have been pinned
    before. The destructor must be written as if its argument was
    <code>self: [Pin]\<`&mut Self`></code>, instead.

    As a consequence, the struct *must not* be `#[repr(packed)]`.

3.  *Structural Notice of Destruction.* You must uphold the
    `Drop` guarantee: once your struct is pinned, the struct's storage cannot
    be re-used without calling the structurally-pinned fields' destructors, as well.

    This can be tricky, as witnessed by `VecDeque<T>`: the destructor of `VecDeque<T>`
    can fail to call `drop` on all elements if one of the destructors panics. This violates
    the `Drop` guarantee, because it can lead to elements being deallocated
    without their destructor being called.

    `VecDeque<T>` has no pinning projections, so its destructor is sound. If it wanted
    to provide such structural pinning, its destructor would need to abort the process if any
    of the destructors panicked.

4.  You must not offer any other operations that could lead to data being *moved* out of
    the structural fields when your type is pinned. For example, if the struct contains an
    `Option<T>` and there is a `take`[Option::take]-like operation with type
    <code>fn([Pin]<&mut Struct\<T>>) -> `Option<T>`</code>,
    then that operation can be used to move a `T` out of a pinned `Struct<T>` – which
    means pinning cannot be structural for the field holding this data.

    For a more complex example of moving data out of a pinned type,
    imagine if `RefCell<T>` had a method
    <code>fn get_pin_mut(self: [Pin]<`&mut Self`>) -> [Pin]<`&mut T`></code>.
    Then we could do the following:
```rust
    fn exploit_ref_cell<T>(mut rc: Pin<&mut RefCell<T>>) {
        // Here we get pinned access to the `T`.
        let _: Pin<&mut T> = rc.as_mut().get_pin_mut();

        // And here we have `&mut T` to the same data.
        let shared: &RefCell<T> = rc.into_ref().get_ref();
        let mut borrow = shared.borrow_mut();
        let content = &mut *borrow;
    }
```
    This is catastrophic: it means we can first pin the content of the
    `RefCell<T>` (using `[RefCell]::get_pin_mut`) and then move that
    content using the mutable reference we got later.

#### Structural Pinning examples

For a type like `Vec<T>`, both possibilities (structural pinning or not) make
sense. A `Vec<T>` with structural pinning could have `get_pin`/`get_pin_mut`
methods to get pinning references to elements. However, it could *not* allow calling
`pop`[Vec::pop] on a pinned `Vec<T>` because that would move the (structurally
pinned) contents! Nor could it allow `push`[Vec::push], which might reallocate and thus also
move the contents.

A `Vec<T>` without structural pinning could
<code>impl\<T> [Unpin] for `Vec<T>`</code>, because the contents are never pinned
and the `Vec<T>` itself is fine with being moved as well.
At that point pinning just has no effect on the vector at all.

In the standard library, pointer types generally do not have structural pinning,
and thus they do not offer pinning projections. This is why <code>`Box<T>`: [Unpin]</code>
holds for all `T`. It makes sense to do this for pointer types, because moving the
`Box<T>` does not actually move the `T`: the `Box<T>` can be freely
movable (aka `Unpin`) even if the `T` is not. In fact, even <code>[Pin]<`Box<T>`></code> and
<code>[Pin]<`&mut T`></code> are always `Unpin` themselves, for the same reason:
their contents (the `T`) are pinned, but the pointers themselves can be moved without moving
the pinned data. For both `Box<T>` and <code>[Pin]<`Box<T>`></code>,
whether the content is pinned is entirely independent of whether the
pointer is pinned, meaning pinning is *not* structural.

When implementing a `Future` combinator, you will usually need structural pinning
for the nested futures, as you need to get pinning (`Pin`-wrapped) references to them to
call `poll`. But if your combinator contains any other data that does not need to be pinned,
you can make those fields not structural and hence freely access them with a
mutable reference even when you just have <code>[Pin]<`&mut Self`></code>
(such as in your own `poll` implementation).

## Pin::new

```rust
pub const fn new(pointer: Ptr) -> Pin<Ptr>
```

Constructs a new `Pin<Ptr>` around a pointer to some data of a type that
implements `Unpin`.

Unlike `Pin::new_unchecked`, this method is safe because the pointer
`Ptr` dereferences to an `Unpin` type, which cancels the pinning guarantees.

# Examples

```rust
use std::pin::Pin;

let mut val: u8 = 5;

// Since `val` doesn't care about being moved, we can safely create a "facade" `Pin`
// which will allow `val` to participate in `Pin`-bound apis  without checking that
// pinning guarantees are actually upheld.
let mut pinned: Pin<&mut u8> = Pin::new(&mut val);
```

## Pin::into_inner

```rust
pub const fn into_inner(pin: Pin<Ptr>) -> Ptr
```

Unwraps this `Pin<Ptr>`, returning the underlying pointer.

Doing this operation safely requires that the data pointed at by this pinning pointer
implements `Unpin` so that we can ignore the pinning invariants when unwrapping it.

# Examples

```rust
use std::pin::Pin;

let mut val: u8 = 5;
let pinned: Pin<&mut u8> = Pin::new(&mut val);

// Unwrap the pin to get the underlying mutable reference to the value. We can do
// this because `val` doesn't care about being moved, so the `Pin` was just
// a "facade" anyway.
let r = Pin::into_inner(pinned);
assert_eq!(*r, 5);
```
