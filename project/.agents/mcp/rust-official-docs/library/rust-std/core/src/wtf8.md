# core::wtf8

Implementation of [the WTF-8 encoding](https://wtf-8.codeberg.page/).

This library uses Rust’s type system to maintain
[well-formedness](https://wtf-8.codeberg.page/#well-formed),
like the `String` and `&str` types do for UTF-8.

Since [WTF-8 must not be used
for interchange](https://wtf-8.codeberg.page/#intended-audience),
this library deliberately does not provide access to the underlying bytes
of WTF-8 strings,
nor can it decode WTF-8 from arbitrary bytes.
WTF-8 strings can be obtained from UTF-8, UTF-16, or code points.

## CodePoint::from_u32_unchecked

```rust
pub unsafe fn from_u32_unchecked(value: u32) -> CodePoint
```

Unsafely creates a new `CodePoint` without checking the value.

# Safety

`value` must be less than or equal to 0x10FFFF.

## CodePoint::from_u32

```rust
pub fn from_u32(value: u32) -> Option<CodePoint>
```

Creates a new `CodePoint` if the value is a valid code point.

Returns `None` if `value` is above 0x10FFFF.

## CodePoint::from_char

```rust
pub fn from_char(value: char) -> CodePoint
```

Creates a new `CodePoint` from a `char`.

Since all Unicode scalar values are code points, this always succeeds.

## CodePoint::to_u32

```rust
pub fn to_u32(&self) -> u32
```

Returns the numeric value of the code point.

## CodePoint::to_lead_surrogate

```rust
pub fn to_lead_surrogate(&self) -> Option<u16>
```

Returns the numeric value of the code point if it is a leading surrogate.

## CodePoint::to_trail_surrogate

```rust
pub fn to_trail_surrogate(&self) -> Option<u16>
```

Returns the numeric value of the code point if it is a trailing surrogate.

## CodePoint::to_char

```rust
pub fn to_char(&self) -> Option<char>
```

Optionally returns a Unicode scalar value for the code point.

Returns `None` if the code point is a surrogate (from U+D800 to U+DFFF).

## CodePoint::to_char_lossy

```rust
pub fn to_char_lossy(&self) -> char
```

Returns a Unicode scalar value for the code point.

Returns `'\u{FFFD}'` (the replacement character “�”)
if the code point is a surrogate (from U+D800 to U+DFFF).

## Wtf8::from_str

```rust
pub fn from_str(value: &str) -> &Wtf8
```

Creates a WTF-8 slice from a UTF-8 `&str` slice.

## Wtf8::from_bytes_unchecked

```rust
pub unsafe fn from_bytes_unchecked(value: &[u8]) -> &Wtf8
```

Creates a WTF-8 slice from a WTF-8 byte slice.

# Safety

`value` must contain well-formed WTF-8.

## Wtf8::from_mut_bytes_unchecked

```rust
pub unsafe fn from_mut_bytes_unchecked(value: &mut [u8]) -> &mut Wtf8
```

Creates a mutable WTF-8 slice from a mutable WTF-8 byte slice.

# Safety

`value` must contain well-formed WTF-8.

## Wtf8::len

```rust
pub fn len(&self) -> usize
```

Returns the length, in WTF-8 bytes.

## Wtf8::ascii_byte_at

```rust
pub fn ascii_byte_at(&self, position: usize) -> u8
```

Returns the code point at `position` if it is in the ASCII range,
or `b'\xFF'` otherwise.

# Panics

Panics if `position` is beyond the end of the string.

## Wtf8::code_points

```rust
pub fn code_points(&self) -> Wtf8CodePoints<'_>
```

Returns an iterator for the string’s code points.

## Wtf8::as_bytes

```rust
pub fn as_bytes(&self) -> &[u8]
```

Access raw bytes of WTF-8 data

## Wtf8::as_str

```rust
pub fn as_str(&self) -> Result<&str, str::Utf8Error>
```

Tries to convert the string to UTF-8 and return a `&str` slice.

Returns `None` if the string contains surrogates.

This does not copy the data.

## Wtf8::encode_wide

```rust
pub fn encode_wide(&self) -> EncodeWide<'_>
```

Converts the WTF-8 string to potentially ill-formed UTF-16
and return an iterator of 16-bit code units.

This is lossless:
calling `Wtf8Buf::from_ill_formed_utf16` on the resulting code units
would always return the original WTF-8 string.

## Wtf8::is_code_point_boundary

```rust
pub fn is_code_point_boundary(&self, index: usize) -> bool
```

Copied from str::is_char_boundary

## Wtf8::check_utf8_boundary

```rust
pub fn check_utf8_boundary(&self, index: usize)
```

Verify that `index` is at the edge of either a valid UTF-8 codepoint
(i.e. a codepoint that's not a surrogate) or of the whole string.

These are the cases currently permitted by `OsStr::self_encoded_bytes`.
Splitting between surrogates is valid as far as WTF-8 is concerned, but
we do not permit it in the public API because WTF-8 is considered an
implementation detail.