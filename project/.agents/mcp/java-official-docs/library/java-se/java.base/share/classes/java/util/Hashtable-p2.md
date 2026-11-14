---
title: "Hashtable class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Hashtable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Hashtable class (java.util) (part 2 of 2)

## Hashtable.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public synchronized V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`java.util.ConcurrentModificationException` if the mapping
function modified this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the mapping function modified this map

## Hashtable.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public synchronized V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`java.util.ConcurrentModificationException` if the remapping
function modified this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## Hashtable.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public synchronized V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`java.util.ConcurrentModificationException` if the remapping
function modified this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## Hashtable.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public synchronized V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`java.util.ConcurrentModificationException` if the remapping
function modified this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## Hashtable.expectedModCount

```java
protected int expectedModCount
```

The modCount value that the iterator believes that the backing
Hashtable should have.  If this expectation is violated, the iterator
has detected concurrent modification.
