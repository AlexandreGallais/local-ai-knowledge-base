---
title: "core::intrinsics (part 4 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics (part 4 of 7)

## fn ptr_mask

```rust
pub fn ptr_mask<T>(ptr: *const T, mask: usize) -> *const T
```

Masks out bits of the pointer according to a mask.

Note that, unlike most intrinsics, this is safe to call;
it does not require an `unsafe` block.
Therefore, implementations must not require the user to uphold
any safety invariants.

Consider using `pointer::mask` instead.

## fn volatile_copy_nonoverlapping_memory

```rust
pub unsafe fn volatile_copy_nonoverlapping_memory<T>(dst: *mut T, src: *const T, count: usize)
```

Equivalent to the appropriate `llvm.memcpy.p0i8.0i8.*` intrinsic, with
a size of `count` * `size_of::<T>()` and an alignment of `align_of::<T>()`.

This intrinsic does not have a stable counterpart.
# Safety

The safety requirements are consistent with `copy_nonoverlapping`
while the read and write behaviors are volatile,
which means it will not be optimized out unless `_count` or `size_of::<T>()` is equal to zero.

## fn volatile_copy_memory

```rust
pub unsafe fn volatile_copy_memory<T>(dst: *mut T, src: *const T, count: usize)
```

Equivalent to the appropriate `llvm.memmove.p0i8.0i8.*` intrinsic, with
a size of `count * size_of::<T>()` and an alignment of `align_of::<T>()`.

The volatile parameter is set to `true`, so it will not be optimized out
unless size is equal to zero.

This intrinsic does not have a stable counterpart.

## fn volatile_set_memory

```rust
pub const unsafe fn volatile_set_memory<T>(dst: *mut T, val: u8, count: usize)
```

Equivalent to the appropriate `llvm.memset.p0i8.*` intrinsic, with a
size of `count * size_of::<T>()` and an alignment of `align_of::<T>()`.

This intrinsic does not have a stable counterpart.
# Safety

The safety requirements are consistent with `write_bytes` while the write behavior is volatile,
which means it will not be optimized out unless `_count` or `size_of::<T>()` is equal to zero.

## fn volatile_load

```rust
pub const unsafe fn volatile_load<T>(src: *const T) -> T
```

Performs a volatile load from the `src` pointer.

The stabilized version of this intrinsic is `core::ptr::read_volatile`.

## fn volatile_store

```rust
pub const unsafe fn volatile_store<T>(dst: *mut T, val: T)
```

Performs a volatile store to the `dst` pointer.

The stabilized version of this intrinsic is `core::ptr::write_volatile`.

## fn unaligned_volatile_load

```rust
pub unsafe fn unaligned_volatile_load<T>(src: *const T) -> T
```

Performs a volatile load from the `src` pointer
The pointer is not required to be aligned.

This intrinsic does not have a stable counterpart.

## fn unaligned_volatile_store

```rust
pub unsafe fn unaligned_volatile_store<T>(dst: *mut T, val: T)
```

Performs a volatile store to the `dst` pointer.
The pointer is not required to be aligned.

This intrinsic does not have a stable counterpart.

## fn sqrtf16

```rust
pub fn sqrtf16(x: f16) -> f16
```

Returns the square root of an `f16`

The stabilized version of this intrinsic is
`f16::sqrt`

## fn sqrtf32

```rust
pub fn sqrtf32(x: f32) -> f32
```

Returns the square root of an `f32`

The stabilized version of this intrinsic is
`f32::sqrt`

## fn sqrtf64

```rust
pub fn sqrtf64(x: f64) -> f64
```

Returns the square root of an `f64`

The stabilized version of this intrinsic is
`f64::sqrt`

## fn sqrtf128

```rust
pub fn sqrtf128(x: f128) -> f128
```

Returns the square root of an `f128`

The stabilized version of this intrinsic is
`f128::sqrt`

## fn powif16

```rust
pub fn powif16(a: f16, x: i32) -> f16
```

Raises an `f16` to an integer power.

The stabilized version of this intrinsic is
`f16::powi`

## fn powif32

```rust
pub fn powif32(a: f32, x: i32) -> f32
```

Raises an `f32` to an integer power.

The stabilized version of this intrinsic is
`f32::powi`

## fn powif64

```rust
pub fn powif64(a: f64, x: i32) -> f64
```

Raises an `f64` to an integer power.

The stabilized version of this intrinsic is
`f64::powi`

## fn powif128

```rust
pub fn powif128(a: f128, x: i32) -> f128
```

Raises an `f128` to an integer power.

The stabilized version of this intrinsic is
`f128::powi`

## fn sin

```rust
pub fn sin<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the sine of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`sin` method. For example, `f32::sin`.

## fn cos

```rust
pub fn cos<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the cosine of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`cos` method. For example, `f32::cos`.

## fn powf16

```rust
pub fn powf16(a: f16, x: f16) -> f16
```

Raises an `f16` to an `f16` power.

The stabilized version of this intrinsic is
`f16::powf`

## fn powf32

```rust
pub fn powf32(a: f32, x: f32) -> f32
```

Raises an `f32` to an `f32` power.

The stabilized version of this intrinsic is
`f32::powf`

## fn powf64

```rust
pub fn powf64(a: f64, x: f64) -> f64
```

Raises an `f64` to an `f64` power.

The stabilized version of this intrinsic is
`f64::powf`

## fn powf128

```rust
pub fn powf128(a: f128, x: f128) -> f128
```

Raises an `f128` to an `f128` power.

The stabilized version of this intrinsic is
`f128::powf`

## fn exp

```rust
pub fn exp<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the exponential of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`exp` method. For example, `f32::exp`.

## fn exp2

```rust
pub fn exp2<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns 2 raised to the power of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`exp2` method. For example, `f32::exp2`.

## fn log

```rust
pub fn log<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the natural logarithm of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`ln` method. For example, `f32::ln`.

## fn log10

```rust
pub fn log10<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the base 10 logarithm of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`log10` method. For example, `f32::log10`.

## fn log2

```rust
pub fn log2<T: bounds::FloatPrimitive>(x: T) -> T
```

Returns the base 2 logarithm of a floating-point value.

The stabilized versions of this intrinsic are available on the float primitives via the
`log2` method. For example, `f32::log2`.

## fn fmaf16

```rust
pub const fn fmaf16(a: f16, b: f16, c: f16) -> f16
```

Returns `a * b + c` without rounding the intermediate result for `f16` values.

The stabilized version of this intrinsic is
`f16::mul_add`

## fn fmaf32

```rust
pub const fn fmaf32(a: f32, b: f32, c: f32) -> f32
```

Returns `a * b + c` without rounding the intermediate result for `f32` values.

The stabilized version of this intrinsic is
`f32::mul_add`

## fn fmaf64

```rust
pub const fn fmaf64(a: f64, b: f64, c: f64) -> f64
```

Returns `a * b + c` without rounding the intermediate result for `f64` values.

The stabilized version of this intrinsic is
`f64::mul_add`

## fn fmaf128

```rust
pub const fn fmaf128(a: f128, b: f128, c: f128) -> f128
```

Returns `a * b + c` without rounding the intermediate result for `f128` values.

The stabilized version of this intrinsic is
`f128::mul_add`

## fn fmuladdf16

```rust
pub const fn fmuladdf16(a: f16, b: f16, c: f16) -> f16
```

Returns `a * b + c` for `f16` values, non-deterministically executing
either a fused multiply-add or two operations with rounding of the
intermediate result.

The operation is fused if the code generator determines that target
instruction set has support for a fused operation, and that the fused
operation is more efficient than the equivalent, separate pair of mul
and add instructions. It is unspecified whether or not a fused operation
is selected, and that may depend on optimization level and context, for
example.

## fn fmuladdf32

```rust
pub const fn fmuladdf32(a: f32, b: f32, c: f32) -> f32
```

Returns `a * b + c` for `f32` values, non-deterministically executing
either a fused multiply-add or two operations with rounding of the
intermediate result.

The operation is fused if the code generator determines that target
instruction set has support for a fused operation, and that the fused
operation is more efficient than the equivalent, separate pair of mul
and add instructions. It is unspecified whether or not a fused operation
is selected, and that may depend on optimization level and context, for
example.

## fn fmuladdf64

```rust
pub const fn fmuladdf64(a: f64, b: f64, c: f64) -> f64
```

Returns `a * b + c` for `f64` values, non-deterministically executing
either a fused multiply-add or two operations with rounding of the
intermediate result.

The operation is fused if the code generator determines that target
instruction set has support for a fused operation, and that the fused
operation is more efficient than the equivalent, separate pair of mul
and add instructions. It is unspecified whether or not a fused operation
is selected, and that may depend on optimization level and context, for
example.

## fn fmuladdf128

```rust
pub const fn fmuladdf128(a: f128, b: f128, c: f128) -> f128
```

Returns `a * b + c` for `f128` values, non-deterministically executing
either a fused multiply-add or two operations with rounding of the
intermediate result.

The operation is fused if the code generator determines that target
instruction set has support for a fused operation, and that the fused
operation is more efficient than the equivalent, separate pair of mul
and add instructions. It is unspecified whether or not a fused operation
is selected, and that may depend on optimization level and context, for
example.

## fn floorf16

```rust
pub const fn floorf16(x: f16) -> f16
```

Returns the largest integer less than or equal to an `f16`.

The stabilized version of this intrinsic is
`f16::floor`

## fn floorf32

```rust
pub const fn floorf32(x: f32) -> f32
```

Returns the largest integer less than or equal to an `f32`.

The stabilized version of this intrinsic is
`f32::floor`

## fn floorf64

```rust
pub const fn floorf64(x: f64) -> f64
```

Returns the largest integer less than or equal to an `f64`.

The stabilized version of this intrinsic is
`f64::floor`

## fn floorf128

```rust
pub const fn floorf128(x: f128) -> f128
```

Returns the largest integer less than or equal to an `f128`.

The stabilized version of this intrinsic is
`f128::floor`

## fn ceilf16

```rust
pub const fn ceilf16(x: f16) -> f16
```

Returns the smallest integer greater than or equal to an `f16`.

The stabilized version of this intrinsic is
`f16::ceil`

## fn ceilf32

```rust
pub const fn ceilf32(x: f32) -> f32
```

Returns the smallest integer greater than or equal to an `f32`.

The stabilized version of this intrinsic is
`f32::ceil`

## fn ceilf64

```rust
pub const fn ceilf64(x: f64) -> f64
```

Returns the smallest integer greater than or equal to an `f64`.

The stabilized version of this intrinsic is
`f64::ceil`

## fn ceilf128

```rust
pub const fn ceilf128(x: f128) -> f128
```

Returns the smallest integer greater than or equal to an `f128`.

The stabilized version of this intrinsic is
`f128::ceil`

## fn truncf16

```rust
pub const fn truncf16(x: f16) -> f16
```

Returns the integer part of an `f16`.

The stabilized version of this intrinsic is
`f16::trunc`

## fn truncf32

```rust
pub const fn truncf32(x: f32) -> f32
```

Returns the integer part of an `f32`.

The stabilized version of this intrinsic is
`f32::trunc`

## fn truncf64

```rust
pub const fn truncf64(x: f64) -> f64
```

Returns the integer part of an `f64`.

The stabilized version of this intrinsic is
`f64::trunc`

## fn truncf128

```rust
pub const fn truncf128(x: f128) -> f128
```

Returns the integer part of an `f128`.

The stabilized version of this intrinsic is
`f128::trunc`

## fn round_ties_even_f16

```rust
pub const fn round_ties_even_f16(x: f16) -> f16
```

Returns the nearest integer to an `f16`. Rounds half-way cases to the number with an even
least significant digit.

The stabilized version of this intrinsic is
`f16::round_ties_even`

## fn round_ties_even_f32

```rust
pub const fn round_ties_even_f32(x: f32) -> f32
```

Returns the nearest integer to an `f32`. Rounds half-way cases to the number with an even
least significant digit.

The stabilized version of this intrinsic is
`f32::round_ties_even`

## fn round_ties_even_f64

```rust
pub const fn round_ties_even_f64(x: f64) -> f64
```

Returns the nearest integer to an `f64`. Rounds half-way cases to the number with an even
least significant digit.

The stabilized version of this intrinsic is
`f64::round_ties_even`

## fn round_ties_even_f128

```rust
pub const fn round_ties_even_f128(x: f128) -> f128
```

Returns the nearest integer to an `f128`. Rounds half-way cases to the number with an even
least significant digit.

The stabilized version of this intrinsic is
`f128::round_ties_even`

## fn roundf16

```rust
pub const fn roundf16(x: f16) -> f16
```

Returns the nearest integer to an `f16`. Rounds half-way cases away from zero.

The stabilized version of this intrinsic is
`f16::round`

## fn roundf32

```rust
pub const fn roundf32(x: f32) -> f32
```

Returns the nearest integer to an `f32`. Rounds half-way cases away from zero.

The stabilized version of this intrinsic is
`f32::round`

## fn roundf64

```rust
pub const fn roundf64(x: f64) -> f64
```

Returns the nearest integer to an `f64`. Rounds half-way cases away from zero.

The stabilized version of this intrinsic is
`f64::round`

## fn roundf128

```rust
pub const fn roundf128(x: f128) -> f128
```

Returns the nearest integer to an `f128`. Rounds half-way cases away from zero.

The stabilized version of this intrinsic is
`f128::round`

## fn fadd_fast

```rust
pub unsafe fn fadd_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float addition that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn fsub_fast

```rust
pub unsafe fn fsub_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float subtraction that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.

## fn fmul_fast

```rust
pub unsafe fn fmul_fast<T: bounds::FloatPrimitive>(a: T, b: T) -> T
```

Float multiplication that allows optimizations based on algebraic rules.
Requires that inputs and output of the operation are finite, causing UB otherwise.

This intrinsic does not have a stable counterpart.
