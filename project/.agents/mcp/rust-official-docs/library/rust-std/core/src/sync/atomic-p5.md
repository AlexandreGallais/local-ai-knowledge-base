---
title: "core::sync::atomic (part 5 of 6)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/sync/atomic.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::sync::atomic (part 5 of 6)

## AtomicPtr::fetch_and

```rust
pub fn fetch_and(&self, val: usize, order: Ordering) -> *mut T
```

Performs a bitwise "and" operation on the address of the current
pointer, and the argument `val`, and stores a pointer with provenance of
the current pointer and the resulting address.

This is equivalent to using `map_addr` to atomically perform
`ptr = ptr.map_addr(|a| a & val)`. This can be used in tagged
pointer schemes to atomically unset tag bits.

**Caveat**: This operation returns the previous value. To compute the
stored value without losing provenance, you may use `map_addr`. For
example: `a.fetch_and(val).map_addr(|a| a & val)`.

`fetch_and` takes an `Ordering` argument which describes the memory
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
// A tagged pointer
let atom = AtomicPtr::<i64>::new(pointer.map_addr(|a| a | 1));
assert_eq!(atom.fetch_or(1, Ordering::Relaxed).addr() & 1, 1);
// Untag, and extract the previously tagged pointer.
let untagged = atom.fetch_and(!1, Ordering::Relaxed)
    .map_addr(|a| a & !1);
assert_eq!(untagged, pointer);
```

## AtomicPtr::fetch_xor

```rust
pub fn fetch_xor(&self, val: usize, order: Ordering) -> *mut T
```

Performs a bitwise "xor" operation on the address of the current
pointer, and the argument `val`, and stores a pointer with provenance of
the current pointer and the resulting address.

This is equivalent to using `map_addr` to atomically perform
`ptr = ptr.map_addr(|a| a ^ val)`. This can be used in tagged
pointer schemes to atomically toggle tag bits.

**Caveat**: This operation returns the previous value. To compute the
stored value without losing provenance, you may use `map_addr`. For
example: `a.fetch_xor(val).map_addr(|a| a ^ val)`.

`fetch_xor` takes an `Ordering` argument which describes the memory
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

// Toggle a tag bit on the pointer.
atom.fetch_xor(1, Ordering::Relaxed);
assert_eq!(atom.load(Ordering::Relaxed).addr() & 1, 1);
```

## AtomicPtr::as_ptr

```rust
pub const fn as_ptr(&self) -> *mut *mut T
```

Returns a mutable pointer to the underlying pointer.

Doing non-atomic reads and writes on the resulting pointer can be a data race.
This method is mostly useful for FFI, where the function signature may use
`*mut *mut T` instead of `&AtomicPtr<T>`.

Returning an `*mut` pointer from a shared reference to this atomic is safe because the
atomic types work with interior mutability. All modifications of an atomic change the value
through a shared reference, and can do so safely as long as they use atomic operations. Any
use of the returned raw pointer requires an `unsafe` block and still has to uphold the
requirements of the [memory model].

# Examples

```
use std::sync::atomic::AtomicPtr;

extern "C" {
    fn my_atomic_op(arg: *mut *mut u32);
}

let mut value = 17;
let atomic = AtomicPtr::new(&mut value);

// SAFETY: Safe as long as `my_atomic_op` is atomic.
unsafe {
    my_atomic_op(atomic.as_ptr());
}
```rust

[memory model]: self#memory-model-for-atomic-accesses

## atomic_type::new

```rust
pub const fn new(v: $int_type) -> Self
```

```rust

## atomic_type::from_ptr

```rust
pub const unsafe fn from_ptr<'a>(ptr: *mut $int_type) -> &'a $atomic_type
```

* `ptr` must be [valid] for both reads and writes for the whole lifetime `'a`.
* You must adhere to the [Memory model for atomic accesses]. In particular, it is not
  allowed to mix conflicting atomic and non-atomic accesses, or atomic accesses of different
  sizes, without synchronization.

## atomic_type::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut $int_type
```

assert_eq!(*some_var.get_mut(), 10);
*some_var.get_mut() = 5;
assert_eq!(some_var.load(Ordering::SeqCst), 5);
```rust

## atomic_type::from_mut

```rust
pub const fn from_mut(v: &mut $int_type) -> &mut Self
```

a.store(100, Ordering::Relaxed);
assert_eq!(some_int, 100);
```rust

## atomic_type::get_mut_slice

```rust
pub const fn get_mut_slice(this: &mut [Self]) -> &mut [$int_type]
```

assert_eq!(view, [0; 10]);
view
    .iter_mut()
    .enumerate()
    .for_each(|(idx, int)| *int = idx as _);

std::thread::scope(|s| {
    some_ints
        .iter()
        .enumerate()
        .for_each(|(idx, int)| {
            s.spawn(move || assert_eq!(int.load(Ordering::Relaxed), idx as _));
        })
});
```rust

## atomic_type::from_mut_slice

```rust
pub const fn from_mut_slice(v: &mut [$int_type]) -> &mut [Self]
```

std::thread::scope(|s| {
    for i in 0..a.len() {
        s.spawn(move || a[i].store(i as _, Ordering::Relaxed));
    }
});
for (i, n) in some_ints.into_iter().enumerate() {
    assert_eq!(i, n as usize);
}
```rust

## atomic_type::into_inner

```rust
pub const fn into_inner(self) -> $int_type
```

assert_eq!(some_var.into_inner(), 5);
```rust

## atomic_type::load

```rust
pub const fn load(&self, order: Ordering) -> $int_type
```

assert_eq!(some_var.load(Ordering::Relaxed), 5);
```rust

## atomic_type::store

```rust
pub const fn store(&self, val: $int_type, order: Ordering)
```

some_var.store(10, Ordering::Relaxed);
assert_eq!(some_var.load(Ordering::Relaxed), 10);
```rust

## atomic_type::swap

```rust
pub const fn swap(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(some_var.swap(10, Ordering::Relaxed), 5);
```rust

## atomic_type::compare_and_swap

```rust
pub const fn compare_and_swap(&self, current: $int_type, new: $int_type, order: Ordering) -> $int_type
```

assert_eq!(some_var.compare_and_swap(5, 10, Ordering::Relaxed), 5);
assert_eq!(some_var.load(Ordering::Relaxed), 10);

assert_eq!(some_var.compare_and_swap(6, 12, Ordering::Relaxed), 10);
assert_eq!(some_var.load(Ordering::Relaxed), 10);
```rust

## atomic_type::compare_exchange

```rust
pub const fn compare_exchange(&self, current: $int_type, new: $int_type, success: Ordering, failure: Ordering) -> Result<$int_type, $int_type>
```

assert_eq!(some_var.compare_exchange(5, 10,
                                     Ordering::Acquire,
                                     Ordering::Relaxed),
           Ok(5));
assert_eq!(some_var.load(Ordering::Relaxed), 10);

assert_eq!(some_var.compare_exchange(6, 12,
                                     Ordering::SeqCst,
                                     Ordering::Acquire),
           Err(10));
assert_eq!(some_var.load(Ordering::Relaxed), 10);
```rust

`compare_exchange` is a [compare-and-swap operation] and thus exhibits the usual downsides
of CAS operations. In particular, a load of the value followed by a successful
`compare_exchange` with the previous load *does not ensure* that other threads have not
changed the value in the interim! This is usually important when the *equality* check in
the `compare_exchange` is being used to check the *identity* of a value, but equality
does not necessarily imply identity. This is a particularly common case for pointers, as
a pointer holding the same address does not imply that the same object exists at that
address! In this case, `compare_exchange` can lead to the [ABA problem].

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

## atomic_type::compare_exchange_weak

```rust
pub const fn compare_exchange_weak(&self, current: $int_type, new: $int_type, success: Ordering, failure: Ordering) -> Result<$int_type, $int_type>
```

let mut old = val.load(Ordering::Relaxed);
loop {
    let new = old * 2;
    match val.compare_exchange_weak(old, new, Ordering::SeqCst, Ordering::Relaxed) {
        Ok(_) => break,
        Err(x) => old = x,
    }
}
```rust

`compare_exchange` is a [compare-and-swap operation] and thus exhibits the usual downsides
of CAS operations. In particular, a load of the value followed by a successful
`compare_exchange` with the previous load *does not ensure* that other threads have not
changed the value in the interim. This is usually important when the *equality* check in
the `compare_exchange` is being used to check the *identity* of a value, but equality
does not necessarily imply identity. This is a particularly common case for pointers, as
a pointer holding the same address does not imply that the same object exists at that
address! In this case, `compare_exchange` can lead to the [ABA problem].

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

## atomic_type::fetch_add

```rust
pub const fn fetch_add(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_add(10, Ordering::SeqCst), 0);
assert_eq!(foo.load(Ordering::SeqCst), 10);
```rust

## atomic_type::fetch_sub

```rust
pub const fn fetch_sub(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_sub(10, Ordering::SeqCst), 20);
assert_eq!(foo.load(Ordering::SeqCst), 10);
```rust

## atomic_type::fetch_and

```rust
pub const fn fetch_and(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_and(0b110011, Ordering::SeqCst), 0b101101);
assert_eq!(foo.load(Ordering::SeqCst), 0b100001);
```rust

## atomic_type::fetch_nand

```rust
pub const fn fetch_nand(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_nand(0x31, Ordering::SeqCst), 0x13);
assert_eq!(foo.load(Ordering::SeqCst), !(0x13 & 0x31));
```rust

## atomic_type::fetch_or

```rust
pub const fn fetch_or(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_or(0b110011, Ordering::SeqCst), 0b101101);
assert_eq!(foo.load(Ordering::SeqCst), 0b111111);
```rust

## atomic_type::fetch_xor

```rust
pub const fn fetch_xor(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_xor(0b110011, Ordering::SeqCst), 0b101101);
assert_eq!(foo.load(Ordering::SeqCst), 0b011110);
```rust

## atomic_type::fetch_update

```rust
pub fn fetch_update<F>(&self, set_order: Ordering, fetch_order: Ordering, f: F) -> Result<$int_type, $int_type> where F: FnMut($int_type) -> Option<$int_type>
```

.

## atomic_type::try_update

```rust
pub fn try_update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut($int_type) -> Option<$int_type>, ) -> Result<$int_type, $int_type>
```

assert_eq!(x.try_update(Ordering::SeqCst, Ordering::SeqCst, |_| None), Err(7));
assert_eq!(x.try_update(Ordering::SeqCst, Ordering::SeqCst, |x| Some(x + 1)), Ok(7));
assert_eq!(x.try_update(Ordering::SeqCst, Ordering::SeqCst, |x| Some(x + 1)), Ok(8));
assert_eq!(x.load(Ordering::SeqCst), 9);
```rust

## atomic_type::update

```rust
pub fn update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut($int_type) -> $int_type, ) -> $int_type
```

assert_eq!(x.update(Ordering::SeqCst, Ordering::SeqCst, |x| x + 1), 7);
assert_eq!(x.update(Ordering::SeqCst, Ordering::SeqCst, |x| x + 1), 8);
assert_eq!(x.load(Ordering::SeqCst), 9);
```rust

## atomic_type::fetch_max

```rust
pub const fn fetch_max(&self, val: $int_type, order: Ordering) -> $int_type
```

let bar = 42;
let max_foo = foo.fetch_max(bar, Ordering::SeqCst).max(bar);
assert!(max_foo == 42);
```rust

## atomic_type::fetch_min

```rust
pub const fn fetch_min(&self, val: $int_type, order: Ordering) -> $int_type
```

let bar = 12;
let min_foo = foo.fetch_min(bar, Ordering::SeqCst).min(bar);
assert_eq!(min_foo, 12);
```rust

## atomic_type::as_ptr

```rust
pub const fn as_ptr(&self) -> *mut $int_type
```

// SAFETY: Safe as long as `my_atomic_op` is atomic.
unsafe {
    my_atomic_op(atomic.as_ptr());
}
# }
```rust

[memory model]: self#memory-model-for-atomic-accesses

## const ATOMIC_ISIZE_INIT

```rust
pub const ATOMIC_ISIZE_INIT: AtomicIsize = AtomicIsize::new(0)
```

An `AtomicIsize` initialized to `0`.

## const ATOMIC_USIZE_INIT

```rust
pub const ATOMIC_USIZE_INIT: AtomicUsize = AtomicUsize::new(0)
```

An `AtomicUsize` initialized to `0`.

## fn fence

```rust
pub const fn fence(order: Ordering)
```

An atomic fence.

Fences create synchronization between themselves and atomic operations or fences in other
threads. It can be helpful to think of a fence as preventing the compiler and CPU from
reordering certain types of memory operations around it, but that is a simplified model which
fails to capture some of the nuances.

There are 3 different ways to use an atomic fence:

- atomic - fence synchronization: an atomic operation with (at least) `Release` ordering
  semantics synchronizes with a fence with (at least) `Acquire` ordering semantics.
- fence - atomic synchronization: a fence with (at least) `Release` ordering semantics
  synchronizes with an atomic operation with (at least) `Acquire` ordering semantics.
- fence - fence synchronization: a fence with (at least) `Release` ordering semantics
  synchronizes with a fence with (at least) `Acquire` ordering semantics.

These 3 ways complement the regular, fence-less, atomic - atomic synchronization.
