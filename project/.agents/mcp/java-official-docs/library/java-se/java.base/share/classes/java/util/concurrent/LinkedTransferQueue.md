# LinkedTransferQueue class (java.util.concurrent)

```java
public class LinkedTransferQueue<E> extends AbstractQueue<E> implements TransferQueue<E>, java.io.Serializable
```

An unbounded {@link TransferQueue} based on linked nodes.
This queue orders elements FIFO (first-in-first-out) with respect
to any given producer.  The <em>head</em> of the queue is that
element that has been on the queue the longest time for some
producer.  The <em>tail</em> of the queue is that element that has
been on the queue the shortest time for some producer.

<p>Beware that, unlike in most collections, the {@code size} method
is <em>NOT</em> a constant-time operation. Because of the
asynchronous nature of these queues, determining the current number
of elements requires a traversal of the elements, and so may report
inaccurate results if this collection is modified during traversal.

<p>Bulk operations that add, remove, or examine multiple elements,
such as {@link #addAll}, {@link #removeIf} or {@link #forEach},
are <em>not</em> guaranteed to be performed atomically.
For example, a {@code forEach} traversal concurrent with an {@code
addAll} operation might observe only some of the added elements.

<p>This class and its iterator implement all of the <em>optional</em>
methods of the {@link Collection} and {@link Iterator} interfaces.

<p>Memory consistency effects: As with other concurrent
collections, actions in a thread prior to placing an object into a
{@code LinkedTransferQueue}
<a href="package-summary.html#MemoryVisibility"><i>happen-before</i></a>
actions subsequent to the access or removal of that element from
the {@code LinkedTransferQueue} in another thread.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@since 1.7
@author Doug Lea
@param <E> the type of elements held in this queue

## LinkedTransferQueue.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this queue, in
proper sequence.

<p>The returned array will be "safe" in that no references to it are
maintained by this queue.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

<p>This method acts as bridge between array-based and collection-based
APIs.

@return an array containing all of the elements in this queue

## LinkedTransferQueue.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this queue, in
proper sequence; the runtime type of the returned array is that of
the specified array.  If the queue fits in the specified array, it
is returned therein.  Otherwise, a new array is allocated with the
runtime type of the specified array and the size of this queue.

<p>If this queue fits in the specified array with room to spare
(i.e., the array has more elements than this queue), the element in
the array immediately following the end of the queue is set to
{@code null}.

<p>Like the {@link #toArray()} method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

<p>Suppose {@code x} is a queue known to contain only strings.
The following code can be used to dump the queue into a newly
allocated array of {@code String}:

<pre> {@code String[] y = x.toArray(new String[0]);}</pre>

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

## LinkedTransferQueue.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a {@link Spliterator} over the elements in this queue.

<p>The returned spliterator is
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>The {@code Spliterator} reports {@link Spliterator#CONCURRENT},
{@link Spliterator#ORDERED}, and {@link Spliterator#NONNULL}.

@implNote
The {@code Spliterator} implements {@code trySplit} to permit limited
parallelism.

@return a {@code Spliterator} over the elements in this queue
@since 1.8

## LinkedTransferQueue.LinkedTransferQueue()

```java
public LinkedTransferQueue()
```

Creates an initially empty {@code LinkedTransferQueue}.

## LinkedTransferQueue.LinkedTransferQueue(Collection<? extends E>)

```java
public LinkedTransferQueue(Collection<? extends E> c)
```

Creates a {@code LinkedTransferQueue}
initially containing the elements of the given collection,
added in traversal order of the collection's iterator.

@param c the collection of elements to initially contain
@throws NullPointerException if the specified collection or any
        of its elements are null

## LinkedTransferQueue.put(E)

```java
public void put(E e)
```

Inserts the specified element at the tail of this queue.
As the queue is unbounded, this method will never block.

@throws NullPointerException if the specified element is null

## LinkedTransferQueue.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit)
```

Inserts the specified element at the tail of this queue.
As the queue is unbounded, this method will never block or
return {@code false}.

@return {@code true} (as specified by
 {@link BlockingQueue#offer(Object,long,TimeUnit) BlockingQueue.offer})
@throws NullPointerException if the specified element is null

## LinkedTransferQueue.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element at the tail of this queue.
As the queue is unbounded, this method will never return {@code false}.

@return {@code true} (as specified by {@link Queue#offer})
@throws NullPointerException if the specified element is null

## LinkedTransferQueue.add(E)

```java
public boolean add(E e)
```

Inserts the specified element at the tail of this queue.
As the queue is unbounded, this method will never throw
{@link IllegalStateException} or return {@code false}.

@return {@code true} (as specified by {@link Collection#add})
@throws NullPointerException if the specified element is null

## LinkedTransferQueue.tryTransfer(E)

```java
public boolean tryTransfer(E e)
```

Transfers the element to a waiting consumer immediately, if possible.

<p>More precisely, transfers the specified element immediately
if there exists a consumer already waiting to receive it (in
{@link #take} or timed {@link #poll(long,TimeUnit) poll}),
otherwise returning {@code false} without enqueuing the element.

@throws NullPointerException if the specified element is null

## LinkedTransferQueue.transfer(E)

```java
public void transfer(E e) throws InterruptedException
```

Transfers the element to a consumer, waiting if necessary to do so.

<p>More precisely, transfers the specified element immediately
if there exists a consumer already waiting to receive it (in
{@link #take} or timed {@link #poll(long,TimeUnit) poll}),
else inserts the specified element at the tail of this queue
and waits until the element is received by a consumer.

@throws NullPointerException if the specified element is null

## LinkedTransferQueue.tryTransfer(E, long, TimeUnit)

```java
public boolean tryTransfer(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Transfers the element to a consumer if it is possible to do so
before the timeout elapses.

<p>More precisely, transfers the specified element immediately
if there exists a consumer already waiting to receive it (in
{@link #take} or timed {@link #poll(long,TimeUnit) poll}),
else inserts the specified element at the tail of this queue
and waits until the element is received by a consumer,
returning {@code false} if the specified wait time elapses
before the element can be transferred.

@throws NullPointerException if the specified element is null

## LinkedTransferQueue.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

@throws NullPointerException     {@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## LinkedTransferQueue.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

@throws NullPointerException     {@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## LinkedTransferQueue.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this queue in proper sequence.
The elements will be returned in order from first (head) to last (tail).

<p>The returned iterator is
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

@return an iterator over the elements in this queue in proper sequence

## LinkedTransferQueue.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this queue contains no elements.

@return {@code true} if this queue contains no elements

## LinkedTransferQueue.size()

```java
public int size()
```

Returns the number of elements in this queue.  If this queue
contains more than {@code Integer.MAX_VALUE} elements, returns
{@code Integer.MAX_VALUE}.

<p>Beware that, unlike in most collections, this method is
<em>NOT</em> a constant-time operation. Because of the
asynchronous nature of these queues, determining the current
number of elements requires an O(n) traversal.

@return the number of elements in this queue

## LinkedTransferQueue.remove(Object)

```java
public boolean remove(Object o)
```

Removes a single instance of the specified element from this queue,
if it is present.  More formally, removes an element {@code e} such
that {@code o.equals(e)}, if this queue contains one or more such
elements.
Returns {@code true} if this queue contained the specified element
(or equivalently, if this queue changed as a result of the call).

@param o element to be removed from this queue, if present
@return {@code true} if this queue changed as a result of the call

## LinkedTransferQueue.contains(Object)

```java
public boolean contains(Object o)
```

Returns {@code true} if this queue contains the specified element.
More formally, returns {@code true} if and only if this queue contains
at least one element {@code e} such that {@code o.equals(e)}.

@param o object to be checked for containment in this queue
@return {@code true} if this queue contains the specified element

## LinkedTransferQueue.remainingCapacity()

```java
public int remainingCapacity()
```

Always returns {@code Integer.MAX_VALUE} because a
{@code LinkedTransferQueue} is not capacity constrained.

@return {@code Integer.MAX_VALUE} (as specified by
        {@link BlockingQueue#remainingCapacity()})

## LinkedTransferQueue.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

@throws NullPointerException {@inheritDoc}

## LinkedTransferQueue.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

@throws NullPointerException {@inheritDoc}

## LinkedTransferQueue.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

@throws NullPointerException {@inheritDoc}

## LinkedTransferQueue.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

@throws NullPointerException {@inheritDoc}