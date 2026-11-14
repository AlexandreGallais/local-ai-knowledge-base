---
title: "core::str (part 2 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/str/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::str (part 2 of 5)

## str::split_at_checked

```rust
pub const fn split_at_checked(&self, mid: usize) -> Option<(&str, &str)>
```

Divides one string slice into two at a byte offset.

The argument, `mid`, should be a valid byte offset from the start of the
string. It must also be on the boundary of a UTF-8 code point. The
method returns `None` if that’s not the case.

The first returned slice contains exactly the first `mid` bytes, and the
second contains all remaining bytes.

To get mutable string slices instead, see the `split_at_mut_checked`
method.

# Examples

```rust
let s = "Per Martin-Löf";

let (first, last) = s.split_at_checked(3).unwrap();
assert_eq!("Per", first);
assert_eq!(" Martin-Löf", last);

assert_eq!(None, s.split_at_checked(13));  // Inside “ö”
assert_eq!(None, s.split_at_checked(16));  // Beyond the string length
```

## str::split_at_mut_checked

```rust
pub const fn split_at_mut_checked(&mut self, mid: usize) -> Option<(&mut str, &mut str)>
```

Divides one mutable string slice into two at a byte offset.

The argument, `mid`, should be a valid byte offset from the start of the
string. It must also be on the boundary of a UTF-8 code point. The
method returns `None` if that’s not the case.

The first returned slice contains exactly the first `mid` bytes, and the
second contains all remaining bytes.

To get immutable string slices instead, see the `split_at_checked` method.

# Examples

```rust
let mut s = "Per Martin-Löf".to_string();
if let Some((first, last)) = s.split_at_mut_checked(3) {
    first.make_ascii_uppercase();
    assert_eq!("PER", first);
    assert_eq!(" Martin-Löf", last);
}
assert_eq!("PER Martin-Löf", s);

assert_eq!(None, s.split_at_mut_checked(13));  // Inside “ö”
assert_eq!(None, s.split_at_mut_checked(16));  // Beyond the string length
```

## str::chars

```rust
pub fn chars(&self) -> Chars<'_>
```

Returns an iterator over the `char`s of a string slice.

As a string slice consists of valid UTF-8, we can iterate through a
string slice by `char`. This method returns such an iterator.

It's important to remember that `char` represents a Unicode Scalar
Value, and might not match your idea of what a 'character' is. Iteration
over grapheme clusters may be what you actually want. This functionality
is not provided by Rust's standard library, check crates.io instead.

# Examples

Basic usage:

```rust
let word = "goodbye";

let count = word.chars().count();
assert_eq!(7, count);

let mut chars = word.chars();

assert_eq!(Some('g'), chars.next());
assert_eq!(Some('o'), chars.next());
assert_eq!(Some('o'), chars.next());
assert_eq!(Some('d'), chars.next());
assert_eq!(Some('b'), chars.next());
assert_eq!(Some('y'), chars.next());
assert_eq!(Some('e'), chars.next());

assert_eq!(None, chars.next());
```

Remember, `char`s might not match your intuition about characters:

```rust
let y = "y̆";

let mut chars = y.chars();

assert_eq!(Some('y'), chars.next()); // not 'y̆'
assert_eq!(Some('\u{0306}'), chars.next());

assert_eq!(None, chars.next());
```

## str::char_indices

```rust
pub fn char_indices(&self) -> CharIndices<'_>
```

Returns an iterator over the `char`s of a string slice, and their
positions.

As a string slice consists of valid UTF-8, we can iterate through a
string slice by `char`. This method returns an iterator of both
these `char`s, as well as their byte positions.

The iterator yields tuples. The position is first, the `char` is
second.

# Examples

Basic usage:

```rust
let word = "goodbye";

let count = word.char_indices().count();
assert_eq!(7, count);

let mut char_indices = word.char_indices();

assert_eq!(Some((0, 'g')), char_indices.next());
assert_eq!(Some((1, 'o')), char_indices.next());
assert_eq!(Some((2, 'o')), char_indices.next());
assert_eq!(Some((3, 'd')), char_indices.next());
assert_eq!(Some((4, 'b')), char_indices.next());
assert_eq!(Some((5, 'y')), char_indices.next());
assert_eq!(Some((6, 'e')), char_indices.next());

assert_eq!(None, char_indices.next());
```

Remember, `char`s might not match your intuition about characters:

```rust
let yes = "y̆es";

let mut char_indices = yes.char_indices();

assert_eq!(Some((0, 'y')), char_indices.next()); // not (0, 'y̆')
assert_eq!(Some((1, '\u{0306}')), char_indices.next());

// note the 3 here - the previous character took up two bytes
assert_eq!(Some((3, 'e')), char_indices.next());
assert_eq!(Some((4, 's')), char_indices.next());

assert_eq!(None, char_indices.next());
```

## str::bytes

```rust
pub fn bytes(&self) -> Bytes<'_>
```

Returns an iterator over the bytes of a string slice.

As a string slice consists of a sequence of bytes, we can iterate
through a string slice by byte. This method returns such an iterator.

# Examples

```rust
let mut bytes = "bors".bytes();

assert_eq!(Some(b'b'), bytes.next());
assert_eq!(Some(b'o'), bytes.next());
assert_eq!(Some(b'r'), bytes.next());
assert_eq!(Some(b's'), bytes.next());

assert_eq!(None, bytes.next());
```

## str::split_whitespace

```rust
pub fn split_whitespace(&self) -> SplitWhitespace<'_>
```

Splits a string slice by whitespace.

The iterator returned will return string slices that are sub-slices of
the original string slice, separated by any amount of whitespace.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`. If you only want to split on ASCII whitespace
instead, use `split_ascii_whitespace`.

# Examples

Basic usage:

```rust
let mut iter = "A few words".split_whitespace();

assert_eq!(Some("A"), iter.next());
assert_eq!(Some("few"), iter.next());
assert_eq!(Some("words"), iter.next());

assert_eq!(None, iter.next());
```

All kinds of whitespace are considered:

```rust
let mut iter = " Mary   had\ta\u{2009}little  \n\t lamb".split_whitespace();
assert_eq!(Some("Mary"), iter.next());
assert_eq!(Some("had"), iter.next());
assert_eq!(Some("a"), iter.next());
assert_eq!(Some("little"), iter.next());
assert_eq!(Some("lamb"), iter.next());

assert_eq!(None, iter.next());
```

If the string is empty or all whitespace, the iterator yields no string slices:
```rust
assert_eq!("".split_whitespace().next(), None);
assert_eq!("   ".split_whitespace().next(), None);
```

## str::split_ascii_whitespace

```rust
pub fn split_ascii_whitespace(&self) -> SplitAsciiWhitespace<'_>
```

Splits a string slice by ASCII whitespace.

The iterator returned will return string slices that are sub-slices of
the original string slice, separated by any amount of ASCII whitespace.

This uses the same definition as `char::is_ascii_whitespace`.
To split by Unicode `Whitespace` instead, use `split_whitespace`.
Note that because of this difference in definition, even if `s.is_ascii()`
is `true`, `s.split_ascii_whitespace()` behavior will differ from `s.split_whitespace()`
if `s` contains U+000B VERTICAL TAB.

# Examples

Basic usage:

```rust
let mut iter = "A few words".split_ascii_whitespace();

assert_eq!(Some("A"), iter.next());
assert_eq!(Some("few"), iter.next());
assert_eq!(Some("words"), iter.next());

assert_eq!(None, iter.next());
```

Various kinds of ASCII whitespace are considered
(see `char::is_ascii_whitespace`):

```rust
let mut iter = " Mary   had\ta little  \n\t lamb".split_ascii_whitespace();
assert_eq!(Some("Mary"), iter.next());
assert_eq!(Some("had"), iter.next());
assert_eq!(Some("a"), iter.next());
assert_eq!(Some("little"), iter.next());
assert_eq!(Some("lamb"), iter.next());

assert_eq!(None, iter.next());
```

If the string is empty or all ASCII whitespace, the iterator yields no string slices:
```rust
assert_eq!("".split_ascii_whitespace().next(), None);
assert_eq!("   ".split_ascii_whitespace().next(), None);
```

## str::lines

```rust
pub fn lines(&self) -> Lines<'_>
```

Returns an iterator over the lines of a string, as string slices.

Lines are split at line endings that are either newlines (`\n`) or
sequences of a carriage return followed by a line feed (`\r\n`).

Line terminators are not included in the lines returned by the iterator.

Note that any carriage return (`\r`) not immediately followed by a
line feed (`\n`) does not split a line. These carriage returns are
thereby included in the produced lines.

The final line ending is optional. A string that ends with a final line
ending will return the same lines as an otherwise identical string
without a final line ending.

An empty string returns an empty iterator.

# Examples

Basic usage:

```rust
let text = "foo\r\nbar\n\nbaz\r";
let mut lines = text.lines();

assert_eq!(Some("foo"), lines.next());
assert_eq!(Some("bar"), lines.next());
assert_eq!(Some(""), lines.next());
// Trailing carriage return is included in the last line
assert_eq!(Some("baz\r"), lines.next());

assert_eq!(None, lines.next());
```

The final line does not require any ending:

```rust
let text = "foo\nbar\n\r\nbaz";
let mut lines = text.lines();

assert_eq!(Some("foo"), lines.next());
assert_eq!(Some("bar"), lines.next());
assert_eq!(Some(""), lines.next());
assert_eq!(Some("baz"), lines.next());

assert_eq!(None, lines.next());
```

An empty string returns an empty iterator:

```rust
let text = "";
let mut lines = text.lines();

assert_eq!(lines.next(), None);
```

## str::lines_any

```rust
pub fn lines_any(&self) -> LinesAny<'_>
```

Returns an iterator over the lines of a string.

## str::encode_utf16

```rust
pub fn encode_utf16(&self) -> EncodeUtf16<'_>
```

Returns an iterator of `u16` over the string encoded
as native endian UTF-16 (without byte-order mark).

# Examples

```rust
let text = "Zażółć gęślą jaźń";

let utf8_len = text.len();
let utf16_len = text.encode_utf16().count();

assert!(utf16_len <= utf8_len);
```

## str::contains

```rust
pub fn contains<P: Pattern>(&self, pat: P) -> bool
```

Returns `true` if the given pattern matches a sub-slice of
this string slice.

Returns `false` if it does not.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

```rust
let bananas = "bananas";

assert!(bananas.contains("nana"));
assert!(!bananas.contains("apples"));
```

## str::starts_with

```rust
pub fn starts_with<P: Pattern>(&self, pat: P) -> bool
```

Returns `true` if the given pattern matches a prefix of this
string slice.

Returns `false` if it does not.

The [pattern] can be a `&str`, in which case this function will return true if
the `&str` is a prefix of this string slice.

The [pattern] can also be a `char`, a slice of `char`s, or a
function or closure that determines if a character matches.
These will only be checked against the first character of this string slice.
Look at the second example below regarding behavior for slices of `char`s.

# Examples

```rust
let bananas = "bananas";

assert!(bananas.starts_with("bana"));
assert!(!bananas.starts_with("nana"));
```

```rust
let bananas = "bananas";

// Note that both of these assert successfully.
assert!(bananas.starts_with(&['b', 'a', 'n', 'a']));
assert!(bananas.starts_with(&['a', 'b', 'c', 'd']));
```

## str::ends_with

```rust
pub fn ends_with<P: Pattern>(&self, pat: P) -> bool where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns `true` if the given pattern matches a suffix of this
string slice.

Returns `false` if it does not.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

```rust
let bananas = "bananas";

assert!(bananas.ends_with("anas"));
assert!(!bananas.ends_with("nana"));
```

## str::find

```rust
pub fn find<P: Pattern>(&self, pat: P) -> Option<usize>
```

Returns the byte index of the first character of this string slice that
matches the pattern.

Returns `None` if the pattern doesn't match.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

Simple patterns:

```rust
let s = "Löwe 老虎 Léopard Gepardi";

assert_eq!(s.find('L'), Some(0));
assert_eq!(s.find('é'), Some(14));
assert_eq!(s.find("pard"), Some(17));
```

More complex patterns using point-free style and closures:

```rust
let s = "Löwe 老虎 Léopard";

assert_eq!(s.find(char::is_whitespace), Some(5));
assert_eq!(s.find(char::is_lowercase), Some(1));
assert_eq!(s.find(|c: char| c.is_whitespace() || c.is_lowercase()), Some(1));
assert_eq!(s.find(|c: char| (c < 'o') && (c > 'a')), Some(4));
```

Not finding the pattern:

```rust
let s = "Löwe 老虎 Léopard";
let x: &[_] = &['1', '2'];

assert_eq!(s.find(x), None);
```

## str::rfind

```rust
pub fn rfind<P: Pattern>(&self, pat: P) -> Option<usize> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns the byte index for the first character of the last match of the pattern in
this string slice.

Returns `None` if the pattern doesn't match.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

Simple patterns:

```rust
let s = "Löwe 老虎 Léopard Gepardi";

assert_eq!(s.rfind('L'), Some(13));
assert_eq!(s.rfind('é'), Some(14));
assert_eq!(s.rfind("pard"), Some(24));
```

More complex patterns with closures:

```rust
let s = "Löwe 老虎 Léopard";

assert_eq!(s.rfind(char::is_whitespace), Some(12));
assert_eq!(s.rfind(char::is_lowercase), Some(20));
```

Not finding the pattern:

```rust
let s = "Löwe 老虎 Léopard";
let x: &[_] = &['1', '2'];

assert_eq!(s.rfind(x), None);
```
