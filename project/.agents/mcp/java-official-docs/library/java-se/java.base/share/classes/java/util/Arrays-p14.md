---
title: "Arrays class (java.util) (part 14 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 14 of 19)

## Arrays.compare(int[], int, int, int[], int, int)

```java
public static int compare(int[] a, int aFromIndex, int aToIndex, int[] b, int bFromIndex, int bToIndex)
```

Compares two `int` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by int), at a relative index
within the respective arrays that is the length of the prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, int[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, int[], int, int) equals, more
specifically the following holds for arrays `a` and `b` with
specified ranges [`aFromIndex`, `aToIndex`) and
[`bFromIndex`, `bToIndex`) respectively:

```java
    Arrays.equals(a, aFromIndex, aToIndex, b, bFromIndex, bToIndex) ==
        (Arrays.compare(a, aFromIndex, aToIndex, b, bFromIndex, bToIndex) == 0)
```

Parameters:

- `a`: the first array to compare
- `aFromIndex`: the index (inclusive) of the first element in the first array to be compared
- `aToIndex`: the index (exclusive) of the last element in the first array to be compared
- `b`: the second array to compare
- `bFromIndex`: the index (inclusive) of the first element in the second array to be compared
- `bToIndex`: the index (exclusive) of the last element in the second array to be compared

**API note:** This method behaves as if:

```java
    int i = Arrays.mismatch(a, aFromIndex, aToIndex,
                            b, bFromIndex, bToIndex);
    if (i >= 0 && i < Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex))
        return Integer.compare(a[aFromIndex + i], b[bFromIndex + i]);
    return (aToIndex - aFromIndex) - (bToIndex - bFromIndex);
```

**Returns:** the value `0` if, over the specified ranges, the first and
        second array are equal and contain the same elements in the same
        order;
        a value less than `0` if, over the specified ranges, the
        first array is lexicographically less than the second array; and
        a value greater than `0` if, over the specified ranges, the
        first array is lexicographically greater than the second array

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is `null`

## Arrays.compareUnsigned(int[], int[])

```java
public static int compareUnsigned(int[] a, int[] b)
```

Compares two `int` arrays lexicographically, numerically treating
elements as unsigned.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
int), at an index within the
respective arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See int[]) for the definition of a common
and proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

Parameters:

- `a`: the first array to compare
- `b`: the second array to compare

**API note:** This method behaves as if (for non-`null` array references):

```java
    int i = Arrays.mismatch(a, b);
    if (i >= 0 && i < Math.min(a.length, b.length))
        return Integer.compareUnsigned(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are
        equal and contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compareUnsigned(int[], int, int, int[], int, int)

```java
public static int compareUnsigned(int[] a, int aFromIndex, int aToIndex, int[] b, int bFromIndex, int bToIndex)
```

Compares two `int` arrays lexicographically over the specified
ranges, numerically treating elements as unsigned.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by int), at a
relative index within the respective arrays that is the length of the
prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, int[], int, int) for the
definition of a common and proper prefix.)

Parameters:

- `a`: the first array to compare
- `aFromIndex`: the index (inclusive) of the first element in the first array to be compared
- `aToIndex`: the index (exclusive) of the last element in the first array to be compared
- `b`: the second array to compare
- `bFromIndex`: the index (inclusive) of the first element in the second array to be compared
- `bToIndex`: the index (exclusive) of the last element in the second array to be compared

**API note:** This method behaves as if:

```java
    int i = Arrays.mismatch(a, aFromIndex, aToIndex,
                            b, bFromIndex, bToIndex);
    if (i >= 0 && i < Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex))
        return Integer.compareUnsigned(a[aFromIndex + i], b[bFromIndex + i]);
    return (aToIndex - aFromIndex) - (bToIndex - bFromIndex);
```

**Returns:** the value `0` if, over the specified ranges, the first and
        second array are equal and contain the same elements in the same
        order;
        a value less than `0` if, over the specified ranges, the
        first array is lexicographically less than the second array; and
        a value greater than `0` if, over the specified ranges, the
        first array is lexicographically greater than the second array

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is null

## Arrays.compare(long[], long[])

```java
public static int compare(long[] a, long[] b)
```

Compares two `long` arrays lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
long), at an index within the respective
arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See long[]) for the definition of a common and
proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

The comparison is consistent with long[]) equals,
more specifically the following holds for arrays `a` and `b`:

```java
    Arrays.equals(a, b) == (Arrays.compare(a, b) == 0)
```

Parameters:

- `a`: the first array to compare
- `b`: the second array to compare

**API note:** This method behaves as if (for non-`null` array references):

```java
    int i = Arrays.mismatch(a, b);
    if (i >= 0 && i < Math.min(a.length, b.length))
        return Long.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compare(long[], int, int, long[], int, int)

```java
public static int compare(long[] a, int aFromIndex, int aToIndex, long[] b, int bFromIndex, int bToIndex)
```

Compares two `long` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by long), at a relative index
within the respective arrays that is the length of the prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, long[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, long[], int, int) equals, more
specifically the following holds for arrays `a` and `b` with
specified ranges [`aFromIndex`, `aToIndex`) and
[`bFromIndex`, `bToIndex`) respectively:

```java
    Arrays.equals(a, aFromIndex, aToIndex, b, bFromIndex, bToIndex) ==
        (Arrays.compare(a, aFromIndex, aToIndex, b, bFromIndex, bToIndex) == 0)
```

Parameters:

- `a`: the first array to compare
- `aFromIndex`: the index (inclusive) of the first element in the first array to be compared
- `aToIndex`: the index (exclusive) of the last element in the first array to be compared
- `b`: the second array to compare
- `bFromIndex`: the index (inclusive) of the first element in the second array to be compared
- `bToIndex`: the index (exclusive) of the last element in the second array to be compared

**API note:** This method behaves as if:

```java
    int i = Arrays.mismatch(a, aFromIndex, aToIndex,
                            b, bFromIndex, bToIndex);
    if (i >= 0 && i < Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex))
        return Long.compare(a[aFromIndex + i], b[bFromIndex + i]);
    return (aToIndex - aFromIndex) - (bToIndex - bFromIndex);
```

**Returns:** the value `0` if, over the specified ranges, the first and
        second array are equal and contain the same elements in the same
        order;
        a value less than `0` if, over the specified ranges, the
        first array is lexicographically less than the second array; and
        a value greater than `0` if, over the specified ranges, the
        first array is lexicographically greater than the second array

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is `null`

## Arrays.compareUnsigned(long[], long[])

```java
public static int compareUnsigned(long[] a, long[] b)
```

Compares two `long` arrays lexicographically, numerically treating
elements as unsigned.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
long), at an index within the
respective arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See long[]) for the definition of a common
and proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

Parameters:

- `a`: the first array to compare
- `b`: the second array to compare

**API note:** This method behaves as if (for non-`null` array references):

```java
    int i = Arrays.mismatch(a, b);
    if (i >= 0 && i < Math.min(a.length, b.length))
        return Long.compareUnsigned(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are
        equal and contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compareUnsigned(long[], int, int, long[], int, int)

```java
public static int compareUnsigned(long[] a, int aFromIndex, int aToIndex, long[] b, int bFromIndex, int bToIndex)
```

Compares two `long` arrays lexicographically over the specified
ranges, numerically treating elements as unsigned.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by long), at a
relative index within the respective arrays that is the length of the
prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, long[], int, int) for the
definition of a common and proper prefix.)

Parameters:

- `a`: the first array to compare
- `aFromIndex`: the index (inclusive) of the first element in the first array to be compared
- `aToIndex`: the index (exclusive) of the last element in the first array to be compared
- `b`: the second array to compare
- `bFromIndex`: the index (inclusive) of the first element in the second array to be compared
- `bToIndex`: the index (exclusive) of the last element in the second array to be compared

**API note:** This method behaves as if:

```java
    int i = Arrays.mismatch(a, aFromIndex, aToIndex,
                            b, bFromIndex, bToIndex);
    if (i >= 0 && i < Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex))
        return Long.compareUnsigned(a[aFromIndex + i], b[bFromIndex + i]);
    return (aToIndex - aFromIndex) - (bToIndex - bFromIndex);
```

**Returns:** the value `0` if, over the specified ranges, the first and
        second array are equal and contain the same elements in the same
        order;
        a value less than `0` if, over the specified ranges, the
        first array is lexicographically less than the second array; and
        a value greater than `0` if, over the specified ranges, the
        first array is lexicographically greater than the second array

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is null
