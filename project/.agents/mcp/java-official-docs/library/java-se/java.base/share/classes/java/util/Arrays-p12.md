---
title: "Arrays class (java.util) (part 12 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 12 of 19)

## Arrays.stream(int[], int, int)

```java
public static IntStream stream(int[] array, int startInclusive, int endExclusive)
```

Returns a sequential `IntStream` with the specified range of the
specified array as its source.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `startInclusive`: the first index to cover, inclusive
- `endExclusive`: index immediately past the last index to cover

**Returns:** an `IntStream` for the array range

**Since:** 1.8

Throws:

- `ArrayIndexOutOfBoundsException`: if `startInclusive` is negative, `endExclusive` is less than `startInclusive`, or `endExclusive` is greater than the array size

## Arrays.stream(long[])

```java
public static LongStream stream(long[] array)
```

Returns a sequential `LongStream` with the specified array as its
source.

Parameters:

- `array`: the array, assumed to be unmodified during use

**Returns:** a `LongStream` for the array

**Since:** 1.8

## Arrays.stream(long[], int, int)

```java
public static LongStream stream(long[] array, int startInclusive, int endExclusive)
```

Returns a sequential `LongStream` with the specified range of the
specified array as its source.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `startInclusive`: the first index to cover, inclusive
- `endExclusive`: index immediately past the last index to cover

**Returns:** a `LongStream` for the array range

**Since:** 1.8

Throws:

- `ArrayIndexOutOfBoundsException`: if `startInclusive` is negative, `endExclusive` is less than `startInclusive`, or `endExclusive` is greater than the array size

## Arrays.stream(double[])

```java
public static DoubleStream stream(double[] array)
```

Returns a sequential `DoubleStream` with the specified array as its
source.

Parameters:

- `array`: the array, assumed to be unmodified during use

**Returns:** a `DoubleStream` for the array

**Since:** 1.8

## Arrays.stream(double[], int, int)

```java
public static DoubleStream stream(double[] array, int startInclusive, int endExclusive)
```

Returns a sequential `DoubleStream` with the specified range of the
specified array as its source.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `startInclusive`: the first index to cover, inclusive
- `endExclusive`: index immediately past the last index to cover

**Returns:** a `DoubleStream` for the array range

**Since:** 1.8

Throws:

- `ArrayIndexOutOfBoundsException`: if `startInclusive` is negative, `endExclusive` is less than `startInclusive`, or `endExclusive` is greater than the array size

## Arrays.compare(boolean[], boolean[])

```java
public static int compare(boolean[] a, boolean[] b)
```

Compares two `boolean` arrays lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
boolean), at an index within the
respective arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See boolean[]) for the definition of a
common and proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

The comparison is consistent with boolean[]) equals,
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
        return Boolean.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compare(boolean[], int, int, boolean[], int, int)

```java
public static int compare(boolean[] a, int aFromIndex, int aToIndex, boolean[] b, int bFromIndex, int bToIndex)
```

Compares two `boolean` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by boolean), at a
relative index within the respective arrays that is the length of the
prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, boolean[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, boolean[], int, int) equals, more
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
        return Boolean.compare(a[aFromIndex + i], b[bFromIndex + i]);
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

## Arrays.compare(byte[], byte[])

```java
public static int compare(byte[] a, byte[] b)
```

Compares two `byte` arrays lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
byte), at an index within the respective
arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See byte[]) for the definition of a common and
proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

The comparison is consistent with byte[]) equals,
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
        return Byte.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compare(byte[], int, int, byte[], int, int)

```java
public static int compare(byte[] a, int aFromIndex, int aToIndex, byte[] b, int bFromIndex, int bToIndex)
```

Compares two `byte` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by byte), at a relative index
within the respective arrays that is the length of the prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, byte[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, byte[], int, int) equals, more
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
        return Byte.compare(a[aFromIndex + i], b[bFromIndex + i]);
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

## Arrays.compareUnsigned(byte[], byte[])

```java
public static int compareUnsigned(byte[] a, byte[] b)
```

Compares two `byte` arrays lexicographically, numerically treating
elements as unsigned.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
byte), at an index within the
respective arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See byte[]) for the definition of a common
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
        return Byte.compareUnsigned(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are
        equal and contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compareUnsigned(byte[], int, int, byte[], int, int)

```java
public static int compareUnsigned(byte[] a, int aFromIndex, int aToIndex, byte[] b, int bFromIndex, int bToIndex)
```

Compares two `byte` arrays lexicographically over the specified
ranges, numerically treating elements as unsigned.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by byte), at a
relative index within the respective arrays that is the length of the
prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, byte[], int, int) for the
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
        return Byte.compareUnsigned(a[aFromIndex + i], b[bFromIndex + i]);
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
