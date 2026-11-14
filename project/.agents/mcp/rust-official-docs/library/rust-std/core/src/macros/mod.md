# core::macros

## macro assert_eq!

```rust
macro_rules! assert_eq
```

Asserts that two expressions are equal to each other (using [`PartialEq`]).

Assertions are always checked in both debug and release builds, and cannot
be disabled. See [`debug_assert_eq!`] for assertions that are disabled in
release builds by default.

[`debug_assert_eq!`]: crate::debug_assert_eq

On panic, this macro will print the values of the expressions with their
debug representations.

Like [`assert!`], this macro has a second form, where a custom
panic message can be provided.

# Examples

```
let a = 3;
let b = 1 + 2;
assert_eq!(a, b);

assert_eq!(a, b, "we are testing addition with {} and {}", a, b);
```

## macro assert_ne!

```rust
macro_rules! assert_ne
```

Asserts that two expressions are not equal to each other (using [`PartialEq`]).

Assertions are always checked in both debug and release builds, and cannot
be disabled. See [`debug_assert_ne!`] for assertions that are disabled in
release builds by default.

[`debug_assert_ne!`]: crate::debug_assert_ne

On panic, this macro will print the values of the expressions with their
debug representations.

Like [`assert!`], this macro has a second form, where a custom
panic message can be provided.

# Examples

```
let a = 3;
let b = 2;
assert_ne!(a, b);

assert_ne!(a, b, "we are testing that the values are not equal");
```

## macro debug_assert!

```rust
macro_rules! debug_assert
```

Asserts that a boolean expression is `true` at runtime.

This will invoke the [`panic!`] macro if the provided expression cannot be
evaluated to `true` at runtime.

Like [`assert!`], this macro also has a second version, where a custom panic
message can be provided.

# Uses

Unlike [`assert!`], `debug_assert!` statements are only enabled in non
optimized builds by default. An optimized build will not execute
`debug_assert!` statements unless `-C debug-assertions` is passed to the
compiler. This makes `debug_assert!` useful for checks that are too
expensive to be present in a release build but may be helpful during
development. The result of expanding `debug_assert!` is always type checked.

An unchecked assertion allows a program in an inconsistent state to keep
running, which might have unexpected consequences but does not introduce
unsafety as long as this only happens in safe code. The performance cost
of assertions, however, is not measurable in general. Replacing [`assert!`]
with `debug_assert!` is thus only encouraged after thorough profiling, and
more importantly, only in safe code!

# Examples

```
// the panic message for these assertions is the stringified value of the
// expression given.
debug_assert!(true);

fn some_expensive_computation() -> bool {
    // Some expensive computation here
    true
}
debug_assert!(some_expensive_computation());

// assert with a custom message
let x = true;
debug_assert!(x, "x wasn't true!");

let a = 3; let b = 27;
debug_assert!(a + b == 30, "a = {}, b = {}", a, b);
```

## macro debug_assert_eq!

```rust
macro_rules! debug_assert_eq
```

Asserts that two expressions are equal to each other.

On panic, this macro will print the values of the expressions with their
debug representations.

Unlike [`assert_eq!`], `debug_assert_eq!` statements are only enabled in non
optimized builds by default. An optimized build will not execute
`debug_assert_eq!` statements unless `-C debug-assertions` is passed to the
compiler. This makes `debug_assert_eq!` useful for checks that are too
expensive to be present in a release build but may be helpful during
development. The result of expanding `debug_assert_eq!` is always type checked.

# Examples

```
let a = 3;
let b = 1 + 2;
debug_assert_eq!(a, b);
```

## macro debug_assert_ne!

```rust
macro_rules! debug_assert_ne
```

Asserts that two expressions are not equal to each other.

On panic, this macro will print the values of the expressions with their
debug representations.

Unlike [`assert_ne!`], `debug_assert_ne!` statements are only enabled in non
optimized builds by default. An optimized build will not execute
`debug_assert_ne!` statements unless `-C debug-assertions` is passed to the
compiler. This makes `debug_assert_ne!` useful for checks that are too
expensive to be present in a release build but may be helpful during
development. The result of expanding `debug_assert_ne!` is always type checked.

# Examples

```
let a = 3;
let b = 2;
debug_assert_ne!(a, b);
```

## macro matches!

```rust
macro_rules! matches
```

Returns whether the given expression matches the provided pattern.

The pattern syntax is exactly the same as found in a match arm. The optional if guard can be
used to add additional checks that must be true for the matched value, otherwise this macro will
return `false`.

When testing that a value matches a pattern, it's generally preferable to use
[`assert_matches!`] as it will print the debug representation of the value if the assertion
fails.

# Examples

```
let foo = 'f';
assert!(matches!(foo, 'A'..='Z' | 'a'..='z'));

let bar = Some(4);
assert!(matches!(bar, Some(x) if x > 2));
```

## macro r!

```rust
macro_rules! r#try
```

Unwraps a result or propagates its error.

The [`?` operator][propagating-errors] was added to replace `try!`
and should be used instead. Furthermore, `try` is a reserved word
in Rust 2018, so if you must use it, you will need to use the
[raw-identifier syntax][ris]: `r#try`.

[propagating-errors]: https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator
[ris]: ../rust-by-example/compatibility/raw_identifiers.html

`try!` matches the given [`Result`]. In case of the `Ok` variant, the
expression has the value of the wrapped value.

In case of the `Err` variant, it retrieves the inner error. `try!` then
performs conversion using `From`. This provides automatic conversion
between specialized errors and more general ones. The resulting
error is then immediately returned.

Because of the early return, `try!` can only be used in functions that
return [`Result`].

# Examples

```
use std::io;
use std::fs::File;
use std::io::prelude::*;

enum MyError {
    FileWriteError
}

impl From<io::Error> for MyError {
    fn from(e: io::Error) -> MyError {
        MyError::FileWriteError
    }
}

// The preferred method of quick returning Errors
fn write_to_file_question() -> Result<(), MyError> {
    let mut file = File::create("my_best_friends.txt")?;
    file.write_all(b"This is a list of my best friends.")?;
    Ok(())
}

// The previous method of quick returning Errors
fn write_to_file_using_try() -> Result<(), MyError> {
    let mut file = r#try!(File::create("my_best_friends.txt"));
    r#try!(file.write_all(b"This is a list of my best friends."));
    Ok(())
}

// This is equivalent to:
fn write_to_file_using_match() -> Result<(), MyError> {
    let mut file = r#try!(File::create("my_best_friends.txt"));
    match file.write_all(b"This is a list of my best friends.") {
        Ok(v) => v,
        Err(e) => return Err(From::from(e)),
    }
    Ok(())
}
```

## macro write!

```rust
macro_rules! write
```

Writes formatted data into a buffer.

This macro accepts a 'writer', a format string, and a list of arguments. Arguments will be
formatted according to the specified format string and the result will be passed to the writer.
The writer may be any value with a `write_fmt` method; generally this comes from an
implementation of either the [`fmt::Write`] or the [`io::Write`] trait. The macro
returns whatever the `write_fmt` method returns; commonly a [`fmt::Result`], or an
[`io::Result`].

See [`std::fmt`] for more information on the format string syntax.

[`std::fmt`]: ../std/fmt/index.html
[`fmt::Write`]: crate::fmt::Write
[`io::Write`]: ../std/io/trait.Write.html
[`fmt::Result`]: crate::fmt::Result
[`io::Result`]: ../std/io/type.Result.html

# Examples

```
use std::io::Write;

fn main() -> std::io::Result<()> {
    let mut w = Vec::new();
    write!(&mut w, "test")?;
    write!(&mut w, "formatted {}", "arguments")?;

    assert_eq!(w, b"testformatted arguments");
    Ok(())
}
```

A module can import both `std::fmt::Write` and `std::io::Write` and call `write!` on objects
implementing either, as objects do not typically implement both. However, the module must
avoid conflict between the trait names, such as by importing them as `_` or otherwise renaming
them:

```
use std::fmt::Write as _;
use std::io::Write as _;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut s = String::new();
    let mut v = Vec::new();

    write!(&mut s, "{} {}", "abc", 123)?; // uses fmt::Write::write_fmt
    write!(&mut v, "s = {:?}", s)?; // uses io::Write::write_fmt
    assert_eq!(v, b"s = \"abc 123\"");
    Ok(())
}
```

If you also need the trait names themselves, such as to implement one or both on your types,
import the containing module and then name them with a prefix:

```
# #![allow(unused_imports)]
use std::fmt::{self, Write as _};
use std::io::{self, Write as _};

struct Example;

impl fmt::Write for Example {
    fn write_str(&mut self, _s: &str) -> core::fmt::Result {
         unimplemented!();
    }
}
```

Note: This macro can be used in `no_std` setups as well.
In a `no_std` setup you are responsible for the implementation details of the components.

```no_run
use core::fmt::Write;

struct Example;

impl Write for Example {
    fn write_str(&mut self, _s: &str) -> core::fmt::Result {
         unimplemented!();
    }
}

let mut m = Example{};
write!(&mut m, "Hello World").expect("Writing to `Example` should succeed");
```

## macro writeln!

```rust
macro_rules! writeln
```

Writes formatted data into a buffer, with a newline appended.

On all platforms, the newline is the LINE FEED character (`\n`/`U+000A`) alone
(no additional CARRIAGE RETURN (`\r`/`U+000D`).

For more information, see [`write!`]. For information on the format string syntax, see
[`std::fmt`].

[`std::fmt`]: ../std/fmt/index.html

# Examples

```
use std::io::{Write, Result};

fn main() -> Result<()> {
    let mut w = Vec::new();
    writeln!(&mut w)?;
    writeln!(&mut w, "test")?;
    writeln!(&mut w, "formatted {}", "arguments")?;

    assert_eq!(&w[..], "\ntest\nformatted arguments\n".as_bytes());
    Ok(())
}
```

## macro unreachable!

```rust
macro_rules! unreachable
```

Indicates unreachable code.

This is useful any time that the compiler can't determine that some code is unreachable. For
example:

* Match arms with guard conditions.
* Loops that dynamically terminate.
* Iterators that dynamically terminate.

If the determination that the code is unreachable proves incorrect, the
program immediately terminates with a [`panic!`].

The unsafe counterpart of this macro is the [`unreachable_unchecked`] function, which
will cause undefined behavior if the code is reached.

[`unreachable_unchecked`]: crate::hint::unreachable_unchecked

# Panics

This will always [`panic!`] because `unreachable!` is just a shorthand for `panic!` with a
fixed, specific message.

Like `panic!`, this macro has a second form for displaying custom values.

# Examples

Match arms:

```
# #[allow(dead_code)]
fn foo(x: Option<i32>) {
    match x {
        Some(n) if n >= 0 => println!("Some(Non-negative)"),
        Some(n) if n <  0 => println!("Some(Negative)"),
        Some(_)           => unreachable!(), // compile error if commented out
        None              => println!("None")
    }
}
```

Iterators:

```
# #[allow(dead_code)]
fn divide_by_three(x: u32) -> u32 { // one of the poorest implementations of x/3
    for i in 0.. {
        if 3*i < i { panic!("u32 overflow"); }
        if x < 3*i { return i-1; }
    }
    unreachable!("The loop should always return");
}
```

## macro unimplemented!

```rust
macro_rules! unimplemented
```

Indicates unimplemented code by panicking with a message of "not implemented".

This allows your code to type-check, which is useful if you are prototyping or
implementing a trait that requires multiple methods which you don't plan to use all of.

The difference between `unimplemented!` and [`todo!`] is that while `todo!`
conveys an intent of implementing the functionality later and the message is "not yet
implemented", `unimplemented!` makes no such claims. Its message is "not implemented".

Also, some IDEs will mark `todo!`s.

# Panics

This will always [`panic!`] because `unimplemented!` is just a shorthand for `panic!` with a
fixed, specific message.

Like `panic!`, this macro has a second form for displaying custom values.

[`todo!`]: crate::todo

# Examples

Say we have a trait `Foo`:

```
trait Foo {
    fn bar(&self) -> u8;
    fn baz(&self);
    fn qux(&self) -> Result<u64, ()>;
}
```

We want to implement `Foo` for 'MyStruct', but for some reason it only makes sense
to implement the `bar()` function. `baz()` and `qux()` will still need to be defined
in our implementation of `Foo`, but we can use `unimplemented!` in their definitions
to allow our code to compile.

We still want to have our program stop running if the unimplemented methods are
reached.

```
# trait Foo {
#     fn bar(&self) -> u8;
#     fn baz(&self);
#     fn qux(&self) -> Result<u64, ()>;
# }
struct MyStruct;

impl Foo for MyStruct {
    fn bar(&self) -> u8 {
        1 + 1
    }

    fn baz(&self) {
        // It makes no sense to `baz` a `MyStruct`, so we have no logic here
        // at all.
        // This will display "thread 'main' panicked at 'not implemented'".
        unimplemented!();
    }

    fn qux(&self) -> Result<u64, ()> {
        // We have some logic here,
        // We can add a message to unimplemented! to display our omission.
        // This will display:
        // "thread 'main' panicked at 'not implemented: MyStruct isn't quxable'".
        unimplemented!("MyStruct isn't quxable");
    }
}

fn main() {
    let s = MyStruct;
    s.bar();
}
```

## macro todo!

```rust
macro_rules! todo
```

Indicates unfinished code.

This can be useful if you are prototyping and just
want a placeholder to let your code pass type analysis.

The difference between [`unimplemented!`] and `todo!` is that while `todo!` conveys
an intent of implementing the functionality later and the message is "not yet
implemented", `unimplemented!` makes no such claims. Its message is "not implemented".

Also, some IDEs will mark `todo!`s.

# Panics

This will always [`panic!`] because `todo!` is just a shorthand for `panic!` with a
fixed, specific message.

Like `panic!`, this macro has a second form for displaying custom values.

# Examples

Here's an example of some in-progress code. We have a trait `Foo`:

```
trait Foo {
    fn bar(&self) -> u8;
    fn baz(&self);
    fn qux(&self) -> Result<u64, ()>;
}
```

We want to implement `Foo` on one of our types, but we also want to work on
just `bar()` first. In order for our code to compile, we need to implement
`baz()` and `qux()`, so we can use `todo!`:

```
# trait Foo {
#     fn bar(&self) -> u8;
#     fn baz(&self);
#     fn qux(&self) -> Result<u64, ()>;
# }
struct MyStruct;

impl Foo for MyStruct {
    fn bar(&self) -> u8 {
        1 + 1
    }

    fn baz(&self) {
        // Let's not worry about implementing baz() for now
        todo!();
    }

    fn qux(&self) -> Result<u64, ()> {
        // We can add a message to todo! to display our omission.
        // This will display:
        // "thread 'main' panicked at 'not yet implemented: MyStruct is not yet quxable'".
        todo!("MyStruct is not yet quxable");
    }
}

fn main() {
    let s = MyStruct;
    s.bar();

    // We aren't even using baz() or qux(), so this is fine.
}
```

## macro compile_error!

```rust
macro_rules! compile_error
```

Causes compilation to fail with the given error message when encountered.

This macro should be used when a crate uses a conditional compilation strategy to provide
better error messages for erroneous conditions. It's the compiler-level form of [`panic!`],
but emits an error during *compilation* rather than at *runtime*.

# Examples

Two such examples are macros and `#[cfg]` environments.

Emit a better compiler error if a macro is passed invalid values. Without the final branch,
the compiler would still emit an error, but the error's message would not mention the two
valid values.

```compile_fail
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

```compile_fail
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
the [`Display`] trait can be passed to `format_args!`, as can any
[`Debug`] implementation be passed to a `{:?}` within the formatting string.

This macro produces a value of type [`fmt::Arguments`]. This value can be
passed to the macros within [`std::fmt`] for performing useful redirection.
All other formatting macros ([`format!`], [`write!`], [`println!`], etc) are
proxied through this one. `format_args!`, unlike its derived macros, avoids
heap allocations.

You can use the [`fmt::Arguments`] value that `format_args!` returns
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

See [the formatting documentation in `std::fmt`](../std/fmt/index.html)
for details of the macro argument syntax, and further information.

[`Display`]: crate::fmt::Display
[`Debug`]: crate::fmt::Debug
[`fmt::Arguments`]: crate::fmt::Arguments
[`std::fmt`]: ../std/fmt/index.html
[`format!`]: ../std/macro.format.html
[`println!`]: ../std/macro.println.html

# Examples

```
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

[extended]: ../reference/destructors.html#temporary-lifetime-extension
[Reference]: ../reference/destructors.html#extending-based-on-expressions

## macro env!

```rust
macro_rules! env
```

Inspects an environment variable at compile time.

This macro will expand to the value of the named environment variable at
compile time, yielding an expression of type `&'static str`. Use
[`std::env::var`] instead if you want to read the value at runtime.

[`std::env::var`]: ../std/env/fn.var.html

If the environment variable is not defined, then a compilation error
will be emitted. To not emit a compile error, use the [`option_env!`]
macro instead. A compilation error will also be emitted if the
environment variable is not a valid Unicode string.

# Examples

```
let path: &'static str = env!("PATH");
println!("the $PATH variable at the time of compiling was: {path}");
```

You can customize the error message by passing a string as the second
parameter:

```compile_fail
let doc: &'static str = env!("documentation", "what's that?!");
```

If the `documentation` environment variable is not defined, you'll get
the following error:

```text
error: what's that?!
```

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
expand to `None`. See [`Option<T>`][Option] for more information on this
type.  Use [`std::env::var`] instead if you want to read the value at
runtime.

[`std::env::var`]: ../std/env/fn.var.html

A compile time error is only emitted when using this macro if the
environment variable exists and is not a valid Unicode string. To also
emit a compile error if the environment variable is not present, use the
[`env!`] macro instead.

# Examples

```
let key: Option<&'static str> = option_env!("SECRET_KEY");
println!("the secret key might be: {key:?}");
```

## macro concat!

```rust
macro_rules! concat
```

Concatenates literals into a static string slice.

This macro takes any number of comma-separated literals, yielding an
expression of type `&'static str` which represents all of the literals
concatenated left-to-right.

Integer and floating point literals are [stringified](core::stringify) in order to be
concatenated.

# Examples

```
let s = concat!("test", 10, 'b', true);
assert_eq!(s, "test10btrue");
```

## macro line!

```rust
macro_rules! line
```

Expands to the line number on which it was invoked.

With [`column!`] and [`file!`], these macros provide debugging information for
developers about the location within the source.

The expanded expression has type `u32` and is 1-based, so the first line
in each file evaluates to 1, the second to 2, etc. This is consistent
with error messages by common compilers or popular editors.
The returned line is *not necessarily* the line of the `line!` invocation itself,
but rather the first macro invocation leading up to the invocation
of the `line!` macro.

# Examples

```
let current_line = line!();
println!("defined on line: {current_line}");
```

## macro column!

```rust
macro_rules! column
```

Expands to the column number at which it was invoked.

With [`line!`] and [`file!`], these macros provide debugging information for
developers about the location within the source.

The expanded expression has type `u32` and is 1-based, so the first column
in each line evaluates to 1, the second to 2, etc. This is consistent
with error messages by common compilers or popular editors.
The returned column is *not necessarily* the line of the `column!` invocation itself,
but rather the first macro invocation leading up to the invocation
of the `column!` macro.

# Examples

```
let current_col = column!();
println!("defined on column: {current_col}");
```

`column!` counts Unicode code points, not bytes or graphemes. As a result, the first two
invocations return the same value, but the third does not.

```
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

With [`line!`] and [`column!`], these macros provide debugging information for
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

```
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

```
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

```text
adiós
```

File 'main.rs':

```ignore (cannot-doctest-external-file-dependency)
fn main() {
    let my_str = include_str!("spanish.in");
    assert_eq!(my_str, "adiós\n");
    print!("{my_str}");
}
```

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

```text
adiós
```

File 'main.rs':

```ignore (cannot-doctest-external-file-dependency)
fn main() {
    let bytes = include_bytes!("spanish.in");
    assert_eq!(bytes, b"adi\xc3\xb3s\n");
    print!("{}", String::from_utf8_lossy(bytes));
}
```

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

```
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

The syntax given to this macro is the same syntax as the [`cfg`]
attribute.

`cfg!`, unlike `#[cfg]`, does not remove any code and only evaluates to true or false. For
example, all blocks in an if/else expression need to be valid when `cfg!` is used for
the condition, regardless of what `cfg!` is evaluating.

[`cfg`]: ../reference/conditional-compilation.html#the-cfg-attribute

# Examples

```
let my_directory = if cfg!(windows) {
    "windows-specific-directory"
} else {
    "unix-directory"
};
```

## macro include!

```rust
macro_rules! include
```

Parses a file as an expression or an item according to the context.

**Warning**: For multi-file Rust projects, the `include!` macro is probably not what you
are looking for. Usually, multi-file Rust projects use
[modules](https://doc.rust-lang.org/reference/items/modules.html). Multi-file projects and
modules are explained in the Rust-by-Example book
[here](https://doc.rust-lang.org/rust-by-example/mod/split.html) and the module system is
explained in the Rust Book
[here](https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html).

The included file is placed in the surrounding code
[unhygienically](https://doc.rust-lang.org/reference/macros-by-example.html#hygiene). If
the included file is parsed as an expression and variables or functions share names across
both files, it could result in variables or functions being different from what the
included file expected.

The included file is located relative to the current file (similarly to how modules are
found). The provided path is interpreted in a platform-specific way at compile time. So,
for instance, an invocation with a Windows path containing backslashes `\` would not
compile correctly on Unix.

# Uses

The `include!` macro is primarily used for two purposes. It is used to include
documentation that is written in a separate file and it is used to include [build artifacts
usually as a result from the `build.rs`
script](https://doc.rust-lang.org/cargo/reference/build-scripts.html#outputs-of-the-build-script).

When using the `include` macro to include stretches of documentation, remember that the
included file still needs to be a valid Rust syntax. It is also possible to
use the [`include_str`] macro as `#![doc = include_str!("...")]` (at the module level) or
`#[doc = include_str!("...")]` (at the item level) to include documentation from a plain
text or markdown file.

# Examples

Assume there are two files in the same directory with the following contents:

File 'monkeys.in':

```ignore (only-for-syntax-highlight)
['🙈', '🙊', '🙉']
    .iter()
    .cycle()
    .take(6)
    .collect::<String>()
```

File 'main.rs':

```ignore (cannot-doctest-external-file-dependency)
fn main() {
    let my_string = include!("monkeys.in");
    assert_eq!("🙈🙊🙉🙈🙊🙉", my_string);
    println!("{my_string}");
}
```

Compiling 'main.rs' and running the resulting binary will print
"🙈🙊🙉🙈🙊🙉".

## macro assert!

```rust
macro_rules! assert
```

Asserts that a boolean expression is `true` at runtime.

This will invoke the [`panic!`] macro if the provided expression cannot be
evaluated to `true` at runtime.

# Uses

Assertions are always checked in both debug and release builds, and cannot
be disabled. See [`debug_assert!`] for assertions that are not enabled in
release builds by default.

Unsafe code may rely on `assert!` to enforce run-time invariants that, if
violated could lead to unsafety.

Other use-cases of `assert!` include testing and enforcing run-time
invariants in safe code (whose violation cannot result in unsafety).

# Custom Messages

This macro has a second form, where a custom panic message can
be provided with or without arguments for formatting. See [`std::fmt`]
for syntax for this form. Expressions used as format arguments will only
be evaluated if the assertion fails.

[`std::fmt`]: ../std/fmt/index.html

# Examples

```
// the panic message for these assertions is the stringified value of the
// expression given.
assert!(true);

fn some_computation() -> bool {
    // Some expensive computation here
    true
}

assert!(some_computation());

// assert with a custom message
let x = true;
assert!(x, "x wasn't true!");

let a = 3; let b = 27;
assert!(a + b == 30, "a = {}, b = {}", a, b);
```