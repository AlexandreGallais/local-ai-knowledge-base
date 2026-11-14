---
title: "core::iter::sources::from_fn"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/iter/sources/from_fn.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::iter::sources::from_fn

## fn from_fn

```rust
pub fn from_fn<T, F>(f: F) -> FromFn<F> where F: FnMut() -> Option<T>,
```

Creates an iterator with the provided closure
`F: FnMut() -> Option<T>` as its `next` method.

The iterator will yield the `T`s returned from the closure.

This allows creating a custom iterator with any behavior
without using the more verbose syntax of creating a dedicated type
and implementing the `Iterator` trait for it.

Note that the `FromFn` iterator doesn’t make assumptions about the behavior of the closure,
and therefore conservatively does not implement `FusedIterator`,
or override `Iterator::size_hint()` from its default `(0, None)`.

The closure can use captures and its environment to track state across iterations. Depending on
how the iterator is used, this may require specifying the `move` keyword on the closure.

# Examples

Let’s re-implement the counter iterator from [module-level documentation]:

```rust
let mut count = 0;
let counter = std::iter::from_fn(move || {
    // Increment our count. This is why we started at zero.
    count += 1;

    // Check to see if we've finished counting or not.
    if count < 6 {
        Some(count)
    } else {
        None
    }
});
assert_eq!(counter.collect::<Vec<_>>(), &[1, 2, 3, 4, 5]);
```

## struct FromFn

```rust
pub struct FromFn<F>(F)
```

An iterator where each iteration calls the provided closure `F: FnMut() -> Option<T>`.

This `struct` is created by the `iter::from_fn()` function.
See its documentation for more.
