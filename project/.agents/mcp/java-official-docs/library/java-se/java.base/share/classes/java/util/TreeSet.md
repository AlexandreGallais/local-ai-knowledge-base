# TreeSet class (java.util)

```java
public class TreeSet<E> extends AbstractSet<E> implements NavigableSet<E>, Cloneable, java.io.Serializable
```

A {@link NavigableSet} implementation based on a {@link TreeMap}.
The elements are ordered using their {@linkplain Comparable natural
ordering}, or by a {@link Comparator} provided at set creation
time, depending on which constructor is used.

<p>This implementation provides guaranteed log(n) time cost for the basic
operations ({@code add}, {@code remove} and {@code contains}).

<p>Note that the ordering maintained by a set (whether or not an explicit
comparator is provided) must be <i>consistent with equals</i> if it is to
correctly implement the {@code Set} interface.  (See {@code Comparable}
or {@code Comparator} for a precise definition of <i>consistent with
equals</i>.)  This is so because the {@code Set} interface is defined in
terms of the {@code equals} operation, but a {@code TreeSet} instance
performs all element comparisons using its {@code compareTo} (or
{@code compare}) method, so two elements that are deemed equal by this method
are, from the standpoint of the set, equal.  The behavior of a set
<i>is</i> well-defined even if its ordering is inconsistent with equals; it
just fails to obey the general contract of the {@code Set} interface.

<p><strong>Note that this implementation is not synchronized.</strong>
If multiple threads access a tree set concurrently, and at least one
of the threads modifies the set, it <i>must</i> be synchronized
externally.  This is typically accomplished by synchronizing on some
object that naturally encapsulates the set.
If no such object exists, the set should be "wrapped" using the
{@link Collections#synchronizedSortedSet Collections.synchronizedSortedSet}
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the set: <pre>
  SortedSet s = Collections.synchronizedSortedSet(new TreeSet(...));</pre>

<p>The iterators returned by this class's {@code iterator} method are
<i>fail-fast</i>: if the set is modified at any time after the iterator is
created, in any way except through the iterator's own {@code remove}
method, the iterator will throw a {@link ConcurrentModificationException}.
Thus, in the face of concurrent modification, the iterator fails quickly
and cleanly, rather than risking arbitrary, non-deterministic behavior at
an undetermined time in the future.

<p>Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw {@code ConcurrentModificationException} on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness:   <i>the fail-fast behavior of iterators
should be used only to detect bugs.</i>

<p>The {@link #addFirst addFirst} and {@link #addLast addLast} methods of this class
throw {@code UnsupportedOperationException}. The encounter order of elements is determined
by the comparison method; therefore, explicit positioning is not supported.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@param <E> the type of elements maintained by this set

@author  Josh Bloch
@see     Collection
@see     Set
@see     HashSet
@see     Comparable
@see     Comparator
@see     TreeMap
@since   1.2

## TreeSet.TreeSet()

```java
public TreeSet()
```

Constructs a new, empty tree set, sorted according to the
natural ordering of its elements.  All elements inserted into
the set must implement the {@link Comparable} interface.
Furthermore, all such elements must be <i>mutually
comparable</i>: {@code e1.compareTo(e2)} must not throw a
{@code ClassCastException} for any elements {@code e1} and
{@code e2} in the set.  If the user attempts to add an element
to the set that violates this constraint (for example, the user
attempts to add a string element to a set whose elements are
integers), the {@code add} call will throw a
{@code ClassCastException}.

## TreeSet.TreeSet(Comparator<? super E>)

```java
public TreeSet(Comparator<? super E> comparator)
```

Constructs a new, empty tree set, sorted according to the specified
comparator.  All elements inserted into the set must be <i>mutually
comparable</i> by the specified comparator: {@code comparator.compare(e1,
e2)} must not throw a {@code ClassCastException} for any elements
{@code e1} and {@code e2} in the set.  If the user attempts to add
an element to the set that violates this constraint, the
{@code add} call will throw a {@code ClassCastException}.

@param comparator the comparator that will be used to order this set.
       If {@code null}, the {@linkplain Comparable natural
       ordering} of the elements will be used.

## TreeSet.TreeSet(Collection<? extends E>)

```java
public TreeSet(Collection<? extends E> c)
```

Constructs a new tree set containing the elements in the specified
collection, sorted according to the <i>natural ordering</i> of its
elements.  All elements inserted into the set must implement the
{@link Comparable} interface.  Furthermore, all such elements must be
<i>mutually comparable</i>: {@code e1.compareTo(e2)} must not throw a
{@code ClassCastException} for any elements {@code e1} and
{@code e2} in the set.

@param c collection whose elements will comprise the new set
@throws ClassCastException if the elements in {@code c} are
        not {@link Comparable}, or are not mutually comparable
@throws NullPointerException if the specified collection is null

## TreeSet.TreeSet(SortedSet<E>)

```java
public TreeSet(SortedSet<E> s)
```

Constructs a new tree set containing the same elements and
using the same ordering as the specified sorted set.

@param s sorted set whose elements will comprise the new set
@throws NullPointerException if the specified sorted set is null

## TreeSet.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this set in ascending order.

@return an iterator over the elements in this set in ascending order

## TreeSet.descendingIterator()

```java
public Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this set in descending order.

@return an iterator over the elements in this set in descending order
@since 1.6

## TreeSet.descendingSet()

```java
public NavigableSet<E> descendingSet()
```

@since 1.6

## TreeSet.size()

```java
public int size()
```

Returns the number of elements in this set (its cardinality).

@return the number of elements in this set (its cardinality)

## TreeSet.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this set contains no elements.

@return {@code true} if this set contains no elements

## TreeSet.contains(Object)

```java
public boolean contains(Object o)
```

Returns {@code true} if this set contains the specified element.
More formally, returns {@code true} if and only if this set
contains an element {@code e} such that
{@code Objects.equals(o, e)}.

@param o object to be checked for containment in this set
@return {@code true} if this set contains the specified element
@throws ClassCastException if the specified object cannot be compared
        with the elements currently in the set
@throws NullPointerException if the specified element is null
        and this set uses natural ordering, or its comparator
        does not permit null elements

## TreeSet.add(E)

```java
public boolean add(E e)
```

Adds the specified element to this set if it is not already present.
More formally, adds the specified element {@code e} to this set if
the set contains no element {@code e2} such that
{@code Objects.equals(e, e2)}.
If this set already contains the element, the call leaves the set
unchanged and returns {@code false}.

@param e element to be added to this set
@return {@code true} if this set did not already contain the specified
        element
@throws ClassCastException if the specified object cannot be compared
        with the elements currently in this set
@throws NullPointerException if the specified element is null
        and this set uses natural ordering, or its comparator
        does not permit null elements

## TreeSet.remove(Object)

```java
public boolean remove(Object o)
```

Removes the specified element from this set if it is present.
More formally, removes an element {@code e} such that
{@code Objects.equals(o, e)},
if this set contains such an element.  Returns {@code true} if
this set contained the element (or equivalently, if this set
changed as a result of the call).  (This set will not contain the
element once the call returns.)

@param o object to be removed from this set, if present
@return {@code true} if this set contained the specified element
@throws ClassCastException if the specified object cannot be compared
        with the elements currently in this set
@throws NullPointerException if the specified element is null
        and this set uses natural ordering, or its comparator
        does not permit null elements

## TreeSet.clear()

```java
public void clear()
```

Removes all of the elements from this set.
The set will be empty after this call returns.

## TreeSet.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Adds all of the elements in the specified collection to this set.

@param c collection containing elements to be added to this set
@return {@code true} if this set changed as a result of the call
@throws ClassCastException if the elements provided cannot be compared
        with the elements currently in the set
@throws NullPointerException if the specified collection is null or
        if any element is null and this set uses natural ordering, or
        its comparator does not permit null elements

## TreeSet.subSet(E, boolean, E, boolean)

```java
public NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromElement} or {@code toElement}
        is null and this set uses natural ordering, or its comparator
        does not permit null elements
@throws IllegalArgumentException {@inheritDoc}
@since 1.6

## TreeSet.headSet(E, boolean)

```java
public NavigableSet<E> headSet(E toElement, boolean inclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code toElement} is null and
        this set uses natural ordering, or its comparator does
        not permit null elements
@throws IllegalArgumentException {@inheritDoc}
@since 1.6

## TreeSet.tailSet(E, boolean)

```java
public NavigableSet<E> tailSet(E fromElement, boolean inclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromElement} is null and
        this set uses natural ordering, or its comparator does
        not permit null elements
@throws IllegalArgumentException {@inheritDoc}
@since 1.6

## TreeSet.subSet(E, E)

```java
public SortedSet<E> subSet(E fromElement, E toElement)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromElement} or
        {@code toElement} is null and this set uses natural ordering,
        or its comparator does not permit null elements
@throws IllegalArgumentException {@inheritDoc}

## TreeSet.headSet(E)

```java
public SortedSet<E> headSet(E toElement)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code toElement} is null
        and this set uses natural ordering, or its comparator does
        not permit null elements
@throws IllegalArgumentException {@inheritDoc}

## TreeSet.tailSet(E)

```java
public SortedSet<E> tailSet(E fromElement)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromElement} is null
        and this set uses natural ordering, or its comparator does
        not permit null elements
@throws IllegalArgumentException {@inheritDoc}

## TreeSet.first()

```java
public E first()
```

@throws NoSuchElementException {@inheritDoc}

## TreeSet.last()

```java
public E last()
```

@throws NoSuchElementException {@inheritDoc}

## TreeSet.lower(E)

```java
public E lower(E e)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified element is null
        and this set uses natural ordering, or its comparator
        does not permit null elements
@since 1.6

## TreeSet.floor(E)

```java
public E floor(E e)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified element is null
        and this set uses natural ordering, or its comparator
        does not permit null elements
@since 1.6

## TreeSet.ceiling(E)

```java
public E ceiling(E e)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified element is null
        and this set uses natural ordering, or its comparator
        does not permit null elements
@since 1.6

## TreeSet.higher(E)

```java
public E higher(E e)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified element is null
        and this set uses natural ordering, or its comparator
        does not permit null elements
@since 1.6

## TreeSet.pollFirst()

```java
public E pollFirst()
```

@since 1.6

## TreeSet.pollLast()

```java
public E pollLast()
```

@since 1.6

## TreeSet.addFirst(E)

```java
public void addFirst(E e)
```

Throws {@code UnsupportedOperationException}. The encounter order induced by this
set's comparison method determines the position of elements, so explicit positioning
is not supported.

@throws UnsupportedOperationException always
@since 21

## TreeSet.addLast(E)

```java
public void addLast(E e)
```

Throws {@code UnsupportedOperationException}. The encounter order induced by this
set's comparison method determines the position of elements, so explicit positioning
is not supported.

@throws UnsupportedOperationException always
@since 21

## TreeSet.clone()

```java
public Object clone()
```

Returns a shallow copy of this {@code TreeSet} instance. (The elements
themselves are not cloned.)

@return a shallow copy of this set

## TreeSet.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a <em><a href="Spliterator.html#binding">late-binding</a></em>
and <em>fail-fast</em> {@link Spliterator} over the elements in this
set.

<p>The {@code Spliterator} reports {@link Spliterator#SIZED},
{@link Spliterator#DISTINCT}, {@link Spliterator#SORTED}, and
{@link Spliterator#ORDERED}.  Overriding implementations should document
the reporting of additional characteristic values.

<p>The spliterator's comparator (see
{@link java.util.Spliterator#getComparator()}) is {@code null} if
the tree set's comparator (see {@link #comparator()}) is {@code null}.
Otherwise, the spliterator's comparator is the same as or imposes the
same total ordering as the tree set's comparator.

@return a {@code Spliterator} over the elements in this set
@since 1.8