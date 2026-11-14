---
title: "std::sys::thread::sgx"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread/sgx.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread::sgx

## Notifier::notify

```rust
pub fn notify(self)
```

Notify the waiter. The waiter is either notified right away (if
currently blocked in `Waiter::wait()`) or later when it calls the
`Waiter::wait()` method.

## Waiter::wait

```rust
pub fn wait(self)
```

Wait for a notification. If `Notifier::notify()` has already been
called, this will return immediately, otherwise the current thread
is blocked until notified.
