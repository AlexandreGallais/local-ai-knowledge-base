---
title: "std::sys::pal::windows::time"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/windows/time.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::windows::time

## WaitableTimer::high_resolution

```rust
pub fn high_resolution() -> Result<Self, ()>
```

Creates a high-resolution timer. Will fail before Windows 10, version 1803.
