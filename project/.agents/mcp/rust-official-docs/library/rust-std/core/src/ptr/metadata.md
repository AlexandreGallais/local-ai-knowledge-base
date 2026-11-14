# core::ptr::metadata

## trait Pointee

```rust
pub trait Pointee: PointeeSized
```

Provides the pointer metadata type of any pointed-to type.

# Pointer metadata

Raw pointer types and reference types in Rust can be thought of as made of two parts:
a data pointer that contains the memory address of the value, and some metadata.

For statically-sized types (that implement the `Sized` traits)
as well as for `extern` types,
pointers are said to be “thin”: metadata is zero-sized and its type is `()`.

Pointers to [dynamically-sized types][dst] are said to be “wide” or “fat”,
they have non-zero-sized metadata:

* For structs whose last field is a DST, metadata is the metadata for the last field
* For the `str` type, metadata is the length in bytes as `usize`
* For slice types like `[T]`, metadata is the length in items as `usize`
* For trait objects like `dyn SomeTrait`, metadata is [`DynMetadata<Self>`][DynMetadata]
  (e.g. `DynMetadata<dyn SomeTrait>`)

In the future, the Rust language may gain new kinds of types
that have different pointer metadata.

[dst]: https://doc.rust-lang.org/nomicon/exotic-sizes.html#dynamically-sized-types-dsts


# The `Pointee` trait

The point of this trait is its `Metadata` associated type,
which is `()` or `usize` or `DynMetadata<_>` as described above.
It is automatically implemented for every type.
It can be assumed to be implemented in a generic context, even without a corresponding bound.


# Usage

Raw pointers can be decomposed into the data pointer and metadata components
with their [`to_raw_parts`] method.

Alternatively, metadata alone can be extracted with the [`metadata`] function.
A reference can be passed to [`metadata`] and implicitly coerced.

A (possibly-wide) pointer can be put back together from its data pointer and metadata
with [`from_raw_parts`] or [`from_raw_parts_mut`].

[`to_raw_parts`]: *const::to_raw_parts

## Thin::metadata

```rust
pub const fn metadata<T: PointeeSized>(ptr: *const T) -> <T as Pointee>::Metadata
```

Extracts the metadata component of a pointer.

Values of type `*mut T`, `&T`, or `&mut T` can be passed directly to this function
as they implicitly coerce to `*const T`.

# Example

```
#![feature(ptr_metadata)]

assert_eq!(std::ptr::metadata("foo"), 3_usize);
```

## struct DynMetadata

```rust
pub struct DynMetadata<Dyn: PointeeSized>
```

The metadata for a `Dyn = dyn SomeTrait` trait object type.

It is a pointer to a vtable (virtual call table)
that represents all the necessary information
to manipulate the concrete type stored inside a trait object.
The vtable notably contains:

* type size
* type alignment
* a pointer to the type’s `drop_in_place` impl (may be a no-op for plain-old-data)
* pointers to all the methods for the type’s implementation of the trait

Note that the first three are special because they’re necessary to allocate, drop,
and deallocate any trait object.

It is possible to name this struct with a type parameter that is not a `dyn` trait object
(for example `DynMetadata<u64>`) but not to obtain a meaningful value of that struct.

Note that while this type implements `PartialEq`, comparing vtable pointers is unreliable:
pointers to vtables of the same type for the same trait can compare inequal (because vtables are
duplicated in multiple codegen units), and pointers to vtables of *different* types/traits can
compare equal (since identical vtables can be deduplicated within a codegen unit).

## DynMetadata::size_of

```rust
pub fn size_of(self) -> usize
```

Returns the size of the type associated with this vtable.

## DynMetadata::align_of

```rust
pub fn align_of(self) -> usize
```

Returns the alignment of the type associated with this vtable.

## DynMetadata::layout

```rust
pub fn layout(self) -> crate::alloc::Layout
```

Returns the size and alignment together as a `Layout`