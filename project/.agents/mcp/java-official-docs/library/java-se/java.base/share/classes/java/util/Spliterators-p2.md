---
title: "Spliterators class (java.util) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Spliterators.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Spliterators class (java.util) (part 2 of 3)

## Spliterators.spliteratorUnknownSize(Iterator<? extends T>, int)

```java
public static <T> Spliterator<T> spliteratorUnknownSize(Iterator<? extends T> iterator, int characteristics)
```

Creates a `Spliterator` using a given `Iterator`
as the source of elements, with no initial size estimate.

The spliterator is not
*late-binding*, inherits
the *fail-fast* properties of the iterator, and implements
`trySplit` to permit limited parallelism.

Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned.

Parameters:

- `<T>`: Type of elements
- `iterator`: The iterator for the source
- `characteristics`: Characteristics of this spliterator's source or elements (`SIZED` and `SUBSIZED`, if supplied, are ignored and are not reported.)

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given iterator is `null`

## Spliterators.spliterator(PrimitiveIterator.OfInt, long, int)

```java
public static Spliterator.OfInt spliterator(PrimitiveIterator.OfInt iterator, long size, int characteristics)
```

Creates a `Spliterator.OfInt` using a given
`IntStream.IntIterator` as the source of elements, and with a given
initially reported size.

The spliterator is not
*late-binding*, inherits
the *fail-fast* properties of the iterator, and implements
`trySplit` to permit limited parallelism.

Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned, or the initially reported
size is not equal to the actual number of elements in the source.

Parameters:

- `iterator`: The iterator for the source
- `size`: The number of elements in the source, to be reported as initial `estimateSize`.
- `characteristics`: Characteristics of this spliterator's source or elements. The characteristics `SIZED` and `SUBSIZED` are additionally reported unless `CONCURRENT` is supplied.

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given iterator is `null`

## Spliterators.spliteratorUnknownSize(PrimitiveIterator.OfInt, int)

```java
public static Spliterator.OfInt spliteratorUnknownSize(PrimitiveIterator.OfInt iterator, int characteristics)
```

Creates a `Spliterator.OfInt` using a given
`IntStream.IntIterator` as the source of elements, with no initial
size estimate.

The spliterator is not
*late-binding*, inherits
the *fail-fast* properties of the iterator, and implements
`trySplit` to permit limited parallelism.

Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned.

Parameters:

- `iterator`: The iterator for the source
- `characteristics`: Characteristics of this spliterator's source or elements (`SIZED` and `SUBSIZED`, if supplied, are ignored and are not reported.)

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given iterator is `null`

## Spliterators.spliterator(PrimitiveIterator.OfLong, long, int)

```java
public static Spliterator.OfLong spliterator(PrimitiveIterator.OfLong iterator, long size, int characteristics)
```

Creates a `Spliterator.OfLong` using a given
`LongStream.LongIterator` as the source of elements, and with a
given initially reported size.

The spliterator is not
*late-binding*, inherits
the *fail-fast* properties of the iterator, and implements
`trySplit` to permit limited parallelism.

Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned, or the initially reported
size is not equal to the actual number of elements in the source.

Parameters:

- `iterator`: The iterator for the source
- `size`: The number of elements in the source, to be reported as initial `estimateSize`.
- `characteristics`: Characteristics of this spliterator's source or elements. The characteristics `SIZED` and `SUBSIZED` are additionally reported unless `CONCURRENT` is supplied.

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given iterator is `null`

## Spliterators.spliteratorUnknownSize(PrimitiveIterator.OfLong, int)

```java
public static Spliterator.OfLong spliteratorUnknownSize(PrimitiveIterator.OfLong iterator, int characteristics)
```

Creates a `Spliterator.OfLong` using a given
`LongStream.LongIterator` as the source of elements, with no
initial size estimate.

The spliterator is not
*late-binding*, inherits
the *fail-fast* properties of the iterator, and implements
`trySplit` to permit limited parallelism.

Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned.

Parameters:

- `iterator`: The iterator for the source
- `characteristics`: Characteristics of this spliterator's source or elements (`SIZED` and `SUBSIZED`, if supplied, are ignored and are not reported.)

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given iterator is `null`

## Spliterators.spliterator(PrimitiveIterator.OfDouble, long, int)

```java
public static Spliterator.OfDouble spliterator(PrimitiveIterator.OfDouble iterator, long size, int characteristics)
```

Creates a `Spliterator.OfDouble` using a given
`DoubleStream.DoubleIterator` as the source of elements, and with a
given initially reported size.

The spliterator is not
*late-binding*, inherits
the *fail-fast* properties of the iterator, and implements
`trySplit` to permit limited parallelism.

Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned, or the initially reported
size is not equal to the actual number of elements in the source.

Parameters:

- `iterator`: The iterator for the source
- `size`: The number of elements in the source, to be reported as initial `estimateSize`
- `characteristics`: Characteristics of this spliterator's source or elements. The characteristics `SIZED` and `SUBSIZED` are additionally reported unless `CONCURRENT` is supplied.

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given iterator is `null`

## Spliterators.spliteratorUnknownSize(PrimitiveIterator.OfDouble, int)

```java
public static Spliterator.OfDouble spliteratorUnknownSize(PrimitiveIterator.OfDouble iterator, int characteristics)
```

Creates a `Spliterator.OfDouble` using a given
`DoubleStream.DoubleIterator` as the source of elements, with no
initial size estimate.

The spliterator is not
*late-binding*, inherits
the *fail-fast* properties of the iterator, and implements
`trySplit` to permit limited parallelism.

Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned.

Parameters:

- `iterator`: The iterator for the source
- `characteristics`: Characteristics of this spliterator's source or elements (`SIZED` and `SUBSIZED`, if supplied, are ignored and are not reported.)

**Returns:** A spliterator from an iterator

Throws:

- `NullPointerException`: if the given iterator is `null`

## Spliterators.iterator(Spliterator<? extends T>)

```java
public static<T> Iterator<T> iterator(Spliterator<? extends T> spliterator)
```

Creates an `Iterator` from a `Spliterator`.

Traversal of elements should be accomplished through the iterator.
The behaviour of traversal is undefined if the spliterator is operated
after the iterator is returned.

Parameters:

- `<T>`: Type of elements
- `spliterator`: The spliterator

**Returns:** An iterator

Throws:

- `NullPointerException`: if the given spliterator is `null`

## Spliterators.iterator(Spliterator.OfInt)

```java
public static PrimitiveIterator.OfInt iterator(Spliterator.OfInt spliterator)
```

Creates an `PrimitiveIterator.OfInt` from a
`Spliterator.OfInt`.

Traversal of elements should be accomplished through the iterator.
The behaviour of traversal is undefined if the spliterator is operated
after the iterator is returned.

Parameters:

- `spliterator`: The spliterator

**Returns:** An iterator

Throws:

- `NullPointerException`: if the given spliterator is `null`

## Spliterators.iterator(Spliterator.OfLong)

```java
public static PrimitiveIterator.OfLong iterator(Spliterator.OfLong spliterator)
```

Creates an `PrimitiveIterator.OfLong` from a
`Spliterator.OfLong`.

Traversal of elements should be accomplished through the iterator.
The behaviour of traversal is undefined if the spliterator is operated
after the iterator is returned.

Parameters:

- `spliterator`: The spliterator

**Returns:** An iterator

Throws:

- `NullPointerException`: if the given spliterator is `null`

## Spliterators.iterator(Spliterator.OfDouble)

```java
public static PrimitiveIterator.OfDouble iterator(Spliterator.OfDouble spliterator)
```

Creates an `PrimitiveIterator.OfDouble` from a
`Spliterator.OfDouble`.

Traversal of elements should be accomplished through the iterator.
The behaviour of traversal is undefined if the spliterator is operated
after the iterator is returned.

Parameters:

- `spliterator`: The spliterator

**Returns:** An iterator

Throws:

- `NullPointerException`: if the given spliterator is `null`

## Spliterators.ArraySpliterator(Object[], int)

```java
public ArraySpliterator(Object[] array, int additionalCharacteristics)
```

Creates a spliterator covering all of the given array.
Its size is known exactly and it is SIZED and SUBSIZED.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

## Spliterators.ArraySpliterator(Object[], int, int, int)

```java
public ArraySpliterator(Object[] array, int origin, int fence, int additionalCharacteristics)
```

Creates a spliterator covering the given array and range.
Its size is known exactly and it is SIZED and SUBSIZED.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `origin`: the least index (inclusive) to cover
- `fence`: one past the greatest index to cover
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

## Spliterators.IntArraySpliterator(int[], int)

```java
public IntArraySpliterator(int[] array, int additionalCharacteristics)
```

Creates a spliterator covering all of the given array.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

## Spliterators.IntArraySpliterator(int[], int, int, int)

```java
public IntArraySpliterator(int[] array, int origin, int fence, int additionalCharacteristics)
```

Creates a spliterator covering the given array and range

Parameters:

- `array`: the array, assumed to be unmodified during use
- `origin`: the least index (inclusive) to cover
- `fence`: one past the greatest index to cover
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

## Spliterators.LongArraySpliterator(long[], int)

```java
public LongArraySpliterator(long[] array, int additionalCharacteristics)
```

Creates a spliterator covering all of the given array.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

## Spliterators.LongArraySpliterator(long[], int, int, int)

```java
public LongArraySpliterator(long[] array, int origin, int fence, int additionalCharacteristics)
```

Creates a spliterator covering the given array and range

Parameters:

- `array`: the array, assumed to be unmodified during use
- `origin`: the least index (inclusive) to cover
- `fence`: one past the greatest index to cover
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

## Spliterators.DoubleArraySpliterator(double[], int)

```java
public DoubleArraySpliterator(double[] array, int additionalCharacteristics)
```

Creates a spliterator covering all of the given array.

Parameters:

- `array`: the array, assumed to be unmodified during use
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

## Spliterators.DoubleArraySpliterator(double[], int, int, int)

```java
public DoubleArraySpliterator(double[] array, int origin, int fence, int additionalCharacteristics)
```

Creates a spliterator covering the given array and range

Parameters:

- `array`: the array, assumed to be unmodified during use
- `origin`: the least index (inclusive) to cover
- `fence`: one past the greatest index to cover
- `additionalCharacteristics`: Additional spliterator characteristics of this spliterator's source or elements beyond `SIZED` and `SUBSIZED` which are always reported

## Spliterators.AbstractSpliterator(long, int)

```java
protected AbstractSpliterator(long est, int additionalCharacteristics)
```

Creates a spliterator reporting the given estimated size and
additionalCharacteristics.

Parameters:

- `est`: the estimated size of this spliterator if known, otherwise `Long.MAX_VALUE`.
- `additionalCharacteristics`: properties of this spliterator's source or elements. If `SIZED` is reported then this spliterator will additionally report `SUBSIZED`.

## Spliterators.trySplit()

```java
public Spliterator<T> trySplit()
```

(inherited documentation)

This implementation permits limited parallelism.

## Spliterators.estimateSize()

```java
public long estimateSize()
```

(inherited documentation)

**Implementation requirements:** This implementation returns the estimated size as reported when
created and, if the estimate size is known, decreases in size when
split.

## Spliterators.characteristics()

```java
public int characteristics()
```

(inherited documentation)

**Implementation requirements:** This implementation returns the characteristics as reported when
created.
