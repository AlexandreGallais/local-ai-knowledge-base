# alloc::io::buffered::linewriter

## struct LineWriter

```rust
pub struct LineWriter<W: ?Sized + Write>
```

Wraps a writer and buffers output to it, flushing whenever a newline
(`0x0a`, `'\n'`) is detected.

The [`BufWriter`] struct wraps a writer and buffers its output.
But it only does this batched write when it goes out of scope, or when the
internal buffer is full. Sometimes, you'd prefer to write each line as it's
completed, rather than the entire buffer at once. Enter `LineWriter`. It
does exactly that.

Like [`BufWriter`], a `LineWriter`’s buffer will also be flushed when the
`LineWriter` goes out of scope or when its internal buffer is full.

If there's still a partial line in the buffer when the `LineWriter` is
dropped, it will flush those contents.

# Examples

We can use `LineWriter` to write one line at a time, significantly
reducing the number of actual writes to the file.

```no_run
use std::fs::{self, File};
use std::io::prelude::*;
use std::io::LineWriter;

fn main() -> std::io::Result<()> {
    let road_not_taken = b"I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I -
I took the one less traveled by,
And that has made all the difference.";

    let file = File::create("poem.txt")?;
    let mut file = LineWriter::new(file);

    file.write_all(b"I shall be telling this with a sigh")?;

    // No bytes are written until a newline is encountered (or
    // the internal buffer is filled).
    assert_eq!(fs::read_to_string("poem.txt")?, "");
    file.write_all(b"\n")?;
    assert_eq!(
        fs::read_to_string("poem.txt")?,
        "I shall be telling this with a sigh\n",
    );

    // Write the rest of the poem.
    file.write_all(b"Somewhere ages and ages hence:
Two roads diverged in a wood, and I -
I took the one less traveled by,
And that has made all the difference.")?;

    // The last line of the poem doesn't end in a newline, so
    // we have to flush or drop the `LineWriter` to finish
    // writing.
    file.flush()?;

    // Confirm the whole poem was written.
    assert_eq!(fs::read("poem.txt")?, &road_not_taken[..]);
    Ok(())
}
```

## LineWriter::new

```rust
pub fn new(inner: W) -> LineWriter<W>
```

Creates a new `LineWriter`.

# Examples

```no_run
use std::fs::File;
use std::io::LineWriter;

fn main() -> std::io::Result<()> {
    let file = File::create("poem.txt")?;
    let file = LineWriter::new(file);
    Ok(())
}
```

## LineWriter::with_capacity

```rust
pub fn with_capacity(capacity: usize, inner: W) -> LineWriter<W>
```

Creates a new `LineWriter` with at least the specified capacity for the
internal buffer.

# Examples

```no_run
use std::fs::File;
use std::io::LineWriter;

fn main() -> std::io::Result<()> {
    let file = File::create("poem.txt")?;
    let file = LineWriter::with_capacity(100, file);
    Ok(())
}
```

## LineWriter::get_mut

```rust
pub fn get_mut(&mut self) -> &mut W
```

Gets a mutable reference to the underlying writer.

Caution must be taken when calling methods on the mutable reference
returned as extra writes could corrupt the output stream.

# Examples

```no_run
use std::fs::File;
use std::io::LineWriter;

fn main() -> std::io::Result<()> {
    let file = File::create("poem.txt")?;
    let mut file = LineWriter::new(file);

    // we can use reference just like file
    let reference = file.get_mut();
    Ok(())
}
```

## LineWriter::into_inner

```rust
pub fn into_inner(self) -> Result<W, IntoInnerError<LineWriter<W>>>
```

Unwraps this `LineWriter`, returning the underlying writer.

The internal buffer is written out before returning the writer.

# Errors

An [`Err`] will be returned if an error occurs while flushing the buffer.

# Examples

```no_run
use std::fs::File;
use std::io::LineWriter;

fn main() -> std::io::Result<()> {
    let file = File::create("poem.txt")?;

    let writer: LineWriter<File> = LineWriter::new(file);

    let file: File = writer.into_inner()?;
    Ok(())
}
```

## LineWriter::get_ref

```rust
pub fn get_ref(&self) -> &W
```

Gets a reference to the underlying writer.

# Examples

```no_run
use std::fs::File;
use std::io::LineWriter;

fn main() -> std::io::Result<()> {
    let file = File::create("poem.txt")?;
    let file = LineWriter::new(file);

    let reference = file.get_ref();
    Ok(())
}
```