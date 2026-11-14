---
title: "ConcurrentNavigableMap interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentNavigableMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentNavigableMap interface (java.util.concurrent)

```java
public interface ConcurrentNavigableMap<K,V> extends ConcurrentMap<K,V>, NavigableMap<K,V>
```

A `ConcurrentMap` supporting `NavigableMap` operations,
and recursively so for its navigable sub-maps.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**Since:** 1.6

## ConcurrentNavigableMap.subMap(K, boolean, K, boolean)

```java
ConcurrentNavigableMap<K,V> subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentNavigableMap.headMap(K, boolean)

```java
ConcurrentNavigableMap<K,V> headMap(K toKey, boolean inclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentNavigableMap.tailMap(K, boolean)

```java
ConcurrentNavigableMap<K,V> tailMap(K fromKey, boolean inclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentNavigableMap.subMap(K, K)

```java
ConcurrentNavigableMap<K,V> subMap(K fromKey, K toKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentNavigableMap.headMap(K)

```java
ConcurrentNavigableMap<K,V> headMap(K toKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentNavigableMap.tailMap(K)

```java
ConcurrentNavigableMap<K,V> tailMap(K fromKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentNavigableMap.descendingMap()

```java
ConcurrentNavigableMap<K,V> descendingMap()
```

Returns a reverse order view of the mappings contained in this map.
The descending map is backed by this map, so changes to the map are
reflected in the descending map, and vice-versa.

The returned map has an ordering equivalent to
Collections.reverseOrder`(comparator())`.
The expression `m.descendingMap().descendingMap()` returns a
view of `m` essentially equivalent to `m`.

**Returns:** a reverse order view of this map

## ConcurrentNavigableMap.navigableKeySet()

```java
NavigableSet<K> navigableKeySet()
```

Returns a `NavigableSet` view of the keys contained in this map.
The set's iterator returns the keys in ascending order.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  The set supports element
removal, which removes the corresponding mapping from the map,
via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear`
operations.  It does not support the `add` or `addAll`
operations.

The view's iterators and spliterators are
*weakly consistent*.

**Returns:** a navigable set view of the keys in this map

## ConcurrentNavigableMap.keySet()

```java
NavigableSet<K> keySet()
```

Returns a `NavigableSet` view of the keys contained in this map.
The set's iterator returns the keys in ascending order.
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

## ConcurrentNavigableMap.descendingKeySet()

```java
NavigableSet<K> descendingKeySet()
```

Returns a reverse order `NavigableSet` view of the keys contained in this map.
The set's iterator returns the keys in descending order.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  The set supports element
removal, which removes the corresponding mapping from the map,
via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear`
operations.  It does not support the `add` or `addAll`
operations.

The view's iterators and spliterators are
*weakly consistent*.

**Returns:** a reverse order navigable set view of the keys in this map
