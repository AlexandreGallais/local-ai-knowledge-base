---
title: "alloc::collections::btree::set (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/btree/set.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::btree::set (part 2 of 2)

## BTreeSet::split_off

```rust
pub fn split_off<Q: ?Sized + Ord>(&mut self, value: &Q) -> Self where T: Borrow<Q> + Ord, A: Clone,
```

Splits the collection into two at the value. Returns a new collection
with all elements greater than or equal to the value.

# Examples

Basic usage:

```rust
use std::collections::BTreeSet;

let mut a = BTreeSet::new();
a.insert(1);
a.insert(2);
a.insert(3);
a.insert(17);
a.insert(41);

let b = a.split_off(&3);

assert_eq!(a.len(), 2);
assert_eq!(b.len(), 3);

assert!(a.contains(&1));
assert!(a.contains(&2));

assert!(b.contains(&3));
assert!(b.contains(&17));
assert!(b.contains(&41));
```

## BTreeSet::extract_if

```rust
pub fn extract_if<F, R>(&mut self, range: R, pred: F) -> ExtractIf<'_, T, R, F, A> where T: Ord, R: RangeBounds<T>, F: FnMut(&T) -> bool,
```

Creates an iterator that visits elements in the specified range in ascending order and
uses a closure to determine if an element should be removed.

If the closure returns `true`, the element is removed from the set and
yielded. If the closure returns `false`, or panics, the element remains
in the set and will not be yielded.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating
or the iteration short-circuits, then the remaining elements will be retained.
Use `extract_if().for_each(drop)` if you do not need the returned iterator,
or `retain` with a negated predicate if you also do not need to restrict the range.

# Examples

```rust
use std::collections::BTreeSet;

// Splitting a set into even and odd values, reusing the original set:
let mut set: BTreeSet<i32> = (0..8).collect();
let evens: BTreeSet<_> = set.extract_if(.., |v| v % 2 == 0).collect();
let odds = set;
assert_eq!(evens.into_iter().collect::<Vec<_>>(), vec![0, 2, 4, 6]);
assert_eq!(odds.into_iter().collect::<Vec<_>>(), vec![1, 3, 5, 7]);

// Splitting a set into low and high halves, reusing the original set:
let mut set: BTreeSet<i32> = (0..8).collect();
let low: BTreeSet<_> = set.extract_if(0..4, |_v| true).collect();
let high = set;
assert_eq!(low.into_iter().collect::<Vec<_>>(), [0, 1, 2, 3]);
assert_eq!(high.into_iter().collect::<Vec<_>>(), [4, 5, 6, 7]);
```

## BTreeSet::iter

```rust
pub fn iter(&self) -> Iter<'_, T>
```

Gets an iterator that visits the elements in the `BTreeSet` in ascending
order.

# Examples

```rust
use std::collections::BTreeSet;

let set = BTreeSet::from([3, 1, 2]);
let mut set_iter = set.iter();
assert_eq!(set_iter.next(), Some(&1));
assert_eq!(set_iter.next(), Some(&2));
assert_eq!(set_iter.next(), Some(&3));
assert_eq!(set_iter.next(), None);
```

## BTreeSet::len

```rust
pub const fn len(&self) -> usize
```

Returns the number of elements in the set.

# Examples

```rust
use std::collections::BTreeSet;

let mut v = BTreeSet::new();
assert_eq!(v.len(), 0);
v.insert(1);
assert_eq!(v.len(), 1);
```

## BTreeSet::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if the set contains no elements.

# Examples

```rust
use std::collections::BTreeSet;

let mut v = BTreeSet::new();
assert!(v.is_empty());
v.insert(1);
assert!(!v.is_empty());
```

## struct ExtractIf

```rust
pub struct ExtractIf< 'a, T, R, F, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

This `struct` is created by the `extract_if` method on `BTreeSet`.
