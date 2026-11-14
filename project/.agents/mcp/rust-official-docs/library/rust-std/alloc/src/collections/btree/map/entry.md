---
title: "alloc::collections::btree::map::entry"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/collections/btree/map/entry.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::collections::btree::map::entry

## enum Entry

```rust
pub enum Entry< 'a, K: 'a, V: 'a, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

A view into a single entry in a map, which may either be vacant or occupied.

This `enum` is constructed from the `entry` method on `BTreeMap`.

## struct VacantEntry

```rust
pub struct VacantEntry< 'a, K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

A view into a vacant entry in a `BTreeMap`.
It is part of the `Entry` enum.

## struct OccupiedEntry

```rust
pub struct OccupiedEntry< 'a, K, V, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: AllocatorClone = Global, >
```

A view into an occupied entry in a `BTreeMap`.
It is part of the `Entry` enum.

## Entry::or_insert

```rust
pub fn or_insert(self, default: V) -> &'a mut V
```

Ensures a value is in the entry by inserting the default if empty, and returns
a mutable reference to the value in the entry.

# Examples

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
map.entry("poneyland").or_insert(12);

assert_eq!(map["poneyland"], 12);
```

## Entry::or_insert_with

```rust
pub fn or_insert_with<F: FnOnce() -> V>(self, default: F) -> &'a mut V
```

Ensures a value is in the entry by inserting the result of the default function if empty,
and returns a mutable reference to the value in the entry.

# Examples

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, String> = BTreeMap::new();
let s = "hoho".to_string();

map.entry("poneyland").or_insert_with(|| s);

assert_eq!(map["poneyland"], "hoho".to_string());
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

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();

map.entry("poneyland").or_insert_with_key(|key| key.chars().count());

assert_eq!(map["poneyland"], 9);
```

## Entry::key

```rust
pub fn key(&self) -> &K
```

Returns a reference to this entry's key.

# Examples

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
assert_eq!(map.entry("poneyland").key(), &"poneyland");
```

## Entry::and_modify

```rust
pub fn and_modify<F>(self, f: F) -> Self where F: FnOnce(&mut V),
```

Provides in-place mutable access to an occupied entry before any
potential inserts into the map.

# Examples

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();

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

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, String> = BTreeMap::new();
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

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, Option<usize>> = BTreeMap::new();
map.entry("poneyland").or_default();

assert_eq!(map["poneyland"], None);
```

## VacantEntry::key

```rust
pub fn key(&self) -> &K
```

Gets a reference to the key that would be used when inserting a value
through the VacantEntry.

# Examples

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
assert_eq!(map.entry("poneyland").key(), &"poneyland");
```

## VacantEntry::into_key

```rust
pub fn into_key(self) -> K
```

Take ownership of the key.

# Examples

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();

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

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, u32> = BTreeMap::new();

if let Entry::Vacant(o) = map.entry("poneyland") {
    o.insert(37);
}
assert_eq!(map["poneyland"], 37);
```

## VacantEntry::insert_entry

```rust
pub fn insert_entry(mut self, value: V) -> OccupiedEntry<'a, K, V, A>
```

Sets the value of the entry with the `VacantEntry`'s key,
and returns an `OccupiedEntry`.

# Examples

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, u32> = BTreeMap::new();

if let Entry::Vacant(o) = map.entry("poneyland") {
    let entry = o.insert_entry(37);
    assert_eq!(entry.get(), &37);
}
assert_eq!(map["poneyland"], 37);
```

## OccupiedEntry::key

```rust
pub fn key(&self) -> &K
```

Gets a reference to the key in the entry.

# Examples

```rust
use std::collections::BTreeMap;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
map.entry("poneyland").or_insert(12);
assert_eq!(map.entry("poneyland").key(), &"poneyland");
```

## OccupiedEntry::remove_entry

```rust
pub fn remove_entry(self) -> (K, V)
```

Take ownership of the key and value from the map.

# Examples

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
map.entry("poneyland").or_insert(12);

if let Entry::Occupied(o) = map.entry("poneyland") {
    // We delete the entry from the map.
    o.remove_entry();
}

// If now try to get the value, it will panic:
// println!("{}", map["poneyland"]);
```

## OccupiedEntry::get

```rust
pub fn get(&self) -> &V
```

Gets a reference to the value in the entry.

# Examples

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
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

If you need a reference to the `OccupiedEntry` that may outlive the
destruction of the `Entry` value, see `into_mut`.

# Examples

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
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

Converts the entry into a mutable reference to its value.

If you need multiple references to the `OccupiedEntry`, see `get_mut`.

# Examples

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
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

Sets the value of the entry with the `OccupiedEntry`'s key,
and returns the entry's old value.

# Examples

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
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

Takes the value of the entry out of the map, and returns it.

# Examples

```rust
use std::collections::BTreeMap;
use std::collections::btree_map::Entry;

let mut map: BTreeMap<&str, usize> = BTreeMap::new();
map.entry("poneyland").or_insert(12);

if let Entry::Occupied(o) = map.entry("poneyland") {
    assert_eq!(o.remove(), 12);
}
// If we try to get "poneyland"'s value, it'll panic:
// println!("{}", map["poneyland"]);
```
