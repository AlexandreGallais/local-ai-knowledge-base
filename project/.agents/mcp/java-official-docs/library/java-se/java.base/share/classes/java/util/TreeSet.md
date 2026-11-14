---
title: "TreeSet class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/TreeSet.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TreeSet class (java.util)

```java
public class TreeSet<E> extends AbstractSet<E> implements NavigableSet<E>, Cloneable, java.io.Serializable
```

A `NavigableSet` implementation based on a `TreeMap`.
The elements are ordered using their natural ordering, or by a `Comparator` provided at set creation
time, depending on which constructor is used.

This implementation provides guaranteed log(n) time cost for the basic
operations (`add`, `remove` and `contains`).

Note that the ordering maintained by a set (whether or not an explicit
comparator is provided) must be *consistent with equals* if it is to
correctly implement the `Set` interface.  (See `Comparable`
or `Comparator` for a precise definition of *consistent with
equals*.)  This is so because the `Set` interface is defined in
terms of the `equals` operation, but a `TreeSet` instance
performs all element comparisons using its `compareTo` (or
`compare`) method, so two elements that are deemed equal by this method
are, from the standpoint of the set, equal.  The behavior of a set
*is* well-defined even if its ordering is inconsistent with equals; it
just fails to obey the general contract of the `Set` interface.

**Note that this implementation is not synchronized.**
If multiple threads access a tree set concurrently, and at least one
of the threads modifies the set, it *must* be synchronized
externally.  This is typically accomplished by synchronizing on some
object that naturally encapsulates the set.
If no such object exists, the set should be "wrapped" using the
Collections.synchronizedSortedSet
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the set:

```java
  SortedSet s = Collections.synchronizedSortedSet(new TreeSet(...));
```

The iterators returned by this class's `iterator` method are
*fail-fast*: if the set is modified at any time after the iterator is
created, in any way except through the iterator's own `remove`
method, the iterator will throw a `ConcurrentModificationException`.
Thus, in the face of concurrent modification, the iterator fails quickly
and cleanly, rather than risking arbitrary, non-deterministic behavior at
an undetermined time in the future.

Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw `ConcurrentModificationException` on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness:   *the fail-fast behavior of iterators
should be used only to detect bugs.*

The addFirst and addLast methods of this class
throw `UnsupportedOperationException`. The encounter order of elements is determined
by the comparison method; therefore, explicit positioning is not supported.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements maintained by this set

**See also:** Collection

**See also:** Set

**See also:** HashSet

**See also:** Comparable

**See also:** Comparator

**See also:** TreeMap

**Since:** 1.2

## TreeSet.TreeSet()

```java
public TreeSet()
```

Constructs a new, empty tree set, sorted according to the
natural ordering of its elements.  All elements inserted into
the set must implement the `Comparable` interface.
Furthermore, all such elements must be *mutually
comparable*: `e1.compareTo(e2)` must not throw a
`ClassCastException` for any elements `e1` and
`e2` in the set.  If the user attempts to add an element
to the set that violates this constraint (for example, the user
attempts to add a string element to a set whose elements are
integers), the `add` call will throw a
`ClassCastException`.

## TreeSet.TreeSet(Comparator<? super E>)

```java
public TreeSet(Comparator<? super E> comparator)
```

Constructs a new, empty tree set, sorted according to the specified
comparator.  All elements inserted into the set must be *mutually
comparable* by the specified comparator: `comparator.compare(e1, e2)` must not throw a `ClassCastException` for any elements
`e1` and `e2` in the set.  If the user attempts to add
an element to the set that violates this constraint, the
`add` call will throw a `ClassCastException`.

Parameters:

- `comparator`: the comparator that will be used to order this set. If `null`, the natural ordering of the elements will be used.

## TreeSet.TreeSet(Collection<? extends E>)

```java
public TreeSet(Collection<? extends E> c)
```

Constructs a new tree set containing the elements in the specified
collection, sorted according to the *natural ordering* of its
elements.  All elements inserted into the set must implement the
`Comparable` interface.  Furthermore, all such elements must be
*mutually comparable*: `e1.compareTo(e2)` must not throw a
`ClassCastException` for any elements `e1` and
`e2` in the set.

Parameters:

- `c`: collection whose elements will comprise the new set

Throws:

- `ClassCastException`: if the elements in `c` are not `Comparable`, or are not mutually comparable
- `NullPointerException`: if the specified collection is null

## TreeSet.TreeSet(SortedSet<E>)

```java
public TreeSet(SortedSet<E> s)
```

Constructs a new tree set containing the same elements and
using the same ordering as the specified sorted set.

Parameters:

- `s`: sorted set whose elements will comprise the new set

Throws:

- `NullPointerException`: if the specified sorted set is null

## TreeSet.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this set in ascending order.

**Returns:** an iterator over the elements in this set in ascending order

## TreeSet.descendingIterator()

```java
public Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this set in descending order.

**Returns:** an iterator over the elements in this set in descending order

**Since:** 1.6

## TreeSet.descendingSet()

```java
public NavigableSet<E> descendingSet()
```

**Since:** 1.6

## TreeSet.size()

```java
public int size()
```

Returns the number of elements in this set (its cardinality).

**Returns:** the number of elements in this set (its cardinality)

## TreeSet.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this set contains no elements.

**Returns:** `true` if this set contains no elements

## TreeSet.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this set contains the specified element.
More formally, returns `true` if and only if this set
contains an element `e` such that
`Objects.equals(o, e)`.

Parameters:

- `o`: object to be checked for containment in this set

**Returns:** `true` if this set contains the specified element

Throws:

- `ClassCastException`: if the specified object cannot be compared with the elements currently in the set
- `NullPointerException`: if the specified element is null and this set uses natural ordering, or its comparator does not permit null elements

## TreeSet.add(E)

```java
public boolean add(E e)
```

Adds the specified element to this set if it is not already present.
More formally, adds the specified element `e` to this set if
the set contains no element `e2` such that
`Objects.equals(e, e2)`.
If this set already contains the element, the call leaves the set
unchanged and returns `false`.

Parameters:

- `e`: element to be added to this set

**Returns:** `true` if this set did not already contain the specified
        element

Throws:

- `ClassCastException`: if the specified object cannot be compared with the elements currently in this set
- `NullPointerException`: if the specified element is null and this set uses natural ordering, or its comparator does not permit null elements

## TreeSet.remove(Object)

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

**Returns:** `true` if this set contained the specified element

Throws:

- `ClassCastException`: if the specified object cannot be compared with the elements currently in this set
- `NullPointerException`: if the specified element is null and this set uses natural ordering, or its comparator does not permit null elements

## TreeSet.clear()

```java
public void clear()
```

Removes all of the elements from this set.
The set will be empty after this call returns.

## TreeSet.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Adds all of the elements in the specified collection to this set.

Parameters:

- `c`: collection containing elements to be added to this set

**Returns:** `true` if this set changed as a result of the call

Throws:

- `ClassCastException`: if the elements provided cannot be compared with the elements currently in the set
- `NullPointerException`: if the specified collection is null or if any element is null and this set uses natural ordering, or its comparator does not permit null elements

## TreeSet.subSet(E, boolean, E, boolean)

```java
public NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromElement` or `toElement` is null and this set uses natural ordering, or its comparator does not permit null elements
- `IllegalArgumentException`: (inherited documentation)

## TreeSet.headSet(E, boolean)

```java
public NavigableSet<E> headSet(E toElement, boolean inclusive)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `toElement` is null and this set uses natural ordering, or its comparator does not permit null elements
- `IllegalArgumentException`: (inherited documentation)

## TreeSet.tailSet(E, boolean)

```java
public NavigableSet<E> tailSet(E fromElement, boolean inclusive)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromElement` is null and this set uses natural ordering, or its comparator does not permit null elements
- `IllegalArgumentException`: (inherited documentation)

## TreeSet.subSet(E, E)

```java
public SortedSet<E> subSet(E fromElement, E toElement)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromElement` or `toElement` is null and this set uses natural ordering, or its comparator does not permit null elements
- `IllegalArgumentException`: (inherited documentation)

## TreeSet.headSet(E)

```java
public SortedSet<E> headSet(E toElement)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `toElement` is null and this set uses natural ordering, or its comparator does not permit null elements
- `IllegalArgumentException`: (inherited documentation)

## TreeSet.tailSet(E)

```java
public SortedSet<E> tailSet(E fromElement)
```

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if `fromElement` is null and this set uses natural ordering, or its comparator does not permit null elements
- `IllegalArgumentException`: (inherited documentation)

## TreeSet.first()

```java
public E first()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## TreeSet.last()

```java
public E last()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## TreeSet.lower(E)

```java
public E lower(E e)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null and this set uses natural ordering, or its comparator does not permit null elements

## TreeSet.floor(E)

```java
public E floor(E e)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null and this set uses natural ordering, or its comparator does not permit null elements

## TreeSet.ceiling(E)

```java
public E ceiling(E e)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null and this set uses natural ordering, or its comparator does not permit null elements

## TreeSet.higher(E)

```java
public E higher(E e)
```

**Since:** 1.6

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null and this set uses natural ordering, or its comparator does not permit null elements

## TreeSet.pollFirst()

```java
public E pollFirst()
```

**Since:** 1.6

## TreeSet.pollLast()

```java
public E pollLast()
```

**Since:** 1.6

## TreeSet.addFirst(E)

```java
public void addFirst(E e)
```

Throws `UnsupportedOperationException`. The encounter order induced by this
set's comparison method determines the position of elements, so explicit positioning
is not supported.

**Since:** 21

Throws:

- `UnsupportedOperationException`: always

## TreeSet.addLast(E)

```java
public void addLast(E e)
```

Throws `UnsupportedOperationException`. The encounter order induced by this
set's comparison method determines the position of elements, so explicit positioning
is not supported.

**Since:** 21

Throws:

- `UnsupportedOperationException`: always

## TreeSet.clone()

```java
public Object clone()
```

Returns a shallow copy of this `TreeSet` instance. (The elements
themselves are not cloned.)

**Returns:** a shallow copy of this set

## TreeSet.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a *late-binding*
and *fail-fast* `Spliterator` over the elements in this
set.

The `Spliterator` reports `Spliterator.SIZED`,
`Spliterator.DISTINCT`, `Spliterator.SORTED`, and
`Spliterator.ORDERED`.  Overriding implementations should document
the reporting of additional characteristic values.

The spliterator's comparator (see
`java.util.Spliterator.getComparator()`) is `null` if
the tree set's comparator (see `comparator()`) is `null`.
Otherwise, the spliterator's comparator is the same as or imposes the
same total ordering as the tree set's comparator.

**Returns:** a `Spliterator` over the elements in this set

**Since:** 1.8
