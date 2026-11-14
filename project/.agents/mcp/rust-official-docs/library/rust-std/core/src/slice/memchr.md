---
title: "core::slice::memchr"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/memchr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::memchr

## fn memchr

```rust
pub const fn memchr(x: u8, text: &[u8]) -> Option<usize>
```

Returns the first index matching the byte `x` in `text`.

## fn memrchr

```rust
pub fn memrchr(x: u8, text: &[u8]) -> Option<usize>
```

Returns the last index matching the byte `x` in `text`.
