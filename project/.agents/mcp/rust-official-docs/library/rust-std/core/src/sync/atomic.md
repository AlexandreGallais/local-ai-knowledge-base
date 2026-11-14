---
title: "core::sync::atomic (part 1 of 6)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/sync/atomic.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::sync::atomic

Atomic types

Atomic types provide primitive shared-memory communication between
threads, and are the building blocks of other concurrent
types.

This module defines atomic versions of a select number of primitive
types, including `AtomicBool`, `AtomicIsize`, `AtomicUsize`,
`AtomicI8`, `AtomicU16`, etc.
Atomic types present operations that, when used correctly, synchronize
updates between threads.

Atomic variables are safe to share between threads (they implement `Sync`)
but they do not themselves provide the mechanism for sharing and follow the
threading model of Rust.
The most common way to share an atomic variable is to put it into an `Arc`[arc] (an
atomically-reference-counted shared pointer).

Atomic types may be stored in static variables, initialized using
the constant initializers like `AtomicBool::new`. Atomic statics
are often used for lazy global initialization.

#### Memory model for atomic accesses

Rust atomics currently follow the same rules as C++20 atomics, specifically the rules
from the `intro.races`[cpp-intro.races] section, without the "consume" memory ordering. Since
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

Each atomic access takes an `Ordering` which defines how the operation interacts with the
happens-before order. These orderings behave the same as the corresponding C++20 atomic
orderings. For more information, see the [nomicon].

```
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
```rust

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

A simple spinlock:

```
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
```rust

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
```rust

## ::AtomicBool

```rust
pub type AtomicBool = Atomic<bool>
```

A boolean type which can be safely shared between threads.

This type has the same size, alignment, and bit validity as a `bool`.

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
In its weakest `Ordering::Relaxed`, only the memory directly touched by the
operation is synchronized. On the other hand, a store-load pair of `Ordering::SeqCst`
operations synchronize other memory while additionally preserving a total order of such
operations across all threads.

Rust's memory orderings are the same as those of
C++20.

For more information see the [nomicon].

## const ATOMIC_BOOL_INIT

```rust
pub const ATOMIC_BOOL_INIT: AtomicBool = AtomicBool::new(false)
```

An `AtomicBool` initialized to `false`.

## AtomicBool::new

```rust
pub const fn new(v: bool) -> AtomicBool
```

Creates a new `AtomicBool`.

# Examples

```rust
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

```rust
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

## AtomicBool::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut bool
```

Returns a mutable reference to the underlying `bool`.

This is safe because the mutable reference guarantees that no other threads are
concurrently accessing the atomic data.

# Examples

```rust
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

```rust
use std::sync::atomic::{AtomicBool, Ordering};

let mut some_bool = true;
let a = AtomicBool::from_mut(&mut some_bool);
a.store(false, Ordering::Relaxed);
assert_eq!(some_bool, false);
```
