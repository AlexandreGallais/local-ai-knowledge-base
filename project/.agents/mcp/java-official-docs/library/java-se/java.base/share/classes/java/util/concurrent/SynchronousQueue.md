# SynchronousQueue class (java.util.concurrent)

```java
public class SynchronousQueue<E> extends AbstractQueue<E> implements BlockingQueue<E>, java.io.Serializable
```

A {@linkplain BlockingQueue blocking queue} in which each insert
operation must wait for a corresponding remove operation by another
thread, and vice versa.  A synchronous queue does not have any
internal capacity, not even a capacity of one.  You cannot
{@code peek} at a synchronous queue because an element is only
present when you try to remove it; you cannot insert an element
(using any method) unless another thread is trying to remove it;
you cannot iterate as there is nothing to iterate.  The
<em>head</em> of the queue is the element that the first queued
inserting thread is trying to add to the queue; if there is no such
queued thread then no element is available for removal and
{@code poll()} will return {@code null}.  For purposes of other
{@code Collection} methods (for example {@code contains}), a
{@code SynchronousQueue} acts as an empty collection.  This queue
does not permit {@code null} elements.

<p>Synchronous queues are similar to rendezvous channels used in
CSP and Ada. They are well suited for handoff designs, in which an
object running in one thread must sync up with an object running
in another thread in order to hand it some information, event, or
task.

<p>This class supports an optional fairness policy for ordering
waiting producer and consumer threads.  By default, this ordering
is not guaranteed. However, a queue constructed with fairness set
to {@code true} grants threads access in FIFO order.

<p>This class and its iterator implement all of the <em>optional</em>
methods of the {@link Collection} and {@link Iterator} interfaces.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@since 1.5
@author Doug Lea and Bill Scherer and Michael Scott
@param <E> the type of elements held in this queue

## SynchronousQueue.SynchronousQueue()

```java
public SynchronousQueue()
```

Creates a {@code SynchronousQueue} with nonfair access policy.

## SynchronousQueue.SynchronousQueue(boolean)

```java
public SynchronousQueue(boolean fair)
```

Creates a {@code SynchronousQueue} with the specified fairness policy.

@param fair if true, waiting threads contend in FIFO order for
       access; otherwise the order is unspecified.

## SynchronousQueue.put(E)

```java
public void put(E e) throws InterruptedException
```

Adds the specified element to this queue, waiting if necessary for
another thread to receive it.

@throws InterruptedException {@inheritDoc}
@throws NullPointerException {@inheritDoc}

## SynchronousQueue.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Inserts the specified element into this queue, waiting if necessary
up to the specified wait time for another thread to receive it.

@return {@code true} if successful, or {@code false} if the
        specified waiting time elapses before a consumer appears
@throws InterruptedException {@inheritDoc}
@throws NullPointerException {@inheritDoc}

## SynchronousQueue.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element into this queue, if another thread is
waiting to receive it.

@param e the element to add
@return {@code true} if the element was added to this queue, else
        {@code false}
@throws NullPointerException if the specified element is null

## SynchronousQueue.take()

```java
public E take() throws InterruptedException
```

Retrieves and removes the head of this queue, waiting if necessary
for another thread to insert it.

@return the head of this queue
@throws InterruptedException {@inheritDoc}

## SynchronousQueue.poll(long, TimeUnit)

```java
public E poll(long timeout, TimeUnit unit) throws InterruptedException
```

Retrieves and removes the head of this queue, waiting
if necessary up to the specified wait time, for another thread
to insert it.

@return the head of this queue, or {@code null} if the
        specified waiting time elapses before an element is present
@throws InterruptedException {@inheritDoc}

## SynchronousQueue.poll()

```java
public E poll()
```

Retrieves and removes the head of this queue, if another thread
is currently making an element available.

@return the head of this queue, or {@code null} if no
        element is available

## SynchronousQueue.isEmpty()

```java
public boolean isEmpty()
```

Always returns {@code true}.
A {@code SynchronousQueue} has no internal capacity.

@return {@code true}

## SynchronousQueue.size()

```java
public int size()
```

Always returns zero.
A {@code SynchronousQueue} has no internal capacity.

@return zero

## SynchronousQueue.remainingCapacity()

```java
public int remainingCapacity()
```

Always returns zero.
A {@code SynchronousQueue} has no internal capacity.

@return zero

## SynchronousQueue.clear()

```java
public void clear()
```

Does nothing.
A {@code SynchronousQueue} has no internal capacity.

## SynchronousQueue.contains(Object)

```java
public boolean contains(Object o)
```

Always returns {@code false}.
A {@code SynchronousQueue} has no internal capacity.

@param o the element
@return {@code false}

## SynchronousQueue.remove(Object)

```java
public boolean remove(Object o)
```

Always returns {@code false}.
A {@code SynchronousQueue} has no internal capacity.

@param o the element to remove
@return {@code false}

## SynchronousQueue.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> c)
```

Returns {@code false} unless the given collection is empty.
A {@code SynchronousQueue} has no internal capacity.

@param c the collection
@return {@code false} unless given collection is empty

## SynchronousQueue.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Always returns {@code false}.
A {@code SynchronousQueue} has no internal capacity.

@param c the collection
@return {@code false}

## SynchronousQueue.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Always returns {@code false}.
A {@code SynchronousQueue} has no internal capacity.

@param c the collection
@return {@code false}

## SynchronousQueue.peek()

```java
public E peek()
```

Always returns {@code null}.
A {@code SynchronousQueue} does not return elements
unless actively waited on.

@return {@code null}

## SynchronousQueue.iterator()

```java
public Iterator<E> iterator()
```

Returns an empty iterator in which {@code hasNext} always returns
{@code false}.

@return an empty iterator

## SynchronousQueue.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns an empty spliterator in which calls to
{@link Spliterator#trySplit() trySplit} always return {@code null}.

@return an empty spliterator
@since 1.8

## SynchronousQueue.toArray()

```java
public Object[] toArray()
```

{@return a zero-length array}

## SynchronousQueue.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Sets the zeroth element of the specified array to {@code null}
(if the array has non-zero length) and returns it.

@param a the array
@return the specified array
@throws NullPointerException if the specified array is null

## SynchronousQueue.toString()

```java
public String toString()
```

Always returns {@code "[]"}.
@return {@code "[]"}

## SynchronousQueue.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}

## SynchronousQueue.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}