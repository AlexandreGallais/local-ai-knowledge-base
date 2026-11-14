---
title: "alloc::string (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/string.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::string

A UTF-8–encoded, growable string.

This module contains the `String` type, the `ToString` trait for
converting to strings, and several error types that may result from
working with `String`s.

#### Examples

There are multiple ways to create a new `String` from a string literal:

```rust
let s = "Hello".to_string();

let s = String::from("world");
let s: String = "also this".into();
```

You can create a new `String` from an existing one by concatenating with
`+`:

```rust
let s = "Hello".to_string();

let message = s + " world!";
```

If you have a vector of valid UTF-8 bytes, you can make a `String` out of
it. You can do the reverse too.

```rust
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
of the string, stored in a heap-allocated buffer (see Representation).
It is closely related to its borrowed counterpart, the primitive `str`.

# Examples

You can create a `String` from [a literal string]`&str` with `String::from`:

```rust
let hello = String::from("Hello, world!");
```

You can append a `char` to a `String` with the `push` method, and
append a `&str` with the `push_str` method:

```rust
let mut hello = String::from("Hello, ");

hello.push('w');
hello.push_str("orld!");
```

If you have a vector of UTF-8 bytes, you can create a `String` from it with
the `from_utf8` method:

```rust
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

// We know these bytes are valid, so we'll use `unwrap()`.
let sparkle_heart = String::from_utf8(sparkle_heart).unwrap();

assert_eq!("💖", sparkle_heart);
```

# UTF-8

`String`s are always valid UTF-8. If you need a non-UTF-8 string, consider
`OsString`. It is similar, but without the UTF-8 constraint. Because UTF-8
is a variable width encoding, `String`s are typically smaller than an array of
the same `char`s:

```rust
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
example, is available using `chars`:

```rust
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
`as_bytes()`:

```rust
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

```
let s = "hello";

// The following will not compile!
println!("The first letter of s is {}", s[0]);
```rust

It is more clear, however, how `&s[i..j]` should work (that is,
indexing with a range). It should accept byte indices (to be constant-time)
and return a `&str` which is UTF-8 encoded. This is also called "string slicing".
Note this will panic if the byte indices provided are not character
boundaries - see `is_char_boundary` for more details. See the implementations
for `SliceIndex<str>` for more details on string slicing. For a non-panicking
version of string slicing, see `get`.

`OsString`: ../../std/ffi/struct.OsString.html "ffi::OsString"
`SliceIndex<str>`: core::slice::SliceIndex
`as_bytes()`: str::as_bytes
`get`: str::get
`is_char_boundary`: str::is_char_boundary

The `bytes` and `chars` methods return iterators over the bytes and
codepoints of the string, respectively. To iterate over codepoints along
with byte indices, use `char_indices`.

`bytes`: str::bytes
`chars`: str::chars
`char_indices`: str::char_indices

`String` implements <code>[Deref]<Target = [str]></code>, and so inherits all of `str`'s
methods. In addition, this means that you can pass a `String` to a
function which takes a `&str` by using an ampersand (`&`):

```
fn takes_str(s: &str) { }

let s = String::from("Hello");

takes_str(&s);
```rust

This will create a `&str` from the `String` and pass it in. This
conversion is very inexpensive, and so generally, functions will accept
`&str`s as arguments unless they need a `String` for some specific
reason.

In certain cases Rust doesn't have enough information to make this
conversion, known as `Deref` coercion. In the following example a string
slice `&'a str``&str` implements the trait `TraitExample`, and the function
`example_func` takes anything that implements the trait. In this case Rust
would need to make two implicit conversions, which Rust doesn't have the
means to do. For that reason, the following example will not compile.

```
trait TraitExample {}

impl<'a> TraitExample for &'a str {}

fn example_func(example_arg: A) {}

let example_string = String::from("example_string");
example_func(&example_string);
```rust

There are two options that would work instead. The first would be to
change the line `example_func(&example_string);` to
`example_func(example_string.as_str());`, using the method `as_str()`
to explicitly extract the string slice containing the string. The second
way changes `example_func(&example_string);` to
`example_func(&*example_string);`. In this case we are dereferencing a
`String` to a `str`, then referencing the `str` back to
`&str`. The second way is more idiomatic, however both work to do the
conversion explicitly rather than relying on the implicit conversion.

A `String` is made up of three components: a pointer to some bytes, a
length, and a capacity. The pointer points to the internal buffer which `String`
uses to store its data. The length is the number of bytes currently stored
in the buffer, and the capacity is the size of the buffer in bytes. As such,
the length will always be less than or equal to the capacity.

This buffer is always stored on the heap.

You can look at these with the `as_ptr`, `len`, and `capacity`
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
```rust

`as_ptr`: str::as_ptr
`len`: String::len
`capacity`: String::capacity

If a `String` has enough capacity, adding elements to it will not
re-allocate. For example, consider this program:

```
let mut s = String::new();

println!("{}", s.capacity());

for _ in 0..5 {
    s.push_str("hello");
    println!("{}", s.capacity());
}
```rust

This will output the following:

```
0
8
16
16
32
32
```rust

At first, we have no memory allocated at all, but as we append to the
string, it increases its capacity appropriately. If we instead use the
`with_capacity` method to allocate the correct capacity initially:

```
let mut s = String::with_capacity(25);

println!("{}", s.capacity());

for _ in 0..5 {
    s.push_str("hello");
    println!("{}", s.capacity());
}
```rust

`with_capacity`: String::with_capacity

We end up with a different output:

```
25
25
25
25
25
25
```rust

Here, there's no need to allocate more memory inside the loop.

[str]: prim@str "str"
`str`: prim@str "str"
`&str`: prim@str "&str"
[Deref]: core::ops::Deref "ops::Deref"
`Deref`: core::ops::Deref "ops::Deref"
`as_str()`: String::as_str

## struct FromUtf8Error

```rust
pub struct FromUtf8Error
```

A possible error value when converting a `String` from a UTF-8 byte vector.

This type is the error type for the `from_utf8` method on `String`. It
is designed in such a way to carefully avoid reallocations: the
`into_bytes` method will give back the byte vector that was used in the
conversion attempt.

The `Utf8Error` type provided by `std::str` represents an error that may
occur when converting a slice of `u8`s to a `&str`. In this sense, it's
an analogue to `FromUtf8Error`, and you can get one from a `FromUtf8Error`
through the `utf8_error` method.

# Examples

```rust
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

This type is the error type for the `from_utf16` method on `String`.

# Examples

```rust
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
consider the `with_capacity` method to prevent excessive
re-allocation.

# Examples

```rust
let s = String::new();
```

## String::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> String
```

Creates a new empty `String` with at least the specified capacity.

`String`s have an internal buffer to hold their data. The capacity is
the length of that buffer, and can be queried with the `capacity`
method. This method creates an empty `String`, but one with an initial
buffer that can hold at least `capacity` bytes. This is useful when you
may be appending a bunch of data to the `String`, reducing the number of
reallocations it needs to do.

If the given capacity is `0`, no allocation will occur, and this method
is identical to the `new` method.

# Panics

Panics if the capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
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

A string (`String`) is made of bytes (`u8`), and a vector of bytes
(`Vec<u8>`) is made of bytes, so this function converts between the
two. Not all byte slices are valid `String`s, however: `String`
requires that it is valid UTF-8. `from_utf8()` checks to ensure that
the bytes are valid UTF-8, and then does the conversion.

If you are sure that the byte slice is valid UTF-8, and you don't want
to incur the overhead of the validity check, there is an unsafe version
of this function, `from_utf8_unchecked`, which has the same behavior
but skips the check.

This method will take care to not copy the vector, for efficiency's
sake.

If you need a `&str` instead of a `String`, consider
`str::from_utf8`.

The inverse of this method is `into_bytes`.

# Errors

Returns `Err` if the slice is not UTF-8 with a description as to why the
provided bytes are not UTF-8. The vector you moved in is also included.

# Examples

Basic usage:

```rust
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

// We know these bytes are valid, so we'll use `unwrap()`.
let sparkle_heart = String::from_utf8(sparkle_heart).unwrap();

assert_eq!("💖", sparkle_heart);
```

Incorrect bytes:

```rust
// some invalid bytes, in a vector
let sparkle_heart = vec![0, 159, 146, 150];

assert!(String::from_utf8(sparkle_heart).is_err());
```

See the docs for `FromUtf8Error` for more details on what you can do
with this error.

## String::from_utf8_lossy

```rust
pub fn from_utf8_lossy(v: &[u8]) -> Cow<'_, str>
```

Converts a slice of bytes to a string, including invalid characters.

Strings are made of bytes (`u8`), and a slice of bytes
(`&[u8]`) is made of bytes, so this function converts
between the two. Not all byte slices are valid strings, however: strings
are required to be valid UTF-8. During this conversion,
`from_utf8_lossy()` will replace any invalid UTF-8 sequences with
`U+FFFD REPLACEMENT CHARACTER`[U+FFFD], which looks like this: �

If you are sure that the byte slice is valid UTF-8, and you don't want
to incur the overhead of the conversion, there is an unsafe version
of this function, `from_utf8_unchecked`, which has the same behavior
but skips the checks.

This function returns a `Cow<'a, str>`. If our byte slice is invalid
UTF-8, then we need to insert the replacement characters, which will
change the size of the string, and hence, require a `String`. But if
it's already valid UTF-8, we don't need a new allocation. This return
type allows us to handle both cases.

# Examples

Basic usage:

```rust
// some bytes, in a vector
let sparkle_heart = vec![240, 159, 146, 150];

let sparkle_heart = String::from_utf8_lossy(&sparkle_heart);

assert_eq!("💖", sparkle_heart);
```

Incorrect bytes:

```rust
// some invalid bytes
let input = b"Hello \xF0\x90\x80World";
let output = String::from_utf8_lossy(input);

assert_eq!("Hello �World", output);
```
