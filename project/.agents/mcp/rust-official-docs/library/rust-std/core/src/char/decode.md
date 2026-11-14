---
title: "core::char::decode"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/char/decode.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::char::decode

UTF-8 and UTF-16 decoding iterators

## struct DecodeUtf16

```rust
pub struct DecodeUtf16<I> where I: Iterator<Item = u16>,
```

An iterator that decodes UTF-16 encoded code points from an iterator of `u16`s.

This `struct` is created by the `decode_utf16` method on `char`. See its
documentation for more.

## struct DecodeUtf16Error

```rust
pub struct DecodeUtf16Error
```

An error that can be returned when decoding UTF-16 code points.

This `struct` is created when using the `DecodeUtf16` type.

## DecodeUtf16Error::unpaired_surrogate

```rust
pub fn unpaired_surrogate(&self) -> u16
```

Returns the unpaired surrogate which caused this error.
