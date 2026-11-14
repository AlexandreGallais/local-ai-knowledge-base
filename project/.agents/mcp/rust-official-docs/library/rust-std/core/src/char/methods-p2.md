---
title: "core::char::methods (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/char/methods.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::char::methods (part 2 of 3)

## char::is_uppercase

```rust
pub const fn is_uppercase(self) -> bool
```

Returns `true` if this `char` has the `Uppercase` property.

`Uppercase` is [described] in Chapter 4 (Character Properties) of the Unicode Standard, and
[specified] in the Unicode Character Database `DerivedCoreProperties.txt`.

# Examples

Basic usage:

```rust
assert!(!'a'.is_uppercase());
assert!(!'δ'.is_uppercase());
assert!('A'.is_uppercase());
assert!('Δ'.is_uppercase());

// The various Chinese scripts and punctuation do not have case, and so:
assert!(!'中'.is_uppercase());
assert!(!' '.is_uppercase());
```

In a const context:

```rust
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
Database `UnicodeData.txt`.

This method doesn't cover everything that could be considered a number, e.g. ideographic numbers like '三'.
If you want everything including characters with overlapping purposes, then you might want to use
a Unicode or language-processing library that exposes the appropriate character properties
(e.g. `Numeric_Type`) instead of looking at the Unicode categories.

If you want to parse ASCII decimal digits (0-9) or ASCII base-N, use
`is_ascii_digit` or `is_digit` instead.

# Examples

Basic usage:

```rust
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

Returns `true` if this `char` satisfies either `is_alphabetic()` or `is_numeric()`.

# Examples

Basic usage:

```rust
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

`White_Space` is [specified] in the Unicode Character Database `PropList.txt`.

# Examples

Basic usage:

```rust
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
Database `UnicodeData.txt`. The full set of Unicode control codes is
`'\0'..='\x1f' | '\x7f'..='\u{9f}'`, and will never change.

# Examples

Basic usage:

```rust
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

If this `char` has a one-to-one lowercase mapping given by the Unicode Character
Database `UnicodeData.txt`, the iterator yields that `char`.

If this `char` expands to multiple `char`s, the iterator yields the `char`s given by
`SpecialCasing.txt`. The maximum number of `char`s in a case mapping is 3.

This operation performs an unconditional mapping without tailoring. That is, the conversion
is independent of context and language. See below
for more information.

In the [Unicode Standard], Chapter 4 (Character Properties) discusses case mapping in
general and Chapter 3 (Conformance) discusses the default algorithm for case conversion.

# Examples

As an iterator:

```rust
for c in 'İ'.to_lowercase() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```rust
println!("{}", 'İ'.to_lowercase());
```

Both are equivalent to:

```rust
println!("i\u{307}");
```

Using `to_string`:

```rust
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
an external crate, like `icu_casemap`
which is developed by Unicode.

## Greek sigma

In Greek, the letter simga (uppercase 'Σ') has two lowercase forms:
'σ' which is used in most situations, and 'ς' which appears only
at the end of a word. `char::to_lowercase()` always uses the first form:

```rust
assert_eq!('Σ'.to_lowercase().to_string(), "σ");
```

`str::to_lowercase()` (only available with the `alloc` crate)
*does* properly handle this contextual mapping,
so prefer using that method if you can. Alternatively, you can use
`is_cased()` and `is_case_ignorable()` to implement it yourself.
See `Final_Sigma` in [Table 3.17] of the Unicode Standard,
along with `SpecialCasing.txt`, for more details.

## Turkish and Azeri I/ı/İ/i

In Turkish and Azeri, the equivalent of 'i' in Latin has five forms instead of two:

* 'Dotless': I / ı, sometimes written ï
* 'Dotted': İ / i

Note that the uppercase undotted 'I' is the same codepoint as the Latin. Therefore:

```rust
let lower_i = 'I'.to_lowercase().to_string();
```

`'I'`'s correct lowercase relies on the language of the text: if we're
in `en-US`, it should be `"i"`, but if we're in `tr-TR` or `az-AZ`, it should
be `"ı"`. `to_lowercase()` does not take this into account, and so:

```rust
let lower_i = 'I'.to_lowercase().to_string();

assert_eq!(lower_i, "i");
```

holds across languages.

## char::to_uppercase

```rust
pub fn to_uppercase(self) -> ToUppercase
```

Returns an iterator that yields the uppercase mapping of this `char` as one or more
`char`s.

Prefer this method when converting a word into ALL CAPS, but consider `to_titlecase()`
instead if you seek to capitalize Only The First Letter. See that method's documentation
for more information on the difference between the two.

If this `char` does not have an uppercase mapping, the iterator yields the same `char`.

If this `char` has a one-to-one uppercase mapping given by the Unicode Character
Database `UnicodeData.txt`, the iterator yields that `char`.

If this `char` expands to multiple `char`s, the iterator yields the `char`s given by
`SpecialCasing.txt`. The maximum number of `char`s in a case mapping is 3.

This operation performs an unconditional mapping without tailoring. That is, the conversion
is independent of context and language. See below
for more information.

In the [Unicode Standard], Chapter 4 (Character Properties) discusses case mapping in
general and Chapter 3 (Conformance) discusses the default algorithm for case conversion.

# Examples

`'ﬅ'` (U+FB05) is a single Unicode code point (a ligature) that maps to "ST" in uppercase.

As an iterator:

```rust
for c in 'ﬅ'.to_uppercase() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```rust
println!("{}", 'ﬅ'.to_uppercase());
```

Both are equivalent to:

```rust
println!("ST");
```

Using `to_string`:

```rust
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
like `icu_casemap`
which is developed by Unicode. A description of one common
locale-dependent casing issue follows (there are others):

In Turkish and Azeri, the equivalent of 'i' in Latin has five forms instead of two:

* 'Dotless': I / ı, sometimes written ï
* 'Dotted': İ / i

Note that the lowercase dotted 'i' is the same codepoint as the Latin. Therefore:

```rust
let upper_i = 'i'.to_uppercase().to_string();
```

`'i'`'s correct uppercase relies on the language of the text: if we're
in `en-US`, it should be `"I"`, but if we're in `tr-TR` or `az-AZ`, it should
be `"İ"`. `to_uppercase()` does not take this into account, and so:

```rust
let upper_i = 'i'.to_uppercase().to_string();

assert_eq!(upper_i, "I");
```

holds across languages.

## char::is_ascii

```rust
pub const fn is_ascii(&self) -> bool
```

Checks if the value is within the ASCII range.

# Examples

```rust
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

To uppercase the value in-place, use `make_ascii_uppercase()`.

To uppercase ASCII characters in addition to non-ASCII characters, use
`to_uppercase()`.

# Examples

```rust
let ascii = 'a';
let non_ascii = '❤';

assert_eq!('A', ascii.to_ascii_uppercase());
assert_eq!('❤', non_ascii.to_ascii_uppercase());
```

## char::to_ascii_lowercase

```rust
pub const fn to_ascii_lowercase(&self) -> char
```

Makes a copy of the value in its ASCII lower case equivalent.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To lowercase the value in-place, use `make_ascii_lowercase()`.

To lowercase ASCII characters in addition to non-ASCII characters, use
`to_lowercase()`.

# Examples

```rust
let ascii = 'A';
let non_ascii = '❤';

assert_eq!('a', ascii.to_ascii_lowercase());
assert_eq!('❤', non_ascii.to_ascii_lowercase());
```

## char::eq_ignore_ascii_case

```rust
pub const fn eq_ignore_ascii_case(&self, other: &char) -> bool
```

Checks that two values are an ASCII case-insensitive match.

Equivalent to `[to_ascii_lowercase]\(a) == [to_ascii_lowercase]\(b)`.

# Examples

```rust
let upper_a = 'A';
let lower_a = 'a';
let lower_z = 'z';

assert!(upper_a.eq_ignore_ascii_case(&lower_a));
assert!(upper_a.eq_ignore_ascii_case(&upper_a));
assert!(!upper_a.eq_ignore_ascii_case(&lower_z));
```

## char::make_ascii_uppercase

```rust
pub const fn make_ascii_uppercase(&mut self)
```

Converts this type to its ASCII upper case equivalent in-place.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To return a new uppercased value without modifying the existing one, use
`to_ascii_uppercase()`.

# Examples

```rust
let mut ascii = 'a';

ascii.make_ascii_uppercase();

assert_eq!('A', ascii);
```

## char::make_ascii_lowercase

```rust
pub const fn make_ascii_lowercase(&mut self)
```

Converts this type to its ASCII lower case equivalent in-place.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To return a new lowercased value without modifying the existing one, use
`to_ascii_lowercase()`.

# Examples

```rust
let mut ascii = 'A';

ascii.make_ascii_lowercase();

assert_eq!('a', ascii);
```

## char::is_ascii_alphabetic

```rust
pub const fn is_ascii_alphabetic(&self) -> bool
```

Checks if the value is an ASCII alphabetic character:

- U+0041 'A' ..= U+005A 'Z', or
- U+0061 'a' ..= U+007A 'z'.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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
