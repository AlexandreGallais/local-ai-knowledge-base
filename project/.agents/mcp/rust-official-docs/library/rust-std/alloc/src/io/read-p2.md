---
title: "alloc::io::read (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/read.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::read (part 2 of 2)

## fn read_to_string

```rust
pub fn read_to_string<R: Read>(mut reader: R) -> Result<String>
```

Reads all bytes from a reader into a new `String`.

This is a convenience function for `Read::read_to_string`. Using this
function avoids having to create a variable first and provides more type
safety since you can only get the buffer out if there were no errors. (If you
use `Read::read_to_string` you have to remember to check whether the read
succeeded because otherwise your buffer will be empty or only partially full.)

# Performance

The downside of this function's increased ease of use and type safety is
that it gives you less control over performance. For example, you can't
pre-allocate memory like you can using `String::with_capacity` and
`Read::read_to_string`. Also, you can't re-use the buffer if an error
occurs while reading.

In many cases, this function's performance will be adequate and the ease of use
and type safety tradeoffs will be worth it. However, there are cases where you
need more control over performance, and in those cases you should definitely use
`Read::read_to_string` directly.

Note that in some special cases, such as when reading files, this function will
pre-allocate memory based on the size of the input it is reading. In those
cases, the performance should be as good as if you had used
`Read::read_to_string` with a manually pre-allocated buffer.

# Errors

This function forces you to handle errors because the output (the `String`)
is wrapped in a `Result`. See `Read::read_to_string` for the errors
that can occur. If any error occurs, you will get an `Err`, so you
don't have to worry about your buffer being empty or partially full.

# Examples

```rust
fn main() -> io::Result<()> {
    let stdin = io::read_to_string(io::stdin())?;
    println!("Stdin was:");
    println!("{stdin}");
    Ok(())
}
```

# Usage Notes

`read_to_string` attempts to read a source until EOF, but many sources are continuous streams
that do not send EOF. In these cases, `read_to_string` will block indefinitely. Standard input
is one such stream which may be finite if piped, but is typically continuous. For example,
`cat file | my-rust-program` will correctly terminate with an `EOF` upon closure of cat.
Reading user input or running programs that remain open indefinitely will never terminate
the stream with `EOF` (e.g. `yes | my-rust-program`).

Using `.lines()` with a `BufReader` or using `read` can provide a better solution
