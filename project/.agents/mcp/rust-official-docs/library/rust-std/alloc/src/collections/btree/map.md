# alloc::collections::btree::map

## struct BTreeMap

```rust
pub struct BTreeMap< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An ordered map based on a [B-Tree].

Given a key type with a [total order], an ordered map stores its entries in key order.
That means that keys must be of a type that implements the [`Ord`] trait,
such that two keys can always be compared to determine their [`Ordering`].
Examples of keys with a total order are strings with lexicographical order,
and numbers with their natural order.

Iterators obtained from functions such as [`BTreeMap::iter`], [`BTreeMap::into_iter`], [`BTreeMap::values`], or
[`BTreeMap::keys`] produce their items in key order, and take worst-case logarithmic and
amortized constant time per item returned.

It is a logic error for a key to be modified in such a way that the key's ordering relative to
any other key, as determined by the [`Ord`] trait, changes while it is in the map. This is
normally only possible through [`Cell`], [`RefCell`], global state, I/O, or unsafe code.
The behavior resulting from such a logic error is not specified, but will be encapsulated to the
`BTreeMap` that observed the logic error and not result in undefined behavior. This could
include panics, incorrect results, aborts, memory leaks, and non-termination.

# Examples

```
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

```
use std::collections::BTreeMap;

let solar_distance = BTreeMap::from([
    ("Mercury", 0.4),
    ("Venus", 0.7),
    ("Earth", 1.0),
    ("Mars", 1.5),
]);
```

## `Entry` API

`BTreeMap` implements an [`Entry API`], which allows for complex
methods of getting, setting, updating and removing keys and their values:

[`Entry API`]: BTreeMap::entry

```
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

// update a key, guarding against the key possibly not being set
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
comparisons necessary to find an element (log<sub>2</sub>n). However, in practice the way this
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
that initially only checks every i<sup>th</sup> element for some choice of i.

Currently, our implementation simply performs naive linear search. This provides excellent
performance on *small* nodes of elements which are cheap to compare. However in the future we
would like to further explore choosing the optimal search strategy based on the choice of B,
and possibly other factors. Using linear search, searching for a random element is expected
to take B * log(n) comparisons, which is generally worse than a BST. In practice,
however, performance is excellent.

[B-Tree]: https://en.wikipedia.org/wiki/B-tree
[binary search tree]: https://en.wikipedia.org/wiki/Binary_search_tree
[total order]: https://en.wikipedia.org/wiki/Total_order
[`Cell`]: core::cell::Cell
[`RefCell`]: core::cell::RefCell

## struct Iter

```rust
pub struct Iter<'a, K: 'a, V: 'a>
```

An iterator over the entries of a `BTreeMap`.

This `struct` is created by the [`iter`] method on [`BTreeMap`]. See its
documentation for more.

[`iter`]: BTreeMap::iter

## struct IterMut

```rust
pub struct IterMut<'a, K: 'a, V: 'a>
```

A mutable iterator over the entries of a `BTreeMap`.

This `struct` is created by the [`iter_mut`] method on [`BTreeMap`]. See its
documentation for more.

[`iter_mut`]: BTreeMap::iter_mut

## struct IntoIter

```rust
pub struct IntoIter< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An owning iterator over the entries of a `BTreeMap`, sorted by key.

This `struct` is created by the [`into_iter`] method on [`BTreeMap`]
(provided by the [`IntoIterator`] trait). See its documentation for more.

[`into_iter`]: IntoIterator::into_iter

## struct Keys

```rust
pub struct Keys<'a, K, V>
```

An iterator over the keys of a `BTreeMap`.

This `struct` is created by the [`keys`] method on [`BTreeMap`]. See its
documentation for more.

[`keys`]: BTreeMap::keys

## struct Values

```rust
pub struct Values<'a, K, V>
```

An iterator over the values of a `BTreeMap`.

This `struct` is created by the [`values`] method on [`BTreeMap`]. See its
documentation for more.

[`values`]: BTreeMap::values

## struct ValuesMut

```rust
pub struct ValuesMut<'a, K, V>
```

A mutable iterator over the values of a `BTreeMap`.

This `struct` is created by the [`values_mut`] method on [`BTreeMap`]. See its
documentation for more.

[`values_mut`]: BTreeMap::values_mut

## struct IntoKeys

```rust
pub struct IntoKeys< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An owning iterator over the keys of a `BTreeMap`.

This `struct` is created by the [`into_keys`] method on [`BTreeMap`].
See its documentation for more.

[`into_keys`]: BTreeMap::into_keys

## struct IntoValues

```rust
pub struct IntoValues< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

An owning iterator over the values of a `BTreeMap`.

This `struct` is created by the [`into_values`] method on [`BTreeMap`].
See its documentation for more.

[`into_values`]: BTreeMap::into_values

## struct Range

```rust
pub struct Range<'a, K: 'a, V: 'a>
```

An iterator over a sub-range of entries in a `BTreeMap`.

This `struct` is created by the [`range`] method on [`BTreeMap`]. See its
documentation for more.

[`range`]: BTreeMap::range

## struct RangeMut

```rust
pub struct RangeMut<'a, K: 'a, V: 'a>
```

A mutable iterator over a sub-range of entries in a `BTreeMap`.

This `struct` is created by the [`range_mut`] method on [`BTreeMap`]. See its
documentation for more.

[`range_mut`]: BTreeMap::range_mut

## BTreeMap::new

```rust
pub const fn new() -> BTreeMap<K, V>
```

Makes a new, empty `BTreeMap`.

Does not allocate anything on its own.

# Examples

```
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

```
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

```
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

```
use std::cmp::Ordering;
use std::collections::BTreeMap;

#[derive(Clone, Copy, Debug)]
struct S {
    id: u32,
#   #[allow(unused)] // prevents a "field `name` is never read" error
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

```
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

```
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

```
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

```
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

```
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

```
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

```
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
assert_eq!(map.contains_key(&1), true);
assert_eq!(map.contains_key(&2), false);
```

## BTreeMap::insert

```rust
pub fn insert(&mut self, key: K, value: V) -> Option<V> where K: Ord,
```

Inserts a key-value pair into the map.

If the map did not have this key present, `None` is returned.

If the map did have this key present, the value is updated, and the old
value is returned. The key is not updated, though; this matters for
types that can be `==` without being identical. See the [module-level
documentation] for more.

[module-level documentation]: index.html#insert-and-complex-keys

# Examples

```
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
assert_eq!(map.insert(37, "a"), None);
assert_eq!(map.is_empty(), false);

map.insert(37, "b");
assert_eq!(map.insert(37, "c"), Some("b"));
assert_eq!(map[&37], "c");
```

## BTreeMap::remove

```rust
pub fn remove<Q: ?Sized>(&mut self, key: &Q) -> Option<V> where K: Borrow<Q> + Ord, Q: Ord,
```

Removes a key from the map, returning the value at the key if the key
was previously in the map.

The key may be any borrowed form of the map's key type, but the ordering
on the borrowed form *must* match the ordering on the key type.

# Examples

```
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
assert_eq!(map.remove(&1), Some("a"));
assert_eq!(map.remove(&1), None);
```

## BTreeMap::remove_entry

```rust
pub fn remove_entry<Q: ?Sized>(&mut self, key: &Q) -> Option<(K, V)> where K: Borrow<Q> + Ord, Q: Ord,
```

Removes a key from the map, returning the stored key and value if the key
was previously in the map.

The key may be any borrowed form of the map's key type, but the ordering
on the borrowed form *must* match the ordering on the key type.

# Examples

```
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(1, "a");
assert_eq!(map.remove_entry(&1), Some((1, "a")));
assert_eq!(map.remove_entry(&1), None);
```

## BTreeMap::retain

```rust
pub fn retain<F>(&mut self, mut f: F) where K: Ord, F: FnMut(&K, &mut V) -> bool,
```

Retains only the elements specified by the predicate.

In other words, remove all pairs `(k, v)` for which `f(&k, &mut v)` returns `false`.
The elements are visited in ascending key order.

# Examples

```
use std::collections::BTreeMap;

let mut map: BTreeMap<i32, i32> = (0..8).map(|x| (x, x*10)).collect();
// Keep only the elements with even-numbered keys.
map.retain(|&k, _| k % 2 == 0);
assert!(map.into_iter().eq(vec![(0, 0), (2, 20), (4, 40), (6, 60)]));
```

## BTreeMap::append

```rust
pub fn append(&mut self, other: &mut Self) where K: Ord, A: Clone,
```

Moves all elements from `other` into `self`, leaving `other` empty.

If a key from `other` is already present in `self`, the respective
value from `self` will be overwritten with the respective value from `other`.
Similar to [`insert`], though, the key is not overwritten,
which matters for types that can be `==` without being identical.

[`insert`]: BTreeMap::insert

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
a.insert(1, "a");
a.insert(2, "b");
a.insert(3, "c"); // Note: Key (3) also present in b.

let mut b = BTreeMap::new();
b.insert(3, "d"); // Note: Key (3) also present in a.
b.insert(4, "e");
b.insert(5, "f");

a.append(&mut b);

assert_eq!(a.len(), 5);
assert_eq!(b.len(), 0);

assert_eq!(a[&1], "a");
assert_eq!(a[&2], "b");
assert_eq!(a[&3], "d"); // Note: "c" has been overwritten.
assert_eq!(a[&4], "e");
assert_eq!(a[&5], "f");
```

## BTreeMap::range

```rust
pub fn range<T: ?Sized, R>(&self, range: R) -> Range<'_, K, V> where T: Ord, K: Borrow<T> + Ord, R: RangeBounds<T>,
```

Constructs a double-ended iterator over a sub-range of elements in the map.
The simplest way is to use the range syntax `min..max`, thus `range(min..max)` will
yield elements from min (inclusive) to max (exclusive).
The range may also be entered as `(Bound<T>, Bound<T>)`, so for example
`range((Excluded(4), Included(10)))` will yield a left-exclusive, right-inclusive
range from 4 to 10.

# Panics

Panics if range `start > end`.
Panics if range `start == end` and both bounds are `Excluded`.

# Examples

```
use std::collections::BTreeMap;
use std::ops::Bound::Included;

let mut map = BTreeMap::new();
map.insert(3, "a");
map.insert(5, "b");
map.insert(8, "c");
for (&key, &value) in map.range((Included(&4), Included(&8))) {
    println!("{key}: {value}");
}
assert_eq!(Some((&5, &"b")), map.range(4..).next());
```

## BTreeMap::range_mut

```rust
pub fn range_mut<T: ?Sized, R>(&mut self, range: R) -> RangeMut<'_, K, V> where T: Ord, K: Borrow<T> + Ord, R: RangeBounds<T>,
```

Constructs a mutable double-ended iterator over a sub-range of elements in the map.
The simplest way is to use the range syntax `min..max`, thus `range(min..max)` will
yield elements from min (inclusive) to max (exclusive).
The range may also be entered as `(Bound<T>, Bound<T>)`, so for example
`range((Excluded(4), Included(10)))` will yield a left-exclusive, right-inclusive
range from 4 to 10.

# Panics

Panics if range `start > end`.
Panics if range `start == end` and both bounds are `Excluded`.

# Examples

```
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, i32> =
    [("Alice", 0), ("Bob", 0), ("Carol", 0), ("Cheryl", 0)].into();
for (_, balance) in map.range_mut("B".."Cheryl") {
    *balance += 100;
}
for (name, balance) in &map {
    println!("{name} => {balance}");
}
```

## BTreeMap::entry

```rust
pub fn entry(&mut self, key: K) -> Entry<'_, K, V, A> where K: Ord,
```

Gets the given key's corresponding entry in the map for in-place manipulation.

# Examples

```
use std::collections::BTreeMap;

let mut count: BTreeMap<&str, usize> = BTreeMap::new();

// count the number of occurrences of letters in the vec
for x in ["a", "b", "a", "c", "a", "b"] {
    count.entry(x).and_modify(|curr| *curr += 1).or_insert(1);
}

assert_eq!(count["a"], 3);
assert_eq!(count["b"], 2);
assert_eq!(count["c"], 1);
```

## BTreeMap::split_off

```rust
pub fn split_off<Q: ?Sized + Ord>(&mut self, key: &Q) -> Self where K: Borrow<Q> + Ord, A: Clone,
```

Splits the collection into two at the given key. Returns everything after the given key,
including the key. If the key is not present, the split will occur at the nearest
greater key, or return an empty map if no such key exists.

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
a.insert(1, "a");
a.insert(2, "b");
a.insert(3, "c");
a.insert(17, "d");
a.insert(41, "e");

let b = a.split_off(&3);

assert_eq!(a.len(), 2);
assert_eq!(b.len(), 3);

assert_eq!(a[&1], "a");
assert_eq!(a[&2], "b");

assert_eq!(b[&3], "c");
assert_eq!(b[&17], "d");
assert_eq!(b[&41], "e");
```

## BTreeMap::extract_if

```rust
pub fn extract_if<F, R>(&mut self, range: R, pred: F) -> ExtractIf<'_, K, V, R, F, A> where K: Ord, R: RangeBounds<K>, F: FnMut(&K, &mut V) -> bool,
```

Creates an iterator that visits elements (key-value pairs) in the specified range in
ascending key order and uses a closure to determine if an element
should be removed.

If the closure returns `true`, the element is removed from the map and
yielded. If the closure returns `false`, or panics, the element remains
in the map and will not be yielded.

The iterator also lets you mutate the value of each element in the
closure, regardless of whether you choose to keep or remove it.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating
or the iteration short-circuits, then the remaining elements will be retained.
Use `extract_if().for_each(drop)` if you do not need the returned iterator,
or [`retain`] with a negated predicate if you also do not need to restrict the range.

[`retain`]: BTreeMap::retain

# Examples

```
use std::collections::BTreeMap;

// Splitting a map into even and odd keys, reusing the original map:
let mut map: BTreeMap<i32, i32> = (0..8).map(|x| (x, x)).collect();
let evens: BTreeMap<_, _> = map.extract_if(.., |k, _v| k % 2 == 0).collect();
let odds = map;
assert_eq!(evens.keys().copied().collect::<Vec<_>>(), [0, 2, 4, 6]);
assert_eq!(odds.keys().copied().collect::<Vec<_>>(), [1, 3, 5, 7]);

// Splitting a map into low and high halves, reusing the original map:
let mut map: BTreeMap<i32, i32> = (0..8).map(|x| (x, x)).collect();
let low: BTreeMap<_, _> = map.extract_if(0..4, |_k, _v| true).collect();
let high = map;
assert_eq!(low.keys().copied().collect::<Vec<_>>(), [0, 1, 2, 3]);
assert_eq!(high.keys().copied().collect::<Vec<_>>(), [4, 5, 6, 7]);
```

## BTreeMap::into_keys

```rust
pub fn into_keys(self) -> IntoKeys<K, V, A>
```

Creates a consuming iterator visiting all the keys, in sorted order.
The map cannot be used after calling this.
The iterator element type is `K`.

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
a.insert(2, "b");
a.insert(1, "a");

let keys: Vec<i32> = a.into_keys().collect();
assert_eq!(keys, [1, 2]);
```

## BTreeMap::into_values

```rust
pub fn into_values(self) -> IntoValues<K, V, A>
```

Creates a consuming iterator visiting all the values, in order by key.
The map cannot be used after calling this.
The iterator element type is `V`.

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
a.insert(1, "hello");
a.insert(2, "goodbye");

let values: Vec<&str> = a.into_values().collect();
assert_eq!(values, ["hello", "goodbye"]);
```

## struct ExtractIf

```rust
pub struct ExtractIf< 'a, K, V, R, F, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

This `struct` is created by the [`extract_if`] method on [`BTreeMap`].

[`extract_if`]: BTreeMap::extract_if

## BTreeMap::iter

```rust
pub fn iter(&self) -> Iter<'_, K, V>
```

Gets an iterator over the entries of the map, sorted by key.

# Examples

```
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(3, "c");
map.insert(2, "b");
map.insert(1, "a");

for (key, value) in map.iter() {
    println!("{key}: {value}");
}

let (first_key, first_value) = map.iter().next().unwrap();
assert_eq!((*first_key, *first_value), (1, "a"));
```

## BTreeMap::iter_mut

```rust
pub fn iter_mut(&mut self) -> IterMut<'_, K, V>
```

Gets a mutable iterator over the entries of the map, sorted by key.

# Examples

```
use std::collections::BTreeMap;

let mut map = BTreeMap::from([
   ("a", 1),
   ("b", 2),
   ("c", 3),
]);

// add 10 to the value if the key isn't "a"
for (key, value) in map.iter_mut() {
    if key != &"a" {
        *value += 10;
    }
}
```

## BTreeMap::keys

```rust
pub fn keys(&self) -> Keys<'_, K, V>
```

Gets an iterator over the keys of the map, in sorted order.

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
a.insert(2, "b");
a.insert(1, "a");

let keys: Vec<_> = a.keys().cloned().collect();
assert_eq!(keys, [1, 2]);
```

## BTreeMap::values

```rust
pub fn values(&self) -> Values<'_, K, V>
```

Gets an iterator over the values of the map, in order by key.

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
a.insert(1, "hello");
a.insert(2, "goodbye");

let values: Vec<&str> = a.values().cloned().collect();
assert_eq!(values, ["hello", "goodbye"]);
```

## BTreeMap::values_mut

```rust
pub fn values_mut(&mut self) -> ValuesMut<'_, K, V>
```

Gets a mutable iterator over the values of the map, in order by key.

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
a.insert(1, String::from("hello"));
a.insert(2, String::from("goodbye"));

for value in a.values_mut() {
    value.push_str("!");
}

let values: Vec<String> = a.values().cloned().collect();
assert_eq!(values, [String::from("hello!"),
                    String::from("goodbye!")]);
```

## BTreeMap::len

```rust
pub const fn len(&self) -> usize
```

Returns the number of elements in the map.

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
assert_eq!(a.len(), 0);
a.insert(1, "a");
assert_eq!(a.len(), 1);
```

## BTreeMap::is_empty

```rust
pub const fn is_empty(&self) -> bool
```

Returns `true` if the map contains no elements.

# Examples

```
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
assert!(a.is_empty());
a.insert(1, "a");
assert!(!a.is_empty());
```