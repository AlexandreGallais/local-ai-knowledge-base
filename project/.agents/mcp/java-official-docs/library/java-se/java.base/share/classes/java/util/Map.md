---
title: "Map interface (java.util) (part 1 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Map.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Map interface (java.util)

```java
public interface Map<K, V>
```

An object that maps keys to values.  A map cannot contain duplicate keys;
each key can map to at most one value.

This interface takes the place of the `Dictionary` class, which
was a totally abstract class rather than an interface.

The `Map` interface provides three *collection views*, which
allow a map's contents to be viewed as a set of keys, collection of values,
or set of key-value mappings.  The *order* of a map is defined as
the order in which the iterators on the map's collection views return their
elements.  Some map implementations, like the `TreeMap` class, make
specific guarantees as to their encounter order; others, like the
`HashMap` class, do not. Maps with a defined
encounter order
are generally subtypes of the `SequencedMap` interface.

Note: great care must be exercised if mutable objects are used as map
keys.  The behavior of a map is not specified if the value of an object is
changed in a manner that affects `equals` comparisons while the
object is a key in the map.  A special case of this prohibition is that it
is not permissible for a map to contain itself as a key.  While it is
permissible for a map to contain itself as a value, extreme caution is
advised: the `equals` and `hashCode` methods are no longer
well defined on such a map.

All general-purpose map implementation classes should provide two
"standard" constructors: a void (no arguments) constructor which creates an
empty map, and a constructor with a single argument of type `Map`,
which creates a new map with the same key-value mappings as its argument.
In effect, the latter constructor allows the user to copy any map,
producing an equivalent map of the desired class.  There is no way to
enforce this recommendation (as interfaces cannot contain constructors) but
all of the general-purpose map implementations in the JDK comply.

The "destructive" methods contained in this interface, that is, the
methods that modify the map on which they operate, are specified to throw
`UnsupportedOperationException` if this map does not support the
operation.  If this is the case, these methods may, but are not required
to, throw an `UnsupportedOperationException` if the invocation would
have no effect on the map.  For example, invoking the `putAll(Map)`
method on an unmodifiable map may, but is not required to, throw the
exception if the map whose mappings are to be "superimposed" is empty.

Some map implementations have restrictions on the keys and values they
may contain.  For example, some implementations prohibit null keys and
values, and some have restrictions on the types of their keys.  Attempting
to insert an ineligible key or value throws an unchecked exception,
typically `NullPointerException` or `ClassCastException`.
Attempting to query the presence of an ineligible key or value may throw an
exception, or it may simply return false; some implementations will exhibit
the former behavior and some will exhibit the latter.  More generally,
attempting an operation on an ineligible key or value whose completion
would not result in the insertion of an ineligible element into the map may
throw an exception or it may succeed, at the option of the implementation.
Such exceptions are marked as "optional" in the specification for this
interface.

Many methods in Collections Framework interfaces are defined
in terms of the equals method.  For
example, the specification for the containsKey(Object key) method says: "returns `true` if and
only if this map contains a mapping for a key `k` such that
`(key==null ? k==null : key.equals(k))`." This specification should
*not* be construed to imply that invoking `Map.containsKey`
with a non-null argument `key` will cause `key.equals(k)` to
be invoked for any key `k`.  Implementations are free to
implement optimizations whereby the `equals` invocation is avoided,
for example, by first comparing the hash codes of the two keys.  (The
`Object.hashCode()` specification guarantees that two objects with
unequal hash codes cannot be equal.)  More generally, implementations of
the various Collections Framework interfaces are free to take advantage of
the specified behavior of underlying `Object` methods wherever the
implementor deems it appropriate.

Some map operations which perform recursive traversal of the map may fail
with an exception for self-referential instances where the map directly or
indirectly contains itself. This includes the `clone()`,
`equals()`, `hashCode()` and `toString()` methods.
Implementations may optionally handle the self-referential scenario, however
most current implementations do not do so.

#### Unmodifiable Maps

The Map.of,
Map.ofEntries, and
Map.copyOf
static factory methods provide a convenient way to create unmodifiable maps.
The `Map`
instances created by these methods have the following characteristics:

- They are *unmodifiable*. Keys and values
cannot be added, removed, or updated. Calling any mutator method on the Map
will always cause `UnsupportedOperationException` to be thrown.
However, if the contained keys or values are themselves mutable, this may cause the
Map to behave inconsistently or its contents to appear to change.

- They disallow `null` keys and values. Attempts to create them with
`null` keys or values result in `NullPointerException`.

- They are serializable if all keys and values are serializable.

- They reject duplicate keys at creation time. Duplicate keys
passed to a static factory method result in `IllegalArgumentException`.

- The iteration order of mappings is unspecified and is subject to change.

- They are value-based.
Programmers should treat instances that are equal
as interchangeable and should not use them for synchronization, or
unpredictable behavior may occur. For example, in a future release,
synchronization may fail. Callers should make no assumptions
about the identity of the returned instances. Factories are free to
create new instances or reuse existing ones.

- They are serialized as specified on the
Serialized Form
page.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**See also:** HashMap

**See also:** TreeMap

**See also:** Hashtable

**See also:** SortedMap

**See also:** Collection

**See also:** Set

**Since:** 1.2

## Map.size()

```java
int size()
```

Returns the number of key-value mappings in this map.  If the
map contains more than `Integer.MAX_VALUE` elements, returns
`Integer.MAX_VALUE`.

**Returns:** the number of key-value mappings in this map

## Map.isEmpty()

```java
boolean isEmpty()
```

Returns `true` if this map contains no key-value mappings.

**Returns:** `true` if this map contains no key-value mappings

## Map.containsKey(Object)

```java
boolean containsKey(Object key)
```

Returns `true` if this map contains a mapping for the specified
key.  More formally, returns `true` if and only if
this map contains a mapping for a key `k` such that
`Objects.equals(key, k)`.  (There can be
at most one such mapping.)

Parameters:

- `key`: key whose presence in this map is to be tested

**Returns:** `true` if this map contains a mapping for the specified
        key

Throws:

- `ClassCastException`: if the key is of an inappropriate type for this map (optional)
- `NullPointerException`: if the specified key is null and this map does not permit null keys (optional)

## Map.containsValue(Object)

```java
boolean containsValue(Object value)
```

Returns `true` if this map maps one or more keys to the
specified value.  More formally, returns `true` if and only if
this map contains at least one mapping to a value `v` such that
`Objects.equals(value, v)`.  This operation
will probably require time linear in the map size for most
implementations of the `Map` interface.

Parameters:

- `value`: value whose presence in this map is to be tested

**Returns:** `true` if this map maps one or more keys to the
        specified value

Throws:

- `ClassCastException`: if the value is of an inappropriate type for this map (optional)
- `NullPointerException`: if the specified value is null and this map does not permit null values (optional)

## Map.get(Object)

```java
V get(Object key)
```

Returns the value to which the specified key is mapped,
or `null` if this map contains no mapping for the key.

More formally, if this map contains a mapping from a key
`k` to a value `v` such that
`Objects.equals(key, k)`,
then this method returns `v`; otherwise
it returns `null`.  (There can be at most one such mapping.)

If this map permits null values, then a return value of
`null` does not *necessarily* indicate that the map
contains no mapping for the key; it's also possible that the map
explicitly maps the key to `null`.  The containsKey <example-value> may be used to distinguish these two cases.

Parameters:

- `key`: the key whose associated value is to be returned

**Returns:** the value to which the specified key is mapped, or
        `null` if this map contains no mapping for the key

Throws:

- `ClassCastException`: if the key is of an inappropriate type for this map (optional)
- `NullPointerException`: if the specified key is null and this map does not permit null keys (optional)

## Map.put(K, V)

```java
V put(K key, V value)
```

Associates the specified value with the specified key in this map
(optional operation).  If the map previously contained a mapping for
the key, the old value is replaced by the specified value.  (A map
`m` is said to contain a mapping for a key `k` if and only
if m.containsKey(k) would return
`true`.)

Parameters:

- `key`: key with which the specified value is to be associated
- `value`: value to be associated with the specified key

**Returns:** the previous value associated with `key`, or
        `null` if there was no mapping for `key`.
        (A `null` return can also indicate that the map
        previously associated `null` with `key`,
        if the implementation supports `null` values.)

Throws:

- `UnsupportedOperationException`: if the `put` operation is not supported by this map
- `ClassCastException`: if the class of the specified key or value prevents it from being stored in this map
- `NullPointerException`: if the specified key or value is null and this map does not permit null keys or values
- `IllegalArgumentException`: if some property of the specified key or value prevents it from being stored in this map

## Map.remove(Object)

```java
V remove(Object key)
```

Removes the mapping for a key from this map if it is present
(optional operation).   More formally, if this map contains a mapping
from key `k` to value `v` such that
`Objects.equals(key, k)`, that mapping
is removed.  (The map can contain at most one such mapping.)

Returns the value to which this map previously associated the key,
or `null` if the map contained no mapping for the key.

If this map permits null values, then a return value of
`null` does not *necessarily* indicate that the map
contained no mapping for the key; it's also possible that the map
explicitly mapped the key to `null`.

The map will not contain a mapping for the specified key once the
call returns.

Parameters:

- `key`: key whose mapping is to be removed from the map

**Returns:** the previous value associated with `key`, or
        `null` if there was no mapping for `key`.

Throws:

- `UnsupportedOperationException`: if the `remove` operation is not supported by this map
- `ClassCastException`: if the key is of an inappropriate type for this map (optional)
- `NullPointerException`: if the specified key is null and this map does not permit null keys (optional)

## Map.putAll(Map<? extends K, ? extends V>)

```java
void putAll(Map<? extends K, ? extends V> m)
```

Copies all of the mappings from the specified map to this map
(optional operation).  The effect of this call is equivalent to that
of calling put(k, v) on this map once
for each mapping from key `k` to value `v` in the
specified map.  The behavior of this operation is undefined if the specified map
is modified while the operation is in progress. If the specified map has a defined
encounter order,
processing of its mappings generally occurs in that order.

Parameters:

- `m`: mappings to be stored in this map

Throws:

- `UnsupportedOperationException`: if the `putAll` operation is not supported by this map
- `ClassCastException`: if the class of a key or value in the specified map prevents it from being stored in this map
- `NullPointerException`: if the specified map is null, or if this map does not permit null keys or values, and the specified map contains null keys or values
- `IllegalArgumentException`: if some property of a key or value in the specified map prevents it from being stored in this map

## Map.clear()

```java
void clear()
```

Removes all of the mappings from this map (optional operation).
The map will be empty after this call returns.

Throws:

- `UnsupportedOperationException`: if the `clear` operation is not supported by this map

## Map.keySet()

```java
Set<K> keySet()
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

## Map.values()

```java
Collection<V> values()
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

**Returns:** a collection view of the values contained in this map
