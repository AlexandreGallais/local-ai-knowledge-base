---
title: "core::iter::adapters::inspect"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/inspect.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::inspect

## struct Inspect

```rust
pub struct Inspect<I, F>
```

An iterator that calls a function with a reference to each element before
yielding it.

This `struct` is created by the `inspect` method on `Iterator`. See its
documentation for more.
