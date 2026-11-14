---
title: "std::sync::poison::condvar"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sync/poison/condvar.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sync::poison::condvar

## struct Condvar

```rust
pub struct Condvar
```

A Condition Variable

Condition variables represent the ability to block a thread such that it
consumes no CPU time while waiting for an event to occur. Condition
variables are typically associated with a boolean predicate (a condition)
and a mutex. The predicate is always verified inside of the mutex before
determining that a thread must block.

Functions in this module will block the current **thread** of execution.
Note that any attempt to use multiple mutexes on the same condition
variable may result in a runtime panic.

# Examples

```rust
use std::sync::{Arc, Mutex, Condvar};
use std::thread;

let pair = Arc::new((Mutex::new(false), Condvar::new()));
let pair2 = Arc::clone(&pair);

// Inside of our lock, spawn a new thread, and then wait for it to start.
thread::spawn(move || {
    let (lock, cvar) = &*pair2;
    let mut started = lock.lock().unwrap();
    *started = true;
    // We notify the condvar that the value has changed.
    cvar.notify_one();
});

// Wait for the thread to start up.
let (lock, cvar) = &*pair;
let mut started = lock.lock().unwrap();
while !*started {
    started = cvar.wait(started).unwrap();
}
```

## Condvar::new

```rust
pub const fn new() -> Condvar
```

Creates a new condition variable which is ready to be waited on and
notified.

# Examples

```rust
use std::sync::Condvar;

let condvar = Condvar::new();
```

## Condvar::wait

```rust
pub fn wait<'a, T>(&self, guard: MutexGuard<'a, T>) -> LockResult<MutexGuard<'a, T>>
```

Blocks the current thread until this condition variable receives a
notification.

This function will atomically unlock the mutex specified (represented by
`guard`) and block the current thread. This means that any calls
to `notify_one` or `notify_all` which happen logically after the
mutex is unlocked are candidates to wake this thread up. When this
function call returns, the lock specified will have been re-acquired.

Note that this function is susceptible to spurious wakeups. Condition
variables normally have a boolean predicate associated with them, and
the predicate must always be checked each time this function returns to
protect against spurious wakeups.

# Errors

This function will return an error if the mutex being waited on is
poisoned when this thread re-acquires the lock. For more information,
see information about [poisoning] on the `Mutex` type.

# Panics

This function may `panic!` if it is used with more than one mutex
over time.

# Examples

```rust
use std::sync::{Arc, Mutex, Condvar};
use std::thread;

let pair = Arc::new((Mutex::new(false), Condvar::new()));
let pair2 = Arc::clone(&pair);

thread::spawn(move || {
    let (lock, cvar) = &*pair2;
    let mut started = lock.lock().unwrap();
    *started = true;
    // We notify the condvar that the value has changed.
    cvar.notify_one();
});

// Wait for the thread to start up.
let (lock, cvar) = &*pair;
let mut started = lock.lock().unwrap();
// As long as the value inside the `Mutex<bool>` is `false`, we wait.
while !*started {
    started = cvar.wait(started).unwrap();
}
```

## Condvar::wait_while

```rust
pub fn wait_while<'a, T, F>( &self, mut guard: MutexGuard<'a, T>, mut condition: F, ) -> LockResult<MutexGuard<'a, T>> where F: FnMut(&mut T) -> bool,
```

Blocks the current thread until the provided condition becomes false.

`condition` is checked immediately; if not met (returns `true`), this
will `wait` for the next notification then check again. This repeats
until `condition` returns `false`, in which case this function returns.

This function will atomically unlock the mutex specified (represented by
`guard`) and block the current thread. This means that any calls
to `notify_one` or `notify_all` which happen logically after the
mutex is unlocked are candidates to wake this thread up. When this
function call returns, the lock specified will have been re-acquired.

# Errors

This function will return an error if the mutex being waited on is
poisoned when this thread re-acquires the lock. For more information,
see information about [poisoning] on the `Mutex` type.

# Examples

```rust
use std::sync::{Arc, Mutex, Condvar};
use std::thread;

let pair = Arc::new((Mutex::new(true), Condvar::new()));
let pair2 = Arc::clone(&pair);

thread::spawn(move || {
    let (lock, cvar) = &*pair2;
    let mut pending = lock.lock().unwrap();
    *pending = false;
    // We notify the condvar that the value has changed.
    cvar.notify_one();
});

// Wait for the thread to start up.
let (lock, cvar) = &*pair;
// As long as the value inside the `Mutex<bool>` is `true`, we wait.
let _guard = cvar.wait_while(lock.lock().unwrap(), |pending| { *pending }).unwrap();
```

## Condvar::wait_timeout_ms

```rust
pub fn wait_timeout_ms<'a, T>( &self, guard: MutexGuard<'a, T>, ms: u32, ) -> LockResult<(MutexGuard<'a, T>, bool)>
```

Waits on this condition variable for a notification, timing out after a
specified duration.

The semantics of this function are equivalent to `wait`
except that the thread will be blocked for roughly no longer
than `ms` milliseconds. This method should not be used for
precise timing due to anomalies such as preemption or platform
differences that might not cause the maximum amount of time
waited to be precisely `ms`.

Note that the best effort is made to ensure that the time waited is
measured with a monotonic clock, and not affected by the changes made to
the system time.

The returned boolean is `false` only if the timeout is known
to have elapsed.

Like `wait`, the lock specified will be re-acquired when this function
returns, regardless of whether the timeout elapsed or not.

# Examples

```rust
use std::sync::{Arc, Mutex, Condvar};
use std::thread;

let pair = Arc::new((Mutex::new(false), Condvar::new()));
let pair2 = Arc::clone(&pair);

thread::spawn(move || {
    let (lock, cvar) = &*pair2;
    let mut started = lock.lock().unwrap();
    *started = true;
    // We notify the condvar that the value has changed.
    cvar.notify_one();
});

// Wait for the thread to start up.
let (lock, cvar) = &*pair;
let mut started = lock.lock().unwrap();
// As long as the value inside the `Mutex<bool>` is `false`, we wait.
loop {
    let result = cvar.wait_timeout_ms(started, 10).unwrap();
    // 10 milliseconds have passed, or maybe the value changed!
    started = result.0;
    if *started == true {
        // We received the notification and the value has been updated, we can leave.
        break
    }
}
```

## Condvar::wait_timeout

```rust
pub fn wait_timeout<'a, T>( &self, guard: MutexGuard<'a, T>, dur: Duration, ) -> LockResult<(MutexGuard<'a, T>, WaitTimeoutResult)>
```

Waits on this condition variable for a notification, timing out after a
specified duration.

The semantics of this function are equivalent to `wait` except that
the thread will be blocked for roughly no longer than `dur`. This
method should not be used for precise timing due to anomalies such as
preemption or platform differences that might not cause the maximum
amount of time waited to be precisely `dur`.

Note that the best effort is made to ensure that the time waited is
measured with a monotonic clock, and not affected by the changes made to
the system time. This function is susceptible to spurious wakeups.
Condition variables normally have a boolean predicate associated with
them, and the predicate must always be checked each time this function
returns to protect against spurious wakeups. Furthermore, since the timeout
is given relative to the moment this function is called, it needs to be adjusted
when this function is called in a loop. The `wait_timeout_while` method
lets you wait with a timeout while a predicate is true, taking care of all these concerns.

The returned `WaitTimeoutResult` value indicates if the timeout is
known to have elapsed.

Like `wait`, the lock specified will be re-acquired when this function
returns, regardless of whether the timeout elapsed or not.

# Examples

```rust
use std::sync::{Arc, Mutex, Condvar};
use std::thread;
use std::time::Duration;

let pair = Arc::new((Mutex::new(false), Condvar::new()));
let pair2 = Arc::clone(&pair);

thread::spawn(move || {
    let (lock, cvar) = &*pair2;
    let mut started = lock.lock().unwrap();
    *started = true;
    // We notify the condvar that the value has changed.
    cvar.notify_one();
});

// wait for the thread to start up
let (lock, cvar) = &*pair;
let mut started = lock.lock().unwrap();
// as long as the value inside the `Mutex<bool>` is `false`, we wait
loop {
    let result = cvar.wait_timeout(started, Duration::from_millis(10)).unwrap();
    // 10 milliseconds have passed, or maybe the value changed!
    started = result.0;
    if *started == true {
        // We received the notification and the value has been updated, we can leave.
        break
    }
}
```

## Condvar::wait_timeout_while

```rust
pub fn wait_timeout_while<'a, T, F>( &self, mut guard: MutexGuard<'a, T>, dur: Duration, mut condition: F, ) -> LockResult<(MutexGuard<'a, T>, WaitTimeoutResult)> where F: FnMut(&mut T) -> bool,
```

Waits on this condition variable for a notification, timing out after a
specified duration.

The semantics of this function are equivalent to `wait_while` except
that the thread will be blocked for roughly no longer than `dur`. This
method should not be used for precise timing due to anomalies such as
preemption or platform differences that might not cause the maximum
amount of time waited to be precisely `dur`.

Note that the best effort is made to ensure that the time waited is
measured with a monotonic clock, and not affected by the changes made to
the system time.

The returned `WaitTimeoutResult` value indicates if the timeout is
known to have elapsed without the condition being met.

Like `wait_while`, the lock specified will be re-acquired when this
function returns, regardless of whether the timeout elapsed or not.

# Examples

```rust
use std::sync::{Arc, Mutex, Condvar};
use std::thread;
use std::time::Duration;

let pair = Arc::new((Mutex::new(true), Condvar::new()));
let pair2 = Arc::clone(&pair);

thread::spawn(move || {
    let (lock, cvar) = &*pair2;
    let mut pending = lock.lock().unwrap();
    *pending = false;
    // We notify the condvar that the value has changed.
    cvar.notify_one();
});

// wait for the thread to start up
let (lock, cvar) = &*pair;
let result = cvar.wait_timeout_while(
    lock.lock().unwrap(),
    Duration::from_millis(100),
    |&mut pending| pending,
).unwrap();
if result.1.timed_out() {
    // timed-out without the condition ever evaluating to false.
}
// access the locked mutex via result.0
```

## Condvar::notify_one

```rust
pub fn notify_one(&self)
```

Wakes up one blocked thread on this condvar.

If there is a blocked thread on this condition variable, then it will
be woken up from its call to `wait` or `wait_timeout`. Calls to
`notify_one` are not buffered in any way.

To wake up all threads, see `notify_all`.

# Examples

```rust
use std::sync::{Arc, Mutex, Condvar};
use std::thread;

let pair = Arc::new((Mutex::new(false), Condvar::new()));
let pair2 = Arc::clone(&pair);

thread::spawn(move || {
    let (lock, cvar) = &*pair2;
    let mut started = lock.lock().unwrap();
    *started = true;
    // We notify the condvar that the value has changed.
    cvar.notify_one();
});

// Wait for the thread to start up.
let (lock, cvar) = &*pair;
let mut started = lock.lock().unwrap();
// As long as the value inside the `Mutex<bool>` is `false`, we wait.
while !*started {
    started = cvar.wait(started).unwrap();
}
```

## Condvar::notify_all

```rust
pub fn notify_all(&self)
```

Wakes up all blocked threads on this condvar.

This method will ensure that any current waiters on the condition
variable are awoken. Calls to `notify_all()` are not buffered in any
way.

To wake up only one thread, see `notify_one`.

# Examples

```rust
use std::sync::{Arc, Mutex, Condvar};
use std::thread;

let pair = Arc::new((Mutex::new(false), Condvar::new()));
let pair2 = Arc::clone(&pair);

thread::spawn(move || {
    let (lock, cvar) = &*pair2;
    let mut started = lock.lock().unwrap();
    *started = true;
    // We notify the condvar that the value has changed.
    cvar.notify_all();
});

// Wait for the thread to start up.
let (lock, cvar) = &*pair;
let mut started = lock.lock().unwrap();
// As long as the value inside the `Mutex<bool>` is `false`, we wait.
while !*started {
    started = cvar.wait(started).unwrap();
}
```
