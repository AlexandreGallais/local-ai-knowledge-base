# std::collections::hash::map

## struct HashMap

```rust
pub struct HashMap< K, V, S = RandomState, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A [hash map] implemented with quadratic probing and SIMD lookup.

By default, `HashMap` uses a hashing algorithm selected to provide
resistance against HashDoS attacks. The algorithm is randomly seeded, and a
reasonable best-effort is made to generate this seed from a high quality,
secure source of randomness provided by the host without blocking the
program. Because of this, the randomness of the seed depends on the output
quality of the system's random number generator when the seed is created.
In particular, seeds generated when the system's entropy pool is abnormally
low such as during system boot may be of a lower quality.

The default hashing algorithm is currently SipHash 1-3, though this is
subject to change at any point in the future. While its performance is very
competitive for medium sized keys, other hashing algorithms will outperform
it for small keys such as integers as well as large keys such as long
strings, though those algorithms will typically *not* protect against
attacks such as HashDoS.

The hashing algorithm can be replaced on a per-`HashMap` basis using the
[`default`], [`with_hasher`], and [`with_capacity_and_hasher`] methods.
There are many alternative [hashing algorithms available on crates.io].

It is required that the keys implement the [`Eq`] and [`Hash`] traits, although
this can frequently be achieved by using `#[derive(PartialEq, Eq, Hash)]`.
If you implement these yourself, it is important that the following
property holds:

```text
k1 == k2 -> hash(k1) == hash(k2)
```

In other words, if two keys are equal, their hashes must be equal.
Violating this property is a logic error.

It is also a logic error for a key to be modified in such a way that the key's
hash, as determined by the [`Hash`] trait, or its equality, as determined by
the [`Eq`] trait, changes while it is in the map. This is normally only
possible through [`Cell`], [`RefCell`], global state, I/O, or unsafe code.

The behavior resulting from either logic error is not specified, but will
be encapsulated to the `HashMap` that observed the logic error and not
result in undefined behavior. This could include panics, incorrect results,
aborts, memory leaks, and non-termination.

The hash table implementation is a Rust port of Google's [SwissTable].
The original C++ version of SwissTable can be found [here], and this
[CppCon talk] gives an overview of how the algorithm works.

[hash map]: crate::collections#use-a-hashmap-when
[hashing algorithms available on crates.io]: https://crates.io/keywords/hasher
[SwissTable]: https://abseil.io/blog/20180927-swisstables
[here]: https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.h
[CppCon talk]: https://www.youtube.com/watch?v=ncHmEUmJZf4

# Examples

```
use std::collections::HashMap;

// Type inference lets us omit an explicit type signature (which
// would be `HashMap<String, String>` in this example).
let mut book_reviews = HashMap::new();

// Review some books.
book_reviews.insert(
    "Adventures of Huckleberry Finn".to_string(),
    "My favorite book.".to_string(),
);
book_reviews.insert(
    "Grimms' Fairy Tales".to_string(),
    "Masterpiece.".to_string(),
);
book_reviews.insert(
    "Pride and Prejudice".to_string(),
    "Very enjoyable.".to_string(),
);
book_reviews.insert(
    "The Adventures of Sherlock Holmes".to_string(),
    "Eye lyked it alot.".to_string(),
);

// Check for a specific one.
// When collections store owned values (String), they can still be
// queried using references (&str).
if !book_reviews.contains_key("Les Misérables") {
    println!("We've got {} reviews, but Les Misérables ain't one.",
             book_reviews.len());
}

// oops, this review has a lot of spelling mistakes, let's delete it.
book_reviews.remove("The Adventures of Sherlock Holmes");

// Look up the values associated with some keys.
let to_find = ["Pride and Prejudice", "Alice's Adventure in Wonderland"];
for &book in &to_find {
    match book_reviews.get(book) {
        Some(review) => println!("{book}: {review}"),
        None => println!("{book} is unreviewed.")
    }
}

// Look up the value for a key (will panic if the key is not found).
println!("Review for Jane: {}", book_reviews["Pride and Prejudice"]);

// Iterate over everything.
for (book, review) in &book_reviews {
    println!("{book}: \"{review}\"");
}
```

A `HashMap` with a known list of items can be initialized from an array:

```
use std::collections::HashMap;

let solar_distance = HashMap::from([
    ("Mercury", 0.4),
    ("Venus", 0.7),
    ("Earth", 1.0),
    ("Mars", 1.5),
]);
```

## `Entry` API

`HashMap` implements an [`Entry` API](#method.entry), which allows
for complex methods of getting, setting, updating and removing keys and
their values:

```
use std::collections::HashMap;

// type inference lets us omit an explicit type signature (which
// would be `HashMap<&str, u8>` in this example).
let mut player_stats = HashMap::new();

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

## Usage with custom key types

The easiest way to use `HashMap` with a custom key type is to derive [`Eq`] and [`Hash`].
We must also derive [`PartialEq`].

[`RefCell`]: crate::cell::RefCell
[`Cell`]: crate::cell::Cell
[`default`]: Default::default
[`with_hasher`]: Self::with_hasher
[`with_capacity_and_hasher`]: Self::with_capacity_and_hasher

```
use std::collections::HashMap;

#[derive(Hash, Eq, PartialEq, Debug)]
struct Viking {
    name: String,
    country: String,
}

impl Viking {
    /// Creates a new Viking.
    fn new(name: &str, country: &str) -> Viking {
        Viking { name: name.to_string(), country: country.to_string() }
    }
}

// Use a HashMap to store the vikings' health points.
let vikings = HashMap::from([
    (Viking::new("Einar", "Norway"), 25),
    (Viking::new("Olaf", "Denmark"), 24),
    (Viking::new("Harald", "Iceland"), 12),
]);

// Use derived implementation to print the status of the vikings.
for (viking, health) in &vikings {
    println!("{viking:?} has {health} hp");
}
```

# Usage in `const` and `static`

As explained above, `HashMap` is randomly seeded: each `HashMap` instance uses a different seed,
which means that `HashMap::new` normally cannot be used in a `const` or `static` initializer.

However, if you need to use a `HashMap` in a `const` or `static` initializer while retaining
random seed generation, you can wrap the `HashMap` in [`LazyLock`].

Alternatively, you can construct a `HashMap` in a `const` or `static` initializer using a different
hasher that does not rely on a random seed. **Be aware that a `HashMap` created this way is not
resistant to HashDoS attacks!**

[`LazyLock`]: crate::sync::LazyLock
```rust
use std::collections::HashMap;
use std::hash::{BuildHasherDefault, DefaultHasher};
use std::sync::{LazyLock, Mutex};

// HashMaps with a fixed, non-random hasher
const NONRANDOM_EMPTY_MAP: HashMap<String, Vec<i32>, BuildHasherDefault<DefaultHasher>> =
    HashMap::with_hasher(BuildHasherDefault::new());
static NONRANDOM_MAP: Mutex<HashMap<String, Vec<i32>, BuildHasherDefault<DefaultHasher>>> =
    Mutex::new(HashMap::with_hasher(BuildHasherDefault::new()));

// HashMaps using LazyLock to retain random seeding
const RANDOM_EMPTY_MAP: LazyLock<HashMap<String, Vec<i32>>> =
    LazyLock::new(HashMap::new);
static RANDOM_MAP: LazyLock<Mutex<HashMap<String, Vec<i32>>>> =
    LazyLock::new(|| Mutex::new(HashMap::new()));
```

## HashMap::new

```rust
pub fn new() -> HashMap<K, V, RandomState>
```

Creates an empty `HashMap`.

The hash map is initially created with a capacity of 0, so it will not allocate until it
is first inserted into.

# Examples

```
use std::collections::HashMap;
let mut map: HashMap<&str, i32> = HashMap::new();
```

## HashMap::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> HashMap<K, V, RandomState>
```

Creates an empty `HashMap` with at least the specified capacity.

The hash map will be able to hold at least `capacity` elements without
reallocating. This method is allowed to allocate for more elements than
`capacity`. If `capacity` is zero, the hash map will not allocate.

# Examples

```
use std::collections::HashMap;
let mut map: HashMap<&str, i32> = HashMap::with_capacity(10);
```

## HashMap::with_hasher

```rust
pub const fn with_hasher(hash_builder: S) -> HashMap<K, V, S>
```

Creates an empty `HashMap` which will use the given hash builder to hash
keys.

The created map has the default initial capacity.

Warning: `hash_builder` is normally randomly generated, and
is designed to allow HashMaps to be resistant to attacks that
cause many collisions and very poor performance. Setting it
manually using this function can expose a DoS attack vector.

The `hash_builder` passed should implement the [`BuildHasher`] trait for
the `HashMap` to be useful, see its documentation for details.

# Examples

```
use std::collections::HashMap;
use std::hash::RandomState;

let s = RandomState::new();
let mut map = HashMap::with_hasher(s);
map.insert(1, 2);
```

## HashMap::with_capacity_and_hasher

```rust
pub fn with_capacity_and_hasher(capacity: usize, hasher: S) -> HashMap<K, V, S>
```

Creates an empty `HashMap` with at least the specified capacity, using
`hasher` to hash the keys.

The hash map will be able to hold at least `capacity` elements without
reallocating. This method is allowed to allocate for more elements than
`capacity`. If `capacity` is zero, the hash map will not allocate.

Warning: `hasher` is normally randomly generated, and
is designed to allow HashMaps to be resistant to attacks that
cause many collisions and very poor performance. Setting it
manually using this function can expose a DoS attack vector.

The `hasher` passed should implement the [`BuildHasher`] trait for
the `HashMap` to be useful, see its documentation for details.

# Examples

```
use std::collections::HashMap;
use std::hash::RandomState;

let s = RandomState::new();
let mut map = HashMap::with_capacity_and_hasher(10, s);
map.insert(1, 2);
```

## HashMap::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the number of elements the map can hold without reallocating.

This number is a lower bound; the `HashMap<K, V>` might be able to hold
more, but is guaranteed to be able to hold at least this many.

# Examples

```
use std::collections::HashMap;
let map: HashMap<i32, i32> = HashMap::with_capacity(100);
assert!(map.capacity() >= 100);
```

## HashMap::keys

```rust
pub fn keys(&self) -> Keys<'_, K, V>
```

An iterator visiting all keys in arbitrary order.
The iterator element type is `&'a K`.

# Examples

```
use std::collections::HashMap;

let map: HashMap<&str, i32> = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

let mut values: Vec<_> = map.keys().copied().collect();
values.sort();

assert_eq!(values, vec!["a", "b", "c"]);
```

# Performance

In the current implementation, iterating over keys takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashMap::into_keys

```rust
pub fn into_keys(self) -> IntoKeys<K, V, A>
```

Creates a consuming iterator visiting all the keys in arbitrary order.
The map cannot be used after calling this.
The iterator element type is `K`.

# Examples

```
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

let mut vec: Vec<&str> = map.into_keys().collect();
// The `IntoKeys` iterator produces keys in arbitrary order, so the
// keys must be sorted to test them against a sorted array.
vec.sort_unstable();
assert_eq!(vec, ["a", "b", "c"]);
```

# Performance

In the current implementation, iterating over keys takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashMap::values

```rust
pub fn values(&self) -> Values<'_, K, V>
```

An iterator visiting all values in arbitrary order.
The iterator element type is `&'a V`.

# Examples

```
use std::collections::HashMap;

let map: HashMap<&str, i32> = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

let mut values: Vec<_> = map.values().copied().collect();
values.sort();

assert_eq!(values, vec![1, 2, 3]);
```

# Performance

In the current implementation, iterating over values takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashMap::values_mut

```rust
pub fn values_mut(&mut self) -> ValuesMut<'_, K, V>
```

An iterator visiting all values mutably in arbitrary order.
The iterator element type is `&'a mut V`.

# Examples

```
use std::collections::HashMap;

let mut map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

for val in map.values_mut() {
    *val += 10;
}

assert_eq!(map.get("a"), Some(&11));
assert_eq!(map.get("b"), Some(&12));
assert_eq!(map.get("c"), Some(&13));
```

# Performance

In the current implementation, iterating over values takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashMap::into_values

```rust
pub fn into_values(self) -> IntoValues<K, V, A>
```

Creates a consuming iterator visiting all the values in arbitrary order.
The map cannot be used after calling this.
The iterator element type is `V`.

# Examples

```
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
    ("b", 2),
    ("c", 3),
]);

let mut vec: Vec<i32> = map.into_values().collect();
// The `IntoValues` iterator produces values in arbitrary order, so
// the values must be sorted to test them against a sorted array.
vec.sort_unstable();
assert_eq!(vec, [1, 2, 3]);
```

# Performance

In the current implementation, iterating over values takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashMap::iter

```rust
pub fn iter(&self) -> Iter<'_, K, V>
```

An iterator visiting all key-value pairs in arbitrary order.
The iterator element type is `(&'a K, &'a V)`.

# Examples

```
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

```
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

```
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

```
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

```
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
Use [`retain`] with a negated predicate if you do not need the returned iterator.

[`retain`]: HashMap::retain

# Examples

Splitting a map into even and odd keys, reusing the original map:

```
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

```
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

```
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

Returns a reference to the map's [`BuildHasher`].

# Examples

```
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

Panics if the new allocation size overflows [`usize`].

# Examples

```
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

```
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

```
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

```
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

```
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
[`Hash`] and [`Eq`] on the borrowed form *must* match those for
the key type.

# Examples

```
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
[`Hash`] and [`Eq`] on the borrowed form *must* match those for
the key type.

# Examples

```
use std::collections::HashMap;
use std::hash::{Hash, Hasher};

#[derive(Clone, Copy, Debug)]
struct S {
    id: u32,
#   #[allow(unused)] // prevents a "field `name` is never read" error
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

```
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

```should_panic
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

For a safe alternative see [`get_disjoint_mut`](`HashMap::get_disjoint_mut`).

# Safety

Calling this method with overlapping keys is *[undefined behavior]* even if the resulting
references are not used.

[undefined behavior]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

# Examples

```
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
[`Hash`] and [`Eq`] on the borrowed form *must* match those for
the key type.

# Examples

```
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
[`Hash`] and [`Eq`] on the borrowed form *must* match those for
the key type.

# Examples

```
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

If the map did not have this key present, [`None`] is returned.

If the map did have this key present, the value is updated, and the old
value is returned. The key is not updated, though; this matters for
types that can be `==` without being identical. See the [module-level
documentation] for more.

[module-level documentation]: crate::collections#insert-and-complex-keys

# Examples

```
use std::collections::HashMap;

let mut map = HashMap::new();
assert_eq!(map.insert(37, "a"), None);
assert_eq!(map.is_empty(), false);

map.insert(37, "b");
assert_eq!(map.insert(37, "c"), Some("b"));
assert_eq!(map[&37], "c");
```

## HashMap::remove

```rust
pub fn remove<Q: ?Sized>(&mut self, k: &Q) -> Option<V> where K: Borrow<Q>, Q: Hash + Eq,
```

Removes a key from the map, returning the value at the key if the key
was previously in the map.

The key may be any borrowed form of the map's key type, but
[`Hash`] and [`Eq`] on the borrowed form *must* match those for
the key type.

# Examples

```
use std::collections::HashMap;

let mut map = HashMap::new();
map.insert(1, "a");
assert_eq!(map.remove(&1), Some("a"));
assert_eq!(map.remove(&1), None);
```

## HashMap::remove_entry

```rust
pub fn remove_entry<Q: ?Sized>(&mut self, k: &Q) -> Option<(K, V)> where K: Borrow<Q>, Q: Hash + Eq,
```

Removes a key from the map, returning the stored key and value if the
key was previously in the map.

The key may be any borrowed form of the map's key type, but
[`Hash`] and [`Eq`] on the borrowed form *must* match those for
the key type.

# Examples

```
use std::collections::HashMap;

# fn main() {
let mut map = HashMap::new();
map.insert(1, "a");
assert_eq!(map.remove_entry(&1), Some((1, "a")));
assert_eq!(map.remove(&1), None);
# }
```

## struct Iter

```rust
pub struct Iter<'a, K: 'a, V: 'a>
```

An iterator over the entries of a `HashMap`.

This `struct` is created by the [`iter`] method on [`HashMap`]. See its
documentation for more.

[`iter`]: HashMap::iter

# Example

```
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
]);
let iter = map.iter();
```

## struct IterMut

```rust
pub struct IterMut<'a, K: 'a, V: 'a>
```

A mutable iterator over the entries of a `HashMap`.

This `struct` is created by the [`iter_mut`] method on [`HashMap`]. See its
documentation for more.

[`iter_mut`]: HashMap::iter_mut

# Example

```
use std::collections::HashMap;

let mut map = HashMap::from([
    ("a", 1),
]);
let iter = map.iter_mut();
```

## struct IntoIter

```rust
pub struct IntoIter< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An owning iterator over the entries of a `HashMap`.

This `struct` is created by the [`into_iter`] method on [`HashMap`]
(provided by the [`IntoIterator`] trait). See its documentation for more.

[`into_iter`]: IntoIterator::into_iter

# Example

```
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
]);
let iter = map.into_iter();
```

## struct Keys

```rust
pub struct Keys<'a, K: 'a, V: 'a>
```

An iterator over the keys of a `HashMap`.

This `struct` is created by the [`keys`] method on [`HashMap`]. See its
documentation for more.

[`keys`]: HashMap::keys

# Example

```
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
]);
let iter_keys = map.keys();
```

## struct Values

```rust
pub struct Values<'a, K: 'a, V: 'a>
```

An iterator over the values of a `HashMap`.

This `struct` is created by the [`values`] method on [`HashMap`]. See its
documentation for more.

[`values`]: HashMap::values

# Example

```
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
]);
let iter_values = map.values();
```

## struct Drain

```rust
pub struct Drain< 'a, K: 'a, V: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A draining iterator over the entries of a `HashMap`.

This `struct` is created by the [`drain`] method on [`HashMap`]. See its
documentation for more.

[`drain`]: HashMap::drain

# Example

```
use std::collections::HashMap;

let mut map = HashMap::from([
    ("a", 1),
]);
let iter = map.drain();
```

## struct ExtractIf

```rust
pub struct ExtractIf< 'a, K, V, F, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A draining, filtering iterator over the entries of a `HashMap`.

This `struct` is created by the [`extract_if`] method on [`HashMap`].

[`extract_if`]: HashMap::extract_if

# Example

```
use std::collections::HashMap;

let mut map = HashMap::from([
    ("a", 1),
]);
let iter = map.extract_if(|_k, v| *v % 2 == 0);
```

## struct ValuesMut

```rust
pub struct ValuesMut<'a, K: 'a, V: 'a>
```

A mutable iterator over the values of a `HashMap`.

This `struct` is created by the [`values_mut`] method on [`HashMap`]. See its
documentation for more.

[`values_mut`]: HashMap::values_mut

# Example

```
use std::collections::HashMap;

let mut map = HashMap::from([
    ("a", 1),
]);
let iter_values = map.values_mut();
```

## struct IntoKeys

```rust
pub struct IntoKeys< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An owning iterator over the keys of a `HashMap`.

This `struct` is created by the [`into_keys`] method on [`HashMap`].
See its documentation for more.

[`into_keys`]: HashMap::into_keys

# Example

```
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
]);
let iter_keys = map.into_keys();
```

## struct IntoValues

```rust
pub struct IntoValues< K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

An owning iterator over the values of a `HashMap`.

This `struct` is created by the [`into_values`] method on [`HashMap`].
See its documentation for more.

[`into_values`]: HashMap::into_values

# Example

```
use std::collections::HashMap;

let map = HashMap::from([
    ("a", 1),
]);
let iter_keys = map.into_values();
```

## enum Entry

```rust
pub enum Entry< 'a, K: 'a, V: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A view into a single entry in a map, which may either be vacant or occupied.

This `enum` is constructed from the [`entry`] method on [`HashMap`].

[`entry`]: HashMap::entry

## struct OccupiedEntry

```rust
pub struct OccupiedEntry< 'a, K: 'a, V: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A view into an occupied entry in a `HashMap`.
It is part of the [`Entry`] enum.

## struct VacantEntry

```rust
pub struct VacantEntry< 'a, K: 'a, V: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A view into a vacant entry in a `HashMap`.
It is part of the [`Entry`] enum.

## Entry::or_insert

```rust
pub fn or_insert(self, default: V) -> &'a mut V
```

Ensures a value is in the entry by inserting the default if empty, and returns
a mutable reference to the value in the entry.

# Examples

```
use std::collections::HashMap;

let mut map: HashMap<&str, u32> = HashMap::new();

map.entry("poneyland").or_insert(3);
assert_eq!(map["poneyland"], 3);

*map.entry("poneyland").or_insert(10) *= 2;
assert_eq!(map["poneyland"], 6);
```

## Entry::or_insert_with

```rust
pub fn or_insert_with<F: FnOnce() -> V>(self, default: F) -> &'a mut V
```

Ensures a value is in the entry by inserting the result of the default function if empty,
and returns a mutable reference to the value in the entry.

# Examples

```
use std::collections::HashMap;

let mut map = HashMap::new();
let value = "hoho";

map.entry("poneyland").or_insert_with(|| value);

assert_eq!(map["poneyland"], "hoho");
```

## Entry::or_insert_with_key

```rust
pub fn or_insert_with_key<F: FnOnce(&K) -> V>(self, default: F) -> &'a mut V
```

Ensures a value is in the entry by inserting, if empty, the result of the default function.
This method allows for generating key-derived values for insertion by providing the default
function a reference to the key that was moved during the `.entry(key)` method call.

The reference to the moved key is provided so that cloning or copying the key is
unnecessary, unlike with `.or_insert_with(|| ... )`.

# Examples

```
use std::collections::HashMap;

let mut map: HashMap<&str, usize> = HashMap::new();

map.entry("poneyland").or_insert_with_key(|key| key.chars().count());

assert_eq!(map["poneyland"], 9);
```

## Entry::key

```rust
pub fn key(&self) -> &K
```

Returns a reference to this entry's key.

# Examples

```
use std::collections::HashMap;

let mut map: HashMap<&str, u32> = HashMap::new();
assert_eq!(map.entry("poneyland").key(), &"poneyland");
```

## Entry::and_modify

```rust
pub fn and_modify<F>(self, f: F) -> Self where F: FnOnce(&mut V),
```

Provides in-place mutable access to an occupied entry before any
potential inserts into the map.

# Examples

```
use std::collections::HashMap;

let mut map: HashMap<&str, u32> = HashMap::new();

map.entry("poneyland")
   .and_modify(|e| { *e += 1 })
   .or_insert(42);
assert_eq!(map["poneyland"], 42);

map.entry("poneyland")
   .and_modify(|e| { *e += 1 })
   .or_insert(42);
assert_eq!(map["poneyland"], 43);
```

## Entry::insert_entry

```rust
pub fn insert_entry(self, value: V) -> OccupiedEntry<'a, K, V, A>
```

Sets the value of the entry, and returns an `OccupiedEntry`.

# Examples

```
use std::collections::HashMap;

let mut map: HashMap<&str, String> = HashMap::new();
let entry = map.entry("poneyland").insert_entry("hoho".to_string());

assert_eq!(entry.key(), &"poneyland");
```

## Entry::or_default

```rust
pub fn or_default(self) -> &'a mut V
```

Ensures a value is in the entry by inserting the default value if empty,
and returns a mutable reference to the value in the entry.

# Examples

```
# fn main() {
use std::collections::HashMap;

let mut map: HashMap<&str, Option<u32>> = HashMap::new();
map.entry("poneyland").or_default();

assert_eq!(map["poneyland"], None);
# }
```

## OccupiedEntry::key

```rust
pub fn key(&self) -> &K
```

Gets a reference to the key in the entry.

# Examples

```
use std::collections::HashMap;

let mut map: HashMap<&str, u32> = HashMap::new();
map.entry("poneyland").or_insert(12);
assert_eq!(map.entry("poneyland").key(), &"poneyland");
```

## OccupiedEntry::remove_entry

```rust
pub fn remove_entry(self) -> (K, V)
```

Take the ownership of the key and value from the map.

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();
map.entry("poneyland").or_insert(12);

if let Entry::Occupied(o) = map.entry("poneyland") {
    // We delete the entry from the map.
    o.remove_entry();
}

assert_eq!(map.contains_key("poneyland"), false);
```

## OccupiedEntry::get

```rust
pub fn get(&self) -> &V
```

Gets a reference to the value in the entry.

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();
map.entry("poneyland").or_insert(12);

if let Entry::Occupied(o) = map.entry("poneyland") {
    assert_eq!(o.get(), &12);
}
```

## OccupiedEntry::get_mut

```rust
pub fn get_mut(&mut self) -> &mut V
```

Gets a mutable reference to the value in the entry.

If you need a reference to the `OccupiedEntry` which may outlive the
destruction of the `Entry` value, see [`into_mut`].

[`into_mut`]: Self::into_mut

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();
map.entry("poneyland").or_insert(12);

assert_eq!(map["poneyland"], 12);
if let Entry::Occupied(mut o) = map.entry("poneyland") {
    *o.get_mut() += 10;
    assert_eq!(*o.get(), 22);

    // We can use the same Entry multiple times.
    *o.get_mut() += 2;
}

assert_eq!(map["poneyland"], 24);
```

## OccupiedEntry::into_mut

```rust
pub fn into_mut(self) -> &'a mut V
```

Converts the `OccupiedEntry` into a mutable reference to the value in the entry
with a lifetime bound to the map itself.

If you need multiple references to the `OccupiedEntry`, see [`get_mut`].

[`get_mut`]: Self::get_mut

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();
map.entry("poneyland").or_insert(12);

assert_eq!(map["poneyland"], 12);
if let Entry::Occupied(o) = map.entry("poneyland") {
    *o.into_mut() += 10;
}

assert_eq!(map["poneyland"], 22);
```

## OccupiedEntry::insert

```rust
pub fn insert(&mut self, value: V) -> V
```

Sets the value of the entry, and returns the entry's old value.

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();
map.entry("poneyland").or_insert(12);

if let Entry::Occupied(mut o) = map.entry("poneyland") {
    assert_eq!(o.insert(15), 12);
}

assert_eq!(map["poneyland"], 15);
```

## OccupiedEntry::remove

```rust
pub fn remove(self) -> V
```

Takes the value out of the entry, and returns it.

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();
map.entry("poneyland").or_insert(12);

if let Entry::Occupied(o) = map.entry("poneyland") {
    assert_eq!(o.remove(), 12);
}

assert_eq!(map.contains_key("poneyland"), false);
```

## VacantEntry::key

```rust
pub fn key(&self) -> &K
```

Gets a reference to the key that would be used when inserting a value
through the `VacantEntry`.

# Examples

```
use std::collections::HashMap;

let mut map: HashMap<&str, u32> = HashMap::new();
assert_eq!(map.entry("poneyland").key(), &"poneyland");
```

## VacantEntry::into_key

```rust
pub fn into_key(self) -> K
```

Take ownership of the key.

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();

if let Entry::Vacant(v) = map.entry("poneyland") {
    v.into_key();
}
```

## VacantEntry::insert

```rust
pub fn insert(self, value: V) -> &'a mut V
```

Sets the value of the entry with the `VacantEntry`'s key,
and returns a mutable reference to it.

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();

if let Entry::Vacant(o) = map.entry("poneyland") {
    o.insert(37);
}
assert_eq!(map["poneyland"], 37);
```

## VacantEntry::insert_entry

```rust
pub fn insert_entry(self, value: V) -> OccupiedEntry<'a, K, V, A>
```

Sets the value of the entry with the `VacantEntry`'s key,
and returns an `OccupiedEntry`.

# Examples

```
use std::collections::HashMap;
use std::collections::hash_map::Entry;

let mut map: HashMap<&str, u32> = HashMap::new();

if let Entry::Vacant(o) = map.entry("poneyland") {
    o.insert_entry(37);
}
assert_eq!(map["poneyland"], 37);
```