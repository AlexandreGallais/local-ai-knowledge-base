---
title: "ArrayBlockingQueue class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ArrayBlockingQueue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArrayBlockingQueue class (java.util.concurrent)

```java
public class ArrayBlockingQueue<E> extends AbstractQueue<E> implements BlockingQueue<E>, java.io.Serializable
```

A bounded blocking queue backed by an
array.  This queue orders elements FIFO (first-in-first-out).  The
*head* of the queue is that element that has been on the
queue the longest time.  The *tail* of the queue is that
element that has been on the queue the shortest time. New elements
are inserted at the tail of the queue, and the queue retrieval
operations obtain elements at the head of the queue.

This is a classic "bounded buffer", in which a
fixed-sized array holds elements inserted by producers and
extracted by consumers.  Once created, the capacity cannot be
changed.  Attempts to `put` an element into a full queue
will result in the operation blocking; attempts to `take` an
element from an empty queue will similarly block.

This class supports an optional fairness policy for ordering
waiting producer and consumer threads.  By default, this ordering
is not guaranteed. However, a queue constructed with fairness set
to `true` grants threads access in FIFO order. Fairness
generally decreases throughput but reduces variability and avoids
starvation.

This class and its iterator implement all of the *optional*
methods of the `Collection` and `Iterator` interfaces.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this queue

**Since:** 1.5

## ArrayBlockingQueue.ArrayBlockingQueue(int)

```java
public ArrayBlockingQueue(int capacity)
```

Creates an `ArrayBlockingQueue` with the given (fixed)
capacity and default access policy.

Parameters:

- `capacity`: the capacity of this queue

Throws:

- `IllegalArgumentException`: if `capacity < 1`

## ArrayBlockingQueue.ArrayBlockingQueue(int, boolean)

```java
public ArrayBlockingQueue(int capacity, boolean fair)
```

Creates an `ArrayBlockingQueue` with the given (fixed)
capacity and the specified access policy.

Parameters:

- `capacity`: the capacity of this queue
- `fair`: if `true` then queue accesses for threads blocked on insertion or removal, are processed in FIFO order; if `false` the access order is unspecified.

Throws:

- `IllegalArgumentException`: if `capacity < 1`

## ArrayBlockingQueue.ArrayBlockingQueue(int, boolean, Collection<? extends E>)

```java
public ArrayBlockingQueue(int capacity, boolean fair, Collection<? extends E> c)
```

Creates an `ArrayBlockingQueue` with the given (fixed)
capacity, the specified access policy and initially containing the
elements of the given collection,
added in traversal order of the collection's iterator.

Parameters:

- `capacity`: the capacity of this queue
- `fair`: if `true` then queue accesses for threads blocked on insertion or removal, are processed in FIFO order; if `false` the access order is unspecified.
- `c`: the collection of elements to initially contain

Throws:

- `IllegalArgumentException`: if `capacity` is less than `c.size()`, or less than 1.
- `NullPointerException`: if the specified collection or any of its elements are null

## ArrayBlockingQueue.add(E)

```java
public boolean add(E e)
```

Inserts the specified element at the tail of this queue if it is
possible to do so immediately without exceeding the queue's capacity,
returning `true` upon success and throwing an
`IllegalStateException` if this queue is full.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `IllegalStateException`: if this queue is full
- `NullPointerException`: if the specified element is null

## ArrayBlockingQueue.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element at the tail of this queue if it is
possible to do so immediately without exceeding the queue's capacity,
returning `true` upon success and `false` if this queue
is full.  This method is generally preferable to method `add`,
which can fail to insert an element only by throwing an exception.

Throws:

- `NullPointerException`: if the specified element is null

## ArrayBlockingQueue.put(E)

```java
public void put(E e) throws InterruptedException
```

Inserts the specified element at the tail of this queue, waiting
for space to become available if the queue is full.

Throws:

- `InterruptedException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ArrayBlockingQueue.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Inserts the specified element at the tail of this queue, waiting
up to the specified wait time for space to become available if
the queue is full.

Throws:

- `InterruptedException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ArrayBlockingQueue.size()

```java
public int size()
```

Returns the number of elements in this queue.

**Returns:** the number of elements in this queue

## ArrayBlockingQueue.remainingCapacity()

```java
public int remainingCapacity()
```

Returns the number of additional elements that this queue can ideally
(in the absence of memory or resource constraints) accept without
blocking. This is always equal to the initial capacity of this queue
less the current `size` of this queue.

Note that you *cannot* always tell if an attempt to insert
an element will succeed by inspecting `remainingCapacity`
because it may be the case that another thread is about to
insert or remove an element.

## ArrayBlockingQueue.remove(Object)

```java
public boolean remove(Object o)
```

Removes a single instance of the specified element from this queue,
if it is present.  More formally, removes an element `e` such
that `o.equals(e)`, if this queue contains one or more such
elements.
Returns `true` if this queue contained the specified element
(or equivalently, if this queue changed as a result of the call).

Removal of interior elements in circular array based queues
is an intrinsically slow and disruptive operation, so should
be undertaken only in exceptional circumstances, ideally
only when the queue is known not to be accessible by other
threads.

Parameters:

- `o`: element to be removed from this queue, if present

**Returns:** `true` if this queue changed as a result of the call

## ArrayBlockingQueue.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this queue contains the specified element.
More formally, returns `true` if and only if this queue contains
at least one element `e` such that `o.equals(e)`.

Parameters:

- `o`: object to be checked for containment in this queue

**Returns:** `true` if this queue contains the specified element

## ArrayBlockingQueue.toArray()

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

## ArrayBlockingQueue.toArray(T[])

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

## ArrayBlockingQueue.clear()

```java
public void clear()
```

Atomically removes all of the elements from this queue.
The queue will be empty after this call returns.

## ArrayBlockingQueue.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ArrayBlockingQueue.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ArrayBlockingQueue.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this queue in proper sequence.
The elements will be returned in order from first (head) to last (tail).

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this queue in proper sequence

## ArrayBlockingQueue.hasNext()

```java
public boolean hasNext()
```

For performance reasons, we would like not to acquire a lock in
hasNext in the common case.  To allow for this, we only access
fields (i.e. nextItem) that are not modified by update operations
triggered by queue modifications.

## ArrayBlockingQueue.spliterator()

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

## ArrayBlockingQueue.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ArrayBlockingQueue.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ArrayBlockingQueue.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ArrayBlockingQueue.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)
