# alloc::slice

Utilities for the slice primitive type.

*[See also the slice primitive type](slice).*

Most of the structs in this module are iterator types which can only be created
using a certain function. For example, `slice.iter()` yields an [`Iter`].

A few functions are provided to create a slice from a value reference
or from a raw pointer.

## T::sort

```rust
pub fn sort(&mut self) where T: Ord,
```

Sorts the slice in ascending order, preserving initial order of equal elements.

This sort is stable (i.e., does not reorder equal elements) and *O*(*n* \* log(*n*))
worst-case.

If the implementation of [`Ord`] for `T` does not implement a [total order], the function
may panic; even if the function exits normally, the resulting order of elements in the slice
is unspecified. See also the note on panicking below.

When applicable, unstable sorting is preferred because it is generally faster than stable
sorting and it doesn't allocate auxiliary memory. See
[`sort_unstable`](slice::sort_unstable). The exception are partially sorted slices, which
may be better served with `slice::sort`.

Sorting types that only implement [`PartialOrd`] such as [`f32`] and [`f64`] require
additional precautions. For example, `f32::NAN != f32::NAN`, which doesn't fulfill the
reflexivity requirement of [`Ord`]. By using an alternative comparison function with
`slice::sort_by` such as [`f32::total_cmp`] or [`f64::total_cmp`] that defines a [total
order] users can sort slices containing floating-point values. Alternatively, if all values
in the slice are guaranteed to be in a subset for which [`PartialOrd::partial_cmp`] forms a
[total order], it's possible to sort the slice with `sort_by(|a, b|
a.partial_cmp(b).unwrap())`.

# Current implementation

The current implementation is based on [driftsort] by Orson Peters and Lukas Bergdoll, which
combines the fast average case of quicksort with the fast worst case and partial run
detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs
with k distinct elements, the expected time to sort the data is *O*(*n* \* log(*k*)).

The auxiliary memory allocation behavior depends on the input length. Short slices are
handled without allocation, medium sized slices allocate `self.len()` and beyond that it
clamps at `self.len() / 2`.

# Panics

May panic if the implementation of [`Ord`] for `T` does not implement a [total order], or if
the [`Ord`] implementation itself panics.

All safe functions on slices preserve the invariant that even if the function panics, all
original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. This ensures that recovery code (for instance inside
of a `Drop` or following a `catch_unwind`) will still have access to all the original
elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able
to dispose of all contained elements.

# Examples

```
let mut v = [4, -5, 1, -3, 2];

v.sort();
assert_eq!(v, [-5, -3, 1, 2, 4]);
```

[driftsort]: https://github.com/Voultapher/driftsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::sort_by

```rust
pub fn sort_by<F>(&mut self, mut compare: F) where F: FnMut(&T, &T) -> Ordering,
```

Sorts the slice in ascending order with a comparison function, preserving initial order of
equal elements.

This sort is stable (i.e., does not reorder equal elements) and *O*(*n* \* log(*n*))
worst-case.

If the comparison function `compare` does not implement a [total order], the function may
panic; even if the function exits normally, the resulting order of elements in the slice is
unspecified. See also the note on panicking below.

For example `|a, b| (a - b).cmp(a)` is a comparison function that is neither transitive nor
reflexive nor total, `a < b < c < a` with `a = 1, b = 2, c = 3`. For more information and
examples see the [`Ord`] documentation.

# Current implementation

The current implementation is based on [driftsort] by Orson Peters and Lukas Bergdoll, which
combines the fast average case of quicksort with the fast worst case and partial run
detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs
with k distinct elements, the expected time to sort the data is *O*(*n* \* log(*k*)).

The auxiliary memory allocation behavior depends on the input length. Short slices are
handled without allocation, medium sized slices allocate `self.len()` and beyond that it
clamps at `self.len() / 2`.

# Panics

May panic if `compare` does not implement a [total order], or if `compare` itself panics.

All safe functions on slices preserve the invariant that even if the function panics, all
original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. This ensures that recovery code (for instance inside
of a `Drop` or following a `catch_unwind`) will still have access to all the original
elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able
to dispose of all contained elements.

# Examples

```
let mut v = [4, -5, 1, -3, 2];
v.sort_by(|a, b| a.cmp(b));
assert_eq!(v, [-5, -3, 1, 2, 4]);

// reverse sorting
v.sort_by(|a, b| b.cmp(a));
assert_eq!(v, [4, 2, 1, -3, -5]);
```

[driftsort]: https://github.com/Voultapher/driftsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::sort_by_key

```rust
pub fn sort_by_key<K, F>(&mut self, mut f: F) where F: FnMut(&T) -> K, K: Ord,
```

Sorts the slice in ascending order with a key extraction function, preserving initial order
of equal elements.

This sort is stable (i.e., does not reorder equal elements) and *O*(*m* \* *n* \* log(*n*))
worst-case, where the key function is *O*(*m*).

If the implementation of [`Ord`] for `K` does not implement a [total order], the function
may panic; even if the function exits normally, the resulting order of elements in the slice
is unspecified. See also the note on panicking below.

# Current implementation

The current implementation is based on [driftsort] by Orson Peters and Lukas Bergdoll, which
combines the fast average case of quicksort with the fast worst case and partial run
detection of mergesort, achieving linear time on fully sorted and reversed inputs. On inputs
with k distinct elements, the expected time to sort the data is *O*(*n* \* log(*k*)).

The auxiliary memory allocation behavior depends on the input length. Short slices are
handled without allocation, medium sized slices allocate `self.len()` and beyond that it
clamps at `self.len() / 2`.

# Panics

May panic if the implementation of [`Ord`] for `K` does not implement a [total order], or if
the [`Ord`] implementation or the key-function `f` panics.

All safe functions on slices preserve the invariant that even if the function panics, all
original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. This ensures that recovery code (for instance inside
of a `Drop` or following a `catch_unwind`) will still have access to all the original
elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able
to dispose of all contained elements.

# Examples

```
let mut v = [4i32, -5, 1, -3, 2];

v.sort_by_key(|k| k.abs());
assert_eq!(v, [1, 2, -3, 4, -5]);
```

[driftsort]: https://github.com/Voultapher/driftsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::sort_by_cached_key

```rust
pub fn sort_by_cached_key<K, F>(&mut self, f: F) where F: FnMut(&T) -> K, K: Ord,
```

Sorts the slice in ascending order with a key extraction function, preserving initial order
of equal elements.

This sort is stable (i.e., does not reorder equal elements) and *O*(*m* \* *n* + *n* \*
log(*n*)) worst-case, where the key function is *O*(*m*).

During sorting, the key function is called at most once per element, by using temporary
storage to remember the results of key evaluation. The order of calls to the key function is
unspecified and may change in future versions of the standard library.

If the implementation of [`Ord`] for `K` does not implement a [total order], the function
may panic; even if the function exits normally, the resulting order of elements in the slice
is unspecified. See also the note on panicking below.

For simple key functions (e.g., functions that are property accesses or basic operations),
[`sort_by_key`](slice::sort_by_key) is likely to be faster.

# Current implementation

The current implementation is based on [instruction-parallel-network sort][ipnsort] by Lukas
Bergdoll, which combines the fast average case of randomized quicksort with the fast worst
case of heapsort, while achieving linear time on fully sorted and reversed inputs. And
*O*(*k* \* log(*n*)) where *k* is the number of distinct elements in the input. It leverages
superscalar out-of-order execution capabilities commonly found in CPUs, to efficiently
perform the operation.

In the worst case, the algorithm allocates temporary storage in a `Vec<(K, usize)>` the
length of the slice.

# Panics

May panic if the implementation of [`Ord`] for `K` does not implement a [total order], or if
the [`Ord`] implementation panics.

All safe functions on slices preserve the invariant that even if the function panics, all
original elements will remain in the slice and any possible modifications via interior
mutability are observed in the input. This ensures that recovery code (for instance inside
of a `Drop` or following a `catch_unwind`) will still have access to all the original
elements. For instance, if the slice belongs to a `Vec`, the `Vec::drop` method will be able
to dispose of all contained elements.

# Examples

```
let mut v = [4i32, -5, 1, -3, 2, 10];

// Strings are sorted by lexicographical order.
v.sort_by_cached_key(|k| k.to_string());
assert_eq!(v, [-3, -5, 1, 10, 2, 4]);
```

[ipnsort]: https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort
[total order]: https://en.wikipedia.org/wiki/Total_order

## T::to_vec

```rust
pub fn to_vec(&self) -> Vec<T> where T: Clone,
```

Copies `self` into a new `Vec`.

# Examples

```
let s = [10, 40, 30];
let x = s.to_vec();
// Here, `s` and `x` can be modified independently.
```

## T::into_vec

```rust
pub const fn into_vec<A: Allocator>(self: Box<Self, A>) -> Vec<T, A>
```

Converts `self` into a vector without clones or allocation.

The resulting vector can be converted back into a box via
`Vec<T>`'s `into_boxed_slice` method.

# Examples

```
let s: Box<[i32]> = Box::new([10, 40, 30]);
let x = s.into_vec();
// `s` cannot be used anymore because it has been converted into `x`.

assert_eq!(x, vec![10, 40, 30]);
```

## T::repeat

```rust
pub fn repeat(&self, n: usize) -> Vec<T> where T: Copy,
```

Creates a vector by copying a slice `n` times.

# Panics

This function will panic if the capacity would overflow.

# Examples

```
assert_eq!([1, 2].repeat(3), vec![1, 2, 1, 2, 1, 2]);
```

A panic upon overflow:

```should_panic
// this will panic at runtime
b"0123456789abcdef".repeat(usize::MAX);
```

## T::concat

```rust
pub fn concat<Item: ?Sized>(&self) -> <Self as Concat<Item>>::Output where Self: Concat<Item>,
```

Flattens a slice of `T` into a single value `Self::Output`.

# Examples

```
assert_eq!(["hello", "world"].concat(), "helloworld");
assert_eq!([[1, 2], [3, 4]].concat(), [1, 2, 3, 4]);
```

## T::join

```rust
pub fn join<Separator>(&self, sep: Separator) -> <Self as Join<Separator>>::Output where Self: Join<Separator>,
```

Flattens a slice of `T` into a single value `Self::Output`, placing a
given separator between each.

# Examples

```
assert_eq!(["hello", "world"].join(" "), "hello world");
assert_eq!([[1, 2], [3, 4]].join(&0), [1, 2, 0, 3, 4]);
assert_eq!([[1, 2], [3, 4]].join(&[0, 0][..]), [1, 2, 0, 0, 3, 4]);
```

## T::connect

```rust
pub fn connect<Separator>(&self, sep: Separator) -> <Self as Join<Separator>>::Output where Self: Join<Separator>,
```

Flattens a slice of `T` into a single value `Self::Output`, placing a
given separator between each.

# Examples

```
# #![allow(deprecated)]
assert_eq!(["hello", "world"].connect(" "), "hello world");
assert_eq!([[1, 2], [3, 4]].connect(&0), [1, 2, 0, 3, 4]);
```

## u8::to_ascii_uppercase

```rust
pub fn to_ascii_uppercase(&self) -> Vec<u8>
```

Returns a vector containing a copy of this slice where each byte
is mapped to its ASCII upper case equivalent.

ASCII letters 'a' to 'z' are mapped to 'A' to 'Z',
but non-ASCII letters are unchanged.

To uppercase the value in-place, use [`make_ascii_uppercase`].

[`make_ascii_uppercase`]: slice::make_ascii_uppercase

## u8::to_ascii_lowercase

```rust
pub fn to_ascii_lowercase(&self) -> Vec<u8>
```

Returns a vector containing a copy of this slice where each byte
is mapped to its ASCII lower case equivalent.

ASCII letters 'A' to 'Z' are mapped to 'a' to 'z',
but non-ASCII letters are unchanged.

To lowercase the value in-place, use [`make_ascii_lowercase`].

[`make_ascii_lowercase`]: slice::make_ascii_lowercase

## Concat::Output

```rust
type Output
```

The resulting type after concatenation

## Join::Output

```rust
type Output
```

The resulting type after concatenation