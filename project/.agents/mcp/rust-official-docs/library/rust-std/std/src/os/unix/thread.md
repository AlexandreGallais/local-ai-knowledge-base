---
title: "std::os::unix::thread"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/unix/thread.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::unix::thread

Unix-specific extensions to primitives in the `std::thread` module.

## trait JoinHandleExt

```rust
pub trait JoinHandleExt
```

Unix-specific extensions to `JoinHandle`.

## JoinHandleExt::as_pthread_t

```rust
fn as_pthread_t(&self) -> RawPthread
```

Extracts the raw pthread_t without taking ownership

## JoinHandleExt::into_pthread_t

```rust
fn into_pthread_t(self) -> RawPthread
```

Consumes the thread, returning the raw pthread_t

This function **transfers ownership** of the underlying pthread_t to
the caller. Callers are then the unique owners of the pthread_t and
must either detach or join the pthread_t once it's no longer needed.
