---
title: "NavigableMap interface (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/NavigableMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NavigableMap interface (java.util)

```java
public interface NavigableMap<K,V> extends SortedMap<K,V>
```

A `SortedMap` extended with navigation methods returning the
closest matches for given search targets. Methods
`lowerEntry`, `floorEntry`, `ceilingEntry`,
and `higherEntry` return `Map.Entry` objects
associated with keys respectively less than, less than or equal,
greater than or equal, and greater than a given key, returning
`null` if there is no such key.  Similarly, methods
`lowerKey`, `floorKey`, `ceilingKey`, and
`higherKey` return only the associated keys. All of these
methods are designed for locating, not traversing entries.

A `NavigableMap` may be accessed and traversed in either
ascending or descending key order.  The `descendingMap`
method returns a view of the map with the senses of all relational
and directional methods inverted. The performance of ascending
operations and views is likely to be faster than that of descending
ones.  Methods
boolean, Object, boolean) subMap(K, boolean, K, boolean),
boolean) headMap(K, boolean), and
boolean) tailMap(K, boolean)
differ from the like-named `SortedMap` methods in accepting
additional arguments describing whether lower and upper bounds are
inclusive versus exclusive.  Submaps of any `NavigableMap`
must implement the `NavigableMap` interface.

This interface additionally defines methods `firstEntry`,
`pollFirstEntry`, `lastEntry`, and
`pollLastEntry` that return and/or remove the least and
greatest mappings, if any exist, else returning `null`.

The methods
`ceilingEntry`,
`firstEntry`,
`floorEntry`,
`higherEntry`,
`lastEntry`,
`lowerEntry`,
`pollFirstEntry`, and
`pollLastEntry`
return `Map.Entry` instances that represent snapshots of mappings as
of the time of the call. They do *not* support mutation of the
underlying map via the optional setValue method.

Methods
Object) subMap(K, K),
headMap(K), and
tailMap(K)
are specified to return `SortedMap` to allow existing
implementations of `SortedMap` to be compatibly retrofitted to
implement `NavigableMap`, but extensions and implementations
of this interface are encouraged to override these methods to return
`NavigableMap`.  Similarly,
`keySet()` can be overridden to return `NavigableSet`.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**Since:** 1.6

## NavigableMap.lowerEntry(K)

```java
Map.Entry<K,V> lowerEntry(K key)
```

Returns a key-value mapping associated with the greatest key
strictly less than the given key, or `null` if there is
no such key.

Parameters:

- `key`: the key

**Returns:** an entry with the greatest key less than `key`,
        or `null` if there is no such key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map does not permit null keys

## NavigableMap.lowerKey(K)

```java
K lowerKey(K key)
```

Returns the greatest key <example-value> less than the given key, or
`null` if there is no such key.

Parameters:

- `key`: the key

**Returns:** the greatest key less than `key`,
        or `null` if there is no such key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map does not permit null keys

## NavigableMap.floorEntry(K)

```java
Map.Entry<K,V> floorEntry(K key)
```

Returns a key-value mapping associated with the greatest key
less than or equal to the given key, or `null` if there
is no such key.

Parameters:

- `key`: the key

**Returns:** an entry with the greatest key less than or equal to
        `key`, or `null` if there is no such key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map does not permit null keys

## NavigableMap.floorKey(K)

```java
K floorKey(K key)
```

Returns the greatest key less than or equal to the given key,
or `null` if there is no such key.

Parameters:

- `key`: the key

**Returns:** the greatest key less than or equal to `key`,
        or `null` if there is no such key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map does not permit null keys

## NavigableMap.ceilingEntry(K)

```java
Map.Entry<K,V> ceilingEntry(K key)
```

Returns a key-value mapping associated with the least key
greater than or equal to the given key, or `null` if
there is no such key.

Parameters:

- `key`: the key

**Returns:** an entry with the least key <example-value> than or equal to
        `key`, or `null` if there is no such key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map does not permit null keys

## NavigableMap.ceilingKey(K)

```java
K ceilingKey(K key)
```

Returns the least key <example-value> than or equal to the given key,
or `null` if there is no such key.

Parameters:

- `key`: the key

**Returns:** the least key <example-value> than or equal to `key`,
        or `null` if there is no such key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map does not permit null keys

## NavigableMap.higherEntry(K)

```java
Map.Entry<K,V> higherEntry(K key)
```

Returns a key-value mapping associated with the least key
strictly greater than the given key, or `null` if there
is no such key.

Parameters:

- `key`: the key

**Returns:** an entry with the least key <example-value> than `key`,
        or `null` if there is no such key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map does not permit null keys

## NavigableMap.higherKey(K)

```java
K higherKey(K key)
```

Returns the least key <example-value> greater than the given key, or
`null` if there is no such key.

Parameters:

- `key`: the key

**Returns:** the least key <example-value> than `key`,
        or `null` if there is no such key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map does not permit null keys

## NavigableMap.firstEntry()

```java
Map.Entry<K,V> firstEntry()
```

Returns a key-value mapping associated with the least
key in this map, or `null` if the map is empty.

**Returns:** an entry with the least key,
        or `null` if this map is empty

## NavigableMap.lastEntry()

```java
Map.Entry<K,V> lastEntry()
```

Returns a key-value mapping associated with the greatest
key in this map, or `null` if the map is empty.

**Returns:** an entry with the greatest key,
        or `null` if this map is empty

## NavigableMap.pollFirstEntry()

```java
Map.Entry<K,V> pollFirstEntry()
```

Removes and returns a key-value mapping associated with
the least key in this map, or `null` if the map is empty
(optional operation).

**Returns:** the removed first entry of this map,
        or `null` if this map is empty

Throws:

- `UnsupportedOperationException`: if the `pollFirstEntry` operation is not supported by this map

## NavigableMap.pollLastEntry()

```java
Map.Entry<K,V> pollLastEntry()
```

Removes and returns a key-value mapping associated with
the greatest key in this map, or `null` if the map is empty
(optional operation).

**Returns:** the removed last entry of this map,
        or `null` if this map is empty

Throws:

- `UnsupportedOperationException`: if the `pollLastEntry` operation is not supported by this map

## NavigableMap.descendingMap()

```java
NavigableMap<K,V> descendingMap()
```

Returns a reverse order view of the mappings contained in this map.
The descending map is backed by this map, so changes to the map are
reflected in the descending map, and vice-versa.  If either map is
modified while an iteration over a collection view of either map
is in progress (except through the iterator's own `remove`
operation), the results of the iteration are undefined.

The returned map has an ordering equivalent to
Collections.reverseOrder`(comparator())`.
The expression `m.descendingMap().descendingMap()` returns a
view of `m` essentially equivalent to `m`.

**Returns:** a reverse order view of this map

## NavigableMap.navigableKeySet()

```java
NavigableSet<K> navigableKeySet()
```

Returns a `NavigableSet` view of the keys contained in this map.
The set's iterator returns the keys in ascending order.
The set is backed by the map, so changes to the map are reflected in
the set, and vice-versa.  If the map is modified while an iteration
over the set is in progress (except through the iterator's own `remove` operation), the results of the iteration are undefined.  The
set supports element removal, which removes the corresponding mapping
from the map, via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear` operations.
It does not support the `add` or `addAll` operations.

**Returns:** a navigable set view of the keys in this map

## NavigableMap.descendingKeySet()

```java
NavigableSet<K> descendingKeySet()
```

Returns a reverse order `NavigableSet` view of the keys contained in this map.
The set's iterator returns the keys in descending order.
The set is backed by the map, so changes to the map are reflected in
the set, and vice-versa.  If the map is modified while an iteration
over the set is in progress (except through the iterator's own `remove` operation), the results of the iteration are undefined.  The
set supports element removal, which removes the corresponding mapping
from the map, via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear` operations.
It does not support the `add` or `addAll` operations.

**Returns:** a reverse order navigable set view of the keys in this map

## NavigableMap.subMap(K, boolean, K, boolean)

```java
NavigableMap<K,V> subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive)
```

Returns a view of the portion of this map whose keys range from
`fromKey` to `toKey`.  If `fromKey` and
`toKey` are equal, the returned map is empty unless
`fromInclusive` and `toInclusive` are both true.  The
returned map is backed by this map, so changes in the returned map are
reflected in this map, and vice-versa.  The returned map supports all
optional map operations that this map supports.

The returned map will throw an `IllegalArgumentException`
on an attempt to insert a key <example-value> of its range, or to construct a
submap either of whose endpoints lie outside its range.

Parameters:

- `fromKey`: low endpoint of the keys in the returned map
- `fromInclusive`: `true` if the low endpoint is to be included in the returned view
- `toKey`: high endpoint of the keys in the returned map
- `toInclusive`: `true` if the high endpoint is to be included in the returned view

**Returns:** a view of the portion of this map whose keys range from
        `fromKey` to `toKey`

Throws:

- `ClassCastException`: if `fromKey` and `toKey` cannot be compared to one another using this map's comparator (or, if the map has no comparator, using natural ordering). Implementations may, but are not required to, throw this exception if `fromKey` or `toKey` cannot be compared to keys currently in the map.
- `NullPointerException`: if `fromKey` or `toKey` is null and this map does not permit null keys
- `IllegalArgumentException`: if `fromKey` is greater than `toKey`; or if this map itself has a restricted range, and `fromKey` or `toKey` lies outside the bounds of the range

## NavigableMap.headMap(K, boolean)

```java
NavigableMap<K,V> headMap(K toKey, boolean inclusive)
```

Returns a view of the portion of this map whose keys are less than (or
equal to, if `inclusive` is true) `toKey`.  The returned
map is backed by this map, so changes in the returned map are reflected
in this map, and vice-versa.  The returned map supports all optional
map operations that this map supports.

The returned map will throw an `IllegalArgumentException`
on an attempt to insert a key <example-value> its range.

Parameters:

- `toKey`: high endpoint of the keys in the returned map
- `inclusive`: `true` if the high endpoint is to be included in the returned view

**Returns:** a view of the portion of this map whose keys are less than
        (or equal to, if `inclusive` is true) `toKey`

Throws:

- `ClassCastException`: if `toKey` is not compatible with this map's comparator (or, if the map has no comparator, if `toKey` does not implement `Comparable`). Implementations may, but are not required to, throw this exception if `toKey` cannot be compared to keys currently in the map.
- `NullPointerException`: if `toKey` is null and this map does not permit null keys
- `IllegalArgumentException`: if this map itself has a restricted range, and `toKey` lies outside the bounds of the range

## NavigableMap.tailMap(K, boolean)

```java
NavigableMap<K,V> tailMap(K fromKey, boolean inclusive)
```

Returns a view of the portion of this map whose keys are greater than (or
equal to, if `inclusive` is true) `fromKey`.  The returned
map is backed by this map, so changes in the returned map are reflected
in this map, and vice-versa.  The returned map supports all optional
map operations that this map supports.

The returned map will throw an `IllegalArgumentException`
on an attempt to insert a key <example-value> its range.

Parameters:

- `fromKey`: low endpoint of the keys in the returned map
- `inclusive`: `true` if the low endpoint is to be included in the returned view

**Returns:** a view of the portion of this map whose keys are greater than
        (or equal to, if `inclusive` is true) `fromKey`

Throws:

- `ClassCastException`: if `fromKey` is not compatible with this map's comparator (or, if the map has no comparator, if `fromKey` does not implement `Comparable`). Implementations may, but are not required to, throw this exception if `fromKey` cannot be compared to keys currently in the map.
- `NullPointerException`: if `fromKey` is null and this map does not permit null keys
- `IllegalArgumentException`: if this map itself has a restricted range, and `fromKey` lies outside the bounds of the range
