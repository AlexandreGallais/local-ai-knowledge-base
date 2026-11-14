---
title: "core::sync::atomic (part 2 of 6)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/sync/atomic.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::sync::atomic (part 2 of 6)

## AtomicBool::get_mut_slice

```rust
pub const fn get_mut_slice(this: &mut [Self]) -> &mut [bool]
```

Gets non-atomic access to a `&mut [AtomicBool]` slice.

This is safe because the mutable reference guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```
use std::sync::atomic::{AtomicBool, Ordering};

let mut some_bools = [const { AtomicBool::new(false) }; 10];

let view: &mut [bool] = AtomicBool::get_mut_slice(&mut some_bools);
assert_eq!(view, [false; 10]);
view[..5].copy_from_slice(&[true; 5]);

std::thread::scope(|s| {
    for t in &some_bools[..5] {
        s.spawn(move || assert_eq!(t.load(Ordering::Relaxed), true));
    }

    for f in &some_bools[5..] {
        s.spawn(move || assert_eq!(f.load(Ordering::Relaxed), false));
    }
});
```rust

## AtomicBool::from_mut_slice

```rust
pub const fn from_mut_slice(v: &mut [bool]) -> &mut [Self]
```

Gets atomic access to a `&mut [bool]` slice.

# Examples

```
use std::sync::atomic::{AtomicBool, Ordering};

let mut some_bools = [false; 10];
let a = &*AtomicBool::from_mut_slice(&mut some_bools);
std::thread::scope(|s| {
    for i in 0..a.len() {
        s.spawn(move || a[i].store(true, Ordering::Relaxed));
    }
});
assert_eq!(some_bools, [true; 10]);
```rust

## AtomicBool::into_inner

```rust
pub const fn into_inner(self) -> bool
```

Consumes the atomic and returns the contained value.

This is safe because passing `self` by value guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```rust
use std::sync::atomic::AtomicBool;

let some_bool = AtomicBool::new(true);
assert_eq!(some_bool.into_inner(), true);
```

## AtomicBool::load

```rust
pub const fn load(&self, order: Ordering) -> bool
```

Loads a value from the bool.

`load` takes an `Ordering` argument which describes the memory ordering
of this operation. Possible values are `SeqCst`, `Acquire` and `Relaxed`.

# Panics

Panics if `order` is `Release` or `AcqRel`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let some_bool = AtomicBool::new(true);

assert_eq!(some_bool.load(Ordering::Relaxed), true);
```

## AtomicBool::store

```rust
pub const fn store(&self, val: bool, order: Ordering)
```

Stores a value into the bool.

`store` takes an `Ordering` argument which describes the memory ordering
of this operation. Possible values are `SeqCst`, `Release` and `Relaxed`.

# Panics

Panics if `order` is `Acquire` or `AcqRel`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let some_bool = AtomicBool::new(true);

some_bool.store(false, Ordering::Relaxed);
assert_eq!(some_bool.load(Ordering::Relaxed), false);
```

## AtomicBool::swap

```rust
pub const fn swap(&self, val: bool, order: Ordering) -> bool
```

Stores a value into the bool, returning the previous value.

`swap` takes an `Ordering` argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
`Acquire` makes the store part of this operation `Relaxed`, and
using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let some_bool = AtomicBool::new(true);

assert_eq!(some_bool.swap(false, Ordering::Relaxed), true);
assert_eq!(some_bool.load(Ordering::Relaxed), false);
```

## AtomicBool::compare_and_swap

```rust
pub const fn compare_and_swap(&self, current: bool, new: bool, order: Ordering) -> bool
```

Stores a value into the `bool` if the current value is the same as the `current` value.

The return value is always the previous value. If it is equal to `current`, then the value
was updated.

`compare_and_swap` also takes an `Ordering` argument which describes the memory
ordering of this operation. Notice that even when using `AcqRel`, the operation
might fail and hence just perform an `Acquire` load, but not have `Release` semantics.
Using `Acquire` makes the store part of this operation `Relaxed` if it
happens, and using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

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
use std::sync::atomic::{AtomicBool, Ordering};

let some_bool = AtomicBool::new(true);

assert_eq!(some_bool.compare_and_swap(true, false, Ordering::Relaxed), true);
assert_eq!(some_bool.load(Ordering::Relaxed), false);

assert_eq!(some_bool.compare_and_swap(true, true, Ordering::Relaxed), false);
assert_eq!(some_bool.load(Ordering::Relaxed), false);
```

## AtomicBool::compare_exchange

```rust
pub const fn compare_exchange( &self, current: bool, new: bool, success: Ordering, failure: Ordering, ) -> Result<bool, bool>
```

Stores a value into the `bool` if the current value is the same as the `current` value.

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
operations on `u8`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let some_bool = AtomicBool::new(true);

assert_eq!(some_bool.compare_exchange(true,
                                      false,
                                      Ordering::Acquire,
                                      Ordering::Relaxed),
           Ok(true));
assert_eq!(some_bool.load(Ordering::Relaxed), false);

assert_eq!(some_bool.compare_exchange(true, true,
                                      Ordering::SeqCst,
                                      Ordering::Acquire),
           Err(false));
assert_eq!(some_bool.load(Ordering::Relaxed), false);
```

# Considerations

`compare_exchange` is a [compare-and-swap operation] and thus exhibits the usual downsides
of CAS operations. In particular, a load of the value followed by a successful
`compare_exchange` with the previous load *does not ensure* that other threads have not
changed the value in the interim. This is usually important when the *equality* check in
the `compare_exchange` is being used to check the *identity* of a value, but equality
does not necessarily imply identity. In this case, `compare_exchange` can lead to the
[ABA problem].

## AtomicBool::compare_exchange_weak

```rust
pub const fn compare_exchange_weak( &self, current: bool, new: bool, success: Ordering, failure: Ordering, ) -> Result<bool, bool>
```

Stores a value into the `bool` if the current value is the same as the `current` value.

Unlike `AtomicBool::compare_exchange`, this function is allowed to spuriously fail even when the
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
operations on `u8`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let val = AtomicBool::new(false);

let new = true;
let mut old = val.load(Ordering::Relaxed);
loop {
    match val.compare_exchange_weak(old, new, Ordering::SeqCst, Ordering::Relaxed) {
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
does not necessarily imply identity. In this case, `compare_exchange` can lead to the
[ABA problem].

## AtomicBool::fetch_and

```rust
pub const fn fetch_and(&self, val: bool, order: Ordering) -> bool
```

Logical "and" with a boolean value.

Performs a logical "and" operation on the current value and the argument `val`, and sets
the new value to the result.

Returns the previous value.

`fetch_and` takes an `Ordering` argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
`Acquire` makes the store part of this operation `Relaxed`, and
using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let foo = AtomicBool::new(true);
assert_eq!(foo.fetch_and(false, Ordering::SeqCst), true);
assert_eq!(foo.load(Ordering::SeqCst), false);

let foo = AtomicBool::new(true);
assert_eq!(foo.fetch_and(true, Ordering::SeqCst), true);
assert_eq!(foo.load(Ordering::SeqCst), true);

let foo = AtomicBool::new(false);
assert_eq!(foo.fetch_and(false, Ordering::SeqCst), false);
assert_eq!(foo.load(Ordering::SeqCst), false);
```

## AtomicBool::fetch_nand

```rust
pub const fn fetch_nand(&self, val: bool, order: Ordering) -> bool
```

Logical "nand" with a boolean value.

Performs a logical "nand" operation on the current value and the argument `val`, and sets
the new value to the result.

Returns the previous value.

`fetch_nand` takes an `Ordering` argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
`Acquire` makes the store part of this operation `Relaxed`, and
using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let foo = AtomicBool::new(true);
assert_eq!(foo.fetch_nand(false, Ordering::SeqCst), true);
assert_eq!(foo.load(Ordering::SeqCst), true);

let foo = AtomicBool::new(true);
assert_eq!(foo.fetch_nand(true, Ordering::SeqCst), true);
assert_eq!(foo.load(Ordering::SeqCst) as usize, 0);
assert_eq!(foo.load(Ordering::SeqCst), false);

let foo = AtomicBool::new(false);
assert_eq!(foo.fetch_nand(false, Ordering::SeqCst), false);
assert_eq!(foo.load(Ordering::SeqCst), true);
```

## AtomicBool::fetch_or

```rust
pub const fn fetch_or(&self, val: bool, order: Ordering) -> bool
```

Logical "or" with a boolean value.

Performs a logical "or" operation on the current value and the argument `val`, and sets the
new value to the result.

Returns the previous value.

`fetch_or` takes an `Ordering` argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
`Acquire` makes the store part of this operation `Relaxed`, and
using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let foo = AtomicBool::new(true);
assert_eq!(foo.fetch_or(false, Ordering::SeqCst), true);
assert_eq!(foo.load(Ordering::SeqCst), true);

let foo = AtomicBool::new(false);
assert_eq!(foo.fetch_or(true, Ordering::SeqCst), false);
assert_eq!(foo.load(Ordering::SeqCst), true);

let foo = AtomicBool::new(false);
assert_eq!(foo.fetch_or(false, Ordering::SeqCst), false);
assert_eq!(foo.load(Ordering::SeqCst), false);
```

## AtomicBool::fetch_xor

```rust
pub const fn fetch_xor(&self, val: bool, order: Ordering) -> bool
```

Logical "xor" with a boolean value.

Performs a logical "xor" operation on the current value and the argument `val`, and sets
the new value to the result.

Returns the previous value.

`fetch_xor` takes an `Ordering` argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
`Acquire` makes the store part of this operation `Relaxed`, and
using `Release` makes the load part `Relaxed`.

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let foo = AtomicBool::new(true);
assert_eq!(foo.fetch_xor(false, Ordering::SeqCst), true);
assert_eq!(foo.load(Ordering::SeqCst), true);

let foo = AtomicBool::new(true);
assert_eq!(foo.fetch_xor(true, Ordering::SeqCst), true);
assert_eq!(foo.load(Ordering::SeqCst), false);

let foo = AtomicBool::new(false);
assert_eq!(foo.fetch_xor(false, Ordering::SeqCst), false);
assert_eq!(foo.load(Ordering::SeqCst), false);
```
