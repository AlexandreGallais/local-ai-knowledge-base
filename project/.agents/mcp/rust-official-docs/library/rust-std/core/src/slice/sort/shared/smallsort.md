# core::slice::sort::shared::smallsort

This module contains a variety of sort implementations that are optimized for small lengths.

## fn insertion_sort_shift_left

```rust
pub fn insertion_sort_shift_left<T, F: FnMut(&T, &T) -> bool>( v: &mut [T], offset: usize, is_less: &mut F, )
```

Sort `v` assuming `v[..offset]` is already sorted.

## fn sort4_stable

```rust
pub unsafe fn sort4_stable<T, F: FnMut(&T, &T) -> bool>( v_base: *const T, dst: *mut T, is_less: &mut F, )
```

SAFETY: The caller MUST guarantee that `v_base` is valid for 4 reads and
`dst` is valid for 4 writes. The result will be stored in `dst[0..4]`.