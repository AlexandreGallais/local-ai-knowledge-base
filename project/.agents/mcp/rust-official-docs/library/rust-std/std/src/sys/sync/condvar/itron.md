---
title: "std::sys::sync::condvar::itron"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/condvar/itron.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::condvar::itron

POSIX conditional variable implementation based on user-space wait queues.

## WaiterQueue::insert

```rust
pub unsafe fn insert(&mut self, mut waiter_ptr: NonNull<Waiter>)
```

# Safety

 - The caller must own `*waiter_ptr`. The caller will lose the
   ownership until `*waiter_ptr` is removed from `self`.

 - `*waiter_ptr` must be valid until it's removed from the queue.

 - `*waiter_ptr` must not have been previously inserted to a `WaiterQueue`.

## WaiterQueue::remove

```rust
pub unsafe fn remove(&mut self, mut waiter_ptr: NonNull<Waiter>) -> bool
```

Given a `Waiter` that was previously inserted to `self`, remove
it from `self` if it's still there.

## WaiterQueue::is_queued

```rust
pub unsafe fn is_queued(&self, waiter: NonNull<Waiter>) -> bool
```

Given a `Waiter` that was previously inserted to `self`, return a
flag indicating whether it's still in `self`.
