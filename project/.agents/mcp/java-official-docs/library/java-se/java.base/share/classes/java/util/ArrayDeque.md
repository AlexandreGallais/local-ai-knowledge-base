---
title: "ArrayDeque class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ArrayDeque.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArrayDeque class (java.util)

```java
public class ArrayDeque<E> extends AbstractCollection<E> implements Deque<E>, Cloneable, Serializable
```

Resizable-array implementation of the `Deque` interface.  Array
deques have no capacity restrictions; they grow as necessary to support
usage.  They are not thread-safe; in the absence of external
synchronization, they do not support concurrent access by multiple threads.
Null elements are prohibited.  This class is likely to be faster than
`Stack` when used as a stack, and faster than `LinkedList`
when used as a queue.

Most `ArrayDeque` operations run in amortized constant time.
Exceptions include
remove,
removeFirstOccurrence,
removeLastOccurrence,
contains,
iterator.remove(),
and the bulk operations, all of which run in linear time.

The iterators returned by this class's iterator
method are *fail-fast*: If the deque is modified at any time after
the iterator is created, in any way except through the iterator's own
`remove` method, the iterator will generally throw a `ConcurrentModificationException`.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than risking
arbitrary, non-deterministic behavior at an undetermined time in the
future.

Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw `ConcurrentModificationException` on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness: *the fail-fast behavior of iterators
should be used only to detect bugs.*

This class and its iterator implement all of the *optional* methods of the
`Collection`, `SequencedCollection`, and `Iterator` interfaces.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this deque

**Since:** 1.6

## ArrayDeque.ArrayDeque()

```java
public ArrayDeque()
```

Constructs an empty array deque with an initial capacity
sufficient to hold 16 elements.

## ArrayDeque.ArrayDeque(int)

```java
public ArrayDeque(int numElements)
```

Constructs an empty array deque with an initial capacity
sufficient to hold the specified number of elements.

Parameters:

- `numElements`: lower bound on initial capacity of the deque

## ArrayDeque.ArrayDeque(Collection<? extends E>)

```java
public ArrayDeque(Collection<? extends E> c)
```

Constructs a deque containing the elements of the specified
collection, in the order they are returned by the collection's
iterator.  (The first element returned by the collection's
iterator becomes the first element, or *front* of the
deque.)

Parameters:

- `c`: the collection whose elements are to be placed into the deque

Throws:

- `NullPointerException`: if the specified collection is null

## ArrayDeque.addFirst(E)

```java
public void addFirst(E e)
```

Inserts the specified element at the front of this deque.

Parameters:

- `e`: the element to add

Throws:

- `NullPointerException`: if the specified element is null

## ArrayDeque.addLast(E)

```java
public void addLast(E e)
```

Inserts the specified element at the end of this deque.

This method is equivalent to `add`.

Parameters:

- `e`: the element to add

Throws:

- `NullPointerException`: if the specified element is null

## ArrayDeque.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Adds all of the elements in the specified collection at the end
of this deque, as if by calling `addLast` on each one,
in the order that they are returned by the collection's iterator.

Parameters:

- `c`: the elements to be inserted into this deque

**Returns:** `true` if this deque changed as a result of the call

Throws:

- `NullPointerException`: if the specified collection or any of its elements are null

## ArrayDeque.offerFirst(E)

```java
public boolean offerFirst(E e)
```

Inserts the specified element at the front of this deque.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Deque.offerFirst`)

Throws:

- `NullPointerException`: if the specified element is null

## ArrayDeque.offerLast(E)

```java
public boolean offerLast(E e)
```

Inserts the specified element at the end of this deque.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Deque.offerLast`)

Throws:

- `NullPointerException`: if the specified element is null

## ArrayDeque.removeFirst()

```java
public E removeFirst()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayDeque.removeLast()

```java
public E removeLast()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayDeque.getFirst()

```java
public E getFirst()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayDeque.getLast()

```java
public E getLast()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayDeque.removeFirstOccurrence(Object)

```java
public boolean removeFirstOccurrence(Object o)
```

Removes the first occurrence of the specified element in this
deque (when traversing the deque from head to tail).
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if the deque contained the specified element

## ArrayDeque.removeLastOccurrence(Object)

```java
public boolean removeLastOccurrence(Object o)
```

Removes the last occurrence of the specified element in this
deque (when traversing the deque from head to tail).
If the deque does not contain the element, it is unchanged.
More formally, removes the last element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if the deque contained the specified element

## ArrayDeque.add(E)

```java
public boolean add(E e)
```

Inserts the specified element at the end of this deque.

This method is equivalent to `addLast`.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `NullPointerException`: if the specified element is null

## ArrayDeque.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element at the end of this deque.

This method is equivalent to `offerLast`.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Queue.offer`)

Throws:

- `NullPointerException`: if the specified element is null

## ArrayDeque.remove()

```java
public E remove()
```

Retrieves and removes the head of the queue represented by this deque.

This method differs from poll() only in that it
throws an exception if this deque is empty.

This method is equivalent to `removeFirst`.

**Returns:** the head of the queue represented by this deque

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayDeque.poll()

```java
public E poll()
```

Retrieves and removes the head of the queue represented by this deque
(in other words, the first element of this deque), or returns
`null` if this deque is empty.

This method is equivalent to `pollFirst`.

**Returns:** the head of the queue represented by this deque, or
        `null` if this deque is empty

## ArrayDeque.element()

```java
public E element()
```

Retrieves, but does not remove, the head of the queue represented by
this deque.  This method differs from peek only in
that it throws an exception if this deque is empty.

This method is equivalent to `getFirst`.

**Returns:** the head of the queue represented by this deque

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayDeque.peek()

```java
public E peek()
```

Retrieves, but does not remove, the head of the queue represented by
this deque, or returns `null` if this deque is empty.

This method is equivalent to `peekFirst`.

**Returns:** the head of the queue represented by this deque, or
        `null` if this deque is empty

## ArrayDeque.push(E)

```java
public void push(E e)
```

Pushes an element onto the stack represented by this deque.  In other
words, inserts the element at the front of this deque.

This method is equivalent to `addFirst`.

Parameters:

- `e`: the element to push

Throws:

- `NullPointerException`: if the specified element is null

## ArrayDeque.pop()

```java
public E pop()
```

Pops an element from the stack represented by this deque.  In other
words, removes and returns the first element of this deque.

This method is equivalent to `removeFirst()`.

**Returns:** the element at the front of this deque (which is the top
        of the stack represented by this deque)

Throws:

- `NoSuchElementException`: (inherited documentation)

## ArrayDeque.size()

```java
public int size()
```

Returns the number of elements in this deque.

**Returns:** the number of elements in this deque

## ArrayDeque.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this deque contains no elements.

**Returns:** `true` if this deque contains no elements

## ArrayDeque.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this deque.  The elements
will be ordered from first (head) to last (tail).  This is the same
order that elements would be dequeued (via successive calls to
`remove` or popped (via successive calls to `pop`).

**Returns:** an iterator over the elements in this deque

## ArrayDeque.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a *late-binding*
and *fail-fast* `Spliterator` over the elements in this
deque.

The `Spliterator` reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.NONNULL`.  Overriding implementations should document
the reporting of additional characteristic values.

**Returns:** a `Spliterator` over the elements in this deque

**Since:** 1.8

## ArrayDeque.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ArrayDeque.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ArrayDeque.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ArrayDeque.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ArrayDeque.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this deque contains the specified element.
More formally, returns `true` if and only if this deque contains
at least one element `e` such that `o.equals(e)`.

Parameters:

- `o`: object to be checked for containment in this deque

**Returns:** `true` if this deque contains the specified element

## ArrayDeque.remove(Object)

```java
public boolean remove(Object o)
```

Removes a single instance of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

This method is equivalent to `removeFirstOccurrence(Object)`.

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if this deque contained the specified element

## ArrayDeque.clear()

```java
public void clear()
```

Removes all of the elements from this deque.
The deque will be empty after this call returns.

## ArrayDeque.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this deque
in proper sequence (from first to last element).

The returned array will be "safe" in that no references to it are
maintained by this deque.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

This method acts as bridge between array-based and collection-based
APIs.

**Returns:** an array containing all of the elements in this deque

## ArrayDeque.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this deque in
proper sequence (from first to last element); the runtime type of the
returned array is that of the specified array.  If the deque fits in
the specified array, it is returned therein.  Otherwise, a new array
is allocated with the runtime type of the specified array and the
size of this deque.

If this deque fits in the specified array with room to spare
(i.e., the array has more elements than this deque), the element in
the array immediately following the end of the deque is set to
`null`.

Like the `toArray()` method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

Suppose `x` is a deque known to contain only strings.
The following code can be used to dump the deque into a newly
allocated array of `String`:

```java
String[] y = x.toArray(new String[0]);
```

Note that `toArray(new Object[0])` is identical in function to
`toArray()`.

Parameters:

- `a`: the array into which the elements of the deque are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose

**Returns:** an array containing all of the elements in this deque

Throws:

- `ArrayStoreException`: if the runtime type of the specified array is not a supertype of the runtime type of every element in this deque
- `NullPointerException`: if the specified array is null

## ArrayDeque.clone()

```java
public ArrayDeque<E> clone()
```

Returns a copy of this deque.

**Returns:** a copy of this deque
