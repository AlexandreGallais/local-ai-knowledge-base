---
title: "Collections class (java.util) (part 1 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Collections.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collections class (java.util)

```java
public final class Collections
```

This class consists exclusively of static methods that operate on or return
collections.  It contains polymorphic algorithms that operate on
collections, "wrappers", which return a new collection backed by a
specified collection, and a few other odds and ends.

The methods of this class all throw a `NullPointerException`
if the collections or class objects provided to them are null.

The documentation for the polymorphic algorithms contained in this class
generally includes a brief description of the *implementation*.  Such
descriptions should be regarded as *implementation notes*, rather than
parts of the *specification*.  Implementors should feel free to
substitute other algorithms, so long as the specification itself is adhered
to.  (For example, the algorithm used by `sort` does not have to be
a mergesort, but it does have to be *stable*.)

The "destructive" algorithms contained in this class, that is, the
algorithms that modify the collection on which they operate, are specified
to throw `UnsupportedOperationException` if the collection does not
support the appropriate mutation primitive(s), such as the `set`
method.  These algorithms may, but are not required to, throw this
exception if an invocation would have no effect on the collection.  For
example, invoking the `sort` method on an unmodifiable list that is
already sorted may or may not throw `UnsupportedOperationException`.

This class is a member of the

Java Collections Framework.

**See also:** Collection

**See also:** Set

**See also:** List

**See also:** Map

**Since:** 1.2

## Collections.sort(List<T>)

```java
public static <T extends Comparable<? super T>> void sort(List<T> list)
```

Sorts the specified list into ascending order, according to the
natural ordering of its elements.
All elements in the list must implement the `Comparable`
interface.  Furthermore, all elements in the list must be
*mutually comparable* (that is, `e1.compareTo(e2)`
must not throw a `ClassCastException` for any elements
`e1` and `e2` in the list).

This sort is guaranteed to be *stable*:  equal elements will
not be reordered as a result of the sort.

The specified list must be modifiable, but need not be resizable.

Parameters:

- `<T>`: the class of the objects in the list
- `list`: the list to be sorted.

**Implementation note:** This implementation defers to the `List.sort(Comparator)`
method using the specified list and a `null` comparator.

**See also:** List#sort(Comparator)

Throws:

- `ClassCastException`: if the list contains elements that are not *mutually comparable* (for example, strings and integers).
- `UnsupportedOperationException`: if the specified list's list-iterator does not support the `set` operation.
- `IllegalArgumentException`: (optional) if the implementation detects that the natural ordering of the list elements is found to violate the `Comparable` contract

## Collections.sort(List<T>, Comparator<? super T>)

```java
public static <T> void sort(List<T> list, Comparator<? super T> c)
```

Sorts the specified list according to the order induced by the
specified comparator.  All elements in the list must be *mutually
comparable* using the specified comparator (that is,
`c.compare(e1, e2)` must not throw a `ClassCastException`
for any elements `e1` and `e2` in the list).

This sort is guaranteed to be *stable*:  equal elements will
not be reordered as a result of the sort.

The specified list must be modifiable, but need not be resizable.

Parameters:

- `<T>`: the class of the objects in the list
- `list`: the list to be sorted.
- `c`: the comparator to determine the order of the list. A `null` value indicates that the elements' *natural ordering* should be used.

**Implementation note:** This implementation defers to the `List.sort(Comparator)`
method using the specified list and comparator.

**See also:** List#sort(Comparator)

Throws:

- `ClassCastException`: if the list contains elements that are not *mutually comparable* using the specified comparator.
- `UnsupportedOperationException`: if the specified list's list-iterator does not support the `set` operation.
- `IllegalArgumentException`: (optional) if the comparator is found to violate the `Comparator` contract

## Collections.binarySearch(List<? extends Comparable<? super T>>, T)

```java
public static <T> int binarySearch(List<? extends Comparable<? super T>> list, T key)
```

Searches the specified list for the specified object using the binary
search algorithm.  The list must be sorted into ascending order
according to the natural ordering of its
elements (as by the `sort(List)` method) prior to making this
call.  If it is not sorted, the results are undefined.  If the list
contains multiple elements equal to the specified object, there is no
guarantee which one will be found.

This method runs in log(n) time for a "random access" list (which
provides near-constant-time positional access).  If the specified list
does not implement the `RandomAccess` interface and is large,
this method will do an iterator-based binary search that performs
O(n) link traversals and O(log n) element comparisons.

Parameters:

- `<T>`: the class of the objects in the list
- `list`: the list to be searched.
- `key`: the key to be searched for.

**Returns:** the index of the search key, if it is contained in the list;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the list: the index of the first
        element greater than the key, or `list.size()` if all
        elements in the list are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

Throws:

- `ClassCastException`: if the list contains elements that are not *mutually comparable* (for example, strings and integers), or the search key is not mutually comparable with the elements of the list.

## Collections.binarySearch(List<? extends T>, T, Comparator<? super T>)

```java
public static <T> int binarySearch(List<? extends T> list, T key, Comparator<? super T> c)
```

Searches the specified list for the specified object using the binary
search algorithm.  The list must be sorted into ascending order
according to the specified comparator (as by the
Comparator) sort(List, Comparator)
method), prior to making this call.  If it is
not sorted, the results are undefined.  If the list contains multiple
elements equal to the specified object, there is no guarantee which one
will be found.

This method runs in log(n) time for a "random access" list (which
provides near-constant-time positional access).  If the specified list
does not implement the `RandomAccess` interface and is large,
this method will do an iterator-based binary search that performs
O(n) link traversals and O(log n) element comparisons.

Parameters:

- `<T>`: the class of the objects in the list
- `list`: the list to be searched.
- `key`: the key to be searched for.
- `c`: the comparator by which the list is ordered. A `null` value indicates that the elements' natural ordering should be used.

**Returns:** the index of the search key, if it is contained in the list;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the list: the index of the first
        element greater than the key, or `list.size()` if all
        elements in the list are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

Throws:

- `ClassCastException`: if the list contains elements that are not *mutually comparable* using the specified comparator, or the search key is not mutually comparable with the elements of the list using this comparator.

## Collections.shuffle(List<?>)

```java
public static void shuffle(List<?> list)
```

Randomly permutes the specified list using a default source of
randomness.  All permutations occur with approximately equal
likelihood.

The hedge "approximately" is used in the foregoing description because
default source of randomness is only approximately an unbiased source
of independently chosen bits. If it were a perfect source of randomly
chosen bits, then the algorithm would choose permutations with perfect
uniformity.

This implementation traverses the list backwards, from the last
element up to the second, repeatedly swapping a randomly selected element
into the "current position".  Elements are randomly selected from the
portion of the list that runs from the first element to the current
position, inclusive.

Parameters:

- `list`: the list to be shuffled.

**Implementation requirements:** This method runs in linear time.  If the specified list does
not implement the `RandomAccess` interface and is large, this
implementation dumps the specified list into an array before shuffling
it, and dumps the shuffled array back into the list.  This avoids the
quadratic behavior that would result from shuffling a "sequential
access" list in place.

Throws:

- `UnsupportedOperationException`: if the specified list or its list-iterator does not support the `set` operation.

## Collections.shuffle(List<?>, Random)

```java
public static void shuffle(List<?> list, Random rnd)
```

Randomly permute the specified list using the specified source of
randomness.

This method is equivalent to RandomGenerator)
and exists for backward compatibility. The RandomGenerator)
method is preferred, as it is not limited to random generators
that extend the `Random` class.

Parameters:

- `list`: the list to be shuffled.
- `rnd`: the source of randomness to use to shuffle the list.

Throws:

- `UnsupportedOperationException`: if the specified list or its list-iterator does not support the `set` operation.

## Collections.fill(List<? super T>, T)

```java
public static <T> void fill(List<? super T> list, T obj)
```

Replaces all of the elements of the specified list with the specified
element.

This method runs in linear time.

Parameters:

- `<T>`: the class of the objects in the list
- `list`: the list to be filled with the specified element.
- `obj`: The element with which to fill the specified list.

Throws:

- `UnsupportedOperationException`: if the specified list or its list-iterator does not support the `set` operation.

## Collections.copy(List<? super T>, List<? extends T>)

```java
public static <T> void copy(List<? super T> dest, List<? extends T> src)
```

Copies all of the elements from one list into another.  After the
operation, the index of each copied element in the destination list
will be identical to its index in the source list.  The destination
list's size must be greater than or equal to the source list's size.
If it is greater, the remaining elements in the destination list are
unaffected.

This method runs in linear time.

Parameters:

- `<T>`: the class of the objects in the lists
- `dest`: The destination list.
- `src`: The source list.

Throws:

- `IndexOutOfBoundsException`: if the destination list is too small to contain the entire source List.
- `UnsupportedOperationException`: if the destination list's list-iterator does not support the `set` operation.

## Collections.min(Collection<? extends T>)

```java
public static <T extends Object & Comparable<? super T>> T min(Collection<? extends T> coll)
```

Returns the minimum element of the given collection, according to the
*natural ordering* of its elements.  All elements in the
collection must implement the `Comparable` interface.
Furthermore, all elements in the collection must be *mutually
comparable* (that is, `e1.compareTo(e2)` must not throw a
`ClassCastException` for any elements `e1` and
`e2` in the collection).

This method iterates over the entire collection, hence it requires
time proportional to the size of the collection.

Parameters:

- `<T>`: the class of the objects in the collection
- `coll`: the collection whose minimum element is to be determined.

**Returns:** the minimum element of the given collection, according
        to the *natural ordering* of its elements.

**See also:** Comparable

Throws:

- `ClassCastException`: if the collection contains elements that are not *mutually comparable* (for example, strings and integers).
- `NoSuchElementException`: if the collection is empty.

## Collections.max(Collection<? extends T>)

```java
public static <T extends Object & Comparable<? super T>> T max(Collection<? extends T> coll)
```

Returns the maximum element of the given collection, according to the
*natural ordering* of its elements.  All elements in the
collection must implement the `Comparable` interface.
Furthermore, all elements in the collection must be *mutually
comparable* (that is, `e1.compareTo(e2)` must not throw a
`ClassCastException` for any elements `e1` and
`e2` in the collection).

This method iterates over the entire collection, hence it requires
time proportional to the size of the collection.

Parameters:

- `<T>`: the class of the objects in the collection
- `coll`: the collection whose maximum element is to be determined.

**Returns:** the maximum element of the given collection, according
        to the *natural ordering* of its elements.

**See also:** Comparable

Throws:

- `ClassCastException`: if the collection contains elements that are not *mutually comparable* (for example, strings and integers).
- `NoSuchElementException`: if the collection is empty.
