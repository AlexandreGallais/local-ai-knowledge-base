---
title: "List interface (java.util) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/List.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# List interface (java.util)

```java
public interface List<E> extends SequencedCollection<E>
```

An ordered collection, where the user has precise control over where in the
list each element is inserted.  The user can access elements by their integer
index (position in the list), and search for elements in the list.

Unlike sets, lists typically allow duplicate elements.  More formally,
lists typically allow pairs of elements `e1` and `e2`
such that `e1.equals(e2)`, and they typically allow multiple
null elements if they allow null elements at all.  It is not inconceivable
that someone might wish to implement a list that prohibits duplicates, by
throwing runtime exceptions when the user attempts to insert them, but we
expect this usage to be rare.

The `List` interface places additional stipulations, beyond those
specified in the `Collection` interface, on the contracts of the
`iterator`, `add`, `remove`, `equals`, and
`hashCode` methods.  Declarations for other inherited methods are
also included here for convenience.

The `List` interface provides four methods for positional (indexed)
access to list elements.  Lists (like Java arrays) are zero based.  Note
that these operations may execute in time proportional to the index value
for some implementations (the `LinkedList` class, for
example). Thus, iterating over the elements in a list is typically
preferable to indexing through it if the caller does not know the
implementation.

The `List` interface provides a special iterator, called a
`ListIterator`, that allows element insertion and replacement, and
bidirectional access in addition to the normal operations that the
`Iterator` interface provides.  A method is provided to obtain a
list iterator that starts at a specified position in the list.

The `List` interface provides two methods to search for a specified
object.  From a performance standpoint, these methods should be used with
caution.  In many implementations they will perform costly linear
searches.

The `List` interface provides two methods to efficiently insert and
remove multiple elements at an arbitrary point in the list.

Note: While it is permissible for lists to contain themselves as elements,
extreme caution is advised: the `equals` and `hashCode`
methods are no longer well defined on such a list.

Some list implementations have restrictions on the elements that
they may contain.  For example, some implementations prohibit null elements,
and some have restrictions on the types of their elements.  Attempting to
add an ineligible element throws an unchecked exception, typically
`NullPointerException` or `ClassCastException`.  Attempting
to query the presence of an ineligible element may throw an exception,
or it may simply return false; some implementations will exhibit the former
behavior and some will exhibit the latter.  More generally, attempting an
operation on an ineligible element whose completion would not result in
the insertion of an ineligible element into the list may throw an
exception or it may succeed, at the option of the implementation.
Such exceptions are marked as "optional" in the specification for this
interface.

#### Unmodifiable Lists

The List.of and
List.copyOf static factory methods
provide a convenient way to create unmodifiable lists. The `List`
instances created by these methods have the following characteristics:

- They are *unmodifiable*. Elements cannot
be added, removed, or replaced. Calling any mutator method on the List
will always cause `UnsupportedOperationException` to be thrown.
However, if the contained elements are themselves mutable,
this may cause the List's contents to appear to change.

- They disallow `null` elements. Attempts to create them with
`null` elements result in `NullPointerException`.

- They are serializable if all elements are serializable.

- The order of elements in the list is the same as the order of the
provided arguments, or of the elements in the provided array.

- The lists and their int) subList views implement the
`RandomAccess` interface.

- They are value-based.
Programmers should treat instances that are equal
as interchangeable and should not use them for synchronization, or
unpredictable behavior may occur. For example, in a future release,
synchronization may fail. Callers should make no assumptions about the
identity of the returned instances. Factories are free to
create new instances or reuse existing ones.

- They are serialized as specified on the
Serialized Form
page.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements in this list

**See also:** Collection

**See also:** Set

**See also:** ArrayList

**See also:** LinkedList

**See also:** Vector

**See also:** Arrays#asList(Object[])

**See also:** Collections#nCopies(int, Object)

**See also:** Collections#EMPTY_LIST

**See also:** AbstractList

**See also:** AbstractSequentialList

**Since:** 1.2

## List.size()

```java
int size()
```

Returns the number of elements in this list.  If this list contains
more than `Integer.MAX_VALUE` elements, returns
`Integer.MAX_VALUE`.

**Returns:** the number of elements in this list

## List.isEmpty()

```java
boolean isEmpty()
```

Returns `true` if this list contains no elements.

**Returns:** `true` if this list contains no elements

## List.contains(Object)

```java
boolean contains(Object o)
```

Returns `true` if this list contains the specified element.
More formally, returns `true` if and only if this list contains
at least one element `e` such that
`Objects.equals(o, e)`.

Parameters:

- `o`: element whose presence in this list is to be tested

**Returns:** `true` if this list contains the specified element

Throws:

- `ClassCastException`: if the type of the specified element is incompatible with this list (optional)
- `NullPointerException`: if the specified element is null and this list does not permit null elements (optional)

## List.iterator()

```java
Iterator<E> iterator()
```

Returns an iterator over the elements in this list in proper sequence.

**Returns:** an iterator over the elements in this list in proper sequence

## List.toArray()

```java
Object[] toArray()
```

Returns an array containing all of the elements in this list in proper
sequence (from first to last element).

The returned array will be "safe" in that no references to it are
maintained by this list.  (In other words, this method must
allocate a new array even if this list is backed by an array).
The caller is thus free to modify the returned array.

This method acts as bridge between array-based and collection-based
APIs.

**Returns:** an array containing all of the elements in this list in proper
        sequence

**See also:** Arrays#asList(Object[])

## List.toArray(T[])

```java
<T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this list in
proper sequence (from first to last element); the runtime type of
the returned array is that of the specified array.  If the list fits
in the specified array, it is returned therein.  Otherwise, a new
array is allocated with the runtime type of the specified array and
the size of this list.

If the list fits in the specified array with room to spare (i.e.,
the array has more elements than the list), the element in the array
immediately following the end of the list is set to `null`.
(This is useful in determining the length of the list *only* if
the caller knows that the list does not contain any null elements.)

Like the `toArray()` method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

Suppose `x` is a list known to contain only strings.
The following code can be used to dump the list into a newly
allocated array of `String`:

```java
    String[] y = x.toArray(new String[0]);
```

Note that `toArray(new Object[0])` is identical in function to
`toArray()`.

Parameters:

- `a`: the array into which the elements of this list are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose.

**Returns:** an array containing the elements of this list

Throws:

- `ArrayStoreException`: if the runtime type of the specified array is not a supertype of the runtime type of every element in this list
- `NullPointerException`: if the specified array is null

## List.add(E)

```java
boolean add(E e)
```

Appends the specified element to the end of this list (optional
operation).

Lists that support this operation may place limitations on what
elements may be added to this list.  In particular, some
lists will refuse to add null elements, and others will impose
restrictions on the type of elements that may be added.  List
classes should clearly specify in their documentation any restrictions
on what elements may be added.

Parameters:

- `e`: element to be appended to this list

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `UnsupportedOperationException`: if the `add` operation is not supported by this list
- `ClassCastException`: if the class of the specified element prevents it from being added to this list
- `NullPointerException`: if the specified element is null and this list does not permit null elements
- `IllegalArgumentException`: if some property of this element prevents it from being added to this list

## List.remove(Object)

```java
boolean remove(Object o)
```

Removes the first occurrence of the specified element from this list,
if it is present (optional operation).  If this list does not contain
the element, it is unchanged.  More formally, removes the element with
the lowest index `i` such that
`Objects.equals(o, get(i))`
(if such an element exists).  Returns `true` if this list
contained the specified element (or equivalently, if this list changed
as a result of the call).

Parameters:

- `o`: element to be removed from this list, if present

**Returns:** `true` if this list contained the specified element

Throws:

- `ClassCastException`: if the type of the specified element is incompatible with this list (optional)
- `NullPointerException`: if the specified element is null and this list does not permit null elements (optional)
- `UnsupportedOperationException`: if the `remove` operation is not supported by this list

## List.containsAll(Collection<?>)

```java
boolean containsAll(Collection<?> c)
```

Returns `true` if this list contains all of the elements of the
specified collection.

Parameters:

- `c`: collection to be checked for containment in this list

**Returns:** `true` if this list contains all of the elements of the
        specified collection

**See also:** #contains(Object)

Throws:

- `ClassCastException`: if the types of one or more elements in the specified collection are incompatible with this list (optional)
- `NullPointerException`: if the specified collection contains one or more null elements and this list does not permit null elements (optional), or if the specified collection is null

## List.addAll(Collection<? extends E>)

```java
boolean addAll(Collection<? extends E> c)
```

Appends all of the elements in the specified collection to the end of
this list, in the order that they are returned by the specified
collection's iterator (optional operation).  The behavior of this
operation is undefined if the specified collection is modified while
the operation is in progress.  (Note that this will occur if the
specified collection is this list, and it's nonempty.)

Parameters:

- `c`: collection containing elements to be added to this list

**Returns:** `true` if this list changed as a result of the call

**See also:** #add(Object)

Throws:

- `UnsupportedOperationException`: if the `addAll` operation is not supported by this list
- `ClassCastException`: if the class of an element of the specified collection prevents it from being added to this list
- `NullPointerException`: if the specified collection contains one or more null elements and this list does not permit null elements, or if the specified collection is null
- `IllegalArgumentException`: if some property of an element of the specified collection prevents it from being added to this list

## List.addAll(int, Collection<? extends E>)

```java
boolean addAll(int index, Collection<? extends E> c)
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

Parameters:

- `index`: index at which to insert the first element from the specified collection
- `c`: collection containing elements to be added to this list

**Returns:** `true` if this list changed as a result of the call

Throws:

- `UnsupportedOperationException`: if the `addAll` operation is not supported by this list
- `ClassCastException`: if the class of an element of the specified collection prevents it from being added to this list
- `NullPointerException`: if the specified collection contains one or more null elements and this list does not permit null elements, or if the specified collection is null
- `IllegalArgumentException`: if some property of an element of the specified collection prevents it from being added to this list
- `IndexOutOfBoundsException`: if the index is out of range (`index < 0 || index > size()`)

## List.removeAll(Collection<?>)

```java
boolean removeAll(Collection<?> c)
```

Removes from this list all of its elements that are contained in the
specified collection (optional operation).

Parameters:

- `c`: collection containing elements to be removed from this list

**Returns:** `true` if this list changed as a result of the call

**See also:** #remove(Object)

**See also:** #contains(Object)

Throws:

- `UnsupportedOperationException`: if the `removeAll` operation is not supported by this list
- `ClassCastException`: if the class of an element of this list is incompatible with the specified collection (optional)
- `NullPointerException`: if this list contains a null element and the specified collection does not permit null elements (optional), or if the specified collection is null
