# alloc::collections::vec_deque::drain

## struct Drain

```rust
pub struct Drain< 'a, T: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A draining iterator over the elements of a `VecDeque`.

This `struct` is created by the [`drain`] method on [`VecDeque`]. See its
documentation for more.

[`drain`]: VecDeque::drain