---
title: "alloc::sync (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/sync.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::sync (part 3 of 3)

## Weak::into_raw

```rust
pub fn into_raw(self) -> *const T
```

Consumes the `Weak<T>` and turns it into a raw pointer.

This converts the weak pointer into a raw pointer, while still preserving the ownership of
one weak reference (the weak count is not modified by this operation). It can be turned
back into the `Weak<T>` with `from_raw`.

The same restrictions of accessing the target of the pointer as with
`as_ptr` apply.

# Examples

```rust
use std::sync::{Arc, Weak};

let strong = Arc::new("hello".to_owned());
let weak = Arc::downgrade(&strong);
let raw = weak.into_raw();

assert_eq!(1, Arc::weak_count(&strong));
assert_eq!("hello", unsafe { &*raw });

drop(unsafe { Weak::from_raw(raw) });
assert_eq!(0, Arc::weak_count(&strong));
```

## Weak::as_ptr

```rust
pub fn as_ptr(&self) -> *const T
```

Returns a raw pointer to the object `T` pointed to by this `Weak<T>`.

The pointer is valid only if there are some strong references. The pointer may be dangling,
unaligned or even `null` otherwise.

# Examples

```rust
use std::sync::Arc;
use std::ptr;

let strong = Arc::new("hello".to_owned());
let weak = Arc::downgrade(&strong);
// Both point to the same object
assert!(ptr::eq(&*strong, weak.as_ptr()));
// The strong here keeps it alive, so we can still access the object.
assert_eq!("hello", unsafe { &*weak.as_ptr() });

drop(strong);
// But not any more. We can do weak.as_ptr(), but accessing the pointer would lead to
// undefined behavior.
// assert_eq!("hello", unsafe { &*weak.as_ptr() });
```

## Weak::upgrade

```rust
pub fn upgrade(&self) -> Option<Arc<T, A>> where A: AllocatorClone,
```

Attempts to upgrade the `Weak` pointer to an `Arc`, delaying
dropping of the inner value if successful.

Returns `None` in the following cases:

1. The inner value has since been dropped or moved out.

2. This `Weak` does not point to an allocation.

3. The owning reference this `Weak` is associated with is either not fully-constructed or does not allow an upgrade.

# Examples

```rust
use std::sync::Arc;

let five = Arc::new(5);

let weak_five = Arc::downgrade(&five);

let strong_five: Option<Arc<_>> = weak_five.upgrade();
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

Gets the number of strong (`Arc`) pointers pointing to this allocation.

If `self` was created using `Weak::new`, this will return 0.

## Weak::weak_count

```rust
pub fn weak_count(&self) -> usize
```

Gets an approximation of the number of `Weak` pointers pointing to this
allocation.

If `self` was created using `Weak::new`, or if there are no remaining
strong pointers, this will return 0.

# Accuracy

Due to implementation details, the returned value can be off by 1 in
either direction when other threads are manipulating any `Arc`s or
`Weak`s pointing to the same allocation.

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
use std::sync::Arc;

let first_rc = Arc::new(5);
let first = Arc::downgrade(&first_rc);
let second = Arc::downgrade(&first_rc);

assert!(first.ptr_eq(&second));

let third_rc = Arc::new(5);
let third = Arc::downgrade(&third_rc);

assert!(!first.ptr_eq(&third));
```

Comparing `Weak::new`.

```rust
use std::sync::{Arc, Weak};

let first = Weak::new();
let second = Weak::new();
assert!(first.ptr_eq(&second));

let third_rc = Arc::new(());
let third = Arc::downgrade(&third_rc);
assert!(!first.ptr_eq(&third));
```
