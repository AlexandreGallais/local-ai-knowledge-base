# core::iter::adapters::filter_map

## struct FilterMap

```rust
pub struct FilterMap<I, F>
```

An iterator that uses `f` to both filter and map elements from `iter`.

This `struct` is created by the [`filter_map`] method on [`Iterator`]. See its
documentation for more.

[`filter_map`]: Iterator::filter_map
[`Iterator`]: trait.Iterator.html