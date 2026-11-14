---
title: "alloc::macros"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/macros.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::macros

## macro vec!

```rust
macro_rules! vec
```

Creates a `Vec` containing the arguments.

`vec!` allows `Vec`s to be defined with the same syntax as array expressions.
There are two forms of this macro:

- Create a `Vec` containing a given list of elements:

```rust
let v = vec![1, 2, 3];
assert_eq!(v[0], 1);
assert_eq!(v[1], 2);
assert_eq!(v[2], 3);
```

- Create a `Vec` from a given element and size:

```rust
let v = vec![1; 3];
assert_eq!(v, [1, 1, 1]);
```

Note that unlike array expressions this syntax supports all elements
which implement `Clone` and the number of elements doesn't have to be
a constant.

This will use `clone` to duplicate an expression, so one should be careful
using this with types having a nonstandard `Clone` implementation. For
example, `vec![Rc::new(1); 5]` will create a vector of five references
to the same boxed integer value, not five references pointing to independently
boxed integers.

Also, note that `vec![expr; 0]` is allowed, and produces an empty vector.
This will still evaluate `expr`, however, and immediately drop the resulting value, so
be mindful of side effects.

## macro format!

```rust
macro_rules! format
```

Creates a `String` using interpolation of runtime expressions.

The first argument `format!` receives is a format string. This must be a string
literal. The power of the formatting string is in the `{}`s contained.
Additional parameters passed to `format!` replace the `{}`s within the
formatting string in the order given unless named or positional parameters
are used.

See the formatting syntax documentation in `std::fmt`
for details.

A common use for `format!` is concatenation and interpolation of strings.
The same convention is used with `print!` and `write!` macros,
depending on the intended destination of the string; all these macros internally use `format_args!`.

To convert a single value to a string, use the `to_string` method. This
will use the `Display` formatting trait.

To concatenate literals into a `&'static str`, use the `concat!` macro.

# Panics

`format!` panics if a formatting trait implementation returns an error.
This indicates an incorrect implementation
since `fmt::Write for String` never returns an error itself.

# Examples

```rust
format!("test");                             // => "test"
format!("hello {}", "world!");               // => "hello world!"
format!("x = {}, y = {val}", 10, val = 30);  // => "x = 10, y = 30"
let (x, y) = (1, 2);
format!("{x} + {y} = 3");                    // => "1 + 2 = 3"
```
