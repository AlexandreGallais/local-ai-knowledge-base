---
title: "LinkedTransferQueue class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/LinkedTransferQueue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LinkedTransferQueue class (java.util.concurrent)

```java
public class LinkedTransferQueue<E> extends AbstractQueue<E> implements TransferQueue<E>, java.io.Serializable
```

An unbounded `TransferQueue` based on linked nodes.
This queue orders elements FIFO (first-in-first-out) with respect
to any given producer.  The *head* of the queue is that
element that has been on the queue the longest time for some
producer.  The *tail* of the queue is that element that has
been on the queue the shortest time for some producer.

Beware that, unlike in most collections, the `size` method
is *NOT* a constant-time operation. Because of the
asynchronous nature of these queues, determining the current number
of elements requires a traversal of the elements, and so may report
inaccurate results if this collection is modified during traversal.

Bulk operations that add, remove, or examine multiple elements,
such as `addAll`, `removeIf` or `forEach`,
are *not* guaranteed to be performed atomically.
For example, a `forEach` traversal concurrent with an `addAll` operation might observe only some of the added elements.

This class and its iterator implement all of the *optional*
methods of the `Collection` and `Iterator` interfaces.

Memory consistency effects: As with other concurrent
collections, actions in a thread prior to placing an object into a
`LinkedTransferQueue`
*happen-before*
actions subsequent to the access or removal of that element from
the `LinkedTransferQueue` in another thread.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this queue

**Since:** 1.7

## LinkedTransferQueue.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this queue, in
proper sequence.

The returned array will be "safe" in that no references to it are
maintained by this queue.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

This method acts as bridge between array-based and collection-based
APIs.

**Returns:** an array containing all of the elements in this queue

## LinkedTransferQueue.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this queue, in
proper sequence; the runtime type of the returned array is that of
the specified array.  If the queue fits in the specified array, it
is returned therein.  Otherwise, a new array is allocated with the
runtime type of the specified array and the size of this queue.

If this queue fits in the specified array with room to spare
(i.e., the array has more elements than this queue), the element in
the array immediately following the end of the queue is set to
`null`.

Like the `toArray()` method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

Suppose `x` is a queue known to contain only strings.
The following code can be used to dump the queue into a newly
allocated array of `String`:

```java
String[] y = x.toArray(new String[0]);
```

Note that `toArray(new Object[0])` is identical in function to
`toArray()`.

Parameters:

- `a`: the array into which the elements of the queue are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose

**Returns:** an array containing all of the elements in this queue

Throws:

- `ArrayStoreException`: if the runtime type of the specified array is not a supertype of the runtime type of every element in this queue
- `NullPointerException`: if the specified array is null

## LinkedTransferQueue.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a `Spliterator` over the elements in this queue.

The returned spliterator is
*weakly consistent*.

The `Spliterator` reports `Spliterator.CONCURRENT`,
`Spliterator.ORDERED`, and `Spliterator.NONNULL`.

**Implementation note:** The `Spliterator` implements `trySplit` to permit limited
parallelism.

**Returns:** a `Spliterator` over the elements in this queue

**Since:** 1.8

## LinkedTransferQueue.LinkedTransferQueue()

```java
public LinkedTransferQueue()
```

Creates an initially empty `LinkedTransferQueue`.

## LinkedTransferQueue.LinkedTransferQueue(Collection<? extends E>)

```java
public LinkedTransferQueue(Collection<? extends E> c)
```

Creates a `LinkedTransferQueue`
initially containing the elements of the given collection,
added in traversal order of the collection's iterator.

Parameters:

- `c`: the collection of elements to initially contain

Throws:

- `NullPointerException`: if the specified collection or any of its elements are null

## LinkedTransferQueue.put(E)

```java
public void put(E e)
```

Inserts the specified element at the tail of this queue.
As the queue is unbounded, this method will never block.

Throws:

- `NullPointerException`: if the specified element is null

## LinkedTransferQueue.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit)
```

Inserts the specified element at the tail of this queue.
As the queue is unbounded, this method will never block or
return `false`.

**Returns:** `true` (as specified by
 BlockingQueue.offer)

Throws:

- `NullPointerException`: if the specified element is null

## LinkedTransferQueue.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element at the tail of this queue.
As the queue is unbounded, this method will never return `false`.

**Returns:** `true` (as specified by `Queue.offer`)

Throws:

- `NullPointerException`: if the specified element is null

## LinkedTransferQueue.add(E)

```java
public boolean add(E e)
```

Inserts the specified element at the tail of this queue.
As the queue is unbounded, this method will never throw
`IllegalStateException` or return `false`.

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `NullPointerException`: if the specified element is null

## LinkedTransferQueue.tryTransfer(E)

```java
public boolean tryTransfer(E e)
```

Transfers the element to a waiting consumer immediately, if possible.

More precisely, transfers the specified element immediately
if there exists a consumer already waiting to receive it (in
`take` or timed poll),
otherwise returning `false` without enqueuing the element.

Throws:

- `NullPointerException`: if the specified element is null

## LinkedTransferQueue.transfer(E)

```java
public void transfer(E e) throws InterruptedException
```

Transfers the element to a consumer, waiting if necessary to do so.

More precisely, transfers the specified element immediately
if there exists a consumer already waiting to receive it (in
`take` or timed poll),
else inserts the specified element at the tail of this queue
and waits until the element is received by a consumer.

Throws:

- `NullPointerException`: if the specified element is null

## LinkedTransferQueue.tryTransfer(E, long, TimeUnit)

```java
public boolean tryTransfer(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Transfers the element to a consumer if it is possible to do so
before the timeout elapses.

More precisely, transfers the specified element immediately
if there exists a consumer already waiting to receive it (in
`take` or timed poll),
else inserts the specified element at the tail of this queue
and waits until the element is received by a consumer,
returning `false` if the specified wait time elapses
before the element can be transferred.

Throws:

- `NullPointerException`: if the specified element is null

## LinkedTransferQueue.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

Throws:

- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## LinkedTransferQueue.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

Throws:

- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## LinkedTransferQueue.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this queue in proper sequence.
The elements will be returned in order from first (head) to last (tail).

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this queue in proper sequence

## LinkedTransferQueue.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this queue contains no elements.

**Returns:** `true` if this queue contains no elements

## LinkedTransferQueue.size()

```java
public int size()
```

Returns the number of elements in this queue.  If this queue
contains more than `Integer.MAX_VALUE` elements, returns
`Integer.MAX_VALUE`.

Beware that, unlike in most collections, this method is
*NOT* a constant-time operation. Because of the
asynchronous nature of these queues, determining the current
number of elements requires an O(n) traversal.

**Returns:** the number of elements in this queue

## LinkedTransferQueue.remove(Object)

```java
public boolean remove(Object o)
```

Removes a single instance of the specified element from this queue,
if it is present.  More formally, removes an element `e` such
that `o.equals(e)`, if this queue contains one or more such
elements.
Returns `true` if this queue contained the specified element
(or equivalently, if this queue changed as a result of the call).

Parameters:

- `o`: element to be removed from this queue, if present

**Returns:** `true` if this queue changed as a result of the call

## LinkedTransferQueue.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this queue contains the specified element.
More formally, returns `true` if and only if this queue contains
at least one element `e` such that `o.equals(e)`.

Parameters:

- `o`: object to be checked for containment in this queue

**Returns:** `true` if this queue contains the specified element

## LinkedTransferQueue.remainingCapacity()

```java
public int remainingCapacity()
```

Always returns `Integer.MAX_VALUE` because a
`LinkedTransferQueue` is not capacity constrained.

**Returns:** `Integer.MAX_VALUE` (as specified by
        `BlockingQueue.remainingCapacity()`)

## LinkedTransferQueue.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## LinkedTransferQueue.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## LinkedTransferQueue.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## LinkedTransferQueue.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)
