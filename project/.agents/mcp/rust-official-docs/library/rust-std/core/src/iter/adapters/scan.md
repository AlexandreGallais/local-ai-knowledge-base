# core::iter::adapters::scan

## struct Scan

```rust
pub struct Scan<I, St, F>
```

An iterator to maintain state while iterating another iterator.

This `struct` is created by the [`scan`] method on [`Iterator`]. See its
documentation for more.

[`scan`]: Iterator::scan
[`Iterator`]: trait.Iterator.html