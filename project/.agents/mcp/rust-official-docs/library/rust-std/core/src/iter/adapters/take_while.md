# core::iter::adapters::take_while

## struct TakeWhile

```rust
pub struct TakeWhile<I, P>
```

An iterator that only accepts elements while `predicate` returns `true`.

This `struct` is created by the [`take_while`] method on [`Iterator`]. See its
documentation for more.

[`take_while`]: Iterator::take_while
[`Iterator`]: trait.Iterator.html