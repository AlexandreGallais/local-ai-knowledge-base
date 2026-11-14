---
title: "Arrays class (java.util) (part 1 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util)

```java
public final class Arrays
```

This class contains various methods for manipulating arrays (such as
sorting and searching). This class also contains a static factory
that allows arrays to be viewed as lists.

The methods in this class all throw a `NullPointerException`,
if the specified array reference is null, except where noted.

The documentation for the methods contained in this class includes
brief descriptions of the *implementations*. Such descriptions should
be regarded as *implementation notes*, rather than parts of the
*specification*. Implementors should feel free to substitute other
algorithms, so long as the specification itself is adhered to. (For
example, the algorithm used by `sort(Object[])` does not have to be
a MergeSort, but it does have to be *stable*.)

This class is a member of the

Java Collections Framework.

**Since:** 1.2

## Arrays.sort(int[])

```java
public static void sort(int[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

## Arrays.sort(int[], int, int)

```java
public static void sort(int[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending order. The range
to be sorted extends from the index `fromIndex`, inclusive, to
the index `toIndex`, exclusive. If `fromIndex == toIndex`,
the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.sort(long[])

```java
public static void sort(long[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

## Arrays.sort(long[], int, int)

```java
public static void sort(long[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending order. The range
to be sorted extends from the index `fromIndex`, inclusive, to
the index `toIndex`, exclusive. If `fromIndex == toIndex`,
the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.sort(short[])

```java
public static void sort(short[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

## Arrays.sort(short[], int, int)

```java
public static void sort(short[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending order. The range
to be sorted extends from the index `fromIndex`, inclusive, to
the index `toIndex`, exclusive. If `fromIndex == toIndex`,
the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.sort(char[])

```java
public static void sort(char[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

## Arrays.sort(char[], int, int)

```java
public static void sort(char[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending order. The range
to be sorted extends from the index `fromIndex`, inclusive, to
the index `toIndex`, exclusive. If `fromIndex == toIndex`,
the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.sort(byte[])

```java
public static void sort(byte[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

## Arrays.sort(byte[], int, int)

```java
public static void sort(byte[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending order. The range
to be sorted extends from the index `fromIndex`, inclusive, to
the index `toIndex`, exclusive. If `fromIndex == toIndex`,
the range to be sorted is empty.

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element, inclusive, to be sorted
- `toIndex`: the index of the last element, exclusive, to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.sort(float[])

```java
public static void sort(float[] a)
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

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

## Arrays.sort(float[], int, int)

```java
public static void sort(float[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending order. The range
to be sorted extends from the index `fromIndex`, inclusive, to
the index `toIndex`, exclusive. If `fromIndex == toIndex`,
the range to be sorted is empty.

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

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.sort(double[])

```java
public static void sort(double[] a)
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

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

## Arrays.sort(double[], int, int)

```java
public static void sort(double[] a, int fromIndex, int toIndex)
```

Sorts the specified range of the array into ascending order. The range
to be sorted extends from the index `fromIndex`, inclusive, to
the index `toIndex`, exclusive. If `fromIndex == toIndex`,
the range to be sorted is empty.

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

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort
by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.parallelSort(byte[])

```java
public static void parallelSort(byte[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8

## Arrays.parallelSort(byte[], int, int)

```java
public static void parallelSort(byte[] a, int fromIndex, int toIndex)
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

## Arrays.parallelSort(char[])

```java
public static void parallelSort(char[] a)
```

Sorts the specified array into ascending numerical order.

Parameters:

- `a`: the array to be sorted

**Implementation note:** The sorting algorithm is a Dual-Pivot Quicksort by
Vladimir Yaroslavskiy, Jon Bentley and Josh Bloch. This algorithm
offers O(n log(n)) performance on all data sets, and is typically
faster than traditional (one-pivot) Quicksort implementations.

**Since:** 1.8
