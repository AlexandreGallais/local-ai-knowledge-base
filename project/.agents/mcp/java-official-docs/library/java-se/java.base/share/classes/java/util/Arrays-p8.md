---
title: "Arrays class (java.util) (part 8 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 8 of 19)

## Arrays.fill(double[], int, int, double)

```java
public static void fill(double[] a, int fromIndex, int toIndex,double val)
```

Assigns the specified double value to each element of the specified
range of the specified array of doubles.  The range to be filled
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

## Arrays.fill(float[], float)

```java
public static void fill(float[] a, float val)
```

Assigns the specified float value to each element of the specified array
of floats.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array

## Arrays.fill(float[], int, int, float)

```java
public static void fill(float[] a, int fromIndex, int toIndex, float val)
```

Assigns the specified float value to each element of the specified
range of the specified array of floats.  The range to be filled
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

## Arrays.fill(Object[], Object)

```java
public static void fill(Object[] a, Object val)
```

Assigns the specified Object reference to each element of the specified
array of Objects.

Parameters:

- `a`: the array to be filled
- `val`: the value to be stored in all elements of the array

Throws:

- `ArrayStoreException`: if the specified value is not of a runtime type that can be stored in the specified array

## Arrays.fill(Object[], int, int, Object)

```java
public static void fill(Object[] a, int fromIndex, int toIndex, Object val)
```

Assigns the specified Object reference to each element of the specified
range of the specified array of Objects.  The range to be filled
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
- `ArrayStoreException`: if the specified value is not of a runtime type that can be stored in the specified array

## Arrays.copyOf(T[], int)

```java
public static <T> T[] copyOf(T[] original, int newLength)
```

Copies the specified array, truncating or padding with nulls (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `null`.
Such indices will exist if and only if the specified length
is greater than that of the original array.
The resulting array is of exactly the same class as the original array.

Parameters:

- `<T>`: the class of the objects in the array
- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with nulls
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOf(U[], int, Class<? extends T[]>)

```java
public static <T,U> T[] copyOf(U[] original, int newLength, Class<? extends T[]> newType)
```

Copies the specified array, truncating or padding with nulls (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `null`.
Such indices will exist if and only if the specified length
is greater than that of the original array.
The resulting array is of the class `newType`.

Parameters:

- `<T>`: the class of the objects in the returned array
- ``: the class of the objects in the original array
- `original`: the array to be copied
- `newLength`: the length of the copy to be returned
- `newType`: the class of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with nulls
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null
- `ArrayStoreException`: if an element copied from `original` is not of a runtime type that can be stored in an array of class `newType`

## Arrays.copyOf(byte[], int)

```java
public static byte[] copyOf(byte[] original, int newLength)
```

Copies the specified array, truncating or padding with zeros (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `(byte)0`.
Such indices will exist if and only if the specified length
is greater than that of the original array.

Parameters:

- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with zeros
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOf(short[], int)

```java
public static short[] copyOf(short[] original, int newLength)
```

Copies the specified array, truncating or padding with zeros (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `(short)0`.
Such indices will exist if and only if the specified length
is greater than that of the original array.

Parameters:

- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with zeros
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOf(int[], int)

```java
public static int[] copyOf(int[] original, int newLength)
```

Copies the specified array, truncating or padding with zeros (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `0`.
Such indices will exist if and only if the specified length
is greater than that of the original array.

Parameters:

- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with zeros
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOf(long[], int)

```java
public static long[] copyOf(long[] original, int newLength)
```

Copies the specified array, truncating or padding with zeros (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `0L`.
Such indices will exist if and only if the specified length
is greater than that of the original array.

Parameters:

- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with zeros
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOf(char[], int)

```java
public static char[] copyOf(char[] original, int newLength)
```

Copies the specified array, truncating or padding with null characters (if necessary)
so the copy has the specified length.  For all indices that are valid
in both the original array and the copy, the two arrays will contain
identical values.  For any indices that are valid in the copy but not
the original, the copy will contain `'\u005cu0000'`.  Such indices
will exist if and only if the specified length is greater than that of
the original array.

Parameters:

- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with null characters
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOf(float[], int)

```java
public static float[] copyOf(float[] original, int newLength)
```

Copies the specified array, truncating or padding with zeros (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `0f`.
Such indices will exist if and only if the specified length
is greater than that of the original array.

Parameters:

- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with zeros
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOf(double[], int)

```java
public static double[] copyOf(double[] original, int newLength)
```

Copies the specified array, truncating or padding with zeros (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `0d`.
Such indices will exist if and only if the specified length
is greater than that of the original array.

Parameters:

- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with zeros
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOf(boolean[], int)

```java
public static boolean[] copyOf(boolean[] original, int newLength)
```

Copies the specified array, truncating or padding with `false` (if necessary)
so the copy has the specified length.  For all indices that are
valid in both the original array and the copy, the two arrays will
contain identical values.  For any indices that are valid in the
copy but not the original, the copy will contain `false`.
Such indices will exist if and only if the specified length
is greater than that of the original array.

Parameters:

- `original`: the array to be copied
- `newLength`: the length of the copy to be returned

**Returns:** a copy of the original array, truncated or padded with false elements
    to obtain the specified length

**Since:** 1.6

Throws:

- `NegativeArraySizeException`: if `newLength` is negative
- `NullPointerException`: if `original` is null

## Arrays.copyOfRange(T[], int, int)

```java
public static <T> T[] copyOfRange(T[] original, int from, int to)
```

Copies the specified range of the specified array into a new array.
The initial index of the range (`from`) must lie between zero
and `original.length`, inclusive.  The value at
`original[from]` is placed into the initial element of the copy
(unless `from == original.length` or `from == to`).
Values from subsequent elements in the original array are placed into
subsequent elements in the copy.  The final index of the range
(`to`), which must be greater than or equal to `from`,
may be greater than `original.length`, in which case
`null` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

The resulting array is of exactly the same class as the original array.

Parameters:

- `<T>`: the class of the objects in the array
- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with nulls to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null
