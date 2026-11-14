---
title: "Arrays class (java.util) (part 3 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 3 of 19)

## Arrays.parallelSort(T[], Comparator<? super T>)

```java
public static <T> void parallelSort(T[] a, Comparator<? super T> cmp)
```

Sorts the specified array of objects according to the order induced by
the specified comparator.  All elements in the array must be
*mutually comparable* by the specified comparator (that is,
`c.compare(e1, e2)` must not throw a `ClassCastException`
for any elements `e1` and `e2` in the array).

This sort is guaranteed to be *stable*:  equal elements will
not be reordered as a result of the sort.

Parameters:

- `<T>`: the class of the objects to be sorted
- `a`: the array to be sorted
- `cmp`: the comparator to determine the order of the array. A `null` value indicates that the elements' natural ordering should be used.

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

- `ClassCastException`: if the array contains elements that are not *mutually comparable* using the specified comparator
- `IllegalArgumentException`: (optional) if the comparator is found to violate the `java.util.Comparator` contract

## Arrays.parallelSort(T[], int, int, Comparator<? super T>)

```java
public static <T> void parallelSort(T[] a, int fromIndex, int toIndex, Comparator<? super T> cmp)
```

Sorts the specified range of the specified array of objects according
to the order induced by the specified comparator.  The range to be
sorted extends from index `fromIndex`, inclusive, to index
`toIndex`, exclusive.  (If `fromIndex==toIndex`, the
range to be sorted is empty.)  All elements in the range must be
*mutually comparable* by the specified comparator (that is,
`c.compare(e1, e2)` must not throw a `ClassCastException`
for any elements `e1` and `e2` in the range).

This sort is guaranteed to be *stable*:  equal elements will
not be reordered as a result of the sort.

Parameters:

- `<T>`: the class of the objects to be sorted
- `a`: the array to be sorted
- `fromIndex`: the index of the first element (inclusive) to be sorted
- `toIndex`: the index of the last element (exclusive) to be sorted
- `cmp`: the comparator to determine the order of the array. A `null` value indicates that the elements' natural ordering should be used.

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

## Arrays.sort(Object[])

```java
public static void sort(Object[] a)
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

Implementation note: This implementation is a stable, adaptive,
iterative mergesort that requires far fewer than n lg(n) comparisons
when the input array is partially sorted, while offering the
performance of a traditional mergesort when the input array is
randomly ordered.  If the input array is nearly sorted, the
implementation requires approximately n comparisons.  Temporary
storage requirements vary from a small constant for nearly sorted
input arrays to n/2 object references for randomly ordered input
arrays.

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

Parameters:

- `a`: the array to be sorted

Throws:

- `ClassCastException`: if the array contains elements that are not *mutually comparable* (for example, strings and integers)
- `IllegalArgumentException`: (optional) if the natural ordering of the array elements is found to violate the `Comparable` contract

## Arrays.sort(Object[], int, int)

```java
public static void sort(Object[] a, int fromIndex, int toIndex)
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

Implementation note: This implementation is a stable, adaptive,
iterative mergesort that requires far fewer than n lg(n) comparisons
when the input array is partially sorted, while offering the
performance of a traditional mergesort when the input array is
randomly ordered.  If the input array is nearly sorted, the
implementation requires approximately n comparisons.  Temporary
storage requirements vary from a small constant for nearly sorted
input arrays to n/2 object references for randomly ordered input
arrays.

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

Parameters:

- `a`: the array to be sorted
- `fromIndex`: the index of the first element (inclusive) to be sorted
- `toIndex`: the index of the last element (exclusive) to be sorted

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex` or (optional) if the natural ordering of the array elements is found to violate the `Comparable` contract
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`
- `ClassCastException`: if the array contains elements that are not *mutually comparable* (for example, strings and integers).

## Arrays.sort(T[], Comparator<? super T>)

```java
public static <T> void sort(T[] a, Comparator<? super T> c)
```

Sorts the specified array of objects according to the order induced by
the specified comparator.  All elements in the array must be
*mutually comparable* by the specified comparator (that is,
`c.compare(e1, e2)` must not throw a `ClassCastException`
for any elements `e1` and `e2` in the array).

This sort is guaranteed to be *stable*:  equal elements will
not be reordered as a result of the sort.

Implementation note: This implementation is a stable, adaptive,
iterative mergesort that requires far fewer than n lg(n) comparisons
when the input array is partially sorted, while offering the
performance of a traditional mergesort when the input array is
randomly ordered.  If the input array is nearly sorted, the
implementation requires approximately n comparisons.  Temporary
storage requirements vary from a small constant for nearly sorted
input arrays to n/2 object references for randomly ordered input
arrays.

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

Parameters:

- `<T>`: the class of the objects to be sorted
- `a`: the array to be sorted
- `c`: the comparator to determine the order of the array. A `null` value indicates that the elements' natural ordering should be used.

Throws:

- `ClassCastException`: if the array contains elements that are not *mutually comparable* using the specified comparator
- `IllegalArgumentException`: (optional) if the comparator is found to violate the `Comparator` contract

## Arrays.sort(T[], int, int, Comparator<? super T>)

```java
public static <T> void sort(T[] a, int fromIndex, int toIndex, Comparator<? super T> c)
```

Sorts the specified range of the specified array of objects according
to the order induced by the specified comparator.  The range to be
sorted extends from index `fromIndex`, inclusive, to index
`toIndex`, exclusive.  (If `fromIndex==toIndex`, the
range to be sorted is empty.)  All elements in the range must be
*mutually comparable* by the specified comparator (that is,
`c.compare(e1, e2)` must not throw a `ClassCastException`
for any elements `e1` and `e2` in the range).

This sort is guaranteed to be *stable*:  equal elements will
not be reordered as a result of the sort.

Implementation note: This implementation is a stable, adaptive,
iterative mergesort that requires far fewer than n lg(n) comparisons
when the input array is partially sorted, while offering the
performance of a traditional mergesort when the input array is
randomly ordered.  If the input array is nearly sorted, the
implementation requires approximately n comparisons.  Temporary
storage requirements vary from a small constant for nearly sorted
input arrays to n/2 object references for randomly ordered input
arrays.

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

Parameters:

- `<T>`: the class of the objects to be sorted
- `a`: the array to be sorted
- `fromIndex`: the index of the first element (inclusive) to be sorted
- `toIndex`: the index of the last element (exclusive) to be sorted
- `c`: the comparator to determine the order of the array. A `null` value indicates that the elements' natural ordering should be used.

Throws:

- `ClassCastException`: if the array contains elements that are not *mutually comparable* using the specified comparator.
- `IllegalArgumentException`: if `fromIndex > toIndex` or (optional) if the comparator is found to violate the `Comparator` contract
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.parallelPrefix(T[], BinaryOperator<T>)

```java
public static <T> void parallelPrefix(T[] array, BinaryOperator<T> op)
```

Cumulates, in parallel, each element of the given array in place,
using the supplied function. For example if the array initially
holds `[2, 1, 0, 3]` and the operation performs addition,
then upon return the array holds `[2, 3, 3, 6]`.
Parallel prefix computation is usually more efficient than
sequential loops for large arrays.

Parameters:

- `<T>`: the class of the objects in the array
- `array`: the array, which is modified in-place by this method
- `op`: a side-effect-free, associative function to perform the cumulation

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified array or function is null

## Arrays.parallelPrefix(T[], int, int, BinaryOperator<T>)

```java
public static <T> void parallelPrefix(T[] array, int fromIndex, int toIndex, BinaryOperator<T> op)
```

Performs BinaryOperator)
for the given subrange of the array.

Parameters:

- `<T>`: the class of the objects in the array
- `array`: the array
- `fromIndex`: the index of the first element, inclusive
- `toIndex`: the index of the last element, exclusive
- `op`: a side-effect-free, associative function to perform the cumulation

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > array.length`
- `NullPointerException`: if the specified array or function is null
