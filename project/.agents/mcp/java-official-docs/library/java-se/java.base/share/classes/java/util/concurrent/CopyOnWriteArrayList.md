---
title: "CopyOnWriteArrayList class (java.util.concurrent) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CopyOnWriteArrayList.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CopyOnWriteArrayList class (java.util.concurrent)

```java
public class CopyOnWriteArrayList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

A thread-safe variant of `java.util.ArrayList` in which all mutative
operations (`add`, `set`, and so on) are implemented by
making a fresh copy of the underlying array.

This is ordinarily too costly, but may be *more* efficient
than alternatives when traversal operations vastly outnumber
mutations, and is useful when you cannot or don't want to
synchronize traversals, yet need to preclude interference among
concurrent threads.  The "snapshot" style iterator method uses a
reference to the state of the array at the point that the iterator
was created. This array never changes during the lifetime of the
iterator, so interference is impossible and the iterator is
guaranteed not to throw `ConcurrentModificationException`.
The iterator will not reflect additions, removals, or changes to
the list since the iterator was created.  Element-changing
operations on iterators themselves (`remove`, `set`, and
`add`) are not supported. These methods throw
`UnsupportedOperationException`.

All elements are permitted, including `null`.

Memory consistency effects: As with other concurrent
collections, actions in a thread prior to placing an object into a
`CopyOnWriteArrayList`
*happen-before*
actions subsequent to the access or removal of that element from
the `CopyOnWriteArrayList` in another thread.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this list

**Since:** 1.5

## CopyOnWriteArrayList.CopyOnWriteArrayList()

```java
public CopyOnWriteArrayList()
```

Creates an empty list.

## CopyOnWriteArrayList.CopyOnWriteArrayList(Collection<? extends E>)

```java
public CopyOnWriteArrayList(Collection<? extends E> c)
```

Creates a list containing the elements of the specified
collection, in the order they are returned by the collection's
iterator.

Parameters:

- `c`: the collection of initially held elements

Throws:

- `NullPointerException`: if the specified collection is null

## CopyOnWriteArrayList.CopyOnWriteArrayList(E[])

```java
public CopyOnWriteArrayList(E[] toCopyIn)
```

Creates a list holding a copy of the given array.

Parameters:

- `toCopyIn`: the array (a copy of this array is used as the internal array)

Throws:

- `NullPointerException`: if the specified array is null

## CopyOnWriteArrayList.size()

```java
public int size()
```

Returns the number of elements in this list.

**Returns:** the number of elements in this list

## CopyOnWriteArrayList.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this list contains no elements.

**Returns:** `true` if this list contains no elements

## CopyOnWriteArrayList.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this list contains the specified element.
More formally, returns `true` if and only if this list contains
at least one element `e` such that `Objects.equals(o, e)`.

Parameters:

- `o`: element whose presence in this list is to be tested

**Returns:** `true` if this list contains the specified element

## CopyOnWriteArrayList.indexOf(Object)

```java
public int indexOf(Object o)
```

(inherited documentation)

## CopyOnWriteArrayList.indexOf(E, int)

```java
public int indexOf(E e, int index)
```

Returns the index of the first occurrence of the specified element in
this list, searching forwards from `index`, or returns -1 if
the element is not found.
More formally, returns the lowest index `i` such that
`i >= index && Objects.equals(get(i), e)`,
or -1 if there is no such index.

Parameters:

- `e`: element to search for
- `index`: index to start searching from

**Returns:** the index of the first occurrence of the element in
        this list at position `index` or later in the list;
        `-1` if the element is not found.

Throws:

- `IndexOutOfBoundsException`: if the specified index is negative

## CopyOnWriteArrayList.lastIndexOf(Object)

```java
public int lastIndexOf(Object o)
```

(inherited documentation)

## CopyOnWriteArrayList.lastIndexOf(E, int)

```java
public int lastIndexOf(E e, int index)
```

Returns the index of the last occurrence of the specified element in
this list, searching backwards from `index`, or returns -1 if
the element is not found.
More formally, returns the highest index `i` such that
`i <= index && Objects.equals(get(i), e)`,
or -1 if there is no such index.

Parameters:

- `e`: element to search for
- `index`: index to start searching backwards from

**Returns:** the index of the last occurrence of the element at position
        less than or equal to `index` in this list;
        -1 if the element is not found.

Throws:

- `IndexOutOfBoundsException`: if the specified index is greater than or equal to the current size of this list

## CopyOnWriteArrayList.clone()

```java
public Object clone()
```

Returns a shallow copy of this list.  (The elements themselves
are not copied.)

**Returns:** a clone of this list

## CopyOnWriteArrayList.toArray()

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

**Returns:** an array containing all the elements in this list

## CopyOnWriteArrayList.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this list in
proper sequence (from first to last element); the runtime type of
the returned array is that of the specified array.  If the list fits
in the specified array, it is returned therein.  Otherwise, a new
array is allocated with the runtime type of the specified array and
the size of this list.

If this list fits in the specified array with room to spare
(i.e., the array has more elements than this list), the element in
the array immediately following the end of the list is set to
`null`.  (This is useful in determining the length of this
list *only* if the caller knows that this list does not contain
any null elements.)

Like the `toArray()` method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

Suppose `x` is a list known to contain only strings.
The following code can be used to dump the list into a newly
allocated array of `String`:

```java
String[] y = x.toArray(new String[0]);
```

Note that `toArray(new Object[0])` is identical in function to
`toArray()`.

Parameters:

- `a`: the array into which the elements of the list are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose.

**Returns:** an array containing all the elements in this list

Throws:

- `ArrayStoreException`: if the runtime type of the specified array is not a supertype of the runtime type of every element in this list
- `NullPointerException`: if the specified array is null

## CopyOnWriteArrayList.get(int)

```java
public E get(int index)
```

(inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## CopyOnWriteArrayList.getFirst()

```java
public E getFirst()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## CopyOnWriteArrayList.getLast()

```java
public E getLast()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## CopyOnWriteArrayList.set(int, E)

```java
public E set(int index, E element)
```

Replaces the element at the specified position in this list with the
specified element.

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## CopyOnWriteArrayList.add(E)

```java
public boolean add(E e)
```

Appends the specified element to the end of this list.

Parameters:

- `e`: element to be appended to this list

**Returns:** `true` (as specified by `Collection.add`)

## CopyOnWriteArrayList.add(int, E)

```java
public void add(int index, E element)
```

Inserts the specified element at the specified position in this
list. Shifts the element currently at that position (if any) and
any subsequent elements to the right (adds one to their indices).

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## CopyOnWriteArrayList.addFirst(E)

```java
public void addFirst(E e)
```

(inherited documentation)

**Since:** 21

## CopyOnWriteArrayList.addLast(E)

```java
public void addLast(E e)
```

(inherited documentation)

**Since:** 21

## CopyOnWriteArrayList.remove(int)

```java
public E remove(int index)
```

Removes the element at the specified position in this list.
Shifts any subsequent elements to the left (subtracts one from their
indices).  Returns the element that was removed from the list.

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## CopyOnWriteArrayList.removeFirst()

```java
public E removeFirst()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## CopyOnWriteArrayList.removeLast()

```java
public E removeLast()
```

(inherited documentation)

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## CopyOnWriteArrayList.remove(Object)

```java
public boolean remove(Object o)
```

Removes the first occurrence of the specified element from this list,
if it is present.  If this list does not contain the element, it is
unchanged.  More formally, removes the element with the lowest index
`i` such that `Objects.equals(o, get(i))`
(if such an element exists).  Returns `true` if this list
contained the specified element (or equivalently, if this list
changed as a result of the call).

Parameters:

- `o`: element to be removed from this list, if present

**Returns:** `true` if this list contained the specified element

## CopyOnWriteArrayList.addIfAbsent(E)

```java
public boolean addIfAbsent(E e)
```

Appends the element, if not present.

Parameters:

- `e`: element to be added to this list, if absent

**Returns:** `true` if the element was added

## CopyOnWriteArrayList.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> c)
```

Returns `true` if this list contains all of the elements of the
specified collection.

Parameters:

- `c`: collection to be checked for containment in this list

**Returns:** `true` if this list contains all of the elements of the
        specified collection

**See also:** #contains(Object)

Throws:

- `NullPointerException`: if the specified collection is null

## CopyOnWriteArrayList.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Removes from this list all of its elements that are contained in
the specified collection. This is a particularly expensive operation
in this class because of the need for an internal temporary array.

Parameters:

- `c`: collection containing elements to be removed from this list

**Returns:** `true` if this list changed as a result of the call

**See also:** #remove(Object)

Throws:

- `ClassCastException`: if the class of an element of this list is incompatible with the specified collection (optional)
- `NullPointerException`: if this list contains a null element and the specified collection does not permit null elements (optional), or if the specified collection is null

## CopyOnWriteArrayList.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Retains only the elements in this list that are contained in the
specified collection.  In other words, removes from this list all of
its elements that are not contained in the specified collection.

Parameters:

- `c`: collection containing elements to be retained in this list

**Returns:** `true` if this list changed as a result of the call

**See also:** #remove(Object)

Throws:

- `ClassCastException`: if the class of an element of this list is incompatible with the specified collection (optional)
- `NullPointerException`: if this list contains a null element and the specified collection does not permit null elements (optional), or if the specified collection is null

## CopyOnWriteArrayList.addAllAbsent(Collection<? extends E>)

```java
public int addAllAbsent(Collection<? extends E> c)
```

Appends all of the elements in the specified collection that
are not already contained in this list, to the end of
this list, in the order that they are returned by the
specified collection's iterator.

Parameters:

- `c`: collection containing elements to be added to this list

**Returns:** the number of elements added

**See also:** #addIfAbsent(Object)

Throws:

- `NullPointerException`: if the specified collection is null

## CopyOnWriteArrayList.clear()

```java
public void clear()
```

Removes all of the elements from this list.
The list will be empty after this call returns.

## CopyOnWriteArrayList.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Appends all of the elements in the specified collection to the end
of this list, in the order that they are returned by the specified
collection's iterator.

Parameters:

- `c`: collection containing elements to be added to this list

**Returns:** `true` if this list changed as a result of the call

**See also:** #add(Object)

Throws:

- `NullPointerException`: if the specified collection is null

## CopyOnWriteArrayList.addAll(int, Collection<? extends E>)

```java
public boolean addAll(int index, Collection<? extends E> c)
```

Inserts all of the elements in the specified collection into this
list, starting at the specified position.  Shifts the element
currently at that position (if any) and any subsequent elements to
the right (increases their indices).  The new elements will appear
in this list in the order that they are returned by the
specified collection's iterator.

Parameters:

- `index`: index at which to insert the first element from the specified collection
- `c`: collection containing elements to be added to this list

**Returns:** `true` if this list changed as a result of the call

**See also:** #add(int,Object)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)
- `NullPointerException`: if the specified collection is null

## CopyOnWriteArrayList.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)
