---
title: "std::sys::pal::solid::error"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/solid/error.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::solid::error

## fn error_name

```rust
pub fn error_name(er: abi::ER) -> Option<&'static str>
```

Describe the specified SOLID error code. Returns `None` if it's an
undefined error code.

The SOLID error codes are a superset of μITRON error codes.
