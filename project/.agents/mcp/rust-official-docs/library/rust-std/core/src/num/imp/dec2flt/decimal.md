---
title: "core::num::imp::dec2flt::decimal"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/dec2flt/decimal.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

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
