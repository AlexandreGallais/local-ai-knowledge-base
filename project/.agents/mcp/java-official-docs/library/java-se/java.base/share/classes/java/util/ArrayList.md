# ArrayList class (java.util)

```java
public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

Resizable-array implementation of the {@code List} interface.  Implements
all optional list operations, and permits all elements, including
{@code null}.  In addition to implementing the {@code List} interface,
this class provides methods to manipulate the size of the array that is
used internally to store the list.  (This class is roughly equivalent to
{@code Vector}, except that it is unsynchronized.)

<p>The {@code size}, {@code isEmpty}, {@code get}, {@code set},
{@code getFirst}, {@code getLast}, {@code removeLast}, {@code iterator},
{@code listIterator}, and {@code reversed} operations run in constant time.
The {@code add}, and {@code addLast} operations runs in <i>amortized
constant time</i>, that is, adding n elements requires O(n) time.  All of
the other operations run in linear time (roughly speaking).  The constant
factor is low compared to that for the {@code LinkedList} implementation.

<p>Each {@code ArrayList} instance has a <i>capacity</i>.  The capacity is
the size of the array used to store the elements in the list.  It is always
at least as large as the list size.  As elements are added to an ArrayList,
its capacity grows automatically.  The details of the growth policy are not
specified beyond the fact that adding an element has constant amortized
time cost.

<p>An application can increase the capacity of an {@code ArrayList} instance
before adding a large number of elements using the {@code ensureCapacity}
operation.  This may reduce the amount of incremental reallocation.

<p><strong>Note that this implementation is not synchronized.</strong>
If multiple threads access an {@code ArrayList} instance concurrently,
and at least one of the threads modifies the list structurally, it
<i>must</i> be synchronized externally.  (A structural modification is
any operation that adds or deletes one or more elements, or explicitly
resizes the backing array; merely setting the value of an element is not
a structural modification.)  This is typically accomplished by
synchronizing on some object that naturally encapsulates the list.

If no such object exists, the list should be "wrapped" using the
{@link Collections#synchronizedList Collections.synchronizedList}
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the list:<pre>
  List list = Collections.synchronizedList(new ArrayList(...));</pre>

<p id="fail-fast">
The iterators returned by this class's {@link #iterator() iterator} and
{@link #listIterator(int) listIterator} methods are <em>fail-fast</em>:
if the list is structurally modified at any time after the iterator is
created, in any way except through the iterator's own
{@link ListIterator#remove() remove} or
{@link ListIterator#add(Object) add} methods, the iterator will throw a
{@link ConcurrentModificationException}.  Thus, in the face of
concurrent modification, the iterator fails quickly and cleanly, rather
than risking arbitrary, non-deterministic behavior at an undetermined
time in the future.

<p>Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw {@code ConcurrentModificationException} on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness:  <i>the fail-fast behavior of iterators
should be used only to detect bugs.</i>

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@param <E> the type of elements in this list

@author  Josh Bloch
@author  Neal Gafter
@see     Collection
@see     List
@see     LinkedList
@see     Vector
@since   1.2

## ArrayList.ArrayList(int)

```java
public ArrayList(int initialCapacity)
```

Constructs an empty list with the specified initial capacity.

@param  initialCapacity  the initial capacity of the list
@throws IllegalArgumentException if the specified initial capacity
        is negative

## ArrayList.ArrayList()

```java
public ArrayList()
```

Constructs an empty list with an initial capacity of ten.

## ArrayList.ArrayList(Collection<? extends E>)

```java
public ArrayList(Collection<? extends E> c)
```

Constructs a list containing the elements of the specified
collection, in the order they are returned by the collection's
iterator.

@param c the collection whose elements are to be placed into this list
@throws NullPointerException if the specified collection is null

## ArrayList.trimToSize()

```java
public void trimToSize()
```

Trims the capacity of this {@code ArrayList} instance to be the
list's current size.  An application can use this operation to minimize
the storage of an {@code ArrayList} instance.

## ArrayList.ensureCapacity(int)

```java
public void ensureCapacity(int minCapacity)
```

Increases the capacity of this {@code ArrayList} instance, if
necessary, to ensure that it can hold at least the number of elements
specified by the minimum capacity argument.

@param minCapacity the desired minimum capacity

## ArrayList.size()

```java
public int size()
```

Returns the number of elements in this list.

@return the number of elements in this list

## ArrayList.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this list contains no elements.

@return {@code true} if this list contains no elements

## ArrayList.contains(Object)

```java
public boolean contains(Object o)
```

Returns {@code true} if this list contains the specified element.
More formally, returns {@code true} if and only if this list contains
at least one element {@code e} such that
{@code Objects.equals(o, e)}.

@param o element whose presence in this list is to be tested
@return {@code true} if this list contains the specified element

## ArrayList.indexOf(Object)

```java
public int indexOf(Object o)
```

Returns the index of the first occurrence of the specified element
in this list, or -1 if this list does not contain the element.
More formally, returns the lowest index {@code i} such that
{@code Objects.equals(o, get(i))},
or -1 if there is no such index.

## ArrayList.lastIndexOf(Object)

```java
public int lastIndexOf(Object o)
```

Returns the index of the last occurrence of the specified element
in this list, or -1 if this list does not contain the element.
More formally, returns the highest index {@code i} such that
{@code Objects.equals(o, get(i))},
or -1 if there is no such index.

## ArrayList.clone()

```java
public Object clone()
```

Returns a shallow copy of this {@code ArrayList} instance.  (The
elements themselves are not copied.)

@return a clone of this {@code ArrayList} instance

## ArrayList.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this list
in proper sequence (from first to last element).

<p>The returned array will be "safe" in that no references to it are
maintained by this list.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

<p>This method acts as bridge between array-based and collection-based
APIs.

@return an array containing all of the elements in this list in
        proper sequence

## ArrayList.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this list in proper
sequence (from first to last element); the runtime type of the returned
array is that of the specified array.  If the list fits in the
specified array, it is returned therein.  Otherwise, a new array is
allocated with the runtime type of the specified array and the size of
this list.

<p>If the list fits in the specified array with room to spare
(i.e., the array has more elements than the list), the element in
the array immediately following the end of the collection is set to
{@code null}.  (This is useful in determining the length of the
list <i>only</i> if the caller knows that the list does not contain
any null elements.)

@param a the array into which the elements of the list are to
         be stored, if it is big enough; otherwise, a new array of the
         same runtime type is allocated for this purpose.
@return an array containing the elements of the list
@throws ArrayStoreException if the runtime type of the specified array
        is not a supertype of the runtime type of every element in
        this list
@throws NullPointerException if the specified array is null

## ArrayList.get(int)

```java
public E get(int index)
```

Returns the element at the specified position in this list.

@param  index index of the element to return
@return the element at the specified position in this list
@throws IndexOutOfBoundsException {@inheritDoc}

## ArrayList.getFirst()

```java
public E getFirst()
```

{@inheritDoc}

@throws NoSuchElementException {@inheritDoc}
@since 21

## ArrayList.getLast()

```java
public E getLast()
```

{@inheritDoc}

@throws NoSuchElementException {@inheritDoc}
@since 21

## ArrayList.set(int, E)

```java
public E set(int index, E element)
```

Replaces the element at the specified position in this list with
the specified element.

@param index index of the element to replace
@param element element to be stored at the specified position
@return the element previously at the specified position
@throws IndexOutOfBoundsException {@inheritDoc}

## ArrayList.add(E)

```java
public boolean add(E e)
```

Appends the specified element to the end of this list.

@param e element to be appended to this list
@return {@code true} (as specified by {@link Collection#add})

## ArrayList.add(int, E)

```java
public void add(int index, E element)
```

Inserts the specified element at the specified position in this
list. Shifts the element currently at that position (if any) and
any subsequent elements to the right (adds one to their indices).

@param index index at which the specified element is to be inserted
@param element element to be inserted
@throws IndexOutOfBoundsException {@inheritDoc}

## ArrayList.addFirst(E)

```java
public void addFirst(E element)
```

{@inheritDoc}

@since 21

## ArrayList.addLast(E)

```java
public void addLast(E element)
```

{@inheritDoc}

@since 21

## ArrayList.remove(int)

```java
public E remove(int index)
```

Removes the element at the specified position in this list.
Shifts any subsequent elements to the left (subtracts one from their
indices).

@param index the index of the element to be removed
@return the element that was removed from the list
@throws IndexOutOfBoundsException {@inheritDoc}

## ArrayList.removeFirst()

```java
public E removeFirst()
```

{@inheritDoc}

@throws NoSuchElementException {@inheritDoc}
@since 21

## ArrayList.removeLast()

```java
public E removeLast()
```

{@inheritDoc}

@throws NoSuchElementException {@inheritDoc}
@since 21

## ArrayList.equals(Object)

```java
public boolean equals(Object o)
```

{@inheritDoc}

## ArrayList.hashCode()

```java
public int hashCode()
```

{@inheritDoc}

## ArrayList.remove(Object)

```java
public boolean remove(Object o)
```

Removes the first occurrence of the specified element from this list,
if it is present.  If the list does not contain the element, it is
unchanged.  More formally, removes the element with the lowest index
{@code i} such that
{@code Objects.equals(o, get(i))}
(if such an element exists).  Returns {@code true} if this list
contained the specified element (or equivalently, if this list
changed as a result of the call).

@param o element to be removed from this list, if present
@return {@code true} if this list contained the specified element

## ArrayList.clear()

```java
public void clear()
```

Removes all of the elements from this list.  The list will
be empty after this call returns.

## ArrayList.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Appends all of the elements in the specified collection to the end of
this list, in the order that they are returned by the
specified collection's Iterator.  The behavior of this operation is
undefined if the specified collection is modified while the operation
is in progress.  (This implies that the behavior of this call is
undefined if the specified collection is this list, and this
list is nonempty.)

@param c collection containing elements to be added to this list
@return {@code true} if this list changed as a result of the call
@throws NullPointerException if the specified collection is null

## ArrayList.addAll(int, Collection<? extends E>)

```java
public boolean addAll(int index, Collection<? extends E> c)
```

Inserts all of the elements in the specified collection into this
list, starting at the specified position.  Shifts the element
currently at that position (if any) and any subsequent elements to
the right (increases their indices).  The new elements will appear
in the list in the order that they are returned by the
specified collection's iterator.

@param index index at which to insert the first element from the
             specified collection
@param c collection containing elements to be added to this list
@return {@code true} if this list changed as a result of the call
@throws IndexOutOfBoundsException {@inheritDoc}
@throws NullPointerException if the specified collection is null

## ArrayList.removeRange(int, int)

```java
protected void removeRange(int fromIndex, int toIndex)
```

Removes from this list all of the elements whose index is between
{@code fromIndex}, inclusive, and {@code toIndex}, exclusive.
Shifts any succeeding elements to the left (reduces their index).
This call shortens the list by {@code (toIndex - fromIndex)} elements.
(If {@code toIndex==fromIndex}, this operation has no effect.)

@throws IndexOutOfBoundsException if {@code fromIndex} or
        {@code toIndex} is out of range
        ({@code fromIndex < 0 ||
         toIndex > size() ||
         toIndex < fromIndex})

## ArrayList.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Removes from this list all of its elements that are contained in the
specified collection.

@param c collection containing elements to be removed from this list
@return {@code true} if this list changed as a result of the call
@throws ClassCastException if the class of an element of this list
        is incompatible with the specified collection
(<a href="Collection.html#optional-restrictions">optional</a>)
@throws NullPointerException if this list contains a null element and the
        specified collection does not permit null elements
(<a href="Collection.html#optional-restrictions">optional</a>),
        or if the specified collection is null
@see Collection#contains(Object)

## ArrayList.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Retains only the elements in this list that are contained in the
specified collection.  In other words, removes from this list all
of its elements that are not contained in the specified collection.

@param c collection containing elements to be retained in this list
@return {@code true} if this list changed as a result of the call
@throws ClassCastException if the class of an element of this list
        is incompatible with the specified collection
(<a href="Collection.html#optional-restrictions">optional</a>)
@throws NullPointerException if this list contains a null element and the
        specified collection does not permit null elements
(<a href="Collection.html#optional-restrictions">optional</a>),
        or if the specified collection is null
@see Collection#contains(Object)

## ArrayList.listIterator(int)

```java
public ListIterator<E> listIterator(int index)
```

Returns a list iterator over the elements in this list (in proper
sequence), starting at the specified position in the list.
The specified index indicates the first element that would be
returned by an initial call to {@link ListIterator#next next}.
An initial call to {@link ListIterator#previous previous} would
return the element with the specified index minus one.

<p>The returned list iterator is <a href="#fail-fast"><i>fail-fast</i></a>.

@throws IndexOutOfBoundsException {@inheritDoc}

## ArrayList.listIterator()

```java
public ListIterator<E> listIterator()
```

Returns a list iterator over the elements in this list (in proper
sequence).

<p>The returned list iterator is <a href="#fail-fast"><i>fail-fast</i></a>.

@see #listIterator(int)

## ArrayList.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this list in proper sequence.

<p>The returned iterator is <a href="#fail-fast"><i>fail-fast</i></a>.

@return an iterator over the elements in this list in proper sequence

## ArrayList.subList(int, int)

```java
public List<E> subList(int fromIndex, int toIndex)
```

Returns a view of the portion of this list between the specified
{@code fromIndex}, inclusive, and {@code toIndex}, exclusive.  (If
{@code fromIndex} and {@code toIndex} are equal, the returned list is
empty.)  The returned list is backed by this list, so non-structural
changes in the returned list are reflected in this list, and vice-versa.
The returned list supports all of the optional list operations.

<p>This method eliminates the need for explicit range operations (of
the sort that commonly exist for arrays).  Any operation that expects
a list can be used as a range operation by passing a subList view
instead of a whole list.  For example, the following idiom
removes a range of elements from a list:
<pre>
     list.subList(from, to).clear();
</pre>
Similar idioms may be constructed for {@link #indexOf(Object)} and
{@link #lastIndexOf(Object)}, and all of the algorithms in the
{@link Collections} class can be applied to a subList.

<p>The semantics of the list returned by this method become undefined if
the backing list (i.e., this list) is <i>structurally modified</i> in
any way other than via the returned list.  (Structural modifications are
those that change the size of this list, or otherwise perturb it in such
a fashion that iterations in progress may yield incorrect results.)

@throws IndexOutOfBoundsException {@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ArrayList.SubList(ArrayList<E>, int, int)

```java
public SubList(ArrayList<E> root, int fromIndex, int toIndex)
```

Constructs a sublist of an arbitrary ArrayList.

## ArrayList.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

@throws NullPointerException {@inheritDoc}

## ArrayList.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a <em><a href="Spliterator.html#binding">late-binding</a></em>
and <em>fail-fast</em> {@link Spliterator} over the elements in this
list.

<p>The {@code Spliterator} reports {@link Spliterator#SIZED},
{@link Spliterator#SUBSIZED}, and {@link Spliterator#ORDERED}.
Overriding implementations should document the reporting of additional
characteristic values.

@return a {@code Spliterator} over the elements in this list
@since 1.8

## ArrayList.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

@throws NullPointerException {@inheritDoc}