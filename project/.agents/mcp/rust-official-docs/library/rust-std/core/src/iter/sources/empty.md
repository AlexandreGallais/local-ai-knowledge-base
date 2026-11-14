# core::iter::sources::empty

## fn empty

```rust
pub const fn empty<T>() -> Empty<T>
```

Creates an iterator that yields nothing.

# Examples

Basic usage:

```
use std::iter;

// this could have been an iterator over i32, but alas, it's just not.
let mut nope = iter::empty::<i32>();

assert_eq!(None, nope.next());
```

## struct Empty

```rust
pub struct Empty<T>(marker::PhantomData<fn() -> T>)
```

An iterator that yields nothing.

This `struct` is created by the [`empty()`] function. See its documentation for more.