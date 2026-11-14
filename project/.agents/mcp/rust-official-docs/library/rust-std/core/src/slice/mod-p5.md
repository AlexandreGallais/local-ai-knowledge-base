---
title: "core::slice (part 5 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice (part 5 of 7)

## T::sort_unstable

```rust
pub fn sort_unstable(&mut self) where T: Ord,
```

Sorts the slice in ascending order **without** preserving the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not
allocate), and *O*(*n* \* log(*n*)) worst-case.

If the implementation of `Ord` for `T` does not implement a [total order], the function
may panic; even if the function exits normally, the resulting order of elements in the slice
is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor
reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and
examples see the `Ord` documentation.

All original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. Same is true if the implementation of `Ord` for `T` panics.

Sorting types that only implement `PartialOrd` such as `f32` and `f64` require
additional precautions. For example, `f32::NAN != f32::NAN`, which doesn't fulfill the
reflexivity requirement of `Ord`. By using an alternative comparison function with
`slice::sort_unstable_by` such as `f32::total_cmp` or `f64::total_cmp` that defines a
[total order] users can sort slices containing floating-point values. Alternatively, if all
values in the slice are guaranteed to be in a subset for which `PartialOrd::partial_cmp`
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

May panic if the implementation of `Ord` for `T` does not implement a [total order], or if
the `Ord` implementation panics.

# Examples

```rust
let mut v = [4, -5, 1, -3, 2];

v.sort_unstable();
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

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
examples see the `Ord` documentation.

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

```rust
let mut v = [4, -5, 1, -3, 2];
v.sort_unstable_by(|a, b| a.cmp(b));
assert_eq!(v, [-5, -3, 1, 2, 4]);

// reverse sorting
v.sort_unstable_by(|a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

## T::sort_unstable_by_key

```rust
pub fn sort_unstable_by_key<K, F>(&mut self, mut f: F) where F: FnMut(&T) -> K, K: Ord,
```

Sorts the slice in ascending order with a key <example-value> function, **without** preserving
the initial order of equal elements.

This sort is unstable (i.e., may reorder equal elements), in-place (i.e., does not
allocate), and *O*(*n* \* log(*n*)) worst-case.

If the implementation of `Ord` for `K` does not implement a [total order], the function
may panic; even if the function exits normally, the resulting order of elements in the slice
is unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor
reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and
examples see the `Ord` documentation.

All original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. Same is true if the implementation of `Ord` for `K` panics.

# Current implementation

The current implementation is based on [ipnsort] by Lukas Bergdoll and Orson Peters, which
combines the fast average case of quicksort with the fast worst case of heapsort, achieving
linear time on fully sorted and reversed inputs. On inputs with k distinct elements, the
expected time to sort the data is *O*(*n* \* log(*k*)).

It is typically faster than stable sorting, except in a few special cases, e.g., when the
slice is partially sorted.

# Panics

May panic if the implementation of `Ord` for `K` does not implement a [total order], or if
the `Ord` implementation panics.

# Examples

```rust
let mut v = [4i32, -5, 1, -3, 2];

v.sort_unstable_by_key(|k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

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
and Orson Peters, which is also the basis for `sort_unstable`. The fallback algorithm is
Median of Medians using Tukey's Ninther for pivot selection, which guarantees linear runtime
for all inputs.

# Panics

Panics when `index >= len()`, and so always panics on empty slices.

May panic if the implementation of `Ord` for `T` does not implement a [total order].

# Examples

```rust
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
and Orson Peters, which is also the basis for `sort_unstable`. The fallback algorithm is
Median of Medians using Tukey's Ninther for pivot selection, which guarantees linear runtime
for all inputs.

# Panics

Panics when `index >= len()`, and so always panics on empty slices.

May panic if `compare` does not implement a [total order].

# Examples

```rust
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

## T::select_nth_unstable_by_key

```rust
pub fn select_nth_unstable_by_key<K, F>( &mut self, index: usize, mut f: F, ) -> (&mut [T], &mut T, &mut [T]) where F: FnMut(&T) -> K, K: Ord,
```

Reorders the slice with a key <example-value> function such that the element at `index` is at a
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
and Orson Peters, which is also the basis for `sort_unstable`. The fallback algorithm is
Median of Medians using Tukey's Ninther for pivot selection, which guarantees linear runtime
for all inputs.

# Panics

Panics when `index >= len()`, meaning it always panics on empty slices.

May panic if `K: Ord` does not implement a total order.

# Examples

```rust
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

```rust
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.rotate_left(2);
assert_eq!(a, ['c', 'd', 'e', 'f', 'a', 'b']);
```

Rotating a subslice:

```rust
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

```rust
let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.rotate_right(2);
assert_eq!(a, ['e', 'f', 'a', 'b', 'c', 'd']);
```

Rotating a subslice:

```rust
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

```rust
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
`Clone` a given value, use `fill`. If you want to use the `Default`
trait to generate values, you can pass `Default::default` as the
argument.

# Examples

```rust
let mut buf = vec![1; 10];
buf.fill_with(Default::default);
assert_eq!(buf, vec![0; 10]);
```
