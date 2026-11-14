# AbstractCollection class (java.util)

```java
public abstract class AbstractCollection<E> implements Collection<E>
```

This class provides a skeletal implementation of the {@code Collection}
interface, to minimize the effort required to implement this interface. <p>

To implement an unmodifiable collection, the programmer needs only to
extend this class and provide implementations for the {@code iterator} and
{@code size} methods.  (The iterator returned by the {@code iterator}
method must implement {@code hasNext} and {@code next}.)<p>

To implement a modifiable collection, the programmer must additionally
override this class's {@code add} method (which otherwise throws an
{@code UnsupportedOperationException}), and the iterator returned by the
{@code iterator} method must additionally implement its {@code remove}
method.<p>

The programmer should generally provide a void (no argument) and
{@code Collection} constructor, as per the recommendation in the
{@code Collection} interface specification.<p>

The documentation for each non-abstract method in this class describes its
implementation in detail.  Each of these methods may be overridden if
the collection being implemented admits a more efficient implementation.<p>

This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@param <E> the type of elements in this collection

@author  Josh Bloch
@author  Neal Gafter
@see Collection
@since 1.2

## AbstractCollection.AbstractCollection()

```java
protected AbstractCollection()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## AbstractCollection.iterator()

```java
public abstract Iterator<E> iterator()
```

Returns an iterator over the elements contained in this collection.

@return an iterator over the elements contained in this collection

## AbstractCollection.isEmpty()

```java
public boolean isEmpty()
```

{@inheritDoc}

@implSpec
This implementation returns {@code size() == 0}.

## AbstractCollection.contains(Object)

```java
public boolean contains(Object o)
```

{@inheritDoc}

@implSpec
This implementation iterates over the elements in the collection,
checking each element in turn for equality with the specified element.

@throws ClassCastException   {@inheritDoc}
@throws NullPointerException {@inheritDoc}

## AbstractCollection.toArray()

```java
public Object[] toArray()
```

{@inheritDoc}

@implSpec
This implementation returns an array containing all the elements
returned by this collection's iterator, in the same order, stored in
consecutive elements of the array, starting with index {@code 0}.
The length of the returned array is equal to the number of elements
returned by the iterator, even if the size of this collection changes
during iteration, as might happen if the collection permits
concurrent modification during iteration.  The {@code size} method is
called only as an optimization hint; the correct result is returned
even if the iterator returns a different number of elements.

<p>This method is equivalent to:

 <pre> {@code
List<E> list = new ArrayList<E>(size());
for (E e : this)
    list.add(e);
return list.toArray();
}</pre>

## AbstractCollection.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

{@inheritDoc}

@implSpec
This implementation returns an array containing all the elements
returned by this collection's iterator in the same order, stored in
consecutive elements of the array, starting with index {@code 0}.
If the number of elements returned by the iterator is too large to
fit into the specified array, then the elements are returned in a
newly allocated array with length equal to the number of elements
returned by the iterator, even if the size of this collection
changes during iteration, as might happen if the collection permits
concurrent modification during iteration.  The {@code size} method is
called only as an optimization hint; the correct result is returned
even if the iterator returns a different number of elements.

<p>This method is equivalent to:

 <pre> {@code
List<E> list = new ArrayList<E>(size());
for (E e : this)
    list.add(e);
return list.toArray(a);
}</pre>

@throws ArrayStoreException  {@inheritDoc}
@throws NullPointerException {@inheritDoc}

## AbstractCollection.add(E)

```java
public boolean add(E e)
```

{@inheritDoc}

@implSpec
This implementation always throws an
{@code UnsupportedOperationException}.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}
@throws IllegalStateException         {@inheritDoc}

## AbstractCollection.remove(Object)

```java
public boolean remove(Object o)
```

{@inheritDoc}

@implSpec
This implementation iterates over the collection looking for the
specified element.  If it finds the element, it removes the element
from the collection using the iterator's remove method.

<p>Note that this implementation throws an
{@code UnsupportedOperationException} if the iterator returned by this
collection's iterator method does not implement the {@code remove}
method and this collection contains the specified object.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}

## AbstractCollection.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> c)
```

{@inheritDoc}

@implSpec
This implementation iterates over the specified collection,
checking each element returned by the iterator in turn to see
if it's contained in this collection.  If all elements are so
contained {@code true} is returned, otherwise {@code false}.

@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@see #contains(Object)

## AbstractCollection.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

{@inheritDoc}

@implSpec
This implementation iterates over the specified collection, and adds
each object returned by the iterator to this collection, in turn.

<p>Note that this implementation will throw an
{@code UnsupportedOperationException} unless {@code add} is
overridden (assuming the specified collection is non-empty).

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}
@throws IllegalStateException         {@inheritDoc}

@see #add(Object)

## AbstractCollection.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

{@inheritDoc}

@implSpec
This implementation iterates over this collection, checking each
element returned by the iterator in turn to see if it's contained
in the specified collection.  If it's so contained, it's removed from
this collection with the iterator's {@code remove} method.

<p>Note that this implementation will throw an
{@code UnsupportedOperationException} if the iterator returned by the
{@code iterator} method does not implement the {@code remove} method
and this collection contains one or more elements in common with the
specified collection.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}

@see #remove(Object)
@see #contains(Object)

## AbstractCollection.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

{@inheritDoc}

@implSpec
This implementation iterates over this collection, checking each
element returned by the iterator in turn to see if it's contained
in the specified collection.  If it's not so contained, it's removed
from this collection with the iterator's {@code remove} method.

<p>Note that this implementation will throw an
{@code UnsupportedOperationException} if the iterator returned by the
{@code iterator} method does not implement the {@code remove} method
and this collection contains one or more elements not present in the
specified collection.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}

@see #remove(Object)
@see #contains(Object)

## AbstractCollection.clear()

```java
public void clear()
```

{@inheritDoc}

@implSpec
This implementation iterates over this collection, removing each
element using the {@code Iterator.remove} operation.  Most
implementations will probably choose to override this method for
efficiency.

<p>Note that this implementation will throw an
{@code UnsupportedOperationException} if the iterator returned by this
collection's {@code iterator} method does not implement the
{@code remove} method and this collection is non-empty.

@throws UnsupportedOperationException {@inheritDoc}

## AbstractCollection.toString()

```java
public String toString()
```

Returns a string representation of this collection.  The string
representation consists of a list of the collection's elements in the
order they are returned by its iterator, enclosed in square brackets
({@code "[]"}).  Adjacent elements are separated by the characters
{@code ", "} (comma and space).  Elements are converted to strings as
by {@link String#valueOf(Object)}.

@return a string representation of this collection