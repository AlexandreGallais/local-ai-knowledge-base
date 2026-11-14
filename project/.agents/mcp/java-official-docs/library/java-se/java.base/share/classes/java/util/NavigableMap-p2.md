---
title: "NavigableMap interface (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/NavigableMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NavigableMap interface (java.util) (part 2 of 2)

## NavigableMap.subMap(K, K)

```java
SortedMap<K,V> subMap(K fromKey, K toKey)
```

(inherited documentation)

Equivalent to `subMap(fromKey, true, toKey, false)`.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## NavigableMap.headMap(K)

```java
SortedMap<K,V> headMap(K toKey)
```

(inherited documentation)

Equivalent to `headMap(toKey, false)`.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## NavigableMap.tailMap(K)

```java
SortedMap<K,V> tailMap(K fromKey)
```

(inherited documentation)

Equivalent to `tailMap(fromKey, true)`.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## NavigableMap.reversed()

```java
default NavigableMap<K, V> reversed()
```

(inherited documentation)

This method is equivalent to descendingMap.

**Implementation requirements:** The implementation in this interface returns the result of calling the
`descendingMap` method.

**Returns:** a reverse-ordered view of this map, as a `NavigableMap`

**Since:** 21
