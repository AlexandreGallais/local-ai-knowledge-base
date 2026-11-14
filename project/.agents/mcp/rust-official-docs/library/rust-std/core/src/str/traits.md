---
title: "core::str::traits"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/str/traits.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::str::traits

Trait implementations for `str`.

## trait FromStr

```rust
pub const trait FromStr: Sized
```

Parse a value from a string

`FromStr`'s `from_str` method is often used implicitly, through
`str`'s `parse` method. See `parse`'s documentation for examples.

`FromStr` does not have a lifetime parameter, and so you can only parse types
that do not contain a lifetime parameter themselves. In other words, you can
parse an `i32` with `FromStr`, but not a `&i32`. You can parse a struct that
contains an `i32`, but not one that contains an `&i32`.

# Input format and round-tripping

The input format expected by a type's `FromStr` implementation depends on the type. Check the
type's documentation for the input formats it knows how to parse. Note that the input format of
a type's `FromStr` implementation might not necessarily accept the output format of its
`Display` implementation, and even if it does, the `Display` implementation may not be lossless
so the round-trip may lose information.

However, if a type has a lossless `Display` implementation whose output is meant to be
conveniently machine-parseable and not just meant for human consumption, then the type may wish
to accept the same format in `FromStr`, and document that usage. Having both `Display` and
`FromStr` implementations where the result of `Display` cannot be parsed with `FromStr` may
surprise users.

# Examples

Basic <example-value> of `FromStr` on an example `Point` type:

```rust
use std::str::FromStr;

#[derive(Debug, PartialEq)]
struct Point {
    x: i32,
    y: i32
}

#[derive(Debug, PartialEq, Eq)]
struct ParsePointError;

impl FromStr for Point {
    type Err = ParsePointError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let (x, y) = s
            .strip_prefix('(')
            .and_then(|s| s.strip_suffix(')'))
            .and_then(|s| s.split_once(','))
            .ok_or(ParsePointError)?;

        let x_fromstr = x.parse::<i32>().map_err(|_| ParsePointError)?;
        let y_fromstr = y.parse::<i32>().map_err(|_| ParsePointError)?;

        Ok(Point { x: x_fromstr, y: y_fromstr })
    }
}

let expected = Ok(Point { x: 1, y: 2 });
// Explicit call
assert_eq!(Point::from_str("(1,2)"), expected);
// Implicit calls, through parse
assert_eq!("(1,2)".parse(), expected);
assert_eq!("(1,2)".parse::<Point>(), expected);
// Invalid input string
assert!(Point::from_str("(1 2)").is_err());
```
