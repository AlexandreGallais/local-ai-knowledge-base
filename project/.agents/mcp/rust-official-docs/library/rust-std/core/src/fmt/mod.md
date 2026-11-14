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

```
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
[`Formatter`]. The only time your code should create a new instance of this
error is when implementing `fmt::Write`, in order to cancel the formatting operation when
writing to the underlying stream fails.

Any extra information must be arranged to be transmitted through some other means,
such as storing it in a field to be consulted after the formatting operation has been
cancelled. (For example, this is how [`std::io::Write::write_fmt()`] propagates IO errors
during writing.)

This type, `fmt::Error`, should not be
confused with [`std::io::Error`] or [`std::error::Error`], which you may also
have in scope.

[`std::io::Error`]: ../../std/io/struct.Error.html
[`std::io::Write::write_fmt()`]: ../../std/io/trait.Write.html#method.write_fmt
[`std::error::Error`]: ../../std/error/trait.Error.html

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
otherwise you should implement [`std::io::Write`].

[`std::io::Write`]: ../../std/io/trait.Write.html
[flushable]: ../../std/io/trait.Write.html#tymethod.flush

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

This function will return an instance of [`std::fmt::Error`][Error] on error.

The purpose of that error is to abort the formatting operation when the underlying
destination encounters some error preventing it from accepting more text;
in particular, it does not communicate any information about *what* error occurred.
It should generally be propagated rather than handled, at least when implementing
formatting traits.

# Examples

```
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, s: &str) -> Result<(), Error> {
    f.write_str(s)
}

let mut buf = String::new();
writer(&mut buf, "hola")?;
assert_eq!(&buf, "hola");
# std::fmt::Result::Ok(())
```

## Write::write_char

```rust
fn write_char(&mut self, c: char) -> Result
```

Writes a [`char`] into this writer, returning whether the write succeeded.

A single [`char`] may be encoded as more than one byte.
This method can only succeed if the entire byte sequence was successfully
written, and this method will not return until all data has been
written or an error occurs.

# Errors

This function will return an instance of [`Error`] on error.

# Examples

```
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, c: char) -> Result<(), Error> {
    f.write_char(c)
}

let mut buf = String::new();
writer(&mut buf, 'a')?;
writer(&mut buf, 'b')?;
assert_eq!(&buf, "ab");
# std::fmt::Result::Ok(())
```

## Write::write_fmt

```rust
fn write_fmt(&mut self, args: Arguments<'_>) -> Result
```

Glue for usage of the [`write!`] macro with implementors of this trait.

This method should generally not be invoked manually, but rather through
the [`write!`] macro itself.

# Errors

This function will return an instance of [`Error`] on error. Please see
[write_str](Write::write_str) for details.

# Examples

```
use std::fmt::{Error, Write};

fn writer<W: Write>(f: &mut W, s: &str) -> Result<(), Error> {
    f.write_fmt(format_args!("{s}"))
}

let mut buf = String::new();
writer(&mut buf, "world")?;
assert_eq!(&buf, "world");
# std::fmt::Result::Ok(())
```

## struct Formatter

```rust
pub struct Formatter<'a>
```

Configuration for formatting.

A `Formatter` represents various options related to formatting. Users do not
construct `Formatter`s directly; a mutable reference to one is passed to
the `fmt` method of all formatting traits, like [`Debug`] and [`Display`].

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

For more information on formatters, see [the module-level documentation][module].

[module]: ../../std/fmt/index.html

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

```
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

```
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

There are a number of helper methods on the [`Formatter`] struct to help you with manual
implementations, such as [`debug_struct`].

[`debug_struct`]: Formatter::debug_struct

Types that do not wish to use the standard suite of debug representations
provided by the `Formatter` trait (`debug_struct`, `debug_tuple`,
`debug_list`, `debug_set`, `debug_map`) can do something totally custom by
manually writing an arbitrary representation to the `Formatter`.

```
# use std::fmt;
# struct Point {
#     x: i32,
#     y: i32,
# }
#
impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Point [{} {}]", self.x, self.y)
    }
}
```

`Debug` implementations using either `derive` or the debug builder API
on [`Formatter`] support pretty-printing using the alternate flag: `{:#?}`.

Pretty-printing with `#?`:

```
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

```
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
[`ToString`][tostring] trait for the type, allowing the usage
of the [`.to_string()`][tostring_function] method. Prefer implementing
the `Display` trait for a type, rather than [`ToString`][tostring].

`Display` is similar to [`Debug`], but `Display` is for user-facing
output, and so cannot be derived.

For more information on formatters, see [the module-level documentation][module].

[module]: ../../std/fmt/index.html
[tostring]: ../../std/string/trait.ToString.html
[tostring_function]: ../../std/string/trait.ToString.html#tymethod.to_string

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
like [`str::escape_default`] or [`Path::display`] which create a wrapper
implementing `Display` to output the specific display format.

[formatting traits]: ../../std/fmt/index.html#formatting-traits
[`Path::display`]: ../../std/path/struct.Path.html#method.display

# Examples

Implementing `Display` on a type:

```
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

```
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

For more information on formatters, see [the module-level documentation][module].

[module]: ../../std/fmt/index.html

# Examples

Basic usage with `i32`:

```
let x = 42; // 42 is '52' in octal

assert_eq!(format!("{x:o}"), "52");
assert_eq!(format!("{x:#o}"), "0o52");

assert_eq!(format!("{:o}", -16), "37777777760");
```

Implementing `Octal` on a type:

```
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

## trait Binary

```rust
pub trait Binary: PointeeSized
```

`b` formatting.

The `Binary` trait should format its output as a number in binary.

For primitive signed integers ([`i8`] to [`i128`], and [`isize`]),
negative values are formatted as the two’s complement representation.

The alternate flag, `#`, adds a `0b` in front of the output.

For more information on formatters, see [the module-level documentation][module].

[module]: ../../std/fmt/index.html

# Examples

Basic usage with [`i32`]:

```
let x = 42; // 42 is '101010' in binary

assert_eq!(format!("{x:b}"), "101010");
assert_eq!(format!("{x:#b}"), "0b101010");

assert_eq!(format!("{:b}", -16), "11111111111111111111111111110000");
```

Implementing `Binary` on a type:

```
use std::fmt;

struct Length(i32);

impl fmt::Binary for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = self.0;

        fmt::Binary::fmt(&val, f) // delegate to i32's implementation
    }
}

let l = Length(107);

assert_eq!(format!("l as binary is: {l:b}"), "l as binary is: 1101011");

assert_eq!(
    // Note that the `0b` prefix added by `#` is included in the total width, so we
    // need to add two to correctly display all 32 bits.
    format!("l as binary is: {l:#034b}"),
    "l as binary is: 0b00000000000000000000000001101011"
);
```

## trait LowerHex

```rust
pub trait LowerHex: PointeeSized
```

`x` formatting.

The `LowerHex` trait should format its output as a number in hexadecimal, with `a` through `f`
in lower case.

For primitive signed integers (`i8` to `i128`, and `isize`),
negative values are formatted as the two’s complement representation.

The alternate flag, `#`, adds a `0x` in front of the output.

For more information on formatters, see [the module-level documentation][module].

[module]: ../../std/fmt/index.html

# Examples

Basic usage with `i32`:

```
let y = 42; // 42 is '2a' in hex

assert_eq!(format!("{y:x}"), "2a");
assert_eq!(format!("{y:#x}"), "0x2a");

assert_eq!(format!("{:x}", -16), "fffffff0");
```

Implementing `LowerHex` on a type:

```
use std::fmt;

struct Length(i32);

impl fmt::LowerHex for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = self.0;

        fmt::LowerHex::fmt(&val, f) // delegate to i32's implementation
    }
}

let l = Length(9);

assert_eq!(format!("l as hex is: {l:x}"), "l as hex is: 9");

assert_eq!(format!("l as hex is: {l:#010x}"), "l as hex is: 0x00000009");
```

## trait UpperHex

```rust
pub trait UpperHex: PointeeSized
```

`X` formatting.

The `UpperHex` trait should format its output as a number in hexadecimal, with `A` through `F`
in upper case.

For primitive signed integers (`i8` to `i128`, and `isize`),
negative values are formatted as the two’s complement representation.

The alternate flag, `#`, adds a `0x` in front of the output.

For more information on formatters, see [the module-level documentation][module].

[module]: ../../std/fmt/index.html

# Examples

Basic usage with `i32`:

```
let y = 42; // 42 is '2A' in hex

assert_eq!(format!("{y:X}"), "2A");
assert_eq!(format!("{y:#X}"), "0x2A");

assert_eq!(format!("{:X}", -16), "FFFFFFF0");
```

Implementing `UpperHex` on a type:

```
use std::fmt;

struct Length(i32);

impl fmt::UpperHex for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = self.0;

        fmt::UpperHex::fmt(&val, f) // delegate to i32's implementation
    }
}

let l = Length(i32::MAX);

assert_eq!(format!("l as hex is: {l:X}"), "l as hex is: 7FFFFFFF");

assert_eq!(format!("l as hex is: {l:#010X}"), "l as hex is: 0x7FFFFFFF");
```

## trait Pointer

```rust
pub trait Pointer: PointeeSized
```

`p` formatting.

The `Pointer` trait should format its output as a memory location. This is commonly presented
as hexadecimal. For more information on formatters, see [the module-level documentation][module].

Printing of pointers is not a reliable way to discover how Rust programs are implemented.
The act of reading an address changes the program itself, and may change how the data is represented
in memory, and may affect which optimizations are applied to the code.

The printed pointer values are not guaranteed to be stable nor unique identifiers of objects.
Rust allows moving values to different memory locations, and may reuse the same memory locations
for different purposes.

There is no guarantee that the printed value can be converted back to a pointer.

[module]: ../../std/fmt/index.html

# Examples

Basic usage with `&i32`:

```
let x = &42;

let address = format!("{x:p}"); // this produces something like '0x7f06092ac6d0'
```

Implementing `Pointer` on a type:

```
use std::fmt;

struct Length(i32);

impl fmt::Pointer for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // use `as` to convert to a `*const T`, which implements Pointer, which we can use

        let ptr = self as *const Self;
        fmt::Pointer::fmt(&ptr, f)
    }
}

let l = Length(42);

println!("l is in memory here: {l:p}");

let l_ptr = format!("{l:018p}");
assert_eq!(l_ptr.len(), 18);
assert_eq!(&l_ptr[..2], "0x");
```

## trait LowerExp

```rust
pub trait LowerExp: PointeeSized
```

`e` formatting.

The `LowerExp` trait should format its output in scientific notation with a lower-case `e`.

For more information on formatters, see [the module-level documentation][module].

[module]: ../../std/fmt/index.html

# Examples

Basic usage with `f64`:

```
let x = 42.0; // 42.0 is '4.2e1' in scientific notation

assert_eq!(format!("{x:e}"), "4.2e1");
```

Implementing `LowerExp` on a type:

```
use std::fmt;

struct Length(i32);

impl fmt::LowerExp for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = f64::from(self.0);
        fmt::LowerExp::fmt(&val, f) // delegate to f64's implementation
    }
}

let l = Length(100);

assert_eq!(
    format!("l in scientific notation is: {l:e}"),
    "l in scientific notation is: 1e2"
);

assert_eq!(
    format!("l in scientific notation is: {l:05e}"),
    "l in scientific notation is: 001e2"
);
```

## trait UpperExp

```rust
pub trait UpperExp: PointeeSized
```

`E` formatting.

The `UpperExp` trait should format its output in scientific notation with an upper-case `E`.

For more information on formatters, see [the module-level documentation][module].

[module]: ../../std/fmt/index.html

# Examples

Basic usage with `f64`:

```
let x = 42.0; // 42.0 is '4.2E1' in scientific notation

assert_eq!(format!("{x:E}"), "4.2E1");
```

Implementing `UpperExp` on a type:

```
use std::fmt;

struct Length(i32);

impl fmt::UpperExp for Length {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let val = f64::from(self.0);
        fmt::UpperExp::fmt(&val, f) // delegate to f64's implementation
    }
}

let l = Length(100);

assert_eq!(
    format!("l in scientific notation is: {l:E}"),
    "l in scientific notation is: 1E2"
);

assert_eq!(
    format!("l in scientific notation is: {l:05E}"),
    "l in scientific notation is: 001E2"
);
```

## fn write

```rust
pub fn write(output: &mut dyn Write, fmt: Arguments<'_>) -> Result
```

Takes an output stream and an `Arguments` struct that can be precompiled with
the `format_args!` macro.

The arguments will be formatted according to the specified format string
into the output stream provided.

# Examples

Basic usage:

```
use std::fmt;

let mut output = String::new();
fmt::write(&mut output, format_args!("Hello {}!", "world"))
    .expect("Writing to a `String` should not fail");
assert_eq!(output, "Hello world!");
```

Please note that using [`write!`] might be preferable. Example:

```
use std::fmt::Write;

let mut output = String::new();
write!(&mut output, "Hello {}!", "world")
    .expect("Writing to a `String` should not fail");
assert_eq!(output, "Hello world!");
```

[`write!`]: crate::write!

## Formatter::pad_integral

```rust
pub fn pad_integral(&mut self, is_nonnegative: bool, prefix: &str, buf: &str) -> Result
```

Performs the correct padding for an integer which has already been
emitted into a str. The str should *not* contain the sign for the
integer, that will be added by this method.

# Arguments

* is_nonnegative - whether the original integer was either positive or zero.
* prefix - if the '#' character (Alternate) is provided, this
  is the prefix to put in front of the number.
* buf - the byte array that the number has been formatted into

This function will correctly account for the flags provided as well as
the minimum width. It will not take precision into account.

# Examples

```
use std::fmt;

struct Foo { nb: i32 }

impl Foo {
    fn new(nb: i32) -> Foo {
        Foo {
            nb,
        }
    }
}

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        // We need to remove "-" from the number output.
        let tmp = self.nb.abs().to_string();

        formatter.pad_integral(self.nb >= 0, "Foo ", &tmp)
    }
}

assert_eq!(format!("{}", Foo::new(2)), "2");
assert_eq!(format!("{}", Foo::new(-1)), "-1");
assert_eq!(format!("{}", Foo::new(0)), "0");
assert_eq!(format!("{:#}", Foo::new(-1)), "-Foo 1");
assert_eq!(format!("{:0>#8}", Foo::new(-1)), "00-Foo 1");
```

## Formatter::pad

```rust
pub fn pad(&mut self, s: &str) -> Result
```

Takes a string slice and emits it to the internal buffer after applying
the relevant formatting flags specified.

The flags recognized for generic strings are:

* width - the minimum width of what to emit
* fill/align - what to emit and where to emit it if the string
               provided needs to be padded
* precision - the maximum length to emit, the string is truncated if it
              is longer than this length

Notably this function ignores the `flag` parameters.

# Examples

```
use std::fmt;

struct Foo;

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.pad("Foo")
    }
}

assert_eq!(format!("{Foo:<4}"), "Foo ");
assert_eq!(format!("{Foo:0>4}"), "0Foo");
```

## Formatter::write_str

```rust
pub fn write_str(&mut self, data: &str) -> Result
```

Writes some data to the underlying buffer contained within this
formatter.

# Examples

```
use std::fmt;

struct Foo;

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("Foo")
        // This is equivalent to:
        // write!(formatter, "Foo")
    }
}

assert_eq!(format!("{Foo}"), "Foo");
assert_eq!(format!("{Foo:0>8}"), "Foo");
```

## Formatter::write_fmt

```rust
pub fn write_fmt(&mut self, fmt: Arguments<'_>) -> Result
```

Glue for usage of the [`write!`] macro with implementors of this trait.

This method should generally not be invoked manually, but rather through
the [`write!`] macro itself.

Writes some formatted information into this instance.

# Examples

```
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_fmt(format_args!("Foo {}", self.0))
    }
}

assert_eq!(format!("{}", Foo(-1)), "Foo -1");
assert_eq!(format!("{:0>8}", Foo(2)), "Foo 2");
```

## Formatter::flags

```rust
pub fn flags(&self) -> u32
```

Returns flags for formatting.

## Formatter::fill

```rust
pub fn fill(&self) -> char
```

Returns the character used as 'fill' whenever there is alignment.

# Examples

```
use std::fmt;

struct Foo;

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let c = formatter.fill();
        if let Some(width) = formatter.width() {
            for _ in 0..width {
                write!(formatter, "{c}")?;
            }
            Ok(())
        } else {
            write!(formatter, "{c}")
        }
    }
}

// We set alignment to the right with ">".
assert_eq!(format!("{Foo:G>3}"), "GGG");
assert_eq!(format!("{Foo:t>6}"), "tttttt");
```

## Formatter::align

```rust
pub fn align(&self) -> Option<Alignment>
```

Returns a flag indicating what form of alignment was requested.

# Examples

```
use std::fmt::{self, Alignment};

struct Foo;

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = if let Some(s) = formatter.align() {
            match s {
                Alignment::Left    => "left",
                Alignment::Right   => "right",
                Alignment::Center  => "center",
            }
        } else {
            "into the void"
        };
        write!(formatter, "{s}")
    }
}

assert_eq!(format!("{Foo:<}"), "left");
assert_eq!(format!("{Foo:>}"), "right");
assert_eq!(format!("{Foo:^}"), "center");
assert_eq!(format!("{Foo}"), "into the void");
```

## Formatter::width

```rust
pub fn width(&self) -> Option<usize>
```

Returns the optionally specified integer width that the output should be.

# Examples

```
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if let Some(width) = formatter.width() {
            // If we received a width, we use it
            write!(formatter, "{:width$}", format!("Foo({})", self.0), width = width)
        } else {
            // Otherwise we do nothing special
            write!(formatter, "Foo({})", self.0)
        }
    }
}

assert_eq!(format!("{:10}", Foo(23)), "Foo(23)   ");
assert_eq!(format!("{}", Foo(23)), "Foo(23)");
```

## Formatter::precision

```rust
pub fn precision(&self) -> Option<usize>
```

Returns the optionally specified precision for numeric types.
Alternatively, the maximum width for string types.

# Examples

```
use std::fmt;

struct Foo(f32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if let Some(precision) = formatter.precision() {
            // If we received a precision, we use it.
            write!(formatter, "Foo({1:.*})", precision, self.0)
        } else {
            // Otherwise we default to 2.
            write!(formatter, "Foo({:.2})", self.0)
        }
    }
}

assert_eq!(format!("{:.4}", Foo(23.2)), "Foo(23.2000)");
assert_eq!(format!("{}", Foo(23.2)), "Foo(23.20)");
```

## Formatter::sign_plus

```rust
pub fn sign_plus(&self) -> bool
```

Determines if the `+` flag was specified.

# Examples

```
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if formatter.sign_plus() {
            write!(formatter,
                   "Foo({}{})",
                   if self.0 < 0 { '-' } else { '+' },
                   self.0.abs())
        } else {
            write!(formatter, "Foo({})", self.0)
        }
    }
}

assert_eq!(format!("{:+}", Foo(23)), "Foo(+23)");
assert_eq!(format!("{:+}", Foo(-23)), "Foo(-23)");
assert_eq!(format!("{}", Foo(23)), "Foo(23)");
```

## Formatter::sign_minus

```rust
pub fn sign_minus(&self) -> bool
```

Determines if the `-` flag was specified.

# Examples

```
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if formatter.sign_minus() {
            // You want a minus sign? Have one!
            write!(formatter, "-Foo({})", self.0)
        } else {
            write!(formatter, "Foo({})", self.0)
        }
    }
}

assert_eq!(format!("{:-}", Foo(23)), "-Foo(23)");
assert_eq!(format!("{}", Foo(23)), "Foo(23)");
```

## Formatter::alternate

```rust
pub fn alternate(&self) -> bool
```

Determines if the `#` flag was specified.

# Examples

```
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if formatter.alternate() {
            write!(formatter, "Foo({})", self.0)
        } else {
            write!(formatter, "{}", self.0)
        }
    }
}

assert_eq!(format!("{:#}", Foo(23)), "Foo(23)");
assert_eq!(format!("{}", Foo(23)), "23");
```

## Formatter::sign_aware_zero_pad

```rust
pub fn sign_aware_zero_pad(&self) -> bool
```

Determines if the `0` flag was specified.

# Examples

```
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        assert!(formatter.sign_aware_zero_pad());
        assert_eq!(formatter.width(), Some(4));
        // We ignore the formatter's options.
        write!(formatter, "{}", self.0)
    }
}

assert_eq!(format!("{:04}", Foo(23)), "23");
```

## Formatter::debug_struct

```rust
pub fn debug_struct<'b>(&'b mut self, name: &str) -> DebugStruct<'b, 'a>
```

Creates a [`DebugStruct`] builder designed to assist with creation of
[`fmt::Debug`] implementations for structs.

[`fmt::Debug`]: self::Debug

# Examples

```rust
use std::fmt;
use std::net::Ipv4Addr;

struct Foo {
    bar: i32,
    baz: String,
    addr: Ipv4Addr,
}

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Foo")
            .field("bar", &self.bar)
            .field("baz", &self.baz)
            .field("addr", &format_args!("{}", self.addr))
            .finish()
    }
}

assert_eq!(
    "Foo { bar: 10, baz: \"Hello World\", addr: 127.0.0.1 }",
    format!("{:?}", Foo {
        bar: 10,
        baz: "Hello World".to_string(),
        addr: Ipv4Addr::new(127, 0, 0, 1),
    })
);
```

## Formatter::debug_tuple

```rust
pub fn debug_tuple<'b>(&'b mut self, name: &str) -> DebugTuple<'b, 'a>
```

Creates a `DebugTuple` builder designed to assist with creation of
`fmt::Debug` implementations for tuple structs.

# Examples

```rust
use std::fmt;
use std::marker::PhantomData;

struct Foo<T>(i32, String, PhantomData<T>);

impl<T> fmt::Debug for Foo<T> {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
            .field(&self.0)
            .field(&self.1)
            .field(&format_args!("_"))
            .finish()
    }
}

assert_eq!(
    "Foo(10, \"Hello\", _)",
    format!("{:?}", Foo(10, "Hello".to_string(), PhantomData::<u8>))
);
```

## Formatter::debug_list

```rust
pub fn debug_list<'b>(&'b mut self) -> DebugList<'b, 'a>
```

Creates a `DebugList` builder designed to assist with creation of
`fmt::Debug` implementations for list-like structures.

# Examples

```rust
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list().entries(self.0.iter()).finish()
    }
}

assert_eq!(format!("{:?}", Foo(vec![10, 11])), "[10, 11]");
```

## Formatter::debug_set

```rust
pub fn debug_set<'b>(&'b mut self) -> DebugSet<'b, 'a>
```

Creates a `DebugSet` builder designed to assist with creation of
`fmt::Debug` implementations for set-like structures.

# Examples

```rust
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set().entries(self.0.iter()).finish()
    }
}

assert_eq!(format!("{:?}", Foo(vec![10, 11])), "{10, 11}");
```

[`format_args!`]: crate::format_args

In this more complex example, we use [`format_args!`] and `.debug_set()`
to build a list of match arms:

```rust
use std::fmt;

struct Arm<'a, L, R>(&'a (L, R));
struct Table<'a, K, V>(&'a [(K, V)], V);

impl<'a, L, R> fmt::Debug for Arm<'a, L, R>
where
    L: 'a + fmt::Debug, R: 'a + fmt::Debug
{
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        L::fmt(&(self.0).0, fmt)?;
        fmt.write_str(" => ")?;
        R::fmt(&(self.0).1, fmt)
    }
}

impl<'a, K, V> fmt::Debug for Table<'a, K, V>
where
    K: 'a + fmt::Debug, V: 'a + fmt::Debug
{
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set()
        .entries(self.0.iter().map(Arm))
        .entry(&Arm(&(format_args!("_"), &self.1)))
        .finish()
    }
}
```

## Formatter::debug_map

```rust
pub fn debug_map<'b>(&'b mut self) -> DebugMap<'b, 'a>
```

Creates a `DebugMap` builder designed to assist with creation of
`fmt::Debug` implementations for map-like structures.

# Examples

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map().entries(self.0.iter().map(|&(ref k, ref v)| (k, v))).finish()
    }
}

assert_eq!(
    format!("{:?}",  Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    r#"{"A": 10, "B": 11}"#
 );
```