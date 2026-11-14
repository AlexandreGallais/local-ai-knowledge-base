---
title: "core::iter::adapters::fuse"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/fuse.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::fuse

## struct Fuse

```rust
pub struct Fuse<I>
```

An iterator that yields `None` forever after the underlying iterator
yields `None` once.

This `struct` is created by `Iterator::fuse`. See its documentation
for more.
