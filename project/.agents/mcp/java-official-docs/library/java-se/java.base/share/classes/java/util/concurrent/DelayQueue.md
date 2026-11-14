---
title: "DelayQueue class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/DelayQueue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DelayQueue class (java.util.concurrent)

```java
public class DelayQueue<E extends Delayed> extends AbstractQueue<E> implements BlockingQueue<E>
```

An unbounded blocking queue of `Delayed`
elements, in which an element generally becomes eligible for removal when its
delay has expired.

An element is considered *expired* when its
`getDelay(TimeUnit.NANOSECONDS)` method would return a value less than
or equal to zero.

An element is considered the *head* of the queue if it
is the element with the earliest expiration time, whether in the past or the
future, if there is such an element.

An element is considered the *expired head* of
the queue if it is the *expired* element with the earliest expiration
time in the past, if there is such an element.
The *expired head*, when present, is also the *head*.

While this class implements the `BlockingQueue` interface, it
intentionally violates the general contract of `BlockingQueue`, in that
the following methods disregard the presence of unexpired elements and only
ever remove the *expired head*:

-  `poll()`

-  `poll(long,TimeUnit)`

-  `take()`

-  `remove()`

All other methods operate on both expired and unexpired elements.
For example, the `size()` method returns the count of all elements.
Method `peek()` may return the (non-null) *head* even when
`take()` would block waiting for that element to expire.

This queue does not permit null elements.

This class and its iterator implement all of the *optional*
methods of the `Collection` and `Iterator` interfaces.
The Iterator provided in method `iterator()` is *not*
guaranteed to traverse the elements of the DelayQueue in any
particular order.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this queue

**Since:** 1.5

## DelayQueue.DelayQueue()

```java
public DelayQueue()
```

Creates a new `DelayQueue` that is initially empty.

## DelayQueue.DelayQueue(Collection<? extends E>)

```java
public DelayQueue(Collection<? extends E> c)
```

Creates a `DelayQueue` initially containing the elements of the
given collection of `Delayed` instances.

Parameters:

- `c`: the collection of elements to initially contain

Throws:

- `NullPointerException`: if the specified collection or any of its elements are null

## DelayQueue.add(E)

```java
public boolean add(E e)
```

Inserts the specified element into this delay queue.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `NullPointerException`: if the specified element is null

## DelayQueue.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element into this delay queue.

Parameters:

- `e`: the element to add

**Returns:** `true`

Throws:

- `NullPointerException`: if the specified element is null

## DelayQueue.put(E)

```java
public void put(E e)
```

Inserts the specified element into this delay queue. As the queue is
unbounded this method will never block.

Parameters:

- `e`: the element to add

Throws:

- `NullPointerException`: (inherited documentation)

## DelayQueue.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit)
```

Inserts the specified element into this delay queue. As the queue is
unbounded this method will never block.

Parameters:

- `e`: the element to add
- `timeout`: This parameter is ignored as the method never blocks
- `unit`: This parameter is ignored as the method never blocks

**Returns:** `true`

Throws:

- `NullPointerException`: (inherited documentation)

## DelayQueue.poll()

```java
public E poll()
```

Retrieves and removes the expired head of
this queue, or returns `null` if this queue has no
expired elements.

**Returns:** the *expired head* of this queue, or `null` if this
        queue has no elements with an expired delay

## DelayQueue.take()

```java
public E take() throws InterruptedException
```

Retrieves and removes the expired head of
this queue, waiting if necessary until an
expired element is available on this queue.

**Returns:** the *expired head* of this queue

Throws:

- `InterruptedException`: (inherited documentation)

## DelayQueue.poll(long, TimeUnit)

```java
public E poll(long timeout, TimeUnit unit) throws InterruptedException
```

Retrieves and removes the expired head of
this queue, waiting if necessary until an
expired element is available on this queue,
or the specified wait time expires.

**Returns:** the *expired head* of this queue, or `null` if the
        specified waiting time elapses before an element with
        an expired delay becomes available

Throws:

- `InterruptedException`: (inherited documentation)

## DelayQueue.remove()

```java
public E remove()
```

Retrieves and removes the expired head of
this queue, or throws an exception if this queue has no
expired elements.

**Returns:** the *expired head* of this queue

**Since:** 21

Throws:

- `NoSuchElementException`: if this queue has no elements with an expired delay

## DelayQueue.peek()

```java
public E peek()
```

Retrieves, but does not remove, the head of this
queue, or returns `null` if this queue is empty.
Unlike `poll`, if no expired elements are available in the queue,
this method returns the element that will expire next, if one exists.

**Returns:** the *head* of this queue, or `null` if this
        queue is empty

## DelayQueue.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## DelayQueue.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## DelayQueue.clear()

```java
public void clear()
```

Atomically removes all of the elements from this delay queue.
The queue will be empty after this call returns.
Elements with an unexpired delay are not waited for; they are
simply discarded from the queue.

## DelayQueue.remainingCapacity()

```java
public int remainingCapacity()
```

Always returns `Integer.MAX_VALUE` because
a `DelayQueue` is not capacity constrained.

**Returns:** `Integer.MAX_VALUE`

## DelayQueue.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this queue.
The returned array elements are in no particular order.

The returned array will be "safe" in that no references to it are
maintained by this queue.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

This method acts as bridge between array-based and collection-based
APIs.

**Returns:** an array containing all of the elements in this queue

## DelayQueue.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this queue; the
runtime type of the returned array is that of the specified array.
The returned array elements are in no particular order.
If the queue fits in the specified array, it is returned therein.
Otherwise, a new array is allocated with the runtime type of the
specified array and the size of this queue.

If this queue fits in the specified array with room to spare
(i.e., the array has more elements than this queue), the element in
the array immediately following the end of the queue is set to
`null`.

Like the `toArray()` method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

The following code can be used to dump a delay queue into a newly
allocated array of `Delayed`:

```java
Delayed[] a = q.toArray(new Delayed[0]);
```

Note that `toArray(new Object[0])` is identical in function to
`toArray()`.

Parameters:

- `a`: the array into which the elements of the queue are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose

**Returns:** an array containing all of the elements in this queue

Throws:

- `ArrayStoreException`: if the runtime type of the specified array is not a supertype of the runtime type of every element in this queue
- `NullPointerException`: if the specified array is null

## DelayQueue.remove(Object)

```java
public boolean remove(Object o)
```

Removes a single instance of the specified element from this
queue, if it is present, whether or not it has expired.

## DelayQueue.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over all the elements (both expired and
unexpired) in this queue. The iterator does not return the
elements in any particular order.

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this queue
