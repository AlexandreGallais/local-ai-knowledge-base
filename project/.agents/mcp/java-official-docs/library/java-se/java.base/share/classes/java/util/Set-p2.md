---
title: "Set interface (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Set.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Set interface (java.util) (part 2 of 2)

## Set.hashCode()

```java
int hashCode()
```

Returns the hash code value for this set.  The hash code of a set is
defined to be the sum of the hash codes of the elements in the set,
where the hash code of a `null` element is defined to be zero.
This ensures that `s1.equals(s2)` implies that
`s1.hashCode()==s2.hashCode()` for any two sets `s1`
and `s2`, as required by the general contract of
`Object.hashCode`.

**Returns:** the hash code value for this set

**See also:** Object#equals(Object)

**See also:** Set#equals(Object)

## Set.spliterator()

```java
default Spliterator<E> spliterator()
```

Creates a `Spliterator` over the elements in this set.

The `Spliterator` reports `Spliterator.DISTINCT`.
Implementations should document the reporting of additional
characteristic values.

**Implementation requirements:** The default implementation creates a
*late-binding* spliterator
from the set's `Iterator`.  The spliterator inherits the
*fail-fast* properties of the set's iterator.

The created `Spliterator` additionally reports
`Spliterator.SIZED`.

**Implementation note:** The created `Spliterator` additionally reports
`Spliterator.SUBSIZED`.

**Returns:** a `Spliterator` over the elements in this set

**Since:** 1.8

## Set.of()

```java
static <E> Set<E> of()
```

Returns an unmodifiable set containing zero elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type

**Returns:** an empty `Set`

**Since:** 9

## Set.of(E)

```java
static <E> Set<E> of(E e1)
```

Returns an unmodifiable set containing one element.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the single element

**Returns:** a `Set` containing the specified element

**Since:** 9

Throws:

- `NullPointerException`: if the element is `null`

## Set.of(E, E)

```java
static <E> Set<E> of(E e1, E e2)
```

Returns an unmodifiable set containing two elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if the elements are duplicates
- `NullPointerException`: if an element is `null`

## Set.of(E, E, E)

```java
static <E> Set<E> of(E e1, E e2, E e3)
```

Returns an unmodifiable set containing three elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null`

## Set.of(E, E, E, E)

```java
static <E> Set<E> of(E e1, E e2, E e3, E e4)
```

Returns an unmodifiable set containing four elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null`

## Set.of(E, E, E, E, E)

```java
static <E> Set<E> of(E e1, E e2, E e3, E e4, E e5)
```

Returns an unmodifiable set containing five elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null`

## Set.of(E, E, E, E, E, E)

```java
static <E> Set<E> of(E e1, E e2, E e3, E e4, E e5, E e6)
```

Returns an unmodifiable set containing six elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null`

## Set.of(E, E, E, E, E, E, E)

```java
static <E> Set<E> of(E e1, E e2, E e3, E e4, E e5, E e6, E e7)
```

Returns an unmodifiable set containing seven elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element
- `e7`: the seventh element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null`

## Set.of(E, E, E, E, E, E, E, E)

```java
static <E> Set<E> of(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8)
```

Returns an unmodifiable set containing eight elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element
- `e7`: the seventh element
- `e8`: the eighth element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null`

## Set.of(E, E, E, E, E, E, E, E, E)

```java
static <E> Set<E> of(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8, E e9)
```

Returns an unmodifiable set containing nine elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element
- `e7`: the seventh element
- `e8`: the eighth element
- `e9`: the ninth element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null`

## Set.of(E, E, E, E, E, E, E, E, E, E)

```java
static <E> Set<E> of(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8, E e9, E e10)
```

Returns an unmodifiable set containing ten elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element
- `e7`: the seventh element
- `e8`: the eighth element
- `e9`: the ninth element
- `e10`: the tenth element

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null`

## Set.of(E...)

```java
static <E> Set<E> of(E... elements)
```

Returns an unmodifiable set containing an arbitrary number of elements.
See Unmodifiable Sets for details.

Parameters:

- `<E>`: the `Set`'s element type
- `elements`: the elements to be contained in the set

**API note:** This method also accepts a single array as an argument. The element type of
the resulting set will be the component type of the array, and the size of
the set will be equal to the length of the array. To create a set with
a single element that is an array, do the following:

```java
    String[] array = ... ;
    Set<String[]> list = Set.<String[]>of(array);
```

This will cause the Set.of(E) method
to be invoked instead.

**Returns:** a `Set` containing the specified elements

**Since:** 9

Throws:

- `IllegalArgumentException`: if there are any duplicate elements
- `NullPointerException`: if an element is `null` or if the array is `null`

## Set.copyOf(Collection<? extends E>)

```java
static <E> Set<E> copyOf(Collection<? extends E> coll)
```

Returns an unmodifiable Set containing the elements
of the given Collection. The given Collection must not be null, and it must not
contain any null elements. If the given Collection contains duplicate elements,
an arbitrary element of the duplicates is preserved. If the given Collection is
subsequently modified, the returned Set will not reflect such modifications.

Parameters:

- `<E>`: the `Set`'s element type
- `coll`: a `Collection` from which elements are drawn, must be non-null

**Implementation note:** If the given Collection is an unmodifiable Set,
calling copyOf will generally not create a copy.

**Returns:** a `Set` containing the elements of the given `Collection`

**Since:** 10

Throws:

- `NullPointerException`: if coll is null, or if it contains any nulls
