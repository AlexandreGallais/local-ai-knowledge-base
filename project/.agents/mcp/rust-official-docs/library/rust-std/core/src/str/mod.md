# core::str

String manipulation.

For more details, see the [`std::str`] module.

[`std::str`]: ../../std/str/index.html

## str::len

```rust
pub const fn len(&self) -> usize
```

Returns the length of `self`.

This length is in bytes, not [`char`]s or graphemes. In other words,
it might not be what a human considers the length of the string.

[`char`]: prim@char

# Examples

```
let len = "foo".len();
assert_eq!(3, len);

assert_eq!("ƒoo".len(), 4); // fancy f!
assert_eq!("ƒoo".chars().count(), 3);
```

## str::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if `self` has a length of zero bytes.

# Examples

```
let s = "";
assert!(s.is_empty());

let s = "not empty";
assert!(!s.is_empty());
```

## str::from_utf8

```rust
pub const fn from_utf8(v: &[u8]) -> Result<&str, Utf8Error>
```

Converts a slice of bytes to a string slice.

A string slice ([`&str`]) is made of bytes ([`u8`]), and a byte slice
([`&[u8]`][byteslice]) is made of bytes, so this function converts between
the two. Not all byte slices are valid string slices, however: [`&str`] requires
that it is valid UTF-8. `from_utf8()` checks to ensure that the bytes are valid
UTF-8, and then does the conversion.

[`&str`]: str
[byteslice]: prim@slice

If you are sure that the byte slice is valid UTF-8, and you don't want to
incur the overhead of the validity check, there is an unsafe version of
this function, [`from_utf8_unchecked`], which has the same
behavior but skips the check.

If you need a `String` instead of a `&str`, consider
[`String::from_utf8`][string].

[string]: ../std/string/struct.String.html#method.from_utf8

Because you can stack-allocate a `[u8; N]`, and you can take a
[`&[u8]`][byteslice] of it, this function is one way to have a
stack-allocated string. There is an example of this in the
examples section below.

[byteslice]: slice

# Errors

Returns `Err` if the slice is not UTF-8 with a description as to why the
provided slice is not UTF-8.

# Examples

Basic usage:

```
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

// We can use the ? (try) operator to check if the bytes are valid
let sparkle_heart = str::from_utf8(&sparkle_heart)?;

assert_eq!("💖", sparkle_heart);
# Ok::<_, std::str::Utf8Error>(())
```

Incorrect bytes:

```
// some invalid bytes, in a vector
let sparkle_heart = vec![0, 159, 146, 150];

assert!(str::from_utf8(&sparkle_heart).is_err());
```

See the docs for [`Utf8Error`] for more details on the kinds of
errors that can be returned.

A "stack allocated string":

```
// some bytes, in a stack-allocated array
let sparkle_heart = [240, 159, 146, 150];

// We know these bytes are valid, so just use `unwrap()`.
let sparkle_heart: &str = str::from_utf8(&sparkle_heart).unwrap();

assert_eq!("💖", sparkle_heart);
```

## str::from_utf8_mut

```rust
pub const fn from_utf8_mut(v: &mut [u8]) -> Result<&mut str, Utf8Error>
```

Converts a mutable slice of bytes to a mutable string slice.

# Examples

Basic usage:

```
// "Hello, Rust!" as a mutable vector
let mut hellorust = vec![72, 101, 108, 108, 111, 44, 32, 82, 117, 115, 116, 33];

// As we know these bytes are valid, we can use `unwrap()`
let outstr = str::from_utf8_mut(&mut hellorust).unwrap();

assert_eq!("Hello, Rust!", outstr);
```

Incorrect bytes:

```
// Some invalid bytes in a mutable vector
let mut invalid = vec![128, 223];

assert!(str::from_utf8_mut(&mut invalid).is_err());
```
See the docs for [`Utf8Error`] for more details on the kinds of
errors that can be returned.

## str::from_utf8_unchecked

```rust
pub const unsafe fn from_utf8_unchecked(v: &[u8]) -> &str
```

Converts a slice of bytes to a string slice without checking
that the string contains valid UTF-8.

See the safe version, [`from_utf8`], for more information.

# Safety

The bytes passed in must be valid UTF-8.

# Examples

Basic usage:

```
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

let sparkle_heart = unsafe {
    str::from_utf8_unchecked(&sparkle_heart)
};

assert_eq!("💖", sparkle_heart);
```

## str::from_utf8_unchecked_mut

```rust
pub const unsafe fn from_utf8_unchecked_mut(v: &mut [u8]) -> &mut str
```

Converts a slice of bytes to a string slice without checking
that the string contains valid UTF-8; mutable version.

See the immutable version, [`from_utf8_unchecked()`] for documentation and safety requirements.

# Examples

Basic usage:

```
let mut heart = vec![240, 159, 146, 150];
let heart = unsafe { str::from_utf8_unchecked_mut(&mut heart) };

assert_eq!("💖", heart);
```

## str::is_char_boundary

```rust
pub const fn is_char_boundary(&self, index: usize) -> bool
```

Checks that `index`-th byte is the first byte in a UTF-8 code point
sequence or the end of the string.

The start and end of the string (when `index == self.len()`) are
considered to be boundaries.

Returns `false` if `index` is greater than `self.len()`.

# Examples

```
let s = "Löwe 老虎 Léopard";
assert!(s.is_char_boundary(0));
// start of `老`
assert!(s.is_char_boundary(6));
assert!(s.is_char_boundary(s.len()));

// second byte of `ö`
assert!(!s.is_char_boundary(2));

// third byte of `老`
assert!(!s.is_char_boundary(8));
```

## str::floor_char_boundary

```rust
pub const fn floor_char_boundary(&self, index: usize) -> usize
```

Finds the closest `x` not exceeding `index` where [`is_char_boundary(x)`] is `true`.

This method can help you truncate a string so that it's still valid UTF-8, but doesn't
exceed a given number of bytes. Note that this is done purely at the character level
and can still visually split graphemes, even though the underlying characters aren't
split. For example, the emoji 🧑‍🔬 (scientist) could be split so that the string only
includes 🧑 (person) instead.

[`is_char_boundary(x)`]: Self::is_char_boundary

# Examples

```
let s = "❤️🧡💛💚💙💜";
assert_eq!(s.len(), 26);
assert!(!s.is_char_boundary(13));

let closest = s.floor_char_boundary(13);
assert_eq!(closest, 10);
assert_eq!(&s[..closest], "❤️🧡");
```

## str::ceil_char_boundary

```rust
pub const fn ceil_char_boundary(&self, index: usize) -> usize
```

Finds the closest `x` not below `index` where [`is_char_boundary(x)`] is `true`.

If `index` is greater than the length of the string, this returns the length of the string.

This method is the natural complement to [`floor_char_boundary`]. See that method
for more details.

[`floor_char_boundary`]: str::floor_char_boundary
[`is_char_boundary(x)`]: Self::is_char_boundary

# Examples

```
let s = "❤️🧡💛💚💙💜";
assert_eq!(s.len(), 26);
assert!(!s.is_char_boundary(13));

let closest = s.ceil_char_boundary(13);
assert_eq!(closest, 14);
assert_eq!(&s[..closest], "❤️🧡💛");
```

## str::as_bytes

```rust
pub const fn as_bytes(&self) -> &[u8]
```

Converts a string slice to a byte slice. To convert the byte slice back
into a string slice, use the [`from_utf8`] function.

# Examples

```
let bytes = "bors".as_bytes();
assert_eq!(b"bors", bytes);
```

## str::as_bytes_mut

```rust
pub const unsafe fn as_bytes_mut(&mut self) -> &mut [u8]
```

Converts a mutable string slice to a mutable byte slice.

# Safety

The caller must ensure that the content of the slice is valid UTF-8
before the borrow ends and the underlying `str` is used.

Use of a `str` whose contents are not valid UTF-8 is undefined behavior.

# Examples

Basic usage:

```
let mut s = String::from("Hello");
let bytes = unsafe { s.as_bytes_mut() };

assert_eq!(b"Hello", bytes);
```

Mutability:

```
let mut s = String::from("🗻∈🌏");

unsafe {
    let bytes = s.as_bytes_mut();

    bytes[0] = 0xF0;
    bytes[1] = 0x9F;
    bytes[2] = 0x8D;
    bytes[3] = 0x94;
}

assert_eq!("🍔∈🌏", s);
```

## str::as_ptr

```rust
pub const fn as_ptr(&self) -> *const u8
```

Converts a string slice to a raw pointer.

As string slices are a slice of bytes, the raw pointer points to a
[`u8`]. This pointer will be pointing to the first byte of the string
slice.

The caller must ensure that the returned pointer is never written to.
If you need to mutate the contents of the string slice, use [`as_mut_ptr`].

[`as_mut_ptr`]: str::as_mut_ptr

# Examples

```
let s = "Hello";
let ptr = s.as_ptr();
```

## str::as_mut_ptr

```rust
pub const fn as_mut_ptr(&mut self) -> *mut u8
```

Converts a mutable string slice to a raw pointer.

As string slices are a slice of bytes, the raw pointer points to a
[`u8`]. This pointer will be pointing to the first byte of the string
slice.

It is your responsibility to make sure that the string slice only gets
modified in a way that it remains valid UTF-8.

## str::get

```rust
pub const fn get<I: [const] SliceIndex<str>>(&self, i: I) -> Option<&I::Output>
```

Returns a subslice of `str`.

This is the non-panicking alternative to indexing the `str`. Returns
[`None`] whenever equivalent indexing operation would panic.

# Examples

```
let v = String::from("🗻∈🌏");

assert_eq!(Some("🗻"), v.get(0..4));

// indices not on UTF-8 sequence boundaries
assert!(v.get(1..).is_none());
assert!(v.get(..8).is_none());

// out of bounds
assert!(v.get(..42).is_none());
```

## str::get_mut

```rust
pub const fn get_mut<I: [const] SliceIndex<str>>(&mut self, i: I) -> Option<&mut I::Output>
```

Returns a mutable subslice of `str`.

This is the non-panicking alternative to indexing the `str`. Returns
[`None`] whenever equivalent indexing operation would panic.

# Examples

```
let mut v = String::from("hello");
// correct length
assert!(v.get_mut(0..5).is_some());
// out of bounds
assert!(v.get_mut(..42).is_none());
assert_eq!(Some("he"), v.get_mut(0..2).map(|v| &*v));

assert_eq!("hello", v);
{
    let s = v.get_mut(0..2);
    let s = s.map(|s| {
        s.make_ascii_uppercase();
        &*s
    });
    assert_eq!(Some("HE"), s);
}
assert_eq!("HEllo", v);
```

## str::get_unchecked

```rust
pub unsafe fn get_unchecked<I: SliceIndex<str>>(&self, i: I) -> &I::Output
```

Returns an unchecked subslice of `str`.

This is the unchecked alternative to indexing the `str`.

# Safety

Callers of this function are responsible that these preconditions are
satisfied:

* The starting index must not exceed the ending index;
* Indexes must be within bounds of the original slice;
* Indexes must lie on UTF-8 sequence boundaries.

Failing that, the returned string slice may reference invalid memory or
violate the invariants communicated by the `str` type.

# Examples

```
let v = "🗻∈🌏";
unsafe {
    assert_eq!("🗻", v.get_unchecked(0..4));
    assert_eq!("∈", v.get_unchecked(4..7));
    assert_eq!("🌏", v.get_unchecked(7..11));
}
```

## str::get_unchecked_mut

```rust
pub unsafe fn get_unchecked_mut<I: SliceIndex<str>>(&mut self, i: I) -> &mut I::Output
```

Returns a mutable, unchecked subslice of `str`.

This is the unchecked alternative to indexing the `str`.

# Safety

Callers of this function are responsible that these preconditions are
satisfied:

* The starting index must not exceed the ending index;
* Indexes must be within bounds of the original slice;
* Indexes must lie on UTF-8 sequence boundaries.

Failing that, the returned string slice may reference invalid memory or
violate the invariants communicated by the `str` type.

# Examples

```
let mut v = String::from("🗻∈🌏");
unsafe {
    assert_eq!("🗻", v.get_unchecked_mut(0..4));
    assert_eq!("∈", v.get_unchecked_mut(4..7));
    assert_eq!("🌏", v.get_unchecked_mut(7..11));
}
```

## str::slice_unchecked

```rust
pub unsafe fn slice_unchecked(&self, begin: usize, end: usize) -> &str
```

Creates a string slice from another string slice, bypassing safety
checks.

This is generally not recommended, use with caution! For a safe
alternative see [`str`] and [`Index`].

[`Index`]: crate::ops::Index

This new slice goes from `begin` to `end`, including `begin` but
excluding `end`.

To get a mutable string slice instead, see the
[`slice_mut_unchecked`] method.

[`slice_mut_unchecked`]: str::slice_mut_unchecked

# Safety

Callers of this function are responsible that three preconditions are
satisfied:

* `begin` must not exceed `end`.
* `begin` and `end` must be byte positions within the string slice.
* `begin` and `end` must lie on UTF-8 sequence boundaries.

# Examples

```
let s = "Löwe 老虎 Léopard";

unsafe {
    assert_eq!("Löwe 老虎 Léopard", s.slice_unchecked(0, 21));
}

let s = "Hello, world!";

unsafe {
    assert_eq!("world", s.slice_unchecked(7, 12));
}
```

## str::slice_mut_unchecked

```rust
pub unsafe fn slice_mut_unchecked(&mut self, begin: usize, end: usize) -> &mut str
```

Creates a string slice from another string slice, bypassing safety
checks.

This is generally not recommended, use with caution! For a safe
alternative see [`str`] and [`IndexMut`].

[`IndexMut`]: crate::ops::IndexMut

This new slice goes from `begin` to `end`, including `begin` but
excluding `end`.

To get an immutable string slice instead, see the
[`slice_unchecked`] method.

[`slice_unchecked`]: str::slice_unchecked

# Safety

Callers of this function are responsible that three preconditions are
satisfied:

* `begin` must not exceed `end`.
* `begin` and `end` must be byte positions within the string slice.
* `begin` and `end` must lie on UTF-8 sequence boundaries.

## str::split_at

```rust
pub const fn split_at(&self, mid: usize) -> (&str, &str)
```

Divides one string slice into two at a byte offset.

The argument, `mid`, should be a byte offset from the start of the
string. It must also be on the boundary of a UTF-8 code point.

The first returned slice contains exactly the first `mid` bytes, and the
second contains all remaining bytes.

To get mutable string slices instead, see the [`split_at_mut`]
method.

[`split_at_mut`]: str::split_at_mut

# Panics

Panics if `mid` is not on a UTF-8 code point boundary, or if it is past
the end of the last code point of the string slice.  For a non-panicking
alternative see [`split_at_checked`](str::split_at_checked).

# Examples

```
let s = "Per Martin-Löf";

let (first, last) = s.split_at(3);

assert_eq!("Per", first);
assert_eq!(" Martin-Löf", last);
```

## str::split_at_mut

```rust
pub const fn split_at_mut(&mut self, mid: usize) -> (&mut str, &mut str)
```

Divides one mutable string slice into two at a byte offset.

The argument, `mid`, should be a byte offset from the start of the
string. It must also be on the boundary of a UTF-8 code point.

The first returned slice contains exactly the first `mid` bytes, and the
second contains all remaining bytes.

To get immutable string slices instead, see the [`split_at`] method.

[`split_at`]: str::split_at

# Panics

Panics if `mid` is not on a UTF-8 code point boundary, or if it is past
the end of the last code point of the string slice.  For a non-panicking
alternative see [`split_at_mut_checked`](str::split_at_mut_checked).

# Examples

```
let mut s = "Per Martin-Löf".to_string();
{
    let (first, last) = s.split_at_mut(3);
    first.make_ascii_uppercase();
    assert_eq!("PER", first);
    assert_eq!(" Martin-Löf", last);
}
assert_eq!("PER Martin-Löf", s);
```

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

To get mutable string slices instead, see the [`split_at_mut_checked`]
method.

[`split_at_mut_checked`]: str::split_at_mut_checked

# Examples

```
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

To get immutable string slices instead, see the [`split_at_checked`] method.

[`split_at_checked`]: str::split_at_checked

# Examples

```
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

Returns an iterator over the [`char`]s of a string slice.

As a string slice consists of valid UTF-8, we can iterate through a
string slice by [`char`]. This method returns such an iterator.

It's important to remember that [`char`] represents a Unicode Scalar
Value, and might not match your idea of what a 'character' is. Iteration
over grapheme clusters may be what you actually want. This functionality
is not provided by Rust's standard library, check crates.io instead.

# Examples

Basic usage:

```
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

Remember, [`char`]s might not match your intuition about characters:

[`char`]: prim@char

```
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

Returns an iterator over the [`char`]s of a string slice, and their
positions.

As a string slice consists of valid UTF-8, we can iterate through a
string slice by [`char`]. This method returns an iterator of both
these [`char`]s, as well as their byte positions.

The iterator yields tuples. The position is first, the [`char`] is
second.

# Examples

Basic usage:

```
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

Remember, [`char`]s might not match your intuition about characters:

[`char`]: prim@char

```
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

```
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
instead, use [`split_ascii_whitespace`].

[`split_ascii_whitespace`]: str::split_ascii_whitespace

# Examples

Basic usage:

```
let mut iter = "A few words".split_whitespace();

assert_eq!(Some("A"), iter.next());
assert_eq!(Some("few"), iter.next());
assert_eq!(Some("words"), iter.next());

assert_eq!(None, iter.next());
```

All kinds of whitespace are considered:

```
let mut iter = " Mary   had\ta\u{2009}little  \n\t lamb".split_whitespace();
assert_eq!(Some("Mary"), iter.next());
assert_eq!(Some("had"), iter.next());
assert_eq!(Some("a"), iter.next());
assert_eq!(Some("little"), iter.next());
assert_eq!(Some("lamb"), iter.next());

assert_eq!(None, iter.next());
```

If the string is empty or all whitespace, the iterator yields no string slices:
```
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

This uses the same definition as [`char::is_ascii_whitespace`].
To split by Unicode `Whitespace` instead, use [`split_whitespace`].
Note that because of this difference in definition, even if `s.is_ascii()`
is `true`, `s.split_ascii_whitespace()` behavior will differ from `s.split_whitespace()`
if `s` contains U+000B VERTICAL TAB.

[`split_whitespace`]: str::split_whitespace

# Examples

Basic usage:

```
let mut iter = "A few words".split_ascii_whitespace();

assert_eq!(Some("A"), iter.next());
assert_eq!(Some("few"), iter.next());
assert_eq!(Some("words"), iter.next());

assert_eq!(None, iter.next());
```

Various kinds of ASCII whitespace are considered
(see [`char::is_ascii_whitespace`]):

```
let mut iter = " Mary   had\ta little  \n\t lamb".split_ascii_whitespace();
assert_eq!(Some("Mary"), iter.next());
assert_eq!(Some("had"), iter.next());
assert_eq!(Some("a"), iter.next());
assert_eq!(Some("little"), iter.next());
assert_eq!(Some("lamb"), iter.next());

assert_eq!(None, iter.next());
```

If the string is empty or all ASCII whitespace, the iterator yields no string slices:
```
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

```
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

```
let text = "foo\nbar\n\r\nbaz";
let mut lines = text.lines();

assert_eq!(Some("foo"), lines.next());
assert_eq!(Some("bar"), lines.next());
assert_eq!(Some(""), lines.next());
assert_eq!(Some("baz"), lines.next());

assert_eq!(None, lines.next());
```

An empty string returns an empty iterator:

```
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

```
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

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Examples

```
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

The [pattern] can also be a [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.
These will only be checked against the first character of this string slice.
Look at the second example below regarding behavior for slices of [`char`]s.

[`char`]: prim@char
[pattern]: self::pattern

# Examples

```
let bananas = "bananas";

assert!(bananas.starts_with("bana"));
assert!(!bananas.starts_with("nana"));
```

```
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

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Examples

```
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

Returns [`None`] if the pattern doesn't match.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Examples

Simple patterns:

```
let s = "Löwe 老虎 Léopard Gepardi";

assert_eq!(s.find('L'), Some(0));
assert_eq!(s.find('é'), Some(14));
assert_eq!(s.find("pard"), Some(17));
```

More complex patterns using point-free style and closures:

```
let s = "Löwe 老虎 Léopard";

assert_eq!(s.find(char::is_whitespace), Some(5));
assert_eq!(s.find(char::is_lowercase), Some(1));
assert_eq!(s.find(|c: char| c.is_whitespace() || c.is_lowercase()), Some(1));
assert_eq!(s.find(|c: char| (c < 'o') && (c > 'a')), Some(4));
```

Not finding the pattern:

```
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

Returns [`None`] if the pattern doesn't match.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Examples

Simple patterns:

```
let s = "Löwe 老虎 Léopard Gepardi";

assert_eq!(s.rfind('L'), Some(13));
assert_eq!(s.rfind('é'), Some(14));
assert_eq!(s.rfind("pard"), Some(24));
```

More complex patterns with closures:

```
let s = "Löwe 老虎 Léopard";

assert_eq!(s.rfind(char::is_whitespace), Some(12));
assert_eq!(s.rfind(char::is_lowercase), Some(20));
```

Not finding the pattern:

```
let s = "Löwe 老虎 Léopard";
let x: &[_] = &['1', '2'];

assert_eq!(s.rfind(x), None);
```

## str::split

```rust
pub fn split<P: Pattern>(&self, pat: P) -> Split<'_, P>
```

Returns an iterator over substrings of this string slice, separated by
characters matched by a pattern.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

If there are no matches the full string slice is returned as the only
item in the iterator.

[`char`]: prim@char
[pattern]: self::pattern

# Iterator behavior

The returned iterator will be a [`DoubleEndedIterator`] if the pattern
allows a reverse search and forward/reverse search yields the same
elements. This is true for, e.g., [`char`], but not for `&str`.

If the pattern allows a reverse search but its results might differ
from a forward search, the [`rsplit`] method can be used.

[`rsplit`]: str::rsplit

# Examples

Simple patterns:

```
let v: Vec<&str> = "Mary had a little lamb".split(' ').collect();
assert_eq!(v, ["Mary", "had", "a", "little", "lamb"]);

let v: Vec<&str> = "".split('X').collect();
assert_eq!(v, [""]);

let v: Vec<&str> = "lionXXtigerXleopard".split('X').collect();
assert_eq!(v, ["lion", "", "tiger", "leopard"]);

let v: Vec<&str> = "lion::tiger::leopard".split("::").collect();
assert_eq!(v, ["lion", "tiger", "leopard"]);

let v: Vec<&str> = "AABBCC".split("DD").collect();
assert_eq!(v, ["AABBCC"]);

let v: Vec<&str> = "abc1def2ghi".split(char::is_numeric).collect();
assert_eq!(v, ["abc", "def", "ghi"]);

let v: Vec<&str> = "lionXtigerXleopard".split(char::is_uppercase).collect();
assert_eq!(v, ["lion", "tiger", "leopard"]);
```

If the pattern is a slice of chars, split on each occurrence of any of the characters:

```
let v: Vec<&str> = "2020-11-03 23:59".split(&['-', ' ', ':', '@'][..]).collect();
assert_eq!(v, ["2020", "11", "03", "23", "59"]);
```

A more complex pattern, using a closure:

```
let v: Vec<&str> = "abc1defXghi".split(|c| c == '1' || c == 'X').collect();
assert_eq!(v, ["abc", "def", "ghi"]);
```

If a string contains multiple contiguous separators, you will end up
with empty strings in the output:

```
let x = "||||a||b|c".to_string();
let d: Vec<_> = x.split('|').collect();

assert_eq!(d, &["", "", "", "", "a", "", "b", "c"]);
```

Contiguous separators are separated by the empty string.

```
let x = "(///)".to_string();
let d: Vec<_> = x.split('/').collect();

assert_eq!(d, &["(", "", "", ")"]);
```

Separators at the start or end of a string are neighbored
by empty strings.

```
let d: Vec<_> = "010".split("0").collect();
assert_eq!(d, &["", "1", ""]);
```

When the empty string is used as a separator, it separates
every character in the string, along with the beginning
and end of the string.

```
let f: Vec<_> = "rust".split("").collect();
assert_eq!(f, &["", "r", "u", "s", "t", ""]);
```

Contiguous separators can lead to possibly surprising behavior
when whitespace is used as the separator. This code is correct:

```
let x = "    a  b c".to_string();
let d: Vec<_> = x.split(' ').collect();

assert_eq!(d, &["", "", "", "", "a", "", "b", "c"]);
```

It does _not_ give you:

```,ignore
assert_eq!(d, &["a", "b", "c"]);
```

Use [`split_whitespace`] for this behavior.

[`split_whitespace`]: str::split_whitespace

## str::split_inclusive

```rust
pub fn split_inclusive<P: Pattern>(&self, pat: P) -> SplitInclusive<'_, P>
```

Returns an iterator over substrings of this string slice, separated by
characters matched by a pattern.

Differs from the iterator produced by `split` in that `split_inclusive`
leaves the matched part as the terminator of the substring.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Examples

```
let v: Vec<&str> = "Mary had a little lamb\nlittle lamb\nlittle lamb."
    .split_inclusive('\n').collect();
assert_eq!(v, ["Mary had a little lamb\n", "little lamb\n", "little lamb."]);
```

If the last element of the string is matched,
that element will be considered the terminator of the preceding substring.
That substring will be the last item returned by the iterator.

```
let v: Vec<&str> = "Mary had a little lamb\nlittle lamb\nlittle lamb.\n"
    .split_inclusive('\n').collect();
assert_eq!(v, ["Mary had a little lamb\n", "little lamb\n", "little lamb.\n"]);
```

## str::rsplit

```rust
pub fn rsplit<P: Pattern>(&self, pat: P) -> RSplit<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over substrings of the given string slice, separated
by characters matched by a pattern and yielded in reverse order.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Iterator behavior

The returned iterator requires that the pattern supports a reverse
search, and it will be a [`DoubleEndedIterator`] if a forward/reverse
search yields the same elements.

For iterating from the front, the [`split`] method can be used.

[`split`]: str::split

# Examples

Simple patterns:

```
let v: Vec<&str> = "Mary had a little lamb".rsplit(' ').collect();
assert_eq!(v, ["lamb", "little", "a", "had", "Mary"]);

let v: Vec<&str> = "".rsplit('X').collect();
assert_eq!(v, [""]);

let v: Vec<&str> = "lionXXtigerXleopard".rsplit('X').collect();
assert_eq!(v, ["leopard", "tiger", "", "lion"]);

let v: Vec<&str> = "lion::tiger::leopard".rsplit("::").collect();
assert_eq!(v, ["leopard", "tiger", "lion"]);
```

A more complex pattern, using a closure:

```
let v: Vec<&str> = "abc1defXghi".rsplit(|c| c == '1' || c == 'X').collect();
assert_eq!(v, ["ghi", "def", "abc"]);
```

## str::split_terminator

```rust
pub fn split_terminator<P: Pattern>(&self, pat: P) -> SplitTerminator<'_, P>
```

Returns an iterator over substrings of the given string slice, separated
by characters matched by a pattern.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

Equivalent to [`split`], except that the trailing substring
is skipped if empty.

[`split`]: str::split

This method can be used for string data that is _terminated_,
rather than _separated_ by a pattern.

# Iterator behavior

The returned iterator will be a [`DoubleEndedIterator`] if the pattern
allows a reverse search and forward/reverse search yields the same
elements. This is true for, e.g., [`char`], but not for `&str`.

If the pattern allows a reverse search but its results might differ
from a forward search, the [`rsplit_terminator`] method can be used.

[`rsplit_terminator`]: str::rsplit_terminator

# Examples

```
let v: Vec<&str> = "A.B.".split_terminator('.').collect();
assert_eq!(v, ["A", "B"]);

let v: Vec<&str> = "A..B..".split_terminator(".").collect();
assert_eq!(v, ["A", "", "B", ""]);

let v: Vec<&str> = "A.B:C.D".split_terminator(&['.', ':'][..]).collect();
assert_eq!(v, ["A", "B", "C", "D"]);
```

## str::rsplit_terminator

```rust
pub fn rsplit_terminator<P: Pattern>(&self, pat: P) -> RSplitTerminator<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over substrings of `self`, separated by characters
matched by a pattern and yielded in reverse order.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

Equivalent to [`split`], except that the trailing substring is
skipped if empty.

[`split`]: str::split

This method can be used for string data that is _terminated_,
rather than _separated_ by a pattern.

# Iterator behavior

The returned iterator requires that the pattern supports a
reverse search, and it will be double ended if a forward/reverse
search yields the same elements.

For iterating from the front, the [`split_terminator`] method can be
used.

[`split_terminator`]: str::split_terminator

# Examples

```
let v: Vec<&str> = "A.B.".rsplit_terminator('.').collect();
assert_eq!(v, ["B", "A"]);

let v: Vec<&str> = "A..B..".rsplit_terminator(".").collect();
assert_eq!(v, ["", "B", "", "A"]);

let v: Vec<&str> = "A.B:C.D".rsplit_terminator(&['.', ':'][..]).collect();
assert_eq!(v, ["D", "C", "B", "A"]);
```

## str::splitn

```rust
pub fn splitn<P: Pattern>(&self, n: usize, pat: P) -> SplitN<'_, P>
```

Returns an iterator over substrings of the given string slice, separated
by a pattern, restricted to returning at most `n` items.

If `n` substrings are returned, the last substring (the `n`th substring)
will contain the remainder of the string.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Iterator behavior

The returned iterator will not be double ended, because it is
not efficient to support.

If the pattern allows a reverse search, the [`rsplitn`] method can be
used.

[`rsplitn`]: str::rsplitn

# Examples

Simple patterns:

```
let v: Vec<&str> = "Mary had a little lambda".splitn(3, ' ').collect();
assert_eq!(v, ["Mary", "had", "a little lambda"]);

let v: Vec<&str> = "lionXXtigerXleopard".splitn(3, "X").collect();
assert_eq!(v, ["lion", "", "tigerXleopard"]);

let v: Vec<&str> = "abcXdef".splitn(1, 'X').collect();
assert_eq!(v, ["abcXdef"]);

let v: Vec<&str> = "".splitn(1, 'X').collect();
assert_eq!(v, [""]);
```

A more complex pattern, using a closure:

```
let v: Vec<&str> = "abc1defXghi".splitn(2, |c| c == '1' || c == 'X').collect();
assert_eq!(v, ["abc", "defXghi"]);
```

## str::rsplitn

```rust
pub fn rsplitn<P: Pattern>(&self, n: usize, pat: P) -> RSplitN<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over substrings of this string slice, separated by a
pattern, starting from the end of the string, restricted to returning at
most `n` items.

If `n` substrings are returned, the last substring (the `n`th substring)
will contain the remainder of the string.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Iterator behavior

The returned iterator will not be double ended, because it is not
efficient to support.

For splitting from the front, the [`splitn`] method can be used.

[`splitn`]: str::splitn

# Examples

Simple patterns:

```
let v: Vec<&str> = "Mary had a little lamb".rsplitn(3, ' ').collect();
assert_eq!(v, ["lamb", "little", "Mary had a"]);

let v: Vec<&str> = "lionXXtigerXleopard".rsplitn(3, 'X').collect();
assert_eq!(v, ["leopard", "tiger", "lionX"]);

let v: Vec<&str> = "lion::tiger::leopard".rsplitn(2, "::").collect();
assert_eq!(v, ["leopard", "lion::tiger"]);
```

A more complex pattern, using a closure:

```
let v: Vec<&str> = "abc1defXghi".rsplitn(2, |c| c == '1' || c == 'X').collect();
assert_eq!(v, ["ghi", "abc1def"]);
```

## str::split_once

```rust
pub fn split_once<P: Pattern>(&self, delimiter: P) -> Option<(&'_ str, &'_ str)>
```

Splits the string on the first occurrence of the specified delimiter and
returns prefix before delimiter and suffix after delimiter.

# Examples

```
assert_eq!("cfg".split_once('='), None);
assert_eq!("cfg=".split_once('='), Some(("cfg", "")));
assert_eq!("cfg=foo".split_once('='), Some(("cfg", "foo")));
assert_eq!("cfg=foo=bar".split_once('='), Some(("cfg", "foo=bar")));
```

## str::rsplit_once

```rust
pub fn rsplit_once<P: Pattern>(&self, delimiter: P) -> Option<(&'_ str, &'_ str)> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Splits the string on the last occurrence of the specified delimiter and
returns prefix before delimiter and suffix after delimiter.

# Examples

```
assert_eq!("cfg".rsplit_once('='), None);
assert_eq!("cfg=".rsplit_once('='), Some(("cfg", "")));
assert_eq!("cfg=foo".rsplit_once('='), Some(("cfg", "foo")));
assert_eq!("cfg=foo=bar".rsplit_once('='), Some(("cfg=foo", "bar")));
```

## str::matches

```rust
pub fn matches<P: Pattern>(&self, pat: P) -> Matches<'_, P>
```

Returns an iterator over the disjoint matches of a pattern within the
given string slice.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Iterator behavior

The returned iterator will be a [`DoubleEndedIterator`] if the pattern
allows a reverse search and forward/reverse search yields the same
elements. This is true for, e.g., [`char`], but not for `&str`.

If the pattern allows a reverse search but its results might differ
from a forward search, the [`rmatches`] method can be used.

[`rmatches`]: str::rmatches

# Examples

```
let v: Vec<&str> = "abcXXXabcYYYabc".matches("abc").collect();
assert_eq!(v, ["abc", "abc", "abc"]);

let v: Vec<&str> = "1abc2abc3".matches(char::is_numeric).collect();
assert_eq!(v, ["1", "2", "3"]);
```

## str::rmatches

```rust
pub fn rmatches<P: Pattern>(&self, pat: P) -> RMatches<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over the disjoint matches of a pattern within this
string slice, yielded in reverse order.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Iterator behavior

The returned iterator requires that the pattern supports a reverse
search, and it will be a [`DoubleEndedIterator`] if a forward/reverse
search yields the same elements.

For iterating from the front, the [`matches`] method can be used.

[`matches`]: str::matches

# Examples

```
let v: Vec<&str> = "abcXXXabcYYYabc".rmatches("abc").collect();
assert_eq!(v, ["abc", "abc", "abc"]);

let v: Vec<&str> = "1abc2abc3".rmatches(char::is_numeric).collect();
assert_eq!(v, ["3", "2", "1"]);
```

## str::match_indices

```rust
pub fn match_indices<P: Pattern>(&self, pat: P) -> MatchIndices<'_, P>
```

Returns an iterator over the disjoint matches of a pattern within this string
slice as well as the index that the match starts at.

For matches of `pat` within `self` that overlap, only the indices
corresponding to the first match are returned.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Iterator behavior

The returned iterator will be a [`DoubleEndedIterator`] if the pattern
allows a reverse search and forward/reverse search yields the same
elements. This is true for, e.g., [`char`], but not for `&str`.

If the pattern allows a reverse search but its results might differ
from a forward search, the [`rmatch_indices`] method can be used.

[`rmatch_indices`]: str::rmatch_indices

# Examples

```
let v: Vec<_> = "abcXXXabcYYYabc".match_indices("abc").collect();
assert_eq!(v, [(0, "abc"), (6, "abc"), (12, "abc")]);

let v: Vec<_> = "1abcabc2".match_indices("abc").collect();
assert_eq!(v, [(1, "abc"), (4, "abc")]);

let v: Vec<_> = "ababa".match_indices("aba").collect();
assert_eq!(v, [(0, "aba")]); // only the first `aba`
```

## str::rmatch_indices

```rust
pub fn rmatch_indices<P: Pattern>(&self, pat: P) -> RMatchIndices<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over the disjoint matches of a pattern within `self`,
yielded in reverse order along with the index of the match.

For matches of `pat` within `self` that overlap, only the indices
corresponding to the last match are returned.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Iterator behavior

The returned iterator requires that the pattern supports a reverse
search, and it will be a [`DoubleEndedIterator`] if a forward/reverse
search yields the same elements.

For iterating from the front, the [`match_indices`] method can be used.

[`match_indices`]: str::match_indices

# Examples

```
let v: Vec<_> = "abcXXXabcYYYabc".rmatch_indices("abc").collect();
assert_eq!(v, [(12, "abc"), (6, "abc"), (0, "abc")]);

let v: Vec<_> = "1abcabc2".rmatch_indices("abc").collect();
assert_eq!(v, [(4, "abc"), (1, "abc")]);

let v: Vec<_> = "ababa".rmatch_indices("aba").collect();
assert_eq!(v, [(2, "aba")]); // only the last `aba`
```

## str::trim

```rust
pub fn trim(&self) -> &str
```

Returns a string slice with leading and trailing whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`, which includes newlines.

# Examples

```
let s = "\n Hello\tworld\t\n";

assert_eq!("Hello\tworld", s.trim());
```

## str::trim_start

```rust
pub fn trim_start(&self) -> &str
```

Returns a string slice with leading whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`, which includes newlines.

# Text directionality

A string is a sequence of bytes. `start` in this context means the first
position of that byte string; for a left-to-right language like English or
Russian, this will be left side, and for right-to-left languages like
Arabic or Hebrew, this will be the right side.

# Examples

Basic usage:

```
let s = "\n Hello\tworld\t\n";
assert_eq!("Hello\tworld\t\n", s.trim_start());
```

Directionality:

```
let s = "  English  ";
assert!(Some('E') == s.trim_start().chars().next());

let s = "  עברית  ";
assert!(Some('ע') == s.trim_start().chars().next());
```

## str::trim_end

```rust
pub fn trim_end(&self) -> &str
```

Returns a string slice with trailing whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`, which includes newlines.

# Text directionality

A string is a sequence of bytes. `end` in this context means the last
position of that byte string; for a left-to-right language like English or
Russian, this will be right side, and for right-to-left languages like
Arabic or Hebrew, this will be the left side.

# Examples

Basic usage:

```
let s = "\n Hello\tworld\t\n";
assert_eq!("\n Hello\tworld", s.trim_end());
```

Directionality:

```
let s = "  English  ";
assert!(Some('h') == s.trim_end().chars().rev().next());

let s = "  עברית  ";
assert!(Some('ת') == s.trim_end().chars().rev().next());
```

## str::trim_left

```rust
pub fn trim_left(&self) -> &str
```

Returns a string slice with leading whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`.

# Text directionality

A string is a sequence of bytes. 'Left' in this context means the first
position of that byte string; for a language like Arabic or Hebrew
which are 'right to left' rather than 'left to right', this will be
the _right_ side, not the left.

# Examples

Basic usage:

```
let s = " Hello\tworld\t";

assert_eq!("Hello\tworld\t", s.trim_left());
```

Directionality:

```
let s = "  English";
assert!(Some('E') == s.trim_left().chars().next());

let s = "  עברית";
assert!(Some('ע') == s.trim_left().chars().next());
```

## str::trim_right

```rust
pub fn trim_right(&self) -> &str
```

Returns a string slice with trailing whitespace removed.

'Whitespace' is defined according to the terms of the Unicode Derived
Core Property `White_Space`.

# Text directionality

A string is a sequence of bytes. 'Right' in this context means the last
position of that byte string; for a language like Arabic or Hebrew
which are 'right to left' rather than 'left to right', this will be
the _left_ side, not the right.

# Examples

Basic usage:

```
let s = " Hello\tworld\t";

assert_eq!(" Hello\tworld", s.trim_right());
```

Directionality:

```
let s = "English  ";
assert!(Some('h') == s.trim_right().chars().rev().next());

let s = "עברית  ";
assert!(Some('ת') == s.trim_right().chars().rev().next());
```

## str::trim_matches

```rust
pub fn trim_matches<P: Pattern>(&self, pat: P) -> &str where for<'a> P::Searcher<'a>: DoubleEndedSearcher<'a>,
```

Returns a string slice with all prefixes and suffixes that match a
pattern repeatedly removed.

The [pattern] can be a [`char`], a slice of [`char`]s, or a function
or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Examples

Simple patterns:

```
assert_eq!("11foo1bar11".trim_matches('1'), "foo1bar");
assert_eq!("123foo1bar123".trim_matches(char::is_numeric), "foo1bar");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_matches(x), "foo1bar");
```

A more complex pattern, using a closure:

```
assert_eq!("1foo1barXX".trim_matches(|c| c == '1' || c == 'X'), "foo1bar");
```

## str::trim_start_matches

```rust
pub fn trim_start_matches<P: Pattern>(&self, pat: P) -> &str
```

Returns a string slice with all prefixes that match a pattern
repeatedly removed.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Text directionality

A string is a sequence of bytes. `start` in this context means the first
position of that byte string; for a left-to-right language like English or
Russian, this will be left side, and for right-to-left languages like
Arabic or Hebrew, this will be the right side.

# Examples

```
assert_eq!("11foo1bar11".trim_start_matches('1'), "foo1bar11");
assert_eq!("123foo1bar123".trim_start_matches(char::is_numeric), "foo1bar123");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_start_matches(x), "foo1bar12");
```

## str::strip_prefix

```rust
pub fn strip_prefix<P: Pattern>(&self, prefix: P) -> Option<&str>
```

Returns a string slice with the prefix removed.

If the string starts with the pattern `prefix`, returns the substring after the prefix,
wrapped in `Some`. Unlike [`trim_start_matches`], this method removes the prefix exactly once.

If the string does not start with `prefix`, returns `None`.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern
[`trim_start_matches`]: Self::trim_start_matches

# Examples

```
assert_eq!("foo:bar".strip_prefix("foo:"), Some("bar"));
assert_eq!("foo:bar".strip_prefix("bar"), None);
assert_eq!("foofoo".strip_prefix("foo"), Some("foo"));
```

## str::strip_suffix

```rust
pub fn strip_suffix<P: Pattern>(&self, suffix: P) -> Option<&str> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with the suffix removed.

If the string ends with the pattern `suffix`, returns the substring before the suffix,
wrapped in `Some`.  Unlike [`trim_end_matches`], this method removes the suffix exactly once.

If the string does not end with `suffix`, returns `None`.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern
[`trim_end_matches`]: Self::trim_end_matches

# Examples

```
assert_eq!("bar:foo".strip_suffix(":foo"), Some("bar"));
assert_eq!("bar:foo".strip_suffix("bar"), None);
assert_eq!("foofoo".strip_suffix("foo"), Some("foo"));
```

## str::strip_circumfix

```rust
pub fn strip_circumfix<P: Pattern, S: Pattern>(&self, prefix: P, suffix: S) -> Option<&str> where for<'a> S::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with the prefix and suffix removed.

If the string starts with the pattern `prefix` and ends with
the pattern `suffix`, and the prefix and suffix don't overlap, returns
the substring after the prefix and before the suffix, wrapped in `Some`.
Unlike [`trim_start_matches`] and [`trim_end_matches`], this method removes both the prefix
and suffix exactly once.

If the string does not start with `prefix`, does not end with `suffix`,
or the prefix and suffix overlap in the string, returns `None`.

Each [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern
[`trim_start_matches`]: Self::trim_start_matches
[`trim_end_matches`]: Self::trim_end_matches

# Examples

```
assert_eq!("bar:hello:foo".strip_circumfix("bar:", ":foo"), Some("hello"));
assert_eq!("bar:foo".strip_circumfix("foo", "foo"), None);
assert_eq!("foo:bar;".strip_circumfix("foo:", ';'), Some("bar"));
assert_eq!("foo:bar:baz".strip_circumfix("foo:bar:", ":bar:baz"), None);
```

## str::trim_prefix

```rust
pub fn trim_prefix<P: Pattern>(&self, prefix: P) -> &str
```

Returns a string slice with the optional prefix removed.

If the string starts with the pattern `prefix`, returns the substring after the prefix.
Unlike [`strip_prefix`], this method always returns `&str` for easy method chaining,
instead of returning [`Option<&str>`].

If the string does not start with `prefix`, returns the original string unchanged.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern
[`strip_prefix`]: Self::strip_prefix

# Examples

```
// Prefix present - removes it
assert_eq!("foo:bar".trim_prefix("foo:"), "bar");
assert_eq!("foofoo".trim_prefix("foo"), "foo");

// Prefix absent - returns original string
assert_eq!("foo:bar".trim_prefix("bar"), "foo:bar");

// Method chaining example
assert_eq!("<https://example.com/>".trim_prefix('<').trim_suffix('>'), "https://example.com/");
```

## str::trim_suffix

```rust
pub fn trim_suffix<P: Pattern>(&self, suffix: P) -> &str where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with the optional suffix removed.

If the string ends with the pattern `suffix`, returns the substring before the suffix.
Unlike [`strip_suffix`], this method always returns `&str` for easy method chaining,
instead of returning [`Option<&str>`].

If the string does not end with `suffix`, returns the original string unchanged.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern
[`strip_suffix`]: Self::strip_suffix

# Examples

```
// Suffix present - removes it
assert_eq!("bar:foo".trim_suffix(":foo"), "bar");
assert_eq!("foofoo".trim_suffix("foo"), "foo");

// Suffix absent - returns original string
assert_eq!("bar:foo".trim_suffix("bar"), "bar:foo");

// Method chaining example
assert_eq!("<https://example.com/>".trim_prefix('<').trim_suffix('>'), "https://example.com/");
```

## str::trim_end_matches

```rust
pub fn trim_end_matches<P: Pattern>(&self, pat: P) -> &str where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with all suffixes that match a pattern
repeatedly removed.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Text directionality

A string is a sequence of bytes. `end` in this context means the last
position of that byte string; for a left-to-right language like English or
Russian, this will be right side, and for right-to-left languages like
Arabic or Hebrew, this will be the left side.

# Examples

Simple patterns:

```
assert_eq!("11foo1bar11".trim_end_matches('1'), "11foo1bar");
assert_eq!("123foo1bar123".trim_end_matches(char::is_numeric), "123foo1bar");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_end_matches(x), "12foo1bar");
```

A more complex pattern, using a closure:

```
assert_eq!("1fooX".trim_end_matches(|c| c == '1' || c == 'X'), "1foo");
```

## str::trim_left_matches

```rust
pub fn trim_left_matches<P: Pattern>(&self, pat: P) -> &str
```

Returns a string slice with all prefixes that match a pattern
repeatedly removed.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Text directionality

A string is a sequence of bytes. 'Left' in this context means the first
position of that byte string; for a language like Arabic or Hebrew
which are 'right to left' rather than 'left to right', this will be
the _right_ side, not the left.

# Examples

```
assert_eq!("11foo1bar11".trim_left_matches('1'), "foo1bar11");
assert_eq!("123foo1bar123".trim_left_matches(char::is_numeric), "foo1bar123");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_left_matches(x), "foo1bar12");
```

## str::trim_right_matches

```rust
pub fn trim_right_matches<P: Pattern>(&self, pat: P) -> &str where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns a string slice with all suffixes that match a pattern
repeatedly removed.

The [pattern] can be a `&str`, [`char`], a slice of [`char`]s, or a
function or closure that determines if a character matches.

[`char`]: prim@char
[pattern]: self::pattern

# Text directionality

A string is a sequence of bytes. 'Right' in this context means the last
position of that byte string; for a language like Arabic or Hebrew
which are 'right to left' rather than 'left to right', this will be
the _left_ side, not the right.

# Examples

Simple patterns:

```
assert_eq!("11foo1bar11".trim_right_matches('1'), "11foo1bar");
assert_eq!("123foo1bar123".trim_right_matches(char::is_numeric), "123foo1bar");

let x: &[_] = &['1', '2'];
assert_eq!("12foo1bar12".trim_right_matches(x), "12foo1bar");
```

A more complex pattern, using a closure:

```
assert_eq!("1fooX".trim_right_matches(|c| c == '1' || c == 'X'), "1foo");
```

## str::parse

```rust
pub fn parse<F: FromStr>(&self) -> Result<F, F::Err>
```

Parses this string slice into another type.

Because `parse` is so general, it can cause problems with type
inference. As such, `parse` is one of the few times you'll see
the syntax affectionately known as the 'turbofish': `::<>`. This
helps the inference algorithm understand specifically which type
you're trying to parse into.

`parse` can parse into any type that implements the [`FromStr`] trait.

# Errors

Will return [`Err`] if it's not possible to parse this string slice into
the desired type.

[`Err`]: FromStr::Err

# Examples

Basic usage:

```
let four: u32 = "4".parse().unwrap();

assert_eq!(4, four);
```

Using the 'turbofish' instead of annotating `four`:

```
let four = "4".parse::<u32>();

assert_eq!(Ok(4), four);
```

Failing to parse:

```
let nope = "j".parse::<u32>();

assert!(nope.is_err());
```

## str::is_ascii

```rust
pub const fn is_ascii(&self) -> bool
```

Checks if all characters in this string are within the ASCII range.

An empty string returns `true`.

# Examples

```
let ascii = "hello!\n";
let non_ascii = "Grüße, Jürgen ❤";

assert!(ascii.is_ascii());
assert!(!non_ascii.is_ascii());
```

## str::eq_ignore_ascii_case

```rust
pub const fn eq_ignore_ascii_case(&self, other: &str) -> bool
```

Checks that two strings are an ASCII case-insensitive match.

Same as `to_ascii_lowercase(a) == to_ascii_lowercase(b)`,
but without allocating and copying temporaries.

For Unicode-aware case-insensitive matching, consider
[`str::eq_ignore_case_unnormalized`].

# Examples

```
assert!("Ferris".eq_ignore_ascii_case("FERRIS"));
assert!("Ferrös".eq_ignore_ascii_case("FERRöS"));
assert!(!"Ferrös".eq_ignore_ascii_case("FERRÖS"));
```

## str::make_ascii_uppercase

```rust
pub const fn make_ascii_uppercase(&mut self)
```

Converts this string to its ASCII upper case equivalent in-place.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but all other characters are unchanged.

To return a new uppercased value without modifying the existing one, use
[`to_ascii_uppercase()`].

[`to_ascii_uppercase()`]: #method.to_ascii_uppercase

# Examples

```
let mut s = String::from("Grüße, Jürgen ❤");

s.make_ascii_uppercase();

assert_eq!("GRüßE, JüRGEN ❤", s);
```

## str::make_ascii_lowercase

```rust
pub const fn make_ascii_lowercase(&mut self)
```

Converts this string to its ASCII lower case equivalent in-place.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but all other characters are unchanged.

To return a new lowercased value without modifying the existing one, use
[`to_ascii_lowercase()`].

[`to_ascii_lowercase()`]: #method.to_ascii_lowercase

# Examples

```
let mut s = String::from("GRÜßE, JÜRGEN ❤");

s.make_ascii_lowercase();

assert_eq!("grÜße, jÜrgen ❤", s);
```

## str::trim_ascii_start

```rust
pub const fn trim_ascii_start(&self) -> &str
```

Returns a string slice with leading ASCII whitespace removed.

'Whitespace' refers to the definition used by
[`u8::is_ascii_whitespace`]. Importantly, this definition excludes
the U+000B code point even though it has the Unicode [`White_Space`] property
and is removed by [`str::trim_start`].

[`u8::is_ascii_whitespace`]: u8::is_ascii_whitespace
[`White_Space`]: https://www.unicode.org/reports/tr44/#White_Space

# Examples

```
assert_eq!(" \t \u{3000}hello world\n".trim_ascii_start(), "\u{3000}hello world\n");
assert_eq!("  ".trim_ascii_start(), "");
assert_eq!("".trim_ascii_start(), "");
```

## str::trim_ascii_end

```rust
pub const fn trim_ascii_end(&self) -> &str
```

Returns a string slice with trailing ASCII whitespace removed.

'Whitespace' refers to the definition used by
[`u8::is_ascii_whitespace`]. Importantly, this definition excludes
the U+000B code point even though it has the Unicode [`White_Space`] property
and is removed by [`str::trim_end`].

[`u8::is_ascii_whitespace`]: u8::is_ascii_whitespace
[`White_Space`]: https://www.unicode.org/reports/tr44/#White_Space

# Examples

```
assert_eq!("\r hello world\u{3000}\n ".trim_ascii_end(), "\r hello world\u{3000}");
assert_eq!("  ".trim_ascii_end(), "");
assert_eq!("".trim_ascii_end(), "");
```

## str::trim_ascii

```rust
pub const fn trim_ascii(&self) -> &str
```

Returns a string slice with leading and trailing ASCII whitespace
removed.

'Whitespace' refers to the definition used by
[`u8::is_ascii_whitespace`]. Importantly, this definition excludes
the U+000B code point even though it has the Unicode [`White_Space`] property
and is removed by [`str::trim`].

[`u8::is_ascii_whitespace`]: u8::is_ascii_whitespace
[`White_Space`]: https://www.unicode.org/reports/tr44/#White_Space

# Examples

```
assert_eq!("\r hello world\n ".trim_ascii(), "hello world");
assert_eq!("  ".trim_ascii(), "");
assert_eq!("".trim_ascii(), "");
```

## str::escape_debug

```rust
pub fn escape_debug(&self) -> EscapeDebug<'_>
```

Returns an iterator that escapes each char in `self` with [`char::escape_debug`].

# Examples

As an iterator:

```
for c in "❤\n!".escape_debug() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```
println!("{}", "❤\n!".escape_debug());
```


Both are equivalent to:

```
println!("❤\\n!");
```

Using `to_string`:

```
assert_eq!("❤\n!".escape_debug().to_string(), "❤\\n!");
```

## str::escape_default

```rust
pub fn escape_default(&self) -> EscapeDefault<'_>
```

Returns an iterator that escapes each char in `self` with [`char::escape_default`].

# Examples

As an iterator:

```
for c in "❤\n!".escape_default() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```
println!("{}", "❤\n!".escape_default());
```


Both are equivalent to:

```
println!("\\u{{2764}}\\n!");
```

Using `to_string`:

```
assert_eq!("❤\n!".escape_default().to_string(), "\\u{2764}\\n!");
```

## str::escape_unicode

```rust
pub fn escape_unicode(&self) -> EscapeUnicode<'_>
```

Returns an iterator that escapes each char in `self` with [`char::escape_unicode`].

# Examples

As an iterator:

```
for c in "❤\n!".escape_unicode() {
    print!("{c}");
}
println!();
```

Using `println!` directly:

```
println!("{}", "❤\n!".escape_unicode());
```


Both are equivalent to:

```
println!("\\u{{2764}}\\u{{a}}\\u{{21}}");
```

Using `to_string`:

```
assert_eq!("❤\n!".escape_unicode().to_string(), "\\u{2764}\\u{a}\\u{21}");
```

## str::substr_range

```rust
pub fn substr_range(&self, substr: &str) -> Option<Range<usize>>
```

Returns the range that a substring points to.

Returns `None` if `substr` does not point within `self`.

Unlike [`str::find`], **this does not search through the string**.
Instead, it uses pointer arithmetic to find where in the string
`substr` is derived from.

This is useful for extending [`str::split`] and similar methods.

Note that this method may return false positives (typically either
`Some(0..0)` or `Some(self.len()..self.len())`) if `substr` is a
zero-length `str` that points at the beginning or end of another,
independent, `str`.

# Examples
```
use core::range::Range;

let data = "a, b, b, a";
let mut iter = data.split(", ").map(|s| data.substr_range(s).unwrap());

assert_eq!(iter.next(), Some(Range { start: 0, end: 1 }));
assert_eq!(iter.next(), Some(Range { start: 3, end: 4 }));
assert_eq!(iter.next(), Some(Range { start: 6, end: 7 }));
assert_eq!(iter.next(), Some(Range { start: 9, end: 10 }));
```