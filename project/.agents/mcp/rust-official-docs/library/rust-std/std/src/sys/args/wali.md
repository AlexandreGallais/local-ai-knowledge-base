---
title: "std::sys::args::wali"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/args/wali.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::args::wali

## fn init

```rust
pub unsafe fn init(argc: isize, argv: *const *const u8)
```

One-time global initialization.

## fn args

```rust
pub fn args() -> Args
```

Returns the command line arguments
