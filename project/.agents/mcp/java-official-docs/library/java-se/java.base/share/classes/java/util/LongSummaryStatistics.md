# LongSummaryStatistics class (java.util)

```java
public class LongSummaryStatistics implements LongConsumer, IntConsumer
```

A state object for collecting statistics such as count, min, max, sum, and
average.

<p>This class is designed to work with (though does not require)
{@linkplain java.util.stream streams}. For example, you can compute
summary statistics on a stream of longs with:
<pre> {@code
LongSummaryStatistics stats = longStream.collect(LongSummaryStatistics::new,
                                                 LongSummaryStatistics::accept,
                                                 LongSummaryStatistics::combine);
}</pre>

<p>{@code LongSummaryStatistics} can be used as a
{@linkplain java.util.stream.Stream#collect(Collector) reduction}
target for a {@linkplain java.util.stream.Stream stream}. For example:

<pre> {@code
LongSummaryStatistics stats = people.stream()
                                    .collect(Collectors.summarizingLong(Person::getAge));
}</pre>

This computes, in a single pass, the count of people, as well as the minimum,
maximum, sum, and average of their ages.

@implNote This implementation is not thread safe. However, it is safe to use
{@link java.util.stream.Collectors#summarizingLong(java.util.function.ToLongFunction)
Collectors.summarizingLong()} on a parallel stream, because the parallel
implementation of {@link java.util.stream.Stream#collect Stream.collect()}
provides the necessary partitioning, isolation, and merging of results for
safe and efficient parallel execution.

<p>This implementation does not check for overflow of the count or the sum.
@since 1.8

## LongSummaryStatistics.LongSummaryStatistics()

```java
public LongSummaryStatistics()
```

Constructs an empty instance with zero count, zero sum,
{@code Long.MAX_VALUE} min, {@code Long.MIN_VALUE} max and zero
average.

## LongSummaryStatistics.LongSummaryStatistics(long, long, long, long)

```java
public LongSummaryStatistics(long count, long min, long max, long sum) throws IllegalArgumentException
```

Constructs a non-empty instance with the specified {@code count},
{@code min}, {@code max}, and {@code sum}.

<p>If {@code count} is zero then the remaining arguments are ignored and
an empty instance is constructed.

<p>If the arguments are inconsistent then an {@code IllegalArgumentException}
is thrown.  The necessary consistent argument conditions are:
<ul>
  <li>{@code count >= 0}</li>
  <li>{@code min <= max}</li>
</ul>
@apiNote
The enforcement of argument correctness means that the retrieved set of
recorded values obtained from a {@code LongSummaryStatistics} source
instance may not be a legal set of arguments for this constructor due to
arithmetic overflow of the source's recorded count of values.
The consistent argument conditions are not sufficient to prevent the
creation of an internally inconsistent instance.  An example of such a
state would be an instance with: {@code count} = 2, {@code min} = 1,
{@code max} = 2, and {@code sum} = 0.

@param count the count of values
@param min the minimum value
@param max the maximum value
@param sum the sum of all values
@throws IllegalArgumentException if the arguments are inconsistent
@since 10

## LongSummaryStatistics.accept(int)

```java
public void accept(int value)
```

Records a new {@code int} value into the summary information.

@param value the input value

## LongSummaryStatistics.accept(long)

```java
public void accept(long value)
```

Records a new {@code long} value into the summary information.

@param value the input value

## LongSummaryStatistics.combine(LongSummaryStatistics)

```java
public void combine(LongSummaryStatistics other)
```

Combines the state of another {@code LongSummaryStatistics} into this
one.

@param other another {@code LongSummaryStatistics}
@throws NullPointerException if {@code other} is null

## LongSummaryStatistics.getCount()

```java
public final long getCount()
```

Returns the count of values recorded.

@return the count of values

## LongSummaryStatistics.getSum()

```java
public final long getSum()
```

Returns the sum of values recorded, or zero if no values have been
recorded.

@return the sum of values, or zero if none

## LongSummaryStatistics.getMin()

```java
public final long getMin()
```

Returns the minimum value recorded, or {@code Long.MAX_VALUE} if no
values have been recorded.

@return the minimum value, or {@code Long.MAX_VALUE} if none

## LongSummaryStatistics.getMax()

```java
public final long getMax()
```

Returns the maximum value recorded, or {@code Long.MIN_VALUE} if no
values have been recorded

@return the maximum value, or {@code Long.MIN_VALUE} if none

## LongSummaryStatistics.getAverage()

```java
public final double getAverage()
```

Returns the arithmetic mean of values recorded, or zero if no values have been
recorded.

@return The arithmetic mean of values, or zero if none

## LongSummaryStatistics.toString()

```java
public String toString()
```

Returns a non-empty string representation of this object suitable for
debugging. The exact presentation format is unspecified and may vary
between implementations and versions.