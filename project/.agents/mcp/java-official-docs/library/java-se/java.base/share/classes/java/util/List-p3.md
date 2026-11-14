---
title: "List interface (java.util) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/List.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# List interface (java.util) (part 3 of 3)

## List.getFirst()

```java
default E getFirst()
```

(inherited documentation)

**Implementation requirements:** If this List is not empty, the implementation in this interface returns the result
of calling `get(0)`. Otherwise, it throws `NoSuchElementException`.

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## List.getLast()

```java
default E getLast()
```

(inherited documentation)

**Implementation requirements:** If this List is not empty, the implementation in this interface returns the result
of calling `get(size() - 1)`. Otherwise, it throws `NoSuchElementException`.

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)

## List.removeFirst()

```java
default E removeFirst()
```

(inherited documentation)

**Implementation requirements:** If this List is not empty, the implementation in this interface returns the result
of calling `remove(0)`. Otherwise, it throws `NoSuchElementException`.

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)
- `UnsupportedOperationException`: (inherited documentation)

## List.removeLast()

```java
default E removeLast()
```

(inherited documentation)

**Implementation requirements:** If this List is not empty, the implementation in this interface returns the result
of calling `remove(size() - 1)`. Otherwise, it throws `NoSuchElementException`.

**Since:** 21

Throws:

- `NoSuchElementException`: (inherited documentation)
- `UnsupportedOperationException`: (inherited documentation)

## List.reversed()

```java
default List<E> reversed()
```

(inherited documentation)

**Implementation requirements:** The implementation in this interface returns a reverse-ordered List
view. The `reversed()` method of the view returns a reference
to this List. Other operations on the view are implemented via calls to
public methods on this List. The exact relationship between calls on the
view and calls on this List is unspecified. However, order-sensitive
operations generally behave as if they delegate to the appropriate method
with the opposite orientation. For example, calling `getFirst` on
the view might result in a call to `getLast` on this List.

**Returns:** a reverse-ordered view of this collection, as a `List`

**Since:** 21

## List.of()

```java
static <E> List<E> of()
```

Returns an unmodifiable list containing zero elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type

**Returns:** an empty `List`

**Since:** 9

## List.of(E)

```java
static <E> List<E> of(E e1)
```

Returns an unmodifiable list containing one element.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the single element

**Returns:** a `List` containing the specified element

**Since:** 9

Throws:

- `NullPointerException`: if the element is `null`

## List.of(E, E)

```java
static <E> List<E> of(E e1, E e2)
```

Returns an unmodifiable list containing two elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the first element
- `e2`: the second element

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E, E, E)

```java
static <E> List<E> of(E e1, E e2, E e3)
```

Returns an unmodifiable list containing three elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E, E, E, E)

```java
static <E> List<E> of(E e1, E e2, E e3, E e4)
```

Returns an unmodifiable list containing four elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E, E, E, E, E)

```java
static <E> List<E> of(E e1, E e2, E e3, E e4, E e5)
```

Returns an unmodifiable list containing five elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E, E, E, E, E, E)

```java
static <E> List<E> of(E e1, E e2, E e3, E e4, E e5, E e6)
```

Returns an unmodifiable list containing six elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E, E, E, E, E, E, E)

```java
static <E> List<E> of(E e1, E e2, E e3, E e4, E e5, E e6, E e7)
```

Returns an unmodifiable list containing seven elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element
- `e7`: the seventh element

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E, E, E, E, E, E, E, E)

```java
static <E> List<E> of(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8)
```

Returns an unmodifiable list containing eight elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element
- `e7`: the seventh element
- `e8`: the eighth element

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E, E, E, E, E, E, E, E, E)

```java
static <E> List<E> of(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8, E e9)
```

Returns an unmodifiable list containing nine elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `e1`: the first element
- `e2`: the second element
- `e3`: the third element
- `e4`: the fourth element
- `e5`: the fifth element
- `e6`: the sixth element
- `e7`: the seventh element
- `e8`: the eighth element
- `e9`: the ninth element

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E, E, E, E, E, E, E, E, E, E)

```java
static <E> List<E> of(E e1, E e2, E e3, E e4, E e5, E e6, E e7, E e8, E e9, E e10)
```

Returns an unmodifiable list containing ten elements.

See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
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

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null`

## List.of(E...)

```java
static <E> List<E> of(E... elements)
```

Returns an unmodifiable list containing an arbitrary number of elements.
See Unmodifiable Lists for details.

Parameters:

- `<E>`: the `List`'s element type
- `elements`: the elements to be contained in the list

**API note:** This method also accepts a single array as an argument. The element type of
the resulting list will be the component type of the array, and the size of
the list will be equal to the length of the array. To create a list with
a single element that is an array, do the following:

```java
    String[] array = ... ;
    List<String[]> list = List.<String[]>of(array);
```

This will cause the List.of(E) method
to be invoked instead.

**Returns:** a `List` containing the specified elements

**Since:** 9

Throws:

- `NullPointerException`: if an element is `null` or if the array is `null`

## List.copyOf(Collection<? extends E>)

```java
static <E> List<E> copyOf(Collection<? extends E> coll)
```

Returns an unmodifiable List containing the elements of
the given Collection, in its iteration order. The given Collection must not be null,
and it must not contain any null elements. If the given Collection is subsequently
modified, the returned List will not reflect such modifications.

Parameters:

- `<E>`: the `List`'s element type
- `coll`: a `Collection` from which elements are drawn, must be non-null

**Implementation note:** If the given Collection is an unmodifiable List,
calling copyOf will generally not create a copy.

**Returns:** a `List` containing the elements of the given `Collection`

**Since:** 10

Throws:

- `NullPointerException`: if coll is null, or if it contains any nulls
