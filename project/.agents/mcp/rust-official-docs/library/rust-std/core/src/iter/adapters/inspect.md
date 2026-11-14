# core::iter::adapters::inspect

## struct Inspect

```rust
pub struct Inspect<I, F>
```

An iterator that calls a function with a reference to each element before
yielding it.

This `struct` is created by the [`inspect`] method on [`Iterator`]. See its
documentation for more.

[`inspect`]: Iterator::inspect
[`Iterator`]: trait.Iterator.html