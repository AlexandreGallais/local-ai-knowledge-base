# core::num::float_parse

User-facing API for float parsing.

## struct ParseFloatError

```rust
pub struct ParseFloatError
```

An error which can be returned when parsing a float.

This error is used as the error type for the [`FromStr`] implementation
for [`f32`] and [`f64`].

# Example

```
use std::str::FromStr;

if let Err(e) = f64::from_str("a.12") {
    println!("Failed conversion to f64: {e}");
}
```