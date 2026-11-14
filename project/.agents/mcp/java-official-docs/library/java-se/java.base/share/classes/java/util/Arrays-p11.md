---
title: "Arrays class (java.util) (part 11 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 11 of 19)

## Arrays.deepToString(Object[])

```java
public static String deepToString(Object[] a)
```

Returns a string representation of the "deep contents" of the specified
array.  If the array contains other arrays as elements, the string
representation contains their contents and so on.  This method is
designed for converting multidimensional arrays to strings.

The string representation consists of a list of the array's
elements, enclosed in square brackets (`"[]"`).  Adjacent
elements are separated by the characters `", "` (a comma
followed by a space).  Elements are converted to strings as by
`String.valueOf(Object)`, unless they are themselves
arrays.

If an element `e` is an array of a primitive type, it is
converted to a string as by invoking the appropriate overloading of
`Arrays.toString(e)`.  If an element `e` is an array of a
reference type, it is converted to a string as by invoking
this method recursively.

To avoid infinite recursion, if the specified array contains itself
as an element, or contains an indirect reference to itself through one
or more levels of arrays, the self-reference is converted to the string
`"[...]"`.  For example, an array containing only a reference
to itself would be rendered as `"[[...]]"`.

This method returns `"null"` if the specified array
is `null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**See also:** #toString(Object[])

**Since:** 1.5

## Arrays.setAll(T[], IntFunction<? extends T>)

```java
public static <T> void setAll(T[] array, IntFunction<? extends T> generator)
```

Set all elements of the specified array, using the provided
generator function to compute each element.

If the generator function throws an exception, it is relayed to
the caller and the array is left in an indeterminate state.

Parameters:

- `<T>`: type of elements of the array
- `array`: array to be initialized
- `generator`: a function accepting an index and producing the desired value for that position

**API note:** Setting a subrange of an array, using a generator function to compute
each element, can be written as follows:

```java
IntStream.range(startInclusive, endExclusive)
         .forEach(i -> array[i] = generator.apply(i));
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the generator is null

## Arrays.parallelSetAll(T[], IntFunction<? extends T>)

```java
public static <T> void parallelSetAll(T[] array, IntFunction<? extends T> generator)
```

Set all elements of the specified array, in parallel, using the
provided generator function to compute each element.

If the generator function throws an exception, an unchecked exception
is thrown from `parallelSetAll` and the array is left in an
indeterminate state.

Parameters:

- `<T>`: type of elements of the array
- `array`: array to be initialized
- `generator`: a function accepting an index and producing the desired value for that position

**API note:** Setting a subrange of an array, in parallel, using a generator function
to compute each element, can be written as follows:

```java
IntStream.range(startInclusive, endExclusive)
         .parallel()
         .forEach(i -> array[i] = generator.apply(i));
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the generator is null

## Arrays.setAll(int[], IntUnaryOperator)

```java
public static void setAll(int[] array, IntUnaryOperator generator)
```

Set all elements of the specified array, using the provided
generator function to compute each element.

If the generator function throws an exception, it is relayed to
the caller and the array is left in an indeterminate state.

Parameters:

- `array`: array to be initialized
- `generator`: a function accepting an index and producing the desired value for that position

**API note:** Setting a subrange of an array, using a generator function to compute
each element, can be written as follows:

```java
IntStream.range(startInclusive, endExclusive)
         .forEach(i -> array[i] = generator.applyAsInt(i));
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the generator is null

## Arrays.parallelSetAll(int[], IntUnaryOperator)

```java
public static void parallelSetAll(int[] array, IntUnaryOperator generator)
```

Set all elements of the specified array, in parallel, using the
provided generator function to compute each element.

If the generator function throws an exception, an unchecked exception
is thrown from `parallelSetAll` and the array is left in an
indeterminate state.

Parameters:

- `array`: array to be initialized
- `generator`: a function accepting an index and producing the desired value for that position

**API note:** Setting a subrange of an array, in parallel, using a generator function
to compute each element, can be written as follows:

```java
IntStream.range(startInclusive, endExclusive)
         .parallel()
         .forEach(i -> array[i] = generator.applyAsInt(i));
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the generator is null

## Arrays.setAll(long[], IntToLongFunction)

```java
public static void setAll(long[] array, IntToLongFunction generator)
```

Set all elements of the specified array, using the provided
generator function to compute each element.

If the generator function throws an exception, it is relayed to
the caller and the array is left in an indeterminate state.

Parameters:

- `array`: array to be initialized
- `generator`: a function accepting an index and producing the desired value for that position

**API note:** Setting a subrange of an array, using a generator function to compute
each element, can be written as follows:

```java
IntStream.range(startInclusive, endExclusive)
         .forEach(i -> array[i] = generator.applyAsLong(i));
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the generator is null

## Arrays.parallelSetAll(long[], IntToLongFunction)

```java
public static void parallelSetAll(long[] array, IntToLongFunction generator)
```

Set all elements of the specified array, in parallel, using the
provided generator function to compute each element.

If the generator function throws an exception, an unchecked exception
is thrown from `parallelSetAll` and the array is left in an
indeterminate state.

Parameters:

- `array`: array to be initialized
- `generator`: a function accepting an index and producing the desired value for that position

**API note:** Setting a subrange of an array, in parallel, using a generator function
to compute each element, can be written as follows:

```java
IntStream.range(startInclusive, endExclusive)
         .parallel()
         .forEach(i -> array[i] = generator.applyAsLong(i));
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the generator is null

## Arrays.setAll(double[], IntToDoubleFunction)

```java
public static void setAll(double[] array, IntToDoubleFunction generator)
```

Set all elements of the specified array, using the provided
generator function to compute each element.

If the generator function throws an exception, it is relayed to
the caller and the array is left in an indeterminate state.

Parameters:

- `array`: array to be initialized
- `generator`: a function accepting an index and producing the desired value for that position

**API note:** Setting a subrange of an array, using a generator function to compute
each element, can be written as follows:

```java
IntStream.range(startInclusive, endExclusive)
         .forEach(i -> array[i] = generator.applyAsDouble(i));
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the generator is null

## Arrays.parallelSetAll(double[], IntToDoubleFunction)

```java
public static void parallelSetAll(double[] array, IntToDoubleFunction generator)
```

Set all elements of the specified array, in parallel, using the
provided generator function to compute each element.

If the generator function throws an exception, an unchecked exception
is thrown from `parallelSetAll` and the array is left in an
indeterminate state.

Parameters:

- `array`: array to be initialized
- `generator`: a function accepting an index and producing the desired value for that position

**API note:** Setting a subrange of an array, in parallel, using a generator function
to compute each element, can be written as follows:

```java
IntStream.range(startInclusive, endExclusive)
         .parallel()
         .forEach(i -> array[i] = generator.applyAsDouble(i));
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the generator is null

## Arrays.spliterator(T[])

```java
public static <T> Spliterator<T> spliterator(T[] array)
```

Returns a `Spliterator` covering all of the specified array.

The spliterator reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.IMMUTABLE`.

Parameters:

- `<T>`: type of elements
- `array`: the array, assumed to be unmodified during use

**Returns:** a spliterator for the array elements

**Since:** 1.8

## Arrays.spliterator(T[], int, int)

```java
public static <T> Spliterator<T> spliterator(T[] array, int startInclusive, int endExclusive)
```

Returns a `Spliterator` covering the specified range of the
specified array.

The spliterator reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.IMMUTABLE`.

Parameters:

- `<T>`: type of elements
- `array`: the array, assumed to be unmodified during use
- `startInclusive`: the first index to cover, inclusive
- `endExclusive`: index immediately past the last index to cover

**Returns:** a spliterator for the array elements

**Since:** 1.8

Throws:

- `ArrayIndexOutOfBoundsException`: if `startInclusive` is negative, `endExclusive` is less than `startInclusive`, or `endExclusive` is greater than the array size

## Arrays.spliterator(int[])

```java
public static Spliterator.OfInt spliterator(int[] array)
```

Returns a `Spliterator.OfInt` covering all of the specified array.

The spliterator reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.IMMUTABLE`.

Parameters:

- `array`: the array, assumed to be unmodified during use

**Returns:** a spliterator for the array elements

**Since:** 1.8

## Arrays.spliterator(int[], int, int)

```java
public static Spliterator.OfInt spliterator(int[] array, int startInclusive, int endExclusive)
```

Returns a `Spliterator.OfInt` covering the specified range of the
specified array.

The spliterator reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.IMMUTABLE`.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `startInclusive`: the first index to cover, inclusive
- `endExclusive`: index immediately past the last index to cover

**Returns:** a spliterator for the array elements

**Since:** 1.8

Throws:

- `ArrayIndexOutOfBoundsException`: if `startInclusive` is negative, `endExclusive` is less than `startInclusive`, or `endExclusive` is greater than the array size

## Arrays.spliterator(long[])

```java
public static Spliterator.OfLong spliterator(long[] array)
```

Returns a `Spliterator.OfLong` covering all of the specified array.

The spliterator reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.IMMUTABLE`.

Parameters:

- `array`: the array, assumed to be unmodified during use

**Returns:** the spliterator for the array elements

**Since:** 1.8

## Arrays.spliterator(long[], int, int)

```java
public static Spliterator.OfLong spliterator(long[] array, int startInclusive, int endExclusive)
```

Returns a `Spliterator.OfLong` covering the specified range of the
specified array.

The spliterator reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.IMMUTABLE`.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `startInclusive`: the first index to cover, inclusive
- `endExclusive`: index immediately past the last index to cover

**Returns:** a spliterator for the array elements

**Since:** 1.8

Throws:

- `ArrayIndexOutOfBoundsException`: if `startInclusive` is negative, `endExclusive` is less than `startInclusive`, or `endExclusive` is greater than the array size

## Arrays.spliterator(double[])

```java
public static Spliterator.OfDouble spliterator(double[] array)
```

Returns a `Spliterator.OfDouble` covering all of the specified
array.

The spliterator reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.IMMUTABLE`.

Parameters:

- `array`: the array, assumed to be unmodified during use

**Returns:** a spliterator for the array elements

**Since:** 1.8

## Arrays.spliterator(double[], int, int)

```java
public static Spliterator.OfDouble spliterator(double[] array, int startInclusive, int endExclusive)
```

Returns a `Spliterator.OfDouble` covering the specified range of
the specified array.

The spliterator reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, `Spliterator.ORDERED`, and
`Spliterator.IMMUTABLE`.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `startInclusive`: the first index to cover, inclusive
- `endExclusive`: index immediately past the last index to cover

**Returns:** a spliterator for the array elements

**Since:** 1.8

Throws:

- `ArrayIndexOutOfBoundsException`: if `startInclusive` is negative, `endExclusive` is less than `startInclusive`, or `endExclusive` is greater than the array size

## Arrays.stream(T[])

```java
public static <T> Stream<T> stream(T[] array)
```

Returns a sequential `Stream` with the specified array as its
source.

Parameters:

- `<T>`: The type of the array elements
- `array`: The array, assumed to be unmodified during use

**Returns:** a `Stream` for the array

**Since:** 1.8

## Arrays.stream(T[], int, int)

```java
public static <T> Stream<T> stream(T[] array, int startInclusive, int endExclusive)
```

Returns a sequential `Stream` with the specified range of the
specified array as its source.

Parameters:

- `<T>`: the type of the array elements
- `array`: the array, assumed to be unmodified during use
- `startInclusive`: the first index to cover, inclusive
- `endExclusive`: index immediately past the last index to cover

**Returns:** a `Stream` for the array range

**Since:** 1.8

Throws:

- `ArrayIndexOutOfBoundsException`: if `startInclusive` is negative, `endExclusive` is less than `startInclusive`, or `endExclusive` is greater than the array size

## Arrays.stream(int[])

```java
public static IntStream stream(int[] array)
```

Returns a sequential `IntStream` with the specified array as its
source.

Parameters:

- `array`: the array, assumed to be unmodified during use

**Returns:** an `IntStream` for the array

**Since:** 1.8
