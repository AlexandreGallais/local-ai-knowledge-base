---
title: "AbstractCollection class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/AbstractCollection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractCollection class (java.util)

```java
public abstract class AbstractCollection<E> implements Collection<E>
```

This class provides a skeletal implementation of the `Collection`
interface, to minimize the effort required to implement this interface.

To implement an unmodifiable collection, the programmer needs only to
extend this class and provide implementations for the `iterator` and
`size` methods.  (The iterator returned by the `iterator`
method must implement `hasNext` and `next`.)

To implement a modifiable collection, the programmer must additionally
override this class's `add` method (which otherwise throws an
`UnsupportedOperationException`), and the iterator returned by the
`iterator` method must additionally implement its `remove`
method.

The programmer should generally provide a void (no argument) and
`Collection` constructor, as per the recommendation in the
`Collection` interface specification.

The documentation for each non-abstract method in this class describes its
implementation in detail.  Each of these methods may be overridden if
the collection being implemented admits a more efficient implementation.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements in this collection

**See also:** Collection

**Since:** 1.2

## AbstractCollection.AbstractCollection()

```java
protected AbstractCollection()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## AbstractCollection.iterator()

```java
public abstract Iterator<E> iterator()
```

Returns an iterator over the elements contained in this collection.

**Returns:** an iterator over the elements contained in this collection

## AbstractCollection.isEmpty()

```java
public boolean isEmpty()
```

(inherited documentation)

**Implementation requirements:** This implementation returns `size() == 0`.

## AbstractCollection.contains(Object)

```java
public boolean contains(Object o)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over the elements in the collection,
checking each element in turn for equality with the specified element.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractCollection.toArray()

```java
public Object[] toArray()
```

(inherited documentation)

**Implementation requirements:** This implementation returns an array containing all the elements
returned by this collection's iterator, in the same order, stored in
consecutive elements of the array, starting with index `0`.
The length of the returned array is equal to the number of elements
returned by the iterator, even if the size of this collection changes
during iteration, as might happen if the collection permits
concurrent modification during iteration.  The `size` method is
called only as an optimization hint; the correct result is returned
even if the iterator returns a different number of elements.

This method is equivalent to:

```java
List<E> list = new ArrayList<E>(size());
for (E e : this)
    list.add(e);
return list.toArray();
```

## AbstractCollection.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

(inherited documentation)

**Implementation requirements:** This implementation returns an array containing all the elements
returned by this collection's iterator in the same order, stored in
consecutive elements of the array, starting with index `0`.
If the number of elements returned by the iterator is too large to
fit into the specified array, then the elements are returned in a
newly allocated array with length equal to the number of elements
returned by the iterator, even if the size of this collection
changes during iteration, as might happen if the collection permits
concurrent modification during iteration.  The `size` method is
called only as an optimization hint; the correct result is returned
even if the iterator returns a different number of elements.

This method is equivalent to:

```java
List<E> list = new ArrayList<E>(size());
for (E e : this)
    list.add(e);
return list.toArray(a);
```

Throws:

- `ArrayStoreException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractCollection.add(E)

```java
public boolean add(E e)
```

(inherited documentation)

**Implementation requirements:** This implementation always throws an
`UnsupportedOperationException`.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `IllegalStateException`: (inherited documentation)

## AbstractCollection.remove(Object)

```java
public boolean remove(Object o)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over the collection looking for the
specified element.  If it finds the element, it removes the element
from the collection using the iterator's remove method.

Note that this implementation throws an
`UnsupportedOperationException` if the iterator returned by this
collection's iterator method does not implement the `remove`
method and this collection contains the specified object.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractCollection.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> c)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over the specified collection,
checking each element returned by the iterator in turn to see
if it's contained in this collection.  If all elements are so
contained `true` is returned, otherwise `false`.

**See also:** #contains(Object)

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractCollection.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over the specified collection, and adds
each object returned by the iterator to this collection, in turn.

Note that this implementation will throw an
`UnsupportedOperationException` unless `add` is
overridden (assuming the specified collection is non-empty).

**See also:** #add(Object)

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `IllegalStateException`: (inherited documentation)

## AbstractCollection.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over this collection, checking each
element returned by the iterator in turn to see if it's contained
in the specified collection.  If it's so contained, it's removed from
this collection with the iterator's `remove` method.

Note that this implementation will throw an
`UnsupportedOperationException` if the iterator returned by the
`iterator` method does not implement the `remove` method
and this collection contains one or more elements in common with the
specified collection.

**See also:** #remove(Object)

**See also:** #contains(Object)

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractCollection.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over this collection, checking each
element returned by the iterator in turn to see if it's contained
in the specified collection.  If it's not so contained, it's removed
from this collection with the iterator's `remove` method.

Note that this implementation will throw an
`UnsupportedOperationException` if the iterator returned by the
`iterator` method does not implement the `remove` method
and this collection contains one or more elements not present in the
specified collection.

**See also:** #remove(Object)

**See also:** #contains(Object)

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractCollection.clear()

```java
public void clear()
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over this collection, removing each
element using the `Iterator.remove` operation.  Most
implementations will probably choose to override this method for
efficiency.

Note that this implementation will throw an
`UnsupportedOperationException` if the iterator returned by this
collection's `iterator` method does not implement the
`remove` method and this collection is non-empty.

Throws:

- `UnsupportedOperationException`: (inherited documentation)

## AbstractCollection.toString()

```java
public String toString()
```

Returns a string representation of this collection.  The string
representation consists of a list of the collection's elements in the
order they are returned by its iterator, enclosed in square brackets
(`"[]"`).  Adjacent elements are separated by the characters
`", "` (comma and space).  Elements are converted to strings as
by `String.valueOf(Object)`.

**Returns:** a string representation of this collection
