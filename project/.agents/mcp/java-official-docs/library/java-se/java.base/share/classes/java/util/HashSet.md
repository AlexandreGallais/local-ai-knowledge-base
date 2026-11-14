---
title: "HashSet class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/HashSet.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HashSet class (java.util)

```java
public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, java.io.Serializable
```

This class implements the `Set` interface, backed by a hash table
(actually a `HashMap` instance).  It makes no guarantees as to the
iteration order of the set; in particular, it does not guarantee that the
order will remain constant over time.  This class permits the `null`
element.

This class offers constant time performance for the basic <example-value>
(`add`, `remove`, `contains` and `size`),
assuming the hash function disperses the elements properly among the
buckets.  Iterating over this set requires time proportional to the sum of
the `HashSet` instance's size (the number of elements) plus the
"capacity" of the backing `HashMap` instance (the number of
buckets).  Thus, it's very important not to set the initial capacity too
high (or the load factor too low) if iteration performance is important.

**Note that this implementation is not synchronized.**
If multiple threads access a hash set concurrently, and at least one of
the threads modifies the set, it *must* be synchronized externally.
This is typically accomplished by synchronizing on some object that
naturally encapsulates the set.

If no such object exists, the set should be "wrapped" using the
Collections.synchronizedSet
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the set:

```java
  Set s = Collections.synchronizedSet(new HashSet(...));
```

The iterators returned by this class's `iterator` method are
*fail-fast*: if the set is modified at any time after the iterator is
created, in any way except through the iterator's own `remove`
method, the Iterator throws a `ConcurrentModificationException`.
Thus, in the face of concurrent modification, the iterator fails quickly
and cleanly, rather than risking arbitrary, non-deterministic behavior at
an undetermined time in the future.

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

- `<E>`: the type of elements maintained by this set

**See also:** Collection

**See also:** Set

**See also:** TreeSet

**See also:** HashMap

**Since:** 1.2

## HashSet.HashSet()

```java
public HashSet()
```

Constructs a new, empty set; the backing `HashMap` instance has
default initial capacity (16) and load factor (0.75).

## HashSet.HashSet(Collection<? extends E>)

```java
public HashSet(Collection<? extends E> c)
```

Constructs a new set containing the elements in the specified
collection.  The `HashMap` is created with default load factor
(0.75) and an initial capacity sufficient to contain the elements in
the specified collection.

Parameters:

- `c`: the collection whose elements are to be placed into this set

Throws:

- `NullPointerException`: if the specified collection is null

## HashSet.HashSet(int, float)

```java
public HashSet(int initialCapacity, float loadFactor)
```

Constructs a new, empty set; the backing `HashMap` instance has
the specified initial capacity and the specified load factor.

Parameters:

- `initialCapacity`: the initial capacity of the hash map
- `loadFactor`: the load factor of the hash map

**API note:** To create a `HashSet` with an initial capacity that accommodates
an expected number of elements, use newHashSet.

Throws:

- `IllegalArgumentException`: if the initial capacity is less than zero, or if the load factor is nonpositive

## HashSet.HashSet(int)

```java
public HashSet(int initialCapacity)
```

Constructs a new, empty set; the backing `HashMap` instance has
the specified initial capacity and default load factor (0.75).

Parameters:

- `initialCapacity`: the initial capacity of the hash table

**API note:** To create a `HashSet` with an initial capacity that accommodates
an expected number of elements, use newHashSet.

Throws:

- `IllegalArgumentException`: if the initial capacity is less than zero

## HashSet.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this set.  The elements
are returned in no particular order.

**Returns:** an Iterator over the elements in this set

**See also:** ConcurrentModificationException

## HashSet.size()

```java
public int size()
```

Returns the number of elements in this set (its cardinality).

**Returns:** the number of elements in this set (its cardinality)

## HashSet.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this set contains no elements.

**Returns:** `true` if this set contains no elements

## HashSet.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this set contains the specified element.
More formally, returns `true` if and only if this set
contains an element `e` such that
`Objects.equals(o, e)`.

Parameters:

- `o`: element whose presence in this set is to be tested

**Returns:** `true` if this set contains the specified element

## HashSet.add(E)

```java
public boolean add(E e)
```

Adds the specified element to this set if it is not already present.
More formally, adds the specified element `e` to this set if
this set contains no element `e2` such that
`Objects.equals(e, e2)`.
If this set already contains the element, the call leaves the set
unchanged and returns `false`.

Parameters:

- `e`: element to be added to this set

**Returns:** `true` if this set did not already contain the specified
element

## HashSet.remove(Object)

```java
public boolean remove(Object o)
```

Removes the specified element from this set if it is present.
More formally, removes an element `e` such that
`Objects.equals(o, e)`,
if this set contains such an element.  Returns `true` if
this set contained the element (or equivalently, if this set
changed as a result of the call).  (This set will not contain the
element once the call returns.)

Parameters:

- `o`: object to be removed from this set, if present

**Returns:** `true` if the set contained the specified element

## HashSet.clear()

```java
public void clear()
```

Removes all of the elements from this set.
The set will be empty after this call returns.

## HashSet.clone()

```java
public Object clone()
```

Returns a shallow copy of this `HashSet` instance: the elements
themselves are not cloned.

**Returns:** a shallow copy of this set

## HashSet.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a *late-binding*
and *fail-fast* `Spliterator` over the elements in this
set.

The `Spliterator` reports `Spliterator.SIZED` and
`Spliterator.DISTINCT`.  Overriding implementations should document
the reporting of additional characteristic values.

**Returns:** a `Spliterator` over the elements in this set

**Since:** 1.8

## HashSet.newHashSet(int)

```java
public static <T> HashSet<T> newHashSet(int numElements)
```

Creates a new, empty HashSet suitable for the expected number of elements.
The returned set uses the default load factor of 0.75, and its initial capacity is
generally large enough so that the expected number of elements can be added
without resizing the set.

Parameters:

- `numElements`: the expected number of elements
- `<T>`: the type of elements maintained by the new set

**Returns:** the newly created set

**Since:** 19

Throws:

- `IllegalArgumentException`: if numElements is negative
