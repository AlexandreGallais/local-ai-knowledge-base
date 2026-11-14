# core::slice::sort::stable::drift

This module contains the hybrid top-level loop combining bottom-up Mergesort with top-down
Quicksort.

## fn sort

```rust
pub fn sort<T, F: FnMut(&T, &T) -> bool>( v: &mut [T], scratch: &mut [MaybeUninit<T>], eager_sort: bool, is_less: &mut F, )
```

Sorts `v` based on comparison function `is_less`. If `eager_sort` is true,
it will only do small-sorts and physical merges, ensuring O(N * log(N))
worst-case complexity. `scratch.len()` must be at least
`max(v.len() - v.len() / 2, SMALL_SORT_GENERAL_SCRATCH_LEN)` otherwise the implementation may abort.
Fully ascending and descending inputs will be sorted with exactly N - 1
comparisons.

This is the main loop for driftsort, which uses powersort's heuristic to
determine in which order to merge runs, see below for details.