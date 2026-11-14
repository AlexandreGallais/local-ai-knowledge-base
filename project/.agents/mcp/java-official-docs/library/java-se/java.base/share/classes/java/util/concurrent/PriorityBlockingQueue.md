---
title: "PriorityBlockingQueue class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/PriorityBlockingQueue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PriorityBlockingQueue class (java.util.concurrent)

```java
public class PriorityBlockingQueue<E> extends AbstractQueue<E> implements BlockingQueue<E>, java.io.Serializable
```

An unbounded blocking queue that uses
the same ordering rules as class `PriorityQueue` and supplies
blocking retrieval operations.  While this queue is logically
unbounded, attempted additions may fail due to resource exhaustion
(causing `OutOfMemoryError`). This class does not permit
`null` elements.  A priority queue relying on natural ordering also does not permit insertion of
non-comparable objects (doing so results in
`ClassCastException`).

This class and its iterator implement all of the *optional*
methods of the `Collection` and `Iterator` interfaces.
The Iterator provided in method `iterator()` and the
Spliterator provided in method `spliterator()` are *not*
guaranteed to traverse the elements of the PriorityBlockingQueue in
any particular order. If you need ordered traversal, consider using
`Arrays.sort(pq.toArray())`.  Also, method `drainTo` can
be used to *remove* some or all elements in priority order and
place them in another collection.

Operations on this class make no guarantees about the ordering
of elements with equal priority. If you need to enforce an
ordering, you can define custom classes or comparators that use a
secondary key to break ties in primary priority values.  For
example, here is a class that applies first-in-first-out
tie-breaking to comparable elements. To use it, you would insert a
`new FIFOEntry(anEntry)` instead of a plain entry object.

```java
class FIFOEntry<E extends Comparable<? super E>>
    implements Comparable<FIFOEntry<E>> {
  static final AtomicLong seq = new AtomicLong();
  final long seqNum;
  final E entry;
  public FIFOEntry(E entry) {
    seqNum = seq.getAndIncrement();
    this.entry = entry;
  }
  public E getEntry() { return entry; }
  public int compareTo(FIFOEntry<E> other) {
    int res = entry.compareTo(other.entry);
    if (res == 0 && other.entry != this.entry)
      res = (seqNum < other.seqNum ? -1 : 1);
    return res;
  }
}
```

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this queue

**Since:** 1.5

## PriorityBlockingQueue.PriorityBlockingQueue()

```java
public PriorityBlockingQueue()
```

Creates a `PriorityBlockingQueue` with the default
initial capacity (11) that orders its elements according to
their natural ordering.

## PriorityBlockingQueue.PriorityBlockingQueue(int)

```java
public PriorityBlockingQueue(int initialCapacity)
```

Creates a `PriorityBlockingQueue` with the specified
initial capacity that orders its elements according to their
natural ordering.

Parameters:

- `initialCapacity`: the initial capacity for this priority queue

Throws:

- `IllegalArgumentException`: if `initialCapacity` is less than 1

## PriorityBlockingQueue.PriorityBlockingQueue(int, Comparator<? super E>)

```java
public PriorityBlockingQueue(int initialCapacity, Comparator<? super E> comparator)
```

Creates a `PriorityBlockingQueue` with the specified initial
capacity that orders its elements according to the specified
comparator.

Parameters:

- `initialCapacity`: the initial capacity for this priority queue
- `comparator`: the comparator that will be used to order this priority queue. If `null`, the natural ordering of the elements will be used.

Throws:

- `IllegalArgumentException`: if `initialCapacity` is less than 1

## PriorityBlockingQueue.PriorityBlockingQueue(Collection<? extends E>)

```java
public PriorityBlockingQueue(Collection<? extends E> c)
```

Creates a `PriorityBlockingQueue` containing the elements
in the specified collection.  If the specified collection is a
`SortedSet` or a `PriorityBlockingQueue`, this
priority queue will be ordered according to the same ordering.
Otherwise, this priority queue will be ordered according to the
natural ordering of its elements.

Parameters:

- `c`: the collection whose elements are to be placed into this priority queue

Throws:

- `ClassCastException`: if elements of the specified collection cannot be compared to one another according to the priority queue's ordering
- `NullPointerException`: if the specified collection or any of its elements are null

## PriorityBlockingQueue.add(E)

```java
public boolean add(E e)
```

Inserts the specified element into this priority queue.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `ClassCastException`: if the specified element cannot be compared with elements currently in the priority queue according to the priority queue's ordering
- `NullPointerException`: if the specified element is null

## PriorityBlockingQueue.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element into this priority queue.
As the queue is unbounded, this method will never return `false`.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Queue.offer`)

Throws:

- `ClassCastException`: if the specified element cannot be compared with elements currently in the priority queue according to the priority queue's ordering
- `NullPointerException`: if the specified element is null

## PriorityBlockingQueue.put(E)

```java
public void put(E e)
```

Inserts the specified element into this priority queue.
As the queue is unbounded, this method will never block.

Parameters:

- `e`: the element to add

Throws:

- `ClassCastException`: if the specified element cannot be compared with elements currently in the priority queue according to the priority queue's ordering
- `NullPointerException`: if the specified element is null

## PriorityBlockingQueue.offer(E, long, TimeUnit)

```java
public boolean offer(E e, long timeout, TimeUnit unit)
```

Inserts the specified element into this priority queue.
As the queue is unbounded, this method will never block or
return `false`.

Parameters:

- `e`: the element to add
- `timeout`: This parameter is ignored as the method never blocks
- `unit`: This parameter is ignored as the method never blocks

**Returns:** `true` (as specified by
 BlockingQueue.offer)

Throws:

- `ClassCastException`: if the specified element cannot be compared with elements currently in the priority queue according to the priority queue's ordering
- `NullPointerException`: if the specified element is null

## PriorityBlockingQueue.comparator()

```java
public Comparator<? super E> comparator()
```

Returns the comparator used to order the elements in this queue,
or `null` if this queue uses the natural ordering of its elements.

**Returns:** the comparator used to order the elements in this queue,
        or `null` if this queue uses the natural
        ordering of its elements

## PriorityBlockingQueue.remainingCapacity()

```java
public int remainingCapacity()
```

Always returns `Integer.MAX_VALUE` because
a `PriorityBlockingQueue` is not capacity constrained.

**Returns:** `Integer.MAX_VALUE` always

## PriorityBlockingQueue.remove(Object)

```java
public boolean remove(Object o)
```

Removes a single instance of the specified element from this queue,
if it is present.  More formally, removes an element `e` such
that `o.equals(e)`, if this queue contains one or more such
elements.  Returns `true` if and only if this queue contained
the specified element (or equivalently, if this queue changed as a
result of the call).

Parameters:

- `o`: element to be removed from this queue, if present

**Returns:** `true` if this queue changed as a result of the call

## PriorityBlockingQueue.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this queue contains the specified element.
More formally, returns `true` if and only if this queue contains
at least one element `e` such that `o.equals(e)`.

Parameters:

- `o`: object to be checked for containment in this queue

**Returns:** `true` if this queue contains the specified element

## PriorityBlockingQueue.drainTo(Collection<? super E>)

```java
public int drainTo(Collection<? super E> c)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## PriorityBlockingQueue.drainTo(Collection<? super E>, int)

```java
public int drainTo(Collection<? super E> c, int maxElements)
```

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## PriorityBlockingQueue.clear()

```java
public void clear()
```

Atomically removes all of the elements from this queue.
The queue will be empty after this call returns.

## PriorityBlockingQueue.toArray()

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

## PriorityBlockingQueue.toArray(T[])

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

## PriorityBlockingQueue.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this queue. The
iterator does not return the elements in any particular order.

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this queue

## PriorityBlockingQueue.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a `Spliterator` over the elements in this queue.
The spliterator does not traverse elements in any particular order
(the ORDERED characteristic is not reported).

The returned spliterator is
*weakly consistent*.

The `Spliterator` reports `Spliterator.SIZED` and
`Spliterator.NONNULL`.

**Implementation note:** The `Spliterator` additionally reports `Spliterator.SUBSIZED`.

**Returns:** a `Spliterator` over the elements in this queue

**Since:** 1.8

## PriorityBlockingQueue.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## PriorityBlockingQueue.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## PriorityBlockingQueue.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Throws:

- `NullPointerException`: (inherited documentation)

## PriorityBlockingQueue.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)
