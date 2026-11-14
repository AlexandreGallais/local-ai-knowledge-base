# core::iter::adapters::skip_while

## struct SkipWhile

```rust
pub struct SkipWhile<I, P>
```

An iterator that rejects elements while `predicate` returns `true`.

This `struct` is created by the [`skip_while`] method on [`Iterator`]. See its
documentation for more.

[`skip_while`]: Iterator::skip_while
[`Iterator`]: trait.Iterator.html