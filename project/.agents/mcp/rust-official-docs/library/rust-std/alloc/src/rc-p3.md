---
title: "alloc::rc (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/rc.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::rc (part 3 of 3)

## Weak::upgrade

```rust
pub fn upgrade(&self) -> Option<Rc<T, A>> where A: AllocatorClone,
```

Attempts to upgrade the `Weak` pointer to an `Rc`, delaying
dropping of the inner value if successful.

Returns `None` in the following cases:

1. The inner value has since been dropped or moved out.

2. This `Weak` does not point to an allocation.

3. The owning reference this `Weak` is associated with is either not fully-constructed or does not allow an upgrade.

# Examples

```rust
use std::rc::Rc;

let five = Rc::new(5);

let weak_five = Rc::downgrade(&five);

let strong_five: Option<Rc<_>> = weak_five.upgrade();
assert!(strong_five.is_some());

// Destroy all strong pointers.
drop(strong_five);
drop(five);

assert!(weak_five.upgrade().is_none());
```

## Weak::strong_count

```rust
pub fn strong_count(&self) -> usize
```

Gets the number of strong (`Rc`) pointers pointing to this allocation.

If `self` was created using `Weak::new`, this will return 0.

## Weak::weak_count

```rust
pub fn weak_count(&self) -> usize
```

Gets the number of `Weak` pointers pointing to this allocation.

If no strong pointers remain, this will return zero.

## Weak::ptr_eq

```rust
pub fn ptr_eq(&self, other: &Self) -> bool
```

Returns `true` if the two `Weak`s point to the same allocation similar to `ptr::eq`, or if
both don't point to any allocation (because they were created with `Weak::new()`). However,
this function ignores the metadata of  `dyn Trait` pointers.

# Notes

Since this compares pointers it means that `Weak::new()` will equal each
other, even though they don't point to any allocation.

# Examples

```rust
use std::rc::Rc;

let first_rc = Rc::new(5);
let first = Rc::downgrade(&first_rc);
let second = Rc::downgrade(&first_rc);

assert!(first.ptr_eq(&second));

let third_rc = Rc::new(5);
let third = Rc::downgrade(&third_rc);

assert!(!first.ptr_eq(&third));
```

Comparing `Weak::new`.

```rust
use std::rc::{Rc, Weak};

let first = Weak::new();
let second = Weak::new();
assert!(first.ptr_eq(&second));

let third_rc = Rc::new(());
let third = Rc::downgrade(&third_rc);
assert!(!first.ptr_eq(&third));
```
