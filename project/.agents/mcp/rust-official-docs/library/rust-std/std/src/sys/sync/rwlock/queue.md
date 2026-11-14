# std::sys::sync::rwlock::queue

Efficient read-write locking without `pthread_rwlock_t`.

The readers-writer lock provided by the `pthread` library has a number of problems which make it
a suboptimal choice for `std`:

* It is non-movable, so it needs to be allocated (lazily, to make the constructor `const`).
* `pthread` is an external library, meaning the fast path of acquiring an uncontended lock
cannot be inlined.
* Some platforms (at least glibc before version 2.25) have buggy implementations that can easily
lead to undefined behaviour in safe Rust code when not properly guarded against.
* On some platforms (e.g. macOS), the lock is very slow.

Therefore, we implement our own [`RwLock`]! Naively, one might reach for a spinlock, but those
can be quite [problematic] when the lock is contended.

Instead, this [`RwLock`] copies its implementation strategy from the Windows [SRWLOCK] and the
[usync] library implementations.

Spinning is still used for the fast path, but it is bounded: after spinning fails, threads will
locklessly add an information structure ([`Node`]) containing a [`Thread`] handle into a queue
of waiters associated with the lock. The lock owner, upon releasing the lock, will scan through
the queue and wake up threads as appropriate, and the newly-awoken threads will then try to
acquire the lock themselves.

The resulting [`RwLock`] is:

* adaptive, since it spins before doing any heavyweight parking operations
* allocation-free, modulo the per-thread [`Thread`] handle, which is allocated anyways when
using threads created by `std`
* writer-preferring, even if some readers may still slip through
* unfair, which reduces context-switching and thus drastically improves performance

and also quite fast in most cases.

[problematic]: https://matklad.github.io/2020/01/02/spinlocks-considered-harmful.html
[SRWLOCK]: https://learn.microsoft.com/en-us/windows/win32/sync/slim-reader-writer--srw--locks
[usync]: https://crates.io/crates/usync

# Implementation

## State

A single [`AtomicPtr`] is used as state variable. The lowest four bits are used to indicate the
meaning of the remaining bits:

| [`LOCKED`] | [`QUEUED`] | [`QUEUE_LOCKED`] | [`DOWNGRADED`] | Remaining    |                                                                                                                             |
|------------|:-----------|:-----------------|:---------------|:-------------|:----------------------------------------------------------------------------------------------------------------------------|
| 0          | 0          | 0                | 0              | 0            | The lock is unlocked, no threads are waiting                                                                                |
| 1          | 0          | 0                | 0              | 0            | The lock is write-locked, no threads waiting                                                                                |
| 1          | 0          | 0                | 0              | n > 0        | The lock is read-locked with n readers                                                                                      |
| 0          | 1          | *                | 0              | `*mut Node`  | The lock is unlocked, but some threads are waiting. Only writers may lock the lock                                          |
| 1          | 1          | *                | *              | `*mut Node`  | The lock is locked, but some threads are waiting. If the lock is read-locked, the last queue node contains the reader count |

## Waiter Queue

When threads are waiting on the lock (the `QUEUE` bit is set), the lock state points to a queue
of waiters, which is implemented as a linked list of nodes stored on the stack to avoid memory
allocation.

To enable lock-free enqueuing of new nodes to the queue, the linked list is singly-linked upon
creation.

When the lock is read-locked, the lock count (number of readers) is stored in the last link of
the queue. Threads have to traverse the queue to find the last element upon releasing the lock.
To avoid having to traverse the entire list every time we want to access the reader count, a
pointer to the found tail is cached in the (current) first element of the queue.

Also, while the lock is unfair for performance reasons, it is still best to wake the tail node
first (FIFO ordering). Since we always pop nodes off the tail of the queue, we must store
backlinks to previous nodes so that we can update the `tail` field of the (current) first
element of the queue. Adding backlinks is done at the same time as finding the tail (via the
function [`find_tail_and_add_backlinks`]), and thus encountering a set tail field on a node
indicates that all following nodes in the queue are initialized.

TLDR: Here's a diagram of what the queue looks like:

```text
state
  │
  ▼
╭───────╮ next ╭───────╮ next ╭───────╮ next ╭───────╮
│       ├─────►│       ├─────►│       ├─────►│ count │
│       │      │       │      │       │      │       │
│       │      │       │◄─────┤       │◄─────┤       │
╰───────╯      ╰───────╯ prev ╰───────╯ prev ╰───────╯
                     │                           ▲
                     └───────────────────────────┘
                                 tail
```

Invariants:
1. At least one node must contain a non-null, current `tail` field.
2. The first non-null `tail` field must be valid and current.
3. All nodes preceding this node must have a correct, non-null `next` field.
4. All nodes following this node must have a correct, non-null `prev` field.

Access to the queue is controlled by the `QUEUE_LOCKED` bit. Threads will try to set this bit
in two cases: one is when a thread enqueues itself and eagerly adds backlinks to the queue
(which drastically improves performance), and the other is after a thread unlocks the lock to
wake up the next waiter(s).

`QUEUE_LOCKED` is set atomically at the same time as the enqueuing/unlocking operations. The
thread releasing the `QUEUE_LOCKED` bit will check the state of the lock (in particular, whether
a downgrade was requested using the [`DOWNGRADED`] bit) and wake up waiters as appropriate. This
guarantees forward progress even if the unlocking thread could not acquire the queue lock.

## Memory Orderings

To properly synchronize changes to the data protected by the lock, the lock is acquired and
released with [`Acquire`] and [`Release`] ordering, respectively. To propagate the
initialization of nodes, changes to the queue lock are also performed using these orderings.

## struct RwLock

```rust
pub struct RwLock
```

The public inner `RwLock` type.

## RwLock::downgrade

```rust
pub unsafe fn downgrade(&self)
```

# Safety

* The lock must be write-locked by this thread.