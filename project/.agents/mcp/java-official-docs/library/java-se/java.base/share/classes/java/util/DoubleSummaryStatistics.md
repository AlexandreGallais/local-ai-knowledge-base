# DoubleSummaryStatistics class (java.util)

```java
public class DoubleSummaryStatistics implements DoubleConsumer
```

A state object for collecting statistics such as count, min, max, sum, and
average.

<p>This class is designed to work with (though does not require)
{@linkplain java.util.stream streams}. For example, you can compute
summary statistics on a stream of doubles with:
<pre> {@code
DoubleSummaryStatistics stats = doubleStream.collect(DoubleSummaryStatistics::new,
                                                     DoubleSummaryStatistics::accept,
                                                     DoubleSummaryStatistics::combine);
}</pre>

<p>{@code DoubleSummaryStatistics} can be used as a
{@linkplain java.util.stream.Stream#collect(Collector) reduction}
target for a {@linkplain java.util.stream.Stream stream}. For example:

<pre> {@code
DoubleSummaryStatistics stats = people.stream()
    .collect(Collectors.summarizingDouble(Person::getWeight));
}</pre>

This computes, in a single pass, the count of people, as well as the minimum,
maximum, sum, and average of their weights.

@implNote This implementation is not thread safe. However, it is safe to use
{@link java.util.stream.Collectors#summarizingDouble(java.util.function.ToDoubleFunction)
Collectors.summarizingDouble()} on a parallel stream, because the parallel
implementation of {@link java.util.stream.Stream#collect Stream.collect()}
provides the necessary partitioning, isolation, and merging of results for
safe and efficient parallel execution.

<p>This implementation does not check for overflow of the count.
@since 1.8

## DoubleSummaryStatistics.DoubleSummaryStatistics()

```java
public DoubleSummaryStatistics()
```

Constructs an empty instance with zero count, zero sum,
{@code Double.POSITIVE_INFINITY} min, {@code Double.NEGATIVE_INFINITY}
max and zero average.

## DoubleSummaryStatistics.DoubleSummaryStatistics(long, double, double, double)

```java
public DoubleSummaryStatistics(long count, double min, double max, double sum) throws IllegalArgumentException
```

Constructs a non-empty instance with the specified {@code count},
{@code min}, {@code max}, and {@code sum}.

<p>If {@code count} is zero then the remaining arguments are ignored and
an empty instance is constructed.

<p>If the arguments are inconsistent then an {@code IllegalArgumentException}
is thrown.  The necessary consistent argument conditions are:
<ul>
  <li>{@code count >= 0}</li>
  <li>{@code (min <= max && !isNaN(sum)) || (isNaN(min) && isNaN(max) && isNaN(sum))}</li>
</ul>
@apiNote
The enforcement of argument correctness means that the retrieved set of
recorded values obtained from a {@code DoubleSummaryStatistics} source
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

## DoubleSummaryStatistics.accept(double)

```java
public void accept(double value)
```

Records another value into the summary information.

@param value the input value

## DoubleSummaryStatistics.combine(DoubleSummaryStatistics)

```java
public void combine(DoubleSummaryStatistics other)
```

Combines the state of another {@code DoubleSummaryStatistics} into this
one.

@param other another {@code DoubleSummaryStatistics}
@throws NullPointerException if {@code other} is null

## DoubleSummaryStatistics.getCount()

```java
public final long getCount()
```

Return the count of values recorded.

@return the count of values

## DoubleSummaryStatistics.getSum()

```java
public final double getSum()
```

Returns the sum of values recorded, or zero if no values have been
recorded.

<p> The value of a floating-point sum is a function both of the
input values as well as the order of addition operations. The
order of addition operations of this method is intentionally
not defined to allow for implementation flexibility to improve
the speed and accuracy of the computed result.

In particular, this method may be implemented using compensated
summation or other technique to reduce the error bound in the
numerical sum compared to a simple summation of {@code double}
values.

Because of the unspecified order of operations and the
possibility of using differing summation schemes, the output of
this method may vary on the same input values.

<p>Various conditions can result in a non-finite sum being
computed. This can occur even if the all the recorded values
being summed are finite. If any recorded value is non-finite,
the sum will be non-finite:

<ul>

<li>If any recorded value is a NaN, then the final sum will be
NaN.

<li>If the recorded values contain one or more infinities, the
sum will be infinite or NaN.

<ul>

<li>If the recorded values contain infinities of opposite sign,
the sum will be NaN.

<li>If the recorded values contain infinities of one sign and
an intermediate sum overflows to an infinity of the opposite
sign, the sum may be NaN.

</ul>

</ul>

It is possible for intermediate sums of finite values to
overflow into opposite-signed infinities; if that occurs, the
final sum will be NaN even if the recorded values are all
finite.

If all the recorded values are zero, the sign of zero is
<em>not</em> guaranteed to be preserved in the final sum.

@apiNote Values sorted by increasing absolute magnitude tend to yield
more accurate results.

@return the sum of values, or zero if none

## DoubleSummaryStatistics.getMin()

```java
public final double getMin()
```

Returns the minimum recorded value, {@code Double.NaN} if any recorded
value was NaN or {@code Double.POSITIVE_INFINITY} if no values were
recorded. Unlike the numerical comparison operators, this method
considers negative zero to be strictly smaller than positive zero.

@return the minimum recorded value, {@code Double.NaN} if any recorded
value was NaN or {@code Double.POSITIVE_INFINITY} if no values were
recorded

## DoubleSummaryStatistics.getMax()

```java
public final double getMax()
```

Returns the maximum recorded value, {@code Double.NaN} if any recorded
value was NaN or {@code Double.NEGATIVE_INFINITY} if no values were
recorded. Unlike the numerical comparison operators, this method
considers negative zero to be strictly smaller than positive zero.

@return the maximum recorded value, {@code Double.NaN} if any recorded
value was NaN or {@code Double.NEGATIVE_INFINITY} if no values were
recorded

## DoubleSummaryStatistics.getAverage()

```java
public final double getAverage()
```

Returns the arithmetic mean of values recorded, or zero if no
values have been recorded.

<p> The computed average can vary numerically and have the
special case behavior as computing the sum; see {@link #getSum}
for details.

@apiNote Values sorted by increasing absolute magnitude tend to yield
more accurate results.

@return the arithmetic mean of values, or zero if none

## DoubleSummaryStatistics.toString()

```java
public String toString()
```

Returns a non-empty string representation of this object suitable for
debugging. The exact presentation format is unspecified and may vary
between implementations and versions.