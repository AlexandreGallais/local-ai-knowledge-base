# core::str::error

Defines utf8 error type.

## struct Utf8Error

```rust
pub struct Utf8Error
```

Errors which can occur when attempting to interpret a sequence of [`u8`]
as a string.

As such, the `from_utf8` family of functions and methods for both [`String`]s
and [`&str`]s make use of this error, for example.

[`String`]: ../../std/string/struct.String.html#method.from_utf8
[`&str`]: super::from_utf8

# Examples

This error type’s methods can be used to create functionality
similar to `String::from_utf8_lossy` without allocating heap memory:

```
fn from_utf8_lossy<F>(mut input: &[u8], mut push: F) where F: FnMut(&str) {
    loop {
        match std::str::from_utf8(input) {
            Ok(valid) => {
                push(valid);
                break
            }
            Err(error) => {
                let (valid, after_valid) = input.split_at(error.valid_up_to());
                unsafe {
                    push(std::str::from_utf8_unchecked(valid))
                }
                push("\u{FFFD}");

                if let Some(invalid_sequence_length) = error.error_len() {
                    input = &after_valid[invalid_sequence_length..]
                } else {
                    break
                }
            }
        }
    }
}
```

## Utf8Error::valid_up_to

```rust
pub const fn valid_up_to(&self) -> usize
```

Returns the index in the given string up to which valid UTF-8 was
verified.

It is the maximum index such that `from_utf8(&input[..index])`
would return `Ok(_)`.

# Examples

Basic usage:

```
use std::str;

// some invalid bytes, in a vector
let sparkle_heart = vec![0, 159, 146, 150];

// std::str::from_utf8 returns a Utf8Error
let error = str::from_utf8(&sparkle_heart).unwrap_err();

// the second byte is invalid here
assert_eq!(1, error.valid_up_to());
```

## Utf8Error::error_len

```rust
pub const fn error_len(&self) -> Option<usize>
```

Provides more information about the failure:

* `None`: the end of the input was reached unexpectedly.
  `self.valid_up_to()` is 1 to 3 bytes from the end of the input.
  If a byte stream (such as a file or a network socket) is being decoded incrementally,
  this could be a valid `char` whose UTF-8 byte sequence is spanning multiple chunks.

* `Some(len)`: an unexpected byte was encountered.
  The length provided is that of the invalid byte sequence
  that starts at the index given by `valid_up_to()`.
  Decoding should resume after that sequence
  (after inserting a [`U+FFFD REPLACEMENT CHARACTER`][U+FFFD]) in case of
  lossy decoding.

[U+FFFD]: ../../std/char/constant.REPLACEMENT_CHARACTER.html

## ::ParseBoolError

```rust
pub struct ParseBoolError
```

An error returned when parsing a `bool` using [`from_str`] fails

[`from_str`]: super::FromStr::from_str