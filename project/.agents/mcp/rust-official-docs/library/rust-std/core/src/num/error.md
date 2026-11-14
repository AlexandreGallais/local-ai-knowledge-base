# core::num::error

Error types for conversion to integral types.

## struct TryFromIntError

```rust
pub struct TryFromIntError(pub(crate) IntErrorKind)
```

The error type returned when a checked integral type conversion fails.

## struct ParseIntError

```rust
pub struct ParseIntError
```

An error which can be returned when parsing an integer.

For example, this error is returned by the `from_str_radix()` functions
on the primitive integer types (such as [`i8::from_str_radix`])
and is used as the error type in their [`FromStr`] implementations.

[`FromStr`]: crate::str::FromStr

# Potential causes

Among other causes, `ParseIntError` can be thrown because of leading or trailing whitespace
in the string e.g., when it is obtained from the standard input.
Using the [`str::trim()`] method ensures that no whitespace remains before parsing.

# Example

```
if let Err(e) = i32::from_str_radix("a12", 10) {
    println!("Failed conversion to i32: {e}");
}
```

## enum IntErrorKind

```rust
pub enum IntErrorKind
```

Enum to store the various types of errors that can cause parsing or converting an
integer to fail.

# Example

```
# fn main() {
if let Err(e) = i32::from_str_radix("a12", 10) {
    println!("Failed conversion to i32: {:?}", e.kind());
}
# }
```

## ParseIntError::kind

```rust
pub const fn kind(&self) -> &IntErrorKind
```

Outputs the detailed cause of parsing an integer failing.