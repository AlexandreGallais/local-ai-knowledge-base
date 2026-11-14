---
title: "core::macros (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/macros/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::macros (part 3 of 3)

## macro include!

```rust
macro_rules! include
```

Parses a file as an expression or an item according to the context.

**Warning**: For multi-file Rust projects, the `include!` macro is probably not what you
are looking for. Usually, multi-file Rust projects use
modules. Multi-file projects and
modules are explained in the Rust-by-Example book
here and the module system is
explained in the Rust Book
here.

The included file is placed in the surrounding code
unhygienically. If
the included file is parsed as an expression and variables or functions share names across
both files, it could result in variables or functions being different from what the
included file expected.

The included file is located relative to the current file (similarly to how modules are
found). The provided path is interpreted in a platform-specific way at compile time. So,
for instance, an invocation with a Windows path containing backslashes `\` would not
compile correctly on Unix.

# Uses

The `include!` macro is primarily used for two purposes. It is used to include
documentation that is written in a separate file and it is used to include build artifacts
usually as a result from the `build.rs`
script.

When using the `include` macro to include stretches of documentation, remember that the
included file still needs to be a valid Rust syntax. It is also possible to
use the `include_str` macro as `#![doc = include_str!("...")]` (at the module level) or
`#[doc = include_str!("...")]` (at the item level) to include documentation from a plain
text or markdown file.

# Examples

Assume there are two files in the same directory with the following contents:

File 'monkeys.in':

```
['🙈', '🙊', '🙉']
    .iter()
    .cycle()
    .take(6)
    .collect::<String>()
```rust

File 'main.rs':

```
fn main() {
    let my_string = include!("monkeys.in");
    assert_eq!("🙈🙊🙉🙈🙊🙉", my_string);
    println!("{my_string}");
}
```rust

Compiling 'main.rs' and running the resulting binary will print
"🙈🙊🙉🙈🙊🙉".

## macro assert!

```rust
macro_rules! assert
```

Asserts that a boolean expression is `true` at runtime.

This will invoke the `panic!` macro if the provided expression cannot be
evaluated to `true` at runtime.

# Uses

Assertions are always checked in both debug and release builds, and cannot
be disabled. See `debug_assert!` for assertions that are not enabled in
release builds by default.

Unsafe code may rely on `assert!` to enforce run-time invariants that, if
violated could lead to unsafety.

Other use-cases of `assert!` include testing and enforcing run-time
invariants in safe code (whose violation cannot result in unsafety).

# Custom Messages

This macro has a second form, where a custom panic message can
be provided with or without arguments for formatting. See `std::fmt`
for syntax for this form. Expressions used as format arguments will only
be evaluated if the assertion fails.

# Examples

```rust
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
