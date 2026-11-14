---
title: "Type layout (part 1 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/type-layout.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[layout]
# Type layout

r[layout.intro]
The layout of a type is its size, alignment, and the relative offsets of its fields. For enums, how the discriminant is laid out and interpreted is also part of type layout.

r[layout.guarantees]
Type layout can be changed with each compilation. Instead of trying to document exactly what is done, we only document what is guaranteed today.

Note that even types with the same layout can still differ in how they are passed across function boundaries. For function call ABI compatibility of types, see here.

r[layout.properties]
## Size and alignment

r[layout.properties.intro]
All values have an alignment and size.

r[layout.properties.align]
The *alignment* of a value specifies what addresses are valid to store the value at. A value of alignment `n` must only be stored at an address that is a multiple of n. For example, a value with an alignment of 2 must be stored at an even address, while a value with an alignment of 1 can be stored at any address. Alignment is measured in bytes, and must be at least 1, and always a power of 2. The alignment of a value can be checked with the [`align_of_val`] function.

r[layout.properties.size]
The *size* of a value is the offset in bytes between successive elements in an array with that item type including alignment padding. The size of a value is always a multiple of its alignment. Note that some types are [zero-sized]; 0 is considered a multiple of any alignment (for example, on some platforms, the type `[u16; 0]` has size 0 and alignment 2). The size of a value can be checked with the [`size_of_val`] function.

r[layout.properties.sized]
Types where all values have the same size and alignment, and both are known at compile time, implement the [`Sized`] trait and can be checked with the [`size_of`] and [`align_of`] functions. Types that are not [`Sized`] are known as [dynamically sized types]. Since all values of a `Sized` type share the same size and alignment, we refer to those shared values as the size of the type and the alignment of the type respectively.

r[layout.primitive]
## Primitive data layout

r[layout.primitive.size]
The size of most primitives is given in this table.

| Type              | `size_of::<Type>()`|
|--                 |--                  |
| `bool`            | 1                  |
| `u8` / `i8`       | 1                  |
| `u16` / `i16`     | 2                  |
| `u32` / `i32`     | 4                  |
| `u64` / `i64`     | 8                  |
| `u128` / `i128`   | 16                 |
| `usize` / `isize` | See below          |
| `f32`             | 4                  |
| `f64`             | 8                  |
| `char`            | 4                  |
| `!`               | 0                  |

r[layout.primitive.size-minimum]
`usize` and `isize` have a size big enough to contain every address on the target platform. For example, on a 32 bit target, this is 4 bytes, and on a 64 bit target, this is 8 bytes.

r[layout.primitive.size-align]
`usize` and `isize` have the same size and alignment.

r[layout.primitive.platform-specific-alignment]
The alignment of primitives is platform-specific. In most cases, their alignment is equal to their size, but it may be less. In particular, `i128` and `u128` are often aligned to 4 or 8 bytes even though their size is 16, and on many 32-bit platforms, `i64`, `u64`, and `f64` are only aligned to 4 bytes, not 8.

r[layout.primitive.integer-alignment]
Alignment is guaranteed to be the same for fixed-width signed and unsigned integer variants of the same indicated size --- that is, for a given size `N`, `align_of::<uN>() == align_of::<iN>()`.

r[layout.pointer]
## Pointers and references layout

r[layout.pointer.intro]
Pointers and references have the same layout. Mutability of the pointer or reference does not change the layout.

r[layout.pointer.thin]
Pointers to sized types have the same size and alignment as `usize`.

r[layout.pointer.unsized]
Pointers to unsized types are sized. The size and alignment of a pointer to an unsized type are each guaranteed to be greater than or equal to those of a pointer to a sized type.

> **Note:**
> Though you should not rely on this, all pointers to DSTs are currently twice the size of the size of `usize` and have the same alignment.

r[layout.array]
## Array layout

An array of `[T; N]` has a size of `size_of::<T>() * N` and the same alignment of `T`. Arrays are laid out so that the zero-based `nth` element of the array is offset from the start of the array by `n * size_of::<T>()` bytes.

r[layout.slice]
## Slice layout

Slices have the same layout as the section of the array they slice.

> **Note:**
> This is about the raw `[T]` type, not pointers (`&[T]`, `Box<[T]>`, etc.) to slices.

r[layout.str]
## `str` Layout

String slices are a UTF-8 representation of characters that have the same layout as slices of type `[u8]`. A reference `&str` has the same layout as a reference `&[u8]`.

r[layout.tuple]
## Tuple layout

r[layout.tuple.def]
Tuples are laid out according to the `Rust` representation.

r[layout.tuple.unit]
The exception to this is the unit tuple (`()`), which is guaranteed as a [zero-sized type] to have a size of 0 and an alignment of 1.

r[layout.trait-object]
## Trait object layout

Trait objects have the same layout as the value the trait object is of.

> **Note:**
> This is about the raw trait object types, not pointers (`&dyn Trait`, `Box<dyn Trait>`, etc.) to trait objects.

r[layout.closure]
## Closure layout

Closures have no layout guarantees.

r[layout.repr]
