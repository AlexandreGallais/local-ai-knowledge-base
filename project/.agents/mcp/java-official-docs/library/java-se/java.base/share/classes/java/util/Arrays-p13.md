---
title: "Arrays class (java.util) (part 13 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 13 of 19)

## Arrays.compare(short[], short[])

```java
public static int compare(short[] a, short[] b)
```

Compares two `short` arrays lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
short), at an index within the respective
arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See short[]) for the definition of a common
and proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

The comparison is consistent with short[]) equals,
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
        return Short.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compare(short[], int, int, short[], int, int)

```java
public static int compare(short[] a, int aFromIndex, int aToIndex, short[] b, int bFromIndex, int bToIndex)
```

Compares two `short` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by short), at a relative
index within the respective arrays that is the length of the prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, short[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, short[], int, int) equals, more
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
        return Short.compare(a[aFromIndex + i], b[bFromIndex + i]);
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

## Arrays.compareUnsigned(short[], short[])

```java
public static int compareUnsigned(short[] a, short[] b)
```

Compares two `short` arrays lexicographically, numerically treating
elements as unsigned.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
short), at an index within the
respective arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See short[]) for the definition of a common
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
        return Short.compareUnsigned(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are
        equal and contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compareUnsigned(short[], int, int, short[], int, int)

```java
public static int compareUnsigned(short[] a, int aFromIndex, int aToIndex, short[] b, int bFromIndex, int bToIndex)
```

Compares two `short` arrays lexicographically over the specified
ranges, numerically treating elements as unsigned.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by short), at a
relative index within the respective arrays that is the length of the
prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, short[], int, int) for the
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
        return Short.compareUnsigned(a[aFromIndex + i], b[bFromIndex + i]);
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

## Arrays.compare(char[], char[])

```java
public static int compare(char[] a, char[] b)
```

Compares two `char` arrays lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
char), at an index within the respective
arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See char[]) for the definition of a common and
proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

The comparison is consistent with char[]) equals,
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
        return Character.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compare(char[], int, int, char[], int, int)

```java
public static int compare(char[] a, int aFromIndex, int aToIndex, char[] b, int bFromIndex, int bToIndex)
```

Compares two `char` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by char), at a relative
index within the respective arrays that is the length of the prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, char[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, char[], int, int) equals, more
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
        return Character.compare(a[aFromIndex + i], b[bFromIndex + i]);
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

## Arrays.compare(int[], int[])

```java
public static int compare(int[] a, int[] b)
```

Compares two `int` arrays lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
int), at an index within the respective
arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See int[]) for the definition of a common and
proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

The comparison is consistent with int[]) equals,
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
        return Integer.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9
