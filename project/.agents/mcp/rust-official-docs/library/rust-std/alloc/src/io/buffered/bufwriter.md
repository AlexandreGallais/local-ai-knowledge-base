---
title: "alloc::io::buffered::bufwriter"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/buffered/bufwriter.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::buffered::bufwriter

## struct BufWriter

```rust
pub struct BufWriter<W: ?Sized + Write>
```

## BufWriter::new

```rust
pub fn new(inner: W) -> BufWriter<W>
```

Creates a new `BufWriter<W>` with a default buffer capacity. The default is currently 8 KiB,
but may change in the future.

# Examples

```rust
use std::io::BufWriter;
use std::net::TcpStream;

let mut buffer = BufWriter::new(TcpStream::connect("127.0.0.1:34254").unwrap());
```

## BufWriter::with_capacity

```rust
pub fn with_capacity(capacity: usize, inner: W) -> BufWriter<W>
```

Creates a new `BufWriter<W>` with at least the specified buffer capacity.

# Examples

Creating a buffer with a buffer of at least a hundred bytes.

```rust
use std::io::BufWriter;
use std::net::TcpStream;

let stream = TcpStream::connect("127.0.0.1:34254").unwrap();
let mut buffer = BufWriter::with_capacity(100, stream);
```

## BufWriter::into_inner

```rust
pub fn into_inner(mut self) -> Result<W, IntoInnerError<BufWriter<W>>>
```

Unwraps this `BufWriter<W>`, returning the underlying writer.

The buffer is written out before returning the writer.

# Errors

An `Err` will be returned if an error occurs while flushing the buffer.

# Examples

```rust
use std::io::BufWriter;
use std::net::TcpStream;

let mut buffer = BufWriter::new(TcpStream::connect("127.0.0.1:34254").unwrap());

// unwrap the TcpStream and flush the buffer
let stream = buffer.into_inner().unwrap();
```

## BufWriter::into_parts

```rust
pub fn into_parts(self) -> (W, Result<Vec<u8>, WriterPanicked>)
```

Disassembles this `BufWriter<W>`, returning the underlying writer, and any buffered but
unwritten data.

If the underlying writer panicked, it is not known what portion of the data was written.
In this case, we return `WriterPanicked` for the buffered data (from which the buffer
contents can still be recovered).

`into_parts` makes no attempt to flush data and cannot fail.

# Examples

```rust
use std::io::{BufWriter, Write};

let mut buffer = [0u8; 10];
let mut stream = BufWriter::new(buffer.as_mut());
write!(stream, "too much data").unwrap();
stream.flush().expect_err("it doesn't fit");
let (recovered_writer, buffered_data) = stream.into_parts();
assert_eq!(recovered_writer.len(), 0);
assert_eq!(&buffered_data.unwrap(), b"ata");
```

## BufWriter::get_ref

```rust
pub fn get_ref(&self) -> &W
```

Gets a reference to the underlying writer.

# Examples

```rust
use std::io::BufWriter;
use std::net::TcpStream;

let mut buffer = BufWriter::new(TcpStream::connect("127.0.0.1:34254").unwrap());

// we can use reference just like buffer
let reference = buffer.get_ref();
```

## BufWriter::get_mut

```rust
pub fn get_mut(&mut self) -> &mut W
```

Gets a mutable reference to the underlying writer.

It is inadvisable to directly write to the underlying writer.

# Examples

```rust
use std::io::BufWriter;
use std::net::TcpStream;

let mut buffer = BufWriter::new(TcpStream::connect("127.0.0.1:34254").unwrap());

// we can use reference just like buffer
let reference = buffer.get_mut();
```

## BufWriter::buffer

```rust
pub fn buffer(&self) -> &[u8]
```

Returns a reference to the internally buffered data.

# Examples

```rust
use std::io::BufWriter;
use std::net::TcpStream;

let buf_writer = BufWriter::new(TcpStream::connect("127.0.0.1:34254").unwrap());

// See how many bytes are currently buffered
let bytes_buffered = buf_writer.buffer().len();
```

## BufWriter::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the number of bytes the internal buffer can hold without flushing.

# Examples

```rust
use std::io::BufWriter;
use std::net::TcpStream;

let buf_writer = BufWriter::new(TcpStream::connect("127.0.0.1:34254").unwrap());

// Check the capacity of the inner buffer
let capacity = buf_writer.capacity();
// Calculate how many bytes can be written without flushing
let without_flush = capacity - buf_writer.buffer().len();
```

## struct WriterPanicked

```rust
pub struct WriterPanicked
```

Error returned for the buffered data from `BufWriter::into_parts`, when the underlying
writer has previously panicked.  Contains the (possibly partly written) buffered data.

# Example

```rust
use std::io::{self, BufWriter, Write};
use std::panic::{catch_unwind, AssertUnwindSafe};

struct PanickingWriter;
impl Write for PanickingWriter {
  fn write(&mut self, buf: &[u8]) -> io::Result<usize> { panic!() }
  fn flush(&mut self) -> io::Result<()> { panic!() }
}

let mut stream = BufWriter::new(PanickingWriter);
write!(stream, "some data").unwrap();
let result = catch_unwind(AssertUnwindSafe(|| {
    stream.flush().unwrap()
}));
assert!(result.is_err());
let (recovered_writer, buffered_data) = stream.into_parts();
assert!(matches!(recovered_writer, PanickingWriter));
assert_eq!(buffered_data.unwrap_err().into_inner(), b"some data");
```

## WriterPanicked::into_inner

```rust
pub fn into_inner(self) -> Vec<u8>
```

Returns the perhaps-unwritten data.  Some of this data may have been written by the
panicking call(s) to the underlying writer, so simply writing it again is not a good idea.
