---
title: "std::thread::functions (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/thread/functions.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::thread::functions

Free functions.

## fn spawn

```rust
pub fn spawn<F, T>(f: F) -> JoinHandle<T> where F: FnOnce() -> T, F: Send + 'static, T: Send + 'static,
```

Spawns a new thread, returning a `JoinHandle` for it.

The join handle provides a `join` method that can be used to join the spawned
thread. If the spawned thread panics, `join` will return an `Err` containing
the argument given to `panic!`.

If the join handle is dropped, the spawned thread will implicitly be *detached*.
In this case, the spawned thread may no longer be joined.
(It is the responsibility of the program to either eventually join threads it
creates or detach them; otherwise, a resource leak will result.)

This function creates a thread with the default parameters of `Builder`.
To specify the new thread's stack size or the name, use `Builder::spawn`.

As you can see in the signature of `spawn` there are two constraints on
both the closure given to `spawn` and its return value, let's explain them:

- The `'static` constraint means that the closure and its return value
  must have a lifetime of the whole program execution. The reason for this
  is that threads can outlive the lifetime they have been created in.

  Indeed if the thread, and by extension its return value, can outlive their
  caller, we need to make sure that they will be valid afterwards, and since
  we *can't* know when it will return we need to have them valid as long as
  possible, that is until the end of the program, hence the `'static`
  lifetime.
- The `Send` constraint is because the closure will need to be passed
  *by value* from the thread where it is spawned to the new thread. Its
  return value will need to be passed from the new thread to the thread
  where it is `join`ed.
  As a reminder, the `Send` marker trait expresses that it is safe to be
  passed from thread to thread. `Sync` expresses that it is safe to have a
  reference be passed from thread to thread.

# Panics

Panics if the OS fails to create a thread; use `Builder::spawn`
to recover from such errors.

# Examples

Creating a thread.

```rust
use std::thread;

let handler = thread::spawn(|| {
    // thread code
});

handler.join().unwrap();
```

As mentioned in the module documentation, threads are usually made to
communicate using `channels`, here is how it usually looks.

This example also shows how to use `move`, in order to give ownership
of values to a thread.

```rust
use std::thread;
use std::sync::mpsc::channel;

let (tx, rx) = channel();

let sender = thread::spawn(move || {
    tx.send("Hello, thread".to_owned())
        .expect("Unable to send on channel");
});

let receiver = thread::spawn(move || {
    let value = rx.recv().expect("Unable to receive from channel");
    println!("{value}");
});

sender.join().expect("The sender thread has panicked");
receiver.join().expect("The receiver thread has panicked");
```

A thread can also return a value through its `JoinHandle`, you can use
this to make asynchronous computations (futures might be more appropriate
though).

```rust
use std::thread;

let computation = thread::spawn(|| {
    // Some expensive computation.
    42
});

let result = computation.join().unwrap();
println!("{result}");
```

# Notes

This function has the same minimal guarantee regarding "foreign" unwinding operations (e.g.
an exception thrown from C++ code, or a `panic!` in Rust code compiled or linked with a
different runtime) as `catch_unwind`; namely, if the thread created with `thread::spawn`
unwinds all the way to the root with such an exception, one of two behaviors are possible,
and it is unspecified which will occur:

* The process aborts.
* The process does not abort, and `join` will return a `Result::Err`
  containing an opaque type.

## fn yield_now

```rust
pub fn yield_now()
```

Cooperatively gives up a timeslice to the OS scheduler.

This calls the underlying OS scheduler's yield primitive, signaling
that the calling thread is willing to give up its remaining timeslice
so that the OS may schedule other threads on the CPU.

A drawback of yielding in a loop is that if the OS does not have any
other ready threads to run on the current CPU, the thread will effectively
busy-wait, which wastes CPU time and energy.

Therefore, when waiting for events of interest, a programmer's first
choice should be to use synchronization devices such as `channel`s,
`Condvar`s, `Mutex`es or `join` since these primitives are
implemented in a blocking manner, giving up the CPU until the event
of interest has occurred which avoids repeated yielding.

`yield_now` should thus be used only rarely, mostly in situations where
repeated polling is required because there is no other suitable way to
learn when an event of interest has occurred.

# Examples

```rust
use std::thread;

thread::yield_now();
```

## fn panicking

```rust
pub fn panicking() -> bool
```

Determines whether the current thread is panicking.

This returns `true` both when the thread is unwinding due to a panic,
or executing a panic hook. Note that the latter case will still happen
when `panic=abort` is set.

A common use of this feature is to poison shared resources when writing
unsafe code, by checking `panicking` when the `drop` is called.

This is usually not needed when writing safe code, as `Mutex`es
already poison themselves when a thread panics while holding the lock.

This can also be used in multithreaded applications, in order to send a
message to other threads warning that a thread has panicked (e.g., for
monitoring purposes).

# Examples

```rust
use std::thread;

struct SomeStruct;

impl Drop for SomeStruct {
    fn drop(&mut self) {
        if thread::panicking() {
            println!("dropped while unwinding");
        } else {
            println!("dropped while not unwinding");
        }
    }
}

{
    print!("a: ");
    let a = SomeStruct;
}

{
    print!("b: ");
    let b = SomeStruct;
    panic!()
}
```

## fn sleep_ms

```rust
pub fn sleep_ms(ms: u32)
```

Uses `sleep`.

Puts the current thread to sleep for at least the specified amount of time.

The thread may sleep longer than the duration specified due to scheduling
specifics or platform-dependent functionality. It will never sleep less.

This function is blocking, and should not be used in `async` functions.

# Platform-specific behavior

On Unix platforms, the underlying syscall may be interrupted by a
spurious wakeup or signal handler. To ensure the sleep occurs for at least
the specified duration, this function may invoke that system call multiple
times.

# Examples

```rust
use std::thread;

// Let's sleep for 2 seconds:
thread::sleep_ms(2000);
```

## fn sleep

```rust
pub fn sleep(dur: Duration)
```

Puts the current thread to sleep for at least the specified amount of time.

The thread may sleep longer than the duration specified due to scheduling
specifics or platform-dependent functionality. It will never sleep less.

This function is blocking, and should not be used in `async` functions.

# Platform-specific behavior

On Unix platforms, the underlying syscall may be interrupted by a
spurious wakeup or signal handler. To ensure the sleep occurs for at least
the specified duration, this function may invoke that system call multiple
times.
Platforms which do not support nanosecond precision for sleeping will
have `dur` rounded up to the nearest granularity of time they can sleep for.

Currently, specifying a zero duration on Unix platforms returns immediately
without invoking the underlying `nanosleep` syscall, whereas on Windows
platforms the underlying `Sleep` syscall is always invoked.
If the intention is to yield the current time-slice you may want to use
`yield_now` instead.

# Examples

```rust
use std::{thread, time};

let ten_millis = time::Duration::from_millis(10);
let now = time::Instant::now();

thread::sleep(ten_millis);

assert!(now.elapsed() >= ten_millis);
```

## fn park

```rust
pub fn park()
```

Blocks unless or until the current thread's token is made available.

A call to `park` does not guarantee that the thread will remain parked
forever, and callers should be prepared for this possibility. However,
it is guaranteed that this function will not panic (it may abort the
process if the implementation encounters some rare errors).

# `park` and `unpark`

Every thread is equipped with some basic <example-value> blocking support, via the
`thread::park``park` function and `thread::Thread::unpark``unpark`
method. `park` blocks the current thread, which can then be resumed from
another thread by calling the `unpark` method on the blocked thread's
handle.

Conceptually, each `Thread` handle has an associated token, which is
initially not present:

* The `thread::park``park` function blocks the current thread unless or
  until the token is available for its thread handle, at which point it
  atomically consumes the token. It may also return *spuriously*, without
  consuming the token. `thread::park_timeout` does the same, but allows
  specifying a maximum time to block the thread for.

* The `unpark` method on a `Thread` atomically makes the token <example-value>
  if it wasn't already. Because the token can be held by a thread even if it is currently not
  parked, `unpark` followed by `park` will result in the second call returning immediately.
  However, note that to rely on this guarantee, you need to make sure that your `unpark` happens
  after all `park` that may be done by other data structures!

The API is typically used by acquiring a handle to the current thread, placing that handle in a
shared data structure so that other threads can find it, and then `park`ing in a loop. When some
desired condition is met, another thread calls `unpark` on the handle. The last bullet point
above guarantees that even if the `unpark` occurs before the thread is finished `park`ing, it
will be woken up properly.

Note that the coordination via the shared data structure is crucial: If you `unpark` a thread
without first establishing that it is about to be `park`ing within your code, that `unpark` may
get consumed by a *different* `park` in the same thread, leading to a deadlock. This also means
you must not call unknown code between setting up for parking and calling `park`; for instance,
if you invoke `println!`, that may itself call `park` and thus consume your `unpark` and cause a
deadlock.

The motivation for this design is twofold:

* It avoids the need to allocate mutexes and condvars when building new
  synchronization primitives; the threads already provide basic
  blocking/signaling.

* It can be implemented very efficiently on many platforms.

# Memory Ordering

Calls to `unpark` _synchronize-with_ calls to `park`, meaning that memory
operations performed before a call to `unpark` are made visible to the thread that
consumes the token and returns from `park`. Note that all `park` and `unpark`
operations for a given thread form a total order and _all_ prior `unpark` operations
synchronize-with `park`.

In atomic ordering terms, `unpark` performs a `Release` operation and `park`
performs the corresponding `Acquire` operation. Calls to `unpark` for the same
thread form a [release sequence].

Note that being unblocked does not imply a call was made to `unpark`, because
wakeups can also be spurious. For example, a valid, but inefficient,
implementation could have `park` and `unpark` return immediately without doing anything,
making *all* wakeups spurious.

# Examples

```rust
use std::thread;
use std::sync::atomic::{Ordering, AtomicBool};
use std::time::Duration;

static QUEUED: AtomicBool = AtomicBool::new(false);
static FLAG: AtomicBool = AtomicBool::new(false);

let parked_thread = thread::spawn(move || {
    println!("Thread spawned");
    // Signal that we are going to `park`. Between this store and our `park`, there may
    // be no other `park`, or else that `park` could consume our `unpark` token!
    QUEUED.store(true, Ordering::Release);
    // We want to wait until the flag is set. We *could* just spin, but using
    // park/unpark is more efficient.
    while !FLAG.load(Ordering::Acquire) {
        // We can *not* use `println!` here since that could use thread parking internally.
        thread::park();
        // We *could* get here spuriously, i.e., way before the 10ms below are over!
        // But that is no problem, we are in a loop until the flag is set anyway.
    }
    println!("Flag received");
});

// Let some time pass for the thread to be spawned.
thread::sleep(Duration::from_millis(10));

// Ensure the thread is about to park.
// This is crucial! It guarantees that the `unpark` below is not consumed
// by some other code in the parked thread (e.g. inside `println!`).
while !QUEUED.load(Ordering::Acquire) {
    // Spinning is of course inefficient; in practice, this would more likely be
    // a dequeue where we have no work to do if there's nobody queued.
    std::hint::spin_loop();
}

// Set the flag, and let the thread wake up.
// There is no race condition here: if `unpark`
// happens first, `park` will return immediately.
// There is also no other `park` that could consume this token,
// since we waited until the other thread got queued.
// Hence there is no risk of a deadlock.
FLAG.store(true, Ordering::Release);
println!("Unpark the thread");
parked_thread.thread().unpark();

parked_thread.join().unwrap();
```

## fn park_timeout_ms

```rust
pub fn park_timeout_ms(ms: u32)
```

Uses `park_timeout`.

Blocks unless or until the current thread's token is made available or
the specified duration has been reached (may wake spuriously).

The semantics of this function are equivalent to `park` except
that the thread will be blocked for roughly no longer than `dur`. This
method should not be used for precise timing due to anomalies such as
preemption or platform differences that might not cause the maximum
amount of time waited to be precisely `ms` long.

See the [park documentation]`park` for more detail.
