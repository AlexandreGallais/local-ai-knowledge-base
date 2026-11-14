# core::num::imp::dec2flt::parse

Functions to parse floating-point numbers.

## fn parse_number

```rust
pub fn parse_number(s: &[u8]) -> Option<Decimal>
```

Try to parse a non-special floating point number,
as well as two slices with integer and fractional parts
and the parsed exponent.