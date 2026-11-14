# core::slice::sort::shared::pivot

This module contains the logic for pivot selection.

## fn choose_pivot

```rust
pub fn choose_pivot<T, F: FnMut(&T, &T) -> bool>(v: &[T], is_less: &mut F) -> usize
```

Selects a pivot from `v`. Algorithm taken from glidesort by Orson Peters.

This chooses a pivot by sampling an adaptive amount of points, approximating
the quality of a median of sqrt(n) elements.