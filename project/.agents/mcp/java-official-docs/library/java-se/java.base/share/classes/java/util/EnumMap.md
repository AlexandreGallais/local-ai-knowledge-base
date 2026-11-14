---
title: "EnumMap class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/EnumMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EnumMap class (java.util)

```java
public class EnumMap<K extends Enum<K>, V> extends AbstractMap<K, V> implements java.io.Serializable, Cloneable
```

A specialized `Map` implementation for use with enum type keys.  All
of the keys in an enum map must come from a single enum type that is
specified, explicitly or implicitly, when the map is created.  Enum maps
are represented internally as arrays.  This representation is extremely
compact and efficient.

Enum maps are maintained in the *natural order* of their keys
(the order in which the enum constants are declared).  This is reflected
in the iterators returned by the collections views (`keySet()`,
`entrySet()`, and `values()`).

Iterators returned by the collection views are *weakly consistent*:
they will never throw `ConcurrentModificationException` and they may
or may not show the effects of any modifications to the map that occur while
the iteration is in progress.

Null keys are not permitted.  Attempts to insert a null key will
throw `NullPointerException`.  Attempts to test for the
presence of a null key or to remove one will, however, function properly.
Null values are permitted.

Like most collection implementations `EnumMap` is not
synchronized. If multiple threads access an enum map concurrently, and at
least one of the threads modifies the map, it should be synchronized
externally.  This is typically accomplished by synchronizing on some
object that naturally encapsulates the enum map.  If no such object exists,
the map should be "wrapped" using the `Collections.synchronizedMap`
method.  This is best done at creation time, to prevent accidental
unsynchronized access:

```java
    Map<EnumKey, V> m
        = Collections.synchronizedMap(new EnumMap<EnumKey, V>(...));
```

Implementation note: All basic <example-value> execute in constant time.
They are likely (though not guaranteed) to be faster than their
`HashMap` counterparts.

This class is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the enum type of keys maintained by this map
- `<V>`: the type of mapped values

**See also:** EnumSet

**Since:** 1.5

## EnumMap.EnumMap(Class<K>)

```java
public EnumMap(Class<K> keyType)
```

Creates an empty enum map with the specified key type.

Parameters:

- `keyType`: the class object of the key type for this enum map

Throws:

- `NullPointerException`: if `keyType` is null

## EnumMap.EnumMap(EnumMap<K, ? extends V>)

```java
public EnumMap(EnumMap<K, ? extends V> m)
```

Creates an enum map with the same key type as the specified enum
map, initially containing the same mappings (if any).

Parameters:

- `m`: the enum map from which to initialize this enum map

Throws:

- `NullPointerException`: if `m` is null

## EnumMap.EnumMap(Map<K, ? extends V>)

```java
public EnumMap(Map<K, ? extends V> m)
```

Creates an enum map initialized from the specified map.  If the
specified map is an `EnumMap` instance, this constructor behaves
identically to `EnumMap(EnumMap)`.  Otherwise, the specified map
must contain at least one mapping (in order to determine the new
enum map's key type).

Parameters:

- `m`: the map from which to initialize this enum map

Throws:

- `IllegalArgumentException`: if `m` is not an `EnumMap` instance and contains no mappings
- `NullPointerException`: if `m` is null

## EnumMap.size()

```java
public int size()
```

Returns the number of key-value mappings in this map.

**Returns:** the number of key-value mappings in this map

## EnumMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns `true` if this map maps one or more keys to the
specified value.

Parameters:

- `value`: the value whose presence in this map is to be tested

**Returns:** `true` if this map maps one or more keys to this value

## EnumMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Returns `true` if this map contains a mapping for the specified
key.

Parameters:

- `key`: the key whose presence in this map is to be tested

**Returns:** `true` if this map contains a mapping for the specified
           key

## EnumMap.get(Object)

```java
public V get(Object key)
```

Returns the value to which the specified key is mapped,
or `null` if this map contains no mapping for the key.

More formally, if this map contains a mapping from a key
`k` to a value `v` such that `(key == k)`,
then this method returns `v`; otherwise it returns
`null`.  (There can be at most one such mapping.)

A return value of `null` does not *necessarily*
indicate that the map contains no mapping for the key; it's also
possible that the map explicitly maps the key to `null`.
The containsKey <example-value> may be used to
distinguish these two cases.

## EnumMap.put(K, V)

```java
public V put(K key, V value)
```

Associates the specified value with the specified key in this map.
If the map previously contained a mapping for this key, the old
value is replaced.

Parameters:

- `key`: the key with which the specified value is to be associated
- `value`: the value to be associated with the specified key

**Returns:** the previous value associated with specified key, or
    `null` if there was no mapping for key.  (A `null`
    return can also indicate that the map previously associated
    `null` with the specified key.)

Throws:

- `NullPointerException`: if the specified key is null

## EnumMap.remove(Object)

```java
public V remove(Object key)
```

Removes the mapping for this key from this map if present.

Parameters:

- `key`: the key whose mapping is to be removed from the map

**Returns:** the previous value associated with specified key, or
    `null` if there was no entry for key.  (A `null`
    return can also indicate that the map previously associated
    `null` with the specified key.)

## EnumMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> m)
```

Copies all of the mappings from the specified map to this map.
These mappings will replace any mappings that this map had for
any of the keys currently in the specified map.

Parameters:

- `m`: the mappings to be stored in this map

Throws:

- `NullPointerException`: the specified map is null, or if one or more keys in the specified map are null

## EnumMap.clear()

```java
public void clear()
```

Removes all mappings from this map.

## EnumMap.keySet()

```java
public Set<K> keySet()
```

Returns a `Set` view of the keys contained in this map.
The returned set obeys the general contract outlined in
`Map.keySet()`.  The set's iterator will return the keys
in their natural order (the order in which the enum constants
are declared).

**Returns:** a set view of the keys contained in this enum map

## EnumMap.values()

```java
public Collection<V> values()
```

Returns a `Collection` view of the values contained in this map.
The returned collection obeys the general contract outlined in
`Map.values()`.  The collection's iterator will return the
values in the order their corresponding keys appear in map,
which is their natural order (the order in which the enum constants
are declared).

**Returns:** a collection view of the values contained in this map

## EnumMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a `Set` view of the mappings contained in this map.
The returned set obeys the general contract outlined in
`Map.keySet()`.  The set's iterator will return the
mappings in the order their keys appear in map, which is their
natural order (the order in which the enum constants are declared).

**Returns:** a set view of the mappings contained in this enum map

## EnumMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this map for equality.  Returns
`true` if the given object is also a map and the two maps
represent the same mappings, as specified in the `Map.equals(Object)` contract.

Parameters:

- `o`: the object to be compared for equality with this map

**Returns:** `true` if the specified object is equal to this map

## EnumMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this map.  The hash code of a map is
defined to be the sum of the hash codes of each entry in the map.

## EnumMap.clone()

```java
public EnumMap<K, V> clone()
```

Returns a shallow copy of this enum map. The values themselves
are not cloned.

**Returns:** a shallow copy of this enum map
