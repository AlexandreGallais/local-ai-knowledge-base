# core::char

Utilities for the `char` primitive type.

*[See also the `char` primitive type](primitive@char).*

The `char` type represents a single character. More specifically, since
'character' isn't a well-defined concept in Unicode, `char` is a '[Unicode
scalar value]', which is similar to, but not the same as, a '[Unicode code
point]'.

[Unicode scalar value]: https://www.unicode.org/glossary/#unicode_scalar_value
[Unicode code point]: https://www.unicode.org/glossary/#code_point

This module exists for technical reasons, the primary documentation for
`char` is directly on [the `char` primitive type][char] itself.

This module is the home of the iterator implementations for the iterators
implemented on `char`, as well as some useful constants and conversion
functions that convert various types to `char`.

## const MAX

```rust
pub const MAX: char = char::MAX
```

The highest valid code point a `char` can have, `'\u{10FFFF}'`. Use [`char::MAX`] instead.

## const REPLACEMENT_CHARACTER

```rust
pub const REPLACEMENT_CHARACTER: char = char::REPLACEMENT_CHARACTER
```

`U+FFFD REPLACEMENT CHARACTER` (�) is used in Unicode to represent a
decoding error. Use [`char::REPLACEMENT_CHARACTER`] instead.

## const UNICODE_VERSION

```rust
pub const UNICODE_VERSION: (u8, u8, u8) = char::UNICODE_VERSION
```

The version of [Unicode](https://www.unicode.org/) that the Unicode parts of
`char` and `str` methods are based on. Use [`char::UNICODE_VERSION`] instead.

## fn decode_utf16

```rust
pub fn decode_utf16<I: IntoIterator<Item = u16>>(iter: I) -> DecodeUtf16<I::IntoIter>
```

Creates an iterator over the UTF-16 encoded code points in `iter`, returning
unpaired surrogates as `Err`s. Use [`char::decode_utf16`] instead.

## fn from_u32

```rust
pub const fn from_u32(i: u32) -> Option<char>
```

Converts a `u32` to a `char`. Use [`char::from_u32`] instead.

## fn from_u32_unchecked

```rust
pub const unsafe fn from_u32_unchecked(i: u32) -> char
```

Converts a `u32` to a `char`, ignoring validity. Use [`char::from_u32_unchecked`]
instead.

## fn from_digit

```rust
pub const fn from_digit(num: u32, radix: u32) -> Option<char>
```

Converts a digit in the given radix to a `char`. Use [`char::from_digit`] instead.

## struct EscapeUnicode

```rust
pub struct EscapeUnicode(EscapeIterInner<10, AlwaysEscaped>)
```

Returns an iterator that yields the hexadecimal Unicode escape of a
character, as `char`s.

This `struct` is created by the [`escape_unicode`] method on [`char`]. See
its documentation for more.

[`escape_unicode`]: char::escape_unicode

## struct EscapeDefault

```rust
pub struct EscapeDefault(EscapeIterInner<10, AlwaysEscaped>)
```

An iterator that yields the literal escape code of a `char`.

This `struct` is created by the [`escape_default`] method on [`char`]. See
its documentation for more.

[`escape_default`]: char::escape_default

## struct EscapeDebug

```rust
pub struct EscapeDebug(EscapeIterInner<10, MaybeEscaped>)
```

An iterator that yields the literal escape code of a `char`.

This `struct` is created by the [`escape_debug`] method on [`char`]. See its
documentation for more.

[`escape_debug`]: char::escape_debug

## struct TryFromCharError

```rust
pub struct TryFromCharError(pub(crate) ())
```

The error type returned when a checked char conversion fails.