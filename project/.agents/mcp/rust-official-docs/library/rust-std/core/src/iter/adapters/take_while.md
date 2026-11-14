---
title: "core::iter::adapters::take_while"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/take_while.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::take_while

## struct TakeWhile

```rust
pub struct TakeWhile<I, P>
```

An iterator that only accepts elements while `predicate` returns `true`.

This `struct` is created by the `take_while` method on `Iterator`. See its
documentation for more.
