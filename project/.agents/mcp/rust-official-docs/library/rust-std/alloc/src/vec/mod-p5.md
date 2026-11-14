---
title: "alloc::vec (part 5 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/vec/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::vec (part 5 of 5)

## Vec::resize_with

```rust
pub fn resize_with<F>(&mut self, new_len: usize, f: F) where F: FnMut() -> T,
```

Resizes the `Vec` in-place so that `len` is equal to `new_len`.

If `new_len` is greater than `len`, the `Vec` is extended by the
difference, with each additional slot filled with the result of
calling the closure `f`. The return values from `f` will end up
in the `Vec` in the order they have been generated.

If `new_len` is less than `len`, the `Vec` is simply truncated.

This method uses a closure to create new values on every push. If
you'd rather `Clone` a given value, use `Vec::resize`. If you
want to use the `Default` trait to generate values, you can
pass `Default::default` as the second argument.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut vec = vec![1, 2, 3];
vec.resize_with(5, Default::default);
assert_eq!(vec, [1, 2, 3, 0, 0]);

let mut vec = vec![];
let mut p = 1;
vec.resize_with(4, || { p *= 2; p });
assert_eq!(vec, [2, 4, 8, 16]);
```

## Vec::leak

```rust
pub fn leak<'a>(self) -> &'a mut [T] where A: 'a,
```

Consumes and leaks the `Vec`, returning a mutable reference to the contents,
`&'a mut [T]`.

Note that the type `T` must outlive the chosen lifetime `'a`. If the type
has only static references, or none at all, then this may be chosen to be
`'static`.

As of Rust 1.57, this method does not reallocate or shrink the `Vec`,
so the leaked allocation may include unused capacity that is not part
of the returned slice.

This function is mainly useful for data that lives for the remainder of
the program's life. Dropping the returned reference will cause a memory
leak.

# Examples

Simple usage:

```rust
let x = vec![1, 2, 3];
let static_ref: &'static mut [usize] = x.leak();
static_ref[0] += 1;
assert_eq!(static_ref, &[2, 2, 3]);
```

## Vec::spare_capacity_mut

```rust
pub const fn spare_capacity_mut(&mut self) -> &mut [MaybeUninit<T>]
```

Returns the remaining spare capacity of the vector as a slice of
`MaybeUninit<T>`.

The returned slice can be used to fill the vector with data (e.g. by
reading from a file) before marking the data as initialized using the
`set_len` method.

# Examples

```rust
// Allocate vector big enough for 10 elements.
let mut v = Vec::with_capacity(10);

// Fill in the first 3 elements.
let uninit = v.spare_capacity_mut();
uninit[0].write(0);
uninit[1].write(1);
uninit[2].write(2);

// Mark the first 3 elements of the vector as being initialized.
unsafe {
    v.set_len(3);
}

assert_eq!(&v, &[0, 1, 2]);
```

## Vec::resize

```rust
pub fn resize(&mut self, new_len: usize, value: T)
```

Resizes the `Vec` in-place so that `len` is equal to `new_len`.

If `new_len` is greater than `len`, the `Vec` is extended by the
difference, with each additional slot filled with `value`.
If `new_len` is less than `len`, the `Vec` is simply truncated.

This method requires `T` to implement `Clone`,
in order to be able to clone the passed value.
If you need more flexibility (or want to rely on `Default` instead of
`Clone`), use `Vec::resize_with`.
If you only need to resize to a smaller size, use `Vec::truncate`.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut vec = vec!["hello"];
vec.resize(3, "world");
assert_eq!(vec, ["hello", "world", "world"]);

let mut vec = vec!['a', 'b', 'c', 'd'];
vec.resize(2, '_');
assert_eq!(vec, ['a', 'b']);
```

## Vec::extend_from_slice

```rust
pub fn extend_from_slice(&mut self, other: &[T])
```

Clones and appends all elements in a slice to the `Vec`.

Iterates over the slice `other`, clones each element, and then appends
it to this `Vec`. The `other` slice is traversed in-order.

Note that this function is the same as `extend`,
except that it also works with slice elements that are Clone but not Copy.
If Rust gets specialization this function may be deprecated.

# Panics

Panics if the new capacity exceeds `isize::MAX` _bytes_.

# Examples

```rust
let mut vec = vec![1];
vec.extend_from_slice(&[2, 3, 4]);
assert_eq!(vec, [1, 2, 3, 4]);
```

## Vec::extend_from_within

```rust
pub fn extend_from_within<R>(&mut self, src: R) where R: RangeBounds<usize>,
```

Given a range `src`, clones a slice of elements in that range and appends it to the end.

`src` must be a range that can form a valid subslice of the `Vec`.

# Panics

Panics if starting index is greater than the end index, if the index is
greater than the length of the vector, or if the new capacity exceeds
`isize::MAX` _bytes_.

# Examples

```rust
let mut characters = vec!['a', 'b', 'c', 'd', 'e'];
characters.extend_from_within(2..);
assert_eq!(characters, ['a', 'b', 'c', 'd', 'e', 'c', 'd', 'e']);

let mut numbers = vec![0, 1, 2, 3, 4];
numbers.extend_from_within(..2);
assert_eq!(numbers, [0, 1, 2, 3, 4, 0, 1]);

let mut strings = vec![String::from("hello"), String::from("world"), String::from("!")];
strings.extend_from_within(1..=2);
assert_eq!(strings, ["hello", "world", "!", "world", "!"]);
```

## Vec::into_flattened

```rust
pub fn into_flattened(self) -> Vec<T, A>
```

Takes a `Vec<[T; N]>` and flattens it into a `Vec<T>`.

# Panics

Panics if the length of the resulting vector would overflow a `usize`.

This is only possible when flattening a vector of arrays of zero-sized
types, and thus tends to be irrelevant in practice. If
`size_of::<T>() > 0`, this will never panic.

# Examples

```rust
let mut vec = vec![[1, 2, 3], [4, 5, 6], [7, 8, 9]];
assert_eq!(vec.pop(), Some([7, 8, 9]));

let mut flattened = vec.into_flattened();
assert_eq!(flattened.pop(), Some(6));
```

## Vec::dedup

```rust
pub fn dedup(&mut self)
```

Removes consecutive repeated elements in the vector according to the
`PartialEq` trait implementation.

If the vector is sorted, this removes all duplicates.

# Examples

```rust
let mut vec = vec![1, 2, 2, 3, 2];

vec.dedup();

assert_eq!(vec, [1, 2, 3, 2]);
```

## Vec::splice

```rust
pub fn splice<R, I>(&mut self, range: R, replace_with: I) -> Splice<'_, I::IntoIter, A> where A: AllocatorNightly, R: RangeBounds<usize>, I: IntoIterator<Item = T>,
```

Creates a splicing iterator that replaces the specified range in the vector
with the given `replace_with` iterator and yields the removed items.
`replace_with` does not need to be the same length as `range`.

`range` is removed even if the `Splice` iterator is not consumed before it is dropped.

It is unspecified how many elements are removed from the vector
if the `Splice` value is leaked.

The input iterator `replace_with` is only consumed when the `Splice` value is dropped.

This is optimal if:

* The tail (elements in the vector after `range`) is empty,
* or `replace_with` yields fewer or equal elements than `range`'s length
* or the lower bound of its `size_hint()` is exact.

Otherwise, a temporary vector is allocated and the tail is moved twice.

# Panics

Panics if the range has `start_bound > end_bound`, or, if the range is
bounded on either end and past the length of the vector.

# Examples

```rust
let mut v = vec![1, 2, 3, 4];
let new = [7, 8, 9];
let u: Vec<_> = v.splice(1..3, new).collect();
assert_eq!(v, [1, 7, 8, 9, 4]);
assert_eq!(u, [2, 3]);
```

Using `splice` to insert new items into a vector efficiently at a specific position
indicated by an empty range:

```rust
let mut v = vec![1, 5];
let new = [2, 3, 4];
v.splice(1..1, new);
assert_eq!(v, [1, 2, 3, 4, 5]);
```

## Vec::extract_if

```rust
pub fn extract_if<F, R>(&mut self, range: R, filter: F) -> ExtractIf<'_, T, F, A> where A: AllocatorNightly, F: FnMut(&mut T) -> bool, R: RangeBounds<usize>,
```

Creates an iterator which uses a closure to determine if an element in the range should be removed.

If the closure returns `true`, the element is removed from the vector
and yielded. If the closure returns `false`, or panics, the element
remains in the vector and will not be yielded.

Only elements that fall in the provided range are considered for extraction, but any elements
after the range will still have to be moved if any element has been extracted.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating
or the iteration short-circuits, then the remaining elements will be retained.
Use `extract_if().for_each(drop)` if you do not need the returned iterator,
or `retain_mut` with a negated predicate if you also do not need to restrict the range.

Using this method is equivalent to the following code:

```rust
let mut i = range.start;
let end_items = vec.len() - range.end;

while i < vec.len() - end_items {
    if some_predicate(&mut vec[i]) {
        let val = vec.remove(i);
        // your code here
    } else {
        i += 1;
    }
}

```

But `extract_if` is easier to use. `extract_if` is also more efficient,
because it can backshift the elements of the array in bulk.

The iterator also lets you mutate the value of each element in the
closure, regardless of whether you choose to keep or remove it.

# Panics

If `range` is out of bounds.

# Examples

Splitting a vector into even and odd values, reusing the original vector:

```rust
let mut numbers = vec![1, 2, 3, 4, 5, 6, 8, 9, 11, 13, 14, 15];

let evens = numbers.extract_if(.., |x| *x % 2 == 0).collect::<Vec<_>>();
let odds = numbers;

assert_eq!(evens, vec![2, 4, 6, 8, 14]);
assert_eq!(odds, vec![1, 3, 5, 9, 11, 13, 15]);
```

Using the range argument to only process a part of the vector:

```rust
let mut items = vec![0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2];
let ones = items.extract_if(7.., |x| *x == 1).collect::<Vec<_>>();
assert_eq!(items, vec![0, 0, 0, 0, 0, 0, 0, 2, 2, 2]);
assert_eq!(ones.len(), 3);
```
