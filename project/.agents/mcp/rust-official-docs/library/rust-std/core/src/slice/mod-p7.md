---
title: "core::slice (part 7 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice (part 7 of 7)

## T::get_disjoint_unchecked_mut

```rust
pub unsafe fn get_disjoint_unchecked_mut<I, const N: usize>( &mut self, indices: [I; N], ) -> [&mut I::Output; N] where I: GetDisjointMutIndex + SliceIndex<Self>,
```

Returns mutable references to many indices at once, without doing any checks.

An index can be either a `usize`, a `Range` or a `RangeInclusive`. Note
that this method takes an array, so all indices must be of the same type.
If passed an array of `usize`s this method gives back an array of mutable references
to single elements, while if passed an array of ranges it gives back an array of
mutable references to slices.

For a safe alternative see `get_disjoint_mut`.

# Safety

Calling this method with overlapping or out-of-bounds indices is *[undefined behavior]*
even if the resulting references are not used.

# Examples

```rust
let x = &mut [1, 2, 4];

unsafe {
    let [a, b] = x.get_disjoint_unchecked_mut([0, 2]);
    *a *= 10;
    *b *= 100;
}
assert_eq!(x, &[10, 2, 400]);

unsafe {
    let [a, b] = x.get_disjoint_unchecked_mut([0..1, 1..3]);
    a[0] = 8;
    b[0] = 88;
    b[1] = 888;
}
assert_eq!(x, &[8, 88, 888]);

unsafe {
    let [a, b] = x.get_disjoint_unchecked_mut([1..=2, 0..=0]);
    a[0] = 11;
    a[1] = 111;
    b[0] = 1;
}
assert_eq!(x, &[1, 11, 111]);
```

## T::get_disjoint_mut

```rust
pub fn get_disjoint_mut<I, const N: usize>( &mut self, indices: [I; N], ) -> Result<[&mut I::Output; N], GetDisjointMutError> where I: GetDisjointMutIndex + SliceIndex<Self>,
```

Returns mutable references to many indices at once.

An index can be either a `usize`, a `Range` or a `RangeInclusive`. Note
that this method takes an array, so all indices must be of the same type.
If passed an array of `usize`s this method gives back an array of mutable references
to single elements, while if passed an array of ranges it gives back an array of
mutable references to slices.

Returns an error if any index is out-of-bounds, or if there are overlapping indices.
An empty range is not considered to overlap if it is located at the beginning or at
the end of another range, but is considered to overlap if it is located in the middle.

This method does a O(n^2) check to check that there are no overlapping indices, so be careful
when passing many indices.

# Examples

```rust
let v = &mut [1, 2, 3];
if let Ok([a, b]) = v.get_disjoint_mut([0, 2]) {
    *a = 413;
    *b = 612;
}
assert_eq!(v, &[413, 2, 612]);

if let Ok([a, b]) = v.get_disjoint_mut([0..1, 1..3]) {
    a[0] = 8;
    b[0] = 88;
    b[1] = 888;
}
assert_eq!(v, &[8, 88, 888]);

if let Ok([a, b]) = v.get_disjoint_mut([1..=2, 0..=0]) {
    a[0] = 11;
    a[1] = 111;
    b[0] = 1;
}
assert_eq!(v, &[1, 11, 111]);
```

## T::element_offset

```rust
pub fn element_offset(&self, element: &T) -> Option<usize>
```

Returns the index that an element reference points to.

Returns `None` if `element` does not point to the start of an element within the slice.

This method is useful for extending slice iterators like `slice::split`.

Note that this uses pointer arithmetic and **does not compare elements**.
To find the index of an element via comparison, use
`.iter().position()` instead.

# Panics
Panics if `T` is zero-sized.

# Examples
Basic usage:
```rust
let nums: &[u32] = &[1, 7, 1, 1];
let num = &nums[2];

assert_eq!(num, &1);
assert_eq!(nums.element_offset(num), Some(2));
```
Returning `None` with an unaligned element:
```rust
let arr: &[[u32; 2]] = &[[0, 1], [2, 3]];
let flat_arr: &[u32] = arr.as_flattened();

let ok_elm: &[u32; 2] = flat_arr[0..2].try_into().unwrap();
let weird_elm: &[u32; 2] = flat_arr[1..3].try_into().unwrap();

assert_eq!(ok_elm, &[0, 1]);
assert_eq!(weird_elm, &[1, 2]);

assert_eq!(arr.element_offset(ok_elm), Some(0)); // Points to element 0
assert_eq!(arr.element_offset(weird_elm), None); // Points between element 0 and 1
```

## T::subslice_range

```rust
pub fn subslice_range(&self, subslice: &[T]) -> Option<core::range::Range<usize>>
```

Returns the range of indices that a subslice points to.

Returns `None` if `subslice` does not point within the slice or if it is not aligned with the
elements in the slice.

This method **does not compare elements**. Instead, this method finds the location in the slice that
`subslice` was obtained from. To find the index of a subslice via comparison, instead use
`.windows()``.position()`.

This method is useful for extending slice iterators like `slice::split`.

Note that this may return a false positive (either `Some(0..0)` or `Some(self.len()..self.len())`)
if `subslice` has a length of zero and points to the beginning or end of another, separate, slice.

# Panics
Panics if `T` is zero-sized.

# Examples
Basic usage:
```rust
use core::range::Range;

let nums = &[0, 5, 10, 0, 0, 5];

let mut iter = nums
    .split(|t| *t == 0)
    .map(|n| nums.subslice_range(n).unwrap());

assert_eq!(iter.next(), Some(Range { start: 0, end: 0 }));
assert_eq!(iter.next(), Some(Range { start: 1, end: 3 }));
assert_eq!(iter.next(), Some(Range { start: 4, end: 4 }));
assert_eq!(iter.next(), Some(Range { start: 5, end: 6 }));
```

## T::as_flattened

```rust
pub const fn as_flattened(&self) -> &[T]
```

Takes a `&[[T; N]]`, and flattens it to a `&[T]`.

For the opposite operation, see `as_chunks` and `as_rchunks`.

# Panics

This panics if the length of the resulting slice would overflow a `usize`.

This is only possible when flattening a slice of arrays of zero-sized
types, and thus tends to be irrelevant in practice. If
`size_of::<T>() > 0`, this will never panic.

# Examples

```rust
assert_eq!([[1, 2, 3], [4, 5, 6]].as_flattened(), &[1, 2, 3, 4, 5, 6]);

assert_eq!(
    [[1, 2, 3], [4, 5, 6]].as_flattened(),
    [[1, 2], [3, 4], [5, 6]].as_flattened(),
);

let slice_of_empty_arrays: &[[i32; 0]] = &[[], [], [], [], []];
assert!(slice_of_empty_arrays.as_flattened().is_empty());

let empty_slice_of_arrays: &[[u32; 10]] = &[];
assert!(empty_slice_of_arrays.as_flattened().is_empty());
```

## T::as_flattened_mut

```rust
pub const fn as_flattened_mut(&mut self) -> &mut [T]
```

Takes a `&mut [[T; N]]`, and flattens it to a `&mut [T]`.

For the opposite operation, see `as_chunks_mut` and `as_rchunks_mut`.

# Panics

This panics if the length of the resulting slice would overflow a `usize`.

This is only possible when flattening a slice of arrays of zero-sized
types, and thus tends to be irrelevant in practice. If
`size_of::<T>() > 0`, this will never panic.

# Examples

```rust
fn add_5_to_all(slice: &mut [i32]) {
    for i in slice {
        *i += 5;
    }
}

let mut array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
add_5_to_all(array.as_flattened_mut());
assert_eq!(array, [[6, 7, 8], [9, 10, 11], [12, 13, 14]]);
```

## trait SlicePattern

```rust
pub trait SlicePattern
```

Patterns in slices - currently, only used by `strip_prefix` and `strip_suffix`.  At a future
point, we hope to generalise `core::str::Pattern` (which at the time of writing is limited to
`str`) to slices, and then this trait will be replaced or abolished.

## SlicePattern::Item

```rust
type Item
```

The element type of the slice being matched on.

## SlicePattern::as_slice

```rust
fn as_slice(&self) -> &[Self::Item]
```

Currently, the consumers of `SlicePattern` need a slice.

## enum GetDisjointMutError

```rust
pub enum GetDisjointMutError
```

The error type returned by `get_disjoint_mut``slice::get_disjoint_mut`.

It indicates one of two possible errors:
- An index is out-of-bounds.
- The same index appeared multiple times in the array
  (or different but overlapping indices when ranges are provided).

# Examples

```rust
use std::slice::GetDisjointMutError;

let v = &mut [1, 2, 3];
assert_eq!(v.get_disjoint_mut([0, 999]), Err(GetDisjointMutError::IndexOutOfBounds));
assert_eq!(v.get_disjoint_mut([1, 1]), Err(GetDisjointMutError::OverlappingIndices));
```
