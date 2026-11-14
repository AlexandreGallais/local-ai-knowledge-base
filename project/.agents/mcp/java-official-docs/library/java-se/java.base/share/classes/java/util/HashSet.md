# HashSet class (java.util)

```java
public class HashSet<E> extends AbstractSet<E> implements Set<E>, Cloneable, java.io.Serializable
```

This class implements the {@code Set} interface, backed by a hash table
(actually a {@code HashMap} instance).  It makes no guarantees as to the
iteration order of the set; in particular, it does not guarantee that the
order will remain constant over time.  This class permits the {@code null}
element.

<p>This class offers constant time performance for the basic operations
({@code add}, {@code remove}, {@code contains} and {@code size}),
assuming the hash function disperses the elements properly among the
buckets.  Iterating over this set requires time proportional to the sum of
the {@code HashSet} instance's size (the number of elements) plus the
"capacity" of the backing {@code HashMap} instance (the number of
buckets).  Thus, it's very important not to set the initial capacity too
high (or the load factor too low) if iteration performance is important.

<p><strong>Note that this implementation is not synchronized.</strong>
If multiple threads access a hash set concurrently, and at least one of
the threads modifies the set, it <i>must</i> be synchronized externally.
This is typically accomplished by synchronizing on some object that
naturally encapsulates the set.

If no such object exists, the set should be "wrapped" using the
{@link Collections#synchronizedSet Collections.synchronizedSet}
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the set:<pre>
  Set s = Collections.synchronizedSet(new HashSet(...));</pre>

<p>The iterators returned by this class's {@code iterator} method are
<i>fail-fast</i>: if the set is modified at any time after the iterator is
created, in any way except through the iterator's own {@code remove}
method, the Iterator throws a {@link ConcurrentModificationException}.
Thus, in the face of concurrent modification, the iterator fails quickly
and cleanly, rather than risking arbitrary, non-deterministic behavior at
an undetermined time in the future.

<p>Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw {@code ConcurrentModificationException} on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness: <i>the fail-fast behavior of iterators
should be used only to detect bugs.</i>

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@param <E> the type of elements maintained by this set

@author  Josh Bloch
@author  Neal Gafter
@see     Collection
@see     Set
@see     TreeSet
@see     HashMap
@since   1.2

## HashSet.HashSet()

```java
public HashSet()
```

Constructs a new, empty set; the backing {@code HashMap} instance has
default initial capacity (16) and load factor (0.75).

## HashSet.HashSet(Collection<? extends E>)

```java
public HashSet(Collection<? extends E> c)
```

Constructs a new set containing the elements in the specified
collection.  The {@code HashMap} is created with default load factor
(0.75) and an initial capacity sufficient to contain the elements in
the specified collection.

@param c the collection whose elements are to be placed into this set
@throws NullPointerException if the specified collection is null

## HashSet.HashSet(int, float)

```java
public HashSet(int initialCapacity, float loadFactor)
```

Constructs a new, empty set; the backing {@code HashMap} instance has
the specified initial capacity and the specified load factor.

@apiNote
To create a {@code HashSet} with an initial capacity that accommodates
an expected number of elements, use {@link #newHashSet(int) newHashSet}.

@param      initialCapacity   the initial capacity of the hash map
@param      loadFactor        the load factor of the hash map
@throws     IllegalArgumentException if the initial capacity is less
            than zero, or if the load factor is nonpositive

## HashSet.HashSet(int)

```java
public HashSet(int initialCapacity)
```

Constructs a new, empty set; the backing {@code HashMap} instance has
the specified initial capacity and default load factor (0.75).

@apiNote
To create a {@code HashSet} with an initial capacity that accommodates
an expected number of elements, use {@link #newHashSet(int) newHashSet}.

@param      initialCapacity   the initial capacity of the hash table
@throws     IllegalArgumentException if the initial capacity is less
            than zero

## HashSet.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this set.  The elements
are returned in no particular order.

@return an Iterator over the elements in this set
@see ConcurrentModificationException

## HashSet.size()

```java
public int size()
```

Returns the number of elements in this set (its cardinality).

@return the number of elements in this set (its cardinality)

## HashSet.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this set contains no elements.

@return {@code true} if this set contains no elements

## HashSet.contains(Object)

```java
public boolean contains(Object o)
```

Returns {@code true} if this set contains the specified element.
More formally, returns {@code true} if and only if this set
contains an element {@code e} such that
{@code Objects.equals(o, e)}.

@param o element whose presence in this set is to be tested
@return {@code true} if this set contains the specified element

## HashSet.add(E)

```java
public boolean add(E e)
```

Adds the specified element to this set if it is not already present.
More formally, adds the specified element {@code e} to this set if
this set contains no element {@code e2} such that
{@code Objects.equals(e, e2)}.
If this set already contains the element, the call leaves the set
unchanged and returns {@code false}.

@param e element to be added to this set
@return {@code true} if this set did not already contain the specified
element

## HashSet.remove(Object)

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
@return {@code true} if the set contained the specified element

## HashSet.clear()

```java
public void clear()
```

Removes all of the elements from this set.
The set will be empty after this call returns.

## HashSet.clone()

```java
public Object clone()
```

Returns a shallow copy of this {@code HashSet} instance: the elements
themselves are not cloned.

@return a shallow copy of this set

## HashSet.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a <em><a href="Spliterator.html#binding">late-binding</a></em>
and <em>fail-fast</em> {@link Spliterator} over the elements in this
set.

<p>The {@code Spliterator} reports {@link Spliterator#SIZED} and
{@link Spliterator#DISTINCT}.  Overriding implementations should document
the reporting of additional characteristic values.

@return a {@code Spliterator} over the elements in this set
@since 1.8

## HashSet.newHashSet(int)

```java
public static <T> HashSet<T> newHashSet(int numElements)
```

Creates a new, empty HashSet suitable for the expected number of elements.
The returned set uses the default load factor of 0.75, and its initial capacity is
generally large enough so that the expected number of elements can be added
without resizing the set.

@param numElements    the expected number of elements
@param <T>         the type of elements maintained by the new set
@return the newly created set
@throws IllegalArgumentException if numElements is negative
@since 19