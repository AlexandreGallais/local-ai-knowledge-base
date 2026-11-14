---
title: "Hashtable class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Hashtable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Hashtable class (java.util)

```java
public class Hashtable<K,V> extends Dictionary<K,V> implements Map<K,V>, Cloneable, java.io.Serializable
```

This class implements a hash table, which maps keys to values. Any
non-`null` object can be used as a key or as a value.

To successfully store and retrieve objects from a hashtable, the
objects used as keys must implement the `hashCode`
method and the `equals` method.

An instance of `Hashtable` has two parameters that affect its
performance: *initial capacity* and *load factor*.  The
*capacity* is the number of *buckets* in the hash table, and the
*initial capacity* is simply the capacity at the time the hash table
is created.  Note that the hash table is *open*: in the case of a "hash
collision", a single bucket stores multiple entries, which must be searched
sequentially.  The *load factor* is a measure of how full the hash
table is allowed to get before its capacity is automatically increased.
The initial capacity and load factor parameters are merely hints to
the implementation.  The exact details as to when and whether the rehash
method is invoked are implementation-dependent.

Generally, the default load factor (.75) offers a good tradeoff between
time and space costs.  Higher values decrease the space overhead but
increase the time cost to look up an entry (which is reflected in most
`Hashtable` operations, including `get` and `put`).

The initial capacity controls a tradeoff between wasted space and the
need for `rehash` operations, which are time-consuming.
No `rehash` operations will *ever* occur if the initial
capacity is greater than the maximum number of entries the
`Hashtable` will contain divided by its load factor.  However,
setting the initial capacity too high can waste space.

If many entries are to be made into a `Hashtable`,
creating it with a sufficiently large capacity may allow the
entries to be inserted more efficiently than letting it perform
automatic rehashing as needed to grow the table.

This example creates a hashtable of numbers. It uses the names of
the numbers as keys:

```java
  Hashtable<String, Integer> numbers
    = new Hashtable<String, Integer>();
  numbers.put("one", 1);
  numbers.put("two", 2);
  numbers.put("three", 3);
```

To retrieve a number, use the following code:

```java
  Integer n = numbers.get("two");
  if (n != null) {
    System.out.println("two = " + n);
  }
```

The iterators returned by the `iterator` method of the collections
returned by all of this class's "collection view methods" are
*fail-fast*: if the Hashtable is structurally modified at any time
after the iterator is created, in any way except through the iterator's own
`remove` method, the iterator will throw a `ConcurrentModificationException`.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than risking
arbitrary, non-deterministic behavior at an undetermined time in the future.
The Enumerations returned by Hashtable's keys and
elements methods are *not* fail-fast; if the
Hashtable is structurally modified at any time after the enumeration is
created then the results of enumerating are undefined.

Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw `ConcurrentModificationException` on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness: *the fail-fast behavior of iterators
should be used only to detect bugs.*

As of the Java 2 platform v1.2, this class was retrofitted to
implement the `Map` interface, making it a member of the

Java Collections Framework.  Unlike the new collection
implementations, `Hashtable` is synchronized.  If a
thread-safe implementation is not needed, it is recommended to use
`HashMap` in place of `Hashtable`.  If a thread-safe
highly-concurrent implementation is desired, then it is recommended
to use `java.util.concurrent.ConcurrentHashMap` in place of
`Hashtable`.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**See also:** Object#equals(java.lang.Object)

**See also:** Object#hashCode()

**See also:** Hashtable#rehash()

**See also:** Collection

**See also:** Map

**See also:** HashMap

**See also:** TreeMap

**Since:** 1.0

## Hashtable.Hashtable(int, float)

```java
public Hashtable(int initialCapacity, float loadFactor)
```

Constructs a new, empty hashtable with the specified initial
capacity and the specified load factor.

Parameters:

- `initialCapacity`: the initial capacity of the hashtable.
- `loadFactor`: the load factor of the hashtable.

Throws:

- `IllegalArgumentException`: if the initial capacity is less than zero, or if the load factor is nonpositive.

## Hashtable.Hashtable(int)

```java
public Hashtable(int initialCapacity)
```

Constructs a new, empty hashtable with the specified initial capacity
and default load factor (0.75).

Parameters:

- `initialCapacity`: the initial capacity of the hashtable.

Throws:

- `IllegalArgumentException`: if the initial capacity is less than zero.

## Hashtable.Hashtable()

```java
public Hashtable()
```

Constructs a new, empty hashtable with a default initial capacity (11)
and load factor (0.75).

## Hashtable.Hashtable(Map<? extends K, ? extends V>)

```java
public Hashtable(Map<? extends K, ? extends V> t)
```

Constructs a new hashtable with the same mappings as the given
Map.  The hashtable is created with an initial capacity sufficient to
hold the mappings in the given Map and a default load factor (0.75).

Parameters:

- `t`: the map whose mappings are to be placed in this map.

**Since:** 1.2

Throws:

- `NullPointerException`: if the specified map is null.

## Hashtable.size()

```java
public synchronized int size()
```

Returns the number of keys in this hashtable.

**Returns:** the number of keys in this hashtable.

## Hashtable.isEmpty()

```java
public synchronized boolean isEmpty()
```

Tests if this hashtable maps no keys to values.

**Returns:** `true` if this hashtable maps no keys to values;
         `false` otherwise.

## Hashtable.keys()

```java
public synchronized Enumeration<K> keys()
```

Returns an enumeration of the keys in this hashtable.
Use the Enumeration methods on the returned object to fetch the keys
sequentially. If the hashtable is structurally modified while enumerating
over the keys then the results of enumerating are undefined.

**Returns:** an enumeration of the keys in this hashtable.

**See also:** Enumeration

**See also:** #elements()

**See also:** #keySet()

**See also:** Map

## Hashtable.elements()

```java
public synchronized Enumeration<V> elements()
```

Returns an enumeration of the values in this hashtable.
Use the Enumeration methods on the returned object to fetch the elements
sequentially. If the hashtable is structurally modified while enumerating
over the values then the results of enumerating are undefined.

**Returns:** an enumeration of the values in this hashtable.

**See also:** java.util.Enumeration

**See also:** #keys()

**See also:** #values()

**See also:** Map

## Hashtable.contains(Object)

```java
public synchronized boolean contains(Object value)
```

Tests if some key maps into the specified value in this hashtable.
This operation is more expensive than the containsKey method.

Note that this method is identical in functionality to
containsValue, (which is part of the
`Map` interface in the collections framework).

Parameters:

- `value`: a value to search for

**Returns:** `true` if and only if some key maps to the
            `value` argument in this hashtable as
            determined by the `equals` method;
            `false` otherwise.

Throws:

- `NullPointerException`: if the value is `null`

## Hashtable.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns true if this hashtable maps one or more keys to this value.

Note that this method is identical in functionality to contains (which predates the `Map` interface).

Parameters:

- `value`: value whose presence in this hashtable is to be tested

**Returns:** `true` if this map maps one or more keys to the
        specified value

**Since:** 1.2

Throws:

- `NullPointerException`: if the value is `null`

## Hashtable.containsKey(Object)

```java
public synchronized boolean containsKey(Object key)
```

Tests if the specified object is a key in this hashtable.

Parameters:

- `key`: possible key

**Returns:** `true` if and only if the specified object
         is a key in this hashtable, as determined by the
         `equals` method; `false` otherwise.

**See also:** #contains(Object)

Throws:

- `NullPointerException`: if the key is `null`

## Hashtable.get(Object)

```java
public synchronized V get(Object key)
```

Returns the value to which the specified key is mapped,
or `null` if this map contains no mapping for the key.

More formally, if this map contains a mapping from a key
`k` to a value `v` such that `(key.equals(k))`,
then this method returns `v`; otherwise it returns
`null`.  (There can be at most one such mapping.)

Parameters:

- `key`: the key whose associated value is to be returned

**Returns:** the value to which the specified key is mapped, or
        `null` if this map contains no mapping for the key

**See also:** #put(Object, Object)

Throws:

- `NullPointerException`: if the specified key is null

## Hashtable.rehash()

```java
protected void rehash()
```

Increases the capacity of and internally reorganizes this
hashtable, in order to accommodate and access its entries more
efficiently.  This method is called automatically when the
number of keys in the hashtable exceeds this hashtable's capacity
and load factor.

## Hashtable.put(K, V)

```java
public synchronized V put(K key, V value)
```

Maps the specified `key` to the specified
`value` in this hashtable. Neither the key nor the
value can be `null`.

The value can be retrieved by calling the `get` method
with a key that is equal to the original key.

Parameters:

- `key`: the hashtable key
- `value`: the value

**Returns:** the previous value of the specified key in this hashtable,
            or `null` if it did not have one

**See also:** Object#equals(Object)

**See also:** #get(Object)

Throws:

- `NullPointerException`: if the key or value is `null`

## Hashtable.remove(Object)

```java
public synchronized V remove(Object key)
```

Removes the key (and its corresponding value) from this
hashtable. This method does nothing if the key is not in the hashtable.

Parameters:

- `key`: the key that needs to be removed

**Returns:** the value to which the key had been mapped in this hashtable,
         or `null` if the key did not have a mapping

Throws:

- `NullPointerException`: if the key is `null`

## Hashtable.putAll(Map<? extends K, ? extends V>)

```java
public synchronized void putAll(Map<? extends K, ? extends V> t)
```

Copies all of the mappings from the specified map to this hashtable.
These mappings will replace any mappings that this hashtable had for any
of the keys currently in the specified map.

Parameters:

- `t`: mappings to be stored in this map

**Since:** 1.2

Throws:

- `NullPointerException`: if the specified map is null

## Hashtable.clear()

```java
public synchronized void clear()
```

Clears this hashtable so that it contains no keys.

## Hashtable.clone()

```java
public synchronized Object clone()
```

Creates a shallow copy of this hashtable. All the structure of the
hashtable itself is copied, but the keys and values are not cloned.
This is a relatively expensive operation.

**Returns:** a clone of the hashtable

## Hashtable.toString()

```java
public synchronized String toString()
```

Returns a string representation of this `Hashtable` object
in the form of a set of entries, enclosed in braces and separated
by the ASCII characters "` , `" (comma and space). Each
entry is rendered as the key, an equals sign `=`, and the
associated element, where the `toString` method is used to
convert the key and element to strings.

**Returns:** a string representation of this hashtable

## Hashtable.keySet()

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

**Since:** 1.2

## Hashtable.entrySet()

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

**Since:** 1.2

## Hashtable.values()

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

**Since:** 1.2

## Hashtable.equals(Object)

```java
public synchronized boolean equals(Object o)
```

Compares the specified Object with this Map for equality,
as per the definition in the Map interface.

Parameters:

- `o`: object to be compared for equality with this hashtable

**Returns:** true if the specified Object is equal to this Map

**See also:** Map#equals(Object)

**Since:** 1.2

## Hashtable.hashCode()

```java
public synchronized int hashCode()
```

Returns the hash code value for this Map as per the definition in the
Map interface.

**See also:** Map#hashCode()

**Since:** 1.2
