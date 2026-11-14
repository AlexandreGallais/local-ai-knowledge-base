---
title: "alloc::fmt (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/fmt.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::fmt (part 2 of 2)

format_spec := [fill]align'#'width[type]
fill := character
align := '<' | '^' | '>'
sign := '+' | '-'
width := count
precision := count | '*'
type := '?' | 'x?' | 'X?' | 'o' | 'x' | 'X' | 'p' | 'b' | 'e' | 'E'
count := parameter | integer
parameter := argument '$'
```rust
In the above grammar,
- `text` must not contain any `'{'` or `'}'` characters,
- `ws` is any character for which `char::is_whitespace` returns `true`, has no semantic
  meaning and is completely optional,
- `integer` is a decimal integer that may contain leading zeroes and must fit into an `usize` and
- `identifier` is an `IDENTIFIER_OR_KEYWORD` (not an `IDENTIFIER`) as
  defined by the [Rust language
  reference](https://doc.rust-lang.org/reference/identifiers.html), except
  for a bare `_`.

When requesting that an argument be formatted with a particular type, you
are actually requesting that an argument ascribes to a particular trait.
This allows multiple actual types to be formatted via `{:x}` (like `i8` as
well as `isize`). The current mapping of types to traits is:

* *nothing* ⇒ `Display`
* `?` ⇒ `Debug`
* `x?` ⇒ `Debug` with lower-case hexadecimal integers
* `X?` ⇒ `Debug` with upper-case hexadecimal integers
* `o` ⇒ `Octal`
* `x` ⇒ `LowerHex`
* `X` ⇒ `UpperHex`
* `p` ⇒ `Pointer`
* `b` ⇒ `Binary`
* `e` ⇒ `LowerExp`
* `E` ⇒ `UpperExp`

What this means is that any type of argument which implements the
`fmt::Binary``Binary` trait can then be formatted with `{:b}`. Implementations
are provided for these traits for a number of primitive types by the
standard library as well. If no format is specified (as in `{}` or `{:6}`),
then the format trait used is the `Display` trait.

When implementing a format trait for your own type, you will have to
implement a method of the signature:

```
#### #![allow(dead_code)]
#### use std::fmt;
#### struct Foo; // our custom type
#### impl fmt::Display for Foo {
fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
#### write!(f, "testing, testing")
#### } }
```rust

Your type will be passed as `self` by-reference, and then the function
should emit output into the Formatter `f` which implements `fmt::Write`. It is up to each
format trait implementation to correctly adhere to the requested formatting parameters.
The values of these parameters can be accessed with methods of the
`Formatter` struct. In order to help with this, the `Formatter` struct also
provides some helper methods.

Additionally, the return value of this function is `fmt::Result` which is a
type alias of <code>[Result]<(), [std::fmt::Error]></code>. Formatting implementations
should ensure that they propagate errors from the `Formatter` (e.g., when
calling `write!`). However, they should never return errors spuriously. That
is, a formatting implementation must and may only return an error if the
passed-in `Formatter` returns an error. This is because, contrary to what
the function signature might suggest, string formatting is an infallible
operation. This function only returns a `Result` because writing to the
underlying stream might fail and it must provide a way to propagate the fact
that an error has occurred back up the stack.

An example of implementing the formatting traits would look
like:

```
use std::fmt;

#[derive(Debug)]
struct Vector2D {
    x: isize,
    y: isize,
}

impl fmt::Display for Vector2D {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // The `f` value implements the `Write` trait, which is what the
        // write! macro is expecting. Note that this formatting ignores the
        // various flags provided to format strings.
        write!(f, "({}, {})", self.x, self.y)
    }
}

// Different traits allow different forms of output of a type. The meaning
// of this format is to print the magnitude of a vector.
impl fmt::Binary for Vector2D {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let magnitude = (self.x * self.x + self.y * self.y) as f64;
        let magnitude = magnitude.sqrt();

        // Respect the formatting flags by using the helper method
        // `pad_integral` on the Formatter object. See the method
        // documentation for details, and the function `pad` can be used
        // to pad strings.
        let decimals = f.precision().unwrap_or(3);
        let string = format!("{magnitude:.decimals$}");
        f.pad_integral(true, "", &string)
    }
}

fn main() {
    let myvector = Vector2D { x: 3, y: 4 };

    println!("{myvector}");       // => "(3, 4)"
    println!("{myvector:?}");     // => "Vector2D {x: 3, y:4}"
    println!("{myvector:10.3b}"); // => "     5.000"
}
```rust

#### `fmt::Display` vs `fmt::Debug`

These two formatting traits have distinct purposes:

- `fmt::Display``Display` implementations assert that the type can be faithfully
  represented as a UTF-8 string at all times. It is **not** expected that
  all types implement the `Display` trait.
- `fmt::Debug``Debug` implementations should be implemented for **all** public types.
  Output will typically represent the internal state as faithfully as possible.
  The purpose of the `Debug` trait is to facilitate debugging Rust code. In
  most cases, using `#[derive(Debug)]` is sufficient and recommended.

Some examples of the output from both traits:

```
assert_eq!(format!("{} {:?}", 3, 4), "3 4");
assert_eq!(format!("{} {:?}", 'a', 'b'), "a 'b'");
assert_eq!(format!("{} {:?}", "foo\n", "bar\n"), "foo\n \"bar\\n\"");
```rust

There are a number of related macros in the `format!` family. The ones that
are currently implemented are:

```
format!      // described above
write!       // first argument is either a &mut io::Write or a &mut fmt::Write, the destination
writeln!     // same as write but appends a newline
print!       // the format string is printed to the standard output
println!     // same as print but appends a newline
eprint!      // the format string is printed to the standard error
eprintln!    // same as eprint but appends a newline
format_args! // described below.
```rust

#### `write!`

`write!` and `writeln!` are two macros which are used to emit the format string
to a specified stream. This is used to prevent intermediate allocations of
format strings and instead directly write the output. Under the hood, this
function is actually invoking the `write_fmt` function defined on the
`std::io::Write` and the `std::fmt::Write` trait. Example usage is:

```
#### #![allow(unused_must_use)]
use std::io::Write;
let mut w = Vec::new();
write!(&mut w, "Hello {}!", "world");
```rust

#### `print!`

This and `println!` emit their output to stdout. Similarly to the `write!`
macro, the goal of these macros is to avoid intermediate allocations when
printing output. Example usage is:

```
print!("Hello {}!", "world");
println!("I have a newline {}", "character at the end");
```rust
#### `eprint!`

The `eprint!` and `eprintln!` macros are identical to
`print!` and `println!`, respectively, except they emit their
output to stderr.

#### `format_args!`

`format_args!` is a curious macro used to safely pass <example-value>
an opaque object describing the format string. This object
does not require any heap allocations to create, and it only
references information on the stack. Under the hood, all of
the related macros are implemented in terms of this. First
off, some example usage is:

```
#### #![allow(unused_must_use)]
use std::fmt;
use std::io::{self, Write};

let mut some_writer = io::stdout();
write!(&mut some_writer, "{}", format_args!("print with a {}", "macro"));

fn my_fmt_fn(args: fmt::Arguments<'_>) {
    write!(&mut io::stdout(), "{args}");
}
my_fmt_fn(format_args!(", or a {} too", "function"));
```rust

The result of the `format_args!` macro is a value of type `fmt::Arguments`.
This structure can then be passed to the `write` and `format` functions
inside this module in order to process the format string.
The goal of this macro is to even further prevent intermediate allocations
when dealing with formatting strings.

For example, a logging library could use the standard formatting syntax, but
it would internally pass <example-value> this structure until it has been determined
where output should go to.

`fmt::Result`: Result "fmt::Result"
[Result]: core::result::Result "std::result::Result"
[std::fmt::Error]: Error "fmt::Error"
`write`: write() "fmt::write"
`to_string`: crate::string::ToString::to_string "ToString::to_string"
`write_fmt`: ../../std/io/trait.Write.html#method.write_fmt
`std::io::Write`: ../../std/io/trait.Write.html
`std::fmt::Write`: ../../std/fmt/trait.Write.html
`print!`: ../../std/macro.print.html "print!"
`println!`: ../../std/macro.println.html "println!"
`eprint!`: ../../std/macro.eprint.html "eprint!"
`eprintln!`: ../../std/macro.eprintln.html "eprintln!"
`format_args!`: ../../std/macro.format_args.html "format_args!"
`fmt::Arguments`: Arguments "fmt::Arguments"
`format`: format() "fmt::format"

## fn format

```rust
pub fn format(args: Arguments<'_>) -> string::String
```

Takes an `Arguments` struct and returns the resulting formatted string.

The `Arguments` instance can be created with the `format_args!` macro.

# Examples

Basic usage:

```rust
use std::fmt;

let s = fmt::format(format_args!("Hello, {}!", "world"));
assert_eq!(s, "Hello, world!");
```

Please note that using `format!` might be preferable.
Example:

```rust
let s = format!("Hello, {}!", "world");
assert_eq!(s, "Hello, world!");
```
