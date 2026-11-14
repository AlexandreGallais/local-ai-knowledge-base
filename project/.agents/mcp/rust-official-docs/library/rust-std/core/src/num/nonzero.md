---
title: "core::num::nonzero"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/num/nonzero.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::num::nonzero

Definitions of integer that is known not to equal zero.

## struct NonZero

```rust
pub struct NonZero<T: ZeroablePrimitive>(T::NonZeroInner)
```

A value that is known not to equal zero.

This enables some memory layout optimization.
For example, `Option<NonZero<u32>>` is the same size as `u32`:

```rust
use core::num::NonZero;

assert_eq!(size_of::<Option<NonZero<u32>>>(), size_of::<u32>());
```

# Layout

`NonZero<T>` is guaranteed to have the same layout and bit validity as `T`
with the exception that the all-zero bit pattern is invalid.
`Option<NonZero<T>>` is guaranteed to be ABI-compatible with `T`, including in
FFI.

Thanks to the [null pointer optimization], `NonZero<T>` and
`Option<NonZero<T>>` are guaranteed to have the same size and alignment:

```rust
use std::num::NonZero;

assert_eq!(size_of::<NonZero<u32>>(), size_of::<Option<NonZero<u32>>>());
assert_eq!(align_of::<NonZero<u32>>(), align_of::<Option<NonZero<u32>>>());
```

# Note on generic usage

`NonZero<T>` can only be used with some standard library primitive types
(such as `u8`, `i32`, and etc.). The type parameter `T` must implement the
internal trait `ZeroablePrimitive`, which is currently permanently unstable
and cannot be implemented by users. Therefore, you cannot use `NonZero<T>`
with your own types, nor can you implement traits for all `NonZero<T>`,
only for concrete types.

## NonZero::new

```rust
pub const fn new(n: T) -> Option<Self>
```

Creates a non-zero if the given value is not zero.

## NonZero::new_unchecked

```rust
pub const unsafe fn new_unchecked(n: T) -> Self
```

Creates a non-zero without checking whether the value is non-zero.
This results in undefined behavior if the value is zero.

# Safety

The value must not be zero.

## NonZero::get

```rust
pub const fn get(self) -> T
```

Returns the contained value as a primitive type.

## NonZero::BITS

```rust
pub const BITS: u32 = <$Int>::BITS
```

```rust

## NonZero::leading_zeros

```rust
pub const fn leading_zeros(self) -> u32
```

assert_eq!(n.leading_zeros(), 0);
# Some(())
# }
```rust

## NonZero::trailing_zeros

```rust
pub const fn trailing_zeros(self) -> u32
```

assert_eq!(n.trailing_zeros(), 3);
# Some(())
# }
```rust

## NonZero::isolate_highest_one

```rust
pub const fn isolate_highest_one(self) -> Self
```

assert_eq!(a.isolate_highest_one(), b);
# Some(())
# }
```rust

## NonZero::isolate_lowest_one

```rust
pub const fn isolate_lowest_one(self) -> Self
```

assert_eq!(a.isolate_lowest_one(), b);
# Some(())
# }
```rust

## NonZero::highest_one

```rust
pub const fn highest_one(self) -> u32
```

# Some(())
# }
```rust

## NonZero::lowest_one

```rust
pub const fn lowest_one(self) -> u32
```

# Some(())
# }
```rust

## NonZero::count_ones

```rust
pub const fn count_ones(self) -> NonZero<u32>
```

assert_eq!(a.count_ones(), NonZero::new(1)?);
assert_eq!(b.count_ones(), NonZero::new(3)?);
# Some(())
# }
```rust

## NonZero::checked_mul

```rust
pub const fn checked_mul(self, other: Self) -> Option<Self>
```

assert_eq!(Some(four), two.checked_mul(two));
assert_eq!(None, max.checked_mul(two));
# Some(())
# }
```rust

## NonZero::saturating_mul

```rust
pub const fn saturating_mul(self, other: Self) -> Self
```

assert_eq!(four, two.saturating_mul(two));
assert_eq!(max, four.saturating_mul(max));
# Some(())
# }
```rust

## NonZero::checked_pow

```rust
pub const fn checked_pow(self, other: u32) -> Option<Self>
```

assert_eq!(Some(twenty_seven), three.checked_pow(3));
assert_eq!(None, half_max.checked_pow(3));
# Some(())
# }
```rust

## NonZero::saturating_pow

```rust
pub const fn saturating_pow(self, other: u32) -> Self
```

assert_eq!(twenty_seven, three.saturating_pow(3));
assert_eq!(max, max.saturating_pow(3));
# Some(())
# }
```rust

## NonZero::from_str_radix

```rust
pub const fn from_str_radix(src: &str, radix: u32) -> Result<Self, ParseIntError>
```

```rust

## const MIN

```rust
pub const MIN: Self = Self::new(1).unwrap()
```

```rust

## const MAX

```rust
pub const MAX: Self = Self::new(<$Int>::MAX).unwrap()
```

```rust

## fn checked_add

```rust
pub const fn checked_add(self, other: $Int) -> Option<Self>
```

assert_eq!(Some(two), one.checked_add(1));
assert_eq!(None, max.checked_add(1));
# Some(())
# }
```rust

## fn saturating_add

```rust
pub const fn saturating_add(self, other: $Int) -> Self
```

assert_eq!(two, one.saturating_add(1));
assert_eq!(max, max.saturating_add(1));
# Some(())
# }
```rust

## fn div_ceil

```rust
pub const fn div_ceil(self, rhs: Self) -> Self
```

assert_eq!(three.div_ceil(two), two);
```rust

## fn checked_next_power_of_two

```rust
pub const fn checked_next_power_of_two(self) -> Option<Self>
```

assert_eq!(Some(two), two.checked_next_power_of_two() );
assert_eq!(Some(four), three.checked_next_power_of_two() );
assert_eq!(None, max.checked_next_power_of_two() );
# Some(())
# }
```rust

## fn ilog2

```rust
pub const fn ilog2(self) -> u32
```

# Some(())
# }
```rust

## fn ilog10

```rust
pub const fn ilog10(self) -> u32
```

# Some(())
# }
```rust

## fn midpoint

```rust
pub const fn midpoint(self, rhs: Self) -> Self
```

assert_eq!(one.midpoint(four), two);
assert_eq!(four.midpoint(one), two);
# Some(())
# }
```rust

## fn is_power_of_two

```rust
pub const fn is_power_of_two(self) -> bool
```

assert!(!ten.is_power_of_two());
# Some(())
# }
```rust

## fn isqrt

```rust
pub const fn isqrt(self) -> Self
```

assert_eq!(ten.isqrt(), three);
# Some(())
# }
```rust

## fn cast_signed

```rust
pub const fn cast_signed(self) -> NonZero<$Sint>
```

```rust

## fn bit_width

```rust
pub const fn bit_width(self) -> NonZero<u32>
```

# Some(())
# }
```rust

## const MIN

```rust
pub const MIN: Self = Self::new(<$Int>::MIN).unwrap()
```

```rust

## const MAX

```rust
pub const MAX: Self = Self::new(<$Int>::MAX).unwrap()
```

```rust

## fn abs

```rust
pub const fn abs(self) -> Self
```

assert_eq!(pos, pos.abs());
assert_eq!(pos, neg.abs());
# Some(())
# }
```rust

## fn checked_abs

```rust
pub const fn checked_abs(self) -> Option<Self>
```

assert_eq!(Some(pos), neg.checked_abs());
assert_eq!(None, min.checked_abs());
# Some(())
# }
```rust

## fn overflowing_abs

```rust
pub const fn overflowing_abs(self) -> (Self, bool)
```

assert_eq!((pos, false), pos.overflowing_abs());
assert_eq!((pos, false), neg.overflowing_abs());
assert_eq!((min, true), min.overflowing_abs());
# Some(())
# }
```rust

## fn saturating_abs

```rust
pub const fn saturating_abs(self) -> Self
```

assert_eq!(pos, pos.saturating_abs());
assert_eq!(pos, neg.saturating_abs());
assert_eq!(max, min.saturating_abs());
assert_eq!(max, min_plus.saturating_abs());
# Some(())
# }
```rust

## fn wrapping_abs

```rust
pub const fn wrapping_abs(self) -> Self
```

assert_eq!(pos, pos.wrapping_abs());
assert_eq!(pos, neg.wrapping_abs());
assert_eq!(min, min.wrapping_abs());
assert_eq!(max, (-max).wrapping_abs());
# Some(())
# }
```rust

## fn unsigned_abs

```rust
pub const fn unsigned_abs(self) -> NonZero<$Uint>
```

assert_eq!(u_pos, i_pos.unsigned_abs());
assert_eq!(u_pos, i_neg.unsigned_abs());
assert_eq!(u_max, i_min.unsigned_abs());
# Some(())
# }
```rust

## fn is_positive

```rust
pub const fn is_positive(self) -> bool
```

assert!(pos_five.is_positive());
assert!(!neg_five.is_positive());
# Some(())
# }
```rust

## fn is_negative

```rust
pub const fn is_negative(self) -> bool
```

assert!(neg_five.is_negative());
assert!(!pos_five.is_negative());
# Some(())
# }
```rust

## fn checked_neg

```rust
pub const fn checked_neg(self) -> Option<Self>
```

assert_eq!(pos_five.checked_neg(), Some(neg_five));
assert_eq!(min.checked_neg(), None);
# Some(())
# }
```rust

## fn overflowing_neg

```rust
pub const fn overflowing_neg(self) -> (Self, bool)
```

assert_eq!(pos_five.overflowing_neg(), (neg_five, false));
assert_eq!(min.overflowing_neg(), (min, true));
# Some(())
# }
```rust

## fn saturating_neg

```rust
pub const fn saturating_neg(self) -> Self
```

assert_eq!(pos_five.saturating_neg(), neg_five);
assert_eq!(min.saturating_neg(), max);
assert_eq!(max.saturating_neg(), min_plus_one);
# Some(())
# }
```rust

## fn wrapping_neg

```rust
pub const fn wrapping_neg(self) -> Self
```

assert_eq!(pos_five.wrapping_neg(), neg_five);
assert_eq!(min.wrapping_neg(), min);
# Some(())
# }
```rust

## fn cast_unsigned

```rust
pub const fn cast_unsigned(self) -> NonZero<$Uint>
```

```rust
