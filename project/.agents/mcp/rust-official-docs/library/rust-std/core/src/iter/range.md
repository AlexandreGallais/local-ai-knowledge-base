---
title: "core::iter::range"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/range.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::range

## macro unsafe_range_trusted_random_access_impl!

```rust
macro_rules! unsafe_range_trusted_random_access_impl
```

Safety: This macro must only be used on types that are `Copy` and result in ranges
which have an exact `size_hint()` where the upper bound must not be `None`.
