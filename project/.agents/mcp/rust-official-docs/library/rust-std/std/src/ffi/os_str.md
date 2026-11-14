---
title: "std::ffi::os_str (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/ffi/os_str.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::ffi::os_str

The `OsStr` and `OsString` types and associated utilities.

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

`OsString` and `OsStr` bridge this gap by simultaneously representing Rust
and platform-native string values, and in particular allowing a Rust string
to be converted into an "OS" string with no cost if possible. A consequence
of this is that `OsString` instances are *not* `NUL` terminated; in order
to pass to e.g., Unix system call, you should create a `CStr`.

`OsString` is to `&[OsStr]` as `String` is to `&[str]`: the former
in each pair are owned strings; the latter are borrowed
references.

Note, `OsString` and `OsStr` internally do not necessarily hold strings in
the form native to the platform; While on Unix, strings are stored as a
sequence of 8-bit values, on Windows, where strings are 16-bit value based
as just discussed, strings are also actually stored as a sequence of 8-bit
values, encoded in a less-strict variant of UTF-8. This is useful to
understand when handling capacity and length values.

# Capacity of `OsString`

Capacity uses units of UTF-8 bytes for OS strings which were created from valid unicode, and
uses units of bytes in an unspecified encoding for other contents. On a given target, all
`OsString` and `OsStr` values use the same units for capacity, so the following will work:
```rust
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
<code>[From]<[String]></code>, so you can use `my_string.[into]\()` to
create an `OsString` from a normal Rust string.

**From slices:** Just like you can start with an empty Rust
`String` and then `String::push_str` some `&[str]`
sub-string slices into it, you can create an empty `OsString` with
the `OsString::new` method and then push string slices into it with the
`OsString::push` method.

# Extracting a borrowed reference to the whole OS string

You can use the `OsString::as_os_str` method to get an `&[OsStr]` from
an `OsString`; this is effectively a borrowed reference to the
whole string.

# Conversions

See the module's toplevel documentation about conversions for a discussion on
the traits which `OsString` implements for [conversions] from/to native representations.

## OsString::new

```rust
pub const fn new() -> OsString
```

Constructs a new empty `OsString`.

# Examples

```rust
use std::ffi::OsString;

let os_string = OsString::new();
```

## OsString::from_encoded_bytes_unchecked

```rust
pub unsafe fn from_encoded_bytes_unchecked(bytes: Vec<u8>) -> Self
```

Converts bytes to an `OsString` without checking that the bytes contains
valid `OsStr`-encoded data.

The byte encoding is an unspecified, platform-specific, self-synchronizing superset of UTF-8.
By being a self-synchronizing superset of UTF-8, this encoding is also a superset of 7-bit
ASCII.

See the module's toplevel documentation about conversions for safe,
cross-platform [conversions] from/to native representations.

# Safety

As the encoding is unspecified, callers must pass in bytes that originated as a mixture of
validated UTF-8 and bytes from `OsStr::as_encoded_bytes` from within the same Rust version
built for the same target platform.  For example, reconstructing an `OsString` from bytes sent
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

## OsString::as_os_str

```rust
pub fn as_os_str(&self) -> &OsStr
```

Converts to an `OsStr` slice.

# Examples

```rust
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
`OsString`, use the `OsString::from_encoded_bytes_unchecked` function.

The byte encoding is an unspecified, platform-specific, self-synchronizing superset of UTF-8.
By being a self-synchronizing superset of UTF-8, this encoding is also a superset of 7-bit
ASCII.

Note: As the encoding is unspecified, any sub-slice of bytes that is not valid UTF-8 should
be treated as opaque and only comparable within the same Rust version built for the same
target platform.  For example, sending the bytes over the network or storing it in a file
will likely result in incompatible data.  See `OsString` for more encoding details
and `std::ffi` for platform-specific, specified conversions.

## OsString::into_string

```rust
pub fn into_string(self) -> Result<String, OsString>
```

Converts the `OsString` into a `String` if it contains valid Unicode data.

On failure, ownership of the original `OsString` is returned.

# Examples

```rust
use std::ffi::OsString;

let os_string = OsString::from("foo");
let string = os_string.into_string();
assert_eq!(string, Ok(String::from("foo")));
```

## OsString::push

```rust
pub fn push<T: AsRef<OsStr>>(&mut self, s: T)
```

Extends the string with the given `&[OsStr]` slice.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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
minimal. Prefer `reserve` if future insertions are expected.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```rust
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
minimal. Prefer `try_reserve` if future insertions are expected.

See the main `OsString` documentation information about encoding and capacity units.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
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
```

## OsString::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of the `OsString` to match its length.

See the main `OsString` documentation information about encoding and capacity units.

# Examples

```rust
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

```rust
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

Converts this `OsString` into a boxed `OsStr`.

# Examples

```rust
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
capacity, call `into_boxed_os_str`, and then `Box::leak` instead.
However, keep in mind that trimming the capacity may result in a reallocation and copy.

## OsStr::new

```rust
pub const fn new<S: [const] AsRef<OsStr> + ?Sized>(s: &S) -> &OsStr
```

Coerces into an `OsStr` slice.

# Examples

```rust
use std::ffi::OsStr;

let os_str = OsStr::new("foo");
```
