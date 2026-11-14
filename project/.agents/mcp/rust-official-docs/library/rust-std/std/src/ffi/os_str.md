# std::ffi::os_str

The [`OsStr`] and [`OsString`] types and associated utilities.

## struct OsString

```rust
pub struct OsString
```

A type that can represent owned, mutable platform-native strings, but is
cheaply inter-convertible with Rust strings.

The need for this type arises from the fact that:

* On Unix systems, strings are often arbitrary sequences of non-zero
  bytes, in many cases interpreted as UTF-8.

* On Windows, strings are often arbitrary sequences of non-zero 16-bit
  values, interpreted as UTF-16 when it is valid to do so.

* In Rust, strings are always valid UTF-8, which may contain zeros.

`OsString` and [`OsStr`] bridge this gap by simultaneously representing Rust
and platform-native string values, and in particular allowing a Rust string
to be converted into an "OS" string with no cost if possible. A consequence
of this is that `OsString` instances are *not* `NUL` terminated; in order
to pass to e.g., Unix system call, you should create a [`CStr`].

`OsString` is to <code>&[OsStr]</code> as [`String`] is to <code>&[str]</code>: the former
in each pair are owned strings; the latter are borrowed
references.

Note, `OsString` and [`OsStr`] internally do not necessarily hold strings in
the form native to the platform; While on Unix, strings are stored as a
sequence of 8-bit values, on Windows, where strings are 16-bit value based
as just discussed, strings are also actually stored as a sequence of 8-bit
values, encoded in a less-strict variant of UTF-8. This is useful to
understand when handling capacity and length values.

# Capacity of `OsString`

Capacity uses units of UTF-8 bytes for OS strings which were created from valid unicode, and
uses units of bytes in an unspecified encoding for other contents. On a given target, all
`OsString` and `OsStr` values use the same units for capacity, so the following will work:
```
use std::ffi::{OsStr, OsString};

fn concat_os_strings(a: &OsStr, b: &OsStr) -> OsString {
    let mut ret = OsString::with_capacity(a.len() + b.len()); // This will allocate
    ret.push(a); // This will not allocate further
    ret.push(b); // This will not allocate further
    ret
}
```

# Creating an `OsString`

**From a Rust string**: `OsString` implements
<code>[From]<[String]></code>, so you can use <code>my_string.[into]\()</code> to
create an `OsString` from a normal Rust string.

**From slices:** Just like you can start with an empty Rust
[`String`] and then [`String::push_str`] some <code>&[str]</code>
sub-string slices into it, you can create an empty `OsString` with
the [`OsString::new`] method and then push string slices into it with the
[`OsString::push`] method.

# Extracting a borrowed reference to the whole OS string

You can use the [`OsString::as_os_str`] method to get an <code>&[OsStr]</code> from
an `OsString`; this is effectively a borrowed reference to the
whole string.

# Conversions

See the [module's toplevel documentation about conversions][conversions] for a discussion on
the traits which `OsString` implements for [conversions] from/to native representations.

[`CStr`]: crate::ffi::CStr
[conversions]: super#conversions
[into]: Into::into

## OsString::new

```rust
pub const fn new() -> OsString
```

Constructs a new empty `OsString`.

# Examples

```
use std::ffi::OsString;

let os_string = OsString::new();
```

## OsString::from_encoded_bytes_unchecked

```rust
pub unsafe fn from_encoded_bytes_unchecked(bytes: Vec<u8>) -> Self
```

Converts bytes to an `OsString` without checking that the bytes contains
valid [`OsStr`]-encoded data.

The byte encoding is an unspecified, platform-specific, self-synchronizing superset of UTF-8.
By being a self-synchronizing superset of UTF-8, this encoding is also a superset of 7-bit
ASCII.

See the [module's toplevel documentation about conversions][conversions] for safe,
cross-platform [conversions] from/to native representations.

# Safety

As the encoding is unspecified, callers must pass in bytes that originated as a mixture of
validated UTF-8 and bytes from [`OsStr::as_encoded_bytes`] from within the same Rust version
built for the same target platform.  For example, reconstructing an `OsString` from bytes sent
over the network or stored in a file will likely violate these safety rules.

Due to the encoding being self-synchronizing, the bytes from [`OsStr::as_encoded_bytes`] can be
split either immediately before or immediately after any valid non-empty UTF-8 substring.

# Example

```
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

[conversions]: super#conversions

## OsString::as_os_str

```rust
pub fn as_os_str(&self) -> &OsStr
```

Converts to an [`OsStr`] slice.

# Examples

```
use std::ffi::{OsString, OsStr};

let os_string = OsString::from("foo");
let os_str = OsStr::new("foo");
assert_eq!(os_string.as_os_str(), os_str);
```

## OsString::into_encoded_bytes

```rust
pub fn into_encoded_bytes(self) -> Vec<u8>
```

Converts the `OsString` into a byte vector.  To convert the byte vector back into an
`OsString`, use the [`OsString::from_encoded_bytes_unchecked`] function.

The byte encoding is an unspecified, platform-specific, self-synchronizing superset of UTF-8.
By being a self-synchronizing superset of UTF-8, this encoding is also a superset of 7-bit
ASCII.

Note: As the encoding is unspecified, any sub-slice of bytes that is not valid UTF-8 should
be treated as opaque and only comparable within the same Rust version built for the same
target platform.  For example, sending the bytes over the network or storing it in a file
will likely result in incompatible data.  See [`OsString`] for more encoding details
and [`std::ffi`] for platform-specific, specified conversions.

[`std::ffi`]: crate::ffi

## OsString::into_string

```rust
pub fn into_string(self) -> Result<String, OsString>
```

Converts the `OsString` into a [`String`] if it contains valid Unicode data.

On failure, ownership of the original `OsString` is returned.

# Examples

```
use std::ffi::OsString;

let os_string = OsString::from("foo");
let string = os_string.into_string();
assert_eq!(string, Ok(String::from("foo")));
```

## OsString::push

```rust
pub fn push<T: AsRef<OsStr>>(&mut self, s: T)
```

Extends the string with the given <code>&[OsStr]</code> slice.

# Examples

```
use std::ffi::OsString;

let mut os_string = OsString::from("foo");
os_string.push("bar");
assert_eq!(&os_string, "foobar");
```

## OsString::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> OsString
```

Creates a new `OsString` with at least the given capacity.

The string will be able to hold at least `capacity` length units of other
OS strings without reallocating. This method is allowed to allocate for
more units than `capacity`. If `capacity` is 0, the string will not
allocate.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```
use std::ffi::OsString;

let mut os_string = OsString::with_capacity(10);
let capacity = os_string.capacity();

// This push is done without reallocating
os_string.push("foo");

assert_eq!(capacity, os_string.capacity());
```

## OsString::clear

```rust
pub fn clear(&mut self)
```

Truncates the `OsString` to zero length.

# Examples

```
use std::ffi::OsString;

let mut os_string = OsString::from("foo");
assert_eq!(&os_string, "foo");

os_string.clear();
assert_eq!(&os_string, "");
```

## OsString::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the capacity this `OsString` can hold without reallocating.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```
use std::ffi::OsString;

let os_string = OsString::with_capacity(10);
assert!(os_string.capacity() >= 10);
```

## OsString::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` more capacity to be inserted
in the given `OsString`. Does nothing if the capacity is
already sufficient.

The collection may reserve more space to speculatively avoid frequent reallocations.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```
use std::ffi::OsString;

let mut s = OsString::new();
s.reserve(10);
assert!(s.capacity() >= 10);
```

## OsString::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve capacity for at least `additional` more length units
in the given `OsString`. The string may reserve more space to speculatively avoid
frequent reallocations. After calling `try_reserve`, capacity will be
greater than or equal to `self.len() + additional` if it returns `Ok(())`.
Does nothing if capacity is already sufficient. This method preserves
the contents even if an error occurs.

See the main `OsString` documentation information about encoding and capacity units.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```
use std::ffi::{OsStr, OsString};
use std::collections::TryReserveError;

fn process_data(data: &str) -> Result<OsString, TryReserveError> {
    let mut s = OsString::new();

    // Pre-reserve the memory, exiting if we can't
    s.try_reserve(OsStr::new(data).len())?;

    // Now we know this can't OOM in the middle of our complex work
    s.push(data);

    Ok(s)
}
# process_data("123").expect("why is the test harness OOMing on 3 bytes?");
```

## OsString::reserve_exact

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

Reserves the minimum capacity for at least `additional` more capacity to
be inserted in the given `OsString`. Does nothing if the capacity is
already sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer [`reserve`] if future insertions are expected.

[`reserve`]: OsString::reserve

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```
use std::ffi::OsString;

let mut s = OsString::new();
s.reserve_exact(10);
assert!(s.capacity() >= 10);
```

## OsString::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve the minimum capacity for at least `additional`
more length units in the given `OsString`. After calling
`try_reserve_exact`, capacity will be greater than or equal to
`self.len() + additional` if it returns `Ok(())`.
Does nothing if the capacity is already sufficient.

Note that the allocator may give the `OsString` more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer [`try_reserve`] if future insertions are expected.

[`try_reserve`]: OsString::try_reserve

See the main `OsString` documentation information about encoding and capacity units.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```
use std::ffi::{OsStr, OsString};
use std::collections::TryReserveError;

fn process_data(data: &str) -> Result<OsString, TryReserveError> {
    let mut s = OsString::new();

    // Pre-reserve the memory, exiting if we can't
    s.try_reserve_exact(OsStr::new(data).len())?;

    // Now we know this can't OOM in the middle of our complex work
    s.push(data);

    Ok(s)
}
# process_data("123").expect("why is the test harness OOMing on 3 bytes?");
```

## OsString::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of the `OsString` to match its length.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```
use std::ffi::OsString;

let mut s = OsString::from("foo");

s.reserve(100);
assert!(s.capacity() >= 100);

s.shrink_to_fit();
assert_eq!(3, s.capacity());
```

## OsString::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Shrinks the capacity of the `OsString` with a lower bound.

The capacity will remain at least as large as both the length
and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```
use std::ffi::OsString;

let mut s = OsString::from("foo");

s.reserve(100);
assert!(s.capacity() >= 100);

s.shrink_to(10);
assert!(s.capacity() >= 10);
s.shrink_to(0);
assert!(s.capacity() >= 3);
```

## OsString::into_boxed_os_str

```rust
pub fn into_boxed_os_str(self) -> Box<OsStr>
```

Converts this `OsString` into a boxed [`OsStr`].

# Examples

```
use std::ffi::{OsString, OsStr};

let s = OsString::from("hello");

let b: Box<OsStr> = s.into_boxed_os_str();
```

## OsString::leak

```rust
pub fn leak<'a>(self) -> &'a mut OsStr
```

Consumes and leaks the `OsString`, returning a mutable reference to the contents,
`&'a mut OsStr`.

The caller has free choice over the returned lifetime, including 'static.
Indeed, this function is ideally used for data that lives for the remainder of
the program’s life, as dropping the returned reference will cause a memory leak.

It does not reallocate or shrink the `OsString`, so the leaked allocation may include
unused capacity that is not part of the returned slice. If you want to discard excess
capacity, call [`into_boxed_os_str`], and then [`Box::leak`] instead.
However, keep in mind that trimming the capacity may result in a reallocation and copy.

[`into_boxed_os_str`]: Self::into_boxed_os_str

## OsStr::new

```rust
pub const fn new<S: [const] AsRef<OsStr> + ?Sized>(s: &S) -> &OsStr
```

Coerces into an `OsStr` slice.

# Examples

```
use std::ffi::OsStr;

let os_str = OsStr::new("foo");
```

## OsStr::from_encoded_bytes_unchecked

```rust
pub unsafe fn from_encoded_bytes_unchecked(bytes: &[u8]) -> &Self
```

Converts a slice of bytes to an OS string slice without checking that the string contains
valid `OsStr`-encoded data.

The byte encoding is an unspecified, platform-specific, self-synchronizing superset of UTF-8.
By being a self-synchronizing superset of UTF-8, this encoding is also a superset of 7-bit
ASCII.

See the [module's toplevel documentation about conversions][conversions] for safe,
cross-platform [conversions] from/to native representations.

# Safety

As the encoding is unspecified, callers must pass in bytes that originated as a mixture of
validated UTF-8 and bytes from [`OsStr::as_encoded_bytes`] from within the same Rust version
built for the same target platform.  For example, reconstructing an `OsStr` from bytes sent
over the network or stored in a file will likely violate these safety rules.

Due to the encoding being self-synchronizing, the bytes from [`OsStr::as_encoded_bytes`] can be
split either immediately before or immediately after any valid non-empty UTF-8 substring.

# Example

```
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

[conversions]: super#conversions

## OsStr::to_str

```rust
pub fn to_str(&self) -> Option<&str>
```

Yields a <code>&[str]</code> slice if the `OsStr` is valid Unicode.

This conversion may entail doing a check for UTF-8 validity.

# Examples

```
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
[`U+FFFD REPLACEMENT CHARACTER`][U+FFFD].

[U+FFFD]: char::REPLACEMENT_CHARACTER

# Examples

Calling `to_string_lossy` on an `OsStr` with invalid unicode:

```
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

Copies the slice into an owned [`OsString`].

# Examples

```
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

```
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
As discussed in the [`OsString`] introduction, [`OsString`] and `OsStr`
store strings in a form best suited for cheap inter-conversion between
native-platform and Rust string forms, which may differ significantly
from both of them, including in storage size and encoding.

This number is simply useful for passing to other methods, like
[`OsString::with_capacity`] to avoid reallocations.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```
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

Converts a <code>[Box]<[OsStr]></code> into an [`OsString`] without copying or allocating.

## OsStr::as_encoded_bytes

```rust
pub fn as_encoded_bytes(&self) -> &[u8]
```

Converts an OS string slice to a byte slice.  To convert the byte slice back into an OS
string slice, use the [`OsStr::from_encoded_bytes_unchecked`] function.

The byte encoding is an unspecified, platform-specific, self-synchronizing superset of UTF-8.
By being a self-synchronizing superset of UTF-8, this encoding is also a superset of 7-bit
ASCII.

Note: As the encoding is unspecified, any sub-slice of bytes that is not valid UTF-8 should
be treated as opaque and only comparable within the same Rust version built for the same
target platform.  For example, sending the slice over the network or storing it in a file
will likely result in incompatible byte slices.  See [`OsString`] for more encoding details
and [`std::ffi`] for platform-specific, specified conversions.

[`std::ffi`]: crate::ffi

## OsStr::make_ascii_lowercase

```rust
pub fn make_ascii_lowercase(&mut self)
```

Converts this string to its ASCII lower case equivalent in-place.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To return a new lowercased value without modifying the existing one, use
[`OsStr::to_ascii_lowercase`].

# Examples

```
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
[`OsStr::to_ascii_uppercase`].

# Examples

```
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

To lowercase the value in-place, use [`OsStr::make_ascii_lowercase`].

# Examples

```
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

To uppercase the value in-place, use [`OsStr::make_ascii_uppercase`].

# Examples

```
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

```
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

```
use std::ffi::OsString;

assert!(OsString::from("Ferris").eq_ignore_ascii_case("FERRIS"));
assert!(OsString::from("Ferrös").eq_ignore_ascii_case("FERRöS"));
assert!(!OsString::from("Ferrös").eq_ignore_ascii_case("FERRÖS"));
```

## OsStr::display

```rust
pub fn display(&self) -> Display<'_>
```

Returns an object that implements [`Display`] for safely printing an
[`OsStr`] that may contain non-Unicode data. This may perform lossy
conversion, depending on the platform.  If you would like an
implementation which escapes the [`OsStr`] please use [`Debug`]
instead.

[`Display`]: fmt::Display
[`Debug`]: fmt::Debug

# Examples

```
use std::ffi::OsStr;

let s = OsStr::new("Hello, world!");
println!("{}", s.display());
```

## struct Display

```rust
pub struct Display<'a>
```

Helper struct for safely printing an [`OsStr`] with [`format!`] and `{}`.

An [`OsStr`] might contain non-Unicode data. This `struct` implements the
[`Display`] trait in a way that mitigates that. It is created by the
[`display`](OsStr::display) method on [`OsStr`]. This may perform lossy
conversion, depending on the platform. If you would like an implementation
which escapes the [`OsStr`] please use [`Debug`] instead.

# Examples

```
use std::ffi::OsStr;

let s = OsStr::new("Hello, world!");
println!("{}", s.display());
```

[`Display`]: fmt::Display
[`format!`]: crate::format