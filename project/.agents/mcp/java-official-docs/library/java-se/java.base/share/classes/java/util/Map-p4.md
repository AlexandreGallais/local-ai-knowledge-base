---
title: "Map interface (java.util) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Map.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Map interface (java.util) (part 4 of 5)

## Map.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
default V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

If the specified key is not already associated with a value or is
associated with null, associates it with the given non-null value (optional
operation). Otherwise, replaces the associated value with the results of
the given remapping function, or removes if the result is `null`. This
method may be of use when combining multiple mapped values for a key.
For example, to either create or append a `String msg` to a
value mapping:

```java
map.merge(key, msg, String::concat)
```

If the remapping function returns `null`, the mapping is removed.
If the remapping function itself throws an (unchecked) exception, the
exception is rethrown, and the current mapping is left unchanged.

The remapping function should not modify this map during computation.

Parameters:

- `key`: key with which the resulting value is to be associated
- `value`: the non-null value to be merged with the existing value associated with the key or, if no existing value or a null value is associated with the key, to be associated with the key
- `remappingFunction`: the remapping function to recompute a value if present

**Implementation requirements:** The default implementation is equivalent to performing the following
steps for this `map`, then returning the current value or
`null` if absent:

```java
V oldValue = map.get(key);
V newValue = (oldValue == null) ? value :
             remappingFunction.apply(oldValue, value);
if (newValue == null)
    map.remove(key);
else
    map.put(key, newValue);
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

**Returns:** the new value associated with the specified key, or null if no
        value is associated with the key

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if the `merge` operation is not supported by this map (optional)
- `ClassCastException`: if the class of the specified key or value prevents it from being stored in this map (optional)
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map (optional)
- `NullPointerException`: if the specified key is null and this map does not support null keys or the value or remappingFunction is null

## Map.of()

```java
static <K, V> Map<K, V> of()
```

Returns an unmodifiable map containing zero mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type

**Returns:** an empty `Map`

**Since:** 9

## Map.of(K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1)
```

Returns an unmodifiable map containing a single mapping.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the mapping's key
- `v1`: the mapping's value

**Returns:** a `Map` containing the specified mapping

**Since:** 9

Throws:

- `NullPointerException`: if the key or the value is `null`

## Map.of(K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2)
```

Returns an unmodifiable map containing two mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if the keys are duplicates
- `NullPointerException`: if any key or value is `null`

## Map.of(K, V, K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3)
```

Returns an unmodifiable map containing three mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value
- `k3`: the third mapping's key
- `v3`: the third mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any key or value is `null`

## Map.of(K, V, K, V, K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4)
```

Returns an unmodifiable map containing four mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value
- `k3`: the third mapping's key
- `v3`: the third mapping's value
- `k4`: the fourth mapping's key
- `v4`: the fourth mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any key or value is `null`

## Map.of(K, V, K, V, K, V, K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5)
```

Returns an unmodifiable map containing five mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value
- `k3`: the third mapping's key
- `v3`: the third mapping's value
- `k4`: the fourth mapping's key
- `v4`: the fourth mapping's value
- `k5`: the fifth mapping's key
- `v5`: the fifth mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any key or value is `null`

## Map.of(K, V, K, V, K, V, K, V, K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5, K k6, V v6)
```

Returns an unmodifiable map containing six mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value
- `k3`: the third mapping's key
- `v3`: the third mapping's value
- `k4`: the fourth mapping's key
- `v4`: the fourth mapping's value
- `k5`: the fifth mapping's key
- `v5`: the fifth mapping's value
- `k6`: the sixth mapping's key
- `v6`: the sixth mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any key or value is `null`

## Map.of(K, V, K, V, K, V, K, V, K, V, K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5, K k6, V v6, K k7, V v7)
```

Returns an unmodifiable map containing seven mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value
- `k3`: the third mapping's key
- `v3`: the third mapping's value
- `k4`: the fourth mapping's key
- `v4`: the fourth mapping's value
- `k5`: the fifth mapping's key
- `v5`: the fifth mapping's value
- `k6`: the sixth mapping's key
- `v6`: the sixth mapping's value
- `k7`: the seventh mapping's key
- `v7`: the seventh mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any key or value is `null`

## Map.of(K, V, K, V, K, V, K, V, K, V, K, V, K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5, K k6, V v6, K k7, V v7, K k8, V v8)
```

Returns an unmodifiable map containing eight mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value
- `k3`: the third mapping's key
- `v3`: the third mapping's value
- `k4`: the fourth mapping's key
- `v4`: the fourth mapping's value
- `k5`: the fifth mapping's key
- `v5`: the fifth mapping's value
- `k6`: the sixth mapping's key
- `v6`: the sixth mapping's value
- `k7`: the seventh mapping's key
- `v7`: the seventh mapping's value
- `k8`: the eighth mapping's key
- `v8`: the eighth mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any key or value is `null`

## Map.of(K, V, K, V, K, V, K, V, K, V, K, V, K, V, K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5, K k6, V v6, K k7, V v7, K k8, V v8, K k9, V v9)
```

Returns an unmodifiable map containing nine mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value
- `k3`: the third mapping's key
- `v3`: the third mapping's value
- `k4`: the fourth mapping's key
- `v4`: the fourth mapping's value
- `k5`: the fifth mapping's key
- `v5`: the fifth mapping's value
- `k6`: the sixth mapping's key
- `v6`: the sixth mapping's value
- `k7`: the seventh mapping's key
- `v7`: the seventh mapping's value
- `k8`: the eighth mapping's key
- `v8`: the eighth mapping's value
- `k9`: the ninth mapping's key
- `v9`: the ninth mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any key or value is `null`

## Map.of(K, V, K, V, K, V, K, V, K, V, K, V, K, V, K, V, K, V, K, V)

```java
static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5, K k6, V v6, K k7, V v7, K k8, V v8, K k9, V v9, K k10, V v10)
```

Returns an unmodifiable map containing ten mappings.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `k1`: the first mapping's key
- `v1`: the first mapping's value
- `k2`: the second mapping's key
- `v2`: the second mapping's value
- `k3`: the third mapping's key
- `v3`: the third mapping's value
- `k4`: the fourth mapping's key
- `v4`: the fourth mapping's value
- `k5`: the fifth mapping's key
- `v5`: the fifth mapping's value
- `k6`: the sixth mapping's key
- `v6`: the sixth mapping's value
- `k7`: the seventh mapping's key
- `v7`: the seventh mapping's value
- `k8`: the eighth mapping's key
- `v8`: the eighth mapping's value
- `k9`: the ninth mapping's key
- `v9`: the ninth mapping's value
- `k10`: the tenth mapping's key
- `v10`: the tenth mapping's value

**Returns:** a `Map` containing the specified mappings

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any key or value is `null`

## Map.ofEntries(Entry<? extends K, ? extends V>...)

```java
static <K, V> Map<K, V> ofEntries(Entry<? extends K, ? extends V>... entries)
```

Returns an unmodifiable map containing keys and values extracted from the given entries.
The entries themselves are not stored in the map.
See Unmodifiable Maps for details.

Parameters:

- `<K>`: the `Map`'s key type
- `<V>`: the `Map`'s value type
- `entries`: `Map.Entry`s containing the keys and values from which the map is populated

**API note:** It is convenient to create the map entries using the Map.entry() method.
For example,

```java
    import static java.util.Map.entry;

    Map<Integer,String> map = Map.ofEntries(
        entry(1, "a"),
        entry(2, "b"),
        entry(3, "c"),
        ...
        entry(26, "z"));
```

**Returns:** a `Map` containing the specified mappings

**See also:** Map#entry Map.entry()

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate keys
- `NullPointerException`: if any entry, key, or value is `null`, or if the `entries` array is `null`

## Map.entry(K, V)

```java
static <K, V> Entry<K, V> entry(K k, V v)
```

Returns an unmodifiable `Entry` containing the given key and value.
These entries are suitable for populating `Map` instances using the
Map.ofEntries() method.
The `Entry` instances created by this method have the following characteristics:

- They disallow `null` keys and values. Attempts to create them using a `null`
key or value result in `NullPointerException`.

- They are unmodifiable. Calls to Entry.setValue()
on a returned `Entry` result in `UnsupportedOperationException`.

- They are not serializable.

- They are value-based.
Programmers should treat instances that are equal
as interchangeable and should not use them for synchronization, or
unpredictable behavior may occur. For example, in a future release,
synchronization may fail. Callers should make no assumptions
about the identity of the returned instances. This method is free to
create new instances or reuse existing ones.

Parameters:

- `<K>`: the key's type
- `<V>`: the value's type
- `k`: the key
- `v`: the value

**API note:** For a serializable `Entry`, see `AbstractMap.SimpleEntry` or
`AbstractMap.SimpleImmutableEntry`.

**Returns:** an `Entry` containing the specified key and value

**See also:** Map#ofEntries Map.ofEntries()

**Since:** 9

Throws:

- `NullPointerException`: if the key or value is `null`
