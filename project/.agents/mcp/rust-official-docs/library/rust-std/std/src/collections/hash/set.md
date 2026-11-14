---
title: "std::collections::hash::set (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/collections/hash/set.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::collections::hash::set

## struct HashSet

```rust
pub struct HashSet< T, S = RandomState, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A [hash set] implemented as a `HashMap` where the value is `()`.

As with the `HashMap` type, a `HashSet` requires that the elements
implement the `Eq` and `Hash` traits. This can frequently be achieved by
using `#[derive(PartialEq, Eq, Hash)]`. If you implement these yourself,
it is important that the following property holds:

```
k1 == k2 -> hash(k1) == hash(k2)
```rust

In other words, if two keys are equal, their hashes must be equal.
Violating this property is a logic error.

It is also a logic error for a key to be modified in such a way that the key's
hash, as determined by the `Hash` trait, or its equality, as determined by
the `Eq` trait, changes while it is in the map. This is normally only
possible through `Cell`, `RefCell`, global state, I/O, or unsafe code.

The behavior resulting from either logic error is not specified, but will
be encapsulated to the `HashSet` that observed the logic error and not
result in undefined behavior. This could include panics, incorrect results,
aborts, memory leaks, and non-termination.

```
use std::collections::HashSet;
// Type inference lets us omit an explicit type signature (which
// would be `HashSet<String>` in this example).
let mut books = HashSet::new();

// Add some books.
books.insert("A Dance With Dragons".to_string());
books.insert("To Kill a Mockingbird".to_string());
books.insert("The Odyssey".to_string());
books.insert("The Great Gatsby".to_string());

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
```rust

The easiest way to use `HashSet` with a custom type is to derive
`Eq` and `Hash`. We must also derive `PartialEq`,
which is required if `Eq` is derived.

```
use std::collections::HashSet;
#[derive(Hash, Eq, PartialEq, Debug)]
struct Viking {
    name: String,
    power: usize,
}

let mut vikings = HashSet::new();

vikings.insert(Viking { name: "Einar".to_string(), power: 9 });
vikings.insert(Viking { name: "Einar".to_string(), power: 9 });
vikings.insert(Viking { name: "Olaf".to_string(), power: 4 });
vikings.insert(Viking { name: "Harald".to_string(), power: 8 });

// Use derived implementation to print the vikings.
for x in &vikings {
    println!("{x:?}");
}
```rust

A `HashSet` with a known list of items can be initialized from an array:

```
use std::collections::HashSet;

let viking_names = HashSet::from(["Einar", "Olaf", "Harald"]);
```rust

[hash set]: crate::collections#use-the-set-variant-of-any-of-these-maps-when
`HashMap`: crate::collections::HashMap
`RefCell`: crate::cell::RefCell
`Cell`: crate::cell::Cell

Like `HashMap`, `HashSet` is randomly seeded: each `HashSet` instance uses a different seed,
which means that `HashSet::new` cannot be used in const context. To construct a `HashSet` in the
initializer of a `const` or `static` item, you will have to use a different hasher that does not
involve a random seed, as demonstrated in the following example. **A `HashSet` constructed this
way is not resistant against HashDoS!**

```
use std::collections::HashSet;
use std::hash::{BuildHasherDefault, DefaultHasher};
use std::sync::Mutex;

const EMPTY_SET: HashSet<String, BuildHasherDefault<DefaultHasher>> =
    HashSet::with_hasher(BuildHasherDefault::new());
static SET: Mutex<HashSet<String, BuildHasherDefault<DefaultHasher>>> =
    Mutex::new(HashSet::with_hasher(BuildHasherDefault::new()));
```rust

## HashSet::new

```rust
pub fn new() -> HashSet<T, RandomState>
```

Creates an empty `HashSet`.

The hash set is initially created with a capacity of 0, so it will not allocate until it
is first inserted into.

# Examples

```rust
use std::collections::HashSet;
let set: HashSet<i32> = HashSet::new();
```

## HashSet::with_capacity

```rust
pub fn with_capacity(capacity: usize) -> HashSet<T, RandomState>
```

Creates an empty `HashSet` with at least the specified capacity.

The hash set will be able to hold at least `capacity` elements without
reallocating. This method is allowed to allocate for more elements than
`capacity`. If `capacity` is zero, the hash set will not allocate.

# Examples

```rust
use std::collections::HashSet;
let set: HashSet<i32> = HashSet::with_capacity(10);
assert!(set.capacity() >= 10);
```

## HashSet::with_hasher

```rust
pub const fn with_hasher(hasher: S) -> HashSet<T, S>
```

Creates a new empty hash set which will use the given hasher to hash
keys.

The hash set is also created with the default initial capacity.

Warning: `hasher` is normally randomly generated, and
is designed to allow `HashSet`s to be resistant to attacks that
cause many collisions and very poor performance. Setting it
manually using this function can expose a DoS attack vector.

The `hash_builder` passed should implement the `BuildHasher` trait for
the `HashSet` to be useful, see its documentation for details.

# Examples

```rust
use std::collections::HashSet;
use std::hash::RandomState;

let s = RandomState::new();
let mut set = HashSet::with_hasher(s);
set.insert(2);
```

## HashSet::with_capacity_and_hasher

```rust
pub fn with_capacity_and_hasher(capacity: usize, hasher: S) -> HashSet<T, S>
```

Creates an empty `HashSet` with at least the specified capacity, using
`hasher` to hash the keys.

The hash set will be able to hold at least `capacity` elements without
reallocating. This method is allowed to allocate for more elements than
`capacity`. If `capacity` is zero, the hash set will not allocate.

Warning: `hasher` is normally randomly generated, and
is designed to allow `HashSet`s to be resistant to attacks that
cause many collisions and very poor performance. Setting it
manually using this function can expose a DoS attack vector.

The `hash_builder` passed should implement the `BuildHasher` trait for
the `HashSet` to be useful, see its documentation for details.

# Examples

```rust
use std::collections::HashSet;
use std::hash::RandomState;

let s = RandomState::new();
let mut set = HashSet::with_capacity_and_hasher(10, s);
set.insert(1);
```

## HashSet::capacity

```rust
pub fn capacity(&self) -> usize
```

Returns the number of elements the set can hold without reallocating.

# Examples

```rust
use std::collections::HashSet;
let set: HashSet<i32> = HashSet::with_capacity(100);
assert!(set.capacity() >= 100);
```

## HashSet::iter

```rust
pub fn iter(&self) -> Iter<'_, T>
```

An iterator visiting all elements in arbitrary order.
The iterator element type is `&'a T`.

# Examples

```rust
use std::collections::HashSet;
let mut set = HashSet::new();
set.insert("a");
set.insert("b");

// Will print in an arbitrary order.
for x in set.iter() {
    println!("{x}");
}
```

# Performance

In the current implementation, iterating over set takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashSet::len

```rust
pub fn len(&self) -> usize
```

Returns the number of elements in the set.

# Examples

```rust
use std::collections::HashSet;

let mut v = HashSet::new();
assert_eq!(v.len(), 0);
v.insert(1);
assert_eq!(v.len(), 1);
```

## HashSet::is_empty

```rust
pub fn is_empty(&self) -> bool
```

Returns `true` if the set contains no elements.

# Examples

```rust
use std::collections::HashSet;

let mut v = HashSet::new();
assert!(v.is_empty());
v.insert(1);
assert!(!v.is_empty());
```

## HashSet::drain

```rust
pub fn drain(&mut self) -> Drain<'_, T, A>
```

Clears the set, returning all elements as an iterator. Keeps the
allocated memory for reuse.

If the returned iterator is dropped before being fully consumed, it
drops the remaining elements. The returned iterator keeps a mutable
borrow on the set to optimize its implementation.

# Examples

```rust
use std::collections::HashSet;

let mut set = HashSet::from([1, 2, 3]);
assert!(!set.is_empty());

// print 1, 2, 3 in an arbitrary order
for i in set.drain() {
    println!("{i}");
}

assert!(set.is_empty());
```

## HashSet::extract_if

```rust
pub fn extract_if<F>(&mut self, pred: F) -> ExtractIf<'_, T, F, A> where F: FnMut(&T) -> bool,
```

Creates an iterator which uses a closure to determine if an element should be removed.

If the closure returns `true`, the element is removed from the set and
yielded. If the closure returns `false`, or panics, the element remains
in the set and will not be yielded.

If the returned `ExtractIf` is not exhausted, e.g. because it is dropped without iterating
or the iteration short-circuits, then the remaining elements will be retained.
Use `retain` with a negated predicate if you do not need the returned iterator.

# Examples

Splitting a set into even and odd values, reusing the original set:

```rust
use std::collections::HashSet;

let mut set: HashSet<i32> = (0..8).collect();
let extracted: HashSet<i32> = set.extract_if(|v| v % 2 == 0).collect();

let mut evens = extracted.into_iter().collect::<Vec<_>>();
let mut odds = set.into_iter().collect::<Vec<_>>();
evens.sort();
odds.sort();

assert_eq!(evens, vec![0, 2, 4, 6]);
assert_eq!(odds, vec![1, 3, 5, 7]);
```

## HashSet::retain

```rust
pub fn retain<F>(&mut self, f: F) where F: FnMut(&T) -> bool,
```

Retains only the elements specified by the predicate.

In other words, remove all elements `e` for which `f(&e)` returns `false`.
The elements are visited in unsorted (and unspecified) order.

# Examples

```rust
use std::collections::HashSet;

let mut set = HashSet::from([1, 2, 3, 4, 5, 6]);
set.retain(|&k| k % 2 == 0);
assert_eq!(set, HashSet::from([2, 4, 6]));
```

# Performance

In the current implementation, this operation takes O(capacity) time
instead of O(len) because it internally visits empty buckets too.

## HashSet::clear

```rust
pub fn clear(&mut self)
```

Clears the set, removing all values.

# Examples

```rust
use std::collections::HashSet;

let mut v = HashSet::new();
v.insert(1);
v.clear();
assert!(v.is_empty());
```

## HashSet::hasher

```rust
pub fn hasher(&self) -> &S
```

Returns a reference to the set's `BuildHasher`.

# Examples

```rust
use std::collections::HashSet;
use std::hash::RandomState;

let hasher = RandomState::new();
let set: HashSet<i32> = HashSet::with_hasher(hasher);
let hasher: &RandomState = set.hasher();
```

## HashSet::reserve

```rust
pub fn reserve(&mut self, additional: usize)
```

Reserves capacity for at least `additional` more elements to be inserted
in the `HashSet`. The collection may reserve more space to speculatively
avoid frequent reallocations. After calling `reserve`,
capacity will be greater than or equal to `self.len() + additional`.
Does nothing if capacity is already sufficient.

# Panics

Panics if the new allocation size overflows `usize`.

# Examples

```rust
use std::collections::HashSet;
let mut set: HashSet<i32> = HashSet::new();
set.reserve(10);
assert!(set.capacity() >= 10);
```

## HashSet::try_reserve

```rust
pub fn try_reserve(&mut self, additional: usize) -> Result<(), TryReserveError>
```

Tries to reserve capacity for at least `additional` more elements to be inserted
in the `HashSet`. The collection may reserve more space to speculatively
avoid frequent reallocations. After calling `try_reserve`,
capacity will be greater than or equal to `self.len() + additional` if
it returns `Ok(())`.
Does nothing if capacity is already sufficient.

# Errors

If the capacity overflows, or the allocator reports a failure, then an error
is returned.

# Examples

```rust
use std::collections::HashSet;
let mut set: HashSet<i32> = HashSet::new();
set.try_reserve(10).expect("why is the test harness OOMing on a handful of bytes?");
```

## HashSet::shrink_to_fit

```rust
pub fn shrink_to_fit(&mut self)
```

Shrinks the capacity of the set as much as possible. It will drop
down as much as possible while maintaining the internal rules
and possibly leaving some space in accordance with the resize policy.

# Examples

```rust
use std::collections::HashSet;

let mut set = HashSet::with_capacity(100);
set.insert(1);
set.insert(2);
assert!(set.capacity() >= 100);
set.shrink_to_fit();
assert!(set.capacity() >= 2);
```

## HashSet::shrink_to

```rust
pub fn shrink_to(&mut self, min_capacity: usize)
```

Shrinks the capacity of the set with a lower limit. It will drop
down no lower than the supplied limit while maintaining the internal rules
and possibly leaving some space in accordance with the resize policy.

If the current capacity is less than the lower limit, this is a no-op.
# Examples

```rust
use std::collections::HashSet;

let mut set = HashSet::with_capacity(100);
set.insert(1);
set.insert(2);
assert!(set.capacity() >= 100);
set.shrink_to(10);
assert!(set.capacity() >= 10);
set.shrink_to(0);
assert!(set.capacity() >= 2);
```

## HashSet::difference

```rust
pub fn difference<'a>(&'a self, other: &'a HashSet<T, S, A>) -> Difference<'a, T, S, A>
```

Visits the values representing the difference,
i.e., the values that are in `self` but not in `other`.

# Examples

```rust
use std::collections::HashSet;
let a = HashSet::from([1, 2, 3]);
let b = HashSet::from([4, 2, 3, 4]);

// Can be seen as `a - b`.
for x in a.difference(&b) {
    println!("{x}"); // Print 1
}

let diff: HashSet<_> = a.difference(&b).collect();
assert_eq!(diff, [1].iter().collect());

// Note that difference is not symmetric,
// and `b - a` means something else:
let diff: HashSet<_> = b.difference(&a).collect();
assert_eq!(diff, [4].iter().collect());
```

## HashSet::symmetric_difference

```rust
pub fn symmetric_difference<'a>( &'a self, other: &'a HashSet<T, S, A>, ) -> SymmetricDifference<'a, T, S, A>
```

Visits the values representing the symmetric difference,
i.e., the values that are in `self` or in `other` but not in both.

# Examples

```rust
use std::collections::HashSet;
let a = HashSet::from([1, 2, 3]);
let b = HashSet::from([4, 2, 3, 4]);

// Print 1, 4 in arbitrary order.
for x in a.symmetric_difference(&b) {
    println!("{x}");
}

let diff1: HashSet<_> = a.symmetric_difference(&b).collect();
let diff2: HashSet<_> = b.symmetric_difference(&a).collect();

assert_eq!(diff1, diff2);
assert_eq!(diff1, [1, 4].iter().collect());
```
