---
title: "alloc::io::buf_read"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/buf_read.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::buf_read

## trait BufRead

```rust
pub trait BufRead: Read
```

A `BufRead` is a type of `Read`er which has an internal buffer, allowing it
to perform extra ways of reading.

For example, reading line-by-line is inefficient without using a buffer, so
if you want to read by line, you'll need `BufRead`, which includes a
`read_line` method as well as a `lines` iterator.

# Examples

A locked standard input implements `BufRead`:

```rust
use std::io;
use std::io::prelude::*;

let stdin = io::stdin();
for line in stdin.lock().lines() {
    println!("{}", line?);
}
```

If you have something that implements `Read`, you can use the `BufReader`
type to turn it into a `BufRead`.

For example, `File` implements `Read`, but not `BufRead`.
`BufReader` to the rescue!

```rust
use std::io::{self, BufReader};
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;
    let f = BufReader::new(f);

    for line in f.lines() {
        let line = line?;
        println!("{line}");
    }

    Ok(())
}
```

## BufRead::fill_buf

```rust
fn fill_buf(&mut self) -> Result<&[u8]>
```

Returns the contents of the internal buffer, filling it with more data, via `Read` methods, if empty.

This is a lower-level method and is meant to be used together with `consume`,
which can be used to mark bytes that should not be returned by subsequent calls to `read`.

Returns an empty buffer when the stream has reached EOF.

# Errors

This function will return an I/O error if a `Read` method was called, but returned an error.

# Examples

A locked standard input implements `BufRead`:

```rust
use std::io;
use std::io::prelude::*;

let stdin = io::stdin();
let mut stdin = stdin.lock();

let buffer = stdin.fill_buf()?;

// work with buffer
println!("{buffer:?}");

// mark the bytes we worked with as read
let length = buffer.len();
stdin.consume(length);
```

## BufRead::consume

```rust
fn consume(&mut self, amount: usize)
```

Marks the given `amount` of additional bytes from the internal buffer as having been read.
Subsequent calls to `read` only return bytes that have not been marked as read.

This is a lower-level method and is meant to be used together with `fill_buf`,
which can be used to fill the internal buffer via `Read` methods.

It is a logic error if `amount` exceeds the number of unread bytes in the internal buffer, which is returned by `fill_buf`.

# Examples

Since `consume()` is meant to be used with `fill_buf`,
that method's example includes an example of `consume()`.

## BufRead::read_until

```rust
fn read_until(&mut self, byte: u8, buf: &mut Vec<u8>) -> Result<usize>
```

Reads all bytes into `buf` until the delimiter `byte` or EOF is reached.

This function will read bytes from the underlying stream until the
delimiter or EOF is found. Once found, all bytes up to, and including,
the delimiter (if found) will be appended to `buf`.

If successful, this function will return the total number of bytes read.

This function is blocking and should be used carefully: it is possible for
an attacker to continuously send bytes without ever sending the delimiter
or EOF.

# Errors

This function will ignore all instances of `ErrorKind::Interrupted` and
will otherwise return any errors returned by `fill_buf`.

If an I/O error is encountered then all bytes read so far will be
present in `buf` and its length will have been adjusted appropriately.

# Examples

`std::io::Cursor``Cursor` is a type that implements `BufRead`. In
this example, we use `Cursor` to read all the bytes in a byte slice
in hyphen delimited segments:

```rust
use std::io::{self, BufRead};

let mut cursor = io::Cursor::new(b"lorem-ipsum");
let mut buf = vec![];

// cursor is at 'l'
let num_bytes = cursor.read_until(b'-', &mut buf)
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 6);
assert_eq!(buf, b"lorem-");
buf.clear();

// cursor is at 'i'
let num_bytes = cursor.read_until(b'-', &mut buf)
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 5);
assert_eq!(buf, b"ipsum");
buf.clear();

// cursor is at EOF
let num_bytes = cursor.read_until(b'-', &mut buf)
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 0);
assert_eq!(buf, b"");
```

## BufRead::skip_until

```rust
fn skip_until(&mut self, byte: u8) -> Result<usize>
```

Skips all bytes until the delimiter `byte` or EOF is reached.

This function will read (and discard) bytes from the underlying stream until the
delimiter or EOF is found.

If successful, this function will return the total number of bytes read,
including the delimiter byte if found.

This is useful for efficiently skipping data such as NUL-terminated strings
in binary file formats without buffering.

This function is blocking and should be used carefully: it is possible for
an attacker to continuously send bytes without ever sending the delimiter
or EOF.

# Errors

This function will ignore all instances of `ErrorKind::Interrupted` and
will otherwise return any errors returned by `fill_buf`.

If an I/O error is encountered then all bytes read so far will be
present in `buf` and its length will have been adjusted appropriately.

# Examples

`std::io::Cursor``Cursor` is a type that implements `BufRead`. In
this example, we use `Cursor` to read some NUL-terminated information
about Ferris from a binary string, skipping the fun fact:

```rust
use std::io::{self, BufRead};

let mut cursor = io::Cursor::new(b"Ferris\0Likes long walks on the beach\0Crustacean\0!");

// read name
let mut name = Vec::new();
let num_bytes = cursor.read_until(b'\0', &mut name)
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 7);
assert_eq!(name, b"Ferris\0");

// skip fun fact
let num_bytes = cursor.skip_until(b'\0')
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 30);

// read animal type
let mut animal = Vec::new();
let num_bytes = cursor.read_until(b'\0', &mut animal)
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 11);
assert_eq!(animal, b"Crustacean\0");

// reach EOF
let num_bytes = cursor.skip_until(b'\0')
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 1);
```

## BufRead::read_line

```rust
fn read_line(&mut self, buf: &mut String) -> Result<usize>
```

Reads all bytes until a newline (the `0xA` byte) is reached, and append
them to the provided `String` buffer.

Previous content of the buffer will be preserved. To avoid appending to
the buffer, you need to `clear` it first.

This function will read bytes from the underlying stream until the
newline delimiter (the `0xA` byte) or EOF is found. Once found, all bytes
up to, and including, the delimiter (if found) will be appended to
`buf`.

If successful, this function will return the total number of bytes read.

If this function returns `Ok(0)`, the stream has reached EOF.

This function is blocking and should be used carefully: it is possible for
an attacker to continuously send bytes without ever sending a newline
or EOF. You can use `take` to limit the maximum number of bytes read.

# Errors

This function has the same error semantics as `read_until` and will
also return an error if the read bytes are not valid UTF-8. If an I/O
error is encountered then `buf` may contain some bytes already read in
the event that all data read so far was valid UTF-8.

# Examples

`std::io::Cursor``Cursor` is a type that implements `BufRead`. In
this example, we use `Cursor` to read all the lines in a byte slice:

```rust
use std::io::{self, BufRead};

let mut cursor = io::Cursor::new(b"foo\nbar");
let mut buf = String::new();

// cursor is at 'f'
let num_bytes = cursor.read_line(&mut buf)
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 4);
assert_eq!(buf, "foo\n");
buf.clear();

// cursor is at 'b'
let num_bytes = cursor.read_line(&mut buf)
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 3);
assert_eq!(buf, "bar");
buf.clear();

// cursor is at EOF
let num_bytes = cursor.read_line(&mut buf)
    .expect("reading from cursor won't fail");
assert_eq!(num_bytes, 0);
assert_eq!(buf, "");
```

## BufRead::split

```rust
fn split(self, byte: u8) -> Split<Self> where Self: Sized,
```

Returns an iterator over the contents of this reader split on the byte
`byte`.

The iterator returned from this function will return instances of
<code>[io::Result]<[Vec]\<u8>></code>. Each vector returned will *not* have
the delimiter byte at the end.

This function will yield errors whenever `read_until` would have
also yielded an error.

# Examples

`std::io::Cursor``Cursor` is a type that implements `BufRead`. In
this example, we use `Cursor` to iterate over all hyphen delimited
segments in a byte slice

```rust
use std::io::{self, BufRead};

let cursor = io::Cursor::new(b"lorem-ipsum-dolor");

let mut split_iter = cursor.split(b'-').map(|l| l.unwrap());
assert_eq!(split_iter.next(), Some(b"lorem".to_vec()));
assert_eq!(split_iter.next(), Some(b"ipsum".to_vec()));
assert_eq!(split_iter.next(), Some(b"dolor".to_vec()));
assert_eq!(split_iter.next(), None);
```

## BufRead::lines

```rust
fn lines(self) -> Lines<Self> where Self: Sized,
```

Returns an iterator over the lines of this reader.

The iterator returned from this function will yield instances of
<code>[io::Result]<[String]></code>. Each string returned will *not* have a newline
byte (the `0xA` byte) or `CRLF` (`0xD`, `0xA` bytes) at the end.

# Examples

`std::io::Cursor``Cursor` is a type that implements `BufRead`. In
this example, we use `Cursor` to iterate over all the lines in a byte
slice.

```rust
use std::io::{self, BufRead};

let cursor = io::Cursor::new(b"lorem\nipsum\r\ndolor");

let mut lines_iter = cursor.lines().map(|l| l.unwrap());
assert_eq!(lines_iter.next(), Some(String::from("lorem")));
assert_eq!(lines_iter.next(), Some(String::from("ipsum")));
assert_eq!(lines_iter.next(), Some(String::from("dolor")));
assert_eq!(lines_iter.next(), None);
```

# Errors

Each line of the iterator has the same error semantics as `BufRead::read_line`.
