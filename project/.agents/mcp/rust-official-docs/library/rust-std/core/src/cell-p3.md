---
title: "core::cell (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/cell.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::cell (part 3 of 3)

## struct UnsafeCell

```rust
pub struct UnsafeCell<T: ?Sized>
```

The core primitive for interior mutability in Rust.

If you have a reference `&T`, then normally in Rust the compiler performs optimizations based on
the knowledge that `&T` points to immutable data. Mutating that data, for example through an
alias or by transmuting a `&T` into a `&mut T`, is considered undefined behavior.
`UnsafeCell<T>` opts-out of the immutability guarantee for `&T`: a shared reference
`&UnsafeCell<T>` may point to data that is being mutated. This is called "interior mutability".

All other types that allow internal mutability, such as `Cell<T>` and `RefCell<T>`, internally
use `UnsafeCell` to wrap their data.

Note that only the immutability guarantee for shared references is affected by `UnsafeCell`. The
uniqueness guarantee for mutable references is unaffected. As explained below, for the duration
of the lifetime of an `&mut`, no other reference may exist and no pointer may be used to access
that memory; this applies even with `UnsafeCell<T>`.

`UnsafeCell` does nothing to avoid data races; they are still undefined behavior. If multiple
threads have access to the same `UnsafeCell`, they must follow the usual rules of the
`core::sync::atomic`.

The `UnsafeCell` API itself is technically very simple: `.get()` gives you a raw pointer
`*mut T` to its contents. It is up to _you_ as the abstraction designer to use that raw pointer
correctly.

# Aliasing rules

The precise Rust aliasing rules are somewhat in flux, but the main points are not contentious:

- If you create a safe reference with lifetime `'a` (either a `&T` or `&mut T` reference), then
  you must not access the data in any way that contradicts that reference for the remainder of
  `'a`, and you must not create any contradicting references. For example, this means that if
  you take the `*mut T` from an `UnsafeCell<T>` and cast it to a `&T`, then the data in `T` must
  remain immutable (modulo any `UnsafeCell` data found within `T`, of course) until that
  reference's lifetime expires, and no `&mut` reference to this data may be created. Similarly,
  if you create a `&mut T` reference, then you must not access the data within the `UnsafeCell`
  with any other pointer/reference until that reference expires, and no reference of any kind
  may be created.

- For both `&T` without `UnsafeCell<_>` and `&mut T`, you must also not deallocate the data
  until the reference expires. As a special exception, given a `&T`, any part of it that is
  inside an `UnsafeCell<_>` may be deallocated during the lifetime of the reference, after the
  last time the reference is used (dereferenced or reborrowed). Since you cannot deallocate a part
  of what a reference points to, this means the memory a `&T` points to can be deallocated only if
  *every part of it* (including padding) is inside an `UnsafeCell`.

However, whenever a `&UnsafeCell<T>` is constructed or dereferenced, it must still point to
live memory and the compiler is allowed to insert spurious reads if it can prove that this
memory has not yet been deallocated.

To assist with proper design, the following scenarios are explicitly declared legal
for single-threaded code:

1. A `&T` reference can be released to safe code and there it can co-exist with other `&T`
   references, but not with a `&mut T`

2. A `&mut T` reference may be released to safe code provided neither other `&mut T` nor `&T`
   co-exist with it. A `&mut T` must always be unique.

Note that whilst mutating the contents of a `&UnsafeCell<T>` (even while other
`&UnsafeCell<T>` references alias the cell) is
ok (provided you enforce the above invariants some other way), it is still undefined behavior
to have aliasing `&mut UnsafeCell<T>` (or aliasing `&mut` of *any* type). That is, `UnsafeCell` is a wrapper
designed to have a special interaction with _shared_ accesses (_i.e._, through an
`&UnsafeCell<_>` reference); there is no magic whatsoever when dealing with _exclusive_
accesses (_e.g._, through a `&mut UnsafeCell<_>`): neither the cell nor the wrapped value
may be aliased for the duration of that `&mut` borrow.
This is showcased by the `.get_mut()` accessor, which is a _safe_ getter that yields
a `&mut T`.

# Memory layout

`UnsafeCell<T>` has the same in-memory representation as its inner type `T`. A consequence
of this guarantee is that it is possible to convert between `T` and `UnsafeCell<T>`.
Special care has to be taken when converting a nested `T` inside of an `Outer<T>` type
to an `Outer<UnsafeCell<T>>` type: this is not sound when the `Outer<T>` type enables [niche]
optimizations. For example, the type `Option<NonNull<u8>>` is typically 8 bytes large on
64-bit platforms, but the type `Option<UnsafeCell<NonNull<u8>>>` takes up 16 bytes of space.
Therefore this is not a valid conversion, despite `NonNull<u8>` and `UnsafeCell<NonNull<u8>>>`
having the same memory layout. This is because `UnsafeCell` disables niche optimizations in
order to avoid its interior mutability property from spreading from `T` into the `Outer` type,
thus this can cause distortions in the type size in these cases.

The following examples make use of this guarantee:

```rust
/// # Safety
/// The caller must not call `get_mut_unchecked` again (on any alias of `ptr`) for the duration
/// of the lifetime of the returned reference.
unsafe fn get_mut_unchecked<T>(ptr: &UnsafeCell<T>) -> &mut T {
  let t = ptr as *const UnsafeCell<T> as *mut T;
  unsafe { &mut *t }
}
```

```rust
fn get_shared<T>(ptr: &mut T) -> &UnsafeCell<T> {
  let t = ptr as *mut T as *const UnsafeCell<T>;
  // SAFETY: `T` and `UnsafeCell<T>` have the same memory layout
  unsafe { &*t }
}
```

# Examples

Here is an example showcasing how to soundly mutate the contents of an `UnsafeCell<_>` despite
there being multiple references aliasing the cell:

```rust
use std::cell::UnsafeCell;

let x: UnsafeCell<i32> = 42.into();
// Get multiple / concurrent / shared references to the same `x`.
let (p1, p2): (&UnsafeCell<i32>, &UnsafeCell<i32>) = (&x, &x);

unsafe {
    // SAFETY: within this scope there are no other references to `x`'s contents,
    // so ours is effectively unique.
    let p1_exclusive: &mut i32 = &mut *p1.get(); // -- borrow --+
    *p1_exclusive += 27; //                                     |
} // <---------- cannot go beyond this point -------------------+

unsafe {
    // SAFETY: within this scope nobody expects to have exclusive access to `x`'s contents,
    // so we can have multiple shared accesses concurrently.
    let p2_shared: &i32 = &*p2.get();
    assert_eq!(*p2_shared, 42 + 27);
    let p1_shared: &i32 = &*p1.get();
    assert_eq!(*p1_shared, *p2_shared);
}
```

The following example showcases the fact that exclusive access to an `UnsafeCell<T>`
implies exclusive access to its `T`:

```rust
#![forbid(unsafe_code)]
// with exclusive accesses, `UnsafeCell` is a transparent no-op wrapper, so no need for
// `unsafe` here.
use std::cell::UnsafeCell;

let mut x: UnsafeCell<i32> = 42.into();

// Get a compile-time-checked unique reference to `x`.
let p_unique: &mut UnsafeCell<i32> = &mut x;
// With an exclusive reference, we can mutate the contents for free.
*p_unique.get_mut() = 0;
// Or, equivalently:
x = UnsafeCell::new(0);

// When we own the value, we can extract the contents for free.
let contents: i32 = x.into_inner();
assert_eq!(contents, 0);
```

## UnsafeCell::new

```rust
pub const fn new(value: T) -> UnsafeCell<T>
```

Constructs a new instance of `UnsafeCell` which will wrap the specified
value.

All access to the inner value through `&UnsafeCell<T>` requires `unsafe` code.

# Examples

```rust
use std::cell::UnsafeCell;

let uc = UnsafeCell::new(5);
```

## UnsafeCell::into_inner

```rust
pub const fn into_inner(self) -> T
```

Unwraps the value, consuming the cell.

# Examples

```rust
use std::cell::UnsafeCell;

let uc = UnsafeCell::new(5);

let five = uc.into_inner();
```

## UnsafeCell::replace

```rust
pub const unsafe fn replace(&self, value: T) -> T
```

Replace the value in this `UnsafeCell` and return the old value.

# Safety

The caller must take care to avoid aliasing and data races.

- It is Undefined Behavior to allow calls to race with
  any other access to the wrapped value.
- It is Undefined Behavior to call this while any other
  reference(s) to the wrapped value are alive.

# Examples

```rust
use std::cell::UnsafeCell;

let uc = UnsafeCell::new(5);

let old = unsafe { uc.replace(10) };
assert_eq!(old, 5);
```

## UnsafeCell::from_mut

```rust
pub const fn from_mut(value: &mut T) -> &mut UnsafeCell<T>
```

Converts from `&mut T` to `&mut UnsafeCell<T>`.

# Examples

```rust
use std::cell::UnsafeCell;

let mut val = 42;
let uc = UnsafeCell::from_mut(&mut val);

*uc.get_mut() -= 1;
assert_eq!(*uc.get_mut(), 41);
```

## UnsafeCell::get

```rust
pub const fn get(&self) -> *mut T
```

Gets a mutable pointer to the wrapped value.

This can be cast to a pointer of any kind. When creating (shared or mutable) references, you
must uphold the aliasing rules; see the type-level docs for
more discussion and caveats.

This is equivalent to casting `self` to a raw pointer and then casting that raw
pointer to `*mut T`.

# Examples

```rust
use std::cell::UnsafeCell;

let uc = UnsafeCell::new(5);

let five = uc.get();
```

## UnsafeCell::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut T
```

Returns a mutable reference to the underlying data.

This call borrows the `UnsafeCell` mutably (at compile-time) which
guarantees that we possess the only reference.

# Examples

```rust
use std::cell::UnsafeCell;

let mut c = UnsafeCell::new(5);
*c.get_mut() += 1;

assert_eq!(*c.get_mut(), 6);
```

## UnsafeCell::raw_get

```rust
pub const fn raw_get(this: *const Self) -> *mut T
```

Gets a mutable pointer to the wrapped value.
The difference from `get` is that this function accepts a raw pointer,
which is useful to avoid the creation of temporary references.

This can be cast to a pointer of any kind. When creating (shared or mutable) references, you
must uphold the aliasing rules; see the type-level docs for
more discussion and caveats.

This is equivalent to casting `this` to `*mut T`.

# Examples

Gradual initialization of an `UnsafeCell` requires `raw_get`, as
calling `get` would require creating a reference to uninitialized data:

```rust
use std::cell::UnsafeCell;
use std::mem::MaybeUninit;

let m = MaybeUninit::<UnsafeCell<i32>>::uninit();
unsafe { UnsafeCell::raw_get(m.as_ptr()).write(5); }
// avoid below which references to uninitialized data
// unsafe { UnsafeCell::get(&*m.as_ptr()).write(5); }
let uc = unsafe { m.assume_init() };

assert_eq!(uc.into_inner(), 5);
```

## UnsafeCell::as_ref_unchecked

```rust
pub const unsafe fn as_ref_unchecked(&self) -> &T
```

Get a shared reference to the value within the `UnsafeCell`.

# Safety

- It is Undefined Behavior to call this while any mutable
  reference to the wrapped value is alive.
- Mutating the wrapped value while the returned
  reference is alive is Undefined Behavior.

# Examples

```rust
use std::cell::UnsafeCell;

let uc = UnsafeCell::new(5);

let val = unsafe { uc.as_ref_unchecked() };
assert_eq!(val, &5);
```

## UnsafeCell::as_mut_unchecked

```rust
pub const unsafe fn as_mut_unchecked(&self) -> &mut T
```

Get an exclusive reference to the value within the `UnsafeCell`.

# Safety

- It is Undefined Behavior to call this while any other
  reference(s) to the wrapped value are alive.
- Mutating the wrapped value through other means while the
  returned reference is alive is Undefined Behavior.

# Examples

```rust
use std::cell::UnsafeCell;

let uc = UnsafeCell::new(5);

unsafe { *uc.as_mut_unchecked() += 1; }
assert_eq!(uc.into_inner(), 6);
```

## SyncUnsafeCell::new

```rust
pub const fn new(value: T) -> Self
```

Constructs a new instance of `SyncUnsafeCell` which will wrap the specified value.

## SyncUnsafeCell::into_inner

```rust
pub const fn into_inner(self) -> T
```

Unwraps the value, consuming the cell.

## SyncUnsafeCell::get

```rust
pub const fn get(&self) -> *mut T
```

Gets a mutable pointer to the wrapped value.

This can be cast to a pointer of any kind.
Ensure that the access is unique (no active references, mutable or not)
when casting to `&mut T`, and ensure that there are no mutations
or mutable aliases going on when casting to `&T`

## SyncUnsafeCell::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut T
```

Returns a mutable reference to the underlying data.

This call borrows the `SyncUnsafeCell` mutably (at compile-time) which
guarantees that we possess the only reference.

## SyncUnsafeCell::raw_get

```rust
pub const fn raw_get(this: *const Self) -> *mut T
```

Gets a mutable pointer to the wrapped value.

See `UnsafeCell::get` for details.
