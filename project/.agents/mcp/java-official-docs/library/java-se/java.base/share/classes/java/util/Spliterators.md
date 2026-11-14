---
title: "Spliterators class (java.util) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Spliterators.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Spliterators class (java.util)

```java
public final class Spliterators
```

Static classes and methods for operating on or creating instances of
`Spliterator` and its primitive specializations
`Spliterator.OfInt`, `Spliterator.OfLong`, and
`Spliterator.OfDouble`.

**See also:** Spliterator

**Since:** 1.8

## Spliterators.emptySpliterator()

```java
public static <T> Spliterator<T> emptySpliterator()
```

Creates an empty `Spliterator`

The empty spliterator reports `Spliterator.SIZED` and
`Spliterator.SUBSIZED`.  Calls to
`java.util.Spliterator.trySplit()` always return `null`.

Parameters:

- `<T>`: Type of elements

**Returns:** An empty spliterator

## Spliterators.emptyIntSpliterator()

```java
public static Spliterator.OfInt emptyIntSpliterator()
```

Creates an empty `Spliterator.OfInt`

The empty spliterator reports `Spliterator.SIZED` and
`Spliterator.SUBSIZED`.  Calls to
`java.util.Spliterator.trySplit()` always return `null`.

**Returns:** An empty spliterator

## Spliterators.emptyLongSpliterator()

```java
public static Spliterator.OfLong emptyLongSpliterator()
```

Creates an empty `Spliterator.OfLong`

The empty spliterator reports `Spliterator.SIZED` and
`Spliterator.SUBSIZED`.  Calls to
`java.util.Spliterator.trySplit()` always return `null`.

**Returns:** An empty spliterator

## Spliterators.emptyDoubleSpliterator()

```java
public static Spliterator.OfDouble emptyDoubleSpliterator()
```

Creates an empty `Spliterator.OfDouble`

The empty spliterator reports `Spliterator.SIZED` and
`Spliterator.SUBSIZED`.  Calls to
`java.util.Spliterator.trySplit()` always return `null`.

**Returns:** An empty spliterator

## Spliterators.spliterator(Object[], int)

```java
public static <T> Spliterator<T> spliterator(Object[] array, int additionalCharacteristics)
```

Creates a `Spliterator` covering the elements of a given array,
using a customized set of spliterator characteristics.

This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
`Arrays.spliterator(Object[])`.

The returned spliterator always reports the characteristics
`SIZED` and `SUBSIZED`.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify `IMMUTABLE` and `ORDERED`.

Parameters:

- `<T>`: Type of elements
- `array`: The array, assumed to be unmodified during use
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

**Returns:** A spliterator for an array

**See also:** Arrays#spliterator(Object[])

Throws:

- `NullPointerException`: if the given array is `null`

## Spliterators.spliterator(Object[], int, int, int)

```java
public static <T> Spliterator<T> spliterator(Object[] array, int fromIndex, int toIndex, int additionalCharacteristics)
```

Creates a `Spliterator` covering a range of elements of a given
array, using a customized set of spliterator characteristics.

This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
`Arrays.spliterator(Object[])`.

The returned spliterator always reports the characteristics
`SIZED` and `SUBSIZED`.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify `IMMUTABLE` and `ORDERED`.

Parameters:

- `<T>`: Type of elements
- `array`: The array, assumed to be unmodified during use
- `fromIndex`: The least index (inclusive) to cover
- `toIndex`: One past the greatest index to cover
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

**Returns:** A spliterator for an array

**See also:** Arrays#spliterator(Object[], int, int)

Throws:

- `NullPointerException`: if the given array is `null`
- `ArrayIndexOutOfBoundsException`: if `fromIndex` is negative, `toIndex` is less than `fromIndex`, or `toIndex` is greater than the array size

## Spliterators.spliterator(int[], int)

```java
public static Spliterator.OfInt spliterator(int[] array, int additionalCharacteristics)
```

Creates a `Spliterator.OfInt` covering the elements of a given array,
using a customized set of spliterator characteristics.

This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
`Arrays.spliterator(int[])`.

The returned spliterator always reports the characteristics
`SIZED` and `SUBSIZED`.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify `IMMUTABLE` and `ORDERED`.

Parameters:

- `array`: The array, assumed to be unmodified during use
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

**Returns:** A spliterator for an array

**See also:** Arrays#spliterator(int[])

Throws:

- `NullPointerException`: if the given array is `null`

## Spliterators.spliterator(int[], int, int, int)

```java
public static Spliterator.OfInt spliterator(int[] array, int fromIndex, int toIndex, int additionalCharacteristics)
```

Creates a `Spliterator.OfInt` covering a range of elements of a
given array, using a customized set of spliterator characteristics.

This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
int, int).

The returned spliterator always reports the characteristics
`SIZED` and `SUBSIZED`.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify `IMMUTABLE` and `ORDERED`.

Parameters:

- `array`: The array, assumed to be unmodified during use
- `fromIndex`: The least index (inclusive) to cover
- `toIndex`: One past the greatest index to cover
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

**Returns:** A spliterator for an array

**See also:** Arrays#spliterator(int[], int, int)

Throws:

- `NullPointerException`: if the given array is `null`
- `ArrayIndexOutOfBoundsException`: if `fromIndex` is negative, `toIndex` is less than `fromIndex`, or `toIndex` is greater than the array size

## Spliterators.spliterator(long[], int)

```java
public static Spliterator.OfLong spliterator(long[] array, int additionalCharacteristics)
```

Creates a `Spliterator.OfLong` covering the elements of a given array,
using a customized set of spliterator characteristics.

This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
`Arrays.spliterator(long[])`.

The returned spliterator always reports the characteristics
`SIZED` and `SUBSIZED`.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify `IMMUTABLE` and `ORDERED`.

Parameters:

- `array`: The array, assumed to be unmodified during use
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

**Returns:** A spliterator for an array

**See also:** Arrays#spliterator(long[])

Throws:

- `NullPointerException`: if the given array is `null`

## Spliterators.spliterator(long[], int, int, int)

```java
public static Spliterator.OfLong spliterator(long[] array, int fromIndex, int toIndex, int additionalCharacteristics)
```

Creates a `Spliterator.OfLong` covering a range of elements of a
given array, using a customized set of spliterator characteristics.

This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
int, int).

The returned spliterator always reports the characteristics
`SIZED` and `SUBSIZED`.  The caller may provide additional
characteristics for the spliterator to report.  (For example, if it is
known the array will not be further modified, specify `IMMUTABLE`;
if the array data is considered to have an encounter order, specify
`ORDERED`).  The method int, int) can
often be used instead, which returns a spliterator that reports
`SIZED`, `SUBSIZED`, `IMMUTABLE`, and `ORDERED`.

Parameters:

- `array`: The array, assumed to be unmodified during use
- `fromIndex`: The least index (inclusive) to cover
- `toIndex`: One past the greatest index to cover
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

**Returns:** A spliterator for an array

**See also:** Arrays#spliterator(long[], int, int)

Throws:

- `NullPointerException`: if the given array is `null`
- `ArrayIndexOutOfBoundsException`: if `fromIndex` is negative, `toIndex` is less than `fromIndex`, or `toIndex` is greater than the array size

## Spliterators.spliterator(double[], int)

```java
public static Spliterator.OfDouble spliterator(double[] array, int additionalCharacteristics)
```

Creates a `Spliterator.OfDouble` covering the elements of a given array,
using a customized set of spliterator characteristics.

This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
`Arrays.spliterator(double[])`.

The returned spliterator always reports the characteristics
`SIZED` and `SUBSIZED`.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify `IMMUTABLE` and `ORDERED`.

Parameters:

- `array`: The array, assumed to be unmodified during use
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

**Returns:** A spliterator for an array

**See also:** Arrays#spliterator(double[])

Throws:

- `NullPointerException`: if the given array is `null`

## Spliterators.spliterator(double[], int, int, int)

```java
public static Spliterator.OfDouble spliterator(double[] array, int fromIndex, int toIndex, int additionalCharacteristics)
```

Creates a `Spliterator.OfDouble` covering a range of elements of a
given array, using a customized set of spliterator characteristics.

This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
int, int).

The returned spliterator always reports the characteristics
`SIZED` and `SUBSIZED`.  The caller may provide additional
characteristics for the spliterator to report.  (For example, if it is
known the array will not be further modified, specify `IMMUTABLE`;
if the array data is considered to have an encounter order, specify
`ORDERED`).  The method int, int) can
often be used instead, which returns a spliterator that reports
`SIZED`, `SUBSIZED`, `IMMUTABLE`, and `ORDERED`.

Parameters:

- `array`: The array, assumed to be unmodified during use
- `fromIndex`: The least index (inclusive) to cover
- `toIndex`: One past the greatest index to cover
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

**Returns:** A spliterator for an array

**See also:** Arrays#spliterator(double[], int, int)

Throws:

- `NullPointerException`: if the given array is `null`
- `ArrayIndexOutOfBoundsException`: if `fromIndex` is negative, `toIndex` is less than `fromIndex`, or `toIndex` is greater than the array size

## Spliterators.spliterator(Collection<? extends T>, int)

```java
public static <T> Spliterator<T> spliterator(Collection<? extends T> c, int characteristics)
```

Creates a `Spliterator` using the given collection's
iterator as the source of elements, and
reporting its size as its initial size.

The spliterator is
*late-binding*, inherits
the *fail-fast* properties of the collection's iterator, and
implements `trySplit` to permit limited parallelism.

Parameters:

- `<T>`: Type of elements
- `c`: The collection
- `characteristics`: Characteristics of this spliterator's source or elements. The characteristics `SIZED` and `SUBSIZED` are additionally reported unless `CONCURRENT` is supplied.

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given collection is `null`

## Spliterators.spliterator(Iterator<? extends T>, long, int)

```java
public static <T> Spliterator<T> spliterator(Iterator<? extends T> iterator, long size, int characteristics)
```

Creates a `Spliterator` using a given `Iterator`
as the source of elements, and with a given initially reported size.

The spliterator is not
*late-binding*, inherits
the *fail-fast* properties of the iterator, and implements
`trySplit` to permit limited parallelism.

Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned, or the initially reported
size is not equal to the actual number of elements in the source.

Parameters:

- `<T>`: Type of elements
- `iterator`: The iterator for the source
- `size`: The number of elements in the source, to be reported as initial `estimateSize`
- `characteristics`: Characteristics of this spliterator's source or elements. The characteristics `SIZED` and `SUBSIZED` are additionally reported unless `CONCURRENT` is supplied.

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given iterator is `null`
