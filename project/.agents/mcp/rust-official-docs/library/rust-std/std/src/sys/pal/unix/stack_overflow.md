---
title: "std::sys::pal::unix::stack_overflow"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/unix/stack_overflow.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::unix::stack_overflow

## fn init

```rust
pub unsafe fn init()
```

# Safety
Must be called only once, on the main thread, during program startup.

## fn drop_handler

```rust
pub unsafe fn drop_handler(data: *mut libc::c_void)
```

# Safety
Must only be called with a pointer returned by `make_handler`, and only
once per `Handler`.
