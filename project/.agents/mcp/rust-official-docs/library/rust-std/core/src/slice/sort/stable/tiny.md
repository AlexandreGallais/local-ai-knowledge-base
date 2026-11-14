---
title: "core::slice::sort::stable::tiny"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/sort/stable/tiny.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::sort::stable::tiny

Binary-size optimized mergesort inspired by https://github.com/voultapher/tiny-sort-rs.

## fn mergesort

```rust
pub fn mergesort<T, F: FnMut(&T, &T) -> bool>( v: &mut [T], scratch: &mut [MaybeUninit<T>], is_less: &mut F, )
```

Tiny recursive top-down merge sort optimized for binary size. It has no adaptiveness whatsoever,
no run detection, etc.
