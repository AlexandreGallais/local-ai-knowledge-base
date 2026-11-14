# core::char::decode

UTF-8 and UTF-16 decoding iterators

## struct DecodeUtf16

```rust
pub struct DecodeUtf16<I> where I: Iterator<Item = u16>,
```

An iterator that decodes UTF-16 encoded code points from an iterator of `u16`s.

This `struct` is created by the [`decode_utf16`] method on [`char`]. See its
documentation for more.

[`decode_utf16`]: char::decode_utf16

## struct DecodeUtf16Error

```rust
pub struct DecodeUtf16Error
```

An error that can be returned when decoding UTF-16 code points.

This `struct` is created when using the [`DecodeUtf16`] type.

## DecodeUtf16Error::unpaired_surrogate

```rust
pub fn unpaired_surrogate(&self) -> u16
```

Returns the unpaired surrogate which caused this error.