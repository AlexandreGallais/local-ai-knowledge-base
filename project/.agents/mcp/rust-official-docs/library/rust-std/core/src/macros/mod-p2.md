---
title: "core::macros (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/macros/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::macros (part 2 of 3)

## macro compile_error!

```rust
macro_rules! compile_error
```

Causes compilation to fail with the given error message when encountered.

This macro should be used when a crate uses a conditional compilation strategy to provide
better error messages for erroneous conditions. It's the compiler-level form of `panic!`,
but emits an error during *compilation* rather than at *runtime*.

# Examples

Two such examples are macros and `#[cfg]` environments.

Emit a better compiler error if a macro is passed invalid values. Without the final branch,
the compiler would still emit an error, but the error's message would not mention the two
valid values.

```rust
macro_rules! give_me_foo_or_bar {
    (foo) => {};
    (bar) => {};
    ($x:ident) => {
        compile_error!("This macro only accepts `foo` or `bar`");
    }
}

give_me_foo_or_bar!(neither);
// ^ will fail at compile time with message "This macro only accepts `foo` or `bar`"
```

Emit a compiler error if one of a number of features isn't available.

```rust
#[cfg(not(any(feature = "foo", feature = "bar")))]
compile_error!("Either feature \"foo\" or \"bar\" must be enabled for this crate.");
```

## macro format_args!

```rust
macro_rules! format_args
```

Constructs parameters for the other string-formatting macros.

This macro functions by taking a formatting string literal containing
`{}` for each additional argument passed. `format_args!` prepares the
additional parameters to ensure the output can be interpreted as a string
and canonicalizes the arguments into a single type. Any value that implements
the `Display` trait can be passed to `format_args!`, as can any
`Debug` implementation be passed to a `{:?}` within the formatting string.

This macro produces a value of type `fmt::Arguments`. This value can be
passed to the macros within `std::fmt` for performing useful redirection.
All other formatting macros (`format!`, `write!`, `println!`, etc) are
proxied through this one. `format_args!`, unlike its derived macros, avoids
heap allocations.

You can use the `fmt::Arguments` value that `format_args!` returns
in `Debug` and `Display` contexts as seen below. The example also shows
that `Debug` and `Display` format to the same thing: the interpolated
format string in `format_args!`.

```rust
let args = format_args!("{} foo {:?}", 1, 2);
let debug = format!("{args:?}");
let display = format!("{args}");
assert_eq!("1 foo 2", display);
assert_eq!(display, debug);
```

See the formatting documentation in `std::fmt`
for details of the macro argument syntax, and further information.

# Examples

```rust
use std::fmt;

let s = fmt::format(format_args!("hello {}", "world"));
assert_eq!(s, format!("hello {}", "world"));
```

# Argument lifetimes

Except when no formatting arguments are used,
the produced `fmt::Arguments` value borrows temporary values.
To allow it to be stored for later use, the arguments' lifetimes, as well as those of
temporaries they borrow, may be [extended] when `format_args!` appears in the initializer
expression of a `let` statement. The syntactic rules used to determine when temporaries'
lifetimes are extended are documented in the [Reference].

## macro env!

```rust
macro_rules! env
```

Inspects an environment variable at compile time.

This macro will expand to the value of the named environment variable at
compile time, yielding an expression of type `&'static str`. Use
`std::env::var` instead if you want to read the value at runtime.

If the environment variable is not defined, then a compilation error
will be emitted. To not emit a compile error, use the `option_env!`
macro instead. A compilation error will also be emitted if the
environment variable is not a valid Unicode string.

# Examples

```rust
let path: &'static str = env!("PATH");
println!("the $PATH variable at the time of compiling was: {path}");
```

You can customize the error message by passing a string as the second
parameter:

```rust
let doc: &'static str = env!("documentation", "what's that?!");
```

If the `documentation` environment variable is not defined, you'll get
the following error:

```
error: what's that?!
```rust

## macro option_env!

```rust
macro_rules! option_env
```

Optionally inspects an environment variable at compile time.

If the named environment variable is present at compile time, this will
expand into an expression of type `Option<&'static str>` whose value is
`Some` of the value of the environment variable (a compilation error
will be emitted if the environment variable is not a valid Unicode
string). If the environment variable is not present, then this will
expand to `None`. See `Option<T>`[Option] for more information on this
type.  Use `std::env::var` instead if you want to read the value at
runtime.

A compile time error is only emitted when using this macro if the
environment variable exists and is not a valid Unicode string. To also
emit a compile error if the environment variable is not present, use the
`env!` macro instead.

# Examples

```rust
let key: <example-value><&'static str> = option_env!("SECRET_KEY");
println!("<example-value>");
```

## macro concat!

```rust
macro_rules! concat
```

Concatenates literals into a static string slice.

This macro takes any number of comma-separated literals, yielding an
expression of type `&'static str` which represents all of the literals
concatenated left-to-right.

Integer and floating point literals are stringified in order to be
concatenated.

# Examples

```rust
let s = concat!("test", 10, 'b', true);
assert_eq!(s, "test10btrue");
```

## macro line!

```rust
macro_rules! line
```

Expands to the line number on which it was invoked.

With `column!` and `file!`, these macros provide debugging information for
developers about the location within the source.

The expanded expression has type `u32` and is 1-based, so the first line
in each file evaluates to 1, the second to 2, etc. This is consistent
with error messages by common compilers or popular editors.
The returned line is *not necessarily* the line of the `line!` invocation itself,
but rather the first macro invocation leading up to the invocation
of the `line!` macro.

# Examples

```rust
let current_line = line!();
println!("defined on line: {current_line}");
```

## macro column!

```rust
macro_rules! column
```

Expands to the column number at which it was invoked.

With `line!` and `file!`, these macros provide debugging information for
developers about the location within the source.

The expanded expression has type `u32` and is 1-based, so the first column
in each line evaluates to 1, the second to 2, etc. This is consistent
with error messages by common compilers or popular editors.
The returned column is *not necessarily* the line of the `column!` invocation itself,
but rather the first macro invocation leading up to the invocation
of the `column!` macro.

# Examples

```rust
let current_col = column!();
println!("defined on column: {current_col}");
```

`column!` counts Unicode code points, not bytes or graphemes. As a result, the first two
invocations return the same value, but the third does not.

```rust
let a = ("foobar", column!()).1;
let b = ("人之初性本善", column!()).1;
let c = ("f̅o̅o̅b̅a̅r̅", column!()).1; // Uses combining overline (U+0305)

assert_eq!(a, b);
assert_ne!(b, c);
```

## macro file!

```rust
macro_rules! file
```

Expands to the file name in which it was invoked.

With `line!` and `column!`, these macros provide debugging information for
developers about the location within the source.

The expanded expression has type `&'static str`, and the returned file
is not the invocation of the `file!` macro itself, but rather the
first macro invocation leading up to the invocation of the `file!`
macro.

The file name is derived from the crate root's source path passed to the Rust compiler
and the sequence the compiler takes to get from the crate root to the
module containing `file!`, modified by any flags passed to the Rust compiler (e.g.
`--remap-path-prefix`).  If the crate's source path is relative, the initial base
directory will be the working directory of the Rust compiler.  For example, if the source
path passed to the compiler is `./src/lib.rs` which has a `mod foo;` with a source path of
`src/foo/mod.rs`, then calling `file!` inside `mod foo;` will return `./src/foo/mod.rs`.

Future compiler options might make further changes to the behavior of `file!`,
including potentially making it entirely empty. Code (e.g. test libraries)
relying on `file!` producing an openable file path would be incompatible
with such options, and might wish to recommend not using those options.

# Examples

```rust
let this_file = file!();
println!("defined in file: {this_file}");
```

## macro stringify!

```rust
macro_rules! stringify
```

Stringifies its arguments.

This macro will yield an expression of type `&'static str` which is the
stringification of all the tokens passed to the macro. No restrictions
are placed on the syntax of the macro invocation itself.

Note that the expanded results of the input tokens may change in the
future. You should be careful if you rely on the output.

# Examples

```rust
let one_plus_one = stringify!(1 + 1);
assert_eq!(one_plus_one, "1 + 1");
```

## macro include_str!

```rust
macro_rules! include_str
```

Includes a UTF-8 encoded file as a string.

The file is located relative to the current file (similarly to how
modules are found). The provided path is interpreted in a platform-specific
way at compile time. So, for instance, an invocation with a Windows path
containing backslashes `\` would not compile correctly on Unix.

This macro will yield an expression of type `&'static str` which is the
contents of the file.

# Examples

Assume there are two files in the same directory with the following
contents:

File 'spanish.in':

```
adiós
```rust

File 'main.rs':

```
fn main() {
    let my_str = include_str!("spanish.in");
    assert_eq!(my_str, "adiós\n");
    print!("{my_str}");
}
```rust

Compiling 'main.rs' and running the resulting binary will print "adiós".

## macro include_bytes!

```rust
macro_rules! include_bytes
```

Includes a file as a reference to a byte array.

The file is located relative to the current file (similarly to how
modules are found). The provided path is interpreted in a platform-specific
way at compile time. So, for instance, an invocation with a Windows path
containing backslashes `\` would not compile correctly on Unix.

This macro will yield an expression of type `&'static [u8; N]` which is
the contents of the file.

# Examples

Assume there are two files in the same directory with the following
contents:

File 'spanish.in':

```
adiós
```rust

File 'main.rs':

```
fn main() {
    let bytes = include_bytes!("spanish.in");
    assert_eq!(bytes, b"adi\xc3\xb3s\n");
    print!("{}", String::from_utf8_lossy(bytes));
}
```rust

Compiling 'main.rs' and running the resulting binary will print "adiós".

## macro module_path!

```rust
macro_rules! module_path
```

Expands to a string that represents the current module path.

The current module path can be thought of as the hierarchy of modules
leading back up to the crate root. The first component of the path
returned is the name of the crate currently being compiled.

# Examples

```rust
mod test {
    pub fn foo() {
        assert!(module_path!().ends_with("test"));
    }
}

test::foo();
```

## macro cfg!

```rust
macro_rules! cfg
```

Evaluates boolean combinations of configuration flags at compile-time.

In addition to the `#[cfg]` attribute, this macro is provided to allow
boolean expression evaluation of configuration flags. This frequently
leads to less duplicated code.

The syntax given to this macro is the same syntax as the `cfg`
attribute.

`cfg!`, unlike `#[cfg]`, does not remove any code and only evaluates to true or false. For
example, all blocks in an if/else expression need to be valid when `cfg!` is used for
the condition, regardless of what `cfg!` is evaluating.

# Examples

```rust
let my_directory = if cfg!(windows) {
    "windows-specific-directory"
} else {
    "unix-directory"
};
```
