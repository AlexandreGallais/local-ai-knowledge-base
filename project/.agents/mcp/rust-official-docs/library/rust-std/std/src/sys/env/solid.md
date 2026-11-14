---
title: "std::sys::env::solid"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/env/solid.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::env::solid

## fn env

```rust
pub fn env() -> Env
```

Returns a vector of (variable, value) byte-vector pairs for all the
environment variables of the current process.
