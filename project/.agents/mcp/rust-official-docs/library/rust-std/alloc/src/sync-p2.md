---
title: "alloc::sync (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/sync.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::sync (part 2 of 3)

## Arc::map

```rust
pub fn map<U>(this: Self, f: impl FnOnce(&T) -> U) -> Arc<U, A>
```

Maps the value in an `Arc`, reusing the allocation if possible.

`f` is called on a reference to the value in the `Arc`, and the result is returned, also in
an `Arc`.

Note: this is an associated function, which means that you have
to call it as `Arc::map(a, f)` instead of `r.map(a)`. This
is so that there is no conflict with a method on the inner type.

# Examples

```rust
use std::sync::Arc;

let r = Arc::new(7);
let new = Arc::map(r, |i| i + 7);
assert_eq!(*new, 14);
```

## Arc::new_uninit_slice

```rust
pub fn new_uninit_slice(len: usize) -> Arc<[mem::MaybeUninit<T>]>
```

Constructs a new atomically reference-counted slice with uninitialized contents.

# Examples

```rust
use std::sync::Arc;

let mut values = Arc::<[u32]>::new_uninit_slice(3);

// Deferred initialization:
let data = Arc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```

## Arc::new_zeroed_slice

```rust
pub fn new_zeroed_slice(len: usize) -> Arc<[mem::MaybeUninit<T>]>
```

Constructs a new atomically reference-counted slice with uninitialized contents, with the memory being
filled with `0` bytes.

See `MaybeUninit::zeroed`[zeroed] for examples of correct and
incorrect usage of this method.

# Examples

```rust
use std::sync::Arc;

let values = Arc::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])
```

## Arc::assume_init

```rust
pub unsafe fn assume_init(self) -> Arc<T, A>
```

Converts to `Arc<T>`.

# Safety

As with `MaybeUninit::assume_init`,
it is up to the caller to guarantee that the inner value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

# Examples

```rust
use std::sync::Arc;

let mut five = Arc::<u32>::new_uninit();

// Deferred initialization:
Arc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```

## Arc::assume_init

```rust
pub unsafe fn assume_init(self) -> Arc<[T], A>
```

Converts to `Arc<[T]>`.

# Safety

As with `MaybeUninit::assume_init`,
it is up to the caller to guarantee that the inner value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

# Examples

```rust
use std::sync::Arc;

let mut values = Arc::<[u32]>::new_uninit_slice(3);

// Deferred initialization:
let data = Arc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```

## Arc::from_raw

```rust
pub unsafe fn from_raw(ptr: *const T) -> Self
```

Constructs an `Arc<T>` from a raw pointer.

The raw pointer must have been previously returned by a call to
`Arc::into_raw`[into_raw] or `Arc::into_raw_with_allocator`[into_raw_with_allocator].

# Safety

* Creating a `Arc<T>` from a pointer other than one returned from
  `Arc::into_raw`[into_raw] or `Arc::into_raw_with_allocator`[into_raw_with_allocator]
  is undefined behavior.
* If `U` is sized, it must have the same size and alignment as `T`. This
  is trivially true if `U` is `T`.
* If `U` is unsized, its data pointer must have the same size and
  alignment as `T`. This is trivially true if `Arc` was constructed
  through `Arc<T>` and then converted to `Arc` through an [unsized
  coercion].
* Note that if `U` or `U`'s data pointer is not `T` but has the same size
  and alignment, this is basically like transmuting references of
  different types. See `mem::transmute`[transmute] for more information
  on what restrictions apply in this case.
* The raw pointer must point to a block of memory allocated by the global allocator.
* The user of `from_raw` has to make sure a specific value of `T` is only
  dropped once.

This function is unsafe because improper use may lead to memory unsafety,
even if the returned `Arc<T>` is never accessed.

# Examples

```rust
use std::sync::Arc;

let x = Arc::new("hello".to_owned());
let x_ptr = Arc::into_raw(x);

unsafe {
    // Convert back to an `Arc` to prevent leak.
    let x = Arc::from_raw(x_ptr);
    assert_eq!(&*x, "hello");

    // Further calls to `Arc::from_raw(x_ptr)` would be memory-unsafe.
}

// The memory was freed when `x` went out of scope above, so `x_ptr` is now dangling!
```

Convert a slice back into its original array:

```rust
use std::sync::Arc;

let x: Arc<[u32]> = Arc::new([1, 2, 3]);
let x_ptr: *const [u32] = Arc::into_raw(x);

unsafe {
    let x: Arc<[u32; 3]> = Arc::from_raw(x_ptr.cast::<[u32; 3]>());
    assert_eq!(&*x, &[1, 2, 3]);
}
```

## Arc::into_raw

```rust
pub fn into_raw(this: Self) -> *const T
```

Consumes the `Arc`, returning the wrapped pointer.

To avoid a memory leak the pointer must be converted back to an `Arc` using
`Arc::from_raw`.

# Examples

```rust
use std::sync::Arc;

let x = Arc::new("hello".to_owned());
let x_ptr = Arc::into_raw(x);
assert_eq!(unsafe { &*x_ptr }, "hello");
```

## Arc::increment_strong_count

```rust
pub unsafe fn increment_strong_count(ptr: *const T)
```

Increments the strong reference count on the `Arc<T>` associated with the
provided pointer by one.

# Safety

The pointer must have been obtained through `Arc::into_raw` and must satisfy the
same layout requirements specified in `Arc::from_raw_in`[from_raw_in].
The associated `Arc` instance must be valid (i.e. the strong count must be at
least 1) for the duration of this method, and `ptr` must point to a block of memory
allocated by the global allocator.

# Examples

```rust
use std::sync::Arc;

let five = Arc::new(5);

unsafe {
    let ptr = Arc::into_raw(five);
    Arc::increment_strong_count(ptr);

    // This assertion is deterministic because we haven't shared
    // the `Arc` between threads.
    let five = Arc::from_raw(ptr);
    assert_eq!(2, Arc::strong_count(&five));
}
```

## Arc::decrement_strong_count

```rust
pub unsafe fn decrement_strong_count(ptr: *const T)
```

Decrements the strong reference count on the `Arc<T>` associated with the
provided pointer by one.

# Safety

The pointer must have been obtained through `Arc::into_raw` and must satisfy the
same layout requirements specified in `Arc::from_raw_in`[from_raw_in].
The associated `Arc` instance must be valid (i.e. the strong count must be at
least 1) when invoking this method, and `ptr` must point to a block of memory
allocated by the global allocator. This method can be used to release the final
`Arc` and backing storage, but **should not** be called after the final `Arc` has been
released.

# Examples

```rust
use std::sync::Arc;

let five = Arc::new(5);

unsafe {
    let ptr = Arc::into_raw(five);
    Arc::increment_strong_count(ptr);

    // Those assertions are deterministic because we haven't shared
    // the `Arc` between threads.
    let five = Arc::from_raw(ptr);
    assert_eq!(2, Arc::strong_count(&five));
    Arc::decrement_strong_count(ptr);
    assert_eq!(1, Arc::strong_count(&five));
}
```

## Arc::as_ptr

```rust
pub fn as_ptr(this: &Self) -> *const T
```

Provides a raw pointer to the data.

The counts are not affected in any way and the `Arc` is not consumed. The pointer is valid for
as long as there are strong counts in the `Arc`.

# Examples

```rust
use std::sync::Arc;

let x = Arc::new("hello".to_owned());
let y = Arc::clone(&x);
let x_ptr = Arc::as_ptr(&x);
assert_eq!(x_ptr, Arc::as_ptr(&y));
assert_eq!(unsafe { &*x_ptr }, "hello");
```

## Arc::downgrade

```rust
pub fn downgrade(this: &Self) -> Weak<T, A> where A: AllocatorClone,
```

Creates a new `Weak` pointer to this allocation.

# Examples

```rust
use std::sync::Arc;

let five = Arc::new(5);

let weak_five = Arc::downgrade(&five);
```

## Arc::weak_count

```rust
pub fn weak_count(this: &Self) -> usize
```

Gets the number of `Weak` pointers to this allocation.

# Safety

This method by itself is safe, but using it correctly requires extra care.
Another thread can change the weak count at any time,
including potentially between calling this method and acting on the result.

# Examples

```rust
use std::sync::Arc;

let five = Arc::new(5);
let _weak_five = Arc::downgrade(&five);

// This assertion is deterministic because we haven't shared
// the `Arc` or `Weak` between threads.
assert_eq!(1, Arc::weak_count(&five));
```

## Arc::strong_count

```rust
pub fn strong_count(this: &Self) -> usize
```

Gets the number of strong (`Arc`) pointers to this allocation.

# Safety

This method by itself is safe, but using it correctly requires extra care.
Another thread can change the strong count at any time,
including potentially between calling this method and acting on the result.

# Examples

```rust
use std::sync::Arc;

let five = Arc::new(5);
let _also_five = Arc::clone(&five);

// This assertion is deterministic because we haven't shared
// the `Arc` between threads.
assert_eq!(2, Arc::strong_count(&five));
```

## Arc::ptr_eq

```rust
pub fn ptr_eq(this: &Self, other: &Self) -> bool
```

Returns `true` if the two `Arc`s point to the same allocation in a vein similar to
`ptr::eq`. This function ignores the metadata of  `dyn Trait` pointers.

# Examples

```rust
use std::sync::Arc;

let five = Arc::new(5);
let same_five = Arc::clone(&five);
let other_five = Arc::new(5);

assert!(Arc::ptr_eq(&five, &same_five));
assert!(!Arc::ptr_eq(&five, &other_five));
```

## Arc::make_mut

```rust
pub fn make_mut(this: &mut Self) -> &mut T
```

Makes a mutable reference into the given `Arc`.

If there are other `Arc` pointers to the same allocation, then `make_mut` will
`clone` the inner value to a new allocation to ensure unique ownership.  This is also
referred to as clone-on-write.

However, if there are no other `Arc` pointers to this allocation, but some `Weak`
pointers, then the `Weak` pointers will be dissociated and the inner value will not
be cloned.

See also `get_mut`, which will fail rather than cloning the inner value
or dissociating `Weak` pointers.

# Examples

```rust
use std::sync::Arc;

let mut data = Arc::new(5);

*Arc::make_mut(&mut data) += 1;         // Won't clone anything
let mut other_data = Arc::clone(&data); // Won't clone inner data
*Arc::make_mut(&mut data) += 1;         // Clones inner data
*Arc::make_mut(&mut data) += 1;         // Won't clone anything
*Arc::make_mut(&mut other_data) *= 2;   // Won't clone anything

// Now `data` and `other_data` point to different allocations.
assert_eq!(*data, 8);
assert_eq!(*other_data, 12);
```

`Weak` pointers will be dissociated:

```rust
use std::sync::Arc;

let mut data = Arc::new(75);
let weak = Arc::downgrade(&data);

assert!(75 == *data);
assert!(75 == *weak.upgrade().unwrap());

*Arc::make_mut(&mut data) += 1;

assert!(76 == *data);
assert!(weak.upgrade().is_none());
```

## Arc::unwrap_or_clone

```rust
pub fn unwrap_or_clone(this: Self) -> T
```

If we have the only reference to `T` then unwrap it. Otherwise, clone `T` and return the
clone.

Assuming `arc_t` is of type `Arc<T>`, this function is functionally equivalent to
`(*arc_t).clone()`, but will avoid cloning the inner value where possible.

# Examples

```rust
let inner = String::from("test");
let ptr = inner.as_ptr();

let arc = Arc::new(inner);
let inner = Arc::unwrap_or_clone(arc);
// The inner value was not cloned
assert!(ptr::eq(ptr, inner.as_ptr()));

let arc = Arc::new(inner);
let arc2 = arc.clone();
let inner = Arc::unwrap_or_clone(arc);
// Because there were 2 references, we had to clone the inner value.
assert!(!ptr::eq(ptr, inner.as_ptr()));
// `arc2` is the last reference, so when we unwrap it we get back
// the original `String`.
let inner = Arc::unwrap_or_clone(arc2);
assert!(ptr::eq(ptr, inner.as_ptr()));
```

## Arc::get_mut

```rust
pub fn get_mut(this: &mut Self) -> Option<&mut T>
```

Returns a mutable reference into the given `Arc`, if there are
no other `Arc` or `Weak` pointers to the same allocation.

Returns `None` otherwise, because it is not safe to
mutate a shared value.

See also `make_mut`[make_mut], which will `clone`[clone]
the inner value when there are other `Arc` pointers.

# Examples

```rust
use std::sync::Arc;

let mut x = Arc::new(3);
*Arc::get_mut(&mut x).unwrap() = 4;
assert_eq!(*x, 4);

let _y = Arc::clone(&x);
assert!(Arc::get_mut(&mut x).is_none());
```

## Arc::downcast

```rust
pub fn downcast<T>(self) -> Result<Arc<T, A>, Self> where T: Any + Send + Sync,
```

Attempts to downcast the `Arc<dyn Any + Send + Sync>` to a concrete type.

# Examples

```rust
use std::any::Any;
use std::sync::Arc;

fn print_if_string(value: Arc<dyn Any + Send + Sync>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}

let my_string = "Hello World".to_string();
print_if_string(Arc::new(my_string));
print_if_string(Arc::new(0i8));
```

## Weak::new

```rust
pub const fn new() -> Weak<T>
```

Constructs a new `Weak<T>`, without allocating any memory.
Calling `upgrade` on the return value always gives `None`.

# Examples

```rust
use std::sync::Weak;

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
weak reference, and must point to a block of memory allocated by global allocator.

It is allowed for the strong count to be 0 at the time of calling this. Nevertheless, this
takes ownership of one weak reference currently represented as a raw pointer (the weak
count is not modified by this operation) and therefore it must be paired with a previous
call to `into_raw`.
# Examples

```rust
use std::sync::{Arc, Weak};

let strong = Arc::new("hello".to_owned());

let raw_1 = Arc::downgrade(&strong).into_raw();
let raw_2 = Arc::downgrade(&strong).into_raw();

assert_eq!(2, Arc::weak_count(&strong));

assert_eq!("hello", &*unsafe { Weak::from_raw(raw_1) }.upgrade().unwrap());
assert_eq!(1, Arc::weak_count(&strong));

drop(strong);

// Decrement the last weak count.
assert!(unsafe { Weak::from_raw(raw_2) }.upgrade().is_none());
```
