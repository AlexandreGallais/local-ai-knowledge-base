---
title: "alloc::io"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io

Traits, helpers, and type definitions for core I/O functionality.

The `io` module contains a number of common things you'll need
when doing input and output. The most core part of this module is
the `Read` and `Write` traits, which provide the
most general interface for reading and writing input and output.

#### Read and Write

Because they are traits, `Read` and `Write` are implemented by a number
of other types, and you can implement them for your types too. As such,
you'll see a few different types of I/O throughout the documentation in
this module: `File`s, `TcpStream`s, and sometimes even `Vec<T>`s. For
example, `Read` adds a `read``Read::read` method, which we can use on
`File`s:

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];

    // read up to 10 bytes
    let n = f.read(&mut buffer)?;

    println!("The bytes: {:?}", &buffer[..n]);
    Ok(())
}
```

`Read` and `Write` are so important, implementors of the two traits have a
nickname: readers and writers. So you'll sometimes see 'a reader' instead
of 'a type that implements the `Read` trait'. Much easier!

#### Seek and BufRead

Beyond that, there are two important traits that are provided: `Seek`
and `BufRead`. Both of these build on top of a reader to control
how the reading happens. `Seek` lets you control where the next byte is
coming from:

```rust
use std::io;
use std::io::prelude::*;
use std::io::SeekFrom;
use std::fs::File;

fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];

    // skip to the last 10 bytes of the file
    f.seek(SeekFrom::End(-10))?;

    // read up to 10 bytes
    let n = f.read(&mut buffer)?;

    println!("The bytes: {:?}", &buffer[..n]);
    Ok(())
}
```

`BufRead` uses an internal buffer to provide a number of other ways to read, but
to show it off, we'll need to talk about buffers in general. Keep reading!

#### BufReader and BufWriter

Byte-based interfaces are unwieldy and can be inefficient, as we'd need to be
making near-constant calls to the operating system. To help with this,
`std::io` comes with two structs, `BufReader` and `BufWriter`, which wrap
readers and writers. The wrapper uses a buffer, reducing the number of
calls and providing nicer methods for accessing exactly what you want.

For example, `BufReader` works with the `BufRead` trait to add extra
methods to any reader:

```rust
use std::io;
use std::io::prelude::*;
use std::io::BufReader;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;
    let mut reader = BufReader::new(f);
    let mut buffer = String::new();

    // read a line into buffer
    reader.read_line(&mut buffer)?;

    println!("{buffer}");
    Ok(())
}
```

`BufWriter` doesn't add any new ways of writing; it just buffers every call
to `write``Write::write`:

```rust
use std::io;
use std::io::prelude::*;
use std::io::BufWriter;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::create("foo.txt")?;
    {
        let mut writer = BufWriter::new(f);

        // write a byte to the buffer
        writer.write(&[42])?;

    } // the buffer is flushed once writer goes out of scope

    Ok(())
}
```

#### Iterator types

A large number of the structures provided by `std::io` are for various
ways of iterating over I/O. For example, `Lines` is used to split over
lines:

```rust
use std::io;
use std::io::prelude::*;
use std::io::BufReader;
use std::fs::File;

fn main() -> io::Result<()> {
    let f = File::open("foo.txt")?;
    let reader = BufReader::new(f);

    for line in reader.lines() {
        println!("{}", line?);
    }
    Ok(())
}
```

#### io::Result

Last, but certainly not least, is `io::Result`. This type is used
as the return type of many `std::io` functions that can cause an error, and
can be returned from your own functions as well. Many of the examples in this
module use the [`?` operator]:

```rust
use std::io;

fn read_input() -> io::Result<()> {
    let mut input = String::new();

    io::stdin().read_line(&mut input)?;

    println!("You typed: {}", input.trim());

    Ok(())
}
```

The return type of `read_input()`, `io::Result<()>``io::Result`, is a very
common type for functions which don't have a 'real' return value, but do want to
return errors if they happen. In this case, the only purpose of this function is
to read the line and print it, so we use `()`.
