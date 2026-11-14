---
title: "Vector class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Vector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Vector class (java.util)

```java
public class Vector<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

The `Vector` class implements a growable array of
objects. Like an array, it contains components that can be
accessed using an integer index. However, the size of a
`Vector` can grow or shrink as needed to accommodate
adding and removing items after the `Vector` has been created.

Each vector tries to optimize storage management by maintaining a
`capacity` and a `capacityIncrement`. The
`capacity` is always at least as large as the vector
size; it is usually larger because as components are added to the
vector, the vector's storage increases in chunks the size of
`capacityIncrement`. An application can increase the
capacity of a vector before inserting a large number of
components; this reduces the amount of incremental reallocation.

The iterators returned by this class's iterator and
listIterator methods are *fail-fast*:
if the vector is structurally modified at any time after the iterator is
created, in any way except through the iterator's own
remove or
add methods, the iterator will throw a
`ConcurrentModificationException`.  Thus, in the face of
concurrent modification, the iterator fails quickly and cleanly, rather
than risking arbitrary, non-deterministic behavior at an undetermined
time in the future.  The Enumerations returned by
the elements method are *not* fail-fast; if the
Vector is structurally modified at any time after the enumeration is
created then the results of enumerating are undefined.

Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw `ConcurrentModificationException` on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness:  *the fail-fast behavior of iterators
should be used only to detect bugs.*

As of the Java 2 platform v1.2, this class was retrofitted to
implement the `List` interface, making it a member of the

Java Collections Framework.  Unlike the new collection
implementations, `Vector` is synchronized.  If a thread-safe
implementation is not needed, it is recommended to use `ArrayList` in place of `Vector`.

Parameters:

- `<E>`: Type of component elements

**See also:** Collection

**See also:** LinkedList

**Since:** 1.0

## Vector.elementData

```java
protected Object[] elementData
```

The array buffer into which the components of the vector are
stored. The capacity of the vector is the length of this array buffer,
and is at least large enough to contain all the vector's elements.

Any array elements following the last element in the Vector are null.

## Vector.elementCount

```java
protected int elementCount
```

The number of valid components in this `Vector` object.
Components `elementData[0]` through
`elementData[elementCount-1]` are the actual items.

## Vector.capacityIncrement

```java
protected int capacityIncrement
```

The amount by which the capacity of the vector is automatically
incremented when its size becomes greater than its capacity.  If
the capacity increment is less than or equal to zero, the capacity
of the vector is doubled each time it needs to grow.

## Vector.Vector(int, int)

```java
public Vector(int initialCapacity, int capacityIncrement)
```

Constructs an empty vector with the specified initial capacity and
capacity increment.

Parameters:

- `initialCapacity`: the initial capacity of the vector
- `capacityIncrement`: the amount by which the capacity is increased when the vector overflows

Throws:

- `IllegalArgumentException`: if the specified initial capacity is negative

## Vector.Vector(int)

```java
public Vector(int initialCapacity)
```

Constructs an empty vector with the specified initial capacity and
with its capacity increment equal to zero.

Parameters:

- `initialCapacity`: the initial capacity of the vector

Throws:

- `IllegalArgumentException`: if the specified initial capacity is negative

## Vector.Vector()

```java
public Vector()
```

Constructs an empty vector so that its internal data array
has size `10` and its standard capacity increment is
zero.

## Vector.Vector(Collection<? extends E>)

```java
public Vector(Collection<? extends E> c)
```

Constructs a vector containing the elements of the specified
collection, in the order they are returned by the collection's
iterator.

Parameters:

- `c`: the collection whose elements are to be placed into this vector

**Since:** 1.2

Throws:

- `NullPointerException`: if the specified collection is null

## Vector.copyInto(Object[])

```java
public synchronized void copyInto(Object[] anArray)
```

Copies the components of this vector into the specified array.
The item at index `k` in this vector is copied into
component `k` of `anArray`.

Parameters:

- `anArray`: the array into which the components get copied

**See also:** #toArray(Object[])

Throws:

- `NullPointerException`: if the given array is null
- `IndexOutOfBoundsException`: if the specified array is not large enough to hold all the components of this vector
- `ArrayStoreException`: if a component of this vector is not of a runtime type that can be stored in the specified array

## Vector.trimToSize()

```java
public synchronized void trimToSize()
```

Trims the capacity of this vector to be the vector's current
size. If the capacity of this vector is larger than its current
size, then the capacity is changed to equal the size by replacing
its internal data array, kept in the field `elementData`,
with a smaller one. An application can use this operation to
minimize the storage of a vector.

## Vector.ensureCapacity(int)

```java
public synchronized void ensureCapacity(int minCapacity)
```

Increases the capacity of this vector, if necessary, to ensure
that it can hold at least the number of components specified by
the minimum capacity argument.

If the current capacity of this vector is less than
`minCapacity`, then its capacity is increased by replacing its
internal data array, kept in the field `elementData`, with a
larger one.  The size of the new data array will be the old size plus
`capacityIncrement`, unless the value of
`capacityIncrement` is less than or equal to zero, in which case
the new capacity will be twice the old capacity; but if this new size
is still smaller than `minCapacity`, then the new capacity will
be `minCapacity`.

Parameters:

- `minCapacity`: the desired minimum capacity

## Vector.setSize(int)

```java
public synchronized void setSize(int newSize)
```

Sets the size of this vector. If the new size is greater than the
current size, new `null` items are added to the end of
the vector. If the new size is less than the current size, all
components at index `newSize` and greater are discarded.

Parameters:

- `newSize`: the new size of this vector

Throws:

- `ArrayIndexOutOfBoundsException`: if the new size is negative

## Vector.capacity()

```java
public synchronized int capacity()
```

Returns the current capacity of this vector.

**Returns:** the current capacity (the length of its internal
         data array, kept in the field `elementData`
         of this vector)

## Vector.size()

```java
public synchronized int size()
```

Returns the number of components in this vector.

**Returns:** the number of components in this vector

## Vector.isEmpty()

```java
public synchronized boolean isEmpty()
```

Tests if this vector has no components.

**Returns:** `true` if and only if this vector has
         no components, that is, its size is zero;
         `false` otherwise.

## Vector.elements()

```java
public Enumeration<E> elements()
```

Returns an enumeration of the components of this vector. The
returned `Enumeration` object will generate all items in
this vector. The first item generated is the item at index `0`,
then the item at index `1`, and so on. If the vector is
structurally modified while enumerating over the elements then the
results of enumerating are undefined.

**Returns:** an enumeration of the components of this vector

**See also:** Iterator

## Vector.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this vector contains the specified element.
More formally, returns `true` if and only if this vector
contains at least one element `e` such that
`Objects.equals(o, e)`.

Parameters:

- `o`: element whose presence in this vector is to be tested

**Returns:** `true` if this vector contains the specified element

## Vector.indexOf(Object)

```java
public int indexOf(Object o)
```

Returns the index of the first occurrence of the specified element
in this vector, or -1 if this vector does not contain the element.
More formally, returns the lowest index `i` such that
`Objects.equals(o, get(i))`,
or -1 if there is no such index.

Parameters:

- `o`: element to search for

**Returns:** the index of the first occurrence of the specified element in
        this vector, or -1 if this vector does not contain the element

## Vector.indexOf(Object, int)

```java
public synchronized int indexOf(Object o, int index)
```

Returns the index of the first occurrence of the specified element in
this vector, searching forwards from `index`, or returns -1 if
the element is not found.
More formally, returns the lowest index `i` such that
`(i >= index && Objects.equals(o, get(i)))`,
or -1 if there is no such index.

Parameters:

- `o`: element to search for
- `index`: index to start searching from

**Returns:** the index of the first occurrence of the element in
        this vector at position `index` or later in the vector;
        `-1` if the element is not found.

**See also:** Object#equals(Object)

Throws:

- `IndexOutOfBoundsException`: if the specified index is negative

## Vector.lastIndexOf(Object)

```java
public synchronized int lastIndexOf(Object o)
```

Returns the index of the last occurrence of the specified element
in this vector, or -1 if this vector does not contain the element.
More formally, returns the highest index `i` such that
`Objects.equals(o, get(i))`,
or -1 if there is no such index.

Parameters:

- `o`: element to search for

**Returns:** the index of the last occurrence of the specified element in
        this vector, or -1 if this vector does not contain the element

## Vector.lastIndexOf(Object, int)

```java
public synchronized int lastIndexOf(Object o, int index)
```

Returns the index of the last occurrence of the specified element in
this vector, searching backwards from `index`, or returns -1 if
the element is not found.
More formally, returns the highest index `i` such that
`(i <= index && Objects.equals(o, get(i)))`,
or -1 if there is no such index.

Parameters:

- `o`: element to search for
- `index`: index to start searching backwards from

**Returns:** the index of the last occurrence of the element at position
        less than or equal to `index` in this vector;
        -1 if the element is not found.

Throws:

- `IndexOutOfBoundsException`: if the specified index is greater than or equal to the current size of this vector

## Vector.elementAt(int)

```java
public synchronized E elementAt(int index)
```

Returns the component at the specified index.

This method is identical in functionality to the `get(int)`
method (which is part of the `List` interface).

Parameters:

- `index`: an index into this vector

**Returns:** the component at the specified index

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## Vector.firstElement()

```java
public synchronized E firstElement()
```

Returns the first component (the item at index `0`) of
this vector.

**Returns:** the first component of this vector

Throws:

- `NoSuchElementException`: if this vector has no components

## Vector.lastElement()

```java
public synchronized E lastElement()
```

Returns the last component of the vector.

**Returns:** the last component of the vector, i.e., the component at index
         `size() - 1`

Throws:

- `NoSuchElementException`: if this vector is empty

## Vector.setElementAt(E, int)

```java
public synchronized void setElementAt(E obj, int index)
```

Sets the component at the specified `index` of this
vector to be the specified object. The previous component at that
position is discarded.

The index must be a value greater than or equal to `0`
and less than the current size of the vector.

This method is identical in functionality to the
Object) set(int, E)
method (which is part of the `List` interface). Note that the
`set` method reverses the order of the parameters, to more closely
match array usage.  Note also that the `set` method returns the
old value that was stored at the specified position.

Parameters:

- `obj`: what the component is to be set to
- `index`: the specified index

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## Vector.removeElementAt(int)

```java
public synchronized void removeElementAt(int index)
```

Deletes the component at the specified index. Each component in
this vector with an index greater or equal to the specified
`index` is shifted downward to have an index one
smaller than the value it had previously. The size of this vector
is decreased by `1`.

The index must be a value greater than or equal to `0`
and less than the current size of the vector.

This method is identical in functionality to the `remove(int)`
method (which is part of the `List` interface).  Note that the
`remove` method returns the old value that was stored at the
specified position.

Parameters:

- `index`: the index of the object to remove

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## Vector.insertElementAt(E, int)

```java
public synchronized void insertElementAt(E obj, int index)
```

Inserts the specified object as a component in this vector at the
specified `index`. Each component in this vector with
an index greater or equal to the specified `index` is
shifted upward to have an index one greater than the value it had
previously.

The index must be a value greater than or equal to `0`
and less than or equal to the current size of the vector. (If the
index is equal to the current size of the vector, the new element
is appended to the Vector.)

This method is identical in functionality to the
Object) add(int, E)
method (which is part of the `List` interface).  Note that the
`add` method reverses the order of the parameters, to more closely
match array usage.

Parameters:

- `obj`: the component to insert
- `index`: where to insert the new component

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index > size()`)
