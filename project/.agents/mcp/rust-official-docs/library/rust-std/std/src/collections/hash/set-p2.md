---
title: "std::collections::hash::set (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/collections/hash/set.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::collections::hash::set (part 2 of 2)

## HashSet::intersection

```rust
pub fn intersection<'a>(&'a self, other: &'a HashSet<T, S, A>) -> Intersection<'a, T, S, A>
```

Visits the values representing the intersection,
i.e., the values that are both in `self` and `other`.

When an equal element is present in `self` and `other`
then the resulting `Intersection` may yield references to
one or the other. This can be relevant if `T` contains fields which
are not compared by its `Eq` implementation, and may hold different
value between the two equal copies of `T` in the two sets.

# Examples

```rust
use std::collections::HashSet;
let a = HashSet::from([1, 2, 3]);
let b = HashSet::from([4, 2, 3, 4]);

// Print 2, 3 in arbitrary order.
for x in a.intersection(&b) {
    println!("{x}");
}

let intersection: HashSet<_> = a.intersection(&b).collect();
assert_eq!(intersection, [2, 3].iter().collect());
```

## HashSet::union

```rust
pub fn union<'a>(&'a self, other: &'a HashSet<T, S, A>) -> Union<'a, T, S, A>
```

Visits the values representing the union,
i.e., all the values in `self` or `other`, without duplicates.

# Examples

```rust
use std::collections::HashSet;
let a = HashSet::from([1, 2, 3]);
let b = HashSet::from([4, 2, 3, 4]);

// Print 1, 2, 3, 4 in arbitrary order.
for x in a.union(&b) {
    println!("{x}");
}

let union: HashSet<_> = a.union(&b).collect();
assert_eq!(union, [1, 2, 3, 4].iter().collect());
```

## HashSet::contains

```rust
pub fn contains<Q: ?Sized>(&self, value: &Q) -> bool where T: Borrow<Q>, Q: Hash + Eq,
```

Returns `true` if the set contains a value.

The value may be any borrowed form of the set's value type, but
`Hash` and `Eq` on the borrowed form *must* match those for
the value type.

# Examples

```rust
use std::collections::HashSet;

let set = HashSet::from([1, 2, 3]);
assert_eq!(set.contains(&1), true);
assert_eq!(set.contains(&4), false);
```

## HashSet::get

```rust
pub fn get<Q: ?Sized>(&self, value: &Q) -> Option<&T> where T: Borrow<Q>, Q: Hash + Eq,
```

Returns a reference to the value in the set, if any, that is equal to the given value.

The value may be any borrowed form of the set's value type, but
`Hash` and `Eq` on the borrowed form *must* match those for
the value type.

# Examples

```rust
use std::collections::HashSet;

let set = HashSet::from([1, 2, 3]);
assert_eq!(set.get(&2), Some(&2));
assert_eq!(set.get(&4), None);
```

## HashSet::is_disjoint

```rust
pub fn is_disjoint(&self, other: &HashSet<T, S, A>) -> bool
```

Returns `true` if `self` has no elements in common with `other`.
This is equivalent to checking for an empty intersection.

# Examples

```rust
use std::collections::HashSet;

let a = HashSet::from([1, 2, 3]);
let mut b = HashSet::new();

assert_eq!(a.is_disjoint(&b), true);
b.insert(4);
assert_eq!(a.is_disjoint(&b), true);
b.insert(1);
assert_eq!(a.is_disjoint(&b), false);
```

## HashSet::is_subset

```rust
pub fn is_subset(&self, other: &HashSet<T, S, A>) -> bool
```

Returns `true` if the set is a subset of another,
i.e., `other` contains at least all the values in `self`.

# Examples

```rust
use std::collections::HashSet;

let sup = HashSet::from([1, 2, 3]);
let mut set = HashSet::new();

assert_eq!(set.is_subset(&sup), true);
set.insert(2);
assert_eq!(set.is_subset(&sup), true);
set.insert(4);
assert_eq!(set.is_subset(&sup), false);
```

## HashSet::is_superset

```rust
pub fn is_superset(&self, other: &HashSet<T, S, A>) -> bool
```

Returns `true` if the set is a superset of another,
i.e., `self` contains at least all the values in `other`.

# Examples

```rust
use std::collections::HashSet;

let sub = HashSet::from([1, 2]);
let mut set = HashSet::new();

assert_eq!(set.is_superset(&sub), false);

set.insert(0);
set.insert(1);
assert_eq!(set.is_superset(&sub), false);

set.insert(2);
assert_eq!(set.is_superset(&sub), true);
```

## HashSet::insert

```rust
pub fn insert(&mut self, value: T) -> bool
```

Adds a value to the set.

Returns whether the value was newly inserted. That is:

- If the set did not previously contain this value, `true` is returned.
- If the set already contained this value, `false` is returned,
  and the set is not modified: original value is not replaced,
  and the value passed as argument is dropped.

# Examples

```rust
use std::collections::HashSet;

let mut set = HashSet::new();

assert_eq!(set.insert(2), true);
assert_eq!(set.insert(2), false);
assert_eq!(set.len(), 1);
```

## HashSet::replace

```rust
pub fn replace(&mut self, value: T) -> Option<T>
```

Adds a value to the set, replacing the existing value, if any, that is equal to the given
one. Returns the replaced value.

# Examples

```rust
use std::collections::HashSet;

let mut set = HashSet::new();
set.insert(Vec::<i32>::new());

assert_eq!(set.get(&[][..]).unwrap().capacity(), 0);
set.replace(Vec::with_capacity(10));
assert_eq!(set.get(&[][..]).unwrap().capacity(), 10);
```

## HashSet::remove

```rust
pub fn remove<Q: ?Sized>(&mut self, value: &Q) -> bool where T: Borrow<Q>, Q: Hash + Eq,
```

Removes a value from the set. Returns whether the value was
present in the set.

The value may be any borrowed form of the set's value type, but
`Hash` and `Eq` on the borrowed form *must* match those for
the value type.

# Examples

```rust
use std::collections::HashSet;

let mut set = HashSet::new();

set.insert(2);
assert_eq!(set.remove(&2), true);
assert_eq!(set.remove(&2), false);
```

## HashSet::take

```rust
pub fn take<Q: ?Sized>(&mut self, value: &Q) -> Option<T> where T: Borrow<Q>, Q: Hash + Eq,
```

Removes and returns the value in the set, if any, that is equal to the given one.

The value may be any borrowed form of the set's value type, but
`Hash` and `Eq` on the borrowed form *must* match those for
the value type.

# Examples

```rust
use std::collections::HashSet;

let mut set = HashSet::from([1, 2, 3]);
assert_eq!(set.take(&2), Some(2));
assert_eq!(set.take(&2), None);
```

## struct Iter

```rust
pub struct Iter<'a, K: 'a>
```

An iterator over the items of a `HashSet`.

This `struct` is created by the `iter` method on `HashSet`.
See its documentation for more.

# Examples

```rust
use std::collections::HashSet;

let a = HashSet::from([1, 2, 3]);

let mut iter = a.iter();
```

## struct IntoIter

```rust
pub struct IntoIter< K, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An owning iterator over the items of a `HashSet`.

This `struct` is created by the `into_iter` method on `HashSet`
(provided by the `IntoIterator` trait). See its documentation for more.

# Examples

```rust
use std::collections::HashSet;

let a = HashSet::from([1, 2, 3]);

let mut iter = a.into_iter();
```

## struct Drain

```rust
pub struct Drain< 'a, K: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A draining iterator over the items of a `HashSet`.

This `struct` is created by the `drain` method on `HashSet`.
See its documentation for more.

# Examples

```rust
use std::collections::HashSet;

let mut a = HashSet::from([1, 2, 3]);

let mut drain = a.drain();
```

## struct ExtractIf

```rust
pub struct ExtractIf< 'a, K, F, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A draining, filtering iterator over the items of a `HashSet`.

This `struct` is created by the `extract_if` method on `HashSet`.

# Examples

```rust
use std::collections::HashSet;

let mut a = HashSet::from([1, 2, 3]);

let mut extract_ifed = a.extract_if(|v| v % 2 == 0);
```

## struct Intersection

```rust
pub struct Intersection< 'a, T: 'a, S: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A lazy iterator producing elements in the intersection of `HashSet`s.

This `struct` is created by the `intersection` method on `HashSet`.
See its documentation for more.

# Examples

```rust
use std::collections::HashSet;

let a = HashSet::from([1, 2, 3]);
let b = HashSet::from([4, 2, 3, 4]);

let mut intersection = a.intersection(&b);
```

## struct Difference

```rust
pub struct Difference< 'a, T: 'a, S: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A lazy iterator producing elements in the difference of `HashSet`s.

This `struct` is created by the `difference` method on `HashSet`.
See its documentation for more.

# Examples

```rust
use std::collections::HashSet;

let a = HashSet::from([1, 2, 3]);
let b = HashSet::from([4, 2, 3, 4]);

let mut difference = a.difference(&b);
```

## struct SymmetricDifference

```rust
pub struct SymmetricDifference< 'a, T: 'a, S: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A lazy iterator producing elements in the symmetric difference of `HashSet`s.

This `struct` is created by the `symmetric_difference` method on
`HashSet`. See its documentation for more.

# Examples

```rust
use std::collections::HashSet;

let a = HashSet::from([1, 2, 3]);
let b = HashSet::from([4, 2, 3, 4]);

let mut intersection = a.symmetric_difference(&b);
```

## struct Union

```rust
pub struct Union< 'a, T: 'a, S: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A lazy iterator producing elements in the union of `HashSet`s.

This `struct` is created by the `union` method on `HashSet`.
See its documentation for more.

# Examples

```rust
use std::collections::HashSet;

let a = HashSet::from([1, 2, 3]);
let b = HashSet::from([4, 2, 3, 4]);

let mut union_iter = a.union(&b);
```
