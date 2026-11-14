---
title: "core::sync::atomic (part 3 of 6)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/sync/atomic.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::sync::atomic (part 3 of 6)

## AtomicBool::fetch_not

```rust
pub const fn fetch_not(&self, order: Ordering) -> bool
```

Logical "not" with a boolean value.

Performs a logical "not" operation on the current value, and sets
the new value to the result.

Returns the previous value.

`fetch_not` takes an `Ordering` argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
`Acquire` makes the store part of this operation `Relaxed`, and
using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let foo = AtomicBool::new(true);
assert_eq!(foo.fetch_not(Ordering::SeqCst), true);
assert_eq!(foo.load(Ordering::SeqCst), false);

let foo = AtomicBool::new(false);
assert_eq!(foo.fetch_not(Ordering::SeqCst), false);
assert_eq!(foo.load(Ordering::SeqCst), true);
```

## AtomicBool::as_ptr

```rust
pub const fn as_ptr(&self) -> *mut bool
```

Returns a mutable pointer to the underlying `bool`.

Doing non-atomic reads and writes on the resulting boolean can be a data race.
This method is mostly useful for FFI, where the function signature may use
`*mut bool` instead of `&AtomicBool`.

Returning an `*mut` pointer from a shared reference to this atomic is safe because the
atomic types work with interior mutability. All modifications of an atomic change the value
through a shared reference, and can do so safely as long as they use atomic operations. Any
use of the returned raw pointer requires an `unsafe` block and still has to uphold the
requirements of the [memory model].

# Examples

```
# fn main() {
use std::sync::atomic::AtomicBool;

extern "C" {
    fn my_atomic_op(arg: *mut bool);
}

let mut atomic = AtomicBool::new(true);
unsafe {
    my_atomic_op(atomic.as_ptr());
}
# }
```rust

[memory model]: self#memory-model-for-atomic-accesses

## AtomicBool::fetch_update

```rust
pub fn fetch_update<F>( &self, set_order: Ordering, fetch_order: Ordering, f: F, ) -> Result<bool, bool> where F: FnMut(bool) -> Option<bool>,
```

An alias for `AtomicBool::try_update`.

## AtomicBool::try_update

```rust
pub fn try_update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut(bool) -> Option<bool>, ) -> Result<bool, bool>
```

Fetches the value, and applies a function to it that returns an optional
new value. Returns a `Result` of `Ok(previous_value)` if the function
returned `Some(_)`, else `Err(previous_value)`.

See also: `update`.

Note: This may call the function multiple times if the value has been
changed from other threads in the meantime, as long as the function
returns `Some(_)`, but the function will have been applied only once to
the stored value.

`try_update` takes two `Ordering` arguments to describe the memory
ordering of this operation. The first describes the required ordering for
when the operation finally succeeds while the second describes the
required ordering for loads. These correspond to the success and failure
orderings of `AtomicBool::compare_exchange` respectively.

Using `Acquire` as success ordering makes the store part of this
operation `Relaxed`, and using `Release` makes the final successful
load `Relaxed`. The (failed) load ordering can only be `SeqCst`,
`Acquire` or `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Considerations

This method is not magic; it is not provided by the hardware, and does not act like a
critical section or mutex.

It is implemented on top of an atomic [compare-and-swap operation], and thus is subject to
the usual drawbacks of CAS operations. In particular, be careful of the [ABA problem].

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let x = AtomicBool::new(false);
assert_eq!(x.try_update(Ordering::SeqCst, Ordering::SeqCst, |_| None), Err(false));
assert_eq!(x.try_update(Ordering::SeqCst, Ordering::SeqCst, |x| Some(!x)), Ok(false));
assert_eq!(x.try_update(Ordering::SeqCst, Ordering::SeqCst, |x| Some(!x)), Ok(true));
assert_eq!(x.load(Ordering::SeqCst), false);
```

## AtomicBool::update

```rust
pub fn update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut(bool) -> bool, ) -> bool
```

Fetches the value, and applies a function to it that returns a new value.
The new value is stored and the old value is returned.

See also: `try_update`.

Note: This may call the function multiple times if the value has been changed from other threads in
the meantime, but the function will have been applied only once to the stored value.

`update` takes two `Ordering` arguments to describe the memory
ordering of this operation. The first describes the required ordering for
when the operation finally succeeds while the second describes the
required ordering for loads. These correspond to the success and failure
orderings of `AtomicBool::compare_exchange` respectively.

Using `Acquire` as success ordering makes the store part
of this operation `Relaxed`, and using `Release` makes the final successful load
`Relaxed`. The (failed) load ordering can only be `SeqCst`, `Acquire` or `Relaxed`.

**Note:** This method is only available on platforms that support atomic operations on `u8`.

# Considerations

This method is not magic; it is not provided by the hardware, and does not act like a
critical section or mutex.

It is implemented on top of an atomic [compare-and-swap operation], and thus is subject to
the usual drawbacks of CAS operations. In particular, be careful of the [ABA problem].

# Examples

```rust

use std::sync::atomic::{AtomicBool, Ordering};

let x = AtomicBool::new(false);
assert_eq!(x.update(Ordering::SeqCst, Ordering::SeqCst, |x| !x), false);
assert_eq!(x.update(Ordering::SeqCst, Ordering::SeqCst, |x| !x), true);
assert_eq!(x.load(Ordering::SeqCst), false);
```

## AtomicPtr::new

```rust
pub const fn new(p: *mut T) -> AtomicPtr<T>
```

Creates a new `AtomicPtr`.

# Examples

```rust
use std::sync::atomic::AtomicPtr;

let ptr = &mut 5;
let atomic_ptr = AtomicPtr::new(ptr);
```

## AtomicPtr::from_ptr

```rust
pub const unsafe fn from_ptr<'a>(ptr: *mut *mut T) -> &'a AtomicPtr<T>
```

Creates a new `AtomicPtr` from a pointer.

# Examples

```rust
use std::sync::atomic::{self, AtomicPtr};

// Get a pointer to an allocated value
let ptr: *mut *mut u8 = Box::into_raw(Box::new(std::ptr::null_mut()));

assert!(ptr.cast::<AtomicPtr<u8>>().is_aligned());

{
    // Create an atomic view of the allocated value
    let atomic = unsafe { AtomicPtr::from_ptr(ptr) };

    // Use `atomic` for atomic operations, possibly share it with other threads
    atomic.store(std::ptr::NonNull::dangling().as_ptr(), atomic::Ordering::Relaxed);
}

// It's ok to non-atomically access the value behind `ptr`,
// since the reference to the atomic ended its lifetime in the block above
assert!(!unsafe { *ptr }.is_null());

// Deallocate the value
unsafe { drop(Box::from_raw(ptr)) }
```

# Safety

* `ptr` must be aligned to `align_of::<AtomicPtr<T>>()` (note that on some platforms this
  can be bigger than `align_of::<*mut T>()`).
* `ptr` must be [valid] for both reads and writes for the whole lifetime `'a`.
* You must adhere to the [Memory model for atomic accesses]. In particular, it is not
  allowed to mix conflicting atomic and non-atomic accesses, or atomic accesses of different
  sizes, without synchronization.

## AtomicPtr::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut *mut T
```

Returns a mutable reference to the underlying pointer.

This is safe because the mutable reference guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let mut data = 10;
let mut atomic_ptr = AtomicPtr::new(&mut data);
let mut other_data = 5;
*atomic_ptr.get_mut() = &mut other_data;
assert_eq!(unsafe { *atomic_ptr.load(Ordering::SeqCst) }, 5);
```

## AtomicPtr::from_mut

```rust
pub const fn from_mut(v: &mut *mut T) -> &mut Self
```

Gets atomic access to a pointer.

**Note:** This function is only available on targets where `AtomicPtr<T>` has the same alignment as `*const T`

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let mut data = 123;
let mut some_ptr = &mut data as *mut i32;
let a = AtomicPtr::from_mut(&mut some_ptr);
let mut other_data = 456;
a.store(&mut other_data, Ordering::Relaxed);
assert_eq!(unsafe { *some_ptr }, 456);
```

## AtomicPtr::get_mut_slice

```rust
pub const fn get_mut_slice(this: &mut [Self]) -> &mut [*mut T]
```

Gets non-atomic access to a `&mut [AtomicPtr]` slice.

This is safe because the mutable reference guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```
use std::ptr::null_mut;
use std::sync::atomic::{AtomicPtr, Ordering};

let mut some_ptrs = [const { AtomicPtr::new(null_mut::<String>()) }; 10];

let view: &mut [*mut String] = AtomicPtr::get_mut_slice(&mut some_ptrs);
assert_eq!(view, [null_mut::<String>(); 10]);
view
    .iter_mut()
    .enumerate()
    .for_each(|(i, ptr)| *ptr = Box::into_raw(Box::new(format!("iteration#{i}"))));

std::thread::scope(|s| {
    for ptr in &some_ptrs {
        s.spawn(move || {
            let ptr = ptr.load(Ordering::Relaxed);
            assert!(!ptr.is_null());

            let name = unsafe { Box::from_raw(ptr) };
            println!("Hello, {name}!");
        });
    }
});
```rust

## AtomicPtr::from_mut_slice

```rust
pub const fn from_mut_slice(v: &mut [*mut T]) -> &mut [Self]
```

Gets atomic access to a slice of pointers.

**Note:** This function is only available on targets where `AtomicPtr<T>` has the same alignment as `*const T`

# Examples

```
use std::ptr::null_mut;
use std::sync::atomic::{AtomicPtr, Ordering};

let mut some_ptrs = [null_mut::<String>(); 10];
let a = &*AtomicPtr::from_mut_slice(&mut some_ptrs);
std::thread::scope(|s| {
    for i in 0..a.len() {
        s.spawn(move || {
            let name = Box::new(format!("thread{i}"));
            a[i].store(Box::into_raw(name), Ordering::Relaxed);
        });
    }
});
for p in some_ptrs {
    assert!(!p.is_null());
    let name = unsafe { Box::from_raw(p) };
    println!("Hello, {name}!");
}
```rust

## AtomicPtr::into_inner

```rust
pub const fn into_inner(self) -> *mut T
```

Consumes the atomic and returns the contained value.

This is safe because passing `self` by value guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```rust
use std::sync::atomic::AtomicPtr;

let mut data = 5;
let atomic_ptr = AtomicPtr::new(&mut data);
assert_eq!(unsafe { *atomic_ptr.into_inner() }, 5);
```

## AtomicPtr::load

```rust
pub const fn load(&self, order: Ordering) -> *mut T
```

Loads a value from the pointer.

`load` takes an `Ordering` argument which describes the memory ordering
of this operation. Possible values are `SeqCst`, `Acquire` and `Relaxed`.

# Panics

Panics if `order` is `Release` or `AcqRel`.

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let ptr = &mut 5;
let some_ptr = AtomicPtr::new(ptr);

let value = some_ptr.load(Ordering::Relaxed);
```

## AtomicPtr::store

```rust
pub const fn store(&self, ptr: *mut T, order: Ordering)
```

Stores a value into the pointer.

`store` takes an `Ordering` argument which describes the memory ordering
of this operation. Possible values are `SeqCst`, `Release` and `Relaxed`.

# Panics

Panics if `order` is `Acquire` or `AcqRel`.

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let ptr = &mut 5;
let some_ptr = AtomicPtr::new(ptr);

let other_ptr = &mut 10;

some_ptr.store(other_ptr, Ordering::Relaxed);
```

## AtomicPtr::swap

```rust
pub const fn swap(&self, ptr: *mut T, order: Ordering) -> *mut T
```

Stores a value into the pointer, returning the previous value.

`swap` takes an `Ordering` argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
`Acquire` makes the store part of this operation `Relaxed`, and
using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let ptr = &mut 5;
let some_ptr = AtomicPtr::new(ptr);

let other_ptr = &mut 10;

let value = some_ptr.swap(other_ptr, Ordering::Relaxed);
```

## AtomicPtr::compare_and_swap

```rust
pub fn compare_and_swap(&self, current: *mut T, new: *mut T, order: Ordering) -> *mut T
```

Stores a value into the pointer if the current value is the same as the `current` value.

The return value is always the previous value. If it is equal to `current`, then the value
was updated.

`compare_and_swap` also takes an `Ordering` argument which describes the memory
ordering of this operation. Notice that even when using `AcqRel`, the operation
might fail and hence just perform an `Acquire` load, but not have `Release` semantics.
Using `Acquire` makes the store part of this operation `Relaxed` if it
happens, and using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Migrating to `compare_exchange` and `compare_exchange_weak`

`compare_and_swap` is equivalent to `compare_exchange` with the following mapping for
memory orderings:

Original | Success | Failure
-------- | ------- | -------
Relaxed  | Relaxed | Relaxed
Acquire  | Acquire | Acquire
Release  | Release | Relaxed
AcqRel   | AcqRel  | Acquire
SeqCst   | SeqCst  | SeqCst

`compare_and_swap` and `compare_exchange` also differ in their return type. You can use
`compare_exchange(...).unwrap_or_else(|x| x)` to recover the behavior of `compare_and_swap`,
but in most cases it is more idiomatic to check whether the return value is `Ok` or `Err`
rather than to infer success vs failure based on the value that was read.

During migration, consider whether it makes sense to use `compare_exchange_weak` instead.
`compare_exchange_weak` is allowed to fail spuriously even when the comparison succeeds,
which allows the compiler to generate better assembly code when the compare and swap
is used in a loop.

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let ptr = &mut 5;
let some_ptr = AtomicPtr::new(ptr);

let other_ptr = &mut 10;

let value = some_ptr.compare_and_swap(ptr, other_ptr, Ordering::Relaxed);
```
