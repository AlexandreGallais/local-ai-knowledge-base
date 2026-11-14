# alloc::io::util

## struct Bytes

```rust
pub struct Bytes<R>
```

An iterator over `u8` values of a reader.

This struct is generally created by calling [`bytes`] on a reader.
Please see the documentation of [`bytes`] for more details.

[`bytes`]: Read::bytes

## struct Split

```rust
pub struct Split<B>
```

An iterator over the contents of an instance of `BufRead` split on a
particular byte.

This struct is generally created by calling [`split`] on a `BufRead`.
Please see the documentation of [`split`] for more details.

[`split`]: BufRead::split

## struct Lines

```rust
pub struct Lines<B>
```

An iterator over the lines of an instance of [`BufRead`].

This struct is generally created by calling [`lines`] on a [`BufRead`].
Please see the documentation of [`lines`] for more details.

[`lines`]: BufRead::lines