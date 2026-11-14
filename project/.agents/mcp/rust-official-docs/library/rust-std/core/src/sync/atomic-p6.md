---
title: "core::sync::atomic (part 6 of 6)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/sync/atomic.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::sync::atomic (part 6 of 6)

## Atomic - Fence

An atomic operation on one thread will synchronize with a fence on another thread when:

-   on thread 1:
    -   an atomic operation 'X' with (at least) `Release` ordering semantics on some atomic
        object 'm',

-   is paired on thread 2 with:
    -   an atomic read 'Y' with any order on 'm',
    -   followed by a fence 'B' with (at least) `Acquire` ordering semantics.

This provides a happens-before dependence between X and B.

```
    Thread 1                                          Thread 2

m.store(3, Release); X ---------
                               |
                               |
                               -------------> Y  if m.load(Relaxed) == 3 {
                                              B      fence(Acquire);
                                                     ...
                                                 }
```rust

## Fence - Atomic

A fence on one thread will synchronize with an atomic operation on another thread when:

-   on thread:
    -   a fence 'A' with (at least) `Release` ordering semantics,
    -   followed by an atomic write 'X' with any ordering on some atomic object 'm',

-   is paired on thread 2 with:
    -   an atomic operation 'Y' with (at least) `Acquire` ordering semantics.

This provides a happens-before dependence between A and Y.

```
    Thread 1                                          Thread 2

fence(Release);      A
m.store(3, Relaxed); X ---------
                               |
                               |
                               -------------> Y  if m.load(Acquire) == 3 {
                                                     ...
                                                 }
```rust

## Fence - Fence

A fence on one thread will synchronize with a fence on another thread when:

-   on thread 1:
    -   a fence 'A' which has (at least) `Release` ordering semantics,
    -   followed by an atomic write 'X' with any ordering on some atomic object 'm',

-   is paired on thread 2 with:
    -   an atomic read 'Y' with any ordering on 'm',
    -   followed by a fence 'B' with (at least) `Acquire` ordering semantics.

This provides a happens-before dependence between A and B.

```
    Thread 1                                          Thread 2

fence(Release);      A --------------
m.store(3, Relaxed); X ---------    |
                               |    |
                               |    |
                               -------------> Y  if m.load(Relaxed) == 3 {
                                    |-------> B      fence(Acquire);
                                                     ...
                                                 }
```rust

## Mandatory Atomic

Note that in the examples above, it is crucial that the access to `m` are atomic. Fences cannot
be used to establish synchronization between non-atomic accesses in different threads. However,
thanks to the happens-before relationship, any non-atomic access that happen-before the atomic
operation or fence with (at least) `Release` ordering semantics are now also properly
synchronized with any non-atomic accesses that happen-after the atomic operation or fence with
(at least) `Acquire` ordering semantics.

## Memory Ordering

A fence which has `SeqCst` ordering, in addition to having both `Acquire` and `Release`
semantics, participates in the global program order of the other `SeqCst` operations and/or
fences.

Accepts `Acquire`, `Release`, `AcqRel` and `SeqCst` orderings.

Panics if `order` is `Relaxed`.

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
```rust

## fn compiler_fence

```rust
pub const fn compiler_fence(order: Ordering)
```

An atomic fence for synchronization within a single thread.

Like `fence`, this function establishes synchronization with other atomic operations and
fences. However, unlike `fence`, `compiler_fence` only establishes synchronization with
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

See `fence` for how a fence can be used to achieve synchronization. Note that just like
`fence`, synchronization still requires atomic operations to be used in both threads -- it is
not possible to perform synchronization entirely with fences and non-atomic operations.

`compiler_fence` does not emit any machine code. However, note that `compiler_fence` is also
*not* a "compiler barrier". It can be helpful to think of a `compiler_fence` as preventing the
compiler from reordering certain types of memory operations around it, but that is a simplified
model which fails to capture some of the nuances. The only actual guarantee made by
`compiler_fence` is establishing synchronization with signal handlers and similar kinds of code,
under the rules described in the `fence` documentation.

`compiler_fence` corresponds to `atomic_signal_fence` in C and C++.

# Panics

Panics if `order` is `Relaxed`.

# Examples

Without the two `compiler_fence` calls, the read of `IMPORTANT_VARIABLE` in `signal_handler`
is *undefined behavior* due to a data race, despite everything happening in a single thread.
This is because the signal handler is considered to run concurrently with its associated
thread, and explicit synchronization is required to pass data between a thread and its
signal handler. The code below uses two `compiler_fence` calls to establish the usual
release-acquire synchronization pattern (see `fence` for an image).

```rust
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

This function is deprecated in favor of `hint::spin_loop`.
