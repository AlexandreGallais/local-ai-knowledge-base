---
title: "core::cell (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/cell.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::cell (part 2 of 3)

## Cell::get_cloned

```rust
pub fn get_cloned(&self) -> Self
```

Get a clone of the `Cell` that contains a copy of the original value.

This allows a cheaply `Clone`-able type like an `Rc` to be stored in a `Cell`, exposing the
cheaper `clone()` method.

# Examples

```rust
#![feature(cell_get_cloned)]

use core::cell::Cell;
use std::rc::Rc;

let rc = Rc::new(1usize);
let c1 = Cell::new(rc);
let c2 = c1.get_cloned();
assert_eq!(*c2.into_inner(), 1);
```

## struct RefCell

```rust
pub struct RefCell<T: ?Sized>
```

A mutable memory location with dynamically checked borrow rules

See the module-level documentation for more.

## struct BorrowError

```rust
pub struct BorrowError
```

An error returned by `RefCell::try_borrow`.

## struct BorrowMutError

```rust
pub struct BorrowMutError
```

An error returned by `RefCell::try_borrow_mut`.

## RefCell::new

```rust
pub const fn new(value: T) -> RefCell<T>
```

Creates a new `RefCell` containing `value`.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new(5);
```

## RefCell::into_inner

```rust
pub const fn into_inner(self) -> T
```

Consumes the `RefCell`, returning the wrapped value.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new(5);

let five = c.into_inner();
```

## RefCell::replace

```rust
pub const fn replace(&self, t: T) -> T
```

Replaces the wrapped value with a new one, returning the old value,
without deinitializing either one.

This function corresponds to `std::mem::replace`.

# Panics

Panics if the value is currently borrowed.

# Examples

```rust
use std::cell::RefCell;
let cell = RefCell::new(5);
let old_value = cell.replace(6);
assert_eq!(old_value, 5);
assert_eq!(cell, RefCell::new(6));
```

## RefCell::replace_with

```rust
pub fn replace_with<F: FnOnce(&mut T) -> T>(&self, f: F) -> T
```

Replaces the wrapped value with a new one computed from `f`, returning
the old value, without deinitializing either one.

# Panics

Panics if the value is currently borrowed.

# Examples

```rust
use std::cell::RefCell;
let cell = RefCell::new(5);
let old_value = cell.replace_with(|&mut old| old + 1);
assert_eq!(old_value, 5);
assert_eq!(cell, RefCell::new(6));
```

## RefCell::swap

```rust
pub const fn swap(&self, other: &Self)
```

Swaps the wrapped value of `self` with the wrapped value of `other`,
without deinitializing either one.

This function corresponds to `std::mem::swap`.

# Panics

Panics if the value in either `RefCell` is currently borrowed, or
if `self` and `other` point to the same `RefCell`.

# Examples

```rust
use std::cell::RefCell;
let c = RefCell::new(5);
let d = RefCell::new(6);
c.swap(&d);
assert_eq!(c, RefCell::new(6));
assert_eq!(d, RefCell::new(5));
```

## RefCell::borrow

```rust
pub const fn borrow(&self) -> Ref<'_, T>
```

Immutably borrows the wrapped value.

The borrow lasts until the returned `Ref` exits scope. Multiple
immutable borrows can be taken out at the same time.

# Panics

Panics if the value is currently mutably borrowed. For a non-panicking variant, use
`try_borrow`.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new(5);

let borrowed_five = c.borrow();
let borrowed_five2 = c.borrow();
```

An example of panic:

```rust
use std::cell::RefCell;

let c = RefCell::new(5);

let m = c.borrow_mut();
let b = c.borrow(); // this causes a panic
```

## RefCell::try_borrow

```rust
pub const fn try_borrow(&self) -> Result<Ref<'_, T>, BorrowError>
```

Immutably borrows the wrapped value, returning an error if the value is currently mutably
borrowed.

The borrow lasts until the returned `Ref` exits scope. Multiple immutable borrows can be
taken out at the same time.

This is the non-panicking variant of `borrow`.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new(5);

{
    let m = c.borrow_mut();
    assert!(c.try_borrow().is_err());
}

{
    let m = c.borrow();
    assert!(c.try_borrow().is_ok());
}
```

## RefCell::borrow_mut

```rust
pub const fn borrow_mut(&self) -> RefMut<'_, T>
```

Mutably borrows the wrapped value.

The borrow lasts until the returned `RefMut` or all `RefMut`s derived
from it exit scope. The value cannot be borrowed while this borrow is
active.

# Panics

Panics if the value is currently borrowed. For a non-panicking variant, use
`try_borrow_mut`.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new("hello".to_owned());

*c.borrow_mut() = "bonjour".to_owned();

assert_eq!(&*c.borrow(), "bonjour");
```

An example of panic:

```rust
use std::cell::RefCell;

let c = RefCell::new(5);
let m = c.borrow();

let b = c.borrow_mut(); // this causes a panic
```

## RefCell::try_borrow_mut

```rust
pub const fn try_borrow_mut(&self) -> Result<RefMut<'_, T>, BorrowMutError>
```

Mutably borrows the wrapped value, returning an error if the value is currently borrowed.

The borrow lasts until the returned `RefMut` or all `RefMut`s derived
from it exit scope. The value cannot be borrowed while this borrow is
active.

This is the non-panicking variant of `borrow_mut`.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new(5);

{
    let m = c.borrow();
    assert!(c.try_borrow_mut().is_err());
}

assert!(c.try_borrow_mut().is_ok());
```

## RefCell::as_ptr

```rust
pub const fn as_ptr(&self) -> *mut T
```

Returns a raw pointer to the underlying data in this cell.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new(5);

let ptr = c.as_ptr();
```

## RefCell::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut T
```

Returns a mutable reference to the underlying data.

Since this method borrows `RefCell` mutably, it is statically guaranteed
that no borrows to the underlying data exist. The dynamic checks inherent
in `borrow_mut` and most other methods of `RefCell` are therefore
unnecessary. Note that this method does not reset the borrowing state if borrows were previously leaked
(e.g., via `forget()` on a `Ref` or `RefMut`). For that purpose,
consider using the unstable `undo_leak` method.

This method can only be called if `RefCell` can be mutably borrowed,
which in general is only the case directly after the `RefCell` has
been created. In these situations, skipping the aforementioned dynamic
borrowing checks may yield better ergonomics and runtime-performance.

In most situations where `RefCell` is used, it can't be borrowed mutably.
Use `borrow_mut` to get mutable access to the underlying data then.

# Examples

```rust
use std::cell::RefCell;

let mut c = RefCell::new(5);
*c.get_mut() += 1;

assert_eq!(c, RefCell::new(6));
```

## RefCell::try_borrow_unguarded

```rust
pub const unsafe fn try_borrow_unguarded(&self) -> Result<&T, BorrowError>
```

Immutably borrows the wrapped value, returning an error if the value is
currently mutably borrowed.

# Safety

Unlike `RefCell::borrow`, this method is unsafe because it does not
return a `Ref`, thus leaving the borrow flag untouched. Mutably
borrowing the `RefCell` while the reference returned by this method
is alive is undefined behavior.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new(5);

{
    let m = c.borrow_mut();
    assert!(unsafe { c.try_borrow_unguarded() }.is_err());
}

{
    let m = c.borrow();
    assert!(unsafe { c.try_borrow_unguarded() }.is_ok());
}
```

## RefCell::take

```rust
pub fn take(&self) -> T
```

Takes the wrapped value, leaving `Default::default()` in its place.

# Panics

Panics if the value is currently borrowed.

# Examples

```rust
use std::cell::RefCell;

let c = RefCell::new(5);
let five = c.take();

assert_eq!(five, 5);
assert_eq!(c.into_inner(), 0);
```

## struct Ref

```rust
pub struct Ref<'b, T: ?Sized + 'b>
```

Wraps a borrowed reference to a value in a `RefCell` box.
A wrapper type for an immutably borrowed value from a `RefCell<T>`.

See the module-level documentation for more.

## Ref::clone

```rust
pub const fn clone(orig: &Ref<'b, T>) -> Ref<'b, T>
```

Copies a `Ref`.

The `RefCell` is already immutably borrowed, so this cannot fail.

This is an associated function that needs to be used as
`Ref::clone(...)`. A `Clone` implementation or a method would interfere
with the widespread use of `r.borrow().clone()` to clone the contents of
a `RefCell`.

## Ref::map

```rust
pub fn map<U: ?Sized, F>(orig: Ref<'b, T>, f: F) -> Ref<'b, U> where F: FnOnce(&T) -> &U,
```

Makes a new `Ref` for a component of the borrowed data.

The `RefCell` is already immutably borrowed, so this cannot fail.

This is an associated function that needs to be used as `Ref::map(...)`.
A method would interfere with methods of the same name on the contents
of a `RefCell` used through `Deref`.

# Examples

```rust
use std::cell::{RefCell, Ref};

let c = RefCell::new((5, 'b'));
let b1: Ref<'_, (u32, char)> = c.borrow();
let b2: Ref<'_, u32> = Ref::map(b1, |t| &t.0);
assert_eq!(*b2, 5)
```

## Ref::filter_map

```rust
pub fn filter_map<U: ?Sized, F>(orig: Ref<'b, T>, f: F) -> Result<Ref<'b, U>, Self> where F: FnOnce(&T) -> Option<&U>,
```

Makes a new `Ref` for an optional component of the borrowed data. The
original guard is returned as an `Err(..)` if the closure returns
`None`.

The `RefCell` is already immutably borrowed, so this cannot fail.

This is an associated function that needs to be used as
`Ref::filter_map(...)`. A method would interfere with methods of the same
name on the contents of a `RefCell` used through `Deref`.

# Examples

```rust
use std::cell::{RefCell, Ref};

let c = RefCell::new(vec![1, 2, 3]);
let b1: Ref<'_, Vec<u32>> = c.borrow();
let b2: Result<Ref<'_, u32>, _> = Ref::filter_map(b1, |v| v.get(1));
assert_eq!(*b2.unwrap(), 2);
```

## Ref::map_split

```rust
pub fn map_split<U: ?Sized, V: ?Sized, F>(orig: Ref<'b, T>, f: F) -> (Ref<'b, U>, Ref<'b, V>) where F: FnOnce(&T) -> (&U, &V),
```

Splits a `Ref` into multiple `Ref`s for different components of the
borrowed data.

The `RefCell` is already immutably borrowed, so this cannot fail.

This is an associated function that needs to be used as
`Ref::map_split(...)`. A method would interfere with methods of the same
name on the contents of a `RefCell` used through `Deref`.

# Examples

```rust
use std::cell::{Ref, RefCell};

let cell = RefCell::new([1, 2, 3, 4]);
let borrow = cell.borrow();
let (begin, end) = Ref::map_split(borrow, |slice| slice.split_at(2));
assert_eq!(*begin, [1, 2]);
assert_eq!(*end, [3, 4]);
```

## RefMut::map

```rust
pub fn map<U: ?Sized, F>(mut orig: RefMut<'b, T>, f: F) -> RefMut<'b, U> where F: FnOnce(&mut T) -> &mut U,
```

Makes a new `RefMut` for a component of the borrowed data, e.g., an enum
variant.

The `RefCell` is already mutably borrowed, so this cannot fail.

This is an associated function that needs to be used as
`RefMut::map(...)`. A method would interfere with methods of the same
name on the contents of a `RefCell` used through `Deref`.

# Examples

```rust
use std::cell::{RefCell, RefMut};

let c = RefCell::new((5, 'b'));
{
    let b1: RefMut<'_, (u32, char)> = c.borrow_mut();
    let mut b2: RefMut<'_, u32> = RefMut::map(b1, |t| &mut t.0);
    assert_eq!(*b2, 5);
    *b2 = 42;
}
assert_eq!(*c.borrow(), (42, 'b'));
```

## RefMut::filter_map

```rust
pub fn filter_map<U: ?Sized, F>(mut orig: RefMut<'b, T>, f: F) -> Result<RefMut<'b, U>, Self> where F: FnOnce(&mut T) -> Option<&mut U>,
```

Makes a new `RefMut` for an optional component of the borrowed data. The
original guard is returned as an `Err(..)` if the closure returns
`None`.

The `RefCell` is already mutably borrowed, so this cannot fail.

This is an associated function that needs to be used as
`RefMut::filter_map(...)`. A method would interfere with methods of the
same name on the contents of a `RefCell` used through `Deref`.

# Examples

```rust
use std::cell::{RefCell, RefMut};

let c = RefCell::new(vec![1, 2, 3]);

{
    let b1: RefMut<'_, Vec<u32>> = c.borrow_mut();
    let mut b2: Result<RefMut<'_, u32>, _> = RefMut::filter_map(b1, |v| v.get_mut(1));

    if let Ok(mut b2) = b2 {
        *b2 += 2;
    }
}

assert_eq!(*c.borrow(), vec![1, 4, 3]);
```

## RefMut::map_split

```rust
pub fn map_split<U: ?Sized, V: ?Sized, F>( mut orig: RefMut<'b, T>, f: F, ) -> (RefMut<'b, U>, RefMut<'b, V>) where F: FnOnce(&mut T) -> (&mut U, &mut V),
```

Splits a `RefMut` into multiple `RefMut`s for different components of the
borrowed data.

The underlying `RefCell` will remain mutably borrowed until both
returned `RefMut`s go out of scope.

The `RefCell` is already mutably borrowed, so this cannot fail.

This is an associated function that needs to be used as
`RefMut::map_split(...)`. A method would interfere with methods of the
same name on the contents of a `RefCell` used through `Deref`.

# Examples

```rust
use std::cell::{RefCell, RefMut};

let cell = RefCell::new([1, 2, 3, 4]);
let borrow = cell.borrow_mut();
let (mut begin, mut end) = RefMut::map_split(borrow, |slice| slice.split_at_mut(2));
assert_eq!(*begin, [1, 2]);
assert_eq!(*end, [3, 4]);
begin.copy_from_slice(&[4, 3]);
end.copy_from_slice(&[2, 1]);
```

## struct RefMut

```rust
pub struct RefMut<'b, T: ?Sized + 'b>
```

A wrapper type for a mutably borrowed value from a `RefCell<T>`.

See the module-level documentation for more.
