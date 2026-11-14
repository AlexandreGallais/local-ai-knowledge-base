---
title: "alloc::rc (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/rc.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::rc (part 2 of 3)

## Rc::assume_init

```rust
pub unsafe fn assume_init(self) -> Rc<[T], A>
```

Converts to `Rc<[T]>`.

# Safety

As with `MaybeUninit::assume_init`,
it is up to the caller to guarantee that the inner value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

# Examples

```rust
use std::rc::Rc;

let mut values = Rc::<[u32]>::new_uninit_slice(3);

// Deferred initialization:
let data = Rc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```

## Rc::from_raw

```rust
pub unsafe fn from_raw(ptr: *const T) -> Self
```

Constructs an `Rc<T>` from a raw pointer.

The raw pointer must have been previously returned by a call to
`Rc::into_raw`[into_raw] or `Rc::into_raw_with_allocator`[into_raw_with_allocator].

# Safety

* Creating a `Rc<T>` from a pointer other than one returned from
  `Rc::into_raw`[into_raw] or `Rc::into_raw_with_allocator`[into_raw_with_allocator]
  is undefined behavior.
* If `U` is sized, it must have the same size and alignment as `T`. This
  is trivially true if `U` is `T`.
* If `U` is unsized, its data pointer must have the same size and
  alignment as `T`. This is trivially true if `Rc` was constructed
  through `Rc<T>` and then converted to `Rc` through an [unsized
  coercion].
* Note that if `U` or `U`'s data pointer is not `T` but has the same size
  and alignment, this is basically like transmuting references of
  different types. See `mem::transmute`[transmute] for more information
  on what restrictions apply in this case.
* The raw pointer must point to a block of memory allocated by the global allocator
* The user of `from_raw` has to make sure a specific value of `T` is only
  dropped once.

This function is unsafe because improper use may lead to memory unsafety,
even if the returned `Rc<T>` is never accessed.

# Examples

```rust
use std::rc::Rc;

let x = Rc::new("hello".to_owned());
let x_ptr = Rc::into_raw(x);

unsafe {
    // Convert back to an `Rc` to prevent leak.
    let x = Rc::from_raw(x_ptr);
    assert_eq!(&*x, "hello");

    // Further calls to `Rc::from_raw(x_ptr)` would be memory-unsafe.
}

// The memory was freed when `x` went out of scope above, so `x_ptr` is now dangling!
```

Convert a slice back into its original array:

```rust
use std::rc::Rc;

let x: Rc<[u32]> = Rc::new([1, 2, 3]);
let x_ptr: *const [u32] = Rc::into_raw(x);

unsafe {
    let x: Rc<[u32; 3]> = Rc::from_raw(x_ptr.cast::<[u32; 3]>());
    assert_eq!(&*x, &[1, 2, 3]);
}
```

## Rc::into_raw

```rust
pub fn into_raw(this: Self) -> *const T
```

Consumes the `Rc`, returning the wrapped pointer.

To avoid a memory leak the pointer must be converted back to an `Rc` using
`Rc::from_raw`.

# Examples

```rust
use std::rc::Rc;

let x = Rc::new("hello".to_owned());
let x_ptr = Rc::into_raw(x);
assert_eq!(unsafe { &*x_ptr }, "hello");
```

## Rc::increment_strong_count

```rust
pub unsafe fn increment_strong_count(ptr: *const T)
```

Increments the strong reference count on the `Rc<T>` associated with the
provided pointer by one.

# Safety

The pointer must have been obtained through `Rc::into_raw` and must satisfy the
same layout requirements specified in `Rc::from_raw_in`.
The associated `Rc` instance must be valid (i.e. the strong count must be at
least 1) for the duration of this method, and `ptr` must point to a block of memory
allocated by the global allocator.

# Examples

```rust
use std::rc::Rc;

let five = Rc::new(5);

unsafe {
    let ptr = Rc::into_raw(five);
    Rc::increment_strong_count(ptr);

    let five = Rc::from_raw(ptr);
    assert_eq!(2, Rc::strong_count(&five));
}
```

## Rc::decrement_strong_count

```rust
pub unsafe fn decrement_strong_count(ptr: *const T)
```

Decrements the strong reference count on the `Rc<T>` associated with the
provided pointer by one.

# Safety

The pointer must have been obtained through `Rc::into_raw` and must satisfy the
same layout requirements specified in `Rc::from_raw_in`[from_raw_in].
The associated `Rc` instance must be valid (i.e. the strong count must be at
least 1) when invoking this method, and `ptr` must point to a block of memory
allocated by the global allocator. This method can be used to release the final `Rc` and
backing storage, but **should not** be called after the final `Rc` has been released.

# Examples

```rust
use std::rc::Rc;

let five = Rc::new(5);

unsafe {
    let ptr = Rc::into_raw(five);
    Rc::increment_strong_count(ptr);

    let five = Rc::from_raw(ptr);
    assert_eq!(2, Rc::strong_count(&five));
    Rc::decrement_strong_count(ptr);
    assert_eq!(1, Rc::strong_count(&five));
}
```

## Rc::as_ptr

```rust
pub fn as_ptr(this: &Self) -> *const T
```

Provides a raw pointer to the data.

The counts are not affected in any way and the `Rc` is not consumed. The pointer is valid
for as long as there are strong counts in the `Rc`.

# Examples

```rust
use std::rc::Rc;

let x = Rc::new(0);
let y = Rc::clone(&x);
let x_ptr = Rc::as_ptr(&x);
assert_eq!(x_ptr, Rc::as_ptr(&y));
assert_eq!(unsafe { *x_ptr }, 0);
```

## Rc::downgrade

```rust
pub fn downgrade(this: &Self) -> Weak<T, A> where A: AllocatorClone,
```

Creates a new `Weak` pointer to this allocation.

# Examples

```rust
use std::rc::Rc;

let five = Rc::new(5);

let weak_five = Rc::downgrade(&five);
```

## Rc::weak_count

```rust
pub fn weak_count(this: &Self) -> usize
```

Gets the number of `Weak` pointers to this allocation.

# Examples

```rust
use std::rc::Rc;

let five = Rc::new(5);
let _weak_five = Rc::downgrade(&five);

assert_eq!(1, Rc::weak_count(&five));
```

## Rc::strong_count

```rust
pub fn strong_count(this: &Self) -> usize
```

Gets the number of strong (`Rc`) pointers to this allocation.

# Examples

```rust
use std::rc::Rc;

let five = Rc::new(5);
let _also_five = Rc::clone(&five);

assert_eq!(2, Rc::strong_count(&five));
```

## Rc::get_mut

```rust
pub fn get_mut(this: &mut Self) -> Option<&mut T>
```

Returns a mutable reference into the given `Rc`, if there are
no other `Rc` or `Weak` pointers to the same allocation.

Returns `None` otherwise, because it is not safe to
mutate a shared value.

See also `make_mut`[make_mut], which will `clone`[clone]
the inner value when there are other `Rc` pointers.

# Examples

```rust
use std::rc::Rc;

let mut x = Rc::new(3);
*Rc::get_mut(&mut x).unwrap() = 4;
assert_eq!(*x, 4);

let _y = Rc::clone(&x);
assert!(Rc::get_mut(&mut x).is_none());
```

## Rc::ptr_eq

```rust
pub fn ptr_eq(this: &Self, other: &Self) -> bool
```

Returns `true` if the two `Rc`s point to the same allocation in a vein similar to
`ptr::eq`. This function ignores the metadata of  `dyn Trait` pointers.

# Examples

```rust
use std::rc::Rc;

let five = Rc::new(5);
let same_five = Rc::clone(&five);
let other_five = Rc::new(5);

assert!(Rc::ptr_eq(&five, &same_five));
assert!(!Rc::ptr_eq(&five, &other_five));
```

## Rc::make_mut

```rust
pub fn make_mut(this: &mut Self) -> &mut T
```

Makes a mutable reference into the given `Rc`.

If there are other `Rc` pointers to the same allocation, then `make_mut` will
`clone` the inner value to a new allocation to ensure unique ownership.  This is also
referred to as clone-on-write.

However, if there are no other `Rc` pointers to this allocation, but some `Weak`
pointers, then the `Weak` pointers will be disassociated and the inner value will not
be cloned.

See also `get_mut`, which will fail rather than cloning the inner value
or disassociating `Weak` pointers.

# Examples

```rust
use std::rc::Rc;

let mut data = Rc::new(5);

*Rc::make_mut(&mut data) += 1;         // Won't clone anything
let mut other_data = Rc::clone(&data); // Won't clone inner data
*Rc::make_mut(&mut data) += 1;         // Clones inner data
*Rc::make_mut(&mut data) += 1;         // Won't clone anything
*Rc::make_mut(&mut other_data) *= 2;   // Won't clone anything

// Now `data` and `other_data` point to different allocations.
assert_eq!(*data, 8);
assert_eq!(*other_data, 12);
```

`Weak` pointers will be disassociated:

```rust
use std::rc::Rc;

let mut data = Rc::new(75);
let weak = Rc::downgrade(&data);

assert!(75 == *data);
assert!(75 == *weak.upgrade().unwrap());

*Rc::make_mut(&mut data) += 1;

assert!(76 == *data);
assert!(weak.upgrade().is_none());
```

## Rc::unwrap_or_clone

```rust
pub fn unwrap_or_clone(this: Self) -> T
```

If we have the only reference to `T` then unwrap it. Otherwise, clone `T` and return the
clone.

Assuming `rc_t` is of type `Rc<T>`, this function is functionally equivalent to
`(*rc_t).clone()`, but will avoid cloning the inner value where possible.

# Examples

```rust
let inner = String::from("test");
let ptr = inner.as_ptr();

let rc = Rc::new(inner);
let inner = Rc::unwrap_or_clone(rc);
// The inner value was not cloned
assert!(ptr::eq(ptr, inner.as_ptr()));

let rc = Rc::new(inner);
let rc2 = rc.clone();
let inner = Rc::unwrap_or_clone(rc);
// Because there were 2 references, we had to clone the inner value.
assert!(!ptr::eq(ptr, inner.as_ptr()));
// `rc2` is the last reference, so when we unwrap it we get back
// the original `String`.
let inner = Rc::unwrap_or_clone(rc2);
assert!(ptr::eq(ptr, inner.as_ptr()));
```

## Rc::downcast

```rust
pub fn downcast<T: Any>(self) -> Result<Rc<T, A>, Self>
```

Attempts to downcast the `Rc<dyn Any>` to a concrete type.

# Examples

```rust
use std::any::Any;
use std::rc::Rc;

fn print_if_string(value: Rc<dyn Any>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}

let my_string = "Hello World".to_string();
print_if_string(Rc::new(my_string));
print_if_string(Rc::new(0i8));
```

## struct Weak

```rust
pub struct Weak< T: ?Sized, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

`Weak` is a version of `Rc` that holds a non-owning reference to the
managed allocation.

The allocation is accessed by calling `upgrade` on the `Weak`
pointer, which returns an <code>[Option]<[Rc]\<T>></code>.

Since a `Weak` reference does not count towards ownership, it will not
prevent the value stored in the allocation from being dropped, and `Weak` itself makes no
guarantees about the value still being present. Thus it may return `None`
when `upgrade`d. Note however that a `Weak` reference *does* prevent the allocation
itself (the backing store) from being deallocated.

A `Weak` pointer is useful for keeping a temporary reference to the allocation
managed by `Rc` without preventing its inner value from being dropped. It is also used to
prevent circular references between `Rc` pointers, since mutual owning references
would never allow either `Rc` to be dropped. For example, a tree could
have strong `Rc` pointers from parent nodes to children, and `Weak`
pointers from children back to their parents.

The typical way to obtain a `Weak` pointer is to call `Rc::downgrade`.

## Weak::new

```rust
pub const fn new() -> Weak<T>
```

Constructs a new `Weak<T>`, without allocating any memory.
Calling `upgrade` on the return value always gives `None`.

# Examples

```rust
use std::rc::Weak;

let empty: Weak<i64> = Weak::new();
assert!(empty.upgrade().is_none());
```

## Weak::from_raw

```rust
pub unsafe fn from_raw(ptr: *const T) -> Self
```

Converts a raw pointer previously created by `into_raw` back into `Weak<T>`.

This can be used to safely get a strong reference (by calling `upgrade`
later) or to deallocate the weak count by dropping the `Weak<T>`.

It takes ownership of one weak reference (with the exception of pointers created by `new`,
as these don't own anything; the method still works on them).

# Safety

The pointer must have originated from the `into_raw` and must still own its potential
weak reference, and `ptr` must point to a block of memory allocated by the global allocator.

It is allowed for the strong count to be 0 at the time of calling this. Nevertheless, this
takes ownership of one weak reference currently represented as a raw pointer (the weak
count is not modified by this operation) and therefore it must be paired with a previous
call to `into_raw`.

# Examples

```rust
use std::rc::{Rc, Weak};

let strong = Rc::new("hello".to_owned());

let raw_1 = Rc::downgrade(&strong).into_raw();
let raw_2 = Rc::downgrade(&strong).into_raw();

assert_eq!(2, Rc::weak_count(&strong));

assert_eq!("hello", &*unsafe { Weak::from_raw(raw_1) }.upgrade().unwrap());
assert_eq!(1, Rc::weak_count(&strong));

drop(strong);

// Decrement the last weak count.
assert!(unsafe { Weak::from_raw(raw_2) }.upgrade().is_none());
```

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
use std::rc::{Rc, Weak};

let strong = Rc::new("hello".to_owned());
let weak = Rc::downgrade(&strong);
let raw = weak.into_raw();

assert_eq!(1, Rc::weak_count(&strong));
assert_eq!("hello", unsafe { &*raw });

drop(unsafe { Weak::from_raw(raw) });
assert_eq!(0, Rc::weak_count(&strong));
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
use std::rc::Rc;
use std::ptr;

let strong = Rc::new("hello".to_owned());
let weak = Rc::downgrade(&strong);
// Both point to the same object
assert!(ptr::eq(&*strong, weak.as_ptr()));
// The strong here keeps it alive, so we can still access the object.
assert_eq!("hello", unsafe { &*weak.as_ptr() });

drop(strong);
// But not any more. We can do weak.as_ptr(), but accessing the pointer would lead to
// undefined behavior.
// assert_eq!("hello", unsafe { &*weak.as_ptr() });
```
