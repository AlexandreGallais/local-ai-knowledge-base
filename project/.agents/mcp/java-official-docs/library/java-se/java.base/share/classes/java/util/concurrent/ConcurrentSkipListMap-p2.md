---
title: "ConcurrentSkipListMap class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentSkipListMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentSkipListMap class (java.util.concurrent) (part 2 of 2)

## ConcurrentSkipListMap.replace(K, V, V)

```java
public boolean replace(K key, V oldValue, V newValue)
```

(inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if any of the arguments are null

## ConcurrentSkipListMap.replace(K, V)

```java
public V replace(K key, V value)
```

(inherited documentation)

**Returns:** the previous value associated with the specified key,
        or `null` if there was no mapping for the key

Throws:

- `ClassCastException`: if the specified key <example-value> be compared with the keys currently in the map
- `NullPointerException`: if the specified key or value is null

## ConcurrentSkipListMap.firstKey()

```java
public K firstKey()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentSkipListMap.lastKey()

```java
public K lastKey()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentSkipListMap.putFirst(K, V)

```java
public V putFirst(K k, V v)
```

Throws `UnsupportedOperationException`. The encounter order induced by this
map's comparison method determines the position of mappings, so explicit positioning
is not supported.

**Since:** 21

Throws:

- `UnsupportedOperationException`: always

## ConcurrentSkipListMap.putLast(K, V)

```java
public V putLast(K k, V v)
```

Throws `UnsupportedOperationException`. The encounter order induced by this
map's comparison method determines the position of mappings, so explicit positioning
is not supported.

**Since:** 21

Throws:

- `UnsupportedOperationException`: always

## ConcurrentSkipListMap.subMap(K, boolean, K, boolean)

```java
public ConcurrentNavigableMap<K,V> subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromKey` or `toKey` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListMap.headMap(K, boolean)

```java
public ConcurrentNavigableMap<K,V> headMap(K toKey, boolean inclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `toKey` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListMap.tailMap(K, boolean)

```java
public ConcurrentNavigableMap<K,V> tailMap(K fromKey, boolean inclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromKey` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListMap.subMap(K, K)

```java
public ConcurrentNavigableMap<K,V> subMap(K fromKey, K toKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromKey` or `toKey` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListMap.headMap(K)

```java
public ConcurrentNavigableMap<K,V> headMap(K toKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `toKey` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListMap.tailMap(K)

```java
public ConcurrentNavigableMap<K,V> tailMap(K fromKey)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromKey` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListMap.lowerEntry(K)

```java
public Map.Entry<K,V> lowerEntry(K key)
```

Returns a key-value mapping associated with the greatest key
strictly less than the given key, or `null` if there is
no such key. The returned entry does *not* support the
`Entry.setValue` method.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.lowerKey(K)

```java
public K lowerKey(K key)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.floorEntry(K)

```java
public Map.Entry<K,V> floorEntry(K key)
```

Returns a key-value mapping associated with the greatest key
less than or equal to the given key, or `null` if there
is no such key. The returned entry does *not* support
the `Entry.setValue` method.

Parameters:

- `key`: the key

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.floorKey(K)

```java
public K floorKey(K key)
```

Parameters:

- `key`: the key

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.ceilingEntry(K)

```java
public Map.Entry<K,V> ceilingEntry(K key)
```

Returns a key-value mapping associated with the least key
greater than or equal to the given key, or `null` if
there is no such entry. The returned entry does *not*
support the `Entry.setValue` method.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.ceilingKey(K)

```java
public K ceilingKey(K key)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.higherEntry(K)

```java
public Map.Entry<K,V> higherEntry(K key)
```

Returns a key-value mapping associated with the least key
strictly greater than the given key, or `null` if there
is no such key. The returned entry does *not* support
the `Entry.setValue` method.

Parameters:

- `key`: the key

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.higherKey(K)

```java
public K higherKey(K key)
```

Parameters:

- `key`: the key

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified key is null

## ConcurrentSkipListMap.firstEntry()

```java
public Map.Entry<K,V> firstEntry()
```

Returns a key-value mapping associated with the least
key in this map, or `null` if the map is empty.
The returned entry does *not* support
the `Entry.setValue` method.

## ConcurrentSkipListMap.lastEntry()

```java
public Map.Entry<K,V> lastEntry()
```

Returns a key-value mapping associated with the greatest
key in this map, or `null` if the map is empty.
The returned entry does *not* support
the `Entry.setValue` method.

## ConcurrentSkipListMap.pollFirstEntry()

```java
public Map.Entry<K,V> pollFirstEntry()
```

Removes and returns a key-value mapping associated with
the least key in this map, or `null` if the map is empty.
The returned entry does *not* support
the `Entry.setValue` method.

## ConcurrentSkipListMap.pollLastEntry()

```java
public Map.Entry<K,V> pollLastEntry()
```

Removes and returns a key-value mapping associated with
the greatest key in this map, or `null` if the map is empty.
The returned entry does *not* support
the `Entry.setValue` method.
