# core::io::write

## trait Write

```rust
pub trait Write
```

A trait for objects which are byte-oriented sinks.

Implementors of the `Write` trait are sometimes called 'writers'.

Writers are defined by two required methods, [`write`] and [`flush`]:

* The [`write`] method will attempt to write some data into the object,
  returning how many bytes were successfully written.

* The [`flush`] method is useful for adapters and explicit buffers
  themselves for ensuring that all buffered data has been pushed out to the
  'true sink'.

Writers are intended to be composable with one another. Many implementors
throughout [`std::io`] take and provide types which implement the `Write`
trait.

[`write`]: Write::write
[`flush`]: Write::flush
[`std::io`]: crate::io

# Examples

```no_run
use std::io::prelude::*;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let data = b"some bytes";

    let mut pos = 0;
    let mut buffer = File::create("foo.txt")?;

    while pos < data.len() {
        let bytes_written = buffer.write(&data[pos..])?;
        pos += bytes_written;
    }
    Ok(())
}
```

The trait also provides convenience methods like [`write_all`], which calls
`write` in a loop until its entire input has been written.

[`write_all`]: Write::write_all

## Write::write

```rust
fn write(&mut self, buf: &[u8]) -> Result<usize>
```

Writes a buffer into this writer, returning how many bytes were written.

This function will attempt to write the entire contents of `buf`, but
the entire write might not succeed, or the write may also generate an
error. Typically, a call to `write` represents one attempt to write to
any wrapped object.

Calls to `write` are not guaranteed to block waiting for data to be
written, and a write which would otherwise block can be indicated through
an [`Err`] variant.

If this method consumed `n > 0` bytes of `buf` it must return [`Ok(n)`].
If the return value is `Ok(n)` then `n` must satisfy `n <= buf.len()`.
A return value of `Ok(0)` typically means that the underlying object is
no longer able to accept bytes and will likely not be able to in the
future as well, or that the buffer provided is empty.

# Errors

Each call to `write` may generate an I/O error indicating that the
operation could not be completed. If an error is returned then no bytes
in the buffer were written to this writer.

It is **not** considered an error if the entire buffer could not be
written to this writer.

An error of the [`ErrorKind::Interrupted`] kind is non-fatal and the
write operation should be retried if there is nothing else to do.

[`ErrorKind::Interrupted`]: crate::io::ErrorKind::Interrupted

# Examples

```no_run
use std::io::prelude::*;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut buffer = File::create("foo.txt")?;

    // Writes some prefix of the byte string, not necessarily all of it.
    buffer.write(b"some bytes")?;
    Ok(())
}
```

[`Ok(n)`]: Ok

## Write::write_vectored

```rust
fn write_vectored(&mut self, bufs: &[IoSlice<'_>]) -> Result<usize>
```

Like [`write`], except that it writes from a slice of buffers.

Data is copied from each buffer in order, with the final buffer
read from possibly being only partially consumed. This method must
behave as a call to [`write`] with the buffers concatenated would.

The default implementation calls [`write`] with either the first nonempty
buffer provided, or an empty one if none exists.

# Examples

```no_run
use std::io::IoSlice;
use std::io::prelude::*;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let data1 = [1; 8];
    let data2 = [15; 8];
    let io_slice1 = IoSlice::new(&data1);
    let io_slice2 = IoSlice::new(&data2);

    let mut buffer = File::create("foo.txt")?;

    // Writes some prefix of the byte string, not necessarily all of it.
    buffer.write_vectored(&[io_slice1, io_slice2])?;
    Ok(())
}
```

[`write`]: Write::write

## Write::flush

```rust
fn flush(&mut self) -> Result<()>
```

Flushes this output stream, ensuring that all intermediately buffered
contents reach their destination.

# Errors

It is considered an error if not all bytes could be written due to
I/O errors or EOF being reached.

# Examples

```no_run
use std::io::prelude::*;
use std::io::BufWriter;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut buffer = BufWriter::new(File::create("foo.txt")?);

    buffer.write_all(b"some bytes")?;
    buffer.flush()?;
    Ok(())
}
```

## Write::write_all

```rust
fn write_all(&mut self, mut buf: &[u8]) -> Result<()>
```

Attempts to write an entire buffer into this writer.

This method will continuously call [`write`] until there is no more data
to be written or an error of non-[`ErrorKind::Interrupted`] kind is
returned. This method will not return until the entire buffer has been
successfully written or such an error occurs. The first error that is
not of [`ErrorKind::Interrupted`] kind generated from this method will be
returned.

[`ErrorKind::Interrupted`]: crate::io::ErrorKind::Interrupted

If the buffer contains no data, this will never call [`write`].

# Errors

This function will return the first error of
non-[`ErrorKind::Interrupted`] kind that [`write`] returns.

[`write`]: Write::write

# Examples

```no_run
use std::io::prelude::*;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut buffer = File::create("foo.txt")?;

    buffer.write_all(b"some bytes")?;
    Ok(())
}
```

## Write::write_fmt

```rust
fn write_fmt(&mut self, args: fmt::Arguments<'_>) -> Result<()>
```

Writes a formatted string into this writer, returning any error
encountered.

This method is primarily used to interface with the
[`format_args!()`] macro, and it is rare that this should
explicitly be called. The [`write!()`] macro should be favored to
invoke this method instead.

This function internally uses the [`write_all`] method on
this trait and hence will continuously write data so long as no errors
are received. This also means that partial writes are not indicated in
this signature.

[`write_all`]: Write::write_all

# Errors

This function will return any I/O error reported while formatting.

# Examples

```no_run
use std::io::prelude::*;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut buffer = File::create("foo.txt")?;

    // this call
    write!(buffer, "{:.*}", 2, 1.234567)?;
    // turns into this:
    buffer.write_fmt(format_args!("{:.*}", 2, 1.234567))?;
    Ok(())
}
```

## Write::by_ref

```rust
fn by_ref(&mut self) -> &mut Self where Self: Sized,
```

Creates a "by reference" adapter for this instance of `Write`.

The returned adapter also implements `Write` and will simply borrow this
current writer.

# Examples

```no_run
use std::io::Write;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut buffer = File::create("foo.txt")?;

    let reference = buffer.by_ref();

    // we can use reference just like our original buffer
    reference.write_all(b"some bytes")?;
    Ok(())
}
```