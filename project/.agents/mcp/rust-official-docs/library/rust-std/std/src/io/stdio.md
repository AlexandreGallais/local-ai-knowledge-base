---
title: "std::io::stdio"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/io/stdio.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::io::stdio

## struct Stdin

```rust
pub struct Stdin
```

A handle to the standard input stream of a process.

Each handle is a shared reference to a global buffer of input data to this
process. A handle can be `lock`'d to gain full access to `BufRead` methods
(e.g., `.lines()`). Reads to this handle are otherwise locked with respect
to other reads.

This handle implements the `Read` trait, but beware that concurrent reads
of `Stdin` must be executed with care.

Created by the `io::stdin` method.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to read bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

# Examples

```rust
use std::io;

fn main() -> io::Result<()> {
    let mut buffer = String::new();
    let stdin = io::stdin(); // We get `Stdin` here.
    stdin.read_line(&mut buffer)?;
    Ok(())
}
```

## struct StdinLock

```rust
pub struct StdinLock<'a>
```

A locked reference to the `Stdin` handle.

This handle implements both the `Read` and `BufRead` traits, and
is constructed via the `Stdin::lock` method.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to read bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

# Examples

```rust
use std::io::{self, BufRead};

fn main() -> io::Result<()> {
    let mut buffer = String::new();
    let stdin = io::stdin(); // We get `Stdin` here.
    {
        let mut handle = stdin.lock(); // We get `StdinLock` here.
        handle.read_line(&mut buffer)?;
    } // `StdinLock` is dropped here.
    Ok(())
}
```

## fn stdin

```rust
pub fn stdin() -> Stdin
```

Constructs a new handle to the standard input of the current process.

Each handle returned is a reference to a shared global buffer whose access
is synchronized via a mutex. If you need more explicit control over
locking, see the `Stdin::lock` method.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to read bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

# Examples

Using implicit synchronization:

```rust
use std::io;

fn main() -> io::Result<()> {
    let mut buffer = String::new();
    io::stdin().read_line(&mut buffer)?;
    Ok(())
}
```

Using explicit synchronization:

```rust
use std::io::{self, BufRead};

fn main() -> io::Result<()> {
    let mut buffer = String::new();
    let stdin = io::stdin();
    let mut handle = stdin.lock();

    handle.read_line(&mut buffer)?;
    Ok(())
}
```

## Stdin::lock

```rust
pub fn lock(&self) -> StdinLock<'static>
```

Locks this handle to the standard input stream, returning a readable
guard.

The lock is released when the returned lock goes out of scope. The
returned guard also implements the `Read` and `BufRead` traits for
accessing the underlying data.

# Examples

```rust
use std::io::{self, BufRead};

fn main() -> io::Result<()> {
    let mut buffer = String::new();
    let stdin = io::stdin();
    let mut handle = stdin.lock();

    handle.read_line(&mut buffer)?;
    Ok(())
}
```

## Stdin::read_line

```rust
pub fn read_line(&self, buf: &mut String) -> io::Result<usize>
```

Locks this handle and reads a line of input, appending it to the specified buffer.

For detailed semantics of this method, see the documentation on
`BufRead::read_line`. In particular:
* Previous content of the buffer will be preserved. To avoid appending
  to the buffer, you need to `clear` it first.
* The trailing newline character, if any, is included in the buffer.

# Examples

```rust
use std::io;

let mut input = String::new();
match io::stdin().read_line(&mut input) {
    Ok(n) => {
        println!("{n} bytes read");
        println!("{input}");
    }
    Err(error) => println!("error: {error}"),
}
```

You can run the example one of two ways:

- Pipe some text to it, e.g., `printf foo | path/to/executable`
- Give it text interactively by running the executable directly,
  in which case it will wait for the Enter key to be pressed before
  continuing

## Stdin::lines

```rust
pub fn lines(self) -> Lines<StdinLock<'static>>
```

Consumes this handle and returns an iterator over input lines.

For detailed semantics of this method, see the documentation on
`BufRead::lines`.

# Examples

```rust
use std::io;

let lines = io::stdin().lines();
for line in lines {
    println!("got a line: {}", line.unwrap());
}
```

## struct Stdout

```rust
pub struct Stdout
```

A handle to the global standard output stream of the current process.

Each handle shares a global buffer of data to be written to the standard
output stream. Access is also synchronized via a lock and explicit control
over locking is available via the `lock` method.

By default, the handle is line-buffered when connected to a terminal, meaning
it flushes automatically when a newline (`\n`) is encountered. For immediate
output, you can manually call the `flush` method. When the handle goes out
of scope, the buffer is automatically flushed.

Created by the `io::stdout` method.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to write bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

## struct StdoutLock

```rust
pub struct StdoutLock<'a>
```

A locked reference to the `Stdout` handle.

This handle implements the `Write` trait, and is constructed via
the `Stdout::lock` method. See its documentation for more.

By default, the handle is line-buffered when connected to a terminal, meaning
it flushes automatically when a newline (`\n`) is encountered. For immediate
output, you can manually call the `flush` method. When the handle goes out
of scope, the buffer is automatically flushed.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to write bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

## fn stdout

```rust
pub fn stdout() -> Stdout
```

Constructs a new handle to the standard output of the current process.

Each handle returned is a reference to a shared global buffer whose access
is synchronized via a mutex. If you need more explicit control over
locking, see the `Stdout::lock` method.

By default, the handle is line-buffered when connected to a terminal, meaning
it flushes automatically when a newline (`\n`) is encountered. For immediate
output, you can manually call the `flush` method. When the handle goes out
of scope, the buffer is automatically flushed.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to write bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

# Examples

Using implicit synchronization:

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    io::stdout().write_all(b"hello world")?;

    Ok(())
}
```

Using explicit synchronization:

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    let stdout = io::stdout();
    let mut handle = stdout.lock();

    handle.write_all(b"hello world")?;

    Ok(())
}
```

Ensuring output is flushed immediately:

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    let mut stdout = io::stdout();
    stdout.write_all(b"hello, ")?;
    stdout.flush()?;                // Manual flush
    stdout.write_all(b"world!\n")?; // Automatically flushed
    Ok(())
}
```

## Stdout::lock

```rust
pub fn lock(&self) -> StdoutLock<'static>
```

Locks this handle to the standard output stream, returning a writable
guard.

The lock is released when the returned lock goes out of scope. The
returned guard also implements the `Write` trait for writing data.

# Examples

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    let mut stdout = io::stdout().lock();

    stdout.write_all(b"hello world")?;

    Ok(())
}
```

## struct Stderr

```rust
pub struct Stderr
```

A handle to the standard error stream of a process.

For more information, see the `io::stderr` method.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to write bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

## struct StderrLock

```rust
pub struct StderrLock<'a>
```

A locked reference to the `Stderr` handle.

This handle implements the `Write` trait and is constructed via
the `Stderr::lock` method. See its documentation for more.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to write bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

## fn stderr

```rust
pub fn stderr() -> Stderr
```

Constructs a new handle to the standard error of the current process.

This handle is not buffered.

### Note: Windows Portability Considerations

When operating in a console, the Windows implementation of this stream does not support
non-UTF-8 byte sequences. Attempting to write bytes that are not valid UTF-8 will return
an error.

In a process with a detached console, such as one using
`#![windows_subsystem = "windows"]`, or in a child process spawned from such a process,
the contained handle will be null. In such cases, the standard library's `Read` and
`Write` will do nothing and silently succeed. All other I/O operations, via the
standard library or via raw Windows API calls, will fail.

# Examples

Using implicit synchronization:

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    io::stderr().write_all(b"hello world")?;

    Ok(())
}
```

Using explicit synchronization:

```rust
use std::io::{self, Write};

fn main() -> io::Result<()> {
    let stderr = io::stderr();
    let mut handle = stderr.lock();

    handle.write_all(b"hello world")?;

    Ok(())
}
```

## Stderr::lock

```rust
pub fn lock(&self) -> StderrLock<'static>
```

Locks this handle to the standard error stream, returning a writable
guard.

The lock is released when the returned lock goes out of scope. The
returned guard also implements the `Write` trait for writing data.

# Examples

```rust
use std::io::{self, Write};

fn foo() -> io::Result<()> {
    let stderr = io::stderr();
    let mut handle = stderr.lock();

    handle.write_all(b"hello world")?;

    Ok(())
}
```
