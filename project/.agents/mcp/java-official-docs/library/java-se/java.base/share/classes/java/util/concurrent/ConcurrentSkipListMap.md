---
title: "ConcurrentSkipListMap class (java.util.concurrent) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentSkipListMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentSkipListMap class (java.util.concurrent)

```java
public class ConcurrentSkipListMap<K,V> extends AbstractMap<K,V> implements ConcurrentNavigableMap<K,V>, Cloneable, Serializable
```

A scalable concurrent `ConcurrentNavigableMap` implementation.
The map is sorted according to the natural ordering of its keys, or by a `Comparator` provided at map
creation time, depending on which constructor is used.

This class implements a concurrent variant of SkipLists
providing expected average *log(n)* time cost for the
`containsKey`, `get`, `put` and
`remove` operations and their variants.  Insertion, removal,
update, and access operations safely execute concurrently by
multiple threads.

Iterators and spliterators are
*weakly consistent*.

Ascending key <example-value> views and their iterators are faster than
descending ones.

All `Map.Entry` pairs returned by methods in this class
and its views represent snapshots of mappings at the time they were
produced. They do *not* support the `Entry.setValue`
method. (Note however that it is possible to change mappings in the
associated map using `put`, `putIfAbsent`, or
`replace`, depending on exactly which effect you need.)

Beware that bulk operations `putAll`, `equals`,
`toArray`, `containsValue`, and `clear` are
*not* guaranteed to be performed atomically. For example, an
iterator operating concurrently with a `putAll` operation
might view only some of the added elements.

This class and its views and iterators implement all of the
*optional* methods of the `Map` and `Iterator`
interfaces. Like most other concurrent collections, this class does
*not* permit the use of `null` keys or values because some
null return values cannot be reliably distinguished from the absence of
elements.

This class is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**Since:** 1.6

## ConcurrentSkipListMap.ConcurrentSkipListMap()

```java
public ConcurrentSkipListMap()
```

Constructs a new, empty map, sorted according to the
natural ordering of the keys.

## ConcurrentSkipListMap.ConcurrentSkipListMap(Comparator<? super K>)

```java
public ConcurrentSkipListMap(Comparator<? super K> comparator)
```

Constructs a new, empty map, sorted according to the specified
comparator.

Parameters:

- `comparator`: the comparator that will be used to order this map. If `null`, the natural ordering of the keys will be used.

## ConcurrentSkipListMap.ConcurrentSkipListMap(Map<? extends K, ? extends V>)

```java
public ConcurrentSkipListMap(Map<? extends K, ? extends V> m)
```

Constructs a new map containing the same mappings as the given map,
sorted according to the natural ordering of
the keys.

Parameters:

- `m`: the map whose mappings are to be placed in this map

Throws:

- `ClassCastException`: if the keys in `m` are not `Comparable`, or are not mutually comparable
- `NullPointerException`: if the specified map or any of its keys or values are null

## ConcurrentSkipListMap.ConcurrentSkipListMap(SortedMap<K, ? extends V>)

```java
public ConcurrentSkipListMap(SortedMap<K, ? extends V> m)
```

Constructs a new map containing the same mappings and using the
same ordering as the specified sorted map.

Parameters:

- `m`: the sorted map whose mappings are to be placed in this map, and whose comparator is to be used to sort this map

Throws:

- `NullPointerException`: if the specified sorted map or any of its keys or values are null

## ConcurrentSkipListMap.clone()

```java
public ConcurrentSkipListMap<K,V> clone()
```

Returns a shallow copy of this `ConcurrentSkipListMap`
instance. (The keys and values themselves are not cloned.)

**Returns:** a shallow copy of this map

## ConcurrentSkipListMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Returns `true` if this map contains a mapping for the specified
key.

Parameters:

- `key`: key whose presence in this map is to be tested

**Returns:** `true` if this map contains a mapping for the specified key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.get(Object)

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

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.getOrDefault(Object, V)

```java
public V getOrDefault(Object key, V defaultValue)
```

Returns the value to which the specified key is mapped,
or the given defaultValue if this map contains no mapping for the key.

Parameters:

- `key`: the key
- `defaultValue`: the value to return if this map contains no mapping for the given key

**Returns:** the mapping for the key, if present; else the defaultValue

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.put(K, V)

```java
public V put(K key, V value)
```

Associates the specified value with the specified key in this map.
If the map previously contained a mapping for the key, the old
value is replaced.

Parameters:

- `key`: key with which the specified value is to be associated
- `value`: value to be associated with the specified key

**Returns:** the previous value associated with the specified key, or
        `null` if there was no mapping for the key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key or value is null

## ConcurrentSkipListMap.remove(Object)

```java
public V remove(Object key)
```

Removes the mapping for the specified key from this map if present.

Parameters:

- `key`: key for which mapping should be removed

**Returns:** the previous value associated with the specified key, or
        `null` if there was no mapping for the key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns `true` if this map maps one or more keys to the
specified value.  This operation requires time linear in the
map size. Additionally, it is possible for the map to change
during execution of this method, in which case the returned
result may be inaccurate.

Parameters:

- `value`: value whose presence in this map is to be tested

**Returns:** `true` if a mapping to `value` exists;
        `false` otherwise

Throws:

- `NullPointerException`: if the specified value is null

## ConcurrentSkipListMap.size()

```java
public int size()
```

(inherited documentation)

## ConcurrentSkipListMap.isEmpty()

```java
public boolean isEmpty()
```

(inherited documentation)

## ConcurrentSkipListMap.clear()

```java
public void clear()
```

Removes all of the mappings from this map.

## ConcurrentSkipListMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

If the specified key is not already associated with a value,
attempts to compute its value using the given mapping function
and enters it into this map unless `null`.  The function
is *NOT* guaranteed to be applied once atomically only
if the value is not present.

Parameters:

- `key`: key with which the specified value is to be associated
- `mappingFunction`: the function to compute a value

**Returns:** the current (existing or computed) value associated with
        the specified key, or null if the computed value is null

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified key is null or the mappingFunction is null

## ConcurrentSkipListMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

If the value for the specified key is present, attempts to
compute a new mapping given the key and its current mapped
value. The function is *NOT* guaranteed to be applied
once atomically.

Parameters:

- `key`: key with which a value may be associated
- `remappingFunction`: the function to compute a value

**Returns:** the new value associated with the specified key, or null if none

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified key is null or the remappingFunction is null

## ConcurrentSkipListMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

Attempts to compute a mapping for the specified key and its
current mapped value (or `null` if there is no current
mapping). The function is *NOT* guaranteed to be applied
once atomically.

Parameters:

- `key`: key with which the specified value is to be associated
- `remappingFunction`: the function to compute a value

**Returns:** the new value associated with the specified key, or null if none

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified key is null or the remappingFunction is null

## ConcurrentSkipListMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

If the specified key is not already associated with a value,
associates it with the given value.  Otherwise, replaces the
value with the results of the given remapping function, or
removes if `null`. The function is *NOT*
guaranteed to be applied once atomically.

Parameters:

- `key`: key with which the specified value is to be associated
- `value`: the value to use if absent
- `remappingFunction`: the function to recompute a value if present

**Returns:** the new value associated with the specified key, or null if none

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified key or value is null or the remappingFunction is null

## ConcurrentSkipListMap.keySet()

```java
public NavigableSet<K> keySet()
```

Returns a `NavigableSet` view of the keys contained in this map.

The set's iterator returns the keys in ascending order.
The set's spliterator additionally reports `Spliterator.CONCURRENT`,
`Spliterator.NONNULL`, `Spliterator.SORTED` and
`Spliterator.ORDERED`, with an encounter order that is ascending
key order.

The spliterator's comparator
is `null` if the map's comparator
is `null`.
Otherwise, the spliterator's comparator is the same as or imposes the
same total ordering as the map's comparator.

The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  The set supports element
removal, which removes the corresponding mapping from the map,
via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear`
operations.  It does not support the `add` or `addAll`
operations.

The view's iterators and spliterators are
*weakly consistent*.

This method is equivalent to method `navigableKeySet`.

**Returns:** a navigable set view of the keys in this map

## ConcurrentSkipListMap.values()

```java
public Collection<V> values()
```

Returns a `Collection` view of the values contained in this map.

The collection's iterator returns the values in ascending order
of the corresponding keys. The collections's spliterator additionally
reports `Spliterator.CONCURRENT`, `Spliterator.NONNULL` and
`Spliterator.ORDERED`, with an encounter order that is ascending
order of the corresponding keys.

The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  The collection
supports element removal, which removes the corresponding
mapping from the map, via the `Iterator.remove`,
`Collection.remove`, `removeAll`,
`retainAll` and `clear` operations.  It does not
support the `add` or `addAll` operations.

The view's iterators and spliterators are
*weakly consistent*.

## ConcurrentSkipListMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a `Set` view of the mappings contained in this map.

The set's iterator returns the entries in ascending key order.  The
set's spliterator additionally reports `Spliterator.CONCURRENT`,
`Spliterator.NONNULL`, `Spliterator.SORTED` and
`Spliterator.ORDERED`, with an encounter order that is ascending
key order.

The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  The set supports element
removal, which removes the corresponding mapping from the map,
via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll` and `clear`
operations.  It does not support the `add` or
`addAll` operations.

The view's iterators and spliterators are
*weakly consistent*.

The `Map.Entry` elements traversed by the `iterator`
or `spliterator` do *not* support the `setValue`
operation.

**Returns:** a set view of the mappings contained in this map,
        sorted in ascending key order

## ConcurrentSkipListMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this map for equality.
Returns `true` if the given object is also a map and the
two maps represent the same mappings.  More formally, two maps
`m1` and `m2` represent the same mappings if
`m1.entrySet().equals(m2.entrySet())`.  This
operation may return misleading results if either map is
concurrently modified during execution of this method.

Parameters:

- `o`: object to be compared for equality with this map

**Returns:** `true` if the specified object is equal to this map

## ConcurrentSkipListMap.putIfAbsent(K, V)

```java
public V putIfAbsent(K key, V value)
```

(inherited documentation)

**Returns:** the previous value associated with the specified key,
        or `null` if there was no mapping for the key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key or value is null

## ConcurrentSkipListMap.remove(Object, Object)

```java
public boolean remove(Object key, Object value)
```

(inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key is null
