---
title: "core::iter::adapters::take"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/take.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::take

## struct Take

```rust
pub struct Take<I>
```

An iterator that only iterates over the first `n` iterations of `iter`.

This `struct` is created by the `take` method on `Iterator`. See its
documentation for more.
