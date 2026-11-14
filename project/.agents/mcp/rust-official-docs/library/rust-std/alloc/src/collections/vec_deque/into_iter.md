---
title: "alloc::collections::vec_deque::into_iter"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/vec_deque/into_iter.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::vec_deque::into_iter

## struct IntoIter

```rust
pub struct IntoIter< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An owning iterator over the elements of a `VecDeque`.

This `struct` is created by the `into_iter` method on `VecDeque`
(provided by the `IntoIterator` trait). See its documentation for more.
