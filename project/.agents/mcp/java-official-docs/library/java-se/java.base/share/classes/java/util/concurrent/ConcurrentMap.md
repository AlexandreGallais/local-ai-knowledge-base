---
title: "ConcurrentMap interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentMap interface (java.util.concurrent)

```java
public interface ConcurrentMap<K,V> extends Map<K,V>
```

A `Map` providing thread safety and atomicity guarantees.

To maintain the specified guarantees, default implementations of
methods including `putIfAbsent` inherited from `Map`
must be overridden by implementations of this interface. Similarly,
implementations of the collections returned by methods `keySet`, `values`, and `entrySet` must override
methods such as `removeIf` when necessary to
preserve atomicity guarantees.

Memory consistency effects: As with other concurrent
collections, actions in a thread prior to placing an object into a
`ConcurrentMap` as a key or value
*happen-before*
actions subsequent to the access or removal of that object from
the `ConcurrentMap` in another thread.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**Since:** 1.5

## ConcurrentMap.getOrDefault(Object, V)

```java
default V getOrDefault(Object key, V defaultValue)
```

(inherited documentation)

**Implementation note:** This implementation assumes that the ConcurrentMap cannot
contain null values and `get()` returning null unambiguously means
the key is absent. Implementations which support null values
**must** override this default implementation.

**Since:** 1.8

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ConcurrentMap.forEach(BiConsumer<? super K, ? super V>)

```java
default void forEach(BiConsumer<? super K, ? super V> action)
```

(inherited documentation)

**Implementation requirements:** The default implementation is equivalent to, for this
`map`:

```java
for (Map.Entry<K,V> entry : map.entrySet()) {
  action.accept(entry.getKey(), entry.getValue());
}
```

**Implementation note:** The default implementation assumes that
`IllegalStateException` thrown by `getKey()` or
`getValue()` indicates that the entry has been removed and cannot
be processed. Operation continues for subsequent entries.

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## ConcurrentMap.putIfAbsent(K, V)

```java
V putIfAbsent(K key, V value)
```

If the specified key is not already associated
with a value, associates it with the given value.
This is equivalent to, for this `map`:

```java
if (!map.containsKey(key))
  return map.put(key, value);
else
  return map.get(key);
```

except that the action is performed atomically.

Parameters:

- `key`: key with which the specified value is to be associated
- `value`: value to be associated with the specified key

**Implementation note:** This implementation intentionally re-abstracts the
inappropriate default provided in `Map`.

**Returns:** the previous value associated with the specified key, or
        `null` if there was no mapping for the key.
        (A `null` return can also indicate that the map
        previously associated `null` with the key,
        if the implementation supports null values.)

Throws:

- `UnsupportedOperationException`: if the `put` operation is not supported by this map
- `ClassCastException`: if the class of the specified key or value prevents it from being stored in this map
- `NullPointerException`: if the specified key or value is null, and this map does not permit null keys or values
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map

## ConcurrentMap.remove(Object, Object)

```java
boolean remove(Object key, Object value)
```

Removes the entry for a key only if currently mapped to a given value.
This is equivalent to, for this `map`:

```java
if (map.containsKey(key)
    && Objects.equals(map.get(key), value)) {
  map.remove(key);
  return true;
} else {
  return false;
}
```

except that the action is performed atomically.

Parameters:

- `key`: key with which the specified value is associated
- `value`: value expected to be associated with the specified key

**Implementation note:** This implementation intentionally re-abstracts the
inappropriate default provided in `Map`.

**Returns:** `true` if the value was removed

Throws:

- `UnsupportedOperationException`: if the `remove` operation is not supported by this map
- `ClassCastException`: if the key or value is of an inappropriate type for this map (optional)
- `NullPointerException`: if the specified key or value is null, and this map does not permit null keys or values (optional)

## ConcurrentMap.replace(K, V, V)

```java
boolean replace(K key, V oldValue, V newValue)
```

Replaces the entry for a key only if currently mapped to a given value.
This is equivalent to, for this `map`:

```java
if (map.containsKey(key)
    && Objects.equals(map.get(key), oldValue)) {
  map.put(key, newValue);
  return true;
} else {
  return false;
}
```

except that the action is performed atomically.

Parameters:

- `key`: key with which the specified value is associated
- `oldValue`: value expected to be associated with the specified key
- `newValue`: value to be associated with the specified key

**Implementation note:** This implementation intentionally re-abstracts the
inappropriate default provided in `Map`.

**Returns:** `true` if the value was replaced

Throws:

- `UnsupportedOperationException`: if the `put` operation is not supported by this map
- `ClassCastException`: if the class of a specified key or value prevents it from being stored in this map
- `NullPointerException`: if a specified key or value is null, and this map does not permit null keys or values
- `IllegalArgumentException`: if some property of a specified key or value prevents it from being stored in this map

## ConcurrentMap.replace(K, V)

```java
V replace(K key, V value)
```

Replaces the entry for a key only if currently mapped to some value.
This is equivalent to, for this `map`:

```java
if (map.containsKey(key))
  return map.put(key, value);
else
  return null;
```

except that the action is performed atomically.

Parameters:

- `key`: key with which the specified value is associated
- `value`: value to be associated with the specified key

**Implementation note:** This implementation intentionally re-abstracts the
inappropriate default provided in `Map`.

**Returns:** the previous value associated with the specified key, or
        `null` if there was no mapping for the key.
        (A `null` return can also indicate that the map
        previously associated `null` with the key,
        if the implementation supports null values.)

Throws:

- `UnsupportedOperationException`: if the `put` operation is not supported by this map
- `ClassCastException`: if the class of the specified key or value prevents it from being stored in this map
- `NullPointerException`: if the specified key or value is null, and this map does not permit null keys or values
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map

## ConcurrentMap.replaceAll(BiFunction<? super K, ? super V, ? extends V>)

```java
default void replaceAll(BiFunction<? super K, ? super V, ? extends V> function)
```

(inherited documentation)

**Implementation requirements:** The default implementation is equivalent to, for this `map`:

```java
for (Map.Entry<K,V> entry : map.entrySet()) {
  K k;
  V v;
  do {
    k = entry.getKey();
    v = entry.getValue();
  } while (!map.replace(k, v, function.apply(k, v)));
}
```

The default implementation may retry these steps when multiple
threads attempt updates including potentially calling the function
repeatedly for a given key.

This implementation assumes that the ConcurrentMap cannot contain null
values and `get()` returning null unambiguously means the key is
absent. Implementations which support null values **must**
override this default implementation.

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
default V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

(inherited documentation)

**Implementation requirements:** The default implementation is equivalent to the following steps for this
`map`:

```java
V oldValue, newValue;
return ((oldValue = map.get(key)) == null
        && (newValue = mappingFunction.apply(key)) != null
        && (oldValue = map.putIfAbsent(key, newValue)) == null)
  ? newValue
  : oldValue;
```

This implementation assumes that the ConcurrentMap cannot contain null
values and `get()` returning null unambiguously means the key is
absent. Implementations which support null values **must**
override this default implementation.

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
default V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

**Implementation requirements:** The default implementation is equivalent to performing the following
steps for this `map`:

```java
for (V oldValue; (oldValue = map.get(key)) != null; ) {
  V newValue = remappingFunction.apply(key, oldValue);
  if ((newValue == null)
      ? map.remove(key, oldValue)
      : map.replace(key, oldValue, newValue))
    return newValue;
}
return null;
```

When multiple threads attempt updates, map operations and the
remapping function may be called multiple times.

This implementation assumes that the ConcurrentMap cannot contain null
values and `get()` returning null unambiguously means the key is
absent. Implementations which support null values **must**
override this default implementation.

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
default V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

**Implementation requirements:** The default implementation is equivalent to performing the following
steps for this `map`:

```java
for (;;) {
  V oldValue = map.get(key);
  V newValue = remappingFunction.apply(key, oldValue);
  if (newValue != null) {
    if ((oldValue != null)
      ? map.replace(key, oldValue, newValue)
      : map.putIfAbsent(key, newValue) == null)
      return newValue;
  } else if (oldValue == null || map.remove(key, oldValue)) {
    return null;
  }
}
```

When multiple threads attempt updates, map operations and the
remapping function may be called multiple times.

This implementation assumes that the ConcurrentMap cannot contain null
values and `get()` returning null unambiguously means the key is
absent. Implementations which support null values **must**
override this default implementation.

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
default V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

**Implementation requirements:** The default implementation is equivalent to performing the following
steps for this `map`:

```java
for (;;) {
  V oldValue = map.get(key);
  if (oldValue != null) {
    V newValue = remappingFunction.apply(oldValue, value);
    if (newValue != null) {
      if (map.replace(key, oldValue, newValue))
        return newValue;
    } else if (map.remove(key, oldValue)) {
      return null;
    }
  } else if (map.putIfAbsent(key, value) == null) {
    return value;
  }
}
```

When multiple threads attempt updates, map operations and the
remapping function may be called multiple times.

This implementation assumes that the ConcurrentMap cannot contain null
values and `get()` returning null unambiguously means the key is
absent. Implementations which support null values **must**
override this default implementation.

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
