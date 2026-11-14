---
title: "alloc::collections::btree::map (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/btree/map.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::btree::map

## struct BTreeMap

```rust
pub struct BTreeMap< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An ordered map based on a [B-Tree].

Given a key type with a [total order], an ordered map stores its entries in key order.
That means that keys must be of a type that implements the `Ord` trait,
such that two keys can always be compared to determine their `Ordering`.
Examples of keys with a total order are strings with lexicographical order,
and numbers with their natural order.

Iterators obtained from functions such as `BTreeMap::iter`, `BTreeMap::into_iter`, `BTreeMap::values`, or
`BTreeMap::keys` produce their items in key order, and take worst-case logarithmic and
amortized constant time per item returned.

It is a logic error for a key to be modified in such a way that the key's ordering relative to
any other key, as determined by the `Ord` trait, changes while it is in the map. This is
normally only possible through `Cell`, `RefCell`, global state, I/O, or unsafe code.
The behavior resulting from such a logic error is not specified, but will be encapsulated to the
`BTreeMap` that observed the logic error and not result in undefined behavior. This could
include panics, incorrect results, aborts, memory leaks, and non-termination.

# Examples

```rust
use std::collections::BTreeMap;

// type inference lets us omit an explicit type signature (which
// would be `BTreeMap<&str, &str>` in this example).
let mut movie_reviews = BTreeMap::new();

// review some movies.
movie_reviews.insert("Office Space",       "Deals with real issues in the workplace.");
movie_reviews.insert("Pulp Fiction",       "Masterpiece.");
movie_reviews.insert("The Godfather",      "Very enjoyable.");
movie_reviews.insert("The Blues Brothers", "Eye lyked it a lot.");

// check for a specific one.
if !movie_reviews.contains_key("Les Misérables") {
    println!("We've got {} reviews, but Les Misérables ain't one.",
             movie_reviews.len());
}

// oops, this review has a lot of spelling mistakes, let's delete it.
movie_reviews.remove("The Blues Brothers");

// look up the values associated with some keys.
let to_find = ["Up!", "Office Space"];
for movie in &to_find {
    match movie_reviews.get(movie) {
       Some(review) => println!("{movie}: {review}"),
       None => println!("{movie} is unreviewed.")
    }
}

// Look up the value for a key (will panic if the key is not found).
println!("Movie review: {}", movie_reviews["Office Space"]);

// iterate over everything.
for (movie, review) in &movie_reviews {
    println!("{movie}: \"{review}\"");
}
```

A `BTreeMap` with a known list of items can be initialized from an array:

```rust
use std::collections::BTreeMap;

let solar_distance = BTreeMap::from([
    ("Mercury", 0.4),
    ("Venus", 0.7),
    ("Earth", 1.0),
    ("Mars", 1.5),
]);
```

## `Entry` API

`BTreeMap` implements an `Entry API`, which allows for complex
methods of getting, setting, updating and removing keys and their values:

```rust
use std::collections::BTreeMap;

// type inference lets us omit an explicit type signature (which
// would be `BTreeMap<&str, u8>` in this example).
let mut player_stats = BTreeMap::new();

fn random_stat_buff() -> u8 {
    // could actually return some random value here - let's just return
    // some fixed value for now
    42
}

// insert a key only if it doesn't already exist
player_stats.entry("health").or_insert(100);

// insert a key using a function that provides a new value only if it
// doesn't already exist
player_stats.entry("defence").or_insert_with(random_stat_buff);

// update a key, guarding against the key <example-value> not being set
let stat = player_stats.entry("attack").or_insert(100);
*stat += random_stat_buff();

// modify an entry before an insert with in-place mutation
player_stats.entry("mana").and_modify(|mana| *mana += 200).or_insert(100);
```

# Background

A B-tree is (like) a [binary search tree], but adapted to the natural granularity that modern
machines like to consume data at. This means that each node contains an entire array of elements,
instead of just a single element.

B-Trees represent a fundamental compromise between cache-efficiency and actually minimizing
the amount of work performed in a search. In theory, a binary search tree (BST) is the optimal
choice for a sorted map, as a perfectly balanced BST performs the theoretical minimum number of
comparisons necessary to find an element (log2n). However, in practice the way this
is done is *very* inefficient for modern computer architectures. In particular, every element
is stored in its own individually heap-allocated node. This means that every single insertion
triggers a heap-allocation, and every comparison is a potential cache-miss due to the indirection.
Since both heap-allocations and cache-misses are notably expensive in practice, we are forced to,
at the very least, reconsider the BST strategy.

A B-Tree instead makes each node contain B-1 to 2B-1 elements in a contiguous array. By doing
this, we reduce the number of allocations by a factor of B, and improve cache efficiency in
searches. However, this does mean that searches will have to do *more* comparisons on average.
The precise number of comparisons depends on the node search strategy used. For optimal cache
efficiency, one could search the nodes linearly. For optimal comparisons, one could search
the node using binary search. As a compromise, one could also perform a linear search
that initially only checks every ith element for some choice of i.

Currently, our implementation simply performs naive linear search. This provides excellent
performance on *small* nodes of elements which are cheap to compare. However in the future we
would like to further explore choosing the optimal search strategy based on the choice of B,
and possibly other factors. Using linear search, searching for a random element is expected
to take B * log(n) comparisons, which is generally worse than a BST. In practice,
however, performance is excellent.

## struct Iter

```rust
pub struct Iter<'a, K: 'a, V: 'a>
```

An iterator over the entries of a `BTreeMap`.

This `struct` is created by the `iter` method on `BTreeMap`. See its
documentation for more.

## struct IterMut

```rust
pub struct IterMut<'a, K: 'a, V: 'a>
```

A mutable iterator over the entries of a `BTreeMap`.

This `struct` is created by the `iter_mut` method on `BTreeMap`. See its
documentation for more.

## struct IntoIter

```rust
pub struct IntoIter< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An owning iterator over the entries of a `BTreeMap`, sorted by key.

This `struct` is created by the `into_iter` method on `BTreeMap`
(provided by the `IntoIterator` trait). See its documentation for more.

## struct Keys

```rust
pub struct Keys<'a, K, V>
```

An iterator over the keys of a `BTreeMap`.

This `struct` is created by the `keys` method on `BTreeMap`. See its
documentation for more.

## struct Values

```rust
pub struct Values<'a, K, V>
```

An iterator over the values of a `BTreeMap`.

This `struct` is created by the `values` method on `BTreeMap`. See its
documentation for more.

## struct ValuesMut

```rust
pub struct ValuesMut<'a, K, V>
```

A mutable iterator over the values of a `BTreeMap`.

This `struct` is created by the `values_mut` method on `BTreeMap`. See its
documentation for more.

## struct IntoKeys

```rust
pub struct IntoKeys< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An owning iterator over the keys of a `BTreeMap`.

This `struct` is created by the `into_keys` method on `BTreeMap`.
See its documentation for more.

## struct IntoValues

```rust
pub struct IntoValues< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An owning iterator over the values of a `BTreeMap`.

This `struct` is created by the `into_values` method on `BTreeMap`.
See its documentation for more.

## struct Range

```rust
pub struct Range<'a, K: 'a, V: 'a>
```

An iterator over a sub-range of entries in a `BTreeMap`.

This `struct` is created by the `range` method on `BTreeMap`. See its
documentation for more.

## struct RangeMut

```rust
pub struct RangeMut<'a, K: 'a, V: 'a>
```

A mutable iterator over a sub-range of entries in a `BTreeMap`.

This `struct` is created by the `range_mut` method on `BTreeMap`. See its
documentation for more.

## BTreeMap::new

```rust
pub const fn new() -> BTreeMap<K, V>
```

Makes a new, empty `BTreeMap`.

Does not allocate anything on its own.

# Examples

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();

// entries can now be inserted into the empty map
map.insert(1, "a");
```

## BTreeMap::clear

```rust
pub fn clear(&mut self)
```

Clears the map, removing all elements.

# Examples

```rust
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
a.insert(1, "a");
a.clear();
assert!(a.is_empty());
```

## BTreeMap::get

```rust
pub fn get<Q: ?Sized>(&self, key: &Q) -> Option<&V> where K: Borrow<Q> + Ord, Q: Ord,
```

Returns a reference to the value corresponding to the key.

The key may be any borrowed form of the map's key type, but the ordering
on the borrowed form *must* match the ordering on the key type.

# Examples

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
assert_eq!(map.get(&1), Some(&"a"));
assert_eq!(map.get(&2), None);
```

## BTreeMap::get_key_value

```rust
pub fn get_key_value<Q: ?Sized>(&self, k: &Q) -> Option<(&K, &V)> where K: Borrow<Q> + Ord, Q: Ord,
```

Returns the key-value pair corresponding to the supplied key. This is
potentially useful:
- for key types where non-identical keys can be considered equal;
- for getting the `&K` stored key value from a borrowed `&Q` lookup key; or
- for getting a reference to a key with the same lifetime as the collection.

The supplied key may be any borrowed form of the map's key type, but the ordering
on the borrowed form *must* match the ordering on the key type.

# Examples

```rust
use std::cmp::Ordering;
use std::collections::BTreeMap;

#[derive(Clone, Copy, Debug)]
struct S {
    id: u32,
    name: &'static str, // ignored by equality and ordering operations
}

impl PartialEq for S {
    fn eq(&self, other: &S) -> bool {
        self.id == other.id
    }
}

impl Eq for S {}

impl PartialOrd for S {
    fn partial_cmp(&self, other: &S) -> Option<Ordering> {
        self.id.partial_cmp(&other.id)
    }
}

impl Ord for S {
    fn cmp(&self, other: &S) -> Ordering {
        self.id.cmp(&other.id)
    }
}

let j_a = S { id: 1, name: "Jessica" };
let j_b = S { id: 1, name: "Jess" };
let p = S { id: 2, name: "Paul" };
assert_eq!(j_a, j_b);

let mut map = BTreeMap::new();
map.insert(j_a, "Paris");
assert_eq!(map.get_key_value(&j_a), Some((&j_a, &"Paris")));
assert_eq!(map.get_key_value(&j_b), Some((&j_a, &"Paris"))); // the notable case
assert_eq!(map.get_key_value(&p), None);
```

## BTreeMap::first_key_value

```rust
pub fn first_key_value(&self) -> Option<(&K, &V)> where K: Ord,
```

Returns the first key-value pair in the map.
The key in this pair is the minimum key in the map.

# Examples

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
assert_eq!(map.first_key_value(), None);
map.insert(1, "b");
map.insert(2, "a");
assert_eq!(map.first_key_value(), Some((&1, &"b")));
```

## BTreeMap::first_entry

```rust
pub fn first_entry(&mut self) -> Option<OccupiedEntry<'_, K, V, A>> where K: Ord,
```

Returns the first entry in the map for in-place manipulation.
The key of this entry is the minimum key in the map.

# Examples

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
map.insert(2, "b");
if let Some(mut entry) = map.first_entry() {
    if *entry.key() > 0 {
        entry.insert("first");
    }
}
assert_eq!(*map.get(&1).unwrap(), "first");
assert_eq!(*map.get(&2).unwrap(), "b");
```

## BTreeMap::pop_first

```rust
pub fn pop_first(&mut self) -> Option<(K, V)> where K: Ord,
```

Removes and returns the first element in the map.
The key of this element is the minimum key that was in the map.

# Examples

Draining elements in ascending order, while keeping a usable map each iteration.

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
map.insert(2, "b");
while let Some((key, _val)) = map.pop_first() {
    assert!(map.iter().all(|(k, _v)| *k > key));
}
assert!(map.is_empty());
```

## BTreeMap::last_key_value

```rust
pub fn last_key_value(&self) -> Option<(&K, &V)> where K: Ord,
```

Returns the last key-value pair in the map.
The key in this pair is the maximum key in the map.

# Examples

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "b");
map.insert(2, "a");
assert_eq!(map.last_key_value(), Some((&2, &"a")));
```

## BTreeMap::last_entry

```rust
pub fn last_entry(&mut self) -> Option<OccupiedEntry<'_, K, V, A>> where K: Ord,
```

Returns the last entry in the map for in-place manipulation.
The key of this entry is the maximum key in the map.

# Examples

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
map.insert(2, "b");
if let Some(mut entry) = map.last_entry() {
    if *entry.key() > 0 {
        entry.insert("last");
    }
}
assert_eq!(*map.get(&1).unwrap(), "a");
assert_eq!(*map.get(&2).unwrap(), "last");
```

## BTreeMap::pop_last

```rust
pub fn pop_last(&mut self) -> Option<(K, V)> where K: Ord,
```

Removes and returns the last element in the map.
The key of this element is the maximum key that was in the map.

# Examples

Draining elements in descending order, while keeping a usable map each iteration.

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
map.insert(2, "b");
while let Some((key, _val)) = map.pop_last() {
    assert!(map.iter().all(|(k, _v)| *k < key));
}
assert!(map.is_empty());
```

## BTreeMap::contains_key

```rust
pub fn contains_key<Q: ?Sized>(&self, key: &Q) -> bool where K: Borrow<Q> + Ord, Q: Ord,
```

Returns `true` if the map contains a value for the specified key.

The key may be any borrowed form of the map's key type, but the ordering
on the borrowed form *must* match the ordering on the key type.

# Examples

```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
assert_eq!(map.contains_key(&1), true);
assert_eq!(map.contains_key(&2), false);
```
