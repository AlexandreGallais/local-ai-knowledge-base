# Spliterators class (java.util)

```java
public final class Spliterators
```

Static classes and methods for operating on or creating instances of
{@link Spliterator} and its primitive specializations
{@link Spliterator.OfInt}, {@link Spliterator.OfLong}, and
{@link Spliterator.OfDouble}.

@see Spliterator
@since 1.8

## Spliterators.emptySpliterator()

```java
public static <T> Spliterator<T> emptySpliterator()
```

Creates an empty {@code Spliterator}

<p>The empty spliterator reports {@link Spliterator#SIZED} and
{@link Spliterator#SUBSIZED}.  Calls to
{@link java.util.Spliterator#trySplit()} always return {@code null}.

@param <T> Type of elements
@return An empty spliterator

## Spliterators.emptyIntSpliterator()

```java
public static Spliterator.OfInt emptyIntSpliterator()
```

Creates an empty {@code Spliterator.OfInt}

<p>The empty spliterator reports {@link Spliterator#SIZED} and
{@link Spliterator#SUBSIZED}.  Calls to
{@link java.util.Spliterator#trySplit()} always return {@code null}.

@return An empty spliterator

## Spliterators.emptyLongSpliterator()

```java
public static Spliterator.OfLong emptyLongSpliterator()
```

Creates an empty {@code Spliterator.OfLong}

<p>The empty spliterator reports {@link Spliterator#SIZED} and
{@link Spliterator#SUBSIZED}.  Calls to
{@link java.util.Spliterator#trySplit()} always return {@code null}.

@return An empty spliterator

## Spliterators.emptyDoubleSpliterator()

```java
public static Spliterator.OfDouble emptyDoubleSpliterator()
```

Creates an empty {@code Spliterator.OfDouble}

<p>The empty spliterator reports {@link Spliterator#SIZED} and
{@link Spliterator#SUBSIZED}.  Calls to
{@link java.util.Spliterator#trySplit()} always return {@code null}.

@return An empty spliterator

## Spliterators.spliterator(Object[], int)

```java
public static <T> Spliterator<T> spliterator(Object[] array, int additionalCharacteristics)
```

Creates a {@code Spliterator} covering the elements of a given array,
using a customized set of spliterator characteristics.

<p>This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
{@link Arrays#spliterator(Object[])}.

<p>The returned spliterator always reports the characteristics
{@code SIZED} and {@code SUBSIZED}.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify {@code IMMUTABLE} and {@code ORDERED}.

@param <T> Type of elements
@param array The array, assumed to be unmodified during use
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported
@return A spliterator for an array
@throws NullPointerException if the given array is {@code null}
@see Arrays#spliterator(Object[])

## Spliterators.spliterator(Object[], int, int, int)

```java
public static <T> Spliterator<T> spliterator(Object[] array, int fromIndex, int toIndex, int additionalCharacteristics)
```

Creates a {@code Spliterator} covering a range of elements of a given
array, using a customized set of spliterator characteristics.

<p>This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
{@link Arrays#spliterator(Object[])}.

<p>The returned spliterator always reports the characteristics
{@code SIZED} and {@code SUBSIZED}.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify {@code IMMUTABLE} and {@code ORDERED}.

@param <T> Type of elements
@param array The array, assumed to be unmodified during use
@param fromIndex The least index (inclusive) to cover
@param toIndex One past the greatest index to cover
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported
@return A spliterator for an array
@throws NullPointerException if the given array is {@code null}
@throws ArrayIndexOutOfBoundsException if {@code fromIndex} is negative,
        {@code toIndex} is less than {@code fromIndex}, or
        {@code toIndex} is greater than the array size
@see Arrays#spliterator(Object[], int, int)

## Spliterators.spliterator(int[], int)

```java
public static Spliterator.OfInt spliterator(int[] array, int additionalCharacteristics)
```

Creates a {@code Spliterator.OfInt} covering the elements of a given array,
using a customized set of spliterator characteristics.

<p>This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
{@link Arrays#spliterator(int[])}.

<p>The returned spliterator always reports the characteristics
{@code SIZED} and {@code SUBSIZED}.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify {@code IMMUTABLE} and {@code ORDERED}.

@param array The array, assumed to be unmodified during use
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported
@return A spliterator for an array
@throws NullPointerException if the given array is {@code null}
@see Arrays#spliterator(int[])

## Spliterators.spliterator(int[], int, int, int)

```java
public static Spliterator.OfInt spliterator(int[] array, int fromIndex, int toIndex, int additionalCharacteristics)
```

Creates a {@code Spliterator.OfInt} covering a range of elements of a
given array, using a customized set of spliterator characteristics.

<p>This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
{@link Arrays#spliterator(int[], int, int)}.

<p>The returned spliterator always reports the characteristics
{@code SIZED} and {@code SUBSIZED}.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify {@code IMMUTABLE} and {@code ORDERED}.

@param array The array, assumed to be unmodified during use
@param fromIndex The least index (inclusive) to cover
@param toIndex One past the greatest index to cover
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported
@return A spliterator for an array
@throws NullPointerException if the given array is {@code null}
@throws ArrayIndexOutOfBoundsException if {@code fromIndex} is negative,
        {@code toIndex} is less than {@code fromIndex}, or
        {@code toIndex} is greater than the array size
@see Arrays#spliterator(int[], int, int)

## Spliterators.spliterator(long[], int)

```java
public static Spliterator.OfLong spliterator(long[] array, int additionalCharacteristics)
```

Creates a {@code Spliterator.OfLong} covering the elements of a given array,
using a customized set of spliterator characteristics.

<p>This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
{@link Arrays#spliterator(long[])}.

<p>The returned spliterator always reports the characteristics
{@code SIZED} and {@code SUBSIZED}.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify {@code IMMUTABLE} and {@code ORDERED}.

@param array The array, assumed to be unmodified during use
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported
@return A spliterator for an array
@throws NullPointerException if the given array is {@code null}
@see Arrays#spliterator(long[])

## Spliterators.spliterator(long[], int, int, int)

```java
public static Spliterator.OfLong spliterator(long[] array, int fromIndex, int toIndex, int additionalCharacteristics)
```

Creates a {@code Spliterator.OfLong} covering a range of elements of a
given array, using a customized set of spliterator characteristics.

<p>This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
{@link Arrays#spliterator(long[], int, int)}.

<p>The returned spliterator always reports the characteristics
{@code SIZED} and {@code SUBSIZED}.  The caller may provide additional
characteristics for the spliterator to report.  (For example, if it is
known the array will not be further modified, specify {@code IMMUTABLE};
if the array data is considered to have an encounter order, specify
{@code ORDERED}).  The method {@link Arrays#spliterator(long[], int, int)} can
often be used instead, which returns a spliterator that reports
{@code SIZED}, {@code SUBSIZED}, {@code IMMUTABLE}, and {@code ORDERED}.

@param array The array, assumed to be unmodified during use
@param fromIndex The least index (inclusive) to cover
@param toIndex One past the greatest index to cover
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported
@return A spliterator for an array
@throws NullPointerException if the given array is {@code null}
@throws ArrayIndexOutOfBoundsException if {@code fromIndex} is negative,
        {@code toIndex} is less than {@code fromIndex}, or
        {@code toIndex} is greater than the array size
@see Arrays#spliterator(long[], int, int)

## Spliterators.spliterator(double[], int)

```java
public static Spliterator.OfDouble spliterator(double[] array, int additionalCharacteristics)
```

Creates a {@code Spliterator.OfDouble} covering the elements of a given array,
using a customized set of spliterator characteristics.

<p>This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
{@link Arrays#spliterator(double[])}.

<p>The returned spliterator always reports the characteristics
{@code SIZED} and {@code SUBSIZED}.  The caller may provide additional
characteristics for the spliterator to report; it is common to
additionally specify {@code IMMUTABLE} and {@code ORDERED}.

@param array The array, assumed to be unmodified during use
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported
@return A spliterator for an array
@throws NullPointerException if the given array is {@code null}
@see Arrays#spliterator(double[])

## Spliterators.spliterator(double[], int, int, int)

```java
public static Spliterator.OfDouble spliterator(double[] array, int fromIndex, int toIndex, int additionalCharacteristics)
```

Creates a {@code Spliterator.OfDouble} covering a range of elements of a
given array, using a customized set of spliterator characteristics.

<p>This method is provided as an implementation convenience for
Spliterators which store portions of their elements in arrays, and need
fine control over Spliterator characteristics.  Most other situations in
which a Spliterator for an array is needed should use
{@link Arrays#spliterator(double[], int, int)}.

<p>The returned spliterator always reports the characteristics
{@code SIZED} and {@code SUBSIZED}.  The caller may provide additional
characteristics for the spliterator to report.  (For example, if it is
known the array will not be further modified, specify {@code IMMUTABLE};
if the array data is considered to have an encounter order, specify
{@code ORDERED}).  The method {@link Arrays#spliterator(long[], int, int)} can
often be used instead, which returns a spliterator that reports
{@code SIZED}, {@code SUBSIZED}, {@code IMMUTABLE}, and {@code ORDERED}.

@param array The array, assumed to be unmodified during use
@param fromIndex The least index (inclusive) to cover
@param toIndex One past the greatest index to cover
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported
@return A spliterator for an array
@throws NullPointerException if the given array is {@code null}
@throws ArrayIndexOutOfBoundsException if {@code fromIndex} is negative,
        {@code toIndex} is less than {@code fromIndex}, or
        {@code toIndex} is greater than the array size
@see Arrays#spliterator(double[], int, int)

## Spliterators.spliterator(Collection<? extends T>, int)

```java
public static <T> Spliterator<T> spliterator(Collection<? extends T> c, int characteristics)
```

Creates a {@code Spliterator} using the given collection's
{@link java.util.Collection#iterator() iterator} as the source of elements, and
reporting its {@link java.util.Collection#size() size} as its initial size.

<p>The spliterator is
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the collection's iterator, and
implements {@code trySplit} to permit limited parallelism.

@param <T> Type of elements
@param c The collection
@param characteristics Characteristics of this spliterator's source or
       elements.  The characteristics {@code SIZED} and {@code SUBSIZED}
       are additionally reported unless {@code CONCURRENT} is supplied.
@return A spliterator from an iterator
@throws NullPointerException if the given collection is {@code null}

## Spliterators.spliterator(Iterator<? extends T>, long, int)

```java
public static <T> Spliterator<T> spliterator(Iterator<? extends T> iterator, long size, int characteristics)
```

Creates a {@code Spliterator} using a given {@code Iterator}
as the source of elements, and with a given initially reported size.

<p>The spliterator is not
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the iterator, and implements
{@code trySplit} to permit limited parallelism.

<p>Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned, or the initially reported
size is not equal to the actual number of elements in the source.

@param <T> Type of elements
@param iterator The iterator for the source
@param size The number of elements in the source, to be reported as
       initial {@code estimateSize}
@param characteristics Characteristics of this spliterator's source or
       elements.  The characteristics {@code SIZED} and {@code SUBSIZED}
       are additionally reported unless {@code CONCURRENT} is supplied.
@return A spliterator from an iterator
@throws NullPointerException if the given iterator is {@code null}

## Spliterators.spliteratorUnknownSize(Iterator<? extends T>, int)

```java
public static <T> Spliterator<T> spliteratorUnknownSize(Iterator<? extends T> iterator, int characteristics)
```

Creates a {@code Spliterator} using a given {@code Iterator}
as the source of elements, with no initial size estimate.

<p>The spliterator is not
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the iterator, and implements
{@code trySplit} to permit limited parallelism.

<p>Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned.

@param <T> Type of elements
@param iterator The iterator for the source
@param characteristics Characteristics of this spliterator's source
       or elements ({@code SIZED} and {@code SUBSIZED}, if supplied, are
       ignored and are not reported.)
@return A spliterator from an iterator
@throws NullPointerException if the given iterator is {@code null}

## Spliterators.spliterator(PrimitiveIterator.OfInt, long, int)

```java
public static Spliterator.OfInt spliterator(PrimitiveIterator.OfInt iterator, long size, int characteristics)
```

Creates a {@code Spliterator.OfInt} using a given
{@code IntStream.IntIterator} as the source of elements, and with a given
initially reported size.

<p>The spliterator is not
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the iterator, and implements
{@code trySplit} to permit limited parallelism.

<p>Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned, or the initially reported
size is not equal to the actual number of elements in the source.

@param iterator The iterator for the source
@param size The number of elements in the source, to be reported as
       initial {@code estimateSize}.
@param characteristics Characteristics of this spliterator's source or
       elements.  The characteristics {@code SIZED} and {@code SUBSIZED}
       are additionally reported unless {@code CONCURRENT} is supplied.
@return A spliterator from an iterator
@throws NullPointerException if the given iterator is {@code null}

## Spliterators.spliteratorUnknownSize(PrimitiveIterator.OfInt, int)

```java
public static Spliterator.OfInt spliteratorUnknownSize(PrimitiveIterator.OfInt iterator, int characteristics)
```

Creates a {@code Spliterator.OfInt} using a given
{@code IntStream.IntIterator} as the source of elements, with no initial
size estimate.

<p>The spliterator is not
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the iterator, and implements
{@code trySplit} to permit limited parallelism.

<p>Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned.

@param iterator The iterator for the source
@param characteristics Characteristics of this spliterator's source
       or elements ({@code SIZED} and {@code SUBSIZED}, if supplied, are
       ignored and are not reported.)
@return A spliterator from an iterator
@throws NullPointerException if the given iterator is {@code null}

## Spliterators.spliterator(PrimitiveIterator.OfLong, long, int)

```java
public static Spliterator.OfLong spliterator(PrimitiveIterator.OfLong iterator, long size, int characteristics)
```

Creates a {@code Spliterator.OfLong} using a given
{@code LongStream.LongIterator} as the source of elements, and with a
given initially reported size.

<p>The spliterator is not
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the iterator, and implements
{@code trySplit} to permit limited parallelism.

<p>Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned, or the initially reported
size is not equal to the actual number of elements in the source.

@param iterator The iterator for the source
@param size The number of elements in the source, to be reported as
       initial {@code estimateSize}.
@param characteristics Characteristics of this spliterator's source or
       elements.  The characteristics {@code SIZED} and {@code SUBSIZED}
       are additionally reported unless {@code CONCURRENT} is supplied.
@return A spliterator from an iterator
@throws NullPointerException if the given iterator is {@code null}

## Spliterators.spliteratorUnknownSize(PrimitiveIterator.OfLong, int)

```java
public static Spliterator.OfLong spliteratorUnknownSize(PrimitiveIterator.OfLong iterator, int characteristics)
```

Creates a {@code Spliterator.OfLong} using a given
{@code LongStream.LongIterator} as the source of elements, with no
initial size estimate.

<p>The spliterator is not
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the iterator, and implements
{@code trySplit} to permit limited parallelism.

<p>Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned.

@param iterator The iterator for the source
@param characteristics Characteristics of this spliterator's source
       or elements ({@code SIZED} and {@code SUBSIZED}, if supplied, are
       ignored and are not reported.)
@return A spliterator from an iterator
@throws NullPointerException if the given iterator is {@code null}

## Spliterators.spliterator(PrimitiveIterator.OfDouble, long, int)

```java
public static Spliterator.OfDouble spliterator(PrimitiveIterator.OfDouble iterator, long size, int characteristics)
```

Creates a {@code Spliterator.OfDouble} using a given
{@code DoubleStream.DoubleIterator} as the source of elements, and with a
given initially reported size.

<p>The spliterator is not
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the iterator, and implements
{@code trySplit} to permit limited parallelism.

<p>Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned, or the initially reported
size is not equal to the actual number of elements in the source.

@param iterator The iterator for the source
@param size The number of elements in the source, to be reported as
       initial {@code estimateSize}
@param characteristics Characteristics of this spliterator's source or
       elements.  The characteristics {@code SIZED} and {@code SUBSIZED}
       are additionally reported unless {@code CONCURRENT} is supplied.
@return A spliterator from an iterator
@throws NullPointerException if the given iterator is {@code null}

## Spliterators.spliteratorUnknownSize(PrimitiveIterator.OfDouble, int)

```java
public static Spliterator.OfDouble spliteratorUnknownSize(PrimitiveIterator.OfDouble iterator, int characteristics)
```

Creates a {@code Spliterator.OfDouble} using a given
{@code DoubleStream.DoubleIterator} as the source of elements, with no
initial size estimate.

<p>The spliterator is not
<em><a href="Spliterator.html#binding">late-binding</a></em>, inherits
the <em>fail-fast</em> properties of the iterator, and implements
{@code trySplit} to permit limited parallelism.

<p>Traversal of elements should be accomplished through the spliterator.
The behaviour of splitting and traversal is undefined if the iterator is
operated on after the spliterator is returned.

@param iterator The iterator for the source
@param characteristics Characteristics of this spliterator's source
       or elements ({@code SIZED} and {@code SUBSIZED}, if supplied, are
       ignored and are not reported.)
@return A spliterator from an iterator
@throws NullPointerException if the given iterator is {@code null}

## Spliterators.iterator(Spliterator<? extends T>)

```java
public static<T> Iterator<T> iterator(Spliterator<? extends T> spliterator)
```

Creates an {@code Iterator} from a {@code Spliterator}.

<p>Traversal of elements should be accomplished through the iterator.
The behaviour of traversal is undefined if the spliterator is operated
after the iterator is returned.

@param <T> Type of elements
@param spliterator The spliterator
@return An iterator
@throws NullPointerException if the given spliterator is {@code null}

## Spliterators.iterator(Spliterator.OfInt)

```java
public static PrimitiveIterator.OfInt iterator(Spliterator.OfInt spliterator)
```

Creates an {@code PrimitiveIterator.OfInt} from a
{@code Spliterator.OfInt}.

<p>Traversal of elements should be accomplished through the iterator.
The behaviour of traversal is undefined if the spliterator is operated
after the iterator is returned.

@param spliterator The spliterator
@return An iterator
@throws NullPointerException if the given spliterator is {@code null}

## Spliterators.iterator(Spliterator.OfLong)

```java
public static PrimitiveIterator.OfLong iterator(Spliterator.OfLong spliterator)
```

Creates an {@code PrimitiveIterator.OfLong} from a
{@code Spliterator.OfLong}.

<p>Traversal of elements should be accomplished through the iterator.
The behaviour of traversal is undefined if the spliterator is operated
after the iterator is returned.

@param spliterator The spliterator
@return An iterator
@throws NullPointerException if the given spliterator is {@code null}

## Spliterators.iterator(Spliterator.OfDouble)

```java
public static PrimitiveIterator.OfDouble iterator(Spliterator.OfDouble spliterator)
```

Creates an {@code PrimitiveIterator.OfDouble} from a
{@code Spliterator.OfDouble}.

<p>Traversal of elements should be accomplished through the iterator.
The behaviour of traversal is undefined if the spliterator is operated
after the iterator is returned.

@param spliterator The spliterator
@return An iterator
@throws NullPointerException if the given spliterator is {@code null}

## Spliterators.ArraySpliterator(Object[], int)

```java
public ArraySpliterator(Object[] array, int additionalCharacteristics)
```

Creates a spliterator covering all of the given array.
Its size is known exactly and it is SIZED and SUBSIZED.
@param array the array, assumed to be unmodified during use
@param additionalCharacteristics Additional spliterator characteristics
of this spliterator's source or elements beyond {@code SIZED} and
{@code SUBSIZED} which are always reported

## Spliterators.ArraySpliterator(Object[], int, int, int)

```java
public ArraySpliterator(Object[] array, int origin, int fence, int additionalCharacteristics)
```

Creates a spliterator covering the given array and range.
Its size is known exactly and it is SIZED and SUBSIZED.
@param array the array, assumed to be unmodified during use
@param origin the least index (inclusive) to cover
@param fence one past the greatest index to cover
@param additionalCharacteristics Additional spliterator characteristics
of this spliterator's source or elements beyond {@code SIZED} and
{@code SUBSIZED} which are always reported

## Spliterators.IntArraySpliterator(int[], int)

```java
public IntArraySpliterator(int[] array, int additionalCharacteristics)
```

Creates a spliterator covering all of the given array.
@param array the array, assumed to be unmodified during use
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported

## Spliterators.IntArraySpliterator(int[], int, int, int)

```java
public IntArraySpliterator(int[] array, int origin, int fence, int additionalCharacteristics)
```

Creates a spliterator covering the given array and range
@param array the array, assumed to be unmodified during use
@param origin the least index (inclusive) to cover
@param fence one past the greatest index to cover
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported

## Spliterators.LongArraySpliterator(long[], int)

```java
public LongArraySpliterator(long[] array, int additionalCharacteristics)
```

Creates a spliterator covering all of the given array.
@param array the array, assumed to be unmodified during use
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported

## Spliterators.LongArraySpliterator(long[], int, int, int)

```java
public LongArraySpliterator(long[] array, int origin, int fence, int additionalCharacteristics)
```

Creates a spliterator covering the given array and range
@param array the array, assumed to be unmodified during use
@param origin the least index (inclusive) to cover
@param fence one past the greatest index to cover
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported

## Spliterators.DoubleArraySpliterator(double[], int)

```java
public DoubleArraySpliterator(double[] array, int additionalCharacteristics)
```

Creates a spliterator covering all of the given array.
@param array the array, assumed to be unmodified during use
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported

## Spliterators.DoubleArraySpliterator(double[], int, int, int)

```java
public DoubleArraySpliterator(double[] array, int origin, int fence, int additionalCharacteristics)
```

Creates a spliterator covering the given array and range
@param array the array, assumed to be unmodified during use
@param origin the least index (inclusive) to cover
@param fence one past the greatest index to cover
@param additionalCharacteristics Additional spliterator characteristics
       of this spliterator's source or elements beyond {@code SIZED} and
       {@code SUBSIZED} which are always reported

## Spliterators.AbstractSpliterator(long, int)

```java
protected AbstractSpliterator(long est, int additionalCharacteristics)
```

Creates a spliterator reporting the given estimated size and
additionalCharacteristics.

@param est the estimated size of this spliterator if known, otherwise
       {@code Long.MAX_VALUE}.
@param additionalCharacteristics properties of this spliterator's
       source or elements.  If {@code SIZED} is reported then this
       spliterator will additionally report {@code SUBSIZED}.

## Spliterators.trySplit()

```java
public Spliterator<T> trySplit()
```

{@inheritDoc}

This implementation permits limited parallelism.

## Spliterators.estimateSize()

```java
public long estimateSize()
```

{@inheritDoc}

@implSpec
This implementation returns the estimated size as reported when
created and, if the estimate size is known, decreases in size when
split.

## Spliterators.characteristics()

```java
public int characteristics()
```

{@inheritDoc}

@implSpec
This implementation returns the characteristics as reported when
created.

## Spliterators.AbstractIntSpliterator(long, int)

```java
protected AbstractIntSpliterator(long est, int additionalCharacteristics)
```

Creates a spliterator reporting the given estimated size and
characteristics.

@param est the estimated size of this spliterator if known, otherwise
       {@code Long.MAX_VALUE}.
@param additionalCharacteristics properties of this spliterator's
       source or elements.  If {@code SIZED} is reported then this
       spliterator will additionally report {@code SUBSIZED}.

## Spliterators.trySplit()

```java
public Spliterator.OfInt trySplit()
```

{@inheritDoc}

This implementation permits limited parallelism.

## Spliterators.estimateSize()

```java
public long estimateSize()
```

{@inheritDoc}

@implSpec
This implementation returns the estimated size as reported when
created and, if the estimate size is known, decreases in size when
split.

## Spliterators.characteristics()

```java
public int characteristics()
```

{@inheritDoc}

@implSpec
This implementation returns the characteristics as reported when
created.

## Spliterators.AbstractLongSpliterator(long, int)

```java
protected AbstractLongSpliterator(long est, int additionalCharacteristics)
```

Creates a spliterator reporting the given estimated size and
characteristics.

@param est the estimated size of this spliterator if known, otherwise
       {@code Long.MAX_VALUE}.
@param additionalCharacteristics properties of this spliterator's
       source or elements.  If {@code SIZED} is reported then this
       spliterator will additionally report {@code SUBSIZED}.

## Spliterators.trySplit()

```java
public Spliterator.OfLong trySplit()
```

{@inheritDoc}

This implementation permits limited parallelism.

## Spliterators.estimateSize()

```java
public long estimateSize()
```

{@inheritDoc}

@implSpec
This implementation returns the estimated size as reported when
created and, if the estimate size is known, decreases in size when
split.

## Spliterators.characteristics()

```java
public int characteristics()
```

{@inheritDoc}

@implSpec
This implementation returns the characteristics as reported when
created.

## Spliterators.AbstractDoubleSpliterator(long, int)

```java
protected AbstractDoubleSpliterator(long est, int additionalCharacteristics)
```

Creates a spliterator reporting the given estimated size and
characteristics.

@param est the estimated size of this spliterator if known, otherwise
       {@code Long.MAX_VALUE}.
@param additionalCharacteristics properties of this spliterator's
       source or elements.  If {@code SIZED} is reported then this
       spliterator will additionally report {@code SUBSIZED}.

## Spliterators.trySplit()

```java
public Spliterator.OfDouble trySplit()
```

{@inheritDoc}

This implementation permits limited parallelism.

## Spliterators.estimateSize()

```java
public long estimateSize()
```

{@inheritDoc}

@implSpec
This implementation returns the estimated size as reported when
created and, if the estimate size is known, decreases in size when
split.

## Spliterators.characteristics()

```java
public int characteristics()
```

{@inheritDoc}

@implSpec
This implementation returns the characteristics as reported when
created.

## Spliterators.IteratorSpliterator(Collection<? extends T>, int)

```java
public IteratorSpliterator(Collection<? extends T> collection, int characteristics)
```

Creates a spliterator using the given
collection's {@link java.util.Collection#iterator() iterator} for traversal,
and reporting its {@link java.util.Collection#size() size} as its initial
size.

@param collection the collection
@param characteristics properties of this spliterator's
       source or elements.

## Spliterators.IteratorSpliterator(Iterator<? extends T>, long, int)

```java
public IteratorSpliterator(Iterator<? extends T> iterator, long size, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

@param iterator the iterator for the source
@param size the number of elements in the source
@param characteristics properties of this spliterator's
source or elements.

## Spliterators.IteratorSpliterator(Iterator<? extends T>, int)

```java
public IteratorSpliterator(Iterator<? extends T> iterator, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

@param iterator the iterator for the source
@param characteristics properties of this spliterator's
source or elements.

## Spliterators.IntIteratorSpliterator(PrimitiveIterator.OfInt, long, int)

```java
public IntIteratorSpliterator(PrimitiveIterator.OfInt iterator, long size, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

@param iterator the iterator for the source
@param size the number of elements in the source
@param characteristics properties of this spliterator's
source or elements.

## Spliterators.IntIteratorSpliterator(PrimitiveIterator.OfInt, int)

```java
public IntIteratorSpliterator(PrimitiveIterator.OfInt iterator, int characteristics)
```

Creates a spliterator using the given iterator for a
source of unknown size, reporting the given
characteristics.

@param iterator the iterator for the source
@param characteristics properties of this spliterator's
source or elements.

## Spliterators.LongIteratorSpliterator(PrimitiveIterator.OfLong, long, int)

```java
public LongIteratorSpliterator(PrimitiveIterator.OfLong iterator, long size, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

@param iterator the iterator for the source
@param size the number of elements in the source
@param characteristics properties of this spliterator's
source or elements.

## Spliterators.LongIteratorSpliterator(PrimitiveIterator.OfLong, int)

```java
public LongIteratorSpliterator(PrimitiveIterator.OfLong iterator, int characteristics)
```

Creates a spliterator using the given iterator for a
source of unknown size, reporting the given
characteristics.

@param iterator the iterator for the source
@param characteristics properties of this spliterator's
source or elements.

## Spliterators.DoubleIteratorSpliterator(PrimitiveIterator.OfDouble, long, int)

```java
public DoubleIteratorSpliterator(PrimitiveIterator.OfDouble iterator, long size, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

@param iterator the iterator for the source
@param size the number of elements in the source
@param characteristics properties of this spliterator's
source or elements.

## Spliterators.DoubleIteratorSpliterator(PrimitiveIterator.OfDouble, int)

```java
public DoubleIteratorSpliterator(PrimitiveIterator.OfDouble iterator, int characteristics)
```

Creates a spliterator using the given iterator for a
source of unknown size, reporting the given
characteristics.

@param iterator the iterator for the source
@param characteristics properties of this spliterator's
source or elements.