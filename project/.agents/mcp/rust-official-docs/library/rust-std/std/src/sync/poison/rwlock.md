---
title: "std::sync::poison::rwlock"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/poison/rwlock.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::poison::rwlock

## struct RwLock

```rust
pub struct RwLock<T: ?Sized>
```

let mut writable_data = data.write().unwrap();
println!("Writer proceeds...");
*writable_data += 1;
```rust

`Mutex`: super::Mutex

## ::RwLockReadGuard

```rust
pub struct RwLockReadGuard<'rwlock, T: ?Sized + 'rwlock>
```

RAII structure used to release the shared read access of a lock when
dropped.

This structure is created by the `read` and `try_read` methods on
`RwLock`.

## ::RwLockWriteGuard

```rust
pub struct RwLockWriteGuard<'rwlock, T: ?Sized + 'rwlock>
```

RAII structure used to release the exclusive write access of a lock when
dropped.

This structure is created by the `write` and `try_write` methods
on `RwLock`.

## RwLock::new

```rust
pub const fn new(t: T) -> RwLock<T>
```

Creates a new instance of an `RwLock<T>` which is unlocked.

# Examples

```rust
use std::sync::RwLock;

let lock = RwLock::new(5);
```

## RwLock::read

```rust
pub fn read(&self) -> LockResult<RwLockReadGuard<'_, T>>
```

Locks this `RwLock` with shared read access, blocking the current thread
until it can be acquired.

The calling thread will be blocked until there are no more writers which
hold the lock. There may be other readers currently inside the lock when
this method returns. This method does not provide any guarantees with
respect to the ordering of whether contentious readers or writers will
acquire the lock first.

Returns an RAII guard which will release this thread's shared access
once it is dropped.

# Errors

This function will return an error if the `RwLock` is poisoned. An
`RwLock` is poisoned whenever a writer panics while holding an exclusive
lock. The failure will occur immediately after the lock has been
acquired. The acquired lock guard will be contained in the returned
error.

# Panics

This function might panic when called if the lock is already held by the current thread
in read or write mode.

# Examples

```rust
use std::sync::{Arc, RwLock};
use std::thread;

let lock = Arc::new(RwLock::new(1));
let c_lock = Arc::clone(&lock);

let n = lock.read().unwrap();
assert_eq!(*n, 1);

thread::spawn(move || {
    let r = c_lock.read();
    assert!(r.is_ok());
}).join().unwrap();
```

## RwLock::try_read

```rust
pub fn try_read(&self) -> TryLockResult<RwLockReadGuard<'_, T>>
```

Attempts to acquire this `RwLock` with shared read access.

If the access could not be granted at this time, then `Err` is returned.
Otherwise, an RAII guard is returned which will release the shared access
when it is dropped.

This function does not block.

This function does not provide any guarantees with respect to the ordering
of whether contentious readers or writers will acquire the lock first.

# Errors

This function will return the `Poisoned` error if the `RwLock` is
poisoned. An `RwLock` is poisoned whenever a writer panics while holding
an exclusive lock. `Poisoned` will only be returned if the lock would
have otherwise been acquired. An acquired lock guard will be contained
in the returned error.

This function will return the `WouldBlock` error if the `RwLock` could
not be acquired because it was already locked exclusively.

# Examples

```rust
use std::sync::RwLock;

let lock = RwLock::new(1);

match lock.try_read() {
    Ok(n) => assert_eq!(*n, 1),
    Err(_) => unreachable!(),
};
```

## RwLock::write

```rust
pub fn write(&self) -> LockResult<RwLockWriteGuard<'_, T>>
```

Locks this `RwLock` with exclusive write access, blocking the current
thread until it can be acquired.

This function will not return while other writers or other readers
currently have access to the lock.

Returns an RAII guard which will drop the write access of this `RwLock`
when dropped.

# Errors

This function will return an error if the `RwLock` is poisoned. An
`RwLock` is poisoned whenever a writer panics while holding an exclusive
lock. An error will be returned when the lock is acquired. The acquired
lock guard will be contained in the returned error.

# Panics

This function might panic when called if the lock is already held by the current thread
in read or write mode.

# Examples

```rust
use std::sync::RwLock;

let lock = RwLock::new(1);

let mut n = lock.write().unwrap();
*n = 2;

assert!(lock.try_read().is_err());
```

## RwLock::try_write

```rust
pub fn try_write(&self) -> TryLockResult<RwLockWriteGuard<'_, T>>
```

Attempts to lock this `RwLock` with exclusive write access.

If the lock could not be acquired at this time, then `Err` is returned.
Otherwise, an RAII guard is returned which will release the lock when
it is dropped.

This function does not block.

This function does not provide any guarantees with respect to the ordering
of whether contentious readers or writers will acquire the lock first.

# Errors

This function will return the `Poisoned` error if the `RwLock` is
poisoned. An `RwLock` is poisoned whenever a writer panics while holding
an exclusive lock. `Poisoned` will only be returned if the lock would
have otherwise been acquired. An acquired lock guard will be contained
in the returned error.

This function will return the `WouldBlock` error if the `RwLock` could
not be acquired because it was already locked.

# Examples

```rust
use std::sync::RwLock;

let lock = RwLock::new(1);

let n = lock.read().unwrap();
assert_eq!(*n, 1);

assert!(lock.try_write().is_err());
```

## RwLock::is_poisoned

```rust
pub fn is_poisoned(&self) -> bool
```

Determines whether the lock is poisoned.

If another thread is active, the lock can still become poisoned at any
time. You should not trust a `false` value for program correctness
without additional synchronization.

# Examples

```rust
use std::sync::{Arc, RwLock};
use std::thread;

let lock = Arc::new(RwLock::new(0));
let c_lock = Arc::clone(&lock);

let _ = thread::spawn(move || {
    let _lock = c_lock.write().unwrap();
    panic!(); // the lock gets poisoned
}).join();
assert_eq!(lock.is_poisoned(), true);
```

## RwLock::clear_poison

```rust
pub fn clear_poison(&self)
```

Clear the poisoned state from a lock.

If the lock is poisoned, it will remain poisoned until this function is called. This allows
recovering from a poisoned state and marking that it has recovered. For example, if the
value is overwritten by a known-good value, then the lock can be marked as un-poisoned. Or
possibly, the value could be inspected to determine if it is in a consistent state, and if
so the poison is removed.

# Examples

```rust
use std::sync::{Arc, RwLock};
use std::thread;

let lock = Arc::new(RwLock::new(0));
let c_lock = Arc::clone(&lock);

let _ = thread::spawn(move || {
    let _lock = c_lock.write().unwrap();
    panic!(); // the lock gets poisoned
}).join();

assert_eq!(lock.is_poisoned(), true);
let guard = lock.write().unwrap_or_else(|mut e| {
    **e.get_mut() = 1;
    lock.clear_poison();
    e.into_inner()
});
assert_eq!(lock.is_poisoned(), false);
assert_eq!(*guard, 1);
```

## RwLock::into_inner

```rust
pub fn into_inner(self) -> LockResult<T> where T: Sized,
```

Consumes this `RwLock`, returning the underlying data.

# Errors

This function will return an error containing the underlying data if
the `RwLock` is poisoned. An `RwLock` is poisoned whenever a writer
panics while holding an exclusive lock. An error will only be returned
if the lock would have otherwise been acquired.

# Examples

```rust
use std::sync::RwLock;

let lock = RwLock::new(String::new());
{
    let mut s = lock.write().unwrap();
    *s = "modified".to_owned();
}
assert_eq!(lock.into_inner().unwrap(), "modified");
```

## RwLock::get_mut

```rust
pub fn get_mut(&mut self) -> LockResult<&mut T>
```

Returns a mutable reference to the underlying data.

Since this call borrows the `RwLock` mutably, no actual locking needs to
take place -- the mutable borrow statically guarantees no new locks can be acquired
while this reference exists. Note that this method does not clear any previously abandoned
locks (e.g., via `forget()` on a `RwLockReadGuard` or `RwLockWriteGuard`).

# Errors

This function will return an error containing a mutable reference to
the underlying data if the `RwLock` is poisoned. An `RwLock` is
poisoned whenever a writer panics while holding an exclusive lock.
An error will only be returned if the lock would have otherwise been
acquired.

# Examples

```rust
use std::sync::RwLock;

let mut lock = RwLock::new(0);
*lock.get_mut().unwrap() = 10;
assert_eq!(*lock.read().unwrap(), 10);
```

## RwLockWriteGuard::downgrade

```rust
pub fn downgrade(s: Self) -> RwLockReadGuard<'rwlock, T>
```

Downgrades a write-locked `RwLockWriteGuard` into a read-locked `RwLockReadGuard`.

Since we have the `RwLockWriteGuard`, the `RwLock` must already be locked for writing, so
this method cannot fail.

After downgrading, other readers will be allowed to read the protected data.

# Examples

`downgrade` takes ownership of the `RwLockWriteGuard` and returns a `RwLockReadGuard`.

```rust
use std::sync::{RwLock, RwLockWriteGuard};

let rw = RwLock::new(0);

let mut write_guard = rw.write().unwrap();
*write_guard = 42;

let read_guard = RwLockWriteGuard::downgrade(write_guard);
assert_eq!(42, *read_guard);
```

`downgrade` will _atomically_ change the state of the `RwLock` from exclusive mode into
shared mode. This means that it is impossible for another writing thread to get in between a
thread calling `downgrade` and any reads it performs after downgrading.

```rust
use std::sync::{Arc, RwLock, RwLockWriteGuard};

let rw = Arc::new(RwLock::new(1));

// Put the lock in write mode.
let mut main_write_guard = rw.write().unwrap();

let rw_clone = rw.clone();
let evil_handle = std::thread::spawn(move || {
    // This will not return until the main thread drops the `main_read_guard`.
    let mut evil_guard = rw_clone.write().unwrap();

    assert_eq!(*evil_guard, 2);
    *evil_guard = 3;
});

*main_write_guard = 2;

// Atomically downgrade the write guard into a read guard.
let main_read_guard = RwLockWriteGuard::downgrade(main_write_guard);

// Since `downgrade` is atomic, the writer thread cannot have changed the protected data.
assert_eq!(*main_read_guard, 2, "`downgrade` was not atomic");
```
