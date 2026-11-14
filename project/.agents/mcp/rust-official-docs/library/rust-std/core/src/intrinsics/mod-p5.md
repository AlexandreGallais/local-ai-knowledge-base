---
title: "core::intrinsics (part 5 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics (part 5 of 7)

## fn fdiv_fast

```rust
pub unsafe fn fdiv_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float division that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn frem_fast

```rust
pub unsafe fn frem_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float remainder that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn float_to_int_unchecked

```rust
pub unsafe fn float_to_int_unchecked<Float: bounds::FloatPrimitive, Int: Copy>(value: Float) -> Int
```

Converts with LLVM’s fptoui/fptosi, which may return undef for values out of range
(<https://github.com/rust-lang/rust/issues/10184>)

Stabilized as `f32::to_int_unchecked` and `f64::to_int_unchecked`.

## fn fadd_algebraic

```rust
pub const fn fadd_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float addition that allows optimizations based on algebraic rules.

Stabilized as `f16::algebraic_add`, `f32::algebraic_add`, `f64::algebraic_add` and `f128::algebraic_add`.

## fn fsub_algebraic

```rust
pub const fn fsub_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float subtraction that allows optimizations based on algebraic rules.

Stabilized as `f16::algebraic_sub`, `f32::algebraic_sub`, `f64::algebraic_sub` and `f128::algebraic_sub`.

## fn fmul_algebraic

```rust
pub const fn fmul_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float multiplication that allows optimizations based on algebraic rules.

Stabilized as `f16::algebraic_mul`, `f32::algebraic_mul`, `f64::algebraic_mul` and `f128::algebraic_mul`.

## fn fdiv_algebraic

```rust
pub const fn fdiv_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float division that allows optimizations based on algebraic rules.

Stabilized as `f16::algebraic_div`, `f32::algebraic_div`, `f64::algebraic_div` and `f128::algebraic_div`.

## fn frem_algebraic

```rust
pub const fn frem_algebraic<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float remainder that allows optimizations based on algebraic rules.

Stabilized as `f16::algebraic_rem`, `f32::algebraic_rem`, `f64::algebraic_rem` and `f128::algebraic_rem`.

## fn integer_min

```rust
pub const fn integer_min<T: [const] bounds::IntegerPrimitive>(a: T, b: T) -> T
```

Integer `min`imum, signed or unsigned depending on `T`.

Allowed only on `uN`, `iN`, `usize`, and `isize`.
(Not on `bool` nor on `char`.)

Stabilized as `u16::min` and `i64::min` and similar.

## fn integer_max

```rust
pub const fn integer_max<T: [const] bounds::IntegerPrimitive>(a: T, b: T) -> T
```

Integer `max`imum, signed or unsigned depending on `T`.

Allowed only on `uN`, `iN`, `usize`, and `isize`.
(Not on `bool` nor on `char`.)

Stabilized as `u16::max` and `i64::max` and similar.

## fn ctpop

```rust
pub const fn ctpop<T: Copy>(x: T) -> u32
```

Returns the number of bits set in an integer type `T`

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `count_ones` method. For example,
`u32::count_ones`

## fn ctlz

```rust
pub const fn ctlz<T: Copy>(x: T) -> u32
```

Returns the number of leading unset bits (zeroes) in an integer type `T`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `leading_zeros` method. For example,
`u32::leading_zeros`

# Examples

```rust
#![feature(core_intrinsics)]

use std::intrinsics::ctlz;

let x = 0b0001_1100_u8;
let num_leading = ctlz(x);
assert_eq!(num_leading, 3);
```

An `x` with value `0` will return the bit width of `T`.

```rust
#![feature(core_intrinsics)]

use std::intrinsics::ctlz;

let x = 0u16;
let num_leading = ctlz(x);
assert_eq!(num_leading, 16);
```

## fn ctlz_nonzero

```rust
pub const unsafe fn ctlz_nonzero<T: Copy>(x: T) -> u32
```

Like `ctlz`, but extra-unsafe as it returns `undef` when
given an `x` with value `0`.

This intrinsic does not have a stable counterpart.

# Examples

```rust
#![feature(core_intrinsics)]

use std::intrinsics::ctlz_nonzero;

let x = 0b0001_1100_u8;
let num_leading = unsafe { ctlz_nonzero(x) };
assert_eq!(num_leading, 3);
```

## fn cttz

```rust
pub const fn cttz<T: Copy>(x: T) -> u32
```

Returns the number of trailing unset bits (zeroes) in an integer type `T`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `trailing_zeros` method. For example,
`u32::trailing_zeros`

# Examples

```rust
#![feature(core_intrinsics)]

use std::intrinsics::cttz;

let x = 0b0011_1000_u8;
let num_trailing = cttz(x);
assert_eq!(num_trailing, 3);
```

An `x` with value `0` will return the bit width of `T`:

```rust
#![feature(core_intrinsics)]

use std::intrinsics::cttz;

let x = 0u16;
let num_trailing = cttz(x);
assert_eq!(num_trailing, 16);
```

## fn cttz_nonzero

```rust
pub const unsafe fn cttz_nonzero<T: Copy>(x: T) -> u32
```

Like `cttz`, but extra-unsafe as it returns `undef` when
given an `x` with value `0`.

This intrinsic does not have a stable counterpart.

# Examples

```rust
#![feature(core_intrinsics)]

use std::intrinsics::cttz_nonzero;

let x = 0b0011_1000_u8;
let num_trailing = unsafe { cttz_nonzero(x) };
assert_eq!(num_trailing, 3);
```

## fn bswap

```rust
pub const fn bswap<T: Copy>(x: T) -> T
```

Reverses the bytes in an integer type `T`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `swap_bytes` method. For example,
`u32::swap_bytes`

## fn bitreverse

```rust
pub const fn bitreverse<T: Copy>(x: T) -> T
```

Reverses the bits in an integer type `T`.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `reverse_bits` method. For example,
`u32::reverse_bits`

## fn three_way_compare

```rust
pub const fn three_way_compare<T: Copy>(lhs: T, rhss: T) -> crate::cmp::Ordering
```

Does a three-way comparison between the two arguments,
which must be of character or integer (signed or unsigned) type.

This was originally added because it greatly simplified the MIR in `cmp`
implementations, and then LLVM 20 added a backend intrinsic for it too.

The stabilized version of this intrinsic is `Ord::cmp`.

## fn disjoint_bitor

```rust
pub const unsafe fn disjoint_bitor<T: [const] fallback::DisjointBitOr>(a: T, b: T) -> T
```

Combine two values which have no bits in common.

This allows the backend to implement it as `a + b` *or* `a | b`,
depending which is easier to implement on a specific target.

# Safety

Requires that `(a & b) == 0`, or equivalently that `(a | b) == (a + b)`.

Otherwise it's immediate UB.

## fn add_with_overflow

```rust
pub const fn add_with_overflow<T: Copy>(x: T, y: T) -> (T, bool)
```

Performs checked integer addition.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `overflowing_add` method. For example,
`u32::overflowing_add`

## fn sub_with_overflow

```rust
pub const fn sub_with_overflow<T: Copy>(x: T, y: T) -> (T, bool)
```

Performs checked integer subtraction

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `overflowing_sub` method. For example,
`u32::overflowing_sub`

## fn mul_with_overflow

```rust
pub const fn mul_with_overflow<T: Copy>(x: T, y: T) -> (T, bool)
```

Performs checked integer multiplication

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `overflowing_mul` method. For example,
`u32::overflowing_mul`

## fn exact_div

```rust
pub const unsafe fn exact_div<T: Copy>(x: T, y: T) -> T
```

Performs an exact division, resulting in undefined behavior where
`x % y != 0` or `y == 0` or `x == T::MIN && y == -1`

This intrinsic does not have a stable counterpart.

## fn unchecked_div

```rust
pub const unsafe fn unchecked_div<T: Copy>(x: T, y: T) -> T
```

Performs an unchecked division, resulting in undefined behavior
where `y == 0` or `x == T::MIN && y == -1`

Safe wrappers for this intrinsic are available on the integer
primitives via the `checked_div` method. For example,
`u32::checked_div`

## fn unchecked_rem

```rust
pub const unsafe fn unchecked_rem<T: Copy>(x: T, y: T) -> T
```

Returns the remainder of an unchecked division, resulting in
undefined behavior when `y == 0` or `x == T::MIN && y == -1`

Safe wrappers for this intrinsic are available on the integer
primitives via the `checked_rem` method. For example,
`u32::checked_rem`

## fn unchecked_shl

```rust
pub const unsafe fn unchecked_shl<T: Copy, U: Copy>(x: T, y: U) -> T
```

Performs an unchecked left shift, resulting in undefined behavior when
`y < 0` or `y >= N`, where N is the width of T in bits.

Safe wrappers for this intrinsic are available on the integer
primitives via the `checked_shl` method. For example,
`u32::checked_shl`

## fn unchecked_shr

```rust
pub const unsafe fn unchecked_shr<T: Copy, U: Copy>(x: T, y: U) -> T
```

Performs an unchecked right shift, resulting in undefined behavior when
`y < 0` or `y >= N`, where N is the width of T in bits.

Safe wrappers for this intrinsic are available on the integer
primitives via the `checked_shr` method. For example,
`u32::checked_shr`

## fn unchecked_add

```rust
pub const unsafe fn unchecked_add<T: Copy>(x: T, y: T) -> T
```

Returns the result of an unchecked addition, resulting in
undefined behavior when `x + y > T::MAX` or `x + y < T::MIN`.

The stable counterpart of this intrinsic is `unchecked_add` on the various
integer types, such as `u16::unchecked_add` and `i64::unchecked_add`.

## fn unchecked_sub

```rust
pub const unsafe fn unchecked_sub<T: Copy>(x: T, y: T) -> T
```

Returns the result of an unchecked subtraction, resulting in
undefined behavior when `x - y > T::MAX` or `x - y < T::MIN`.

The stable counterpart of this intrinsic is `unchecked_sub` on the various
integer types, such as `u16::unchecked_sub` and `i64::unchecked_sub`.

## fn unchecked_mul

```rust
pub const unsafe fn unchecked_mul<T: Copy>(x: T, y: T) -> T
```

Returns the result of an unchecked multiplication, resulting in
undefined behavior when `x * y > T::MAX` or `x * y < T::MIN`.

The stable counterpart of this intrinsic is `unchecked_mul` on the various
integer types, such as `u16::unchecked_mul` and `i64::unchecked_mul`.

## fn rotate_left

```rust
pub const fn rotate_left<T: [const] fallback::FunnelShift>(x: T, shift: u32) -> T
```

Performs rotate left.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `rotate_left` method. For example,
`u32::rotate_left`

## fn rotate_right

```rust
pub const fn rotate_right<T: [const] fallback::FunnelShift>(x: T, shift: u32) -> T
```

Performs rotate right.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `rotate_right` method. For example,
`u32::rotate_right`

## fn wrapping_add

```rust
pub const fn wrapping_add<T: Copy>(a: T, b: T) -> T
```

Wrapping (modular) addition. Computes `a + b`,
wrapping around at the boundary of the type.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `wrapping_add` method. For example,
`u32::wrapping_add`

## fn wrapping_sub

```rust
pub const fn wrapping_sub<T: Copy>(a: T, b: T) -> T
```

Wrapping (modular) subtraction. Computes `a - b`,
wrapping around at the boundary of the type.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `wrapping_sub` method. For example,
`u32::wrapping_sub`

## fn wrapping_mul

```rust
pub const fn wrapping_mul<T: Copy>(a: T, b: T) -> T
```

Wrapping (modular) multiplication. Computes `a *
b`, wrapping around at the boundary of the type.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `wrapping_mul` method. For example,
`u32::wrapping_mul`

## fn saturating_add

```rust
pub const fn saturating_add<T: Copy>(a: T, b: T) -> T
```

Computes `a + b`, saturating at numeric bounds.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

The stabilized versions of this intrinsic are available on the integer
primitives via the `saturating_add` method. For example,
`u32::saturating_add`
