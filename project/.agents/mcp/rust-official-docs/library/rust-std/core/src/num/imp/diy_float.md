---
title: "core::num::imp::diy_float"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/diy_float.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::diy_float

Extended precision "soft float", for internal use only.

## Fp::mul

```rust
pub fn mul(self, other: Self) -> Self
```

Returns a correctly rounded product of itself and `other`.

## Fp::normalize

```rust
pub fn normalize(self) -> Self
```

Normalizes itself so that the resulting mantissa is at least `2^63`.

## Fp::normalize_to

```rust
pub fn normalize_to(self, e: i16) -> Self
```

Normalizes itself to have the shared exponent.
It can only decrease the exponent (and thus increase the mantissa).
