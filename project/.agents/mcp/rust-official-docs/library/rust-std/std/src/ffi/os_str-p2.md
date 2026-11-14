---
title: "std::ffi::os_str (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/ffi/os_str.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::ffi::os_str (part 2 of 2)

## OsStr::from_encoded_bytes_unchecked

```rust
pub unsafe fn from_encoded_bytes_unchecked(bytes: &[u8]) -> &Self
```

Converts a slice of bytes to an OS string slice without checking that the string contains
valid `OsStr`-encoded data.

The byte encoding is an unspecified, platform-specific, self-synchronizing superset of UTF-8.
By being a self-synchronizing superset of UTF-8, this encoding is also a superset of 7-bit
ASCII.

See the module's toplevel documentation about conversions for safe,
cross-platform [conversions] from/to native representations.

# Safety

As the encoding is unspecified, callers must pass in bytes that originated as a mixture of
validated UTF-8 and bytes from `OsStr::as_encoded_bytes` from within the same Rust version
built for the same target platform.  For example, reconstructing an `OsStr` from bytes sent
over the network or stored in a file will likely violate these safety rules.

Due to the encoding being self-synchronizing, the bytes from `OsStr::as_encoded_bytes` can be
split either immediately before or immediately after any valid non-empty UTF-8 substring.

# Example

```rust
use std::ffi::OsStr;

let os_str = OsStr::new("Mary had a little lamb");
let bytes = os_str.as_encoded_bytes();
let words = bytes.split(|b| *b == b' ');
let words: Vec<&OsStr> = words.map(|word| {
    // SAFETY:
    // - Each `word` only contains content that originated from `OsStr::as_encoded_bytes`
    // - Only split with ASCII whitespace which is a non-empty UTF-8 substring
    unsafe { OsStr::from_encoded_bytes_unchecked(word) }
}).collect();
```

## OsStr::to_str

```rust
pub fn to_str(&self) -> Option<&str>
```

Yields a `&[str]` slice if the `OsStr` is valid Unicode.

This conversion may entail doing a check for UTF-8 validity.

# Examples

```rust
use std::ffi::OsStr;

let os_str = OsStr::new("foo");
assert_eq!(os_str.to_str(), Some("foo"));
```

## OsStr::to_string_lossy

```rust
pub fn to_string_lossy(&self) -> Cow<'_, str>
```

Converts an `OsStr` to a <code>[Cow]<[str]></code>.

Any non-UTF-8 sequences are replaced with
`U+FFFD REPLACEMENT CHARACTER`[U+FFFD].

# Examples

Calling `to_string_lossy` on an `OsStr` with invalid unicode:

```rust
// Note, due to differences in how Unix and Windows represent strings,
// we are forced to complicate this example, setting up example `OsStr`s
// with different source data and via different platform extensions.
// Understand that in reality you could end up with such example invalid
// sequences simply through collecting user command line arguments, for
// example.

#[cfg(unix)] {
    use std::ffi::OsStr;
    use std::os::unix::ffi::OsStrExt;

    // Here, the values 0x66 and 0x6f correspond to 'f' and 'o'
    // respectively. The value 0x80 is a lone continuation byte, invalid
    // in a UTF-8 sequence.
    let source = [0x66, 0x6f, 0x80, 0x6f];
    let os_str = OsStr::from_bytes(&source[..]);

    assert_eq!(os_str.to_string_lossy(), "fo�o");
}
#[cfg(windows)] {
    use std::ffi::OsString;
    use std::os::windows::prelude::*;

    // Here the values 0x0066 and 0x006f correspond to 'f' and 'o'
    // respectively. The value 0xD800 is a lone surrogate half, invalid
    // in a UTF-16 sequence.
    let source = [0x0066, 0x006f, 0xD800, 0x006f];
    let os_string = OsString::from_wide(&source[..]);
    let os_str = os_string.as_os_str();

    assert_eq!(os_str.to_string_lossy(), "fo�o");
}
```

## OsStr::to_os_string

```rust
pub fn to_os_string(&self) -> OsString
```

Copies the slice into an owned `OsString`.

# Examples

```rust
use std::ffi::{OsStr, OsString};

let os_str = OsStr::new("foo");
let os_string = os_str.to_os_string();
assert_eq!(os_string, OsString::from("foo"));
```

## OsStr::is_empty

```rust
pub fn is_empty(&self) -> bool
```

Checks whether the `OsStr` is empty.

# Examples

```rust
use std::ffi::OsStr;

let os_str = OsStr::new("");
assert!(os_str.is_empty());

let os_str = OsStr::new("foo");
assert!(!os_str.is_empty());
```

## OsStr::len

```rust
pub fn len(&self) -> usize
```

Returns the length of this `OsStr`.

Note that this does **not** return the number of bytes in the string in
OS string form.

The length returned is that of the underlying storage used by `OsStr`.
As discussed in the `OsString` introduction, `OsString` and `OsStr`
store strings in a form best suited for cheap inter-conversion between
native-platform and Rust string forms, which may differ significantly
from both of them, including in storage size and encoding.

This number is simply useful for passing to other methods, like
`OsString::with_capacity` to avoid reallocations.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```rust
use std::ffi::OsStr;

let os_str = OsStr::new("");
assert_eq!(os_str.len(), 0);

let os_str = OsStr::new("foo");
assert_eq!(os_str.len(), 3);
```

## OsStr::into_os_string

```rust
pub fn into_os_string(self: Box<Self>) -> OsString
```

Converts a <code>[Box]<[OsStr]></code> into an `OsString` without copying or allocating.

## OsStr::as_encoded_bytes

```rust
pub fn as_encoded_bytes(&self) -> &[u8]
```

Converts an OS string slice to a byte slice.  To convert the byte slice back into an OS
string slice, use the `OsStr::from_encoded_bytes_unchecked` function.

The byte encoding is an unspecified, platform-specific, self-synchronizing superset of UTF-8.
By being a self-synchronizing superset of UTF-8, this encoding is also a superset of 7-bit
ASCII.

Note: As the encoding is unspecified, any sub-slice of bytes that is not valid UTF-8 should
be treated as opaque and only comparable within the same Rust version built for the same
target platform.  For example, sending the slice over the network or storing it in a file
will likely result in incompatible byte slices.  See `OsString` for more encoding details
and `std::ffi` for platform-specific, specified conversions.

## OsStr::make_ascii_lowercase

```rust
pub fn make_ascii_lowercase(&mut self)
```

Converts this string to its ASCII lower case equivalent in-place.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To return a new lowercased value without modifying the existing one, use
`OsStr::to_ascii_lowercase`.

# Examples

```rust
use std::ffi::OsString;

let mut s = OsString::from("GRÜßE, JÜRGEN ❤");

s.make_ascii_lowercase();

assert_eq!("grÜße, jÜrgen ❤", s);
```

## OsStr::make_ascii_uppercase

```rust
pub fn make_ascii_uppercase(&mut self)
```

Converts this string to its ASCII upper case equivalent in-place.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To return a new uppercased value without modifying the existing one, use
`OsStr::to_ascii_uppercase`.

# Examples

```rust
use std::ffi::OsString;

let mut s = OsString::from("Grüße, Jürgen ❤");

s.make_ascii_uppercase();

assert_eq!("GRüßE, JüRGEN ❤", s);
```

## OsStr::to_ascii_lowercase

```rust
pub fn to_ascii_lowercase(&self) -> OsString
```

Returns a copy of this string where each character is mapped to its
ASCII lower case equivalent.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To lowercase the value in-place, use `OsStr::make_ascii_lowercase`.

# Examples

```rust
use std::ffi::OsString;
let s = OsString::from("Grüße, Jürgen ❤");

assert_eq!("grüße, jürgen ❤", s.to_ascii_lowercase());
```

## OsStr::to_ascii_uppercase

```rust
pub fn to_ascii_uppercase(&self) -> OsString
```

Returns a copy of this string where each character is mapped to its
ASCII upper case equivalent.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To uppercase the value in-place, use `OsStr::make_ascii_uppercase`.

# Examples

```rust
use std::ffi::OsString;
let s = OsString::from("Grüße, Jürgen ❤");

assert_eq!("GRüßE, JüRGEN ❤", s.to_ascii_uppercase());
```

## OsStr::is_ascii

```rust
pub fn is_ascii(&self) -> bool
```

Checks if all characters in this string are within the ASCII range.

An empty string returns `true`.

# Examples

```rust
use std::ffi::OsString;

let ascii = OsString::from("hello!\n");
let non_ascii = OsString::from("Grüße, Jürgen ❤");

assert!(ascii.is_ascii());
assert!(!non_ascii.is_ascii());
```

## OsStr::eq_ignore_ascii_case

```rust
pub fn eq_ignore_ascii_case<S: AsRef<OsStr>>(&self, other: S) -> bool
```

Checks that two strings are an ASCII case-insensitive match.

Same as `to_ascii_lowercase(a) == to_ascii_lowercase(b)`,
but without allocating and copying temporaries.

# Examples

```rust
use std::ffi::OsString;

assert!(OsString::from("Ferris").eq_ignore_ascii_case("FERRIS"));
assert!(OsString::from("Ferrös").eq_ignore_ascii_case("FERRöS"));
assert!(!OsString::from("Ferrös").eq_ignore_ascii_case("FERRÖS"));
```

## OsStr::display

```rust
pub fn display(&self) -> Display<'_>
```

Returns an object that implements `Display` for safely printing an
`OsStr` that may contain non-Unicode data. This may perform lossy
conversion, depending on the platform.  If you would like an
implementation which escapes the `OsStr` please use `Debug`
instead.

# Examples

```rust
use std::ffi::OsStr;

let s = OsStr::new("Hello, world!");
println!("{}", s.display());
```

## struct Display

```rust
pub struct Display<'a>
```

Helper struct for safely printing an `OsStr` with `format!` and `{}`.

An `OsStr` might contain non-Unicode data. This `struct` implements the
`Display` trait in a way that mitigates that. It is created by the
`display` method on `OsStr`. This may perform lossy
conversion, depending on the platform. If you would like an implementation
which escapes the `OsStr` please use `Debug` instead.

# Examples

```rust
use std::ffi::OsStr;

let s = OsStr::new("Hello, world!");
println!("{}", s.display());
```
