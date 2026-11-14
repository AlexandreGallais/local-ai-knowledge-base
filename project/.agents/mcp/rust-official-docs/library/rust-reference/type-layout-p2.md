---
title: "Type layout (part 2 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/type-layout.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Type layout (part 2 of 3)

## Representations

r[layout.repr.intro]
All user-defined composite types (`struct`s, `enum`s, and `union`s) have a *representation* that specifies what the layout is for the type.

r[layout.repr.kinds]
The possible representations for a type are:

- [`Rust`] (default)
- [`C`]
- The [primitive representations]
- [`transparent`]

r[layout.repr.attribute]
The representation of a type can be changed by applying the `repr` attribute to it. The following example shows a struct with a `C` representation.

```rust
#[repr(C)]
struct ThreeInts {
    first: i16,
    second: i8,
    third: i32
}
```

r[layout.repr.align-packed]
The alignment may be raised or lowered with the `align` and `packed` modifiers respectively. They alter the representation specified in the attribute. If no representation is specified, the default one is altered.

```rust
// Default representation, alignment lowered to 2.
#[repr(packed(2))]
struct PackedStruct {
    first: i16,
    second: i8,
    third: i32
}

// C representation, alignment raised to 8
#[repr(C, align(8))]
struct AlignedStruct {
    first: i16,
    second: i8,
    third: i32
}
```

> **Note:**
> As a consequence of the representation being an attribute on the item, the representation does not depend on generic parameters. Any two types with the same name have the same representation. For example, `Foo<Bar>` and `Foo<Baz>` both have the same representation.

r[layout.repr.inter-field]
The representation of a type can change the padding between fields, but does not change the layout of the fields themselves. For example, a struct with a `C` representation that contains a struct `Inner` with the `Rust` representation will not change the layout of `Inner`.

r[layout.repr.rust]
### The `Rust` representation

r[layout.repr.rust.intro]
The `Rust` representation is the default representation for nominal types without a `repr` attribute. Using this representation explicitly through a `repr` attribute is guaranteed to be the same as omitting the attribute entirely.

r[layout.repr.rust.layout]
The only data layout guarantees made by this representation are those required for soundness. These are:

 1. The offset of a field is divisible by that field's alignment.
 2. The alignment of the type is at least the maximum alignment of its fields.

r[layout.repr.rust.struct]
For [structs], it is further guaranteed that the fields do not overlap. That is, the fields can be ordered such that the offset plus the size of any field is less than or equal to the offset of the next field in the ordering. The ordering does not have to be the same as the order in which the fields are specified in the declaration of the type.

Be aware that this guarantee does not imply that the fields have distinct addresses: [zero-sized types] may have the same address as other fields in the same struct.

r[layout.repr.rust.struct-zst]
For [structs] with no fields or where all fields are [zero sized], it is further guaranteed that the structs are themselves [zero sized].

r[layout.repr.rust.enum-empty-zst]
[Enums] (without a [primitive representation] specified) with no variants are [zero sized].

> **Note:**
> Such enums are [uninhabited].

r[layout.repr.rust.enum-struct-like-zst]
For [enums] (without a [primitive representation] specified) with a single [field-struct-like variant], a single [unit-struct-like variant], or a single [tuple-struct-like variant] and where the struct-like thing has no fields or where all of the fields are [zero sized], the enums themselves are [zero sized].

```rust
# use core::mem::size_of;
enum E1 {
    V {},
}

enum E2 {
    V { f: () },
}

enum E3 {
    V,
}

enum E4 {
    V(),
}

enum E5 {
    V(()),
}

assert_eq!(size_of::<E1>(), 0);
assert_eq!(size_of::<E2>(), 0);
assert_eq!(size_of::<E3>(), 0);
assert_eq!(size_of::<E4>(), 0);
assert_eq!(size_of::<E5>(), 0);
```

r[layout.repr.rust.unspecified]
There are no other guarantees of data layout made by this representation.

r[layout.repr.c]
### The `C` representation

r[layout.repr.c.intro]
The `C` representation is designed for dual purposes. One purpose is for creating types that are interoperable with the C Language. The second purpose is to create types that you can soundly perform operations on that rely on data layout such as reinterpreting values as a different type.

Because of this dual purpose, it is possible to create types that are not useful for interfacing with the C programming language.

r[layout.repr.c.constraint]
This representation can be applied to structs, unions, and enums. The exception is [zero-variant enums] for which the `C` representation is an error.

r[layout.repr.c.struct]
#### `#[repr(C)]` Structs

r[layout.repr.c.struct.align]
The alignment of the struct is the alignment of the most-aligned field in it, or one if there are no fields.

r[layout.repr.c.struct.size-field-offset]
The size and offset of fields is determined by the following algorithm.

Start with a current offset of 0 bytes.

For each field in declaration order in the struct, first determine the size and alignment of the field. If the current offset is not a multiple of the field's alignment, then add padding bytes to the current offset until it is a multiple of the field's alignment. The offset for the field is what the current offset is now. Then increase the current offset by the size of the field.

Finally, the size of the struct is the current offset rounded up to the nearest multiple of the struct's alignment.

Here is the algorithm:

```rust
# /// A field of a struct.
# #[derive(Debug)]
struct Field {
    alignment: usize,
    size: usize,
}
# /// Layout of user-defined structs.
# #[derive(Debug)]
struct MockLayout {
#     /// Fields stored in declaration order.
    fields: Vec<Field>,
#     /// Offset of each field from the start of the struct.
    field_offsets: Vec<usize>,
#     /// Overall alignment.
    alignment: usize,
#     /// Overall size.
    size: usize,
}

impl MockLayout {
    /// Returns the amount of padding needed after `offset` to ensure that the
    /// following address will be aligned to `alignment`.
    fn padding_needed_for(offset: usize, alignment: usize) -> usize {
        let misalignment = offset % alignment;
        if misalignment > 0 {
            // Round up to next multiple of `alignment`.
            alignment - misalignment
        } else {
            // Already a multiple of `alignment`.
            0
        }
    }

    /// Fields must be in declaration order. By this point, they have already
    /// had their alignments and sizes calculated.
    pub fn from_fields(fields: Vec<Field>) -> Self {
        // "The alignment of the struct is the alignment of the most-aligned
        // field in it, or one if there are no fields."
        let alignment = fields
            .iter()
            .map(|field| field.alignment)
            .max()
            .unwrap_or(1);

        // "Start with a current offset of 0 bytes."
        let mut current_offset = 0;

        let mut field_offsets = vec![];
        for field in &fields {
            // "If the current offset is not a multiple of the field's
            // alignment, then add padding bytes to the current offset until it
            // is a multiple of the field's alignment."
            current_offset += Self::padding_needed_for(
                current_offset,
                field.alignment
            );

            // "The offset for the field is what the current offset is now."
            field_offsets.push(current_offset);

            // "Then increase the current offset by the size of the field."
            current_offset += field.size;
        }

        // "Finally, the size of the struct is the current offset rounded up to
        // the nearest multiple of the struct's alignment."
        let size = current_offset + Self::padding_needed_for(
            current_offset,
            alignment
        );

        MockLayout { fields, field_offsets, alignment, size }
    }
}
#
# #[repr(C)]
# struct Demo {
#     first: u8,
#     second: u32,
#     third: u64,
# }
# macro_rules! fields {
#     ( $( $t:ty ),+ ) => {
#         vec![
#             $( Field {
#                 alignment: std::mem::align_of::<$t>(),
#                 size: std::mem::size_of::<$t>(),
#             }),+
#         ]
#     }
# }
# let fields = fields![u8, u32, u64];
# let demo_layout = MockLayout::from_fields(fields);
# assert_eq!(std::mem::align_of::<Demo>(), demo_layout.alignment);
# assert_eq!(std::mem::size_of::<Demo>(), demo_layout.size);
```

> **Warning:**
> This mock implementation uses a naive algorithm that ignores overflow issues for the sake of clarity. To perform memory layout computations in actual code, use [`Layout`].

> **Note:**
> This algorithm can produce [zero-sized] structs. In C, an empty struct declaration like `struct Foo { }` is illegal. However, both gcc and clang support options to enable such structs, and assign them size zero. C++, in contrast, gives empty structs a size of 1, unless they are inherited from or they are fields that have the `[[no_unique_address]]` attribute, in which case they do not increase the overall size of the struct.

r[layout.repr.c.union]
#### `#[repr(C)]` Unions

r[layout.repr.c.union.intro]
A union declared with `#[repr(C)]` will have the same size and alignment as an equivalent C union declaration in the C language for the target platform.

r[layout.repr.c.union.size-align]
The union will have a size of the maximum size of all of its fields rounded to its alignment, and an alignment of the maximum alignment of all of its fields. These maximums may come from different fields. Each field lives at byte offset 0 from the beginning of the union.

```rust
#[repr(C)]
union Union {
    f1: u16,
    f2: [u8; 4],
}

assert_eq!(std::mem::size_of::<Union>(), 4);  // From f2
assert_eq!(std::mem::align_of::<Union>(), 2); // From f1

assert_eq!(std::mem::offset_of!(Union, f1), 0);
assert_eq!(std::mem::offset_of!(Union, f2), 0);

#[repr(C)]
union SizeRoundedUp {
   a: u32,
   b: [u16; 3],
}

assert_eq!(std::mem::size_of::<SizeRoundedUp>(), 8);  // Size of 6 from b,
                                                      // rounded up to 8 from
                                                      // alignment of a.
assert_eq!(std::mem::align_of::<SizeRoundedUp>(), 4); // From a

assert_eq!(std::mem::offset_of!(SizeRoundedUp, a), 0);
assert_eq!(std::mem::offset_of!(SizeRoundedUp, b), 0);
```

r[layout.repr.c.enum]
#### `#[repr(C)]` Field-less Enums

r[layout.repr.c.enum.discriminant]
For a [field-less enum] with the `C` representation, the discriminant values must either all be representable by the `int` type in the target platform's C ABI or all be representable by its `unsigned int` type.

> **Note:**
> `repr(C)` enums without a primitive representation have discriminant values of type `isize`. See [items.enum.discriminant.type]. The size and alignment are determined from the discriminant values (according to the rule below) *after* they have been cast to `isize`.

> **Note:**
> `rustc` accepts enums whose discriminant values do not meet this requirement but lints against them. This will become an error in the future.

r[layout.repr.c.enum.size-align]
A [field-less enum] with the `C` representation has the same size and alignment as a C enum with the same discriminant values and no fixed underlying type.

```rust
# use core::ffi::c_int;
# use core::mem::{align_of, size_of};
#[repr(C)]
enum E {
    V1,
    V2,
}

#[cfg(target_arch = "x86_64")]
{
    assert_eq!(size_of::<E>(), size_of::<c_int>());
    assert_eq!(align_of::<E>(), align_of::<c_int>());
}
```

> **Note:**
> The enum representation in C is implementation defined, so this is really a "best guess". In particular, this may be incorrect when the C code of interest is compiled with certain flags.
>
> For maximum portability, prefer setting the size and alignment explicitly using a [primitive representation] on the Rust side and a fixed underlying type (introduced in C23) on the C side.

> **Warning:**
> There are crucial differences between an `enum` in the C language and Rust's [field-less enums] with this representation. An `enum` in C is mostly a `typedef` plus some named constants; in other words, an object of an `enum` type can hold any integer value. For example, this is often used for bitflags in `C`. In contrast, Rust’s [field-less enums] can only legally hold the discriminant values, everything else is [undefined behavior]. Therefore, using a field-less enum in FFI to model a C `enum` is often wrong.

r[layout.repr.c.adt]
#### `#[repr(C)]` Enums With Fields

r[layout.repr.c.adt.intro]
The representation of a `repr(C)` enum with fields is a `repr(C)` struct with two fields, also called a "tagged union" in C:

r[layout.repr.c.adt.tag]
- a `repr(C)` version of the enum with all fields removed ("the tag")

r[layout.repr.c.adt.fields]
- a `repr(C)` union of `repr(C)` structs for the fields of each variant that had them ("the payload")

> **Note:**
> Due to the representation of `repr(C)` structs and unions, if a variant has a single field there is no difference between putting that field directly in the union or wrapping it in a struct; any system which wishes to manipulate such an `enum`'s representation may therefore use whichever form is more convenient or consistent for them.

```rust
// This Enum has the same representation as ...
#[repr(C)]
enum MyEnum {
    A(u32),
    B(f32, u64),
    C { x: u32, y: u8 },
    D,
 }

// ... this struct.
#[repr(C)]
struct MyEnumRepr {
    tag: MyEnumDiscriminant,
    payload: MyEnumFields,
}

// This is the discriminant enum.
#[repr(C)]
enum MyEnumDiscriminant { A, B, C, D }

// This is the variant union.
#[repr(C)]
union MyEnumFields {
    A: MyAFields,
    B: MyBFields,
    C: MyCFields,
    D: MyDFields,
}

#[repr(C)]
#[derive(Copy, Clone)]
struct MyAFields(u32);

#[repr(C)]
#[derive(Copy, Clone)]
struct MyBFields(f32, u64);

#[repr(C)]
#[derive(Copy, Clone)]
struct MyCFields { x: u32, y: u8 }

// This struct could be omitted (it is a zero-sized type), and it must be in
// C/C++ headers.
#[repr(C)]
#[derive(Copy, Clone)]
struct MyDFields;
```

r[layout.repr.primitive]
