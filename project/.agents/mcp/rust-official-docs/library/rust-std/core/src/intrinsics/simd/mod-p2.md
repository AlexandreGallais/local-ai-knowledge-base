---
title: "core::intrinsics::simd (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/simd/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics::simd (part 2 of 2)

## fn simd_reduce_add_unordered

```rust
pub unsafe fn simd_reduce_add_unordered<T, U>(x: T) -> U
```

Adds elements within a vector in arbitrary order. May also be re-associated with
unordered additions on the inputs/outputs.

`T` must be a vector of integers or floats.

`U` must be the element type of `T`.

## fn simd_reduce_mul_ordered

```rust
pub const unsafe fn simd_reduce_mul_ordered<T, U>(x: T, y: U) -> U
```

Multiplies elements within a vector from left to right.

`T` must be a vector of integers or floats.

`U` must be the element type of `T`.

Starting with the value `y`, multiply the elements of `x` and accumulate.

## fn simd_reduce_mul_unordered

```rust
pub unsafe fn simd_reduce_mul_unordered<T, U>(x: T) -> U
```

Multiplies elements within a vector in arbitrary order. May also be re-associated with
unordered additions on the inputs/outputs.

`T` must be a vector of integers or floats.

`U` must be the element type of `T`.

## fn simd_reduce_all

```rust
pub const unsafe fn simd_reduce_all<T>(x: T) -> bool
```

Checks if all mask values are true.

`T` must be a vector of integers.

# Safety
`x` must contain only `0` or `!0`.

## fn simd_reduce_any

```rust
pub const unsafe fn simd_reduce_any<T>(x: T) -> bool
```

Checks if any mask value is true.

`T` must be a vector of integers.

# Safety
`x` must contain only `0` or `!0`.

## fn simd_reduce_max

```rust
pub const unsafe fn simd_reduce_max<T, U>(x: T) -> U
```

Returns the maximum element of a vector.

`T` must be a vector of integers.

`U` must be the element type of `T`.

## fn simd_reduce_min

```rust
pub const unsafe fn simd_reduce_min<T, U>(x: T) -> U
```

Returns the minimum element of a vector.

`T` must be a vector of integers.

`U` must be the element type of `T`.

## fn simd_reduce_and

```rust
pub const unsafe fn simd_reduce_and<T, U>(x: T) -> U
```

Logical "and"s all elements together.

`T` must be a vector of integers.

`U` must be the element type of `T`.

## fn simd_reduce_or

```rust
pub const unsafe fn simd_reduce_or<T, U>(x: T) -> U
```

Logical "ors" all elements together.

`T` must be a vector of integers.

`U` must be the element type of `T`.

## fn simd_reduce_xor

```rust
pub const unsafe fn simd_reduce_xor<T, U>(x: T) -> U
```

Logical "exclusive ors" all elements together.

`T` must be a vector of integers.

`U` must be the element type of `T`.

## fn simd_bitmask

```rust
pub const unsafe fn simd_bitmask<T, U>(x: T) -> U
```

Truncates an integer vector to a bitmask.

`T` must be an integer vector.

`U` must be either the smallest unsigned integer with at least as many bits as the length
of `T`, or the smallest array of `u8` with at least as many bits as the length of `T`.

Each element is truncated to a single bit and packed into the result.

No matter whether the output is an array or an unsigned integer, it is treated as a single
contiguous list of bits. The bitmask is always packed on the least-significant side of the
output, and padded with 0s in the most-significant bits. The order of the bits depends on
endianness:

* On little endian, the least significant bit corresponds to the first vector element.
* On big endian, the least significant bit corresponds to the last vector element.

For example, `[!0, 0, !0, !0]` packs to
- `0b1101u8` or `[0b1101]` on little endian, and
- `0b1011u8` or `[0b1011]` on big endian.

To consider a larger example,
`[!0, 0, 0, 0, 0, 0, 0, 0, !0, !0, 0, 0, 0, 0, !0, 0]` packs to
- `0b0100001100000001u16` or `[0b00000001, 0b01000011]` on little endian, and
- `0b1000000011000010u16` or `[0b10000000, 0b11000010]` on big endian.

And finally, a non-power-of-2 example with multiple bytes:
`[!0, !0, 0, !0, 0, 0, !0, 0, !0, 0]` packs to
- `0b0101001011u16` or `[0b01001011, 0b01]` on little endian, and
- `0b1101001010u16` or `[0b11, 0b01001010]` on big endian.

# Safety
`x` must contain only `0` and `!0`.

## fn simd_select

```rust
pub const unsafe fn simd_select<M, T>(mask: M, if_true: T, if_false: T) -> T
```

Selects elements from a mask.

`T` must be a vector.

`M` must be an integer vector with the same length as `T` (but any element size).

For each element, if the corresponding value in `mask` is `!0`, select the element from
`if_true`.  If the corresponding value in `mask` is `0`, select the element from
`if_false`.

# Safety
`mask` must only contain `0` and `!0`.

## fn simd_select_bitmask

```rust
pub const unsafe fn simd_select_bitmask<M, T>(m: M, yes: T, no: T) -> T
```

Selects elements from a bitmask.

`M` must be an unsigned integer or array of `u8`, matching `simd_bitmask`.

`T` must be a vector.

For each element, if the bit in `mask` is `1`, select the element from
`if_true`.  If the corresponding bit in `mask` is `0`, select the element from
`if_false`.
The remaining bits of the mask are ignored.

The bitmask bit order matches `simd_bitmask`.

## fn simd_arith_offset

```rust
pub const unsafe fn simd_arith_offset<T, U>(ptr: T, offset: U) -> T
```

Calculates the offset from a pointer vector elementwise, potentially
wrapping.

`T` must be a vector of pointers.

`U` must be a vector of `isize` or `usize` with the same number of elements as `T`.

Operates as if by `<ptr>::wrapping_offset`.

## fn simd_cast_ptr

```rust
pub const unsafe fn simd_cast_ptr<T, U>(ptr: T) -> U
```

Casts a vector of pointers.

`T` and `U` must be vectors of pointers with the same number of elements.

## fn simd_expose_provenance

```rust
pub unsafe fn simd_expose_provenance<T, U>(ptr: T) -> U
```

Exposes a vector of pointers as a vector of addresses.

`T` must be a vector of pointers.

`U` must be a vector of `usize` with the same length as `T`.

## fn simd_with_exposed_provenance

```rust
pub const unsafe fn simd_with_exposed_provenance<T, U>(addr: T) -> U
```

Creates a vector of pointers from a vector of addresses.

`T` must be a vector of `usize`.

`U` must be a vector of pointers, with the same length as `T`.

## fn simd_bswap

```rust
pub const unsafe fn simd_bswap<T>(x: T) -> T
```

Swaps bytes of each element.

`T` must be a vector of integers.

## fn simd_bitreverse

```rust
pub const unsafe fn simd_bitreverse<T>(x: T) -> T
```

Reverses bits of each element.

`T` must be a vector of integers.

## fn simd_ctlz

```rust
pub const unsafe fn simd_ctlz<T>(x: T) -> T
```

Counts the leading zeros of each element.

`T` must be a vector of integers.

## fn simd_ctpop

```rust
pub const unsafe fn simd_ctpop<T>(x: T) -> T
```

Counts the number of ones in each element.

`T` must be a vector of integers.

## fn simd_cttz

```rust
pub const unsafe fn simd_cttz<T>(x: T) -> T
```

Counts the trailing zeros of each element.

`T` must be a vector of integers.

## fn simd_ceil

```rust
pub const unsafe fn simd_ceil<T>(x: T) -> T
```

Rounds up each element to the next highest integer-valued float.

`T` must be a vector of floats.

## fn simd_floor

```rust
pub const unsafe fn simd_floor<T>(x: T) -> T
```

Rounds down each element to the next lowest integer-valued float.

`T` must be a vector of floats.

## fn simd_round

```rust
pub const unsafe fn simd_round<T>(x: T) -> T
```

Rounds each element to the closest integer-valued float.
Ties are resolved by rounding away from 0.

`T` must be a vector of floats.

## fn simd_round_ties_even

```rust
pub const unsafe fn simd_round_ties_even<T>(x: T) -> T
```

Rounds each element to the closest integer-valued float.
Ties are resolved by rounding to the number with an even least significant digit

`T` must be a vector of floats.

## fn simd_trunc

```rust
pub const unsafe fn simd_trunc<T>(x: T) -> T
```

Returns the integer part of each element as an integer-valued float.
In other words, non-integer values are truncated towards zero.

`T` must be a vector of floats.

## fn simd_fsqrt

```rust
pub unsafe fn simd_fsqrt<T>(x: T) -> T
```

Takes the square root of each element.

`T` must be a vector of floats.

## fn simd_fma

```rust
pub const unsafe fn simd_fma<T>(x: T, y: T, z: T) -> T
```

Computes `(x*y) + z` for each element, but without any intermediate rounding.

`T` must be a vector of floats.

## fn simd_relaxed_fma

```rust
pub const unsafe fn simd_relaxed_fma<T>(x: T, y: T, z: T) -> T
```

Computes `(x*y) + z` for each element, non-deterministically executing either
a fused multiply-add or two operations with rounding of the intermediate result.

The operation is fused if the code generator determines that target instruction
set has support for a fused operation, and that the fused operation is more efficient
than the equivalent, separate pair of mul and add instructions. It is unspecified
whether or not a fused operation is selected, and that may depend on optimization
level and context, for example. It may even be the case that some SIMD lanes get fused
and others do not.

`T` must be a vector of floats.

## fn simd_fsin

```rust
pub unsafe fn simd_fsin<T>(a: T) -> T
```

`T` must be a vector of floats.

## fn simd_fcos

```rust
pub unsafe fn simd_fcos<T>(a: T) -> T
```

`T` must be a vector of floats.

## fn simd_fexp

```rust
pub unsafe fn simd_fexp<T>(a: T) -> T
```

`T` must be a vector of floats.

## fn simd_fexp2

```rust
pub unsafe fn simd_fexp2<T>(a: T) -> T
```

`T` must be a vector of floats.

## fn simd_flog10

```rust
pub unsafe fn simd_flog10<T>(a: T) -> T
```

`T` must be a vector of floats.

## fn simd_flog2

```rust
pub unsafe fn simd_flog2<T>(a: T) -> T
```

`T` must be a vector of floats.

## fn simd_flog

```rust
pub unsafe fn simd_flog<T>(a: T) -> T
```

`T` must be a vector of floats.
