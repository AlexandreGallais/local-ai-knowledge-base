# core::iter::adapters::map_while

## struct MapWhile

```rust
pub struct MapWhile<I, P>
```

An iterator that only accepts elements while `predicate` returns `Some(_)`.

This `struct` is created by the [`map_while`] method on [`Iterator`]. See its
documentation for more.

[`map_while`]: Iterator::map_while
[`Iterator`]: trait.Iterator.html