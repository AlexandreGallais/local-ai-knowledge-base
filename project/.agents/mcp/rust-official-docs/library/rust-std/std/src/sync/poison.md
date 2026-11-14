# std::sync::poison

Synchronization objects that employ poisoning.

# Poisoning

All synchronization objects in this module implement a strategy called
"poisoning" where a primitive becomes poisoned if it recognizes that some
thread has panicked while holding the exclusive access granted by the
primitive. This information is then propagated to all other threads
to signify that the data protected by this primitive is likely tainted
(some invariant is not being upheld).

The specifics of how this "poisoned" state affects other threads and whether
the panics are recognized reliably or on a best-effort basis depend on the
primitive. See [Overview](#overview) below.

The synchronization objects in this module have alternative implementations that do not employ
poisoning in the [`std::sync::nonpoison`] module.

[`std::sync::nonpoison`]: crate::sync::nonpoison

# Overview

Below is a list of synchronization objects provided by this module
with a high-level overview for each object and a description
of how it employs "poisoning".

- [`Condvar`]: Condition Variable, providing the ability to block
  a thread while waiting for an event to occur.

  Condition variables are typically associated with
  a boolean predicate (a condition) and a mutex.
  This implementation is associated with [`poison::Mutex`](Mutex),
  which employs poisoning.
  For this reason, [`Condvar::wait()`] will return a [`LockResult`],
  just like [`poison::Mutex::lock()`](Mutex::lock) does.

- [`Mutex`]: Mutual Exclusion mechanism, which ensures that at
  most one thread at a time is able to access some data.

  Panicking while holding the lock typically poisons the mutex, but it is
  not guaranteed to detect this condition in all circumstances.
  [`Mutex::lock()`] returns a [`LockResult`], providing a way to deal with
  the poisoned state. See [`Mutex`'s documentation](Mutex#poisoning) for more.

- [`RwLock`]: Provides a mutual exclusion mechanism which allows
  multiple readers at the same time, while allowing only one
  writer at a time. In some cases, this can be more efficient than
  a mutex.

  This implementation, like [`Mutex`], usually becomes poisoned on a panic.
  Note, however, that an `RwLock` may only be poisoned if a panic occurs
  while it is locked exclusively (write mode). If a panic occurs in any reader,
  then the lock will not be poisoned.

Note that the [`Once`] type also employs poisoning, but since it has non-poisoning `force`
methods available on it, there is no separate `nonpoison` and `poison` version.

[`Once`]: crate::sync::Once

## struct PoisonError

```rust
pub struct PoisonError<T>
```

A type of error which can be returned whenever a lock is acquired.

Both [`Mutex`]es and [`RwLock`]s are poisoned whenever a thread fails while the lock
is held. The precise semantics for when a lock is poisoned is documented on
each lock. For a lock in the poisoned state, unless the state is cleared manually,
all future acquisitions will return this error.

# Examples

```
use std::sync::{Arc, Mutex};
use std::thread;

let mutex = Arc::new(Mutex::new(1));

// poison the mutex
let c_mutex = Arc::clone(&mutex);
let _ = thread::spawn(move || {
    let mut data = c_mutex.lock().unwrap();
    *data = 2;
    panic!();
}).join();

match mutex.lock() {
    Ok(_) => unreachable!(),
    Err(p_err) => {
        let data = p_err.get_ref();
        println!("recovered: {data}");
    }
};
```
[`Mutex`]: crate::sync::Mutex
[`RwLock`]: crate::sync::RwLock

## enum TryLockError

```rust
pub enum TryLockError<T>
```

An enumeration of possible errors associated with a [`TryLockResult`] which
can occur while trying to acquire a lock, from the [`try_lock`] method on a
[`Mutex`] or the [`try_read`] and [`try_write`] methods on an [`RwLock`].

[`try_lock`]: crate::sync::Mutex::try_lock
[`try_read`]: crate::sync::RwLock::try_read
[`try_write`]: crate::sync::RwLock::try_write
[`Mutex`]: crate::sync::Mutex
[`RwLock`]: crate::sync::RwLock

## type LockResult

```rust
pub type LockResult<T> = Result<T, PoisonError<T>>
```

A type alias for the result of a lock method which can be poisoned.

The [`Ok`] variant of this result indicates that the primitive was not
poisoned, and the operation result is contained within. The [`Err`] variant indicates
that the primitive was poisoned. Note that the [`Err`] variant *also* carries
an associated value assigned by the lock method, and it can be acquired through the
[`into_inner`] method. The semantics of the associated value depends on the corresponding
lock method.

[`into_inner`]: PoisonError::into_inner

## type TryLockResult

```rust
pub type TryLockResult<Guard> = Result<Guard, TryLockError<Guard>>
```

A type alias for the result of a nonblocking locking method.

For more information, see [`LockResult`]. A `TryLockResult` doesn't
necessarily hold the associated guard in the [`Err`] type as the lock might not
have been acquired for other reasons.

## PoisonError::new

```rust
pub fn new(data: T) -> PoisonError<T>
```

Creates a `PoisonError`.

This is generally created by methods like [`Mutex::lock`](crate::sync::Mutex::lock)
or [`RwLock::read`](crate::sync::RwLock::read).

This method may panic if std was built with `panic="abort"`.

## PoisonError::new

```rust
pub fn new(_data: T) -> PoisonError<T>
```

Creates a `PoisonError`.

This is generally created by methods like [`Mutex::lock`](crate::sync::Mutex::lock)
or [`RwLock::read`](crate::sync::RwLock::read).

This method may panic if std was built with `panic="abort"`.

## PoisonError::into_inner

```rust
pub fn into_inner(self) -> T
```

Consumes this error indicating that a lock is poisoned, returning the
associated data.

# Examples

```
use std::collections::HashSet;
use std::sync::{Arc, Mutex};
use std::thread;

let mutex = Arc::new(Mutex::new(HashSet::new()));

// poison the mutex
let c_mutex = Arc::clone(&mutex);
let _ = thread::spawn(move || {
    let mut data = c_mutex.lock().unwrap();
    data.insert(10);
    panic!();
}).join();

let p_err = mutex.lock().unwrap_err();
let data = p_err.into_inner();
println!("recovered {} items", data.len());
```

## PoisonError::get_ref

```rust
pub fn get_ref(&self) -> &T
```

Reaches into this error indicating that a lock is poisoned, returning a
reference to the associated data.

## PoisonError::get_mut

```rust
pub fn get_mut(&mut self) -> &mut T
```

Reaches into this error indicating that a lock is poisoned, returning a
mutable reference to the associated data.