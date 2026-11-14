---
title: "alloc::collections::btree::map (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/btree/map.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::btree::map (part 2 of 2)

## BTreeMap::insert

```rust
pub fn insert(&mut self, key: K, value: V) -> Option<V> where K: Ord,
```

Inserts a key-value pair into the map.

If the map did not have this key <example-value>, `None` is returned.

If the map did have this key <example-value>, the value is updated, and the old
value is returned. The key is not updated, though; this matters for
types that can be `==` without being identical. See the [module-level
documentation] for more.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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
Similar to `insert`, though, the key is not overwritten,
which matters for types that can be `==` without being identical.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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
or `retain` with a negated predicate if you also do not need to restrict the range.

# Examples

```rust
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

```rust
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

```rust
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

This `struct` is created by the `extract_if` method on `BTreeMap`.

## BTreeMap::iter

```rust
pub fn iter(&self) -> Iter<'_, K, V>
```

Gets an iterator over the entries of the map, sorted by key.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

```rust
use std::collections::BTreeMap;

let mut a = BTreeMap::new();
assert!(a.is_empty());
a.insert(1, "a");
assert!(!a.is_empty());
```
