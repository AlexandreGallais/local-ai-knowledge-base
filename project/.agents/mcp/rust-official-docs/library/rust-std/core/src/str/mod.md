---
title: "core::str (part 1 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/str/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::str

String manipulation.

For more details, see the `std::str` module.

## str::len

```rust
pub const fn len(&self) -> usize
```

Returns the length of `self`.

This length is in bytes, not `char`s or graphemes. In other words,
it might not be what a human considers the length of the string.

# Examples

```rust
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

```rust
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

A string slice (`&str`) is made of bytes (`u8`), and a byte slice
(`&[u8]`) is made of bytes, so this function converts between
the two. Not all byte slices are valid string slices, however: `&str` requires
that it is valid UTF-8. `from_utf8()` checks to ensure that the bytes are valid
UTF-8, and then does the conversion.

If you are sure that the byte slice is valid UTF-8, and you don't want to
incur the overhead of the validity check, there is an unsafe version of
this function, `from_utf8_unchecked`, which has the same
behavior but skips the check.

If you need a `String` instead of a `&str`, consider
`String::from_utf8`[string].

Because you can stack-allocate a `[u8; N]`, and you can take a
`&[u8]` of it, this function is one way to have a
stack-allocated string. There is an example of this in the
examples section below.

# Errors

Returns `Err` if the slice is not UTF-8 with a description as to why the
provided slice is not UTF-8.

# Examples

Basic usage:

```rust
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

// We can use the ? (try) operator to check if the bytes are valid
let sparkle_heart = str::from_utf8(&sparkle_heart)?;

assert_eq!("💖", sparkle_heart);
```

Incorrect bytes:

```rust
// some invalid bytes, in a vector
let sparkle_heart = vec![0, 159, 146, 150];

assert!(str::from_utf8(&sparkle_heart).is_err());
```

See the docs for `Utf8Error` for more details on the kinds of
errors that can be returned.

A "stack allocated string":

```rust
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

```rust
// "Hello, Rust!" as a mutable vector
let mut hellorust = vec![72, 101, 108, 108, 111, 44, 32, 82, 117, 115, 116, 33];

// As we know these bytes are valid, we can use `unwrap()`
let outstr = str::from_utf8_mut(&mut hellorust).unwrap();

assert_eq!("Hello, Rust!", outstr);
```

Incorrect bytes:

```rust
// Some invalid bytes in a mutable vector
let mut invalid = vec![128, 223];

assert!(str::from_utf8_mut(&mut invalid).is_err());
```
See the docs for `Utf8Error` for more details on the kinds of
errors that can be returned.

## str::from_utf8_unchecked

```rust
pub const unsafe fn from_utf8_unchecked(v: &[u8]) -> &str
```

Converts a slice of bytes to a string slice without checking
that the string contains valid UTF-8.

See the safe version, `from_utf8`, for more information.

# Safety

The bytes passed in must be valid UTF-8.

# Examples

Basic usage:

```rust
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

See the immutable version, `from_utf8_unchecked()` for documentation and safety requirements.

# Examples

Basic usage:

```rust
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

```rust
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

Finds the closest `x` not exceeding `index` where `is_char_boundary(x)` is `true`.

This method can help you truncate a string so that it's still valid UTF-8, but doesn't
exceed a given number of bytes. Note that this is done purely at the character level
and can still visually split graphemes, even though the underlying characters aren't
split. For example, the emoji 🧑‍🔬 (scientist) could be split so that the string only
includes 🧑 (person) instead.

# Examples

```rust
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

Finds the closest `x` not below `index` where `is_char_boundary(x)` is `true`.

If `index` is greater than the length of the string, this returns the length of the string.

This method is the natural complement to `floor_char_boundary`. See that method
for more details.

# Examples

```rust
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
into a string slice, use the `from_utf8` function.

# Examples

```rust
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

```rust
let mut s = String::from("Hello");
let bytes = unsafe { s.as_bytes_mut() };

assert_eq!(b"Hello", bytes);
```

Mutability:

```rust
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
`u8`. This pointer will be pointing to the first byte of the string
slice.

The caller must ensure that the returned pointer is never written to.
If you need to mutate the contents of the string slice, use `as_mut_ptr`.

# Examples

```rust
let s = "Hello";
let ptr = s.as_ptr();
```

## str::as_mut_ptr

```rust
pub const fn as_mut_ptr(&mut self) -> *mut u8
```

Converts a mutable string slice to a raw pointer.

As string slices are a slice of bytes, the raw pointer points to a
`u8`. This pointer will be pointing to the first byte of the string
slice.

It is your responsibility to make sure that the string slice only gets
modified in a way that it remains valid UTF-8.

## str::get

```rust
pub const fn get<I: [const] SliceIndex<str>>(&self, i: I) -> Option<&I::Output>
```

Returns a subslice of `str`.

This is the non-panicking alternative to indexing the `str`. Returns
`None` whenever equivalent indexing operation would panic.

# Examples

```rust
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
`None` whenever equivalent indexing operation would panic.

# Examples

```rust
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

```rust
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

```rust
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
alternative see `str` and `Index`.

This new slice goes from `begin` to `end`, including `begin` but
excluding `end`.

To get a mutable string slice instead, see the
`slice_mut_unchecked` method.

# Safety

Callers of this function are responsible that three preconditions are
satisfied:

* `begin` must not exceed `end`.
* `begin` and `end` must be byte positions within the string slice.
* `begin` and `end` must lie on UTF-8 sequence boundaries.

# Examples

```rust
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
alternative see `str` and `IndexMut`.

This new slice goes from `begin` to `end`, including `begin` but
excluding `end`.

To get an immutable string slice instead, see the
`slice_unchecked` method.

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

To get mutable string slices instead, see the `split_at_mut`
method.

# Panics

Panics if `mid` is not on a UTF-8 code point boundary, or if it is past
the end of the last code point of the string slice.  For a non-panicking
alternative see `split_at_checked`.

# Examples

```rust
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

To get immutable string slices instead, see the `split_at` method.

# Panics

Panics if `mid` is not on a UTF-8 code point boundary, or if it is past
the end of the last code point of the string slice.  For a non-panicking
alternative see `split_at_mut_checked`.

# Examples

```rust
let mut s = "Per Martin-Löf".to_string();
{
    let (first, last) = s.split_at_mut(3);
    first.make_ascii_uppercase();
    assert_eq!("PER", first);
    assert_eq!(" Martin-Löf", last);
}
assert_eq!("PER Martin-Löf", s);
```
