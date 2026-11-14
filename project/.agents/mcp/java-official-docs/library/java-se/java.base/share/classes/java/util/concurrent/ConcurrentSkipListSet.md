# ConcurrentSkipListSet class (java.util.concurrent)

```java
public class ConcurrentSkipListSet<E> extends AbstractSet<E> implements NavigableSet<E>, Cloneable, java.io.Serializable
```

A scalable concurrent {@link NavigableSet} implementation based on
a {@link ConcurrentSkipListMap}.  The elements of the set are kept
sorted according to their {@linkplain Comparable natural ordering},
or by a {@link Comparator} provided at set creation time, depending
on which constructor is used.

<p>This implementation provides expected average <i>log(n)</i> time
cost for the {@code contains}, {@code add}, and {@code remove}
operations and their variants.  Insertion, removal, and access
operations safely execute concurrently by multiple threads.

<p>Iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>Ascending ordered views and their iterators are faster than
descending ones.

<p>Beware that, unlike in most collections, the {@code size}
method is <em>not</em> a constant-time operation. Because of the
asynchronous nature of these sets, determining the current number
of elements requires a traversal of the elements, and so may report
inaccurate results if this collection is modified during traversal.

<p>Bulk operations that add, remove, or examine multiple elements,
such as {@link #addAll}, {@link #removeIf} or {@link #forEach},
are <em>not</em> guaranteed to be performed atomically.
For example, a {@code forEach} traversal concurrent with an {@code
addAll} operation might observe only some of the added elements.

<p>This class and its iterators implement all of the
<em>optional</em> methods of the {@link Set} and {@link Iterator}
interfaces. Like most other concurrent collection implementations,
this class does not permit the use of {@code null} elements,
because {@code null} arguments and return values cannot be reliably
distinguished from the absence of elements.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@author Doug Lea
@param <E> the type of elements maintained by this set
@since 1.6

## ConcurrentSkipListSet.ConcurrentSkipListSet()

```java
public ConcurrentSkipListSet()
```

Constructs a new, empty set that orders its elements according to
their {@linkplain Comparable natural ordering}.

## ConcurrentSkipListSet.ConcurrentSkipListSet(Comparator<? super E>)

```java
public ConcurrentSkipListSet(Comparator<? super E> comparator)
```

Constructs a new, empty set that orders its elements according to
the specified comparator.

@param comparator the comparator that will be used to order this set.
       If {@code null}, the {@linkplain Comparable natural
       ordering} of the elements will be used.

## ConcurrentSkipListSet.ConcurrentSkipListSet(Collection<? extends E>)

```java
public ConcurrentSkipListSet(Collection<? extends E> c)
```

Constructs a new set containing the elements in the specified
collection, that orders its elements according to their
{@linkplain Comparable natural ordering}.

@param c The elements that will comprise the new set
@throws ClassCastException if the elements in {@code c} are
        not {@link Comparable}, or are not mutually comparable
@throws NullPointerException if the specified collection or any
        of its elements are null

## ConcurrentSkipListSet.ConcurrentSkipListSet(SortedSet<E>)

```java
public ConcurrentSkipListSet(SortedSet<E> s)
```

Constructs a new set containing the same elements and using the
same ordering as the specified sorted set.

@param s sorted set whose elements will comprise the new set
@throws NullPointerException if the specified sorted set or any
        of its elements are null

## ConcurrentSkipListSet.clone()

```java
public ConcurrentSkipListSet<E> clone()
```

Returns a shallow copy of this {@code ConcurrentSkipListSet}
instance. (The elements themselves are not cloned.)

@return a shallow copy of this set

## ConcurrentSkipListSet.size()

```java
public int size()
```

Returns the number of elements in this set.  If this set
contains more than {@code Integer.MAX_VALUE} elements, it
returns {@code Integer.MAX_VALUE}.

<p>It is possible for the size to change during execution of this method,
in which case the returned result will be inaccurate.
Thus, this method is typically not very useful in concurrent applications.

@return the number of elements in this set

## ConcurrentSkipListSet.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this set contains no elements.
@return {@code true} if this set contains no elements

## ConcurrentSkipListSet.contains(Object)

```java
public boolean contains(Object o)
```

Returns {@code true} if this set contains the specified element.
More formally, returns {@code true} if and only if this set
contains an element {@code e} such that {@code o.equals(e)}.

@param o object to be checked for containment in this set
@return {@code true} if this set contains the specified element
@throws ClassCastException if the specified element cannot be
        compared with the elements currently in this set
@throws NullPointerException if the specified element is null

## ConcurrentSkipListSet.add(E)

```java
public boolean add(E e)
```

Adds the specified element to this set if it is not already present.
More formally, adds the specified element {@code e} to this set if
the set contains no element {@code e2} such that {@code e.equals(e2)}.
If this set already contains the element, the call leaves the set
unchanged and returns {@code false}.

@param e element to be added to this set
@return {@code true} if this set did not already contain the
        specified element
@throws ClassCastException if {@code e} cannot be compared
        with the elements currently in this set
@throws NullPointerException if the specified element is null

## ConcurrentSkipListSet.remove(Object)

```java
public boolean remove(Object o)
```

Removes the specified element from this set if it is present.
More formally, removes an element {@code e} such that
{@code o.equals(e)}, if this set contains such an element.
Returns {@code true} if this set contained the element (or
equivalently, if this set changed as a result of the call).
(This set will not contain the element once the call returns.)

@param o object to be removed from this set, if present
@return {@code true} if this set contained the specified element
@throws ClassCastException if {@code o} cannot be compared
        with the elements currently in this set
@throws NullPointerException if the specified element is null

## ConcurrentSkipListSet.clear()

```java
public void clear()
```

Removes all of the elements from this set.

## ConcurrentSkipListSet.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this set in ascending order.

@return an iterator over the elements in this set in ascending order

## ConcurrentSkipListSet.descendingIterator()

```java
public Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this set in descending order.

@return an iterator over the elements in this set in descending order

## ConcurrentSkipListSet.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this set for equality.  Returns
{@code true} if the specified object is also a set, the two sets
have the same size, and every member of the specified set is
contained in this set (or equivalently, every member of this set is
contained in the specified set).  This definition ensures that the
equals method works properly across different implementations of the
set interface.

@param o the object to be compared for equality with this set
@return {@code true} if the specified object is equal to this set

## ConcurrentSkipListSet.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Removes from this set all of its elements that are contained in
the specified collection.  If the specified collection is also
a set, this operation effectively modifies this set so that its
value is the <i>asymmetric set difference</i> of the two sets.

@param  c collection containing elements to be removed from this set
@return {@code true} if this set changed as a result of the call
@throws ClassCastException if the class of an element of this set
        is incompatible with the specified collection
(<a href="{@docRoot}/java.base/java/util/Collection.html#optional-restrictions">optional</a>)
@throws NullPointerException if the specified collection or any
        of its elements are null

## ConcurrentSkipListSet.lower(E)

```java
public E lower(E e)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified element is null

## ConcurrentSkipListSet.floor(E)

```java
public E floor(E e)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified element is null

## ConcurrentSkipListSet.ceiling(E)

```java
public E ceiling(E e)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified element is null

## ConcurrentSkipListSet.higher(E)

```java
public E higher(E e)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified element is null

## ConcurrentSkipListSet.first()

```java
public E first()
```

@throws java.util.NoSuchElementException {@inheritDoc}

## ConcurrentSkipListSet.last()

```java
public E last()
```

@throws java.util.NoSuchElementException {@inheritDoc}

## ConcurrentSkipListSet.addFirst(E)

```java
public void addFirst(E e)
```

Throws {@code UnsupportedOperationException}. The encounter order induced by this
set's comparison method determines the position of elements, so explicit positioning
is not supported.

@throws UnsupportedOperationException always
@since 21

## ConcurrentSkipListSet.addLast(E)

```java
public void addLast(E e)
```

Throws {@code UnsupportedOperationException}. The encounter order induced by this
set's comparison method determines the position of elements, so explicit positioning
is not supported.

@throws UnsupportedOperationException always
@since 21

## ConcurrentSkipListSet.subSet(E, boolean, E, boolean)

```java
public NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromElement} or
        {@code toElement} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListSet.headSet(E, boolean)

```java
public NavigableSet<E> headSet(E toElement, boolean inclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code toElement} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListSet.tailSet(E, boolean)

```java
public NavigableSet<E> tailSet(E fromElement, boolean inclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromElement} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListSet.subSet(E, E)

```java
public NavigableSet<E> subSet(E fromElement, E toElement)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromElement} or
        {@code toElement} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListSet.headSet(E)

```java
public NavigableSet<E> headSet(E toElement)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code toElement} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListSet.tailSet(E)

```java
public NavigableSet<E> tailSet(E fromElement)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromElement} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListSet.descendingSet()

```java
public NavigableSet<E> descendingSet()
```

Returns a reverse order view of the elements contained in this set.
The descending set is backed by this set, so changes to the set are
reflected in the descending set, and vice-versa.

<p>The returned set has an ordering equivalent to
{@link Collections#reverseOrder(Comparator) Collections.reverseOrder}{@code (comparator())}.
The expression {@code s.descendingSet().descendingSet()} returns a
view of {@code s} essentially equivalent to {@code s}.

@return a reverse order view of this set

## ConcurrentSkipListSet.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a {@link Spliterator} over the elements in this set.

<p>The {@code Spliterator} reports {@link Spliterator#CONCURRENT},
{@link Spliterator#NONNULL}, {@link Spliterator#DISTINCT},
{@link Spliterator#SORTED} and {@link Spliterator#ORDERED}, with an
encounter order that is ascending order.  Overriding implementations
should document the reporting of additional characteristic values.

<p>The {@linkplain Spliterator#getComparator() spliterator's comparator}
is {@code null} if the {@linkplain #comparator() set's comparator}
is {@code null}.
Otherwise, the spliterator's comparator is the same as or imposes the
same total ordering as the set's comparator.

@return a {@code Spliterator} over the elements in this set
@since 1.8