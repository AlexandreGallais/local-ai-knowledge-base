---
title: "core::sync::atomic (part 4 of 6)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/sync/atomic.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::sync::atomic (part 4 of 6)

## AtomicPtr::compare_exchange

```rust
pub fn compare_exchange( &self, current: *mut T, new: *mut T, success: Ordering, failure: Ordering, ) -> Result<*mut T, *mut T>
```

Stores a value into the pointer if the current value is the same as the `current` value.

The return value is a result indicating whether the new value was written and containing
the previous value. On success this value is guaranteed to be equal to `current`.

`compare_exchange` takes two `Ordering` arguments to describe the memory
ordering of this operation. `success` describes the required ordering for the
read-modify-write operation that takes place if the comparison with `current` succeeds.
`failure` describes the required ordering for the load operation that takes place when
the comparison fails. Using `Acquire` as success ordering makes the store part
of this operation `Relaxed`, and using `Release` makes the successful load
`Relaxed`. The failure ordering can only be `SeqCst`, `Acquire` or `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let ptr = &mut 5;
let some_ptr = AtomicPtr::new(ptr);

let other_ptr = &mut 10;

let value = some_ptr.compare_exchange(ptr, other_ptr,
                                      Ordering::SeqCst, Ordering::Relaxed);
```

# Considerations

`compare_exchange` is a [compare-and-swap operation] and thus exhibits the usual downsides
of CAS operations. In particular, a load of the value followed by a successful
`compare_exchange` with the previous load *does not ensure* that other threads have not
changed the value in the interim. This is usually important when the *equality* check in
the `compare_exchange` is being used to check the *identity* of a value, but equality
does not necessarily imply identity. This is a particularly common case for pointers, as
a pointer holding the same address does not imply that the same object exists at that
address! In this case, `compare_exchange` can lead to the [ABA problem].

## AtomicPtr::compare_exchange_weak

```rust
pub fn compare_exchange_weak( &self, current: *mut T, new: *mut T, success: Ordering, failure: Ordering, ) -> Result<*mut T, *mut T>
```

Stores a value into the pointer if the current value is the same as the `current` value.

Unlike `AtomicPtr::compare_exchange`, this function is allowed to spuriously fail even when the
comparison succeeds, which can result in more efficient code on some platforms. The
return value is a result indicating whether the new value was written and containing the
previous value.

`compare_exchange_weak` takes two `Ordering` arguments to describe the memory
ordering of this operation. `success` describes the required ordering for the
read-modify-write operation that takes place if the comparison with `current` succeeds.
`failure` describes the required ordering for the load operation that takes place when
the comparison fails. Using `Acquire` as success ordering makes the store part
of this operation `Relaxed`, and using `Release` makes the successful load
`Relaxed`. The failure ordering can only be `SeqCst`, `Acquire` or `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let some_ptr = AtomicPtr::new(&mut 5);

let new = &mut 10;
let mut old = some_ptr.load(Ordering::Relaxed);
loop {
    match some_ptr.compare_exchange_weak(old, new, Ordering::SeqCst, Ordering::Relaxed) {
        Ok(_) => break,
        Err(x) => old = x,
    }
}
```

# Considerations

`compare_exchange` is a [compare-and-swap operation] and thus exhibits the usual downsides
of CAS operations. In particular, a load of the value followed by a successful
`compare_exchange` with the previous load *does not ensure* that other threads have not
changed the value in the interim. This is usually important when the *equality* check in
the `compare_exchange` is being used to check the *identity* of a value, but equality
does not necessarily imply identity. This is a particularly common case for pointers, as
a pointer holding the same address does not imply that the same object exists at that
address! In this case, `compare_exchange` can lead to the [ABA problem].

## AtomicPtr::fetch_update

```rust
pub fn fetch_update<F>( &self, set_order: Ordering, fetch_order: Ordering, f: F, ) -> Result<*mut T, *mut T> where F: FnMut(*mut T) -> Option<*mut T>,
```

An alias for `AtomicPtr::try_update`.

## AtomicPtr::try_update

```rust
pub fn try_update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut(*mut T) -> Option<*mut T>, ) -> Result<*mut T, *mut T>
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
orderings of `AtomicPtr::compare_exchange` respectively.

Using `Acquire` as success ordering makes the store part of this
operation `Relaxed`, and using `Release` makes the final successful
load `Relaxed`. The (failed) load ordering can only be `SeqCst`,
`Acquire` or `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Considerations

This method is not magic; it is not provided by the hardware, and does not act like a
critical section or mutex.

It is implemented on top of an atomic [compare-and-swap operation], and thus is subject to
the usual drawbacks of CAS operations. In particular, be careful of the [ABA problem],
which is a particularly common pitfall for pointers!

# Examples

```rust
use std::sync::atomic::{AtomicPtr, Ordering};

let ptr: *mut _ = &mut 5;
let some_ptr = AtomicPtr::new(ptr);

let new: *mut _ = &mut 10;
assert_eq!(some_ptr.try_update(Ordering::SeqCst, Ordering::SeqCst, |_| None), Err(ptr));
let result = some_ptr.try_update(Ordering::SeqCst, Ordering::SeqCst, |x| {
    if x == ptr {
        Some(new)
    } else {
        None
    }
});
assert_eq!(result, Ok(ptr));
assert_eq!(some_ptr.load(Ordering::SeqCst), new);
```

## AtomicPtr::update

```rust
pub fn update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut(*mut T) -> *mut T, ) -> *mut T
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
orderings of `AtomicPtr::compare_exchange` respectively.

Using `Acquire` as success ordering makes the store part
of this operation `Relaxed`, and using `Release` makes the final successful load
`Relaxed`. The (failed) load ordering can only be `SeqCst`, `Acquire` or `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Considerations

This method is not magic; it is not provided by the hardware, and does not act like a
critical section or mutex.

It is implemented on top of an atomic [compare-and-swap operation], and thus is subject to
the usual drawbacks of CAS operations. In particular, be careful of the [ABA problem],
which is a particularly common pitfall for pointers!

# Examples

```rust

use std::sync::atomic::{AtomicPtr, Ordering};

let ptr: *mut _ = &mut 5;
let some_ptr = AtomicPtr::new(ptr);

let new: *mut _ = &mut 10;
let result = some_ptr.update(Ordering::SeqCst, Ordering::SeqCst, |_| new);
assert_eq!(result, ptr);
assert_eq!(some_ptr.load(Ordering::SeqCst), new);
```

## AtomicPtr::fetch_ptr_add

```rust
pub fn fetch_ptr_add(&self, val: usize, order: Ordering) -> *mut T
```

Offsets the pointer's address by adding `val` (in units of `T`),
returning the previous pointer.

This is equivalent to using `wrapping_add` to atomically perform the
equivalent of `ptr = ptr.wrapping_add(val);`.

This method operates in units of `T`, which means that it cannot be used
to offset the pointer by an amount which is not a multiple of
`size_of::<T>()`. This can sometimes be inconvenient, as you may want to
work with a deliberately misaligned pointer. In such cases, you may use
the `fetch_byte_add` method instead.

`fetch_ptr_add` takes an `Ordering` argument which describes the
memory ordering of this operation. All ordering modes are possible. Note
that using `Acquire` makes the store part of this operation
`Relaxed`, and using `Release` makes the load part `Relaxed`.

**Note**: This method is only available on platforms that support atomic
operations on `AtomicPtr`.

# Examples

```rust
use core::sync::atomic::{AtomicPtr, Ordering};

let atom = AtomicPtr::<i64>::new(core::ptr::null_mut());
assert_eq!(atom.fetch_ptr_add(1, Ordering::Relaxed).addr(), 0);
// Note: units of `size_of::<i64>()`.
assert_eq!(atom.load(Ordering::Relaxed).addr(), 8);
```

## AtomicPtr::fetch_ptr_sub

```rust
pub fn fetch_ptr_sub(&self, val: usize, order: Ordering) -> *mut T
```

Offsets the pointer's address by subtracting `val` (in units of `T`),
returning the previous pointer.

This is equivalent to using `wrapping_sub` to atomically perform the
equivalent of `ptr = ptr.wrapping_sub(val);`.

This method operates in units of `T`, which means that it cannot be used
to offset the pointer by an amount which is not a multiple of
`size_of::<T>()`. This can sometimes be inconvenient, as you may want to
work with a deliberately misaligned pointer. In such cases, you may use
the `fetch_byte_sub` method instead.

`fetch_ptr_sub` takes an `Ordering` argument which describes the memory
ordering of this operation. All ordering modes are possible. Note that
using `Acquire` makes the store part of this operation `Relaxed`,
and using `Release` makes the load part `Relaxed`.

**Note**: This method is only available on platforms that support atomic
operations on `AtomicPtr`.

# Examples

```rust
use core::sync::atomic::{AtomicPtr, Ordering};

let array = [1i32, 2i32];
let atom = AtomicPtr::new(array.as_ptr().wrapping_add(1) as *mut _);

assert!(core::ptr::eq(
    atom.fetch_ptr_sub(1, Ordering::Relaxed),
    &array[1],
));
assert!(core::ptr::eq(atom.load(Ordering::Relaxed), &array[0]));
```

## AtomicPtr::fetch_byte_add

```rust
pub fn fetch_byte_add(&self, val: usize, order: Ordering) -> *mut T
```

Offsets the pointer's address by adding `val` *bytes*, returning the
previous pointer.

This is equivalent to using `wrapping_byte_add` to atomically
perform `ptr = ptr.wrapping_byte_add(val)`.

`fetch_byte_add` takes an `Ordering` argument which describes the
memory ordering of this operation. All ordering modes are possible. Note
that using `Acquire` makes the store part of this operation
`Relaxed`, and using `Release` makes the load part `Relaxed`.

**Note**: This method is only available on platforms that support atomic
operations on `AtomicPtr`.

# Examples

```rust
use core::sync::atomic::{AtomicPtr, Ordering};

let atom = AtomicPtr::<i64>::new(core::ptr::null_mut());
assert_eq!(atom.fetch_byte_add(1, Ordering::Relaxed).addr(), 0);
// Note: in units of bytes, not `size_of::<i64>()`.
assert_eq!(atom.load(Ordering::Relaxed).addr(), 1);
```

## AtomicPtr::fetch_byte_sub

```rust
pub fn fetch_byte_sub(&self, val: usize, order: Ordering) -> *mut T
```

Offsets the pointer's address by subtracting `val` *bytes*, returning the
previous pointer.

This is equivalent to using `wrapping_byte_sub` to atomically
perform `ptr = ptr.wrapping_byte_sub(val)`.

`fetch_byte_sub` takes an `Ordering` argument which describes the
memory ordering of this operation. All ordering modes are possible. Note
that using `Acquire` makes the store part of this operation
`Relaxed`, and using `Release` makes the load part `Relaxed`.

**Note**: This method is only available on platforms that support atomic
operations on `AtomicPtr`.

# Examples

```rust
use core::sync::atomic::{AtomicPtr, Ordering};

let mut arr = [0i64, 1];
let atom = AtomicPtr::<i64>::new(&raw mut arr[1]);
assert_eq!(atom.fetch_byte_sub(8, Ordering::Relaxed).addr(), (&raw const arr[1]).addr());
assert_eq!(atom.load(Ordering::Relaxed).addr(), (&raw const arr[0]).addr());
```

## AtomicPtr::fetch_or

```rust
pub fn fetch_or(&self, val: usize, order: Ordering) -> *mut T
```

Performs a bitwise "or" operation on the address of the current pointer,
and the argument `val`, and stores a pointer with provenance of the
current pointer and the resulting address.

This is equivalent to using `map_addr` to atomically perform
`ptr = ptr.map_addr(|a| a | val)`. This can be used in tagged
pointer schemes to atomically set tag bits.

**Caveat**: This operation returns the previous value. To compute the
stored value without losing provenance, you may use `map_addr`. For
example: `a.fetch_or(val).map_addr(|a| a | val)`.

`fetch_or` takes an `Ordering` argument which describes the memory
ordering of this operation. All ordering modes are possible. Note that
using `Acquire` makes the store part of this operation `Relaxed`,
and using `Release` makes the load part `Relaxed`.

**Note**: This method is only available on platforms that support atomic
operations on `AtomicPtr`.

This API and its claimed semantics are part of the Strict Provenance
experiment, see the module documentation for `ptr` for
details.

# Examples

```rust
use core::sync::atomic::{AtomicPtr, Ordering};

let pointer = &mut 3i64 as *mut i64;

let atom = AtomicPtr::<i64>::new(pointer);
// Tag the bottom bit of the pointer.
assert_eq!(atom.fetch_or(1, Ordering::Relaxed).addr() & 1, 0);
// Extract and untag.
let tagged = atom.load(Ordering::Relaxed);
assert_eq!(tagged.addr() & 1, 1);
assert_eq!(tagged.map_addr(|p| p & !1), pointer);
```
