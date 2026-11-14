# alloc::collections::vec_deque::into_iter

## struct IntoIter

```rust
pub struct IntoIter< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An owning iterator over the elements of a `VecDeque`.

This `struct` is created by the [`into_iter`] method on [`VecDeque`]
(provided by the [`IntoIterator`] trait). See its documentation for more.

[`into_iter`]: VecDeque::into_iter