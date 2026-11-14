---
title: "Glossary (part 2 of 2)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/glossary.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Glossary (part 2 of 2)

### Zero-sized type (ZST)

A type is zero sized (a ZST) if its size is 0. Such types have at most one possible value. Examples include:

- The [unit type] (see [layout.tuple.unit]).
- The [never type] (see [type.never.layout]).
- [Function items] (see [type.fn-item.intro]).
- The constructors of [tuple-like structs] (see [type.fn-item.intro]).
- The constructors of [tuple-like enum variants] (see [type.fn-item.intro]).
- `repr(Rust)` [structs] with no fields or where all fields are zero sized (see [layout.repr.rust.struct-zst]).
- `repr(C)` [structs] with no fields or where all fields are zero-sized (see [layout.repr.c.struct.size-field-offset]).
- `repr(transparent)` [structs] with no fields or where all fields are zero-sized (see [layout.repr.transparent.layout-abi]).
- `repr(Rust)` [enums] (without a [primitive representation] specified) with no variants (see [layout.repr.rust.enum-empty-zst]).
- `repr(Rust)` [enums] (without a [primitive representation] specified) with a single [field-struct-like variant], a single [unit-struct-like variant], or a single [tuple-struct-like variant] and where the struct-like thing has no fields or where all of the fields are zero sized (see [layout.repr.rust.enum-struct-like-zst]).
- [Arrays] of zero-sized types (see [layout.array]).
- [Arrays] of length zero (see [layout.array]).
- [Unions] of zero-sized types (see [items.union.common-storage]).
- [`PhantomData<T>`] for any type `T` (see [lang-types.phantom-data]).
- [`MaybeUninit<T>`] for a type `T` that is itself a zero-sized type (see [lang-types.maybe-uninit.layout]).

```rust
# use core::marker::PhantomData;
# use core::mem::{MaybeUninit, size_of, size_of_val};
fn f() {}
struct S(u8);
enum E { V(u8) }
struct UnitLike;
struct NoFields {}
struct OnlyZST {
    f1: (),
    f2: [(); 10],
    f3: [u8; 0],
}
#[repr(C)]
struct C1 {}
#[repr(C)]
struct C2 {
    f1: (),
    f2: [(); 10],
    f3: [u8; 0],
    f4: C1,
}
#[repr(transparent)]
struct T1 {}
#[repr(transparent)]
struct T2 {
    f1: (),
    f2: [(); 10],
    f3: [u8; 0],
}
union U {
    f1: (),
    f2: [(); 10],
    f3: [u8; 0],
}
# /// An enum with a single field-struct-like variant with all fields
# /// being ZSTs.
enum E2 {
    V1 { f1: (), f2: [(); 10] },
}
# /// An enum with a single field-struct-like variant with no fields.
enum E3 {
    V1 {},
}
# /// An enum with a single unit-struct-like variant.
enum E4 {
    V1,
}
# /// An enum with a single tuple-struct-like variant with all fields
# /// being ZSTs.
enum E5 {
    V1 ((), [(); 10]),
}
# /// An enum with a single tuple-struct-like variant with no fields.
enum E6 {
    V1 (),
}
# /// An enum with no variants.
enum E7 {}

assert_eq!(0, size_of::<()>());
assert_eq!(0, size_of::<!>());
assert_eq!(0, size_of_val(&f));
assert_eq!(0, size_of_val(&S));
assert_eq!(0, size_of_val(&E::V));
assert_eq!(0, size_of::<UnitLike>());
assert_eq!(0, size_of::<NoFields>());
assert_eq!(0, size_of::<OnlyZST>());
assert_eq!(0, size_of::<C1>());
assert_eq!(0, size_of::<C2>());
assert_eq!(0, size_of::<T1>());
assert_eq!(0, size_of::<T2>());
assert_eq!(0, size_of::<[(); 10]>());
assert_eq!(0, size_of::<[u8; 0]>());
assert_eq!(0, size_of::<U>());
assert_eq!(0, size_of::<E2>());
assert_eq!(0, size_of::<E3>());
assert_eq!(0, size_of::<E4>());
assert_eq!(0, size_of::<E5>());
assert_eq!(0, size_of::<E6>());
assert_eq!(0, size_of::<E7>());
# // `PhantomData` for a ZST.
assert_eq!(0, size_of::<PhantomData<()>>());
# // `PhantomData` for a type that is not a ZST.
assert_eq!(0, size_of::<PhantomData<u16>>());
assert_eq!(0, size_of::<MaybeUninit<[(); 2]>>());
```
