# core::slice::sort::stable::tiny

Binary-size optimized mergesort inspired by https://github.com/voultapher/tiny-sort-rs.

## fn mergesort

```rust
pub fn mergesort<T, F: FnMut(&T, &T) -> bool>( v: &mut [T], scratch: &mut [MaybeUninit<T>], is_less: &mut F, )
```

Tiny recursive top-down merge sort optimized for binary size. It has no adaptiveness whatsoever,
no run detection, etc.