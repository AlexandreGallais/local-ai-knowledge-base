# DelayQueue class (java.util.concurrent)

```java
public class DelayQueue<E extends Delayed> extends AbstractQueue<E> implements BlockingQueue<E>
```

An unbounded {@linkplain BlockingQueue blocking queue} of {@link Delayed}
elements, in which an element generally becomes eligible for removal when its
delay has expired.

<p><a id="expired">An element is considered <em>expired</em> when its
{@code getDelay(TimeUnit.NANOSECONDS)} method would return a value less than
or equal to zero.</a>

<p><a id="head">An element is considered the <em>head</em> of the queue if it
is the element with the earliest expiration time, whether in the past or the
future, if there is such an element.</a>

<p><a id="expired-head">An element is considered the <em>expired head</em> of
the queue if it is the <em>expired</em> element with the earliest expiration
time in the past, if there is such an element.
The <em>expired head</em>, when present, is also the <em>head</em>.</a>

<p>While this class implements the {@code BlockingQueue} interface, it
intentionally violates the general contract of {@code BlockingQueue}, in that
the following methods disregard the presence of unexpired elements and only
ever remove the <em>expired head</em>:

<ul>
<li> {@link #poll()}
<li> {@link #poll(long,TimeUnit)}
<li> {@link #take()}
<li> {@link #remove()}
</ul>

<p>All other methods operate on both expired and unexpired elements.
For example, the {@link #size()} method returns the count of all elements.
Method {@link #peek()} may return the (non-null) <em>head</em> even when
{@code take()} would block waiting for that element to expire.

<p>This queue does not permit null elements.

<p>This class and its iterator implement all of the <em>optional</em>
methods of the {@link Collection} and {@link Iterator} interfaces.
The Iterator provided in method {@link #iterator()} is <em>not</em>
guaranteed to traverse the elements of the DelayQueue in any
particular order.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@since 1.5
@author Doug Lea
@param <E> the type of elements held in this queue

## DelayQueue.DelayQueue()

```java
public DelayQueue()
```

Creates a new {@code DelayQueue} that is initially empty.

## DelayQueue.DelayQueue(Collection<? extends E>)

```java
public DelayQueue(Collection<? extends E> c)
```

Creates a {@code DelayQueue} initially containing the elements of the
given collection of {@link Delayed} instances.

@param c the collection of elements to initially contain
@throws NullPointerException if the specified collection or any
        of its elements are null

## DelayQueue.add(E)

```java
public boolean add(E e)
```

Inserts the specified element into this delay queue.

@param e the element to add
@return {@code true} (as specified by {@link Collection#add})
@throws NullPointerException if the specified element is null

## DelayQueue.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element into this delay queue.

@param e the element to add
@return {@code true}
@throws NullPointerException if the specified element is null

## DelayQueue.put(E)

```java
public void put(E e)
```

Inserts the specified element into this delay queue. As the queue is
unbounded this method will never block.

@param e the element to add
@throws NullPointerException {@inheritDoc}

## DelayQueue.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit)
```

Inserts the specified element into this delay queue. As the queue is
unbounded this method will never block.

@param e the element to add
@param timeout This parameter is ignored as the method never blocks
@param unit This parameter is ignored as the method never blocks
@return {@code true}
@throws NullPointerException {@inheritDoc}

## DelayQueue.poll()

```java
public E poll()
```

Retrieves and removes the <a href="#expired-head">expired head</a> of
this queue, or returns {@code null} if this queue has no
<a href="#expired">expired elements</a>.

@return the <em>expired head</em> of this queue, or {@code null} if this
        queue has no elements with an expired delay

## DelayQueue.take()

```java
public E take() throws InterruptedException
```

Retrieves and removes the <a href="#expired-head">expired head</a> of
this queue, waiting if necessary until an
<a href="#expired">expired element</a> is available on this queue.

@return the <em>expired head</em> of this queue
@throws InterruptedException {@inheritDoc}

## DelayQueue.poll(long, TimeUnit)

```java
public E poll(long timeout, TimeUnit unit) throws InterruptedException
```

Retrieves and removes the <a href="#expired-head">expired head</a> of
this queue, waiting if necessary until an
<a href="#expired">expired element</a> is available on this queue,
or the specified wait time expires.

@return the <em>expired head</em> of this queue, or {@code null} if the
        specified waiting time elapses before an element with
        an expired delay becomes available
@throws InterruptedException {@inheritDoc}

## DelayQueue.remove()

```java
public E remove()
```

Retrieves and removes the <a href="#expired-head">expired head</a> of
this queue, or throws an exception if this queue has no
<a href="#expired">expired elements</a>.

@return the <em>expired head</em> of this queue
@throws NoSuchElementException if this queue has no elements with an
        expired delay

@since 21

## DelayQueue.peek()

```java
public E peek()
```

Retrieves, but does not remove, the <a href="#head">head</a> of this
queue, or returns {@code null} if this queue is empty.
Unlike {@code poll}, if no expired elements are available in the queue,
this method returns the element that will expire next, if one exists.

@return the <em>head</em> of this queue, or {@code null} if this
        queue is empty

## DelayQueue.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}

## DelayQueue.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}

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

Always returns {@code Integer.MAX_VALUE} because
a {@code DelayQueue} is not capacity constrained.

@return {@code Integer.MAX_VALUE}

## DelayQueue.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this queue.
The returned array elements are in no particular order.

<p>The returned array will be "safe" in that no references to it are
maintained by this queue.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

<p>This method acts as bridge between array-based and collection-based
APIs.

@return an array containing all of the elements in this queue

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

<p>If this queue fits in the specified array with room to spare
(i.e., the array has more elements than this queue), the element in
the array immediately following the end of the queue is set to
{@code null}.

<p>Like the {@link #toArray()} method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

<p>The following code can be used to dump a delay queue into a newly
allocated array of {@code Delayed}:

<pre> {@code Delayed[] a = q.toArray(new Delayed[0]);}</pre>

Note that {@code toArray(new Object[0])} is identical in function to
{@code toArray()}.

@param a the array into which the elements of the queue are to
         be stored, if it is big enough; otherwise, a new array of the
         same runtime type is allocated for this purpose
@return an array containing all of the elements in this queue
@throws ArrayStoreException if the runtime type of the specified array
        is not a supertype of the runtime type of every element in
        this queue
@throws NullPointerException if the specified array is null

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

<p>The returned iterator is
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

@return an iterator over the elements in this queue