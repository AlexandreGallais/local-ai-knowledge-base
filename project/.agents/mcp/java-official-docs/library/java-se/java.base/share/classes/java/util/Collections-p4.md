---
title: "Collections class (java.util) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Collections.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collections class (java.util) (part 4 of 6)

## Collections.checkedCollection(Collection<E>, Class<E>)

```java
public static <E> Collection<E> checkedCollection(Collection<E> c, Class<E> type)
```

Returns a dynamically typesafe view of the specified collection.
Any attempt to insert an element of the wrong type will result in an
immediate `ClassCastException`.  Assuming a collection
contains no incorrectly typed elements prior to the time a
dynamically typesafe view is generated, and that all subsequent
access to the collection takes place through the view, it is
*guaranteed* that the collection cannot contain an incorrectly
typed element.

The generics mechanism in the language provides compile-time
(static) type checking, but it is possible to defeat this mechanism
with unchecked casts.  Usually this is not a problem, as the compiler
issues warnings on all such unchecked operations.  There are, however,
times when static type checking alone is not sufficient.  For example,
suppose a collection is passed to a third-party library and it is
imperative that the library code not corrupt the collection by
inserting an element of the wrong type.

Another use of dynamically typesafe views is debugging.  Suppose a
program fails with a `ClassCastException`, indicating that an
incorrectly typed element was put into a parameterized collection.
Unfortunately, the exception can occur at any time after the erroneous
element is inserted, so it typically provides little or no information
as to the real source of the problem.  If the problem is reproducible,
one can quickly determine its source by temporarily modifying the
program to wrap the collection with a dynamically typesafe view.
For example, this declaration:

```java
    Collection<String> c = new HashSet<>();
```

may be replaced temporarily by this one:

```java
    Collection<String> c = Collections.checkedCollection(
        new HashSet<>(), String.class);
```

Running the program again will cause it to fail at the point where
an incorrectly typed element is inserted into the collection, clearly
identifying the source of the problem.  Once the problem is fixed, the
modified declaration may be reverted back to the original.

The returned collection does *not* pass the hashCode and equals
operations through to the backing collection, but relies on
`Object`'s `equals` and `hashCode` methods.  This
is necessary to preserve the contracts of these operations in the case
that the backing collection is a set or a list.

The returned collection will be serializable if the specified
collection is serializable.

Since `null` is considered to be a value of any reference
type, the returned collection permits insertion of null elements
whenever the backing collection does.

Parameters:

- `<E>`: the class of the objects in the collection
- `c`: the collection for which a dynamically typesafe view is to be returned
- `type`: the type of element that `c` is permitted to hold

**Returns:** a dynamically typesafe view of the specified collection

**Since:** 1.5

## Collections.checkedQueue(Queue<E>, Class<E>)

```java
public static <E> Queue<E> checkedQueue(Queue<E> queue, Class<E> type)
```

Returns a dynamically typesafe view of the specified queue.
Any attempt to insert an element of the wrong type will result in
an immediate `ClassCastException`.  Assuming a queue contains
no incorrectly typed elements prior to the time a dynamically typesafe
view is generated, and that all subsequent access to the queue
takes place through the view, it is *guaranteed* that the
queue cannot contain an incorrectly typed element.

A discussion of the use of dynamically typesafe views may be
found in the documentation for the checkedCollection method.

The returned queue will be serializable if the specified queue
is serializable.

Since `null` is considered to be a value of any reference
type, the returned queue permits insertion of `null` elements
whenever the backing queue does.

Parameters:

- `<E>`: the class of the objects in the queue
- `queue`: the queue for which a dynamically typesafe view is to be returned
- `type`: the type of element that `queue` is permitted to hold

**Returns:** a dynamically typesafe view of the specified queue

**Since:** 1.8

## Collections.checkedSet(Set<E>, Class<E>)

```java
public static <E> Set<E> checkedSet(Set<E> s, Class<E> type)
```

Returns a dynamically typesafe view of the specified set.
Any attempt to insert an element of the wrong type will result in
an immediate `ClassCastException`.  Assuming a set contains
no incorrectly typed elements prior to the time a dynamically typesafe
view is generated, and that all subsequent access to the set
takes place through the view, it is *guaranteed* that the
set cannot contain an incorrectly typed element.

A discussion of the use of dynamically typesafe views may be
found in the documentation for the checkedCollection method.

The returned set will be serializable if the specified set is
serializable.

Since `null` is considered to be a value of any reference
type, the returned set permits insertion of null elements whenever
the backing set does.

Parameters:

- `<E>`: the class of the objects in the set
- `s`: the set for which a dynamically typesafe view is to be returned
- `type`: the type of element that `s` is permitted to hold

**Returns:** a dynamically typesafe view of the specified set

**Since:** 1.5

## Collections.checkedSortedSet(SortedSet<E>, Class<E>)

```java
public static <E> SortedSet<E> checkedSortedSet(SortedSet<E> s, Class<E> type)
```

Returns a dynamically typesafe view of the specified sorted set.
Any attempt to insert an element of the wrong type will result in an
immediate `ClassCastException`.  Assuming a sorted set
contains no incorrectly typed elements prior to the time a
dynamically typesafe view is generated, and that all subsequent
access to the sorted set takes place through the view, it is
*guaranteed* that the sorted set cannot contain an incorrectly
typed element.

A discussion of the use of dynamically typesafe views may be
found in the documentation for the checkedCollection method.

The returned sorted set will be serializable if the specified sorted
set is serializable.

Since `null` is considered to be a value of any reference
type, the returned sorted set permits insertion of null elements
whenever the backing sorted set does.

Parameters:

- `<E>`: the class of the objects in the set
- `s`: the sorted set for which a dynamically typesafe view is to be returned
- `type`: the type of element that `s` is permitted to hold

**Returns:** a dynamically typesafe view of the specified sorted set

**Since:** 1.5

## Collections.checkedNavigableSet(NavigableSet<E>, Class<E>)

```java
public static <E> NavigableSet<E> checkedNavigableSet(NavigableSet<E> s, Class<E> type)
```

Returns a dynamically typesafe view of the specified navigable set.
Any attempt to insert an element of the wrong type will result in an
immediate `ClassCastException`.  Assuming a navigable set
contains no incorrectly typed elements prior to the time a
dynamically typesafe view is generated, and that all subsequent
access to the navigable set takes place through the view, it is
*guaranteed* that the navigable set cannot contain an incorrectly
typed element.

A discussion of the use of dynamically typesafe views may be
found in the documentation for the checkedCollection method.

The returned navigable set will be serializable if the specified
navigable set is serializable.

Since `null` is considered to be a value of any reference
type, the returned navigable set permits insertion of null elements
whenever the backing sorted set does.

Parameters:

- `<E>`: the class of the objects in the set
- `s`: the navigable set for which a dynamically typesafe view is to be returned
- `type`: the type of element that `s` is permitted to hold

**Returns:** a dynamically typesafe view of the specified navigable set

**Since:** 1.8

## Collections.checkedList(List<E>, Class<E>)

```java
public static <E> List<E> checkedList(List<E> list, Class<E> type)
```

Returns a dynamically typesafe view of the specified list.
Any attempt to insert an element of the wrong type will result in
an immediate `ClassCastException`.  Assuming a list contains
no incorrectly typed elements prior to the time a dynamically typesafe
view is generated, and that all subsequent access to the list
takes place through the view, it is *guaranteed* that the
list cannot contain an incorrectly typed element.

A discussion of the use of dynamically typesafe views may be
found in the documentation for the checkedCollection method.

The returned list will be serializable if the specified list
is serializable.

Since `null` is considered to be a value of any reference
type, the returned list permits insertion of null elements whenever
the backing list does.

Parameters:

- `<E>`: the class of the objects in the list
- `list`: the list for which a dynamically typesafe view is to be returned
- `type`: the type of element that `list` is permitted to hold

**Returns:** a dynamically typesafe view of the specified list

**Since:** 1.5

## Collections.replaceAll(UnaryOperator<E>)

```java
public void replaceAll(UnaryOperator<E> operator)
```

(inherited documentation)

Throws:

- `ClassCastException`: if the class of an element returned by the operator prevents it from being added to this collection. The exception may be thrown after some elements of the list have already been replaced.

## Collections.checkedMap(Map<K, V>, Class<K>, Class<V>)

```java
public static <K, V> Map<K, V> checkedMap(Map<K, V> m, Class<K> keyType, Class<V> valueType)
```

Returns a dynamically typesafe view of the specified map.
Any attempt to insert a mapping whose key or value have the wrong
type will result in an immediate `ClassCastException`.
Similarly, any attempt to modify the value currently associated with
a key will result in an immediate `ClassCastException`,
whether the modification is attempted directly through the map
itself, or through a `Map.Entry` instance obtained from the
map's entry set view.

Assuming a map contains no incorrectly typed keys or values
prior to the time a dynamically typesafe view is generated, and
that all subsequent access to the map takes place through the view
(or one of its collection views), it is *guaranteed* that the
map cannot contain an incorrectly typed key or value.

A discussion of the use of dynamically typesafe views may be
found in the documentation for the checkedCollection method.

The returned map will be serializable if the specified map is
serializable.

Since `null` is considered to be a value of any reference
type, the returned map permits insertion of null keys or values
whenever the backing map does.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the map for which a dynamically typesafe view is to be returned
- `keyType`: the type of key that `m` is permitted to hold
- `valueType`: the type of value that `m` is permitted to hold

**Returns:** a dynamically typesafe view of the specified map

**Since:** 1.5

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
public boolean containsAll(Collection<?> c)
```

The bulk collection methods are overridden to protect
against an unscrupulous collection whose contains(Object o)
method senses when o is a Map.Entry, and calls o.setValue.

## Collections.checkedSortedMap(SortedMap<K, V>, Class<K>, Class<V>)

```java
public static <K,V> SortedMap<K,V> checkedSortedMap(SortedMap<K, V> m, Class<K> keyType, Class<V> valueType)
```

Returns a dynamically typesafe view of the specified sorted map.
Any attempt to insert a mapping whose key or value have the wrong
type will result in an immediate `ClassCastException`.
Similarly, any attempt to modify the value currently associated with
a key will result in an immediate `ClassCastException`,
whether the modification is attempted directly through the map
itself, or through a `Map.Entry` instance obtained from the
map's entry set view.

Assuming a map contains no incorrectly typed keys or values
prior to the time a dynamically typesafe view is generated, and
that all subsequent access to the map takes place through the view
(or one of its collection views), it is *guaranteed* that the
map cannot contain an incorrectly typed key or value.

A discussion of the use of dynamically typesafe views may be
found in the documentation for the checkedCollection method.

The returned map will be serializable if the specified map is
serializable.

Since `null` is considered to be a value of any reference
type, the returned map permits insertion of null keys or values
whenever the backing map does.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the map for which a dynamically typesafe view is to be returned
- `keyType`: the type of key that `m` is permitted to hold
- `valueType`: the type of value that `m` is permitted to hold

**Returns:** a dynamically typesafe view of the specified map

**Since:** 1.5

## Collections.checkedNavigableMap(NavigableMap<K, V>, Class<K>, Class<V>)

```java
public static <K,V> NavigableMap<K,V> checkedNavigableMap(NavigableMap<K, V> m, Class<K> keyType, Class<V> valueType)
```

Returns a dynamically typesafe view of the specified navigable map.
Any attempt to insert a mapping whose key or value have the wrong
type will result in an immediate `ClassCastException`.
Similarly, any attempt to modify the value currently associated with
a key will result in an immediate `ClassCastException`,
whether the modification is attempted directly through the map
itself, or through a `Map.Entry` instance obtained from the
map's entry set view.

Assuming a map contains no incorrectly typed keys or values
prior to the time a dynamically typesafe view is generated, and
that all subsequent access to the map takes place through the view
(or one of its collection views), it is *guaranteed* that the
map cannot contain an incorrectly typed key or value.

A discussion of the use of dynamically typesafe views may be
found in the documentation for the checkedCollection method.

The returned map will be serializable if the specified map is
serializable.

Since `null` is considered to be a value of any reference
type, the returned map permits insertion of null keys or values
whenever the backing map does.

Parameters:

- `<K>`: type of map keys
- `<V>`: type of map values
- `m`: the map for which a dynamically typesafe view is to be returned
- `keyType`: the type of key that `m` is permitted to hold
- `valueType`: the type of value that `m` is permitted to hold

**Returns:** a dynamically typesafe view of the specified map

**Since:** 1.8
