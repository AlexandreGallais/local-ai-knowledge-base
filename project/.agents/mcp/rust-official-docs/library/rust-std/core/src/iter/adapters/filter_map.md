---
title: "core::iter::adapters::filter_map"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/filter_map.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::filter_map

## struct FilterMap

```rust
pub struct FilterMap<I, F>
```

An iterator that uses `f` to both filter and map elements from `iter`.

This `struct` is created by the `filter_map` method on `Iterator`. See its
documentation for more.
