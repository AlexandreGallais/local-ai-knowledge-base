# core::alloc::layout

## struct Layout

```rust
pub struct Layout
```

Layout of a block of memory.

An instance of `Layout` describes a particular layout of memory.
You build a `Layout` up as an input to give to an allocator.

All layouts have an associated size and a power-of-two alignment. The size, when rounded up to
the nearest multiple of `align`, does not overflow `isize` (i.e., the rounded value will always be
less than or equal to `isize::MAX`).

(Note that layouts are *not* required to have non-zero size,
even though `GlobalAlloc` requires that all memory requests
be non-zero in size. A caller must either ensure that conditions
like this are met, use specific allocators with looser
requirements, or use the more lenient `Allocator` interface.)

## Layout::from_size_align

```rust
pub const fn from_size_align(size: usize, align: usize) -> Result<Self, LayoutError>
```

Constructs a `Layout` from a given `size` and `align`,
or returns `LayoutError` if any of the following conditions
are not met:

* `align` must not be zero,

* `align` must be a power of two,

* `size`, when rounded up to the nearest multiple of `align`,
  must not overflow `isize` (i.e., the rounded value must be
  less than or equal to `isize::MAX`).

## Layout::from_size_align_unchecked

```rust
pub const unsafe fn from_size_align_unchecked(size: usize, align: usize) -> Self
```

Creates a layout, bypassing all checks.

# Safety

The arguments passed must meet the preconditions from
[`Layout::from_size_align`].

## Layout::size

```rust
pub const fn size(&self) -> usize
```

The minimum size in bytes for a memory block of this layout.

## Layout::align

```rust
pub const fn align(&self) -> usize
```

The minimum byte alignment for a memory block of this layout.

The returned alignment is guaranteed to be a power of two.

## Layout::new

```rust
pub const fn new<T>() -> Self
```

Constructs a `Layout` suitable for holding a value of type `T`.

## Layout::for_value

```rust
pub const fn for_value<T: ?Sized>(t: &T) -> Self
```

Produces layout describing a record that could be used to
allocate backing structure for `T` (which could be a trait
or other unsized type like a slice).

## Layout::for_value_raw

```rust
pub const unsafe fn for_value_raw<T: ?Sized>(val: *const T) -> Self
```

- No other kind of unsized tail currently exists that satisfies the trait bounds for this
      function. If more kinds of unsized tails get introduced in the future, the documentation
      of this function will have to be extended before it can be used for such types.

Here, *unsized tail* refers to the type obtained by recursively descending through the last
field of a tuple or struct until we arrived at a built-in unsized type.

As a consequence of these rules, it is the case that whenever it is allowed to convert `val`
into a shared reference, then it is also allowed to invoke this function.

[trait object]: ../../book/ch17-02-trait-objects.html
[extern type]: ../../unstable-book/language-features/extern-types.html

## Layout::dangling_ptr

```rust
pub const fn dangling_ptr(&self) -> NonNull<u8>
```

Creates a `NonNull` that is dangling, but well-aligned for this Layout.

Note that the address of the returned pointer may potentially
be that of a valid pointer, which means this must not be used
as a "not yet initialized" sentinel value.
Types that lazily allocate must track initialization by some other means.

## Layout::align_to

```rust
pub const fn align_to(&self, align: usize) -> Result<Self, LayoutError>
```

Creates a layout describing the record that can hold a value
of the same layout as `self`, but that also is aligned to
alignment `align` (measured in bytes).

If `self` already meets the prescribed alignment, then returns
`self`.

Note that this method does not add any padding to the overall
size, regardless of whether the returned layout has a different
alignment. In other words, if `K` has size 16, `K.align_to(32)`
will *still* have size 16.

Returns an error if the combination of `self.size()` and the given
`align` violates the conditions listed in [`Layout::from_size_align`].

## Layout::pad_to_align

```rust
pub const fn pad_to_align(&self) -> Layout
```

Creates a layout by rounding the size of this layout up to a multiple
of the layout's alignment.

This is equivalent to adding the result of `padding_needed_for`
to the layout's current size.

## Layout::repeat

```rust
pub const fn repeat(&self, n: usize) -> Result<(Self, usize), LayoutError>
```

Creates a layout describing the record for `n` instances of
`self`, with a suitable amount of padding between each to
ensure that each instance is given its requested size and
alignment. On success, returns `(k, offs)` where `k` is the
layout of the array and `offs` is the distance between the start
of each element in the array.

Does not include padding after the trailing element.

(That distance between elements is sometimes known as "stride".)

On arithmetic overflow, returns `LayoutError`.

# Examples

```
use std::alloc::Layout;

// All rust types have a size that's a multiple of their alignment.
let normal = Layout::from_size_align(12, 4).unwrap();
let repeated = normal.repeat(3).unwrap();
assert_eq!(repeated, (Layout::from_size_align(36, 4).unwrap(), 12));

// But you can manually make layouts which don't meet that rule.
let padding_needed = Layout::from_size_align(6, 4).unwrap();
let repeated = padding_needed.repeat(3).unwrap();
assert_eq!(repeated, (Layout::from_size_align(22, 4).unwrap(), 8));

// Repeating an element zero times has zero size, but keeps the alignment (like `[T; 0]`)
let repeated = normal.repeat(0).unwrap();
assert_eq!(repeated, (Layout::from_size_align(0, 4).unwrap(), 12));
let repeated = padding_needed.repeat(0).unwrap();
assert_eq!(repeated, (Layout::from_size_align(0, 4).unwrap(), 8));
```

## Layout::extend

```rust
pub const fn extend(&self, next: Self) -> Result<(Self, usize), LayoutError>
```

Creates a layout describing the record for `self` followed by
`next`, including any necessary padding to ensure that `next`
will be properly aligned, but *no trailing padding*.

In order to match C representation layout `repr(C)`, you should
call `pad_to_align` after extending the layout with all fields.
(There is no way to match the default Rust representation
layout `repr(Rust)`, as it is unspecified.)

Note that the alignment of the resulting layout will be the maximum of
those of `self` and `next`, in order to ensure alignment of both parts.

Returns `Ok((k, offset))`, where `k` is layout of the concatenated
record and `offset` is the relative location, in bytes, of the
start of the `next` embedded within the concatenated record
(assuming that the record itself starts at offset 0).

On arithmetic overflow, returns `LayoutError`.

# Examples

To calculate the layout of a `#[repr(C)]` structure and the offsets of
the fields from its fields' layouts:

```rust
# use std::alloc::{Layout, LayoutError};
pub fn repr_c(fields: &[Layout]) -> Result<(Layout, Vec<usize>), LayoutError> {
    let mut offsets = Vec::new();
    let mut layout = Layout::from_size_align(0, 1)?;
    for &field in fields {
        let (new_layout, offset) = layout.extend(field)?;
        layout = new_layout;
        offsets.push(offset);
    }
    // Remember to finalize with `pad_to_align`!
    Ok((layout.pad_to_align(), offsets))
}
# // test that it works
# #[repr(C)] struct S { a: u64, b: u32, c: u16, d: u32 }
# let s = Layout::new::<S>();
# let u16 = Layout::new::<u16>();
# let u32 = Layout::new::<u32>();
# let u64 = Layout::new::<u64>();
# assert_eq!(repr_c(&[u64, u32, u16, u32]), Ok((s, vec![0, 8, 12, 16])));
```

## Layout::repeat_packed

```rust
pub const fn repeat_packed(&self, n: usize) -> Result<Self, LayoutError>
```

Creates a layout describing the record for `n` instances of
`self`, with no padding between each instance.

Note that, unlike `repeat`, `repeat_packed` does not guarantee
that the repeated instances of `self` will be properly
aligned, even if a given instance of `self` is properly
aligned. In other words, if the layout returned by
`repeat_packed` is used to allocate an array, it is not
guaranteed that all elements in the array will be properly
aligned.

On arithmetic overflow, returns `LayoutError`.

## Layout::extend_packed

```rust
pub const fn extend_packed(&self, next: Self) -> Result<Self, LayoutError>
```

Creates a layout describing the record for `self` followed by
`next` with no additional padding between the two. Since no
padding is inserted, the alignment of `next` is irrelevant,
and is not incorporated *at all* into the resulting layout.

On arithmetic overflow, returns `LayoutError`.

## Layout::array

```rust
pub const fn array<T>(n: usize) -> Result<Self, LayoutError>
```

Creates a layout describing the record for a `[T; n]`.

On arithmetic overflow or when the total size would exceed
`isize::MAX`, returns `LayoutError`.

## struct LayoutError

```rust
pub struct LayoutError
```

The `LayoutError` is returned when the parameters given
to `Layout::from_size_align`
or some other `Layout` constructor
do not satisfy its documented constraints.