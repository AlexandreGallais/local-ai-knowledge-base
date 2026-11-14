# core::num

Numeric traits and functions for the built-in numeric types.

## fn midpoint

```rust
pub const fn midpoint(self, rhs: $SelfT) -> $SelfT
```

```

## fn midpoint

```rust
pub const fn midpoint(self, rhs: Self) -> Self
```

```

## fn midpoint

```rust
pub const fn midpoint(self, rhs: $SelfT) -> $SelfT
```

```

## fn midpoint

```rust
pub const fn midpoint(self, rhs: $SelfT) -> $SelfT
```

```

## u8::is_ascii

```rust
pub const fn is_ascii(&self) -> bool
```

Checks if the value is within the ASCII range.

# Examples

```
let ascii = 97u8;
let non_ascii = 150u8;

assert!(ascii.is_ascii());
assert!(!non_ascii.is_ascii());
```

## u8::to_ascii_uppercase

```rust
pub const fn to_ascii_uppercase(&self) -> u8
```

Makes a copy of the value in its ASCII upper case equivalent.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To uppercase the value in-place, use [`make_ascii_uppercase`].

# Examples

```
let lowercase_a = 97u8;

assert_eq!(65, lowercase_a.to_ascii_uppercase());
```

[`make_ascii_uppercase`]: Self::make_ascii_uppercase

## u8::to_ascii_lowercase

```rust
pub const fn to_ascii_lowercase(&self) -> u8
```

Makes a copy of the value in its ASCII lower case equivalent.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To lowercase the value in-place, use [`make_ascii_lowercase`].

# Examples

```
let uppercase_a = 65u8;

assert_eq!(97, uppercase_a.to_ascii_lowercase());
```

[`make_ascii_lowercase`]: Self::make_ascii_lowercase

## u8::eq_ignore_ascii_case

```rust
pub const fn eq_ignore_ascii_case(&self, other: &u8) -> bool
```

Checks that two values are an ASCII case-insensitive match.

This is equivalent to `to_ascii_lowercase(a) == to_ascii_lowercase(b)`.

# Examples

```
let lowercase_a = 97u8;
let uppercase_a = 65u8;

assert!(lowercase_a.eq_ignore_ascii_case(&uppercase_a));
```

## u8::make_ascii_uppercase

```rust
pub const fn make_ascii_uppercase(&mut self)
```

Converts this value to its ASCII upper case equivalent in-place.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To return a new uppercased value without modifying the existing one, use
[`to_ascii_uppercase`].

# Examples

```
let mut byte = b'a';

byte.make_ascii_uppercase();

assert_eq!(b'A', byte);
```

[`to_ascii_uppercase`]: Self::to_ascii_uppercase

## u8::make_ascii_lowercase

```rust
pub const fn make_ascii_lowercase(&mut self)
```

Converts this value to its ASCII lower case equivalent in-place.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To return a new lowercased value without modifying the existing one, use
[`to_ascii_lowercase`].

# Examples

```
let mut byte = b'A';

byte.make_ascii_lowercase();

assert_eq!(b'a', byte);
```

[`to_ascii_lowercase`]: Self::to_ascii_lowercase

## u8::is_ascii_alphabetic

```rust
pub const fn is_ascii_alphabetic(&self) -> bool
```

Checks if the value is an ASCII alphabetic character:

- U+0041 'A' ..= U+005A 'Z', or
- U+0061 'a' ..= U+007A 'z'.

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_uppercase

```rust
pub const fn is_ascii_uppercase(&self) -> bool
```

Checks if the value is an ASCII uppercase character:
U+0041 'A' ..= U+005A 'Z'.

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_lowercase

```rust
pub const fn is_ascii_lowercase(&self) -> bool
```

Checks if the value is an ASCII lowercase character:
U+0061 'a' ..= U+007A 'z'.

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_alphanumeric

```rust
pub const fn is_ascii_alphanumeric(&self) -> bool
```

Checks if the value is an ASCII alphanumeric character:

- U+0041 'A' ..= U+005A 'Z', or
- U+0061 'a' ..= U+007A 'z', or
- U+0030 '0' ..= U+0039 '9'.

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_digit

```rust
pub const fn is_ascii_digit(&self) -> bool
```

Checks if the value is an ASCII decimal digit:
U+0030 '0' ..= U+0039 '9'.

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_hexdigit

```rust
pub const fn is_ascii_hexdigit(&self) -> bool
```

Checks if the value is an ASCII hexadecimal digit:

- U+0030 '0' ..= U+0039 '9', or
- U+0041 'A' ..= U+0046 'F', or
- U+0061 'a' ..= U+0066 'f'.

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_punctuation

```rust
pub const fn is_ascii_punctuation(&self) -> bool
```

Checks if the value is an ASCII punctuation or symbol character
(i.e. not alphanumeric, whitespace, or control):

- U+0021 ..= U+002F `! " # $ % & ' ( ) * + , - . /`, or
- U+003A ..= U+0040 `: ; < = > ? @`, or
- U+005B ..= U+0060 `` [ \ ] ^ _ ` ``, or
- U+007B ..= U+007E `{ | } ~`

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_graphic

```rust
pub const fn is_ascii_graphic(&self) -> bool
```

Checks if the value is an ASCII graphic character
(i.e. not whitespace or control):
U+0021 '!' ..= U+007E '~'.

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_whitespace

```rust
pub const fn is_ascii_whitespace(&self) -> bool
```

Checks if the value is an ASCII whitespace character:
U+0020 SPACE, U+0009 HORIZONTAL TAB, U+000A LINE FEED,
U+000C FORM FEED, or U+000D CARRIAGE RETURN.

**Warning:** Because the list above excludes U+000B VERTICAL TAB,
`b.is_ascii_whitespace()` is **not** equivalent to `char::from(b).is_whitespace()`.

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
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::is_ascii_control

```rust
pub const fn is_ascii_control(&self) -> bool
```

Checks if the value is an ASCII control character:
U+0000 NUL ..= U+001F UNIT SEPARATOR, or U+007F DELETE.
Note that most ASCII whitespace characters are control
characters, but SPACE is not.

# Examples

```
let uppercase_a = b'A';
let uppercase_g = b'G';
let a = b'a';
let g = b'g';
let zero = b'0';
let percent = b'%';
let space = b' ';
let lf = b'\n';
let esc = b'\x1b';

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

## u8::escape_ascii

```rust
pub fn escape_ascii(self) -> ascii::EscapeDefault
```

Returns an iterator that produces an escaped version of a `u8`,
treating it as an ASCII character.

The behavior is identical to [`ascii::escape_default`].

# Examples

```
assert_eq!("0", b'0'.escape_ascii().to_string());
assert_eq!("\\t", b'\t'.escape_ascii().to_string());
assert_eq!("\\r", b'\r'.escape_ascii().to_string());
assert_eq!("\\n", b'\n'.escape_ascii().to_string());
assert_eq!("\\'", b'\''.escape_ascii().to_string());
assert_eq!("\\\"", b'"'.escape_ascii().to_string());
assert_eq!("\\\\", b'\\'.escape_ascii().to_string());
assert_eq!("\\x9d", b'\x9d'.escape_ascii().to_string());
```

## enum FpCategory

```rust
pub enum FpCategory
```

A classification of floating point numbers.

This `enum` is used as the return type for [`f32::classify`] and [`f64::classify`]. See
their documentation for more.

# Examples

```
use std::num::FpCategory;

let num = 12.4_f32;
let inf = f32::INFINITY;
let zero = 0f32;
let sub: f32 = 1.1754942e-38;
let nan = f32::NAN;

assert_eq!(num.classify(), FpCategory::Normal);
assert_eq!(inf.classify(), FpCategory::Infinite);
assert_eq!(zero.classify(), FpCategory::Zero);
assert_eq!(sub.classify(), FpCategory::Subnormal);
assert_eq!(nan.classify(), FpCategory::Nan);
```

## int_ty::from_str_radix

```rust
pub const fn from_str_radix(src: &str, radix: u32) -> Result<$int_ty, ParseIntError>
```

```