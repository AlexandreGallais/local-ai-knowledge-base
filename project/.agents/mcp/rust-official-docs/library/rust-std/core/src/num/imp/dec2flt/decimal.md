# core::num::imp::dec2flt::decimal

Representation of a float as the significant digits and exponent.

## struct Decimal

```rust
pub struct Decimal
```

A floating point number with up to 64 bits of mantissa and an `i64` exponent.

## Decimal::try_fast_path

```rust
pub fn try_fast_path<F: Lemire>(&self) -> Option<F>
```

Try turning the decimal into an exact float representation, using machine-sized integers
and floats.

This is extracted into a separate function so that it can be attempted before constructing
a Decimal. This only works if both the mantissa and the exponent
can be exactly represented as a machine float, since IEE-754 guarantees
no rounding will occur.

There is an exception: disguised fast-path cases, where we can shift
powers-of-10 from the exponent to the significant digits.