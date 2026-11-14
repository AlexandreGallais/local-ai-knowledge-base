---
title: "List interface (java.util) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/List.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# List interface (java.util) (part 2 of 3)

## List.retainAll(Collection<?>)

```java
boolean retainAll(Collection<?> c)
```

Retains only the elements in this list that are contained in the
specified collection (optional operation).  In other words, removes
from this list all of its elements that are not contained in the
specified collection.

Parameters:

- `c`: collection containing elements to be retained in this list

**Returns:** `true` if this list changed as a result of the call

**See also:** #remove(Object)

**See also:** #contains(Object)

Throws:

- `UnsupportedOperationException`: if the `retainAll` operation is not supported by this list
- `ClassCastException`: if the class of an element of this list is incompatible with the specified collection (optional)
- `NullPointerException`: if this list contains a null element and the specified collection does not permit null elements (optional), or if the specified collection is null

## List.replaceAll(UnaryOperator<E>)

```java
default void replaceAll(UnaryOperator<E> operator)
```

Replaces each element of this list with the result of applying the
operator to that element (optional operation).  Errors or runtime
exceptions thrown by the operator are relayed to the caller.

Parameters:

- `operator`: the operator to apply to each element

**Implementation requirements:** The default implementation is equivalent to, for this `list`:

```java
    final ListIterator<E> li = list.listIterator();
    while (li.hasNext()) {
        li.set(operator.apply(li.next()));
    }
```

If the list's list-iterator does not support the `set` operation
then an `UnsupportedOperationException` will be thrown when
replacing the first element.

**Since:** 1.8

Throws:

- `UnsupportedOperationException`: if the `replaceAll` operation is not supported by this list
- `NullPointerException`: if the specified operator is null or if the operator result is a null value and this list does not permit null elements (optional)

## List.sort(Comparator<? super E>)

```java
default void sort(Comparator<? super E> c)
```

Sorts this list according to the order induced by the specified
`Comparator` (optional operation).  The sort is *stable*:
this method must not reorder equal elements.

All elements in this list must be *mutually comparable* using the
specified comparator (that is, `c.compare(e1, e2)` must not throw
a `ClassCastException` for any elements `e1` and `e2`
in the list).

If the specified comparator is `null` then all elements in this
list must implement the `Comparable` interface and the elements'
natural ordering should be used.

This list must be modifiable, but need not be resizable.

Parameters:

- `c`: the `Comparator` used to compare list elements. A `null` value indicates that the elements' natural ordering should be used

**Implementation requirements:** The default implementation obtains an array containing all elements in
this list, sorts the array, and iterates over this list resetting each
element from the corresponding position in the array. (This avoids the
n2 log(n) performance that would result from attempting
to sort a linked list in place.)

**Implementation note:** This implementation is a stable, adaptive, iterative mergesort that
requires far fewer than n lg(n) comparisons when the input array is
partially sorted, while offering the performance of a traditional
mergesort when the input array is randomly ordered.  If the input array
is nearly sorted, the implementation requires approximately n
comparisons.  Temporary storage requirements vary from a small constant
for nearly sorted input arrays to n/2 object references for randomly
ordered input arrays.

The implementation takes equal advantage of ascending and
descending order in its input array, and can take advantage of
ascending and descending order in different parts of the same
input array.  It is well-suited to merging two or more sorted arrays:
simply concatenate the arrays and sort the resulting array.

The implementation was adapted from Tim Peters's list sort for Python
(
TimSort).  It uses techniques from Peter McIlroy's "Optimistic
Sorting and Information Theoretic Complexity", in Proceedings of the
Fourth Annual ACM-SIAM Symposium on Discrete Algorithms, pp 467-474,
January 1993.

**Since:** 1.8

Throws:

- `ClassCastException`: if the list contains elements that are not *mutually comparable* using the specified comparator
- `UnsupportedOperationException`: if the `sort` operation is not supported by this list
- `IllegalArgumentException`: (optional) if the comparator is found to violate the `Comparator` contract

## List.clear()

```java
void clear()
```

Removes all of the elements from this list (optional operation).
The list will be empty after this call returns.

Throws:

- `UnsupportedOperationException`: if the `clear` operation is not supported by this list

## List.equals(Object)

```java
boolean equals(Object o)
```

Compares the specified object with this list for equality.  Returns
`true` if and only if the specified object is also a list, both
lists have the same size, and all corresponding pairs of elements in
the two lists are *equal*.  (Two elements `e1` and
`e2` are *equal* if `Objects.equals(e1, e2)`.)
In other words, two lists are defined to be
equal if they contain the same elements in the same order.  This
definition ensures that the equals method works properly across
different implementations of the `List` interface.

Parameters:

- `o`: the object to be compared for equality with this list

**Returns:** `true` if the specified object is equal to this list

## List.hashCode()

```java
int hashCode()
```

Returns the hash code value for this list.  The hash code of a list
is defined to be the result of the following calculation:

```java
    int hashCode = 1;
    for (E e : list)
        hashCode = 31*hashCode + (e==null ? 0 : e.hashCode());
```

This ensures that `list1.equals(list2)` implies that
`list1.hashCode()==list2.hashCode()` for any two lists,
`list1` and `list2`, as required by the general
contract of `Object.hashCode`.

**Returns:** the hash code value for this list

**See also:** Object#equals(Object)

**See also:** #equals(Object)

## List.get(int)

```java
E get(int index)
```

Returns the element at the specified position in this list.

Parameters:

- `index`: index of the element to return

**Returns:** the element at the specified position in this list

Throws:

- `IndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## List.set(int, E)

```java
E set(int index, E element)
```

Replaces the element at the specified position in this list with the
specified element (optional operation).

Parameters:

- `index`: index of the element to replace
- `element`: element to be stored at the specified position

**Returns:** the element previously at the specified position

Throws:

- `UnsupportedOperationException`: if the `set` operation is not supported by this list
- `ClassCastException`: if the class of the specified element prevents it from being added to this list
- `NullPointerException`: if the specified element is null and this list does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this list
- `IndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## List.add(int, E)

```java
void add(int index, E element)
```

Inserts the specified element at the specified position in this list
(optional operation).  Shifts the element currently at that position
(if any) and any subsequent elements to the right (adds one to their
indices).

Parameters:

- `index`: index at which the specified element is to be inserted
- `element`: element to be inserted

Throws:

- `UnsupportedOperationException`: if the `add` operation is not supported by this list
- `ClassCastException`: if the class of the specified element prevents it from being added to this list
- `NullPointerException`: if the specified element is null and this list does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this list
- `IndexOutOfBoundsException`: if the index is out of range (`index < 0 || index > size()`)

## List.remove(int)

```java
E remove(int index)
```

Removes the element at the specified position in this list (optional
operation).  Shifts any subsequent elements to the left (subtracts one
from their indices).  Returns the element that was removed from the
list.

Parameters:

- `index`: the index of the element to be removed

**Returns:** the element previously at the specified position

Throws:

- `UnsupportedOperationException`: if the `remove` operation is not supported by this list
- `IndexOutOfBoundsException`: if the index is out of range (`index < 0 || index >= size()`)

## List.indexOf(Object)

```java
int indexOf(Object o)
```

Returns the index of the first occurrence of the specified element
in this list, or -1 if this list does not contain the element.
More formally, returns the lowest index `i` such that
`Objects.equals(o, get(i))`,
or -1 if there is no such index.

Parameters:

- `o`: element to search for

**Returns:** the index of the first occurrence of the specified element in
        this list, or -1 if this list does not contain the element

Throws:

- `ClassCastException`: if the type of the specified element is incompatible with this list (optional)
- `NullPointerException`: if the specified element is null and this list does not permit null elements (optional)

## List.lastIndexOf(Object)

```java
int lastIndexOf(Object o)
```

Returns the index of the last occurrence of the specified element
in this list, or -1 if this list does not contain the element.
More formally, returns the highest index `i` such that
`Objects.equals(o, get(i))`,
or -1 if there is no such index.

Parameters:

- `o`: element to search for

**Returns:** the index of the last occurrence of the specified element in
        this list, or -1 if this list does not contain the element

Throws:

- `ClassCastException`: if the type of the specified element is incompatible with this list (optional)
- `NullPointerException`: if the specified element is null and this list does not permit null elements (optional)

## List.listIterator()

```java
ListIterator<E> listIterator()
```

Returns a list iterator over the elements in this list (in proper
sequence).

**Returns:** a list iterator over the elements in this list (in proper
        sequence)

## List.listIterator(int)

```java
ListIterator<E> listIterator(int index)
```

Returns a list iterator over the elements in this list (in proper
sequence), starting at the specified position in the list.
The specified index indicates the first element that would be
returned by an initial call to next.
An initial call to previous would
return the element with the specified index minus one.

Parameters:

- `index`: index of the first element to be returned from the list iterator (by a call to next)

**Returns:** a list iterator over the elements in this list (in proper
        sequence), starting at the specified position in the list

Throws:

- `IndexOutOfBoundsException`: if the index is out of range (`index < 0 || index > size()`)

## List.subList(int, int)

```java
List<E> subList(int fromIndex, int toIndex)
```

Returns a view of the portion of this list between the specified
`fromIndex`, inclusive, and `toIndex`, exclusive.  (If
`fromIndex` and `toIndex` are equal, the returned list is
empty.)  The returned list is backed by this list, so non-structural
changes in the returned list are reflected in this list, and vice-versa.
The returned list supports all of the optional list operations supported
by this list.

This method eliminates the need for explicit range operations (of
the sort that commonly exist for arrays).  Any operation that expects
a list can be used as a range operation by passing a subList view
instead of a whole list.  For example, the following idiom
removes a range of elements from a list:

```java
     list.subList(from, to).clear();
```

Similar idioms may be constructed for `indexOf` and
`lastIndexOf`, and all of the algorithms in the
`Collections` class can be applied to a subList.

The semantics of the list returned by this method become undefined if
the backing list (i.e., this list) is *structurally modified* in
any way other than via the returned list.  (Structural modifications are
those that change the size of this list, or otherwise perturb it in such
a fashion that iterations in progress may yield incorrect results.)

Parameters:

- `fromIndex`: low endpoint (inclusive) of the subList
- `toIndex`: high endpoint (exclusive) of the subList

**Returns:** a view of the specified range within this list

Throws:

- `IndexOutOfBoundsException`: for an illegal endpoint index value (`fromIndex < 0 || toIndex > size || fromIndex > toIndex`)

## List.spliterator()

```java
default Spliterator<E> spliterator()
```

Creates a `Spliterator` over the elements in this list.

The `Spliterator` reports `Spliterator.SIZED` and
`Spliterator.ORDERED`.  Implementations should document the
reporting of additional characteristic values.

**Implementation requirements:** The default implementation creates a
*late-binding*
spliterator as follows:

- If the list is an instance of `RandomAccess` then the default
    implementation creates a spliterator that traverses elements by
    invoking the method `List.get`.  If such invocation results or
    would result in an `IndexOutOfBoundsException` then the
    spliterator will *fail-fast* and throw a
    `ConcurrentModificationException`.
    If the list is also an instance of `AbstractList` then the
    spliterator will use the list's modCount
    field to provide additional *fail-fast* behavior.

- Otherwise, the default implementation creates a spliterator from the
    list's `Iterator`.  The spliterator inherits the
    *fail-fast* of the list's iterator.

**Implementation note:** The created `Spliterator` additionally reports
`Spliterator.SUBSIZED`.

**Returns:** a `Spliterator` over the elements in this list

**Since:** 1.8

## List.addFirst(E)

```java
default void addFirst(E e)
```

(inherited documentation)

**Implementation requirements:** The implementation in this interface calls `add(0, e)`.

**Since:** 21

Throws:

- `NullPointerException`: (inherited documentation)
- `UnsupportedOperationException`: (inherited documentation)

## List.addLast(E)

```java
default void addLast(E e)
```

(inherited documentation)

**Implementation requirements:** The implementation in this interface calls `add(e)`.

**Since:** 21

Throws:

- `NullPointerException`: (inherited documentation)
- `UnsupportedOperationException`: (inherited documentation)
