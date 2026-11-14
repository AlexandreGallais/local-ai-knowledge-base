---
title: "core::macros (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/macros/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::macros

## macro assert_eq!

```rust
macro_rules! assert_eq
```

Asserts that two expressions are equal to each other (using `PartialEq`).

Assertions are always checked in both debug and release builds, and cannot
be disabled. See `debug_assert_eq!` for assertions that are disabled in
release builds by default.

On panic, this macro will print the values of the expressions with their
debug representations.

Like `assert!`, this macro has a second form, where a custom
panic message can be provided.

# Examples

```rust
let a = 3;
let b = 1 + 2;
assert_eq!(a, b);

assert_eq!(a, b, "we are testing addition with {} and {}", a, b);
```

## macro assert_ne!

```rust
macro_rules! assert_ne
```

Asserts that two expressions are not equal to each other (using `PartialEq`).

Assertions are always checked in both debug and release builds, and cannot
be disabled. See `debug_assert_ne!` for assertions that are disabled in
release builds by default.

On panic, this macro will print the values of the expressions with their
debug representations.

Like `assert!`, this macro has a second form, where a custom
panic message can be provided.

# Examples

```rust
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

This will invoke the `panic!` macro if the provided expression cannot be
evaluated to `true` at runtime.

Like `assert!`, this macro also has a second version, where a custom panic
message can be provided.

# Uses

Unlike `assert!`, `debug_assert!` statements are only enabled in non
optimized builds by default. An optimized build will not execute
`debug_assert!` statements unless `-C debug-assertions` is passed to the
compiler. This makes `debug_assert!` useful for checks that are too
expensive to be present in a release build but may be helpful during
development. The result of expanding `debug_assert!` is always type checked.

An unchecked assertion allows a program in an inconsistent state to keep
running, which might have unexpected consequences but does not introduce
unsafety as long as this only happens in safe code. The performance cost
of assertions, however, is not measurable in general. Replacing `assert!`
with `debug_assert!` is thus only encouraged after thorough profiling, and
more importantly, only in safe code!

# Examples

```rust
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

Unlike `assert_eq!`, `debug_assert_eq!` statements are only enabled in non
optimized builds by default. An optimized build will not execute
`debug_assert_eq!` statements unless `-C debug-assertions` is passed to the
compiler. This makes `debug_assert_eq!` useful for checks that are too
expensive to be present in a release build but may be helpful during
development. The result of expanding `debug_assert_eq!` is always type checked.

# Examples

```rust
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

Unlike `assert_ne!`, `debug_assert_ne!` statements are only enabled in non
optimized builds by default. An optimized build will not execute
`debug_assert_ne!` statements unless `-C debug-assertions` is passed to the
compiler. This makes `debug_assert_ne!` useful for checks that are too
expensive to be present in a release build but may be helpful during
development. The result of expanding `debug_assert_ne!` is always type checked.

# Examples

```rust
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
`assert_matches!` as it will print the debug representation of the value if the assertion
fails.

# Examples

```rust
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

The `?` operator was added to replace `try!`
and should be used instead. Furthermore, `try` is a reserved word
in Rust 2018, so if you must use it, you will need to use the
raw-identifier syntax: `r#try`.

`try!` matches the given `Result`. In case of the `Ok` variant, the
expression has the value of the wrapped value.

In case of the `Err` variant, it retrieves the inner error. `try!` then
performs conversion using `From`. This provides automatic conversion
between specialized errors and more general ones. The resulting
error is then immediately returned.

Because of the early return, `try!` can only be used in functions that
return `Result`.

# Examples

```rust
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
implementation of either the `fmt::Write` or the `io::Write` trait. The macro
returns whatever the `write_fmt` method returns; commonly a `fmt::Result`, or an
`io::Result`.

See `std::fmt` for more information on the format string syntax.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

For more information, see `write!`. For information on the format string syntax, see
`std::fmt`.

# Examples

```rust
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
program immediately terminates with a `panic!`.

The unsafe counterpart of this macro is the `unreachable_unchecked` function, which
will cause undefined behavior if the code is reached.

# Panics

This will always `panic!` because `unreachable!` is just a shorthand for `panic!` with a
fixed, specific message.

Like `panic!`, this macro has a second form for displaying custom values.

# Examples

Match arms:

```rust
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

```rust
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

The difference between `unimplemented!` and `todo!` is that while `todo!`
conveys an intent of implementing the functionality later and the message is "not yet
implemented", `unimplemented!` makes no such claims. Its message is "not implemented".

Also, some IDEs will mark `todo!`s.

# Panics

This will always `panic!` because `unimplemented!` is just a shorthand for `panic!` with a
fixed, specific message.

Like `panic!`, this macro has a second form for displaying custom values.

# Examples

Say we have a trait `Foo`:

```rust
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

```rust
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

The difference between `unimplemented!` and `todo!` is that while `todo!` conveys
an intent of implementing the functionality later and the message is "not yet
implemented", `unimplemented!` makes no such claims. Its message is "not implemented".

Also, some IDEs will mark `todo!`s.

# Panics

This will always `panic!` because `todo!` is just a shorthand for `panic!` with a
fixed, specific message.

Like `panic!`, this macro has a second form for displaying custom values.

# Examples

Here's an example of some in-progress code. We have a trait `Foo`:

```rust
trait Foo {
    fn bar(&self) -> u8;
    fn baz(&self);
    fn qux(&self) -> Result<u64, ()>;
}
```

We want to implement `Foo` on one of our types, but we also want to work on
just `bar()` first. In order for our code to compile, we need to implement
`baz()` and `qux()`, so we can use `todo!`:

```rust
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
