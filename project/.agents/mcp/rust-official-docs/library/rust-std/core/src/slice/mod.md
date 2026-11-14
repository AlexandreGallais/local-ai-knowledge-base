# core::slice

Slice management and manipulation.

For more details see [`std::slice`].

[`std::slice`]: ../../std/slice/index.html

## T::len

```rust
pub const fn len(&self) -> usize
```

Returns the number of elements in the slice.

# Examples

```
let a = [1, 2, 3];
assert_eq!(a.len(), 3);
```

## T::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if the slice has a length of 0.

# Examples

```
let a = [1, 2, 3];
assert!(!a.is_empty());

let b: &[i32] = &[];
assert!(b.is_empty());
```

## T::first

```rust
pub const fn first(&self) -> Option<&T>
```

Returns the first element of the slice, or `None` if it is empty.

# Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&10), v.first());

let w: &[i32] = &[];
assert_eq!(None, w.first());
```

## T::first_mut

```rust
pub const fn first_mut(&mut self) -> Option<&mut T>
```

Returns a mutable reference to the first element of the slice, or `None` if it is empty.

# Examples

```
let x = &mut [0, 1, 2];

if let Some(first) = x.first_mut() {
    *first = 5;
}
assert_eq!(x, &[5, 1, 2]);

let y: &mut [i32] = &mut [];
assert_eq!(None, y.first_mut());
```

## T::split_first

```rust
pub const fn split_first(&self) -> Option<(&T, &[T])>
```

Returns the first and all the rest of the elements of the slice, or `None` if it is empty.

# Examples

```
let x = &[0, 1, 2];

if let Some((first, elements)) = x.split_first() {
    assert_eq!(first, &0);
    assert_eq!(elements, &[1, 2]);
}
```

## T::split_first_mut

```rust
pub const fn split_first_mut(&mut self) -> Option<(&mut T, &mut [T])>
```

Returns the first and all the rest of the elements of the slice, or `None` if it is empty.

# Examples

```
let x = &mut [0, 1, 2];

if let Some((first, elements)) = x.split_first_mut() {
    *first = 3;
    elements[0] = 4;
    elements[1] = 5;
}
assert_eq!(x, &[3, 4, 5]);
```

## T::split_last

```rust
pub const fn split_last(&self) -> Option<(&T, &[T])>
```

Returns the last and all the rest of the elements of the slice, or `None` if it is empty.

# Examples

```
let x = &[0, 1, 2];

if let Some((last, elements)) = x.split_last() {
    assert_eq!(last, &2);
    assert_eq!(elements, &[0, 1]);
}
```

## T::split_last_mut

```rust
pub const fn split_last_mut(&mut self) -> Option<(&mut T, &mut [T])>
```

Returns the last and all the rest of the elements of the slice, or `None` if it is empty.

# Examples

```
let x = &mut [0, 1, 2];

if let Some((last, elements)) = x.split_last_mut() {
    *last = 3;
    elements[0] = 4;
    elements[1] = 5;
}
assert_eq!(x, &[4, 5, 3]);
```

## T::last

```rust
pub const fn last(&self) -> Option<&T>
```

Returns the last element of the slice, or `None` if it is empty.

# Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&30), v.last());

let w: &[i32] = &[];
assert_eq!(None, w.last());
```

## T::last_mut

```rust
pub const fn last_mut(&mut self) -> Option<&mut T>
```

Returns a mutable reference to the last item in the slice, or `None` if it is empty.

# Examples

```
let x = &mut [0, 1, 2];

if let Some(last) = x.last_mut() {
    *last = 10;
}
assert_eq!(x, &[0, 1, 10]);

let y: &mut [i32] = &mut [];
assert_eq!(None, y.last_mut());
```

## T::first_chunk

```rust
pub const fn first_chunk<const N: usize>(&self) -> Option<&[T; N]>
```

Returns an array reference to the first `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

# Examples

```
let u = [10, 40, 30];
assert_eq!(Some(&[10, 40]), u.first_chunk::<2>());

let v: &[i32] = &[10];
assert_eq!(None, v.first_chunk::<2>());

let w: &[i32] = &[];
assert_eq!(Some(&[]), w.first_chunk::<0>());
```

## T::first_chunk_mut

```rust
pub const fn first_chunk_mut<const N: usize>(&mut self) -> Option<&mut [T; N]>
```

Returns a mutable array reference to the first `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

# Examples

```
let x = &mut [0, 1, 2];

if let Some(first) = x.first_chunk_mut::<2>() {
    first[0] = 5;
    first[1] = 4;
}
assert_eq!(x, &[5, 4, 2]);

assert_eq!(None, x.first_chunk_mut::<4>());
```

## T::split_first_chunk

```rust
pub const fn split_first_chunk<const N: usize>(&self) -> Option<(&[T; N], &[T])>
```

Returns an array reference to the first `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

# Examples

```
let x = &[0, 1, 2];

if let Some((first, elements)) = x.split_first_chunk::<2>() {
    assert_eq!(first, &[0, 1]);
    assert_eq!(elements, &[2]);
}

assert_eq!(None, x.split_first_chunk::<4>());
```

## T::split_first_chunk_mut

```rust
pub const fn split_first_chunk_mut<const N: usize>( &mut self, ) -> Option<(&mut [T; N], &mut [T])>
```

Returns a mutable array reference to the first `N` items in the slice and the remaining
slice.

If the slice is not at least `N` in length, this will return `None`.

# Examples

```
let x = &mut [0, 1, 2];

if let Some((first, elements)) = x.split_first_chunk_mut::<2>() {
    first[0] = 3;
    first[1] = 4;
    elements[0] = 5;
}
assert_eq!(x, &[3, 4, 5]);

assert_eq!(None, x.split_first_chunk_mut::<4>());
```

## T::split_last_chunk

```rust
pub const fn split_last_chunk<const N: usize>(&self) -> Option<(&[T], &[T; N])>
```

Returns an array reference to the last `N` items in the slice and the remaining slice.

If the slice is not at least `N` in length, this will return `None`.

# Examples

```
let x = &[0, 1, 2];

if let Some((elements, last)) = x.split_last_chunk::<2>() {
    assert_eq!(elements, &[0]);
    assert_eq!(last, &[1, 2]);
}

assert_eq!(None, x.split_last_chunk::<4>());
```

## T::split_last_chunk_mut

```rust
pub const fn split_last_chunk_mut<const N: usize>( &mut self, ) -> Option<(&mut [T], &mut [T; N])>
```

Returns a mutable array reference to the last `N` items in the slice and the remaining
slice.

If the slice is not at least `N` in length, this will return `None`.

# Examples

```
let x = &mut [0, 1, 2];

if let Some((elements, last)) = x.split_last_chunk_mut::<2>() {
    last[0] = 3;
    last[1] = 4;
    elements[0] = 5;
}
assert_eq!(x, &[5, 3, 4]);

assert_eq!(None, x.split_last_chunk_mut::<4>());
```

## T::last_chunk

```rust
pub const fn last_chunk<const N: usize>(&self) -> Option<&[T; N]>
```

Returns an array reference to the last `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

# Examples

```
let u = [10, 40, 30];
assert_eq!(Some(&[40, 30]), u.last_chunk::<2>());

let v: &[i32] = &[10];
assert_eq!(None, v.last_chunk::<2>());

let w: &[i32] = &[];
assert_eq!(Some(&[]), w.last_chunk::<0>());
```

## T::last_chunk_mut

```rust
pub const fn last_chunk_mut<const N: usize>(&mut self) -> Option<&mut [T; N]>
```

Returns a mutable array reference to the last `N` items in the slice.

If the slice is not at least `N` in length, this will return `None`.

# Examples

```
let x = &mut [0, 1, 2];

if let Some(last) = x.last_chunk_mut::<2>() {
    last[0] = 10;
    last[1] = 20;
}
assert_eq!(x, &[0, 10, 20]);

assert_eq!(None, x.last_chunk_mut::<4>());
```

## T::get

```rust
pub const fn get<I>(&self, index: I) -> Option<&I::Output> where I: [const] SliceIndex<Self>,
```

Returns a reference to an element or subslice depending on the type of
index.

- If given a position, returns a reference to the element at that
  position or `None` if out of bounds.
- If given a range, returns the subslice corresponding to that range,
  or `None` if out of bounds.

# Examples

```
let v = [10, 40, 30];
assert_eq!(Some(&40), v.get(1));
assert_eq!(Some(&[10, 40][..]), v.get(0..2));
assert_eq!(None, v.get(3));
assert_eq!(None, v.get(0..4));
```

## T::get_mut

```rust
pub const fn get_mut<I>(&mut self, index: I) -> Option<&mut I::Output> where I: [const] SliceIndex<Self>,
```

Returns a mutable reference to an element or subslice depending on the
type of index (see [`get`]) or `None` if the index is out of bounds.

[`get`]: slice::get

# Examples

```
let x = &mut [0, 1, 2];

if let Some(elem) = x.get_mut(1) {
    *elem = 42;
}
assert_eq!(x, &[0, 42, 2]);
```

## T::get_unchecked

```rust
pub const unsafe fn get_unchecked<I>(&self, index: I) -> &I::Output where I: [const] SliceIndex<Self>,
```

Returns a reference to an element or subslice, without doing bounds
checking.

For a safe alternative see [`get`].

# Safety

Calling this method with an out-of-bounds index is *[undefined behavior]*
even if the resulting reference is not used.

You can think of this like `.get(index).unwrap_unchecked()`.  It's UB
to call `.get_unchecked(len)`, even if you immediately convert to a
pointer.  And it's UB to call `.get_unchecked(..len + 1)`,
`.get_unchecked(..=len)`, or similar.

[`get`]: slice::get
[undefined behavior]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

# Examples

```
let x = &[1, 2, 4];

unsafe {
    assert_eq!(x.get_unchecked(1), &2);
}
```

## T::get_unchecked_mut

```rust
pub const unsafe fn get_unchecked_mut<I>(&mut self, index: I) -> &mut I::Output where I: [const] SliceIndex<Self>,
```

Returns a mutable reference to an element or subslice, without doing
bounds checking.

For a safe alternative see [`get_mut`].

# Safety

Calling this method with an out-of-bounds index is *[undefined behavior]*
even if the resulting reference is not used.

You can think of this like `.get_mut(index).unwrap_unchecked()`.  It's
UB to call `.get_unchecked_mut(len)`, even if you immediately convert
to a pointer.  And it's UB to call `.get_unchecked_mut(..len + 1)`,
`.get_unchecked_mut(..=len)`, or similar.

[`get_mut`]: slice::get_mut
[undefined behavior]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

# Examples

```
let x = &mut [1, 2, 4];

unsafe {
    let elem = x.get_unchecked_mut(1);
    *elem = 13;
}
assert_eq!(x, &[1, 13, 4]);
```

## T::as_ptr

```rust
pub const fn as_ptr(&self) -> *const T
```

Returns a raw pointer to the slice's buffer.

The caller must ensure that the slice outlives the pointer this
function returns, or else it will end up dangling.

The caller must also ensure that the memory the pointer (non-transitively) points to
is never written to (except inside an `UnsafeCell`) using this pointer or any pointer
derived from it. If you need to mutate the contents of the slice, use [`as_mut_ptr`].

Modifying the container referenced by this slice may cause its buffer
to be reallocated, which would also make any pointers to it invalid.

# Examples

```
let x = &[1, 2, 4];
let x_ptr = x.as_ptr();

unsafe {
    for i in 0..x.len() {
        assert_eq!(x.get_unchecked(i), &*x_ptr.add(i));
    }
}
```

[`as_mut_ptr`]: slice::as_mut_ptr

## T::as_mut_ptr

```rust
pub const fn as_mut_ptr(&mut self) -> *mut T
```

Returns an unsafe mutable pointer to the slice's buffer.

The caller must ensure that the slice outlives the pointer this
function returns, or else it will end up dangling.

Modifying the container referenced by this slice may cause its buffer
to be reallocated, which would also make any pointers to it invalid.

# Examples

```
let x = &mut [1, 2, 4];
let x_ptr = x.as_mut_ptr();

unsafe {
    for i in 0..x.len() {
        *x_ptr.add(i) += 2;
    }
}
assert_eq!(x, &[3, 4, 6]);
```

## T::as_ptr_range

```rust
pub const fn as_ptr_range(&self) -> Range<*const T>
```

Returns the two raw pointers spanning the slice.

The returned range is half-open, which means that the end pointer
points *one past* the last element of the slice. This way, an empty
slice is represented by two equal pointers, and the difference between
the two pointers represents the size of the slice.

See [`as_ptr`] for warnings on using these pointers. The end pointer
requires extra caution, as it does not point to a valid element in the
slice.

This function is useful for interacting with foreign interfaces which
use two pointers to refer to a range of elements in memory, as is
common in C++.

It can also be useful to check if a pointer to an element refers to an
element of this slice:

```
let a = [1, 2, 3];
let x = &a[1] as *const _;
let y = &5 as *const _;

assert!(a.as_ptr_range().contains(&x));
assert!(!a.as_ptr_range().contains(&y));
```

[`as_ptr`]: slice::as_ptr

## T::as_mut_ptr_range

```rust
pub const fn as_mut_ptr_range(&mut self) -> Range<*mut T>
```

Returns the two unsafe mutable pointers spanning the slice.

The returned range is half-open, which means that the end pointer
points *one past* the last element of the slice. This way, an empty
slice is represented by two equal pointers, and the difference between
the two pointers represents the size of the slice.

See [`as_mut_ptr`] for warnings on using these pointers. The end
pointer requires extra caution, as it does not point to a valid element
in the slice.

This function is useful for interacting with foreign interfaces which
use two pointers to refer to a range of elements in memory, as is
common in C++.

[`as_mut_ptr`]: slice::as_mut_ptr

## T::as_array

```rust
pub const fn as_array<const N: usize>(&self) -> Option<&[T; N]>
```

Gets a reference to the underlying array.

If `N` is not exactly equal to the length of `self`, then this method returns `None`.

## T::as_mut_array

```rust
pub const fn as_mut_array<const N: usize>(&mut self) -> Option<&mut [T; N]>
```

Gets a mutable reference to the slice's underlying array.

If `N` is not exactly equal to the length of `self`, then this method returns `None`.

## T::swap

```rust
pub const fn swap(&mut self, a: usize, b: usize)
```

Swaps two elements in the slice.

If `a` equals to `b`, it's guaranteed that elements won't change value.

# Arguments

* a - The index of the first element
* b - The index of the second element

# Panics

Panics if `a` or `b` are out of bounds.

# Examples

```
let mut v = ["a", "b", "c", "d", "e"];
v.swap(2, 4);
assert!(v == ["a", "b", "e", "d", "c"]);
```

## T::reverse

```rust
pub const fn reverse(&mut self)
```

Reverses the order of elements in the slice, in place.

# Examples

```
let mut v = [1, 2, 3];
v.reverse();
assert!(v == [3, 2, 1]);
```

## T::iter

```rust
pub const fn iter(&self) -> Iter<'_, T>
```

Returns an iterator over the slice.

The iterator yields all items from start to end.

# Examples

```
let x = &[1, 2, 4];
let mut iterator = x.iter();

assert_eq!(iterator.next(), Some(&1));
assert_eq!(iterator.next(), Some(&2));
assert_eq!(iterator.next(), Some(&4));
assert_eq!(iterator.next(), None);
```

## T::iter_mut

```rust
pub const fn iter_mut(&mut self) -> IterMut<'_, T>
```

Returns an iterator that allows modifying each value.

The iterator yields all items from start to end.

# Examples

```
let x = &mut [1, 2, 4];
for elem in x.iter_mut() {
    *elem += 2;
}
assert_eq!(x, &[3, 4, 6]);
```

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

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.windows(3);
assert_eq!(iter.next().unwrap(), &['l', 'o', 'r']);
assert_eq!(iter.next().unwrap(), &['o', 'r', 'e']);
assert_eq!(iter.next().unwrap(), &['r', 'e', 'm']);
assert!(iter.next().is_none());
```

If the slice is shorter than `size`:

```
let slice = ['f', 'o', 'o'];
let mut iter = slice.windows(4);
assert!(iter.next().is_none());
```

Because the [Iterator] trait cannot represent the required lifetimes,
there is no `windows_mut` analog to `windows`;
`[0,1,2].windows_mut(2).collect()` would violate [the rules of references]
(though a [LendingIterator] analog is possible). You can sometimes use
[`Cell::as_slice_of_cells`](crate::cell::Cell::as_slice_of_cells) in
conjunction with `windows` instead:

[the rules of references]: https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#the-rules-of-references
[LendingIterator]: https://blog.rust-lang.org/2022/10/28/gats-stabilization.html
```
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

See [`chunks_exact`] for a variant of this iterator that returns chunks of always exactly
`chunk_size` elements, and [`rchunks`] for the same iterator but starting at the end of the
slice.

If your `chunk_size` is a constant, consider using [`as_chunks`] instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks(2);
assert_eq!(iter.next().unwrap(), &['l', 'o']);
assert_eq!(iter.next().unwrap(), &['r', 'e']);
assert_eq!(iter.next().unwrap(), &['m']);
assert!(iter.next().is_none());
```

[`chunks_exact`]: slice::chunks_exact
[`rchunks`]: slice::rchunks
[`as_chunks`]: slice::as_chunks

## T::chunks_mut

```rust
pub const fn chunks_mut(&mut self, chunk_size: usize) -> ChunksMut<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the
beginning of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the
length of the slice, then the last chunk will not have length `chunk_size`.

See [`chunks_exact_mut`] for a variant of this iterator that returns chunks of always
exactly `chunk_size` elements, and [`rchunks_mut`] for the same iterator but starting at
the end of the slice.

If your `chunk_size` is a constant, consider using [`as_chunks_mut`] instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```
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

[`chunks_exact_mut`]: slice::chunks_exact_mut
[`rchunks_mut`]: slice::rchunks_mut
[`as_chunks_mut`]: slice::as_chunks_mut

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
resulting code better than in the case of [`chunks`].

See [`chunks`] for a variant of this iterator that also returns the remainder as a smaller
chunk, and [`rchunks_exact`] for the same iterator but starting at the end of the slice.

If your `chunk_size` is a constant, consider using [`as_chunks`] instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.chunks_exact(2);
assert_eq!(iter.next().unwrap(), &['l', 'o']);
assert_eq!(iter.next().unwrap(), &['r', 'e']);
assert!(iter.next().is_none());
assert_eq!(iter.remainder(), &['m']);
```

[`chunks`]: slice::chunks
[`rchunks_exact`]: slice::rchunks_exact
[`as_chunks`]: slice::as_chunks

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
resulting code better than in the case of [`chunks_mut`].

See [`chunks_mut`] for a variant of this iterator that also returns the remainder as a
smaller chunk, and [`rchunks_exact_mut`] for the same iterator but starting at the end of
the slice.

If your `chunk_size` is a constant, consider using [`as_chunks_mut`] instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```
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

[`chunks_mut`]: slice::chunks_mut
[`rchunks_exact_mut`]: slice::rchunks_exact_mut
[`as_chunks_mut`]: slice::as_chunks_mut

## T::as_chunks_unchecked

```rust
pub const unsafe fn as_chunks_unchecked<#[rustc_panics_when_zero] const N: usize>( &self, ) -> &[[T; N]]
```

Splits the slice into a slice of `N`-element arrays,
assuming that there's no remainder.

This is the inverse operation to [`as_flattened`].

[`as_flattened`]: slice::as_flattened

As this is `unsafe`, consider whether you could use [`as_chunks`] or
[`as_rchunks`] instead, perhaps via something like
`if let (chunks, []) = slice.as_chunks()` or
`let (chunks, []) = slice.as_chunks() else { unreachable!() };`.

[`as_chunks`]: slice::as_chunks
[`as_rchunks`]: slice::as_rchunks

# Safety

This may only be called when
- The slice splits exactly into `N`-element chunks (aka `self.len() % N == 0`).
- `N != 0`.

# Examples

```
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

You can flatten the chunks back into a slice-of-`T` with [`as_flattened`].

[`as_flattened`]: slice::as_flattened

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let (chunks, remainder) = slice.as_chunks();
assert_eq!(chunks, &[['l', 'o'], ['r', 'e']]);
assert_eq!(remainder, &['m']);
```

If you expect the slice to be an exact multiple, you can combine
`let`-`else` with an empty slice pattern:
```
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

You can flatten the chunks back into a slice-of-`T` with [`as_flattened`].

[`as_flattened`]: slice::as_flattened

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```
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

This is the inverse operation to [`as_flattened_mut`].

[`as_flattened_mut`]: slice::as_flattened_mut

As this is `unsafe`, consider whether you could use [`as_chunks_mut`] or
[`as_rchunks_mut`] instead, perhaps via something like
`if let (chunks, []) = slice.as_chunks_mut()` or
`let (chunks, []) = slice.as_chunks_mut() else { unreachable!() };`.

[`as_chunks_mut`]: slice::as_chunks_mut
[`as_rchunks_mut`]: slice::as_rchunks_mut

# Safety

This may only be called when
- The slice splits exactly into `N`-element chunks (aka `self.len() % N == 0`).
- `N != 0`.

# Examples

```
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

You can flatten the chunks back into a slice-of-`T` with [`as_flattened_mut`].

[`as_flattened_mut`]: slice::as_flattened_mut

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```
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

You can flatten the chunks back into a slice-of-`T` with [`as_flattened_mut`].

[`as_flattened_mut`]: slice::as_flattened_mut

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```
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

This is the const generic equivalent of [`windows`].

If `N` is greater than the size of the slice, it will return no windows.

# Panics

Panics if `N` is zero.

Note that this check is against a const generic parameter, not a runtime
value, and thus a particular monomorphization will either always panic
or it will never panic.

# Examples

```
let slice = [0, 1, 2, 3];
let mut iter = slice.array_windows();
assert_eq!(iter.next().unwrap(), &[0, 1]);
assert_eq!(iter.next().unwrap(), &[1, 2]);
assert_eq!(iter.next().unwrap(), &[2, 3]);
assert!(iter.next().is_none());
```

[`windows`]: slice::windows

## T::rchunks

```rust
pub const fn rchunks(&self, chunk_size: usize) -> RChunks<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end
of the slice.

The chunks are slices and do not overlap. If `chunk_size` does not divide the length of the
slice, then the last chunk will not have length `chunk_size`.

See [`rchunks_exact`] for a variant of this iterator that returns chunks of always exactly
`chunk_size` elements, and [`chunks`] for the same iterator but starting at the beginning
of the slice.

If your `chunk_size` is a constant, consider using [`as_rchunks`] instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks(2);
assert_eq!(iter.next().unwrap(), &['e', 'm']);
assert_eq!(iter.next().unwrap(), &['o', 'r']);
assert_eq!(iter.next().unwrap(), &['l']);
assert!(iter.next().is_none());
```

[`rchunks_exact`]: slice::rchunks_exact
[`chunks`]: slice::chunks
[`as_rchunks`]: slice::as_rchunks

## T::rchunks_mut

```rust
pub const fn rchunks_mut(&mut self, chunk_size: usize) -> RChunksMut<'_, T>
```

Returns an iterator over `chunk_size` elements of the slice at a time, starting at the end
of the slice.

The chunks are mutable slices, and do not overlap. If `chunk_size` does not divide the
length of the slice, then the last chunk will not have length `chunk_size`.

See [`rchunks_exact_mut`] for a variant of this iterator that returns chunks of always
exactly `chunk_size` elements, and [`chunks_mut`] for the same iterator but starting at the
beginning of the slice.

If your `chunk_size` is a constant, consider using [`as_rchunks_mut`] instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```
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

[`rchunks_exact_mut`]: slice::rchunks_exact_mut
[`chunks_mut`]: slice::chunks_mut
[`as_rchunks_mut`]: slice::as_rchunks_mut

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
resulting code better than in the case of [`rchunks`].

See [`rchunks`] for a variant of this iterator that also returns the remainder as a smaller
chunk, and [`chunks_exact`] for the same iterator but starting at the beginning of the
slice.

If your `chunk_size` is a constant, consider using [`as_rchunks`] instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```
let slice = ['l', 'o', 'r', 'e', 'm'];
let mut iter = slice.rchunks_exact(2);
assert_eq!(iter.next().unwrap(), &['e', 'm']);
assert_eq!(iter.next().unwrap(), &['o', 'r']);
assert!(iter.next().is_none());
assert_eq!(iter.remainder(), &['l']);
```

[`chunks`]: slice::chunks
[`rchunks`]: slice::rchunks
[`chunks_exact`]: slice::chunks_exact
[`as_rchunks`]: slice::as_rchunks

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
resulting code better than in the case of [`chunks_mut`].

See [`rchunks_mut`] for a variant of this iterator that also returns the remainder as a
smaller chunk, and [`chunks_exact_mut`] for the same iterator but starting at the beginning
of the slice.

If your `chunk_size` is a constant, consider using [`as_rchunks_mut`] instead, which will
give references to arrays of exactly that length, rather than slices.

# Panics

Panics if `chunk_size` is zero.

# Examples

```
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

[`chunks_mut`]: slice::chunks_mut
[`rchunks_mut`]: slice::rchunks_mut
[`chunks_exact_mut`]: slice::chunks_exact_mut
[`as_rchunks_mut`]: slice::as_rchunks_mut

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

```
let slice = &[1, 1, 1, 3, 3, 2, 2, 2];

let mut iter = slice.chunk_by(|a, b| a == b);

assert_eq!(iter.next(), Some(&[1, 1, 1][..]));
assert_eq!(iter.next(), Some(&[3, 3][..]));
assert_eq!(iter.next(), Some(&[2, 2, 2][..]));
assert_eq!(iter.next(), None);
```

This method can be used to extract the sorted subslices:

```
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

```
let slice = &mut [1, 1, 1, 3, 3, 2, 2, 2];

let mut iter = slice.chunk_by_mut(|a, b| a == b);

assert_eq!(iter.next(), Some(&mut [1, 1, 1][..]));
assert_eq!(iter.next(), Some(&mut [3, 3][..]));
assert_eq!(iter.next(), Some(&mut [2, 2, 2][..]));
assert_eq!(iter.next(), None);
```

This method can be used to extract the sorted subslices:

```
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
[`split_at_checked`](slice::split_at_checked).

# Examples

```
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
[`split_at_mut_checked`](slice::split_at_mut_checked).

# Examples

```
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

For a safe alternative see [`split_at`].

# Safety

Calling this method with an out-of-bounds index is *[undefined behavior]*
even if the resulting reference is not used. The caller has to ensure that
`0 <= mid <= self.len()`.

[`split_at`]: slice::split_at
[undefined behavior]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

# Examples

```
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

For a safe alternative see [`split_at_mut`].

# Safety

Calling this method with an out-of-bounds index is *[undefined behavior]*
even if the resulting reference is not used. The caller has to ensure that
`0 <= mid <= self.len()`.

[`split_at_mut`]: slice::split_at_mut
[undefined behavior]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

# Examples

```
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

```
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

```
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

```
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

```
let slice = [10, 40, 33];
let mut iter = slice.split(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40]);
assert_eq!(iter.next().unwrap(), &[]);
assert!(iter.next().is_none());
```

If two matched elements are directly adjacent, an empty slice will be
present between them:

```
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

```
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

```
let slice = [10, 40, 33, 20];
let mut iter = slice.split_inclusive(|num| num % 3 == 0);

assert_eq!(iter.next().unwrap(), &[10, 40, 33]);
assert_eq!(iter.next().unwrap(), &[20]);
assert!(iter.next().is_none());
```

If the last element of the slice is matched,
that element will be considered the terminator of the preceding slice.
That slice will be the last item returned by the iterator.

```
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

```
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

```
let slice = [11, 22, 33, 0, 44, 55];
let mut iter = slice.rsplit(|num| *num == 0);

assert_eq!(iter.next().unwrap(), &[44, 55]);
assert_eq!(iter.next().unwrap(), &[11, 22, 33]);
assert_eq!(iter.next(), None);
```

As with `split()`, if the first or last element is matched, an empty
slice will be the first (or last) item returned by the iterator.

```
let v = &[0, 1, 1, 2, 3, 5, 8];
let mut it = v.rsplit(|n| *n % 2 == 0);
assert_eq!(it.next().unwrap(), &[]);
assert_eq!(it.next().unwrap(), &[3, 5]);
assert_eq!(it.next().unwrap(), &[1, 1]);
assert_eq!(it.next().unwrap(), &[]);
assert_eq!(it.next(), None);
```

## T::rsplit_mut

```rust
pub fn rsplit_mut<F>(&mut self, pred: F) -> RSplitMut<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over mutable subslices separated by elements that
match `pred`, starting at the end of the slice and working
backwards. The matched element is not contained in the subslices.

# Examples

```
let mut v = [100, 400, 300, 200, 600, 500];

let mut count = 0;
for group in v.rsplit_mut(|num| *num % 3 == 0) {
    count += 1;
    group[0] = count;
}
assert_eq!(v, [3, 400, 300, 2, 600, 1]);
```

## T::splitn

```rust
pub fn splitn<F>(&self, n: usize, pred: F) -> SplitN<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over subslices separated by elements that match
`pred`, limited to returning at most `n` items. The matched element is
not contained in the subslices.

The last element returned, if any, will contain the remainder of the
slice.

# Examples

Print the slice split once by numbers divisible by 3 (i.e., `[10, 40]`,
`[20, 60, 50]`):

```
let v = [10, 40, 30, 20, 60, 50];

for group in v.splitn(2, |num| *num % 3 == 0) {
    println!("{group:?}");
}
```

## T::splitn_mut

```rust
pub fn splitn_mut<F>(&mut self, n: usize, pred: F) -> SplitNMut<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over mutable subslices separated by elements that match
`pred`, limited to returning at most `n` items. The matched element is
not contained in the subslices.

The last element returned, if any, will contain the remainder of the
slice.

# Examples

```
let mut v = [10, 40, 30, 20, 60, 50];

for group in v.splitn_mut(2, |num| *num % 3 == 0) {
    group[0] = 1;
}
assert_eq!(v, [1, 40, 30, 1, 60, 50]);
```

## T::rsplitn

```rust
pub fn rsplitn<F>(&self, n: usize, pred: F) -> RSplitN<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over subslices separated by elements that match
`pred` limited to returning at most `n` items. This starts at the end of
the slice and works backwards. The matched element is not contained in
the subslices.

The last element returned, if any, will contain the remainder of the
slice.

# Examples

Print the slice split once, starting from the end, by numbers divisible
by 3 (i.e., `[50]`, `[10, 40, 30, 20]`):

```
let v = [10, 40, 30, 20, 60, 50];

for group in v.rsplitn(2, |num| *num % 3 == 0) {
    println!("{group:?}");
}
```

## T::rsplitn_mut

```rust
pub fn rsplitn_mut<F>(&mut self, n: usize, pred: F) -> RSplitNMut<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over subslices separated by elements that match
`pred` limited to returning at most `n` items. This starts at the end of
the slice and works backwards. The matched element is not contained in
the subslices.

The last element returned, if any, will contain the remainder of the
slice.

# Examples

```
let mut s = [10, 40, 30, 20, 60, 50];

for group in s.rsplitn_mut(2, |num| *num % 3 == 0) {
    group[0] = 1;
}
assert_eq!(s, [1, 40, 30, 20, 60, 1]);
```

## T::contains

```rust
pub fn contains(&self, x: &T) -> bool where T: PartialEq,
```

Returns `true` if the slice contains an element with the given value.

This operation is *O*(*n*).

Note that if you have a sorted slice, [`binary_search`] may be faster.

[`binary_search`]: slice::binary_search

# Examples

```
let v = [10, 40, 30];
assert!(v.contains(&30));
assert!(!v.contains(&50));
```

If you do not have a `&T`, but some other value that you can compare
with one (for example, `String` implements `PartialEq<str>`), you can
use `iter().any`:

```
let v = [String::from("hello"), String::from("world")]; // slice of `String`
assert!(v.iter().any(|e| e == "hello")); // search with `&str`
assert!(!v.iter().any(|e| e == "hi"));
```

## T::starts_with

```rust
pub fn starts_with(&self, needle: &[T]) -> bool where T: PartialEq,
```

Returns `true` if `needle` is a prefix of the slice or equal to the slice.

# Examples

```
let v = [10, 40, 30];
assert!(v.starts_with(&[10]));
assert!(v.starts_with(&[10, 40]));
assert!(v.starts_with(&v));
assert!(!v.starts_with(&[50]));
assert!(!v.starts_with(&[10, 50]));
```

Always returns `true` if `needle` is an empty slice:

```
let v = &[10, 40, 30];
assert!(v.starts_with(&[]));
let v: &[u8] = &[];
assert!(v.starts_with(&[]));
```

## T::ends_with

```rust
pub fn ends_with(&self, needle: &[T]) -> bool where T: PartialEq,
```

Returns `true` if `needle` is a suffix of the slice or equal to the slice.

# Examples

```
let v = [10, 40, 30];
assert!(v.ends_with(&[30]));
assert!(v.ends_with(&[40, 30]));
assert!(v.ends_with(&v));
assert!(!v.ends_with(&[50]));
assert!(!v.ends_with(&[50, 30]));
```

Always returns `true` if `needle` is an empty slice:

```
let v = &[10, 40, 30];
assert!(v.ends_with(&[]));
let v: &[u8] = &[];
assert!(v.ends_with(&[]));
```

## T::strip_prefix

```rust
pub fn strip_prefix<P: SlicePattern<Item = T> + ?Sized>(&self, prefix: &P) -> Option<&[T]> where T: PartialEq,
```

Returns a subslice with the prefix removed.

If the slice starts with `prefix`, returns the subslice after the prefix, wrapped in `Some`.
If `prefix` is empty, simply returns the original slice. If `prefix` is equal to the
original slice, returns an empty slice.

If the slice does not start with `prefix`, returns `None`.

# Examples

```
let v = &[10, 40, 30];
assert_eq!(v.strip_prefix(&[10]), Some(&[40, 30][..]));
assert_eq!(v.strip_prefix(&[10, 40]), Some(&[30][..]));
assert_eq!(v.strip_prefix(&[10, 40, 30]), Some(&[][..]));
assert_eq!(v.strip_prefix(&[50]), None);
assert_eq!(v.strip_prefix(&[10, 50]), None);

let prefix : &str = "he";
assert_eq!(b"hello".strip_prefix(prefix.as_bytes()),
           Some(b"llo".as_ref()));
```

## T::strip_suffix

```rust
pub fn strip_suffix<P: SlicePattern<Item = T> + ?Sized>(&self, suffix: &P) -> Option<&[T]> where T: PartialEq,
```

Returns a subslice with the suffix removed.

If the slice ends with `suffix`, returns the subslice before the suffix, wrapped in `Some`.
If `suffix` is empty, simply returns the original slice. If `suffix` is equal to the
original slice, returns an empty slice.

If the slice does not end with `suffix`, returns `None`.

# Examples

```
let v = &[10, 40, 30];
assert_eq!(v.strip_suffix(&[30]), Some(&[10, 40][..]));
assert_eq!(v.strip_suffix(&[40, 30]), Some(&[10][..]));
assert_eq!(v.strip_suffix(&[10, 40, 30]), Some(&[][..]));
assert_eq!(v.strip_suffix(&[50]), None);
assert_eq!(v.strip_suffix(&[50, 30]), None);
```

## T::strip_circumfix

```rust
pub fn strip_circumfix<S, P>(&self, prefix: &P, suffix: &S) -> Option<&[T]> where T: PartialEq, S: SlicePattern<Item = T> + ?Sized, P: SlicePattern<Item = T> + ?Sized,
```

Returns a subslice with the prefix and suffix removed.

If the slice starts with `prefix`, ends with `suffix`, and
the prefix and suffix don't overlap, returns the subslice after
the prefix and before the suffix, wrapped in `Some`.

If the slice does not start with `prefix`, does not end with `suffix`,
or the prefix and suffix overlap in the slice, returns `None`.

# Examples

```
let v = &[10, 50, 40, 30];
assert_eq!(v.strip_circumfix(&[10], &[30]), Some(&[50, 40][..]));
assert_eq!(v.strip_circumfix(&[10], &[40, 30]), Some(&[50][..]));
assert_eq!(v.strip_circumfix(&[10, 50], &[40, 30]), Some(&[][..]));
assert_eq!(v.strip_circumfix(&[50], &[30]), None);
assert_eq!(v.strip_circumfix(&[10], &[40]), None);
assert_eq!(v.strip_circumfix(&[], &[40, 30]), Some(&[10, 50][..]));
assert_eq!(v.strip_circumfix(&[10, 50], &[]), Some(&[40, 30][..]));
assert_eq!(v.strip_circumfix(&[10, 50, 40], &[50, 40, 30]), None);
```

## T::trim_prefix

```rust
pub fn trim_prefix<P: SlicePattern<Item = T> + ?Sized>(&self, prefix: &P) -> &[T] where T: PartialEq,
```

Returns a subslice with the optional prefix removed.

If the slice starts with `prefix`, returns the subslice after the prefix.  If `prefix`
is empty or the slice does not start with `prefix`, simply returns the original slice.
If `prefix` is equal to the original slice, returns an empty slice.

# Examples

```
let v = &[10, 40, 30];

// Prefix present - removes it
assert_eq!(v.trim_prefix(&[10]), &[40, 30][..]);
assert_eq!(v.trim_prefix(&[10, 40]), &[30][..]);
assert_eq!(v.trim_prefix(&[10, 40, 30]), &[][..]);

// Prefix absent - returns original slice
assert_eq!(v.trim_prefix(&[50]), &[10, 40, 30][..]);
assert_eq!(v.trim_prefix(&[10, 50]), &[10, 40, 30][..]);

let prefix : &str = "he";
assert_eq!(b"hello".trim_prefix(prefix.as_bytes()), b"llo".as_ref());
```

## T::trim_suffix

```rust
pub fn trim_suffix<P: SlicePattern<Item = T> + ?Sized>(&self, suffix: &P) -> &[T] where T: PartialEq,
```

Returns a subslice with the optional suffix removed.

If the slice ends with `suffix`, returns the subslice before the suffix.  If `suffix`
is empty or the slice does not end with `suffix`, simply returns the original slice.
If `suffix` is equal to the original slice, returns an empty slice.

# Examples

```
let v = &[10, 40, 30];

// Suffix present - removes it
assert_eq!(v.trim_suffix(&[30]), &[10, 40][..]);
assert_eq!(v.trim_suffix(&[40, 30]), &[10][..]);
assert_eq!(v.trim_suffix(&[10, 40, 30]), &[][..]);

// Suffix absent - returns original slice
assert_eq!(v.trim_suffix(&[50]), &[10, 40, 30][..]);
assert_eq!(v.trim_suffix(&[50, 30]), &[10, 40, 30][..]);
```

## T::binary_search

```rust
pub const fn binary_search(&self, x: &T) -> Result<usize, usize> where T: [const] Ord,
```

Binary searches this slice for a given element.
If the slice is not sorted, the returned result is unspecified and
meaningless.

If the value is found then [`Result::Ok`] is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. The index is chosen
deterministically, but is subject to change in future versions of Rust.
If the value is not found then [`Result::Err`] is returned, containing
the index where a matching element could be inserted while maintaining
sorted order.

See also [`binary_search_by`], [`binary_search_by_key`], and [`partition_point`].

[`binary_search_by`]: slice::binary_search_by
[`binary_search_by_key`]: slice::binary_search_by_key
[`partition_point`]: slice::partition_point

# Examples

Looks up a series of four elements. The first is found, with a
uniquely determined position; the second and third are not
found; the fourth could match any position in `[1, 4]`.

```
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

assert_eq!(s.binary_search(&13),  Ok(9));
assert_eq!(s.binary_search(&4),   Err(7));
assert_eq!(s.binary_search(&100), Err(13));
let r = s.binary_search(&1);
assert!(match r { Ok(1..=4) => true, _ => false, });
```

If you want to find that whole *range* of matching items, rather than
an arbitrary matching one, that can be done using [`partition_point`]:
```
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

let low = s.partition_point(|x| x < &1);
assert_eq!(low, 1);
let high = s.partition_point(|x| x <= &1);
assert_eq!(high, 5);
let r = s.binary_search(&1);
assert!((low..high).contains(&r.unwrap()));

assert!(s[..low].iter().all(|&x| x < 1));
assert!(s[low..high].iter().all(|&x| x == 1));
assert!(s[high..].iter().all(|&x| x > 1));

// For something not found, the "range" of equal items is empty
assert_eq!(s.partition_point(|x| x < &11), 9);
assert_eq!(s.partition_point(|x| x <= &11), 9);
assert_eq!(s.binary_search(&11), Err(9));
```

If you want to insert an item to a sorted vector, while maintaining
sort order, consider using [`partition_point`]:

```
let mut s = vec![0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
let num = 42;
let idx = s.partition_point(|&x| x <= num);
// If `num` is unique, `s.partition_point(|&x| x < num)` (with `<`) is equivalent to
// `s.binary_search(&num).unwrap_or_else(|x| x)`, but using `<=` will allow `insert`
// to shift less elements.
s.insert(idx, num);
assert_eq!(s, [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 42, 55]);
```

## T::binary_search_by

```rust
pub const fn binary_search_by<'a, F>(&'a self, mut f: F) -> Result<usize, usize> where F: [const] FnMut(&'a T) -> Ordering + [const] Destruct,
```

Binary searches this slice with a comparator function.

The comparator function should return an order code that indicates
whether its argument is `Less`, `Equal` or `Greater` the desired
target.
If the slice is not sorted or if the comparator function does not
implement an order consistent with the sort order of the underlying
slice, the returned result is unspecified and meaningless.

If the value is found then [`Result::Ok`] is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. The index is chosen
deterministically, but is subject to change in future versions of Rust.
If the value is not found then [`Result::Err`] is returned, containing
the index where a matching element could be inserted while maintaining
sorted order.

See also [`binary_search`], [`binary_search_by_key`], and [`partition_point`].

[`binary_search`]: slice::binary_search
[`binary_search_by_key`]: slice::binary_search_by_key
[`partition_point`]: slice::partition_point

# Examples

Looks up a series of four elements. The first is found, with a
uniquely determined position; the second and third are not
found; the fourth could match any position in `[1, 4]`.

```
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

let seek = 13;
assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Ok(9));
let seek = 4;
assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Err(7));
let seek = 100;
assert_eq!(s.binary_search_by(|probe| probe.cmp(&seek)), Err(13));
let seek = 1;
let r = s.binary_search_by(|probe| probe.cmp(&seek));
assert!(match r { Ok(1..=4) => true, _ => false, });
```

## T::sort_unstable

```rust
pub fn sort_unstable(&mut self) where T: Ord,
```

Sorts the slice in ascending order **without** preserving the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not
allocate), and *O*(*n* \* log(*n*)) worst-case.

If the implementation of [`Ord`] for `T` does not implement a [total order], the function
may panic; even if the function exits normally, the resulting order of elements in the slice
is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor
reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and
examples see the [`Ord`] documentation.


All original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. Same is true if the implementation of [`Ord`] for `T` panics.

Sorting types that only implement [`PartialOrd`] such as [`f32`] and [`f64`] require
additional precautions. For example, `f32::NAN != f32::NAN`, which doesn't fulfill the
reflexivity requirement of [`Ord`]. By using an alternative comparison function with
`slice::sort_unstable_by` such as [`f32::total_cmp`] or [`f64::total_cmp`] that defines a
[total order] users can sort slices containing floating-point values. Alternatively, if all
values in the slice are guaranteed to be in a subset for which [`PartialOrd::partial_cmp`]
forms a [total order], it's possible to sort the slice with `sort_unstable_by(|a, b|
a.partial_cmp(b).unwrap())`.

# Current implementation

The current implementation is based on [ipnsort] by Lukas Bergdoll and Orson Peters, which
combines the fast average case of quicksort with the fast worst case of heapsort, achieving
linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the
expected time to sort the data is *O*(*n* \* log(*k*)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the
slice is partially sorted.

# Panics

May panic if the implementation of [`Ord`] for `T` does not implement a [total order], or if
the [`Ord`] implementation panics.

# Examples

```
let mut v = [4, -5, 1, -3, 2];

v.sort_unstable();
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

[ipnsort]: https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::sort_unstable_by

```rust
pub fn sort_unstable_by<F>(&mut self, mut compare: F) where F: FnMut(&T, &T) -> Ordering,
```

Sorts the slice in ascending order with a comparison function, **without** preserving the
initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not
allocate), and *O*(*n* \* log(*n*)) worst-case.

If the comparison function `compare` does not implement a [total order], the function
may panic; even if the function exits normally, the resulting order of elements in the slice
is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor
reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and
examples see the [`Ord`] documentation.

All original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. Same is true if `compare` panics.

# Current implementation

The current implementation is based on [ipnsort] by Lukas Bergdoll and Orson Peters, which
combines the fast average case of quicksort with the fast worst case of heapsort, achieving
linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the
expected time to sort the data is *O*(*n* \* log(*k*)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the
slice is partially sorted.

# Panics

May panic if the `compare` does not implement a [total order], or if
the `compare` itself panics.

# Examples

```
let mut v = [4, -5, 1, -3, 2];
v.sort_unstable_by(|a, b| a.cmp(b));
assert_eq!(v, [-5, -3, 1, 2, 4]);

// reverse sorting
v.sort_unstable_by(|a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

[ipnsort]: https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::sort_unstable_by_key

```rust
pub fn sort_unstable_by_key<K, F>(&mut self, mut f: F) where F: FnMut(&T) -> K, K: Ord,
```

Sorts the slice in ascending order with a key extraction function, **without** preserving
the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not
allocate), and *O*(*n* \* log(*n*)) worst-case.

If the implementation of [`Ord`] for `K` does not implement a [total order], the function
may panic; even if the function exits normally, the resulting order of elements in the slice
is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor
reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and
examples see the [`Ord`] documentation.

All original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. Same is true if the implementation of [`Ord`] for `K` panics.

# Current implementation

The current implementation is based on [ipnsort] by Lukas Bergdoll and Orson Peters, which
combines the fast average case of quicksort with the fast worst case of heapsort, achieving
linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the
expected time to sort the data is *O*(*n* \* log(*k*)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the
slice is partially sorted.

# Panics

May panic if the implementation of [`Ord`] for `K` does not implement a [total order], or if
the [`Ord`] implementation panics.

# Examples

```
let mut v = [4i32, -5, 1, -3, 2];

v.sort_unstable_by_key(|k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

[ipnsort]: https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::select_nth_unstable

```rust
pub fn select_nth_unstable(&mut self, index: usize) -> (&mut [T], &mut T, &mut [T]) where T: Ord,
```

Reorders the slice such that the element at `index` is at a sort-order position. All
elements before `index` will be `<=` to this value, and all elements after will be `>=` to
it.

This reordering is unstable (i.e. any element that compares equal to the nth element may end
up at that position), in-place (i.e.  does not allocate), and runs in *O*(*n*) time. This
function is also known as "kth element" in other libraries.

Returns a triple that partitions the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy `x <= self[index]`.

* The element at `index`.

* The unsorted subslice after `index`, whose elements all satisfy `x >= self[index]`.

# Current implementation

The current algorithm is an introselect implementation based on [ipnsort] by Lukas Bergdoll
and Orson Peters, which is also the basis for [`sort_unstable`]. The fallback algorithm is
Median of Medians using Tukey's Ninther for pivot selection, which guarantees linear runtime
for all inputs.

[`sort_unstable`]: slice::sort_unstable

# Panics

Panics when `index >= len()`, and so always panics on empty slices.

May panic if the implementation of [`Ord`] for `T` does not implement a [total order].

# Examples

```
let mut v = [-5i32, 4, 2, -3, 1];

// Find the items `<=` to the median, the median itself, and the items `>=` to it.
let (lesser, median, greater) = v.select_nth_unstable(2);

assert!(lesser == [-3, -5] || lesser == [-5, -3]);
assert_eq!(median, &mut 1);
assert!(greater == [4, 2] || greater == [2, 4]);

// We are only guaranteed the slice will be one of the following, based on the way we sort
// about the specified index.
assert!(v == [-3, -5, 1, 2, 4] ||
        v == [-5, -3, 1, 2, 4] ||
        v == [-3, -5, 1, 4, 2] ||
        v == [-5, -3, 1, 4, 2]);
```

[ipnsort]: https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::select_nth_unstable_by

```rust
pub fn select_nth_unstable_by<F>( &mut self, index: usize, mut compare: F, ) -> (&mut [T], &mut T, &mut [T]) where F: FnMut(&T, &T) -> Ordering,
```

Reorders the slice with a comparator function such that the element at `index` is at a
sort-order position. All elements before `index` will be `<=` to this value, and all
elements after will be `>=` to it, according to the comparator function.

This reordering is unstable (i.e. any element that compares equal to the nth element may end
up at that position), in-place (i.e.  does not allocate), and runs in *O*(*n*) time. This
function is also known as "kth element" in other libraries.

Returns a triple partitioning the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy
  `compare(x, self[index]).is_le()`.

* The element at `index`.

* The unsorted subslice after `index`, whose elements all satisfy
  `compare(x, self[index]).is_ge()`.

# Current implementation

The current algorithm is an introselect implementation based on [ipnsort] by Lukas Bergdoll
and Orson Peters, which is also the basis for [`sort_unstable`]. The fallback algorithm is
Median of Medians using Tukey's Ninther for pivot selection, which guarantees linear runtime
for all inputs.

[`sort_unstable`]: slice::sort_unstable

# Panics

Panics when `index >= len()`, and so always panics on empty slices.

May panic if `compare` does not implement a [total order].

# Examples

```
let mut v = [-5i32, 4, 2, -3, 1];

// Find the items `>=` to the median, the median itself, and the items `<=` to it, by using
// a reversed comparator.
let (before, median, after) = v.select_nth_unstable_by(2, |a, b| b.cmp(a));

assert!(before == [4, 2] || before == [2, 4]);
assert_eq!(median, &mut 1);
assert!(after == [-3, -5] || after == [-5, -3]);

// We are only guaranteed the slice will be one of the following, based on the way we sort
// about the specified index.
assert!(v == [2, 4, 1, -5, -3] ||
        v == [2, 4, 1, -3, -5] ||
        v == [4, 2, 1, -5, -3] ||
        v == [4, 2, 1, -3, -5]);
```

[ipnsort]: https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::select_nth_unstable_by_key

```rust
pub fn select_nth_unstable_by_key<K, F>( &mut self, index: usize, mut f: F, ) -> (&mut [T], &mut T, &mut [T]) where F: FnMut(&T) -> K, K: Ord,
```

Reorders the slice with a key extraction function such that the element at `index` is at a
sort-order position. All elements before `index` will have keys `<=` to the key at `index`,
and all elements after will have keys `>=` to it.

This reordering is unstable (i.e. any element that compares equal to the nth element may end
up at that position), in-place (i.e.  does not allocate), and runs in *O*(*n*) time. This
function is also known as "kth element" in other libraries.

Returns a triple partitioning the reordered slice:

* The unsorted subslice before `index`, whose elements all satisfy `f(x) <= f(self[index])`.

* The element at `index`.

* The unsorted subslice after `index`, whose elements all satisfy `f(x) >= f(self[index])`.

# Current implementation

The current algorithm is an introselect implementation based on [ipnsort] by Lukas Bergdoll
and Orson Peters, which is also the basis for [`sort_unstable`]. The fallback algorithm is
Median of Medians using Tukey's Ninther for pivot selection, which guarantees linear runtime
for all inputs.

[`sort_unstable`]: slice::sort_unstable

# Panics

Panics when `index >= len()`, meaning it always panics on empty slices.

May panic if `K: Ord` does not implement a total order.

# Examples

```
let mut v = [-5i32, 4, 1, -3, 2];

// Find the items `<=` to the absolute median, the absolute median itself, and the items
// `>=` to it.
let (lesser, median, greater) = v.select_nth_unstable_by_key(2, |a| a.abs());

assert!(lesser == [1, 2] || lesser == [2, 1]);
assert_eq!(median, &mut -3);
assert!(greater == [4, -5] || greater == [-5, 4]);

// We are only guaranteed the slice will be one of the following, based on the way we sort
// about the specified index.
assert!(v == [1, 2, -3, 4, -5] ||
        v == [1, 2, -3, -5, 4] ||
        v == [2, 1, -3, 4, -5] ||
        v == [2, 1, -3, -5, 4]);
```

[ipnsort]: https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::rotate_left

```rust
pub const fn rotate_left(&mut self, mid: usize)
```

Rotates the slice in-place such that the first `mid` elements of the
slice move to the end while the last `self.len() - mid` elements move to
the front.

After calling `rotate_left`, the element previously at index `mid` will
become the first element in the slice.

# Panics

This function will panic if `mid` is greater than the length of the
slice. Note that `mid == self.len()` does _not_ panic and is a no-op
rotation.

# Complexity

Takes linear (in `self.len()`) time.

# Examples

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.rotate_left(2);
assert_eq!(a, ['c', 'd', 'e', 'f', 'a', 'b']);
```

Rotating a subslice:

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a[1..5].rotate_left(1);
assert_eq!(a, ['a', 'c', 'd', 'e', 'b', 'f']);
```

## T::rotate_right

```rust
pub const fn rotate_right(&mut self, k: usize)
```

Rotates the slice in-place such that the first `self.len() - k`
elements of the slice move to the end while the last `k` elements move
to the front.

After calling `rotate_right`, the element previously at index
`self.len() - k` will become the first element in the slice.

# Panics

This function will panic if `k` is greater than the length of the
slice. Note that `k == self.len()` does _not_ panic and is a no-op
rotation.

# Complexity

Takes linear (in `self.len()`) time.

# Examples

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.rotate_right(2);
assert_eq!(a, ['e', 'f', 'a', 'b', 'c', 'd']);
```

Rotating a subslice:

```
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a[1..5].rotate_right(1);
assert_eq!(a, ['a', 'e', 'b', 'c', 'd', 'f']);
```

## T::fill

```rust
pub fn fill(&mut self, value: T) where T: Clone,
```

Fills `self` with elements by cloning `value`.

# Examples

```
let mut buf = vec![0; 10];
buf.fill(1);
assert_eq!(buf, vec![1; 10]);
```

## T::fill_with

```rust
pub fn fill_with<F>(&mut self, mut f: F) where F: FnMut() -> T,
```

Fills `self` with elements returned by calling a closure repeatedly.

This method uses a closure to create new values. If you'd rather
[`Clone`] a given value, use [`fill`]. If you want to use the [`Default`]
trait to generate values, you can pass [`Default::default`] as the
argument.

[`fill`]: slice::fill

# Examples

```
let mut buf = vec![1; 10];
buf.fill_with(Default::default);
assert_eq!(buf, vec![0; 10]);
```

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

```
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

```compile_fail
let mut slice = [1, 2, 3, 4, 5];

slice[..2].clone_from_slice(&slice[3..]); // compile fail!
```

To work around this, we can use [`split_at_mut`] to create two distinct
sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.clone_from_slice(&right[1..]);
}

assert_eq!(slice, [4, 5, 3, 4, 5]);
```

[`copy_from_slice`]: slice::copy_from_slice
[`split_at_mut`]: slice::split_at_mut

## T::copy_from_slice

```rust
pub const fn copy_from_slice(&mut self, src: &[T]) where T: Copy,
```

Copies all elements from `src` into `self`, using a memcpy.

The length of `src` must be the same as `self`.

If `T` does not implement `Copy`, use [`clone_from_slice`].

# Panics

This function will panic if the two slices have different lengths.

# Examples

Copying two elements from a slice into another:

```
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

```compile_fail
let mut slice = [1, 2, 3, 4, 5];

slice[..2].copy_from_slice(&slice[3..]); // compile fail!
```

To work around this, we can use [`split_at_mut`] to create two distinct
sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.copy_from_slice(&right[1..]);
}

assert_eq!(slice, [4, 5, 3, 4, 5]);
```

[`clone_from_slice`]: slice::clone_from_slice
[`split_at_mut`]: slice::split_at_mut

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

```
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

```
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

```compile_fail
let mut slice = [1, 2, 3, 4, 5];
slice[..2].swap_with_slice(&mut slice[3..]); // compile fail!
```

To work around this, we can use [`split_at_mut`] to create two distinct
mutable sub-slices from a slice:

```
let mut slice = [1, 2, 3, 4, 5];

{
    let (left, right) = slice.split_at_mut(2);
    left.swap_with_slice(&mut right[1..]);
}

assert_eq!(slice, [4, 5, 3, 1, 2]);
```

[`split_at_mut`]: slice::split_at_mut

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

```
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

```
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

```
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

```
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

Checks if the elements of this slice are sorted using the given key extraction function.

Instead of comparing the slice's elements directly, this function compares the keys of the
elements, as determined by `f`. Apart from that, it's equivalent to [`is_sorted`]; see its
documentation for more information.

[`is_sorted`]: slice::is_sorted

# Examples

```
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

See also [`binary_search`], [`binary_search_by`], and [`binary_search_by_key`].

[`binary_search`]: slice::binary_search
[`binary_search_by`]: slice::binary_search_by
[`binary_search_by_key`]: slice::binary_search_by_key

# Examples

```
let v = [1, 2, 3, 3, 5, 6, 7];
let i = v.partition_point(|&x| x < 5);

assert_eq!(i, 4);
assert!(v[..i].iter().all(|&x| x < 5));
assert!(v[i..].iter().all(|&x| !(x < 5)));
```

If all elements of the slice match the predicate, including if the slice
is empty, then the length of the slice will be returned:

```
let a = [2, 4, 8];
assert_eq!(a.partition_point(|x| x < &100), a.len());
let a: [i32; 0] = [];
assert_eq!(a.partition_point(|x| x < &100), 0);
```

If you want to insert an item to a sorted vector, while maintaining
sort order:

```
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

```
let mut slice: &[_] = &['a', 'b', 'c', 'd'];
let mut first_three = slice.split_off(..3).unwrap();

assert_eq!(slice, &['d']);
assert_eq!(first_three, &['a', 'b', 'c']);
```

Splitting off a slice starting with the third element:

```
let mut slice: &[_] = &['a', 'b', 'c', 'd'];
let mut tail = slice.split_off(2..).unwrap();

assert_eq!(slice, &['a', 'b']);
assert_eq!(tail, &['c', 'd']);
```

Getting `None` when `range` is out of bounds:

```
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

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];
let mut first_three = slice.split_off_mut(..3).unwrap();

assert_eq!(slice, &mut ['d']);
assert_eq!(first_three, &mut ['a', 'b', 'c']);
```

Splitting off a slice starting with the third element:

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c', 'd'];
let mut tail = slice.split_off_mut(2..).unwrap();

assert_eq!(slice, &mut ['a', 'b']);
assert_eq!(tail, &mut ['c', 'd']);
```

Getting `None` when `range` is out of bounds:

```
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

```
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

```
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

```
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

```
let mut slice: &mut [_] = &mut ['a', 'b', 'c'];
let last = slice.split_off_last_mut().unwrap();
*last = 'd';

assert_eq!(slice, &['a', 'b']);
assert_eq!(last, &'d');
```

## T::get_disjoint_unchecked_mut

```rust
pub unsafe fn get_disjoint_unchecked_mut<I, const N: usize>( &mut self, indices: [I; N], ) -> [&mut I::Output; N] where I: GetDisjointMutIndex + SliceIndex<Self>,
```

Returns mutable references to many indices at once, without doing any checks.

An index can be either a `usize`, a [`Range`] or a [`RangeInclusive`]. Note
that this method takes an array, so all indices must be of the same type.
If passed an array of `usize`s this method gives back an array of mutable references
to single elements, while if passed an array of ranges it gives back an array of
mutable references to slices.

For a safe alternative see [`get_disjoint_mut`].

# Safety

Calling this method with overlapping or out-of-bounds indices is *[undefined behavior]*
even if the resulting references are not used.

# Examples

```
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

[`get_disjoint_mut`]: slice::get_disjoint_mut
[undefined behavior]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

## T::get_disjoint_mut

```rust
pub fn get_disjoint_mut<I, const N: usize>( &mut self, indices: [I; N], ) -> Result<[&mut I::Output; N], GetDisjointMutError> where I: GetDisjointMutIndex + SliceIndex<Self>,
```

Returns mutable references to many indices at once.

An index can be either a `usize`, a [`Range`] or a [`RangeInclusive`]. Note
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

```
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

This method is useful for extending slice iterators like [`slice::split`].

Note that this uses pointer arithmetic and **does not compare elements**.
To find the index of an element via comparison, use
[`.iter().position()`](crate::iter::Iterator::position) instead.

# Panics
Panics if `T` is zero-sized.

# Examples
Basic usage:
```
let nums: &[u32] = &[1, 7, 1, 1];
let num = &nums[2];

assert_eq!(num, &1);
assert_eq!(nums.element_offset(num), Some(2));
```
Returning `None` with an unaligned element:
```
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
[`.windows()`](slice::windows)[`.position()`](crate::iter::Iterator::position).

This method is useful for extending slice iterators like [`slice::split`].

Note that this may return a false positive (either `Some(0..0)` or `Some(self.len()..self.len())`)
if `subslice` has a length of zero and points to the beginning or end of another, separate, slice.

# Panics
Panics if `T` is zero-sized.

# Examples
Basic usage:
```
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

For the opposite operation, see [`as_chunks`] and [`as_rchunks`].

[`as_chunks`]: slice::as_chunks
[`as_rchunks`]: slice::as_rchunks

# Panics

This panics if the length of the resulting slice would overflow a `usize`.

This is only possible when flattening a slice of arrays of zero-sized
types, and thus tends to be irrelevant in practice. If
`size_of::<T>() > 0`, this will never panic.

# Examples

```
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

For the opposite operation, see [`as_chunks_mut`] and [`as_rchunks_mut`].

[`as_chunks_mut`]: slice::as_chunks_mut
[`as_rchunks_mut`]: slice::as_rchunks_mut

# Panics

This panics if the length of the resulting slice would overflow a `usize`.

This is only possible when flattening a slice of arrays of zero-sized
types, and thus tends to be irrelevant in practice. If
`size_of::<T>() > 0`, this will never panic.

# Examples

```
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

The error type returned by [`get_disjoint_mut`][`slice::get_disjoint_mut`].

It indicates one of two possible errors:
- An index is out-of-bounds.
- The same index appeared multiple times in the array
  (or different but overlapping indices when ranges are provided).

# Examples

```
use std::slice::GetDisjointMutError;

let v = &mut [1, 2, 3];
assert_eq!(v.get_disjoint_mut([0, 999]), Err(GetDisjointMutError::IndexOutOfBounds));
assert_eq!(v.get_disjoint_mut([1, 1]), Err(GetDisjointMutError::OverlappingIndices));
```