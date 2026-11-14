---
title: "core::iter::adapters::scan"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/adapters/scan.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::adapters::scan

## struct Scan

```rust
pub struct Scan<I, St, F>
```

An iterator to maintain state while iterating another iterator.

This `struct` is created by the `scan` method on `Iterator`. See its
documentation for more.
