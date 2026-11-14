---
title: "core::num::uint_macros (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/uint_macros.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::uint_macros

## const MIN

```rust
pub const MIN: Self = 0
```

```rust

## const MAX

```rust
pub const MAX: Self = !0
```

```rust

## const BITS

```rust
pub const BITS: u32 = Self::MAX.count_ones()
```

```rust

## fn count_ones

```rust
pub const fn count_ones(self) -> u32
```

assert_eq!(zero.count_ones(), 0);
```rust

## fn count_zeros

```rust
pub const fn count_zeros(self) -> u32
```

```rust

## fn leading_zeros

```rust
pub const fn leading_zeros(self) -> u32
```

assert_eq!(max.leading_zeros(), 0);
```rust

## fn trailing_zeros

```rust
pub const fn trailing_zeros(self) -> u32
```

```rust

## fn leading_ones

```rust
pub const fn leading_ones(self) -> u32
```

```rust

## fn trailing_ones

```rust
pub const fn trailing_ones(self) -> u32
```

```rust

## fn bit_width

```rust
pub const fn bit_width(self) -> u32
```

```rust

## fn isolate_highest_one

```rust
pub const fn isolate_highest_one(self) -> Self
```

```rust

## fn isolate_lowest_one

```rust
pub const fn isolate_lowest_one(self) -> Self
```

```rust

## fn highest_one

```rust
pub const fn highest_one(self) -> Option<u32>
```

```rust

## fn lowest_one

```rust
pub const fn lowest_one(self) -> Option<u32>
```

```rust

## fn cast_signed

```rust
pub const fn cast_signed(self) -> $SignedT
```

```rust

## fn rotate_left

```rust
pub const fn rotate_left(self, n: u32) -> Self
```

```rust

## fn rotate_right

```rust
pub const fn rotate_right(self, n: u32) -> Self
```

```rust

## fn swap_bytes

```rust
pub const fn swap_bytes(self) -> Self
```

```rust

## fn reverse_bits

```rust
pub const fn reverse_bits(self) -> Self
```

```rust

## fn from_be

```rust
pub const fn from_be(x: Self) -> Self
```

}
```rust

## fn from_le

```rust
pub const fn from_le(x: Self) -> Self
```

}
```rust

## fn to_be

```rust
pub const fn to_be(self) -> Self
```

if cfg!(target_endian = "big") {
    assert_eq!(n.to_be(), n)
} else {
    assert_eq!(n.to_be(), n.swap_bytes())
}
```rust

## fn to_le

```rust
pub const fn to_le(self) -> Self
```

if cfg!(target_endian = "little") {
    assert_eq!(n.to_le(), n)
} else {
    assert_eq!(n.to_le(), n.swap_bytes())
}
```rust

## fn checked_add

```rust
pub const fn checked_add(self, rhs: Self) -> Option<Self>
```

```rust

## fn strict_add

```rust
pub const fn strict_add(self, rhs: Self) -> Self
```

```rust

## fn unchecked_add

```rust
pub const unsafe fn unchecked_add(self, rhs: Self) -> Self
```

i.e. when `checked_add` would return `None`.

## fn checked_add_signed

```rust
pub const fn checked_add_signed(self, rhs: $SignedT) -> Option<Self>
```

```rust

## fn strict_add_signed

```rust
pub const fn strict_add_signed(self, rhs: $SignedT) -> Self
```

```rust

## fn checked_sub

```rust
pub const fn checked_sub(self, rhs: Self) -> Option<Self>
```

```rust

## fn strict_sub

```rust
pub const fn strict_sub(self, rhs: Self) -> Self
```

```rust

## fn unchecked_sub

```rust
pub const unsafe fn unchecked_sub(self, rhs: Self) -> Self
```

i.e. when `checked_sub` would return `None`.

## fn checked_sub_signed

```rust
pub const fn checked_sub_signed(self, rhs: $SignedT) -> Option<Self>
```

```rust

## fn strict_sub_signed

```rust
pub const fn strict_sub_signed(self, rhs: $SignedT) -> Self
```

```rust

## fn checked_signed_diff

```rust
pub const fn checked_signed_diff(self, rhs: Self) -> Option<$SignedT>
```

```rust

## fn checked_mul

```rust
pub const fn checked_mul(self, rhs: Self) -> Option<Self>
```

```rust

## fn strict_mul

```rust
pub const fn strict_mul(self, rhs: Self) -> Self
```

```rust

## fn unchecked_mul

```rust
pub const unsafe fn unchecked_mul(self, rhs: Self) -> Self
```

i.e. when `checked_mul` would return `None`.

## fn checked_div

```rust
pub const fn checked_div(self, rhs: Self) -> Option<Self>
```

```rust

## fn strict_div

```rust
pub const fn strict_div(self, rhs: Self) -> Self
```

```rust

## fn checked_div_euclid

```rust
pub const fn checked_div_euclid(self, rhs: Self) -> Option<Self>
```

```rust

## fn strict_div_euclid

```rust
pub const fn strict_div_euclid(self, rhs: Self) -> Self
```

```rust

## fn checked_rem

```rust
pub const fn checked_rem(self, rhs: Self) -> Option<Self>
```

```rust

## fn strict_rem

```rust
pub const fn strict_rem(self, rhs: Self) -> Self
```

```rust

## fn checked_rem_euclid

```rust
pub const fn checked_rem_euclid(self, rhs: Self) -> Option<Self>
```

```rust

## fn strict_rem_euclid

```rust
pub const fn strict_rem_euclid(self, rhs: Self) -> Self
```

```rust

## fn ilog

```rust
pub const fn ilog(self, base: Self) -> u32
```

```rust

## fn ilog2

```rust
pub const fn ilog2(self) -> u32
```

```rust

## fn ilog10

```rust
pub const fn ilog10(self) -> u32
```

```rust

## fn checked_ilog

```rust
pub const fn checked_ilog(self, base: Self) -> Option<u32>
```

```rust

## fn checked_ilog2

```rust
pub const fn checked_ilog2(self) -> Option<u32>
```

```rust

## fn checked_ilog10

```rust
pub const fn checked_ilog10(self) -> Option<u32>
```

```rust

## fn checked_neg

```rust
pub const fn checked_neg(self) -> Option<Self>
```

```rust

## fn strict_neg

```rust
pub const fn strict_neg(self) -> Self
```

```rust

## fn checked_shl

```rust
pub const fn checked_shl(self, rhs: u32) -> Option<Self>
```

```rust

## fn strict_shl

```rust
pub const fn strict_shl(self, rhs: u32) -> Self
```

```rust

## fn unchecked_shl

```rust
pub const unsafe fn unchecked_shl(self, rhs: u32) -> Self
```

Unchecked shift left. Computes `self << rhs`, assuming that
`rhs` is less than the number of bits in `self`.

# Safety

This results in undefined behavior if `rhs` is larger than
or equal to the number of bits in `self`,
i.e. when `checked_shl` would return `None`.

## fn unbounded_shl

```rust
pub const fn unbounded_shl(self, rhs: u32) -> $SelfT
```

running <<= 1;
}
```rust

## fn checked_shr

```rust
pub const fn checked_shr(self, rhs: u32) -> Option<Self>
```

```rust

## fn strict_shr

```rust
pub const fn strict_shr(self, rhs: u32) -> Self
```

```rust

## fn unchecked_shr

```rust
pub const unsafe fn unchecked_shr(self, rhs: u32) -> Self
```

Unchecked shift right. Computes `self >> rhs`, assuming that
`rhs` is less than the number of bits in `self`.

# Safety

This results in undefined behavior if `rhs` is larger than
or equal to the number of bits in `self`,
i.e. when `checked_shr` would return `None`.

## fn unbounded_shr

```rust
pub const fn unbounded_shr(self, rhs: u32) -> $SelfT
```

running >>= 1;
}
```rust

## fn checked_pow

```rust
pub const fn checked_pow(self, mut exp: u32) -> Option<Self>
```

```rust

## fn strict_pow

```rust
pub const fn strict_pow(self, exp: u32) -> Self
```

```rust

## fn saturating_add

```rust
pub const fn saturating_add(self, rhs: Self) -> Self
```

```rust

## fn saturating_add_signed

```rust
pub const fn saturating_add_signed(self, rhs: $SignedT) -> Self
```

```rust

## fn saturating_sub

```rust
pub const fn saturating_sub(self, rhs: Self) -> Self
```

```rust

## fn saturating_sub_signed

```rust
pub const fn saturating_sub_signed(self, rhs: $SignedT) -> Self
```

```rust

## fn saturating_mul

```rust
pub const fn saturating_mul(self, rhs: Self) -> Self
```

```rust

## fn saturating_div

```rust
pub const fn saturating_div(self, rhs: Self) -> Self
```

```rust

## fn saturating_pow

```rust
pub const fn saturating_pow(self, exp: u32) -> Self
```

```rust

## fn wrapping_add

```rust
pub const fn wrapping_add(self, rhs: Self) -> Self
```

```rust

## fn wrapping_add_signed

```rust
pub const fn wrapping_add_signed(self, rhs: $SignedT) -> Self
```

```rust

## fn wrapping_sub

```rust
pub const fn wrapping_sub(self, rhs: Self) -> Self
```

```rust

## fn wrapping_sub_signed

```rust
pub const fn wrapping_sub_signed(self, rhs: $SignedT) -> Self
```

```rust

## fn wrapping_mul

```rust
pub const fn wrapping_mul(self, rhs: Self) -> Self
```

Wrapping (modular) multiplication. Computes `self *
rhs`, wrapping around at the boundary of the type.

# Examples

Please note that this example is shared among integer types, which is why `u8` is used.

```rust
assert_eq!(10u8.wrapping_mul(12), 120);
assert_eq!(25u8.wrapping_mul(12), 44);
```

## fn wrapping_div

```rust
pub const fn wrapping_div(self, rhs: Self) -> Self
```

```rust

## fn wrapping_div_euclid

```rust
pub const fn wrapping_div_euclid(self, rhs: Self) -> Self
```

```rust

## fn wrapping_rem

```rust
pub const fn wrapping_rem(self, rhs: Self) -> Self
```

```rust

## fn wrapping_rem_euclid

```rust
pub const fn wrapping_rem_euclid(self, rhs: Self) -> Self
```

```rust

## fn wrapping_neg

```rust
pub const fn wrapping_neg(self) -> Self
```

```rust

## fn wrapping_shl

```rust
pub const fn wrapping_shl(self, rhs: u32) -> Self
```

```rust

## fn wrapping_shr

```rust
pub const fn wrapping_shr(self, rhs: u32) -> Self
```

```rust

## fn wrapping_pow

```rust
pub const fn wrapping_pow(self, exp: u32) -> Self
```

```rust

## fn overflowing_add

```rust
pub const fn overflowing_add(self, rhs: Self) -> (Self, bool)
```

```rust

## fn carrying_add

```rust
pub const fn carrying_add(self, rhs: Self, carry: bool) -> (Self, bool)
```

let carry0 = false;

let (sum0, carry1) = a0.carrying_add(b0, carry0);
assert_eq!(carry1, true);
let (sum1, carry2) = a1.carrying_add(b1, carry1);
assert_eq!(carry2, false);

assert_eq!((sum1, sum0), (9, 6));
```rust

## fn overflowing_add_signed

```rust
pub const fn overflowing_add_signed(self, rhs: $SignedT) -> (Self, bool)
```

```rust

## fn overflowing_sub

```rust
pub const fn overflowing_sub(self, rhs: Self) -> (Self, bool)
```

```rust

## fn borrowing_sub

```rust
pub const fn borrowing_sub(self, rhs: Self, borrow: bool) -> (Self, bool)
```

```rust

## fn overflowing_sub_signed

```rust
pub const fn overflowing_sub_signed(self, rhs: $SignedT) -> (Self, bool)
```

```rust

## fn abs_diff

```rust
pub const fn abs_diff(self, other: Self) -> Self
```

```rust

## fn overflowing_mul

```rust
pub const fn overflowing_mul(self, rhs: Self) -> (Self, bool)
```

Calculates the multiplication of `self` and `rhs`.

Returns a tuple of the multiplication along with a boolean
indicating whether an arithmetic overflow would occur. If an
overflow would have occurred then the wrapped value is returned.

If you want the *value* of the overflow, rather than just *whether*
an overflow occurred, see `Self::carrying_mul`.

# Examples

Please note that this example is shared among integer types, which is why `u32` is used.

```rust
assert_eq!(5u32.overflowing_mul(2), (10, false));
assert_eq!(1_000_000_000u32.overflowing_mul(10), (1410065408, true));
```
