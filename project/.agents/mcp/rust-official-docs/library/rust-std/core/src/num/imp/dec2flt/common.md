# core::num::imp::dec2flt::common

Common utilities, for internal use only.

## struct BiasedFp

```rust
pub struct BiasedFp
```

A custom 64-bit floating point type, representing `m * 2^p`.
p is biased, so it be directly shifted into the exponent bits.

## BiasedFp::zero_pow2

```rust
pub const fn zero_pow2(p_biased: i32) -> Self
```

Represent `0 ^ p`