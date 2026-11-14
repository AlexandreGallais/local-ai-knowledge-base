---
title: "core::slice (part 6 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice (part 6 of 7)

## T::clone_from_slice

```rust
pub const fn clone_from_slice(&mut self, src: &[T]) where T: [const] Clone + [const] Destruct,
```

Copies the elements from `src` into `self`.

The length of `src` must be the same as `self`.

# Panics

This function will panic if the two slices have different lengths.

# Examples

Cloning two elements from a slice into another:

```rust
let src = [1, 2, 3, 4];
let mut dst = [0, 0];

// Because the slices have to be the same length,
// we slice the source slice from four elements
// to two. It will panic if we don't do this.
dst.clone_from_slice(&src[2..]);

assert_eq!(src, [1, 2, 3, 4]);
assert_eq!(dst, [3, 4]);
```

Rust enforces that there can only be one mutable reference with no
immutable references to a particular piece of data in a particular
scope. Because of this, attempting to use `clone_from_slice` on a
single slice will result in a compile failure:

```rust
let mut slice = [1, 2, 3, 4, 5];

slice[..2].clone_from_slice(&slice[3..]); // compile fail!
```

To work around this, we can use `split_at_mut` to create two distinct
sub-slices from a slice:

```rust
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.clone_from_slice(&right[1..]);
}

assert_eq!(slice, [4, 5, 3, 4, 5]);
```

## T::copy_from_slice

```rust
pub const fn copy_from_slice(&mut self, src: &[T]) where T: Copy,
```

Copies all elements from `src` into `self`, using a memcpy.

The length of `src` must be the same as `self`.

If `T` does not implement `Copy`, use `clone_from_slice`.

# Panics

This function will panic if the two slices have different lengths.

# Examples

Copying two elements from a slice into another:

```rust
let src = [1, 2, 3, 4];
let mut dst = [0, 0];

// Because the slices have to be the same length,
// we slice the source slice from four elements
// to two. It will panic if we don't do this.
dst.copy_from_slice(&src[2..]);

assert_eq!(src, [1, 2, 3, 4]);
assert_eq!(dst, [3, 4]);
```

Rust enforces that there can only be one mutable reference with no
immutable references to a particular piece of data in a particular
scope. Because of this, attempting to use `copy_from_slice` on a
single slice will result in a compile failure:

```rust
let mut slice = [1, 2, 3, 4, 5];

slice[..2].copy_from_slice(&slice[3..]); // compile fail!
```

To work around this, we can use `split_at_mut` to create two distinct
sub-slices from a slice:

```rust
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.copy_from_slice(&right[1..]);
}

assert_eq!(slice, [4, 5, 3, 4, 5]);
```

## T::copy_within

```rust
pub fn copy_within<R: RangeBounds<usize>>(&mut self, src: R, dest: usize) where T: Copy,
```

Copies elements from one part of the slice to another part of itself,
using a memmove.

`src` is the range within `self` to copy from. `dest` is the starting
index of the range within `self` to copy to, which will have the same
length as `src`. The two ranges may overlap. The ends of the two ranges
must be less than or equal to `self.len()`.

# Panics

This function will panic if either range exceeds the end of the slice,
or if the end of `src` is before the start.

# Examples

Copying four bytes within a slice:

```rust
let mut bytes = *b"Hello, World!";

bytes.copy_within(1..5, 8);

assert_eq!(&bytes, b"Hello, Wello!");
```

## T::swap_with_slice

```rust
pub const fn swap_with_slice(&mut self, other: &mut [T])
```

Swaps all elements in `self` with those in `other`.

The length of `other` must be the same as `self`.

# Panics

This function will panic if the two slices have different lengths.

# Example

Swapping two elements across slices:

```rust
let mut slice1 = [0, 0];
let mut slice2 = [1, 2, 3, 4];

slice1.swap_with_slice(&mut slice2[2..]);

assert_eq!(slice1, [3, 4]);
assert_eq!(slice2, [1, 2, 0, 0]);
```

Rust enforces that there can only be one mutable reference to a
particular piece of data in a particular scope. Because of this,
attempting to use `swap_with_slice` on a single slice will result in
a compile failure:

```rust
let mut slice = [1, 2, 3, 4, 5];
slice[..2].swap_with_slice(&mut slice[3..]); // compile fail!
```

To work around this, we can use `split_at_mut` to create two distinct
mutable sub-slices from a slice:

```rust
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.swap_with_slice(&mut right[1..]);
}

assert_eq!(slice, [4, 5, 3, 1, 2]);
```

## T::align_to

```rust
pub unsafe fn align_to<U>(&self) -> (&[T], &[U], &[T])
```

Transmutes the slice to a slice of another type, ensuring alignment of the types is
maintained.

This method splits the slice into three distinct slices: prefix, correctly aligned middle
slice of a new type, and the suffix slice. The middle part will be as big as possible under
the given alignment constraint and element size.

This method has no purpose when either input element `T` or output element `U` are
zero-sized and will return the original slice without splitting anything.

# Safety

This method is essentially a `transmute` with respect to the elements in the returned
middle slice, so all the usual caveats pertaining to `transmute::<T, U>` also apply here.

# Examples

Basic usage:

```rust
unsafe {
    let bytes: [u8; 7] = [1, 2, 3, 4, 5, 6, 7];
    let (prefix, shorts, suffix) = bytes.align_to::<u16>();
    // less_efficient_algorithm_for_bytes(prefix);
    // more_efficient_algorithm_for_aligned_shorts(shorts);
    // less_efficient_algorithm_for_bytes(suffix);
}
```

## T::align_to_mut

```rust
pub unsafe fn align_to_mut<U>(&mut self) -> (&mut [T], &mut [U], &mut [T])
```

Transmutes the mutable slice to a mutable slice of another type, ensuring alignment of the
types is maintained.

This method splits the slice into three distinct slices: prefix, correctly aligned middle
slice of a new type, and the suffix slice. The middle part will be as big as possible under
the given alignment constraint and element size.

This method has no purpose when either input element `T` or output element `U` are
zero-sized and will return the original slice without splitting anything.

# Safety

This method is essentially a `transmute` with respect to the elements in the returned
middle slice, so all the usual caveats pertaining to `transmute::<T, U>` also apply here.

# Examples

Basic usage:

```rust
unsafe {
    let mut bytes: [u8; 7] = [1, 2, 3, 4, 5, 6, 7];
    let (prefix, shorts, suffix) = bytes.align_to_mut::<u16>();
    // less_efficient_algorithm_for_bytes(prefix);
    // more_efficient_algorithm_for_aligned_shorts(shorts);
    // less_efficient_algorithm_for_bytes(suffix);
}
```

## T::is_sorted

```rust
pub fn is_sorted(&self) -> bool where T: PartialOrd,
```

Checks if the elements of this slice are sorted.

That is, for each element `a` and its following element `b`, `a <= b` must hold. If the
slice yields exactly zero or one element, `true` is returned.

Note that if `Self::Item` is only `PartialOrd`, but not `Ord`, the above definition
implies that this function returns `false` if any two consecutive items are not
comparable.

# Examples

```rust
let empty: [i32; 0] = [];

assert!([1, 2, 2, 9].is_sorted());
assert!(![1, 3, 2, 4].is_sorted());
assert!([0].is_sorted());
assert!(empty.is_sorted());
assert!(![0.0, 1.0, f32::NAN].is_sorted());
```

## T::is_sorted_by

```rust
pub fn is_sorted_by<'a, F>(&'a self, mut compare: F) -> bool where F: FnMut(&'a T, &'a T) -> bool,
```

Checks if the elements of this slice are sorted using the given comparator function.

Instead of using `PartialOrd::partial_cmp`, this function uses the given `compare`
function to determine whether two elements are to be considered in sorted order.

# Examples

```rust
assert!([1, 2, 2, 9].is_sorted_by(|a, b| a <= b));
assert!(![1, 2, 2, 9].is_sorted_by(|a, b| a < b));

assert!([0].is_sorted_by(|a, b| true));
assert!([0].is_sorted_by(|a, b| false));

let empty: [i32; 0] = [];
assert!(empty.is_sorted_by(|a, b| false));
assert!(empty.is_sorted_by(|a, b| true));
```

## T::is_sorted_by_key

```rust
pub fn is_sorted_by_key<'a, F, K>(&'a self, f: F) -> bool where F: FnMut(&'a T) -> K, K: PartialOrd,
```

Checks if the elements of this slice are sorted using the given key <example-value> function.

Instead of comparing the slice's elements directly, this function compares the keys of the
elements, as determined by `f`. Apart from that, it's equivalent to `is_sorted`; see its
documentation for more information.

# Examples

```rust
assert!(["c", "bb", "aaa"].is_sorted_by_key(|s| s.len()));
assert!(![-2i32, -1, 0, 3].is_sorted_by_key(|n| n.abs()));
```

## T::partition_point

```rust
pub const fn partition_point<P>(&self, mut pred: P) -> usize where P: [const] FnMut(&T) -> bool + [const] Destruct,
```

Returns the index of the partition point according to the given predicate
(the index of the first element of the second partition).

The slice is assumed to be partitioned according to the given predicate.
This means that all elements for which the predicate returns true are at the start of the slice
and all elements for which the predicate returns false are at the end.
For example, `[7, 15, 3, 5, 4, 12, 6]` is partitioned under the predicate `x % 2 != 0`
(all odd numbers are at the start, all even at the end).

If this slice is not partitioned, the returned result is unspecified and meaningless,
as this method performs a kind of binary search.

See also `binary_search`, `binary_search_by`, and `binary_search_by_key`.

# Examples

```rust
let v = [1, 2, 3, 3, 5, 6, 7];
let i = v.partition_point(|&x| x < 5);

assert_eq!(i, 4);
assert!(v[..i].iter().all(|&x| x < 5));
assert!(v[i..].iter().all(|&x| !(x < 5)));
```

If all elements of the slice match the predicate, including if the slice
is empty, then the length of the slice will be returned:

```rust
let a = [2, 4, 8];
assert_eq!(a.partition_point(|x| x < &100), a.len());
let a: [i32; 0] = [];
assert_eq!(a.partition_point(|x| x < &100), 0);
```

If you want to insert an item to a sorted vector, while maintaining
sort order:

```rust
let mut s = vec![0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
let num = 42;
let idx = s.partition_point(|&x| x <= num);
s.insert(idx, num);
assert_eq!(s, [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 42, 55]);
```

## T::split_off

```rust
pub fn split_off<'a, R: OneSidedRange<usize>>( self: &mut &'a Self, range: R, ) -> Option<&'a Self>
```

Removes the subslice corresponding to the given range
and returns a reference to it.

Returns `None` and does not modify the slice if the given
range is out of bounds.

Note that this method only accepts one-sided ranges such as
`2..` or `..6`, but not `2..6`.

# Examples

Splitting off the first three elements of a slice:

```rust
let mut slice: &[_] = &['a', 'b', 'c', 'd'];
let mut first_three = slice.split_off(..3).unwrap();

assert_eq!(slice, &['d']);
assert_eq!(first_three, &['a', 'b', 'c']);
```

Splitting off a slice starting with the third element:

```rust
let mut slice: &[_] = &['a', 'b', 'c', 'd'];
let mut tail = slice.split_off(2..).unwrap();

assert_eq!(slice, &['a', 'b']);
assert_eq!(tail, &['c', 'd']);
```

Getting `None` when `range` is out of bounds:

```rust
let mut slice: &[_] = &['a', 'b', 'c', 'd'];

assert_eq!(None, slice.split_off(5..));
assert_eq!(None, slice.split_off(..5));
assert_eq!(None, slice.split_off(..=4));
let expected: &[char] = &['a', 'b', 'c', 'd'];
assert_eq!(Some(expected), slice.split_off(..4));
```

## T::split_off_mut

```rust
pub fn split_off_mut<'a, R: OneSidedRange<usize>>( self: &mut &'a mut Self, range: R, ) -> Option<&'a mut Self>
```

Removes the subslice corresponding to the given range
and returns a mutable reference to it.

Returns `None` and does not modify the slice if the given
range is out of bounds.

Note that this method only accepts one-sided ranges such as
`2..` or `..6`, but not `2..6`.

# Examples

Splitting off the first three elements of a slice:

```rust
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];
let mut first_three = slice.split_off_mut(..3).unwrap();

assert_eq!(slice, &mut ['d']);
assert_eq!(first_three, &mut ['a', 'b', 'c']);
```

Splitting off a slice starting with the third element:

```rust
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];
let mut tail = slice.split_off_mut(2..).unwrap();

assert_eq!(slice, &mut ['a', 'b']);
assert_eq!(tail, &mut ['c', 'd']);
```

Getting `None` when `range` is out of bounds:

```rust
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];

assert_eq!(None, slice.split_off_mut(5..));
assert_eq!(None, slice.split_off_mut(..5));
assert_eq!(None, slice.split_off_mut(..=4));
let expected: &mut [_] = &mut ['a', 'b', 'c', 'd'];
assert_eq!(Some(expected), slice.split_off_mut(..4));
```

## T::split_off_first

```rust
pub const fn split_off_first<'a>(self: &mut &'a Self) -> Option<&'a T>
```

Removes the first element of the slice and returns a reference
to it.

Returns `None` if the slice is empty.

# Examples

```rust
let mut slice: &[_] = &['a', 'b', 'c'];
let first = slice.split_off_first().unwrap();

assert_eq!(slice, &['b', 'c']);
assert_eq!(first, &'a');
```

## T::split_off_first_mut

```rust
pub const fn split_off_first_mut<'a>(self: &mut &'a mut Self) -> Option<&'a mut T>
```

Removes the first element of the slice and returns a mutable
reference to it.

Returns `None` if the slice is empty.

# Examples

```rust
let mut slice: &mut [_] = &mut ['a', 'b', 'c'];
let first = slice.split_off_first_mut().unwrap();
*first = 'd';

assert_eq!(slice, &['b', 'c']);
assert_eq!(first, &'d');
```

## T::split_off_last

```rust
pub const fn split_off_last<'a>(self: &mut &'a Self) -> Option<&'a T>
```

Removes the last element of the slice and returns a reference
to it.

Returns `None` if the slice is empty.

# Examples

```rust
let mut slice: &[_] = &['a', 'b', 'c'];
let last = slice.split_off_last().unwrap();

assert_eq!(slice, &['a', 'b']);
assert_eq!(last, &'c');
```

## T::split_off_last_mut

```rust
pub const fn split_off_last_mut<'a>(self: &mut &'a mut Self) -> Option<&'a mut T>
```

Removes the last element of the slice and returns a mutable
reference to it.

Returns `None` if the slice is empty.

# Examples

```rust
let mut slice: &mut [_] = &mut ['a', 'b', 'c'];
let last = slice.split_off_last_mut().unwrap();
*last = 'd';

assert_eq!(slice, &['a', 'b']);
assert_eq!(last, &'d');
```
