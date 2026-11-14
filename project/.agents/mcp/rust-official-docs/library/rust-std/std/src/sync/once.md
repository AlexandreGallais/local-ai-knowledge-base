# std::sync::once

A "once initialization" primitive

This primitive is meant to be used to run one-time initialization. An
example use case would be for initializing an FFI library.

## struct Once

```rust
pub struct Once
```

A low-level synchronization primitive for one-time global execution.

Previously this was the only "execute once" synchronization in `std`.
Other libraries implemented novel synchronizing types with `Once`, like
[`OnceLock<T>`] or [`LazyLock<T, F>`], before those were added to `std`.
`OnceLock<T>` in particular supersedes `Once` in functionality and should
be preferred for the common case where the `Once` is associated with data.

This type can only be constructed with [`Once::new()`].

# Examples

```
use std::sync::Once;

static START: Once = Once::new();

START.call_once(|| {
    // run initialization here
});
```

[`OnceLock<T>`]: crate::sync::OnceLock
[`LazyLock<T, F>`]: crate::sync::LazyLock

## ::OnceState

```rust
pub struct OnceState
```

State yielded to [`Once::call_once_force()`]’s closure parameter. The state
can be used to query the poison status of the [`Once`].

## const ONCE_INIT

```rust
pub const ONCE_INIT: Once = Once::new()
```

Initialization value for static [`Once`] values.

# Examples

```
use std::sync::{Once, ONCE_INIT};

static START: Once = ONCE_INIT;
```

## Once::new

```rust
pub const fn new() -> Once
```

Creates a new `Once` value.

## Once::call_once

```rust
pub fn call_once<F>(&self, f: F) where F: FnOnce(),
```

Performs an initialization routine once and only once. The given closure
will be executed if this is the first time `call_once` has been called,
and otherwise the routine will *not* be invoked.

This method will block the calling thread if another initialization
routine is currently running.

When this function returns, it is guaranteed that some initialization
has run and completed (it might not be the closure specified). It is also
guaranteed that any memory writes performed by the executed closure can
be reliably observed by other threads at this point (there is a
happens-before relation between the closure and code executing after the
return).

If the given closure recursively invokes `call_once` on the same [`Once`]
instance, the exact behavior is not specified: allowed outcomes are
a panic or a deadlock.

# Examples

```
use std::sync::Once;

static mut VAL: usize = 0;
static INIT: Once = Once::new();

// Accessing a `static mut` is unsafe much of the time, but if we do so
// in a synchronized fashion (e.g., write once or read all) then we're
// good to go!
//
// This function will only call `expensive_computation` once, and will
// otherwise always return the value returned from the first invocation.
fn get_cached_val() -> usize {
    unsafe {
        INIT.call_once(|| {
            VAL = expensive_computation();
        });
        VAL
    }
}

fn expensive_computation() -> usize {
    // ...
# 2
}
```

# Panics

The closure `f` will only be executed once even if this is called
concurrently amongst many threads. If that closure panics, however, then
it will *poison* this [`Once`] instance, causing all future invocations of
`call_once` to also panic.

This is similar to [poisoning with mutexes][poison], but this mechanism
is guaranteed to never skip panics within `f`.

[poison]: struct.Mutex.html#poisoning

## Once::call_once_force

```rust
pub fn call_once_force<F>(&self, f: F) where F: FnOnce(&OnceState),
```

Performs the same function as [`call_once()`] except ignores poisoning.

Unlike [`call_once()`], if this [`Once`] has been poisoned (i.e., a previous
call to [`call_once()`] or [`call_once_force()`] caused a panic), calling
[`call_once_force()`] will still invoke the closure `f` and will _not_
result in an immediate panic. If `f` panics, the [`Once`] will remain
in a poison state. If `f` does _not_ panic, the [`Once`] will no
longer be in a poison state and all future calls to [`call_once()`] or
[`call_once_force()`] will be no-ops.

The closure `f` is yielded a [`OnceState`] structure which can be used
to query the poison status of the [`Once`].

[`call_once()`]: Once::call_once
[`call_once_force()`]: Once::call_once_force

# Examples

```
use std::sync::Once;
use std::thread;

static INIT: Once = Once::new();

// poison the once
let handle = thread::spawn(|| {
    INIT.call_once(|| panic!());
});
assert!(handle.join().is_err());

// poisoning propagates
let handle = thread::spawn(|| {
    INIT.call_once(|| {});
});
assert!(handle.join().is_err());

// call_once_force will still run and reset the poisoned state
INIT.call_once_force(|state| {
    assert!(state.is_poisoned());
});

// once any success happens, we stop propagating the poison
INIT.call_once(|| {});
```

## Once::is_completed

```rust
pub fn is_completed(&self) -> bool
```

Returns `true` if some [`call_once()`] call has completed
successfully. Specifically, `is_completed` will return false in
the following situations:
  * [`call_once()`] was not called at all,
  * [`call_once()`] was called, but has not yet completed,
  * the [`Once`] instance is poisoned

This function returning `false` does not mean that [`Once`] has not been
executed. For example, it may have been executed in the time between
when `is_completed` starts executing and when it returns, in which case
the `false` return value would be stale (but still permissible).

[`call_once()`]: Once::call_once

# Examples

```
use std::sync::Once;

static INIT: Once = Once::new();

assert_eq!(INIT.is_completed(), false);
INIT.call_once(|| {
    assert_eq!(INIT.is_completed(), false);
});
assert_eq!(INIT.is_completed(), true);
```

```
use std::sync::Once;
use std::thread;

static INIT: Once = Once::new();

assert_eq!(INIT.is_completed(), false);
let handle = thread::spawn(|| {
    INIT.call_once(|| panic!());
});
assert!(handle.join().is_err());
assert_eq!(INIT.is_completed(), false);
```

## Once::wait

```rust
pub fn wait(&self)
```

Blocks the current thread until initialization has completed.

# Example

```rust
use std::sync::Once;
use std::thread;

static READY: Once = Once::new();

let thread = thread::spawn(|| {
    READY.wait();
    println!("everything is ready");
});

READY.call_once(|| println!("performing setup"));
```

# Panics

If this [`Once`] has been poisoned because an initialization closure has
panicked, this method will also panic. Use [`wait_force`](Self::wait_force)
if this behavior is not desired.

## Once::wait_force

```rust
pub fn wait_force(&self)
```

Blocks the current thread until initialization has completed, ignoring
poisoning.

If this [`Once`] has been poisoned, this function blocks until it
becomes completed, unlike [`Once::wait()`], which panics in this case.

## OnceState::is_poisoned

```rust
pub fn is_poisoned(&self) -> bool
```

Returns `true` if the associated [`Once`] was poisoned prior to the
invocation of the closure passed to [`Once::call_once_force()`].

# Examples

A poisoned [`Once`]:

```
use std::sync::Once;
use std::thread;

static INIT: Once = Once::new();

// poison the once
let handle = thread::spawn(|| {
    INIT.call_once(|| panic!());
});
assert!(handle.join().is_err());

INIT.call_once_force(|state| {
    assert!(state.is_poisoned());
});
```

An unpoisoned [`Once`]:

```
use std::sync::Once;

static INIT: Once = Once::new();

INIT.call_once_force(|state| {
    assert!(!state.is_poisoned());
});