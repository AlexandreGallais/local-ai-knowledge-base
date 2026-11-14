---
title: "IdentityHashMap class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/IdentityHashMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IdentityHashMap class (java.util) (part 2 of 2)

## IdentityHashMap.values()

```java
public Collection<V> values()
```

Returns a `Collection` view of the values contained in this map.
The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  If the map is
modified while an iteration over the collection is in progress,
the results of the iteration are undefined.  The collection
supports element removal, which removes the corresponding
mapping from the map, via the `Iterator.remove`,
`Collection.remove`, `removeAll`,
`retainAll` and `clear` methods.  It does not
support the `add` or `addAll` methods.

**While the object returned by this method implements the
`Collection` interface, it does *not* obey
`Collection's` general contract.  Like its backing map,
the collection returned by this method defines element equality as
reference-equality rather than object-equality.  This affects the
behavior of its `contains`, `remove` and
`containsAll` methods.**

## IdentityHashMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a `Set` view of the mappings contained in this map.
Each element in the returned set is a reference-equality-based
`Map.Entry`.  The set is backed by the map, so changes
to the map are reflected in the set, and vice-versa.  If the
map is modified while an iteration over the set is in progress,
the results of the iteration are undefined.  The set supports
element removal, which removes the corresponding mapping from
the map, via the `Iterator.remove`, `Set.remove`,
`removeAll`, `retainAll` and `clear`
methods.  It does not support the `add` or
`addAll` methods.

Like the backing map, the `Map.Entry` objects in the set
returned by this method define key and value equality as
reference-equality rather than object-equality.  This affects the
behavior of the `equals` and `hashCode` methods of these
`Map.Entry` objects.  A reference-equality based `Map.Entry e` is equal to an object `o` if and only if `o` is a
`Map.Entry` and `e.getKey()==o.getKey() && e.getValue()==o.getValue()`.  To accommodate these equals
semantics, the `hashCode` method returns
`System.identityHashCode(e.getKey()) ^ System.identityHashCode(e.getValue())`. (While the keys and values
are compared using reference equality, the `Map.Entry`
objects themselves are not.)

**Owing to the reference-equality-based semantics of the
`Map.Entry` instances in the set returned by this method,
it is possible that the symmetry and transitivity requirements of
the `Object.equals(Object)` contract may be violated if any of
the entries in the set is compared to a normal map entry, or if
the set returned by this method is compared to a set of normal map
entries (such as would be returned by a call to this method on a normal
map).  However, the `Object.equals` contract is guaranteed to
hold among identity-based map entries, and among sets of such entries.
**

**Returns:** a set view of the identity-mappings contained in this map

## IdentityHashMap.remove(Object, Object)

```java
public boolean remove(Object key, Object value)
```

(inherited documentation)

More formally, if this map contains a mapping from a key
`k` to a value `v` such that `(key == k)`
and `(value == v)`, then this method removes the mapping
for this key and returns `true`; otherwise it returns
`false`.

## IdentityHashMap.replace(K, V, V)

```java
public boolean replace(K key, V oldValue, V newValue)
```

(inherited documentation)

More formally, if this map contains a mapping from a key
`k` to a value `v` such that `(key == k)`
and `(oldValue == v)`, then this method associates
`k` with `newValue` and returns `true`;
otherwise it returns `false`.
