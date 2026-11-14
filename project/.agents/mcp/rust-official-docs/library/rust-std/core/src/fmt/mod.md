---
title: "core::fmt (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/fmt/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::fmt

Utilities for formatting and printing strings.

## enum Alignment

```rust
pub enum Alignment
```

Possible alignments returned by `Formatter::align`

## type Result

```rust
pub type Result = result::Result<(), Error>
```

The type returned by formatter methods.

# Examples

```rust
use std::fmt;

#[derive(Debug)]
struct Triangle {
    a: f32,
    b: f32,
    c: f32
}

impl fmt::Display for Triangle {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {}, {})", self.a, self.b, self.c)
    }
}

let pythagorean_triple = Triangle { a: 3.0, b: 4.0, c: 5.0 };

assert_eq!(format!("{pythagorean_triple}"), "(3, 4, 5)");
```

## struct Error

```rust
pub struct Error
```

The error type which is returned from formatting a message into a stream.

This type does not support transmission of an error other than that an error
occurred. This is because, despite the existence of this error,
string formatting is considered an infallible operation.
`fmt()` implementors should not return this `Error` unless they received it from their
`Formatter`. The only time your code should create a new instance of this
error is when implementing `fmt::Write`, in order to cancel the formatting operation when
writing to the underlying stream fails.

Any extra information must be arranged to be transmitted through some other means,
such as storing it in a field to be consulted after the formatting operation has been
cancelled. (For example, this is how `std::io::Write::write_fmt()` propagates IO errors
during writing.)

This type, `fmt::Error`, should not be
confused with `std::io::Error` or `std::error::Error`, which you may also
have in scope.

# Examples

```rust
use std::fmt::{self, write};

let mut output = String::new();
if let Err(fmt::Error) = write(&mut output, format_args!("Hello {}!", "world")) {
    panic!("An error occurred");
}
```

## trait Write

```rust
pub trait Write
```

A trait for writing or formatting into Unicode-accepting buffers or streams.

This trait only accepts UTF-8–encoded data and is not [flushable]. If you only
want to accept Unicode and you don't need flushing, you should implement this trait;
otherwise you should implement `std::io::Write`.

## Write::write_str

```rust
fn write_str(&mut self, s: &str) -> Result
```

Writes a string slice into this writer, returning whether the write
succeeded.

This method can only succeed if the entire string slice was successfully
written, and this method will not return until all data has been
written or an error occurs.

# Errors

This function will return an instance of `std::fmt::Error`[Error] on error.

The purpose of that error is to abort the formatting operation when the underlying
destination encounters some error preventing it from accepting more text;
in particular, it does not communicate any information about *what* error occurred.
It should generally be propagated rather than handled, at least when implementing
formatting traits.

# Examples

```rust
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, s: &str) -> Result<(), Error> {
    f.write_str(s)
}

let mut buf = String::new();
writer(&mut buf, "hola")?;
assert_eq!(&buf, "hola");
```

## Write::write_char

```rust
fn write_char(&mut self, c: char) -> Result
```

Writes a `char` into this writer, returning whether the write succeeded.

A single `char` may be encoded as more than one byte.
This method can only succeed if the entire byte sequence was successfully
written, and this method will not return until all data has been
written or an error occurs.

# Errors

This function will return an instance of `Error` on error.

# Examples

```rust
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, c: char) -> Result<(), Error> {
    f.write_char(c)
}

let mut buf = String::new();
writer(&mut buf, 'a')?;
writer(&mut buf, 'b')?;
assert_eq!(&buf, "ab");
```

## Write::write_fmt

```rust
fn write_fmt(&mut self, args: Arguments<'_>) -> Result
```

Glue for usage of the `write!` macro with implementors of this trait.

This method should generally not be invoked manually, but rather through
the `write!` macro itself.

# Errors

This function will return an instance of `Error` on error. Please see
write_str for details.

# Examples

```rust
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, s: &str) -> Result<(), Error> {
    f.write_fmt(format_args!("{s}"))
}

let mut buf = String::new();
writer(&mut buf, "world")?;
assert_eq!(&buf, "world");
```

## struct Formatter

```rust
pub struct Formatter<'a>
```

Configuration for formatting.

A `Formatter` represents various options related to formatting. Users do not
construct `Formatter`s directly; a mutable reference to one is passed to
the `fmt` method of all formatting traits, like `Debug` and `Display`.

To interact with a `Formatter`, you'll call various methods to change the
various options related to formatting. For examples, please see the
documentation of the methods defined on `Formatter` below.

## Arguments::estimated_capacity

```rust
pub fn estimated_capacity(&self) -> usize
```

Estimates the length of the formatted text.

This is intended to be used for setting initial `String` capacity
when using `format!`. Note: this is neither the lower nor upper bound.

## Arguments::as_str

```rust
pub const fn as_str(&self) -> Option<&'static str>
```

Gets the formatted string, if it has no arguments to be formatted at runtime.

This can be used to avoid allocations in some cases.

# Guarantees

For `format_args!("just a literal")`, this function is guaranteed to
return `Some("just a literal")`.

For most cases with placeholders, this function will return `None`.

However, the compiler may perform optimizations that can cause this
function to return `Some(_)` even if the format string contains
placeholders. For example, `format_args!("Hello, {}!", "world")` may be
optimized to `format_args!("Hello, world!")`, such that `as_str()`
returns `Some("Hello, world!")`.

The behavior for anything but the trivial case (without placeholders)
is not guaranteed, and should not be relied upon for anything other
than optimization.

# Examples

```rust
use std::fmt::Arguments;

fn write_str(_: &str) { /* ... */ }

fn write_fmt(args: &Arguments<'_>) {
    if let Some(s) = args.as_str() {
        write_str(s)
    } else {
        write_str(&args.to_string());
    }
}
```

```rust
assert_eq!(format_args!("hello").as_str(), Some("hello"));
assert_eq!(format_args!("").as_str(), Some(""));
assert_eq!(format_args!("{:?}", std::env::current_dir()).as_str(), None);
```

## trait Debug

```rust
pub trait Debug: PointeeSized
```

`?` formatting.

`Debug` should format the output in a programmer-facing, debugging context.

Generally speaking, you should just `derive` a `Debug` implementation.

When used with the alternate format specifier `#?`, the output is pretty-printed.

For more information on formatters, see the module-level documentation.

This trait can be used with `#[derive]` if all fields implement `Debug`. When
`derive`d for structs, it will use the name of the `struct`, then `{`, then a
comma-separated list of each field's name and `Debug` value, then `}`. For
`enum`s, it will use the name of the variant and, if applicable, `(`, then the
`Debug` values of the fields, then `)`.

# Stability

Derived `Debug` formats are not stable, and so may change with future Rust
versions. Additionally, `Debug` implementations of types provided by the
standard library (`std`, `core`, `alloc`, etc.) are not stable, and
may also change with future Rust versions.

# Examples

Deriving an implementation:

```rust
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

let origin = Point { x: 0, y: 0 };

assert_eq!(
    format!("The origin is: {origin:?}"),
    "The origin is: Point { x: 0, y: 0 }",
);
```

Manually implementing:

```rust
use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Point")
         .field("x", &self.x)
         .field("y", &self.y)
         .finish()
    }
}

let origin = Point { x: 0, y: 0 };

assert_eq!(
    format!("The origin is: {origin:?}"),
    "The origin is: Point { x: 0, y: 0 }",
);
```

There are a number of helper methods on the `Formatter` struct to help you with manual
implementations, such as `debug_struct`.

Types that do not wish to use the standard suite of debug representations
provided by the `Formatter` trait (`debug_struct`, `debug_tuple`,
`debug_list`, `debug_set`, `debug_map`) can do something totally custom by
manually writing an arbitrary representation to the `Formatter`.

```rust
impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Point [{} {}]", self.x, self.y)
    }
}
```

`Debug` implementations using either `derive` or the debug builder API
on `Formatter` support pretty-printing using the alternate flag: `{:#?}`.

Pretty-printing with `#?`:

```rust
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

let origin = Point { x: 0, y: 0 };

let expected = "The origin is: Point {
    x: 0,
    y: 0,
}";
assert_eq!(format!("The origin is: {origin:#?}"), expected);
```

## Debug::fmt

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```

# Examples

```rust
use std::fmt;

struct Position {
    longitude: f32,
    latitude: f32,
}

impl fmt::Debug for Position {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_tuple("")
         .field(&self.longitude)
         .field(&self.latitude)
         .finish()
    }
}

let position = Position { longitude: 1.987, latitude: 2.983 };
assert_eq!(format!("{position:?}"), "(1.987, 2.983)");

assert_eq!(format!("{position:#?}"), "(
    1.987,
    2.983,
)");
```

## trait Display

```rust
pub trait Display: PointeeSized
```

Format trait for an empty format, `{}`.

Implementing this trait for a type will automatically implement the
`ToString`[tostring] trait for the type, allowing the usage
of the `.to_string()`[tostring_function] method. Prefer implementing
the `Display` trait for a type, rather than `ToString`[tostring].

`Display` is similar to `Debug`, but `Display` is for user-facing
output, and so cannot be derived.

For more information on formatters, see the module-level documentation.

# Completeness and parseability

`Display` for a type might not necessarily be a lossless or complete representation of the type.
It may omit internal state, precision, or other information the type does not consider important
for user-facing output, as determined by the type. As such, the output of `Display` might not be
possible to parse, and even if it is, the result of parsing might not exactly match the original
value.

However, if a type has a lossless `Display` implementation whose output is meant to be
conveniently machine-parseable and not just meant for human consumption, then the type may wish
to accept the same format in `FromStr`, and document that usage. Having both `Display` and
`FromStr` implementations where the result of `Display` cannot be parsed with `FromStr` may
surprise users.

# Internationalization

Because a type can only have one `Display` implementation, it is often preferable
to only implement `Display` when there is a single most "obvious" way that
values can be formatted as text. This could mean formatting according to the
"invariant" culture and "undefined" locale, or it could mean that the type
display is designed for a specific culture/locale, such as developer logs.

If not all values have a justifiably canonical textual format or if you want
to support alternative formats not covered by the standard set of possible
[formatting traits], the most flexible approach is display adapters: methods
like `str::escape_default` or `Path::display` which create a wrapper
implementing `Display` to output the specific display format.

# Examples

Implementing `Display` on a type:

```rust
use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

let origin = Point { x: 0, y: 0 };

assert_eq!(format!("The origin is: {origin}"), "The origin is: (0, 0)");
```

## Display::fmt

```rust
fn fmt(&self, f: &mut Formatter<'_>) -> Result
```

# Examples

```rust
use std::fmt;

struct Position {
    longitude: f32,
    latitude: f32,
}

impl fmt::Display for Position {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.longitude, self.latitude)
    }
}

assert_eq!(
    "(1.987, 2.983)",
    format!("{}", Position { longitude: 1.987, latitude: 2.983, }),
);
```

## trait Octal

```rust
pub trait Octal: PointeeSized
```

`o` formatting.

The `Octal` trait should format its output as a number in base-8.

For primitive signed integers (`i8` to `i128`, and `isize`),
negative values are formatted as the two’s complement representation.

The alternate flag, `#`, adds a `0o` in front of the output.

For more information on formatters, see the module-level documentation.

# Examples

Basic usage with `i32`:

```rust
let x = 42; // 42 is '52' in octal

assert_eq!(format!("{x:o}"), "52");
assert_eq!(format!("{x:#o}"), "0o52");

assert_eq!(format!("{:o}", -16), "37777777760");
```

Implementing `Octal` on a type:

```rust
use std::fmt;

struct Length(i32);

impl fmt::Octal for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = self.0;

        fmt::Octal::fmt(&val, f) // delegate to i32's implementation
    }
}

let l = Length(9);

assert_eq!(format!("l as octal is: {l:o}"), "l as octal is: 11");

assert_eq!(format!("l as octal is: {l:#06o}"), "l as octal is: 0o0011");
```
