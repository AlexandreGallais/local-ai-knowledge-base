---
title: "alloc::string (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/string.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::string (part 2 of 3)

## String::from_utf8_lossy_owned

```rust
pub fn from_utf8_lossy_owned(v: Vec<u8>) -> String
```

Converts a `Vec<u8>` to a `String`, substituting invalid UTF-8
sequences with replacement characters.

See `from_utf8_lossy` for more details.

Note that this function does not guarantee reuse of the original `Vec`
allocation.

# Examples

Basic usage:

```rust
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

let sparkle_heart = String::from_utf8_lossy_owned(sparkle_heart);

assert_eq!(String::from("💖"), sparkle_heart);
```

Incorrect bytes:

```rust
// some invalid bytes
let input: Vec<u8> = b"Hello \xF0\x90\x80World".into();
let output = String::from_utf8_lossy_owned(input);

assert_eq!(String::from("Hello �World"), output);
```

## String::from_utf16

```rust
pub fn from_utf16(v: &[u16]) -> Result<String, FromUtf16Error>
```

Decode a native endian UTF-16–encoded vector `v` into a `String`,
returning `Err` if `v` contains any invalid data.

# Examples

```rust
// 𝄞music
let v = &[0xD834, 0xDD1E, 0x006d, 0x0075,
          0x0073, 0x0069, 0x0063];
assert_eq!(String::from("𝄞music"),
           String::from_utf16(v).unwrap());

// 𝄞mu<invalid>ic
let v = &[0xD834, 0xDD1E, 0x006d, 0x0075,
          0xD800, 0x0069, 0x0063];
assert!(String::from_utf16(v).is_err());
```

## String::from_utf16_lossy

```rust
pub fn from_utf16_lossy(v: &[u16]) -> String
```

Decode a native endian UTF-16–encoded slice `v` into a `String`,
replacing invalid data with the replacement character (`U+FFFD`).

Unlike `from_utf8_lossy` which returns a `Cow<'a, str>`,
`from_utf16_lossy` returns a `String` since the UTF-16 to UTF-8
conversion requires a memory allocation.

# Examples

```rust
// 𝄞mus<invalid>ic<invalid>
let v = &[0xD834, 0xDD1E, 0x006d, 0x0075,
          0x0073, 0xDD1E, 0x0069, 0x0063,
          0xD834];

assert_eq!(String::from("𝄞mus\u{FFFD}ic\u{FFFD}"),
           String::from_utf16_lossy(v));
```

## String::from_utf16le

```rust
pub fn from_utf16le(v: &[u8]) -> Result<String, FromUtf16Error>
```

Decode a UTF-16LE–encoded vector `v` into a `String`,
returning `Err` if `v` contains any invalid data.

# Examples

Basic usage:

```rust
// 𝄞music
let v = &[0x34, 0xD8, 0x1E, 0xDD, 0x6d, 0x00, 0x75, 0x00,
          0x73, 0x00, 0x69, 0x00, 0x63, 0x00];
assert_eq!(String::from("𝄞music"),
           String::from_utf16le(v).unwrap());

// 𝄞mu<invalid>ic
let v = &[0x34, 0xD8, 0x1E, 0xDD, 0x6d, 0x00, 0x75, 0x00,
          0x00, 0xD8, 0x69, 0x00, 0x63, 0x00];
assert!(String::from_utf16le(v).is_err());
```

## String::from_utf16le_lossy

```rust
pub fn from_utf16le_lossy(v: &[u8]) -> String
```

Decode a UTF-16LE–encoded slice `v` into a `String`, replacing
invalid data with the replacement character (`U+FFFD`).

Unlike `from_utf8_lossy` which returns a `Cow<'a, str>`,
`from_utf16le_lossy` returns a `String` since the UTF-16 to UTF-8
conversion requires a memory allocation.

# Examples

Basic usage:

```rust
// 𝄞mus<invalid>ic<invalid>
let v = &[0x34, 0xD8, 0x1E, 0xDD, 0x6d, 0x00, 0x75, 0x00,
          0x73, 0x00, 0x1E, 0xDD, 0x69, 0x00, 0x63, 0x00,
          0x34, 0xD8];

assert_eq!(String::from("𝄞mus\u{FFFD}ic\u{FFFD}"),
           String::from_utf16le_lossy(v));
```

## String::from_utf16be

```rust
pub fn from_utf16be(v: &[u8]) -> Result<String, FromUtf16Error>
```

Decode a UTF-16BE–encoded vector `v` into a `String`,
returning `Err` if `v` contains any invalid data.

# Examples

Basic usage:

```rust
// 𝄞music
let v = &[0xD8, 0x34, 0xDD, 0x1E, 0x00, 0x6d, 0x00, 0x75,
          0x00, 0x73, 0x00, 0x69, 0x00, 0x63];
assert_eq!(String::from("𝄞music"),
           String::from_utf16be(v).unwrap());

// 𝄞mu<invalid>ic
let v = &[0xD8, 0x34, 0xDD, 0x1E, 0x00, 0x6d, 0x00, 0x75,
          0xD8, 0x00, 0x00, 0x69, 0x00, 0x63];
assert!(String::from_utf16be(v).is_err());
```

## String::from_utf16be_lossy

```rust
pub fn from_utf16be_lossy(v: &[u8]) -> String
```

Decode a UTF-16BE–encoded slice `v` into a `String`, replacing
invalid data with the replacement character (`U+FFFD`).

Unlike `from_utf8_lossy` which returns a `Cow<'a, str>`,
`from_utf16le_lossy` returns a `String` since the UTF-16 to UTF-8
conversion requires a memory allocation.

# Examples

Basic usage:

```rust
// 𝄞mus<invalid>ic<invalid>
let v = &[0xD8, 0x34, 0xDD, 0x1E, 0x00, 0x6d, 0x00, 0x75,
          0x00, 0x73, 0xDD, 0x1E, 0x00, 0x69, 0x00, 0x63,
          0xD8, 0x34];

assert_eq!(String::from("𝄞mus\u{FFFD}ic\u{FFFD}"),
           String::from_utf16be_lossy(v));
```

## String::into_raw_parts

```rust
pub fn into_raw_parts(self) -> (*mut u8, usize, usize)
```

Decomposes a `String` into its raw components: `(pointer, length, capacity)`.

Returns the raw pointer to the underlying data, the length of
the string (in bytes), and the allocated capacity of the data
(in bytes). These are the same arguments in the same order as
the arguments to `from_raw_parts`.

After calling this function, the caller is responsible for the
memory previously managed by the `String`. The only way to do
this is to convert the raw pointer, length, and capacity back
into a `String` with the `from_raw_parts` function, allowing
the destructor to perform the cleanup.

If `capacity == 0`, then `pointer` may be dangling. Otherwise,
it will always be valid for reads and writes over `capacity`
bytes, and point to the start of the string.

# Examples

```rust
let s = String::from("hello");

let (ptr, len, cap) = s.into_raw_parts();

let rebuilt = unsafe { String::from_raw_parts(ptr, len, cap) };
assert_eq!(rebuilt, "hello");
```

## String::from_raw_parts

```rust
pub unsafe fn from_raw_parts(buf: *mut u8, length: usize, capacity: usize) -> String
```

Creates a new `String` from a pointer, a length and a capacity.

# Safety

This is highly unsafe, due to the number of invariants that aren't
checked:

* all safety requirements for `Vec::<u8>::from_raw_parts`.
* all safety requirements for `String::from_utf8_unchecked`.

Violating these may cause problems like corrupting the allocator's
internal data structures. For example, it is normally **not** safe to
build a `String` from a pointer to a C `char` array containing UTF-8
_unless_ you are certain that array was originally allocated by the
Rust standard library's allocator.

The ownership of `buf` is effectively transferred to the
`String` which may then deallocate, reallocate or change the
contents of memory pointed to by the pointer at will. Ensure
that nothing else uses the pointer after calling this
function.

# Examples

```rust
unsafe {
    let s = String::from("hello");

    // Deconstruct the String into parts.
    let (ptr, len, capacity) = s.into_raw_parts();

    let s = String::from_raw_parts(ptr, len, capacity);

    assert_eq!(String::from("hello"), s);
}
```

## String::from_utf8_unchecked

```rust
pub unsafe fn from_utf8_unchecked(bytes: Vec<u8>) -> String
```

Converts a vector of bytes to a `String` without checking that the
string contains valid UTF-8.

See the safe version, `from_utf8`, for more details.

# Safety

This function is unsafe because it does not check that the bytes passed
to it are valid UTF-8. If this constraint is violated, it may cause
memory unsafety issues with future users of the `String`, as the rest of
the standard library assumes that `String`s are valid UTF-8.

# Examples

```rust
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

let sparkle_heart = unsafe {
    String::from_utf8_unchecked(sparkle_heart)
};

assert_eq!("💖", sparkle_heart);
```

## String::into_bytes

```rust
pub const fn into_bytes(self) -> Vec<u8>
```

Converts a `String` into a byte vector.

This consumes the `String`, so we do not need to copy its contents.

# Examples

```rust
let s = String::from("hello");
let bytes = s.into_bytes();

assert_eq!(&[104, 101, 108, 108, 111][..], &bytes[..]);
```

## String::as_str

```rust
pub const fn as_str(&self) -> &str
```

Extracts a string slice containing the entire `String`.

# Examples

```rust
let s = String::from("foo");

assert_eq!("foo", s.as_str());
```

## String::as_mut_str

```rust
pub const fn as_mut_str(&mut self) -> &mut str
```

Converts a `String` into a mutable string slice.

# Examples

```rust
let mut s = String::from("foobar");
let s_mut_str = s.as_mut_str();

s_mut_str.make_ascii_uppercase();

assert_eq!("FOOBAR", s_mut_str);
```

## String::push_str

```rust
pub fn push_str(&mut self, string: &str)
```

Appends a given string slice onto the end of this `String`.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut s = String::from("foo");

s.push_str("bar");

assert_eq!("foobar", s);
```

## String::extend_from_within

```rust
pub fn extend_from_within<R>(&mut self, src: R) where R: RangeBounds<usize>,
```

Copies elements from `src` range to the end of the string.

# Panics

Panics if the range has `start_bound > end_bound`, if the range is
bounded on either end and does not lie on a `char` boundary, or if the
new capacity exceeds `isize::MAX` bytes.

# Examples

```rust
let mut string = String::from("abcde");

string.extend_from_within(2..);
assert_eq!(string, "abcdecde");

string.extend_from_within(..2);
assert_eq!(string, "abcdecdeab");

string.extend_from_within(4..8);
assert_eq!(string, "abcdecdeabecde");
```

## String::capacity

```rust
pub const fn capacity(&self) -> usize
```

Returns this `String`'s capacity, in bytes.

# Examples

```rust
let s = String::with_capacity(10);

assert!(s.capacity() >= 10);
```

## String::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` bytes more than the
current length. The allocator may reserve more space to speculatively
avoid frequent allocations. After calling `reserve`,
capacity will be greater than or equal to `self.len() + additional`.
Does nothing if capacity is already sufficient.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

Basic usage:

```rust
let mut s = String::new();

s.reserve(10);

assert!(s.capacity() >= 10);
```

This might not actually increase the capacity:

```rust
let mut s = String::with_capacity(10);
s.push('a');
s.push('b');

// s now has a length of 2 and a capacity of at least 10
let capacity = s.capacity();
assert_eq!(2, s.len());
assert!(capacity >= 10);

// Since we already have at least an extra 8 capacity, calling this...
s.reserve(8);

// ... doesn't actually increase.
assert_eq!(capacity, s.capacity());
```

## String::reserve_exact

```rust
pub fn reserve_exact(&mut self, additional: usize)
```

Reserves the minimum capacity for at least `additional` bytes more than
the current length. Unlike `reserve`, this will not
deliberately over-allocate to speculatively avoid frequent allocations.
After calling `reserve_exact`, capacity will be greater than or equal to
`self.len() + additional`. Does nothing if the capacity is already
sufficient.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

Basic usage:

```rust
let mut s = String::new();

s.reserve_exact(10);

assert!(s.capacity() >= 10);
```

This might not actually increase the capacity:

```rust
let mut s = String::with_capacity(10);
s.push('a');
s.push('b');

// s now has a length of 2 and a capacity of at least 10
let capacity = s.capacity();
assert_eq!(2, s.len());
assert!(capacity >= 10);

// Since we already have at least an extra 8 capacity, calling this...
s.reserve_exact(8);

// ... doesn't actually increase.
assert_eq!(capacity, s.capacity());
```

## String::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve capacity for at least `additional` bytes more than the
current length. The allocator may reserve more space to speculatively
avoid frequent allocations. After calling `try_reserve`, capacity will be
greater than or equal to `self.len() + additional` if it returns
`Ok(())`. Does nothing if capacity is already sufficient. This method
preserves the contents even if an error occurs.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::TryReserveError;

fn process_data(data: &str) -> Result<String, TryReserveError> {
    let mut output = String::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.push_str(data);

    Ok(output)
}
```

## String::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve the minimum capacity for at least `additional` bytes
more than the current length. Unlike `try_reserve`, this will not
deliberately over-allocate to speculatively avoid frequent allocations.
After calling `try_reserve_exact`, capacity will be greater than or
equal to `self.len() + additional` if it returns `Ok(())`.
Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer `try_reserve` if future insertions are expected.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::TryReserveError;

fn process_data(data: &str) -> Result<String, TryReserveError> {
    let mut output = String::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve_exact(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.push_str(data);

    Ok(output)
}
```

## String::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of this `String` to match its length.

# Examples

```rust
let mut s = String::from("foo");

s.reserve(100);
assert!(s.capacity() >= 100);

s.shrink_to_fit();
assert_eq!(3, s.capacity());
```

## String::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Shrinks the capacity of this `String` with a lower bound.

The capacity will remain at least as large as both the length
and the supplied value.

If the current capacity is less than the lower limit, this is a no-op.

# Examples

```rust
let mut s = String::from("foo");

s.reserve(100);
assert!(s.capacity() >= 100);

s.shrink_to(10);
assert!(s.capacity() >= 10);
s.shrink_to(0);
assert!(s.capacity() >= 3);
```

## String::push

```rust
pub fn push(&mut self, ch: char)
```

Appends the given `char` to the end of this `String`.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut s = String::from("abc");

s.push('1');
s.push('2');
s.push('3');

assert_eq!("abc123", s);
```
