---
title: "LinkedList class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/LinkedList.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LinkedList class (java.util)

```java
public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, java.io.Serializable
```

Doubly-linked list implementation of the `List` and `Deque`
interfaces.  Implements all optional list operations, and permits all
elements (including `null`).

All of the operations perform as could be expected for a doubly-linked
list.  Operations that index into the list will traverse the list from
the beginning or the end, whichever is closer to the specified index.

**Note that this implementation is not synchronized.**
If multiple threads access a linked list concurrently, and at least
one of the threads modifies the list structurally, it *must* be
synchronized externally.  (A structural modification is any operation
that adds or deletes one or more elements; merely setting the value of
an element is not a structural modification.)  This is typically
accomplished by synchronizing on some object that naturally
encapsulates the list.

If no such object exists, the list should be "wrapped" using the
Collections.synchronizedList
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the list:

```java
  List list = Collections.synchronizedList(new LinkedList(...));
```

The iterators returned by this class's `iterator` and
`listIterator` methods are *fail-fast*: if the list is
structurally modified at any time after the iterator is created, in
any way except through the Iterator's own `remove` or
`add` methods, the iterator will throw a `ConcurrentModificationException`.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than
risking arbitrary, non-deterministic behavior at an undetermined
time in the future.

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

- `<E>`: the type of elements held in this collection

**See also:** List

**See also:** ArrayList

**Since:** 1.2

## LinkedList.LinkedList()

```java
public LinkedList()
```

Constructs an empty list.

## LinkedList.LinkedList(Collection<? extends E>)

```java
public LinkedList(Collection<? extends E> c)
```

Constructs a list containing the elements of the specified
collection, in the order they are returned by the collection's
iterator.

Parameters:

- `c`: the collection whose elements are to be placed into this list

Throws:

- `NullPointerException`: if the specified collection is null

## LinkedList.getFirst()

```java
public E getFirst()
```

Returns the first element in this list.

**Returns:** the first element in this list

Throws:

- `NoSuchElementException`: if this list is empty

## LinkedList.getLast()

```java
public E getLast()
```

Returns the last element in this list.

**Returns:** the last element in this list

Throws:

- `NoSuchElementException`: if this list is empty

## LinkedList.removeFirst()

```java
public E removeFirst()
```

Removes and returns the first element from this list.

**Returns:** the first element from this list

Throws:

- `NoSuchElementException`: if this list is empty

## LinkedList.removeLast()

```java
public E removeLast()
```

Removes and returns the last element from this list.

**Returns:** the last element from this list

Throws:

- `NoSuchElementException`: if this list is empty

## LinkedList.addFirst(E)

```java
public void addFirst(E e)
```

Inserts the specified element at the beginning of this list.

Parameters:

- `e`: the element to add

## LinkedList.addLast(E)

```java
public void addLast(E e)
```

Appends the specified element to the end of this list.

This method is equivalent to `add`.

Parameters:

- `e`: the element to add

## LinkedList.contains(Object)

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

## LinkedList.size()

```java
public int size()
```

Returns the number of elements in this list.

**Returns:** the number of elements in this list

## LinkedList.add(E)

```java
public boolean add(E e)
```

Appends the specified element to the end of this list.

This method is equivalent to `addLast`.

Parameters:

- `e`: element to be appended to this list

**Returns:** `true` (as specified by `Collection.add`)

## LinkedList.remove(Object)

```java
public boolean remove(Object o)
```

Removes the first occurrence of the specified element from this list,
if it is present.  If this list does not contain the element, it is
unchanged.  More formally, removes the element with the lowest index
`i` such that
`Objects.equals(o, get(i))`
(if such an element exists).  Returns `true` if this list
contained the specified element (or equivalently, if this list
changed as a result of the call).

Parameters:

- `o`: element to be removed from this list, if present

**Returns:** `true` if this list contained the specified element

## LinkedList.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Appends all of the elements in the specified collection to the end of
this list, in the order that they are returned by the specified
collection's iterator.  The behavior of this operation is undefined if
the specified collection is modified while the operation is in
progress.  (Note that this will occur if the specified collection is
this list, and it's nonempty.)

Parameters:

- `c`: collection containing elements to be added to this list

**Returns:** `true` if this list changed as a result of the call

Throws:

- `NullPointerException`: if the specified collection is null

## LinkedList.addAll(int, Collection<? extends E>)

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

## LinkedList.clear()

```java
public void clear()
```

Removes all of the elements from this list.
The list will be empty after this call returns.

## LinkedList.get(int)

```java
public E get(int index)
```

Returns the element at the specified position in this list.

Parameters:

- `index`: index of the element to return

**Returns:** the element at the specified position in this list

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## LinkedList.set(int, E)

```java
public E set(int index, E element)
```

Replaces the element at the specified position in this list with the
specified element.

Parameters:

- `index`: index of the element to replace
- `element`: element to be stored at the specified position

**Returns:** the element previously at the specified position

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## LinkedList.add(int, E)

```java
public void add(int index, E element)
```

Inserts the specified element at the specified position in this list.
Shifts the element currently at that position (if any) and any
subsequent elements to the right (adds one to their indices).

Parameters:

- `index`: index at which the specified element is to be inserted
- `element`: element to be inserted

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## LinkedList.remove(int)

```java
public E remove(int index)
```

Removes the element at the specified position in this list.  Shifts any
subsequent elements to the left (subtracts one from their indices).
Returns the element that was removed from the list.

Parameters:

- `index`: the index of the element to be removed

**Returns:** the element previously at the specified position

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## LinkedList.indexOf(Object)

```java
public int indexOf(Object o)
```

Returns the index of the first occurrence of the specified element
in this list, or -1 if this list does not contain the element.
More formally, returns the lowest index `i` such that
`Objects.equals(o, get(i))`,
or -1 if there is no such index.

Parameters:

- `o`: element to search for

**Returns:** the index of the first occurrence of the specified element in
        this list, or -1 if this list does not contain the element

## LinkedList.lastIndexOf(Object)

```java
public int lastIndexOf(Object o)
```

Returns the index of the last occurrence of the specified element
in this list, or -1 if this list does not contain the element.
More formally, returns the highest index `i` such that
`Objects.equals(o, get(i))`,
or -1 if there is no such index.

Parameters:

- `o`: element to search for

**Returns:** the index of the last occurrence of the specified element in
        this list, or -1 if this list does not contain the element

## LinkedList.peek()

```java
public E peek()
```

Retrieves, but does not remove, the head (first element) of this list.

**Returns:** the head of this list, or `null` if this list is empty

**Since:** 1.5

## LinkedList.element()

```java
public E element()
```

Retrieves, but does not remove, the head (first element) of this list.

**Returns:** the head of this list

**Since:** 1.5

Throws:

- `NoSuchElementException`: if this list is empty

## LinkedList.poll()

```java
public E poll()
```

Retrieves and removes the head (first element) of this list.

**Returns:** the head of this list, or `null` if this list is empty

**Since:** 1.5

## LinkedList.remove()

```java
public E remove()
```

Retrieves and removes the head (first element) of this list.

**Returns:** the head of this list

**Since:** 1.5

Throws:

- `NoSuchElementException`: if this list is empty

## LinkedList.offer(E)

```java
public boolean offer(E e)
```

Adds the specified element as the tail (last element) of this list.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Queue.offer`)

**Since:** 1.5

## LinkedList.offerFirst(E)

```java
public boolean offerFirst(E e)
```

Inserts the specified element at the front of this list.

Parameters:

- `e`: the element to insert

**Returns:** `true` (as specified by `Deque.offerFirst`)

**Since:** 1.6

## LinkedList.offerLast(E)

```java
public boolean offerLast(E e)
```

Inserts the specified element at the end of this list.

Parameters:

- `e`: the element to insert

**Returns:** `true` (as specified by `Deque.offerLast`)

**Since:** 1.6

## LinkedList.peekFirst()

```java
public E peekFirst()
```

Retrieves, but does not remove, the first element of this list,
or returns `null` if this list is empty.

**Returns:** the first element of this list, or `null`
        if this list is empty

**Since:** 1.6

## LinkedList.peekLast()

```java
public E peekLast()
```

Retrieves, but does not remove, the last element of this list,
or returns `null` if this list is empty.

**Returns:** the last element of this list, or `null`
        if this list is empty

**Since:** 1.6

## LinkedList.pollFirst()

```java
public E pollFirst()
```

Retrieves and removes the first element of this list,
or returns `null` if this list is empty.

**Returns:** the first element of this list, or `null` if
    this list is empty

**Since:** 1.6

## LinkedList.pollLast()

```java
public E pollLast()
```

Retrieves and removes the last element of this list,
or returns `null` if this list is empty.

**Returns:** the last element of this list, or `null` if
    this list is empty

**Since:** 1.6

## LinkedList.push(E)

```java
public void push(E e)
```

Pushes an element onto the stack represented by this list.  In other
words, inserts the element at the front of this list.

This method is equivalent to `addFirst`.

Parameters:

- `e`: the element to push

**Since:** 1.6

## LinkedList.pop()

```java
public E pop()
```

Pops an element from the stack represented by this list.  In other
words, removes and returns the first element of this list.

This method is equivalent to `removeFirst()`.

**Returns:** the element at the front of this list (which is the top
        of the stack represented by this list)

**Since:** 1.6

Throws:

- `NoSuchElementException`: if this list is empty

## LinkedList.removeFirstOccurrence(Object)

```java
public boolean removeFirstOccurrence(Object o)
```

Removes the first occurrence of the specified element in this
list (when traversing the list from head to tail).  If the list
does not contain the element, it is unchanged.

Parameters:

- `o`: element to be removed from this list, if present

**Returns:** `true` if the list contained the specified element

**Since:** 1.6

## LinkedList.removeLastOccurrence(Object)

```java
public boolean removeLastOccurrence(Object o)
```

Removes the last occurrence of the specified element in this
list (when traversing the list from head to tail).  If the list
does not contain the element, it is unchanged.

Parameters:

- `o`: element to be removed from this list, if present

**Returns:** `true` if the list contained the specified element

**Since:** 1.6
