---
title: "std::collections::hash::map (part 2 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/collections/hash/map.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::collections::hash::map (part 2 of 3)

## HashMap::iter

```rust
pub fn iter(&self) -> Iter<'_, K, V>
```

An iterator visiting all key-value pairs in arbitrary order.
The iterator element type is `(&'a K, &'a V)`.

# Examples

```rust
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

let mut count = 0;

for (_key, _val) in map.iter() {
    count += 1;
}

assert_eq!(count, 3);
```

# Performance

In the current implementation, iterating over map takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashMap::iter_mut

```rust
pub fn iter_mut(&mut self) -> IterMut<'_, K, V>
```

An iterator visiting all key-value pairs in arbitrary order,
with mutable references to the values.
The iterator element type is `(&'a K, &'a mut V)`.

# Examples

```rust
use std::collections::HashMap;

let mut map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

// Update all values
for (_, val) in map.iter_mut() {
    *val *= 2;
}

assert_eq!(map.get("a"), Some(&2));
assert_eq!(map.get("b"), Some(&4));
assert_eq!(map.get("c"), Some(&6));
```

# Performance

In the current implementation, iterating over map takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashMap::len

```rust
pub fn len(&self) -> usize
```

Returns the number of elements in the map.

# Examples

```rust
use std::collections::HashMap;

let mut a = HashMap::new();
assert_eq!(a.len(), 0);
a.insert(1, "a");
assert_eq!(a.len(), 1);
```

## HashMap::is_empty

```rust
pub fn is_empty(&self) -> bool
```

Returns `true` if the map contains no elements.

# Examples

```rust
use std::collections::HashMap;

let mut a = HashMap::new();
assert!(a.is_empty());
a.insert(1, "a");
assert!(!a.is_empty());
```

## HashMap::drain

```rust
pub fn drain(&mut self) -> Drain<'_, K, V, A>
```

Clears the map, returning all key-value pairs as an iterator. Keeps the
allocated memory for reuse.

If the returned iterator is dropped before being fully consumed, it
drops the remaining key-value pairs. The returned iterator keeps a
mutable borrow on the map to optimize its implementation.

# Examples

```rust
use std::collections::HashMap;

let mut a = HashMap::new();
a.insert(1, "a");
a.insert(2, "b");

for (k, v) in a.drain().take(1) {
    assert!(k == 1 || k == 2);
    assert!(v == "a" || v == "b");
}

assert!(a.is_empty());
```

## HashMap::extract_if

```rust
pub fn extract_if<F>(&mut self, pred: F) -> ExtractIf<'_, K, V, F, A> where F: FnMut(&K, &mut V) -> bool,
```

Creates an iterator which uses a closure to determine if an element (key-value pair) should be removed.

If the closure returns `true`, the element is removed from the map and
yielded. If the closure returns `false`, or panics, the element remains
in the map and will not be yielded.

The iterator also lets you mutate the value of each element in the
closure, regardless of whether you choose to keep or remove it.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating
or the iteration short-circuits, then the remaining elements will be retained.
Use `retain` with a negated predicate if you do not need the returned iterator.

# Examples

Splitting a map into even and odd keys, reusing the original map:

```rust
use std::collections::HashMap;

let mut map: HashMap<i32, i32> = (0..8).map(|x| (x, x)).collect();
let extracted: HashMap<i32, i32> = map.extract_if(|k, _v| k % 2 == 0).collect();

let mut evens = extracted.keys().copied().collect::<Vec<_>>();
let mut odds = map.keys().copied().collect::<Vec<_>>();
evens.sort();
odds.sort();

assert_eq!(evens, vec![0, 2, 4, 6]);
assert_eq!(odds, vec![1, 3, 5, 7]);
```

## HashMap::retain

```rust
pub fn retain<F>(&mut self, f: F) where F: FnMut(&K, &mut V) -> bool,
```

Retains only the elements specified by the predicate.

In other words, remove all pairs `(k, v)` for which `f(&k, &mut v)` returns `false`.
The elements are visited in unsorted (and unspecified) order.

# Examples

```rust
use std::collections::HashMap;

let mut map: HashMap<i32, i32> = (0..8).map(|x| (x, x*10)).collect();
map.retain(|&k, _| k % 2 == 0);
assert_eq!(map.len(), 4);
```

# Performance

In the current implementation, this operation takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashMap::clear

```rust
pub fn clear(&mut self)
```

Clears the map, removing all key-value pairs. Keeps the allocated memory
for reuse.

# Examples

```rust
use std::collections::HashMap;

let mut a = HashMap::new();
a.insert(1, "a");
a.clear();
assert!(a.is_empty());
```

## HashMap::hasher

```rust
pub fn hasher(&self) -> &S
```

Returns a reference to the map's `BuildHasher`.

# Examples

```rust
use std::collections::HashMap;
use std::hash::RandomState;

let hasher = RandomState::new();
let map: HashMap<i32, i32> = HashMap::with_hasher(hasher);
let hasher: &RandomState = map.hasher();
```

## HashMap::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` more elements to be inserted
in the `HashMap`. The collection may reserve more space to speculatively
avoid frequent reallocations. After calling `reserve`,
capacity will be greater than or equal to `self.len() + additional`.
Does nothing if capacity is already sufficient.

# Panics

Panics if the new allocation size overflows `usize`.

# Examples

```rust
use std::collections::HashMap;
let mut map: HashMap<&str, i32> = HashMap::new();
map.reserve(10);
```

## HashMap::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve capacity for at least `additional` more elements to be inserted
in the `HashMap`. The collection may reserve more space to speculatively
avoid frequent reallocations. After calling `try_reserve`,
capacity will be greater than or equal to `self.len() + additional` if
it returns `Ok(())`.
Does nothing if capacity is already sufficient.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::HashMap;

let mut map: HashMap<&str, isize> = HashMap::new();
map.try_reserve(10).expect("why is the test harness OOMing on a handful of bytes?");
```

## HashMap::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of the map as much as possible. It will drop
down as much as possible while maintaining the internal rules
and possibly leaving some space in accordance with the resize policy.

# Examples

```rust
use std::collections::HashMap;

let mut map: HashMap<i32, i32> = HashMap::with_capacity(100);
map.insert(1, 2);
map.insert(3, 4);
assert!(map.capacity() >= 100);
map.shrink_to_fit();
assert!(map.capacity() >= 2);
```

## HashMap::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Shrinks the capacity of the map with a lower limit. It will drop
down no lower than the supplied limit while maintaining the internal rules
and possibly leaving some space in accordance with the resize policy.

If the current capacity is less than the lower limit, this is a no-op.

# Examples

```rust
use std::collections::HashMap;

let mut map: HashMap<i32, i32> = HashMap::with_capacity(100);
map.insert(1, 2);
map.insert(3, 4);
assert!(map.capacity() >= 100);
map.shrink_to(10);
assert!(map.capacity() >= 10);
map.shrink_to(0);
assert!(map.capacity() >= 2);
```

## HashMap::entry

```rust
pub fn entry(&mut self, key: K) -> Entry<'_, K, V, A>
```

Gets the given key's corresponding entry in the map for in-place manipulation.

# Examples

```rust
use std::collections::HashMap;

let mut letters = HashMap::new();

for ch in "a short treatise on fungi".chars() {
    letters.entry(ch).and_modify(|counter| *counter += 1).or_insert(1);
}

assert_eq!(letters[&'s'], 2);
assert_eq!(letters[&'t'], 3);
assert_eq!(letters[&'u'], 1);
assert_eq!(letters.get(&'y'), None);
```

## HashMap::get

```rust
pub fn get<Q: ?Sized>(&self, k: &Q) -> Option<&V> where K: Borrow<Q>, Q: Hash + Eq,
```

Returns a reference to the value corresponding to the key.

The key may be any borrowed form of the map's key type, but
`Hash` and `Eq` on the borrowed form *must* match those for
the key type.

# Examples

```rust
use std::collections::HashMap;

let mut map = HashMap::new();
map.insert(1, "a");
assert_eq!(map.get(&1), Some(&"a"));
assert_eq!(map.get(&2), None);
```

## HashMap::get_key_value

```rust
pub fn get_key_value<Q: ?Sized>(&self, k: &Q) -> Option<(&K, &V)> where K: Borrow<Q>, Q: Hash + Eq,
```

Returns the key-value pair corresponding to the supplied key. This is
potentially useful:
- for key types where non-identical keys can be considered equal;
- for getting the `&K` stored key value from a borrowed `&Q` lookup key; or
- for getting a reference to a key with the same lifetime as the collection.

The supplied key may be any borrowed form of the map's key type, but
`Hash` and `Eq` on the borrowed form *must* match those for
the key type.

# Examples

```rust
use std::collections::HashMap;
use std::hash::{Hash, Hasher};

#[derive(Clone, Copy, Debug)]
struct S {
    id: u32,
    name: &'static str, // ignored by equality and hashing operations
}

impl PartialEq for S {
    fn eq(&self, other: &S) -> bool {
        self.id == other.id
    }
}

impl Eq for S {}

impl Hash for S {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
    }
}

let j_a = S { id: 1, name: "Jessica" };
let j_b = S { id: 1, name: "Jess" };
let p = S { id: 2, name: "Paul" };
assert_eq!(j_a, j_b);

let mut map = HashMap::new();
map.insert(j_a, "Paris");
assert_eq!(map.get_key_value(&j_a), Some((&j_a, &"Paris")));
assert_eq!(map.get_key_value(&j_b), Some((&j_a, &"Paris"))); // the notable case
assert_eq!(map.get_key_value(&p), None);
```

## HashMap::get_disjoint_mut

```rust
pub fn get_disjoint_mut<Q: ?Sized, const N: usize>( &mut self, ks: [&Q; N], ) -> [Option<&'_ mut V>; N] where K: Borrow<Q>, Q: Hash + Eq,
```

Attempts to get mutable references to `N` values in the map at once.

Returns an array of length `N` with the results of each query. For soundness, at most one
mutable reference will be returned to any value. `None` will be used if the key is missing.

This method performs a check to ensure there are no duplicate keys, which currently has a time-complexity of O(n^2),
so be careful when passing many keys.

# Panics

Panics if any keys are overlapping.

# Examples

```rust
use std::collections::HashMap;

let mut libraries = HashMap::new();
libraries.insert("Bodleian Library".to_string(), 1602);
libraries.insert("Athenæum".to_string(), 1807);
libraries.insert("Herzogin-Anna-Amalia-Bibliothek".to_string(), 1691);
libraries.insert("Library of Congress".to_string(), 1800);

// Get Athenæum and Bodleian Library
let [Some(a), Some(b)] = libraries.get_disjoint_mut([
    "Athenæum",
    "Bodleian Library",
]) else { panic!() };

// Assert values of Athenæum and Library of Congress
let got = libraries.get_disjoint_mut([
    "Athenæum",
    "Library of Congress",
]);
assert_eq!(
    got,
    [
        Some(&mut 1807),
        Some(&mut 1800),
    ],
);

// Missing keys result in None
let got = libraries.get_disjoint_mut([
    "Athenæum",
    "New York Public Library",
]);
assert_eq!(
    got,
    [
        Some(&mut 1807),
        None
    ]
);
```

```rust
use std::collections::HashMap;

let mut libraries = HashMap::new();
libraries.insert("Athenæum".to_string(), 1807);

// Duplicate keys panic!
let got = libraries.get_disjoint_mut([
    "Athenæum",
    "Athenæum",
]);
```

## HashMap::get_disjoint_unchecked_mut

```rust
pub unsafe fn get_disjoint_unchecked_mut<Q: ?Sized, const N: usize>( &mut self, ks: [&Q; N], ) -> [Option<&'_ mut V>; N] where K: Borrow<Q>, Q: Hash + Eq,
```

Attempts to get mutable references to `N` values in the map at once, without validating that
the values are unique.

Returns an array of length `N` with the results of each query. `None` will be used if
the key is missing.

For a safe alternative see `get_disjoint_mut`.

# Safety

Calling this method with overlapping keys is *[undefined behavior]* even if the resulting
references are not used.

# Examples

```rust
use std::collections::HashMap;

let mut libraries = HashMap::new();
libraries.insert("Bodleian Library".to_string(), 1602);
libraries.insert("Athenæum".to_string(), 1807);
libraries.insert("Herzogin-Anna-Amalia-Bibliothek".to_string(), 1691);
libraries.insert("Library of Congress".to_string(), 1800);

// SAFETY: The keys do not overlap.
let [Some(a), Some(b)] = (unsafe { libraries.get_disjoint_unchecked_mut([
    "Athenæum",
    "Bodleian Library",
]) }) else { panic!() };

// SAFETY: The keys do not overlap.
let got = unsafe { libraries.get_disjoint_unchecked_mut([
    "Athenæum",
    "Library of Congress",
]) };
assert_eq!(
    got,
    [
        Some(&mut 1807),
        Some(&mut 1800),
    ],
);

// SAFETY: The keys do not overlap.
let got = unsafe { libraries.get_disjoint_unchecked_mut([
    "Athenæum",
    "New York Public Library",
]) };
// Missing keys result in None
assert_eq!(got, [Some(&mut 1807), None]);
```

## HashMap::contains_key

```rust
pub fn contains_key<Q: ?Sized>(&self, k: &Q) -> bool where K: Borrow<Q>, Q: Hash + Eq,
```

Returns `true` if the map contains a value for the specified key.

The key may be any borrowed form of the map's key type, but
`Hash` and `Eq` on the borrowed form *must* match those for
the key type.

# Examples

```rust
use std::collections::HashMap;

let mut map = HashMap::new();
map.insert(1, "a");
assert_eq!(map.contains_key(&1), true);
assert_eq!(map.contains_key(&2), false);
```

## HashMap::get_mut

```rust
pub fn get_mut<Q: ?Sized>(&mut self, k: &Q) -> Option<&mut V> where K: Borrow<Q>, Q: Hash + Eq,
```

Returns a mutable reference to the value corresponding to the key.

The key may be any borrowed form of the map's key type, but
`Hash` and `Eq` on the borrowed form *must* match those for
the key type.

# Examples

```rust
use std::collections::HashMap;

let mut map = HashMap::new();
map.insert(1, "a");
if let Some(x) = map.get_mut(&1) {
    *x = "b";
}
assert_eq!(map[&1], "b");
```

## HashMap::insert

```rust
pub fn insert(&mut self, k: K, v: V) -> Option<V>
```

Inserts a key-value pair into the map.

If the map did not have this key <example-value>, `None` is returned.

If the map did have this key <example-value>, the value is updated, and the old
value is returned. The key is not updated, though; this matters for
types that can be `==` without being identical. See the [module-level
documentation] for more.

# Examples

```rust
use std::collections::HashMap;

let mut map = HashMap::new();
assert_eq!(map.insert(37, "a"), None);
assert_eq!(map.is_empty(), false);

map.insert(37, "b");
assert_eq!(map.insert(37, "c"), Some("b"));
assert_eq!(map[&37], "c");
```
