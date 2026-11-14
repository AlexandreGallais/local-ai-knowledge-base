# core::slice::sort::stable::merge

This module contains logic for performing a merge of two sorted sub-slices.

## fn merge

```rust
pub fn merge<T, F: FnMut(&T, &T) -> bool>( v: &mut [T], scratch: &mut [MaybeUninit<T>], mid: usize, is_less: &mut F, )
```

Merges non-decreasing runs `v[..mid]` and `v[mid..]` using `scratch` as
temporary storage, and stores the result into `v[..]`.