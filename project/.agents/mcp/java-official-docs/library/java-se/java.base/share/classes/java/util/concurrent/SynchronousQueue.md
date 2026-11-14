---
title: "SynchronousQueue class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/SynchronousQueue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SynchronousQueue class (java.util.concurrent)

```java
public class SynchronousQueue<E> extends AbstractQueue<E> implements BlockingQueue<E>, java.io.Serializable
```

A blocking queue in which each insert
operation must wait for a corresponding remove operation by another
thread, and vice versa.  A synchronous queue does not have any
internal capacity, not even a capacity of one.  You cannot
`peek` at a synchronous queue because an element is only
present when you try to remove it; you cannot insert an element
(using any method) unless another thread is trying to remove it;
you cannot iterate as there is nothing to iterate.  The
*head* of the queue is the element that the first queued
inserting thread is trying to add to the queue; if there is no such
queued thread then no element is available for removal and
`poll()` will return `null`.  For purposes of other
`Collection` methods (for example `contains`), a
`SynchronousQueue` acts as an empty collection.  This queue
does not permit `null` elements.

Synchronous queues are similar to rendezvous channels used in
CSP and Ada. They are well suited for handoff designs, in which an
object running in one thread must sync up with an object running
in another thread in order to hand it some information, event, or
task.

This class supports an optional fairness policy for ordering
waiting producer and consumer threads.  By default, this ordering
is not guaranteed. However, a queue constructed with fairness set
to `true` grants threads access in FIFO order.

This class and its iterator implement all of the *optional*
methods of the `Collection` and `Iterator` interfaces.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this queue

**Since:** 1.5

## SynchronousQueue.SynchronousQueue()

```java
public SynchronousQueue()
```

Creates a `SynchronousQueue` with nonfair access policy.

## SynchronousQueue.SynchronousQueue(boolean)

```java
public SynchronousQueue(boolean fair)
```

Creates a `SynchronousQueue` with the specified fairness policy.

Parameters:

- `fair`: if true, waiting threads contend in FIFO order for access; otherwise the order is unspecified.

## SynchronousQueue.put(E)

```java
public void put(E e) throws InterruptedException
```

Adds the specified element to this queue, waiting if necessary for
another thread to receive it.

Throws:

- `InterruptedException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## SynchronousQueue.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Inserts the specified element into this queue, waiting if necessary
up to the specified wait time for another thread to receive it.

**Returns:** `true` if successful, or `false` if the
        specified waiting time elapses before a consumer appears

Throws:

- `InterruptedException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## SynchronousQueue.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element into this queue, if another thread is
waiting to receive it.

Parameters:

- `e`: the element to add

**Returns:** `true` if the element was added to this queue, else
        `false`

Throws:

- `NullPointerException`: if the specified element is null

## SynchronousQueue.take()

```java
public E take() throws InterruptedException
```

Retrieves and removes the head of this queue, waiting if necessary
for another thread to insert it.

**Returns:** the head of this queue

Throws:

- `InterruptedException`: (inherited documentation)

## SynchronousQueue.poll(long, TimeUnit)

```java
public E poll(long timeout, TimeUnit unit) throws InterruptedException
```

Retrieves and removes the head of this queue, waiting
if necessary up to the specified wait time, for another thread
to insert it.

**Returns:** the head of this queue, or `null` if the
        specified waiting time elapses before an element is present

Throws:

- `InterruptedException`: (inherited documentation)

## SynchronousQueue.poll()

```java
public E poll()
```

Retrieves and removes the head of this queue, if another thread
is currently making an element available.

**Returns:** the head of this queue, or `null` if no
        element is available

## SynchronousQueue.isEmpty()

```java
public boolean isEmpty()
```

Always returns `true`.
A `SynchronousQueue` has no internal capacity.

**Returns:** `true`

## SynchronousQueue.size()

```java
public int size()
```

Always returns zero.
A `SynchronousQueue` has no internal capacity.

**Returns:** zero

## SynchronousQueue.remainingCapacity()

```java
public int remainingCapacity()
```

Always returns zero.
A `SynchronousQueue` has no internal capacity.

**Returns:** zero

## SynchronousQueue.clear()

```java
public void clear()
```

Does nothing.
A `SynchronousQueue` has no internal capacity.

## SynchronousQueue.contains(Object)

```java
public boolean contains(Object o)
```

Always returns `false`.
A `SynchronousQueue` has no internal capacity.

Parameters:

- `o`: the element

**Returns:** `false`

## SynchronousQueue.remove(Object)

```java
public boolean remove(Object o)
```

Always returns `false`.
A `SynchronousQueue` has no internal capacity.

Parameters:

- `o`: the element to remove

**Returns:** `false`

## SynchronousQueue.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> c)
```

Returns `false` unless the given collection is empty.
A `SynchronousQueue` has no internal capacity.

Parameters:

- `c`: the collection

**Returns:** `false` unless given collection is empty

## SynchronousQueue.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Always returns `false`.
A `SynchronousQueue` has no internal capacity.

Parameters:

- `c`: the collection

**Returns:** `false`

## SynchronousQueue.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Always returns `false`.
A `SynchronousQueue` has no internal capacity.

Parameters:

- `c`: the collection

**Returns:** `false`

## SynchronousQueue.peek()

```java
public E peek()
```

Always returns `null`.
A `SynchronousQueue` does not return elements
unless actively waited on.

**Returns:** `null`

## SynchronousQueue.iterator()

```java
public Iterator<E> iterator()
```

Returns an empty iterator in which `hasNext` always returns
`false`.

**Returns:** an empty iterator

## SynchronousQueue.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns an empty spliterator in which calls to
trySplit always return `null`.

**Returns:** an empty spliterator

**Since:** 1.8

## SynchronousQueue.toArray()

```java
public Object[] toArray()
```

## SynchronousQueue.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Sets the zeroth element of the specified array to `null`
(if the array has non-zero length) and returns it.

Parameters:

- `a`: the array

**Returns:** the specified array

Throws:

- `NullPointerException`: if the specified array is null

## SynchronousQueue.toString()

```java
public String toString()
```

Always returns `"[]"`.

**Returns:** `"[]"`

## SynchronousQueue.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## SynchronousQueue.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
