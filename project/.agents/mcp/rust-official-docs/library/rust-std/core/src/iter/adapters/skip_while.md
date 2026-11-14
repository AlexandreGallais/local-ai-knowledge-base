---
title: "core::iter::adapters::skip_while"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/skip_while.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::skip_while

## struct SkipWhile

```rust
pub struct SkipWhile<I, P>
```

An iterator that rejects elements while `predicate` returns `true`.

This `struct` is created by the `skip_while` method on `Iterator`. See its
documentation for more.
