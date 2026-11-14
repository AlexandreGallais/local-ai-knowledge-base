---
title: "core::error"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/error.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::error

## trait Error

```rust
pub trait Error: Debug + Display
```

`Error` is a trait representing the basic <example-value> for error values,
i.e., values of type `E` in `Result<T, E>`.

Errors must describe themselves through the `Display` and `Debug`
traits. Error messages are typically concise lowercase sentences without
trailing punctuation:

```rust
let err = "NaN".parse::<u32>().unwrap_err();
assert_eq!(err.to_string(), "invalid digit found in string");
```

# Error source

Errors may provide cause information. `Error::source()` is generally
used when errors cross "abstraction boundaries". If one module must report
an error that is caused by an error from a lower-level module, it can allow
accessing that error via `Error::source()`. This makes it possible for the
high-level module to provide its own errors while also revealing some of the
implementation for debugging.

In error types that wrap an underlying error, the underlying error
should be either returned by the outer error's `Error::source()`, or rendered
by the outer error's `Display` implementation, but not both.

# Example

Implementing the `Error` trait only requires that `Debug` and `Display` are implemented too.

```rust
use std::error::Error;
use std::fmt;
use std::path::PathBuf;

#[derive(Debug)]
struct ReadConfigError {
    path: PathBuf
}

impl fmt::Display for ReadConfigError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let path = self.path.display();
        write!(f, "unable to read configuration at {path}")
    }
}

impl Error for ReadConfigError {}
```

## Error::source

```rust
fn source(&self) -> Option<&(dyn Error + 'static)>
```

Returns the lower-level source of this error, if any.

# Examples

```rust
use std::error::Error;
use std::fmt;

#[derive(Debug)]
struct SuperError {
    source: SuperErrorSideKick,
}

impl fmt::Display for SuperError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "SuperError is here!")
    }
}

impl Error for SuperError {
    fn source(&self) -> Option<&(dyn Error + 'static)> {
        Some(&self.source)
    }
}

#[derive(Debug)]
struct SuperErrorSideKick;

impl fmt::Display for SuperErrorSideKick {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "SuperErrorSideKick is here!")
    }
}

impl Error for SuperErrorSideKick {}

fn get_super_error() -> Result<(), SuperError> {
    Err(SuperError { source: SuperErrorSideKick })
}

fn main() {
    match get_super_error() {
        Err(e) => {
            println!("Error: {e}");
            println!("Caused by: {}", e.source().unwrap());
        }
        _ => println!("No error"),
    }
}
```

## Error::description

```rust
fn description(&self) -> &str
```

```rust
if let Err(e) = "xc".parse::<u32>() {
    // Print `e` itself, no need for description().
    eprintln!("Error: {e}");
}
```

## Error::is

```rust
pub fn is<T: Error + 'static>(&self) -> bool
```

Returns `true` if the inner type is the same as `T`.

## Error::downcast_ref

```rust
pub fn downcast_ref<T: Error + 'static>(&self) -> Option<&T>
```

Returns some reference to the inner value if it is of type `T`, or
`None` if it isn't.

## Error::downcast_mut

```rust
pub fn downcast_mut<T: Error + 'static>(&mut self) -> Option<&mut T>
```

Returns some mutable reference to the inner value if it is of type `T`, or
`None` if it isn't.

## Error::is

```rust
pub fn is<T: Error + 'static>(&self) -> bool
```

Forwards to the method defined on the type `dyn Error`.

## Error::downcast_ref

```rust
pub fn downcast_ref<T: Error + 'static>(&self) -> Option<&T>
```

Forwards to the method defined on the type `dyn Error`.

## Error::downcast_mut

```rust
pub fn downcast_mut<T: Error + 'static>(&mut self) -> Option<&mut T>
```

Forwards to the method defined on the type `dyn Error`.

## Error::is

```rust
pub fn is<T: Error + 'static>(&self) -> bool
```

Forwards to the method defined on the type `dyn Error`.

## Error::downcast_ref

```rust
pub fn downcast_ref<T: Error + 'static>(&self) -> Option<&T>
```

Forwards to the method defined on the type `dyn Error`.

## Error::downcast_mut

```rust
pub fn downcast_mut<T: Error + 'static>(&mut self) -> Option<&mut T>
```

Forwards to the method defined on the type `dyn Error`.
