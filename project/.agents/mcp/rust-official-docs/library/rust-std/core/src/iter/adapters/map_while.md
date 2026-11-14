---
title: "core::iter::adapters::map_while"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/map_while.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::map_while

## struct MapWhile

```rust
pub struct MapWhile<I, P>
```

An iterator that only accepts elements while `predicate` returns `Some(_)`.

This `struct` is created by the `map_while` method on `Iterator`. See its
documentation for more.
