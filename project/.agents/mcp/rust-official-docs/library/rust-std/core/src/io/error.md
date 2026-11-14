# core::io::error

## type Result

```rust
pub type Result<T> = result::Result<T, Error>
```

[`std::io`]: ../../std/io/index.html
[`io::Error`]: Error
[`Result`]: crate::result::Result
[prelude]: crate::prelude

# Examples

A convenience function that bubbles an `io::Result` to its caller:

```
use std::io;

fn get_string() -> io::Result<String> {
    let mut buffer = String::new();

    io::stdin().read_line(&mut buffer)?;

    Ok(buffer)
}
```

## struct Error

```rust
pub struct Error
```

[Read]: ../../std/io/trait.Read.html
[Write]: crate::io::Write
[Seek]: crate::io::Seek

## Error::raw_os_error

```rust
pub fn raw_os_error(&self) -> Option<RawOsError>
```

[last_os_error]: ../../std/io/struct.Error.html#method.last_os_error
[from_raw_os_error]: ../../std/io/struct.Error.html#method.from_raw_os_error

# Examples

```
use std::io::{Error, ErrorKind};

fn print_os_error(err: &Error) {
    if let Some(raw_os_err) = err.raw_os_error() {
        println!("raw OS error: {raw_os_err:?}");
    } else {
        println!("Not an OS error");
    }
}

fn main() {
    // Will print "raw OS error: ...".
    print_os_error(&Error::last_os_error());
    // Will print "Not an OS error".
    print_os_error(&Error::new(ErrorKind::Other, "oh no!"));
}
```

## Error::get_ref

```rust
pub fn get_ref(&self) -> Option<&(dyn error::Error + Send + Sync + 'static)>
```

Returns a reference to the inner error wrapped by this error (if any).

If this [`Error`] was constructed via [`new`][new] then this function will
return [`Some`], otherwise it will return [`None`].

[new]: ../../alloc/io/struct.Error.html#method.new

# Examples

```
use std::io::{Error, ErrorKind};

fn print_error(err: &Error) {
    if let Some(inner_err) = err.get_ref() {
        println!("Inner error: {inner_err:?}");
    } else {
        println!("No inner error");
    }
}

fn main() {
    // Will print "No inner error".
    print_error(&Error::last_os_error());
    // Will print "Inner error: ...".
    print_error(&Error::new(ErrorKind::Other, "oh no!"));
}
```

## Error::get_mut

```rust
pub fn get_mut(&mut self) -> Option<&mut (dyn error::Error + Send + Sync + 'static)>
```

[new]: ../../alloc/io/struct.Error.html#method.new

# Examples

```
use std::io::{Error, ErrorKind};
use std::{error, fmt};
use std::fmt::Display;

#[derive(Debug)]
struct MyError {
    v: String,
}

impl MyError {
    fn new() -> MyError {
        MyError {
            v: "oh no!".to_string()
        }
    }

    fn change_message(&mut self, new_message: &str) {
        self.v = new_message.to_string();
    }
}

impl error::Error for MyError {}

impl Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "MyError: {}", self.v)
    }
}

fn change_error(mut err: Error) -> Error {
    if let Some(inner_err) = err.get_mut() {
        inner_err.downcast_mut::<MyError>().unwrap().change_message("I've been changed!");
    }
    err
}

fn print_error(err: &Error) {
    if let Some(inner_err) = err.get_ref() {
        println!("Inner error: {inner_err}");
    } else {
        println!("No inner error");
    }
}

fn main() {
    // Will print "No inner error".
    print_error(&change_error(Error::last_os_error()));
    // Will print "Inner error: ...".
    print_error(&change_error(Error::new(ErrorKind::Other, MyError::new())));
}
```

## Error::kind

```rust
pub fn kind(&self) -> ErrorKind
```

[last_os_error]: ../../std/io/struct.Error.html#method.last_os_error

# Examples

```
use std::io::{Error, ErrorKind};

fn print_error(err: Error) {
    println!("{:?}", err.kind());
}

fn main() {
    // As no error has (visibly) occurred, this may print anything!
    // It likely prints a placeholder for unidentified (non-)errors.
    print_error(Error::last_os_error());
    // Will print "AddrInUse".
    print_error(Error::new(ErrorKind::AddrInUse, "oh no!"));
}
```

## enum ErrorKind

```rust
pub enum ErrorKind
```

A list specifying general categories of I/O error.

This list is intended to grow over time and it is not recommended to
exhaustively match against it.

It is used with the [`io::Error`][error] type.

[error]: Error

# Handling errors and matching on `ErrorKind`

In application code, use `match` for the `ErrorKind` values you are
expecting; use `_` to match "all other errors".

In comprehensive and thorough tests that want to verify that a test doesn't
return any known incorrect error kind, you may want to cut-and-paste the
current full list of errors from here into your test code, and then match
`_` as the correct case. This seems counterintuitive, but it will make your
tests more robust. In particular, if you want to verify that your code does
produce an unrecognized error kind, the robust solution is to check for all
the recognized error kinds and fail in those cases.