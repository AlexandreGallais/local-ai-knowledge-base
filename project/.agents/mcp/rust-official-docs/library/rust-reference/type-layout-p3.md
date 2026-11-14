---
title: "Type layout (part 3 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/type-layout.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Type layout (part 3 of 3)

### Primitive representations

r[layout.repr.primitive.intro]
The *primitive representations* are the representations with the same names as the primitive integer types. That is: `u8`, `u16`, `u32`, `u64`, `u128`, `usize`, `i8`, `i16`, `i32`, `i64`, `i128`, and `isize`.

r[layout.repr.primitive.constraint]
Primitive representations can only be applied to enumerations and have different behavior whether the enum has fields or no fields. It is an error for [zero-variant enums] to have a primitive representation. Combining two primitive representations together is an error.

r[layout.repr.primitive.enum]
#### Primitive representation of field-less enums

A [field-less enum] with a primitive representation has the same size and alignment as the primitive type of the same name.

> **Note:**
> Enums with a primitive representation have discriminant values of the type named by the representation. See [items.enum.discriminant.type-primitive].

r[layout.repr.primitive.adt]
#### Primitive representation of enums with fields

The representation of a primitive representation enum is a `repr(C)` union of `repr(C)` structs for each variant with a field. The first field of each struct in the union is the primitive representation version of the enum with all fields removed ("the tag") and the remaining fields are the fields of that variant.

> **Note:**
> This representation is unchanged if the tag is given its own member in the union, should that make manipulation more clear for you (although to follow the C++ standard the tag member should be wrapped in a `struct`).

> **Note:**
> This representation is quite different from `repr(C)` for enums with fields.

```rust
// This enum has the same representation as ...
#[repr(u8)]
enum MyEnum {
    A(u32),
    B(f32, u64),
    C { x: u32, y: u8 },
    D,
 }

// ... this union.
#[repr(C)]
union MyEnumRepr {
    A: MyVariantA,
    B: MyVariantB,
    C: MyVariantC,
    D: MyVariantD,
}

// This is the discriminant enum.
#[repr(u8)]
#[derive(Copy, Clone)]
enum MyEnumDiscriminant { A, B, C, D }

#[repr(C)]
#[derive(Clone, Copy)]
struct MyVariantA(MyEnumDiscriminant, u32);

#[repr(C)]
#[derive(Clone, Copy)]
struct MyVariantB(MyEnumDiscriminant, f32, u64);

#[repr(C)]
#[derive(Clone, Copy)]
struct MyVariantC { tag: MyEnumDiscriminant, x: u32, y: u8 }

#[repr(C)]
#[derive(Clone, Copy)]
struct MyVariantD(MyEnumDiscriminant);
```

r[layout.repr.primitive-c]
#### Combining primitive representations of enums with fields and `#[repr(C)]`

For enums with fields, it is also possible to combine `repr(C)` and a primitive representation (e.g., `repr(C, u8)`). This modifies the [`repr(C)`] by changing the representation of the discriminant enum to the chosen primitive instead. So, if you chose the `u8` representation, then the discriminant enum would have a size and alignment of 1 byte.

> **Note:**
> This means `repr(C, u8)` is quite different from `repr(u8)`!
> The former is a struct with two fields (tag and a union of variants), the latter is a union where each field starts with the tag.

The discriminant enum from the example earlier then becomes:

```rust
#[repr(C, u8)] // `u8` was added
enum MyEnum {
    A(u32),
    B(f32, u64),
    C { x: u32, y: u8 },
    D,
 }

// ...

#[repr(u8)] // So `u8` is used here instead of `C`
enum MyEnumDiscriminant { A, B, C, D }

// ...
```

For example, with a `repr(C, u8)` enum it is not possible to have 257 unique discriminants ("tags") whereas the same enum with only a `repr(C)` attribute will compile without any problems.

Using a primitive representation in addition to `repr(C)` can change the size of an enum from the `repr(C)` form:

```rust
#[repr(C)]
enum EnumC {
    Variant0(u8),
    Variant1,
}

#[repr(C, u8)]
enum Enum8 {
    Variant0(u8),
    Variant1,
}

#[repr(C, u16)]
enum Enum16 {
    Variant0(u8),
    Variant1,
}

// The size of the C representation is platform dependent
assert_eq!(std::mem::size_of::<EnumC>(), 8);
// One byte for the discriminant and one byte for the value in Enum8::Variant0
assert_eq!(std::mem::size_of::<Enum8>(), 2);
// Two bytes for the discriminant and one byte for the value in Enum16::Variant0
// plus one byte of padding.
assert_eq!(std::mem::size_of::<Enum16>(), 4);
```

r[layout.repr.alignment]
### The alignment modifiers

r[layout.repr.alignment.intro]
The `align` and `packed` modifiers can be used to respectively raise or lower the alignment of `struct`s and `union`s. `packed` may also alter the padding between fields (although it will not alter the padding inside of any field). On their own, `align` and `packed` do not provide guarantees about the order of fields in the layout of a struct or the layout of an enum variant, although they may be combined with representations (such as `C`) which do provide such guarantees.

r[layout.repr.alignment.constraint-alignment]
The alignment is specified as an integer parameter in the form of `#[repr(align(x))]` or `#[repr(packed(x))]`. The alignment value must be a power of two from 1 up to 229. For `packed`, if no value is given, as in `#[repr(packed)]`, then the value is 1.

r[layout.repr.alignment.align]
For `align`, if the specified alignment is less than the alignment of the type without the `align` modifier, then the alignment is unaffected.

r[layout.repr.alignment.packed]
For `packed`, if the specified alignment is greater than the type's alignment without the `packed` modifier, then the alignment and layout is unaffected.

r[layout.repr.alignment.packed-fields]
The alignments of each field, for the purpose of positioning fields, is the smaller of the specified alignment and the alignment of the field's type.

r[layout.repr.alignment.packed-padding]
Inter-field padding is guaranteed to be the minimum required in order to satisfy each field's (possibly altered) alignment (although note that, on its own, `packed` does not provide any guarantee about field ordering). An important consequence of these rules is that a type with `#[repr(packed(1))]` (or `#[repr(packed)]`) will have no inter-field padding.

r[layout.repr.alignment.constraint-exclusive]
The `align` and `packed` modifiers cannot be applied on the same type and a `packed` type cannot transitively contain another `align`ed type. `align` and `packed` may only be applied to the [`Rust`] and [`C`] representations.

r[layout.repr.alignment.enum]
The `align` modifier can also be applied on an `enum`. When it is, the effect on the `enum`'s alignment is the same as if the `enum` was wrapped in a newtype `struct` with the same `align` modifier.

> **Note:**
> References to unaligned fields are not allowed because it is [undefined behavior]. When fields are unaligned due to an alignment modifier, consider the following options for using references and dereferences:
>
> ```rust
> #[repr(packed)]
> struct Packed {
>     f1: u8,
>     f2: u16,
> }
> let mut e = Packed { f1: 1, f2: 2 };
> // Instead of creating a reference to a field, copy the value to a local variable.
> let x = e.f2;
> // Or in situations like `println!` which creates a reference, use braces
> // to change it to a copy of the value.
> println!("{}", {e.f2});
> // Or if you need a pointer, use the unaligned methods for reading and writing
> // instead of dereferencing the pointer directly.
> let ptr: *const u16 = &raw const e.f2;
> let value = unsafe { ptr.read_unaligned() };
> let mut_ptr: *mut u16 = &raw mut e.f2;
> unsafe { mut_ptr.write_unaligned(3) }
> ```

r[layout.repr.transparent]
### The `transparent` representation

r[layout.repr.transparent.constraint-field]
The `transparent` representation can only be used on a `struct` or an `enum` with a single variant that has:
- any number of fields with size 0 and alignment 1 (e.g. [`PhantomData<T>`]), and
- at most one other field.

r[layout.repr.transparent.layout-abi]
Structs and enums with this representation have the same layout and ABI as the only non-size 0 non-alignment 1 field, if present, or unit otherwise.

This is different than the `C` representation because a struct with the `C` representation will always have the ABI of a `C` `struct` while, for example, a struct with the `transparent` representation with a primitive field will have the ABI of the primitive field.

r[layout.repr.transparent.constraint-exclusive]
Because this representation delegates type layout to another type, it cannot be used with any other representation.
