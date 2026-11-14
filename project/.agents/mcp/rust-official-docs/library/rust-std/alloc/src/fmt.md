---
title: "alloc::fmt (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/fmt.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::fmt

Utilities for formatting and printing `String`s.

This module contains the runtime support for the `format!` syntax extension.
This macro is implemented in the compiler to emit calls to this module in
order to format arguments at runtime into strings.

#### Usage

The `format!` macro is intended to be familiar to those coming from C's
`printf`/`fprintf` functions or Python's `str.format` function.

Some examples of the `format!` extension are:

```rust
format!("Hello");                 // => "Hello"
format!("Hello, {}!", "world");   // => "Hello, world!"
format!("The number is {}", 1);   // => "The number is 1"
format!("{:?}", (3, 4));          // => "(3, 4)"
format!("{value}", value=4);      // => "4"
let people = "Rustaceans";
format!("Hello {people}!");       // => "Hello Rustaceans!"
format!("{} {}", 1, 2);           // => "1 2"
format!("{:04}", 42);             // => "0042" with leading zeros
format!("{:#?}", (100, 200));     // => "(
                                  //       100,
                                  //       200,
                                  //     )"
```

From these, you can see that the first argument is a format string. It is
required by the compiler for this to be a string literal; it cannot be a
variable passed in (in order to perform validity checking). The compiler
will then parse the format string and determine if the list of arguments
provided is suitable to pass to this format string.

To convert a single value to a string, use the `to_string` method. This
will use the `Display` formatting trait.

#### Positional parameters

Each formatting argument is allowed to specify which value argument it's
referencing, and if omitted it is assumed to be "the next argument". For
example, the format string `{} {} {}` would take three parameters, and they
would be formatted in the same order as they're given. The format string
`{2} {1} {0}`, however, would format arguments in reverse order.

Things can get a little tricky once you start intermingling the two types of
positional specifiers. The "next argument" specifier can be thought of as an
iterator over the argument. Each time a "next argument" specifier is seen,
the iterator advances. This leads to behavior like this:

```rust
format!("{1} {} {0} {}", 1, 2); // => "2 1 1 2"
```

The internal iterator over the argument has not been advanced by the time
the first `{}` is seen, so it prints the first argument. Then upon reaching
the second `{}`, the iterator has advanced forward to the second argument.
Essentially, parameters that explicitly name their argument do not affect
parameters that do not name an argument in terms of positional specifiers.

A format string is required to use all of its arguments, otherwise it is a
compile-time error. You may refer to the same argument more than once in the
format string.

#### Named parameters

Rust itself does not have a Python-like equivalent of named parameters to a
function, but the `format!` macro is a syntax extension that allows it to
leverage named parameters. Named parameters are listed at the end of the
argument list and have the syntax:

```
identifier '=' expression
```rust

For example, the following `format!` expressions all use named arguments:

```
#### #![allow(unused_must_use)]
format!("{argument}", argument = "test");   // => "test"
format!("{name} {}", 1, name = 2);          // => "2 1"
format!("{a} {c} {b}", a="a", b='b', c=3);  // => "a 3 b"
```rust

If a named parameter does not appear in the argument list, `format!` will
reference a variable with that name in the current scope.

```
#### #![allow(unused_must_use)]
let argument = 2 + 2;
format!("{argument}");   // => "4"

fn make_string(a: u32, b: &str) -> String {
    format!("{b} {a}")
}
make_string(927, "label"); // => "label 927"
```rust

It is not valid to put positional parameters (those without names) after
arguments that have names. Like with positional parameters, it is not
valid to provide named parameters that are unused by the format string.

Each argument being formatted can be transformed by a number of formatting
parameters (corresponding to `format_spec` in [the syntax](#syntax)). These
parameters affect the string representation of what's being formatted.

The colon `:` in format syntax divides identifier of the input data and
the formatting options, the colon itself does not change anything, only
introduces the options.

```
let a = 5;
let b = &a;
println!("{a:e} {b:p}"); // => 5e0 0x7ffe37b7273c
```rust

#### Width

```
// All of these print "Hello x    !"
println!("Hello {:5}!", "x");
println!("Hello {:1$}!", "x", 5);
println!("Hello {1:0$}!", 5, "x");
println!("Hello {:width$}!", "x", width = 5);
let width = 5;
println!("Hello {:width$}!", "x");
```rust

This is a parameter for the "minimum width" that the format should take up.
If the value's string does not fill up this many characters, then the
padding specified by fill/alignment will be used to take up the required
space (see below).

The width can also be provided dynamically by referencing another argument
with a `$` suffix. Use `{:N$}` to reference the Nth positional argument
(where N is an integer), or `{:name$}` to reference a named argument. The
referenced argument must be of type `usize`.

Referring to an argument with the dollar syntax does not affect the "next
argument" counter, so it's usually a good idea to refer to arguments by
position, or use named arguments.

#### Fill/Alignment

```
assert_eq!(format!("Hello {:<5}!", "x"),  "Hello x    !");
assert_eq!(format!("Hello {:-<5}!", "x"), "Hello x----!");
assert_eq!(format!("Hello {:^5}!", "x"),  "Hello   x  !");
assert_eq!(format!("Hello {:>5}!", "x"),  "Hello     x!");
```rust

The optional fill character and alignment is provided normally in conjunction with the
`width` parameter. It must be defined before `width`, right after the `:`.
This indicates that if the value being formatted is smaller than
`width` some extra characters will be printed around it.
Filling comes in the following variants for different alignments:

* `[fill]<` - the argument is left-aligned in `width` columns
* `[fill]^` - the argument is center-aligned in `width` columns
* `[fill]>` - the argument is right-aligned in `width` columns

The default [fill/alignment](#fillalignment) for non-numerics is a space and
left-aligned. The
default for numeric formatters is also a space character but with right-alignment. If
the `0` flag (see below) is specified for numerics, then the implicit fill character is
`0`.

Note that alignment might not be implemented by some types. In particular, it
is not generally implemented for the `Debug` trait.  A good way to ensure
padding is applied is to format your input, then pad this resulting string
to obtain your output:

```
println!("Hello {:^15}!", format!("{:?}", Some("hi"))); // => "Hello   Some("hi")   !"
```rust

#### Sign/`#`/`0`

```
assert_eq!(format!("Hello {:+}!", 5), "Hello +5!");
assert_eq!(format!("{:#x}!", 27), "0x1b!");
assert_eq!(format!("Hello {:05}!", 5),  "Hello 00005!");
assert_eq!(format!("Hello {:05}!", -5), "Hello -0005!");
assert_eq!(format!("{:#010x}!", 27), "0x0000001b!");
```rust

These are all flags altering the behavior of the formatter.

* `+` - This is intended for numeric types and indicates that the sign
        should always be printed. By default only the negative sign of signed values
        is printed, and the sign of positive or unsigned values is omitted.
        This flag indicates that the correct sign (`+` or `-`) should always be printed.
* `-` - Currently not used
* `#` - This flag indicates that the "alternate" form of printing should
        be used. The alternate forms are:
    * `#?` - pretty-print the `Debug` formatting (adds linebreaks and indentation)
    * `#x` - precedes the argument with a `0x`
    * `#X` - precedes the argument with a `0x`
    * `#b` - precedes the argument with a `0b`
    * `#o` - precedes the argument with a `0o`

  See [Formatting traits](#formatting-traits) for a description of what the `?`, `x`, `X`,
  `b`, and `o` flags do.

* `0` - This is used to indicate for integer formats that the padding to `width` should
        both be done with a `0` character as well as be sign-aware. A format
        like `{:08}` would yield `00000001` for the integer `1`, while the
        same format would yield `-0000001` for the integer `-1`. Notice that
        the negative version has one fewer zero than the positive version.
        Note that padding zeros are always placed after the sign (if any)
        and before the digits. When used together with the `#` flag, a similar
        rule applies: padding zeros are inserted after the prefix but before
        the digits. The prefix is included in the total width.
        This flag overrides the [fill character and alignment flag](#fillalignment).

#### Precision

For non-numeric types, this can be considered a "maximum width". If the resulting string is
longer than this width, then it is truncated down to this many characters and that truncated
value is emitted with proper `fill`, `alignment` and `width` if those parameters are set.

For integral types, this is ignored.

For floating-point types, this indicates how many digits after the decimal point should be
printed.

There are three possible ways to specify the desired `precision`:

1. An integer `.N`:

   the integer `N` itself is the precision.

2. An integer or name followed by dollar sign `.N$`:

   use the value of format *argument* `N` (which must be a `usize`) as the precision.
   An integer refers to a positional argument, and a name refers to a named argument.

3. An asterisk `.*`:

   `.*` means that this `{...}` is associated with *two* format inputs rather than one:
   - If a format string in the fashion of `{:<spec>.*}` is used, then the first input holds
     the `usize` precision, and the second holds the value to print.
   - If a format string in the fashion of `{<arg>:<spec>.*}` is used, then the `<arg>` part
     refers to the value to print, and the `precision` is taken like it was specified with an
     omitted positional parameter (`{}` instead of `{<arg>:}`).

For example, the following calls all print the same thing `Hello x is 0.01000`:

```
// Hello {arg 0 ("x")} is {arg 1 (0.01) with precision specified inline (5)}
println!("Hello {0} is {1:.5}", "x", 0.01);

// Hello {arg 1 ("x")} is {arg 2 (0.01) with precision specified in arg 0 (5)}
println!("Hello {1} is {2:.0$}", 5, "x", 0.01);

// Hello {arg 0 ("x")} is {arg 2 (0.01) with precision specified in arg 1 (5)}
println!("Hello {0} is {2:.1$}", "x", 5, 0.01);

// Hello {next arg -> arg 0 ("x")} is {second of next two args -> arg 2 (0.01) with precision
//                          specified in first of next two args -> arg 1 (5)}
println!("Hello {} is {:.*}",    "x", 5, 0.01);

// Hello {arg 1 ("x")} is {arg 2 (0.01) with precision
//                          specified in next arg -> arg 0 (5)}
println!("Hello {1} is {2:.*}",  5, "x", 0.01);

// Hello {next arg -> arg 0 ("x")} is {arg 2 (0.01) with precision
//                          specified in next arg -> arg 1 (5)}
println!("Hello {} is {2:.*}",   "x", 5, 0.01);

// Hello {next arg -> arg 0 ("x")} is {arg "number" (0.01) with precision specified
//                          in arg "prec" (5)}
println!("Hello {} is {number:.prec$}", "x", prec = 5, number = 0.01);
```rust

While these:

```
println!("{}, `{name:.*}` has 3 fractional digits", "Hello", 3, name=1234.56);
println!("{}, `{name:.*}` has 3 characters", "Hello", 3, name="1234.56");
println!("{}, `{name:>8.*}` has 3 right-aligned characters", "Hello", 3, name="1234.56");
```rust

print three significantly different things:

```
Hello, `1234.560` has 3 fractional digits
Hello, `123` has 3 characters
Hello, `     123` has 3 right-aligned characters
```rust

When truncating these values, Rust uses [round half-to-even](https://en.wikipedia.org/wiki/Rounding#Rounding_half_to_even),
which is the default rounding mode in IEEE 754.
For example,

```
print!("{0:.1$e}", 12345, 3);
print!("{0:.1$e}", 12355, 3);
```rust

Would return:

```
1.234e4
1.236e4
```rust

#### Localization

In some programming languages, the behavior of string formatting functions
depends on the operating system's locale setting. The format functions
provided by Rust's standard library do not have any concept of locale and
will produce the same results on all systems regardless of user
configuration.

For example, the following code will always print `1.5` even if the system
locale uses a decimal separator other than a dot.

```
println!("The value is {}", 1.5);
```rust

The literal characters `{` and `}` may be included in a string by preceding
them with the same character. For example, the `{` character is escaped with
`{{` and the `}` character is escaped with `}}`.

```
assert_eq!(format!("Hello {{}}"), "Hello {}");
assert_eq!(format!("{{ Hello"), "{ Hello");
```rust

To summarize, here you can find the full grammar of format strings.
The syntax for the formatting language used is drawn from other languages,
so it should not be too alien. Arguments are formatted with Python-like
syntax, meaning that arguments are surrounded by `{}` instead of the C-like
`%`. The actual grammar for the formatting syntax is:

```
format_string := text [ maybe_format text ] *
maybe_format := '{' '{' | '}' '}' | format
format := '{' [ argument ] [ ':' format_spec ] [ ws ] * '}'
argument := integer | identifier
