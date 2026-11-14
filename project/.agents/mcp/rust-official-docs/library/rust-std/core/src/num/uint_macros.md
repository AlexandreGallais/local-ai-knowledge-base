# core::num::uint_macros

## const MIN

```rust
pub const MIN: Self = 0
```

```

## const MAX

```rust
pub const MAX: Self = !0
```

```

## const BITS

```rust
pub const BITS: u32 = Self::MAX.count_ones()
```

```

## fn count_ones

```rust
pub const fn count_ones(self) -> u32
```

assert_eq!(zero.count_ones(), 0);
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

assert_eq!(max.leading_zeros(), 0);
```

## fn trailing_zeros

```rust
pub const fn trailing_zeros(self) -> u32
```

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

```

## fn bit_width

```rust
pub const fn bit_width(self) -> u32
```

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

## fn cast_signed

```rust
pub const fn cast_signed(self) -> $SignedT
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

## fn checked_add_signed

```rust
pub const fn checked_add_signed(self, rhs: $SignedT) -> Option<Self>
```

```

## fn strict_add_signed

```rust
pub const fn strict_add_signed(self, rhs: $SignedT) -> Self
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

## fn checked_sub_signed

```rust
pub const fn checked_sub_signed(self, rhs: $SignedT) -> Option<Self>
```

```

## fn strict_sub_signed

```rust
pub const fn strict_sub_signed(self, rhs: $SignedT) -> Self
```

```

## fn checked_signed_diff

```rust
pub const fn checked_signed_diff(self, rhs: Self) -> Option<$SignedT>
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

## fn checked_neg

```rust
pub const fn checked_neg(self) -> Option<Self>
```

```

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

running <<= 1;
}
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

running >>= 1;
}
```

## fn checked_pow

```rust
pub const fn checked_pow(self, mut exp: u32) -> Option<Self>
```

```

## fn strict_pow

```rust
pub const fn strict_pow(self, exp: u32) -> Self
```

```

## fn saturating_add

```rust
pub const fn saturating_add(self, rhs: Self) -> Self
```

```

## fn saturating_add_signed

```rust
pub const fn saturating_add_signed(self, rhs: $SignedT) -> Self
```

```

## fn saturating_sub

```rust
pub const fn saturating_sub(self, rhs: Self) -> Self
```

```

## fn saturating_sub_signed

```rust
pub const fn saturating_sub_signed(self, rhs: $SignedT) -> Self
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

## fn wrapping_add_signed

```rust
pub const fn wrapping_add_signed(self, rhs: $SignedT) -> Self
```

```

## fn wrapping_sub

```rust
pub const fn wrapping_sub(self, rhs: Self) -> Self
```

```

## fn wrapping_sub_signed

```rust
pub const fn wrapping_sub_signed(self, rhs: $SignedT) -> Self
```

```

## fn wrapping_mul

```rust
pub const fn wrapping_mul(self, rhs: Self) -> Self
```

Wrapping (modular) multiplication. Computes `self *
rhs`, wrapping around at the boundary of the type.

# Examples

Please note that this example is shared among integer types, which is why `u8` is used.

```
assert_eq!(10u8.wrapping_mul(12), 120);
assert_eq!(25u8.wrapping_mul(12), 44);
```

## fn wrapping_div

```rust
pub const fn wrapping_div(self, rhs: Self) -> Self
```

```

## fn wrapping_div_euclid

```rust
pub const fn wrapping_div_euclid(self, rhs: Self) -> Self
```

```

## fn wrapping_rem

```rust
pub const fn wrapping_rem(self, rhs: Self) -> Self
```

```

## fn wrapping_rem_euclid

```rust
pub const fn wrapping_rem_euclid(self, rhs: Self) -> Self
```

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
```

## fn overflowing_add_signed

```rust
pub const fn overflowing_add_signed(self, rhs: $SignedT) -> (Self, bool)
```

```

## fn overflowing_sub

```rust
pub const fn overflowing_sub(self, rhs: Self) -> (Self, bool)
```

```

## fn borrowing_sub

```rust
pub const fn borrowing_sub(self, rhs: Self, borrow: bool) -> (Self, bool)
```

```

## fn overflowing_sub_signed

```rust
pub const fn overflowing_sub_signed(self, rhs: $SignedT) -> (Self, bool)
```

```

## fn abs_diff

```rust
pub const fn abs_diff(self, other: Self) -> Self
```

```

## fn overflowing_mul

```rust
pub const fn overflowing_mul(self, rhs: Self) -> (Self, bool)
```

Calculates the multiplication of `self` and `rhs`.

Returns a tuple of the multiplication along with a boolean
indicating whether an arithmetic overflow would occur. If an
overflow would have occurred then the wrapped value is returned.

If you want the *value* of the overflow, rather than just *whether*
an overflow occurred, see [`Self::carrying_mul`].

# Examples

Please note that this example is shared among integer types, which is why `u32` is used.

```
assert_eq!(5u32.overflowing_mul(2), (10, false));
assert_eq!(1_000_000_000u32.overflowing_mul(10), (1410065408, true));
```

## fn carrying_mul

```rust
pub const fn carrying_mul(self, rhs: Self, carry: Self) -> (Self, Self)
```

```

This is the core operation needed for scalar multiplication when
implementing it for wider-than-native types.

```
fn scalar_mul_eq(little_endian_digits: &mut Vec<u16>, multiplicand: u16) {
    let mut carry = 0;
    for d in little_endian_digits.iter_mut() {
        (*d, carry) = d.carrying_mul(multiplicand, carry);
    }
    if carry != 0 {
        little_endian_digits.push(carry);
    }
}

let mut v = vec![10, 20];
scalar_mul_eq(&mut v, 3);
assert_eq!(v, [30, 60]);

assert_eq!(0x87654321_u64 * 0xFEED, 0x86D3D159E38D);
let mut v = vec![0x4321, 0x8765];
scalar_mul_eq(&mut v, 0xFEED);
assert_eq!(v, [0xE38D, 0xD159, 0x86D3]);
```

If `carry` is zero, this is similar to [`overflowing_mul`](Self::overflowing_mul),
except that it gives the value of the overflow instead of just whether one happened:

```
# #![allow(unused_features)]
#![feature(const_unsigned_bigint_helpers)]
let r = u8::carrying_mul(7, 13, 0);
assert_eq!((r.0, r.1 != 0), u8::overflowing_mul(7, 13));
let r = u8::carrying_mul(13, 42, 0);
assert_eq!((r.0, r.1 != 0), u8::overflowing_mul(13, 42));
```

The value of the first field in the returned tuple matches what you'd get
by combining the [`wrapping_mul`](Self::wrapping_mul) and
[`wrapping_add`](Self::wrapping_add) methods:

```
# #![allow(unused_features)]
#![feature(const_unsigned_bigint_helpers)]
assert_eq!(
    789_u16.carrying_mul(456, 123).0,
    789_u16.wrapping_mul(456).wrapping_add(123),
);
```

## fn carrying_mul_add

```rust
pub const fn carrying_mul_add(self, rhs: Self, carry: Self, add: Self) -> (Self, Self)
```

```

This is the core per-digit operation for "grade school" O(n²) multiplication.

Please note that this example is shared between integer types,
using `u8` for simplicity of the demonstration.

```
fn quadratic_mul<const N: usize>(a: [u8; N], b: [u8; N]) -> [u8; N] {
    let mut out = [0; N];
    for j in 0..N {
        let mut carry = 0;
        for i in 0..(N - j) {
            (out[j + i], carry) = u8::carrying_mul_add(a[i], b[j], out[j + i], carry);
        }
    }
    out
}

// -1 * -1 == 1
assert_eq!(quadratic_mul([0xFF; 3], [0xFF; 3]), [1, 0, 0]);

assert_eq!(u32::wrapping_mul(0x9e3779b9, 0x7f4a7c15), 0xcffc982d);
assert_eq!(
    quadratic_mul(u32::to_le_bytes(0x9e3779b9), u32::to_le_bytes(0x7f4a7c15)),
    u32::to_le_bytes(0xcffc982d)
);
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

```

## fn overflowing_pow

```rust
pub const fn overflowing_pow(self, mut exp: u32) -> (Self, bool)
```

assert_eq!(3u8.overflowing_pow(6), (217, true));
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

```

## fn rem_euclid

```rust
pub const fn rem_euclid(self, rhs: Self) -> Self
```

```

## fn div_ceil

```rust
pub const fn div_ceil(self, rhs: Self) -> Self
```

```

## fn next_multiple_of

```rust
pub const fn next_multiple_of(self, rhs: Self) -> Self
```

```

## fn checked_next_multiple_of

```rust
pub const fn checked_next_multiple_of(self, rhs: Self) -> Option<Self>
```

```

## fn is_multiple_of

```rust
pub const fn is_multiple_of(self, rhs: Self) -> bool
```

```

## fn is_power_of_two

```rust
pub const fn is_power_of_two(self) -> bool
```

```

## fn next_power_of_two

```rust
pub const fn next_power_of_two(self) -> Self
```

```

## fn checked_next_power_of_two

```rust
pub const fn checked_next_power_of_two(self) -> Option<Self>
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