---
title: "core::slice::sort::stable::merge"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/sort/stable/merge.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::sort::stable::merge

This module contains logic for performing a merge of two sorted sub-slices.

## fn merge

```rust
pub fn merge<T, F: FnMut(&T, &T) -> bool>( v: &mut [T], scratch: &mut [MaybeUninit<T>], mid: usize, is_less: &mut F, )
```

Merges non-decreasing runs `v[..mid]` and `v[mid..]` using `scratch` as
temporary storage, and stores the result into `v[..]`.
