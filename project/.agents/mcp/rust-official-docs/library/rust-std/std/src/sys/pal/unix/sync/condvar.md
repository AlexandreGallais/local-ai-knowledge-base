---
title: "std::sys::pal::unix::sync::condvar"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/unix/sync/condvar.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::unix::sync::condvar

## Condvar::notify_one

```rust
pub unsafe fn notify_one(self: Pin<&Self>)
```

# Safety
`init` must have been called on this instance.

## Condvar::notify_all

```rust
pub unsafe fn notify_all(self: Pin<&Self>)
```

# Safety
`init` must have been called on this instance.

## Condvar::wait

```rust
pub unsafe fn wait(self: Pin<&Self>, mutex: Pin<&Mutex>)
```

# Safety
* `init` must have been called on this instance.
* `mutex` must be locked by the current thread.
* This condition variable may only be used with the same mutex.

## Condvar::wait_timeout

```rust
pub unsafe fn wait_timeout(self: Pin<&Self>, mutex: Pin<&Mutex>, dur: Duration) -> bool
```

# Safety
* `init` must have been called on this instance.
* `mutex` must be locked by the current thread.
* This condition variable may only be used with the same mutex.

## Condvar::wait_timeout

```rust
pub unsafe fn wait_timeout(self: Pin<&Self>, mutex: Pin<&Mutex>, dur: Duration) -> bool
```

# Safety
* `init` must have been called on this instance.
* `mutex` must be locked by the current thread.
* This condition variable may only be used with the same mutex.

## Condvar::init

```rust
pub unsafe fn init(self: Pin<&mut Self>)
```

# Safety
May only be called once per instance of `Self`.

## Condvar::init

```rust
pub unsafe fn init(self: Pin<&mut Self>)
```

# Safety
May only be called once per instance of `Self`.

## Condvar::init

```rust
pub unsafe fn init(self: Pin<&mut Self>)
```

# Safety
May only be called once per instance of `Self`.
