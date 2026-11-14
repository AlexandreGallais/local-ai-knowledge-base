---
title: "Arrays class (java.util) (part 6 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 6 of 19)

## Arrays.equals(long[], int, int, long[], int, int)

```java
public static boolean equals(long[] a, int aFromIndex, int aToIndex, long[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of longs, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

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

## Arrays.equals(int[], int[])

```java
public static boolean equals(int[] a, int[] a2)
```

Returns `true` if the two specified arrays of ints are
*equal* to one another.  Two arrays are considered equal if both
arrays contain the same number of elements, and all corresponding pairs
of elements in the two arrays are equal.  In other words, two arrays
are equal if they contain the same elements in the same order.  Also,
two array references are considered equal if both are `null`.

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

## Arrays.equals(int[], int, int, int[], int, int)

```java
public static boolean equals(int[] a, int aFromIndex, int aToIndex, int[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of ints, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

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

## Arrays.equals(short[], short[])

```java
public static boolean equals(short[] a, short[] a2)
```

Returns `true` if the two specified arrays of shorts are
*equal* to one another.  Two arrays are considered equal if both
arrays contain the same number of elements, and all corresponding pairs
of elements in the two arrays are equal.  In other words, two arrays
are equal if they contain the same elements in the same order.  Also,
two array references are considered equal if both are `null`.

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

## Arrays.equals(short[], int, int, short[], int, int)

```java
public static boolean equals(short[] a, int aFromIndex, int aToIndex, short[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of shorts, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

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

## Arrays.equals(char[], char[])

```java
public static boolean equals(char[] a, char[] a2)
```

Returns `true` if the two specified arrays of chars are
*equal* to one another.  Two arrays are considered equal if both
arrays contain the same number of elements, and all corresponding pairs
of elements in the two arrays are equal.  In other words, two arrays
are equal if they contain the same elements in the same order.  Also,
two array references are considered equal if both are `null`.

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

## Arrays.equals(char[], int, int, char[], int, int)

```java
public static boolean equals(char[] a, int aFromIndex, int aToIndex, char[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of chars, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

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

## Arrays.equals(byte[], byte[])

```java
public static boolean equals(byte[] a, byte[] a2)
```

Returns `true` if the two specified arrays of bytes are
*equal* to one another.  Two arrays are considered equal if both
arrays contain the same number of elements, and all corresponding pairs
of elements in the two arrays are equal.  In other words, two arrays
are equal if they contain the same elements in the same order.  Also,
two array references are considered equal if both are `null`.

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

## Arrays.equals(byte[], int, int, byte[], int, int)

```java
public static boolean equals(byte[] a, int aFromIndex, int aToIndex, byte[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of bytes, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

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

## Arrays.equals(boolean[], boolean[])

```java
public static boolean equals(boolean[] a, boolean[] a2)
```

Returns `true` if the two specified arrays of booleans are
*equal* to one another.  Two arrays are considered equal if both
arrays contain the same number of elements, and all corresponding pairs
of elements in the two arrays are equal.  In other words, two arrays
are equal if they contain the same elements in the same order.  Also,
two array references are considered equal if both are `null`.

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

## Arrays.equals(boolean[], int, int, boolean[], int, int)

```java
public static boolean equals(boolean[] a, int aFromIndex, int aToIndex, boolean[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of booleans, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

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

## Arrays.equals(double[], double[])

```java
public static boolean equals(double[] a, double[] a2)
```

Returns `true` if the two specified arrays of doubles are
*equal* to one another.  Two arrays are considered equal if both
arrays contain the same number of elements, and all corresponding pairs
of elements in the two arrays are equal.  In other words, two arrays
are equal if they contain the same elements in the same order.  Also,
two array references are considered equal if both are `null`.

Two doubles `d1` and `d2` are considered equal if:

```java
Double.valueOf(d1).equals(Double.valueOf(d2))
```

(Unlike the `==` operator, this method considers
`NaN` equal to itself, and 0.0d unequal to -0.0d.)

Parameters:

- `a`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

**See also:** Double#equals(Object)

## Arrays.equals(double[], int, int, double[], int, int)

```java
public static boolean equals(double[] a, int aFromIndex, int aToIndex, double[] b, int bFromIndex, int bToIndex)
```

Returns true if the two specified arrays of doubles, over the specified
ranges, are *equal* to one another.

Two arrays are considered equal if the number of elements covered by
each range is the same, and all corresponding pairs of elements over the
specified ranges in the two arrays are equal.  In other words, two arrays
are equal if they contain, over the specified ranges, the same elements
in the same order.

Two doubles `d1` and `d2` are considered equal if:

```java
Double.valueOf(d1).equals(Double.valueOf(d2))
```

(Unlike the `==` operator, this method considers
`NaN` equal to itself, and 0.0d unequal to -0.0d.)

Parameters:

- `a`: the first array to be tested for equality
- `aFromIndex`: the index (inclusive) of the first element in the first array to be tested
- `aToIndex`: the index (exclusive) of the last element in the first array to be tested
- `b`: the second array to be tested for equality
- `bFromIndex`: the index (inclusive) of the first element in the second array to be tested
- `bToIndex`: the index (exclusive) of the last element in the second array to be tested

**Returns:** `true` if the two arrays, over the specified ranges, are
        equal

**See also:** Double#equals(Object)

**Since:** 9

Throws:

- `IllegalArgumentException`: if `aFromIndex > aToIndex` or if `bFromIndex > bToIndex`
- `ArrayIndexOutOfBoundsException`: if `aFromIndex < 0 or aToIndex > a.length` or if `bFromIndex < 0 or bToIndex > b.length`
- `NullPointerException`: if either array is `null`
