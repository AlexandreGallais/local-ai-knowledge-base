---
title: "core::future::future"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/future/future.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::future::future

## trait Future

```rust
pub trait Future
```

A future represents an asynchronous computation, commonly obtained by use of
`async`.

A future is a value that might not have finished computing yet. This kind of
"asynchronous value" makes it possible for a thread to continue doing useful
work while it waits for the value to become available.

# The `poll` method

The core method of future, `poll`, *attempts* to resolve the future into a
final value. This method does not block if the value is not ready. Instead,
the current task is scheduled to be woken up when it's possible to make
further progress by `poll`ing again. The `context` passed to the `poll`
method can provide a `Waker`, which is a handle for waking up the current
task.

When using a future, you generally won't call `poll` directly, but instead
`.await` the value.

## Future::Output

```rust
type Output
```

The type of value produced on completion.

## Future::poll

```rust
fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>
```

Attempts to resolve the future to a final value, registering
the current task for wakeup if the value is not yet available.

# Return value

This function returns:

- `Poll::Pending` if the future is not ready yet
- `Poll::Ready(val)` with the result `val` of this future if it
  finished successfully.

Once a future has finished, clients should not `poll` it again.

When a future is not ready yet, `poll` returns `Poll::Pending` and
stores a clone of the `Waker` copied from the current `Context`.
This `Waker` is then woken once the future can make progress.
For example, a future waiting for a socket to become
readable would call `.clone()` on the `Waker` and store it.
When a signal arrives elsewhere indicating that the socket is readable,
`Waker::wake` is called and the socket future's task is awoken.
Once a task has been woken up, it should attempt to `poll` the future
again, which may or may not produce a final value.

Note that on multiple calls to `poll`, only the `Waker` from the
`Context` passed to the most recent call should be scheduled to
receive a wakeup.

# Runtime characteristics

Futures alone are *inert*; they must be *actively* `poll`ed for the
underlying computation to make progress, meaning that each time the
current task is woken up, it should actively re-`poll` pending futures
that it still has an interest in.

Having said that, some Futures may represent a value that is being
computed in a different task. In this case, the future's underlying
computation is simply acting as a conduit for a value being computed
by that other task, which will proceed independently of the Future.
Futures of this kind are typically obtained when spawning a new task into an
async runtime.

The `poll` function should not be called repeatedly in a tight loop --
instead, it should only be called when the future indicates that it is
ready to make progress (by calling `wake()`). If you're familiar with the
`poll(2)` or `select(2)` syscalls on Unix it's worth noting that futures
typically do *not* suffer the same problems of "all wakeups must poll
all events"; they are more like `epoll(4)`.

An implementation of `poll` should strive to return quickly, and should
not block. Returning quickly prevents unnecessarily clogging up
threads or event loops. If it is known ahead of time that a call to
`poll` may end up taking a while, the work should be offloaded to a
thread pool (or something similar) to ensure that `poll` can return
quickly.

# Panics

Once a future has completed (returned `Ready` from `poll`), calling its
`poll` method again may panic, block forever, or cause other kinds of
problems; the `Future` trait places no requirements on the effects of
such a call. However, as the `poll` method is not marked `unsafe`,
Rust's usual rules apply: calls must never cause undefined behavior
(memory corruption, incorrect use of `unsafe` functions, or the like),
regardless of the future's state.
