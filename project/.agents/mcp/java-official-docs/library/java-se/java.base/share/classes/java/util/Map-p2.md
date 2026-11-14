---
title: "Map interface (java.util) (part 2 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Map.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Map interface (java.util) (part 2 of 5)

## Map.entrySet()

```java
Set<Map.Entry<K, V>> entrySet()
```

Returns a `Set` view of the mappings contained in this map.
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

**Returns:** a set view of the mappings contained in this map

## Map.getKey()

```java
K getKey()
```

Returns the key <example-value> to this entry.

**Returns:** the key <example-value> to this entry

Throws:

- `IllegalStateException`: implementations may, but are not required to, throw this exception if the entry has been removed from the backing map.

## Map.getValue()

```java
V getValue()
```

Returns the value corresponding to this entry.  If the mapping
has been removed from the backing map (by the iterator's
`remove` operation), the results of this call are undefined.

**Returns:** the value corresponding to this entry

Throws:

- `IllegalStateException`: implementations may, but are not required to, throw this exception if the entry has been removed from the backing map.

## Map.setValue(V)

```java
V setValue(V value)
```

Replaces the value corresponding to this entry with the specified
value (optional operation).  (Writes through to the map.)  The
behavior of this call is undefined if the mapping has already been
removed from the map (by the iterator's `remove` operation).

Parameters:

- `value`: new value to be stored in this entry

**Returns:** old value corresponding to the entry

Throws:

- `UnsupportedOperationException`: if the `put` operation is not supported by the backing map
- `ClassCastException`: if the class of the specified value prevents it from being stored in the backing map
- `NullPointerException`: if the backing map does not permit null values, and the specified value is null
- `IllegalArgumentException`: if some property of this value prevents it from being stored in the backing map
- `IllegalStateException`: implementations may, but are not required to, throw this exception if the entry has been removed from the backing map.

## Map.equals(Object)

```java
boolean equals(Object o)
```

Compares the specified object with this entry for equality.
Returns `true` if the given object is also a map entry and
the two entries represent the same mapping.  More formally, two
entries `e1` and `e2` represent the same mapping
if

```java
    (e1.getKey()==null ?
     e2.getKey()==null : e1.getKey().equals(e2.getKey()))  &&
    (e1.getValue()==null ?
     e2.getValue()==null : e1.getValue().equals(e2.getValue()))
```

This ensures that the `equals` method works properly across
different implementations of the `Map.Entry` interface.

Parameters:

- `o`: object to be compared for equality with this map entry

**Returns:** `true` if the specified object is equal to this map
        entry

## Map.hashCode()

```java
int hashCode()
```

Returns the hash code value for this map entry.  The hash code
of a map entry `e` is defined to be:

```java
    (e.getKey()==null   ? 0 : e.getKey().hashCode()) ^
    (e.getValue()==null ? 0 : e.getValue().hashCode())
```

This ensures that `e1.equals(e2)` implies that
`e1.hashCode()==e2.hashCode()` for any two Entries
`e1` and `e2`, as required by the general
contract of `Object.hashCode`.

**Returns:** the hash code value for this map entry

**See also:** Object#hashCode()

**See also:** Object#equals(Object)

**See also:** #equals(Object)

## Map.comparingByKey()

```java
public static <K extends Comparable<? super K>, V> Comparator<Map.Entry<K, V>> comparingByKey()
```

Returns a comparator that compares `Map.Entry` in natural order on key.

The returned comparator is serializable and throws `NullPointerException` when comparing an entry with a null key.

Parameters:

- `<K>`: the `Comparable` type of then map keys
- `<V>`: the type of the map values

**Returns:** a comparator that compares `Map.Entry` in natural order on key.

**See also:** Comparable

**Since:** 1.8

## Map.comparingByValue()

```java
public static <K, V extends Comparable<? super V>> Comparator<Map.Entry<K, V>> comparingByValue()
```

Returns a comparator that compares `Map.Entry` in natural order on value.

The returned comparator is serializable and throws `NullPointerException` when comparing an entry with null values.

Parameters:

- `<K>`: the type of the map keys
- `<V>`: the `Comparable` type of the map values

**Returns:** a comparator that compares `Map.Entry` in natural order on value.

**See also:** Comparable

**Since:** 1.8

## Map.comparingByKey(Comparator<? super K>)

```java
public static <K, V> Comparator<Map.Entry<K, V>> comparingByKey(Comparator<? super K> cmp)
```

Returns a comparator that compares `Map.Entry` by key using the given
`Comparator`.

The returned comparator is serializable if the specified comparator
is also serializable.

Parameters:

- `<K>`: the type of the map keys
- `<V>`: the type of the map values
- `cmp`: the key `Comparator`

**Returns:** a comparator that compares `Map.Entry` by the key.

**Since:** 1.8

## Map.comparingByValue(Comparator<? super V>)

```java
public static <K, V> Comparator<Map.Entry<K, V>> comparingByValue(Comparator<? super V> cmp)
```

Returns a comparator that compares `Map.Entry` by value using the given
`Comparator`.

The returned comparator is serializable if the specified comparator
is also serializable.

Parameters:

- `<K>`: the type of the map keys
- `<V>`: the type of the map values
- `cmp`: the value `Comparator`

**Returns:** a comparator that compares `Map.Entry` by the value.

**Since:** 1.8

## Map.copyOf(Map.Entry<? extends K, ? extends V>)

```java
public static <K, V> Map.Entry<K, V> copyOf(Map.Entry<? extends K, ? extends V> e)
```

Returns a copy of the given `Map.Entry`. The returned instance is not
associated with any map. The returned instance has the same characteristics
as instances returned by the Map::entry method.

Parameters:

- `<K>`: the type of the key
- `<V>`: the type of the value
- `e`: the entry to be copied

**API note:** An instance obtained from a map's entry-set view has a connection to that map.
The `copyOf` method may be used to create a `Map.Entry` instance,
containing the same key and value, that is independent of any map.

**Implementation note:** If the given entry was obtained from a call to `copyOf` or `Map::entry`,
calling `copyOf` will generally not create another copy.

**Returns:** a map entry equal to the given entry

**Since:** 17

Throws:

- `NullPointerException`: if e is null or if either of its key or value is null

## Map.equals(Object)

```java
boolean equals(Object o)
```

Compares the specified object with this map for equality.  Returns
`true` if the given object is also a map and the two maps
represent the same mappings.  More formally, two maps `m1` and
`m2` represent the same mappings if
`m1.entrySet().equals(m2.entrySet())`.  This ensures that the
`equals` method works properly across different implementations
of the `Map` interface.

Parameters:

- `o`: object to be compared for equality with this map

**Returns:** `true` if the specified object is equal to this map

## Map.hashCode()

```java
int hashCode()
```

Returns the hash code value for this map.  The hash code of a map is
defined to be the sum of the hash codes of each entry in the map's
`entrySet()` view.  This ensures that `m1.equals(m2)`
implies that `m1.hashCode()==m2.hashCode()` for any two maps
`m1` and `m2`, as required by the general contract of
`Object.hashCode`.

**Returns:** the hash code value for this map

**See also:** Map.Entry#hashCode()

**See also:** Object#equals(Object)

**See also:** #equals(Object)

## Map.getOrDefault(Object, V)

```java
default V getOrDefault(Object key, V defaultValue)
```

Returns the value to which the specified key is mapped, or
`defaultValue` if this map contains no mapping for the key.

Parameters:

- `key`: the key whose associated value is to be returned
- `defaultValue`: the default mapping of the key

**Implementation requirements:** The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties.

**Returns:** the value to which the specified key is mapped, or
`defaultValue` if this map contains no mapping for the key

**Since:** 1.8

Throws:

- `ClassCastException`: if the key is of an inappropriate type for this map (optional)
- `NullPointerException`: if the specified key is null and this map does not permit null keys (optional)

## Map.forEach(BiConsumer<? super K, ? super V>)

```java
default void forEach(BiConsumer<? super K, ? super V> action)
```

Performs the given action for each entry in this map until all entries
have been processed or the action throws an exception.   Unless
otherwise specified by the implementing class, actions are performed in
the order of entry set iteration (if an iteration order is specified.)
Exceptions thrown by the action are relayed to the caller.

Parameters:

- `action`: The action to be performed for each entry

**Implementation requirements:** The default implementation is equivalent to, for this `map`:

```java
for (Map.Entry<K, V> entry : map.entrySet())
    action.accept(entry.getKey(), entry.getValue());
```

The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties.

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified action is null
- `ConcurrentModificationException`: if an entry is found to be removed during iteration

## Map.replaceAll(BiFunction<? super K, ? super V, ? extends V>)

```java
default void replaceAll(BiFunction<? super K, ? super V, ? extends V> function)
```

Replaces each entry's value with the result of invoking the given
function on that entry until all entries have been processed or the
function throws an exception (optional operation). Exceptions thrown
by the function are relayed to the caller.

Parameters:

- `function`: the function to apply to each entry

**Implementation requirements:** The default implementation is equivalent to, for this `map`:

```java
for (Map.Entry<K, V> entry : map.entrySet())
    entry.setValue(function.apply(entry.getKey(), entry.getValue()));
```

The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties.

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if the `replaceAll` operation is not supported by this map (optional)
- `ClassCastException`: if the class of a replacement value prevents it from being stored in this map (optional)
- `NullPointerException`: if the specified function is null, or if a replacement value is null and this map does not permit null values (optional)
- `IllegalArgumentException`: if some property of a replacement value prevents it from being stored in this map (optional)
- `ConcurrentModificationException`: if an entry is found to be removed during iteration

## Map.putIfAbsent(K, V)

```java
default V putIfAbsent(K key, V value)
```

If the specified key is not already associated with a value (or is mapped
to `null`) associates it with the given value and returns
`null`, else returns the current value (optional operation).

Parameters:

- `key`: key with which the specified value is to be associated
- `value`: value to be associated with the specified key

**Implementation requirements:** The default implementation is equivalent to, for this `map`:

```java
V v = map.get(key);
if (v == null)
    v = map.put(key, value);

return v;
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

- `UnsupportedOperationException`: if the `putIfAbsent` operation is not supported by this map (optional)
- `ClassCastException`: if the key or value is of an inappropriate type for this map (optional)
- `NullPointerException`: if the specified key or value is null, and this map does not permit null keys or values (optional)
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map (optional)

## Map.remove(Object, Object)

```java
default boolean remove(Object key, Object value)
```

Removes the entry for the specified key only if it is currently
mapped to the specified value (optional operation).

Parameters:

- `key`: key with which the specified value is associated
- `value`: value expected to be associated with the specified key

**Implementation requirements:** The default implementation is equivalent to, for this `map`:

```java
if (map.containsKey(key) && Objects.equals(map.get(key), value)) {
    map.remove(key);
    return true;
} else
    return false;
```

The default implementation makes no guarantees about synchronization
or atomicity properties of this method. Any implementation providing
atomicity guarantees must override this method and document its
concurrency properties.

**Returns:** `true` if the value was removed

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if the `remove` operation is not supported by this map (optional)
- `ClassCastException`: if the key or value is of an inappropriate type for this map (optional)
- `NullPointerException`: if the specified key or value is null, and this map does not permit null keys or values (optional)
