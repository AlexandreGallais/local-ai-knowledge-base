---
title: "Vector class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Vector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Vector class (java.util) (part 2 of 2)

## Vector.addElement(E)

```java
public synchronized void addElement(E obj)
```

Adds the specified component to the end of this vector,
increasing its size by one. The capacity of this vector is
increased if its size becomes greater than its capacity.

This method is identical in functionality to the
add(E)
method (which is part of the `List` interface).

Parameters:

- `obj`: the component to be added

## Vector.removeElement(Object)

```java
public synchronized boolean removeElement(Object obj)
```

Removes the first (lowest-indexed) occurrence of the argument
from this vector. If the object is found in this vector, each
component in the vector with an index greater or equal to the
object's index is shifted downward to have an index one smaller
than the value it had previously.

This method is identical in functionality to the
`remove(Object)` method (which is part of the
`List` interface).

Parameters:

- `obj`: the component to be removed

**Returns:** `true` if the argument was a component of this
         vector; `false` otherwise.

## Vector.removeAllElements()

```java
public synchronized void removeAllElements()
```

Removes all components from this vector and sets its size to zero.

This method is identical in functionality to the `clear`
method (which is part of the `List` interface).

## Vector.clone()

```java
public synchronized Object clone()
```

Returns a clone of this vector. The copy will contain a
reference to a clone of the internal data array, not a reference
to the original internal data array of this `Vector` object.

**Returns:** a clone of this vector

## Vector.toArray()

```java
public synchronized Object[] toArray()
```

Returns an array containing all of the elements in this Vector
in the correct order.

**Since:** 1.2

## Vector.toArray(T[])

```java
public synchronized <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this Vector in the
correct order; the runtime type of the returned array is that of the
specified array.  If the Vector fits in the specified array, it is
returned therein.  Otherwise, a new array is allocated with the runtime
type of the specified array and the size of this Vector.

If the Vector fits in the specified array with room to spare
(i.e., the array has more elements than the Vector),
the element in the array immediately following the end of the
Vector is set to null.  (This is useful in determining the length
of the Vector *only* if the caller knows that the Vector
does not contain any null elements.)

Parameters:

- `<T>`: type of array elements. The same type as `<E>` or a supertype of `<E>`.
- `a`: the array into which the elements of the Vector are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose.

**Returns:** an array containing the elements of the Vector

**Since:** 1.2

Throws:

- `ArrayStoreException`: if the runtime type of a, `<T>`, is not a supertype of the runtime type, `<E>`, of every element in this Vector
- `NullPointerException`: if the given array is null

## Vector.get(int)

```java
public synchronized E get(int index)
```

Returns the element at the specified position in this Vector.

Parameters:

- `index`: index of the element to return

**Returns:** object at the specified index

**Since:** 1.2

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## Vector.set(int, E)

```java
public synchronized E set(int index, E element)
```

Replaces the element at the specified position in this Vector with the
specified element.

Parameters:

- `index`: index of the element to replace
- `element`: element to be stored at the specified position

**Returns:** the element previously at the specified position

**Since:** 1.2

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## Vector.add(E)

```java
public synchronized boolean add(E e)
```

Appends the specified element to the end of this Vector.

Parameters:

- `e`: element to be appended to this Vector

**Returns:** `true` (as specified by `Collection.add`)

**Since:** 1.2

## Vector.remove(Object)

```java
public boolean remove(Object o)
```

Removes the first occurrence of the specified element in this Vector
If the Vector does not contain the element, it is unchanged.  More
formally, removes the element with the lowest index i such that
`Objects.equals(o, get(i))` (if such
an element exists).

Parameters:

- `o`: element to be removed from this Vector, if present

**Returns:** true if the Vector contained the specified element

**Since:** 1.2

## Vector.add(int, E)

```java
public void add(int index, E element)
```

Inserts the specified element at the specified position in this Vector.
Shifts the element currently at that position (if any) and any
subsequent elements to the right (adds one to their indices).

Parameters:

- `index`: index at which the specified element is to be inserted
- `element`: element to be inserted

**Since:** 1.2

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index > size()`)

## Vector.remove(int)

```java
public synchronized E remove(int index)
```

Removes the element at the specified position in this Vector.
Shifts any subsequent elements to the left (subtracts one from their
indices).  Returns the element that was removed from the Vector.

Parameters:

- `index`: the index of the element to be removed

**Returns:** element that was removed

**Since:** 1.2

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## Vector.clear()

```java
public void clear()
```

Removes all of the elements from this Vector.  The Vector will
be empty after this call returns (unless it throws an exception).

**Since:** 1.2

## Vector.containsAll(Collection<?>)

```java
public synchronized boolean containsAll(Collection<?> c)
```

Returns true if this Vector contains all of the elements in the
specified Collection.

Parameters:

- `c`: a collection whose elements will be tested for containment in this Vector

**Returns:** true if this Vector contains all of the elements in the
        specified collection

Throws:

- `NullPointerException`: if the specified collection is null

## Vector.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Appends all of the elements in the specified Collection to the end of
this Vector, in the order that they are returned by the specified
Collection's Iterator.  The behavior of this operation is undefined if
the specified Collection is modified while the operation is in progress.
(This implies that the behavior of this call is undefined if the
specified Collection is this Vector, and this Vector is nonempty.)

Parameters:

- `c`: elements to be inserted into this Vector

**Returns:** `true` if this Vector changed as a result of the call

**Since:** 1.2

Throws:

- `NullPointerException`: if the specified collection is null

## Vector.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Removes from this Vector all of its elements that are contained in the
specified Collection.

Parameters:

- `c`: a collection of elements to be removed from the Vector

**Returns:** true if this Vector changed as a result of the call

**Since:** 1.2

Throws:

- `ClassCastException`: if the types of one or more elements in this vector are incompatible with the specified collection (optional)
- `NullPointerException`: if this vector contains one or more null elements and the specified collection does not support null elements (optional), or if the specified collection is null

## Vector.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Retains only the elements in this Vector that are contained in the
specified Collection.  In other words, removes from this Vector all
of its elements that are not contained in the specified Collection.

Parameters:

- `c`: a collection of elements to be retained in this Vector (all other elements are removed)

**Returns:** true if this Vector changed as a result of the call

**Since:** 1.2

Throws:

- `ClassCastException`: if the types of one or more elements in this vector are incompatible with the specified collection (optional)
- `NullPointerException`: if this vector contains one or more null elements and the specified collection does not support null elements (optional), or if the specified collection is null

## Vector.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## Vector.addAll(int, Collection<? extends E>)

```java
public synchronized boolean addAll(int index, Collection<? extends E> c)
```

Inserts all of the elements in the specified Collection into this
Vector at the specified position.  Shifts the element currently at
that position (if any) and any subsequent elements to the right
(increases their indices).  The new elements will appear in the Vector
in the order that they are returned by the specified Collection's
iterator.

Parameters:

- `index`: index at which to insert the first element from the specified collection
- `c`: elements to be inserted into this Vector

**Returns:** `true` if this Vector changed as a result of the call

**Since:** 1.2

Throws:

- `ArrayIndexOutOfBoundsException`: if the index is out of range (`index < 0 || index > size()`)
- `NullPointerException`: if the specified collection is null

## Vector.equals(Object)

```java
public synchronized boolean equals(Object o)
```

Compares the specified Object with this Vector for equality.  Returns
true if and only if the specified Object is also a List, both Lists
have the same size, and all corresponding pairs of elements in the two
Lists are *equal*.  (Two elements `e1` and
`e2` are *equal* if `Objects.equals(e1, e2)`.)
In other words, two Lists are defined to be
equal if they contain the same elements in the same order.

Parameters:

- `o`: the Object to be compared for equality with this Vector

**Returns:** true if the specified Object is equal to this Vector

## Vector.hashCode()

```java
public synchronized int hashCode()
```

Returns the hash code value for this Vector.

## Vector.toString()

```java
public synchronized String toString()
```

Returns a string representation of this Vector, containing
the String representation of each element.

## Vector.subList(int, int)

```java
public synchronized List<E> subList(int fromIndex, int toIndex)
```

Returns a view of the portion of this List between fromIndex,
inclusive, and toIndex, exclusive.  (If fromIndex and toIndex are
equal, the returned List is empty.)  The returned List is backed by this
List, so changes in the returned List are reflected in this List, and
vice-versa.  The returned List supports all of the optional List
operations supported by this List.

This method eliminates the need for explicit range operations (of
the sort that commonly exist for arrays).  Any operation that expects
a List can be used as a range operation by operating on a subList view
instead of a whole List.  For example, the following idiom
removes a range of elements from a List:

```java
     list.subList(from, to).clear();
```

Similar idioms may be constructed for indexOf and lastIndexOf,
and all of the algorithms in the Collections class can be applied to
a subList.

The semantics of the List returned by this method become undefined if
the backing list (i.e., this List) is *structurally modified* in
any way other than via the returned List.  (Structural modifications are
those that change the size of the List, or otherwise perturb it in such
a fashion that iterations in progress may yield incorrect results.)

Parameters:

- `fromIndex`: low endpoint (inclusive) of the subList
- `toIndex`: high endpoint (exclusive) of the subList

**Returns:** a view of the specified range within this List

Throws:

- `IndexOutOfBoundsException`: if an endpoint index value is out of range `(fromIndex < 0 || toIndex > size)`
- `IllegalArgumentException`: if the endpoint indices are out of order `(fromIndex > toIndex)`

## Vector.removeRange(int, int)

```java
protected synchronized void removeRange(int fromIndex, int toIndex)
```

Removes from this list all of the elements whose index is between
`fromIndex`, inclusive, and `toIndex`, exclusive.
Shifts any succeeding elements to the left (reduces their index).
This call shortens the list by `(toIndex - fromIndex)` elements.
(If `toIndex==fromIndex`, this operation has no effect.)

## Vector.listIterator(int)

```java
public synchronized ListIterator<E> listIterator(int index)
```

Returns a list iterator over the elements in this list (in proper
sequence), starting at the specified position in the list.
The specified index indicates the first element that would be
returned by an initial call to next.
An initial call to previous would
return the element with the specified index minus one.

The returned list iterator is *fail-fast*.

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## Vector.listIterator()

```java
public synchronized ListIterator<E> listIterator()
```

Returns a list iterator over the elements in this list (in proper
sequence).

The returned list iterator is *fail-fast*.

**See also:** #listIterator(int)

## Vector.iterator()

```java
public synchronized Iterator<E> iterator()
```

Returns an iterator over the elements in this list in proper sequence.

The returned iterator is *fail-fast*.

**Returns:** an iterator over the elements in this list in proper sequence

## Vector.forEach(Consumer<? super E>)

```java
public synchronized void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)

## Vector.replaceAll(UnaryOperator<E>)

```java
public synchronized void replaceAll(UnaryOperator<E> operator)
```

Throws:

- `NullPointerException`: (inherited documentation)

## Vector.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a *late-binding*
and *fail-fast* `Spliterator` over the elements in this
list.

The `Spliterator` reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, and `Spliterator.ORDERED`.
Overriding implementations should document the reporting of additional
characteristic values.

**Returns:** a `Spliterator` over the elements in this list

**Since:** 1.8
