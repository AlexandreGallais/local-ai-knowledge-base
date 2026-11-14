---
title: "core::slice::iter (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/iter.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice::iter

Definitions of a bunch of iterators for `[T]`.

## struct Iter

```rust
pub struct Iter<'a, T: 'a>
```

Immutable slice iterator

This struct is created by the `iter` method on [slices].

# Examples

Basic usage:

```rust
// First, we need a slice to call the `iter` method on:
let slice = &[1, 2, 3];

// Then we call `iter` on the slice to get the `Iter` iterator,
// and iterate over it:
for element in slice.iter() {
    println!("{element}");
}

// This for loop actually already works without calling `iter`:
for element in slice {
    println!("{element}");
}
```

## Iter::as_slice

```rust
pub fn as_slice(&self) -> &'a [T]
```

Views the underlying data as a subslice of the original data.

# Examples

Basic usage:

```rust
// First, we need a slice to call the `iter` method on:
let slice = &[1, 2, 3];

// Then we call `iter` on the slice to get the `Iter` iterator:
let mut iter = slice.iter();
// Here `as_slice` still returns the whole slice, so this prints "[1, 2, 3]":
println!("{:?}", iter.as_slice());

// Now, we call the `next` method to remove the first element from the iterator:
iter.next();
// Here the iterator does not contain the first element of the slice any more,
// so `as_slice` only returns the last two elements of the slice,
// and so this prints "[2, 3]":
println!("{:?}", iter.as_slice());

// The underlying slice has not been modified and still contains three elements,
// so this prints "[1, 2, 3]":
println!("{:?}", slice);
```

## struct IterMut

```rust
pub struct IterMut<'a, T: 'a>
```

Mutable slice iterator.

This struct is created by the `iter_mut` method on [slices].

# Examples

Basic usage:

```rust
// First, we need a slice to call the `iter_mut` method on:
let slice = &mut [1, 2, 3];

// Then we call `iter_mut` on the slice to get the `IterMut` iterator,
// iterate over it and increment each element value:
for element in slice.iter_mut() {
    *element += 1;
}

// We now have "[2, 3, 4]":
println!("{slice:?}");
```

## IterMut::into_slice

```rust
pub fn into_slice(self) -> &'a mut [T]
```

Views the underlying data as a subslice of the original data.

To avoid creating `&mut` references that alias, this is forced
to consume the iterator.

# Examples

Basic usage:

```rust
// First, we need a slice to call the `iter_mut` method on:
let mut slice = &mut [1, 2, 3];

// Then we call `iter_mut` on the slice to get the `IterMut` struct:
let mut iter = slice.iter_mut();
// Now, we call the `next` method to remove the first element of the iterator,
// unwrap and dereference what we get from `next` and increase its value by 1:
*iter.next().unwrap() += 1;
// Here the iterator does not contain the first element of the slice any more,
// so `into_slice` only returns the last two elements of the slice,
// and so this prints "[2, 3]":
println!("{:?}", iter.into_slice());
// The underlying slice still contains three elements, but its first element
// was increased by 1, so this prints "[2, 2, 3]":
println!("{:?}", slice);
```

## IterMut::as_slice

```rust
pub fn as_slice(&self) -> &[T]
```

Views the underlying data as a subslice of the original data.

# Examples

Basic usage:

```rust
// First, we need a slice to call the `iter_mut` method on:
let slice = &mut [1, 2, 3];

// Then we call `iter_mut` on the slice to get the `IterMut` iterator:
let mut iter = slice.iter_mut();
// Here `as_slice` still returns the whole slice, so this prints "[1, 2, 3]":
println!("{:?}", iter.as_slice());

// Now, we call the `next` method to remove the first element from the iterator
// and increment its value:
*iter.next().unwrap() += 1;
// Here the iterator does not contain the first element of the slice any more,
// so `as_slice` only returns the last two elements of the slice,
// and so this prints "[2, 3]":
println!("{:?}", iter.as_slice());

// The underlying slice still contains three elements, but its first element
// was increased by 1, so this prints "[2, 2, 3]":
println!("{:?}", slice);
```

## struct Split

```rust
pub struct Split<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over subslices separated by elements that match a predicate
function.

This struct is created by the `split` method on [slices].

# Example

```rust
let slice = [10, 40, 33, 20];
let mut iter = slice.split(|num| num % 3 == 0);
assert_eq!(iter.next(), Some(&[10, 40][..]));
assert_eq!(iter.next(), Some(&[20][..]));
assert_eq!(iter.next(), None);
```

## ::SplitInclusive

```rust
pub struct SplitInclusive<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over subslices separated by elements that match a predicate
function. Unlike `Split`, it contains the matched part as a terminator
of the subslice.

This struct is created by the `split_inclusive` method on [slices].

# Example

```rust
let slice = [10, 40, 33, 20];
let mut iter = slice.split_inclusive(|num| num % 3 == 0);
assert_eq!(iter.next(), Some(&[10, 40, 33][..]));
assert_eq!(iter.next(), Some(&[20][..]));
assert_eq!(iter.next(), None);
```

## ::SplitMut

```rust
pub struct SplitMut<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over the mutable subslices of the vector which are separated
by elements that match `pred`.

This struct is created by the `split_mut` method on [slices].

# Example

```rust
let mut v = [10, 40, 30, 20, 60, 50];
let iter = v.split_mut(|num| *num % 3 == 0);
```

## ::SplitInclusiveMut

```rust
pub struct SplitInclusiveMut<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over the mutable subslices of the vector which are separated
by elements that match `pred`. Unlike `SplitMut`, it contains the matched
parts in the ends of the subslices.

This struct is created by the `split_inclusive_mut` method on [slices].

# Example

```rust
let mut v = [10, 40, 30, 20, 60, 50];
let iter = v.split_inclusive_mut(|num| *num % 3 == 0);
```

## ::RSplit

```rust
pub struct RSplit<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over subslices separated by elements that match a predicate
function, starting from the end of the slice.

This struct is created by the `rsplit` method on [slices].

# Example

```rust
let slice = [11, 22, 33, 0, 44, 55];
let mut iter = slice.rsplit(|num| *num == 0);
assert_eq!(iter.next(), Some(&[44, 55][..]));
assert_eq!(iter.next(), Some(&[11, 22, 33][..]));
assert_eq!(iter.next(), None);
```

## ::RSplitMut

```rust
pub struct RSplitMut<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over the subslices of the vector which are separated
by elements that match `pred`, starting from the end of the slice.

This struct is created by the `rsplit_mut` method on [slices].

# Example

```rust
let mut slice = [11, 22, 33, 0, 44, 55];
let iter = slice.rsplit_mut(|num| *num == 0);
```

## struct SplitN

```rust
pub struct SplitN<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over subslices separated by elements that match a predicate
function, limited to a given number of splits.

This struct is created by the `splitn` method on [slices].

# Example

```rust
let slice = [10, 40, 30, 20, 60, 50];
let mut iter = slice.splitn(2, |num| *num % 3 == 0);
assert_eq!(iter.next(), Some(&[10, 40][..]));
assert_eq!(iter.next(), Some(&[20, 60, 50][..]));
assert_eq!(iter.next(), None);
```

## struct RSplitN

```rust
pub struct RSplitN<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over subslices separated by elements that match a
predicate function, limited to a given number of splits, starting
from the end of the slice.

This struct is created by the `rsplitn` method on [slices].

# Example

```rust
let slice = [10, 40, 30, 20, 60, 50];
let mut iter = slice.rsplitn(2, |num| *num % 3 == 0);
assert_eq!(iter.next(), Some(&[50][..]));
assert_eq!(iter.next(), Some(&[10, 40, 30, 20][..]));
assert_eq!(iter.next(), None);
```

## struct SplitNMut

```rust
pub struct SplitNMut<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over subslices separated by elements that match a predicate
function, limited to a given number of splits.

This struct is created by the `splitn_mut` method on [slices].

# Example

```rust
let mut slice = [10, 40, 30, 20, 60, 50];
let iter = slice.splitn_mut(2, |num| *num % 3 == 0);
```

## struct RSplitNMut

```rust
pub struct RSplitNMut<'a, T: 'a, P> where P: FnMut(&T) -> bool,
```

An iterator over subslices separated by elements that match a
predicate function, limited to a given number of splits, starting
from the end of the slice.

This struct is created by the `rsplitn_mut` method on [slices].

# Example

```rust
let mut slice = [10, 40, 30, 20, 60, 50];
let iter = slice.rsplitn_mut(2, |num| *num % 3 == 0);
```

## struct Windows

```rust
pub struct Windows<'a, T: 'a>
```

An iterator over overlapping subslices of length `size`.

This struct is created by the `windows` method on [slices].

# Example

```rust
let slice = ['r', 'u', 's', 't'];
let mut iter = slice.windows(2);
assert_eq!(iter.next(), Some(&['r', 'u'][..]));
assert_eq!(iter.next(), Some(&['u', 's'][..]));
assert_eq!(iter.next(), Some(&['s', 't'][..]));
assert_eq!(iter.next(), None);
```

## struct Chunks

```rust
pub struct Chunks<'a, T: 'a>
```

An iterator over a slice in (non-overlapping) chunks (`chunk_size` elements at a
time), starting at the beginning of the slice.

When the slice len is not evenly divided by the chunk size, the last slice
of the iteration will be the remainder.

This struct is created by the `chunks` method on [slices].

# Example

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks(2);
assert_eq!(iter.next(), Some(&['l', 'o'][..]));
assert_eq!(iter.next(), Some(&['r', 'e'][..]));
assert_eq!(iter.next(), Some(&['m'][..]));
assert_eq!(iter.next(), None);
```

## struct ChunksMut

```rust
pub struct ChunksMut<'a, T: 'a>
```

An iterator over a slice in (non-overlapping) mutable chunks (`chunk_size`
elements at a time), starting at the beginning of the slice.

When the slice len is not evenly divided by the chunk size, the last slice
of the iteration will be the remainder.

This struct is created by the `chunks_mut` method on [slices].

# Example

```rust
let mut slice = ['l', 'o', 'r', 'e', 'm'];
let iter = slice.chunks_mut(2);
```

## ::ChunksExact

```rust
pub struct ChunksExact<'a, T: 'a>
```

An iterator over a slice in (non-overlapping) chunks (`chunk_size` elements at a
time), starting at the beginning of the slice.

When the slice len is not evenly divided by the chunk size, the last
up to `chunk_size-1` elements will be omitted but can be retrieved from
the `remainder` function from the iterator.

This struct is created by the `chunks_exact` method on [slices].

# Example

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks_exact(2);
assert_eq!(iter.next(), Some(&['l', 'o'][..]));
assert_eq!(iter.next(), Some(&['r', 'e'][..]));
assert_eq!(iter.next(), None);
```

## ChunksExact::remainder

```rust
pub fn remainder(&self) -> &'a [T]
```

Returns the remainder of the original slice that is not going to be
returned by the iterator. The returned slice has at most `chunk_size-1`
elements.

# Example

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks_exact(2);
assert_eq!(iter.remainder(), &['m'][..]);
assert_eq!(iter.next(), Some(&['l', 'o'][..]));
assert_eq!(iter.remainder(), &['m'][..]);
assert_eq!(iter.next(), Some(&['r', 'e'][..]));
assert_eq!(iter.remainder(), &['m'][..]);
assert_eq!(iter.next(), None);
assert_eq!(iter.remainder(), &['m'][..]);
```

## struct ChunksExactMut

```rust
pub struct ChunksExactMut<'a, T: 'a>
```

An iterator over a slice in (non-overlapping) mutable chunks (`chunk_size`
elements at a time), starting at the beginning of the slice.

When the slice len is not evenly divided by the chunk size, the last up to
`chunk_size-1` elements will be omitted but can be retrieved from the
`into_remainder` function from the iterator.

This struct is created by the `chunks_exact_mut` method on [slices].

# Example

```rust
let mut slice = ['l', 'o', 'r', 'e', 'm'];
let iter = slice.chunks_exact_mut(2);
```

## ChunksExactMut::into_remainder

```rust
pub fn into_remainder(self) -> &'a mut [T]
```

Returns the remainder of the original slice that is not going to be
returned by the iterator. The returned slice has at most `chunk_size-1`
elements.

## ::ArrayWindows

```rust
pub struct ArrayWindows<'a, T: 'a, const N: usize>
```

A windowed iterator over a slice in overlapping chunks (`N` elements at a
time), starting at the beginning of the slice

This struct is created by the `array_windows` method on [slices].

# Example

```rust
let slice = [0, 1, 2, 3];
let mut iter = slice.array_windows::<2>();
assert_eq!(iter.next(), Some(&[0, 1]));
assert_eq!(iter.next(), Some(&[1, 2]));
assert_eq!(iter.next(), Some(&[2, 3]));
assert_eq!(iter.next(), None);
```

## struct RChunks

```rust
pub struct RChunks<'a, T: 'a>
```

An iterator over a slice in (non-overlapping) chunks (`chunk_size` elements at a
time), starting at the end of the slice.

When the slice len is not evenly divided by the chunk size, the last slice
of the iteration will be the remainder.

This struct is created by the `rchunks` method on [slices].

# Example

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks(2);
assert_eq!(iter.next(), Some(&['e', 'm'][..]));
assert_eq!(iter.next(), Some(&['o', 'r'][..]));
assert_eq!(iter.next(), Some(&['l'][..]));
assert_eq!(iter.next(), None);
```

## struct RChunksMut

```rust
pub struct RChunksMut<'a, T: 'a>
```

An iterator over a slice in (non-overlapping) mutable chunks (`chunk_size`
elements at a time), starting at the end of the slice.

When the slice len is not evenly divided by the chunk size, the last slice
of the iteration will be the remainder.

This struct is created by the `rchunks_mut` method on [slices].

# Example

```rust
let mut slice = ['l', 'o', 'r', 'e', 'm'];
let iter = slice.rchunks_mut(2);
```

## ::RChunksExact

```rust
pub struct RChunksExact<'a, T: 'a>
```

An iterator over a slice in (non-overlapping) chunks (`chunk_size` elements at a
time), starting at the end of the slice.

When the slice len is not evenly divided by the chunk size, the last
up to `chunk_size-1` elements will be omitted but can be retrieved from
the `remainder` function from the iterator.

This struct is created by the `rchunks_exact` method on [slices].

# Example

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks_exact(2);
assert_eq!(iter.next(), Some(&['e', 'm'][..]));
assert_eq!(iter.next(), Some(&['o', 'r'][..]));
assert_eq!(iter.next(), None);
```
