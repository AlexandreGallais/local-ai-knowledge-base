# core::num::int_macros

## const MIN

```rust
pub const MIN: Self = !Self::MAX
```

```

## const MAX

```rust
pub const MAX: Self = (<$UnsignedT>::MAX >> 1) as Self
```

```

## const BITS

```rust
pub const BITS: u32 = <$UnsignedT>::BITS
```

```

## fn count_ones

```rust
pub const fn count_ones(self) -> u32
```

assert_eq!(n.count_ones(), 1);
```

## fn count_zeros

```rust
pub const fn count_zeros(self) -> u32
```

```

## fn leading_zeros

```rust
pub const fn leading_zeros(self) -> u32
```

assert_eq!(n.leading_zeros(), 0);
```

## fn trailing_zeros

```rust
pub const fn trailing_zeros(self) -> u32
```

assert_eq!(n.trailing_zeros(), 2);
```

## fn leading_ones

```rust
pub const fn leading_ones(self) -> u32
```

```

## fn trailing_ones

```rust
pub const fn trailing_ones(self) -> u32
```

assert_eq!(n.trailing_ones(), 2);
```

## fn isolate_highest_one

```rust
pub const fn isolate_highest_one(self) -> Self
```

```

## fn isolate_lowest_one

```rust
pub const fn isolate_lowest_one(self) -> Self
```

```

## fn highest_one

```rust
pub const fn highest_one(self) -> Option<u32>
```

```

## fn lowest_one

```rust
pub const fn lowest_one(self) -> Option<u32>
```

```

## fn cast_unsigned

```rust
pub const fn cast_unsigned(self) -> $UnsignedT
```

```

## fn rotate_left

```rust
pub const fn rotate_left(self, n: u32) -> Self
```

```

## fn rotate_right

```rust
pub const fn rotate_right(self, n: u32) -> Self
```

```

## fn swap_bytes

```rust
pub const fn swap_bytes(self) -> Self
```

```

## fn reverse_bits

```rust
pub const fn reverse_bits(self) -> Self
```

```

## fn from_be

```rust
pub const fn from_be(x: Self) -> Self
```

}
```

## fn from_le

```rust
pub const fn from_le(x: Self) -> Self
```

}
```

## fn to_be

```rust
pub const fn to_be(self) -> Self
```

if cfg!(target_endian = "big") {
    assert_eq!(n.to_be(), n)
} else {
    assert_eq!(n.to_be(), n.swap_bytes())
}
```

## fn to_le

```rust
pub const fn to_le(self) -> Self
```

if cfg!(target_endian = "little") {
    assert_eq!(n.to_le(), n)
} else {
    assert_eq!(n.to_le(), n.swap_bytes())
}
```

## fn checked_add

```rust
pub const fn checked_add(self, rhs: Self) -> Option<Self>
```

```

## fn strict_add

```rust
pub const fn strict_add(self, rhs: Self) -> Self
```

```

## fn unchecked_add

```rust
pub const unsafe fn unchecked_add(self, rhs: Self) -> Self
```

i.e. when [`checked_add`] would return `None`.

[`unwrap_unchecked`]: option/enum.Option.html#method.unwrap_unchecked

## fn checked_add_unsigned

```rust
pub const fn checked_add_unsigned(self, rhs: $UnsignedT) -> Option<Self>
```

```

## fn strict_add_unsigned

```rust
pub const fn strict_add_unsigned(self, rhs: $UnsignedT) -> Self
```

```

## fn checked_sub

```rust
pub const fn checked_sub(self, rhs: Self) -> Option<Self>
```

```

## fn strict_sub

```rust
pub const fn strict_sub(self, rhs: Self) -> Self
```

```

## fn unchecked_sub

```rust
pub const unsafe fn unchecked_sub(self, rhs: Self) -> Self
```

i.e. when [`checked_sub`] would return `None`.

[`unwrap_unchecked`]: option/enum.Option.html#method.unwrap_unchecked

## fn checked_sub_unsigned

```rust
pub const fn checked_sub_unsigned(self, rhs: $UnsignedT) -> Option<Self>
```

```

## fn strict_sub_unsigned

```rust
pub const fn strict_sub_unsigned(self, rhs: $UnsignedT) -> Self
```

```

## fn checked_mul

```rust
pub const fn checked_mul(self, rhs: Self) -> Option<Self>
```

```

## fn strict_mul

```rust
pub const fn strict_mul(self, rhs: Self) -> Self
```

```

## fn unchecked_mul

```rust
pub const unsafe fn unchecked_mul(self, rhs: Self) -> Self
```

i.e. when [`checked_mul`] would return `None`.

[`unwrap_unchecked`]: option/enum.Option.html#method.unwrap_unchecked

## fn checked_div

```rust
pub const fn checked_div(self, rhs: Self) -> Option<Self>
```

```

## fn strict_div

```rust
pub const fn strict_div(self, rhs: Self) -> Self
```

```

## fn checked_div_euclid

```rust
pub const fn checked_div_euclid(self, rhs: Self) -> Option<Self>
```

```

## fn strict_div_euclid

```rust
pub const fn strict_div_euclid(self, rhs: Self) -> Self
```

```

## fn checked_rem

```rust
pub const fn checked_rem(self, rhs: Self) -> Option<Self>
```

```

## fn strict_rem

```rust
pub const fn strict_rem(self, rhs: Self) -> Self
```

```

## fn checked_rem_euclid

```rust
pub const fn checked_rem_euclid(self, rhs: Self) -> Option<Self>
```

```

## fn strict_rem_euclid

```rust
pub const fn strict_rem_euclid(self, rhs: Self) -> Self
```

```

## fn checked_neg

```rust
pub const fn checked_neg(self) -> Option<Self>
```

```

## fn unchecked_neg

```rust
pub const unsafe fn unchecked_neg(self) -> Self
```

i.e. when [`checked_neg`] would return `None`.

## fn strict_neg

```rust
pub const fn strict_neg(self) -> Self
```

```

## fn checked_shl

```rust
pub const fn checked_shl(self, rhs: u32) -> Option<Self>
```

```

## fn strict_shl

```rust
pub const fn strict_shl(self, rhs: u32) -> Self
```

```

## fn unchecked_shl

```rust
pub const unsafe fn unchecked_shl(self, rhs: u32) -> Self
```

Unchecked shift left. Computes `self << rhs`, assuming that
`rhs` is less than the number of bits in `self`.

# Safety

This results in undefined behavior if `rhs` is larger than
or equal to the number of bits in `self`,
i.e. when [`checked_shl`] would return `None`.

## fn unbounded_shl

```rust
pub const fn unbounded_shl(self, rhs: u32) -> $SelfT
```

```

## fn checked_shr

```rust
pub const fn checked_shr(self, rhs: u32) -> Option<Self>
```

```

## fn strict_shr

```rust
pub const fn strict_shr(self, rhs: u32) -> Self
```

```

## fn unchecked_shr

```rust
pub const unsafe fn unchecked_shr(self, rhs: u32) -> Self
```

Unchecked shift right. Computes `self >> rhs`, assuming that
`rhs` is less than the number of bits in `self`.

# Safety

This results in undefined behavior if `rhs` is larger than
or equal to the number of bits in `self`,
i.e. when [`checked_shr`] would return `None`.

## fn unbounded_shr

```rust
pub const fn unbounded_shr(self, rhs: u32) -> $SelfT
```

```

## fn checked_abs

```rust
pub const fn checked_abs(self) -> Option<Self>
```

```

## fn strict_abs

```rust
pub const fn strict_abs(self) -> Self
```

```

## fn strict_pow

```rust
pub const fn strict_pow(self, exp: u32) -> Self
```

```

## fn checked_isqrt

```rust
pub const fn checked_isqrt(self) -> Option<Self>
```

```

## fn saturating_add_unsigned

```rust
pub const fn saturating_add_unsigned(self, rhs: $UnsignedT) -> Self
```

```

## fn saturating_sub

```rust
pub const fn saturating_sub(self, rhs: Self) -> Self
```

```

## fn saturating_sub_unsigned

```rust
pub const fn saturating_sub_unsigned(self, rhs: $UnsignedT) -> Self
```

```

## fn saturating_mul

```rust
pub const fn saturating_mul(self, rhs: Self) -> Self
```

```

## fn saturating_div

```rust
pub const fn saturating_div(self, rhs: Self) -> Self
```

```

## fn saturating_pow

```rust
pub const fn saturating_pow(self, exp: u32) -> Self
```

```

## fn wrapping_add

```rust
pub const fn wrapping_add(self, rhs: Self) -> Self
```

```

## fn wrapping_add_unsigned

```rust
pub const fn wrapping_add_unsigned(self, rhs: $UnsignedT) -> Self
```

```

## fn wrapping_sub

```rust
pub const fn wrapping_sub(self, rhs: Self) -> Self
```

```

## fn wrapping_sub_unsigned

```rust
pub const fn wrapping_sub_unsigned(self, rhs: $UnsignedT) -> Self
```

```

## fn wrapping_mul

```rust
pub const fn wrapping_mul(self, rhs: Self) -> Self
```

assert_eq!(11i8.wrapping_mul(12), -124);
```

## fn wrapping_div

```rust
pub const fn wrapping_div(self, rhs: Self) -> Self
```

assert_eq!((-128i8).wrapping_div(-1), -128);
```

## fn wrapping_div_euclid

```rust
pub const fn wrapping_div_euclid(self, rhs: Self) -> Self
```

assert_eq!((-128i8).wrapping_div_euclid(-1), -128);
```

## fn wrapping_rem

```rust
pub const fn wrapping_rem(self, rhs: Self) -> Self
```

assert_eq!((-128i8).wrapping_rem(-1), 0);
```

## fn wrapping_rem_euclid

```rust
pub const fn wrapping_rem_euclid(self, rhs: Self) -> Self
```

assert_eq!((-128i8).wrapping_rem_euclid(-1), 0);
```

## fn wrapping_neg

```rust
pub const fn wrapping_neg(self) -> Self
```

```

## fn wrapping_shl

```rust
pub const fn wrapping_shl(self, rhs: u32) -> Self
```

```

## fn wrapping_shr

```rust
pub const fn wrapping_shr(self, rhs: u32) -> Self
```

```

## fn wrapping_abs

```rust
pub const fn wrapping_abs(self) -> Self
```

assert_eq!((-128i8).wrapping_abs() as u8, 128);
```

## fn unsigned_abs

```rust
pub const fn unsigned_abs(self) -> $UnsignedT
```

assert_eq!((-128i8).unsigned_abs(), 128u8);
```

## fn wrapping_pow

```rust
pub const fn wrapping_pow(self, exp: u32) -> Self
```

```

## fn overflowing_add

```rust
pub const fn overflowing_add(self, rhs: Self) -> (Self, bool)
```

```

## fn overflowing_add_unsigned

```rust
pub const fn overflowing_add_unsigned(self, rhs: $UnsignedT) -> (Self, bool)
```

```

## fn overflowing_sub

```rust
pub const fn overflowing_sub(self, rhs: Self) -> (Self, bool)
```

```

## fn overflowing_sub_unsigned

```rust
pub const fn overflowing_sub_unsigned(self, rhs: $UnsignedT) -> (Self, bool)
```

```

## fn overflowing_mul

```rust
pub const fn overflowing_mul(self, rhs: Self) -> (Self, bool)
```

assert_eq!(1_000_000_000i32.overflowing_mul(10), (1410065408, true));
```

## fn overflowing_div

```rust
pub const fn overflowing_div(self, rhs: Self) -> (Self, bool)
```

```

## fn overflowing_div_euclid

```rust
pub const fn overflowing_div_euclid(self, rhs: Self) -> (Self, bool)
```

```

## fn overflowing_rem

```rust
pub const fn overflowing_rem(self, rhs: Self) -> (Self, bool)
```

```

## fn overflowing_rem_euclid

```rust
pub const fn overflowing_rem_euclid(self, rhs: Self) -> (Self, bool)
```

```

## fn overflowing_neg

```rust
pub const fn overflowing_neg(self) -> (Self, bool)
```

```

## fn overflowing_shl

```rust
pub const fn overflowing_shl(self, rhs: u32) -> (Self, bool)
```

```

## fn overflowing_shr

```rust
pub const fn overflowing_shr(self, rhs: u32) -> (Self, bool)
```

assert_eq!(0x10i32.overflowing_shr(36), (0x1, true));
```

## fn overflowing_abs

```rust
pub const fn overflowing_abs(self) -> (Self, bool)
```

```

## fn overflowing_pow

```rust
pub const fn overflowing_pow(self, mut exp: u32) -> (Self, bool)
```

assert_eq!(3i8.overflowing_pow(5), (-13, true));
```

## fn pow

```rust
pub const fn pow(self, exp: u32) -> Self
```

```

## fn isqrt

```rust
pub const fn isqrt(self) -> Self
```

```

## fn div_euclid

```rust
pub const fn div_euclid(self, rhs: Self) -> Self
```

let b = 4;

assert_eq!(a.div_euclid(b), 1); // 7 >= 4 * 1
assert_eq!(a.div_euclid(-b), -1); // 7 >= -4 * -1
assert_eq!((-a).div_euclid(b), -2); // -7 >= 4 * -2
assert_eq!((-a).div_euclid(-b), 2); // -7 >= -4 * 2
```

## fn rem_euclid

```rust
pub const fn rem_euclid(self, rhs: Self) -> Self
```

```

## fn ilog

```rust
pub const fn ilog(self, base: Self) -> u32
```

```

## fn ilog2

```rust
pub const fn ilog2(self) -> u32
```

```

## fn ilog10

```rust
pub const fn ilog10(self) -> u32
```

```

## fn checked_ilog

```rust
pub const fn checked_ilog(self, base: Self) -> Option<u32>
```

```

## fn checked_ilog2

```rust
pub const fn checked_ilog2(self) -> Option<u32>
```

```

## fn checked_ilog10

```rust
pub const fn checked_ilog10(self) -> Option<u32>
```

```

## fn abs

```rust
pub const fn abs(self) -> Self
```

```

## fn abs_diff

```rust
pub const fn abs_diff(self, other: Self) -> $UnsignedT
```

```

## fn signum

```rust
pub const fn signum(self) -> Self
```

```

## fn is_positive

```rust
pub const fn is_positive(self) -> bool
```

```

## fn is_negative

```rust
pub const fn is_negative(self) -> bool
```

```

## fn to_be_bytes

```rust
pub const fn to_be_bytes(self) -> [u8; size_of::<Self>()]
```

```

## fn to_le_bytes

```rust
pub const fn to_le_bytes(self) -> [u8; size_of::<Self>()]
```

```

## fn from_be_bytes

```rust
pub const fn from_be_bytes(bytes: [u8; size_of::<Self>()]) -> Self
```

}
```

## fn from_le_bytes

```rust
pub const fn from_le_bytes(bytes: [u8; size_of::<Self>()]) -> Self
```

}
```

## fn min_value

```rust
pub const fn min_value() -> Self
```

Returns the smallest value that can be represented by this integer type.

## fn max_value

```rust
pub const fn max_value() -> Self
```

Returns the largest value that can be represented by this integer type.