# IntSummaryStatistics class (java.util)

```java
public class IntSummaryStatistics implements IntConsumer
```

A state object for collecting statistics such as count, min, max, sum, and
average.

<p>This class is designed to work with (though does not require)
{@linkplain java.util.stream streams}. For example, you can compute
summary statistics on a stream of ints with:
<pre> {@code
IntSummaryStatistics stats = intStream.collect(IntSummaryStatistics::new,
                                               IntSummaryStatistics::accept,
                                               IntSummaryStatistics::combine);
}</pre>

<p>{@code IntSummaryStatistics} can be used as a
{@linkplain java.util.stream.Stream#collect(Collector) reduction}
target for a {@linkplain java.util.stream.Stream stream}. For example:

<pre> {@code
IntSummaryStatistics stats = people.stream()
                                   .collect(Collectors.summarizingInt(Person::getDependents));
}</pre>

This computes, in a single pass, the count of people, as well as the minimum,
maximum, sum, and average of their number of dependents.

@implNote This implementation is not thread safe. However, it is safe to use
{@link java.util.stream.Collectors#summarizingInt(java.util.function.ToIntFunction)
Collectors.summarizingInt()} on a parallel stream, because the parallel
implementation of {@link java.util.stream.Stream#collect Stream.collect()}
provides the necessary partitioning, isolation, and merging of results for
safe and efficient parallel execution.

<p>This implementation does not check for overflow of the count or the sum.
@since 1.8

## IntSummaryStatistics.IntSummaryStatistics()

```java
public IntSummaryStatistics()
```

Constructs an empty instance with zero count, zero sum,
{@code Integer.MAX_VALUE} min, {@code Integer.MIN_VALUE} max and zero
average.

## IntSummaryStatistics.IntSummaryStatistics(long, int, int, long)

```java
public IntSummaryStatistics(long count, int min, int max, long sum) throws IllegalArgumentException
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
recorded values obtained from a {@code IntSummaryStatistics} source
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

## IntSummaryStatistics.accept(int)

```java
public void accept(int value)
```

Records a new value into the summary information

@param value the input value

## IntSummaryStatistics.combine(IntSummaryStatistics)

```java
public void combine(IntSummaryStatistics other)
```

Combines the state of another {@code IntSummaryStatistics} into this one.

@param other another {@code IntSummaryStatistics}
@throws NullPointerException if {@code other} is null

## IntSummaryStatistics.getCount()

```java
public final long getCount()
```

Returns the count of values recorded.

@return the count of values

## IntSummaryStatistics.getSum()

```java
public final long getSum()
```

Returns the sum of values recorded, or zero if no values have been
recorded.

@return the sum of values, or zero if none

## IntSummaryStatistics.getMin()

```java
public final int getMin()
```

Returns the minimum value recorded, or {@code Integer.MAX_VALUE} if no
values have been recorded.

@return the minimum value, or {@code Integer.MAX_VALUE} if none

## IntSummaryStatistics.getMax()

```java
public final int getMax()
```

Returns the maximum value recorded, or {@code Integer.MIN_VALUE} if no
values have been recorded.

@return the maximum value, or {@code Integer.MIN_VALUE} if none

## IntSummaryStatistics.getAverage()

```java
public final double getAverage()
```

Returns the arithmetic mean of values recorded, or zero if no values have been
recorded.

@return the arithmetic mean of values, or zero if none

## IntSummaryStatistics.toString()

```java
public String toString()
```

Returns a non-empty string representation of this object suitable for
debugging. The exact presentation format is unspecified and may vary
between implementations and versions.