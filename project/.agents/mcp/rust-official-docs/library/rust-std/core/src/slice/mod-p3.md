---
title: "core::slice (part 3 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice (part 3 of 7)

## T::rchunks_mut

```rust
pub const fn rchunks_mut(&mut self, chunk_size: usize) -> RChunksMut<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end
of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the
length of the slice, then the last chunk will not have length `chunk_size`.

See `rchunks_exact_mut` for a variant of this iterator that returns chunks of always
exactly `chunk_size` elements, and `chunks_mut` for the same iterator but starting at the
beginning of the slice.

If your `chunk_size` is a constant, consider using `as_rchunks_mut` instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```rust
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

for chunk in v.rchunks_mut(2) {
    for elem in chunk.iter_mut() {
        *elem += count;
    }
    count += 1;
}
assert_eq!(v, &[3, 2, 2, 1, 1]);
```

## T::rchunks_exact

```rust
pub const fn rchunks_exact(&self, chunk_size: usize) -> RChunksExact<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the
end of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the
slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved
from the `remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the
resulting code better than in the case of `rchunks`.

See `rchunks` for a variant of this iterator that also returns the remainder as a smaller
chunk, and `chunks_exact` for the same iterator but starting at the beginning of the
slice.

If your `chunk_size` is a constant, consider using `as_rchunks` instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks_exact(2);
assert_eq!(iter.next().unwrap(), &['e', 'm']);
assert_eq!(iter.next().unwrap(), &['o', 'r']);
assert!(iter.next().is_none());
assert_eq!(iter.remainder(), &['l']);
```

## T::rchunks_exact_mut

```rust
pub const fn rchunks_exact_mut(&mut self, chunk_size: usize) -> RChunksExactMut<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end
of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the
length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be
retrieved from the `into_remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the
resulting code better than in the case of `chunks_mut`.

See `rchunks_mut` for a variant of this iterator that also returns the remainder as a
smaller chunk, and `chunks_exact_mut` for the same iterator but starting at the beginning
of the slice.

If your `chunk_size` is a constant, consider using `as_rchunks_mut` instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```rust
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

for chunk in v.rchunks_exact_mut(2) {
    for elem in chunk.iter_mut() {
        *elem += count;
    }
    count += 1;
}
assert_eq!(v, &[0, 2, 2, 1, 1]);
```

## T::chunk_by

```rust
pub const fn chunk_by<F>(&self, pred: F) -> ChunkBy<'_, T, F> where F: FnMut(&T, &T) -> bool,
```

Returns an iterator over the slice producing non-overlapping runs
of elements using the predicate to separate them.

The predicate is called for every pair of consecutive elements,
meaning that it is called on `slice[0]` and `slice[1]`,
followed by `slice[1]` and `slice[2]`, and so on.

# Examples

```rust
let slice = &[1, 1, 1, 3, 3, 2, 2, 2];

let mut iter = slice.chunk_by(|a, b| a == b);

assert_eq!(iter.next(), Some(&[1, 1, 1][..]));
assert_eq!(iter.next(), Some(&[3, 3][..]));
assert_eq!(iter.next(), Some(&[2, 2, 2][..]));
assert_eq!(iter.next(), None);
```

This method can be used to extract the sorted subslices:

```rust
let slice = &[1, 1, 2, 3, 2, 3, 2, 3, 4];

let mut iter = slice.chunk_by(|a, b| a <= b);

assert_eq!(iter.next(), Some(&[1, 1, 2, 3][..]));
assert_eq!(iter.next(), Some(&[2, 3][..]));
assert_eq!(iter.next(), Some(&[2, 3, 4][..]));
assert_eq!(iter.next(), None);
```

## T::chunk_by_mut

```rust
pub const fn chunk_by_mut<F>(&mut self, pred: F) -> ChunkByMut<'_, T, F> where F: FnMut(&T, &T) -> bool,
```

Returns an iterator over the slice producing non-overlapping mutable
runs of elements using the predicate to separate them.

The predicate is called for every pair of consecutive elements,
meaning that it is called on `slice[0]` and `slice[1]`,
followed by `slice[1]` and `slice[2]`, and so on.

# Examples

```rust
let slice = &mut [1, 1, 1, 3, 3, 2, 2, 2];

let mut iter = slice.chunk_by_mut(|a, b| a == b);

assert_eq!(iter.next(), Some(&mut [1, 1, 1][..]));
assert_eq!(iter.next(), Some(&mut [3, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 2, 2][..]));
assert_eq!(iter.next(), None);
```

This method can be used to extract the sorted subslices:

```rust
let slice = &mut [1, 1, 2, 3, 2, 3, 2, 3, 4];

let mut iter = slice.chunk_by_mut(|a, b| a <= b);

assert_eq!(iter.next(), Some(&mut [1, 1, 2, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 3, 4][..]));
assert_eq!(iter.next(), None);
```

## T::split_at

```rust
pub const fn split_at(&self, mid: usize) -> (&[T], &[T])
```

Divides one slice into two at an index.

The first will contain all indices from `[0, mid)` (excluding
the index `mid` itself) and the second will contain all
indices from `[mid, len)` (excluding the index `len` itself).

# Panics

Panics if `mid > len`.  For a non-panicking alternative see
`split_at_checked`.

# Examples

```rust
let v = ['a', 'b', 'c'];

{
   let (left, right) = v.split_at(0);
   assert_eq!(left, []);
   assert_eq!(right, ['a', 'b', 'c']);
}

{
    let (left, right) = v.split_at(2);
    assert_eq!(left, ['a', 'b']);
    assert_eq!(right, ['c']);
}

{
    let (left, right) = v.split_at(3);
    assert_eq!(left, ['a', 'b', 'c']);
    assert_eq!(right, []);
}
```

## T::split_at_mut

```rust
pub const fn split_at_mut(&mut self, mid: usize) -> (&mut [T], &mut [T])
```

Divides one mutable slice into two at an index.

The first will contain all indices from `[0, mid)` (excluding
the index `mid` itself) and the second will contain all
indices from `[mid, len)` (excluding the index `len` itself).

# Panics

Panics if `mid > len`.  For a non-panicking alternative see
`split_at_mut_checked`.

# Examples

```rust
let mut v = [1, 0, 3, 0, 5, 6];
let (left, right) = v.split_at_mut(2);
assert_eq!(left, [1, 0]);
assert_eq!(right, [3, 0, 5, 6]);
left[1] = 2;
right[1] = 4;
assert_eq!(v, [1, 2, 3, 4, 5, 6]);
```

## T::split_at_unchecked

```rust
pub const unsafe fn split_at_unchecked(&self, mid: usize) -> (&[T], &[T])
```

Divides one slice into two at an index, without doing bounds checking.

The first will contain all indices from `[0, mid)` (excluding
the index `mid` itself) and the second will contain all
indices from `[mid, len)` (excluding the index `len` itself).

For a safe alternative see `split_at`.

# Safety

Calling this method with an out-of-bounds index is *[undefined behavior]*
even if the resulting reference is not used. The caller has to ensure that
`0 <= mid <= self.len()`.

# Examples

```rust
let v = ['a', 'b', 'c'];

unsafe {
   let (left, right) = v.split_at_unchecked(0);
   assert_eq!(left, []);
   assert_eq!(right, ['a', 'b', 'c']);
}

unsafe {
    let (left, right) = v.split_at_unchecked(2);
    assert_eq!(left, ['a', 'b']);
    assert_eq!(right, ['c']);
}

unsafe {
    let (left, right) = v.split_at_unchecked(3);
    assert_eq!(left, ['a', 'b', 'c']);
    assert_eq!(right, []);
}
```

## T::split_at_mut_unchecked

```rust
pub const unsafe fn split_at_mut_unchecked(&mut self, mid: usize) -> (&mut [T], &mut [T])
```

Divides one mutable slice into two at an index, without doing bounds checking.

The first will contain all indices from `[0, mid)` (excluding
the index `mid` itself) and the second will contain all
indices from `[mid, len)` (excluding the index `len` itself).

For a safe alternative see `split_at_mut`.

# Safety

Calling this method with an out-of-bounds index is *[undefined behavior]*
even if the resulting reference is not used. The caller has to ensure that
`0 <= mid <= self.len()`.

# Examples

```rust
let mut v = [1, 0, 3, 0, 5, 6];
// scoped to restrict the lifetime of the borrows
unsafe {
    let (left, right) = v.split_at_mut_unchecked(2);
    assert_eq!(left, [1, 0]);
    assert_eq!(right, [3, 0, 5, 6]);
    left[1] = 2;
    right[1] = 4;
}
assert_eq!(v, [1, 2, 3, 4, 5, 6]);
```

## T::split_at_checked

```rust
pub const fn split_at_checked(&self, mid: usize) -> Option<(&[T], &[T])>
```

Divides one slice into two at an index, returning `None` if the slice is
too short.

If `mid ≤ len` returns a pair of slices where the first will contain all
indices from `[0, mid)` (excluding the index `mid` itself) and the
second will contain all indices from `[mid, len)` (excluding the index
`len` itself).

Otherwise, if `mid > len`, returns `None`.

# Examples

```rust
let v = [1, -2, 3, -4, 5, -6];

{
   let (left, right) = v.split_at_checked(0).unwrap();
   assert_eq!(left, []);
   assert_eq!(right, [1, -2, 3, -4, 5, -6]);
}

{
    let (left, right) = v.split_at_checked(2).unwrap();
    assert_eq!(left, [1, -2]);
    assert_eq!(right, [3, -4, 5, -6]);
}

{
    let (left, right) = v.split_at_checked(6).unwrap();
    assert_eq!(left, [1, -2, 3, -4, 5, -6]);
    assert_eq!(right, []);
}

assert_eq!(None, v.split_at_checked(7));
```

## T::split_at_mut_checked

```rust
pub const fn split_at_mut_checked(&mut self, mid: usize) -> Option<(&mut [T], &mut [T])>
```

Divides one mutable slice into two at an index, returning `None` if the
slice is too short.

If `mid ≤ len` returns a pair of slices where the first will contain all
indices from `[0, mid)` (excluding the index `mid` itself) and the
second will contain all indices from `[mid, len)` (excluding the index
`len` itself).

Otherwise, if `mid > len`, returns `None`.

# Examples

```rust
let mut v = [1, 0, 3, 0, 5, 6];

if let Some((left, right)) = v.split_at_mut_checked(2) {
    assert_eq!(left, [1, 0]);
    assert_eq!(right, [3, 0, 5, 6]);
    left[1] = 2;
    right[1] = 4;
}
assert_eq!(v, [1, 2, 3, 4, 5, 6]);

assert_eq!(None, v.split_at_mut_checked(7));
```

## T::split

```rust
pub fn split<F>(&self, pred: F) -> Split<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over subslices separated by elements that match
`pred`. The matched element is not contained in the subslices.

# Examples

```rust
let slice = [10, 40, 33, 20];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

If the first element is matched, an empty slice will be the first item
returned by the iterator. Similarly, if the last element in the slice
is matched, an empty slice will be the last item returned by the
iterator:

```rust
let slice = [10, 40, 33];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40]);
assert_eq!(iter.next().unwrap(), &[]);
assert!(iter.next().is_none());
```

If two matched elements are directly adjacent, an empty slice will be
present between them:

```rust
let slice = [10, 6, 33, 20];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10]);
assert_eq!(iter.next().unwrap(), &[]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

## T::split_mut

```rust
pub fn split_mut<F>(&mut self, pred: F) -> SplitMut<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over mutable subslices separated by elements that
match `pred`. The matched element is not contained in the subslices.

# Examples

```rust
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.split_mut(|num| *num % 3 == 0) {
    group[0] = 1;
}
assert_eq!(v, [1, 40, 30, 1, 60, 1]);
```

## T::split_inclusive

```rust
pub fn split_inclusive<F>(&self, pred: F) -> SplitInclusive<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over subslices separated by elements that match
`pred`. The matched element is contained in the end of the previous
subslice as a terminator.

# Examples

```rust
let slice = [10, 40, 33, 20];
let mut iter = slice.split_inclusive(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40, 33]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

If the last element of the slice is matched,
that element will be considered the terminator of the preceding slice.
That slice will be the last item returned by the iterator.

```rust
let slice = [3, 10, 40, 33];
let mut iter = slice.split_inclusive(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[3]);
assert_eq!(iter.next().unwrap(), &[10, 40, 33]);
assert!(iter.next().is_none());
```

## T::split_inclusive_mut

```rust
pub fn split_inclusive_mut<F>(&mut self, pred: F) -> SplitInclusiveMut<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over mutable subslices separated by elements that
match `pred`. The matched element is contained in the previous
subslice as a terminator.

# Examples

```rust
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.split_inclusive_mut(|num| *num % 3 == 0) {
    let terminator_idx = group.len()-1;
    group[terminator_idx] = 1;
}
assert_eq!(v, [10, 40, 1, 20, 1, 1]);
```

## T::rsplit

```rust
pub fn rsplit<F>(&self, pred: F) -> RSplit<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over subslices separated by elements that match
`pred`, starting at the end of the slice and working backwards.
The matched element is not contained in the subslices.

# Examples

```rust
let slice = [11, 22, 33, 0, 44, 55];
let mut iter = slice.rsplit(|num| *num == 0);

assert_eq!(iter.next().unwrap(), &[44, 55]);
assert_eq!(iter.next().unwrap(), &[11, 22, 33]);
assert_eq!(iter.next(), None);
```

As with `split()`, if the first or last element is matched, an empty
slice will be the first (or last) item returned by the iterator.

```rust
let v = &[0, 1, 1, 2, 3, 5, 8];
let mut it = v.rsplit(|n| *n % 2 == 0);
assert_eq!(it.next().unwrap(), &[]);
assert_eq!(it.next().unwrap(), &[3, 5]);
assert_eq!(it.next().unwrap(), &[1, 1]);
assert_eq!(it.next().unwrap(), &[]);
assert_eq!(it.next(), None);
```
