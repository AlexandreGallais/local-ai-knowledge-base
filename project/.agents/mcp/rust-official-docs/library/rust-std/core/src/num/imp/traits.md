---
title: "core::num::imp::traits"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/traits.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::traits

Numeric traits used for internal implementations.

## trait CastInto

```rust
pub trait CastInto<T: Copy>: Copy
```

Lossy `as` casting between two types.

## trait Int

```rust
pub trait Int: Sized + Clone + Copy + fmt::Debug + ops::Shr<u32, Output = Self> + ops::Shl<u32, Output = Self> + ops::BitAnd<Output = Self> + ops::BitOr<Output = Self> + PartialEq
```

Collection of traits that allow us to be generic over integer size.

## Float::Int

```rust
type Int: Int + Into<u64>
```

The unsigned integer with the same size as the float

## Float::BITS

```rust
const BITS: u32
```

Bit width of the float

## Float::SIG_TOTAL_BITS

```rust
const SIG_TOTAL_BITS: u32
```

The number of bits in the significand, *including* the hidden bit.

## Float::SIG_BITS

```rust
const SIG_BITS: u32 = Self::SIG_TOTAL_BITS - 1
```

The number of bits in the significand, *excluding* the hidden bit.

## Float::EXP_BITS

```rust
const EXP_BITS: u32 = Self::BITS - Self::SIG_BITS - 1
```

Number of bits in the exponent.

## Float::EXP_SAT

```rust
const EXP_SAT: u32 = (1 << Self::EXP_BITS) - 1
```

The saturated (maximum bitpattern) value of the exponent, i.e. the infinite
representation.

This shifted fully right, use `EXP_MASK` for the shifted value.

## Float::INFINITE_POWER

```rust
const INFINITE_POWER: i32 = Self::EXP_SAT as i32
```

Signed version of `EXP_SAT` since we convert a lot.

## Float::EXP_BIAS

```rust
const EXP_BIAS: u32 = Self::EXP_SAT >> 1
```

The exponent bias value. This is also the maximum value of the exponent.

## Float::EXP_MIN

```rust
const EXP_MIN: i32 = -(Self::EXP_BIAS as i32 - 1)
```

Minimum exponent value of normal values.

## Float::MIN_EXPONENT_ROUND_TO_EVEN

```rust
const MIN_EXPONENT_ROUND_TO_EVEN: i32
```

Round-to-even only happens for negative values of q
when q ≥ −4 in the 64-bit case and when q ≥ −17 in
the 32-bit case.

When q ≥ 0,we have that 5^q ≤ 2m+1. In the 64-bit case,we
have 5^q ≤ 2m+1 ≤ 2^54 or q ≤ 23. In the 32-bit case,we have
5^q ≤ 2m+1 ≤ 2^25 or q ≤ 10.

When q < 0, we have w ≥ (2m+1)×5^−q. We must have that w < 2^64
so (2m+1)×5^−q < 2^64. We have that 2m+1 > 2^53 (64-bit case)
or 2m+1 > 2^24 (32-bit case). Hence,we must have 2^53×5^−q < 2^64
(64-bit) and 2^24×5^−q < 2^64 (32-bit). Hence we have 5^−q < 2^11
or q ≥ −4 (64-bit case) and 5^−q < 2^40 or q ≥ −17 (32-bit case).

Thus we have that we only need to round ties to even when
we have that q ∈ −4,23 or q∈[−17,10]
(in the 32-bit case). In both cases,the power of five(5^|q|)
fits in a 64-bit word.

## Float::LARGEST_POWER_OF_TEN

```rust
const LARGEST_POWER_OF_TEN: i32 =
```

Largest decimal exponent for a non-infinite value.

This is the max exponent in binary converted to the max exponent in decimal. Allows fast
pathing anything larger than `10^LARGEST_POWER_OF_TEN`, which will round to infinity.

## Float::SMALLEST_POWER_OF_TEN

```rust
const SMALLEST_POWER_OF_TEN: i32
```

Smallest decimal exponent for a non-zero value. This allows for fast pathing anything
smaller than `10^SMALLEST_POWER_OF_TEN`, which will round to zero.

The smallest power of ten is represented by `⌊log10(2^-n / (2^64 - 1))⌋`, where `n` is
the smallest power of two. The `2^64 - 1)` denominator comes from the number of values
that are representable by the intermediate storage format. I don't actually know _why_
the storage format is relevant here.

The values may be calculated using the formula. Unfortunately we cannot calculate them at
compile time since intermediates exceed the range of an `f64`.

## Float::classify

```rust
fn classify(self) -> FpCategory
```

Returns the category that this number falls into.

## Float::to_bits

```rust
fn to_bits(self) -> Self::Int
```

Transmute to the integer representation

## FloatExt::from_u64_bits

```rust
fn from_u64_bits(v: u64) -> Self
```

Performs a raw transmutation from an integer.

## FloatExt::integer_decode

```rust
fn integer_decode(self) -> (u64, i16, i8)
```

Returns the mantissa, exponent and sign as integers.

This returns `(m, p, s)` such that `s * m * 2^p` represents the original float. For 0, the
exponent will be `-(EXP_BIAS + SIG_BITS)`, which is the minimum subnormal power. For
infinity or NaN, the exponent will be `EXP_SAT - EXP_BIAS - SIG_BITS`.

If subnormal, the mantissa will be shifted one bit to the left. Otherwise, it is returned
with the explicit bit set but otherwise unshifted

`s` is only ever +/-1.
