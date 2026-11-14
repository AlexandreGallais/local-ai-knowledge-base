---
title: "alloc::vec::splice"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/splice.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec::splice

## struct Splice

```rust
pub struct Splice< 'a, I: Iterator + 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator + 'a = Global, >
```

A splicing iterator for `Vec`.

This struct is created by `Vec::splice()`.
See its documentation for more.

# Example

```rust
let mut v = vec![0, 1, 2];
let new = [7, 8];
let iter: std::vec::Splice<'_, _> = v.splice(1.., new);
```
