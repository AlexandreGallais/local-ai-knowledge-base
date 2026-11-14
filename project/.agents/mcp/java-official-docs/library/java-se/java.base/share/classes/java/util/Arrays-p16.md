---
title: "Arrays class (java.util) (part 16 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 16 of 19)

## Arrays.compare(T[], int, int, T[], int, int, Comparator<? super T>)

```java
public static <T> int compare( T[] a, int aFromIndex, int aToIndex, T[] b, int bFromIndex, int bToIndex, Comparator<? super T> cmp)
```

Compares two `Object` arrays lexicographically over the specified
ranges.

If the two arrays, over the specified ranges, share a common prefix
then the lexicographic comparison is the result of comparing with the
specified comparator two elements at a relative index within the
respective arrays that is the prefix length.
Otherwise, one array is a proper prefix of the other and, lexicographic
comparison is the result of comparing the two range lengths.
(See int, int, Object[], int, int) for the
definition of a common and proper prefix.)

Parameters:

- `a`: the first array to compare
- `aFromIndex`: the index (inclusive) of the first element in the first array to be compared
- `aToIndex`: the index (exclusive) of the last element in the first array to be compared
- `b`: the second array to compare
- `bFromIndex`: the index (inclusive) of the first element in the second array to be compared
- `bToIndex`: the index (exclusive) of the last element in the second array to be compared
- `cmp`: the comparator to compare array elements
- `<T>`: the type of array elements

**API note:** This method behaves as if (for non-`null` array elements):

```java
    int i = Arrays.mismatch(a, aFromIndex, aToIndex,
                            b, bFromIndex, bToIndex, cmp);
    if (i >= 0 && i < Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex))
        return cmp.compare(a[aFromIndex + i], b[bFromIndex + i]);
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
- `NullPointerException`: if either array or the comparator is `null`

## Arrays.mismatch(boolean[], boolean[])

```java
public static int mismatch(boolean[] a, boolean[] b)
```

Finds and returns the index of the first mismatch between two
`boolean` arrays, otherwise return -1 if no mismatch is found.  The
index will be in the range of 0 (inclusive) up to the length (inclusive)
of the smaller array.

If the two arrays share a common prefix then the returned index is the
length of the common prefix and it follows that there is a mismatch
between the two elements at that index within the respective arrays.
If one array is a proper prefix of the other then the returned index is
the length of the smaller array and it follows that the index is only
valid for the larger array.
Otherwise, there is no mismatch.

Two non-`null` arrays, `a` and `b`, share a common
prefix of length `pl` if the following expression is true:

```java
    pl >= 0 &&
    pl < Math.min(a.length, b.length) &&
    Arrays.equals(a, 0, pl, b, 0, pl) &&
    a[pl] != b[pl]
```

Note that a common prefix length of `0` indicates that the first
elements from each array mismatch.

Two non-`null` arrays, `a` and `b`, share a proper
prefix if the following expression is true:

```java
    a.length != b.length &&
    Arrays.equals(a, 0, Math.min(a.length, b.length),
                  b, 0, Math.min(a.length, b.length))
```

Parameters:

- `a`: the first array to be tested for a mismatch
- `b`: the second array to be tested for a mismatch

**Returns:** the index of the first mismatch between the two arrays,
        otherwise `-1`.

**Since:** 9

Throws:

- `NullPointerException`: if either array is `null`

## Arrays.mismatch(boolean[], int, int, boolean[], int, int)

```java
public static int mismatch(boolean[] a, int aFromIndex, int aToIndex, boolean[] b, int bFromIndex, int bToIndex)
```

Finds and returns the relative index of the first mismatch between two
`boolean` arrays over the specified ranges, otherwise return -1 if
no mismatch is found.  The index will be in the range of 0 (inclusive) up
to the length (inclusive) of the smaller range.

If the two arrays, over the specified ranges, share a common prefix
then the returned relative index is the length of the common prefix and
it follows that there is a mismatch between the two elements at that
relative index within the respective arrays.
If one array is a proper prefix of the other, over the specified ranges,
then the returned relative index is the length of the smaller range and
it follows that the relative index is only valid for the array with the
larger range.
Otherwise, there is no mismatch.

Two non-`null` arrays, `a` and `b` with specified
ranges [`aFromIndex`, `aToIndex`) and
[`bFromIndex`, `bToIndex`) respectively, share a common
prefix of length `pl` if the following expression is true:

```java
    pl >= 0 &&
    pl < Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex) &&
    Arrays.equals(a, aFromIndex, aFromIndex + pl, b, bFromIndex, bFromIndex + pl) &&
    a[aFromIndex + pl] != b[bFromIndex + pl]
```

Note that a common prefix length of `0` indicates that the first
elements from each array mismatch.

Two non-`null` arrays, `a` and `b` with specified
ranges [`aFromIndex`, `aToIndex`) and
[`bFromIndex`, `bToIndex`) respectively, share a proper
prefix if the following expression is true:

```java
    (aToIndex - aFromIndex) != (bToIndex - bFromIndex) &&
    Arrays.equals(a, 0, Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex),
                  b, 0, Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex))
```

Parameters:

- `a`: the first array to be tested for a mismatch
- `aFromIndex`: the index (inclusive) of the first element in the first array to be tested
- `aToIndex`: the index (exclusive) of the last element in the first array to be tested
- `b`: the second array to be tested for a mismatch
- `bFromIndex`: the index (inclusive) of the first element in the second array to be tested
- `bToIndex`: the index (exclusive) of the last element in the second array to be tested

**Returns:** the relative index of the first mismatch between the two arrays
        over the specified ranges, otherwise `-1`.

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is `null`

## Arrays.mismatch(byte[], byte[])

```java
public static int mismatch(byte[] a, byte[] b)
```

Finds and returns the index of the first mismatch between two `byte`
arrays, otherwise return -1 if no mismatch is found.  The index will be
in the range of 0 (inclusive) up to the length (inclusive) of the smaller
array.

If the two arrays share a common prefix then the returned index is the
length of the common prefix and it follows that there is a mismatch
between the two elements at that index within the respective arrays.
If one array is a proper prefix of the other then the returned index is
the length of the smaller array and it follows that the index is only
valid for the larger array.
Otherwise, there is no mismatch.

Two non-`null` arrays, `a` and `b`, share a common
prefix of length `pl` if the following expression is true:

```java
    pl >= 0 &&
    pl < Math.min(a.length, b.length) &&
    Arrays.equals(a, 0, pl, b, 0, pl) &&
    a[pl] != b[pl]
```

Note that a common prefix length of `0` indicates that the first
elements from each array mismatch.

Two non-`null` arrays, `a` and `b`, share a proper
prefix if the following expression is true:

```java
    a.length != b.length &&
    Arrays.equals(a, 0, Math.min(a.length, b.length),
                  b, 0, Math.min(a.length, b.length))
```

Parameters:

- `a`: the first array to be tested for a mismatch
- `b`: the second array to be tested for a mismatch

**Returns:** the index of the first mismatch between the two arrays,
        otherwise `-1`.

**Since:** 9

Throws:

- `NullPointerException`: if either array is `null`

## Arrays.mismatch(byte[], int, int, byte[], int, int)

```java
public static int mismatch(byte[] a, int aFromIndex, int aToIndex, byte[] b, int bFromIndex, int bToIndex)
```

Finds and returns the relative index of the first mismatch between two
`byte` arrays over the specified ranges, otherwise return -1 if no
mismatch is found.  The index will be in the range of 0 (inclusive) up to
the length (inclusive) of the smaller range.

If the two arrays, over the specified ranges, share a common prefix
then the returned relative index is the length of the common prefix and
it follows that there is a mismatch between the two elements at that
relative index within the respective arrays.
If one array is a proper prefix of the other, over the specified ranges,
then the returned relative index is the length of the smaller range and
it follows that the relative index is only valid for the array with the
larger range.
Otherwise, there is no mismatch.

Two non-`null` arrays, `a` and `b` with specified
ranges [`aFromIndex`, `aToIndex`) and
[`bFromIndex`, `bToIndex`) respectively, share a common
prefix of length `pl` if the following expression is true:

```java
    pl >= 0 &&
    pl < Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex) &&
    Arrays.equals(a, aFromIndex, aFromIndex + pl, b, bFromIndex, bFromIndex + pl) &&
    a[aFromIndex + pl] != b[bFromIndex + pl]
```

Note that a common prefix length of `0` indicates that the first
elements from each array mismatch.

Two non-`null` arrays, `a` and `b` with specified
ranges [`aFromIndex`, `aToIndex`) and
[`bFromIndex`, `bToIndex`) respectively, share a proper
prefix if the following expression is true:

```java
    (aToIndex - aFromIndex) != (bToIndex - bFromIndex) &&
    Arrays.equals(a, 0, Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex),
                  b, 0, Math.min(aToIndex - aFromIndex, bToIndex - bFromIndex))
```

Parameters:

- `a`: the first array to be tested for a mismatch
- `aFromIndex`: the index (inclusive) of the first element in the first array to be tested
- `aToIndex`: the index (exclusive) of the last element in the first array to be tested
- `b`: the second array to be tested for a mismatch
- `bFromIndex`: the index (inclusive) of the first element in the second array to be tested
- `bToIndex`: the index (exclusive) of the last element in the second array to be tested

**Returns:** the relative index of the first mismatch between the two arrays
        over the specified ranges, otherwise `-1`.

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is `null`

## Arrays.mismatch(char[], char[])

```java
public static int mismatch(char[] a, char[] b)
```

Finds and returns the index of the first mismatch between two `char`
arrays, otherwise return -1 if no mismatch is found.  The index will be
in the range of 0 (inclusive) up to the length (inclusive) of the smaller
array.

If the two arrays share a common prefix then the returned index is the
length of the common prefix and it follows that there is a mismatch
between the two elements at that index within the respective arrays.
If one array is a proper prefix of the other then the returned index is
the length of the smaller array and it follows that the index is only
valid for the larger array.
Otherwise, there is no mismatch.

Two non-`null` arrays, `a` and `b`, share a common
prefix of length `pl` if the following expression is true:

```java
    pl >= 0 &&
    pl < Math.min(a.length, b.length) &&
    Arrays.equals(a, 0, pl, b, 0, pl) &&
    a[pl] != b[pl]
```

Note that a common prefix length of `0` indicates that the first
elements from each array mismatch.

Two non-`null` arrays, `a` and `b`, share a proper
prefix if the following expression is true:

```java
    a.length != b.length &&
    Arrays.equals(a, 0, Math.min(a.length, b.length),
                  b, 0, Math.min(a.length, b.length))
```

Parameters:

- `a`: the first array to be tested for a mismatch
- `b`: the second array to be tested for a mismatch

**Returns:** the index of the first mismatch between the two arrays,
        otherwise `-1`.

**Since:** 9

Throws:

- `NullPointerException`: if either array is `null`
