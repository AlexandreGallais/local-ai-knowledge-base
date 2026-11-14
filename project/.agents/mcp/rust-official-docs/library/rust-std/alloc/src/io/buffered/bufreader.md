---
title: "alloc::io::buffered::bufreader"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/buffered/bufreader.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::buffered::bufreader

## struct BufReader

```rust
pub struct BufReader<R: ?Sized>
```

# Examples

```rust
use std::io::prelude::*;
use std::io::BufReader;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::open("log.txt")?;
    let mut reader = BufReader::new(f);

    let mut line = String::new();
    let len = reader.read_line(&mut line)?;
    println!("First line is {len} bytes long");
    Ok(())
}
```

## BufReader::new

```rust
pub fn new(inner: R) -> BufReader<R>
```

Creates a new `BufReader<R>` with a default buffer capacity. The default is currently 8 KiB,
but may change in the future.

# Examples

```rust
use std::io::BufReader;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::open("log.txt")?;
    let reader = BufReader::new(f);
    Ok(())
}
```

## BufReader::with_capacity

```rust
pub fn with_capacity(capacity: usize, inner: R) -> BufReader<R>
```

Creates a new `BufReader<R>` with the specified buffer capacity.

# Examples

Creating a buffer with ten bytes of capacity:

```rust
use std::io::BufReader;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::open("log.txt")?;
    let reader = BufReader::with_capacity(10, f);
    Ok(())
}
```

## BufReader::get_ref

```rust
pub fn get_ref(&self) -> &R
```

Gets a reference to the underlying reader.

It is inadvisable to directly read from the underlying reader.

# Examples

```rust
use std::io::BufReader;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f1 = File::open("log.txt")?;
    let reader = BufReader::new(f1);

    let f2 = reader.get_ref();
    Ok(())
}
```

## BufReader::get_mut

```rust
pub fn get_mut(&mut self) -> &mut R
```

Gets a mutable reference to the underlying reader.

It is inadvisable to directly read from the underlying reader.

# Examples

```rust
use std::io::BufReader;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f1 = File::open("log.txt")?;
    let mut reader = BufReader::new(f1);

    let f2 = reader.get_mut();
    Ok(())
}
```

## BufReader::buffer

```rust
pub fn buffer(&self) -> &[u8]
```

Returns a reference to the internally buffered data.

Unlike `fill_buf`, this will not attempt to fill the buffer if it is empty.

# Examples

```rust
use std::io::{BufReader, BufRead};
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::open("log.txt")?;
    let mut reader = BufReader::new(f);
    assert!(reader.buffer().is_empty());

    if reader.fill_buf()?.len() > 0 {
        assert!(!reader.buffer().is_empty());
    }
    Ok(())
}
```

## BufReader::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the number of bytes the internal buffer can hold at once.

# Examples

```rust
use std::io::{BufReader, BufRead};
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::open("log.txt")?;
    let mut reader = BufReader::new(f);

    let capacity = reader.capacity();
    let buffer = reader.fill_buf()?;
    assert!(buffer.len() <= capacity);
    Ok(())
}
```

## BufReader::into_inner

```rust
pub fn into_inner(self) -> R where R: Sized,
```

Unwraps this `BufReader<R>`, returning the underlying reader.

Note that any leftover data in the internal buffer is lost. Therefore,
a following read from the underlying reader may lead to data loss.

# Examples

```rust
use std::io::BufReader;
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f1 = File::open("log.txt")?;
    let reader = BufReader::new(f1);

    let f2 = reader.into_inner();
    Ok(())
}
```

## BufReader::seek_relative

```rust
pub fn seek_relative(&mut self, offset: i64) -> io::Result<()>
```

Seeks relative to the current position. If the new position lies within the buffer,
the buffer will not be flushed, allowing for more efficient seeks.
This method does not return the location of the underlying reader, so the caller
must track this information themselves if it is required.
