---
title: "Collections class (java.util) (part 2 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Collections.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collections class (java.util) (part 2 of 6)

## Collections.rotate(List<?>, int)

```java
public static void rotate(List<?> list, int distance)
```

Rotates the elements in the specified list by the specified distance.
After calling this method, the element at index `i` will be
the element previously at index `(i - distance)` mod
`list.size()`, for all values of `i` between `0`
and `list.size()-1`, inclusive.  (This method has no effect on
the size of the list.)

For example, suppose `list` comprises`[t, a, n, k, s]`.
After invoking `Collections.rotate(list, 1)` (or
`Collections.rotate(list, -4)`), `list` will comprise
`[s, t, a, n, k]`.

Note that this method can usefully be applied to sublists to
move one or more elements within a list while preserving the
order of the remaining elements.  For example, the following idiom
moves the element at index `j` forward to position
`k` (which must be greater than or equal to `j`):

```java
    Collections.rotate(list.subList(j, k+1), -1);
```

To make this concrete, suppose `list` comprises
`[a, b, c, d, e]`.  To move the element at index `1`
(`b`) forward two positions, perform the following invocation:

```java
    Collections.rotate(l.subList(1, 4), -1);
```

The resulting list is `[a, c, d, b, e]`.

To move more than one element forward, increase the absolute value
of the rotation distance.  To move elements backward, use a positive
shift distance.

If the specified list is small or implements the `RandomAccess` interface, this implementation exchanges the first
element into the location it should go, and then repeatedly exchanges
the displaced element into the location it should go until a displaced
element is swapped into the first element.  If necessary, the process
is repeated on the second and successive elements, until the rotation
is complete.  If the specified list is large and doesn't implement the
`RandomAccess` interface, this implementation breaks the
list into two sublist views around index `-distance mod size`.
Then the `reverse(List)` method is invoked on each sublist view,
and finally it is invoked on the entire list.  For a more complete
description of both algorithms, see Section 2.3 of Jon Bentley's
*Programming Pearls* (Addison-Wesley, 1986).

Parameters:

- `list`: the list to be rotated.
- `distance`: the distance to rotate the list. There are no constraints on this value; it may be zero, negative, or greater than `list.size()`.

**Since:** 1.4

Throws:

- `UnsupportedOperationException`: if the specified list or its list-iterator does not support the `set` operation.

## Collections.replaceAll(List<T>, T, T)

```java
public static <T> boolean replaceAll(List<T> list, T oldVal, T newVal)
```

Replaces all occurrences of one specified value in a list with another.
More formally, replaces with `newVal` each element `e`
in `list` such that
`(oldVal==null ? e==null : oldVal.equals(e))`.
(This method has no effect on the size of the list.)

Parameters:

- `<T>`: the class of the objects in the list
- `list`: the list in which replacement is to occur.
- `oldVal`: the old value to be replaced.
- `newVal`: the new value with which `oldVal` is to be replaced.

**Returns:** `true` if `list` contained one or more elements
        `e` such that
        `(oldVal==null ? e==null : oldVal.equals(e))`.

**Since:** 1.4

Throws:

- `UnsupportedOperationException`: if the specified list or its list-iterator does not support the `set` operation.

## Collections.indexOfSubList(List<?>, List<?>)

```java
public static int indexOfSubList(List<?> source, List<?> target)
```

Returns the starting position of the first occurrence of the specified
target list within the specified source list, or -1 if there is no
such occurrence.  More formally, returns the lowest index `i`
such that `source.subList(i, i+target.size()).equals(target)`,
or -1 if there is no such index.  (Returns -1 if
`target.size() > source.size()`)

This implementation uses the "brute force" technique of scanning
over the source list, looking for a match with the target at each
location in turn.

Parameters:

- `source`: the list in which to search for the first occurrence of `target`.
- `target`: the list to search for as a subList of `source`.

**Returns:** the starting position of the first occurrence of the specified
        target list within the specified source list, or -1 if there
        is no such occurrence.

**Since:** 1.4

## Collections.lastIndexOfSubList(List<?>, List<?>)

```java
public static int lastIndexOfSubList(List<?> source, List<?> target)
```

Returns the starting position of the last occurrence of the specified
target list within the specified source list, or -1 if there is no such
occurrence.  More formally, returns the highest index `i`
such that `source.subList(i, i+target.size()).equals(target)`,
or -1 if there is no such index.  (Returns -1 if
`target.size() > source.size()`)

This implementation uses the "brute force" technique of iterating
over the source list, looking for a match with the target at each
location in turn.

Parameters:

- `source`: the list in which to search for the last occurrence of `target`.
- `target`: the list to search for as a subList of `source`.

**Returns:** the starting position of the last occurrence of the specified
        target list within the specified source list, or -1 if there
        is no such occurrence.

**Since:** 1.4

## Collections.unmodifiableCollection(Collection<? extends T>)

```java
public static <T> Collection<T> unmodifiableCollection(Collection<? extends T> c)
```

Returns an unmodifiable view of the
specified collection. Query operations on the returned collection "read through"
to the specified collection, and attempts to modify the returned
collection, whether direct or via its iterator, result in an
`UnsupportedOperationException`.

The returned collection does *not* pass the hashCode and equals
operations through to the backing collection, but relies on
`Object`'s `equals` and `hashCode` methods.  This
is necessary to preserve the contracts of these operations in the case
that the backing collection is a set or a list.

The returned collection will be serializable if the specified collection
is serializable.

Parameters:

- `<T>`: the class of the objects in the collection
- `c`: the collection for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified collection.

## Collections.unmodifiableSequencedCollection(SequencedCollection<? extends T>)

```java
public static <T> SequencedCollection<T> unmodifiableSequencedCollection(SequencedCollection<? extends T> c)
```

Returns an unmodifiable view of the
specified `SequencedCollection`. Query operations on the returned collection
"read through" to the specified collection, and attempts to modify the returned
collection, whether direct or via its iterator, result in an
`UnsupportedOperationException`.

The returned collection does *not* pass the `hashCode` and
`equals` operations through to the backing collection, but relies on
`Object`'s `equals` and `hashCode` methods.  This
is necessary to preserve the contracts of these operations in the case
that the backing collection is a set or a list.

The returned collection will be serializable if the specified collection
is serializable.

Parameters:

- `<T>`: the class of the objects in the collection
- `c`: the collection for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified collection.

**Since:** 21

## Collections.unmodifiableSet(Set<? extends T>)

```java
public static <T> Set<T> unmodifiableSet(Set<? extends T> s)
```

Returns an unmodifiable view of the
specified set. Query operations on the returned set "read through" to the specified
set, and attempts to modify the returned set, whether direct or via its
iterator, result in an `UnsupportedOperationException`.

The returned set will be serializable if the specified set
is serializable.

Parameters:

- `<T>`: the class of the objects in the set
- `s`: the set for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified set.

## Collections.unmodifiableSequencedSet(SequencedSet<? extends T>)

```java
public static <T> SequencedSet<T> unmodifiableSequencedSet(SequencedSet<? extends T> s)
```

Returns an unmodifiable view of the
specified `SequencedSet`. Query operations on the returned set
"read through" to the specified set, and attempts to modify the returned
set, whether direct or via its iterator, result in an
`UnsupportedOperationException`.

The returned set will be serializable if the specified set
is serializable.

Parameters:

- `<T>`: the class of the objects in the set
- `s`: the set for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified sequenced set.

**Since:** 21

## Collections.unmodifiableSortedSet(SortedSet<T>)

```java
public static <T> SortedSet<T> unmodifiableSortedSet(SortedSet<T> s)
```

Returns an unmodifiable view of the
specified sorted set. Query operations on the returned sorted set "read
through" to the specified sorted set.  Attempts to modify the returned
sorted set, whether direct, via its iterator, or via its
`subSet`, `headSet`, or `tailSet` views, result in
an `UnsupportedOperationException`.

The returned sorted set will be serializable if the specified sorted set
is serializable.

Parameters:

- `<T>`: the class of the objects in the set
- `s`: the sorted set for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified sorted set.

## Collections.unmodifiableNavigableSet(NavigableSet<T>)

```java
public static <T> NavigableSet<T> unmodifiableNavigableSet(NavigableSet<T> s)
```

Returns an unmodifiable view of the
specified navigable set. Query operations on the returned navigable set "read
through" to the specified navigable set.  Attempts to modify the returned
navigable set, whether direct, via its iterator, or via its
`subSet`, `headSet`, or `tailSet` views, result in
an `UnsupportedOperationException`.

The returned navigable set will be serializable if the specified
navigable set is serializable.

Parameters:

- `<T>`: the class of the objects in the set
- `s`: the navigable set for which an unmodifiable view is to be returned

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified navigable set

**Since:** 1.8

## Collections.unmodifiableList(List<? extends T>)

```java
public static <T> List<T> unmodifiableList(List<? extends T> list)
```

Returns an unmodifiable view of the
specified list. Query operations on the returned list "read through" to the
specified list, and attempts to modify the returned list, whether
direct or via its iterator, result in an
`UnsupportedOperationException`.

The returned list will be serializable if the specified list
is serializable. Similarly, the returned list will implement
`RandomAccess` if the specified list does.

Parameters:

- `<T>`: the class of the objects in the list
- `list`: the list for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified list.

## Collections.unmodifiableMap(Map<? extends K, ? extends V>)

```java
public static <K,V> Map<K,V> unmodifiableMap(Map<? extends K, ? extends V> m)
```

Returns an unmodifiable view of the
specified map. Query operations on the returned map "read through"
to the specified map, and attempts to modify the returned
map, whether direct or via its collection views, result in an
`UnsupportedOperationException`.

The returned map will be serializable if the specified map
is serializable.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the map for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified map.

## Collections.contains(Object)

```java
public boolean contains(Object o)
```

This method is overridden to protect the backing set against
an object with a nefarious equals function that senses
that the equality-candidate is Map.Entry and calls its
setValue method.

## Collections.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> coll)
```

The next two methods are overridden to protect against
an unscrupulous List whose contains(Object o) method senses
when o is a Map.Entry, and calls o.setValue.

## Collections.unmodifiableSequencedMap(SequencedMap<? extends K, ? extends V>)

```java
public static <K,V> SequencedMap<K,V> unmodifiableSequencedMap(SequencedMap<? extends K, ? extends V> m)
```

Returns an unmodifiable view of the
specified `SequencedMap`. Query operations on the returned map
"read through" to the specified map, and attempts to modify the returned
map, whether direct or via its collection views, result in an
`UnsupportedOperationException`.

The returned map will be serializable if the specified map
is serializable.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the map for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified map.

**Since:** 21

## Collections.unmodifiableSortedMap(SortedMap<K, ? extends V>)

```java
public static <K,V> SortedMap<K,V> unmodifiableSortedMap(SortedMap<K, ? extends V> m)
```

Returns an unmodifiable view of the
specified sorted map. Query operations on the returned sorted map "read through"
to the specified sorted map.  Attempts to modify the returned
sorted map, whether direct, via its collection views, or via its
`subMap`, `headMap`, or `tailMap` views, result in
an `UnsupportedOperationException`.

The returned sorted map will be serializable if the specified sorted map
is serializable.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the sorted map for which an unmodifiable view is to be returned.

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified sorted map.
