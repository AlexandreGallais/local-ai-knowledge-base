---
title: "std::sys::io::error::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/io/error/windows.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::io::error::windows

## fn format_error

```rust
pub fn format_error(mut errnum: i32, f: &mut fmt::Formatter<'_>) -> fmt::Result
```

Gets a detailed string description for the given error number.
