---
title: "Arrays class (java.util) (part 15 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 15 of 19)

## Arrays.compare(float[], float[])

```java
public static int compare(float[] a, float[] b)
```

Compares two `float` arrays lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
float), at an index within the respective
arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See float[]) for the definition of a common
and proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

The comparison is consistent with float[]) equals,
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
        return Float.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compare(float[], int, int, float[], int, int)

```java
public static int compare(float[] a, int aFromIndex, int aToIndex, float[] b, int bFromIndex, int bToIndex)
```

Compares two `float` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by float), at a relative
index within the respective arrays that is the length of the prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, float[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, float[], int, int) equals, more
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
        return Float.compare(a[aFromIndex + i], b[bFromIndex + i]);
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

## Arrays.compare(double[], double[])

```java
public static int compare(double[] a, double[] b)
```

Compares two `double` arrays lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements, as if by
double), at an index within the respective
arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See double[]) for the definition of a common
and proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

The comparison is consistent with double[]) equals,
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
        return Double.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compare(double[], int, int, double[], int, int)

```java
public static int compare(double[] a, int aFromIndex, int aToIndex, double[] b, int bFromIndex, int bToIndex)
```

Compares two `double` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements, as if by double), at a relative
index within the respective arrays that is the length of the prefix.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, double[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, double[], int, int) equals, more
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
        return Double.compare(a[aFromIndex + i], b[bFromIndex + i]);
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

## Arrays.compare(T[], T[])

```java
public static <T extends Comparable<? super T>> int compare(T[] a, T[] b)
```

Compares two `Object` arrays, within comparable elements,
lexicographically.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing two elements of type `T` at
an index `i` within the respective arrays that is the prefix
length, as if by:

```java
    Comparator.nullsFirst(Comparator.<T>naturalOrder()).
        compare(a[i], b[i])
```

Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See Object[]) for the definition of a common
and proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference. Two `null` array
references are considered equal.
A `null` array element is considered lexicographically less than a
non-`null` array element. Two `null` array elements are
considered equal.

The comparison is consistent with Object[]) equals,
more specifically the following holds for arrays `a` and `b`:

```java
    Arrays.equals(a, b) == (Arrays.compare(a, b) == 0)
```

Parameters:

- `a`: the first array to compare
- `b`: the second array to compare
- `<T>`: the type of comparable array elements

**API note:** This method behaves as if (for non-`null` array references
and elements):

```java
    int i = Arrays.mismatch(a, b);
    if (i >= 0 && i < Math.min(a.length, b.length))
        return a[i].compareTo(b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

## Arrays.compare(T[], int, int, T[], int, int)

```java
public static <T extends Comparable<? super T>> int compare( T[] a, int aFromIndex, int aToIndex, T[] b, int bFromIndex, int bToIndex)
```

Compares two `Object` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing two
elements of type `T` at a relative index `i` within the
respective arrays that is the prefix length, as if by:

```java
    Comparator.nullsFirst(Comparator.<T>naturalOrder()).
        compare(a[aFromIndex + i, b[bFromIndex + i])
```

Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, Object[], int, int) for the
definition of a common and proper prefix.)

The comparison is consistent with
int, int, Object[], int, int) equals, more
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
- `<T>`: the type of comparable array elements

**API note:** This method behaves as if (for non-`null` array elements):

```java
    int i = Arrays.mismatch(a, aFromIndex, aToIndex,
                            b, bFromIndex, bToIndex);
    if (i >= 0 && i < Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex))
        return a[aFromIndex + i].compareTo(b[bFromIndex + i]);
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

## Arrays.compare(T[], T[], Comparator<? super T>)

```java
public static <T> int compare(T[] a, T[] b, Comparator<? super T> cmp)
```

Compares two `Object` arrays lexicographically using a specified
comparator.

If the two arrays share a common prefix then the lexicographic
comparison is the result of comparing with the specified comparator two
elements at an index within the respective arrays that is the prefix
length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two array lengths.
(See Object[]) for the definition of a common
and proper prefix.)

A `null` array reference is considered lexicographically less
than a non-`null` array reference.  Two `null` array
references are considered equal.

Parameters:

- `a`: the first array to compare
- `b`: the second array to compare
- `cmp`: the comparator to compare array elements
- `<T>`: the type of array elements

**API note:** This method behaves as if (for non-`null` array references):

```java
    int i = Arrays.mismatch(a, b, cmp);
    if (i >= 0 && i < Math.min(a.length, b.length))
        return cmp.compare(a[i], b[i]);
    return a.length - b.length;
```

**Returns:** the value `0` if the first and second array are equal and
        contain the same elements in the same order;
        a value less than `0` if the first array is
        lexicographically less than the second array; and
        a value greater than `0` if the first array is
        lexicographically greater than the second array

**Since:** 9

Throws:

- `NullPointerException`: if the comparator is `null`
