---
title: "TreeMap class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/TreeMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TreeMap class (java.util)

```java
public class TreeMap<K,V> extends AbstractMap<K,V> implements NavigableMap<K,V>, Cloneable, java.io.Serializable
```

A Red-Black tree based `NavigableMap` implementation.
The map is sorted according to the natural ordering of its keys, or by a `Comparator` provided at map
creation time, depending on which constructor is used.

This implementation provides guaranteed log(n) time cost for the
`containsKey`, `get`, `put` and `remove`
operations.  Algorithms are adaptations of those in Cormen, Leiserson, and
Rivest's *Introduction to Algorithms*.

Note that the ordering maintained by a tree map, like any sorted map, and
whether or not an explicit comparator is provided, must be *consistent
with `equals`* if this sorted map is to correctly implement the
`Map` interface.  (See `Comparable` or `Comparator` for a
precise definition of *consistent with equals*.)  This is so because
the `Map` interface is defined in terms of the `equals`
operation, but a sorted map performs all key <example-value> using its `compareTo` (or `compare`) method, so two keys that are deemed equal by
this method are, from the standpoint of the sorted map, equal.  The behavior
of a sorted map *is* well-defined even if its ordering is
inconsistent with `equals`; it just fails to obey the general contract
of the `Map` interface.

**Note that this implementation is not synchronized.**
If multiple threads access a map concurrently, and at least one of the
threads modifies the map structurally, it *must* be synchronized
externally.  (A structural modification is any operation that adds or
deletes one or more mappings; merely changing the value associated
with an existing key is not a structural modification.)  This is
typically accomplished by synchronizing on some object that naturally
encapsulates the map.
If no such object exists, the map should be "wrapped" using the
Collections.synchronizedSortedMap
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the map:

```java
  SortedMap m = Collections.synchronizedSortedMap(new TreeMap(...));
```

The iterators returned by the `iterator` method of the collections
returned by all of this class's "collection view methods" are
*fail-fast*: if the map is structurally modified at any time after
the iterator is created, in any way except through the iterator's own
`remove` method, the iterator will throw a `ConcurrentModificationException`.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than risking
arbitrary, non-deterministic behavior at an undetermined time in the future.

Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw `ConcurrentModificationException` on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness:   *the fail-fast behavior of iterators
should be used only to detect bugs.*

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

The putFirst and putLast methods of this class
throw `UnsupportedOperationException`. The encounter order of mappings is determined
by the comparison method; therefore, explicit positioning is not supported.

This class is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**See also:** Map

**See also:** HashMap

**See also:** Hashtable

**See also:** Comparable

**See also:** Comparator

**See also:** Collection

**Since:** 1.2

## TreeMap.TreeMap()

```java
public TreeMap()
```

Constructs a new, empty tree map, using the natural ordering of its
keys.  All keys inserted into the map must implement the `Comparable` interface.  Furthermore, all such keys must be
*mutually comparable*: `k1.compareTo(k2)` must not throw
a `ClassCastException` for any keys `k1` and
`k2` in the map.  If the user attempts to put a key into the
map that violates this constraint (for example, the user attempts to
put a string key into a map whose keys are integers), the
`put(Object key, Object value)` call will throw a
`ClassCastException`.

## TreeMap.TreeMap(Comparator<? super K>)

```java
public TreeMap(Comparator<? super K> comparator)
```

Constructs a new, empty tree map, ordered according to the given
comparator.  All keys inserted into the map must be *mutually
comparable* by the given comparator: `comparator.compare(k1, k2)` must not throw a `ClassCastException` for any keys
`k1` and `k2` in the map.  If the user attempts to put
a key into the map that violates this constraint, the `put(Object key, Object value)` call will throw a
`ClassCastException`.

Parameters:

- `comparator`: the comparator that will be used to order this map. If `null`, the natural ordering of the keys will be used.

## TreeMap.TreeMap(Map<? extends K, ? extends V>)

```java
public TreeMap(Map<? extends K, ? extends V> m)
```

Constructs a new tree map containing the same mappings as the given
map, ordered according to the *natural ordering* of its keys.
All keys inserted into the new map must implement the `Comparable` interface.  Furthermore, all such keys must be
*mutually comparable*: `k1.compareTo(k2)` must not throw
a `ClassCastException` for any keys `k1` and
`k2` in the map.  This method runs in n*log(n) time.

Parameters:

- `m`: the map whose mappings are to be placed in this map

Throws:

- `ClassCastException`: if the keys in m are not `Comparable`, or are not mutually comparable
- `NullPointerException`: if the specified map is null

## TreeMap.TreeMap(SortedMap<K, ? extends V>)

```java
public TreeMap(SortedMap<K, ? extends V> m)
```

Constructs a new tree map containing the same mappings and
using the same ordering as the specified sorted map.  This
method runs in linear time.

Parameters:

- `m`: the sorted map whose mappings are to be placed in this map, and whose comparator is to be used to sort this map

Throws:

- `NullPointerException`: if the specified map is null

## TreeMap.size()

```java
public int size()
```

Returns the number of key-value mappings in this map.

**Returns:** the number of key-value mappings in this map

## TreeMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Returns `true` if this map contains a mapping for the specified
key.

Parameters:

- `key`: key whose presence in this map is to be tested

**Returns:** `true` if this map contains a mapping for the
        specified key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns `true` if this map maps one or more keys to the
specified value.  More formally, returns `true` if and only if
this map contains at least one mapping to a value `v` such
that `(value==null ? v==null : value.equals(v))`.  This
operation will probably require time linear in the map size for
most implementations.

Parameters:

- `value`: value whose presence in this map is to be tested

**Returns:** `true` if a mapping to `value` exists;
        `false` otherwise

**Since:** 1.2

## TreeMap.get(Object)

```java
public V get(Object key)
```

Returns the value to which the specified key is mapped,
or `null` if this map contains no mapping for the key.

More formally, if this map contains a mapping from a key
`k` to a value `v` such that `key` compares
equal to `k` according to the map's ordering, then this
method returns `v`; otherwise it returns `null`.
(There can be at most one such mapping.)

A return value of `null` does not *necessarily*
indicate that the map contains no mapping for the key; it's also
possible that the map explicitly maps the key to `null`.
The containsKey <example-value> may be used to
distinguish these two cases.

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.firstKey()

```java
public K firstKey()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## TreeMap.lastKey()

```java
public K lastKey()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## TreeMap.putFirst(K, V)

```java
public V putFirst(K k, V v)
```

Throws `UnsupportedOperationException`. The encounter order induced by this
map's comparison method determines the position of mappings, so explicit positioning
is not supported.

**Since:** 21

Throws:

- `UnsupportedOperationException`: always

## TreeMap.putLast(K, V)

```java
public V putLast(K k, V v)
```

Throws `UnsupportedOperationException`. The encounter order induced by this
map's comparison method determines the position of mappings, so explicit positioning
is not supported.

**Since:** 21

Throws:

- `UnsupportedOperationException`: always

## TreeMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> map)
```

Copies all of the mappings from the specified map to this map.
These mappings replace any mappings that this map had for any
of the keys currently in the specified map.

Parameters:

- `map`: mappings to be stored in this map

Throws:

- `ClassCastException`: if the class of a key or value in the specified map prevents it from being stored in this map
- `NullPointerException`: if the specified map is null or the specified map contains a null key and this map does not permit null keys

## TreeMap.put(K, V)

```java
public V put(K key, V value)
```

Associates the specified value with the specified key in this map.
If the map previously contained a mapping for the key, the old
value is replaced.

Parameters:

- `key`: key with which the specified value is to be associated
- `value`: value to be associated with the specified key

**Returns:** the previous value associated with `key`, or
        `null` if there was no mapping for `key`.
        (A `null` return can also indicate that the map
        previously associated `null` with `key`.)

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
mapping function modifies this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the mapping function modified this map

## TreeMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
remapping function modifies this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## TreeMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
remapping function modifies this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## TreeMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
remapping function modifies this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## TreeMap.remove(Object)

```java
public V remove(Object key)
```

Removes the mapping for this key from this TreeMap if present.

Parameters:

- `key`: key for which mapping should be removed

**Returns:** the previous value associated with `key`, or
        `null` if there was no mapping for `key`.
        (A `null` return can also indicate that the map
        previously associated `null` with `key`.)

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.clear()

```java
public void clear()
```

Removes all of the mappings from this map.
The map will be empty after this call returns.

## TreeMap.clone()

```java
public Object clone()
```

Returns a shallow copy of this `TreeMap` instance. (The keys and
values themselves are not cloned.)

**Returns:** a shallow copy of this map

## TreeMap.firstEntry()

```java
public Map.Entry<K,V> firstEntry()
```

**Since:** 1.6

## TreeMap.lastEntry()

```java
public Map.Entry<K,V> lastEntry()
```

**Since:** 1.6

## TreeMap.pollFirstEntry()

```java
public Map.Entry<K,V> pollFirstEntry()
```

**Since:** 1.6

## TreeMap.pollLastEntry()

```java
public Map.Entry<K,V> pollLastEntry()
```

**Since:** 1.6

## TreeMap.lowerEntry(K)

```java
public Map.Entry<K,V> lowerEntry(K key)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.lowerKey(K)

```java
public K lowerKey(K key)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys
