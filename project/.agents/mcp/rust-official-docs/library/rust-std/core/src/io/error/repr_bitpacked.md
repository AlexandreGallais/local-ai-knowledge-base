---
title: "core::io::error::repr_bitpacked"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/io/error/repr_bitpacked.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::io::error::repr_bitpacked

This is a densely packed error representation which is used on targets with
64-bit pointers.

(Note that `bitpacked` vs `unpacked` here has no relationship to
`#[repr(packed)]`, it just refers to attempting to use any available bits in
a more clever manner than `rustc`'s default layout algorithm would).

Conceptually, it stores the same data as the "unpacked" equivalent we use on
other targets. Specifically, you can imagine it as an optimized version of
the following enum (which is roughly equivalent to what's stored by
`repr_unpacked::Repr`, e.g. `super::ErrorData<Box<Custom>>`):

```
enum ErrorData {
   Os(i32),
   Simple(ErrorKind),
   SimpleMessage(&'static SimpleMessage),
   Custom(Box<Custom>),
}
```rust

However, it packs this data into a 64bit non-zero value.

This optimization not only allows `io::Error` to occupy a single pointer,
but improves `io::Result` as well, especially for situations like
`io::Result<()>` (which is now 64 bits) or `io::Result<u64>` (which is now
128 bits), which are quite common.

Tagged values are 64 bits, with the 2 least significant bits used for the
tag. This means there are 4 "variants":

- **Tag 0b00**: The first variant is equivalent to
  `ErrorData::SimpleMessage`, and holds a `&'static SimpleMessage` directly.

  `SimpleMessage` has an alignment >= 4 (which is requested with
  `#[repr(align)]` and checked statically at the bottom of this file), which
  means every `&'static SimpleMessage` should have the both tag bits as 0,
  meaning its tagged and untagged representation are equivalent.

  This means we can skip tagging it, which is necessary as this variant can
  be constructed from a `const fn`, which probably cannot tag pointers (or
  at least it would be difficult).

- **Tag 0b01**: The other pointer variant holds the data for
  `ErrorData::Custom` and the remaining 62 bits are used to store a
  `Box<Custom>`. `Custom` also has alignment >= 4, so the bottom two bits
  are free to use for the tag.

  The only important thing to note is that `ptr::wrapping_add` and
  `ptr::wrapping_sub` are used to tag the pointer, rather than bitwise
  operations. This should preserve the pointer's provenance, which would
  otherwise be lost.

- **Tag 0b10**: Holds the data for `ErrorData::Os(i32)`. We store the `i32`
  in the pointer's most significant 32 bits, and don't use the bits `2..32`
  for anything. Using the top 32 bits is just to let us easily recover the
  `i32` code with the correct sign.

- **Tag 0b11**: Holds the data for `ErrorData::Simple(ErrorKind)`. This
  stores the `ErrorKind` in the top 32 bits as well, although it doesn't
  occupy nearly that many. Most of the bits are unused here, but it's not
  like we need them for anything else yet.

Everything is stored in a `NonNull<()>`, which is odd, but actually serves a
purpose.

Conceptually you might think of this more like:

```
union Repr {
    // holds integer (Simple/Os) variants, and
    // provides access to the tag bits.
    bits: NonZero<u64>,
    // Tag is 0, so this is stored untagged.
    msg: &'static SimpleMessage,
    // Tagged (offset) `Box<Custom>` pointer.
    tagged_custom: NonNull<()>,
}
```rust

But there are a few problems with this:

1. Union access is equivalent to a transmute, so this representation would
   require we transmute between integers and pointers in at least one
   direction, which may be UB (and even if not, it is likely harder for a
   compiler to reason about than explicit ptr->int operations).

2. Even if all fields of a union have a niche, the union itself doesn't,
   although this may change in the future. This would make things like
   `io::Result<()>` and `io::Result<usize>` larger, which defeats part of
   the motivation of this bitpacking.

Storing everything in a `NonZero<usize>` (or some other integer) would be a
bit more traditional for pointer tagging, but it would lose provenance
information, couldn't be constructed from a `const fn`, and would probably
run into other issues as well.

The `NonNull<()>` seems like the only alternative, even if it's fairly odd
to use a pointer type to store something that may hold an integer, some of
the time.
