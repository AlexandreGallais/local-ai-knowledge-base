---
title: "alloc::string (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/string.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::string (part 3 of 3)

## String::as_bytes

```rust
pub const fn as_bytes(&self) -> &[u8]
```

Returns a byte slice of this `String`'s contents.

The inverse of this method is `from_utf8`.

# Examples

```rust
let s = String::from("hello");

assert_eq!(&[104, 101, 108, 108, 111], s.as_bytes());
```

## String::truncate

```rust
pub fn truncate(&mut self, new_len: usize)
```

Shortens this `String` to the specified length.

If `new_len` is greater than or equal to the string's current length, this has no
effect.

Note that this method has no effect on the allocated capacity
of the string

# Panics

Panics if `new_len` does not lie on a `char` boundary.

# Examples

```rust
let mut s = String::from("hello");

s.truncate(2);

assert_eq!("he", s);
```

## String::pop

```rust
pub fn pop(&mut self) -> Option<char>
```

Removes the last character from the string buffer and returns it.

Returns `None` if this `String` is empty.

# Examples

```rust
let mut s = String::from("abč");

assert_eq!(s.pop(), Some('č'));
assert_eq!(s.pop(), Some('b'));
assert_eq!(s.pop(), Some('a'));

assert_eq!(s.pop(), None);
```

## String::remove

```rust
pub fn remove(&mut self, idx: usize) -> char
```

Removes a `char` from this `String` at byte position `idx` and returns it.

Copies all bytes after the removed char to new positions.

Note that calling this in a loop can result in quadratic behavior.

# Panics

Panics if `idx` is larger than or equal to the `String`'s length,
or if it does not lie on a `char` boundary.

# Examples

```rust
let mut s = String::from("abç");

assert_eq!(s.remove(0), 'a');
assert_eq!(s.remove(1), 'ç');
assert_eq!(s.remove(0), 'b');
```

## String::retain

```rust
pub fn retain<F>(&mut self, mut f: F) where F: FnMut(char) -> bool,
```

Retains only the characters specified by the predicate.

In other words, remove all characters `c` such that `f(c)` returns `false`.
This method operates in place, visiting each character exactly once in the
original order, and preserves the order of the retained characters.

# Examples

```rust
let mut s = String::from("f_o_ob_ar");

s.retain(|c| c != '_');

assert_eq!(s, "foobar");
```

Because the elements are visited exactly once in the original order,
external state may be used to decide which elements to keep.

```rust
let mut s = String::from("abcde");
let keep = [false, true, true, false, true];
let mut iter = keep.iter();
s.retain(|_| *iter.next().unwrap());
assert_eq!(s, "bce");
```

## String::insert

```rust
pub fn insert(&mut self, idx: usize, ch: char)
```

Inserts a character into this `String` at byte position `idx`.

Reallocates if `self.capacity()` is insufficient, which may involve copying all
`self.capacity()` bytes. Makes space for the insertion by copying all bytes of
`&self[idx..]` to new positions.

Note that calling this in a loop can result in quadratic behavior.

# Panics

Panics if `idx` is larger than the `String`'s length, or if it does not
lie on a `char` boundary.

# Examples

```rust
let mut s = String::with_capacity(3);

s.insert(0, 'f');
s.insert(1, 'o');
s.insert(2, 'o');

assert_eq!("foo", s);
```

## String::insert_str

```rust
pub fn insert_str(&mut self, idx: usize, string: &str)
```

Inserts a string slice into this `String` at byte position `idx`.

Reallocates if `self.capacity()` is insufficient, which may involve copying all
`self.capacity()` bytes. Makes space for the insertion by copying all bytes of
`&self[idx..]` to new positions.

Note that calling this in a loop can result in quadratic behavior.

# Panics

Panics if `idx` is larger than the `String`'s length, or if it does not
lie on a `char` boundary.

# Examples

```rust
let mut s = String::from("bar");

s.insert_str(0, "foo");

assert_eq!("foobar", s);
```

## String::as_mut_vec

```rust
pub const unsafe fn as_mut_vec(&mut self) -> &mut Vec<u8>
```

Returns a mutable reference to the contents of this `String`.

# Safety

This function is unsafe because the returned `&mut Vec` allows writing
bytes which are not valid UTF-8. If this constraint is violated, using
the original `String` after dropping the `&mut Vec` may violate memory
safety, as the rest of the standard library assumes that `String`s are
valid UTF-8.

# Examples

```rust
let mut s = String::from("hello");

unsafe {
    let vec = s.as_mut_vec();
    assert_eq!(&[104, 101, 108, 108, 111][..], &vec[..]);

    vec.reverse();
}
assert_eq!(s, "olleh");
```

## String::len

```rust
pub const fn len(&self) -> usize
```

Returns the length of this `String`, in bytes, not `char`s or
graphemes. In other words, it might not be what a human considers the
length of the string.

# Examples

```rust
let a = String::from("foo");
assert_eq!(a.len(), 3);

let fancy_f = String::from("ƒoo");
assert_eq!(fancy_f.len(), 4);
assert_eq!(fancy_f.chars().count(), 3);
```

## String::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if this `String` has a length of zero, and `false` otherwise.

# Examples

```rust
let mut v = String::new();
assert!(v.is_empty());

v.push('a');
assert!(!v.is_empty());
```

## String::split_off

```rust
pub fn split_off(&mut self, at: usize) -> String
```

Splits the string into two at the given byte index.

Returns a newly allocated `String`. `self` contains bytes `[0, at)`, and
the returned `String` contains bytes `[at, len)`. `at` must be on the
boundary of a UTF-8 code point.

Note that the capacity of `self` does not change.

# Panics

Panics if `at` is not on a `UTF-8` code point boundary, or if it is beyond the last
code point of the string.

# Examples

```rust
let mut hello = String::from("Hello, World!");
let world = hello.split_off(7);
assert_eq!(hello, "Hello, ");
assert_eq!(world, "World!");
```

## String::clear

```rust
pub fn clear(&mut self)
```

Truncates this `String`, removing all contents.

While this means the `String` will have a length of zero, it does not
touch its capacity.

# Examples

```rust
let mut s = String::from("foo");

s.clear();

assert!(s.is_empty());
assert_eq!(0, s.len());
assert_eq!(3, s.capacity());
```

## String::drain

```rust
pub fn drain<R>(&mut self, range: R) -> Drain<'_> where R: RangeBounds<usize>,
```

Removes the specified range from the string in bulk, returning all
removed characters as an iterator.

The returned iterator keeps a mutable borrow on the string to optimize
its implementation.

# Panics

Panics if the range has `start_bound > end_bound`, or, if the range is
bounded on either end and does not lie on a `char` boundary.

# Leaking

If the returned iterator goes out of scope without being dropped (due to
`core::mem::forget`, for example), the string may still contain a copy
of any drained characters, or may have lost characters arbitrarily,
including characters outside the range.

# Examples

```rust
let mut s = String::from("α is alpha, β is beta");
let beta_offset = s.find('β').unwrap_or(s.len());

// Remove the range up until the β from the string
let t: String = s.drain(..beta_offset).collect();
assert_eq!(t, "α is alpha, ");
assert_eq!(s, "β is beta");

// A full range clears the string, like `clear()` does
s.drain(..);
assert_eq!(s, "");
```

## String::replace_range

```rust
pub fn replace_range<R>(&mut self, range: R, replace_with: &str) where R: RangeBounds<usize>,
```

Removes the specified range in the string,
and replaces it with the given string.
The given string doesn't need to be the same length as the range.

# Panics

Panics if the range has `start_bound > end_bound`, or, if the range is
bounded on either end and does not lie on a `char` boundary.

# Examples

```rust
let mut s = String::from("α is alpha, β is beta");
let beta_offset = s.find('β').unwrap_or(s.len());

// Replace the range up until the β from the string
s.replace_range(..beta_offset, "Α is capital alpha; ");
assert_eq!(s, "Α is capital alpha; β is beta");
```

## String::into_boxed_str

```rust
pub fn into_boxed_str(self) -> Box<str>
```

Converts this `String` into a <code>[Box]<[str]></code>.

Before doing the conversion, this method discards excess capacity like `shrink_to_fit`.
Note that this call may reallocate and copy the bytes of the string.

# Examples

```rust
let s = String::from("hello");

let b = s.into_boxed_str();
```

## String::leak

```rust
pub fn leak<'a>(self) -> &'a mut str
```

Consumes and leaks the `String`, returning a mutable reference to the contents,
`&'a mut str`.

The caller has free choice over the returned lifetime, including `'static`. Indeed,
this function is ideally used for data that lives for the remainder of the program's life,
as dropping the returned reference will cause a memory leak.

It does not reallocate or shrink the `String`, so the leaked allocation may include unused
capacity that is not part of the returned slice. If you want to discard excess capacity,
call `into_boxed_str`, and then `Box::leak` instead. However, keep in mind that
trimming the capacity may result in a reallocation and copy.

# Examples

```rust
let x = String::from("bucket");
let static_ref: &'static mut str = x.leak();
assert_eq!(static_ref, "bucket");
```

## FromUtf8Error::as_bytes

```rust
pub fn as_bytes(&self) -> &[u8]
```

Returns a slice of `u8`s bytes that were attempted to convert to a `String`.

# Examples

```rust
// some invalid bytes, in a vector
let bytes = vec![0, 159];

let value = String::from_utf8(bytes);

assert_eq!(&[0, 159], value.unwrap_err().as_bytes());
```

## FromUtf8Error::into_utf8_lossy

```rust
pub fn into_utf8_lossy(self) -> String
```

Converts the bytes into a `String` lossily, substituting invalid UTF-8
sequences with replacement characters.

See `String::from_utf8_lossy` for more details on replacement of
invalid sequences, and `String::from_utf8_lossy_owned` for the
`String` function which corresponds to this function.

This is useful in conjunction with `String::from_utf8` when you need
to branch on whether the bytes are valid UTF-8, but still want to
recover a lossily converted `String` in the error case. Use
`String::from_utf8_lossy_owned` if you always need a lossily converted
`String`.

Since the original `String::from_utf8` error records where validation
stopped, this method does not need to re-check the already valid prefix
of the byte sequence.

# Examples

```rust
// some invalid bytes
let input: Vec<u8> = b"Hello \xF0\x90\x80World".into();

let (output, had_invalid_utf8) = match String::from_utf8(input) {
    Ok(output) => (output, false),
    Err(error) => {
        // The bytes were not valid UTF-8, but we can still recover a string.
        (error.into_utf8_lossy(), true)
    }
};

assert_eq!(String::from("Hello �World"), output);
assert!(had_invalid_utf8);
```

## FromUtf8Error::into_bytes

```rust
pub fn into_bytes(self) -> Vec<u8>
```

Returns the bytes that were attempted to convert to a `String`.

This method is carefully constructed to avoid allocation. It will
consume the error, moving out the bytes, so that a copy of the bytes
does not need to be made.

# Examples

```rust
// some invalid bytes, in a vector
let bytes = vec![0, 159];

let value = String::from_utf8(bytes);

assert_eq!(vec![0, 159], value.unwrap_err().into_bytes());
```

## FromUtf8Error::utf8_error

```rust
pub fn utf8_error(&self) -> Utf8Error
```

Fetch a `Utf8Error` to get more details about the conversion failure.

The `Utf8Error` type provided by `std::str` represents an error that may
occur when converting a slice of `u8`s to a `&str`. In this sense, it's
an analogue to `FromUtf8Error`. See its documentation for more details
on using it.

# Examples

```rust
// some invalid bytes, in a vector
let bytes = vec![0, 159];

let error = String::from_utf8(bytes).unwrap_err().utf8_error();

// the first byte is invalid here
assert_eq!(1, error.valid_up_to());
```

## type ParseError

```rust
pub type ParseError = !
```

A type alias for `!`.

This alias exists for backwards compatibility, and may be eventually deprecated.

## trait ToString

```rust
pub trait ToString
```

A trait for converting a value to a `String`.

This trait is automatically implemented for any type which implements the
`Display` trait. As such, `ToString` shouldn't be implemented directly:
`Display` should be implemented instead, and you get the `ToString`
implementation for free.

## ToString::to_string

```rust
fn to_string(&self) -> String
```

Converts the given value to a `String`.

# Examples

```rust
let i = 5;
let five = String::from("5");

assert_eq!(five, i.to_string());
```

## ::Drain

```rust
pub struct Drain<'a>
```

A draining iterator for `String`.

This struct is created by the `drain` method on `String`. See its
documentation for more.

## Drain::as_str

```rust
pub fn as_str(&self) -> &str
```

Returns the remaining (sub)string of this iterator as a slice.

# Examples

```rust
let mut s = String::from("abc");
let mut drain = s.drain(..);
assert_eq!(drain.as_str(), "abc");
let _ = drain.next().unwrap();
assert_eq!(drain.as_str(), "bc");
```
