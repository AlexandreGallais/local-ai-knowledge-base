---
title: "LinkedHashMap class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/LinkedHashMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LinkedHashMap class (java.util) (part 2 of 2)

## LinkedHashMap.values()

```java
public Collection<V> values()
```

Returns a `Collection` view of the values contained in this map. The
encounter order of values in the view matches the encounter order of entries in
this map. The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  If the map is
modified while an iteration over the collection is in progress
(except through the iterator's own `remove` operation),
the results of the iteration are undefined.  The collection
supports element removal, which removes the corresponding
mapping from the map, via the `Iterator.remove`,
`Collection.remove`, `removeAll`,
`retainAll` and `clear` operations.  It does not
support the `add` or `addAll` operations.
Its `Spliterator` typically provides faster sequential
performance but much poorer parallel performance than that of
`HashMap`.

**Returns:** a view of the values contained in this map

## LinkedHashMap.sequencedValues()

```java
public SequencedCollection<V> sequencedValues()
```

(inherited documentation)

The returned view has the same characteristics as specified for the view
returned by the values method.

**Returns:** (inherited documentation)

**Since:** 21

## LinkedHashMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a `Set` view of the mappings contained in this map. The encounter
order of the view matches the encounter order of entries of this map.
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
Its `Spliterator` typically provides faster sequential
performance but much poorer parallel performance than that of
`HashMap`.

**Returns:** a set view of the mappings contained in this map

## LinkedHashMap.sequencedEntrySet()

```java
public SequencedSet<Map.Entry<K, V>> sequencedEntrySet()
```

(inherited documentation)

The returned view has the same characteristics as specified for the view
returned by the entrySet method.

**Returns:** (inherited documentation)

**Since:** 21

## LinkedHashMap.newLinkedHashMap(int)

```java
public static <K, V> LinkedHashMap<K, V> newLinkedHashMap(int numMappings)
```

Creates a new, empty, insertion-ordered LinkedHashMap suitable for the expected number of mappings.
The returned map uses the default load factor of 0.75, and its initial capacity is
generally large enough so that the expected number of mappings can be added
without resizing the map.

Parameters:

- `numMappings`: the expected number of mappings
- `<K>`: the type of keys maintained by the new map
- `<V>`: the type of mapped values

**Returns:** the newly created map

**Since:** 19

Throws:

- `IllegalArgumentException`: if numMappings is negative

## LinkedHashMap.reversed()

```java
public SequencedMap<K, V> reversed()
```

(inherited documentation)

Modifications to the reversed view and its map views are permitted and will be
propagated to this map. In addition, modifications to this map will be visible
in the reversed view and its map views.

**Returns:** (inherited documentation)

**Since:** 21
