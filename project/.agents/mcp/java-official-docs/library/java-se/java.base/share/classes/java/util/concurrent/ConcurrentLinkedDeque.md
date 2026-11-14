---
title: "ConcurrentLinkedDeque class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentLinkedDeque.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentLinkedDeque class (java.util.concurrent)

```java
public class ConcurrentLinkedDeque<E> extends AbstractCollection<E> implements Deque<E>, java.io.Serializable
```

An unbounded concurrent deque based on linked nodes.
Concurrent insertion, removal, and access operations execute safely
across multiple threads.
A `ConcurrentLinkedDeque` is an appropriate choice when
many threads will share access to a common collection.
Like most other concurrent collection implementations, this class
does not permit the use of `null` elements.

Iterators and spliterators are
*weakly consistent*.

Beware that, unlike in most collections, the `size` method
is *NOT* a constant-time operation. Because of the
asynchronous nature of these deques, determining the current number
of elements requires a traversal of the elements, and so may report
inaccurate results if this collection is modified during traversal.

Bulk operations that add, remove, or examine multiple elements,
such as `addAll`, `removeIf` or `forEach`,
are *not* guaranteed to be performed atomically.
For example, a `forEach` traversal concurrent with an `addAll` operation might observe only some of the added elements.

This class and its iterator implement all of the *optional*
methods of the `Deque` and `Iterator` interfaces.

Memory consistency effects: As with other concurrent collections,
actions in a thread prior to placing an object into a
`ConcurrentLinkedDeque`
*happen-before*
actions subsequent to the access or removal of that element from
the `ConcurrentLinkedDeque` in another thread.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this deque

**Since:** 1.7

## ConcurrentLinkedDeque.ConcurrentLinkedDeque()

```java
public ConcurrentLinkedDeque()
```

Constructs an empty deque.

## ConcurrentLinkedDeque.ConcurrentLinkedDeque(Collection<? extends E>)

```java
public ConcurrentLinkedDeque(Collection<? extends E> c)
```

Constructs a deque initially containing the elements of
the given collection, added in traversal order of the
collection's iterator.

Parameters:

- `c`: the collection of elements to initially contain

Throws:

- `NullPointerException`: if the specified collection or any of its elements are null

## ConcurrentLinkedDeque.addFirst(E)

```java
public void addFirst(E e)
```

Inserts the specified element at the front of this deque.
As the deque is unbounded, this method will never throw
`IllegalStateException`.

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.addLast(E)

```java
public void addLast(E e)
```

Inserts the specified element at the end of this deque.
As the deque is unbounded, this method will never throw
`IllegalStateException`.

This method is equivalent to `add`.

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.offerFirst(E)

```java
public boolean offerFirst(E e)
```

Inserts the specified element at the front of this deque.
As the deque is unbounded, this method will never return `false`.

**Returns:** `true` (as specified by `Deque.offerFirst`)

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.offerLast(E)

```java
public boolean offerLast(E e)
```

Inserts the specified element at the end of this deque.
As the deque is unbounded, this method will never return `false`.

This method is equivalent to `add`.

**Returns:** `true` (as specified by `Deque.offerLast`)

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.getFirst()

```java
public E getFirst()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentLinkedDeque.getLast()

```java
public E getLast()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentLinkedDeque.removeFirst()

```java
public E removeFirst()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentLinkedDeque.removeLast()

```java
public E removeLast()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentLinkedDeque.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element at the tail of this deque.
As the deque is unbounded, this method will never return `false`.

**Returns:** `true` (as specified by `Queue.offer`)

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.add(E)

```java
public boolean add(E e)
```

Inserts the specified element at the tail of this deque.
As the deque is unbounded, this method will never throw
`IllegalStateException` or return `false`.

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.remove()

```java
public E remove()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentLinkedDeque.pop()

```java
public E pop()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentLinkedDeque.element()

```java
public E element()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## ConcurrentLinkedDeque.push(E)

```java
public void push(E e)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ConcurrentLinkedDeque.removeFirstOccurrence(Object)

```java
public boolean removeFirstOccurrence(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if the deque contained the specified element

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.removeLastOccurrence(Object)

```java
public boolean removeLastOccurrence(Object o)
```

Removes the last occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the last element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if the deque contained the specified element

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this deque contains the specified element.
More formally, returns `true` if and only if this deque contains
at least one element `e` such that `o.equals(e)`.

Parameters:

- `o`: element whose presence in this deque is to be tested

**Returns:** `true` if this deque contains the specified element

## ConcurrentLinkedDeque.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this collection contains no elements.

**Returns:** `true` if this collection contains no elements

## ConcurrentLinkedDeque.size()

```java
public int size()
```

Returns the number of elements in this deque.  If this deque
contains more than `Integer.MAX_VALUE` elements, it
returns `Integer.MAX_VALUE`.

Beware that, unlike in most collections, this method is
*NOT* a constant-time operation. Because of the
asynchronous nature of these deques, determining the current
number of elements requires traversing them all to count them.
Additionally, it is possible for the size to change during
execution of this method, in which case the returned result
will be inaccurate. Thus, this method is typically not very
useful in concurrent applications.

**Returns:** the number of elements in this deque

## ConcurrentLinkedDeque.remove(Object)

```java
public boolean remove(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

This method is equivalent to `removeFirstOccurrence(Object)`.

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if the deque contained the specified element

Throws:

- `NullPointerException`: if the specified element is null

## ConcurrentLinkedDeque.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Appends all of the elements in the specified collection to the end of
this deque, in the order that they are returned by the specified
collection's iterator.  Attempts to `addAll` of a deque to
itself result in `IllegalArgumentException`.

Parameters:

- `c`: the elements to be inserted into this deque

**Returns:** `true` if this deque changed as a result of the call

Throws:

- `NullPointerException`: if the specified collection or any of its elements are null
- `IllegalArgumentException`: if the collection is this deque

## ConcurrentLinkedDeque.clear()

```java
public void clear()
```

Removes all of the elements from this deque.

## ConcurrentLinkedDeque.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this deque, in
proper sequence (from first to last element).

The returned array will be "safe" in that no references to it are
maintained by this deque.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

This method acts as bridge between array-based and collection-based
APIs.

**Returns:** an array containing all of the elements in this deque

## ConcurrentLinkedDeque.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this deque,
in proper sequence (from first to last element); the runtime
type of the returned array is that of the specified array.  If
the deque fits in the specified array, it is returned therein.
Otherwise, a new array is allocated with the runtime type of
the specified array and the size of this deque.

If this deque fits in the specified array with room to spare
(i.e., the array has more elements than this deque), the element in
the array immediately following the end of the deque is set to
`null`.

Like the `toArray()` method, this method acts as
bridge between array-based and collection-based APIs.  Further,
this method allows precise control over the runtime type of the
output array, and may, under certain circumstances, be used to
save allocation costs.

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

## ConcurrentLinkedDeque.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this deque in proper sequence.
The elements will be returned in order from first (head) to last (tail).

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this deque in proper sequence

## ConcurrentLinkedDeque.descendingIterator()

```java
public Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this deque in reverse
sequential order.  The elements will be returned in order from
last (tail) to first (head).

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this deque in reverse order

## ConcurrentLinkedDeque.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a `Spliterator` over the elements in this deque.

The returned spliterator is
*weakly consistent*.

The `Spliterator` reports `Spliterator.CONCURRENT`,
`Spliterator.ORDERED`, and `Spliterator.NONNULL`.

**Implementation note:** The `Spliterator` implements `trySplit` to permit limited
parallelism.

**Returns:** a `Spliterator` over the elements in this deque

**Since:** 1.8

## ConcurrentLinkedDeque.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ConcurrentLinkedDeque.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ConcurrentLinkedDeque.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ConcurrentLinkedDeque.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)
