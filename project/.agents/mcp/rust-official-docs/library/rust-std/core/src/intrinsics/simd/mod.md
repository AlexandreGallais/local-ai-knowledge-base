---
title: "core::intrinsics::simd (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/intrinsics/simd/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::intrinsics::simd

SIMD compiler intrinsics.

In this module, a "vector" is any `repr(simd)` type.

## fn simd_insert

```rust
pub const unsafe fn simd_insert<T, U>(x: T, idx: u32, val: U) -> T
```

Inserts an element into a vector, returning the updated vector.

`T` must be a vector with element type `U`, and `idx` must be `const`.

# Safety

`idx` must be in-bounds of the vector.

## fn simd_extract

```rust
pub const unsafe fn simd_extract<T, U>(x: T, idx: u32) -> U
```

Extracts an element from a vector.

`T` must be a vector with element type `U`, and `idx` must be `const`.

# Safety

`idx` must be const and in-bounds of the vector.

## fn simd_insert_dyn

```rust
pub const unsafe fn simd_insert_dyn<T, U>(x: T, idx: u32, val: U) -> T
```

Inserts an element into a vector, returning the updated vector.

`T` must be a vector with element type `U`.

If the index is `const`, `simd_insert` may emit better assembly.

# Safety

`idx` must be in-bounds of the vector.

## fn simd_extract_dyn

```rust
pub const unsafe fn simd_extract_dyn<T, U>(x: T, idx: u32) -> U
```

Extracts an element from a vector.

`T` must be a vector with element type `U`.

If the index is `const`, `simd_extract` may emit better assembly.

# Safety

`idx` must be in-bounds of the vector.

## fn simd_splat

```rust
pub const unsafe fn simd_splat<T, U>(value: U) -> T
```

Creates a vector where every lane has the provided value.

`T` must be a vector with element type `U`.

## fn simd_add

```rust
pub const unsafe fn simd_add<T>(x: T, y: T) -> T
```

Adds two simd vectors elementwise.

`T` must be a vector of integers or floats.
For integers, wrapping arithmetic is used.

## fn simd_sub

```rust
pub const unsafe fn simd_sub<T>(lhs: T, rhs: T) -> T
```

Subtracts `rhs` from `lhs` elementwise.

`T` must be a vector of integers or floats.
For integers, wrapping arithmetic is used.

## fn simd_mul

```rust
pub const unsafe fn simd_mul<T>(x: T, y: T) -> T
```

Multiplies two simd vectors elementwise.

`T` must be a vector of integers or floats.
For integers, wrapping arithmetic is used.

## fn simd_div

```rust
pub const unsafe fn simd_div<T>(lhs: T, rhs: T) -> T
```

Divides `lhs` by `rhs` elementwise.

`T` must be a vector of integers or floats.

# Safety
For integers, `rhs` must not contain any zero elements.
Additionally for signed integers, `<int>::MIN / -1` is undefined behavior.

## fn simd_rem

```rust
pub const unsafe fn simd_rem<T>(lhs: T, rhs: T) -> T
```

Returns remainder of two vectors elementwise.

`T` must be a vector of integers or floats.

# Safety
For integers, `rhs` must not contain any zero elements.
Additionally for signed integers, `<int>::MIN / -1` is undefined behavior.

## fn simd_shl

```rust
pub const unsafe fn simd_shl<T>(lhs: T, rhs: T) -> T
```

Shifts vector left elementwise, with UB on overflow.

Shifts `lhs` left by `rhs`, shifting in zeros.

`T` must be a vector of integers.

# Safety

Each element of `rhs` must be in `0..<int>::BITS`.

## fn simd_shr

```rust
pub const unsafe fn simd_shr<T>(lhs: T, rhs: T) -> T
```

Shifts vector right elementwise, with UB on overflow.

`T` must be a vector of integers.

Shifts `lhs` right by `rhs`, shifting in sign bits for signed types.

# Safety

Each element of `rhs` must be in `0..<int>::BITS`.

## fn simd_funnel_shl

```rust
pub const unsafe fn simd_funnel_shl<T>(a: T, b: T, shift: T) -> T
```

Funnel Shifts vector left elementwise, with UB on overflow.

Concatenates `a` and `b` elementwise (with `a` in the most significant half),
creating a vector of the same length, but with each element being twice as
wide. Then shift this vector left elementwise by `shift`, shifting in zeros,
and extract the most significant half of each of the elements. If `a` and `b`
are the same, this is equivalent to an elementwise rotate left operation.

`T` must be a vector of integers.

# Safety

Each element of `shift` must be in `0..<int>::BITS`.

## fn simd_funnel_shr

```rust
pub const unsafe fn simd_funnel_shr<T>(a: T, b: T, shift: T) -> T
```

Funnel Shifts vector right elementwise, with UB on overflow.

Concatenates `a` and `b` elementwise (with `a` in the most significant half),
creating a vector of the same length, but with each element being twice as
wide. Then shift this vector right elementwise by `shift`, shifting in zeros,
and extract the least significant half of each of the elements. If `a` and `b`
are the same, this is equivalent to an elementwise rotate right operation.

`T` must be a vector of integers.

# Safety

Each element of `shift` must be in `0..<int>::BITS`.

## fn simd_carryless_mul

```rust
pub unsafe fn simd_carryless_mul<T>(a: T, b: T) -> T
```

Compute the carry-less product.

This is similar to long multiplication except that the carry is discarded.

This operation can be used to model multiplication in `GF(2)[X]`, the polynomial
ring over `GF(2)`.

`T` must be a vector of integers.

## fn simd_and

```rust
pub const unsafe fn simd_and<T>(x: T, y: T) -> T
```

"And"s vectors elementwise.

`T` must be a vector of integers.

## fn simd_or

```rust
pub const unsafe fn simd_or<T>(x: T, y: T) -> T
```

"Ors" vectors elementwise.

`T` must be a vector of integers.

## fn simd_xor

```rust
pub const unsafe fn simd_xor<T>(x: T, y: T) -> T
```

"Exclusive ors" vectors elementwise.

`T` must be a vector of integers.

## fn simd_cast

```rust
pub const unsafe fn simd_cast<T, U>(x: T) -> U
```

Numerically casts a vector, elementwise.

`T` and `U` must be vectors of integers or floats, and must have the same length.

When casting floats to integers, the result is truncated. Out-of-bounds result lead to UB.
When casting integers to floats, the result is rounded.
Otherwise, truncates or extends the value, maintaining the sign for signed integers.

# Safety
Casting from integer types is always safe.
Casting between two float types is also always safe.

Casting floats to integers truncates, following the same rules as `to_int_unchecked`.
Specifically, each element must:
* Not be `NaN`
* Not be infinite
* Be representable in the return type, after truncating off its fractional part

## fn simd_as

```rust
pub const unsafe fn simd_as<T, U>(x: T) -> U
```

Numerically casts a vector, elementwise.

`T` and `U` be a vectors of integers or floats, and must have the same length.

Like `simd_cast`, but saturates float-to-integer conversions (NaN becomes 0).
This matches regular `as` and is always safe.

When casting floats to integers, the result is truncated.
When casting integers to floats, the result is rounded.
Otherwise, truncates or extends the value, maintaining the sign for signed integers.

## fn simd_neg

```rust
pub const unsafe fn simd_neg<T>(x: T) -> T
```

Negates a vector elementwise.

`T` must be a vector of integers or floats.
For integers, wrapping arithmetic is used.

## fn simd_fabs

```rust
pub const unsafe fn simd_fabs<T>(x: T) -> T
```

Returns absolute value of a vector, elementwise.

`T` must be a vector of floating-point primitive types.

## fn simd_minimum_number_nsz

```rust
pub const unsafe fn simd_minimum_number_nsz<T>(x: T, y: T) -> T
```

Returns the minimum of two vectors, elementwise.

`T` must be a vector of floating-point primitive types.

This behaves like IEEE 754-2019 minimumNumber, *except* that it does not order signed
zeros deterministically. In particular, for each vector lane:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

## fn simd_maximum_number_nsz

```rust
pub const unsafe fn simd_maximum_number_nsz<T>(x: T, y: T) -> T
```

Returns the maximum of two vectors, elementwise.

`T` must be a vector of floating-point primitive types.

This behaves like IEEE 754-2019 maximumNumber, *except* that it does not order signed
zeros deterministically. In particular, for each vector lane:
If one of the arguments is NaN (quiet or signaling), then the other argument is returned. If
both arguments are NaN, returns NaN. If the inputs compare equal (such as for the case of `+0.0`
and `-0.0`), either input may be returned non-deterministically.

## fn simd_eq

```rust
pub const unsafe fn simd_eq<T, U>(x: T, y: T) -> U
```

Tests elementwise equality of two vectors.

`T` must be a vector of integers or floats.

`U` must be a vector of integers with the same number of elements and element size as `T`.

Returns `0` for false and `!0` for true.

## fn simd_ne

```rust
pub const unsafe fn simd_ne<T, U>(x: T, y: T) -> U
```

Tests elementwise inequality equality of two vectors.

`T` must be a vector of integers or floats.

`U` must be a vector of integers with the same number of elements and element size as `T`.

Returns `0` for false and `!0` for true.

## fn simd_lt

```rust
pub const unsafe fn simd_lt<T, U>(x: T, y: T) -> U
```

Tests if `x` is less than `y`, elementwise.

`T` must be a vector of integers or floats.

`U` must be a vector of integers with the same number of elements and element size as `T`.

Returns `0` for false and `!0` for true.

## fn simd_le

```rust
pub const unsafe fn simd_le<T, U>(x: T, y: T) -> U
```

Tests if `x` is less than or equal to `y`, elementwise.

`T` must be a vector of integers or floats.

`U` must be a vector of integers with the same number of elements and element size as `T`.

Returns `0` for false and `!0` for true.

## fn simd_gt

```rust
pub const unsafe fn simd_gt<T, U>(x: T, y: T) -> U
```

Tests if `x` is greater than `y`, elementwise.

`T` must be a vector of integers or floats.

`U` must be a vector of integers with the same number of elements and element size as `T`.

Returns `0` for false and `!0` for true.

## fn simd_ge

```rust
pub const unsafe fn simd_ge<T, U>(x: T, y: T) -> U
```

Tests if `x` is greater than or equal to `y`, elementwise.

`T` must be a vector of integers or floats.

`U` must be a vector of integers with the same number of elements and element size as `T`.

Returns `0` for false and `!0` for true.

## fn simd_shuffle

```rust
pub const unsafe fn simd_shuffle<T, U, V>(x: T, y: T, idx: U) -> V
```

Shuffles two vectors by const indices.

`T` must be a vector.

`U` must be a **const** vector of `u32`s. This means it must either refer to a named
const or be given as an inline const expression (`const { ... }`).

`V` must be a vector with the same element type as `T` and the same length as `U`.

Returns a new vector such that element `i` is selected from `xy[idx[i]]`, where `xy`
is the concatenation of `x` and `y`. It is a compile-time error if `idx[i]` is out-of-bounds
of `xy`.

## fn simd_gather

```rust
pub const unsafe fn simd_gather<T, U, V>(val: T, ptr: U, mask: V) -> T
```

Reads a vector of pointers.

`T` must be a vector.

`U` must be a vector of pointers to the element type of `T`, with the same length as `T`.

`V` must be a vector of integers with the same length as `T` (but any element size).

For each pointer in `ptr`, if the corresponding value in `mask` is `!0`, read the pointer.
Otherwise if the corresponding value in `mask` is `0`, return the corresponding value from
`val`.

# Safety
Each pointer in `ptr` whose corresponding value in `mask` is `!0` must be readable as if by
`ptr::read`[crate::ptr::read] (e.g. aligned to the element type).

`mask` must only contain `0` or `!0` values.

## fn simd_scatter

```rust
pub const unsafe fn simd_scatter<T, U, V>(val: T, ptr: U, mask: V)
```

Writes to a vector of pointers.

`T` must be a vector.

`U` must be a vector of pointers to the element type of `T`, with the same length as `T`.

`V` must be a vector of integers with the same length as `T` (but any element size).

For each pointer in `ptr`, if the corresponding value in `mask` is `!0`, write the
corresponding value in `val` to the pointer.
Otherwise if the corresponding value in `mask` is `0`, do nothing.

The stores happen in left-to-right order.
(This is relevant in case two of the stores overlap.)

# Safety
Each pointer in `ptr` whose corresponding value in `mask` is `!0` must be writable as if by
`ptr::write`[crate::ptr::write] (e.g. aligned to the element type).

`mask` must only contain `0` or `!0` values.

## enum SimdAlign

```rust
pub enum SimdAlign
```

A type for alignment options for SIMD masked load/store intrinsics.

## fn simd_masked_load

```rust
pub const unsafe fn simd_masked_load<V, U, T, const ALIGN: SimdAlign>(mask: V, ptr: U, val: T) -> T
```

Reads a vector of pointers.

`T` must be a vector.

`U` must be a pointer to the element type of `T`

`V` must be a vector of integers with the same length as `T` (but any element size).

For each element, if the corresponding value in `mask` is `!0`, read the corresponding
pointer offset from `ptr`.
The first element is loaded from `ptr`, the second from `ptr.wrapping_offset(1)` and so on.
Otherwise if the corresponding value in `mask` is `0`, return the corresponding value from
`val`.

# Safety
`ptr` must be aligned according to the `ALIGN` parameter, see `SimdAlign` for details.

Each pointer offset from `ptr` whose corresponding value in `mask` is `!0` must be readable as if
by `ptr::read`[crate::ptr::read].

`mask` must only contain `0` or `!0` values.

## fn simd_masked_store

```rust
pub const unsafe fn simd_masked_store<V, U, T, const ALIGN: SimdAlign>(mask: V, ptr: U, val: T)
```

Writes to a vector of pointers.

`T` must be a vector.

`U` must be a pointer to the element type of `T`

`V` must be a vector of integers with the same length as `T` (but any element size).

For each element, if the corresponding value in `mask` is `!0`, write the corresponding
value in `val` to the pointer offset from `ptr`.
The first element is written to `ptr`, the second to `ptr.wrapping_offset(1)` and so on.
Otherwise if the corresponding value in `mask` is `0`, do nothing.

# Safety
`ptr` must be aligned according to the `ALIGN` parameter, see `SimdAlign` for details.

Each pointer offset from `ptr` whose corresponding value in `mask` is `!0` must be writable as if
by `ptr::write`[crate::ptr::write].

`mask` must only contain `0` or `!0` values.

## fn simd_saturating_add

```rust
pub const unsafe fn simd_saturating_add<T>(x: T, y: T) -> T
```

Adds two simd vectors elementwise, with saturation.

`T` must be a vector of integer primitive types.

## fn simd_saturating_sub

```rust
pub const unsafe fn simd_saturating_sub<T>(lhs: T, rhs: T) -> T
```

Subtracts two simd vectors elementwise, with saturation.

`T` must be a vector of integer primitive types.

Subtract `rhs` from `lhs`.

## fn simd_reduce_add_ordered

```rust
pub const unsafe fn simd_reduce_add_ordered<T, U>(x: T, y: U) -> U
```

Adds elements within a vector from left to right.

`T` must be a vector of integers or floats.

`U` must be the element type of `T`.

Starting with the value `y`, add the elements of `x` and accumulate.
