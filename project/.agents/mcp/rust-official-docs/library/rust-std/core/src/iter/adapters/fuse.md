# core::iter::adapters::fuse

## struct Fuse

```rust
pub struct Fuse<I>
```

An iterator that yields `None` forever after the underlying iterator
yields `None` once.

This `struct` is created by [`Iterator::fuse`]. See its documentation
for more.