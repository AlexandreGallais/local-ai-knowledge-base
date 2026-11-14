---
title: "core::io::util"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/io/util.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::io::util

## struct Empty

```rust
pub struct Empty
```

`Empty` ignores any data written via `Write`, and will always be empty
(returning zero bytes) when read via `Read`.

This struct is generally created by calling `empty()`. Please
see the documentation of `empty()` for more details.

## fn empty

```rust
pub const fn empty() -> Empty
```

Creates a value that is always at EOF for reads, and ignores all data written.

All calls to `write` on the returned instance will return `Ok(buf.len())`
and the contents of the buffer will not be inspected.

All calls to `read` from the returned reader will return `Ok(0)`.

# Examples

```rust
use std::io::{self, Write};

let buffer = vec![1, 2, 3, 5, 8];
let num_bytes = io::empty().write(&buffer).unwrap();
assert_eq!(num_bytes, 5);
```

```rust
use std::io::{self, Read};

let mut buffer = String::new();
io::empty().read_to_string(&mut buffer).unwrap();
assert!(buffer.is_empty());
```

## struct Repeat

```rust
pub struct Repeat
```

A reader which yields one byte over and over and over and over and over and...

This struct is generally created by calling `repeat()`. Please
see the documentation of `repeat()` for more details.

## fn repeat

```rust
pub const fn repeat(byte: u8) -> Repeat
```

Creates an instance of a reader that infinitely repeats one byte.

All reads from this reader will succeed by filling the specified buffer with
the given byte.

# Examples

```rust
use std::io::{self, Read};

let mut buffer = [0; 3];
io::repeat(0b101).read_exact(&mut buffer).unwrap();
assert_eq!(buffer, [0b101, 0b101, 0b101]);
```

## struct Sink

```rust
pub struct Sink
```

A writer which will move data into the void.

This struct is generally created by calling `sink()`. Please
see the documentation of `sink()` for more details.

## fn sink

```rust
pub const fn sink() -> Sink
```

Creates an instance of a writer which will successfully consume all data.

All calls to `write` on the returned instance will return `Ok(buf.len())`
and the contents of the buffer will not be inspected.

# Examples

```rust
use std::io::{self, Write};

let buffer = vec![1, 2, 3, 5, 8];
let num_bytes = io::sink().write(&buffer).unwrap();
assert_eq!(num_bytes, 5);
```

## struct Chain

```rust
pub struct Chain<T, U>
```

Adapter to chain together two readers.

This struct is generally created by calling `chain` on a reader.
Please see the documentation of `chain` for more details.

## Chain::into_inner

```rust
pub fn into_inner(self) -> (T, U)
```

Consumes the `Chain`, returning the wrapped readers.

# Examples

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut foo_file = File::open("foo.txt")?;
    let mut bar_file = File::open("bar.txt")?;

    let chain = foo_file.chain(bar_file);
    let (foo_file, bar_file) = chain.into_inner();
    Ok(())
}
```

## Chain::get_ref

```rust
pub fn get_ref(&self) -> (&T, &U)
```

Gets references to the underlying readers in this `Chain`.

Care should be taken to avoid modifying the internal I/O state of the
underlying readers as doing so may corrupt the internal state of this
`Chain`.

# Examples

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut foo_file = File::open("foo.txt")?;
    let mut bar_file = File::open("bar.txt")?;

    let chain = foo_file.chain(bar_file);
    let (foo_file, bar_file) = chain.get_ref();
    Ok(())
}
```

## Chain::get_mut

```rust
pub fn get_mut(&mut self) -> (&mut T, &mut U)
```

Gets mutable references to the underlying readers in this `Chain`.

Care should be taken to avoid modifying the internal I/O state of the
underlying readers as doing so may corrupt the internal state of this
`Chain`.

# Examples

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut foo_file = File::open("foo.txt")?;
    let mut bar_file = File::open("bar.txt")?;

    let mut chain = foo_file.chain(bar_file);
    let (foo_file, bar_file) = chain.get_mut();
    Ok(())
}
```

## struct Take

```rust
pub struct Take<T>
```

Reader adapter which limits the bytes read from an underlying reader.

This struct is generally created by calling `take` on a reader.
Please see the documentation of `take` for more details.

## Take::limit

```rust
pub fn limit(&self) -> u64
```

Returns the number of bytes that can be read before this instance will
return EOF.

# Note

This instance may reach `EOF` after reading fewer bytes than indicated by
this method if the underlying `Read` instance reaches EOF.

# Examples

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;

    // read at most five bytes
    let handle = f.take(5);

    println!("limit: {}", handle.limit());
    Ok(())
}
```

## Take::set_limit

```rust
pub fn set_limit(&mut self, limit: u64)
```

Sets the number of bytes that can be read before this instance will
return EOF. This is the same as constructing a new `Take` instance, so
the amount of bytes read and the previous limit value don't matter when
calling this method.

# Examples

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;

    // read at most five bytes
    let mut handle = f.take(5);
    handle.set_limit(10);

    assert_eq!(handle.limit(), 10);
    Ok(())
}
```

## Take::into_inner

```rust
pub fn into_inner(self) -> T
```

Consumes the `Take`, returning the wrapped reader.

# Examples

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut file = File::open("foo.txt")?;

    let mut buffer = [0; 5];
    let mut handle = file.take(5);
    handle.read(&mut buffer)?;

    let file = handle.into_inner();
    Ok(())
}
```

## Take::get_ref

```rust
pub fn get_ref(&self) -> &T
```

Gets a reference to the underlying reader.

Care should be taken to avoid modifying the internal I/O state of the
underlying reader as doing so may corrupt the internal limit of this
`Take`.

# Examples

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut file = File::open("foo.txt")?;

    let mut buffer = [0; 5];
    let mut handle = file.take(5);
    handle.read(&mut buffer)?;

    let file = handle.get_ref();
    Ok(())
}
```

## Take::get_mut

```rust
pub fn get_mut(&mut self) -> &mut T
```

Gets a mutable reference to the underlying reader.

Care should be taken to avoid modifying the internal I/O state of the
underlying reader as doing so may corrupt the internal limit of this
`Take`.

# Examples

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut file = File::open("foo.txt")?;

    let mut buffer = [0; 5];
    let mut handle = file.take(5);
    handle.read(&mut buffer)?;

    let file = handle.get_mut();
    Ok(())
}
```
