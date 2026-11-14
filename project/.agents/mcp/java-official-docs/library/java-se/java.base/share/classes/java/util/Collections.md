# Collections class (java.util)

```java
public final class Collections
```

This class consists exclusively of static methods that operate on or return
collections.  It contains polymorphic algorithms that operate on
collections, "wrappers", which return a new collection backed by a
specified collection, and a few other odds and ends.

<p>The methods of this class all throw a {@code NullPointerException}
if the collections or class objects provided to them are null.

<p>The documentation for the polymorphic algorithms contained in this class
generally includes a brief description of the <i>implementation</i>.  Such
descriptions should be regarded as <i>implementation notes</i>, rather than
parts of the <i>specification</i>.  Implementors should feel free to
substitute other algorithms, so long as the specification itself is adhered
to.  (For example, the algorithm used by {@code sort} does not have to be
a mergesort, but it does have to be <i>stable</i>.)

<p>The "destructive" algorithms contained in this class, that is, the
algorithms that modify the collection on which they operate, are specified
to throw {@code UnsupportedOperationException} if the collection does not
support the appropriate mutation primitive(s), such as the {@code set}
method.  These algorithms may, but are not required to, throw this
exception if an invocation would have no effect on the collection.  For
example, invoking the {@code sort} method on an unmodifiable list that is
already sorted may or may not throw {@code UnsupportedOperationException}.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@author  Josh Bloch
@author  Neal Gafter
@see     Collection
@see     Set
@see     List
@see     Map
@since   1.2

## Collections.sort(List<T>)

```java
public static <T extends Comparable<? super T>> void sort(List<T> list)
```

Sorts the specified list into ascending order, according to the
{@linkplain Comparable natural ordering} of its elements.
All elements in the list must implement the {@link Comparable}
interface.  Furthermore, all elements in the list must be
<i>mutually comparable</i> (that is, {@code e1.compareTo(e2)}
must not throw a {@code ClassCastException} for any elements
{@code e1} and {@code e2} in the list).

<p>This sort is guaranteed to be <i>stable</i>:  equal elements will
not be reordered as a result of the sort.

<p>The specified list must be modifiable, but need not be resizable.

@implNote
This implementation defers to the {@link List#sort(Comparator)}
method using the specified list and a {@code null} comparator.

@param  <T> the class of the objects in the list
@param  list the list to be sorted.
@throws ClassCastException if the list contains elements that are not
        <i>mutually comparable</i> (for example, strings and integers).
@throws UnsupportedOperationException if the specified list's
        list-iterator does not support the {@code set} operation.
@throws IllegalArgumentException (optional) if the implementation
        detects that the natural ordering of the list elements is
        found to violate the {@link Comparable} contract
@see List#sort(Comparator)

## Collections.sort(List<T>, Comparator<? super T>)

```java
public static <T> void sort(List<T> list, Comparator<? super T> c)
```

Sorts the specified list according to the order induced by the
specified comparator.  All elements in the list must be <i>mutually
comparable</i> using the specified comparator (that is,
{@code c.compare(e1, e2)} must not throw a {@code ClassCastException}
for any elements {@code e1} and {@code e2} in the list).

<p>This sort is guaranteed to be <i>stable</i>:  equal elements will
not be reordered as a result of the sort.

<p>The specified list must be modifiable, but need not be resizable.

@implNote
This implementation defers to the {@link List#sort(Comparator)}
method using the specified list and comparator.

@param  <T> the class of the objects in the list
@param  list the list to be sorted.
@param  c the comparator to determine the order of the list.  A
       {@code null} value indicates that the elements' <i>natural
       ordering</i> should be used.
@throws ClassCastException if the list contains elements that are not
        <i>mutually comparable</i> using the specified comparator.
@throws UnsupportedOperationException if the specified list's
        list-iterator does not support the {@code set} operation.
@throws IllegalArgumentException (optional) if the comparator is
        found to violate the {@link Comparator} contract
@see List#sort(Comparator)

## Collections.binarySearch(List<? extends Comparable<? super T>>, T)

```java
public static <T> int binarySearch(List<? extends Comparable<? super T>> list, T key)
```

Searches the specified list for the specified object using the binary
search algorithm.  The list must be sorted into ascending order
according to the {@linkplain Comparable natural ordering} of its
elements (as by the {@link #sort(List)} method) prior to making this
call.  If it is not sorted, the results are undefined.  If the list
contains multiple elements equal to the specified object, there is no
guarantee which one will be found.

<p>This method runs in log(n) time for a "random access" list (which
provides near-constant-time positional access).  If the specified list
does not implement the {@link RandomAccess} interface and is large,
this method will do an iterator-based binary search that performs
O(n) link traversals and O(log n) element comparisons.

@param  <T> the class of the objects in the list
@param  list the list to be searched.
@param  key the key to be searched for.
@return the index of the search key, if it is contained in the list;
        otherwise, <code>(-(<i>insertion point</i>) - 1)</code>.  The
        <i>insertion point</i> is defined as the point at which the
        key would be inserted into the list: the index of the first
        element greater than the key, or {@code list.size()} if all
        elements in the list are less than the specified key.  Note
        that this guarantees that the return value will be &gt;= 0 if
        and only if the key is found.
@throws ClassCastException if the list contains elements that are not
        <i>mutually comparable</i> (for example, strings and
        integers), or the search key is not mutually comparable
        with the elements of the list.

## Collections.binarySearch(List<? extends T>, T, Comparator<? super T>)

```java
public static <T> int binarySearch(List<? extends T> list, T key, Comparator<? super T> c)
```

Searches the specified list for the specified object using the binary
search algorithm.  The list must be sorted into ascending order
according to the specified comparator (as by the
{@link #sort(List, Comparator) sort(List, Comparator)}
method), prior to making this call.  If it is
not sorted, the results are undefined.  If the list contains multiple
elements equal to the specified object, there is no guarantee which one
will be found.

<p>This method runs in log(n) time for a "random access" list (which
provides near-constant-time positional access).  If the specified list
does not implement the {@link RandomAccess} interface and is large,
this method will do an iterator-based binary search that performs
O(n) link traversals and O(log n) element comparisons.

@param  <T> the class of the objects in the list
@param  list the list to be searched.
@param  key the key to be searched for.
@param  c the comparator by which the list is ordered.
        A {@code null} value indicates that the elements'
        {@linkplain Comparable natural ordering} should be used.
@return the index of the search key, if it is contained in the list;
        otherwise, <code>(-(<i>insertion point</i>) - 1)</code>.  The
        <i>insertion point</i> is defined as the point at which the
        key would be inserted into the list: the index of the first
        element greater than the key, or {@code list.size()} if all
        elements in the list are less than the specified key.  Note
        that this guarantees that the return value will be &gt;= 0 if
        and only if the key is found.
@throws ClassCastException if the list contains elements that are not
        <i>mutually comparable</i> using the specified comparator,
        or the search key is not mutually comparable with the
        elements of the list using this comparator.

## Collections.shuffle(List<?>)

```java
public static void shuffle(List<?> list)
```

Randomly permutes the specified list using a default source of
randomness.  All permutations occur with approximately equal
likelihood.

<p>The hedge "approximately" is used in the foregoing description because
default source of randomness is only approximately an unbiased source
of independently chosen bits. If it were a perfect source of randomly
chosen bits, then the algorithm would choose permutations with perfect
uniformity.

<p>This implementation traverses the list backwards, from the last
element up to the second, repeatedly swapping a randomly selected element
into the "current position".  Elements are randomly selected from the
portion of the list that runs from the first element to the current
position, inclusive.

@implSpec This method runs in linear time.  If the specified list does
not implement the {@link RandomAccess} interface and is large, this
implementation dumps the specified list into an array before shuffling
it, and dumps the shuffled array back into the list.  This avoids the
quadratic behavior that would result from shuffling a "sequential
access" list in place.

@param  list the list to be shuffled.
@throws UnsupportedOperationException if the specified list or
        its list-iterator does not support the {@code set} operation.

## Collections.shuffle(List<?>, Random)

```java
public static void shuffle(List<?> list, Random rnd)
```

Randomly permute the specified list using the specified source of
randomness.<p>

This method is equivalent to {@link #shuffle(List, RandomGenerator)}
and exists for backward compatibility. The {@link #shuffle(List, RandomGenerator)}
method is preferred, as it is not limited to random generators
that extend the {@link Random} class.

@param  list the list to be shuffled.
@param  rnd the source of randomness to use to shuffle the list.
@throws UnsupportedOperationException if the specified list or its
        list-iterator does not support the {@code set} operation.

## Collections.fill(List<? super T>, T)

```java
public static <T> void fill(List<? super T> list, T obj)
```

Replaces all of the elements of the specified list with the specified
element. <p>

This method runs in linear time.

@param  <T> the class of the objects in the list
@param  list the list to be filled with the specified element.
@param  obj The element with which to fill the specified list.
@throws UnsupportedOperationException if the specified list or its
        list-iterator does not support the {@code set} operation.

## Collections.copy(List<? super T>, List<? extends T>)

```java
public static <T> void copy(List<? super T> dest, List<? extends T> src)
```

Copies all of the elements from one list into another.  After the
operation, the index of each copied element in the destination list
will be identical to its index in the source list.  The destination
list's size must be greater than or equal to the source list's size.
If it is greater, the remaining elements in the destination list are
unaffected. <p>

This method runs in linear time.

@param  <T> the class of the objects in the lists
@param  dest The destination list.
@param  src The source list.
@throws IndexOutOfBoundsException if the destination list is too small
        to contain the entire source List.
@throws UnsupportedOperationException if the destination list's
        list-iterator does not support the {@code set} operation.

## Collections.min(Collection<? extends T>)

```java
public static <T extends Object & Comparable<? super T>> T min(Collection<? extends T> coll)
```

Returns the minimum element of the given collection, according to the
<i>natural ordering</i> of its elements.  All elements in the
collection must implement the {@code Comparable} interface.
Furthermore, all elements in the collection must be <i>mutually
comparable</i> (that is, {@code e1.compareTo(e2)} must not throw a
{@code ClassCastException} for any elements {@code e1} and
{@code e2} in the collection).<p>

This method iterates over the entire collection, hence it requires
time proportional to the size of the collection.

@param  <T> the class of the objects in the collection
@param  coll the collection whose minimum element is to be determined.
@return the minimum element of the given collection, according
        to the <i>natural ordering</i> of its elements.
@throws ClassCastException if the collection contains elements that are
        not <i>mutually comparable</i> (for example, strings and
        integers).
@throws NoSuchElementException if the collection is empty.
@see Comparable

## Collections.max(Collection<? extends T>)

```java
public static <T extends Object & Comparable<? super T>> T max(Collection<? extends T> coll)
```

Returns the maximum element of the given collection, according to the
<i>natural ordering</i> of its elements.  All elements in the
collection must implement the {@code Comparable} interface.
Furthermore, all elements in the collection must be <i>mutually
comparable</i> (that is, {@code e1.compareTo(e2)} must not throw a
{@code ClassCastException} for any elements {@code e1} and
{@code e2} in the collection).<p>

This method iterates over the entire collection, hence it requires
time proportional to the size of the collection.

@param  <T> the class of the objects in the collection
@param  coll the collection whose maximum element is to be determined.
@return the maximum element of the given collection, according
        to the <i>natural ordering</i> of its elements.
@throws ClassCastException if the collection contains elements that are
        not <i>mutually comparable</i> (for example, strings and
        integers).
@throws NoSuchElementException if the collection is empty.
@see Comparable

## Collections.rotate(List<?>, int)

```java
public static void rotate(List<?> list, int distance)
```

Rotates the elements in the specified list by the specified distance.
After calling this method, the element at index {@code i} will be
the element previously at index {@code (i - distance)} mod
{@code list.size()}, for all values of {@code i} between {@code 0}
and {@code list.size()-1}, inclusive.  (This method has no effect on
the size of the list.)

<p>For example, suppose {@code list} comprises{@code  [t, a, n, k, s]}.
After invoking {@code Collections.rotate(list, 1)} (or
{@code Collections.rotate(list, -4)}), {@code list} will comprise
{@code [s, t, a, n, k]}.

<p>Note that this method can usefully be applied to sublists to
move one or more elements within a list while preserving the
order of the remaining elements.  For example, the following idiom
moves the element at index {@code j} forward to position
{@code k} (which must be greater than or equal to {@code j}):
<pre>
    Collections.rotate(list.subList(j, k+1), -1);
</pre>
To make this concrete, suppose {@code list} comprises
{@code [a, b, c, d, e]}.  To move the element at index {@code 1}
({@code b}) forward two positions, perform the following invocation:
<pre>
    Collections.rotate(l.subList(1, 4), -1);
</pre>
The resulting list is {@code [a, c, d, b, e]}.

<p>To move more than one element forward, increase the absolute value
of the rotation distance.  To move elements backward, use a positive
shift distance.

<p>If the specified list is small or implements the {@link
RandomAccess} interface, this implementation exchanges the first
element into the location it should go, and then repeatedly exchanges
the displaced element into the location it should go until a displaced
element is swapped into the first element.  If necessary, the process
is repeated on the second and successive elements, until the rotation
is complete.  If the specified list is large and doesn't implement the
{@code RandomAccess} interface, this implementation breaks the
list into two sublist views around index {@code -distance mod size}.
Then the {@link #reverse(List)} method is invoked on each sublist view,
and finally it is invoked on the entire list.  For a more complete
description of both algorithms, see Section 2.3 of Jon Bentley's
<i>Programming Pearls</i> (Addison-Wesley, 1986).

@param list the list to be rotated.
@param distance the distance to rotate the list.  There are no
       constraints on this value; it may be zero, negative, or
       greater than {@code list.size()}.
@throws UnsupportedOperationException if the specified list or
        its list-iterator does not support the {@code set} operation.
@since 1.4

## Collections.replaceAll(List<T>, T, T)

```java
public static <T> boolean replaceAll(List<T> list, T oldVal, T newVal)
```

Replaces all occurrences of one specified value in a list with another.
More formally, replaces with {@code newVal} each element {@code e}
in {@code list} such that
{@code (oldVal==null ? e==null : oldVal.equals(e))}.
(This method has no effect on the size of the list.)

@param  <T> the class of the objects in the list
@param list the list in which replacement is to occur.
@param oldVal the old value to be replaced.
@param newVal the new value with which {@code oldVal} is to be
       replaced.
@return {@code true} if {@code list} contained one or more elements
        {@code e} such that
        {@code (oldVal==null ?  e==null : oldVal.equals(e))}.
@throws UnsupportedOperationException if the specified list or
        its list-iterator does not support the {@code set} operation.
@since  1.4

## Collections.indexOfSubList(List<?>, List<?>)

```java
public static int indexOfSubList(List<?> source, List<?> target)
```

Returns the starting position of the first occurrence of the specified
target list within the specified source list, or -1 if there is no
such occurrence.  More formally, returns the lowest index {@code i}
such that {@code source.subList(i, i+target.size()).equals(target)},
or -1 if there is no such index.  (Returns -1 if
{@code target.size() > source.size()})

<p>This implementation uses the "brute force" technique of scanning
over the source list, looking for a match with the target at each
location in turn.

@param source the list in which to search for the first occurrence
       of {@code target}.
@param target the list to search for as a subList of {@code source}.
@return the starting position of the first occurrence of the specified
        target list within the specified source list, or -1 if there
        is no such occurrence.
@since  1.4

## Collections.lastIndexOfSubList(List<?>, List<?>)

```java
public static int lastIndexOfSubList(List<?> source, List<?> target)
```

Returns the starting position of the last occurrence of the specified
target list within the specified source list, or -1 if there is no such
occurrence.  More formally, returns the highest index {@code i}
such that {@code source.subList(i, i+target.size()).equals(target)},
or -1 if there is no such index.  (Returns -1 if
{@code target.size() > source.size()})

<p>This implementation uses the "brute force" technique of iterating
over the source list, looking for a match with the target at each
location in turn.

@param source the list in which to search for the last occurrence
       of {@code target}.
@param target the list to search for as a subList of {@code source}.
@return the starting position of the last occurrence of the specified
        target list within the specified source list, or -1 if there
        is no such occurrence.
@since  1.4

## Collections.unmodifiableCollection(Collection<? extends T>)

```java
public static <T> Collection<T> unmodifiableCollection(Collection<? extends T> c)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified collection. Query operations on the returned collection "read through"
to the specified collection, and attempts to modify the returned
collection, whether direct or via its iterator, result in an
{@code UnsupportedOperationException}.<p>

The returned collection does <i>not</i> pass the hashCode and equals
operations through to the backing collection, but relies on
{@code Object}'s {@code equals} and {@code hashCode} methods.  This
is necessary to preserve the contracts of these operations in the case
that the backing collection is a set or a list.<p>

The returned collection will be serializable if the specified collection
is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param  <T> the class of the objects in the collection
@param  c the collection for which an unmodifiable view is to be
        returned.
@return an unmodifiable view of the specified collection.

## Collections.unmodifiableSequencedCollection(SequencedCollection<? extends T>)

```java
public static <T> SequencedCollection<T> unmodifiableSequencedCollection(SequencedCollection<? extends T> c)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified {@code SequencedCollection}. Query operations on the returned collection
"read through" to the specified collection, and attempts to modify the returned
collection, whether direct or via its iterator, result in an
{@code UnsupportedOperationException}.<p>

The returned collection does <i>not</i> pass the {@code hashCode} and
{@code equals} operations through to the backing collection, but relies on
{@code Object}'s {@code equals} and {@code hashCode} methods.  This
is necessary to preserve the contracts of these operations in the case
that the backing collection is a set or a list.<p>

The returned collection will be serializable if the specified collection
is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param  <T> the class of the objects in the collection
@param  c the collection for which an unmodifiable view is to be
        returned.
@return an unmodifiable view of the specified collection.
@since 21

## Collections.unmodifiableSet(Set<? extends T>)

```java
public static <T> Set<T> unmodifiableSet(Set<? extends T> s)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified set. Query operations on the returned set "read through" to the specified
set, and attempts to modify the returned set, whether direct or via its
iterator, result in an {@code UnsupportedOperationException}.<p>

The returned set will be serializable if the specified set
is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param  <T> the class of the objects in the set
@param  s the set for which an unmodifiable view is to be returned.
@return an unmodifiable view of the specified set.

## Collections.unmodifiableSequencedSet(SequencedSet<? extends T>)

```java
public static <T> SequencedSet<T> unmodifiableSequencedSet(SequencedSet<? extends T> s)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified {@code SequencedSet}. Query operations on the returned set
"read through" to the specified set, and attempts to modify the returned
set, whether direct or via its iterator, result in an
{@code UnsupportedOperationException}.<p>

The returned set will be serializable if the specified set
is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param  <T> the class of the objects in the set
@param  s the set for which an unmodifiable view is to be returned.
@return an unmodifiable view of the specified sequenced set.
@since 21

## Collections.unmodifiableSortedSet(SortedSet<T>)

```java
public static <T> SortedSet<T> unmodifiableSortedSet(SortedSet<T> s)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified sorted set. Query operations on the returned sorted set "read
through" to the specified sorted set.  Attempts to modify the returned
sorted set, whether direct, via its iterator, or via its
{@code subSet}, {@code headSet}, or {@code tailSet} views, result in
an {@code UnsupportedOperationException}.<p>

The returned sorted set will be serializable if the specified sorted set
is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param  <T> the class of the objects in the set
@param s the sorted set for which an unmodifiable view is to be
       returned.
@return an unmodifiable view of the specified sorted set.

## Collections.unmodifiableNavigableSet(NavigableSet<T>)

```java
public static <T> NavigableSet<T> unmodifiableNavigableSet(NavigableSet<T> s)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified navigable set. Query operations on the returned navigable set "read
through" to the specified navigable set.  Attempts to modify the returned
navigable set, whether direct, via its iterator, or via its
{@code subSet}, {@code headSet}, or {@code tailSet} views, result in
an {@code UnsupportedOperationException}.<p>

The returned navigable set will be serializable if the specified
navigable set is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param  <T> the class of the objects in the set
@param s the navigable set for which an unmodifiable view is to be
       returned
@return an unmodifiable view of the specified navigable set
@since 1.8

## Collections.unmodifiableList(List<? extends T>)

```java
public static <T> List<T> unmodifiableList(List<? extends T> list)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified list. Query operations on the returned list "read through" to the
specified list, and attempts to modify the returned list, whether
direct or via its iterator, result in an
{@code UnsupportedOperationException}.<p>

The returned list will be serializable if the specified list
is serializable. Similarly, the returned list will implement
{@link RandomAccess} if the specified list does.

@implNote This method may return its argument if the argument is already unmodifiable.
@param  <T> the class of the objects in the list
@param  list the list for which an unmodifiable view is to be returned.
@return an unmodifiable view of the specified list.

## Collections.unmodifiableMap(Map<? extends K, ? extends V>)

```java
public static <K,V> Map<K,V> unmodifiableMap(Map<? extends K, ? extends V> m)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified map. Query operations on the returned map "read through"
to the specified map, and attempts to modify the returned
map, whether direct or via its collection views, result in an
{@code UnsupportedOperationException}.<p>

The returned map will be serializable if the specified map
is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param <K> the class of the map keys
@param <V> the class of the map values
@param  m the map for which an unmodifiable view is to be returned.
@return an unmodifiable view of the specified map.

## Collections.contains(Object)

```java
public boolean contains(Object o)
```

This method is overridden to protect the backing set against
an object with a nefarious equals function that senses
that the equality-candidate is Map.Entry and calls its
setValue method.

## Collections.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> coll)
```

The next two methods are overridden to protect against
an unscrupulous List whose contains(Object o) method senses
when o is a Map.Entry, and calls o.setValue.

## Collections.unmodifiableSequencedMap(SequencedMap<? extends K, ? extends V>)

```java
public static <K,V> SequencedMap<K,V> unmodifiableSequencedMap(SequencedMap<? extends K, ? extends V> m)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified {@code SequencedMap}. Query operations on the returned map
"read through" to the specified map, and attempts to modify the returned
map, whether direct or via its collection views, result in an
{@code UnsupportedOperationException}.<p>

The returned map will be serializable if the specified map
is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param <K> the class of the map keys
@param <V> the class of the map values
@param  m the map for which an unmodifiable view is to be returned.
@return an unmodifiable view of the specified map.
@since 21

## Collections.unmodifiableSortedMap(SortedMap<K, ? extends V>)

```java
public static <K,V> SortedMap<K,V> unmodifiableSortedMap(SortedMap<K, ? extends V> m)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified sorted map. Query operations on the returned sorted map "read through"
to the specified sorted map.  Attempts to modify the returned
sorted map, whether direct, via its collection views, or via its
{@code subMap}, {@code headMap}, or {@code tailMap} views, result in
an {@code UnsupportedOperationException}.<p>

The returned sorted map will be serializable if the specified sorted map
is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param <K> the class of the map keys
@param <V> the class of the map values
@param m the sorted map for which an unmodifiable view is to be
       returned.
@return an unmodifiable view of the specified sorted map.

## Collections.unmodifiableNavigableMap(NavigableMap<K, ? extends V>)

```java
public static <K,V> NavigableMap<K,V> unmodifiableNavigableMap(NavigableMap<K, ? extends V> m)
```

Returns an <a href="Collection.html#unmodview">unmodifiable view</a> of the
specified navigable map. Query operations on the returned navigable map "read
through" to the specified navigable map.  Attempts to modify the returned
navigable map, whether direct, via its collection views, or via its
{@code subMap}, {@code headMap}, or {@code tailMap} views, result in
an {@code UnsupportedOperationException}.<p>

The returned navigable map will be serializable if the specified
navigable map is serializable.

@implNote This method may return its argument if the argument is already unmodifiable.
@param <K> the class of the map keys
@param <V> the class of the map values
@param m the navigable map for which an unmodifiable view is to be
       returned
@return an unmodifiable view of the specified navigable map
@since 1.8

## Collections.synchronizedCollection(Collection<T>)

```java
public static <T> Collection<T> synchronizedCollection(Collection<T> c)
```

Returns a synchronized (thread-safe) collection backed by the specified
collection.  In order to guarantee serial access, it is critical that
<strong>all</strong> access to the backing collection is accomplished
through the returned collection.<p>

It is imperative that the user manually synchronize on the returned
collection when traversing it via {@link Iterator}, {@link Spliterator}
or {@link Stream}:
<pre>
 Collection c = Collections.synchronizedCollection(myCollection);
    ...
 synchronized (c) {
     Iterator i = c.iterator(); // Must be in the synchronized block
     while (i.hasNext())
        foo(i.next());
 }
</pre>
Failure to follow this advice may result in non-deterministic behavior.

<p>The returned collection does <i>not</i> pass the {@code hashCode}
and {@code equals} operations through to the backing collection, but
relies on {@code Object}'s equals and hashCode methods.  This is
necessary to preserve the contracts of these operations in the case
that the backing collection is a set or a list.<p>

The returned collection will be serializable if the specified collection
is serializable.

@param  <T> the class of the objects in the collection
@param  c the collection to be "wrapped" in a synchronized collection.
@return a synchronized view of the specified collection.

## Collections.synchronizedSet(Set<T>)

```java
public static <T> Set<T> synchronizedSet(Set<T> s)
```

Returns a synchronized (thread-safe) set backed by the specified
set.  In order to guarantee serial access, it is critical that
<strong>all</strong> access to the backing set is accomplished
through the returned set.<p>

It is imperative that the user manually synchronize on the returned
collection when traversing it via {@link Iterator}, {@link Spliterator}
or {@link Stream}:
<pre>
 Set s = Collections.synchronizedSet(new HashSet());
     ...
 synchronized (s) {
     Iterator i = s.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
Failure to follow this advice may result in non-deterministic behavior.

<p>The returned set will be serializable if the specified set is
serializable.

@param  <T> the class of the objects in the set
@param  s the set to be "wrapped" in a synchronized set.
@return a synchronized view of the specified set.

## Collections.synchronizedSortedSet(SortedSet<T>)

```java
public static <T> SortedSet<T> synchronizedSortedSet(SortedSet<T> s)
```

Returns a synchronized (thread-safe) sorted set backed by the specified
sorted set.  In order to guarantee serial access, it is critical that
<strong>all</strong> access to the backing sorted set is accomplished
through the returned sorted set (or its views).<p>

It is imperative that the user manually synchronize on the returned
sorted set when traversing it or any of its {@code subSet},
{@code headSet}, or {@code tailSet} views via {@link Iterator},
{@link Spliterator} or {@link Stream}:
<pre>
 SortedSet s = Collections.synchronizedSortedSet(new TreeSet());
     ...
 synchronized (s) {
     Iterator i = s.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
or:
<pre>
 SortedSet s = Collections.synchronizedSortedSet(new TreeSet());
 SortedSet s2 = s.headSet(foo);
     ...
 synchronized (s) {  // Note: s, not s2!!!
     Iterator i = s2.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
Failure to follow this advice may result in non-deterministic behavior.

<p>The returned sorted set will be serializable if the specified
sorted set is serializable.

@param  <T> the class of the objects in the set
@param  s the sorted set to be "wrapped" in a synchronized sorted set.
@return a synchronized view of the specified sorted set.

## Collections.synchronizedNavigableSet(NavigableSet<T>)

```java
public static <T> NavigableSet<T> synchronizedNavigableSet(NavigableSet<T> s)
```

Returns a synchronized (thread-safe) navigable set backed by the
specified navigable set.  In order to guarantee serial access, it is
critical that <strong>all</strong> access to the backing navigable set is
accomplished through the returned navigable set (or its views).<p>

It is imperative that the user manually synchronize on the returned
navigable set when traversing it, or any of its {@code subSet},
{@code headSet}, or {@code tailSet} views, via {@link Iterator},
{@link Spliterator} or {@link Stream}:
<pre>
 NavigableSet s = Collections.synchronizedNavigableSet(new TreeSet());
     ...
 synchronized (s) {
     Iterator i = s.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
or:
<pre>
 NavigableSet s = Collections.synchronizedNavigableSet(new TreeSet());
 NavigableSet s2 = s.headSet(foo, true);
     ...
 synchronized (s) {  // Note: s, not s2!!!
     Iterator i = s2.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
Failure to follow this advice may result in non-deterministic behavior.

<p>The returned navigable set will be serializable if the specified
navigable set is serializable.

@param  <T> the class of the objects in the set
@param  s the navigable set to be "wrapped" in a synchronized navigable
set
@return a synchronized view of the specified navigable set
@since 1.8

## Collections.synchronizedList(List<T>)

```java
public static <T> List<T> synchronizedList(List<T> list)
```

Returns a synchronized (thread-safe) list backed by the specified
list.  In order to guarantee serial access, it is critical that
<strong>all</strong> access to the backing list is accomplished
through the returned list.<p>

It is imperative that the user manually synchronize on the returned
list when traversing it via {@link Iterator}, {@link Spliterator}
or {@link Stream}:
<pre>
 List list = Collections.synchronizedList(new ArrayList());
     ...
 synchronized (list) {
     Iterator i = list.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
Failure to follow this advice may result in non-deterministic behavior.

<p>The returned list will be serializable if the specified list is
serializable.

@param  <T> the class of the objects in the list
@param  list the list to be "wrapped" in a synchronized list.
@return a synchronized view of the specified list.

## Collections.reversed()

```java
public List<E> reversed()
```

Reversed view handling. The reversedView field is transient
and is initialized to null upon construction of the wrapper
and upon deserialization. Reversed views are not serializable.
The reversed view is created on first call to the reversed()
method.

There are four objects at play here:

L = original list
Lr = reversed view of original list
S = synchronized forward wrapper: its backing list is L
Sr = synchronized reversed wrapper: its backing list is Lr

The reversedView field of S points to Sr and vice versa.
This enables the reversed() method always to return the same
object, and for S.reversed().reversed() to return S. This isn't
strictly necessary, because all internal locking is done on S
(which is passed around as mutex). But in the case where the
client does external locking, it's good to minimize the number
of different instances. Note however that external locking on
the reversed wrapper Sr can't be made to work properly with
internal or external locking on the forward wrapper S. (Sublists
of a synchronized wrapper, reversed or not, have the same issue.)

An alternative would be to have a ReversedSynchronizedList view class. However,
that would require two extra classes (one RandomAccess and one not) and it would
complicate the serialization story.

## Collections.synchronizedMap(Map<K,V>)

```java
public static <K,V> Map<K,V> synchronizedMap(Map<K,V> m)
```

Returns a synchronized (thread-safe) map backed by the specified
map.  In order to guarantee serial access, it is critical that
<strong>all</strong> access to the backing map is accomplished
through the returned map.<p>

It is imperative that the user manually synchronize on the returned
map when traversing any of its collection views via {@link Iterator},
{@link Spliterator} or {@link Stream}:
<pre>
 Map m = Collections.synchronizedMap(new HashMap());
     ...
 Set s = m.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not s!
     Iterator i = s.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
Failure to follow this advice may result in non-deterministic behavior.

<p>The returned map will be serializable if the specified map is
serializable.

@param <K> the class of the map keys
@param <V> the class of the map values
@param  m the map to be "wrapped" in a synchronized map.
@return a synchronized view of the specified map.

## Collections.synchronizedSortedMap(SortedMap<K,V>)

```java
public static <K,V> SortedMap<K,V> synchronizedSortedMap(SortedMap<K,V> m)
```

Returns a synchronized (thread-safe) sorted map backed by the specified
sorted map.  In order to guarantee serial access, it is critical that
<strong>all</strong> access to the backing sorted map is accomplished
through the returned sorted map (or its views).<p>

It is imperative that the user manually synchronize on the returned
sorted map when traversing any of its collection views, or the
collections views of any of its {@code subMap}, {@code headMap} or
{@code tailMap} views, via {@link Iterator}, {@link Spliterator} or
{@link Stream}:
<pre>
 SortedMap m = Collections.synchronizedSortedMap(new TreeMap());
     ...
 Set s = m.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not s!
     Iterator i = s.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
or:
<pre>
 SortedMap m = Collections.synchronizedSortedMap(new TreeMap());
 SortedMap m2 = m.subMap(foo, bar);
     ...
 Set s2 = m2.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not m2 or s2!
     Iterator i = s2.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
Failure to follow this advice may result in non-deterministic behavior.

<p>The returned sorted map will be serializable if the specified
sorted map is serializable.

@param <K> the class of the map keys
@param <V> the class of the map values
@param  m the sorted map to be "wrapped" in a synchronized sorted map.
@return a synchronized view of the specified sorted map.

## Collections.synchronizedNavigableMap(NavigableMap<K,V>)

```java
public static <K,V> NavigableMap<K,V> synchronizedNavigableMap(NavigableMap<K,V> m)
```

Returns a synchronized (thread-safe) navigable map backed by the
specified navigable map.  In order to guarantee serial access, it is
critical that <strong>all</strong> access to the backing navigable map is
accomplished through the returned navigable map (or its views).<p>

It is imperative that the user manually synchronize on the returned
navigable map when traversing any of its collection views, or the
collections views of any of its {@code subMap}, {@code headMap} or
{@code tailMap} views, via {@link Iterator}, {@link Spliterator} or
{@link Stream}:
<pre>
 NavigableMap m = Collections.synchronizedNavigableMap(new TreeMap());
     ...
 Set s = m.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not s!
     Iterator i = s.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
or:
<pre>
 NavigableMap m = Collections.synchronizedNavigableMap(new TreeMap());
 NavigableMap m2 = m.subMap(foo, true, bar, false);
     ...
 Set s2 = m2.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not m2 or s2!
     Iterator i = s2.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
 }
</pre>
Failure to follow this advice may result in non-deterministic behavior.

<p>The returned navigable map will be serializable if the specified
navigable map is serializable.

@param <K> the class of the map keys
@param <V> the class of the map values
@param  m the navigable map to be "wrapped" in a synchronized navigable
             map
@return a synchronized view of the specified navigable map.
@since 1.8

## Collections.checkedCollection(Collection<E>, Class<E>)

```java
public static <E> Collection<E> checkedCollection(Collection<E> c, Class<E> type)
```

Returns a dynamically typesafe view of the specified collection.
Any attempt to insert an element of the wrong type will result in an
immediate {@link ClassCastException}.  Assuming a collection
contains no incorrectly typed elements prior to the time a
dynamically typesafe view is generated, and that all subsequent
access to the collection takes place through the view, it is
<i>guaranteed</i> that the collection cannot contain an incorrectly
typed element.

<p>The generics mechanism in the language provides compile-time
(static) type checking, but it is possible to defeat this mechanism
with unchecked casts.  Usually this is not a problem, as the compiler
issues warnings on all such unchecked operations.  There are, however,
times when static type checking alone is not sufficient.  For example,
suppose a collection is passed to a third-party library and it is
imperative that the library code not corrupt the collection by
inserting an element of the wrong type.

<p>Another use of dynamically typesafe views is debugging.  Suppose a
program fails with a {@code ClassCastException}, indicating that an
incorrectly typed element was put into a parameterized collection.
Unfortunately, the exception can occur at any time after the erroneous
element is inserted, so it typically provides little or no information
as to the real source of the problem.  If the problem is reproducible,
one can quickly determine its source by temporarily modifying the
program to wrap the collection with a dynamically typesafe view.
For example, this declaration:
 <pre> {@code
    Collection<String> c = new HashSet<>();
}</pre>
may be replaced temporarily by this one:
 <pre> {@code
    Collection<String> c = Collections.checkedCollection(
        new HashSet<>(), String.class);
}</pre>
Running the program again will cause it to fail at the point where
an incorrectly typed element is inserted into the collection, clearly
identifying the source of the problem.  Once the problem is fixed, the
modified declaration may be reverted back to the original.

<p>The returned collection does <i>not</i> pass the hashCode and equals
operations through to the backing collection, but relies on
{@code Object}'s {@code equals} and {@code hashCode} methods.  This
is necessary to preserve the contracts of these operations in the case
that the backing collection is a set or a list.

<p>The returned collection will be serializable if the specified
collection is serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned collection permits insertion of null elements
whenever the backing collection does.

@param <E> the class of the objects in the collection
@param c the collection for which a dynamically typesafe view is to be
         returned
@param type the type of element that {@code c} is permitted to hold
@return a dynamically typesafe view of the specified collection
@since 1.5

## Collections.checkedQueue(Queue<E>, Class<E>)

```java
public static <E> Queue<E> checkedQueue(Queue<E> queue, Class<E> type)
```

Returns a dynamically typesafe view of the specified queue.
Any attempt to insert an element of the wrong type will result in
an immediate {@link ClassCastException}.  Assuming a queue contains
no incorrectly typed elements prior to the time a dynamically typesafe
view is generated, and that all subsequent access to the queue
takes place through the view, it is <i>guaranteed</i> that the
queue cannot contain an incorrectly typed element.

<p>A discussion of the use of dynamically typesafe views may be
found in the documentation for the {@link #checkedCollection
checkedCollection} method.

<p>The returned queue will be serializable if the specified queue
is serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned queue permits insertion of {@code null} elements
whenever the backing queue does.

@param <E> the class of the objects in the queue
@param queue the queue for which a dynamically typesafe view is to be
            returned
@param type the type of element that {@code queue} is permitted to hold
@return a dynamically typesafe view of the specified queue
@since 1.8

## Collections.checkedSet(Set<E>, Class<E>)

```java
public static <E> Set<E> checkedSet(Set<E> s, Class<E> type)
```

Returns a dynamically typesafe view of the specified set.
Any attempt to insert an element of the wrong type will result in
an immediate {@link ClassCastException}.  Assuming a set contains
no incorrectly typed elements prior to the time a dynamically typesafe
view is generated, and that all subsequent access to the set
takes place through the view, it is <i>guaranteed</i> that the
set cannot contain an incorrectly typed element.

<p>A discussion of the use of dynamically typesafe views may be
found in the documentation for the {@link #checkedCollection
checkedCollection} method.

<p>The returned set will be serializable if the specified set is
serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned set permits insertion of null elements whenever
the backing set does.

@param <E> the class of the objects in the set
@param s the set for which a dynamically typesafe view is to be
         returned
@param type the type of element that {@code s} is permitted to hold
@return a dynamically typesafe view of the specified set
@since 1.5

## Collections.checkedSortedSet(SortedSet<E>, Class<E>)

```java
public static <E> SortedSet<E> checkedSortedSet(SortedSet<E> s, Class<E> type)
```

Returns a dynamically typesafe view of the specified sorted set.
Any attempt to insert an element of the wrong type will result in an
immediate {@link ClassCastException}.  Assuming a sorted set
contains no incorrectly typed elements prior to the time a
dynamically typesafe view is generated, and that all subsequent
access to the sorted set takes place through the view, it is
<i>guaranteed</i> that the sorted set cannot contain an incorrectly
typed element.

<p>A discussion of the use of dynamically typesafe views may be
found in the documentation for the {@link #checkedCollection
checkedCollection} method.

<p>The returned sorted set will be serializable if the specified sorted
set is serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned sorted set permits insertion of null elements
whenever the backing sorted set does.

@param <E> the class of the objects in the set
@param s the sorted set for which a dynamically typesafe view is to be
         returned
@param type the type of element that {@code s} is permitted to hold
@return a dynamically typesafe view of the specified sorted set
@since 1.5

## Collections.checkedNavigableSet(NavigableSet<E>, Class<E>)

```java
public static <E> NavigableSet<E> checkedNavigableSet(NavigableSet<E> s, Class<E> type)
```

Returns a dynamically typesafe view of the specified navigable set.
Any attempt to insert an element of the wrong type will result in an
immediate {@link ClassCastException}.  Assuming a navigable set
contains no incorrectly typed elements prior to the time a
dynamically typesafe view is generated, and that all subsequent
access to the navigable set takes place through the view, it is
<em>guaranteed</em> that the navigable set cannot contain an incorrectly
typed element.

<p>A discussion of the use of dynamically typesafe views may be
found in the documentation for the {@link #checkedCollection
checkedCollection} method.

<p>The returned navigable set will be serializable if the specified
navigable set is serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned navigable set permits insertion of null elements
whenever the backing sorted set does.

@param <E> the class of the objects in the set
@param s the navigable set for which a dynamically typesafe view is to be
         returned
@param type the type of element that {@code s} is permitted to hold
@return a dynamically typesafe view of the specified navigable set
@since 1.8

## Collections.checkedList(List<E>, Class<E>)

```java
public static <E> List<E> checkedList(List<E> list, Class<E> type)
```

Returns a dynamically typesafe view of the specified list.
Any attempt to insert an element of the wrong type will result in
an immediate {@link ClassCastException}.  Assuming a list contains
no incorrectly typed elements prior to the time a dynamically typesafe
view is generated, and that all subsequent access to the list
takes place through the view, it is <i>guaranteed</i> that the
list cannot contain an incorrectly typed element.

<p>A discussion of the use of dynamically typesafe views may be
found in the documentation for the {@link #checkedCollection
checkedCollection} method.

<p>The returned list will be serializable if the specified list
is serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned list permits insertion of null elements whenever
the backing list does.

@param <E> the class of the objects in the list
@param list the list for which a dynamically typesafe view is to be
            returned
@param type the type of element that {@code list} is permitted to hold
@return a dynamically typesafe view of the specified list
@since 1.5

## Collections.replaceAll(UnaryOperator<E>)

```java
public void replaceAll(UnaryOperator<E> operator)
```

{@inheritDoc}

@throws ClassCastException if the class of an element returned by the
        operator prevents it from being added to this collection. The
        exception may be thrown after some elements of the list have
        already been replaced.

## Collections.checkedMap(Map<K, V>, Class<K>, Class<V>)

```java
public static <K, V> Map<K, V> checkedMap(Map<K, V> m, Class<K> keyType, Class<V> valueType)
```

Returns a dynamically typesafe view of the specified map.
Any attempt to insert a mapping whose key or value have the wrong
type will result in an immediate {@link ClassCastException}.
Similarly, any attempt to modify the value currently associated with
a key will result in an immediate {@link ClassCastException},
whether the modification is attempted directly through the map
itself, or through a {@link Map.Entry} instance obtained from the
map's {@link Map#entrySet() entry set} view.

<p>Assuming a map contains no incorrectly typed keys or values
prior to the time a dynamically typesafe view is generated, and
that all subsequent access to the map takes place through the view
(or one of its collection views), it is <i>guaranteed</i> that the
map cannot contain an incorrectly typed key or value.

<p>A discussion of the use of dynamically typesafe views may be
found in the documentation for the {@link #checkedCollection
checkedCollection} method.

<p>The returned map will be serializable if the specified map is
serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned map permits insertion of null keys or values
whenever the backing map does.

@param <K> the class of the map keys
@param <V> the class of the map values
@param m the map for which a dynamically typesafe view is to be
         returned
@param keyType the type of key that {@code m} is permitted to hold
@param valueType the type of value that {@code m} is permitted to hold
@return a dynamically typesafe view of the specified map
@since 1.5

## Collections.contains(Object)

```java
public boolean contains(Object o)
```

This method is overridden to protect the backing set against
an object with a nefarious equals function that senses
that the equality-candidate is Map.Entry and calls its
setValue method.

## Collections.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> c)
```

The bulk collection methods are overridden to protect
against an unscrupulous collection whose contains(Object o)
method senses when o is a Map.Entry, and calls o.setValue.

## Collections.checkedSortedMap(SortedMap<K, V>, Class<K>, Class<V>)

```java
public static <K,V> SortedMap<K,V> checkedSortedMap(SortedMap<K, V> m, Class<K> keyType, Class<V> valueType)
```

Returns a dynamically typesafe view of the specified sorted map.
Any attempt to insert a mapping whose key or value have the wrong
type will result in an immediate {@link ClassCastException}.
Similarly, any attempt to modify the value currently associated with
a key will result in an immediate {@link ClassCastException},
whether the modification is attempted directly through the map
itself, or through a {@link Map.Entry} instance obtained from the
map's {@link Map#entrySet() entry set} view.

<p>Assuming a map contains no incorrectly typed keys or values
prior to the time a dynamically typesafe view is generated, and
that all subsequent access to the map takes place through the view
(or one of its collection views), it is <i>guaranteed</i> that the
map cannot contain an incorrectly typed key or value.

<p>A discussion of the use of dynamically typesafe views may be
found in the documentation for the {@link #checkedCollection
checkedCollection} method.

<p>The returned map will be serializable if the specified map is
serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned map permits insertion of null keys or values
whenever the backing map does.

@param <K> the class of the map keys
@param <V> the class of the map values
@param m the map for which a dynamically typesafe view is to be
         returned
@param keyType the type of key that {@code m} is permitted to hold
@param valueType the type of value that {@code m} is permitted to hold
@return a dynamically typesafe view of the specified map
@since 1.5

## Collections.checkedNavigableMap(NavigableMap<K, V>, Class<K>, Class<V>)

```java
public static <K,V> NavigableMap<K,V> checkedNavigableMap(NavigableMap<K, V> m, Class<K> keyType, Class<V> valueType)
```

Returns a dynamically typesafe view of the specified navigable map.
Any attempt to insert a mapping whose key or value have the wrong
type will result in an immediate {@link ClassCastException}.
Similarly, any attempt to modify the value currently associated with
a key will result in an immediate {@link ClassCastException},
whether the modification is attempted directly through the map
itself, or through a {@link Map.Entry} instance obtained from the
map's {@link Map#entrySet() entry set} view.

<p>Assuming a map contains no incorrectly typed keys or values
prior to the time a dynamically typesafe view is generated, and
that all subsequent access to the map takes place through the view
(or one of its collection views), it is <em>guaranteed</em> that the
map cannot contain an incorrectly typed key or value.

<p>A discussion of the use of dynamically typesafe views may be
found in the documentation for the {@link #checkedCollection
checkedCollection} method.

<p>The returned map will be serializable if the specified map is
serializable.

<p>Since {@code null} is considered to be a value of any reference
type, the returned map permits insertion of null keys or values
whenever the backing map does.

@param <K> type of map keys
@param <V> type of map values
@param m the map for which a dynamically typesafe view is to be
         returned
@param keyType the type of key that {@code m} is permitted to hold
@param valueType the type of value that {@code m} is permitted to hold
@return a dynamically typesafe view of the specified map
@since 1.8

## Collections.emptyIterator()

```java
public static <T> Iterator<T> emptyIterator()
```

Returns an iterator that has no elements.  More precisely,

<ul>
<li>{@link Iterator#hasNext hasNext} always returns {@code
false}.</li>
<li>{@link Iterator#next next} always throws {@link
NoSuchElementException}.</li>
<li>{@link Iterator#remove remove} always throws {@link
IllegalStateException}.</li>
</ul>

<p>Implementations of this method are permitted, but not
required, to return the same object from multiple invocations.

@param <T> type of elements, if there were any, in the iterator
@return an empty iterator
@since 1.7

## Collections.emptyListIterator()

```java
public static <T> ListIterator<T> emptyListIterator()
```

Returns a list iterator that has no elements.  More precisely,

<ul>
<li>{@link Iterator#hasNext hasNext} and {@link
ListIterator#hasPrevious hasPrevious} always return {@code
false}.</li>
<li>{@link Iterator#next next} and {@link ListIterator#previous
previous} always throw {@link NoSuchElementException}.</li>
<li>{@link Iterator#remove remove} and {@link ListIterator#set
set} always throw {@link IllegalStateException}.</li>
<li>{@link ListIterator#add add} always throws {@link
UnsupportedOperationException}.</li>
<li>{@link ListIterator#nextIndex nextIndex} always returns
{@code 0}.</li>
<li>{@link ListIterator#previousIndex previousIndex} always
returns {@code -1}.</li>
</ul>

<p>Implementations of this method are permitted, but not
required, to return the same object from multiple invocations.

@param <T> type of elements, if there were any, in the iterator
@return an empty list iterator
@since 1.7

## Collections.emptyEnumeration()

```java
public static <T> Enumeration<T> emptyEnumeration()
```

Returns an enumeration that has no elements.  More precisely,

<ul>
<li>{@link Enumeration#hasMoreElements hasMoreElements} always
returns {@code false}.</li>
<li> {@link Enumeration#nextElement nextElement} always throws
{@link NoSuchElementException}.</li>
</ul>

<p>Implementations of this method are permitted, but not
required, to return the same object from multiple invocations.

@param  <T> the class of the objects in the enumeration
@return an empty enumeration
@since 1.7

## Collections.EMPTY_SET

```java
public static final Set EMPTY_SET
```

The empty set (immutable).  This set is serializable.

@see #emptySet()

## Collections.emptySet()

```java
public static final <T> Set<T> emptySet()
```

Returns an empty set (immutable).  This set is serializable.
Unlike the like-named field, this method is parameterized.

<p>This example illustrates the type-safe way to obtain an empty set:
<pre>
    Set&lt;String&gt; s = Collections.emptySet();
</pre>
@implNote Implementations of this method need not create a separate
{@code Set} object for each call.  Using this method is likely to have
comparable cost to using the like-named field.  (Unlike this method, the
field does not provide type safety.)

@param  <T> the class of the objects in the set
@return the empty set

@see #EMPTY_SET
@since 1.5

## Collections.emptySortedSet()

```java
public static <E> SortedSet<E> emptySortedSet()
```

Returns an empty sorted set (immutable).  This set is serializable.

<p>This example illustrates the type-safe way to obtain an empty
sorted set:
<pre> {@code
    SortedSet<String> s = Collections.emptySortedSet();
}</pre>

@implNote Implementations of this method need not create a separate
{@code SortedSet} object for each call.

@param <E> type of elements, if there were any, in the set
@return the empty sorted set
@since 1.8

## Collections.emptyNavigableSet()

```java
public static <E> NavigableSet<E> emptyNavigableSet()
```

Returns an empty navigable set (immutable).  This set is serializable.

<p>This example illustrates the type-safe way to obtain an empty
navigable set:
<pre> {@code
    NavigableSet<String> s = Collections.emptyNavigableSet();
}</pre>

@implNote Implementations of this method need not
create a separate {@code NavigableSet} object for each call.

@param <E> type of elements, if there were any, in the set
@return the empty navigable set
@since 1.8

## Collections.EMPTY_LIST

```java
public static final List EMPTY_LIST
```

The empty list (immutable).  This list is serializable.

@see #emptyList()

## Collections.emptyList()

```java
public static final <T> List<T> emptyList()
```

Returns an empty list (immutable).  This list is serializable.

<p>This example illustrates the type-safe way to obtain an empty list:
<pre>
    List&lt;String&gt; s = Collections.emptyList();
</pre>

@implNote
Implementations of this method need not create a separate {@code List}
object for each call.   Using this method is likely to have comparable
cost to using the like-named field.  (Unlike this method, the field does
not provide type safety.)

@param <T> type of elements, if there were any, in the list
@return an empty immutable list

@see #EMPTY_LIST
@since 1.5

## Collections.EMPTY_MAP

```java
public static final Map EMPTY_MAP
```

The empty map (immutable).  This map is serializable.

@see #emptyMap()
@since 1.3

## Collections.emptyMap()

```java
public static final <K,V> Map<K,V> emptyMap()
```

Returns an empty map (immutable).  This map is serializable.

<p>This example illustrates the type-safe way to obtain an empty map:
<pre>
    Map&lt;String, Date&gt; s = Collections.emptyMap();
</pre>
@implNote Implementations of this method need not create a separate
{@code Map} object for each call.  Using this method is likely to have
comparable cost to using the like-named field.  (Unlike this method, the
field does not provide type safety.)

@param <K> the class of the map keys
@param <V> the class of the map values
@return an empty map
@see #EMPTY_MAP
@since 1.5

## Collections.emptySortedMap()

```java
public static final <K,V> SortedMap<K,V> emptySortedMap()
```

Returns an empty sorted map (immutable).  This map is serializable.

<p>This example illustrates the type-safe way to obtain an empty map:
<pre> {@code
    SortedMap<String, Date> s = Collections.emptySortedMap();
}</pre>

@implNote Implementations of this method need not create a separate
{@code SortedMap} object for each call.

@param <K> the class of the map keys
@param <V> the class of the map values
@return an empty sorted map
@since 1.8

## Collections.emptyNavigableMap()

```java
public static final <K,V> NavigableMap<K,V> emptyNavigableMap()
```

Returns an empty navigable map (immutable).  This map is serializable.

<p>This example illustrates the type-safe way to obtain an empty map:
<pre> {@code
    NavigableMap<String, Date> s = Collections.emptyNavigableMap();
}</pre>

@implNote Implementations of this method need not create a separate
{@code NavigableMap} object for each call.

@param <K> the class of the map keys
@param <V> the class of the map values
@return an empty navigable map
@since 1.8

## Collections.singleton(T)

```java
public static <T> Set<T> singleton(T o)
```

Returns an immutable set containing only the specified object.
The returned set is serializable.

@param  <T> the class of the objects in the set
@param o the sole object to be stored in the returned set.
@return an immutable set containing only the specified object.

## Collections.singletonList(T)

```java
public static <T> List<T> singletonList(T o)
```

Returns an immutable list containing only the specified object.
The returned list is serializable.

@param  <T> the class of the objects in the list
@param o the sole object to be stored in the returned list.
@return an immutable list containing only the specified object.
@since 1.3

## Collections.singletonMap(K, V)

```java
public static <K,V> Map<K,V> singletonMap(K key, V value)
```

Returns an immutable map, mapping only the specified key to the
specified value.  The returned map is serializable.

@param <K> the class of the map keys
@param <V> the class of the map values
@param key the sole key to be stored in the returned map.
@param value the value to which the returned map maps {@code key}.
@return an immutable map containing only the specified key-value
        mapping.
@since 1.3

## Collections.nCopies(int, T)

```java
public static <T> List<T> nCopies(int n, T o)
```

Returns an immutable list consisting of {@code n} copies of the
specified object.  The newly allocated data object is tiny (it contains
a single reference to the data object).  This method is useful in
combination with the {@code List.addAll} method to grow lists.
The returned list is serializable.

@param  <T> the class of the object to copy and of the objects
        in the returned list.
@param  n the number of elements in the returned list.
@param  o the element to appear repeatedly in the returned list.
@return an immutable list consisting of {@code n} copies of the
        specified object.
@throws IllegalArgumentException if {@code n < 0}
@see    List#addAll(Collection)
@see    List#addAll(int, Collection)

## Collections.reverseOrder()

```java
public static <T> Comparator<T> reverseOrder()
```

Returns a comparator that imposes the reverse of the <em>natural
ordering</em> on a collection of objects that implement the
{@code Comparable} interface.  (The natural ordering is the ordering
imposed by the objects' own {@code compareTo} method.)  This enables a
simple idiom for sorting (or maintaining) collections (or arrays) of
objects that implement the {@code Comparable} interface in
reverse-natural-order.  For example, suppose {@code a} is an array of
strings. Then: <pre>
         Arrays.sort(a, Collections.reverseOrder());
</pre> sorts the array in reverse-lexicographic (alphabetical) order.<p>

The returned comparator is serializable.

@apiNote
This method returns a {@code Comparator} that is suitable for sorting
elements in reverse order. To obtain a reverse-ordered <i>view</i> of a
sequenced collection, use the {@link SequencedCollection#reversed
SequencedCollection.reversed} method. Or, to obtain a reverse-ordered
<i>view</i> of a sequenced map, use the {@link SequencedMap#reversed
SequencedMap.reversed} method.

@param  <T> the class of the objects compared by the comparator
@return A comparator that imposes the reverse of the <i>natural
        ordering</i> on a collection of objects that implement
        the {@code Comparable} interface.
@see Comparable

## Collections.reverseOrder(Comparator<T>)

```java
public static <T> Comparator<T> reverseOrder(Comparator<T> cmp)
```

Returns a comparator that imposes the reverse ordering of the specified
comparator.  If the specified comparator is {@code null}, this method is
equivalent to {@link #reverseOrder()} (in other words, it returns a
comparator that imposes the reverse of the <em>natural ordering</em> on
a collection of objects that implement the Comparable interface).

<p>The returned comparator is serializable (assuming the specified
comparator is also serializable or {@code null}).

@apiNote
This method returns a {@code Comparator} that is suitable for sorting
elements in reverse order. To obtain a reverse-ordered <i>view</i> of a
sequenced collection, use the {@link SequencedCollection#reversed
SequencedCollection.reversed} method. Or, to obtain a reverse-ordered
<i>view</i> of a sequenced map, use the {@link SequencedMap#reversed
SequencedMap.reversed} method.

@param <T> the class of the objects compared by the comparator
@param cmp a comparator who's ordering is to be reversed by the returned
comparator or {@code null}
@return A comparator that imposes the reverse ordering of the
        specified comparator.
@since 1.5

## Collections.enumeration(Collection<T>)

```java
public static <T> Enumeration<T> enumeration(final Collection<T> c)
```

Returns an enumeration over the specified collection.  This provides
interoperability with legacy APIs that require an enumeration
as input.

<p>The iterator returned from a call to {@link Enumeration#asIterator()}
does not support removal of elements from the specified collection.  This
is necessary to avoid unintentionally increasing the capabilities of the
returned enumeration.

@param  <T> the class of the objects in the collection
@param c the collection for which an enumeration is to be returned.
@return an enumeration over the specified collection.
@see Enumeration

## Collections.list(Enumeration<T>)

```java
public static <T> ArrayList<T> list(Enumeration<T> e)
```

Returns an array list containing the elements returned by the
specified enumeration in the order they are returned by the
enumeration.  This method provides interoperability between
legacy APIs that return enumerations and new APIs that require
collections.

@param <T> the class of the objects returned by the enumeration
@param e enumeration providing elements for the returned
         array list
@return an array list containing the elements returned
        by the specified enumeration.
@since 1.4
@see Enumeration
@see ArrayList

## Collections.frequency(Collection<?>, Object)

```java
public static int frequency(Collection<?> c, Object o)
```

Returns the number of elements in the specified collection equal to the
specified object.  More formally, returns the number of elements
{@code e} in the collection such that
{@code Objects.equals(o, e)}.

@param c the collection in which to determine the frequency
    of {@code o}
@param o the object whose frequency is to be determined
@return the number of elements in {@code c} equal to {@code o}
@throws NullPointerException if {@code c} is null
@since 1.5

## Collections.disjoint(Collection<?>, Collection<?>)

```java
public static boolean disjoint(Collection<?> c1, Collection<?> c2)
```

Returns {@code true} if the two specified collections have no
elements in common.

<p>Care must be exercised if this method is used on collections that
do not comply with the general contract for {@code Collection}.
Implementations may elect to iterate over either collection and test
for containment in the other collection (or to perform any equivalent
computation).  If either collection uses a nonstandard equality test
(as does a {@link SortedSet} whose ordering is not <em>compatible with
equals</em>, or the key set of an {@link IdentityHashMap}), both
collections must use the same nonstandard equality test, or the
result of this method is undefined.

<p>Care must also be exercised when using collections that have
restrictions on the elements that they may contain. Collection
implementations are allowed to throw exceptions for any operation
involving elements they deem ineligible. For absolute safety the
specified collections should contain only elements which are
eligible elements for both collections.

<p>Note that it is permissible to pass the same collection in both
parameters, in which case the method will return {@code true} if and
only if the collection is empty.

@param c1 a collection
@param c2 a collection
@return {@code true} if the two specified collections have no
elements in common.
@throws NullPointerException if either collection is {@code null}.
@throws NullPointerException if one collection contains a {@code null}
element and {@code null} is not an eligible element for the other collection.
(<a href="Collection.html#optional-restrictions">optional</a>)
@throws ClassCastException if one collection contains an element that is
of a type which is ineligible for the other collection.
(<a href="Collection.html#optional-restrictions">optional</a>)
@since 1.5

## Collections.addAll(Collection<? super T>, T...)

```java
public static <T> boolean addAll(Collection<? super T> c, T... elements)
```

Adds all of the specified elements to the specified collection.
Elements to be added may be specified individually or as an array.
The behaviour of this convenience method is similar to that of
{@code c.addAll(Collections.unmodifiableList(Arrays.asList(elements)))}.

<p>When elements are specified individually, this method provides a
convenient way to add a few elements to an existing collection:
<pre>
    Collections.addAll(flavors, "Peaches 'n Plutonium", "Rocky Racoon");
</pre>

@param  <T> the class of the elements to add and of the collection
@param c the collection into which {@code elements} are to be inserted
@param elements the elements to insert into {@code c}
@return {@code true} if the collection changed as a result of the call
@throws UnsupportedOperationException if {@code c} does not support
        the {@code add} operation
@throws NullPointerException if {@code elements} contains one or more
        null values and {@code c} does not permit null elements, or
        if {@code c} or {@code elements} are {@code null}
@throws IllegalArgumentException if some property of a value in
        {@code elements} prevents it from being added to {@code c}
@see Collection#addAll(Collection)
@since 1.5

## Collections.newSetFromMap(Map<E, Boolean>)

```java
public static <E> Set<E> newSetFromMap(Map<E, Boolean> map)
```

Returns a set backed by the specified map.  The resulting set displays
the same ordering, concurrency, and performance characteristics as the
backing map.  In essence, this factory method provides a {@link Set}
implementation corresponding to any {@link Map} implementation.  There
is no need to use this method on a {@link Map} implementation that
already has a corresponding {@link Set} implementation (such as {@link
HashMap} or {@link TreeMap}).

<p>Each method invocation on the set returned by this method results in
exactly one method invocation on the backing map or its {@code keySet}
view, with one exception.  The {@code addAll} method is implemented
as a sequence of {@code put} invocations on the backing map.

<p>The specified map must be empty at the time this method is invoked,
and should not be accessed directly after this method returns.  These
conditions are ensured if the map is created empty, passed directly
to this method, and no reference to the map is retained, as illustrated
in the following code fragment:
<pre>
   Set&lt;Object&gt; weakHashSet = Collections.newSetFromMap(
       new WeakHashMap&lt;Object, Boolean&gt;());
</pre>

@param <E> the class of the map keys and of the objects in the
       returned set
@param map the backing map
@return the set backed by the map
@throws IllegalArgumentException if {@code map} is not empty
@since 1.6

## Collections.newSequencedSetFromMap(SequencedMap<E, Boolean>)

```java
public static <E> SequencedSet<E> newSequencedSetFromMap(SequencedMap<E, Boolean> map)
```

Returns a sequenced set backed by the specified map.  The resulting set displays
the same ordering, concurrency, and performance characteristics as the
backing map. In essence, this factory method provides a {@link SequencedSet}
implementation corresponding to any {@link SequencedMap} implementation.

<p>Each method invocation on the set returned by this method results in
exactly one method invocation on the backing map or its {@code keySet}
view, with one exception.  The {@code addAll} method is implemented
as a sequence of {@code put} invocations on the backing map.

<p>The specified map must be empty at the time this method is invoked,
and should not be accessed directly after this method returns.  These
conditions are ensured if the map is created empty, passed directly
to this method, and no reference to the map is retained.

@apiNote
The following example code creates a {@code SequencedSet} from a
{@code LinkedHashMap}. This differs from a {@code LinkedHashSet}
in that the map's {@code removeEldestEntry} is overridden to provide
an eviction policy, which is not possible with a {@code LinkedHashSet}.

{@snippet :
    SequencedSet<String> set = Collections.newSequencedSetFromMap(
        new LinkedHashMap<String, Boolean>() {
            protected boolean removeEldestEntry(Map.Entry<String, Boolean> e) {
                return this.size() > 5;
            }
       });
}

@param <E> the class of the map keys and of the objects in the
       returned set
@param map the backing map
@return the set backed by the map
@throws IllegalArgumentException if {@code map} is not empty
@since 21

## Collections.asLifoQueue(Deque<T>)

```java
public static <T> Queue<T> asLifoQueue(Deque<T> deque)
```

Returns a view of a {@link Deque} as a Last-in-first-out (Lifo)
{@link Queue}. Method {@code add} is mapped to {@code push},
{@code remove} is mapped to {@code pop} and so on. This
view can be useful when you would like to use a method
requiring a {@code Queue} but you need Lifo ordering.

<p>Each method invocation on the queue returned by this method
results in exactly one method invocation on the backing deque, with
one exception.  The {@link Queue#addAll addAll} method is
implemented as a sequence of {@link Deque#addFirst addFirst}
invocations on the backing deque.

@apiNote
This method provides a view that inverts the sense of certain operations,
but it doesn't reverse the encounter order. To obtain a reverse-ordered
view, use the {@link Deque#reversed Deque.reversed} method.

@param  <T> the class of the objects in the deque
@param deque the deque
@return the queue
@since  1.6