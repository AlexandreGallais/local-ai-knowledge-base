---
title: "std::sys::sync::thread_parking::pthread"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/sync/thread_parking/pthread.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::sync::thread_parking::pthread

Thread parking without `futex` using the `pthread` synchronization primitives.

## Parker::new_in_place

```rust
pub unsafe fn new_in_place(parker: *mut Parker)
```

Constructs the UNIX parker in-place.

# Safety
The constructed parker must never be moved.
