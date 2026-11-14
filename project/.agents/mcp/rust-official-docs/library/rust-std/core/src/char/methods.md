---
title: "core::char::methods (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/char/methods.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::char::methods

impl char {}

## char::MIN

```rust
pub const MIN: char = '\0'
```

The lowest valid code point a `char` can have, `'\0'`.

Unlike integer types, `char` actually has a gap in the middle,
meaning that the range of possible `char`s is smaller than you
might expect. Ranges of `char` will automatically hop this gap
for you:

```rust
let dist = u32::from(char::MAX) - u32::from(char::MIN);
let size = (char::MIN..=char::MAX).count() as u32;
assert!(size < dist);
```

Despite this gap, the `MIN` and `MAX` values can be used as bounds for
all `char` values.

# Examples

```rust
let c: char = something_which_returns_char();
assert!(char::MIN <= c);

let value_at_min = u32::from(char::MIN);
assert_eq!(char::from_u32(value_at_min), Some('\0'));
```

## char::MAX

```rust
pub const MAX: char = '\u
```

The highest valid code point a `char` can have, `'\u{10FFFF}'`.

Unlike integer types, `char` actually has a gap in the middle,
meaning that the range of possible `char`s is smaller than you
might expect. Ranges of `char` will automatically hop this gap
for you:

```rust
let dist = u32::from(char::MAX) - u32::from(char::MIN);
let size = (char::MIN..=char::MAX).count() as u32;
assert!(size < dist);
```

Despite this gap, the `MIN` and `MAX` values can be used as bounds for
all `char` values.

# Examples

```rust
let c: char = something_which_returns_char();
assert!(c <= char::MAX);

let value_at_max = u32::from(char::MAX);
assert_eq!(char::from_u32(value_at_max), Some('\u{10FFFF}'));
assert_eq!(char::from_u32(value_at_max + 1), None);
```

## char::MAX_LEN_UTF8

```rust
pub const MAX_LEN_UTF8: usize = 4
```

The maximum number of bytes required to encode a `char` to
UTF-8 encoding.

## char::MAX_LEN_UTF16

```rust
pub const MAX_LEN_UTF16: usize = 2
```

The maximum number of two-byte units required to encode a `char`
to UTF-16 encoding.

## char::REPLACEMENT_CHARACTER

```rust
pub const REPLACEMENT_CHARACTER: char = '\u
```

`U+FFFD REPLACEMENT CHARACTER` (�) is used in Unicode to represent a
decoding error.

It can occur, for example, when giving ill-formed UTF-8 bytes to
`String::from_utf8_lossy`.

## char::UNICODE_VERSION

```rust
pub const UNICODE_VERSION: (u8, u8, u8) = crate::unicode::UNICODE_VERSION
```

The version of Unicode that the Unicode parts of
`char` and `str` methods are based on.

New versions of Unicode are released regularly, and subsequently all methods
in the standard library depending on Unicode are updated. Therefore, the
behavior of some `char` and `str` methods, and the value of this constant,
change over time (within the boundaries of Unicode's [stability policies]).
This is *not* considered to be a breaking change.

The version numbering scheme is explained in
[Section 3.1 (Version Numbering)] of the Unicode Standard.

## char::decode_utf16

```rust
pub fn decode_utf16<I: IntoIterator<Item = u16>>(iter: I) -> DecodeUtf16<I::IntoIter>
```

Creates an iterator over the native endian UTF-16 encoded code points in `iter`,
returning unpaired surrogates as `Err`s.

# Examples

Basic usage:

```rust
// 𝄞mus<invalid>ic<invalid>
let v = [
    0xD834, 0xDD1E, 0x006d, 0x0075, 0x0073, 0xDD1E, 0x0069, 0x0063, 0xD834,
];

assert_eq!(
    char::decode_utf16(v)
        .map(|r| r.map_err(|e| e.unpaired_surrogate()))
        .collect::<Vec<_>>(),
    vec![
        Ok('𝄞'),
        Ok('m'), Ok('u'), Ok('s'),
        Err(0xDD1E),
        Ok('i'), Ok('c'),
        Err(0xD834)
    ]
);
```

A lossy decoder can be obtained by replacing `Err` results with the replacement character:

```rust
// 𝄞mus<invalid>ic<invalid>
let v = [
    0xD834, 0xDD1E, 0x006d, 0x0075, 0x0073, 0xDD1E, 0x0069, 0x0063, 0xD834,
];

assert_eq!(
    char::decode_utf16(v)
       .map(|r| r.unwrap_or(char::REPLACEMENT_CHARACTER))
       .collect::<String>(),
    "𝄞mus�ic�"
);
```

## char::from_u32

```rust
pub const fn from_u32(i: u32) -> Option<char>
```

Converts a `u32` to a `char`.

Note that all `char`s are valid `u32`s, and can be cast to one with
`as`:

```rust
let c = '💯';
let i = c as u32;

assert_eq!(128175, i);
```

However, the reverse is not true: not all valid `u32`s are valid
`char`s. `from_u32()` will return `None` if the input is not a valid value
for a `char`.

For an unsafe version of this function which ignores these checks, see
`from_u32_unchecked`.

# Examples

Basic usage:

```rust
let c = char::from_u32(0x2764);

assert_eq!(Some('❤'), c);
```

Returning `None` when the input is not a valid `char`:

```rust
let c = char::from_u32(0x110000);

assert_eq!(None, c);
```

## char::from_u32_unchecked

```rust
pub const unsafe fn from_u32_unchecked(i: u32) -> char
```

Converts a `u32` to a `char`, ignoring validity.

Note that all `char`s are valid `u32`s, and can be cast to one with
`as`:

```rust
let c = '💯';
let i = c as u32;

assert_eq!(128175, i);
```

However, the reverse is not true: not all valid `u32`s are valid
`char`s. `from_u32_unchecked()` will ignore this, and blindly cast to
`char`, possibly creating an invalid one.

# Safety

This function is unsafe, as it may construct invalid `char` values.

For a safe version of this function, see the `from_u32` function.

# Examples

Basic usage:

```rust
let c = unsafe { char::from_u32_unchecked(0x2764) };

assert_eq!('❤', c);
```

## char::from_digit

```rust
pub const fn from_digit(num: u32, radix: u32) -> Option<char>
```

Converts a digit in the given radix to a `char`.

A 'radix' here is sometimes also called a 'base'. A radix of two
indicates a binary number, a radix of ten, decimal, and a radix of
sixteen, hexadecimal, to give some common values. Arbitrary
radices are supported.

`from_digit()` will return `None` if the input is not a digit in
the given radix.

# Panics

Panics if given a radix larger than 36.

# Examples

Basic usage:

```rust
let c = char::from_digit(4, 10);

assert_eq!(Some('4'), c);

// Decimal 11 is a single digit in base 16
let c = char::from_digit(11, 16);

assert_eq!(Some('b'), c);
```

Returning `None` when the input is not a digit:

```rust
let c = char::from_digit(20, 10);

assert_eq!(None, c);
```

Passing a large radix, causing a panic:

```rust
// this panics
let _c = char::from_digit(1, 37);
```

## char::is_digit

```rust
pub const fn is_digit(self, radix: u32) -> bool
```

Checks if a `char` is a digit in the given radix.

A 'radix' here is sometimes also called a 'base'. A radix of two
indicates a binary number, a radix of ten, decimal, and a radix of
sixteen, hexadecimal, to give some common values. Arbitrary
radices are supported.

Compared to `is_numeric()`, this function only recognizes the characters
`0-9`, `a-z` and `A-Z`.

'Digit' is defined to be only the following characters:

* `0-9`
* `a-z`
* `A-Z`

For a more comprehensive understanding of 'digit', see `is_numeric()`.

# Panics

Panics if given a radix smaller than 2 or larger than 36.

# Examples

Basic usage:

```rust
assert!('1'.is_digit(10));
assert!('f'.is_digit(16));
assert!(!'f'.is_digit(10));
```

Passing a large radix, causing a panic:

```rust
// this panics
'1'.is_digit(37);
```

Passing a small radix, causing a panic:

```rust
// this panics
'1'.is_digit(1);
```

## char::to_digit

```rust
pub const fn to_digit(self, radix: u32) -> Option<u32>
```

Converts a `char` to a digit in the given radix.

A 'radix' here is sometimes also called a 'base'. A radix of two
indicates a binary number, a radix of ten, decimal, and a radix of
sixteen, hexadecimal, to give some common values. Arbitrary
radices are supported.

'Digit' is defined to be only the following characters:

* `0-9`
* `a-z`
* `A-Z`

# Errors

Returns `None` if the `char` does not refer to a digit in the given radix.

# Panics

Panics if given a radix smaller than 2 or larger than 36.

# Examples

Basic usage:

```rust
assert_eq!('1'.to_digit(10), Some(1));
assert_eq!('f'.to_digit(16), Some(15));
```

Passing a non-digit results in failure:

```rust
assert_eq!('f'.to_digit(10), None);
assert_eq!('z'.to_digit(16), None);
```

Passing a large radix, causing a panic:

```rust
// this panics
let _ = '1'.to_digit(37);
```
Passing a small radix, causing a panic:

```rust
// this panics
let _ = '1'.to_digit(1);
```

## char::escape_unicode

```rust
pub fn escape_unicode(self) -> EscapeUnicode
```

Returns an iterator that yields the hexadecimal Unicode escape of a
character as `char`s.

This will escape characters with the Rust syntax of the form
`\u{NNNNNN}` where `NNNNNN` is a hexadecimal representation.

# Examples

As an iterator:

```rust
for c in '❤'.escape_unicode() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```rust
println!("{}", '❤'.escape_unicode());
```

Both are equivalent to:

```rust
println!("\\u{{2764}}");
```

Using `to_string`:

```rust
assert_eq!('❤'.escape_unicode().to_string(), "\\u{2764}");
```

## char::escape_debug

```rust
pub fn escape_debug(self) -> EscapeDebug
```

Returns an iterator that yields the literal escape code of a character
as `char`s.

This will escape the characters similar to the `Debug` implementations
of `str` or `char`.

# Examples

As an iterator:

```rust
for c in '\n'.escape_debug() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```rust
println!("{}", '\n'.escape_debug());
```

Both are equivalent to:

```rust
println!("\\n");
```

Using `to_string`:

```rust
assert_eq!('\n'.escape_debug().to_string(), "\\n");
```

## char::escape_default

```rust
pub fn escape_default(self) -> EscapeDefault
```

Returns an iterator that yields the literal escape code of a character
as `char`s.

The default is chosen with a bias toward producing literals that are
legal in a variety of languages, including C++11 and similar C-family
languages. The exact rules are:

* Tab is escaped as `\t`.
* Carriage return is escaped as `\r`.
* Line feed is escaped as `\n`.
* Single quote is escaped as `\'`.
* Double quote is escaped as `\"`.
* Backslash is escaped as `\\`.
* Any character in the 'printable ASCII' range `0x20` .. `0x7e`
  inclusive is not escaped.
* All other characters are given hexadecimal Unicode escapes; see
  `escape_unicode`.

# Examples

As an iterator:

```rust
for c in '"'.escape_default() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```rust
println!("{}", '"'.escape_default());
```

Both are equivalent to:

```rust
println!("\\\"");
```

Using `to_string`:

```rust
assert_eq!('"'.escape_default().to_string(), "\\\"");
```

## char::len_utf8

```rust
pub const fn len_utf8(self) -> usize
```

Returns the number of bytes this `char` would need if encoded in UTF-8.

That number of bytes is always between 1 and 4, inclusive.

# Examples

Basic usage:

```rust
let len = 'A'.len_utf8();
assert_eq!(len, 1);

let len = 'ß'.len_utf8();
assert_eq!(len, 2);

let len = 'ℝ'.len_utf8();
assert_eq!(len, 3);

let len = '💣'.len_utf8();
assert_eq!(len, 4);
```

The `&str` type guarantees that its contents are UTF-8, and so we can compare the length it
would take if each code point was represented as a `char` vs in the `&str` itself:

```rust
// as chars
let eastern = '東';
let capital = '京';

// both can be represented as three bytes
assert_eq!(3, eastern.len_utf8());
assert_eq!(3, capital.len_utf8());

// as a &str, these two are encoded in UTF-8
let tokyo = "東京";

let len = eastern.len_utf8() + capital.len_utf8();

// we can see that they take six bytes total...
assert_eq!(6, tokyo.len());

// ... just like the &str
assert_eq!(len, tokyo.len());
```

## char::len_utf16

```rust
pub const fn len_utf16(self) -> usize
```

Returns the number of 16-bit code units this `char` would need if
encoded in UTF-16.

That number of code units is always either 1 or 2, for unicode scalar values in
the [basic <example-value> plane] or [supplementary planes] respectively.

See the documentation for `len_utf8()` for more explanation of this
concept. This function is a mirror, but for UTF-16 instead of UTF-8.

# Examples

Basic usage:

```rust
let n = 'ß'.len_utf16();
assert_eq!(n, 1);

let len = '💣'.len_utf16();
assert_eq!(len, 2);
```

## char::encode_utf8

```rust
pub const fn encode_utf8(self, dst: &mut [u8]) -> &mut str
```

Encodes this character as UTF-8 into the provided byte buffer,
and then returns the subslice of the buffer that contains the encoded character.

# Panics

Panics if the buffer is not large enough.
A buffer of length four is large enough to encode any `char`.

# Examples

In both of these examples, 'ß' takes two bytes to encode.

```rust
let mut b = [0; 2];

let result = 'ß'.encode_utf8(&mut b);

assert_eq!(result, "ß");

assert_eq!(result.len(), 2);
```

A buffer that's too small:

```rust
let mut b = [0; 1];

// this panics
'ß'.encode_utf8(&mut b);
```

## char::encode_utf16

```rust
pub const fn encode_utf16(self, dst: &mut [u16]) -> &mut [u16]
```

Encodes this character as native endian UTF-16 into the provided `u16` buffer,
and then returns the subslice of the buffer that contains the encoded character.

# Panics

Panics if the buffer is not large enough.
A buffer of length 2 is large enough to encode any `char`.

# Examples

In both of these examples, '𝕊' takes two `u16`s to encode.

```rust
let mut b = [0; 2];

let result = '𝕊'.encode_utf16(&mut b);

assert_eq!(result.len(), 2);
```

A buffer that's too small:

```rust
let mut b = [0; 1];

// this panics
'𝕊'.encode_utf16(&mut b);
```

## char::is_alphabetic

```rust
pub fn is_alphabetic(self) -> bool
```

Returns `true` if this `char` has the `Alphabetic` property.

`Alphabetic` is [described] in Chapter 4 (Character Properties) of the Unicode Standard, and
[specified] in the Unicode Character Database `DerivedCoreProperties.txt`.

# Examples

Basic usage:

```rust
assert!('a'.is_alphabetic());
assert!('京'.is_alphabetic());

let c = '💝';
// love is many things, but it is not alphabetic
assert!(!c.is_alphabetic());
```

## char::is_lowercase

```rust
pub const fn is_lowercase(self) -> bool
```

Returns `true` if this `char` has the `Lowercase` property.

`Lowercase` is [described] in Chapter 4 (Character Properties) of the Unicode Standard, and
[specified] in the Unicode Character Database `DerivedCoreProperties.txt`.

# Examples

Basic usage:

```rust
assert!('a'.is_lowercase());
assert!('δ'.is_lowercase());
assert!(!'A'.is_lowercase());
assert!(!'Δ'.is_lowercase());

// The various Chinese scripts and punctuation do not have case, and so:
assert!(!'中'.is_lowercase());
assert!(!' '.is_lowercase());
```

In a const context:

```rust
const CAPITAL_DELTA_IS_LOWERCASE: bool = 'Δ'.is_lowercase();
assert!(!CAPITAL_DELTA_IS_LOWERCASE);
```
