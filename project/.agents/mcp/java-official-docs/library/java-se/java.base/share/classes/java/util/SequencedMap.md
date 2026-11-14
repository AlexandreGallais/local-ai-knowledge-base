---
title: "SequencedMap interface (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/SequencedMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SequencedMap interface (java.util)

```java
public interface SequencedMap<K, V> extends Map<K, V>
```

A Map that has a well-defined encounter order, that supports operations at both ends, and
that is reversible. The encounter order
of a `SequencedMap` is similar to that of the elements of a `SequencedCollection`,
but the ordering applies to mappings instead of individual elements.

The bulk operations on this map, including the forEach and the
replaceAll methods, operate on this map's mappings in
encounter order.

The view collections provided by the
keySet,
values,
entrySet,
sequencedKeySet,
sequencedValues,
and
sequencedEntrySet methods all reflect the encounter order
of this map. Even though the return values of the `keySet`, `values`, and
`entrySet` methods are not sequenced *types*, the elements
in those view collections do reflect the encounter order of this map. Thus, the
iterators returned by the statements

both provide the mappings of `sequencedMap` in that map's encounter order.

This interface provides methods to add mappings, to retrieve mappings, and to remove
mappings at either end of the map's encounter order.

This interface also defines the `reversed` method, which provides a
reverse-ordered view of this map.
In the reverse-ordered view, the concepts of first and last are inverted, as
are the concepts of successor and predecessor. The first mapping of this map
is the last mapping of the reverse-ordered view, and vice-versa. The successor of some
mapping in this map is its predecessor in the reversed view, and vice-versa. All
methods that respect the encounter order of the map operate as if the encounter order
is inverted. For instance, the forEach method of the reversed view reports
the mappings in order from the last mapping of this map to the first. In addition, all of
the view collections of the reversed view also reflect the inverse of this map's
encounter order. For example,

provides the mappings of this map in the inverse of the encounter order, that is, from
the last mapping to the first mapping. The availability of the `reversed` method,
and its impact on the ordering semantics of all applicable methods and views, allow convenient
iteration, searching, copying, and streaming of this map's mappings in either forward order or
reverse order.

A map's reverse-ordered view is generally not serializable, even if the original
map is serializable.

The `Map.Entry` instances obtained by iterating the `entrySet` view, the
`sequencedEntrySet` view, and its reverse-ordered view, maintain a connection to the
underlying map. This connection is guaranteed only during the iteration. It is unspecified
whether the connection is maintained outside of the iteration. If the underlying map permits
it, calling an Entry's setValue method will modify the value of the
underlying mapping. It is, however, unspecified whether modifications to the value in the
underlying mapping are visible in the `Entry` instance.

The methods
`firstEntry`,
`lastEntry`,
`pollFirstEntry`, and
`pollLastEntry`
return `Map.Entry` instances that represent snapshots of mappings as
of the time of the call. They do *not* support mutation of the
underlying map via the optional setValue method.

Depending upon the implementation, the `Entry` instances returned by other
means might or might not be connected to the underlying map. For example, consider
an `Entry` obtained in the following manner:

It is not specified by this interface whether the `setValue` method of the
`Entry` thus obtained will update a mapping in the underlying map, or whether
it will throw an exception, or whether changes to the underlying map are visible in
that `Entry`.

This interface has the same requirements on the `equals` and `hashCode`
methods as defined by Map.equals and Map.hashCode.
Thus, a `Map` and a `SequencedMap` will compare equals if and only
if they have equal mappings, irrespective of ordering.

This class is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**Since:** 21

## SequencedMap.reversed()

```java
SequencedMap<K, V> reversed()
```

Returns a reverse-ordered view of this map.
The encounter order of mappings in the returned view is the inverse of the encounter
order of mappings in this map. The reverse ordering affects all order-sensitive operations,
including those on the view collections of the returned view. If the implementation permits
modifications to this view, the modifications "write through" to the underlying map.
Changes to the underlying map might or might not be visible in this reversed view,
depending upon the implementation.

**Returns:** a reverse-ordered view of this map

## SequencedMap.firstEntry()

```java
default Map.Entry<K,V> firstEntry()
```

Returns the first key-value mapping in this map,
or `null` if the map is empty.

**Implementation requirements:** The implementation in this interface obtains the iterator of this map's entrySet.
If the iterator has an element, it returns an unmodifiable copy of that element.
Otherwise, it returns null.

**Returns:** the first key-value mapping,
        or `null` if this map is empty

## SequencedMap.lastEntry()

```java
default Map.Entry<K,V> lastEntry()
```

Returns the last key-value mapping in this map,
or `null` if the map is empty.

**Implementation requirements:** The implementation in this interface obtains the iterator of the entrySet of this map's
reversed view. If the iterator has an element, it returns an unmodifiable copy of
that element. Otherwise, it returns null.

**Returns:** the last key-value mapping,
        or `null` if this map is empty

## SequencedMap.pollFirstEntry()

```java
default Map.Entry<K,V> pollFirstEntry()
```

Removes and returns the first key-value mapping in this map,
or `null` if the map is empty (optional operation).

**Implementation requirements:** The implementation in this interface obtains the iterator of this map's entrySet.
If the iterator has an element, it calls `remove` on the iterator and
then returns an unmodifiable copy of that element. Otherwise, it returns null.

**Returns:** the removed first entry of this map,
        or `null` if this map is empty

Throws:

- `UnsupportedOperationException`: if this collection implementation does not support this operation

## SequencedMap.pollLastEntry()

```java
default Map.Entry<K,V> pollLastEntry()
```

Removes and returns the last key-value mapping in this map,
or `null` if the map is empty (optional operation).

**Implementation requirements:** The implementation in this interface obtains the iterator of the entrySet of this map's
reversed view. If the iterator has an element, it calls `remove` on the iterator
and then returns an unmodifiable copy of that element. Otherwise, it returns null.

**Returns:** the removed last entry of this map,
        or `null` if this map is empty

Throws:

- `UnsupportedOperationException`: if this collection implementation does not support this operation

## SequencedMap.putFirst(K, V)

```java
default V putFirst(K k, V v)
```

Inserts the given mapping into the map if it is not already present, or replaces the
value of a mapping if it is already present (optional operation). After this operation
completes normally, the given mapping will be present in this map, and it will be the
first mapping in this map's encounter order.

Parameters:

- `k`: the key
- `v`: the value

**Implementation requirements:** The implementation in this interface always throws
`UnsupportedOperationException`.

**Returns:** the value previously associated with k, or null if none

Throws:

- `UnsupportedOperationException`: if this collection implementation does not support this operation

## SequencedMap.putLast(K, V)

```java
default V putLast(K k, V v)
```

Inserts the given mapping into the map if it is not already present, or replaces the
value of a mapping if it is already present (optional operation). After this operation
completes normally, the given mapping will be present in this map, and it will be the
last mapping in this map's encounter order.

Parameters:

- `k`: the key
- `v`: the value

**Implementation requirements:** The implementation in this interface always throws
`UnsupportedOperationException`.

**Returns:** the value previously associated with k, or null if none

Throws:

- `UnsupportedOperationException`: if this collection implementation does not support this operation

## SequencedMap.sequencedKeySet()

```java
default SequencedSet<K> sequencedKeySet()
```

Returns a `SequencedSet` view of this map's keySet.

**Implementation requirements:** The implementation in this interface returns a `SequencedSet` instance
that behaves as follows. Its add, addAll, addFirst, and addLast methods throw `UnsupportedOperationException`.
Its getFirst and getLast
methods are implemented in terms of the firstEntry and lastEntry methods of this interface, respectively. Its removeFirst and removeLast
methods are implemented in terms of the pollFirstEntry and
pollLastEntry methods of this interface, respectively.
Its reversed method returns the sequencedKeySet view of the reversed view of
this map. Each of its other methods calls the corresponding method of the keySet view of this map.

**Returns:** a `SequencedSet` view of this map's `keySet`

## SequencedMap.sequencedValues()

```java
default SequencedCollection<V> sequencedValues()
```

Returns a `SequencedCollection` view of this map's values collection.

**Implementation requirements:** The implementation in this interface returns a `SequencedCollection` instance
that behaves as follows. Its add, addAll, addFirst, and addLast methods throw `UnsupportedOperationException`.
Its getFirst and getLast
methods are implemented in terms of the firstEntry and lastEntry methods of this interface, respectively. Its removeFirst and removeLast
methods are implemented in terms of the pollFirstEntry and
pollLastEntry methods of this interface, respectively.
Its reversed method returns the sequencedValues view of the reversed view of
this map. Its equals and hashCode methods
are inherited from `Object`. Each of its other methods calls the corresponding
method of the values view of this map.

**Returns:** a `SequencedCollection` view of this map's `values` collection

## SequencedMap.sequencedEntrySet()

```java
default SequencedSet<Map.Entry<K, V>> sequencedEntrySet()
```

Returns a `SequencedSet` view of this map's entrySet.

**Implementation requirements:** The implementation in this interface returns a `SequencedSet` instance
that behaves as follows. Its add, addAll, addFirst, and addLast methods throw `UnsupportedOperationException`.
Its getFirst and getLast
methods are implemented in terms of the firstEntry and lastEntry methods of this interface, respectively. Its removeFirst and removeLast
methods are implemented in terms of the pollFirstEntry and
pollLastEntry methods of this interface, respectively.
Its reversed method returns the sequencedEntrySet view of the reversed view of
this map. Each of its other methods calls the corresponding method of the entrySet view of this map.

**Returns:** a `SequencedSet` view of this map's `entrySet`
