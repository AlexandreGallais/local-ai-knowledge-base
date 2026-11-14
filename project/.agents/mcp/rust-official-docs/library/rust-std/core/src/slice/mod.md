---
title: "core::slice (part 1 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice

Slice management and manipulation.

For more details see `std::slice`.

## T::len

```rust
pub const fn len(&self) -> usize
```

Returns the number of elements in the slice.

# Examples

```rust
let a = [1, 2, 3];
assert_eq!(a.len(), 3);
```

## T::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if the slice has a length of 0.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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
type of index (see `get`) or `None` if the index is out of bounds.

# Examples

```rust
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

For a safe alternative see `get`.

# Safety

Calling this method with an out-of-bounds index is *[undefined behavior]*
even if the resulting reference is not used.

You can think of this like `.get(index).unwrap_unchecked()`.  It's UB
to call `.get_unchecked(len)`, even if you immediately convert to a
pointer.  And it's UB to call `.get_unchecked(..len + 1)`,
`.get_unchecked(..=len)`, or similar.

# Examples

```rust
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

For a safe alternative see `get_mut`.

# Safety

Calling this method with an out-of-bounds index is *[undefined behavior]*
even if the resulting reference is not used.

You can think of this like `.get_mut(index).unwrap_unchecked()`.  It's
UB to call `.get_unchecked_mut(len)`, even if you immediately convert
to a pointer.  And it's UB to call `.get_unchecked_mut(..len + 1)`,
`.get_unchecked_mut(..=len)`, or similar.

# Examples

```rust
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
derived from it. If you need to mutate the contents of the slice, use `as_mut_ptr`.

Modifying the container referenced by this slice may cause its buffer
to be reallocated, which would also make any pointers to it invalid.

# Examples

```rust
let x = &[1, 2, 4];
let x_ptr = x.as_ptr();

unsafe {
    for i in 0..x.len() {
        assert_eq!(x.get_unchecked(i), &*x_ptr.add(i));
    }
}
```

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

```rust
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

See `as_ptr` for warnings on using these pointers. The end pointer
requires extra caution, as it does not point to a valid element in the
slice.

This function is useful for interacting with foreign interfaces which
use two pointers to refer to a range of elements in memory, as is
common in C++.

It can also be useful to check if a pointer to an element refers to an
element of this slice:

```rust
let a = [1, 2, 3];
let x = &a[1] as *const _;
let y = &5 as *const _;

assert!(a.as_ptr_range().contains(&x));
assert!(!a.as_ptr_range().contains(&y));
```

## T::as_mut_ptr_range

```rust
pub const fn as_mut_ptr_range(&mut self) -> Range<*mut T>
```

Returns the two unsafe mutable pointers spanning the slice.

The returned range is half-open, which means that the end pointer
points *one past* the last element of the slice. This way, an empty
slice is represented by two equal pointers, and the difference between
the two pointers represents the size of the slice.

See `as_mut_ptr` for warnings on using these pointers. The end
pointer requires extra caution, as it does not point to a valid element
in the slice.

This function is useful for interacting with foreign interfaces which
use two pointers to refer to a range of elements in memory, as is
common in C++.

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

```rust
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

```rust
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

```rust
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

```rust
let x = &mut [1, 2, 4];
for elem in x.iter_mut() {
    *elem += 2;
}
assert_eq!(x, &[3, 4, 6]);
```
