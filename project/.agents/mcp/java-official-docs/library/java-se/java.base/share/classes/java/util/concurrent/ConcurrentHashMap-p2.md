---
title: "ConcurrentHashMap class (java.util.concurrent) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentHashMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentHashMap class (java.util.concurrent) (part 2 of 4)

## ConcurrentHashMap.keySet()

```java
public KeySetView<K,V> keySet()
```

Returns a `Set` view of the keys contained in this map.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa. The set supports element
removal, which removes the corresponding mapping from this map,
via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear`
operations.  It does not support the `add` or
`addAll` operations.

The view's iterators and spliterators are
*weakly consistent*.

The view's `spliterator` reports `Spliterator.CONCURRENT`,
`Spliterator.DISTINCT`, and `Spliterator.NONNULL`.

**Returns:** the set view

## ConcurrentHashMap.values()

```java
public Collection<V> values()
```

Returns a `Collection` view of the values contained in this map.
The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  The collection
supports element removal, which removes the corresponding
mapping from this map, via the `Iterator.remove`,
`Collection.remove`, `removeAll`,
`retainAll`, and `clear` operations.  It does not
support the `add` or `addAll` operations.

The view's iterators and spliterators are
*weakly consistent*.

The view's `spliterator` reports `Spliterator.CONCURRENT`
and `Spliterator.NONNULL`.

**Returns:** the collection view

## ConcurrentHashMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a `Set` view of the mappings contained in this map.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  The set supports element
removal, which removes the corresponding mapping from the map,
via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll`, and `clear`
operations.

The view's iterators and spliterators are
*weakly consistent*.

The view's `spliterator` reports `Spliterator.CONCURRENT`,
`Spliterator.DISTINCT`, and `Spliterator.NONNULL`.

**Returns:** the set view

## ConcurrentHashMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this `Map`, i.e.,
the sum of, for each key-value pair in the map,
`key.hashCode() ^ value.hashCode()`.

**Returns:** the hash code value for this map

## ConcurrentHashMap.toString()

```java
public String toString()
```

Returns a string representation of this map.  The string
representation consists of a list of key-value mappings (in no
particular order) enclosed in braces ("`{}`").  Adjacent
mappings are separated by the characters `", "` (comma
and space).  Each key-value mapping is rendered as the key
followed by an equals sign ("`=`") followed by the
associated value.

**Returns:** a string representation of this map

## ConcurrentHashMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this map for equality.
Returns `true` if the given object is a map with the same
mappings as this map.  This operation may return misleading
results if either map is concurrently modified during execution
of this method.

Parameters:

- `o`: object to be compared for equality with this map

**Returns:** `true` if the specified object is equal to this map

## ConcurrentHashMap.putIfAbsent(K, V)

```java
public V putIfAbsent(K key, V value)
```

(inherited documentation)

**Returns:** the previous value associated with the specified key,
        or `null` if there was no mapping for the key

Throws:

- `NullPointerException`: if the specified key or value is null

## ConcurrentHashMap.remove(Object, Object)

```java
public boolean remove(Object key, Object value)
```

(inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `NullPointerException`: if the specified key is null

## ConcurrentHashMap.replace(K, V, V)

```java
public boolean replace(K key, V oldValue, V newValue)
```

(inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `NullPointerException`: if any of the arguments are null

## ConcurrentHashMap.replace(K, V)

```java
public V replace(K key, V value)
```

(inherited documentation)

**Returns:** the previous value associated with the specified key,
        or `null` if there was no mapping for the key

Throws:

- `NullPointerException`: if the specified key or value is null

## ConcurrentHashMap.getOrDefault(Object, V)

```java
public V getOrDefault(Object key, V defaultValue)
```

Returns the value to which the specified key is mapped, or the
given default value if this map contains no mapping for the
key.

Parameters:

- `key`: the key whose associated value is to be returned
- `defaultValue`: the value to return if this map contains no mapping for the given key

**Returns:** the mapping for the key, if present; else the default value

Throws:

- `NullPointerException`: if the specified key is null

## ConcurrentHashMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

If the specified key is not already associated with a value,
attempts to compute its value using the given mapping function
and enters it into this map unless `null`.  The entire
method invocation is performed atomically.  The supplied
function is invoked exactly once per invocation of this method
if the key is absent, else not at all.  Some attempted update
operations on this map by other threads may be blocked while
computation is in progress, so the computation should be short
and simple.

The mapping function must not modify this map during computation.

Parameters:

- `key`: key with which the specified value is to be associated
- `mappingFunction`: the function to compute a value

**Returns:** the current (existing or computed) value associated with
        the specified key, or null if the computed value is null

Throws:

- `NullPointerException`: if the specified key or mappingFunction is null
- `IllegalStateException`: if the computation detectably attempts a recursive update to this map that would otherwise never complete
- `RuntimeException`: or Error if the mappingFunction does so, in which case the mapping is left unestablished

## ConcurrentHashMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

If the value for the specified key is present, attempts to
compute a new mapping given the key and its current mapped
value.  The entire method invocation is performed atomically.
The supplied function is invoked exactly once per invocation of
this method if the key is present, else not at all.  Some
attempted update operations on this map by other threads may be
blocked while computation is in progress, so the computation
should be short and simple.

The remapping function must not modify this map during computation.

Parameters:

- `key`: key with which a value may be associated
- `remappingFunction`: the function to compute a value

**Returns:** the new value associated with the specified key, or null if none

Throws:

- `NullPointerException`: if the specified key or remappingFunction is null
- `IllegalStateException`: if the computation detectably attempts a recursive update to this map that would otherwise never complete
- `RuntimeException`: or Error if the remappingFunction does so, in which case the mapping is unchanged

## ConcurrentHashMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

Attempts to compute a mapping for the specified key and its
current mapped value (or `null` if there is no current
mapping). The entire method invocation is performed atomically.
The supplied function is invoked exactly once per invocation of
this method.  Some attempted update operations on this map by
other threads may be blocked while computation is in progress,
so the computation should be short and simple.

The remapping function must not modify this map during computation.

Parameters:

- `key`: key with which the specified value is to be associated
- `remappingFunction`: the function to compute a value

**Returns:** the new value associated with the specified key, or null if none

Throws:

- `NullPointerException`: if the specified key or remappingFunction is null
- `IllegalStateException`: if the computation detectably attempts a recursive update to this map that would otherwise never complete
- `RuntimeException`: or Error if the remappingFunction does so, in which case the mapping is unchanged

## ConcurrentHashMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

If the specified key is not already associated with a
(non-null) value, associates it with the given value.
Otherwise, replaces the value with the results of the given
remapping function, or removes if `null`. The entire
method invocation is performed atomically.  Some attempted
update operations on this map by other threads may be blocked
while computation is in progress, so the computation should be
short and simple, and must not attempt to update any other
mappings of this Map.

Parameters:

- `key`: key with which the specified value is to be associated
- `value`: the value to use if absent
- `remappingFunction`: the function to recompute a value if present

**Returns:** the new value associated with the specified key, or null if none

Throws:

- `NullPointerException`: if the specified key or the remappingFunction is null
- `RuntimeException`: or Error if the remappingFunction does so, in which case the mapping is unchanged

## ConcurrentHashMap.contains(Object)

```java
public boolean contains(Object value)
```

Tests if some key maps into the specified value in this table.

Note that this method is identical in functionality to
`containsValue(Object)`, and exists solely to ensure
full compatibility with class `java.util.Hashtable`,
which supported this method prior to introduction of the
Java Collections Framework.

Parameters:

- `value`: a value to search for

**Returns:** `true` if and only if some key maps to the
        `value` argument in this table as
        determined by the `equals` method;
        `false` otherwise

Throws:

- `NullPointerException`: if the specified value is null

## ConcurrentHashMap.keys()

```java
public Enumeration<K> keys()
```

Returns an enumeration of the keys in this table.

**Returns:** an enumeration of the keys in this table

**See also:** #keySet()

## ConcurrentHashMap.elements()

```java
public Enumeration<V> elements()
```

Returns an enumeration of the values in this table.

**Returns:** an enumeration of the values in this table

**See also:** #values()

## ConcurrentHashMap.mappingCount()

```java
public long mappingCount()
```

Returns the number of mappings. This method should be used
instead of `size` because a ConcurrentHashMap may
contain more mappings than can be represented as an int. The
value returned is an estimate; the actual count may differ if
there are concurrent insertions or removals.

**Returns:** the number of mappings

**Since:** 1.8

## ConcurrentHashMap.newKeySet()

```java
public static <K> KeySetView<K,Boolean> newKeySet()
```

Creates a new `Set` backed by a ConcurrentHashMap
from the given type to `Boolean.TRUE`.

Parameters:

- `<K>`: the element type of the returned set

**Returns:** the new set

**Since:** 1.8

## ConcurrentHashMap.newKeySet(int)

```java
public static <K> KeySetView<K,Boolean> newKeySet(int initialCapacity)
```

Creates a new `Set` backed by a ConcurrentHashMap
from the given type to `Boolean.TRUE`.

Parameters:

- `initialCapacity`: The implementation performs internal sizing to accommodate this many elements.
- `<K>`: the element type of the returned set

**Returns:** the new set

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if the initial capacity of elements is negative

## ConcurrentHashMap.keySet(V)

```java
public KeySetView<K,V> keySet(V mappedValue)
```

Returns a `Set` view of the keys in this map, using the
given common mapped value for any additions (i.e., `Collection.add` and `Collection.addAll(Collection)`).
This is of course only appropriate if it is acceptable to use
the same value for all additions from this view.

Parameters:

- `mappedValue`: the mapped value to use for any additions

**Returns:** the set view

Throws:

- `NullPointerException`: if the mappedValue is null

## ConcurrentHashMap.setValue(V)

```java
public V setValue(V value)
```

Sets our entry's value and writes through to the map. The
value to return is somewhat arbitrary here. Since we do not
necessarily track asynchronous changes, the most recent
"previous" value could be different from what we return (or
could even have been removed, in which case the put will
re-establish). We do not and cannot guarantee more.

## ConcurrentHashMap.forEach(long, BiConsumer<? super K,? super V>)

```java
public void forEach(long parallelismThreshold, BiConsumer<? super K,? super V> action)
```

Performs the given action for each (key, value).

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `action`: the action

**Since:** 1.8

## ConcurrentHashMap.forEach(long, BiFunction<? super K, ? super V, ? extends U>, Consumer<? super U>)

```java
public <U> void forEach(long parallelismThreshold, BiFunction<? super K, ? super V, ? extends U> transformer, Consumer<? super U> action)
```

Performs the given action for each non-null transformation
of each (key, value).

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element, or null if there is no transformation (in which case the action is not applied)
- `action`: the action
- ``: the return type of the transformer

**Since:** 1.8

## ConcurrentHashMap.search(long, BiFunction<? super K, ? super V, ? extends U>)

```java
public <U> U search(long parallelismThreshold, BiFunction<? super K, ? super V, ? extends U> searchFunction)
```

Returns a non-null result from applying the given search
function on each (key, value), or null if none.  Upon
success, further element processing is suppressed and the
results of any other parallel invocations of the search
function are ignored.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `searchFunction`: a function returning a non-null result on success, else null
- ``: the return type of the search function

**Returns:** a non-null result from applying the given search
function on each (key, value), or null if none

**Since:** 1.8
