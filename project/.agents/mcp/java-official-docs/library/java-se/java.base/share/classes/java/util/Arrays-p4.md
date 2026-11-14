---
title: "Arrays class (java.util) (part 4 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 4 of 19)

## Arrays.parallelPrefix(long[], LongBinaryOperator)

```java
public static void parallelPrefix(long[] array, LongBinaryOperator op)
```

Cumulates, in parallel, each element of the given array in place,
using the supplied function. For example if the array initially
holds `[2, 1, 0, 3]` and the operation performs addition,
then upon return the array holds `[2, 3, 3, 6]`.
Parallel prefix computation is usually more efficient than
sequential loops for large arrays.

Parameters:

- `array`: the array, which is modified in-place by this method
- `op`: a side-effect-free, associative function to perform the cumulation

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified array or function is null

## Arrays.parallelPrefix(long[], int, int, LongBinaryOperator)

```java
public static void parallelPrefix(long[] array, int fromIndex, int toIndex, LongBinaryOperator op)
```

Performs LongBinaryOperator)
for the given subrange of the array.

Parameters:

- `array`: the array
- `fromIndex`: the index of the first element, inclusive
- `toIndex`: the index of the last element, exclusive
- `op`: a side-effect-free, associative function to perform the cumulation

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > array.length`
- `NullPointerException`: if the specified array or function is null

## Arrays.parallelPrefix(double[], DoubleBinaryOperator)

```java
public static void parallelPrefix(double[] array, DoubleBinaryOperator op)
```

Cumulates, in parallel, each element of the given array in place,
using the supplied function. For example if the array initially
holds `[2.0, 1.0, 0.0, 3.0]` and the operation performs addition,
then upon return the array holds `[2.0, 3.0, 3.0, 6.0]`.
Parallel prefix computation is usually more efficient than
sequential loops for large arrays.

 Because floating-point operations may not be strictly associative,
the returned result may not be identical to the value that would be
obtained if the operation was performed sequentially.

Parameters:

- `array`: the array, which is modified in-place by this method
- `op`: a side-effect-free function to perform the cumulation

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified array or function is null

## Arrays.parallelPrefix(double[], int, int, DoubleBinaryOperator)

```java
public static void parallelPrefix(double[] array, int fromIndex, int toIndex, DoubleBinaryOperator op)
```

Performs DoubleBinaryOperator)
for the given subrange of the array.

Parameters:

- `array`: the array
- `fromIndex`: the index of the first element, inclusive
- `toIndex`: the index of the last element, exclusive
- `op`: a side-effect-free, associative function to perform the cumulation

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > array.length`
- `NullPointerException`: if the specified array or function is null

## Arrays.parallelPrefix(int[], IntBinaryOperator)

```java
public static void parallelPrefix(int[] array, IntBinaryOperator op)
```

Cumulates, in parallel, each element of the given array in place,
using the supplied function. For example if the array initially
holds `[2, 1, 0, 3]` and the operation performs addition,
then upon return the array holds `[2, 3, 3, 6]`.
Parallel prefix computation is usually more efficient than
sequential loops for large arrays.

Parameters:

- `array`: the array, which is modified in-place by this method
- `op`: a side-effect-free, associative function to perform the cumulation

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified array or function is null

## Arrays.parallelPrefix(int[], int, int, IntBinaryOperator)

```java
public static void parallelPrefix(int[] array, int fromIndex, int toIndex, IntBinaryOperator op)
```

Performs IntBinaryOperator)
for the given subrange of the array.

Parameters:

- `array`: the array
- `fromIndex`: the index of the first element, inclusive
- `toIndex`: the index of the last element, exclusive
- `op`: a side-effect-free, associative function to perform the cumulation

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > array.length`
- `NullPointerException`: if the specified array or function is null

## Arrays.binarySearch(long[], long)

```java
public static int binarySearch(long[] a, long key)
```

Searches the specified array of longs for the specified value using the
binary search algorithm.  The array must be sorted (as
by the `sort(long[])` method) prior to making this call.  If it
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

## Arrays.binarySearch(long[], int, int, long)

```java
public static int binarySearch(long[] a, int fromIndex, int toIndex, long key)
```

Searches a range of
the specified array of longs for the specified value using the
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

## Arrays.binarySearch(int[], int)

```java
public static int binarySearch(int[] a, int key)
```

Searches the specified array of ints for the specified value using the
binary search algorithm.  The array must be sorted (as
by the `sort(int[])` method) prior to making this call.  If it
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

## Arrays.binarySearch(int[], int, int, int)

```java
public static int binarySearch(int[] a, int fromIndex, int toIndex, int key)
```

Searches a range of
the specified array of ints for the specified value using the
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

## Arrays.binarySearch(short[], short)

```java
public static int binarySearch(short[] a, short key)
```

Searches the specified array of shorts for the specified value using
the binary search algorithm.  The array must be sorted
(as by the `sort(short[])` method) prior to making this call.  If
it is not sorted, the results are undefined.  If the array contains
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

## Arrays.binarySearch(short[], int, int, short)

```java
public static int binarySearch(short[] a, int fromIndex, int toIndex, short key)
```

Searches a range of
the specified array of shorts for the specified value using
the binary search algorithm.
The range must be sorted
(as by the int, int) method)
prior to making this call.  If
it is not sorted, the results are undefined.  If the range contains
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

## Arrays.binarySearch(char[], char)

```java
public static int binarySearch(char[] a, char key)
```

Searches the specified array of chars for the specified value using the
binary search algorithm.  The array must be sorted (as
by the `sort(char[])` method) prior to making this call.  If it
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

## Arrays.binarySearch(char[], int, int, char)

```java
public static int binarySearch(char[] a, int fromIndex, int toIndex, char key)
```

Searches a range of
the specified array of chars for the specified value using the
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
