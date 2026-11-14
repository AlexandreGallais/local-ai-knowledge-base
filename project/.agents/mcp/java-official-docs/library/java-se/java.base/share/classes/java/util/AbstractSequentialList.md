---
title: "AbstractSequentialList class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/AbstractSequentialList.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractSequentialList class (java.util)

```java
public abstract class AbstractSequentialList<E> extends AbstractList<E>
```

This class provides a skeletal implementation of the `List`
interface to minimize the effort required to implement this interface
backed by a "sequential access" data store (such as a linked list).  For
random access data (such as an array), `AbstractList` should be used
in preference to this class.

This class is the opposite of the `AbstractList` class in the sense
that it implements the "random access" methods (`get(int index)`,
`set(int index, E element)`, `add(int index, E element)` and
`remove(int index)`) on top of the list's list iterator, instead of
the other way around.

To implement a list the programmer needs only to extend this class and
provide implementations for the `listIterator` and `size`
methods.  For an unmodifiable list, the programmer need only implement the
list iterator's `hasNext`, `next`, `hasPrevious`,
`previous` and `index` methods.

For a modifiable list the programmer should additionally implement the list
iterator's `set` method.  For a variable-size list the programmer
should additionally implement the list iterator's `remove` and
`add` methods.

The programmer should generally provide a void (no argument) and collection
constructor, as per the recommendation in the `Collection` interface
specification.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements in this list

**See also:** Collection

**See also:** List

**See also:** AbstractList

**See also:** AbstractCollection

**Since:** 1.2

## AbstractSequentialList.AbstractSequentialList()

```java
protected AbstractSequentialList()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## AbstractSequentialList.get(int)

```java
public E get(int index)
```

Returns the element at the specified position in this list.

This implementation first gets a list iterator pointing to the
indexed element (with `listIterator(index)`).  Then, it gets
the element using `ListIterator.next` and returns it.

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractSequentialList.set(int, E)

```java
public E set(int index, E element)
```

Replaces the element at the specified position in this list with the
specified element (optional operation).

This implementation first gets a list iterator pointing to the
indexed element (with `listIterator(index)`).  Then, it gets
the current element using `ListIterator.next` and replaces it
with `ListIterator.set`.

Note that this implementation will throw an
`UnsupportedOperationException` if the list iterator does not
implement the `set` operation.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractSequentialList.add(int, E)

```java
public void add(int index, E element)
```

Inserts the specified element at the specified position in this list
(optional operation).  Shifts the element currently at that position
(if any) and any subsequent elements to the right (adds one to their
indices).

This implementation first gets a list iterator pointing to the
indexed element (with `listIterator(index)`).  Then, it
inserts the specified element with `ListIterator.add`.

Note that this implementation will throw an
`UnsupportedOperationException` if the list iterator does not
implement the `add` operation.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractSequentialList.remove(int)

```java
public E remove(int index)
```

Removes the element at the specified position in this list (optional
operation).  Shifts any subsequent elements to the left (subtracts one
from their indices).  Returns the element that was removed from the
list.

This implementation first gets a list iterator pointing to the
indexed element (with `listIterator(index)`).  Then, it removes
the element with `ListIterator.remove`.

Note that this implementation will throw an
`UnsupportedOperationException` if the list iterator does not
implement the `remove` operation.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractSequentialList.addAll(int, Collection<? extends E>)

```java
public boolean addAll(int index, Collection<? extends E> c)
```

Inserts all of the elements in the specified collection into this
list at the specified position (optional operation).  Shifts the
element currently at that position (if any) and any subsequent
elements to the right (increases their indices).  The new elements
will appear in this list in the order that they are returned by the
specified collection's iterator.  The behavior of this operation is
undefined if the specified collection is modified while the
operation is in progress.  (Note that this will occur if the specified
collection is this list, and it's nonempty.)

This implementation gets an iterator over the specified collection and
a list iterator over this list pointing to the indexed element (with
`listIterator(index)`).  Then, it iterates over the specified
collection, inserting the elements obtained from the iterator into this
list, one at a time, using `ListIterator.add` followed by
`ListIterator.next` (to skip over the added element).

Note that this implementation will throw an
`UnsupportedOperationException` if the list iterator returned by
the `listIterator` method does not implement the `add`
operation.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractSequentialList.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this list (in proper
sequence).

This implementation merely returns a list iterator over the list.

**Returns:** an iterator over the elements in this list (in proper sequence)

## AbstractSequentialList.listIterator(int)

```java
public abstract ListIterator<E> listIterator(int index)
```

Returns a list iterator over the elements in this list (in proper
sequence).

Parameters:

- `index`: index of first element to be returned from the list iterator (by a call to the `next` method)

**Returns:** a list iterator over the elements in this list (in proper
        sequence)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)
