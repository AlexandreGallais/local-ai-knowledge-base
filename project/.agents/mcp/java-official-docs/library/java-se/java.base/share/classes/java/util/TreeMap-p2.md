---
title: "TreeMap class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/TreeMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TreeMap class (java.util) (part 2 of 2)

## TreeMap.floorEntry(K)

```java
public Map.Entry<K,V> floorEntry(K key)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.floorKey(K)

```java
public K floorKey(K key)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.ceilingEntry(K)

```java
public Map.Entry<K,V> ceilingEntry(K key)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.ceilingKey(K)

```java
public K ceilingKey(K key)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.higherEntry(K)

```java
public Map.Entry<K,V> higherEntry(K key)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.higherKey(K)

```java
public K higherKey(K key)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null and this map uses natural ordering, or its comparator does not permit null keys

## TreeMap.keySet()

```java
public Set<K> keySet()
```

Returns a `Set` view of the keys contained in this map.

The set's iterator returns the keys in ascending order.
The set's spliterator is
*late-binding*,
*fail-fast*, and additionally reports `Spliterator.SORTED`
and `Spliterator.ORDERED` with an encounter order that is ascending
key order.  The spliterator's comparator (see
`java.util.Spliterator.getComparator()`) is `null` if
the tree map's comparator (see `comparator()`) is `null`.
Otherwise, the spliterator's comparator is the same as or imposes the
same total ordering as the tree map's comparator.

The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  If the map is modified
while an iteration over the set is in progress (except through
the iterator's own `remove` operation), the results of
the iteration are undefined.  The set supports element removal,
which removes the corresponding mapping from the map, via the
`Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear`
operations.  It does not support the `add` or `addAll`
operations.

## TreeMap.navigableKeySet()

```java
public NavigableSet<K> navigableKeySet()
```

**Since:** 1.6

## TreeMap.descendingKeySet()

```java
public NavigableSet<K> descendingKeySet()
```

**Since:** 1.6

## TreeMap.values()

```java
public Collection<V> values()
```

Returns a `Collection` view of the values contained in this map.

The collection's iterator returns the values in ascending order
of the corresponding keys. The collection's spliterator is
*late-binding*,
*fail-fast*, and additionally reports `Spliterator.ORDERED`
with an encounter order that is ascending order of the corresponding
keys.

The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  If the map is
modified while an iteration over the collection is in progress
(except through the iterator's own `remove` operation),
the results of the iteration are undefined.  The collection
supports element removal, which removes the corresponding
mapping from the map, via the `Iterator.remove`,
`Collection.remove`, `removeAll`,
`retainAll` and `clear` operations.  It does not
support the `add` or `addAll` operations.

## TreeMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a `Set` view of the mappings contained in this map.

The set's iterator returns the entries in ascending key order. The
set's spliterator is
*late-binding*,
*fail-fast*, and additionally reports `Spliterator.SORTED` and
`Spliterator.ORDERED` with an encounter order that is ascending key
order.

The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  If the map is modified
while an iteration over the set is in progress (except through
the iterator's own `remove` operation, or through the
`setValue` operation on a map entry returned by the
iterator) the results of the iteration are undefined.  The set
supports element removal, which removes the corresponding
mapping from the map, via the `Iterator.remove`,
`Set.remove`, `removeAll`, `retainAll` and
`clear` operations.  It does not support the
`add` or `addAll` operations.

**Returns:** (inherited documentation)

## TreeMap.descendingMap()

```java
public NavigableMap<K, V> descendingMap()
```

**Since:** 1.6

## TreeMap.subMap(K, boolean, K, boolean)

```java
public NavigableMap<K,V> subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromKey` or `toKey` is null and this map uses natural ordering, or its comparator does not permit null keys
- `IllegalArgumentException`: (inherited documentation)

## TreeMap.headMap(K, boolean)

```java
public NavigableMap<K,V> headMap(K toKey, boolean inclusive)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `toKey` is null and this map uses natural ordering, or its comparator does not permit null keys
- `IllegalArgumentException`: (inherited documentation)

## TreeMap.tailMap(K, boolean)

```java
public NavigableMap<K,V> tailMap(K fromKey, boolean inclusive)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromKey` is null and this map uses natural ordering, or its comparator does not permit null keys
- `IllegalArgumentException`: (inherited documentation)

## TreeMap.subMap(K, K)

```java
public SortedMap<K,V> subMap(K fromKey, K toKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromKey` or `toKey` is null and this map uses natural ordering, or its comparator does not permit null keys
- `IllegalArgumentException`: (inherited documentation)

## TreeMap.headMap(K)

```java
public SortedMap<K,V> headMap(K toKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `toKey` is null and this map uses natural ordering, or its comparator does not permit null keys
- `IllegalArgumentException`: (inherited documentation)

## TreeMap.tailMap(K)

```java
public SortedMap<K,V> tailMap(K fromKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromKey` is null and this map uses natural ordering, or its comparator does not permit null keys
- `IllegalArgumentException`: (inherited documentation)

## TreeMap.getKey()

```java
public K getKey()
```

Returns the key.

**Returns:** the key

## TreeMap.getValue()

```java
public V getValue()
```

Returns the value associated with the key.

**Returns:** the value associated with the key

## TreeMap.setValue(V)

```java
public V setValue(V value)
```

Replaces the value currently associated with the key with the given
value.

**Returns:** the value associated with the key <example-value> this method was
        called
