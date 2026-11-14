# core::char::convert

Character conversions.

## struct ParseCharError

```rust
pub struct ParseCharError
```

An error which can be returned when parsing a char.

This `struct` is created when using the [`char::from_str`] method.

## struct CharTryFromError

```rust
pub struct CharTryFromError(())
```

The error type returned when a conversion from [`prim@u32`] to [`prim@char`] fails.

This `struct` is created by the [`char::try_from<u32>`](char#impl-TryFrom<u32>-for-char) method.
See its documentation for more.