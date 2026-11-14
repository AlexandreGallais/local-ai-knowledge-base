---
title: "core::str::lossy"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/str/lossy.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::str::lossy

## u8::utf8_chunks

```rust
pub fn utf8_chunks(&self) -> Utf8Chunks<'_>
```

Creates an iterator over the contiguous valid UTF-8 ranges of this
slice, and the non-UTF-8 fragments in between.

See the `Utf8Chunk` type for documentation of the items yielded by this iterator.

# Examples

This function formats arbitrary but mostly-UTF-8 bytes into Rust source
code in the form of a C-string literal (`c"..."`).

```rust
use std::fmt::Write as _;

pub fn cstr_literal(bytes: &[u8]) -> String {
    let mut repr = String::new();
    repr.push_str("c\"");
    for chunk in bytes.utf8_chunks() {
        for ch in chunk.valid().chars() {
            // Escapes \0, \t, \r, \n, \\, \', \", and uses \u{...} for non-printable characters.
            write!(repr, "{}", ch.escape_debug()).unwrap();
        }
        for byte in chunk.invalid() {
            write!(repr, "\\x{:02X}", byte).unwrap();
        }
    }
    repr.push('"');
    repr
}

fn main() {
    let lit = cstr_literal(b"\xferris the \xf0\x9f\xa6\x80\x07");
    let expected = stringify!(c"\xFErris the 🦀\u{7}");
    assert_eq!(lit, expected);
}
```

## struct Utf8Chunk

```rust
pub struct Utf8Chunk<'a>
```

An item returned by the `Utf8Chunks` iterator.

A `Utf8Chunk` stores a sequence of `u8` up to the first broken character
when decoding a UTF-8 string.

# Examples

```rust
// An invalid UTF-8 string
let bytes = b"foo\xF1\x80bar";

// Decode the first `Utf8Chunk`
let chunk = bytes.utf8_chunks().next().unwrap();

// The first three characters are valid UTF-8
assert_eq!("foo", chunk.valid());

// The fourth character is broken
assert_eq!(b"\xF1\x80", chunk.invalid());
```

## Utf8Chunk::valid

```rust
pub fn valid(&self) -> &'a str
```

Returns the next validated UTF-8 substring.

This substring can be empty at the start of the string or between
broken UTF-8 characters.

## Utf8Chunk::invalid

```rust
pub fn invalid(&self) -> &'a [u8]
```

Returns the invalid sequence that caused a failure.

The returned slice will have a maximum length of 3 and starts after the
substring given by `valid`. Decoding will resume after this sequence.

If empty, this is the last chunk in the string. If non-empty, an
unexpected byte was encountered or the end of the input was reached
unexpectedly.

Lossy decoding would replace this sequence with `U+FFFD REPLACEMENT
CHARACTER`.

## struct Utf8Chunks

```rust
pub struct Utf8Chunks<'a>
```

An iterator used to decode a slice of mostly UTF-8 bytes to string slices
(`&str`) and byte slices (`&[u8]`).

This struct is created by the `utf8_chunks` method on bytes slices.
If you want a simple conversion from UTF-8 byte slices to string slices,
`from_utf8` is easier to use.

See the `Utf8Chunk` type for documentation of the items yielded by this iterator.

# Examples

This can be used to create functionality similar to
`String::from_utf8_lossy` without allocating heap memory:

```rust
fn from_utf8_lossy<F>(input: &[u8], mut push: F) where F: FnMut(&str) {
    for chunk in input.utf8_chunks() {
        push(chunk.valid());

        if !chunk.invalid().is_empty() {
            push("\u{FFFD}");
        }
    }
}
```
