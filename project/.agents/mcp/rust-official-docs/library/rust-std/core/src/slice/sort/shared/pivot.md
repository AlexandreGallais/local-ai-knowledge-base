---
title: "core::slice::sort::shared::pivot"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/sort/shared/pivot.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::sort::shared::pivot

This module contains the logic for pivot selection.

## fn choose_pivot

```rust
pub fn choose_pivot<T, F: FnMut(&T, &T) -> bool>(v: &[T], is_less: &mut F) -> usize
```

Selects a pivot from `v`. Algorithm taken from glidesort by Orson Peters.

This chooses a pivot by sampling an adaptive amount of points, approximating
the quality of a median of sqrt(n) elements.
