---
title: "core::slice (part 4 of 7)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/slice/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::slice (part 4 of 7)

## T::rsplit_mut

```rust
pub fn rsplit_mut<F>(&mut self, pred: F) -> RSplitMut<'_, T, F> where F: FnMut(&T) -> bool,
```

Returns an iterator over mutable subslices separated by elements that
match `pred`, starting at the end of the slice and working
backwards. The matched element is not contained in the subslices.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

Note that if you have a sorted slice, `binary_search` may be faster.

# Examples

```rust
let v = [10, 40, 30];
assert!(v.contains(&30));
assert!(!v.contains(&50));
```

If you do not have a `&T`, but some other value that you can compare
with one (for example, `String` implements `PartialEq<str>`), you can
use `iter().any`:

```rust
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

```rust
let v = [10, 40, 30];
assert!(v.starts_with(&[10]));
assert!(v.starts_with(&[10, 40]));
assert!(v.starts_with(&v));
assert!(!v.starts_with(&[50]));
assert!(!v.starts_with(&[10, 50]));
```

Always returns `true` if `needle` is an empty slice:

```rust
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

```rust
let v = [10, 40, 30];
assert!(v.ends_with(&[30]));
assert!(v.ends_with(&[40, 30]));
assert!(v.ends_with(&v));
assert!(!v.ends_with(&[50]));
assert!(!v.ends_with(&[50, 30]));
```

Always returns `true` if `needle` is an empty slice:

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

If the value is found then `Result::Ok` is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. The index is chosen
deterministically, but is subject to change in future versions of Rust.
If the value is not found then `Result::Err` is returned, containing
the index where a matching element could be inserted while maintaining
sorted order.

See also `binary_search_by`, `binary_search_by_key`, and `partition_point`.

# Examples

Looks up a series of four elements. The first is found, with a
uniquely determined position; the second and third are not
found; the fourth could match any position in `[1, 4]`.

```rust
let s = [0, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

assert_eq!(s.binary_search(&13),  Ok(9));
assert_eq!(s.binary_search(&4),   Err(7));
assert_eq!(s.binary_search(&100), Err(13));
let r = s.binary_search(&1);
assert!(match r { Ok(1..=4) => true, _ => false, });
```

If you want to find that whole *range* of matching items, rather than
an arbitrary matching one, that can be done using `partition_point`:
```rust
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
sort order, consider using `partition_point`:

```rust
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

If the value is found then `Result::Ok` is returned, containing the
index of the matching element. If there are multiple matches, then any
one of the matches could be returned. The index is chosen
deterministically, but is subject to change in future versions of Rust.
If the value is not found then `Result::Err` is returned, containing
the index where a matching element could be inserted while maintaining
sorted order.

See also `binary_search`, `binary_search_by_key`, and `partition_point`.

# Examples

Looks up a series of four elements. The first is found, with a
uniquely determined position; the second and third are not
found; the fourth could match any position in `[1, 4]`.

```rust
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
