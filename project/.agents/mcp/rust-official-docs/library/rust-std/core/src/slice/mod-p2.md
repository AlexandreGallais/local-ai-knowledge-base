---
title: "core::slice (part 2 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice (part 2 of 7)

## T::windows

```rust
pub const fn windows(&self, size: usize) -> Windows<'_, T>
```

Returns an iterator over all contiguous windows of length
`size`. The windows overlap. If the slice is shorter than
`size`, the iterator returns no values.

# Panics

Panics if `size` is zero.

# Examples

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.windows(3);
assert_eq!(iter.next().unwrap(), &['l', 'o', 'r']);
assert_eq!(iter.next().unwrap(), &['o', 'r', 'e']);
assert_eq!(iter.next().unwrap(), &['r', 'e', 'm']);
assert!(iter.next().is_none());
```

If the slice is shorter than `size`:

```rust
let slice = ['f', 'o', 'o'];
let mut iter = slice.windows(4);
assert!(iter.next().is_none());
```

Because the [Iterator] trait cannot represent the required lifetimes,
there is no `windows_mut` analog to `windows`;
`[0,1,2].windows_mut(2).collect()` would violate [the rules of references]
(though a [LendingIterator] analog is possible). You can sometimes use
`Cell::as_slice_of_cells` in
conjunction with `windows` instead:

```rust
use std::cell::Cell;

let mut array = ['R', 'u', 's', 't', ' ', '2', '0', '1', '5'];
let slice = &mut array[..];
let slice_of_cells: &[Cell<char>] = Cell::from_mut(slice).as_slice_of_cells();
for w in slice_of_cells.windows(3) {
    Cell::swap(&w[0], &w[2]);
}
assert_eq!(array, ['s', 't', ' ', '2', '0', '1', '5', 'u', 'R']);
```

## T::chunks

```rust
pub const fn chunks(&self, chunk_size: usize) -> Chunks<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the
beginning of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the
slice, then the last chunk will not have length `chunk_size`.

See `chunks_exact` for a variant of this iterator that returns chunks of always exactly
`chunk_size` elements, and `rchunks` for the same iterator but starting at the end of the
slice.

If your `chunk_size` is a constant, consider using `as_chunks` instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks(2);
assert_eq!(iter.next().unwrap(), &['l', 'o']);
assert_eq!(iter.next().unwrap(), &['r', 'e']);
assert_eq!(iter.next().unwrap(), &['m']);
assert!(iter.next().is_none());
```

## T::chunks_mut

```rust
pub const fn chunks_mut(&mut self, chunk_size: usize) -> ChunksMut<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the
beginning of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the
length of the slice, then the last chunk will not have length `chunk_size`.

See `chunks_exact_mut` for a variant of this iterator that returns chunks of always
exactly `chunk_size` elements, and `rchunks_mut` for the same iterator but starting at
the end of the slice.

If your `chunk_size` is a constant, consider using `as_chunks_mut` instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```rust
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

for chunk in v.chunks_mut(2) {
    for elem in chunk.iter_mut() {
        *elem += count;
    }
    count += 1;
}
assert_eq!(v, &[1, 1, 2, 2, 3]);
```

## T::chunks_exact

```rust
pub const fn chunks_exact(&self, chunk_size: usize) -> ChunksExact<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the
beginning of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the
slice, then the last up to `chunk_size-1` elements will be omitted and can be retrieved
from the `remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the
resulting code better than in the case of `chunks`.

See `chunks` for a variant of this iterator that also returns the remainder as a smaller
chunk, and `rchunks_exact` for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using `as_chunks` instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks_exact(2);
assert_eq!(iter.next().unwrap(), &['l', 'o']);
assert_eq!(iter.next().unwrap(), &['r', 'e']);
assert!(iter.next().is_none());
assert_eq!(iter.remainder(), &['m']);
```

## T::chunks_exact_mut

```rust
pub const fn chunks_exact_mut(&mut self, chunk_size: usize) -> ChunksExactMut<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the
beginning of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the
length of the slice, then the last up to `chunk_size-1` elements will be omitted and can be
retrieved from the `into_remainder` function of the iterator.

Due to each chunk having exactly `chunk_size` elements, the compiler can often optimize the
resulting code better than in the case of `chunks_mut`.

See `chunks_mut` for a variant of this iterator that also returns the remainder as a
smaller chunk, and `rchunks_exact_mut` for the same iterator but starting at the end of
the slice.

If your `chunk_size` is a constant, consider using `as_chunks_mut` instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```rust
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

for chunk in v.chunks_exact_mut(2) {
    for elem in chunk.iter_mut() {
        *elem += count;
    }
    count += 1;
}
assert_eq!(v, &[1, 1, 2, 2, 0]);
```

## T::as_chunks_unchecked

```rust
pub const unsafe fn as_chunks_unchecked<#[rustc_panics_when_zero] const N: usize>( &self, ) -> &[[T; N]]
```

Splits the slice into a slice of `N`-element arrays,
assuming that there's no remainder.

This is the inverse operation to `as_flattened`.

As this is `unsafe`, consider whether you could use `as_chunks` or
`as_rchunks` instead, perhaps via something like
`if let (chunks, []) = slice.as_chunks()` or
`let (chunks, []) = slice.as_chunks() else { unreachable!() };`.

# Safety

This may only be called when
- The slice splits exactly into `N`-element chunks (aka `self.len() % N == 0`).
- `N != 0`.

# Examples

```rust
let slice: &[char] = &['l', 'o', 'r', 'e', 'm', '!'];
let chunks: &[[char; 1]] =
    // SAFETY: 1-element chunks never have remainder
    unsafe { slice.as_chunks_unchecked() };
assert_eq!(chunks, &[['l'], ['o'], ['r'], ['e'], ['m'], ['!']]);
let chunks: &[[char; 3]] =
    // SAFETY: The slice length (6) is a multiple of 3
    unsafe { slice.as_chunks_unchecked() };
assert_eq!(chunks, &[['l', 'o', 'r'], ['e', 'm', '!']]);

// These would be unsound:
// let chunks: &[[_; 5]] = slice.as_chunks_unchecked() // The slice length is not a multiple of 5
// let chunks: &[[_; 0]] = slice.as_chunks_unchecked() // Zero-length chunks are never allowed
```

## T::as_chunks

```rust
pub const fn as_chunks<#[rustc_panics_when_zero] const N: usize>(&self) -> (&[[T; N]], &[T])
```

Splits the slice into a slice of `N`-element arrays,
starting at the beginning of the slice,
and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense.  Given
`let (chunks, remainder) = slice.as_chunks()`, then:
- `chunks.len()` equals `slice.len() / N`,
- `remainder.len()` equals `slice.len() % N`, and
- `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with `as_flattened`.

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let (chunks, remainder) = slice.as_chunks();
assert_eq!(chunks, &[['l', 'o'], ['r', 'e']]);
assert_eq!(remainder, &['m']);
```

If you expect the slice to be an exact multiple, you can combine
`let`-`else` with an empty slice pattern:
```rust
let slice = ['R', 'u', 's', 't'];
let (chunks, []) = slice.as_chunks::<2>() else {
    panic!("slice didn't have even length")
};
assert_eq!(chunks, &[['R', 'u'], ['s', 't']]);
```

## T::as_rchunks

```rust
pub const fn as_rchunks<#[rustc_panics_when_zero] const N: usize>(&self) -> (&[T], &[[T; N]])
```

Splits the slice into a slice of `N`-element arrays,
starting at the end of the slice,
and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense.  Given
`let (remainder, chunks) = slice.as_rchunks()`, then:
- `remainder.len()` equals `slice.len() % N`,
- `chunks.len()` equals `slice.len() / N`, and
- `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with `as_flattened`.

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let (remainder, chunks) = slice.as_rchunks();
assert_eq!(remainder, &['l']);
assert_eq!(chunks, &[['o', 'r'], ['e', 'm']]);
```

## T::as_chunks_unchecked_mut

```rust
pub const unsafe fn as_chunks_unchecked_mut<#[rustc_panics_when_zero] const N: usize>( &mut self, ) -> &mut [[T; N]]
```

Splits the slice into a slice of `N`-element arrays,
assuming that there's no remainder.

This is the inverse operation to `as_flattened_mut`.

As this is `unsafe`, consider whether you could use `as_chunks_mut` or
`as_rchunks_mut` instead, perhaps via something like
`if let (chunks, []) = slice.as_chunks_mut()` or
`let (chunks, []) = slice.as_chunks_mut() else { unreachable!() };`.

# Safety

This may only be called when
- The slice splits exactly into `N`-element chunks (aka `self.len() % N == 0`).
- `N != 0`.

# Examples

```rust
let slice: &mut [char] = &mut ['l', 'o', 'r', 'e', 'm', '!'];
let chunks: &mut [[char; 1]] =
    // SAFETY: 1-element chunks never have remainder
    unsafe { slice.as_chunks_unchecked_mut() };
chunks[0] = ['L'];
assert_eq!(chunks, &[['L'], ['o'], ['r'], ['e'], ['m'], ['!']]);
let chunks: &mut [[char; 3]] =
    // SAFETY: The slice length (6) is a multiple of 3
    unsafe { slice.as_chunks_unchecked_mut() };
chunks[1] = ['a', 'x', '?'];
assert_eq!(slice, &['L', 'o', 'r', 'a', 'x', '?']);

// These would be unsound:
// let chunks: &[[_; 5]] = slice.as_chunks_unchecked_mut() // The slice length is not a multiple of 5
// let chunks: &[[_; 0]] = slice.as_chunks_unchecked_mut() // Zero-length chunks are never allowed
```

## T::as_chunks_mut

```rust
pub const fn as_chunks_mut<#[rustc_panics_when_zero] const N: usize>( &mut self, ) -> (&mut [[T; N]], &mut [T])
```

Splits the slice into a slice of `N`-element arrays,
starting at the beginning of the slice,
and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense.  Given
`let (chunks, remainder) = slice.as_chunks_mut()`, then:
- `chunks.len()` equals `slice.len() / N`,
- `remainder.len()` equals `slice.len() % N`, and
- `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with `as_flattened_mut`.

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```rust
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

let (chunks, remainder) = v.as_chunks_mut();
remainder[0] = 9;
for chunk in chunks {
    *chunk = [count; 2];
    count += 1;
}
assert_eq!(v, &[1, 1, 2, 2, 9]);
```

## T::as_rchunks_mut

```rust
pub const fn as_rchunks_mut<#[rustc_panics_when_zero] const N: usize>( &mut self, ) -> (&mut [T], &mut [[T; N]])
```

Splits the slice into a slice of `N`-element arrays,
starting at the end of the slice,
and a remainder slice with length strictly less than `N`.

The remainder is meaningful in the division sense.  Given
`let (remainder, chunks) = slice.as_rchunks_mut()`, then:
- `remainder.len()` equals `slice.len() % N`,
- `chunks.len()` equals `slice.len() / N`, and
- `slice.len()` equals `chunks.len() * N + remainder.len()`.

You can flatten the chunks back into a slice-of-`T` with `as_flattened_mut`.

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```rust
let v = &mut [0, 0, 0, 0, 0];
let mut count = 1;

let (remainder, chunks) = v.as_rchunks_mut();
remainder[0] = 9;
for chunk in chunks {
    *chunk = [count; 2];
    count += 1;
}
assert_eq!(v, &[9, 1, 1, 2, 2]);
```

## T::array_windows

```rust
pub const fn array_windows<#[rustc_panics_when_zero] const N: usize>( &self, ) -> ArrayWindows<'_, T, N>
```

Returns an iterator over overlapping windows of `N` elements of a slice,
starting at the beginning of the slice.

This is the const generic equivalent of `windows`.

If `N` is greater than the size of the slice, it will return no windows.

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```rust
let slice = [0, 1, 2, 3];
let mut iter = slice.array_windows();
assert_eq!(iter.next().unwrap(), &[0, 1]);
assert_eq!(iter.next().unwrap(), &[1, 2]);
assert_eq!(iter.next().unwrap(), &[2, 3]);
assert!(iter.next().is_none());
```

## T::rchunks

```rust
pub const fn rchunks(&self, chunk_size: usize) -> RChunks<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end
of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the
slice, then the last chunk will not have length `chunk_size`.

See `rchunks_exact` for a variant of this iterator that returns chunks of always exactly
`chunk_size` elements, and `chunks` for the same iterator but starting at the beginning
of the slice.

If your `chunk_size` is a constant, consider using `as_rchunks` instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```rust
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks(2);
assert_eq!(iter.next().unwrap(), &['e', 'm']);
assert_eq!(iter.next().unwrap(), &['o', 'r']);
assert_eq!(iter.next().unwrap(), &['l']);
assert!(iter.next().is_none());
```
