---
title: "alloc::task"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/task.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::task

Types and Traits for working with asynchronous tasks.

**Note**: Some of the types in this module are only available
on platforms that support atomic loads and stores of pointers.
This may be detected at compile time using
`#[cfg(target_has_atomic = "ptr")]`.

## trait Wake

```rust
pub trait Wake
```

The implementation of waking a task on an executor.

This trait can be used to create a `Waker`. An executor can define an
implementation of this trait, and use that to construct a `Waker` to pass
to the tasks that are executed on that executor.

This trait is a memory-safe and ergonomic alternative to constructing a
`RawWaker`. It supports the common executor design in which the data used
to wake up a task is stored in an `Arc`. Some executors (especially
those for embedded systems) cannot use this API, which is why `RawWaker`
exists as an alternative for those systems.

To construct a `Waker` from some type `W` implementing this trait,
wrap it in an `Arc<W>` and call `Waker::from()` on that.
It is also possible to convert to `RawWaker` in the same way.

# Memory Ordering

To avoid missed wakeups, all executors must adhere to the requirement described for `Waker::wake`.

# Examples

A basic `block_on` function that takes a future and runs it to completion on
the current thread.

**Note:** This example trades correctness for simplicity. In order to prevent
deadlocks, production-grade implementations will also need to handle
intermediate calls to `thread::unpark` as well as nested invocations.

```rust
use std::future::Future;
use std::sync::Arc;
use std::task::{Context, Poll, Wake};
use std::thread::{self, Thread};
use core::pin::pin;

/// A waker that wakes up the current thread when called.
struct ThreadWaker(Thread);

impl Wake for ThreadWaker {
    fn wake(self: Arc<Self>) {
        self.0.unpark();
    }
}

/// Run a future to completion on the current thread.
fn block_on<T>(fut: impl Future<Output = T>) -> T {
    // Pin the future so it can be polled.
    let mut fut = pin!(fut);

    // Create a new context to be passed to the future.
    let t = thread::current();
    let waker = Arc::new(ThreadWaker(t)).into();
    let mut cx = Context::from_waker(&waker);

    // Run the future to completion.
    loop {
        match fut.as_mut().poll(&mut cx) {
            Poll::Ready(res) => return res,
            Poll::Pending => thread::park(),
        }
    }
}

block_on(async {
    println!("Hi from inside a future!");
});
```

## Wake::wake

```rust
fn wake(self: Arc<Self>)
```

Wake this task.

## Wake::wake_by_ref

```rust
fn wake_by_ref(self: &Arc<Self>)
```

Wake this task without consuming the waker.

If an executor supports a cheaper way to wake without consuming the
waker, it should override this method. By default, it clones the
`Arc` and calls `wake` on the clone.
