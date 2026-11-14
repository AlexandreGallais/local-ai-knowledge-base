# ArrayDeque class (java.util)

```java
public class ArrayDeque<E> extends AbstractCollection<E> implements Deque<E>, Cloneable, Serializable
```

Resizable-array implementation of the {@link Deque} interface.  Array
deques have no capacity restrictions; they grow as necessary to support
usage.  They are not thread-safe; in the absence of external
synchronization, they do not support concurrent access by multiple threads.
Null elements are prohibited.  This class is likely to be faster than
{@link Stack} when used as a stack, and faster than {@link LinkedList}
when used as a queue.

<p>Most {@code ArrayDeque} operations run in amortized constant time.
Exceptions include
{@link #remove(Object) remove},
{@link #removeFirstOccurrence removeFirstOccurrence},
{@link #removeLastOccurrence removeLastOccurrence},
{@link #contains contains},
{@link #iterator iterator.remove()},
and the bulk operations, all of which run in linear time.

<p>The iterators returned by this class's {@link #iterator() iterator}
method are <em>fail-fast</em>: If the deque is modified at any time after
the iterator is created, in any way except through the iterator's own
{@code remove} method, the iterator will generally throw a {@link
ConcurrentModificationException}.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than risking
arbitrary, non-deterministic behavior at an undetermined time in the
future.

<p>Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw {@code ConcurrentModificationException} on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness: <i>the fail-fast behavior of iterators
should be used only to detect bugs.</i>

<p>This class and its iterator implement all of the <em>optional</em> methods of the
{@link Collection}, {@link SequencedCollection}, and {@link Iterator} interfaces.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@author  Josh Bloch and Doug Lea
@param <E> the type of elements held in this deque
@since   1.6

## ArrayDeque.ArrayDeque()

```java
public ArrayDeque()
```

Constructs an empty array deque with an initial capacity
sufficient to hold 16 elements.

## ArrayDeque.ArrayDeque(int)

```java
public ArrayDeque(int numElements)
```

Constructs an empty array deque with an initial capacity
sufficient to hold the specified number of elements.

@param numElements lower bound on initial capacity of the deque

## ArrayDeque.ArrayDeque(Collection<? extends E>)

```java
public ArrayDeque(Collection<? extends E> c)
```

Constructs a deque containing the elements of the specified
collection, in the order they are returned by the collection's
iterator.  (The first element returned by the collection's
iterator becomes the first element, or <i>front</i> of the
deque.)

@param c the collection whose elements are to be placed into the deque
@throws NullPointerException if the specified collection is null

## ArrayDeque.addFirst(E)

```java
public void addFirst(E e)
```

Inserts the specified element at the front of this deque.

@param e the element to add
@throws NullPointerException if the specified element is null

## ArrayDeque.addLast(E)

```java
public void addLast(E e)
```

Inserts the specified element at the end of this deque.

<p>This method is equivalent to {@link #add}.

@param e the element to add
@throws NullPointerException if the specified element is null

## ArrayDeque.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Adds all of the elements in the specified collection at the end
of this deque, as if by calling {@link #addLast} on each one,
in the order that they are returned by the collection's iterator.

@param c the elements to be inserted into this deque
@return {@code true} if this deque changed as a result of the call
@throws NullPointerException if the specified collection or any
        of its elements are null

## ArrayDeque.offerFirst(E)

```java
public boolean offerFirst(E e)
```

Inserts the specified element at the front of this deque.

@param e the element to add
@return {@code true} (as specified by {@link Deque#offerFirst})
@throws NullPointerException if the specified element is null

## ArrayDeque.offerLast(E)

```java
public boolean offerLast(E e)
```

Inserts the specified element at the end of this deque.

@param e the element to add
@return {@code true} (as specified by {@link Deque#offerLast})
@throws NullPointerException if the specified element is null

## ArrayDeque.removeFirst()

```java
public E removeFirst()
```

@throws NoSuchElementException {@inheritDoc}

## ArrayDeque.removeLast()

```java
public E removeLast()
```

@throws NoSuchElementException {@inheritDoc}

## ArrayDeque.getFirst()

```java
public E getFirst()
```

@throws NoSuchElementException {@inheritDoc}

## ArrayDeque.getLast()

```java
public E getLast()
```

@throws NoSuchElementException {@inheritDoc}

## ArrayDeque.removeFirstOccurrence(Object)

```java
public boolean removeFirstOccurrence(Object o)
```

Removes the first occurrence of the specified element in this
deque (when traversing the deque from head to tail).
If the deque does not contain the element, it is unchanged.
More formally, removes the first element {@code e} such that
{@code o.equals(e)} (if such an element exists).
Returns {@code true} if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

@param o element to be removed from this deque, if present
@return {@code true} if the deque contained the specified element

## ArrayDeque.removeLastOccurrence(Object)

```java
public boolean removeLastOccurrence(Object o)
```

Removes the last occurrence of the specified element in this
deque (when traversing the deque from head to tail).
If the deque does not contain the element, it is unchanged.
More formally, removes the last element {@code e} such that
{@code o.equals(e)} (if such an element exists).
Returns {@code true} if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

@param o element to be removed from this deque, if present
@return {@code true} if the deque contained the specified element

## ArrayDeque.add(E)

```java
public boolean add(E e)
```

Inserts the specified element at the end of this deque.

<p>This method is equivalent to {@link #addLast}.

@param e the element to add
@return {@code true} (as specified by {@link Collection#add})
@throws NullPointerException if the specified element is null

## ArrayDeque.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element at the end of this deque.

<p>This method is equivalent to {@link #offerLast}.

@param e the element to add
@return {@code true} (as specified by {@link Queue#offer})
@throws NullPointerException if the specified element is null

## ArrayDeque.remove()

```java
public E remove()
```

Retrieves and removes the head of the queue represented by this deque.

This method differs from {@link #poll() poll()} only in that it
throws an exception if this deque is empty.

<p>This method is equivalent to {@link #removeFirst}.

@return the head of the queue represented by this deque
@throws NoSuchElementException {@inheritDoc}

## ArrayDeque.poll()

```java
public E poll()
```

Retrieves and removes the head of the queue represented by this deque
(in other words, the first element of this deque), or returns
{@code null} if this deque is empty.

<p>This method is equivalent to {@link #pollFirst}.

@return the head of the queue represented by this deque, or
        {@code null} if this deque is empty

## ArrayDeque.element()

```java
public E element()
```

Retrieves, but does not remove, the head of the queue represented by
this deque.  This method differs from {@link #peek peek} only in
that it throws an exception if this deque is empty.

<p>This method is equivalent to {@link #getFirst}.

@return the head of the queue represented by this deque
@throws NoSuchElementException {@inheritDoc}

## ArrayDeque.peek()

```java
public E peek()
```

Retrieves, but does not remove, the head of the queue represented by
this deque, or returns {@code null} if this deque is empty.

<p>This method is equivalent to {@link #peekFirst}.

@return the head of the queue represented by this deque, or
        {@code null} if this deque is empty

## ArrayDeque.push(E)

```java
public void push(E e)
```

Pushes an element onto the stack represented by this deque.  In other
words, inserts the element at the front of this deque.

<p>This method is equivalent to {@link #addFirst}.

@param e the element to push
@throws NullPointerException if the specified element is null

## ArrayDeque.pop()

```java
public E pop()
```

Pops an element from the stack represented by this deque.  In other
words, removes and returns the first element of this deque.

<p>This method is equivalent to {@link #removeFirst()}.

@return the element at the front of this deque (which is the top
        of the stack represented by this deque)
@throws NoSuchElementException {@inheritDoc}

## ArrayDeque.size()

```java
public int size()
```

Returns the number of elements in this deque.

@return the number of elements in this deque

## ArrayDeque.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this deque contains no elements.

@return {@code true} if this deque contains no elements

## ArrayDeque.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this deque.  The elements
will be ordered from first (head) to last (tail).  This is the same
order that elements would be dequeued (via successive calls to
{@link #remove} or popped (via successive calls to {@link #pop}).

@return an iterator over the elements in this deque

## ArrayDeque.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a <em><a href="Spliterator.html#binding">late-binding</a></em>
and <em>fail-fast</em> {@link Spliterator} over the elements in this
deque.

<p>The {@code Spliterator} reports {@link Spliterator#SIZED},
{@link Spliterator#SUBSIZED}, {@link Spliterator#ORDERED}, and
{@link Spliterator#NONNULL}.  Overriding implementations should document
the reporting of additional characteristic values.

@return a {@code Spliterator} over the elements in this deque
@since 1.8

## ArrayDeque.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

@throws NullPointerException {@inheritDoc}

## ArrayDeque.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

@throws NullPointerException {@inheritDoc}

## ArrayDeque.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

@throws NullPointerException {@inheritDoc}

## ArrayDeque.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

@throws NullPointerException {@inheritDoc}

## ArrayDeque.contains(Object)

```java
public boolean contains(Object o)
```

Returns {@code true} if this deque contains the specified element.
More formally, returns {@code true} if and only if this deque contains
at least one element {@code e} such that {@code o.equals(e)}.

@param o object to be checked for containment in this deque
@return {@code true} if this deque contains the specified element

## ArrayDeque.remove(Object)

```java
public boolean remove(Object o)
```

Removes a single instance of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element {@code e} such that
{@code o.equals(e)} (if such an element exists).
Returns {@code true} if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

<p>This method is equivalent to {@link #removeFirstOccurrence(Object)}.

@param o element to be removed from this deque, if present
@return {@code true} if this deque contained the specified element

## ArrayDeque.clear()

```java
public void clear()
```

Removes all of the elements from this deque.
The deque will be empty after this call returns.

## ArrayDeque.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this deque
in proper sequence (from first to last element).

<p>The returned array will be "safe" in that no references to it are
maintained by this deque.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

<p>This method acts as bridge between array-based and collection-based
APIs.

@return an array containing all of the elements in this deque

## ArrayDeque.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this deque in
proper sequence (from first to last element); the runtime type of the
returned array is that of the specified array.  If the deque fits in
the specified array, it is returned therein.  Otherwise, a new array
is allocated with the runtime type of the specified array and the
size of this deque.

<p>If this deque fits in the specified array with room to spare
(i.e., the array has more elements than this deque), the element in
the array immediately following the end of the deque is set to
{@code null}.

<p>Like the {@link #toArray()} method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

<p>Suppose {@code x} is a deque known to contain only strings.
The following code can be used to dump the deque into a newly
allocated array of {@code String}:

<pre> {@code String[] y = x.toArray(new String[0]);}</pre>

Note that {@code toArray(new Object[0])} is identical in function to
{@code toArray()}.

@param a the array into which the elements of the deque are to
         be stored, if it is big enough; otherwise, a new array of the
         same runtime type is allocated for this purpose
@return an array containing all of the elements in this deque
@throws ArrayStoreException if the runtime type of the specified array
        is not a supertype of the runtime type of every element in
        this deque
@throws NullPointerException if the specified array is null

## ArrayDeque.clone()

```java
public ArrayDeque<E> clone()
```

Returns a copy of this deque.

@return a copy of this deque