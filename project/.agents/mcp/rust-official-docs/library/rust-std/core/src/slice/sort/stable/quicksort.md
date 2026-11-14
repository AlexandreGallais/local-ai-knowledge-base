---
title: "core::slice::sort::stable::quicksort"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/sort/stable/quicksort.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::sort::stable::quicksort

This module contains a stable quicksort and partition implementation.

## fn quicksort

```rust
pub fn quicksort<T, F: FnMut(&T, &T) -> bool>( mut v: &mut [T], scratch: &mut [MaybeUninit<T>], mut limit: u32, mut left_ancestor_pivot: Option<&T>, is_less: &mut F, )
```

Sorts `v` recursively using quicksort.
`scratch.len()` must be at least `max(v.len() - v.len() / 2, SMALL_SORT_GENERAL_SCRATCH_LEN)`
otherwise the implementation may abort.

`limit` when initialized with `c*log(v.len())` for some c ensures we do not
overflow the stack or go quadratic.
