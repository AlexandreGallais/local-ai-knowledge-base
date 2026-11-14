# alloc::string

A UTF-8–encoded, growable string.

This module contains the [`String`] type, the [`ToString`] trait for
converting to strings, and several error types that may result from
working with [`String`]s.

# Examples

There are multiple ways to create a new [`String`] from a string literal:

```
let s = "Hello".to_string();

let s = String::from("world");
let s: String = "also this".into();
```

You can create a new [`String`] from an existing one by concatenating with
`+`:

```
let s = "Hello".to_string();

let message = s + " world!";
```

If you have a vector of valid UTF-8 bytes, you can make a [`String`] out of
it. You can do the reverse too.

```
let sparkle_heart = vec![240, 159, 146, 150];

// We know these bytes are valid, so we'll use `unwrap()`.
let sparkle_heart = String::from_utf8(sparkle_heart).unwrap();

assert_eq!("💖", sparkle_heart);

let bytes = sparkle_heart.into_bytes();

assert_eq!(bytes, [240, 159, 146, 150]);
```

## struct String

```rust
pub struct String
```

A UTF-8–encoded, growable string.

`String` is the most common string type. It has ownership over the contents
of the string, stored in a heap-allocated buffer (see [Representation](#representation)).
It is closely related to its borrowed counterpart, the primitive [`str`].

# Examples

You can create a `String` from [a literal string][`&str`] with [`String::from`]:

[`String::from`]: From::from

```
let hello = String::from("Hello, world!");
```

You can append a [`char`] to a `String` with the [`push`] method, and
append a [`&str`] with the [`push_str`] method:

```
let mut hello = String::from("Hello, ");

hello.push('w');
hello.push_str("orld!");
```

[`push`]: String::push
[`push_str`]: String::push_str

If you have a vector of UTF-8 bytes, you can create a `String` from it with
the [`from_utf8`] method:

```
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

// We know these bytes are valid, so we'll use `unwrap()`.
let sparkle_heart = String::from_utf8(sparkle_heart).unwrap();

assert_eq!("💖", sparkle_heart);
```

[`from_utf8`]: String::from_utf8

# UTF-8

`String`s are always valid UTF-8. If you need a non-UTF-8 string, consider
[`OsString`]. It is similar, but without the UTF-8 constraint. Because UTF-8
is a variable width encoding, `String`s are typically smaller than an array of
the same `char`s:

```
// `s` is ASCII which represents each `char` as one byte
let s = "hello";
assert_eq!(s.len(), 5);

// A `char` array with the same contents would be longer because
// every `char` is four bytes
let s = ['h', 'e', 'l', 'l', 'o'];
let size: usize = s.into_iter().map(|c| size_of_val(&c)).sum();
assert_eq!(size, 20);

// However, for non-ASCII strings, the difference will be smaller
// and sometimes they are the same
let s = "💖💖💖💖💖";
assert_eq!(s.len(), 20);

let s = ['💖', '💖', '💖', '💖', '💖'];
let size: usize = s.into_iter().map(|c| size_of_val(&c)).sum();
assert_eq!(size, 20);
```

This raises interesting questions as to how `s[i]` should work.
What should `i` be here? Several options include byte indices and
`char` indices but, because of UTF-8 encoding, only byte indices
would provide constant time indexing. Getting the `i`th `char`, for
example, is available using [`chars`]:

```
let s = "hello";
let third_character = s.chars().nth(2);
assert_eq!(third_character, Some('l'));

let s = "💖💖💖💖💖";
let third_character = s.chars().nth(2);
assert_eq!(third_character, Some('💖'));
```

Next, what should `s[i]` return? Because indexing returns a reference
to underlying data it could be `&u8`, `&[u8]`, or something similar.
Since we're only providing one index, `&u8` makes the most sense but that
might not be what the user expects and can be explicitly achieved with
[`as_bytes()`]:

```
// The first byte is 104 - the byte value of `'h'`
let s = "hello";
assert_eq!(s.as_bytes()[0], 104);
// or
assert_eq!(s.as_bytes()[0], b'h');

// The first byte is 240 which isn't obviously useful
let s = "💖💖💖💖💖";
assert_eq!(s.as_bytes()[0], 240);
```

Due to these ambiguities/restrictions, indexing with a `usize` is simply
forbidden:

```compile_fail,E0277
let s = "hello";

// The following will not compile!
println!("The first letter of s is {}", s[0]);
```

It is more clear, however, how `&s[i..j]` should work (that is,
indexing with a range). It should accept byte indices (to be constant-time)
and return a `&str` which is UTF-8 encoded. This is also called "string slicing".
Note this will panic if the byte indices provided are not character
boundaries - see [`is_char_boundary`] for more details. See the implementations
for [`SliceIndex<str>`] for more details on string slicing. For a non-panicking
version of string slicing, see [`get`].

[`OsString`]: ../../std/ffi/struct.OsString.html "ffi::OsString"
[`SliceIndex<str>`]: core::slice::SliceIndex
[`as_bytes()`]: str::as_bytes
[`get`]: str::get
[`is_char_boundary`]: str::is_char_boundary

The [`bytes`] and [`chars`] methods return iterators over the bytes and
codepoints of the string, respectively. To iterate over codepoints along
with byte indices, use [`char_indices`].

[`bytes`]: str::bytes
[`chars`]: str::chars
[`char_indices`]: str::char_indices

# Deref

`String` implements <code>[Deref]<Target = [str]></code>, and so inherits all of [`str`]'s
methods. In addition, this means that you can pass a `String` to a
function which takes a [`&str`] by using an ampersand (`&`):

```
fn takes_str(s: &str) { }

let s = String::from("Hello");

takes_str(&s);
```

This will create a [`&str`] from the `String` and pass it in. This
conversion is very inexpensive, and so generally, functions will accept
[`&str`]s as arguments unless they need a `String` for some specific
reason.

In certain cases Rust doesn't have enough information to make this
conversion, known as [`Deref`] coercion. In the following example a string
slice [`&'a str`][`&str`] implements the trait `TraitExample`, and the function
`example_func` takes anything that implements the trait. In this case Rust
would need to make two implicit conversions, which Rust doesn't have the
means to do. For that reason, the following example will not compile.

```compile_fail,E0277
trait TraitExample {}

impl<'a> TraitExample for &'a str {}

fn example_func<A: TraitExample>(example_arg: A) {}

let example_string = String::from("example_string");
example_func(&example_string);
```

There are two options that would work instead. The first would be to
change the line `example_func(&example_string);` to
`example_func(example_string.as_str());`, using the method [`as_str()`]
to explicitly extract the string slice containing the string. The second
way changes `example_func(&example_string);` to
`example_func(&*example_string);`. In this case we are dereferencing a
`String` to a [`str`], then referencing the [`str`] back to
[`&str`]. The second way is more idiomatic, however both work to do the
conversion explicitly rather than relying on the implicit conversion.

# Representation

A `String` is made up of three components: a pointer to some bytes, a
length, and a capacity. The pointer points to the internal buffer which `String`
uses to store its data. The length is the number of bytes currently stored
in the buffer, and the capacity is the size of the buffer in bytes. As such,
the length will always be less than or equal to the capacity.

This buffer is always stored on the heap.

You can look at these with the [`as_ptr`], [`len`], and [`capacity`]
methods:

```
let story = String::from("Once upon a time...");

// Deconstruct the String into parts.
let (ptr, len, capacity) = story.into_raw_parts();

// story has nineteen bytes
assert_eq!(19, len);

// We can re-build a String out of ptr, len, and capacity. This is all
// unsafe because we are responsible for making sure the components are
// valid:
let s = unsafe { String::from_raw_parts(ptr, len, capacity) } ;

assert_eq!(String::from("Once upon a time..."), s);
```

[`as_ptr`]: str::as_ptr
[`len`]: String::len
[`capacity`]: String::capacity

If a `String` has enough capacity, adding elements to it will not
re-allocate. For example, consider this program:

```
let mut s = String::new();

println!("{}", s.capacity());

for _ in 0..5 {
    s.push_str("hello");
    println!("{}", s.capacity());
}
```

This will output the following:

```text
0
8
16
16
32
32
```

At first, we have no memory allocated at all, but as we append to the
string, it increases its capacity appropriately. If we instead use the
[`with_capacity`] method to allocate the correct capacity initially:

```
let mut s = String::with_capacity(25);

println!("{}", s.capacity());

for _ in 0..5 {
    s.push_str("hello");
    println!("{}", s.capacity());
}
```

[`with_capacity`]: String::with_capacity

We end up with a different output:

```text
25
25
25
25
25
25
```

Here, there's no need to allocate more memory inside the loop.

[str]: prim@str "str"
[`str`]: prim@str "str"
[`&str`]: prim@str "&str"
[Deref]: core::ops::Deref "ops::Deref"
[`Deref`]: core::ops::Deref "ops::Deref"
[`as_str()`]: String::as_str

## struct FromUtf8Error

```rust
pub struct FromUtf8Error
```

A possible error value when converting a `String` from a UTF-8 byte vector.

This type is the error type for the [`from_utf8`] method on [`String`]. It
is designed in such a way to carefully avoid reallocations: the
[`into_bytes`] method will give back the byte vector that was used in the
conversion attempt.

[`from_utf8`]: String::from_utf8
[`into_bytes`]: FromUtf8Error::into_bytes

The [`Utf8Error`] type provided by [`std::str`] represents an error that may
occur when converting a slice of [`u8`]s to a [`&str`]. In this sense, it's
an analogue to `FromUtf8Error`, and you can get one from a `FromUtf8Error`
through the [`utf8_error`] method.

[`Utf8Error`]: str::Utf8Error "std::str::Utf8Error"
[`std::str`]: core::str "std::str"
[`&str`]: prim@str "&str"
[`utf8_error`]: FromUtf8Error::utf8_error

# Examples

```
// some invalid bytes, in a vector
let bytes = vec![0, 159];

let value = String::from_utf8(bytes);

assert!(value.is_err());
assert_eq!(vec![0, 159], value.unwrap_err().into_bytes());
```

## struct FromUtf16Error

```rust
pub struct FromUtf16Error
```

A possible error value when converting a `String` from a UTF-16 byte slice.

This type is the error type for the [`from_utf16`] method on [`String`].

[`from_utf16`]: String::from_utf16

# Examples

```
// 𝄞mu<invalid>ic
let v = &[0xD834, 0xDD1E, 0x006d, 0x0075,
          0xD800, 0x0069, 0x0063];

assert!(String::from_utf16(v).is_err());
```

## String::new

```rust
pub const fn new() -> String
```

Creates a new empty `String`.

Given that the `String` is empty, this will not allocate any initial
buffer. While that means that this initial operation is very
inexpensive, it may cause excessive allocation later when you add
data. If you have an idea of how much data the `String` will hold,
consider the [`with_capacity`] method to prevent excessive
re-allocation.

[`with_capacity`]: String::with_capacity

# Examples

```
let s = String::new();
```

## String::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> String
```

Creates a new empty `String` with at least the specified capacity.

`String`s have an internal buffer to hold their data. The capacity is
the length of that buffer, and can be queried with the [`capacity`]
method. This method creates an empty `String`, but one with an initial
buffer that can hold at least `capacity` bytes. This is useful when you
may be appending a bunch of data to the `String`, reducing the number of
reallocations it needs to do.

[`capacity`]: String::capacity

If the given capacity is `0`, no allocation will occur, and this method
is identical to the [`new`] method.

[`new`]: String::new

# Panics

Panics if the capacity exceeds `isize::MAX` _bytes_.

# Examples

```
let mut s = String::with_capacity(10);

// The String contains no chars, even though it has capacity for more
assert_eq!(s.len(), 0);

// These are all done without reallocating...
let cap = s.capacity();
for _ in 0..10 {
    s.push('a');
}

assert_eq!(s.capacity(), cap);

// ...but this may make the string reallocate
s.push('a');
```

## String::from_utf8

```rust
pub fn from_utf8(vec: Vec<u8>) -> Result<String, FromUtf8Error>
```

Converts a vector of bytes to a `String`.

A string ([`String`]) is made of bytes ([`u8`]), and a vector of bytes
([`Vec<u8>`]) is made of bytes, so this function converts between the
two. Not all byte slices are valid `String`s, however: `String`
requires that it is valid UTF-8. `from_utf8()` checks to ensure that
the bytes are valid UTF-8, and then does the conversion.

If you are sure that the byte slice is valid UTF-8, and you don't want
to incur the overhead of the validity check, there is an unsafe version
of this function, [`from_utf8_unchecked`], which has the same behavior
but skips the check.

This method will take care to not copy the vector, for efficiency's
sake.

If you need a [`&str`] instead of a `String`, consider
[`str::from_utf8`].

The inverse of this method is [`into_bytes`].

# Errors

Returns [`Err`] if the slice is not UTF-8 with a description as to why the
provided bytes are not UTF-8. The vector you moved in is also included.

# Examples

Basic usage:

```
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

// We know these bytes are valid, so we'll use `unwrap()`.
let sparkle_heart = String::from_utf8(sparkle_heart).unwrap();

assert_eq!("💖", sparkle_heart);
```

Incorrect bytes:

```
// some invalid bytes, in a vector
let sparkle_heart = vec![0, 159, 146, 150];

assert!(String::from_utf8(sparkle_heart).is_err());
```

See the docs for [`FromUtf8Error`] for more details on what you can do
with this error.

[`from_utf8_unchecked`]: String::from_utf8_unchecked
[`Vec<u8>`]: crate::vec::Vec "Vec"
[`&str`]: prim@str "&str"
[`into_bytes`]: String::into_bytes

## String::from_utf8_lossy

```rust
pub fn from_utf8_lossy(v: &[u8]) -> Cow<'_, str>
```

Converts a slice of bytes to a string, including invalid characters.

Strings are made of bytes ([`u8`]), and a slice of bytes
([`&[u8]`][byteslice]) is made of bytes, so this function converts
between the two. Not all byte slices are valid strings, however: strings
are required to be valid UTF-8. During this conversion,
`from_utf8_lossy()` will replace any invalid UTF-8 sequences with
[`U+FFFD REPLACEMENT CHARACTER`][U+FFFD], which looks like this: �

[byteslice]: prim@slice
[U+FFFD]: char::REPLACEMENT_CHARACTER

If you are sure that the byte slice is valid UTF-8, and you don't want
to incur the overhead of the conversion, there is an unsafe version
of this function, [`from_utf8_unchecked`], which has the same behavior
but skips the checks.

[`from_utf8_unchecked`]: String::from_utf8_unchecked

This function returns a [`Cow<'a, str>`]. If our byte slice is invalid
UTF-8, then we need to insert the replacement characters, which will
change the size of the string, and hence, require a `String`. But if
it's already valid UTF-8, we don't need a new allocation. This return
type allows us to handle both cases.

[`Cow<'a, str>`]: crate::borrow::Cow "borrow::Cow"

# Examples

Basic usage:

```
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

let sparkle_heart = String::from_utf8_lossy(&sparkle_heart);

assert_eq!("💖", sparkle_heart);
```

Incorrect bytes:

```
// some invalid bytes
let input = b"Hello \xF0\x90\x80World";
let output = String::from_utf8_lossy(input);

assert_eq!("Hello �World", output);
```

## String::from_utf8_lossy_owned

```rust
pub fn from_utf8_lossy_owned(v: Vec<u8>) -> String
```

Converts a [`Vec<u8>`] to a `String`, substituting invalid UTF-8
sequences with replacement characters.

See [`from_utf8_lossy`] for more details.

[`from_utf8_lossy`]: String::from_utf8_lossy

Note that this function does not guarantee reuse of the original `Vec`
allocation.

# Examples

Basic usage:

```
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

let sparkle_heart = String::from_utf8_lossy_owned(sparkle_heart);

assert_eq!(String::from("💖"), sparkle_heart);
```

Incorrect bytes:

```
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
returning [`Err`] if `v` contains any invalid data.

# Examples

```
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
replacing invalid data with [the replacement character (`U+FFFD`)][U+FFFD].

Unlike [`from_utf8_lossy`] which returns a [`Cow<'a, str>`],
`from_utf16_lossy` returns a `String` since the UTF-16 to UTF-8
conversion requires a memory allocation.

[`from_utf8_lossy`]: String::from_utf8_lossy
[`Cow<'a, str>`]: crate::borrow::Cow "borrow::Cow"
[U+FFFD]: char::REPLACEMENT_CHARACTER

# Examples

```
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
returning [`Err`] if `v` contains any invalid data.

# Examples

Basic usage:

```
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
invalid data with [the replacement character (`U+FFFD`)][U+FFFD].

Unlike [`from_utf8_lossy`] which returns a [`Cow<'a, str>`],
`from_utf16le_lossy` returns a `String` since the UTF-16 to UTF-8
conversion requires a memory allocation.

[`from_utf8_lossy`]: String::from_utf8_lossy
[`Cow<'a, str>`]: crate::borrow::Cow "borrow::Cow"
[U+FFFD]: char::REPLACEMENT_CHARACTER

# Examples

Basic usage:

```
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
returning [`Err`] if `v` contains any invalid data.

# Examples

Basic usage:

```
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
invalid data with [the replacement character (`U+FFFD`)][U+FFFD].

Unlike [`from_utf8_lossy`] which returns a [`Cow<'a, str>`],
`from_utf16le_lossy` returns a `String` since the UTF-16 to UTF-8
conversion requires a memory allocation.

[`from_utf8_lossy`]: String::from_utf8_lossy
[`Cow<'a, str>`]: crate::borrow::Cow "borrow::Cow"
[U+FFFD]: char::REPLACEMENT_CHARACTER

# Examples

Basic usage:

```
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
the arguments to [`from_raw_parts`].

After calling this function, the caller is responsible for the
memory previously managed by the `String`. The only way to do
this is to convert the raw pointer, length, and capacity back
into a `String` with the [`from_raw_parts`] function, allowing
the destructor to perform the cleanup.

If `capacity == 0`, then `pointer` may be dangling. Otherwise,
it will always be valid for reads and writes over `capacity`
bytes, and point to the start of the string.

[`from_raw_parts`]: String::from_raw_parts

# Examples

```
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

* all safety requirements for [`Vec::<u8>::from_raw_parts`].
* all safety requirements for [`String::from_utf8_unchecked`].

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

```
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

See the safe version, [`from_utf8`], for more details.

[`from_utf8`]: String::from_utf8

# Safety

This function is unsafe because it does not check that the bytes passed
to it are valid UTF-8. If this constraint is violated, it may cause
memory unsafety issues with future users of the `String`, as the rest of
the standard library assumes that `String`s are valid UTF-8.

# Examples

```
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

```
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

```
let s = String::from("foo");

assert_eq!("foo", s.as_str());
```

## String::as_mut_str

```rust
pub const fn as_mut_str(&mut self) -> &mut str
```

Converts a `String` into a mutable string slice.

# Examples

```
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

```
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
bounded on either end and does not lie on a [`char`] boundary, or if the
new capacity exceeds `isize::MAX` bytes.

# Examples

```
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

```
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

```
let mut s = String::new();

s.reserve(10);

assert!(s.capacity() >= 10);
```

This might not actually increase the capacity:

```
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
the current length. Unlike [`reserve`], this will not
deliberately over-allocate to speculatively avoid frequent allocations.
After calling `reserve_exact`, capacity will be greater than or equal to
`self.len() + additional`. Does nothing if the capacity is already
sufficient.

[`reserve`]: String::reserve

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

Basic usage:

```
let mut s = String::new();

s.reserve_exact(10);

assert!(s.capacity() >= 10);
```

This might not actually increase the capacity:

```
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

```
use std::collections::TryReserveError;

fn process_data(data: &str) -> Result<String, TryReserveError> {
    let mut output = String::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.push_str(data);

    Ok(output)
}
# process_data("rust").expect("reserving capacity for 12 bytes should never fail");
```

## String::try_reserve_exact

```rust
pub fn try_reserve_exact(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve the minimum capacity for at least `additional` bytes
more than the current length. Unlike [`try_reserve`], this will not
deliberately over-allocate to speculatively avoid frequent allocations.
After calling `try_reserve_exact`, capacity will be greater than or
equal to `self.len() + additional` if it returns `Ok(())`.
Does nothing if the capacity is already sufficient.

Note that the allocator may give the collection more space than it
requests. Therefore, capacity can not be relied upon to be precisely
minimal. Prefer [`try_reserve`] if future insertions are expected.

[`try_reserve`]: String::try_reserve

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```
use std::collections::TryReserveError;

fn process_data(data: &str) -> Result<String, TryReserveError> {
    let mut output = String::new();

    // Pre-reserve the memory, exiting if we can't
    output.try_reserve_exact(data.len())?;

    // Now we know this can't OOM in the middle of our complex work
    output.push_str(data);

    Ok(output)
}
# process_data("rust").expect("reserving capacity for 12 bytes should never fail");
```

## String::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of this `String` to match its length.

# Examples

```
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

```
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

Appends the given [`char`] to the end of this `String`.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```
let mut s = String::from("abc");

s.push('1');
s.push('2');
s.push('3');

assert_eq!("abc123", s);
```

## String::as_bytes

```rust
pub const fn as_bytes(&self) -> &[u8]
```

Returns a byte slice of this `String`'s contents.

The inverse of this method is [`from_utf8`].

[`from_utf8`]: String::from_utf8

# Examples

```
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

Panics if `new_len` does not lie on a [`char`] boundary.

# Examples

```
let mut s = String::from("hello");

s.truncate(2);

assert_eq!("he", s);
```

## String::pop

```rust
pub fn pop(&mut self) -> Option<char>
```

Removes the last character from the string buffer and returns it.

Returns [`None`] if this `String` is empty.

# Examples

```
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

Removes a [`char`] from this `String` at byte position `idx` and returns it.

Copies all bytes after the removed char to new positions.

Note that calling this in a loop can result in quadratic behavior.

# Panics

Panics if `idx` is larger than or equal to the `String`'s length,
or if it does not lie on a [`char`] boundary.

# Examples

```
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

```
let mut s = String::from("f_o_ob_ar");

s.retain(|c| c != '_');

assert_eq!(s, "foobar");
```

Because the elements are visited exactly once in the original order,
external state may be used to decide which elements to keep.

```
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
lie on a [`char`] boundary.

# Examples

```
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
lie on a [`char`] boundary.

# Examples

```
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

```
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

Returns the length of this `String`, in bytes, not [`char`]s or
graphemes. In other words, it might not be what a human considers the
length of the string.

# Examples

```
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

```
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

```
# fn main() {
let mut hello = String::from("Hello, World!");
let world = hello.split_off(7);
assert_eq!(hello, "Hello, ");
assert_eq!(world, "World!");
# }
```

## String::clear

```rust
pub fn clear(&mut self)
```

Truncates this `String`, removing all contents.

While this means the `String` will have a length of zero, it does not
touch its capacity.

# Examples

```
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
bounded on either end and does not lie on a [`char`] boundary.

# Leaking

If the returned iterator goes out of scope without being dropped (due to
[`core::mem::forget`], for example), the string may still contain a copy
of any drained characters, or may have lost characters arbitrarily,
including characters outside the range.

# Examples

```
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
bounded on either end and does not lie on a [`char`] boundary.

# Examples

```
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

Before doing the conversion, this method discards excess capacity like [`shrink_to_fit`].
Note that this call may reallocate and copy the bytes of the string.

[`shrink_to_fit`]: String::shrink_to_fit
[str]: prim@str "str"

# Examples

```
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
call [`into_boxed_str`], and then [`Box::leak`] instead. However, keep in mind that
trimming the capacity may result in a reallocation and copy.

[`into_boxed_str`]: Self::into_boxed_str

# Examples

```
let x = String::from("bucket");
let static_ref: &'static mut str = x.leak();
assert_eq!(static_ref, "bucket");
# // FIXME(https://github.com/rust-lang/miri/issues/3670):
# // use -Zmiri-disable-leak-check instead of unleaking in tests meant to leak.
# drop(unsafe { Box::from_raw(static_ref) });
```

## FromUtf8Error::as_bytes

```rust
pub fn as_bytes(&self) -> &[u8]
```

Returns a slice of [`u8`]s bytes that were attempted to convert to a `String`.

# Examples

```
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

See [`String::from_utf8_lossy`] for more details on replacement of
invalid sequences, and [`String::from_utf8_lossy_owned`] for the
`String` function which corresponds to this function.

This is useful in conjunction with [`String::from_utf8`] when you need
to branch on whether the bytes are valid UTF-8, but still want to
recover a lossily converted `String` in the error case. Use
[`String::from_utf8_lossy_owned`] if you always need a lossily converted
`String`.

Since the original [`String::from_utf8`] error records where validation
stopped, this method does not need to re-check the already valid prefix
of the byte sequence.

# Examples

```
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

```
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

The [`Utf8Error`] type provided by [`std::str`] represents an error that may
occur when converting a slice of [`u8`]s to a [`&str`]. In this sense, it's
an analogue to `FromUtf8Error`. See its documentation for more details
on using it.

[`std::str`]: core::str "std::str"
[`&str`]: prim@str "&str"

# Examples

```
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

A type alias for [`!`].

This alias exists for backwards compatibility, and may be eventually deprecated.

## trait ToString

```rust
pub trait ToString
```

A trait for converting a value to a `String`.

This trait is automatically implemented for any type which implements the
[`Display`] trait. As such, `ToString` shouldn't be implemented directly:
[`Display`] should be implemented instead, and you get the `ToString`
implementation for free.

[`Display`]: fmt::Display

## ToString::to_string

```rust
fn to_string(&self) -> String
```

Converts the given value to a `String`.

# Examples

```
let i = 5;
let five = String::from("5");

assert_eq!(five, i.to_string());
```

## ::Drain

```rust
pub struct Drain<'a>
```

A draining iterator for `String`.

This struct is created by the [`drain`] method on [`String`]. See its
documentation for more.

[`drain`]: String::drain

## Drain::as_str

```rust
pub fn as_str(&self) -> &str
```

Returns the remaining (sub)string of this iterator as a slice.

# Examples

```
let mut s = String::from("abc");
let mut drain = s.drain(..);
assert_eq!(drain.as_str(), "abc");
let _ = drain.next().unwrap();
assert_eq!(drain.as_str(), "bc");
```