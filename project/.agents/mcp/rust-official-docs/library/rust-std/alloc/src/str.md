# alloc::str

Utilities for the `str` primitive type.

*[See also the `str` primitive type](str).*

## str::into_boxed_bytes

```rust
pub fn into_boxed_bytes(self: Box<Self>) -> Box<[u8]>
```

Converts a `Box<str>` into a `Box<[u8]>` without copying or allocating.

# Examples

```
let s = "this is a string";
let boxed_str = s.to_owned().into_boxed_str();
let boxed_bytes = boxed_str.into_boxed_bytes();
assert_eq!(*boxed_bytes, *s.as_bytes());
```

## str::replace

```rust
pub fn replace<P: Pattern>(&self, from: P, to: &str) -> String
```

Replaces all matches of a pattern with another string.

`replace` creates a new [`String`], and copies the data from this string slice into it.
While doing so, it attempts to find matches of a pattern. If it finds any, it
replaces them with the replacement string slice.

# Examples

```
let s = "this is old";

assert_eq!("this is new", s.replace("old", "new"));
assert_eq!("than an old", s.replace("is", "an"));
```

When the pattern doesn't match, it returns this string slice as [`String`]:

```
let s = "this is old";
assert_eq!(s, s.replace("cookie monster", "little lamb"));
```

## str::replacen

```rust
pub fn replacen<P: Pattern>(&self, pat: P, to: &str, count: usize) -> String
```

Replaces first N matches of a pattern with another string.

`replacen` creates a new [`String`], and copies the data from this string slice into it.
While doing so, it attempts to find matches of a pattern. If it finds any, it
replaces them with the replacement string slice at most `count` times.

# Examples

```
let s = "foo foo 123 foo";
assert_eq!("new new 123 foo", s.replacen("foo", "new", 2));
assert_eq!("faa fao 123 foo", s.replacen('o', "a", 3));
assert_eq!("foo foo new23 foo", s.replacen(char::is_numeric, "new", 1));
```

When the pattern doesn't match, it returns this string slice as [`String`]:

```
let s = "this is old";
assert_eq!(s, s.replacen("cookie monster", "little lamb", 10));
```

## str::to_lowercase

```rust
pub fn to_lowercase(&self) -> String
```

Returns the lowercase equivalent of this string slice, as a new [`String`].

'Lowercase' is defined according to the terms of
[Chapter 3 (Conformance)](https://www.unicode.org/versions/latest/core-spec/chapter-3/#G34432)
of the Unicode standard.

Since some characters can expand into multiple characters when changing
the case, this function returns a [`String`] instead of modifying the
parameter in-place.

Unlike [`char::to_lowercase()`], this method fully handles the context-dependent
casing of Greek sigma. However, like that method, it does not handle locale-specific
casing, like Turkish and Azeri I/ı/İ/i. See its documentation
for more information.

# Examples

Basic usage:

```
let s = "HELLO WORLD";

assert_eq!("hello world", s.to_lowercase());
```

Tricky examples, with sigma:

```
let sigma = "Σ";

assert_eq!("σ", sigma.to_lowercase());

// but at the end of a word, it's ς, not σ:
let odysseus = "ὈΔΥΣΣΕΎΣ";

assert_eq!("ὀδυσσεύς", odysseus.to_lowercase());

let odysseus_king_of_ithaca = "Ο ΟΔΥΣΣΈΑΣ ΒΑΣΙΛΙΆΣ ΤΗΣ ΙΘΆΚΗΣ";

assert_eq!("ο οδυσσέας βασιλιάς της ιθάκης", odysseus_king_of_ithaca.to_lowercase());
```

Languages without case are not changed:

```
let new_year = "农历新年";

assert_eq!(new_year, new_year.to_lowercase());
```

## str::to_uppercase

```rust
pub fn to_uppercase(&self) -> String
```

Returns the uppercase equivalent of this string slice, as a new [`String`].

'Uppercase' is defined according to the terms of
[Chapter 3 (Conformance)](https://www.unicode.org/versions/latest/core-spec/chapter-3/#G34431)
of the Unicode standard.

Since some characters can expand into multiple characters when changing
the case, this function returns a [`String`] instead of modifying the
parameter in-place.

Like [`char::to_uppercase()`] this method does not handle language-specific
casing, like Turkish and Azeri I/ı/İ/i. See that method's documentation
for more information.

# Examples

Basic usage:

```
let s = "hello world";

assert_eq!("HELLO WORLD", s.to_uppercase());
```

Scripts without case are not changed:

```
let new_year = "农历新年";

assert_eq!(new_year, new_year.to_uppercase());
```

One character can become multiple:
```
let s = "tschüß";

assert_eq!("TSCHÜSS", s.to_uppercase());
```

## str::into_string

```rust
pub fn into_string(self: Box<Self>) -> String
```

Converts a [`Box<str>`] into a [`String`] without copying or allocating.

# Examples

```
let string = String::from("birthday gift");
let boxed_str = string.clone().into_boxed_str();

assert_eq!(boxed_str.into_string(), string);
```

## str::repeat

```rust
pub fn repeat(&self, n: usize) -> String
```

Creates a new [`String`] by repeating a string `n` times.

# Panics

This function will panic if the capacity would overflow.

# Examples

Basic usage:

```
assert_eq!("abc".repeat(4), String::from("abcabcabcabc"));
```

A panic upon overflow:

```should_panic
// this will panic at runtime
let huge = "0123456789abcdef".repeat(usize::MAX);
```

## str::to_ascii_uppercase

```rust
pub fn to_ascii_uppercase(&self) -> String
```

Returns a copy of this string where each character is mapped to its
ASCII upper case equivalent.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To uppercase the value in-place, use [`make_ascii_uppercase`].

To uppercase ASCII characters in addition to non-ASCII characters, use
[`to_uppercase`].

# Examples

```
let s = "Grüße, Jürgen ❤";

assert_eq!("GRüßE, JüRGEN ❤", s.to_ascii_uppercase());
```

[`make_ascii_uppercase`]: str::make_ascii_uppercase
[`to_uppercase`]: #method.to_uppercase

## str::to_ascii_lowercase

```rust
pub fn to_ascii_lowercase(&self) -> String
```

Returns a copy of this string where each character is mapped to its
ASCII lower case equivalent.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To lowercase the value in-place, use [`make_ascii_lowercase`].

To lowercase ASCII characters in addition to non-ASCII characters, use
[`to_lowercase`].

# Examples

```
let s = "Grüße, Jürgen ❤";

assert_eq!("grüße, jürgen ❤", s.to_ascii_lowercase());
```

[`make_ascii_lowercase`]: str::make_ascii_lowercase
[`to_lowercase`]: #method.to_lowercase

## fn from_boxed_utf8_unchecked

```rust
pub unsafe fn from_boxed_utf8_unchecked(v: Box<[u8]>) -> Box<str>
```

Converts a boxed slice of bytes to a boxed string slice without checking
that the string contains valid UTF-8.

# Safety

* The provided bytes must contain a valid UTF-8 sequence.

# Examples

```
let smile_utf8 = Box::new([226, 152, 186]);
let smile = unsafe { std::str::from_boxed_utf8_unchecked(smile_utf8) };

assert_eq!("☺", &*smile);
```