---
title: "std::thread::thread"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/thread/thread.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::thread::thread

## struct Thread

```rust
pub struct Thread
```

A handle to a thread.

Threads are represented via the `Thread` type, which you can get in one of
two ways:

* By spawning a new thread, e.g., using the `thread::spawn`
  function, and calling `thread` on the `JoinHandle`.
* By requesting the current thread, using the `thread::current` function.

The `thread::current` function is available even for threads not spawned
by the APIs of this module.

There is usually no need to create a `Thread` struct yourself, one
should instead use a function like `spawn` to create new threads, see the
docs of `Builder` and `spawn` for more details.

## Thread::unpark

```rust
pub fn unpark(&self)
```

Atomically makes the handle's token <example-value> if it is not already.

Every thread is equipped with some basic <example-value> blocking support, via
the `park` function and the `unpark()` method. These can be used as a
more CPU-efficient implementation of a spinlock.

See the [park documentation] for more details.

# Examples

```rust
use std::thread;
use std::time::Duration;
use std::sync::atomic::{AtomicBool, Ordering};

static QUEUED: AtomicBool = AtomicBool::new(false);

let parked_thread = thread::Builder::new()
    .spawn(|| {
        println!("Parking thread");
        QUEUED.store(true, Ordering::Release);
        thread::park();
        println!("Thread unparked");
    })
    .unwrap();

// Let some time pass for the thread to be spawned.
thread::sleep(Duration::from_millis(10));

// Wait until the other thread is queued.
// This is crucial! It guarantees that the `unpark` below is not consumed
// by some other code in the parked thread (e.g. inside `println!`).
while !QUEUED.load(Ordering::Acquire) {
    // Spinning is of course inefficient; in practice, this would more likely be
    // a dequeue where we have no work to do if there's nobody queued.
    std::hint::spin_loop();
}

println!("Unpark the thread");
parked_thread.thread().unpark();

parked_thread.join().unwrap();
```

## Thread::id

```rust
pub fn id(&self) -> ThreadId
```

Gets the thread's unique identifier.

# Examples

```rust
use std::thread;

let other_thread = thread::spawn(|| {
    thread::current().id()
});

let other_thread_id = other_thread.join().unwrap();
assert!(thread::current().id() != other_thread_id);
```

## Thread::name

```rust
pub fn name(&self) -> Option<&str>
```

Gets the thread's name.

For more information about named threads, see
this module-level documentation.

# Examples

Threads by default have no name specified:

```rust
use std::thread;

let builder = thread::Builder::new();

let handler = builder.spawn(|| {
    assert!(thread::current().name().is_none());
}).unwrap();

handler.join().unwrap();
```

Thread with a specified name:

```rust
use std::thread;

let builder = thread::Builder::new()
    .name("foo".into());

let handler = builder.spawn(|| {
    assert_eq!(thread::current().name(), Some("foo"))
}).unwrap();

handler.join().unwrap();
```
