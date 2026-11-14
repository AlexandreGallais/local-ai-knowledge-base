---
title: "std::sys::pal::sgx::waitqueue"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/sgx/waitqueue/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::sgx::waitqueue

A simple queue implementation for synchronization primitives.

This queue is used to implement condition variable and mutexes.

Users of this API are expected to use the `WaitVariable<T>` type. Since
that type is not `Sync`, it needs to be protected by e.g., a `SpinMutex` to
allow shared access.

Since userspace may send spurious wake-ups, the wakeup event state is
recorded in the enclave. The wakeup event state is protected by a spinlock.
The queue and associated wait state are stored in a `WaitVariable`.

## struct WaitVariable

```rust
pub struct WaitVariable<T>
```

Data stored with a `WaitQueue` alongside it. This ensures accesses to the
queue and the data are synchronized, since the type itself is not `Sync`.

Consumers of this API should use a synchronization primitive for shared
access. `WaitVariable::new` is the only constructor and provides that
with `SpinMutex`.

## WaitVariable::new

```rust
pub fn new(value: T) -> Pin<Box<SpinMutex<WaitVariable<T>>>>
```

Creates a mutex-protected `WaitVariable` on the heap, with its queue's
list initialized. Initialization makes the list self-referential and
happens before pinning: only the `Box` pointer is moved into the
`Pin`, the heap allocation itself never moves.

## struct WaitGuard

```rust
pub struct WaitGuard<'a, T: 'a>
```

An RAII guard that will notify a set of target threads as well as unlock
a mutex on drop.

## WaitQueue::new

```rust
pub const unsafe fn new() -> Self
```

Creates a new queue.

# Safety

The caller must initialize the queue's list (`UnsafeList::init`)
before any other use of the queue, including dropping it.
`WaitVariable::new`, the sole constructor of the containing
structure, does this.

## WaitQueue::wait

```rust
pub fn wait<T, F: FnOnce()>( mut guard: Pin<SpinMutexGuard<'_, WaitVariable<T>>>, before_wait: F, )
```

Adds the calling thread to the `WaitVariable`'s wait queue, then wait
until a wakeup event.

This function does not return until this thread has been awoken. When `before_wait` panics,
this function will abort.

## WaitQueue::wait_timeout

```rust
pub fn wait_timeout<T, F: FnOnce()>( lock: Pin<&SpinMutex<WaitVariable<T>>>, timeout: Duration, before_wait: F, ) -> bool
```

Adds the calling thread to the `WaitVariable`'s wait queue, then wait
until a wakeup event or timeout. If event was observed, returns true.
If not, it will remove the calling thread from the wait queue.
When `before_wait` panics, this function will abort.

## WaitQueue::notify_one

```rust
pub fn notify_one<T>( mut guard: Pin<SpinMutexGuard<'_, WaitVariable<T>>>, ) -> Result<WaitGuard<'_, T>, Pin<SpinMutexGuard<'_, WaitVariable<T>>>>
```

Either find the next waiter on the wait queue, or return the mutex
guard unchanged.

If a waiter is found, a `WaitGuard` is returned which will notify the
waiter when it is dropped.

## WaitQueue::notify_all

```rust
pub fn notify_all<T>( mut guard: Pin<SpinMutexGuard<'_, WaitVariable<T>>>, ) -> Result<WaitGuard<'_, T>, Pin<SpinMutexGuard<'_, WaitVariable<T>>>>
```

Either find any and all waiters on the wait queue, or return the mutex
guard unchanged.

If at least one waiter is found, a `WaitGuard` is returned which will
notify all waiters when it is dropped.
