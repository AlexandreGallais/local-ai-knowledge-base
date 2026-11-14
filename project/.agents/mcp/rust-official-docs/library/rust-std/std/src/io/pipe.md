---
title: "std::io::pipe"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/io/pipe.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::io::pipe

## fn pipe

```rust
pub fn pipe() -> io::Result<(PipeReader, PipeWriter)>
```

Creates an anonymous pipe.

# Behavior

A pipe is a one-way data channel provided by the OS, which works across processes. A pipe is
typically used to communicate between two or more separate processes, as there are better,
faster ways to communicate within a single process.

In particular:

* A read on a `PipeReader` blocks until the pipe is non-empty.
* A write on a `PipeWriter` blocks when the pipe is full.
* When all copies of a `PipeWriter` are closed, a read on the corresponding `PipeReader`
  returns EOF.
* `PipeWriter` can be shared, and multiple processes or threads can write to it at once, but
  writes (above a target-specific threshold) may have their data interleaved.
* `PipeReader` can be shared, and multiple processes or threads can read it at once. Any
  given byte will only get consumed by one reader. There are no guarantees about data
  interleaving.
* Portable applications cannot assume any atomicity of messages larger than a single byte.

# Platform-specific behavior

This function currently corresponds to the `pipe` function on Unix and the
`CreatePipe` function on Windows.

Note that this may change in the future.

# Capacity

Pipe capacity is platform dependent. To quote the Linux [man page]:

> Different implementations have different limits for the pipe capacity. Applications should
> not rely on a particular capacity: an application should be designed so that a reading process
> consumes data as soon as it is available, so that a writing process does not remain blocked.

# Example

```rust
use std::io::{Read, Write, pipe};
use std::process::Command;
let (ping_reader, mut ping_writer) = pipe()?;
let (mut pong_reader, pong_writer) = pipe()?;

// Spawn a child process that echoes its input.
let mut echo_command = Command::new("cat");
echo_command.stdin(ping_reader);
echo_command.stdout(pong_writer);
let mut echo_child = echo_command.spawn()?;

// Send input to the child process. Note that because we're writing all the input before we
// read any output, this could deadlock if the child's input and output pipe buffers both
// filled up. Those buffers are usually at least a few KB, so "hello" is fine, but for longer
// inputs we'd need to read and write at the same time, e.g. using threads.
ping_writer.write_all(b"hello")?;

// `cat` exits when it reads EOF from stdin, but that can't happen while any ping writer
// remains open. We need to drop our ping writer, or read_to_string will deadlock below.
drop(ping_writer);

// The pong reader can't report EOF while any pong writer remains open. Our Command object is
// holding a pong writer, and again read_to_string will deadlock if we don't drop it.
drop(echo_command);

let mut buf = String::new();
// Block until `cat` closes its stdout (a pong writer).
pong_reader.read_to_string(&mut buf)?;
assert_eq!(&buf, "hello");

// At this point we know `cat` has exited, but we still need to wait to clean up the "zombie".
echo_child.wait()?;
```

## struct PipeReader

```rust
pub struct PipeReader(pub(crate) imp::Pipe)
```

Read end of an anonymous pipe.

## struct PipeWriter

```rust
pub struct PipeWriter(pub(crate) imp::Pipe)
```

Write end of an anonymous pipe.

## PipeReader::try_clone

```rust
pub fn try_clone(&self) -> io::Result<Self>
```

Creates a new `PipeReader` instance that shares the same underlying file description.

# Examples

```rust
use std::fs;
use std::io::{pipe, Write};
use std::process::Command;
const NUM_SLOT: u8 = 2;
const NUM_PROC: u8 = 5;
const OUTPUT: &str = "work.txt";

let mut jobs = vec![];
let (reader, mut writer) = pipe()?;

// Write NUM_SLOT characters the pipe.
writer.write_all(&[b'|'; NUM_SLOT as usize])?;

// Spawn several processes that read a character from the pipe, do some work, then
// write back to the pipe. When the pipe is empty, the processes block, so only
// NUM_SLOT processes can be working at any given time.
for _ in 0..NUM_PROC {
    jobs.push(
        Command::new("bash")
            .args(["-c",
                &format!(
                     "read -n 1\n\
                      echo -n 'x' >> '{OUTPUT}'\n\
                      echo -n '|'",
                ),
            ])
            .stdin(reader.try_clone()?)
            .stdout(writer.try_clone()?)
            .spawn()?,
    );
}

// Wait for all jobs to finish.
for mut job in jobs {
    job.wait()?;
}

// Check our work and clean up.
let xs = fs::read_to_string(OUTPUT)?;
fs::remove_file(OUTPUT)?;
assert_eq!(xs, "x".repeat(NUM_PROC.into()));
```

## PipeWriter::try_clone

```rust
pub fn try_clone(&self) -> io::Result<Self>
```

Creates a new `PipeWriter` instance that shares the same underlying file description.

# Examples

```rust
use std::process::Command;
use std::io::{pipe, Read};
let (mut reader, writer) = pipe()?;

// Spawn a process that writes to stdout and stderr.
let mut peer = Command::new("bash")
    .args([
        "-c",
        "echo -n foo\n\
         echo -n bar >&2"
    ])
    .stdout(writer.try_clone()?)
    .stderr(writer)
    .spawn()?;

// Read and check the result.
let mut msg = String::new();
reader.read_to_string(&mut msg)?;
assert_eq!(&msg, "foobar");

peer.wait()?;
```
