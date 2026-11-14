---
title: "core::num::imp::dec2flt::decimal_seq"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/dec2flt/decimal_seq.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::dec2flt::decimal_seq

Arbitrary-precision decimal type used by fallback algorithms.

This is only used if the fast-path (native floats) and
the Eisel-Lemire algorithm are unable to unambiguously
determine the float.

The technique used is "Simple Decimal Conversion", developed
by Nigel Tao and Ken Thompson. A detailed description of the
algorithm can be found in "ParseNumberF64 by Simple Decimal Conversion",
available online: <https://nigeltao.github.io/blog/2020/parse-number-f64-simple.html>.

## struct DecimalSeq

```rust
pub struct DecimalSeq
```

A decimal floating-point number, represented as a sequence of decimal digits.

## DecimalSeq::MAX_DIGITS

```rust
pub const MAX_DIGITS: usize = 768
```

The maximum number of digits required to unambiguously round up to a 64-bit float.

For an IEEE 754 binary64 float, this required 767 digits. So we store the max digits + 1.

We can exactly represent a float in radix `b` from radix 2 if
`b` is divisible by 2. This function calculates the exact number of
digits required to exactly represent that float.

According to the "Handbook of Floating Point Arithmetic",
for IEEE754, with `emin` being the min exponent, `p2` being the
precision, and `b` being the radix, the number of digits follows as:

`−emin + p2 + ⌊(emin + 1) log(2, b) − log(1 − 2^(−p2), b)⌋`

For f32, this follows as:
    emin = -126
    p2 = 24

For f64, this follows as:
    emin = -1022
    p2 = 53

In Python:
    `-emin + p2 + math.floor((emin+ 1)*math.log(2, b)-math.log(1-2**(-p2), b))`

## fn parse_decimal_seq

```rust
pub fn parse_decimal_seq(mut s: &[u8]) -> DecimalSeq
```

Parse a big integer representation of the float as a decimal.
