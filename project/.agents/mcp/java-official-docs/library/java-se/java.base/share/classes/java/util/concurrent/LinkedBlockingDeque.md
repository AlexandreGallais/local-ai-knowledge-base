---
title: "LinkedBlockingDeque class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/LinkedBlockingDeque.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LinkedBlockingDeque class (java.util.concurrent)

```java
public class LinkedBlockingDeque<E> extends AbstractQueue<E> implements BlockingDeque<E>, java.io.Serializable
```

An optionally-bounded blocking deque based on
linked nodes.

The optional capacity bound constructor argument serves as a
way to prevent excessive expansion. The capacity, if unspecified,
is equal to `Integer.MAX_VALUE`.  Linked nodes are
dynamically created upon each insertion unless this would bring the
deque above capacity.

Most operations run in constant time (ignoring time spent
blocking).  Exceptions include remove,
removeFirstOccurrence, removeLastOccurrence, contains, and the bulk operations, all of which run in linear
time.

This class and its iterator implement all of the *optional*
methods of the `Collection` and `Iterator` interfaces.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this deque

**Since:** 1.6

## LinkedBlockingDeque.LinkedBlockingDeque()

```java
public LinkedBlockingDeque()
```

Creates a `LinkedBlockingDeque` with a capacity of
`Integer.MAX_VALUE`.

## LinkedBlockingDeque.LinkedBlockingDeque(int)

```java
public LinkedBlockingDeque(int capacity)
```

Creates a `LinkedBlockingDeque` with the given (fixed) capacity.

Parameters:

- `capacity`: the capacity of this deque

Throws:

- `IllegalArgumentException`: if `capacity` is less than 1

## LinkedBlockingDeque.LinkedBlockingDeque(Collection<? extends E>)

```java
public LinkedBlockingDeque(Collection<? extends E> c)
```

Creates a `LinkedBlockingDeque` with a capacity of
`Integer.MAX_VALUE`, initially containing the elements of
the given collection, added in traversal order of the
collection's iterator.

Parameters:

- `c`: the collection of elements to initially contain

Throws:

- `NullPointerException`: if the specified collection or any of its elements are null

## LinkedBlockingDeque.addFirst(E)

```java
public void addFirst(E e)
```

Throws:

- `IllegalStateException`: if this deque is full
- `NullPointerException`: (inherited documentation)

## LinkedBlockingDeque.addLast(E)

```java
public void addLast(E e)
```

Throws:

- `IllegalStateException`: if this deque is full
- `NullPointerException`: (inherited documentation)

## LinkedBlockingDeque.offerFirst(E)

```java
public boolean offerFirst(E e)
```

Throws:

- `NullPointerException`: (inherited documentation)

## LinkedBlockingDeque.offerLast(E)

```java
public boolean offerLast(E e)
```

Throws:

- `NullPointerException`: (inherited documentation)

## LinkedBlockingDeque.putFirst(E)

```java
public void putFirst(E e) throws InterruptedException
```

Throws:

- `NullPointerException`: (inherited documentation)
- `InterruptedException`: (inherited documentation)

## LinkedBlockingDeque.putLast(E)

```java
public void putLast(E e) throws InterruptedException
```

Throws:

- `NullPointerException`: (inherited documentation)
- `InterruptedException`: (inherited documentation)

## LinkedBlockingDeque.offerFirst(E, long, TimeUnit)

```java
public boolean offerFirst(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Throws:

- `NullPointerException`: (inherited documentation)
- `InterruptedException`: (inherited documentation)

## LinkedBlockingDeque.offerLast(E, long, TimeUnit)

```java
public boolean offerLast(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Throws:

- `NullPointerException`: (inherited documentation)
- `InterruptedException`: (inherited documentation)

## LinkedBlockingDeque.removeFirst()

```java
public E removeFirst()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedBlockingDeque.removeLast()

```java
public E removeLast()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedBlockingDeque.getFirst()

```java
public E getFirst()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedBlockingDeque.getLast()

```java
public E getLast()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedBlockingDeque.add(E)

```java
public boolean add(E e)
```

Inserts the specified element at the end of this deque unless it would
violate capacity restrictions.  When using a capacity-restricted deque,
it is generally preferable to use method offer.

This method is equivalent to `addLast`.

Throws:

- `IllegalStateException`: if this deque is full
- `NullPointerException`: if the specified element is null

## LinkedBlockingDeque.offer(E)

```java
public boolean offer(E e)
```

(inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `NullPointerException`: if the specified element is null

## LinkedBlockingDeque.put(E)

```java
public void put(E e) throws InterruptedException
```

Throws:

- `NullPointerException`: (inherited documentation)
- `InterruptedException`: (inherited documentation)

## LinkedBlockingDeque.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Throws:

- `NullPointerException`: (inherited documentation)
- `InterruptedException`: (inherited documentation)

## LinkedBlockingDeque.remove()

```java
public E remove()
```

Retrieves and removes the head of the queue represented by this deque.
This method differs from poll() only in that it throws an
exception if this deque is empty.

This method is equivalent to removeFirst.

**Returns:** the head of the queue represented by this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## LinkedBlockingDeque.poll()

```java
public E poll()
```

(inherited documentation)

**Returns:** (inherited documentation)

## LinkedBlockingDeque.element()

```java
public E element()
```

Retrieves, but does not remove, the head of the queue represented by
this deque.  This method differs from peek() only in that
it throws an exception if this deque is empty.

This method is equivalent to getFirst.

**Returns:** the head of the queue represented by this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## LinkedBlockingDeque.peek()

```java
public E peek()
```

(inherited documentation)

**Returns:** (inherited documentation)

## LinkedBlockingDeque.remainingCapacity()

```java
public int remainingCapacity()
```

Returns the number of additional elements that this deque can ideally
(in the absence of memory or resource constraints) accept without
blocking. This is always equal to the initial capacity of this deque
less the current `size` of this deque.

Note that you *cannot* always tell if an attempt to insert
an element will succeed by inspecting `remainingCapacity`
because it may be the case that another thread is about to
insert or remove an element.

## LinkedBlockingDeque.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## LinkedBlockingDeque.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## LinkedBlockingDeque.push(E)

```java
public void push(E e)
```

Throws:

- `IllegalStateException`: if this deque is full
- `NullPointerException`: (inherited documentation)

## LinkedBlockingDeque.pop()

```java
public E pop()
```

Throws:

- `NoSuchElementException`: (inherited documentation)

## LinkedBlockingDeque.remove(Object)

```java
public boolean remove(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

This method is equivalent to
removeFirstOccurrence.

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if this deque changed as a result of the call

## LinkedBlockingDeque.size()

```java
public int size()
```

Returns the number of elements in this deque.

**Returns:** the number of elements in this deque

## LinkedBlockingDeque.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this deque contains the specified element.
More formally, returns `true` if and only if this deque contains
at least one element `e` such that `o.equals(e)`.

Parameters:

- `o`: object to be checked for containment in this deque

**Returns:** `true` if this deque contains the specified element

## LinkedBlockingDeque.addAll(Collection<? extends E>)

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

**See also:** #add(Object)

Throws:

- `NullPointerException`: if the specified collection or any of its elements are null
- `IllegalArgumentException`: if the collection is this deque
- `IllegalStateException`: if this deque is full

## LinkedBlockingDeque.toArray()

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

## LinkedBlockingDeque.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this deque, in
proper sequence; the runtime type of the returned array is that of
the specified array.  If the deque fits in the specified array, it
is returned therein.  Otherwise, a new array is allocated with the
runtime type of the specified array and the size of this deque.

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

## LinkedBlockingDeque.clear()

```java
public void clear()
```

Atomically removes all of the elements from this deque.
The deque will be empty after this call returns.

## LinkedBlockingDeque.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this deque in proper sequence.
The elements will be returned in order from first (head) to last (tail).

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this deque in proper sequence

## LinkedBlockingDeque.descendingIterator()

```java
public Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this deque in reverse
sequential order.  The elements will be returned in order from
last (tail) to first (head).

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this deque in reverse order

## LinkedBlockingDeque.spliterator()

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

## LinkedBlockingDeque.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)

## LinkedBlockingDeque.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## LinkedBlockingDeque.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## LinkedBlockingDeque.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)
