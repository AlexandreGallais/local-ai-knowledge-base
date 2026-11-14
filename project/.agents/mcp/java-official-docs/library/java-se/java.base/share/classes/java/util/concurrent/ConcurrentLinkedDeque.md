# ConcurrentLinkedDeque class (java.util.concurrent)

```java
public class ConcurrentLinkedDeque<E> extends AbstractCollection<E> implements Deque<E>, java.io.Serializable
```

An unbounded concurrent {@linkplain Deque deque} based on linked nodes.
Concurrent insertion, removal, and access operations execute safely
across multiple threads.
A {@code ConcurrentLinkedDeque} is an appropriate choice when
many threads will share access to a common collection.
Like most other concurrent collection implementations, this class
does not permit the use of {@code null} elements.

<p>Iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>Beware that, unlike in most collections, the {@code size} method
is <em>NOT</em> a constant-time operation. Because of the
asynchronous nature of these deques, determining the current number
of elements requires a traversal of the elements, and so may report
inaccurate results if this collection is modified during traversal.

<p>Bulk operations that add, remove, or examine multiple elements,
such as {@link #addAll}, {@link #removeIf} or {@link #forEach},
are <em>not</em> guaranteed to be performed atomically.
For example, a {@code forEach} traversal concurrent with an {@code
addAll} operation might observe only some of the added elements.

<p>This class and its iterator implement all of the <em>optional</em>
methods of the {@link Deque} and {@link Iterator} interfaces.

<p>Memory consistency effects: As with other concurrent collections,
actions in a thread prior to placing an object into a
{@code ConcurrentLinkedDeque}
<a href="package-summary.html#MemoryVisibility"><i>happen-before</i></a>
actions subsequent to the access or removal of that element from
the {@code ConcurrentLinkedDeque} in another thread.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@since 1.7
@author Doug Lea
@author Martin Buchholz
@param <E> the type of elements held in this deque

## ConcurrentLinkedDeque.ConcurrentLinkedDeque()

```java
public ConcurrentLinkedDeque()
```

Constructs an empty deque.

## ConcurrentLinkedDeque.ConcurrentLinkedDeque(Collection<? extends E>)

```java
public ConcurrentLinkedDeque(Collection<? extends E> c)
```

Constructs a deque initially containing the elements of
the given collection, added in traversal order of the
collection's iterator.

@param c the collection of elements to initially contain
@throws NullPointerException if the specified collection or any
        of its elements are null

## ConcurrentLinkedDeque.addFirst(E)

```java
public void addFirst(E e)
```

Inserts the specified element at the front of this deque.
As the deque is unbounded, this method will never throw
{@link IllegalStateException}.

@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.addLast(E)

```java
public void addLast(E e)
```

Inserts the specified element at the end of this deque.
As the deque is unbounded, this method will never throw
{@link IllegalStateException}.

<p>This method is equivalent to {@link #add}.

@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.offerFirst(E)

```java
public boolean offerFirst(E e)
```

Inserts the specified element at the front of this deque.
As the deque is unbounded, this method will never return {@code false}.

@return {@code true} (as specified by {@link Deque#offerFirst})
@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.offerLast(E)

```java
public boolean offerLast(E e)
```

Inserts the specified element at the end of this deque.
As the deque is unbounded, this method will never return {@code false}.

<p>This method is equivalent to {@link #add}.

@return {@code true} (as specified by {@link Deque#offerLast})
@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.getFirst()

```java
public E getFirst()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentLinkedDeque.getLast()

```java
public E getLast()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentLinkedDeque.removeFirst()

```java
public E removeFirst()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentLinkedDeque.removeLast()

```java
public E removeLast()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentLinkedDeque.offer(E)

```java
public boolean offer(E e)
```

Inserts the specified element at the tail of this deque.
As the deque is unbounded, this method will never return {@code false}.

@return {@code true} (as specified by {@link Queue#offer})
@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.add(E)

```java
public boolean add(E e)
```

Inserts the specified element at the tail of this deque.
As the deque is unbounded, this method will never throw
{@link IllegalStateException} or return {@code false}.

@return {@code true} (as specified by {@link Collection#add})
@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.remove()

```java
public E remove()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentLinkedDeque.pop()

```java
public E pop()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentLinkedDeque.element()

```java
public E element()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentLinkedDeque.push(E)

```java
public void push(E e)
```

@throws NullPointerException {@inheritDoc}

## ConcurrentLinkedDeque.removeFirstOccurrence(Object)

```java
public boolean removeFirstOccurrence(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element {@code e} such that
{@code o.equals(e)} (if such an element exists).
Returns {@code true} if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

@param o element to be removed from this deque, if present
@return {@code true} if the deque contained the specified element
@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.removeLastOccurrence(Object)

```java
public boolean removeLastOccurrence(Object o)
```

Removes the last occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the last element {@code e} such that
{@code o.equals(e)} (if such an element exists).
Returns {@code true} if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

@param o element to be removed from this deque, if present
@return {@code true} if the deque contained the specified element
@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.contains(Object)

```java
public boolean contains(Object o)
```

Returns {@code true} if this deque contains the specified element.
More formally, returns {@code true} if and only if this deque contains
at least one element {@code e} such that {@code o.equals(e)}.

@param o element whose presence in this deque is to be tested
@return {@code true} if this deque contains the specified element

## ConcurrentLinkedDeque.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this collection contains no elements.

@return {@code true} if this collection contains no elements

## ConcurrentLinkedDeque.size()

```java
public int size()
```

Returns the number of elements in this deque.  If this deque
contains more than {@code Integer.MAX_VALUE} elements, it
returns {@code Integer.MAX_VALUE}.

<p>Beware that, unlike in most collections, this method is
<em>NOT</em> a constant-time operation. Because of the
asynchronous nature of these deques, determining the current
number of elements requires traversing them all to count them.
Additionally, it is possible for the size to change during
execution of this method, in which case the returned result
will be inaccurate. Thus, this method is typically not very
useful in concurrent applications.

@return the number of elements in this deque

## ConcurrentLinkedDeque.remove(Object)

```java
public boolean remove(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element {@code e} such that
{@code o.equals(e)} (if such an element exists).
Returns {@code true} if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

<p>This method is equivalent to {@link #removeFirstOccurrence(Object)}.

@param o element to be removed from this deque, if present
@return {@code true} if the deque contained the specified element
@throws NullPointerException if the specified element is null

## ConcurrentLinkedDeque.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Appends all of the elements in the specified collection to the end of
this deque, in the order that they are returned by the specified
collection's iterator.  Attempts to {@code addAll} of a deque to
itself result in {@code IllegalArgumentException}.

@param c the elements to be inserted into this deque
@return {@code true} if this deque changed as a result of the call
@throws NullPointerException if the specified collection or any
        of its elements are null
@throws IllegalArgumentException if the collection is this deque

## ConcurrentLinkedDeque.clear()

```java
public void clear()
```

Removes all of the elements from this deque.

## ConcurrentLinkedDeque.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this deque, in
proper sequence (from first to last element).

<p>The returned array will be "safe" in that no references to it are
maintained by this deque.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

<p>This method acts as bridge between array-based and collection-based
APIs.

@return an array containing all of the elements in this deque

## ConcurrentLinkedDeque.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this deque,
in proper sequence (from first to last element); the runtime
type of the returned array is that of the specified array.  If
the deque fits in the specified array, it is returned therein.
Otherwise, a new array is allocated with the runtime type of
the specified array and the size of this deque.

<p>If this deque fits in the specified array with room to spare
(i.e., the array has more elements than this deque), the element in
the array immediately following the end of the deque is set to
{@code null}.

<p>Like the {@link #toArray()} method, this method acts as
bridge between array-based and collection-based APIs.  Further,
this method allows precise control over the runtime type of the
output array, and may, under certain circumstances, be used to
save allocation costs.

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

## ConcurrentLinkedDeque.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this deque in proper sequence.
The elements will be returned in order from first (head) to last (tail).

<p>The returned iterator is
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

@return an iterator over the elements in this deque in proper sequence

## ConcurrentLinkedDeque.descendingIterator()

```java
public Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this deque in reverse
sequential order.  The elements will be returned in order from
last (tail) to first (head).

<p>The returned iterator is
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

@return an iterator over the elements in this deque in reverse order

## ConcurrentLinkedDeque.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a {@link Spliterator} over the elements in this deque.

<p>The returned spliterator is
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>The {@code Spliterator} reports {@link Spliterator#CONCURRENT},
{@link Spliterator#ORDERED}, and {@link Spliterator#NONNULL}.

@implNote
The {@code Spliterator} implements {@code trySplit} to permit limited
parallelism.

@return a {@code Spliterator} over the elements in this deque
@since 1.8

## ConcurrentLinkedDeque.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

@throws NullPointerException {@inheritDoc}

## ConcurrentLinkedDeque.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

@throws NullPointerException {@inheritDoc}

## ConcurrentLinkedDeque.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

@throws NullPointerException {@inheritDoc}

## ConcurrentLinkedDeque.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

@throws NullPointerException {@inheritDoc}