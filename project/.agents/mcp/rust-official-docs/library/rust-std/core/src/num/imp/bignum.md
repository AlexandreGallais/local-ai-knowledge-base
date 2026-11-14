---
title: "core::num::imp::bignum"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/imp/bignum.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::imp::bignum

Custom arbitrary-precision number (bignum) implementation.

This is designed to avoid the heap allocation at expense of stack memory.
The most used bignum type, `Big32x40` and  `Big64x20` you can choose, is limited by 32 × 40 = 1,280 bits
and will take at most 160 bytes of stack memory. This is more than enough
for round-tripping all possible finite `f64` values.

In principle it is possible to have multiple bignum types for different
inputs, but we don't do so to avoid the code bloat. Each bignum is still
tracked for the actual usages, so it normally doesn't matter.

## trait FullOps

```rust
pub trait FullOps: Sized
```

Arithmetic operations required by bignums.

## FullOps::full_mul_add

```rust
fn full_mul_add(self, other: Self, other2: Self, carry: Self) -> (Self /* carry */, Self)
```

Returns `(carry', v')` such that `carry' * 2^W + v' = self * other + other2 + carry`,
where `W` is the number of bits in `Self`.

## FullOps::full_div_rem

```rust
fn full_div_rem(self, other: Self, borrow: Self) -> (Self /* quotient */, Self /* remainder */)
```

Returns `(quo, rem)` such that `borrow * 2^W + self = quo * other + rem`
and `0 <= rem < other`, where `W` is the number of bits in `Self`.

## name::from_small

```rust
pub fn from_small(v: $ty) -> $name
```

Makes a bignum from one digit.

## name::from_u64

```rust
pub fn from_u64(mut v: u64) -> $name
```

Makes a bignum from `u64` value.

## name::digits

```rust
pub fn digits(&self) -> &[$ty]
```

Returns the internal digits as a slice `[a, b, c, ...]` such that the numeric
value is `a + b * 2^W + c * 2^(2W) + ...` where `W` is the number of bits in
the digit type.

## name::get_bit

```rust
pub fn get_bit(&self, i: usize) -> u8
```

Returns the `i`-th bit where bit 0 is the least significant one.
In other words, the bit with weight `2^i`.

## name::is_zero

```rust
pub fn is_zero(&self) -> bool
```

Returns `true` if the bignum is zero.

## name::bit_length

```rust
pub fn bit_length(&self) -> usize
```

Returns the number of bits necessary to represent this value. Note that zero
is considered to need 0 bits.

## name::add

```rust
pub fn add<'a>(&'a mut self, other: &$name) -> &'a mut $name
```

Adds `other` to itself and returns its own mutable reference.

## name::sub

```rust
pub fn sub<'a>(&'a mut self, other: &$name) -> &'a mut $name
```

Subtracts `other` from itself and returns its own mutable reference.

## name::mul_small

```rust
pub fn mul_small(&mut self, other: $ty) -> &mut $name
```

Multiplies itself by a digit-sized `other` and returns its own
mutable reference.

## name::mul_pow2

```rust
pub fn mul_pow2(&mut self, bits: usize) -> &mut $name
```

Multiplies itself by `2^bits` and returns its own mutable reference.

## name::mul_pow5

```rust
pub fn mul_pow5(&mut self, mut e: usize) -> &mut $name
```

Multiplies itself by `5^e` and returns its own mutable reference.

## name::mul_digits

```rust
pub fn mul_digits<'a>(&'a mut self, other: &[$ty]) -> &'a mut $name
```

Multiplies itself by a number described by `other[0] + other[1] * 2^W +
other[2] * 2^(2W) + ...` (where `W` is the number of bits in the digit type)
and returns its own mutable reference.

## name::div_rem_small

```rust
pub fn div_rem_small(&mut self, other: $ty) -> (&mut $name, $ty)
```

Divides itself by a digit-sized `other` and returns its own
mutable reference *and* the remainder.

## type Digit32

```rust
pub type Digit32 = u32
```

the digit type for `Big32x40`

## type Digit64

```rust
pub type Digit64 = u64
```

The digit type for `Big64x20`.
