# core::iter::adapters::flatten

## struct FlatMap

```rust
pub struct FlatMap<I, U: IntoIterator, F>
```

An iterator that maps each element to an iterator, and yields the elements
of the produced iterators.

This `struct` is created by [`Iterator::flat_map`]. See its documentation
for more.

## struct Flatten

```rust
pub struct Flatten<I: Iterator<Item: IntoIterator>>
```

An iterator that flattens one level of nesting in an iterator of things
that can be turned into iterators.

This `struct` is created by the [`flatten`] method on [`Iterator`]. See its
documentation for more.

[`flatten`]: Iterator::flatten()