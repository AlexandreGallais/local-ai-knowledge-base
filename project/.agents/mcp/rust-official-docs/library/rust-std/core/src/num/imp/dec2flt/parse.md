---
title: "core::num::imp::dec2flt::parse"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/dec2flt/parse.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::dec2flt::parse

Functions to parse floating-point numbers.

## fn parse_number

```rust
pub fn parse_number(s: &[u8]) -> Option<Decimal>
```

Try to parse a non-special floating point number,
as well as two slices with integer and fractional parts
and the parsed exponent.
