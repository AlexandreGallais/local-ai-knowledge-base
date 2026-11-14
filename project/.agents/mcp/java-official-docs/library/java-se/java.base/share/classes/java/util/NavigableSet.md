---
title: "NavigableSet interface (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/NavigableSet.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NavigableSet interface (java.util)

```java
public interface NavigableSet<E> extends SortedSet<E>
```

A `SortedSet` extended with navigation methods reporting
closest matches for given search targets. Methods `lower`,
`floor`, `ceiling`, and `higher` return elements
respectively less than, less than or equal, greater than or equal,
and greater than a given element, returning `null` if there
is no such element.

A `NavigableSet` may be accessed and traversed in either
ascending or descending order.  The `descendingSet` method
returns a view of the set with the senses of all relational and
directional methods inverted. The performance of ascending
operations and views is likely to be faster than that of descending
ones.  This interface additionally defines methods `pollFirst` and `pollLast` that return and remove the lowest
and highest element, if one exists, else returning `null`.
Methods
boolean, Object, boolean) subSet(E, boolean, E, boolean),
boolean) headSet(E, boolean), and
boolean) tailSet(E, boolean)
differ from the like-named `SortedSet` methods in accepting
additional arguments describing whether lower and upper bounds are
inclusive versus exclusive.  Subsets of any `NavigableSet`
must implement the `NavigableSet` interface.

The return values of navigation methods may be ambiguous in
implementations that permit `null` elements. However, even
in this case the result can be disambiguated by checking
`contains(null)`. To avoid such issues, implementations of
this interface are encouraged to *not* permit insertion of
`null` elements. (Note that sorted sets of `Comparable` elements intrinsically do not permit `null`.)

Methods
Object) subSet(E, E),
headSet(E), and
tailSet(E)
are specified to return `SortedSet` to allow existing
implementations of `SortedSet` to be compatibly retrofitted to
implement `NavigableSet`, but extensions and implementations
of this interface are encouraged to override these methods to return
`NavigableSet`.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements maintained by this set

**Since:** 1.6

## NavigableSet.lower(E)

```java
E lower(E e)
```

Returns the greatest element in this set strictly less than the
given element, or `null` if there is no such element.

Parameters:

- `e`: the value to match

**Returns:** the greatest element less than `e`,
        or `null` if there is no such element

Throws:

- `ClassCastException`: if the specified element cannot be compared with the elements currently in the set
- `NullPointerException`: if the specified element is null and this set does not permit null elements

## NavigableSet.floor(E)

```java
E floor(E e)
```

Returns the greatest element in this set less than or equal to
the given element, or `null` if there is no such element.

Parameters:

- `e`: the value to match

**Returns:** the greatest element less than or equal to `e`,
        or `null` if there is no such element

Throws:

- `ClassCastException`: if the specified element cannot be compared with the elements currently in the set
- `NullPointerException`: if the specified element is null and this set does not permit null elements

## NavigableSet.ceiling(E)

```java
E ceiling(E e)
```

Returns the least element in this set greater than or equal to
the given element, or `null` if there is no such element.

Parameters:

- `e`: the value to match

**Returns:** the least element greater than or equal to `e`,
        or `null` if there is no such element

Throws:

- `ClassCastException`: if the specified element cannot be compared with the elements currently in the set
- `NullPointerException`: if the specified element is null and this set does not permit null elements

## NavigableSet.higher(E)

```java
E higher(E e)
```

Returns the least element in this set strictly greater than the
given element, or `null` if there is no such element.

Parameters:

- `e`: the value to match

**Returns:** the least element greater than `e`,
        or `null` if there is no such element

Throws:

- `ClassCastException`: if the specified element cannot be compared with the elements currently in the set
- `NullPointerException`: if the specified element is null and this set does not permit null elements

## NavigableSet.pollFirst()

```java
E pollFirst()
```

Retrieves and removes the first (lowest) element,
or returns `null` if this set is empty (optional operation).

**Returns:** the first element, or `null` if this set is empty

Throws:

- `UnsupportedOperationException`: if the `pollFirst` operation is not supported by this collection

## NavigableSet.pollLast()

```java
E pollLast()
```

Retrieves and removes the last (highest) element,
or returns `null` if this set is empty (optional operation).

**Returns:** the last element, or `null` if this set is empty

Throws:

- `UnsupportedOperationException`: if the `pollLast` operation is not supported by this collection

## NavigableSet.iterator()

```java
Iterator<E> iterator()
```

Returns an iterator over the elements in this set, in ascending order.

**Returns:** an iterator over the elements in this set, in ascending order

## NavigableSet.descendingSet()

```java
NavigableSet<E> descendingSet()
```

Returns a reverse order view of the elements contained in this set.
The descending set is backed by this set, so changes to the set are
reflected in the descending set, and vice-versa.  If either set is
modified while an iteration over either set is in progress (except
through the iterator's own `remove` operation), the results of
the iteration are undefined.

The returned set has an ordering equivalent to
Collections.reverseOrder`(comparator())`.
The expression `s.descendingSet().descendingSet()` returns a
view of `s` essentially equivalent to `s`.

**Returns:** a reverse order view of this set

## NavigableSet.descendingIterator()

```java
Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this set, in descending order.
Equivalent in effect to `descendingSet().iterator()`.

**Returns:** an iterator over the elements in this set, in descending order

## NavigableSet.subSet(E, boolean, E, boolean)

```java
NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive)
```

Returns a view of the portion of this set whose elements range from
`fromElement` to `toElement`.  If `fromElement` and
`toElement` are equal, the returned set is empty unless `fromInclusive` and `toInclusive` are both true.  The returned set
is backed by this set, so changes in the returned set are reflected in
this set, and vice-versa.  The returned set supports all optional set
operations that this set supports.

The returned set will throw an `IllegalArgumentException`
on an attempt to insert an element outside its range.

Parameters:

- `fromElement`: low endpoint of the returned set
- `fromInclusive`: `true` if the low endpoint is to be included in the returned view
- `toElement`: high endpoint of the returned set
- `toInclusive`: `true` if the high endpoint is to be included in the returned view

**Returns:** a view of the portion of this set whose elements range from
        `fromElement`, inclusive, to `toElement`, exclusive

Throws:

- `ClassCastException`: if `fromElement` and `toElement` cannot be compared to one another using this set's comparator (or, if the set has no comparator, using natural ordering). Implementations may, but are not required to, throw this exception if `fromElement` or `toElement` cannot be compared to elements currently in the set.
- `NullPointerException`: if `fromElement` or `toElement` is null and this set does not permit null elements
- `IllegalArgumentException`: if `fromElement` is greater than `toElement`; or if this set itself has a restricted range, and `fromElement` or `toElement` lies outside the bounds of the range.

## NavigableSet.headSet(E, boolean)

```java
NavigableSet<E> headSet(E toElement, boolean inclusive)
```

Returns a view of the portion of this set whose elements are less than
(or equal to, if `inclusive` is true) `toElement`.  The
returned set is backed by this set, so changes in the returned set are
reflected in this set, and vice-versa.  The returned set supports all
optional set operations that this set supports.

The returned set will throw an `IllegalArgumentException`
on an attempt to insert an element outside its range.

Parameters:

- `toElement`: high endpoint of the returned set
- `inclusive`: `true` if the high endpoint is to be included in the returned view

**Returns:** a view of the portion of this set whose elements are less than
        (or equal to, if `inclusive` is true) `toElement`

Throws:

- `ClassCastException`: if `toElement` is not compatible with this set's comparator (or, if the set has no comparator, if `toElement` does not implement `Comparable`). Implementations may, but are not required to, throw this exception if `toElement` cannot be compared to elements currently in the set.
- `NullPointerException`: if `toElement` is null and this set does not permit null elements
- `IllegalArgumentException`: if this set itself has a restricted range, and `toElement` lies outside the bounds of the range

## NavigableSet.tailSet(E, boolean)

```java
NavigableSet<E> tailSet(E fromElement, boolean inclusive)
```

Returns a view of the portion of this set whose elements are greater
than (or equal to, if `inclusive` is true) `fromElement`.
The returned set is backed by this set, so changes in the returned set
are reflected in this set, and vice-versa.  The returned set supports
all optional set operations that this set supports.

The returned set will throw an `IllegalArgumentException`
on an attempt to insert an element outside its range.

Parameters:

- `fromElement`: low endpoint of the returned set
- `inclusive`: `true` if the low endpoint is to be included in the returned view

**Returns:** a view of the portion of this set whose elements are greater
        than or equal to `fromElement`

Throws:

- `ClassCastException`: if `fromElement` is not compatible with this set's comparator (or, if the set has no comparator, if `fromElement` does not implement `Comparable`). Implementations may, but are not required to, throw this exception if `fromElement` cannot be compared to elements currently in the set.
- `NullPointerException`: if `fromElement` is null and this set does not permit null elements
- `IllegalArgumentException`: if this set itself has a restricted range, and `fromElement` lies outside the bounds of the range

## NavigableSet.subSet(E, E)

```java
SortedSet<E> subSet(E fromElement, E toElement)
```

(inherited documentation)

Equivalent to `subSet(fromElement, true, toElement, false)`.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## NavigableSet.headSet(E)

```java
SortedSet<E> headSet(E toElement)
```

(inherited documentation)

Equivalent to `headSet(toElement, false)`.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## NavigableSet.tailSet(E)

```java
SortedSet<E> tailSet(E fromElement)
```

(inherited documentation)

Equivalent to `tailSet(fromElement, true)`.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## NavigableSet.removeFirst()

```java
default E removeFirst()
```

(inherited documentation)

**Implementation requirements:** If this set is not empty, the implementation in this interface returns the result of calling
the `pollFirst` method. Otherwise, it throws `NoSuchElementException`.

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)
- `UnsupportedOperationException`: (inherited documentation)

## NavigableSet.removeLast()

```java
default E removeLast()
```

(inherited documentation)

**Implementation requirements:** If this set is not empty, the implementation in this interface returns the result of calling
the `pollLast` method. Otherwise, it throws `NoSuchElementException`.

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)
- `UnsupportedOperationException`: (inherited documentation)

## NavigableSet.reversed()

```java
default NavigableSet<E> reversed()
```

(inherited documentation)

This method is equivalent to descendingSet.

**Implementation requirements:** The implementation in this interface returns the result of calling the
`descendingSet` method.

**Returns:** a reverse-ordered view of this collection, as a `NavigableSet`

**Since:** 21
