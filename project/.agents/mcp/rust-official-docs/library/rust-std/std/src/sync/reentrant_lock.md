# std::sync::reentrant_lock

## ReentrantLock::new

```rust
pub const fn new(t: T) -> ReentrantLock<T>
```

Creates a new re-entrant lock in an unlocked state ready for use.

# Examples

```
#![feature(reentrant_lock)]
use std::sync::ReentrantLock;

let lock = ReentrantLock::new(0);
```

## ReentrantLock::into_inner

```rust
pub fn into_inner(self) -> T
```

Consumes this lock, returning the underlying data.

# Examples

```
#![feature(reentrant_lock)]

use std::sync::ReentrantLock;

let lock = ReentrantLock::new(0);
assert_eq!(lock.into_inner(), 0);
```

## ReentrantLock::lock

```rust
pub fn lock(&self) -> ReentrantLockGuard<'_, T>
```

Acquires the lock, blocking the current thread until it is able to do
so.

This function will block the caller until it is available to acquire
the lock. Upon returning, the thread is the only thread with the lock
held. When the thread calling this method already holds the lock, the
call succeeds without blocking.

# Examples

```
#![feature(reentrant_lock)]
use std::cell::Cell;
use std::sync::{Arc, ReentrantLock};
use std::thread;

let lock = Arc::new(ReentrantLock::new(Cell::new(0)));
let c_lock = Arc::clone(&lock);

thread::spawn(move || {
    c_lock.lock().set(10);
}).join().expect("`thread::spawn` should not fail");
assert_eq!(lock.lock().get(), 10);
```

## ReentrantLock::get_mut

```rust
pub fn get_mut(&mut self) -> &mut T
```

Returns a mutable reference to the underlying data.

Since this call borrows the `ReentrantLock` mutably, no actual locking
needs to take place -- the mutable borrow statically guarantees no locks
exist.

# Examples

```
#![feature(reentrant_lock)]
use std::sync::ReentrantLock;

let mut lock = ReentrantLock::new(0);
*lock.get_mut() = 10;
assert_eq!(*lock.lock(), 10);
```