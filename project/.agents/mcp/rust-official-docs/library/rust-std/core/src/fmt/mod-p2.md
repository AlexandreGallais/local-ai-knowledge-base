---
title: "core::fmt (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/fmt/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::fmt (part 2 of 3)

## trait Binary

```rust
pub trait Binary: PointeeSized
```

`b` formatting.

The `Binary` trait should format its output as a number in binary.

For primitive signed integers (`i8` to `i128`, and `isize`),
negative values are formatted as the two’s complement representation.

The alternate flag, `#`, adds a `0b` in front of the output.

For more information on formatters, see the module-level documentation.

# Examples

Basic usage with `i32`:

```rust
let x = 42; // 42 is '101010' in binary

assert_eq!(format!("{x:b}"), "101010");
assert_eq!(format!("{x:#b}"), "0b101010");

assert_eq!(format!("{:b}", -16), "11111111111111111111111111110000");
```

Implementing `Binary` on a type:

```rust
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

For more information on formatters, see the module-level documentation.

# Examples

Basic usage with `i32`:

```rust
let y = 42; // 42 is '2a' in hex

assert_eq!(format!("{y:x}"), "2a");
assert_eq!(format!("{y:#x}"), "0x2a");

assert_eq!(format!("{:x}", -16), "fffffff0");
```

Implementing `LowerHex` on a type:

```rust
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

For more information on formatters, see the module-level documentation.

# Examples

Basic usage with `i32`:

```rust
let y = 42; // 42 is '2A' in hex

assert_eq!(format!("{y:X}"), "2A");
assert_eq!(format!("{y:#X}"), "0x2A");

assert_eq!(format!("{:X}", -16), "FFFFFFF0");
```

Implementing `UpperHex` on a type:

```rust
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
as hexadecimal. For more information on formatters, see the module-level documentation.

Printing of pointers is not a reliable way to discover how Rust programs are implemented.
The act of reading an address changes the program itself, and may change how the data is represented
in memory, and may affect which optimizations are applied to the code.

The printed pointer values are not guaranteed to be stable nor unique identifiers of objects.
Rust allows moving values to different memory locations, and may reuse the same memory locations
for different purposes.

There is no guarantee that the printed value can be converted back to a pointer.

# Examples

Basic usage with `&i32`:

```rust
let x = &42;

let address = format!("{x:p}"); // this produces something like '0x7f06092ac6d0'
```

Implementing `Pointer` on a type:

```rust
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

For more information on formatters, see the module-level documentation.

# Examples

Basic usage with `f64`:

```rust
let x = 42.0; // 42.0 is '4.2e1' in scientific notation

assert_eq!(format!("{x:e}"), "4.2e1");
```

Implementing `LowerExp` on a type:

```rust
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

For more information on formatters, see the module-level documentation.

# Examples

Basic usage with `f64`:

```rust
let x = 42.0; // 42.0 is '4.2E1' in scientific notation

assert_eq!(format!("{x:E}"), "4.2E1");
```

Implementing `UpperExp` on a type:

```rust
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

```rust
use std::fmt;

let mut output = String::new();
fmt::write(&mut output, format_args!("Hello {}!", "world"))
    .expect("Writing to a `String` should not fail");
assert_eq!(output, "Hello world!");
```

Please note that using `write!` might be preferable. Example:

```rust
use std::fmt::Write;

let mut output = String::new();
write!(&mut output, "Hello {}!", "world")
    .expect("Writing to a `String` should not fail");
assert_eq!(output, "Hello world!");
```

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

```rust
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

```rust
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

```rust
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

Glue for usage of the `write!` macro with implementors of this trait.

This method should generally not be invoked manually, but rather through
the `write!` macro itself.

Writes some formatted information into this instance.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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
