---
title: "Arrays class (java.util) (part 5 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 5 of 19)

## Arrays.binarySearch(byte[], byte)

```java
public static int binarySearch(byte[] a, byte key)
```

Searches the specified array of bytes for the specified value using the
binary search algorithm.  The array must be sorted (as
by the `sort(byte[])` method) prior to making this call.  If it
is not sorted, the results are undefined.  If the array contains
multiple elements with the specified value, there is no guarantee which
one will be found.

Parameters:

- `a`: the array to be searched
- `key`: the value to be searched for

**Returns:** index of the search key, if it is contained in the array;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element greater than the key, or `a.length` if all
        elements in the array are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

## Arrays.binarySearch(byte[], int, int, byte)

```java
public static int binarySearch(byte[] a, int fromIndex, int toIndex, byte key)
```

Searches a range of
the specified array of bytes for the specified value using the
binary search algorithm.
The range must be sorted (as
by the int, int) method)
prior to making this call.  If it
is not sorted, the results are undefined.  If the range contains
multiple elements with the specified value, there is no guarantee which
one will be found.

Parameters:

- `a`: the array to be searched
- `fromIndex`: the index of the first element (inclusive) to be searched
- `toIndex`: the index of the last element (exclusive) to be searched
- `key`: the value to be searched for

**Returns:** index of the search key, if it is contained in the array
        within the specified range;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element in the range greater than the key,
        or `toIndex` if all
        elements in the range are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0 or toIndex > a.length`

## Arrays.binarySearch(double[], double)

```java
public static int binarySearch(double[] a, double key)
```

Searches the specified array of doubles for the specified value using
the binary search algorithm.  The array must be sorted
(as by the `sort(double[])` method) prior to making this call.
If it is not sorted, the results are undefined.  If the array contains
multiple elements with the specified value, there is no guarantee which
one will be found.  This method considers all NaN values to be
equivalent and equal.

Parameters:

- `a`: the array to be searched
- `key`: the value to be searched for

**Returns:** index of the search key, if it is contained in the array;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element greater than the key, or `a.length` if all
        elements in the array are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

## Arrays.binarySearch(double[], int, int, double)

```java
public static int binarySearch(double[] a, int fromIndex, int toIndex, double key)
```

Searches a range of
the specified array of doubles for the specified value using
the binary search algorithm.
The range must be sorted
(as by the int, int) method)
prior to making this call.
If it is not sorted, the results are undefined.  If the range contains
multiple elements with the specified value, there is no guarantee which
one will be found.  This method considers all NaN values to be
equivalent and equal.

Parameters:

- `a`: the array to be searched
- `fromIndex`: the index of the first element (inclusive) to be searched
- `toIndex`: the index of the last element (exclusive) to be searched
- `key`: the value to be searched for

**Returns:** index of the search key, if it is contained in the array
        within the specified range;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element in the range greater than the key,
        or `toIndex` if all
        elements in the range are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0 or toIndex > a.length`

## Arrays.binarySearch(float[], float)

```java
public static int binarySearch(float[] a, float key)
```

Searches the specified array of floats for the specified value using
the binary search algorithm. The array must be sorted
(as by the `sort(float[])` method) prior to making this call. If
it is not sorted, the results are undefined. If the array contains
multiple elements with the specified value, there is no guarantee which
one will be found. This method considers all NaN values to be
equivalent and equal.

Parameters:

- `a`: the array to be searched
- `key`: the value to be searched for

**Returns:** index of the search key, if it is contained in the array;
        otherwise, `(-(*insertion point*) - 1)`. The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element greater than the key, or `a.length` if all
        elements in the array are less than the specified key. Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

## Arrays.binarySearch(float[], int, int, float)

```java
public static int binarySearch(float[] a, int fromIndex, int toIndex, float key)
```

Searches a range of
the specified array of floats for the specified value using
the binary search algorithm.
The range must be sorted
(as by the int, int) method)
prior to making this call. If
it is not sorted, the results are undefined. If the range contains
multiple elements with the specified value, there is no guarantee which
one will be found. This method considers all NaN values to be
equivalent and equal.

Parameters:

- `a`: the array to be searched
- `fromIndex`: the index of the first element (inclusive) to be searched
- `toIndex`: the index of the last element (exclusive) to be searched
- `key`: the value to be searched for

**Returns:** index of the search key, if it is contained in the array
        within the specified range;
        otherwise, `(-(*insertion point*) - 1)`. The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element in the range greater than the key,
        or `toIndex` if all
        elements in the range are less than the specified key. Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0 or toIndex > a.length`

## Arrays.binarySearch(Object[], Object)

```java
public static int binarySearch(Object[] a, Object key)
```

Searches the specified array for the specified object using the binary
search algorithm. The array must be sorted into ascending order
according to the
natural ordering
of its elements (as by the
`sort(Object[])` method) prior to making this call.
If it is not sorted, the results are undefined.
(If the array contains elements that are not mutually comparable (for
example, strings and integers), it *cannot* be sorted according
to the natural ordering of its elements, hence results are undefined.)
If the array contains multiple
elements equal to the specified object, there is no guarantee which
one will be found.

Parameters:

- `a`: the array to be searched
- `key`: the value to be searched for

**Returns:** index of the search key, if it is contained in the array;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element greater than the key, or `a.length` if all
        elements in the array are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

Throws:

- `ClassCastException`: if the search key is not comparable to the elements of the array.

## Arrays.binarySearch(Object[], int, int, Object)

```java
public static int binarySearch(Object[] a, int fromIndex, int toIndex, Object key)
```

Searches a range of
the specified array for the specified object using the binary
search algorithm.
The range must be sorted into ascending order
according to the
natural ordering
of its elements (as by the
int, int) method) prior to making this
call.  If it is not sorted, the results are undefined.
(If the range contains elements that are not mutually comparable (for
example, strings and integers), it *cannot* be sorted according
to the natural ordering of its elements, hence results are undefined.)
If the range contains multiple
elements equal to the specified object, there is no guarantee which
one will be found.

Parameters:

- `a`: the array to be searched
- `fromIndex`: the index of the first element (inclusive) to be searched
- `toIndex`: the index of the last element (exclusive) to be searched
- `key`: the value to be searched for

**Returns:** index of the search key, if it is contained in the array
        within the specified range;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element in the range greater than the key,
        or `toIndex` if all
        elements in the range are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

**Since:** 1.6

Throws:

- `ClassCastException`: if the search key is not comparable to the elements of the array within the specified range.
- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0 or toIndex > a.length`

## Arrays.binarySearch(T[], T, Comparator<? super T>)

```java
public static <T> int binarySearch(T[] a, T key, Comparator<? super T> c)
```

Searches the specified array for the specified object using the binary
search algorithm.  The array must be sorted into ascending order
according to the specified comparator (as by the
Comparator) sort(T[], Comparator)
method) prior to making this call.  If it is
not sorted, the results are undefined.
If the array contains multiple
elements equal to the specified object, there is no guarantee which one
will be found.

Parameters:

- `<T>`: the class of the objects in the array
- `a`: the array to be searched
- `key`: the value to be searched for
- `c`: the comparator by which the array is ordered. A `null` value indicates that the elements' natural ordering should be used.

**Returns:** index of the search key, if it is contained in the array;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element greater than the key, or `a.length` if all
        elements in the array are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

Throws:

- `ClassCastException`: if the array contains elements that are not *mutually comparable* using the specified comparator, or the search key is not comparable to the elements of the array using this comparator.

## Arrays.binarySearch(T[], int, int, T, Comparator<? super T>)

```java
public static <T> int binarySearch(T[] a, int fromIndex, int toIndex, T key, Comparator<? super T> c)
```

Searches a range of
the specified array for the specified object using the binary
search algorithm.
The range must be sorted into ascending order
according to the specified comparator (as by the
int, int, Comparator) sort(T[], int, int, Comparator)
method) prior to making this call.
If it is not sorted, the results are undefined.
If the range contains multiple elements equal to the specified object,
there is no guarantee which one will be found.

Parameters:

- `<T>`: the class of the objects in the array
- `a`: the array to be searched
- `fromIndex`: the index of the first element (inclusive) to be searched
- `toIndex`: the index of the last element (exclusive) to be searched
- `key`: the value to be searched for
- `c`: the comparator by which the array is ordered. A `null` value indicates that the elements' natural ordering should be used.

**Returns:** index of the search key, if it is contained in the array
        within the specified range;
        otherwise, `(-(*insertion point*) - 1)`.  The
        *insertion point* is defined as the point at which the
        key would be inserted into the array: the index of the first
        element in the range greater than the key,
        or `toIndex` if all
        elements in the range are less than the specified key.  Note
        that this guarantees that the return value will be >= 0 if
        and only if the key is found.

**Since:** 1.6

Throws:

- `ClassCastException`: if the range contains elements that are not *mutually comparable* using the specified comparator, or the search key is not comparable to the elements in the range using this comparator.
- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0 or toIndex > a.length`

## Arrays.equals(long[], long[])

```java
public static boolean equals(long[] a, long[] a2)
```

Returns `true` if the two specified arrays of longs are
*equal* to one another.  Two arrays are considered equal if both
arrays contain the same number of elements, and all corresponding pairs
of elements in the two arrays are equal.  In other words, two arrays
are equal if they contain the same elements in the same order.  Also,
two array references are considered equal if both are `null`.

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal
