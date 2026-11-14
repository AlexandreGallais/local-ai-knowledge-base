---
title: "core::num::uint_macros (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/uint_macros.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::uint_macros (part 2 of 2)

## fn carrying_mul

```rust
pub const fn carrying_mul(self, rhs: Self, carry: Self) -> (Self, Self)
```

```rust

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
```rust

If `carry` is zero, this is similar to `overflowing_mul`,
except that it gives the value of the overflow instead of just whether one happened:

```
# #![allow(unused_features)]
#![feature(const_unsigned_bigint_helpers)]
let r = u8::carrying_mul(7, 13, 0);
assert_eq!((r.0, r.1 != 0), u8::overflowing_mul(7, 13));
let r = u8::carrying_mul(13, 42, 0);
assert_eq!((r.0, r.1 != 0), u8::overflowing_mul(13, 42));
```rust

The value of the first field in the returned tuple matches what you'd get
by combining the `wrapping_mul` and
`wrapping_add` methods:

```
# #![allow(unused_features)]
#![feature(const_unsigned_bigint_helpers)]
assert_eq!(
    789_u16.carrying_mul(456, 123).0,
    789_u16.wrapping_mul(456).wrapping_add(123),
);
```rust

## fn carrying_mul_add

```rust
pub const fn carrying_mul_add(self, rhs: Self, carry: Self, add: Self) -> (Self, Self)
```

```rust

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
```rust

## fn overflowing_div

```rust
pub const fn overflowing_div(self, rhs: Self) -> (Self, bool)
```

```rust

## fn overflowing_div_euclid

```rust
pub const fn overflowing_div_euclid(self, rhs: Self) -> (Self, bool)
```

```rust

## fn overflowing_rem

```rust
pub const fn overflowing_rem(self, rhs: Self) -> (Self, bool)
```

```rust

## fn overflowing_rem_euclid

```rust
pub const fn overflowing_rem_euclid(self, rhs: Self) -> (Self, bool)
```

```rust

## fn overflowing_neg

```rust
pub const fn overflowing_neg(self) -> (Self, bool)
```

```rust

## fn overflowing_shl

```rust
pub const fn overflowing_shl(self, rhs: u32) -> (Self, bool)
```

```rust

## fn overflowing_shr

```rust
pub const fn overflowing_shr(self, rhs: u32) -> (Self, bool)
```

```rust

## fn overflowing_pow

```rust
pub const fn overflowing_pow(self, mut exp: u32) -> (Self, bool)
```

assert_eq!(3u8.overflowing_pow(6), (217, true));
```rust

## fn pow

```rust
pub const fn pow(self, exp: u32) -> Self
```

```rust

## fn isqrt

```rust
pub const fn isqrt(self) -> Self
```

```rust

## fn div_euclid

```rust
pub const fn div_euclid(self, rhs: Self) -> Self
```

```rust

## fn rem_euclid

```rust
pub const fn rem_euclid(self, rhs: Self) -> Self
```

```rust

## fn div_ceil

```rust
pub const fn div_ceil(self, rhs: Self) -> Self
```

```rust

## fn next_multiple_of

```rust
pub const fn next_multiple_of(self, rhs: Self) -> Self
```

```rust

## fn checked_next_multiple_of

```rust
pub const fn checked_next_multiple_of(self, rhs: Self) -> Option<Self>
```

```rust

## fn is_multiple_of

```rust
pub const fn is_multiple_of(self, rhs: Self) -> bool
```

```rust

## fn is_power_of_two

```rust
pub const fn is_power_of_two(self) -> bool
```

```rust

## fn next_power_of_two

```rust
pub const fn next_power_of_two(self) -> Self
```

```rust

## fn checked_next_power_of_two

```rust
pub const fn checked_next_power_of_two(self) -> Option<Self>
```

```rust

## fn to_be_bytes

```rust
pub const fn to_be_bytes(self) -> [u8; size_of::<Self>()]
```

```rust

## fn to_le_bytes

```rust
pub const fn to_le_bytes(self) -> [u8; size_of::<Self>()]
```

```rust

## fn from_be_bytes

```rust
pub const fn from_be_bytes(bytes: [u8; size_of::<Self>()]) -> Self
```

}
```rust

## fn from_le_bytes

```rust
pub const fn from_le_bytes(bytes: [u8; size_of::<Self>()]) -> Self
```

}
```rust

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
