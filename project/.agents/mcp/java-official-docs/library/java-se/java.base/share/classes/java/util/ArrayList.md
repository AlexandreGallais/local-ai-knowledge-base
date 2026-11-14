---
title: "ArrayList class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ArrayList.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArrayList class (java.util)

```java
public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

Resizable-array implementation of the `List` interface.  Implements
all optional list operations, and permits all elements, including
`null`.  In addition to implementing the `List` interface,
this class provides methods to manipulate the size of the array that is
used internally to store the list.  (This class is roughly equivalent to
`Vector`, except that it is unsynchronized.)

The `size`, `isEmpty`, `get`, `set`,
`getFirst`, `getLast`, `removeLast`, `iterator`,
`listIterator`, and `reversed` operations run in constant time.
The `add`, and `addLast` operations runs in *amortized
constant time*, that is, adding n elements requires O(n) time.  All of
the other operations run in linear time (roughly speaking).  The constant
factor is low compared to that for the `LinkedList` implementation.

Each `ArrayList` instance has a *capacity*.  The capacity is
the size of the array used to store the elements in the list.  It is always
at least as large as the list size.  As elements are added to an ArrayList,
its capacity grows automatically.  The details of the growth policy are not
specified beyond the fact that adding an element has constant amortized
time cost.

An application can increase the capacity of an `ArrayList` instance
before adding a large number of elements using the `ensureCapacity`
operation.  This may reduce the amount of incremental reallocation.

**Note that this implementation is not synchronized.**
If multiple threads access an `ArrayList` instance concurrently,
and at least one of the threads modifies the list structurally, it
*must* be synchronized externally.  (A structural modification is
any operation that adds or deletes one or more elements, or explicitly
resizes the backing array; merely setting the value of an element is not
a structural modification.)  This is typically accomplished by
synchronizing on some object that naturally encapsulates the list.

If no such object exists, the list should be "wrapped" using the
Collections.synchronizedList
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the list:

```java
  List list = Collections.synchronizedList(new ArrayList(...));
```

The iterators returned by this class's iterator and
listIterator methods are *fail-fast*:
if the list is structurally modified at any time after the iterator is
created, in any way except through the iterator's own
remove or
add methods, the iterator will throw a
`ConcurrentModificationException`.  Thus, in the face of
concurrent modification, the iterator fails quickly and cleanly, rather
than risking arbitrary, non-deterministic behavior at an undetermined
time in the future.

Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw `ConcurrentModificationException` on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness:  *the fail-fast behavior of iterators
should be used only to detect bugs.*

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements in this list

**See also:** Collection

**See also:** List

**See also:** LinkedList

**See also:** Vector

**Since:** 1.2

## ArrayList.ArrayList(int)

```java
public ArrayList(int initialCapacity)
```

Constructs an empty list with the specified initial capacity.

Parameters:

- `initialCapacity`: the initial capacity of the list

Throws:

- `IllegalArgumentException`: if the specified initial capacity is negative

## ArrayList.ArrayList()

```java
public ArrayList()
```

Constructs an empty list with an initial capacity of ten.

## ArrayList.ArrayList(Collection<? extends E>)

```java
public ArrayList(Collection<? extends E> c)
```

Constructs a list containing the elements of the specified
collection, in the order they are returned by the collection's
iterator.

Parameters:

- `c`: the collection whose elements are to be placed into this list

Throws:

- `NullPointerException`: if the specified collection is null

## ArrayList.trimToSize()

```java
public void trimToSize()
```

Trims the capacity of this `ArrayList` instance to be the
list's current size.  An application can use this operation to minimize
the storage of an `ArrayList` instance.

## ArrayList.ensureCapacity(int)

```java
public void ensureCapacity(int minCapacity)
```

Increases the capacity of this `ArrayList` instance, if
necessary, to ensure that it can hold at least the number of elements
specified by the minimum capacity argument.

Parameters:

- `minCapacity`: the desired minimum capacity

## ArrayList.size()

```java
public int size()
```

Returns the number of elements in this list.

**Returns:** the number of elements in this list

## ArrayList.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this list contains no elements.

**Returns:** `true` if this list contains no elements

## ArrayList.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this list contains the specified element.
More formally, returns `true` if and only if this list contains
at least one element `e` such that
`Objects.equals(o, e)`.

Parameters:

- `o`: element whose presence in this list is to be tested

**Returns:** `true` if this list contains the specified element

## ArrayList.indexOf(Object)

```java
public int indexOf(Object o)
```

Returns the index of the first occurrence of the specified element
in this list, or -1 if this list does not contain the element.
More formally, returns the lowest index `i` such that
`Objects.equals(o, get(i))`,
or -1 if there is no such index.

## ArrayList.lastIndexOf(Object)

```java
public int lastIndexOf(Object o)
```

Returns the index of the last occurrence of the specified element
in this list, or -1 if this list does not contain the element.
More formally, returns the highest index `i` such that
`Objects.equals(o, get(i))`,
or -1 if there is no such index.

## ArrayList.clone()

```java
public Object clone()
```

Returns a shallow copy of this `ArrayList` instance.  (The
elements themselves are not copied.)

**Returns:** a clone of this `ArrayList` instance

## ArrayList.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this list
in proper sequence (from first to last element).

The returned array will be "safe" in that no references to it are
maintained by this list.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

This method acts as bridge between array-based and collection-based
APIs.

**Returns:** an array containing all of the elements in this list in
        proper sequence

## ArrayList.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this list in proper
sequence (from first to last element); the runtime type of the returned
array is that of the specified array.  If the list fits in the
specified array, it is returned therein.  Otherwise, a new array is
allocated with the runtime type of the specified array and the size of
this list.

If the list fits in the specified array with room to spare
(i.e., the array has more elements than the list), the element in
the array immediately following the end of the collection is set to
`null`.  (This is useful in determining the length of the
list *only* if the caller knows that the list does not contain
any null elements.)

Parameters:

- `a`: the array into which the elements of the list are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose.

**Returns:** an array containing the elements of the list

Throws:

- `ArrayStoreException`: if the runtime type of the specified array is not a supertype of the runtime type of every element in this list
- `NullPointerException`: if the specified array is null

## ArrayList.get(int)

```java
public E get(int index)
```

Returns the element at the specified position in this list.

Parameters:

- `index`: index of the element to return

**Returns:** the element at the specified position in this list

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## ArrayList.getFirst()

```java
public E getFirst()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayList.getLast()

```java
public E getLast()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayList.set(int, E)

```java
public E set(int index, E element)
```

Replaces the element at the specified position in this list with
the specified element.

Parameters:

- `index`: index of the element to replace
- `element`: element to be stored at the specified position

**Returns:** the element previously at the specified position

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## ArrayList.add(E)

```java
public boolean add(E e)
```

Appends the specified element to the end of this list.

Parameters:

- `e`: element to be appended to this list

**Returns:** `true` (as specified by `Collection.add`)

## ArrayList.add(int, E)

```java
public void add(int index, E element)
```

Inserts the specified element at the specified position in this
list. Shifts the element currently at that position (if any) and
any subsequent elements to the right (adds one to their indices).

Parameters:

- `index`: index at which the specified element is to be inserted
- `element`: element to be inserted

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## ArrayList.addFirst(E)

```java
public void addFirst(E element)
```

(inherited documentation)

**Since:** 21

## ArrayList.addLast(E)

```java
public void addLast(E element)
```

(inherited documentation)

**Since:** 21

## ArrayList.remove(int)

```java
public E remove(int index)
```

Removes the element at the specified position in this list.
Shifts any subsequent elements to the left (subtracts one from their
indices).

Parameters:

- `index`: the index of the element to be removed

**Returns:** the element that was removed from the list

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## ArrayList.removeFirst()

```java
public E removeFirst()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayList.removeLast()

```java
public E removeLast()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayList.equals(Object)

```java
public boolean equals(Object o)
```

(inherited documentation)

## ArrayList.hashCode()

```java
public int hashCode()
```

(inherited documentation)

## ArrayList.remove(Object)

```java
public boolean remove(Object o)
```

Removes the first occurrence of the specified element from this list,
if it is present.  If the list does not contain the element, it is
unchanged.  More formally, removes the element with the lowest index
`i` such that
`Objects.equals(o, get(i))`
(if such an element exists).  Returns `true` if this list
contained the specified element (or equivalently, if this list
changed as a result of the call).

Parameters:

- `o`: element to be removed from this list, if present

**Returns:** `true` if this list contained the specified element

## ArrayList.clear()

```java
public void clear()
```

Removes all of the elements from this list.  The list will
be empty after this call returns.

## ArrayList.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Appends all of the elements in the specified collection to the end of
this list, in the order that they are returned by the
specified collection's Iterator.  The behavior of this operation is
undefined if the specified collection is modified while the operation
is in progress.  (This implies that the behavior of this call is
undefined if the specified collection is this list, and this
list is nonempty.)

Parameters:

- `c`: collection containing elements to be added to this list

**Returns:** `true` if this list changed as a result of the call

Throws:

- `NullPointerException`: if the specified collection is null

## ArrayList.addAll(int, Collection<? extends E>)

```java
public boolean addAll(int index, Collection<? extends E> c)
```

Inserts all of the elements in the specified collection into this
list, starting at the specified position.  Shifts the element
currently at that position (if any) and any subsequent elements to
the right (increases their indices).  The new elements will appear
in the list in the order that they are returned by the
specified collection's iterator.

Parameters:

- `index`: index at which to insert the first element from the specified collection
- `c`: collection containing elements to be added to this list

**Returns:** `true` if this list changed as a result of the call

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)
- `NullPointerException`: if the specified collection is null

## ArrayList.removeRange(int, int)

```java
protected void removeRange(int fromIndex, int toIndex)
```

Removes from this list all of the elements whose index is between
`fromIndex`, inclusive, and `toIndex`, exclusive.
Shifts any succeeding elements to the left (reduces their index).
This call shortens the list by `(toIndex - fromIndex)` elements.
(If `toIndex==fromIndex`, this operation has no effect.)

Throws:

- `IndexOutOfBoundsException`: if `fromIndex` or `toIndex` is out of range (`fromIndex < 0 || toIndex > size() || toIndex < fromIndex`)

## ArrayList.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Removes from this list all of its elements that are contained in the
specified collection.

Parameters:

- `c`: collection containing elements to be removed from this list

**Returns:** `true` if this list changed as a result of the call

**See also:** Collection#contains(Object)

Throws:

- `ClassCastException`: if the class of an element of this list is incompatible with the specified collection (optional)
- `NullPointerException`: if this list contains a null element and the specified collection does not permit null elements (optional), or if the specified collection is null
