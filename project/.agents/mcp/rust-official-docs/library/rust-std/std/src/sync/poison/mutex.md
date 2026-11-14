---
title: "std::sync::poison::mutex"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/poison/mutex.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::poison::mutex

## struct Mutex

```rust
pub struct Mutex<T: ?Sized>
```

A mutual exclusion primitive useful for protecting shared data

This mutex will block threads waiting for the lock to become available. The
mutex can be created via a `new` constructor. Each mutex has a type parameter
which represents the data that it is protecting. The data can only be accessed
through the RAII guards returned from `lock` and `try_lock`, which
guarantees that the data is only ever accessed when the mutex is locked.

# Poisoning

The mutexes in this module implement a strategy called "poisoning" where a
mutex becomes poisoned if it recognizes that the thread holding it has
panicked.

Once a mutex is poisoned, all other threads are unable to access the data by
default as it is likely tainted (some invariant is not being upheld). For a
mutex, this means that the `lock` and `try_lock` methods return a
`Result` which indicates whether a mutex has been poisoned or not. Most
usage of a mutex will simply `unwrap()` these results, propagating panics
among threads to ensure that a possibly invalid invariant is not witnessed.

Poisoning is only advisory: the `PoisonError` type has an `into_inner`
method which will return the guard that would have otherwise been returned
on a successful lock. This allows access to the data, despite the lock being
poisoned.

In addition, the panic detection is not ideal, so even unpoisoned mutexes
need to be handled with care, since certain panics may have been skipped.
Here is a non-exhaustive list of situations where this might occur:

- If a mutex is locked while a panic is underway, e.g. within a `Drop`
  implementation or a [panic hook], panicking for the second time while the
  lock is held will leave the mutex unpoisoned. Note that while double panic
  usually aborts the program, `catch_unwind` can prevent this.

- Locking and unlocking the mutex across different panic contexts, e.g. by
  storing the guard to a `Cell` within `Drop::drop` and accessing it
  outside, or vice versa, can affect poisoning status in an unexpected way.

- Foreign exceptions do not currently trigger poisoning even in absence of
  other panics.

While this rarely happens in realistic code, `unsafe` code cannot rely on
poisoning for soundness, since the behavior of poisoning can depend on
outside context. Here's an example of **incorrect** use of poisoning:

```rust
use std::sync::Mutex;

struct MutexBox<T> {
    data: Mutex<*mut T>,
}

impl<T> MutexBox<T> {
    pub fn new(value: T) -> Self {
        Self {
            data: Mutex::new(Box::into_raw(Box::new(value))),
        }
    }

    pub fn replace_with(&self, f: impl FnOnce(T) -> T) {
        let ptr = self.data.lock().expect("`Mutex` should not be poisoned");
        // While `f` is running, the data is moved out of `*ptr`. If `f`
        // panics, `*ptr` keeps pointing at a dropped value. The intention
        // is that this will poison the mutex, so the following calls to
        // `replace_with` will panic without reading `*ptr`. But since
        // poisoning is not guaranteed to occur if this is run from a panic
        // hook, this can lead to use-after-free.
        unsafe {
            (*ptr).write(f((*ptr).read()));
        }
    }
}
```

# Examples

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::sync::mpsc::channel;

const N: usize = 10;

// Spawn a few threads to increment a shared variable (non-atomically), and
// let the main thread know once all increments are done.
//
// Here we're using an Arc to share memory among threads, and the data inside
// the Arc is protected with a mutex.
let data = Arc::new(Mutex::new(0));

let (tx, rx) = channel();
for _ in 0..N {
    let (data, tx) = (Arc::clone(&data), tx.clone());
    thread::spawn(move || {
        // The shared state can only be accessed once the lock is held.
        // Our non-atomic increment is safe because we're the only thread
        // which can access the shared state when the lock is held.
        //
        // We unwrap() the return value to assert that we are not expecting
        // threads to ever fail while holding the lock.
        let mut data = data.lock().unwrap();
        *data += 1;
        if *data == N {
            tx.send(()).unwrap();
        }
        // the lock is unlocked here when `data` goes out of scope.
    });
}

rx.recv().unwrap();
```

To recover from a poisoned mutex:

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let lock = Arc::new(Mutex::new(0_u32));
let lock2 = Arc::clone(&lock);

let _ = thread::spawn(move || -> () {
    // This thread will acquire the mutex first, unwrapping the result of
    // `lock` because the lock has not been poisoned.
    let _guard = lock2.lock().unwrap();

    // This panic while holding the lock (`_guard` is in scope) will poison
    // the mutex.
    panic!();
}).join();

// The lock is poisoned by this point, but the returned result can be
// pattern matched on to return the underlying guard on both branches.
let mut guard = match lock.lock() {
    Ok(guard) => guard,
    Err(poisoned) => poisoned.into_inner(),
};

*guard += 1;
```

To unlock a mutex guard sooner than the end of the enclosing scope,
either create an inner scope or drop the guard manually.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

const N: usize = 3;

let data_mutex = Arc::new(Mutex::new(vec![1, 2, 3, 4]));
let res_mutex = Arc::new(Mutex::new(0));

let mut threads = Vec::with_capacity(N);
(0..N).for_each(|_| {
    let data_mutex_clone = Arc::clone(&data_mutex);
    let res_mutex_clone = Arc::clone(&res_mutex);

    threads.push(thread::spawn(move || {
        // Here we use a block to limit the lifetime of the lock guard.
        let result = {
            let mut data = data_mutex_clone.lock().unwrap();
            // This is the result of some important and long-ish work.
            let result = data.iter().fold(0, |acc, x| acc + x * 2);
            data.push(result);
            result
            // The mutex guard gets dropped here, together with any other values
            // created in the critical section.
        };
        // The guard created here is a temporary dropped at the end of the statement, i.e.
        // the lock would not remain being held even if the thread did some additional work.
        *res_mutex_clone.lock().unwrap() += result;
    }));
});

let mut data = data_mutex.lock().unwrap();
// This is the result of some important and long-ish work.
let result = data.iter().fold(0, |acc, x| acc + x * 2);
data.push(result);
// We drop the `data` explicitly because it's not necessary anymore and the
// thread still has work to do. This allows other threads to start working on
// the data immediately, without waiting for the rest of the unrelated work
// to be done here.
//
// It's even more important here than in the threads because we `.join` the
// threads after that. If we had not dropped the mutex guard, a thread could
// be waiting forever for it, causing a deadlock.
// As in the threads, a block could have been used instead of calling the
// `drop` function.
drop(data);
// Here the mutex guard is not assigned to a variable and so, even if the
// scope does not end after this line, the mutex is still released: there is
// no deadlock.
*res_mutex.lock().unwrap() += result;

threads.into_iter().for_each(|thread| {
    thread
        .join()
        .expect("Thread creation or execution should not fail")
});

assert_eq!(*res_mutex.lock().unwrap(), 800);
```

## ::MutexGuard

```rust
pub struct MutexGuard<'a, T: ?Sized + 'a>
```

An RAII implementation of a "scoped lock" of a mutex. When this structure is
dropped (falls out of scope), the lock will be unlocked.

The data protected by the mutex can be accessed through this guard via its
`Deref` and `DerefMut` implementations.

This structure is created by the `lock` and `try_lock` methods on
`Mutex`.

## Mutex::new

```rust
pub const fn new(t: T) -> Mutex<T>
```

Creates a new mutex in an unlocked state ready for use.

# Examples

```rust
use std::sync::Mutex;

let mutex = Mutex::new(0);
```

## Mutex::lock

```rust
pub fn lock(&self) -> LockResult<MutexGuard<'_, T>>
```

Acquires a mutex, blocking the current thread until it is able to do so.

This function will block the local thread until it is available to acquire
the mutex. Upon returning, the thread is the only thread with the lock
held. An RAII guard is returned to allow scoped unlock of the lock. When
the guard goes out of scope, the mutex will be unlocked.

The exact behavior on locking a mutex in the thread which already holds
the lock is left unspecified. However, this function will not return on
the second call (it might panic or deadlock, for example).

# Errors

If another user of this mutex panicked while holding the mutex, then
this call will return an error once the mutex is acquired. The acquired
mutex guard will be contained in the returned error.

# Panics

This function might panic when called if the lock is already held by
the current thread.

# Examples

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let mutex = Arc::new(Mutex::new(0));
let c_mutex = Arc::clone(&mutex);

thread::spawn(move || {
    *c_mutex.lock().unwrap() = 10;
}).join().expect("`thread::spawn` should not fail");
assert_eq!(*mutex.lock().unwrap(), 10);
```

## Mutex::try_lock

```rust
pub fn try_lock(&self) -> TryLockResult<MutexGuard<'_, T>>
```

Attempts to acquire this lock.

If the lock could not be acquired at this time, then `Err` is returned.
Otherwise, an RAII guard is returned. The lock will be unlocked when the
guard is dropped.

This function does not block.

# Errors

If another user of this mutex panicked while holding the mutex, then
this call will return the `Poisoned` error if the mutex would
otherwise be acquired. An acquired lock guard will be contained
in the returned error.

If the mutex could not be acquired because it is already locked, then
this call will return the `WouldBlock` error.

# Examples

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let mutex = Arc::new(Mutex::new(0));
let c_mutex = Arc::clone(&mutex);

thread::spawn(move || {
    let mut lock = c_mutex.try_lock();
    if let Ok(ref mut mutex) = lock {
        **mutex = 10;
    } else {
        println!("try_lock failed");
    }
}).join().expect("`thread::spawn` should not fail");
assert_eq!(*mutex.lock().unwrap(), 10);
```

## Mutex::is_poisoned

```rust
pub fn is_poisoned(&self) -> bool
```

Determines whether the mutex is poisoned.

If another thread is active, the mutex can still become poisoned at any
time. You should not trust a `false` value for program correctness
without additional synchronization.

# Examples

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let mutex = Arc::new(Mutex::new(0));
let c_mutex = Arc::clone(&mutex);

let _ = thread::spawn(move || {
    let _lock = c_mutex.lock().unwrap();
    panic!(); // the mutex gets poisoned
}).join();
assert_eq!(mutex.is_poisoned(), true);
```

## Mutex::clear_poison

```rust
pub fn clear_poison(&self)
```

Clear the poisoned state from a mutex.

If the mutex is poisoned, it will remain poisoned until this function is called. This
allows recovering from a poisoned state and marking that it has recovered. For example, if
the value is overwritten by a known-good value, then the mutex can be marked as
un-poisoned. Or possibly, the value could be inspected to determine if it is in a
consistent state, and if so the poison is removed.

# Examples

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let mutex = Arc::new(Mutex::new(0));
let c_mutex = Arc::clone(&mutex);

let _ = thread::spawn(move || {
    let _lock = c_mutex.lock().unwrap();
    panic!(); // the mutex gets poisoned
}).join();

assert_eq!(mutex.is_poisoned(), true);
let x = mutex.lock().unwrap_or_else(|mut e| {
    **e.get_mut() = 1;
    mutex.clear_poison();
    e.into_inner()
});
assert_eq!(mutex.is_poisoned(), false);
assert_eq!(*x, 1);
```

## Mutex::into_inner

```rust
pub fn into_inner(self) -> LockResult<T> where T: Sized,
```

Consumes this mutex, returning the underlying data.

# Errors

If another user of this mutex panicked while holding the mutex, then
this call will return an error containing the underlying data
instead.

# Examples

```rust
use std::sync::Mutex;

let mutex = Mutex::new(0);
assert_eq!(mutex.into_inner().unwrap(), 0);
```

## Mutex::get_mut

```rust
pub fn get_mut(&mut self) -> LockResult<&mut T>
```

Returns a mutable reference to the underlying data.

Since this call borrows the `Mutex` mutably, no actual locking needs to
take place -- the mutable borrow statically guarantees no new locks can be acquired
while this reference exists. Note that this method does not clear any previous abandoned locks
(e.g., via `forget()` on a `MutexGuard`).

# Errors

If another user of this mutex panicked while holding the mutex, then
this call will return an error containing a mutable reference to the
underlying data instead.

# Examples

```rust
use std::sync::Mutex;

let mut mutex = Mutex::new(0);
*mutex.get_mut().unwrap() = 10;
assert_eq!(*mutex.lock().unwrap(), 10);
```
