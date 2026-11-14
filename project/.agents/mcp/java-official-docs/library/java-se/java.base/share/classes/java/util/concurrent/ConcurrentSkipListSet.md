---
title: "ConcurrentSkipListSet class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentSkipListSet.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentSkipListSet class (java.util.concurrent)

```java
public class ConcurrentSkipListSet<E> extends AbstractSet<E> implements NavigableSet<E>, Cloneable, java.io.Serializable
```

A scalable concurrent `NavigableSet` implementation based on
a `ConcurrentSkipListMap`.  The elements of the set are kept
sorted according to their natural ordering,
or by a `Comparator` provided at set creation time, depending
on which constructor is used.

This implementation provides expected average *log(n)* time
cost for the `contains`, `add`, and `remove`
operations and their variants.  Insertion, removal, and access
operations safely execute concurrently by multiple threads.

Iterators and spliterators are
*weakly consistent*.

Ascending ordered views and their iterators are faster than
descending ones.

Beware that, unlike in most collections, the `size`
method is *not* a constant-time operation. Because of the
asynchronous nature of these sets, determining the current number
of elements requires a traversal of the elements, and so may report
inaccurate results if this collection is modified during traversal.

Bulk operations that add, remove, or examine multiple elements,
such as `addAll`, `removeIf` or `forEach`,
are *not* guaranteed to be performed atomically.
For example, a `forEach` traversal concurrent with an `addAll` operation might observe only some of the added elements.

This class and its iterators implement all of the
*optional* methods of the `Set` and `Iterator`
interfaces. Like most other concurrent collection implementations,
this class does not permit the use of `null` elements,
because `null` arguments and return values cannot be reliably
distinguished from the absence of elements.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements maintained by this set

**Since:** 1.6

## ConcurrentSkipListSet.ConcurrentSkipListSet()

```java
public ConcurrentSkipListSet()
```

Constructs a new, empty set that orders its elements according to
their natural ordering.

## ConcurrentSkipListSet.ConcurrentSkipListSet(Comparator<? super E>)

```java
public ConcurrentSkipListSet(Comparator<? super E> comparator)
```

Constructs a new, empty set that orders its elements according to
the specified comparator.

Parameters:

- `comparator`: the comparator that will be used to order this set. If `null`, the natural ordering of the elements will be used.

## ConcurrentSkipListSet.ConcurrentSkipListSet(Collection<? extends E>)

```java
public ConcurrentSkipListSet(Collection<? extends E> c)
```

Constructs a new set containing the elements in the specified
collection, that orders its elements according to their
natural ordering.

Parameters:

- `c`: The elements that will comprise the new set

Throws:

- `ClassCastException`: if the elements in `c` are not `Comparable`, or are not mutually comparable
- `NullPointerException`: if the specified collection or any of its elements are null

## ConcurrentSkipListSet.ConcurrentSkipListSet(SortedSet<E>)

```java
public ConcurrentSkipListSet(SortedSet<E> s)
```

Constructs a new set containing the same elements and using the
same ordering as the specified sorted set.

Parameters:

- `s`: sorted set whose elements will comprise the new set

Throws:

- `NullPointerException`: if the specified sorted set or any of its elements are null

## ConcurrentSkipListSet.clone()

```java
public ConcurrentSkipListSet<E> clone()
```

Returns a shallow copy of this `ConcurrentSkipListSet`
instance. (The elements themselves are not cloned.)

**Returns:** a shallow copy of this set

## ConcurrentSkipListSet.size()

```java
public int size()
```

Returns the number of elements in this set.  If this set
contains more than `Integer.MAX_VALUE` elements, it
returns `Integer.MAX_VALUE`.

It is possible for the size to change during execution of this method,
in which case the returned result will be inaccurate.
Thus, this method is typically not very useful in concurrent applications.

**Returns:** the number of elements in this set

## ConcurrentSkipListSet.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this set contains no elements.

**Returns:** `true` if this set contains no elements

## ConcurrentSkipListSet.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this set contains the specified element.
More formally, returns `true` if and only if this set
contains an element `e` such that `o.equals(e)`.

Parameters:

- `o`: object to be checked for containment in this set

**Returns:** `true` if this set contains the specified element

Throws:

- `ClassCastException`: if the specified element cannot be compared with the elements currently in this set
- `NullPointerException`: if the specified element is null

## ConcurrentSkipListSet.add(E)

```java
public boolean add(E e)
```

Adds the specified element to this set if it is not already present.
More formally, adds the specified element `e` to this set if
the set contains no element `e2` such that `e.equals(e2)`.
If this set already contains the element, the call leaves the set
unchanged and returns `false`.

Parameters:

- `e`: element to be added to this set

**Returns:** `true` if this set did not already contain the
        specified element

Throws:

- `ClassCastException`: if `e` cannot be compared with the elements currently in this set
- `NullPointerException`: if the specified element is null

## ConcurrentSkipListSet.remove(Object)

```java
public boolean remove(Object o)
```

Removes the specified element from this set if it is present.
More formally, removes an element `e` such that
`o.equals(e)`, if this set contains such an element.
Returns `true` if this set contained the element (or
equivalently, if this set changed as a result of the call).
(This set will not contain the element once the call returns.)

Parameters:

- `o`: object to be removed from this set, if present

**Returns:** `true` if this set contained the specified element

Throws:

- `ClassCastException`: if `o` cannot be compared with the elements currently in this set
- `NullPointerException`: if the specified element is null

## ConcurrentSkipListSet.clear()

```java
public void clear()
```

Removes all of the elements from this set.

## ConcurrentSkipListSet.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this set in ascending order.

**Returns:** an iterator over the elements in this set in ascending order

## ConcurrentSkipListSet.descendingIterator()

```java
public Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this set in descending order.

**Returns:** an iterator over the elements in this set in descending order

## ConcurrentSkipListSet.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this set for equality.  Returns
`true` if the specified object is also a set, the two sets
have the same size, and every member of the specified set is
contained in this set (or equivalently, every member of this set is
contained in the specified set).  This definition ensures that the
equals method works properly across different implementations of the
set interface.

Parameters:

- `o`: the object to be compared for equality with this set

**Returns:** `true` if the specified object is equal to this set

## ConcurrentSkipListSet.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Removes from this set all of its elements that are contained in
the specified collection.  If the specified collection is also
a set, this operation effectively modifies this set so that its
value is the *asymmetric set difference* of the two sets.

Parameters:

- `c`: collection containing elements to be removed from this set

**Returns:** `true` if this set changed as a result of the call

Throws:

- `ClassCastException`: if the class of an element of this set is incompatible with the specified collection (optional)
- `NullPointerException`: if the specified collection or any of its elements are null

## ConcurrentSkipListSet.lower(E)

```java
public E lower(E e)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null

## ConcurrentSkipListSet.floor(E)

```java
public E floor(E e)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null

## ConcurrentSkipListSet.ceiling(E)

```java
public E ceiling(E e)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null

## ConcurrentSkipListSet.higher(E)

```java
public E higher(E e)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null

## ConcurrentSkipListSet.first()

```java
public E first()
```

Throws:

- `java.util.NoSuchElementException`: (inherited documentation)

## ConcurrentSkipListSet.last()

```java
public E last()
```

Throws:

- `java.util.NoSuchElementException`: (inherited documentation)

## ConcurrentSkipListSet.addFirst(E)

```java
public void addFirst(E e)
```

Throws `UnsupportedOperationException`. The encounter order induced by this
set's comparison method determines the position of elements, so explicit positioning
is not supported.

**Since:** 21

Throws:

- `UnsupportedOperationException`: always

## ConcurrentSkipListSet.addLast(E)

```java
public void addLast(E e)
```

Throws `UnsupportedOperationException`. The encounter order induced by this
set's comparison method determines the position of elements, so explicit positioning
is not supported.

**Since:** 21

Throws:

- `UnsupportedOperationException`: always

## ConcurrentSkipListSet.subSet(E, boolean, E, boolean)

```java
public NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromElement` or `toElement` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListSet.headSet(E, boolean)

```java
public NavigableSet<E> headSet(E toElement, boolean inclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `toElement` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListSet.tailSet(E, boolean)

```java
public NavigableSet<E> tailSet(E fromElement, boolean inclusive)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromElement` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListSet.subSet(E, E)

```java
public NavigableSet<E> subSet(E fromElement, E toElement)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromElement` or `toElement` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListSet.headSet(E)

```java
public NavigableSet<E> headSet(E toElement)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `toElement` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListSet.tailSet(E)

```java
public NavigableSet<E> tailSet(E fromElement)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromElement` is null
- `IllegalArgumentException`: (inherited documentation)

## ConcurrentSkipListSet.descendingSet()

```java
public NavigableSet<E> descendingSet()
```

Returns a reverse order view of the elements contained in this set.
The descending set is backed by this set, so changes to the set are
reflected in the descending set, and vice-versa.

The returned set has an ordering equivalent to
Collections.reverseOrder`(comparator())`.
The expression `s.descendingSet().descendingSet()` returns a
view of `s` essentially equivalent to `s`.

**Returns:** a reverse order view of this set

## ConcurrentSkipListSet.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a `Spliterator` over the elements in this set.

The `Spliterator` reports `Spliterator.CONCURRENT`,
`Spliterator.NONNULL`, `Spliterator.DISTINCT`,
`Spliterator.SORTED` and `Spliterator.ORDERED`, with an
encounter order that is ascending order.  Overriding implementations
should document the reporting of additional characteristic values.

The spliterator's comparator
is `null` if the set's comparator
is `null`.
Otherwise, the spliterator's comparator is the same as or imposes the
same total ordering as the set's comparator.

**Returns:** a `Spliterator` over the elements in this set

**Since:** 1.8
