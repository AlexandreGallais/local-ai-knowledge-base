# core::io::seek

## trait Seek

```rust
pub trait Seek
```

The `Seek` trait provides a cursor which can be moved within a stream of
bytes.

The stream typically has a fixed size, allowing seeking relative to either
end or the current offset.

# Examples

`File`s implement `Seek`:

```no_run
use std::io;
use std::io::prelude::*;
use std::fs::File;
use std::io::SeekFrom;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;

    // move the cursor 42 bytes from the start of the file
    f.seek(SeekFrom::Start(42))?;
    Ok(())
}
```

## Seek::seek

```rust
fn seek(&mut self, pos: SeekFrom) -> Result<u64>
```

Seek to an offset, in bytes, in a stream.

A seek beyond the end of a stream is allowed, but behavior is defined
by the implementation.

If the seek operation completed successfully,
this method returns the new position from the start of the stream.
That position can be used later with [`SeekFrom::Start`].

# Errors

Seeking can fail, for example because it might involve flushing a buffer.

Seeking to a negative offset is considered an error.

## Seek::rewind

```rust
fn rewind(&mut self) -> Result<()>
```

Rewind to the beginning of a stream.

This is a convenience method, equivalent to `seek(SeekFrom::Start(0))`.

# Errors

Rewinding can fail, for example because it might involve flushing a buffer.

# Example

```no_run
use std::io::{Read, Seek, Write};
use std::fs::OpenOptions;

let mut f = OpenOptions::new()
    .write(true)
    .read(true)
    .create(true)
    .open("foo.txt")?;

let hello = "Hello!\n";
write!(f, "{hello}")?;
f.rewind()?;

let mut buf = String::new();
f.read_to_string(&mut buf)?;
assert_eq!(&buf, hello);
# std::io::Result::Ok(())
```

## Seek::stream_position

```rust
fn stream_position(&mut self) -> Result<u64>
```

Returns the current seek position from the start of the stream.

This is equivalent to `self.seek(SeekFrom::Current(0))`.

# Example

```no_run
use std::{
    io::{self, BufRead, BufReader, Seek},
    fs::File,
};

fn main() -> io::Result<()> {
    let mut f = BufReader::new(File::open("foo.txt")?);

    let before = f.stream_position()?;
    f.read_line(&mut String::new())?;
    let after = f.stream_position()?;

    println!("The first line was {} bytes long", after - before);
    Ok(())
}
```

## Seek::seek_relative

```rust
fn seek_relative(&mut self, offset: i64) -> Result<()>
```

Seeks relative to the current position.

This is equivalent to `self.seek(SeekFrom::Current(offset))` but
doesn't return the new position which can allow some implementations
such as `BufReader` to perform more efficient seeks.

# Example

```no_run
use std::{
    io::{self, Seek},
    fs::File,
};

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    f.seek_relative(10)?;
    assert_eq!(f.stream_position()?, 10);
    Ok(())
}
```

## enum SeekFrom

```rust
pub enum SeekFrom
```

Enumeration of possible methods to seek within an I/O object.

It is used by the [`Seek`] trait.