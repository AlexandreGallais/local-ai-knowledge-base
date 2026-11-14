---
title: "HashMap class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/HashMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HashMap class (java.util)

```java
public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable
```

Hash table based implementation of the `Map` interface.  This
implementation provides all of the optional map operations, and permits
`null` values and the `null` key.  (The `HashMap`
class is roughly equivalent to `Hashtable`, except that it is
unsynchronized and permits nulls.)  This class makes no guarantees as to
the order of the map; in particular, it does not guarantee that the order
will remain constant over time.

This implementation provides constant-time performance for the basic
operations (`get` and `put`), assuming the hash function
disperses the elements properly among the buckets.  Iteration over
collection views requires time proportional to the "capacity" of the
`HashMap` instance (the number of buckets) plus its size (the number
of key-value mappings).  Thus, it's very important not to set the initial
capacity too high (or the load factor too low) if iteration performance is
important.

An instance of `HashMap` has two parameters that affect its
performance: *initial capacity* and *load factor*.  The
*capacity* is the number of buckets in the hash table, and the initial
capacity is simply the capacity at the time the hash table is created.  The
*load factor* is a measure of how full the hash table is allowed to
get before its capacity is automatically increased.  When the number of
entries in the hash table exceeds the product of the load factor and the
current capacity, the hash table is *rehashed* (that is, internal data
structures are rebuilt) so that the hash table has approximately twice the
number of buckets.

As a general rule, the default load factor (.75) offers a good
tradeoff between time and space costs.  Higher values decrease the
space overhead but increase the lookup cost (reflected in most of
the operations of the `HashMap` class, including
`get` and `put`).  The expected number of entries in
the map and its load factor should be taken into account when
setting its initial capacity, so as to minimize the number of
rehash operations.  If the initial capacity is greater than the
maximum number of entries divided by the load factor, no rehash
operations will ever occur.

If many mappings are to be stored in a `HashMap`
instance, creating it with a sufficiently large capacity will allow
the mappings to be stored more efficiently than letting it perform
automatic rehashing as needed to grow the table.  Note that using
many keys with the same `hashCode()` is a sure way to slow
down performance of any hash table. To ameliorate impact, when keys
are `Comparable`, this class may use comparison order among
keys to help break ties.

**Note that this implementation is not synchronized.**
If multiple threads access a hash map concurrently, and at least one of
the threads modifies the map structurally, it *must* be
synchronized externally.  (A structural modification is any operation
that adds or deletes one or more mappings; merely changing the value
associated with a key that an instance already contains is not a
structural modification.)  This is typically accomplished by
synchronizing on some object that naturally encapsulates the map.

If no such object exists, the map should be "wrapped" using the
Collections.synchronizedMap
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the map:

```java
  Map m = Collections.synchronizedMap(new HashMap(...));
```

The iterators returned by all of this class's "collection view methods"
are *fail-fast*: if the map is structurally modified at any time after
the iterator is created, in any way except through the iterator's own
`remove` method, the iterator will throw a
`ConcurrentModificationException`.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than risking
arbitrary, non-deterministic behavior at an undetermined time in the
future.

Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw `ConcurrentModificationException` on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness: *the fail-fast behavior of iterators
should be used only to detect bugs.*

This class is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**See also:** Object#hashCode()

**See also:** Collection

**See also:** Map

**See also:** TreeMap

**See also:** Hashtable

**Since:** 1.2

## HashMap.HashMap(int, float)

```java
public HashMap(int initialCapacity, float loadFactor)
```

Constructs an empty `HashMap` with the specified initial
capacity and load factor.

Parameters:

- `initialCapacity`: the initial capacity
- `loadFactor`: the load factor

**API note:** To create a `HashMap` with an initial capacity that accommodates
an expected number of mappings, use newHashMap.

Throws:

- `IllegalArgumentException`: if the initial capacity is negative or the load factor is nonpositive

## HashMap.HashMap(int)

```java
public HashMap(int initialCapacity)
```

Constructs an empty `HashMap` with the specified initial
capacity and the default load factor (0.75).

Parameters:

- `initialCapacity`: the initial capacity.

**API note:** To create a `HashMap` with an initial capacity that accommodates
an expected number of mappings, use newHashMap.

Throws:

- `IllegalArgumentException`: if the initial capacity is negative.

## HashMap.HashMap()

```java
public HashMap()
```

Constructs an empty `HashMap` with the default initial capacity
(16) and the default load factor (0.75).

## HashMap.HashMap(Map<? extends K, ? extends V>)

```java
public HashMap(Map<? extends K, ? extends V> m)
```

Constructs a new `HashMap` with the same mappings as the
specified `Map`.  The `HashMap` is created with
default load factor (0.75) and an initial capacity sufficient to
hold the mappings in the specified `Map`.

Parameters:

- `m`: the map whose mappings are to be placed in this map

Throws:

- `NullPointerException`: if the specified map is null

## HashMap.size()

```java
public int size()
```

Returns the number of key-value mappings in this map.

**Returns:** the number of key-value mappings in this map

## HashMap.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this map contains no key-value mappings.

**Returns:** `true` if this map contains no key-value mappings

## HashMap.get(Object)

```java
public V get(Object key)
```

Returns the value to which the specified key is mapped,
or `null` if this map contains no mapping for the key.

More formally, if this map contains a mapping from a key
`k` to a value `v` such that `(key==null ? k==null : key.equals(k))`, then this method returns `v`; otherwise
it returns `null`.  (There can be at most one such mapping.)

A return value of `null` does not *necessarily*
indicate that the map contains no mapping for the key; it's also
possible that the map explicitly maps the key to `null`.
The containsKey <example-value> may be used to
distinguish these two cases.

**See also:** #put(Object, Object)

## HashMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Returns `true` if this map contains a mapping for the
specified key.

Parameters:

- `key`: The key whose presence in this map is to be tested

**Returns:** `true` if this map contains a mapping for the specified
key.

## HashMap.put(K, V)

```java
public V put(K key, V value)
```

Associates the specified value with the specified key in this map.
If the map previously contained a mapping for the key, the old
value is replaced.

Parameters:

- `key`: key with which the specified value is to be associated
- `value`: value to be associated with the specified key

**Returns:** the previous value associated with `key`, or
        `null` if there was no mapping for `key`.
        (A `null` return can also indicate that the map
        previously associated `null` with `key`.)

## HashMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> m)
```

Copies all of the mappings from the specified map to this map.
These mappings will replace any mappings that this map had for
any of the keys currently in the specified map.

Parameters:

- `m`: mappings to be stored in this map

Throws:

- `NullPointerException`: if the specified map is null

## HashMap.remove(Object)

```java
public V remove(Object key)
```

Removes the mapping for the specified key from this map if present.

Parameters:

- `key`: key whose mapping is to be removed from the map

**Returns:** the previous value associated with `key`, or
        `null` if there was no mapping for `key`.
        (A `null` return can also indicate that the map
        previously associated `null` with `key`.)

## HashMap.clear()

```java
public void clear()
```

Removes all of the mappings from this map.
The map will be empty after this call returns.

## HashMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns `true` if this map maps one or more keys to the
specified value.

Parameters:

- `value`: value whose presence in this map is to be tested

**Returns:** `true` if this map maps one or more keys to the
        specified value

## HashMap.keySet()

```java
public Set<K> keySet()
```

Returns a `Set` view of the keys contained in this map.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  If the map is modified
while an iteration over the set is in progress (except through
the iterator's own `remove` operation), the results of
the iteration are undefined.  The set supports element removal,
which removes the corresponding mapping from the map, via the
`Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear`
operations.  It does not support the `add` or `addAll`
operations.

**Returns:** a set view of the keys contained in this map

## HashMap.values()

```java
public Collection<V> values()
```

Returns a `Collection` view of the values contained in this map.
The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  If the map is
modified while an iteration over the collection is in progress
(except through the iterator's own `remove` operation),
the results of the iteration are undefined.  The collection
supports element removal, which removes the corresponding
mapping from the map, via the `Iterator.remove`,
`Collection.remove`, `removeAll`,
`retainAll` and `clear` operations.  It does not
support the `add` or `addAll` operations.

**Returns:** a view of the values contained in this map

## HashMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
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

## HashMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
mapping function modifies this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the mapping function modified this map

## HashMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
remapping function modifies this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## HashMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
remapping function modifies this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## HashMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

(inherited documentation)

This method will, on a best-effort basis, throw a
`ConcurrentModificationException` if it is detected that the
remapping function modifies this map during computation.

Throws:

- `ConcurrentModificationException`: if it is detected that the remapping function modified this map

## HashMap.clone()

```java
public Object clone()
```

Returns a shallow copy of this `HashMap` instance: the keys and
values themselves are not cloned.

**Returns:** a shallow copy of this map

## HashMap.newHashMap(int)

```java
public static <K, V> HashMap<K, V> newHashMap(int numMappings)
```

Creates a new, empty HashMap suitable for the expected number of mappings.
The returned map uses the default load factor of 0.75, and its initial capacity is
generally large enough so that the expected number of mappings can be added
without resizing the map.

Parameters:

- `numMappings`: the expected number of mappings
- `<K>`: the type of keys maintained by the new map
- `<V>`: the type of mapped values

**Returns:** the newly created map

**Since:** 19

Throws:

- `IllegalArgumentException`: if numMappings is negative
