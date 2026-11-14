---
title: "std::thread::scoped"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/thread/scoped.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::thread::scoped

## struct Scope

```rust
pub struct Scope<'scope, 'env: 'scope>
```

A scope to spawn scoped threads in.

See `scope` for details.

## struct ScopedJoinHandle

```rust
pub struct ScopedJoinHandle<'scope, T>(JoinInner<'scope, T>)
```

An owned permission to join on a scoped thread (block on its termination).

See `Scope::spawn` for details.

## fn scope

```rust
pub fn scope<'env, F, T>(f: F) -> T where F: for<'scope> FnOnce(&'scope Scope<'scope, 'env>) -> T,
```

Creates a scope for spawning scoped threads.

The function passed to `scope` will be provided a `Scope` object,
through which scoped threads can be [spawned]`Scope::spawn`.

Unlike non-scoped threads, scoped threads can borrow non-`'static` data,
as the scope guarantees all threads will be joined at the end of the scope.

All threads spawned within the scope that haven't been manually joined
will be automatically joined before this function returns.
However, note that joining will only wait for the main function of these threads to finish; even
when this function returns, destructors of thread-local variables in these threads might still
be running.

# Panics

If any of the automatically joined threads panicked, this function will panic.

If you want to handle panics from spawned threads,
`join`[ScopedJoinHandle::join] them before the end of the scope.

# Example

```rust
use std::thread;

let mut a = vec![1, 2, 3];
let mut x = 0;

thread::scope(|s| {
    s.spawn(|| {
        println!("hello from the first scoped thread");
        // We can borrow `a` here.
        dbg!(&a);
    });
    s.spawn(|| {
        println!("hello from the second scoped thread");
        // We can even mutably borrow `x` here,
        // because no other threads are using it.
        x += a[0] + a[2];
    });
    println!("hello from the main thread");
});

// After the scope, we can modify and access our variables again:
a.push(4);
assert_eq!(x, a.len());
```

# Lifetimes

Scoped threads involve two lifetimes: `'scope` and `'env`.

The `'scope` lifetime represents the lifetime of the scope itself.
That is: the time during which new scoped threads may be spawned,
and also the time during which they might still be running.
Once this lifetime ends, all scoped threads are joined.
This lifetime starts within the `scope` function, before `f` (the argument to `scope`) starts.
It ends after `f` returns and all scoped threads have been joined, but before `scope` returns.

The `'env` lifetime represents the lifetime of whatever is borrowed by the scoped threads.
This lifetime must outlast the call to `scope`, and thus cannot be smaller than `'scope`.
It can be as small as the call to `scope`, meaning that anything that outlives this call,
such as local variables defined right before the scope, can be borrowed by the scoped threads.

The `'env: 'scope` bound is part of the definition of the `Scope` type.

## Scope::spawn

```rust
pub fn spawn<F, T>(&'scope self, f: F) -> ScopedJoinHandle<'scope, T> where F: FnOnce() -> T + Send + 'scope, T: Send + 'scope,
```

Spawns a new thread within a scope, returning a `ScopedJoinHandle` for it.

Unlike non-scoped threads, threads spawned with this function may
borrow non-`'static` data from outside the scope. See `scope` for
details.

The join handle provides a `join` method that can be used to join the spawned
thread. If the spawned thread panics, `join` will return an `Err` containing
the panic payload.

If the join handle is dropped, the spawned thread will be implicitly joined at the
end of the scope. In that case, if the spawned thread panics, `scope` will
panic after all threads are joined.

This function creates a thread with the default parameters of `Builder`.
To specify the new thread's stack size or the name, use `Builder::spawn_scoped`.

# Panics

Panics if the OS fails to create a thread; use `Builder::spawn_scoped`
to recover from such errors.

## Builder::spawn_scoped

```rust
pub fn spawn_scoped<'scope, 'env, F, T>( self, scope: &'scope Scope<'scope, 'env>, f: F, ) -> io::Result<ScopedJoinHandle<'scope, T>> where F: FnOnce() -> T + Send + 'scope, T: Send + 'scope,
```

Spawns a new scoped thread using the settings set through this `Builder`.

Unlike `Scope::spawn`, this method yields an `io::Result` to
capture any failure to create the thread at the OS level.

# Panics

Panics if a thread name was set and it contained null bytes.

# Example

```rust
use std::thread;

let mut a = vec![1, 2, 3];
let mut x = 0;

thread::scope(|s| {
    thread::Builder::new()
        .name("first".to_string())
        .spawn_scoped(s, ||
    {
        println!("hello from the {:?} scoped thread", thread::current().name());
        // We can borrow `a` here.
        dbg!(&a);
    })
    .unwrap();
    thread::Builder::new()
        .name("second".to_string())
        .spawn_scoped(s, ||
    {
        println!("hello from the {:?} scoped thread", thread::current().name());
        // We can even mutably borrow `x` here,
        // because no other threads are using it.
        x += a[0] + a[2];
    })
    .unwrap();
    println!("hello from the main thread");
});

// After the scope, we can modify and access our variables again:
a.push(4);
assert_eq!(x, a.len());
```

## ScopedJoinHandle::thread

```rust
pub fn thread(&self) -> &Thread
```

Extracts a handle to the underlying thread.

# Examples

```rust
use std::thread;

thread::scope(|s| {
    let t = s.spawn(|| {
        println!("hello");
    });
    println!("thread id: {:?}", t.thread().id());
});
```

## ScopedJoinHandle::join

```rust
pub fn join(self) -> Result<T>
```

Waits for the associated thread to finish.

This function will return immediately if the associated thread has already finished.
Otherwise, it fully waits for the thread to finish, including all destructors
for thread-local variables that might be running after the main function of the thread.

In terms of [atomic memory orderings], the completion of the associated
thread synchronizes with this function returning.
In other words, all operations performed by that thread
happen before
all operations that happen after `join` returns.

If the associated thread panics, `Err` is returned with the panic payload.

# Examples

```rust
use std::thread;

thread::scope(|s| {
    let t = s.spawn(|| {
        panic!("oh no");
    });
    assert!(t.join().is_err());
});
```

## ScopedJoinHandle::is_finished

```rust
pub fn is_finished(&self) -> bool
```

Checks if the associated thread has finished running its main function.

`is_finished` supports implementing a non-blocking join operation, by checking
`is_finished`, and calling `join` if it returns `true`. This function does not block. To
block while waiting on the thread to finish, use `join`[Self::join].

This might return `true` for a brief moment after the thread's main
function has returned, but before the thread itself has stopped running.
However, once this returns `true`, `join`[Self::join] can be expected
to return quickly, without blocking for any significant amount of time.
