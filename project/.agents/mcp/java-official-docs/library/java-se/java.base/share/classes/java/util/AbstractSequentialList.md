# AbstractSequentialList class (java.util)

```java
public abstract class AbstractSequentialList<E> extends AbstractList<E>
```

This class provides a skeletal implementation of the {@code List}
interface to minimize the effort required to implement this interface
backed by a "sequential access" data store (such as a linked list).  For
random access data (such as an array), {@code AbstractList} should be used
in preference to this class.<p>

This class is the opposite of the {@code AbstractList} class in the sense
that it implements the "random access" methods ({@code get(int index)},
{@code set(int index, E element)}, {@code add(int index, E element)} and
{@code remove(int index)}) on top of the list's list iterator, instead of
the other way around.<p>

To implement a list the programmer needs only to extend this class and
provide implementations for the {@code listIterator} and {@code size}
methods.  For an unmodifiable list, the programmer need only implement the
list iterator's {@code hasNext}, {@code next}, {@code hasPrevious},
{@code previous} and {@code index} methods.<p>

For a modifiable list the programmer should additionally implement the list
iterator's {@code set} method.  For a variable-size list the programmer
should additionally implement the list iterator's {@code remove} and
{@code add} methods.<p>

The programmer should generally provide a void (no argument) and collection
constructor, as per the recommendation in the {@code Collection} interface
specification.<p>

This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@param <E> the type of elements in this list

@author  Josh Bloch
@author  Neal Gafter
@see Collection
@see List
@see AbstractList
@see AbstractCollection
@since 1.2

## AbstractSequentialList.AbstractSequentialList()

```java
protected AbstractSequentialList()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## AbstractSequentialList.get(int)

```java
public E get(int index)
```

Returns the element at the specified position in this list.

<p>This implementation first gets a list iterator pointing to the
indexed element (with {@code listIterator(index)}).  Then, it gets
the element using {@code ListIterator.next} and returns it.

@throws IndexOutOfBoundsException {@inheritDoc}

## AbstractSequentialList.set(int, E)

```java
public E set(int index, E element)
```

Replaces the element at the specified position in this list with the
specified element (optional operation).

<p>This implementation first gets a list iterator pointing to the
indexed element (with {@code listIterator(index)}).  Then, it gets
the current element using {@code ListIterator.next} and replaces it
with {@code ListIterator.set}.

<p>Note that this implementation will throw an
{@code UnsupportedOperationException} if the list iterator does not
implement the {@code set} operation.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}
@throws IndexOutOfBoundsException     {@inheritDoc}

## AbstractSequentialList.add(int, E)

```java
public void add(int index, E element)
```

Inserts the specified element at the specified position in this list
(optional operation).  Shifts the element currently at that position
(if any) and any subsequent elements to the right (adds one to their
indices).

<p>This implementation first gets a list iterator pointing to the
indexed element (with {@code listIterator(index)}).  Then, it
inserts the specified element with {@code ListIterator.add}.

<p>Note that this implementation will throw an
{@code UnsupportedOperationException} if the list iterator does not
implement the {@code add} operation.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}
@throws IndexOutOfBoundsException     {@inheritDoc}

## AbstractSequentialList.remove(int)

```java
public E remove(int index)
```

Removes the element at the specified position in this list (optional
operation).  Shifts any subsequent elements to the left (subtracts one
from their indices).  Returns the element that was removed from the
list.

<p>This implementation first gets a list iterator pointing to the
indexed element (with {@code listIterator(index)}).  Then, it removes
the element with {@code ListIterator.remove}.

<p>Note that this implementation will throw an
{@code UnsupportedOperationException} if the list iterator does not
implement the {@code remove} operation.

@throws UnsupportedOperationException {@inheritDoc}
@throws IndexOutOfBoundsException     {@inheritDoc}

## AbstractSequentialList.addAll(int, Collection<? extends E>)

```java
public boolean addAll(int index, Collection<? extends E> c)
```

Inserts all of the elements in the specified collection into this
list at the specified position (optional operation).  Shifts the
element currently at that position (if any) and any subsequent
elements to the right (increases their indices).  The new elements
will appear in this list in the order that they are returned by the
specified collection's iterator.  The behavior of this operation is
undefined if the specified collection is modified while the
operation is in progress.  (Note that this will occur if the specified
collection is this list, and it's nonempty.)

<p>This implementation gets an iterator over the specified collection and
a list iterator over this list pointing to the indexed element (with
{@code listIterator(index)}).  Then, it iterates over the specified
collection, inserting the elements obtained from the iterator into this
list, one at a time, using {@code ListIterator.add} followed by
{@code ListIterator.next} (to skip over the added element).

<p>Note that this implementation will throw an
{@code UnsupportedOperationException} if the list iterator returned by
the {@code listIterator} method does not implement the {@code add}
operation.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}
@throws IndexOutOfBoundsException     {@inheritDoc}

## AbstractSequentialList.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this list (in proper
sequence).<p>

This implementation merely returns a list iterator over the list.

@return an iterator over the elements in this list (in proper sequence)

## AbstractSequentialList.listIterator(int)

```java
public abstract ListIterator<E> listIterator(int index)
```

Returns a list iterator over the elements in this list (in proper
sequence).

@param  index index of first element to be returned from the list
        iterator (by a call to the {@code next} method)
@return a list iterator over the elements in this list (in proper
        sequence)
@throws IndexOutOfBoundsException {@inheritDoc}