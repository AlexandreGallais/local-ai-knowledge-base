---
title: "core::char::convert"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/char/convert.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::char::convert

Character conversions.

## struct ParseCharError

```rust
pub struct ParseCharError
```

An error which can be returned when parsing a char.

This `struct` is created when using the `char::from_str` method.

## struct CharTryFromError

```rust
pub struct CharTryFromError(())
```

The error type returned when a conversion from `prim@u32` to `prim@char` fails.

This `struct` is created by the `char::try_from<u32>` method.
See its documentation for more.
