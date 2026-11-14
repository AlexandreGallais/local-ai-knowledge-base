---
title: "Map interface (java.util) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Map.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Map interface (java.util) (part 3 of 5)

## Map.replace(K, V, V)

```java
default boolean replace(K key, V oldValue, V newValue)
```

Replaces the entry for the specified key only if currently
mapped to the specified value (optional operation).

Parameters:

- `key`: key with which the specified value is associated
- `oldValue`: value expected to be associated with the specified key
- `newValue`: value to be associated with the specified key

**Implementation requirements:** The default implementation is equivalent to, for this `map`:

```java
if (map.containsKey(key) && Objects.equals(map.get(key), oldValue)) {
    map.put(key, newValue);
    return true;
} else
    return false;
```

The default implementation does not throw NullPointerException
for maps that do not support null values if oldValue is null unless
newValue is also null.

The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties.

**Returns:** `true` if the value was replaced

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if the `replace` operation is not supported by this map (optional)
- `ClassCastException`: if the class of a specified key or value prevents it from being stored in this map
- `NullPointerException`: if a specified key or newValue is null, and this map does not permit null keys or values
- `NullPointerException`: if oldValue is null and this map does not permit null values (optional)
- `IllegalArgumentException`: if some property of a specified key or value prevents it from being stored in this map

## Map.replace(K, V)

```java
default V replace(K key, V value)
```

Replaces the entry for the specified key only if it is
currently mapped to some value (optional operation).

Parameters:

- `key`: key with which the specified value is associated
- `value`: value to be associated with the specified key

**Implementation requirements:** The default implementation is equivalent to, for this `map`:

```java
if (map.containsKey(key)) {
    return map.put(key, value);
} else
    return null;
```

The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties.

**Returns:** the previous value associated with the specified key, or
        `null` if there was no mapping for the key.
        (A `null` return can also indicate that the map
        previously associated `null` with the key,
        if the implementation supports null values.)

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if the `replace` operation is not supported by this map (optional)
- `ClassCastException`: if the class of the specified key or value prevents it from being stored in this map (optional)
- `NullPointerException`: if the specified key or value is null, and this map does not permit null keys or values
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map

## Map.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
default V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

If the specified key is not already associated with a value (or is mapped
to `null`), attempts to compute its value using the given mapping
function and enters it into this map unless `null` (optional operation).

If the mapping function returns `null`, no mapping is recorded.
If the mapping function itself throws an (unchecked) exception, the
exception is rethrown, and no mapping is recorded.  The most
common usage is to construct a new object serving as an initial
mapped value or memoized result, as in:

```java
map.computeIfAbsent(key, k -> new Value(f(k)));
```

Or to implement a multi-value map, `Map<K,Collection<V>>`,
supporting multiple values per key:

```java
map.computeIfAbsent(key, k -> new HashSet<V>()).add(v);
```

The mapping function should not modify this map during computation.

Parameters:

- `key`: key with which the specified value is to be associated
- `mappingFunction`: the mapping function to compute a value

**Implementation requirements:** The default implementation is equivalent to the following steps for this
`map`, then returning the current value or `null` if now
absent:

```java
if (map.get(key) == null) {
    V newValue = mappingFunction.apply(key);
    if (newValue != null)
        map.put(key, newValue);
}
```

The default implementation makes no guarantees about detecting if the
mapping function modifies this map during computation and, if
appropriate, reporting an error. Non-concurrent implementations should
override this method and, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
mapping function modifies this map during computation. Concurrent
implementations should override this method and, on a best-effort basis,
throw an `IllegalStateException` if it is detected that the
mapping function modifies this map during computation and as a result
computation would never complete.

The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties. In particular, all implementations of
subinterface `java.util.concurrent.ConcurrentMap` must document
whether the mapping function is applied once atomically only if the value
is not present.

**Returns:** the current (existing or computed) value associated with
        the specified key, or null if the computed value is null

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified key is null and this map does not support null keys, or the mappingFunction is null
- `UnsupportedOperationException`: if the `computeIfAbsent` operation is not supported by this map (optional)
- `ClassCastException`: if the class of the specified key or value prevents it from being stored in this map (optional)
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map (optional)

## Map.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
default V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

If the value for the specified key is present and non-null, attempts to
compute a new mapping given the key and its current mapped value
(optional operation).

If the remapping function returns `null`, the mapping is removed.
If the remapping function itself throws an (unchecked) exception, the
exception is rethrown, and the current mapping is left unchanged.

The remapping function should not modify this map during computation.

Parameters:

- `key`: key with which the specified value is to be associated
- `remappingFunction`: the remapping function to compute a value

**Implementation requirements:** The default implementation is equivalent to performing the following
steps for this `map`, then returning the current value or
`null` if now absent:

```java
if (map.get(key) != null) {
    V oldValue = map.get(key);
    V newValue = remappingFunction.apply(key, oldValue);
    if (newValue != null)
        map.put(key, newValue);
    else
        map.remove(key);
}
```

The default implementation makes no guarantees about detecting if the
remapping function modifies this map during computation and, if
appropriate, reporting an error. Non-concurrent implementations should
override this method and, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
remapping function modifies this map during computation. Concurrent
implementations should override this method and, on a best-effort basis,
throw an `IllegalStateException` if it is detected that the
remapping function modifies this map during computation and as a result
computation would never complete.

The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties. In particular, all implementations of
subinterface `java.util.concurrent.ConcurrentMap` must document
whether the remapping function is applied once atomically only if the
value is not present.

**Returns:** the new value associated with the specified key, or null if none

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified key is null and this map does not support null keys, or the remappingFunction is null
- `UnsupportedOperationException`: if the `computeIfPresent` operation is not supported by this map (optional)
- `ClassCastException`: if the class of the specified key or value prevents it from being stored in this map (optional)
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map (optional)

## Map.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
default V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

Attempts to compute a mapping for the specified key and its current
mapped value, or `null` if there is no current mapping (optional
operation). For example, to either create or append a `String`
msg to a value mapping:

```java
map.compute(key, (k, v) -> (v == null) ? msg : v.concat(msg))
```

(Method merge() is often simpler to use for such purposes.)

If the remapping function returns `null`, the mapping is removed
(or remains absent if initially absent).  If the remapping function
itself throws an (unchecked) exception, the exception is rethrown, and
the current mapping is left unchanged.

The remapping function should not modify this map during computation.

Parameters:

- `key`: key with which the specified value is to be associated
- `remappingFunction`: the remapping function to compute a value

**Implementation requirements:** The default implementation is equivalent to performing the following
steps for this `map`:

```java
V oldValue = map.get(key);
V newValue = remappingFunction.apply(key, oldValue);
if (newValue != null) {
    map.put(key, newValue);
} else if (oldValue != null || map.containsKey(key)) {
    map.remove(key);
}
return newValue;
```

The default implementation makes no guarantees about detecting if the
remapping function modifies this map during computation and, if
appropriate, reporting an error. Non-concurrent implementations should
override this method and, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
remapping function modifies this map during computation. Concurrent
implementations should override this method and, on a best-effort basis,
throw an `IllegalStateException` if it is detected that the
remapping function modifies this map during computation and as a result
computation would never complete.

The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties. In particular, all implementations of
subinterface `java.util.concurrent.ConcurrentMap` must document
whether the remapping function is applied once atomically only if the
value is not present.

**Returns:** the new value associated with the specified key, or null if none

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified key is null and this map does not support null keys, or the remappingFunction is null
- `UnsupportedOperationException`: if the `compute` operation is not supported by this map (optional)
- `ClassCastException`: if the class of the specified key or value prevents it from being stored in this map (optional)
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map (optional)
