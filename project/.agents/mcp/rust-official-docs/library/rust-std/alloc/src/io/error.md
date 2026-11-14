---
title: "alloc::io::error"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/io/error.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::io::error

## Error::new

```rust
pub fn new<E>(kind: ErrorKind, error: E) -> Error where E: Into<Box<dyn error::Error + Send + Sync>>,
```

Creates a new I/O error from a known kind of error as well as an
arbitrary error payload.

This function is used to generically create I/O errors which do not
originate from the OS itself. The `error` argument is an arbitrary
payload which will be contained in this `Error`.

Note that this function allocates memory on the heap.
If no extra payload is required, use the `From` conversion from
`ErrorKind`.

# Examples

```rust
use std::io::{Error, ErrorKind};

// errors can be created from strings
let custom_error = Error::new(ErrorKind::Other, "oh no!");

// errors can also be created from other errors
let custom_error2 = Error::new(ErrorKind::Interrupted, custom_error);

// creating an error without payload (and without memory allocation)
let eof_error = Error::from(ErrorKind::UnexpectedEof);
```

## Error::other

```rust
pub fn other<E>(error: E) -> Error where E: Into<Box<dyn error::Error + Send + Sync>>,
```

# Examples

```rust
use std::io::Error;

// errors can be created from strings
let custom_error = Error::other("oh no!");

// errors can also be created from other errors
let custom_error2 = Error::other(custom_error);
```

## Error::into_inner

```rust
pub fn into_inner(self) -> Option<Box<dyn error::Error + Send + Sync>>
```

# Examples

```rust
use std::io::{Error, ErrorKind};

fn print_error(err: Error) {
    if let Some(inner_err) = err.into_inner() {
        println!("Inner error: {inner_err}");
    } else {
        println!("No inner error");
    }
}

fn main() {
    // Will print "No inner error".
    print_error(Error::last_os_error());
    // Will print "Inner error: ...".
    print_error(Error::new(ErrorKind::Other, "oh no!"));
}
```

## Error::downcast

```rust
pub fn downcast<E>(self) -> result::Result<E, Self> where E: error::Error + Send + Sync + 'static,
```

# Examples

```rust
use std::fmt;
use std::io;
use std::error::Error;

#[derive(Debug)]
enum E {
    Io(io::Error),
    SomeOtherVariant,
}

impl fmt::Display for E {
   // ...
}
impl Error for E {}

impl From<io::Error> for E {
    fn from(err: io::Error) -> E {
        err.downcast::<E>()
            .unwrap_or_else(E::Io)
    }
}

impl From<E> for io::Error {
    fn from(err: E) -> io::Error {
        match err {
            E::Io(io_error) => io_error,
            e => io::Error::new(io::ErrorKind::Other, e),
        }
    }
}

let e = E::SomeOtherVariant;
// Convert it to an io::Error
let io_error = io::Error::from(e);
// Cast it back to the original variant
let e = E::from(io_error);
assert!(matches!(e, E::SomeOtherVariant));

let io_error = io::Error::from(io::ErrorKind::AlreadyExists);
// Convert it to E
let e = E::from(io_error);
// Cast it back to the original variant
let io_error = io::Error::from(e);
assert_eq!(io_error.kind(), io::ErrorKind::AlreadyExists);
assert!(io_error.get_ref().is_none());
assert!(io_error.raw_os_error().is_none());
```
