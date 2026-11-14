# core::sync::atomic

Atomic types

Atomic types provide primitive shared-memory communication between
threads, and are the building blocks of other concurrent
types.

This module defines atomic versions of a select number of primitive
types, including [`AtomicBool`], [`AtomicIsize`], [`AtomicUsize`],
[`AtomicI8`], [`AtomicU16`], etc.
Atomic types present operations that, when used correctly, synchronize
updates between threads.

Atomic variables are safe to share between threads (they implement [`Sync`])
but they do not themselves provide the mechanism for sharing and follow the
[threading model](../../../std/thread/index.html#the-threading-model) of Rust.
The most common way to share an atomic variable is to put it into an [`Arc`][arc] (an
atomically-reference-counted shared pointer).

[arc]: ../../../std/sync/struct.Arc.html

Atomic types may be stored in static variables, initialized using
the constant initializers like [`AtomicBool::new`]. Atomic statics
are often used for lazy global initialization.

## Memory model for atomic accesses

Rust atomics currently follow the same rules as [C++20 atomics][cpp], specifically the rules
from the [`intro.races`][cpp-intro.races] section, without the "consume" memory ordering. Since
C++ uses an object-based memory model whereas Rust is access-based, a bit of translation work
has to be done to apply the C++ rules to Rust: whenever C++ talks about "the value of an
object", we understand that to mean the resulting bytes obtained when doing a read. When the C++
standard talks about "the value of an atomic object", this refers to the result of doing an
atomic load (via the operations provided in this module). A "modification of an atomic object"
refers to an atomic store.

The end result is *almost* equivalent to saying that creating a *shared reference* to one of the
Rust atomic types corresponds to creating an `atomic_ref` in C++, with the `atomic_ref` being
destroyed when the lifetime of the shared reference ends. The main difference is that Rust
permits concurrent atomic and non-atomic reads to the same memory as those cause no issue in the
C++ memory model, they are just forbidden in C++ because memory is partitioned into "atomic
objects" and "non-atomic objects" (with `atomic_ref` temporarily converting a non-atomic object
into an atomic object).

The most important aspect of this model is that *data races* are undefined behavior. A data race
is defined as conflicting non-synchronized accesses where at least one of the accesses is
non-atomic. Here, accesses are *conflicting* if they affect overlapping regions of memory and at
least one of them is a write. (A `compare_exchange` or `compare_exchange_weak` that does not
succeed is not considered a write.) They are *non-synchronized* if neither of them
*happens-before* the other, according to the happens-before order of the memory model.

The other possible cause of undefined behavior in the memory model are mixed-size accesses: Rust
inherits the C++ limitation that non-synchronized conflicting atomic accesses may not partially
overlap. In other words, every pair of non-synchronized atomic accesses must be either disjoint,
access the exact same memory (including using the same access size), or both be reads.

Each atomic access takes an [`Ordering`] which defines how the operation interacts with the
happens-before order. These orderings behave the same as the corresponding [C++20 atomic
orderings][cpp_memory_order]. For more information, see the [nomicon].

[cpp]: https://en.cppreference.com/w/cpp/atomic
[cpp-intro.races]: https://timsong-cpp.github.io/cppwp/n4868/intro.multithread#intro.races
[cpp_memory_order]: https://en.cppreference.com/w/cpp/atomic/memory_order
[nomicon]: ../../../nomicon/atomics.html

```rust,no_run undefined_behavior
use std::sync::atomic::{AtomicU16, AtomicU8, Ordering};
use std::mem::transmute;
use std::thread;

let atomic = AtomicU16::new(0);

thread::scope(|s| {
    // This is UB: conflicting non-synchronized accesses, at least one of which is non-atomic.
    s.spawn(|| atomic.store(1, Ordering::Relaxed)); // atomic store
    s.spawn(|| unsafe { atomic.as_ptr().write(2) }); // non-atomic write
});

thread::scope(|s| {
    // This is fine: the accesses do not conflict (as none of them performs any modification).
    // In C++ this would be disallowed since creating an `atomic_ref` precludes
    // further non-atomic accesses, but Rust does not have that limitation.
    s.spawn(|| atomic.load(Ordering::Relaxed)); // atomic load
    s.spawn(|| unsafe { atomic.as_ptr().read() }); // non-atomic read
});

thread::scope(|s| {
    // This is fine: `join` synchronizes the code in a way such that the atomic
    // store happens-before the non-atomic write.
    let handle = s.spawn(|| atomic.store(1, Ordering::Relaxed)); // atomic store
    handle.join().expect("thread won't panic"); // synchronize
    s.spawn(|| unsafe { atomic.as_ptr().write(2) }); // non-atomic write
});

thread::scope(|s| {
    // This is UB: non-synchronized conflicting differently-sized atomic accesses.
    s.spawn(|| atomic.store(1, Ordering::Relaxed));
    s.spawn(|| unsafe {
        let differently_sized = transmute::<&AtomicU16, &AtomicU8>(&atomic);
        differently_sized.store(2, Ordering::Relaxed);
    });
});

thread::scope(|s| {
    // This is fine: `join` synchronizes the code in a way such that
    // the 1-byte store happens-before the 2-byte store.
    let handle = s.spawn(|| atomic.store(1, Ordering::Relaxed));
    handle.join().expect("thread won't panic");
    s.spawn(|| unsafe {
        let differently_sized = transmute::<&AtomicU16, &AtomicU8>(&atomic);
        differently_sized.store(2, Ordering::Relaxed);
    });
});
```

# Portability

All atomic types in this module are guaranteed to be [lock-free] if they're
available. This means they don't internally acquire a global mutex. Atomic
types and operations are not guaranteed to be wait-free. This means that
operations like `fetch_or` may be implemented with a compare-and-swap loop.

Atomic operations may be implemented at the instruction layer with
larger-size atomics. For example some platforms use 4-byte atomic
instructions to implement `AtomicI8`. Note that this emulation should not
have an impact on correctness of code, it's just something to be aware of.

The atomic types in this module might not be available on all platforms. The
atomic types here are all widely available, however, and can generally be
relied upon existing. Some notable exceptions are:

* PowerPC and MIPS platforms with 32-bit pointers do not have `AtomicU64` or
  `AtomicI64` types.
* Legacy ARM platforms like ARMv4T and ARMv5TE have very limited hardware
  support for atomics. The bare-metal targets disable this module
  entirely, but the Linux targets [use the kernel] to assist (which comes
  with a performance penalty). It's not until ARMv6K onwards that ARM CPUs
  have support for load/store and Compare and Swap (CAS) atomics in hardware.
* ARMv6-M targets (`thumbv6m-*`) only provide `load` and `store` operations, and do
  not support Compare and Swap (CAS) operations, such as `swap`,
  `fetch_add`, etc. Full CAS support is available on ARMv7-M and ARMv8-M
  (`thumbv7m-*`, `thumbv7em*`, `thumbv8m.base-*` and `thumbv8m.main-*`).

[use the kernel]: https://www.kernel.org/doc/Documentation/arm/kernel_user_helpers.txt

Note that future platforms may be added that also do not have support for
some atomic operations. Maximally portable code will want to be careful
about which atomic types are used. `AtomicUsize` and `AtomicIsize` are
generally the most portable, but even then they're not available everywhere.
For reference, the `std` library requires `AtomicBool`s and pointer-sized atomics, although
`core` does not.

The `#[cfg(target_has_atomic)]` attribute can be used to conditionally
compile based on the target's supported bit widths. It is a key-value
option set for each supported size, with values "8", "16", "32", "64",
"128", and "ptr" for pointer-sized atomics.

[lock-free]: https://en.wikipedia.org/wiki/Non-blocking_algorithm

# Atomic accesses to read-only memory

In general, *all* atomic accesses on read-only memory are undefined behavior. For instance, attempting
to do a `compare_exchange` that will definitely fail (making it conceptually a read-only
operation) can still cause a segmentation fault if the underlying memory page is mapped read-only. Since
atomic `load`s might be implemented using compare-exchange operations, even a `load` can fault
on read-only memory.

For the purpose of this section, "read-only memory" is defined as memory that is read-only in
the underlying target, i.e., the pages are mapped with a read-only flag and any attempt to write
will cause a page fault. In particular, an `&u128` reference that points to memory that is
read-write mapped is *not* considered to point to "read-only memory". In Rust, almost all memory
is read-write; the only exceptions are memory created by `const` items or `static` items without
interior mutability, and memory that was specifically marked as read-only by the operating
system via platform-specific APIs.

As an exception from the general rule stated above, "sufficiently small" atomic loads with
`Ordering::Relaxed` are implemented in a way that works on read-only memory, and are hence not
undefined behavior. The exact size limit for what makes a load "sufficiently small" varies
depending on the target:

| `target_arch` | Size limit |
|---------------|---------|
| `x86`, `arm`, `loongarch32`, `mips`, `mips32r6`, `powerpc`, `riscv32`, `sparc`, `hexagon` | 4 bytes |
| `x86_64`, `aarch64`, `loongarch64`, `mips64`, `mips64r6`, `powerpc64`, `riscv64`, `sparc64`, `s390x` | 8 bytes |

Atomics loads that are larger than this limit as well as atomic loads with ordering other
than `Relaxed`, as well as *all* atomic loads on targets not listed in the table, might still be
read-only under certain conditions, but that is not a stable guarantee and should not be relied
upon.

If you need to do an acquire load on read-only memory, you can do a relaxed load followed by an
acquire fence instead.

# Examples

A simple spinlock:

```ignore-wasm
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::{hint, thread};

fn main() {
    let spinlock = Arc::new(AtomicUsize::new(1));

    let spinlock_clone = Arc::clone(&spinlock);

    let thread = thread::spawn(move || {
        spinlock_clone.store(0, Ordering::Release);
    });

    // Wait for the other thread to release the lock
    while spinlock.load(Ordering::Acquire) != 0 {
        hint::spin_loop();
    }

    if let Err(panic) = thread.join() {
        println!("Thread had an error: {panic:?}");
    }
}
```

Keep a global count of live threads:

```
use std::sync::atomic::{AtomicUsize, Ordering};

static GLOBAL_THREAD_COUNT: AtomicUsize = AtomicUsize::new(0);

// Note that Relaxed ordering doesn't synchronize anything
// except the global thread counter itself.
let old_thread_count = GLOBAL_THREAD_COUNT.fetch_add(1, Ordering::Relaxed);
// Note that this number may not be true at the moment of printing
// because some other thread may have changed static value already.
println!("live threads: {}", old_thread_count + 1);
```

## ::AtomicBool

```rust
pub type AtomicBool = Atomic<bool>
```

A boolean type which can be safely shared between threads.

This type has the same size, alignment, and bit validity as a [`bool`].

**Note**: This type is only available on platforms that support atomic
loads and stores of `u8`.

## type AtomicPtr

```rust
pub type AtomicPtr<T> = Atomic<*mut T>
```

A raw pointer type which can be safely shared between threads.

This type has the same size and bit validity as a `*mut T`.

**Note**: This type is only available on platforms that support atomic
loads and stores of pointers. Its size depends on the target pointer's size.

## enum Ordering

```rust
pub enum Ordering
```

Atomic memory orderings

Memory orderings specify the way atomic operations synchronize memory.
In its weakest [`Ordering::Relaxed`], only the memory directly touched by the
operation is synchronized. On the other hand, a store-load pair of [`Ordering::SeqCst`]
operations synchronize other memory while additionally preserving a total order of such
operations across all threads.

Rust's memory orderings are [the same as those of
C++20](https://en.cppreference.com/w/cpp/atomic/memory_order).

For more information see the [nomicon].

[nomicon]: ../../../nomicon/atomics.html

## const ATOMIC_BOOL_INIT

```rust
pub const ATOMIC_BOOL_INIT: AtomicBool = AtomicBool::new(false)
```

An [`AtomicBool`] initialized to `false`.

## AtomicBool::new

```rust
pub const fn new(v: bool) -> AtomicBool
```

Creates a new `AtomicBool`.

# Examples

```
use std::sync::atomic::AtomicBool;

let atomic_true = AtomicBool::new(true);
let atomic_false = AtomicBool::new(false);
```

## AtomicBool::from_ptr

```rust
pub const unsafe fn from_ptr<'a>(ptr: *mut bool) -> &'a AtomicBool
```

Creates a new `AtomicBool` from a pointer.

# Examples

```
use std::sync::atomic::{self, AtomicBool};

// Get a pointer to an allocated value
let ptr: *mut bool = Box::into_raw(Box::new(false));

assert!(ptr.cast::<AtomicBool>().is_aligned());

{
    // Create an atomic view of the allocated value
    let atomic = unsafe { AtomicBool::from_ptr(ptr) };

    // Use `atomic` for atomic operations, possibly share it with other threads
    atomic.store(true, atomic::Ordering::Relaxed);
}

// It's ok to non-atomically access the value behind `ptr`,
// since the reference to the atomic ended its lifetime in the block above
assert_eq!(unsafe { *ptr }, true);

// Deallocate the value
unsafe { drop(Box::from_raw(ptr)) }
```

# Safety

* `ptr` must be aligned to `align_of::<AtomicBool>()` (note that this is always true, since
  `align_of::<AtomicBool>() == 1`).
* `ptr` must be [valid] for both reads and writes for the whole lifetime `'a`.
* You must adhere to the [Memory model for atomic accesses]. In particular, it is not
  allowed to mix conflicting atomic and non-atomic accesses, or atomic accesses of different
  sizes, without synchronization.

[valid]: crate::ptr#safety
[Memory model for atomic accesses]: self#memory-model-for-atomic-accesses

## AtomicBool::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut bool
```

Returns a mutable reference to the underlying [`bool`].

This is safe because the mutable reference guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```
use std::sync::atomic::{AtomicBool, Ordering};

let mut some_bool = AtomicBool::new(true);
assert_eq!(*some_bool.get_mut(), true);
*some_bool.get_mut() = false;
assert_eq!(some_bool.load(Ordering::SeqCst), false);
```

## AtomicBool::from_mut

```rust
pub const fn from_mut(v: &mut bool) -> &mut Self
```

Gets atomic access to a `&mut bool`.

# Examples

```
use std::sync::atomic::{AtomicBool, Ordering};

let mut some_bool = true;
let a = AtomicBool::from_mut(&mut some_bool);
a.store(false, Ordering::Relaxed);
assert_eq!(some_bool, false);
```

## AtomicBool::get_mut_slice

```rust
pub const fn get_mut_slice(this: &mut [Self]) -> &mut [bool]
```

Gets non-atomic access to a `&mut [AtomicBool]` slice.

This is safe because the mutable reference guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```ignore-wasm
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
```

## AtomicBool::from_mut_slice

```rust
pub const fn from_mut_slice(v: &mut [bool]) -> &mut [Self]
```

Gets atomic access to a `&mut [bool]` slice.

# Examples

```rust,ignore-wasm
use std::sync::atomic::{AtomicBool, Ordering};

let mut some_bools = [false; 10];
let a = &*AtomicBool::from_mut_slice(&mut some_bools);
std::thread::scope(|s| {
    for i in 0..a.len() {
        s.spawn(move || a[i].store(true, Ordering::Relaxed));
    }
});
assert_eq!(some_bools, [true; 10]);
```

## AtomicBool::into_inner

```rust
pub const fn into_inner(self) -> bool
```

Consumes the atomic and returns the contained value.

This is safe because passing `self` by value guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```
use std::sync::atomic::AtomicBool;

let some_bool = AtomicBool::new(true);
assert_eq!(some_bool.into_inner(), true);
```

## AtomicBool::load

```rust
pub const fn load(&self, order: Ordering) -> bool
```

Loads a value from the bool.

`load` takes an [`Ordering`] argument which describes the memory ordering
of this operation. Possible values are [`SeqCst`], [`Acquire`] and [`Relaxed`].

# Panics

Panics if `order` is [`Release`] or [`AcqRel`].

# Examples

```
use std::sync::atomic::{AtomicBool, Ordering};

let some_bool = AtomicBool::new(true);

assert_eq!(some_bool.load(Ordering::Relaxed), true);
```

## AtomicBool::store

```rust
pub const fn store(&self, val: bool, order: Ordering)
```

Stores a value into the bool.

`store` takes an [`Ordering`] argument which describes the memory ordering
of this operation. Possible values are [`SeqCst`], [`Release`] and [`Relaxed`].

# Panics

Panics if `order` is [`Acquire`] or [`AcqRel`].

# Examples

```
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

`swap` takes an [`Ordering`] argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
[`Acquire`] makes the store part of this operation [`Relaxed`], and
using [`Release`] makes the load part [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```
use std::sync::atomic::{AtomicBool, Ordering};

let some_bool = AtomicBool::new(true);

assert_eq!(some_bool.swap(false, Ordering::Relaxed), true);
assert_eq!(some_bool.load(Ordering::Relaxed), false);
```

## AtomicBool::compare_and_swap

```rust
pub const fn compare_and_swap(&self, current: bool, new: bool, order: Ordering) -> bool
```

Stores a value into the [`bool`] if the current value is the same as the `current` value.

The return value is always the previous value. If it is equal to `current`, then the value
was updated.

`compare_and_swap` also takes an [`Ordering`] argument which describes the memory
ordering of this operation. Notice that even when using [`AcqRel`], the operation
might fail and hence just perform an `Acquire` load, but not have `Release` semantics.
Using [`Acquire`] makes the store part of this operation [`Relaxed`] if it
happens, and using [`Release`] makes the load part [`Relaxed`].

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

```
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

Stores a value into the [`bool`] if the current value is the same as the `current` value.

The return value is a result indicating whether the new value was written and containing
the previous value. On success this value is guaranteed to be equal to `current`.

`compare_exchange` takes two [`Ordering`] arguments to describe the memory
ordering of this operation. `success` describes the required ordering for the
read-modify-write operation that takes place if the comparison with `current` succeeds.
`failure` describes the required ordering for the load operation that takes place when
the comparison fails. Using [`Acquire`] as success ordering makes the store part
of this operation [`Relaxed`], and using [`Release`] makes the successful load
[`Relaxed`]. The failure ordering can only be [`SeqCst`], [`Acquire`] or [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```
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

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

## AtomicBool::compare_exchange_weak

```rust
pub const fn compare_exchange_weak( &self, current: bool, new: bool, success: Ordering, failure: Ordering, ) -> Result<bool, bool>
```

Stores a value into the [`bool`] if the current value is the same as the `current` value.

Unlike [`AtomicBool::compare_exchange`], this function is allowed to spuriously fail even when the
comparison succeeds, which can result in more efficient code on some platforms. The
return value is a result indicating whether the new value was written and containing the
previous value.

`compare_exchange_weak` takes two [`Ordering`] arguments to describe the memory
ordering of this operation. `success` describes the required ordering for the
read-modify-write operation that takes place if the comparison with `current` succeeds.
`failure` describes the required ordering for the load operation that takes place when
the comparison fails. Using [`Acquire`] as success ordering makes the store part
of this operation [`Relaxed`], and using [`Release`] makes the successful load
[`Relaxed`]. The failure ordering can only be [`SeqCst`], [`Acquire`] or [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```
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

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

## AtomicBool::fetch_and

```rust
pub const fn fetch_and(&self, val: bool, order: Ordering) -> bool
```

Logical "and" with a boolean value.

Performs a logical "and" operation on the current value and the argument `val`, and sets
the new value to the result.

Returns the previous value.

`fetch_and` takes an [`Ordering`] argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
[`Acquire`] makes the store part of this operation [`Relaxed`], and
using [`Release`] makes the load part [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```
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

`fetch_nand` takes an [`Ordering`] argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
[`Acquire`] makes the store part of this operation [`Relaxed`], and
using [`Release`] makes the load part [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```
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

`fetch_or` takes an [`Ordering`] argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
[`Acquire`] makes the store part of this operation [`Relaxed`], and
using [`Release`] makes the load part [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```
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

`fetch_xor` takes an [`Ordering`] argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
[`Acquire`] makes the store part of this operation [`Relaxed`], and
using [`Release`] makes the load part [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```
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

## AtomicBool::fetch_not

```rust
pub const fn fetch_not(&self, order: Ordering) -> bool
```

Logical "not" with a boolean value.

Performs a logical "not" operation on the current value, and sets
the new value to the result.

Returns the previous value.

`fetch_not` takes an [`Ordering`] argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
[`Acquire`] makes the store part of this operation [`Relaxed`], and
using [`Release`] makes the load part [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Examples

```
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

Returns a mutable pointer to the underlying [`bool`].

Doing non-atomic reads and writes on the resulting boolean can be a data race.
This method is mostly useful for FFI, where the function signature may use
`*mut bool` instead of `&AtomicBool`.

Returning an `*mut` pointer from a shared reference to this atomic is safe because the
atomic types work with interior mutability. All modifications of an atomic change the value
through a shared reference, and can do so safely as long as they use atomic operations. Any
use of the returned raw pointer requires an `unsafe` block and still has to uphold the
requirements of the [memory model].

# Examples

```ignore (extern-declaration)
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
```

[memory model]: self#memory-model-for-atomic-accesses

## AtomicBool::fetch_update

```rust
pub fn fetch_update<F>( &self, set_order: Ordering, fetch_order: Ordering, f: F, ) -> Result<bool, bool> where F: FnMut(bool) -> Option<bool>,
```

An alias for [`AtomicBool::try_update`].

## AtomicBool::try_update

```rust
pub fn try_update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut(bool) -> Option<bool>, ) -> Result<bool, bool>
```

Fetches the value, and applies a function to it that returns an optional
new value. Returns a `Result` of `Ok(previous_value)` if the function
returned `Some(_)`, else `Err(previous_value)`.

See also: [`update`](`AtomicBool::update`).

Note: This may call the function multiple times if the value has been
changed from other threads in the meantime, as long as the function
returns `Some(_)`, but the function will have been applied only once to
the stored value.

`try_update` takes two [`Ordering`] arguments to describe the memory
ordering of this operation. The first describes the required ordering for
when the operation finally succeeds while the second describes the
required ordering for loads. These correspond to the success and failure
orderings of [`AtomicBool::compare_exchange`] respectively.

Using [`Acquire`] as success ordering makes the store part of this
operation [`Relaxed`], and using [`Release`] makes the final successful
load [`Relaxed`]. The (failed) load ordering can only be [`SeqCst`],
[`Acquire`] or [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on `u8`.

# Considerations

This method is not magic; it is not provided by the hardware, and does not act like a
critical section or mutex.

It is implemented on top of an atomic [compare-and-swap operation], and thus is subject to
the usual drawbacks of CAS operations. In particular, be careful of the [ABA problem].

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

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

See also: [`try_update`](`AtomicBool::try_update`).

Note: This may call the function multiple times if the value has been changed from other threads in
the meantime, but the function will have been applied only once to the stored value.

`update` takes two [`Ordering`] arguments to describe the memory
ordering of this operation. The first describes the required ordering for
when the operation finally succeeds while the second describes the
required ordering for loads. These correspond to the success and failure
orderings of [`AtomicBool::compare_exchange`] respectively.

Using [`Acquire`] as success ordering makes the store part
of this operation [`Relaxed`], and using [`Release`] makes the final successful load
[`Relaxed`]. The (failed) load ordering can only be [`SeqCst`], [`Acquire`] or [`Relaxed`].

**Note:** This method is only available on platforms that support atomic operations on `u8`.

# Considerations

This method is not magic; it is not provided by the hardware, and does not act like a
critical section or mutex.

It is implemented on top of an atomic [compare-and-swap operation], and thus is subject to
the usual drawbacks of CAS operations. In particular, be careful of the [ABA problem].

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

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

```
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

```
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

[valid]: crate::ptr#safety
[Memory model for atomic accesses]: self#memory-model-for-atomic-accesses

## AtomicPtr::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut *mut T
```

Returns a mutable reference to the underlying pointer.

This is safe because the mutable reference guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```
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

```
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

```ignore-wasm
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
```

## AtomicPtr::from_mut_slice

```rust
pub const fn from_mut_slice(v: &mut [*mut T]) -> &mut [Self]
```

Gets atomic access to a slice of pointers.

**Note:** This function is only available on targets where `AtomicPtr<T>` has the same alignment as `*const T`

# Examples

```ignore-wasm
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
```

## AtomicPtr::into_inner

```rust
pub const fn into_inner(self) -> *mut T
```

Consumes the atomic and returns the contained value.

This is safe because passing `self` by value guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```
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

`load` takes an [`Ordering`] argument which describes the memory ordering
of this operation. Possible values are [`SeqCst`], [`Acquire`] and [`Relaxed`].

# Panics

Panics if `order` is [`Release`] or [`AcqRel`].

# Examples

```
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

`store` takes an [`Ordering`] argument which describes the memory ordering
of this operation. Possible values are [`SeqCst`], [`Release`] and [`Relaxed`].

# Panics

Panics if `order` is [`Acquire`] or [`AcqRel`].

# Examples

```
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

`swap` takes an [`Ordering`] argument which describes the memory ordering
of this operation. All ordering modes are possible. Note that using
[`Acquire`] makes the store part of this operation [`Relaxed`], and
using [`Release`] makes the load part [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Examples

```
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

`compare_and_swap` also takes an [`Ordering`] argument which describes the memory
ordering of this operation. Notice that even when using [`AcqRel`], the operation
might fail and hence just perform an `Acquire` load, but not have `Release` semantics.
Using [`Acquire`] makes the store part of this operation [`Relaxed`] if it
happens, and using [`Release`] makes the load part [`Relaxed`].

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

```
use std::sync::atomic::{AtomicPtr, Ordering};

let ptr = &mut 5;
let some_ptr = AtomicPtr::new(ptr);

let other_ptr = &mut 10;

let value = some_ptr.compare_and_swap(ptr, other_ptr, Ordering::Relaxed);
```

## AtomicPtr::compare_exchange

```rust
pub fn compare_exchange( &self, current: *mut T, new: *mut T, success: Ordering, failure: Ordering, ) -> Result<*mut T, *mut T>
```

Stores a value into the pointer if the current value is the same as the `current` value.

The return value is a result indicating whether the new value was written and containing
the previous value. On success this value is guaranteed to be equal to `current`.

`compare_exchange` takes two [`Ordering`] arguments to describe the memory
ordering of this operation. `success` describes the required ordering for the
read-modify-write operation that takes place if the comparison with `current` succeeds.
`failure` describes the required ordering for the load operation that takes place when
the comparison fails. Using [`Acquire`] as success ordering makes the store part
of this operation [`Relaxed`], and using [`Release`] makes the successful load
[`Relaxed`]. The failure ordering can only be [`SeqCst`], [`Acquire`] or [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Examples

```
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

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

## AtomicPtr::compare_exchange_weak

```rust
pub fn compare_exchange_weak( &self, current: *mut T, new: *mut T, success: Ordering, failure: Ordering, ) -> Result<*mut T, *mut T>
```

Stores a value into the pointer if the current value is the same as the `current` value.

Unlike [`AtomicPtr::compare_exchange`], this function is allowed to spuriously fail even when the
comparison succeeds, which can result in more efficient code on some platforms. The
return value is a result indicating whether the new value was written and containing the
previous value.

`compare_exchange_weak` takes two [`Ordering`] arguments to describe the memory
ordering of this operation. `success` describes the required ordering for the
read-modify-write operation that takes place if the comparison with `current` succeeds.
`failure` describes the required ordering for the load operation that takes place when
the comparison fails. Using [`Acquire`] as success ordering makes the store part
of this operation [`Relaxed`], and using [`Release`] makes the successful load
[`Relaxed`]. The failure ordering can only be [`SeqCst`], [`Acquire`] or [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Examples

```
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

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

## AtomicPtr::fetch_update

```rust
pub fn fetch_update<F>( &self, set_order: Ordering, fetch_order: Ordering, f: F, ) -> Result<*mut T, *mut T> where F: FnMut(*mut T) -> Option<*mut T>,
```

An alias for [`AtomicPtr::try_update`].

## AtomicPtr::try_update

```rust
pub fn try_update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut(*mut T) -> Option<*mut T>, ) -> Result<*mut T, *mut T>
```

Fetches the value, and applies a function to it that returns an optional
new value. Returns a `Result` of `Ok(previous_value)` if the function
returned `Some(_)`, else `Err(previous_value)`.

See also: [`update`](`AtomicPtr::update`).

Note: This may call the function multiple times if the value has been
changed from other threads in the meantime, as long as the function
returns `Some(_)`, but the function will have been applied only once to
the stored value.

`try_update` takes two [`Ordering`] arguments to describe the memory
ordering of this operation. The first describes the required ordering for
when the operation finally succeeds while the second describes the
required ordering for loads. These correspond to the success and failure
orderings of [`AtomicPtr::compare_exchange`] respectively.

Using [`Acquire`] as success ordering makes the store part of this
operation [`Relaxed`], and using [`Release`] makes the final successful
load [`Relaxed`]. The (failed) load ordering can only be [`SeqCst`],
[`Acquire`] or [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Considerations

This method is not magic; it is not provided by the hardware, and does not act like a
critical section or mutex.

It is implemented on top of an atomic [compare-and-swap operation], and thus is subject to
the usual drawbacks of CAS operations. In particular, be careful of the [ABA problem],
which is a particularly common pitfall for pointers!

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

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

See also: [`try_update`](`AtomicPtr::try_update`).

Note: This may call the function multiple times if the value has been changed from other threads in
the meantime, but the function will have been applied only once to the stored value.

`update` takes two [`Ordering`] arguments to describe the memory
ordering of this operation. The first describes the required ordering for
when the operation finally succeeds while the second describes the
required ordering for loads. These correspond to the success and failure
orderings of [`AtomicPtr::compare_exchange`] respectively.

Using [`Acquire`] as success ordering makes the store part
of this operation [`Relaxed`], and using [`Release`] makes the final successful load
[`Relaxed`]. The (failed) load ordering can only be [`SeqCst`], [`Acquire`] or [`Relaxed`].

**Note:** This method is only available on platforms that support atomic
operations on pointers.

# Considerations

This method is not magic; it is not provided by the hardware, and does not act like a
critical section or mutex.

It is implemented on top of an atomic [compare-and-swap operation], and thus is subject to
the usual drawbacks of CAS operations. In particular, be careful of the [ABA problem],
which is a particularly common pitfall for pointers!

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

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

This is equivalent to using [`wrapping_add`] to atomically perform the
equivalent of `ptr = ptr.wrapping_add(val);`.

This method operates in units of `T`, which means that it cannot be used
to offset the pointer by an amount which is not a multiple of
`size_of::<T>()`. This can sometimes be inconvenient, as you may want to
work with a deliberately misaligned pointer. In such cases, you may use
the [`fetch_byte_add`](Self::fetch_byte_add) method instead.

`fetch_ptr_add` takes an [`Ordering`] argument which describes the
memory ordering of this operation. All ordering modes are possible. Note
that using [`Acquire`] makes the store part of this operation
[`Relaxed`], and using [`Release`] makes the load part [`Relaxed`].

**Note**: This method is only available on platforms that support atomic
operations on [`AtomicPtr`].

[`wrapping_add`]: pointer::wrapping_add

# Examples

```
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

This is equivalent to using [`wrapping_sub`] to atomically perform the
equivalent of `ptr = ptr.wrapping_sub(val);`.

This method operates in units of `T`, which means that it cannot be used
to offset the pointer by an amount which is not a multiple of
`size_of::<T>()`. This can sometimes be inconvenient, as you may want to
work with a deliberately misaligned pointer. In such cases, you may use
the [`fetch_byte_sub`](Self::fetch_byte_sub) method instead.

`fetch_ptr_sub` takes an [`Ordering`] argument which describes the memory
ordering of this operation. All ordering modes are possible. Note that
using [`Acquire`] makes the store part of this operation [`Relaxed`],
and using [`Release`] makes the load part [`Relaxed`].

**Note**: This method is only available on platforms that support atomic
operations on [`AtomicPtr`].

[`wrapping_sub`]: pointer::wrapping_sub

# Examples

```
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

This is equivalent to using [`wrapping_byte_add`] to atomically
perform `ptr = ptr.wrapping_byte_add(val)`.

`fetch_byte_add` takes an [`Ordering`] argument which describes the
memory ordering of this operation. All ordering modes are possible. Note
that using [`Acquire`] makes the store part of this operation
[`Relaxed`], and using [`Release`] makes the load part [`Relaxed`].

**Note**: This method is only available on platforms that support atomic
operations on [`AtomicPtr`].

[`wrapping_byte_add`]: pointer::wrapping_byte_add

# Examples

```
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

This is equivalent to using [`wrapping_byte_sub`] to atomically
perform `ptr = ptr.wrapping_byte_sub(val)`.

`fetch_byte_sub` takes an [`Ordering`] argument which describes the
memory ordering of this operation. All ordering modes are possible. Note
that using [`Acquire`] makes the store part of this operation
[`Relaxed`], and using [`Release`] makes the load part [`Relaxed`].

**Note**: This method is only available on platforms that support atomic
operations on [`AtomicPtr`].

[`wrapping_byte_sub`]: pointer::wrapping_byte_sub

# Examples

```
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

This is equivalent to using [`map_addr`] to atomically perform
`ptr = ptr.map_addr(|a| a | val)`. This can be used in tagged
pointer schemes to atomically set tag bits.

**Caveat**: This operation returns the previous value. To compute the
stored value without losing provenance, you may use [`map_addr`]. For
example: `a.fetch_or(val).map_addr(|a| a | val)`.

`fetch_or` takes an [`Ordering`] argument which describes the memory
ordering of this operation. All ordering modes are possible. Note that
using [`Acquire`] makes the store part of this operation [`Relaxed`],
and using [`Release`] makes the load part [`Relaxed`].

**Note**: This method is only available on platforms that support atomic
operations on [`AtomicPtr`].

This API and its claimed semantics are part of the Strict Provenance
experiment, see the [module documentation for `ptr`][crate::ptr] for
details.

[`map_addr`]: pointer::map_addr

# Examples

```
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

## AtomicPtr::fetch_and

```rust
pub fn fetch_and(&self, val: usize, order: Ordering) -> *mut T
```

Performs a bitwise "and" operation on the address of the current
pointer, and the argument `val`, and stores a pointer with provenance of
the current pointer and the resulting address.

This is equivalent to using [`map_addr`] to atomically perform
`ptr = ptr.map_addr(|a| a & val)`. This can be used in tagged
pointer schemes to atomically unset tag bits.

**Caveat**: This operation returns the previous value. To compute the
stored value without losing provenance, you may use [`map_addr`]. For
example: `a.fetch_and(val).map_addr(|a| a & val)`.

`fetch_and` takes an [`Ordering`] argument which describes the memory
ordering of this operation. All ordering modes are possible. Note that
using [`Acquire`] makes the store part of this operation [`Relaxed`],
and using [`Release`] makes the load part [`Relaxed`].

**Note**: This method is only available on platforms that support atomic
operations on [`AtomicPtr`].

This API and its claimed semantics are part of the Strict Provenance
experiment, see the [module documentation for `ptr`][crate::ptr] for
details.

[`map_addr`]: pointer::map_addr

# Examples

```
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

This is equivalent to using [`map_addr`] to atomically perform
`ptr = ptr.map_addr(|a| a ^ val)`. This can be used in tagged
pointer schemes to atomically toggle tag bits.

**Caveat**: This operation returns the previous value. To compute the
stored value without losing provenance, you may use [`map_addr`]. For
example: `a.fetch_xor(val).map_addr(|a| a ^ val)`.

`fetch_xor` takes an [`Ordering`] argument which describes the memory
ordering of this operation. All ordering modes are possible. Note that
using [`Acquire`] makes the store part of this operation [`Relaxed`],
and using [`Release`] makes the load part [`Relaxed`].

**Note**: This method is only available on platforms that support atomic
operations on [`AtomicPtr`].

This API and its claimed semantics are part of the Strict Provenance
experiment, see the [module documentation for `ptr`][crate::ptr] for
details.

[`map_addr`]: pointer::map_addr

# Examples

```
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

```ignore (extern-declaration)
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
```

[memory model]: self#memory-model-for-atomic-accesses

## atomic_type::new

```rust
pub const fn new(v: $int_type) -> Self
```

```

## atomic_type::from_ptr

```rust
pub const unsafe fn from_ptr<'a>(ptr: *mut $int_type) -> &'a $atomic_type
```

* `ptr` must be [valid] for both reads and writes for the whole lifetime `'a`.
* You must adhere to the [Memory model for atomic accesses]. In particular, it is not
  allowed to mix conflicting atomic and non-atomic accesses, or atomic accesses of different
  sizes, without synchronization.

[valid]: crate::ptr#safety
[Memory model for atomic accesses]: self#memory-model-for-atomic-accesses

## atomic_type::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut $int_type
```

assert_eq!(*some_var.get_mut(), 10);
*some_var.get_mut() = 5;
assert_eq!(some_var.load(Ordering::SeqCst), 5);
```

## atomic_type::from_mut

```rust
pub const fn from_mut(v: &mut $int_type) -> &mut Self
```

a.store(100, Ordering::Relaxed);
assert_eq!(some_int, 100);
```

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
```

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
```

## atomic_type::into_inner

```rust
pub const fn into_inner(self) -> $int_type
```

assert_eq!(some_var.into_inner(), 5);
```

## atomic_type::load

```rust
pub const fn load(&self, order: Ordering) -> $int_type
```

assert_eq!(some_var.load(Ordering::Relaxed), 5);
```

## atomic_type::store

```rust
pub const fn store(&self, val: $int_type, order: Ordering)
```

some_var.store(10, Ordering::Relaxed);
assert_eq!(some_var.load(Ordering::Relaxed), 10);
```

## atomic_type::swap

```rust
pub const fn swap(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(some_var.swap(10, Ordering::Relaxed), 5);
```

## atomic_type::compare_and_swap

```rust
pub const fn compare_and_swap(&self, current: $int_type, new: $int_type, order: Ordering) -> $int_type
```

assert_eq!(some_var.compare_and_swap(5, 10, Ordering::Relaxed), 5);
assert_eq!(some_var.load(Ordering::Relaxed), 10);

assert_eq!(some_var.compare_and_swap(6, 12, Ordering::Relaxed), 10);
assert_eq!(some_var.load(Ordering::Relaxed), 10);
```

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
```

# Considerations

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

[ABA Problem]: https://en.wikipedia.org/wiki/ABA_problem
[compare-and-swap operation]: https://en.wikipedia.org/wiki/Compare-and-swap

## atomic_type::fetch_add

```rust
pub const fn fetch_add(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_add(10, Ordering::SeqCst), 0);
assert_eq!(foo.load(Ordering::SeqCst), 10);
```

## atomic_type::fetch_sub

```rust
pub const fn fetch_sub(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_sub(10, Ordering::SeqCst), 20);
assert_eq!(foo.load(Ordering::SeqCst), 10);
```

## atomic_type::fetch_and

```rust
pub const fn fetch_and(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_and(0b110011, Ordering::SeqCst), 0b101101);
assert_eq!(foo.load(Ordering::SeqCst), 0b100001);
```

## atomic_type::fetch_nand

```rust
pub const fn fetch_nand(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_nand(0x31, Ordering::SeqCst), 0x13);
assert_eq!(foo.load(Ordering::SeqCst), !(0x13 & 0x31));
```

## atomic_type::fetch_or

```rust
pub const fn fetch_or(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_or(0b110011, Ordering::SeqCst), 0b101101);
assert_eq!(foo.load(Ordering::SeqCst), 0b111111);
```

## atomic_type::fetch_xor

```rust
pub const fn fetch_xor(&self, val: $int_type, order: Ordering) -> $int_type
```

assert_eq!(foo.fetch_xor(0b110011, Ordering::SeqCst), 0b101101);
assert_eq!(foo.load(Ordering::SeqCst), 0b011110);
```

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
```

## atomic_type::update

```rust
pub fn update( &self, set_order: Ordering, fetch_order: Ordering, mut f: impl FnMut($int_type) -> $int_type, ) -> $int_type
```

assert_eq!(x.update(Ordering::SeqCst, Ordering::SeqCst, |x| x + 1), 7);
assert_eq!(x.update(Ordering::SeqCst, Ordering::SeqCst, |x| x + 1), 8);
assert_eq!(x.load(Ordering::SeqCst), 9);
```

## atomic_type::fetch_max

```rust
pub const fn fetch_max(&self, val: $int_type, order: Ordering) -> $int_type
```

let bar = 42;
let max_foo = foo.fetch_max(bar, Ordering::SeqCst).max(bar);
assert!(max_foo == 42);
```

## atomic_type::fetch_min

```rust
pub const fn fetch_min(&self, val: $int_type, order: Ordering) -> $int_type
```

let bar = 12;
let min_foo = foo.fetch_min(bar, Ordering::SeqCst).min(bar);
assert_eq!(min_foo, 12);
```

## atomic_type::as_ptr

```rust
pub const fn as_ptr(&self) -> *mut $int_type
```

// SAFETY: Safe as long as `my_atomic_op` is atomic.
unsafe {
    my_atomic_op(atomic.as_ptr());
}
# }
```

[memory model]: self#memory-model-for-atomic-accesses

## const ATOMIC_ISIZE_INIT

```rust
pub const ATOMIC_ISIZE_INIT: AtomicIsize = AtomicIsize::new(0)
```

An [`AtomicIsize`] initialized to `0`.

## const ATOMIC_USIZE_INIT

```rust
pub const ATOMIC_USIZE_INIT: AtomicUsize = AtomicUsize::new(0)
```

An [`AtomicUsize`] initialized to `0`.

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

- atomic - fence synchronization: an atomic operation with (at least) [`Release`] ordering
  semantics synchronizes with a fence with (at least) [`Acquire`] ordering semantics.
- fence - atomic synchronization: a fence with (at least) [`Release`] ordering semantics
  synchronizes with an atomic operation with (at least) [`Acquire`] ordering semantics.
- fence - fence synchronization: a fence with (at least) [`Release`] ordering semantics
  synchronizes with a fence with (at least) [`Acquire`] ordering semantics.

These 3 ways complement the regular, fence-less, atomic - atomic synchronization.

## Atomic - Fence

An atomic operation on one thread will synchronize with a fence on another thread when:

-   on thread 1:
    -   an atomic operation 'X' with (at least) [`Release`] ordering semantics on some atomic
        object 'm',

-   is paired on thread 2 with:
    -   an atomic read 'Y' with any order on 'm',
    -   followed by a fence 'B' with (at least) [`Acquire`] ordering semantics.

This provides a happens-before dependence between X and B.

```text
    Thread 1                                          Thread 2

m.store(3, Release); X ---------
                               |
                               |
                               -------------> Y  if m.load(Relaxed) == 3 {
                                              B      fence(Acquire);
                                                     ...
                                                 }
```

## Fence - Atomic

A fence on one thread will synchronize with an atomic operation on another thread when:

-   on thread:
    -   a fence 'A' with (at least) [`Release`] ordering semantics,
    -   followed by an atomic write 'X' with any ordering on some atomic object 'm',

-   is paired on thread 2 with:
    -   an atomic operation 'Y' with (at least) [`Acquire`] ordering semantics.

This provides a happens-before dependence between A and Y.

```text
    Thread 1                                          Thread 2

fence(Release);      A
m.store(3, Relaxed); X ---------
                               |
                               |
                               -------------> Y  if m.load(Acquire) == 3 {
                                                     ...
                                                 }
```

## Fence - Fence

A fence on one thread will synchronize with a fence on another thread when:

-   on thread 1:
    -   a fence 'A' which has (at least) [`Release`] ordering semantics,
    -   followed by an atomic write 'X' with any ordering on some atomic object 'm',

-   is paired on thread 2 with:
    -   an atomic read 'Y' with any ordering on 'm',
    -   followed by a fence 'B' with (at least) [`Acquire`] ordering semantics.

This provides a happens-before dependence between A and B.

```text
    Thread 1                                          Thread 2

fence(Release);      A --------------
m.store(3, Relaxed); X ---------    |
                               |    |
                               |    |
                               -------------> Y  if m.load(Relaxed) == 3 {
                                    |-------> B      fence(Acquire);
                                                     ...
                                                 }
```

## Mandatory Atomic

Note that in the examples above, it is crucial that the access to `m` are atomic. Fences cannot
be used to establish synchronization between non-atomic accesses in different threads. However,
thanks to the happens-before relationship, any non-atomic access that happen-before the atomic
operation or fence with (at least) [`Release`] ordering semantics are now also properly
synchronized with any non-atomic accesses that happen-after the atomic operation or fence with
(at least) [`Acquire`] ordering semantics.

## Memory Ordering

A fence which has [`SeqCst`] ordering, in addition to having both [`Acquire`] and [`Release`]
semantics, participates in the global program order of the other [`SeqCst`] operations and/or
fences.

Accepts [`Acquire`], [`Release`], [`AcqRel`] and [`SeqCst`] orderings.

# Panics

Panics if `order` is [`Relaxed`].

# Examples

```
use std::sync::atomic::AtomicBool;
use std::sync::atomic::fence;
use std::sync::atomic::Ordering;

// A mutual exclusion primitive based on spinlock.
pub struct Mutex {
    flag: AtomicBool,
}

impl Mutex {
    pub fn new() -> Mutex {
        Mutex {
            flag: AtomicBool::new(false),
        }
    }

    pub fn lock(&self) {
        // Wait until the old value is `false`.
        while self
            .flag
            .compare_exchange_weak(false, true, Ordering::Relaxed, Ordering::Relaxed)
            .is_err()
        {}
        // This fence synchronizes-with store in `unlock`.
        fence(Ordering::Acquire);
    }

    pub fn unlock(&self) {
        self.flag.store(false, Ordering::Release);
    }
}
```

## fn compiler_fence

```rust
pub const fn compiler_fence(order: Ordering)
```

An atomic fence for synchronization within a single thread.

Like [`fence`], this function establishes synchronization with other atomic operations and
fences. However, unlike [`fence`], `compiler_fence` only establishes synchronization with
operations *in the same thread*. This may at first sound rather useless, since code within a
thread is typically already totally ordered and does not need any further synchronization.
However, there are cases where code can run on the same thread without being synchronized:
- The most common case is that of a *signal handler*: a signal handler runs in the same thread
  as the code it interrupted, but it is not synchronized with that code. `compiler_fence`
  can be used to establish synchronization between a thread and its signal handler, the same way
  that `fence` can be used to establish synchronization across threads.
- Similar situations can arise in embedded programming with interrupt handlers, or in custom
  implementations of preemptive green threads. In general, `compiler_fence` can establish
  synchronization with code that is guaranteed to run on the same hardware CPU.

See [`fence`] for how a fence can be used to achieve synchronization. Note that just like
[`fence`], synchronization still requires atomic operations to be used in both threads -- it is
not possible to perform synchronization entirely with fences and non-atomic operations.

`compiler_fence` does not emit any machine code. However, note that `compiler_fence` is also
*not* a "compiler barrier". It can be helpful to think of a `compiler_fence` as preventing the
compiler from reordering certain types of memory operations around it, but that is a simplified
model which fails to capture some of the nuances. The only actual guarantee made by
`compiler_fence` is establishing synchronization with signal handlers and similar kinds of code,
under the rules described in the [`fence`] documentation.

`compiler_fence` corresponds to [`atomic_signal_fence`] in C and C++.

[`atomic_signal_fence`]: https://en.cppreference.com/w/cpp/atomic/atomic_signal_fence

# Panics

Panics if `order` is [`Relaxed`].

# Examples

Without the two `compiler_fence` calls, the read of `IMPORTANT_VARIABLE` in `signal_handler`
is *undefined behavior* due to a data race, despite everything happening in a single thread.
This is because the signal handler is considered to run concurrently with its associated
thread, and explicit synchronization is required to pass data between a thread and its
signal handler. The code below uses two `compiler_fence` calls to establish the usual
release-acquire synchronization pattern (see [`fence`] for an image).

```
use std::sync::atomic::AtomicBool;
use std::sync::atomic::Ordering;
use std::sync::atomic::compiler_fence;

static mut IMPORTANT_VARIABLE: usize = 0;
static IS_READY: AtomicBool = AtomicBool::new(false);

fn main() {
    unsafe { IMPORTANT_VARIABLE = 42 };
    // Marks earlier writes as being released with future relaxed stores.
    compiler_fence(Ordering::Release);
    IS_READY.store(true, Ordering::Relaxed);
}

fn signal_handler() {
    if IS_READY.load(Ordering::Relaxed) {
        // Acquires writes that were released with relaxed stores that we read from.
        compiler_fence(Ordering::Acquire);
        assert_eq!(unsafe { IMPORTANT_VARIABLE }, 42);
    }
}
```

## fn spin_loop_hint

```rust
pub fn spin_loop_hint()
```

Signals the processor that it is inside a busy-wait spin-loop ("spin lock").

This function is deprecated in favor of [`hint::spin_loop`].

[`hint::spin_loop`]: crate::hint::spin_loop