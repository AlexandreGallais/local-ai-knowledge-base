---
title: "Arrays class (java.util) (part 2 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 2 of 19)

## Arrays.parallelSort(char[], int, int)

```java
public static void parallelSort(char[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending numerical order.
The range to be sorted extends from the index `fromIndex`,
inclusive, to the index `toIndex`, exclusive. If
`fromIndex == toIndex`, the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.parallelSort(short[])

```java
public static void parallelSort(short[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

## Arrays.parallelSort(short[], int, int)

```java
public static void parallelSort(short[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending numerical order.
The range to be sorted extends from the index `fromIndex`,
inclusive, to the index `toIndex`, exclusive. If
`fromIndex == toIndex`, the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.parallelSort(int[])

```java
public static void parallelSort(int[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

## Arrays.parallelSort(int[], int, int)

```java
public static void parallelSort(int[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending numerical order.
The range to be sorted extends from the index `fromIndex`,
inclusive, to the index `toIndex`, exclusive. If
`fromIndex == toIndex`, the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.parallelSort(long[])

```java
public static void parallelSort(long[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

## Arrays.parallelSort(long[], int, int)

```java
public static void parallelSort(long[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending numerical order.
The range to be sorted extends from the index `fromIndex`,
inclusive, to the index `toIndex`, exclusive. If
`fromIndex == toIndex`, the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.parallelSort(float[])

```java
public static void parallelSort(float[] a)
```

Sorts the specified array into ascending numerical order.

The `<` relation does not provide a total order on all float
values: `-0.0f == 0.0f` is `true` and a `Float.NaN`
value compares neither less than, greater than, nor equal to any value,
even itself. This method uses the total order imposed by the method
`Float.compareTo`: `-0.0f` is treated as less than value
`0.0f` and `Float.NaN` is considered greater than any
other value and all `Float.NaN` values are considered equal.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

## Arrays.parallelSort(float[], int, int)

```java
public static void parallelSort(float[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending numerical order.
The range to be sorted extends from the index `fromIndex`,
inclusive, to the index `toIndex`, exclusive. If
`fromIndex == toIndex`, the range to be sorted is empty.

The `<` relation does not provide a total order on all float
values: `-0.0f == 0.0f` is `true` and a `Float.NaN`
value compares neither less than, greater than, nor equal to any value,
even itself. This method uses the total order imposed by the method
`Float.compareTo`: `-0.0f` is treated as less than value
`0.0f` and `Float.NaN` is considered greater than any
other value and all `Float.NaN` values are considered equal.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.parallelSort(double[])

```java
public static void parallelSort(double[] a)
```

Sorts the specified array into ascending numerical order.

The `<` relation does not provide a total order on all double
values: `-0.0d == 0.0d` is `true` and a `Double.NaN`
value compares neither less than, greater than, nor equal to any value,
even itself. This method uses the total order imposed by the method
`Double.compareTo`: `-0.0d` is treated as less than value
`0.0d` and `Double.NaN` is considered greater than any
other value and all `Double.NaN` values are considered equal.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

## Arrays.parallelSort(double[], int, int)

```java
public static void parallelSort(double[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending numerical order.
The range to be sorted extends from the index `fromIndex`,
inclusive, to the index `toIndex`, exclusive. If
`fromIndex == toIndex`, the range to be sorted is empty.

The `<` relation does not provide a total order on all double
values: `-0.0d == 0.0d` is `true` and a `Double.NaN`
value compares neither less than, greater than, nor equal to any value,
even itself. This method uses the total order imposed by the method
`Double.compareTo`: `-0.0d` is treated as less than value
`0.0d` and `Double.NaN` is considered greater than any
other value and all `Double.NaN` values are considered equal.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.parallelSort(T[])

```java
public static <T extends Comparable<? super T>> void parallelSort(T[] a)
```

Sorts the specified array of objects into ascending order, according
to the natural ordering of its elements.
All elements in the array must implement the `Comparable`
interface.  Furthermore, all elements in the array must be
*mutually comparable* (that is, `e1.compareTo(e2)` must
not throw a `ClassCastException` for any elements `e1`
and `e2` in the array).

This sort is guaranteed to be *stable*:  equal elements will
not be reordered as a result of the sort.

Parameters:

- `<T>`: the class of the objects to be sorted
- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a parallel sort-merge that breaks the
array into sub-arrays that are themselves sorted and then merged. When
the sub-array length reaches a minimum granularity, the sub-array is
sorted using the appropriate Arrays.sort
method. If the length of the specified array is less than the minimum
granularity, then it is sorted using the appropriate Arrays.sort method. The algorithm requires a
working space no greater than the size of the original array. The
ForkJoin common pool is used to
execute any parallel tasks.

**Since:** 1.8

Throws:

- `ClassCastException`: if the array contains elements that are not *mutually comparable* (for example, strings and integers)
- `IllegalArgumentException`: (optional) if the natural ordering of the array elements is found to violate the `Comparable` contract

## Arrays.parallelSort(T[], int, int)

```java
public static <T extends Comparable<? super T>> void parallelSort(T[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the specified array of objects into
ascending order, according to the
natural ordering of its
elements.  The range to be sorted extends from index
`fromIndex`, inclusive, to index `toIndex`, exclusive.
(If `fromIndex==toIndex`, the range to be sorted is empty.)  All
elements in this range must implement the `Comparable`
interface.  Furthermore, all elements in this range must be *mutually
comparable* (that is, `e1.compareTo(e2)` must not throw a
`ClassCastException` for any elements `e1` and
`e2` in the array).

This sort is guaranteed to be *stable*:  equal elements will
not be reordered as a result of the sort.

Parameters:

- `<T>`: the class of the objects to be sorted
- `a`: the array to be sorted
- `fromIndex`: the index of the first element (inclusive) to be sorted
- `toIndex`: the index of the last element (exclusive) to be sorted

**Implementation note:** The sorting algorithm is a parallel sort-merge that breaks the
array into sub-arrays that are themselves sorted and then merged. When
the sub-array length reaches a minimum granularity, the sub-array is
sorted using the appropriate Arrays.sort
method. If the length of the specified array is less than the minimum
granularity, then it is sorted using the appropriate Arrays.sort method. The algorithm requires a working
space no greater than the size of the specified range of the original
array. The ForkJoin common pool is
used to execute any parallel tasks.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex` or (optional) if the natural ordering of the array elements is found to violate the `Comparable` contract
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`
- `ClassCastException`: if the array contains elements that are not *mutually comparable* (for example, strings and integers).
