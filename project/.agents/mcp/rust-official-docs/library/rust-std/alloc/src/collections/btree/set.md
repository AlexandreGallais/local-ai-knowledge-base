---
title: "alloc::collections::btree::set (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/btree/set.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::btree::set

## struct BTreeSet

```rust
pub struct BTreeSet< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An ordered set based on a B-Tree.

See `BTreeMap`'s documentation for a detailed discussion of this collection's performance
benefits and drawbacks.

It is a logic error for an item to be modified in such a way that the item's ordering relative
to any other item, as determined by the `Ord` trait, changes while it is in the set. This is
normally only possible through `Cell`, `RefCell`, global state, I/O, or unsafe code.
The behavior resulting from such a logic error is not specified, but will be encapsulated to the
`BTreeSet` that observed the logic error and not result in undefined behavior. This could
include panics, incorrect results, aborts, memory leaks, and non-termination.

Iterators returned by `BTreeSet::iter` and `BTreeSet::into_iter` produce their items in order, and take worst-case
logarithmic and amortized constant time per item returned.

# Examples

```rust
use std::collections::BTreeSet;

// Type inference lets us omit an explicit type signature (which
// would be `BTreeSet<&str>` in this example).
let mut books = BTreeSet::new();

// Add some books.
books.insert("A Dance With Dragons");
books.insert("To Kill a Mockingbird");
books.insert("The Odyssey");
books.insert("The Great Gatsby");

// Check for a specific one.
if !books.contains("The Winds of Winter") {
    println!("We have {} books, but The Winds of Winter ain't one.",
             books.len());
}

// Remove a book.
books.remove("The Odyssey");

// Iterate over everything.
for book in &books {
    println!("{book}");
}
```

A `BTreeSet` with a known list of items can be initialized from an array:

```rust
use std::collections::BTreeSet;

let set = BTreeSet::from([1, 2, 3]);
```

## struct Iter

```rust
pub struct Iter<'a, T: 'a>
```

An iterator over the items of a `BTreeSet`.

This `struct` is created by the `iter` method on `BTreeSet`.
See its documentation for more.

## struct IntoIter

```rust
pub struct IntoIter< T, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An owning iterator over the items of a `BTreeSet` in ascending order.

This `struct` is created by the `into_iter` method on `BTreeSet`
(provided by the `IntoIterator` trait). See its documentation for more.

## struct Range

```rust
pub struct Range<'a, T: 'a>
```

An iterator over a sub-range of items in a `BTreeSet`.

This `struct` is created by the `range` method on `BTreeSet`.
See its documentation for more.

## struct Difference

```rust
pub struct Difference< 'a, T: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

A lazy iterator producing elements in the difference of `BTreeSet`s.

This `struct` is created by the `difference` method on `BTreeSet`.
See its documentation for more.

## struct SymmetricDifference

```rust
pub struct SymmetricDifference<'a, T: 'a>(MergeIterInner<Iter<'a, T>>)
```

A lazy iterator producing elements in the symmetric difference of `BTreeSet`s.

This `struct` is created by the `symmetric_difference` method on
`BTreeSet`. See its documentation for more.

## struct Intersection

```rust
pub struct Intersection< 'a, T: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

A lazy iterator producing elements in the intersection of `BTreeSet`s.

This `struct` is created by the `intersection` method on `BTreeSet`.
See its documentation for more.

## struct Union

```rust
pub struct Union<'a, T: 'a>(MergeIterInner<Iter<'a, T>>)
```

A lazy iterator producing elements in the union of `BTreeSet`s.

This `struct` is created by the `union` method on `BTreeSet`.
See its documentation for more.

## BTreeSet::new

```rust
pub const fn new() -> BTreeSet<T>
```

Makes a new, empty `BTreeSet`.

Does not allocate anything on its own.

# Examples

```rust
use std::collections::BTreeSet;

let mut set: BTreeSet<i32> = BTreeSet::new();
```

## BTreeSet::range

```rust
pub fn range<K: ?Sized, R>(&self, range: R) -> Range<'_, T> where K: Ord, T: Borrow<K> + Ord, R: RangeBounds<K>,
```

Constructs a double-ended iterator over a sub-range of elements in the set.
The simplest way is to use the range syntax `min..max`, thus `range(min..max)` will
yield elements from min (inclusive) to max (exclusive).
The range may also be entered as `(Bound<T>, Bound<T>)`, so for example
`range((Excluded(4), Included(10)))` will yield a left-exclusive, right-inclusive
range from 4 to 10.

# Panics

Panics if range `start > end`.
Panics if range `start == end` and both bounds are `Excluded`.

# Examples

```rust
use std::collections::BTreeSet;
use std::ops::Bound::Included;

let mut set = BTreeSet::new();
set.insert(3);
set.insert(5);
set.insert(8);
for &elem in set.range((Included(&4), Included(&8))) {
    println!("{elem}");
}
assert_eq!(Some(&5), set.range(4..).next());
```

## BTreeSet::difference

```rust
pub fn difference<'a>(&'a self, other: &'a BTreeSet<T, A>) -> Difference<'a, T, A> where T: Ord,
```

Visits the elements representing the difference,
i.e., the elements that are in `self` but not in `other`,
in ascending order.

# Examples

```rust
use std::collections::BTreeSet;

let mut a = BTreeSet::new();
a.insert(1);
a.insert(2);

let mut b = BTreeSet::new();
b.insert(2);
b.insert(3);

let diff: Vec<_> = a.difference(&b).cloned().collect();
assert_eq!(diff, [1]);
```

## BTreeSet::symmetric_difference

```rust
pub fn symmetric_difference<'a>( &'a self, other: &'a BTreeSet<T, A>, ) -> SymmetricDifference<'a, T> where T: Ord,
```

Visits the elements representing the symmetric difference,
i.e., the elements that are in `self` or in `other` but not in both,
in ascending order.

# Examples

```rust
use std::collections::BTreeSet;

let mut a = BTreeSet::new();
a.insert(1);
a.insert(2);

let mut b = BTreeSet::new();
b.insert(2);
b.insert(3);

let sym_diff: Vec<_> = a.symmetric_difference(&b).cloned().collect();
assert_eq!(sym_diff, [1, 3]);
```

## BTreeSet::intersection

```rust
pub fn intersection<'a>(&'a self, other: &'a BTreeSet<T, A>) -> Intersection<'a, T, A> where T: Ord,
```

Visits the elements representing the intersection,
i.e., the elements that are both in `self` and `other`,
in ascending order.

# Examples

```rust
use std::collections::BTreeSet;

let mut a = BTreeSet::new();
a.insert(1);
a.insert(2);

let mut b = BTreeSet::new();
b.insert(2);
b.insert(3);

let intersection: Vec<_> = a.intersection(&b).cloned().collect();
assert_eq!(intersection, [2]);
```

## BTreeSet::union

```rust
pub fn union<'a>(&'a self, other: &'a BTreeSet<T, A>) -> Union<'a, T> where T: Ord,
```

Visits the elements representing the union,
i.e., all the elements in `self` or `other`, without duplicates,
in ascending order.

# Examples

```rust
use std::collections::BTreeSet;

let mut a = BTreeSet::new();
a.insert(1);

let mut b = BTreeSet::new();
b.insert(2);

let union: Vec<_> = a.union(&b).cloned().collect();
assert_eq!(union, [1, 2]);
```

## BTreeSet::clear

```rust
pub fn clear(&mut self) where A: Clone,
```

Clears the set, removing all elements.

# Examples

```rust
use std::collections::BTreeSet;

let mut v = BTreeSet::new();
v.insert(1);
v.clear();
assert!(v.is_empty());
```

## BTreeSet::contains

```rust
pub fn contains<Q: ?Sized>(&self, value: &Q) -> bool where T: Borrow<Q> + Ord, Q: Ord,
```

Returns `true` if the set contains an element equal to the value.

The value may be any borrowed form of the set's element type,
but the ordering on the borrowed form *must* match the
ordering on the element type.

# Examples

```rust
use std::collections::BTreeSet;

let set = BTreeSet::from([1, 2, 3]);
assert_eq!(set.contains(&1), true);
assert_eq!(set.contains(&4), false);
```

## BTreeSet::get

```rust
pub fn get<Q: ?Sized>(&self, value: &Q) -> Option<&T> where T: Borrow<Q> + Ord, Q: Ord,
```

Returns a reference to the element in the set, if any, that is equal to
the value.

The value may be any borrowed form of the set's element type,
but the ordering on the borrowed form *must* match the
ordering on the element type.

# Examples

```rust
use std::collections::BTreeSet;

let set = BTreeSet::from([1, 2, 3]);
assert_eq!(set.get(&2), Some(&2));
assert_eq!(set.get(&4), None);
```

## BTreeSet::is_disjoint

```rust
pub fn is_disjoint(&self, other: &BTreeSet<T, A>) -> bool where T: Ord,
```

Returns `true` if `self` has no elements in common with `other`.
This is equivalent to checking for an empty intersection.

# Examples

```rust
use std::collections::BTreeSet;

let a = BTreeSet::from([1, 2, 3]);
let mut b = BTreeSet::new();

assert_eq!(a.is_disjoint(&b), true);
b.insert(4);
assert_eq!(a.is_disjoint(&b), true);
b.insert(1);
assert_eq!(a.is_disjoint(&b), false);
```

## BTreeSet::is_subset

```rust
pub fn is_subset(&self, other: &BTreeSet<T, A>) -> bool where T: Ord,
```

Returns `true` if the set is a subset of another,
i.e., `other` contains at least all the elements in `self`.

# Examples

```rust
use std::collections::BTreeSet;

let sup = BTreeSet::from([1, 2, 3]);
let mut set = BTreeSet::new();

assert_eq!(set.is_subset(&sup), true);
set.insert(2);
assert_eq!(set.is_subset(&sup), true);
set.insert(4);
assert_eq!(set.is_subset(&sup), false);
```

## BTreeSet::is_superset

```rust
pub fn is_superset(&self, other: &BTreeSet<T, A>) -> bool where T: Ord,
```

Returns `true` if the set is a superset of another,
i.e., `self` contains at least all the elements in `other`.

# Examples

```rust
use std::collections::BTreeSet;

let sub = BTreeSet::from([1, 2]);
let mut set = BTreeSet::new();

assert_eq!(set.is_superset(&sub), false);

set.insert(0);
set.insert(1);
assert_eq!(set.is_superset(&sub), false);

set.insert(2);
assert_eq!(set.is_superset(&sub), true);
```

## BTreeSet::first

```rust
pub fn first(&self) -> Option<&T> where T: Ord,
```

Returns a reference to the first element in the set, if any.
This element is always the minimum of all elements in the set.

# Examples

Basic usage:

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();
assert_eq!(set.first(), None);
set.insert(1);
assert_eq!(set.first(), Some(&1));
set.insert(2);
assert_eq!(set.first(), Some(&1));
```

## BTreeSet::last

```rust
pub fn last(&self) -> Option<&T> where T: Ord,
```

Returns a reference to the last element in the set, if any.
This element is always the maximum of all elements in the set.

# Examples

Basic usage:

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();
assert_eq!(set.last(), None);
set.insert(1);
assert_eq!(set.last(), Some(&1));
set.insert(2);
assert_eq!(set.last(), Some(&2));
```

## BTreeSet::pop_first

```rust
pub fn pop_first(&mut self) -> Option<T> where T: Ord,
```

Removes the first element from the set and returns it, if any.
The first element is always the minimum element in the set.

# Examples

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();

set.insert(1);
while let Some(n) = set.pop_first() {
    assert_eq!(n, 1);
}
assert!(set.is_empty());
```

## BTreeSet::pop_last

```rust
pub fn pop_last(&mut self) -> Option<T> where T: Ord,
```

Removes the last element from the set and returns it, if any.
The last element is always the maximum element in the set.

# Examples

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();

set.insert(1);
while let Some(n) = set.pop_last() {
    assert_eq!(n, 1);
}
assert!(set.is_empty());
```

## BTreeSet::insert

```rust
pub fn insert(&mut self, value: T) -> bool where T: Ord,
```

Adds a value to the set.

Returns whether the value was newly inserted. That is:

- If the set did not previously contain an equal value, `true` is
  returned.
- If the set already contained an equal value, `false` is returned, and
  the entry is not updated.

See the [module-level documentation] for more.

# Examples

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();

assert_eq!(set.insert(2), true);
assert_eq!(set.insert(2), false);
assert_eq!(set.len(), 1);
```

## BTreeSet::replace

```rust
pub fn replace(&mut self, value: T) -> Option<T> where T: Ord,
```

Adds a value to the set, replacing the existing element, if any, that is
equal to the value. Returns the replaced element.

# Examples

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();
set.insert(Vec::<i32>::new());

assert_eq!(set.get(&[][..]).unwrap().capacity(), 0);
set.replace(Vec::with_capacity(10));
assert_eq!(set.get(&[][..]).unwrap().capacity(), 10);
```

## BTreeSet::remove

```rust
pub fn remove<Q: ?Sized>(&mut self, value: &Q) -> bool where T: Borrow<Q> + Ord, Q: Ord,
```

If the set contains an element equal to the value, removes it from the
set and drops it. Returns whether such an element was present.

The value may be any borrowed form of the set's element type,
but the ordering on the borrowed form *must* match the
ordering on the element type.

# Examples

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();

set.insert(2);
assert_eq!(set.remove(&2), true);
assert_eq!(set.remove(&2), false);
```

## BTreeSet::take

```rust
pub fn take<Q: ?Sized>(&mut self, value: &Q) -> Option<T> where T: Borrow<Q> + Ord, Q: Ord,
```

Removes and returns the element in the set, if any, that is equal to
the value.

The value may be any borrowed form of the set's element type,
but the ordering on the borrowed form *must* match the
ordering on the element type.

# Examples

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::from([1, 2, 3]);
assert_eq!(set.take(&2), Some(2));
assert_eq!(set.take(&2), None);
```

## BTreeSet::retain

```rust
pub fn retain<F>(&mut self, mut f: F) where T: Ord, F: FnMut(&T) -> bool,
```

Retains only the elements specified by the predicate.

In other words, remove all elements `e` for which `f(&e)` returns `false`.
The elements are visited in ascending order.

# Examples

```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::from([1, 2, 3, 4, 5, 6]);
// Keep only the even numbers.
set.retain(|&k| k % 2 == 0);
assert!(set.iter().eq([2, 4, 6].iter()));
```

## BTreeSet::append

```rust
pub fn append(&mut self, other: &mut Self) where T: Ord, A: Clone,
```

Moves all elements from `other` into `self`, leaving `other` empty.

# Examples

```rust
use std::collections::BTreeSet;

let mut a = BTreeSet::new();
a.insert(1);
a.insert(2);
a.insert(3);

let mut b = BTreeSet::new();
b.insert(3);
b.insert(4);
b.insert(5);

a.append(&mut b);

assert_eq!(a.len(), 5);
assert_eq!(b.len(), 0);

assert!(a.contains(&1));
assert!(a.contains(&2));
assert!(a.contains(&3));
assert!(a.contains(&4));
assert!(a.contains(&5));
```
