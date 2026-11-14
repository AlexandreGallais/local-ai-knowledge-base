---
title: "Arrays class (java.util) (part 7 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 7 of 19)

## Arrays.equals(float[], float[])

```java
public static boolean equals(float[] a, float[] a2)
```

Returns `true` if the two specified arrays of floats are
*equal* to one another.  Two arrays are considered equal if both
arrays contain the same number of elements, and all corresponding pairs
of elements in the two arrays are equal.  In other words, two arrays
are equal if they contain the same elements in the same order.  Also,
two array references are considered equal if both are `null`.

Two floats `f1` and `f2` are considered equal if:

```java
Float.valueOf(f1).equals(Float.valueOf(f2))
```

(Unlike the `==` operator, this method considers
`NaN` equal to itself, and 0.0f unequal to -0.0f.)

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

**See also:** Float#equals(Object)

## Arrays.equals(float[], int, int, float[], int, int)

```java
public static boolean equals(float[] a, int aFromIndex, int aToIndex, float[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of floats, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

Two floats `f1` and `f2` are considered equal if:

```java
Float.valueOf(f1).equals(Float.valueOf(f2))
```

(Unlike the `==` operator, this method considers
`NaN` equal to itself, and 0.0f unequal to -0.0f.)

Parameters:

- `a`: the first array to be tested for equality
- `aFromIndex`: the index (inclusive) of the first element in the first array to be tested
- `aToIndex`: the index (exclusive) of the last element in the first array to be tested
- `b`: the second array to be tested for equality
- `bFromIndex`: the index (inclusive) of the first element in the second array to be tested
- `bToIndex`: the index (exclusive) of the last element in the second array to be tested

**Returns:** `true` if the two arrays, over the specified ranges, are
        equal

**See also:** Float#equals(Object)

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is `null`

## Arrays.equals(Object[], Object[])

```java
public static boolean equals(Object[] a, Object[] a2)
```

Returns `true` if the two specified arrays of Objects are
*equal* to one another.  The two arrays are considered equal if
both arrays contain the same number of elements, and all corresponding
pairs of elements in the two arrays are equal.  Two objects `e1`
and `e2` are considered *equal* if
`Objects.equals(e1, e2)`.
In other words, the two arrays are equal if
they contain the same elements in the same order.  Also, two array
references are considered equal if both are `null`.

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

## Arrays.equals(Object[], int, int, Object[], int, int)

```java
public static boolean equals(Object[] a, int aFromIndex, int aToIndex, Object[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of Objects, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

Two objects `e1` and `e2` are considered *equal* if
`Objects.equals(e1, e2)`.

Parameters:

- `a`: the first array to be tested for equality
- `aFromIndex`: the index (inclusive) of the first element in the first array to be tested
- `aToIndex`: the index (exclusive) of the last element in the first array to be tested
- `b`: the second array to be tested for equality
- `bFromIndex`: the index (inclusive) of the first element in the second array to be tested
- `bToIndex`: the index (exclusive) of the last element in the second array to be tested

**Returns:** `true` if the two arrays, over the specified ranges, are
        equal

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is `null`

## Arrays.equals(T[], T[], Comparator<? super T>)

```java
public static <T> boolean equals(T[] a, T[] a2, Comparator<? super T> cmp)
```

Returns `true` if the two specified arrays of Objects are
*equal* to one another.

Two arrays are considered equal if both arrays contain the same number
of elements, and all corresponding pairs of elements in the two arrays
are equal.  In other words, the two arrays are equal if they contain the
same elements in the same order.  Also, two array references are
considered equal if both are `null`.

Two objects `e1` and `e2` are considered *equal* if,
given the specified comparator, `cmp.compare(e1, e2) == 0`.

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality
- `cmp`: the comparator to compare array elements
- `<T>`: the type of array elements

**Returns:** `true` if the two arrays are equal

**Since:** 9

Throws:

- `NullPointerException`: if the comparator is `null`

## Arrays.equals(T[], int, int, T[], int, int, Comparator<? super T>)

```java
public static <T> boolean equals(T[] a, int aFromIndex, int aToIndex, T[] b, int bFromIndex, int bToIndex, Comparator<? super T> cmp)
```

Returns true if the two specified arrays of Objects, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

Two objects `e1` and `e2` are considered *equal* if,
given the specified comparator, `cmp.compare(e1, e2) == 0`.

Parameters:

- `a`: the first array to be tested for equality
- `aFromIndex`: the index (inclusive) of the first element in the first array to be tested
- `aToIndex`: the index (exclusive) of the last element in the first array to be tested
- `b`: the second array to be tested for equality
- `bFromIndex`: the index (inclusive) of the first element in the second array to be tested
- `bToIndex`: the index (exclusive) of the last element in the second array to be tested
- `cmp`: the comparator to compare array elements
- `<T>`: the type of array elements

**Returns:** `true` if the two arrays, over the specified ranges, are
        equal

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array or the comparator is `null`

## Arrays.fill(long[], long)

```java
public static void fill(long[] a, long val)
```

Assigns the specified long value to each element of the specified array
of longs.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array

## Arrays.fill(long[], int, int, long)

```java
public static void fill(long[] a, int fromIndex, int toIndex, long val)
```

Assigns the specified long value to each element of the specified
range of the specified array of longs.  The range to be filled
extends from index `fromIndex`, inclusive, to index
`toIndex`, exclusive.  (If `fromIndex==toIndex`, the
range to be filled is empty.)

Parameters:

- `a`: the array to be filled
- `fromIndex`: the index of the first element (inclusive) to be filled with the specified value
- `toIndex`: the index of the last element (exclusive) to be filled with the specified value
- `val`: the value to be stored in all elements of the array

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.fill(int[], int)

```java
public static void fill(int[] a, int val)
```

Assigns the specified int value to each element of the specified array
of ints.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array

## Arrays.fill(int[], int, int, int)

```java
public static void fill(int[] a, int fromIndex, int toIndex, int val)
```

Assigns the specified int value to each element of the specified
range of the specified array of ints.  The range to be filled
extends from index `fromIndex`, inclusive, to index
`toIndex`, exclusive.  (If `fromIndex==toIndex`, the
range to be filled is empty.)

Parameters:

- `a`: the array to be filled
- `fromIndex`: the index of the first element (inclusive) to be filled with the specified value
- `toIndex`: the index of the last element (exclusive) to be filled with the specified value
- `val`: the value to be stored in all elements of the array

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.fill(short[], short)

```java
public static void fill(short[] a, short val)
```

Assigns the specified short value to each element of the specified array
of shorts.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array

## Arrays.fill(short[], int, int, short)

```java
public static void fill(short[] a, int fromIndex, int toIndex, short val)
```

Assigns the specified short value to each element of the specified
range of the specified array of shorts.  The range to be filled
extends from index `fromIndex`, inclusive, to index
`toIndex`, exclusive.  (If `fromIndex==toIndex`, the
range to be filled is empty.)

Parameters:

- `a`: the array to be filled
- `fromIndex`: the index of the first element (inclusive) to be filled with the specified value
- `toIndex`: the index of the last element (exclusive) to be filled with the specified value
- `val`: the value to be stored in all elements of the array

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.fill(char[], char)

```java
public static void fill(char[] a, char val)
```

Assigns the specified char value to each element of the specified array
of chars.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array

## Arrays.fill(char[], int, int, char)

```java
public static void fill(char[] a, int fromIndex, int toIndex, char val)
```

Assigns the specified char value to each element of the specified
range of the specified array of chars.  The range to be filled
extends from index `fromIndex`, inclusive, to index
`toIndex`, exclusive.  (If `fromIndex==toIndex`, the
range to be filled is empty.)

Parameters:

- `a`: the array to be filled
- `fromIndex`: the index of the first element (inclusive) to be filled with the specified value
- `toIndex`: the index of the last element (exclusive) to be filled with the specified value
- `val`: the value to be stored in all elements of the array

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.fill(byte[], byte)

```java
public static void fill(byte[] a, byte val)
```

Assigns the specified byte value to each element of the specified array
of bytes.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array

## Arrays.fill(byte[], int, int, byte)

```java
public static void fill(byte[] a, int fromIndex, int toIndex, byte val)
```

Assigns the specified byte value to each element of the specified
range of the specified array of bytes.  The range to be filled
extends from index `fromIndex`, inclusive, to index
`toIndex`, exclusive.  (If `fromIndex==toIndex`, the
range to be filled is empty.)

Parameters:

- `a`: the array to be filled
- `fromIndex`: the index of the first element (inclusive) to be filled with the specified value
- `toIndex`: the index of the last element (exclusive) to be filled with the specified value
- `val`: the value to be stored in all elements of the array

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.fill(boolean[], boolean)

```java
public static void fill(boolean[] a, boolean val)
```

Assigns the specified boolean value to each element of the specified
array of booleans.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array

## Arrays.fill(boolean[], int, int, boolean)

```java
public static void fill(boolean[] a, int fromIndex, int toIndex, boolean val)
```

Assigns the specified boolean value to each element of the specified
range of the specified array of booleans.  The range to be filled
extends from index `fromIndex`, inclusive, to index
`toIndex`, exclusive.  (If `fromIndex==toIndex`, the
range to be filled is empty.)

Parameters:

- `a`: the array to be filled
- `fromIndex`: the index of the first element (inclusive) to be filled with the specified value
- `toIndex`: the index of the last element (exclusive) to be filled with the specified value
- `val`: the value to be stored in all elements of the array

Throws:

- `IllegalArgumentException`: if `fromIndex > toIndex`
- `ArrayIndexOutOfBoundsException`: if `fromIndex < 0` or `toIndex > a.length`

## Arrays.fill(double[], double)

```java
public static void fill(double[] a, double val)
```

Assigns the specified double value to each element of the specified
array of doubles.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array
