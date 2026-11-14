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