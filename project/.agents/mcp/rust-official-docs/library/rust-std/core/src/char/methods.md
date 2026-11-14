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

```
let dist = u32::from(char::MAX) - u32::from(char::MIN);
let size = (char::MIN..=char::MAX).count() as u32;
assert!(size < dist);
```

Despite this gap, the `MIN` and [`MAX`] values can be used as bounds for
all `char` values.

[`MAX`]: char::MAX

# Examples

```
# fn something_which_returns_char() -> char { 'a' }
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

```
let dist = u32::from(char::MAX) - u32::from(char::MIN);
let size = (char::MIN..=char::MAX).count() as u32;
assert!(size < dist);
```

Despite this gap, the [`MIN`] and `MAX` values can be used as bounds for
all `char` values.

[`MIN`]: char::MIN

# Examples

```
# fn something_which_returns_char() -> char { 'a' }
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

The maximum number of bytes required to [encode](char::encode_utf8) a `char` to
UTF-8 encoding.

## char::MAX_LEN_UTF16

```rust
pub const MAX_LEN_UTF16: usize = 2
```

The maximum number of two-byte units required to [encode](char::encode_utf16) a `char`
to UTF-16 encoding.

## char::REPLACEMENT_CHARACTER

```rust
pub const REPLACEMENT_CHARACTER: char = '\u
```

`U+FFFD REPLACEMENT CHARACTER` (�) is used in Unicode to represent a
decoding error.

It can occur, for example, when giving ill-formed UTF-8 bytes to
[`String::from_utf8_lossy`](../std/string/struct.String.html#method.from_utf8_lossy).

## char::UNICODE_VERSION

```rust
pub const UNICODE_VERSION: (u8, u8, u8) = crate::unicode::UNICODE_VERSION
```

The version of [Unicode](https://www.unicode.org/) that the Unicode parts of
`char` and `str` methods are based on.

New versions of Unicode are released regularly, and subsequently all methods
in the standard library depending on Unicode are updated. Therefore, the
behavior of some `char` and `str` methods, and the value of this constant,
change over time (within the boundaries of Unicode's [stability policies]).
This is *not* considered to be a breaking change.

[stability policies]: https://www.unicode.org/policies/stability_policy.html

The version numbering scheme is explained in
[Section 3.1 (Version Numbering)] of the Unicode Standard.

[Section 3.1 (Version Numbering)]: https://www.unicode.org/versions/latest/core-spec/chapter-3/#G49512

## char::decode_utf16

```rust
pub fn decode_utf16<I: IntoIterator<Item = u16>>(iter: I) -> DecodeUtf16<I::IntoIter>
```

Creates an iterator over the native endian UTF-16 encoded code points in `iter`,
returning unpaired surrogates as `Err`s.

# Examples

Basic usage:

```
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

```
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

Note that all `char`s are valid [`u32`]s, and can be cast to one with
[`as`](../std/keyword.as.html):

```
let c = '💯';
let i = c as u32;

assert_eq!(128175, i);
```

However, the reverse is not true: not all valid [`u32`]s are valid
`char`s. `from_u32()` will return `None` if the input is not a valid value
for a `char`.

For an unsafe version of this function which ignores these checks, see
[`from_u32_unchecked`].

[`from_u32_unchecked`]: #method.from_u32_unchecked

# Examples

Basic usage:

```
let c = char::from_u32(0x2764);

assert_eq!(Some('❤'), c);
```

Returning `None` when the input is not a valid `char`:

```
let c = char::from_u32(0x110000);

assert_eq!(None, c);
```

## char::from_u32_unchecked

```rust
pub const unsafe fn from_u32_unchecked(i: u32) -> char
```

Converts a `u32` to a `char`, ignoring validity.

Note that all `char`s are valid [`u32`]s, and can be cast to one with
`as`:

```
let c = '💯';
let i = c as u32;

assert_eq!(128175, i);
```

However, the reverse is not true: not all valid [`u32`]s are valid
`char`s. `from_u32_unchecked()` will ignore this, and blindly cast to
`char`, possibly creating an invalid one.

# Safety

This function is unsafe, as it may construct invalid `char` values.

For a safe version of this function, see the [`from_u32`] function.

[`from_u32`]: #method.from_u32

# Examples

Basic usage:

```
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

```
let c = char::from_digit(4, 10);

assert_eq!(Some('4'), c);

// Decimal 11 is a single digit in base 16
let c = char::from_digit(11, 16);

assert_eq!(Some('b'), c);
```

Returning `None` when the input is not a digit:

```
let c = char::from_digit(20, 10);

assert_eq!(None, c);
```

Passing a large radix, causing a panic:

```should_panic
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

Compared to [`is_numeric()`], this function only recognizes the characters
`0-9`, `a-z` and `A-Z`.

'Digit' is defined to be only the following characters:

* `0-9`
* `a-z`
* `A-Z`

For a more comprehensive understanding of 'digit', see [`is_numeric()`].

[`is_numeric()`]: #method.is_numeric

# Panics

Panics if given a radix smaller than 2 or larger than 36.

# Examples

Basic usage:

```
assert!('1'.is_digit(10));
assert!('f'.is_digit(16));
assert!(!'f'.is_digit(10));
```

Passing a large radix, causing a panic:

```should_panic
// this panics
'1'.is_digit(37);
```

Passing a small radix, causing a panic:

```should_panic
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

```
assert_eq!('1'.to_digit(10), Some(1));
assert_eq!('f'.to_digit(16), Some(15));
```

Passing a non-digit results in failure:

```
assert_eq!('f'.to_digit(10), None);
assert_eq!('z'.to_digit(16), None);
```

Passing a large radix, causing a panic:

```should_panic
// this panics
let _ = '1'.to_digit(37);
```
Passing a small radix, causing a panic:

```should_panic
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

```
for c in '❤'.escape_unicode() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```
println!("{}", '❤'.escape_unicode());
```

Both are equivalent to:

```
println!("\\u{{2764}}");
```

Using [`to_string`](../std/string/trait.ToString.html#tymethod.to_string):

```
assert_eq!('❤'.escape_unicode().to_string(), "\\u{2764}");
```

## char::escape_debug

```rust
pub fn escape_debug(self) -> EscapeDebug
```

Returns an iterator that yields the literal escape code of a character
as `char`s.

This will escape the characters similar to the [`Debug`](core::fmt::Debug) implementations
of `str` or `char`.

# Examples

As an iterator:

```
for c in '\n'.escape_debug() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```
println!("{}", '\n'.escape_debug());
```

Both are equivalent to:

```
println!("\\n");
```

Using [`to_string`](../std/string/trait.ToString.html#tymethod.to_string):

```
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
  [`escape_unicode`].

[`escape_unicode`]: #method.escape_unicode

# Examples

As an iterator:

```
for c in '"'.escape_default() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```
println!("{}", '"'.escape_default());
```

Both are equivalent to:

```
println!("\\\"");
```

Using [`to_string`](../std/string/trait.ToString.html#tymethod.to_string):

```
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

```
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

```
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
the [basic multilingual plane] or [supplementary planes] respectively.

See the documentation for [`len_utf8()`] for more explanation of this
concept. This function is a mirror, but for UTF-16 instead of UTF-8.

[basic multilingual plane]: http://www.unicode.org/glossary/#basic_multilingual_plane
[supplementary planes]: http://www.unicode.org/glossary/#supplementary_planes
[`len_utf8()`]: #method.len_utf8

# Examples

Basic usage:

```
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

```
let mut b = [0; 2];

let result = 'ß'.encode_utf8(&mut b);

assert_eq!(result, "ß");

assert_eq!(result.len(), 2);
```

A buffer that's too small:

```should_panic
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

```
let mut b = [0; 2];

let result = '𝕊'.encode_utf16(&mut b);

assert_eq!(result.len(), 2);
```

A buffer that's too small:

```should_panic
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
[specified] in the Unicode Character Database [`DerivedCoreProperties.txt`].

[described]: https://www.unicode.org/versions/latest/core-spec/chapter-4/#G32524
[specified]: https://www.unicode.org/reports/tr44/#Alphabetic
[`DerivedCoreProperties.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/DerivedCoreProperties.txt

# Examples

Basic usage:

```
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
[specified] in the Unicode Character Database [`DerivedCoreProperties.txt`].

[described]: https://www.unicode.org/versions/latest/core-spec/chapter-4/#G136255
[specified]: https://www.unicode.org/reports/tr44/#Lowercase
[`DerivedCoreProperties.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/DerivedCoreProperties.txt

# Examples

Basic usage:

```
assert!('a'.is_lowercase());
assert!('δ'.is_lowercase());
assert!(!'A'.is_lowercase());
assert!(!'Δ'.is_lowercase());

// The various Chinese scripts and punctuation do not have case, and so:
assert!(!'中'.is_lowercase());
assert!(!' '.is_lowercase());
```

In a const context:

```
const CAPITAL_DELTA_IS_LOWERCASE: bool = 'Δ'.is_lowercase();
assert!(!CAPITAL_DELTA_IS_LOWERCASE);
```

## char::is_uppercase

```rust
pub const fn is_uppercase(self) -> bool
```

Returns `true` if this `char` has the `Uppercase` property.

`Uppercase` is [described] in Chapter 4 (Character Properties) of the Unicode Standard, and
[specified] in the Unicode Character Database [`DerivedCoreProperties.txt`].

[described]: https://www.unicode.org/versions/latest/core-spec/chapter-4/#G136255
[specified]: https://www.unicode.org/reports/tr44/#Uppercase
[`DerivedCoreProperties.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/DerivedCoreProperties.txt

# Examples

Basic usage:

```
assert!(!'a'.is_uppercase());
assert!(!'δ'.is_uppercase());
assert!('A'.is_uppercase());
assert!('Δ'.is_uppercase());

// The various Chinese scripts and punctuation do not have case, and so:
assert!(!'中'.is_uppercase());
assert!(!' '.is_uppercase());
```

In a const context:

```
const CAPITAL_DELTA_IS_UPPERCASE: bool = 'Δ'.is_uppercase();
assert!(CAPITAL_DELTA_IS_UPPERCASE);
```

## char::is_numeric

```rust
pub fn is_numeric(self) -> bool
```

Returns `true` if this `char` has one of the general categories for numbers.

The general categories for numbers (`Nd` for decimal digits, `Nl` for letter-like numeric
characters, and `No` for other numeric characters) are [specified] in the Unicode Character
Database [`UnicodeData.txt`].

This method doesn't cover everything that could be considered a number, e.g. ideographic numbers like '三'.
If you want everything including characters with overlapping purposes, then you might want to use
a Unicode or language-processing library that exposes the appropriate character properties
(e.g. [`Numeric_Type`]) instead of looking at the Unicode categories.

If you want to parse ASCII decimal digits (0-9) or ASCII base-N, use
`is_ascii_digit` or `is_digit` instead.

[specified]: https://www.unicode.org/reports/tr44/#GC_Values_Table
[`UnicodeData.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt
[`Numeric_Type`]: https://www.unicode.org/reports/tr44/#Numeric_Type

# Examples

Basic usage:

```
assert!('٣'.is_numeric());
assert!('7'.is_numeric());
assert!('৬'.is_numeric());
assert!('¾'.is_numeric());
assert!('①'.is_numeric());
assert!(!'K'.is_numeric());
assert!(!'و'.is_numeric());
assert!(!'藏'.is_numeric());
assert!(!'三'.is_numeric());
```

## char::is_alphanumeric

```rust
pub fn is_alphanumeric(self) -> bool
```

Returns `true` if this `char` satisfies either [`is_alphabetic()`] or [`is_numeric()`].

[`is_alphabetic()`]: Self::is_alphabetic
[`is_numeric()`]: Self::is_numeric

# Examples

Basic usage:

```
assert!('٣'.is_alphanumeric());
assert!('7'.is_alphanumeric());
assert!('৬'.is_alphanumeric());
assert!('¾'.is_alphanumeric());
assert!('①'.is_alphanumeric());
assert!('K'.is_alphanumeric());
assert!('و'.is_alphanumeric());
assert!('藏'.is_alphanumeric());
```

## char::is_whitespace

```rust
pub const fn is_whitespace(self) -> bool
```

Returns `true` if this `char` has the `White_Space` property.

`White_Space` is [specified] in the Unicode Character Database [`PropList.txt`].

[specified]: https://www.unicode.org/reports/tr44/#White_Space
[`PropList.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt

# Examples

Basic usage:

```
assert!(' '.is_whitespace());

// line break
assert!('\n'.is_whitespace());

// a non-breaking space
assert!('\u{A0}'.is_whitespace());

assert!(!'越'.is_whitespace());
```

## char::is_control

```rust
pub const fn is_control(self) -> bool
```

Returns `true` if this `char` has the general category for control codes.

Control codes (code points with the general category of `Cc`) are [described] in Chapter 23
(Special Areas and Format Characters) of the Unicode Standard, and [specified] in the Unicode Character
Database [`UnicodeData.txt`]. The full set of Unicode control codes is
`'\0'..='\x1f' | '\x7f'..='\u{9f}'`, and will never change.

[described]: https://www.unicode.org/versions/latest/core-spec/chapter-23/#G20365
[specified]: https://www.unicode.org/reports/tr44/#GC_Values_Table
[`UnicodeData.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt

# Examples

Basic usage:

```
assert!('\t'.is_control());
assert!('\n'.is_control());
assert!('\u{9C}'.is_control()); // STRING TERMINATOR
assert!(!'q'.is_control());
```

## char::to_lowercase

```rust
pub fn to_lowercase(self) -> ToLowercase
```

Returns an iterator that yields the lowercase mapping of this `char` as one or more
`char`s.

If this `char` does not have a lowercase mapping, the iterator yields the same `char`.

If this `char` has a one-to-one lowercase mapping given by the [Unicode Character
Database][ucd] [`UnicodeData.txt`], the iterator yields that `char`.

[ucd]: https://www.unicode.org/reports/tr44/
[`UnicodeData.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt

If this `char` expands to multiple `char`s, the iterator yields the `char`s given by
[`SpecialCasing.txt`]. The maximum number of `char`s in a case mapping is 3.

This operation performs an unconditional mapping without tailoring. That is, the conversion
is independent of context and language. See [below](#notes-on-context-and-locale)
for more information.

In the [Unicode Standard], Chapter 4 (Character Properties) discusses case mapping in
general and Chapter 3 (Conformance) discusses the default algorithm for case conversion.

[Unicode Standard]: https://www.unicode.org/versions/latest/

# Examples

As an iterator:

```
for c in 'İ'.to_lowercase() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```
println!("{}", 'İ'.to_lowercase());
```

Both are equivalent to:

```
println!("i\u{307}");
```

Using [`to_string`](../std/string/trait.ToString.html#tymethod.to_string):

```
assert_eq!('C'.to_lowercase().to_string(), "c");

// Sometimes the result is more than one character:
assert_eq!('İ'.to_lowercase().to_string(), "i\u{307}");

// Characters that do not have both uppercase and lowercase
// convert into themselves.
assert_eq!('山'.to_lowercase().to_string(), "山");
```
# Notes on context and locale

As stated earlier, this method does not take into account language or context.
Below is a non-exhaustive list of situations where this can be relevant.
If you need to handle locale-depedendent casing in your code, consider using
an external crate, like [`icu_casemap`](https://crates.io/crates/icu_casemap)
which is developed by Unicode.

## Greek sigma

In Greek, the letter simga (uppercase 'Σ') has two lowercase forms:
'σ' which is used in most situations, and 'ς' which appears only
at the end of a word. [`char::to_lowercase()`] always uses the first form:

```
assert_eq!('Σ'.to_lowercase().to_string(), "σ");
```

`str::to_lowercase()` (only available with the `alloc` crate)
*does* properly handle this contextual mapping,
so prefer using that method if you can. Alternatively, you can use
[`is_cased()`] and [`is_case_ignorable()`] to implement it yourself.
See `Final_Sigma` in [Table 3.17] of the Unicode Standard,
along with [`SpecialCasing.txt`], for more details.

[`is_cased()`]: Self::is_cased()
[`is_case_ignorable()`]: Self::is_case_ignorable()
[Table 3.17]: https://www.unicode.org/versions/latest/core-spec/chapter-3/#G54277

## Turkish and Azeri I/ı/İ/i

In Turkish and Azeri, the equivalent of 'i' in Latin has five forms instead of two:

* 'Dotless': I / ı, sometimes written ï
* 'Dotted': İ / i

Note that the uppercase undotted 'I' is the same codepoint as the Latin. Therefore:

```
let lower_i = 'I'.to_lowercase().to_string();
```

`'I'`'s correct lowercase relies on the language of the text: if we're
in `en-US`, it should be `"i"`, but if we're in `tr-TR` or `az-AZ`, it should
be `"ı"`. `to_lowercase()` does not take this into account, and so:

```
let lower_i = 'I'.to_lowercase().to_string();

assert_eq!(lower_i, "i");
```

holds across languages.

[`SpecialCasing.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt

## char::to_uppercase

```rust
pub fn to_uppercase(self) -> ToUppercase
```

Returns an iterator that yields the uppercase mapping of this `char` as one or more
`char`s.

Prefer this method when converting a word into ALL CAPS, but consider [`to_titlecase()`]
instead if you seek to capitalize Only The First Letter. See that method's documentation
for more information on the difference between the two.

If this `char` does not have an uppercase mapping, the iterator yields the same `char`.

If this `char` has a one-to-one uppercase mapping given by the [Unicode Character
Database][ucd] [`UnicodeData.txt`], the iterator yields that `char`.

[ucd]: https://www.unicode.org/reports/tr44/
[`UnicodeData.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt

If this `char` expands to multiple `char`s, the iterator yields the `char`s given by
[`SpecialCasing.txt`]. The maximum number of `char`s in a case mapping is 3.

[`SpecialCasing.txt`]: https://www.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt

This operation performs an unconditional mapping without tailoring. That is, the conversion
is independent of context and language. See [below](#note-on-locale)
for more information.

In the [Unicode Standard], Chapter 4 (Character Properties) discusses case mapping in
general and Chapter 3 (Conformance) discusses the default algorithm for case conversion.

[Unicode Standard]: https://www.unicode.org/versions/latest/

# Examples

`'ﬅ'` (U+FB05) is a single Unicode code point (a ligature) that maps to "ST" in uppercase.

As an iterator:

```
for c in 'ﬅ'.to_uppercase() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```
println!("{}", 'ﬅ'.to_uppercase());
```

Both are equivalent to:

```
println!("ST");
```

Using [`to_string`](../std/string/trait.ToString.html#tymethod.to_string):

```
assert_eq!('c'.to_uppercase().to_string(), "C");
assert_eq!('ა'.to_uppercase().to_string(), "Ა");
assert_eq!('ǆ'.to_uppercase().to_string(), "Ǆ");

// Sometimes the result is more than one character:
assert_eq!('ﬅ'.to_uppercase().to_string(), "ST");
assert_eq!('ᾨ'.to_uppercase().to_string(), "ὨΙ");

// Characters that do not have both uppercase and lowercase
// convert into themselves.
assert_eq!('山'.to_uppercase().to_string(), "山");
```

# Note on locale

As stated above, this method is locale-insensitive.
If you need locale support, consider using an external crate,
like [`icu_casemap`](https://crates.io/crates/icu_casemap)
which is developed by Unicode. A description of one common
locale-dependent casing issue follows (there are others):

In Turkish and Azeri, the equivalent of 'i' in Latin has five forms instead of two:

* 'Dotless': I / ı, sometimes written ï
* 'Dotted': İ / i

Note that the lowercase dotted 'i' is the same codepoint as the Latin. Therefore:

```
let upper_i = 'i'.to_uppercase().to_string();
```

`'i'`'s correct uppercase relies on the language of the text: if we're
in `en-US`, it should be `"I"`, but if we're in `tr-TR` or `az-AZ`, it should
be `"İ"`. `to_uppercase()` does not take this into account, and so:

```
let upper_i = 'i'.to_uppercase().to_string();

assert_eq!(upper_i, "I");
```

holds across languages.

[`to_titlecase()`]: Self::to_titlecase()

## char::is_ascii

```rust
pub const fn is_ascii(&self) -> bool
```

Checks if the value is within the ASCII range.

# Examples

```
let ascii = 'a';
let non_ascii = '❤';

assert!(ascii.is_ascii());
assert!(!non_ascii.is_ascii());
```

## char::to_ascii_uppercase

```rust
pub const fn to_ascii_uppercase(&self) -> char
```

Makes a copy of the value in its ASCII upper case equivalent.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To uppercase the value in-place, use [`make_ascii_uppercase()`].

To uppercase ASCII characters in addition to non-ASCII characters, use
[`to_uppercase()`].

# Examples

```
let ascii = 'a';
let non_ascii = '❤';

assert_eq!('A', ascii.to_ascii_uppercase());
assert_eq!('❤', non_ascii.to_ascii_uppercase());
```

[`make_ascii_uppercase()`]: #method.make_ascii_uppercase
[`to_uppercase()`]: #method.to_uppercase

## char::to_ascii_lowercase

```rust
pub const fn to_ascii_lowercase(&self) -> char
```

Makes a copy of the value in its ASCII lower case equivalent.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To lowercase the value in-place, use [`make_ascii_lowercase()`].

To lowercase ASCII characters in addition to non-ASCII characters, use
[`to_lowercase()`].

# Examples

```
let ascii = 'A';
let non_ascii = '❤';

assert_eq!('a', ascii.to_ascii_lowercase());
assert_eq!('❤', non_ascii.to_ascii_lowercase());
```

[`make_ascii_lowercase()`]: #method.make_ascii_lowercase
[`to_lowercase()`]: #method.to_lowercase

## char::eq_ignore_ascii_case

```rust
pub const fn eq_ignore_ascii_case(&self, other: &char) -> bool
```

Checks that two values are an ASCII case-insensitive match.

Equivalent to <code>[to_ascii_lowercase]\(a) == [to_ascii_lowercase]\(b)</code>.

# Examples

```
let upper_a = 'A';
let lower_a = 'a';
let lower_z = 'z';

assert!(upper_a.eq_ignore_ascii_case(&lower_a));
assert!(upper_a.eq_ignore_ascii_case(&upper_a));
assert!(!upper_a.eq_ignore_ascii_case(&lower_z));
```

[to_ascii_lowercase]: #method.to_ascii_lowercase

## char::make_ascii_uppercase

```rust
pub const fn make_ascii_uppercase(&mut self)
```

Converts this type to its ASCII upper case equivalent in-place.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To return a new uppercased value without modifying the existing one, use
[`to_ascii_uppercase()`].

# Examples

```
let mut ascii = 'a';

ascii.make_ascii_uppercase();

assert_eq!('A', ascii);
```

[`to_ascii_uppercase()`]: #method.to_ascii_uppercase

## char::make_ascii_lowercase

```rust
pub const fn make_ascii_lowercase(&mut self)
```

Converts this type to its ASCII lower case equivalent in-place.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To return a new lowercased value without modifying the existing one, use
[`to_ascii_lowercase()`].

# Examples

```
let mut ascii = 'A';

ascii.make_ascii_lowercase();

assert_eq!('a', ascii);
```

[`to_ascii_lowercase()`]: #method.to_ascii_lowercase

## char::is_ascii_alphabetic

```rust
pub const fn is_ascii_alphabetic(&self) -> bool
```

Checks if the value is an ASCII alphabetic character:

- U+0041 'A' ..= U+005A 'Z', or
- U+0061 'a' ..= U+007A 'z'.

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(uppercase_a.is_ascii_alphabetic());
assert!(uppercase_g.is_ascii_alphabetic());
assert!(a.is_ascii_alphabetic());
assert!(g.is_ascii_alphabetic());
assert!(!zero.is_ascii_alphabetic());
assert!(!percent.is_ascii_alphabetic());
assert!(!space.is_ascii_alphabetic());
assert!(!lf.is_ascii_alphabetic());
assert!(!esc.is_ascii_alphabetic());
```

## char::is_ascii_uppercase

```rust
pub const fn is_ascii_uppercase(&self) -> bool
```

Checks if the value is an ASCII uppercase character:
U+0041 'A' ..= U+005A 'Z'.

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(uppercase_a.is_ascii_uppercase());
assert!(uppercase_g.is_ascii_uppercase());
assert!(!a.is_ascii_uppercase());
assert!(!g.is_ascii_uppercase());
assert!(!zero.is_ascii_uppercase());
assert!(!percent.is_ascii_uppercase());
assert!(!space.is_ascii_uppercase());
assert!(!lf.is_ascii_uppercase());
assert!(!esc.is_ascii_uppercase());
```

## char::is_ascii_lowercase

```rust
pub const fn is_ascii_lowercase(&self) -> bool
```

Checks if the value is an ASCII lowercase character:
U+0061 'a' ..= U+007A 'z'.

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_lowercase());
assert!(!uppercase_g.is_ascii_lowercase());
assert!(a.is_ascii_lowercase());
assert!(g.is_ascii_lowercase());
assert!(!zero.is_ascii_lowercase());
assert!(!percent.is_ascii_lowercase());
assert!(!space.is_ascii_lowercase());
assert!(!lf.is_ascii_lowercase());
assert!(!esc.is_ascii_lowercase());
```

## char::is_ascii_alphanumeric

```rust
pub const fn is_ascii_alphanumeric(&self) -> bool
```

Checks if the value is an ASCII alphanumeric character:

- U+0041 'A' ..= U+005A 'Z', or
- U+0061 'a' ..= U+007A 'z', or
- U+0030 '0' ..= U+0039 '9'.

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(uppercase_a.is_ascii_alphanumeric());
assert!(uppercase_g.is_ascii_alphanumeric());
assert!(a.is_ascii_alphanumeric());
assert!(g.is_ascii_alphanumeric());
assert!(zero.is_ascii_alphanumeric());
assert!(!percent.is_ascii_alphanumeric());
assert!(!space.is_ascii_alphanumeric());
assert!(!lf.is_ascii_alphanumeric());
assert!(!esc.is_ascii_alphanumeric());
```

## char::is_ascii_digit

```rust
pub const fn is_ascii_digit(&self) -> bool
```

Checks if the value is an ASCII decimal digit:
U+0030 '0' ..= U+0039 '9'.

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_digit());
assert!(!uppercase_g.is_ascii_digit());
assert!(!a.is_ascii_digit());
assert!(!g.is_ascii_digit());
assert!(zero.is_ascii_digit());
assert!(!percent.is_ascii_digit());
assert!(!space.is_ascii_digit());
assert!(!lf.is_ascii_digit());
assert!(!esc.is_ascii_digit());
```

## char::is_ascii_hexdigit

```rust
pub const fn is_ascii_hexdigit(&self) -> bool
```

Checks if the value is an ASCII hexadecimal digit:

- U+0030 '0' ..= U+0039 '9', or
- U+0041 'A' ..= U+0046 'F', or
- U+0061 'a' ..= U+0066 'f'.

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(uppercase_a.is_ascii_hexdigit());
assert!(!uppercase_g.is_ascii_hexdigit());
assert!(a.is_ascii_hexdigit());
assert!(!g.is_ascii_hexdigit());
assert!(zero.is_ascii_hexdigit());
assert!(!percent.is_ascii_hexdigit());
assert!(!space.is_ascii_hexdigit());
assert!(!lf.is_ascii_hexdigit());
assert!(!esc.is_ascii_hexdigit());
```

## char::is_ascii_punctuation

```rust
pub const fn is_ascii_punctuation(&self) -> bool
```

Checks if the value is an ASCII punctuation or symbol character
(i.e. not alphanumeric, whitespace, or control):

- U+0021 ..= U+002F `! " # $ % & ' ( ) * + , - . /`, or
- U+003A ..= U+0040 `: ; < = > ? @`, or
- U+005B ..= U+0060 ``[ \ ] ^ _ ` ``, or
- U+007B ..= U+007E `{ | } ~`

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_punctuation());
assert!(!uppercase_g.is_ascii_punctuation());
assert!(!a.is_ascii_punctuation());
assert!(!g.is_ascii_punctuation());
assert!(!zero.is_ascii_punctuation());
assert!(percent.is_ascii_punctuation());
assert!(!space.is_ascii_punctuation());
assert!(!lf.is_ascii_punctuation());
assert!(!esc.is_ascii_punctuation());
```

## char::is_ascii_graphic

```rust
pub const fn is_ascii_graphic(&self) -> bool
```

Checks if the value is an ASCII graphic character
(i.e. not whitespace or control):
U+0021 '!' ..= U+007E '~'.

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(uppercase_a.is_ascii_graphic());
assert!(uppercase_g.is_ascii_graphic());
assert!(a.is_ascii_graphic());
assert!(g.is_ascii_graphic());
assert!(zero.is_ascii_graphic());
assert!(percent.is_ascii_graphic());
assert!(!space.is_ascii_graphic());
assert!(!lf.is_ascii_graphic());
assert!(!esc.is_ascii_graphic());
```

## char::is_ascii_whitespace

```rust
pub const fn is_ascii_whitespace(&self) -> bool
```

Checks if the value is an ASCII whitespace character:
U+0020 SPACE, U+0009 HORIZONTAL TAB, U+000A LINE FEED,
U+000C FORM FEED, or U+000D CARRIAGE RETURN.

**Warning:** Because the list above excludes U+000B VERTICAL TAB,
`c.is_ascii_whitespace()` is **not** equivalent to `c.is_ascii() && c.is_whitespace()`.

Rust uses the WhatWG Infra Standard's [definition of ASCII
whitespace][infra-aw]. There are several other definitions in
wide use. For instance, [the POSIX locale][pct] includes
U+000B VERTICAL TAB as well as all the above characters,
but—from the very same specification—[the default rule for
"field splitting" in the Bourne shell][bfs] considers *only*
SPACE, HORIZONTAL TAB, and LINE FEED as whitespace.

If you are writing a program that will process an existing
file format, check what that format's definition of whitespace is
before using this function.

[infra-aw]: https://infra.spec.whatwg.org/#ascii-whitespace
[pct]: https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap07.html#tag_07_03_01
[bfs]: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html#tag_19_06_05

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_whitespace());
assert!(!uppercase_g.is_ascii_whitespace());
assert!(!a.is_ascii_whitespace());
assert!(!g.is_ascii_whitespace());
assert!(!zero.is_ascii_whitespace());
assert!(!percent.is_ascii_whitespace());
assert!(space.is_ascii_whitespace());
assert!(lf.is_ascii_whitespace());
assert!(!esc.is_ascii_whitespace());
```

## char::is_ascii_control

```rust
pub const fn is_ascii_control(&self) -> bool
```

Checks if the value is an ASCII control character:
U+0000 NUL ..= U+001F UNIT SEPARATOR, or U+007F DELETE.
Note that most ASCII whitespace characters are control
characters, but SPACE is not.

# Examples

```
let uppercase_a = 'A';
let uppercase_g = 'G';
let a = 'a';
let g = 'g';
let zero = '0';
let percent = '%';
let space = ' ';
let lf = '\n';
let esc = '\x1b';

assert!(!uppercase_a.is_ascii_control());
assert!(!uppercase_g.is_ascii_control());
assert!(!a.is_ascii_control());
assert!(!g.is_ascii_control());
assert!(!zero.is_ascii_control());
assert!(!percent.is_ascii_control());
assert!(!space.is_ascii_control());
assert!(lf.is_ascii_control());
assert!(esc.is_ascii_control());
```