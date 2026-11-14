---
title: "Arrays class (java.util) (part 9 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 9 of 19)

## Arrays.copyOfRange(U[], int, int, Class<? extends T[]>)

```java
public static <T,U> T[] copyOfRange(U[] original, int from, int to, Class<? extends T[]> newType)
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
The resulting array is of the class `newType`.

Parameters:

- `<T>`: the class of the objects in the returned array
- ``: the class of the objects in the original array
- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)
- `newType`: the class of the copy to be returned

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with nulls to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null
- `ArrayStoreException`: if an element copied from `original` is not of a runtime type that can be stored in an array of class `newType`.

## Arrays.copyOfRange(byte[], int, int)

```java
public static byte[] copyOfRange(byte[] original, int from, int to)
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
`(byte)0` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

Parameters:

- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with zeros to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null

## Arrays.copyOfRange(short[], int, int)

```java
public static short[] copyOfRange(short[] original, int from, int to)
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
`(short)0` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

Parameters:

- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with zeros to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null

## Arrays.copyOfRange(int[], int, int)

```java
public static int[] copyOfRange(int[] original, int from, int to)
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
`0` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

Parameters:

- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with zeros to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null

## Arrays.copyOfRange(long[], int, int)

```java
public static long[] copyOfRange(long[] original, int from, int to)
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
`0L` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

Parameters:

- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with zeros to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null

## Arrays.copyOfRange(char[], int, int)

```java
public static char[] copyOfRange(char[] original, int from, int to)
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
`'\u005cu0000'` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

Parameters:

- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with null characters to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null

## Arrays.copyOfRange(float[], int, int)

```java
public static float[] copyOfRange(float[] original, int from, int to)
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
`0f` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

Parameters:

- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with zeros to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null

## Arrays.copyOfRange(double[], int, int)

```java
public static double[] copyOfRange(double[] original, int from, int to)
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
`0d` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

Parameters:

- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with zeros to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null

## Arrays.copyOfRange(boolean[], int, int)

```java
public static boolean[] copyOfRange(boolean[] original, int from, int to)
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
`false` is placed in all elements of the copy whose index is
greater than or equal to `original.length - from`.  The length
of the returned array will be `to - from`.

Parameters:

- `original`: the array from which a range is to be copied
- `from`: the initial index of the range to be copied, inclusive
- `to`: the final index of the range to be copied, exclusive. (This index may lie outside the array.)

**Returns:** a new array containing the specified range from the original array,
    truncated or padded with false elements to obtain the required length

**Since:** 1.6

Throws:

- `ArrayIndexOutOfBoundsException`: if `from < 0` or `from > original.length`
- `IllegalArgumentException`: if `from > to`
- `NullPointerException`: if `original` is null

## Arrays.asList(T...)

```java
public static <T> List<T> asList(T... a)
```

Returns a fixed-size list backed by the specified array. Changes made to
the array will be visible in the returned list, and changes made to the
list will be visible in the array. The returned list is
`Serializable` and implements `RandomAccess`.

The returned list implements the optional `Collection` methods, except
those that would change the size of the returned list. Those methods leave
the list unchanged and throw `UnsupportedOperationException`.

If the specified array's actual component type differs from the type
parameter T, this can result in operations on the returned list throwing an
`ArrayStoreException`.

Parameters:

- `<T>`: the class of the objects in the array
- `a`: the array by which the list will be backed

**API note:** This method acts as bridge between array-based and collection-based
APIs, in combination with `Collection.toArray`.

This method provides a way to wrap an existing array:

```java
    Integer[] numbers = ...
    ...
    List<Integer> values = Arrays.asList(numbers);
```

This method also provides a convenient way to create a fixed-size
list initialized to contain several elements:

```java
    List<String> stooges = Arrays.asList("Larry", "Moe", "Curly");
```

*The list returned by this method is modifiable.*
To create an unmodifiable list, use
Collections.unmodifiableList
or Unmodifiable Lists.

**Returns:** a list view of the specified array

Throws:

- `NullPointerException`: if the specified array is `null`
