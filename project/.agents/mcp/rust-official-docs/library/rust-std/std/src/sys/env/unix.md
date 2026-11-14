---
title: "std::sys::env::unix"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/env/unix.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::env::unix

## fn env

```rust
pub fn env() -> Env
```

Returns a vector of (variable, value) byte-vector pairs for all the
environment variables of the current process.
