---
title: "LinkedHashSet class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/LinkedHashSet.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LinkedHashSet class (java.util)

```java
public class LinkedHashSet<E> extends HashSet<E> implements SequencedSet<E>, Cloneable, java.io.Serializable
```

Hash table and linked list implementation of the `Set` interface,
with well-defined encounter order.  This implementation differs from
`HashSet` in that it maintains a doubly-linked list running through
all of its entries.  This linked list defines the encounter order (iteration
order), which is the order in which elements were inserted into the set
(*insertion-order*). The least recently inserted element (the eldest) is
first, and the youngest element is last. Note that encounter order is *not* affected
if an element is *re-inserted* into the set with the `add` method.
(An element `e` is reinserted into a set `s` if `s.add(e)` is
invoked when `s.contains(e)` would return `true` immediately prior to
the invocation.) The reverse-ordered view of this set is in the opposite order, with
the youngest element appearing first and the eldest element appearing last. The encounter
order of elements already in the set can be changed by using the
addFirst and addLast methods.

This implementation spares its clients from the unspecified, generally
chaotic ordering provided by `HashSet`, without incurring the
increased cost associated with `TreeSet`.  It can be used to
produce a copy of a set that has the same order as the original, regardless
of the original set's implementation:

```java
    void foo(Set<String> s) {
        Set<String> copy = new LinkedHashSet<>(s);
        ...
    }
```

This technique is particularly useful if a module takes a set on input,
copies it, and later returns results whose order is determined by that of
the copy.  (Clients generally appreciate having things returned in the same
order they were presented.)

This class provides all of the optional `Set` and `SequencedSet`
operations, and it permits null elements. Like `HashSet`, it provides constant-time
performance for the basic <example-value> (`add`, `contains` and
`remove`), assuming the hash function disperses elements
properly among the buckets.  Performance is likely to be just slightly
below that of `HashSet`, due to the added expense of maintaining the
linked list, with one exception: Iteration over a `LinkedHashSet`
requires time proportional to the *size* of the set, regardless of
its capacity.  Iteration over a `HashSet` is likely to be more
expensive, requiring time proportional to its *capacity*.

A linked hash set has two parameters that affect its performance:
*initial capacity* and *load factor*.  They are defined precisely
as for `HashSet`.  Note, however, that the penalty for choosing an
excessively high value for initial capacity is less severe for this class
than for `HashSet`, as iteration times for this class are unaffected
by capacity.

**Note that this implementation is not synchronized.**
If multiple threads access a linked hash set concurrently, and at least
one of the threads modifies the set, it *must* be synchronized
externally.  This is typically accomplished by synchronizing on some
object that naturally encapsulates the set.

If no such object exists, the set should be "wrapped" using the
Collections.synchronizedSet
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the set:

```java
  Set s = Collections.synchronizedSet(new LinkedHashSet(...));
```

The iterators returned by this class's `iterator` method are
*fail-fast*: if the set is modified at any time after the iterator
is created, in any way except through the iterator's own `remove`
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

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements maintained by this set

**See also:** Object#hashCode()

**See also:** Collection

**See also:** Set

**See also:** HashSet

**See also:** TreeSet

**See also:** Hashtable

**Since:** 1.4

## LinkedHashSet.LinkedHashSet(int, float)

```java
public LinkedHashSet(int initialCapacity, float loadFactor)
```

Constructs a new, empty linked hash set with the specified initial
capacity and load factor.

Parameters:

- `initialCapacity`: the initial capacity of the linked hash set
- `loadFactor`: the load factor of the linked hash set

**API note:** To create a `LinkedHashSet` with an initial capacity that accommodates
an expected number of elements, use newLinkedHashSet.

Throws:

- `IllegalArgumentException`: if the initial capacity is less than zero, or if the load factor is nonpositive

## LinkedHashSet.LinkedHashSet(int)

```java
public LinkedHashSet(int initialCapacity)
```

Constructs a new, empty linked hash set with the specified initial
capacity and the default load factor (0.75).

Parameters:

- `initialCapacity`: the initial capacity of the LinkedHashSet

**API note:** To create a `LinkedHashSet` with an initial capacity that accommodates
an expected number of elements, use newLinkedHashSet.

Throws:

- `IllegalArgumentException`: if the initial capacity is less than zero

## LinkedHashSet.LinkedHashSet()

```java
public LinkedHashSet()
```

Constructs a new, empty linked hash set with the default initial
capacity (16) and load factor (0.75).

## LinkedHashSet.LinkedHashSet(Collection<? extends E>)

```java
public LinkedHashSet(Collection<? extends E> c)
```

Constructs a new linked hash set with the same elements as the
specified collection.  The linked hash set is created with an initial
capacity sufficient to hold the elements in the specified collection
and the default load factor (0.75).

Parameters:

- `c`: the collection whose elements are to be placed into this set

Throws:

- `NullPointerException`: if the specified collection is null

## LinkedHashSet.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a *late-binding*
and *fail-fast* `Spliterator` over the elements in this set.

The `Spliterator` reports `Spliterator.SIZED`,
`Spliterator.DISTINCT`, and `ORDERED`.  Implementations
should document the reporting of additional characteristic values.

**Implementation note:** The implementation creates a
*late-binding* spliterator
from the set's `Iterator`.  The spliterator inherits the
*fail-fast* properties of the set's iterator.
The created `Spliterator` additionally reports
`Spliterator.SUBSIZED`.

**Returns:** a `Spliterator` over the elements in this set

**Since:** 1.8

## LinkedHashSet.newLinkedHashSet(int)

```java
public static <T> LinkedHashSet<T> newLinkedHashSet(int numElements)
```

Creates a new, empty LinkedHashSet suitable for the expected number of elements.
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

## LinkedHashSet.addFirst(E)

```java
public void addFirst(E e)
```

(inherited documentation)

If this set already contains the element, it is relocated if necessary so that it is
first in encounter order.

**Since:** 21

## LinkedHashSet.addLast(E)

```java
public void addLast(E e)
```

(inherited documentation)

If this set already contains the element, it is relocated if necessary so that it is
last in encounter order.

**Since:** 21

## LinkedHashSet.getFirst()

```java
public E getFirst()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedHashSet.getLast()

```java
public E getLast()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedHashSet.removeFirst()

```java
public E removeFirst()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedHashSet.removeLast()

```java
public E removeLast()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedHashSet.reversed()

```java
public SequencedSet<E> reversed()
```

(inherited documentation)

Modifications to the reversed view are permitted and will be propagated to this set.
In addition, modifications to this set will be visible in the reversed view.

**Returns:** (inherited documentation)

**Since:** 21
