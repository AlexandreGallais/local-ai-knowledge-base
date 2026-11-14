# core::num::saturating

Definitions of `Saturating<T>`.

## struct Saturating

```rust
pub struct Saturating<T>(#[stable(feature = "saturating_int_impl", since = "1.74.0")] pub T)
```

Provides intentionally-saturating arithmetic on `T`.

Operations like `+` on `u32` values are intended to never overflow,
and in some debug configurations overflow is detected and results
in a panic. While most arithmetic falls into this category, some
code explicitly expects and relies upon saturating arithmetic.

Saturating arithmetic can be achieved either through methods like
`saturating_add`, or through the `Saturating<T>` type, which says that
all standard arithmetic operations on the underlying value are
intended to have saturating semantics.

The underlying value can be retrieved through the `.0` index of the
`Saturating` tuple.

# Examples

```
use std::num::Saturating;

let max = Saturating(u32::MAX);
let one = Saturating(1u32);

assert_eq!(u32::MAX, (max + one).0);
```

## Saturating::MIN

```rust
pub const MIN: Self = Self(<$t>::MIN)
```

```

## Saturating::MAX

```rust
pub const MAX: Self = Self(<$t>::MAX)
```

```

## Saturating::BITS

```rust
pub const BITS: u32 = <$t>::BITS
```

```

## Saturating::count_ones

```rust
pub const fn count_ones(self) -> u32
```

assert_eq!(n.count_ones(), 3);
```

## Saturating::count_zeros

```rust
pub const fn count_zeros(self) -> u32
```

```

## Saturating::trailing_zeros

```rust
pub const fn trailing_zeros(self) -> u32
```

assert_eq!(n.trailing_zeros(), 3);
```

## Saturating::rotate_left

```rust
pub const fn rotate_left(self, n: u32) -> Self
```

Shifts the bits to the left by a specified amount, `n`,
saturating the truncated bits to the end of the resulting
integer.

Please note this isn't the same operation as the `<<` shifting
operator!

# Examples

```
use std::num::Saturating;

let n: Saturating<i64> = Saturating(0x0123456789ABCDEF);
let m: Saturating<i64> = Saturating(-0x76543210FEDCBA99);

assert_eq!(n.rotate_left(32), m);
```

## Saturating::rotate_right

```rust
pub const fn rotate_right(self, n: u32) -> Self
```

Shifts the bits to the right by a specified amount, `n`,
saturating the truncated bits to the beginning of the resulting
integer.

Please note this isn't the same operation as the `>>` shifting
operator!

# Examples

```
use std::num::Saturating;

let n: Saturating<i64> = Saturating(0x0123456789ABCDEF);
let m: Saturating<i64> = Saturating(-0xFEDCBA987654322);

assert_eq!(n.rotate_right(4), m);
```

## Saturating::swap_bytes

```rust
pub const fn swap_bytes(self) -> Self
```

Reverses the byte order of the integer.

# Examples

```
use std::num::Saturating;

let n: Saturating<i16> = Saturating(0b0000000_01010101);
assert_eq!(n, Saturating(85));

let m = n.swap_bytes();

assert_eq!(m, Saturating(0b01010101_00000000));
assert_eq!(m, Saturating(21760));
```

## Saturating::reverse_bits

```rust
pub const fn reverse_bits(self) -> Self
```

Reverses the bit pattern of the integer.

# Examples

Please note that this example is shared among integer types, which is why `i16`
is used.

```
use std::num::Saturating;

let n = Saturating(0b0000000_01010101i16);
assert_eq!(n, Saturating(85));

let m = n.reverse_bits();

assert_eq!(m.0 as u16, 0b10101010_00000000);
assert_eq!(m, Saturating(-22016));
```

## Saturating::from_be

```rust
pub const fn from_be(x: Self) -> Self
```

}
```

## Saturating::from_le

```rust
pub const fn from_le(x: Self) -> Self
```

}
```

## Saturating::to_be

```rust
pub const fn to_be(self) -> Self
```

if cfg!(target_endian = "big") {
    assert_eq!(n.to_be(), n)
} else {
    assert_eq!(n.to_be(), n.swap_bytes())
}
```

## Saturating::to_le

```rust
pub const fn to_le(self) -> Self
```

if cfg!(target_endian = "little") {
    assert_eq!(n.to_le(), n)
} else {
    assert_eq!(n.to_le(), n.swap_bytes())
}
```

## Saturating::pow

```rust
pub const fn pow(self, exp: u32) -> Self
```

```

Results that are too large are saturated:

```
use std::num::Saturating;

assert_eq!(Saturating(3i8).pow(5), Saturating(127));
assert_eq!(Saturating(3i8).pow(6), Saturating(127));
```

## Saturating::leading_zeros

```rust
pub const fn leading_zeros(self) -> u32
```

assert_eq!(n.leading_zeros(), 3);
```

## Saturating::abs

```rust
pub const fn abs(self) -> Saturating<$t>
```

```

## Saturating::signum

```rust
pub const fn signum(self) -> Saturating<$t>
```

```

## Saturating::is_positive

```rust
pub const fn is_positive(self) -> bool
```

```

## Saturating::is_negative

```rust
pub const fn is_negative(self) -> bool
```

```

## Saturating::leading_zeros

```rust
pub const fn leading_zeros(self) -> u32
```

assert_eq!(n.leading_zeros(), 2);
```

## Saturating::is_power_of_two

```rust
pub const fn is_power_of_two(self) -> bool
```

```