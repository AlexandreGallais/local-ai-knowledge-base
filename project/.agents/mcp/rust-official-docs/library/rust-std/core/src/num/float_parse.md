---
title: "core::num::float_parse"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/float_parse.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::float_parse

User-facing API for float parsing.

## struct ParseFloatError

```rust
pub struct ParseFloatError
```

An error which can be returned when parsing a float.

This error is used as the error type for the `FromStr` implementation
for `f32` and `f64`.

# Example

```rust
use std::str::FromStr;

if let Err(e) = f64::from_str("a.12") {
    println!("Failed conversion to f64: {e}");
}
```
