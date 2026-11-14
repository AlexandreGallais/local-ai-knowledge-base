---
title: "AbstractList class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/AbstractList.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractList class (java.util)

```java
public abstract class AbstractList<E> extends AbstractCollection<E> implements List<E>
```

This class provides a skeletal implementation of the `List`
interface to minimize the effort required to implement this interface
backed by a "random access" data store (such as an array).  For sequential
access data (such as a linked list), `AbstractSequentialList` should
be used in preference to this class.

To implement an unmodifiable list, the programmer needs only to extend
this class and provide implementations for the `get(int)` and
size() methods.

To implement a modifiable list, the programmer must additionally
override the Object) set(int, E) method (which otherwise
throws an `UnsupportedOperationException`).  If the list is
variable-size the programmer must additionally override the
Object) add(int, E) and `remove(int)` methods.

The programmer should generally provide a void (no argument) and collection
constructor, as per the recommendation in the `Collection` interface
specification.

Unlike the other abstract collection implementations, the programmer does
*not* have to provide an iterator implementation; the iterator and
list iterator are implemented by this class, on top of the "random access"
methods:
`get(int)`,
Object) set(int, E),
Object) add(int, E) and
`remove(int)`.

The documentation for each non-abstract method in this class describes its
implementation in detail.  Each of these methods may be overridden if the
collection being implemented admits a more efficient implementation.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements in this list

**Since:** 1.2

## AbstractList.AbstractList()

```java
protected AbstractList()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## AbstractList.add(E)

```java
public boolean add(E e)
```

Appends the specified element to the end of this list (optional
operation).

Lists that support this operation may place limitations on what
elements may be added to this list.  In particular, some
lists will refuse to add null elements, and others will impose
restrictions on the type of elements that may be added.  List
classes should clearly specify in their documentation any restrictions
on what elements may be added.

Parameters:

- `e`: element to be appended to this list

**Implementation requirements:** This implementation calls `add(size(), e)`.

Note that this implementation throws an
`UnsupportedOperationException` unless
Object) add(int, E) is overridden.

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `UnsupportedOperationException`: if the `add` operation is not supported by this list
- `ClassCastException`: if the class of the specified element prevents it from being added to this list
- `NullPointerException`: if the specified element is null and this list does not permit null elements
- `IllegalArgumentException`: if some property of this element prevents it from being added to this list

## AbstractList.get(int)

```java
public abstract E get(int index)
```

(inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractList.set(int, E)

```java
public E set(int index, E element)
```

(inherited documentation)

**Implementation requirements:** This implementation always throws an
`UnsupportedOperationException`.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractList.add(int, E)

```java
public void add(int index, E element)
```

(inherited documentation)

**Implementation requirements:** This implementation always throws an
`UnsupportedOperationException`.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractList.remove(int)

```java
public E remove(int index)
```

(inherited documentation)

**Implementation requirements:** This implementation always throws an
`UnsupportedOperationException`.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractList.indexOf(Object)

```java
public int indexOf(Object o)
```

(inherited documentation)

**Implementation requirements:** This implementation first gets a list iterator (with
`listIterator()`).  Then, it iterates over the list until the
specified element is found or the end of the list is reached.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractList.lastIndexOf(Object)

```java
public int lastIndexOf(Object o)
```

(inherited documentation)

**Implementation requirements:** This implementation first gets a list iterator that points to the end
of the list (with `listIterator(size())`).  Then, it iterates
backwards over the list until the specified element is found, or the
beginning of the list is reached.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractList.clear()

```java
public void clear()
```

Removes all of the elements from this list (optional operation).
The list will be empty after this call returns.

**Implementation requirements:** This implementation calls `removeRange(0, size())`.

Note that this implementation throws an
`UnsupportedOperationException` unless `remove(int index)` or `removeRange(int fromIndex, int toIndex)` is
overridden.

Throws:

- `UnsupportedOperationException`: if the `clear` operation is not supported by this list

## AbstractList.addAll(int, Collection<? extends E>)

```java
public boolean addAll(int index, Collection<? extends E> c)
```

(inherited documentation)

**Implementation requirements:** This implementation gets an iterator over the specified collection
and iterates over it, inserting the elements obtained from the
iterator into this list at the appropriate position, one at a time,
using `add(int, E)`.
Many implementations will override this method for efficiency.

Note that this implementation throws an
`UnsupportedOperationException` unless
Object) add(int, E) is overridden.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractList.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this list in proper sequence.

**Implementation requirements:** This implementation returns a straightforward implementation of the
iterator interface, relying on the backing list's `size()`,
`get(int)`, and `remove(int)` methods.

Note that the iterator returned by this method will throw an
`UnsupportedOperationException` in response to its
`remove` method unless the list's `remove(int)` method is
overridden.

This implementation can be made to throw runtime exceptions in the
face of concurrent modification, as described in the specification
for the (protected) `modCount` field.

**Returns:** an iterator over the elements in this list in proper sequence

## AbstractList.listIterator()

```java
public ListIterator<E> listIterator()
```

(inherited documentation)

**Implementation requirements:** This implementation returns `listIterator(0)`.

**See also:** #listIterator(int)

## AbstractList.listIterator(int)

```java
public ListIterator<E> listIterator(final int index)
```

(inherited documentation)

**Implementation requirements:** This implementation returns a straightforward implementation of the
`ListIterator` interface that extends the implementation of the
`Iterator` interface returned by the `iterator()` method.
The `ListIterator` implementation relies on the backing list's
`get(int)`, `set(int, E)`, `add(int, E)`
and `remove(int)` methods.

Note that the list iterator returned by this implementation will
throw an `UnsupportedOperationException` in response to its
`remove`, `set` and `add` methods unless the
list's `remove(int)`, `set(int, E)`, and
`add(int, E)` methods are overridden.

This implementation can be made to throw runtime exceptions in the
face of concurrent modification, as described in the specification for
the (protected) `modCount` field.

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## AbstractList.subList(int, int)

```java
public List<E> subList(int fromIndex, int toIndex)
```

(inherited documentation)

**Implementation requirements:** This implementation returns a list that subclasses
`AbstractList`.  The subclass stores, in private fields, the
size of the subList (which can change over its lifetime), and the
expected `modCount` value of the backing list.  There are two
variants of the subclass, one of which implements `RandomAccess`.
If this list implements `RandomAccess` the returned list will
be an instance of the subclass that implements `RandomAccess`.

The subclass's `set(int, E)`, `get(int)`,
`add(int, E)`, `remove(int)`, `addAll(int, Collection)` and `removeRange(int, int)` methods all
delegate to the corresponding methods on the backing abstract list,
after bounds-checking the index and adjusting for the offset.  The
`addAll(Collection c)` method merely returns `addAll(size, c)`.

The `listIterator(int)` method returns a "wrapper object"
over a list iterator on the backing list, which is created with the
corresponding method on the backing list.  The `iterator` method
merely returns `listIterator()`, and the `size` method
merely returns the subclass's `size` field.

All methods first check to see if the actual `modCount` of
the backing list is equal to its expected value, and throw a
`ConcurrentModificationException` if it is not.

Throws:

- `IndexOutOfBoundsException`: if an endpoint index value is out of range `(fromIndex < 0 || toIndex > size)`
- `IllegalArgumentException`: if the endpoint indices are out of order `(fromIndex > toIndex)`

## AbstractList.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this list for equality.  Returns
`true` if and only if the specified object is also a list, both
lists have the same size, and all corresponding pairs of elements in
the two lists are *equal*.  (Two elements `e1` and
`e2` are *equal* if `(e1==null ? e2==null : e1.equals(e2))`.)  In other words, two lists are defined to be
equal if they contain the same elements in the same order.

Parameters:

- `o`: the object to be compared for equality with this list

**Implementation requirements:** This implementation first checks if the specified object is this
list. If so, it returns `true`; if not, it checks if the
specified object is a list. If not, it returns `false`; if so,
it iterates over both lists, comparing corresponding pairs of elements.
If any comparison returns `false`, this method returns
`false`.  If either iterator runs out of elements before the
other it returns `false` (as the lists are of unequal length);
otherwise it returns `true` when the iterations complete.

**Returns:** `true` if the specified object is equal to this list

## AbstractList.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this list.

**Implementation requirements:** This implementation uses exactly the code that is used to define the
list hash function in the documentation for the `List.hashCode`
method.

**Returns:** the hash code value for this list

## AbstractList.removeRange(int, int)

```java
protected void removeRange(int fromIndex, int toIndex)
```

Removes from this list all of the elements whose index is between
`fromIndex`, inclusive, and `toIndex`, exclusive.
Shifts any succeeding elements to the left (reduces their index).
This call shortens the list by `(toIndex - fromIndex)` elements.
(If `toIndex==fromIndex`, this operation has no effect.)

This method is called by the `clear` operation on this list
and its subLists.  Overriding this method to take advantage of
the internals of the list implementation can *substantially*
improve the performance of the `clear` operation on this list
and its subLists.

Parameters:

- `fromIndex`: index of first element to be removed
- `toIndex`: index after last element to be removed

**Implementation requirements:** This implementation gets a list iterator positioned before
`fromIndex`, and repeatedly calls `ListIterator.next`
followed by `ListIterator.remove` until the entire range has
been removed.  **Note: if `ListIterator.remove` requires linear
time, this implementation requires quadratic time.**

## AbstractList.modCount

```java
protected transient int modCount
```

The number of times this list has been *structurally modified*.
Structural modifications are those that change the size of the
list, or otherwise perturb it in such a fashion that iterations in
progress may yield incorrect results.

This field is used by the iterator and list iterator implementation
returned by the `iterator` and `listIterator` methods.
If the value of this field changes unexpectedly, the iterator (or list
iterator) will throw a `ConcurrentModificationException` in
response to the `next`, `remove`, `previous`,
`set` or `add` operations.  This provides
*fail-fast* behavior, rather than non-deterministic behavior in
the face of concurrent modification during iteration.

**Use of this field by subclasses is optional.** If a subclass
wishes to provide fail-fast iterators (and list iterators), then it
merely has to increment this field in its `add(int, E)` and
`remove(int)` methods (and any other methods that it overrides
that result in structural modifications to the list).  A single call to
`add(int, E)` or `remove(int)` must add no more than
one to this field, or the iterators (and list iterators) will throw
bogus `ConcurrentModificationExceptions`.  If an implementation
does not wish to provide fail-fast iterators, this field may be
ignored.

## AbstractList.SubList(AbstractList<E>, int, int)

```java
public SubList(AbstractList<E> root, int fromIndex, int toIndex)
```

Constructs a sublist of an arbitrary AbstractList, which is
not a SubList itself.

## AbstractList.SubList(SubList<E>, int, int)

```java
protected SubList(SubList<E> parent, int fromIndex, int toIndex)
```

Constructs a sublist of another SubList.
