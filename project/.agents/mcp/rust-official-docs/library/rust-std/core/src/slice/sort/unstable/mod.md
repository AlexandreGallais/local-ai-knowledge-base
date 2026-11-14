# core::slice::sort::unstable

This module contains the entry points for `slice::sort_unstable`.

## fn sort

```rust
pub fn sort<T, F>(v: &mut [T], is_less: &mut F) where F: FnMut(&T, &T) -> bool,
```

Unstable sort called ipnsort by Lukas Bergdoll and Orson Peters.
Design document:
<https://github.com/Voultapher/sort-research-rs/blob/main/writeup/ipnsort_introduction/text.md>

Upholds all safety properties outlined here:
<https://github.com/Voultapher/sort-research-rs/blob/main/writeup/sort_safety/text.md>

## fn partial_sort

```rust
pub fn partial_sort<T, F, R>(v: &mut [T], range: R, mut is_less: F) where F: FnMut(&T, &T) -> bool, R: RangeBounds<usize>,
```

Unstable partial sort the range `start..end`, after which it's guaranteed that:

1. Every element in `v[..start]` is smaller than or equal to
2. Every element in `v[start..end]`, which is sorted, and smaller than or equal to
3. Every element in `v[end..]`.