---
title: "LongSummaryStatistics class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/LongSummaryStatistics.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongSummaryStatistics class (java.util)

```java
public class LongSummaryStatistics implements LongConsumer, IntConsumer
```

A state object for collecting statistics such as count, min, max, sum, and
average.

This class is designed to work with (though does not require)
streams. For example, you can compute
summary statistics on a stream of longs with:

```java
LongSummaryStatistics stats = longStream.collect(LongSummaryStatistics::new,
                                                 LongSummaryStatistics::accept,
                                                 LongSummaryStatistics::combine);
```

`LongSummaryStatistics` can be used as a
reduction
target for a stream. For example:

```java
LongSummaryStatistics stats = people.stream()
                                    .collect(Collectors.summarizingLong(Person::getAge));
```

This computes, in a single pass, the count of people, as well as the minimum,
maximum, sum, and average of their ages.

**Implementation note:** This implementation is not thread safe. However, it is safe to use
Collectors.summarizingLong() on a parallel stream, because the parallel
implementation of Stream.collect()
provides the necessary partitioning, isolation, and merging of results for
safe and efficient parallel execution.

This implementation does not check for overflow of the count or the sum.

**Since:** 1.8

## LongSummaryStatistics.LongSummaryStatistics()

```java
public LongSummaryStatistics()
```

Constructs an empty instance with zero count, zero sum,
`Long.MAX_VALUE` min, `Long.MIN_VALUE` max and zero
average.

## LongSummaryStatistics.LongSummaryStatistics(long, long, long, long)

```java
public LongSummaryStatistics(long count, long min, long max, long sum) throws IllegalArgumentException
```

Constructs a non-empty instance with the specified `count`,
`min`, `max`, and `sum`.

If `count` is zero then the remaining arguments are ignored and
an empty instance is constructed.

If the arguments are inconsistent then an `IllegalArgumentException`
is thrown.  The necessary consistent argument conditions are:

- `count >= 0`

- `min <= max`

Parameters:

- `count`: the count of values
- `min`: the minimum value
- `max`: the maximum value
- `sum`: the sum of all values

**API note:** The enforcement of argument correctness means that the retrieved set of
recorded values obtained from a `LongSummaryStatistics` source
instance may not be a legal set of arguments for this constructor due to
arithmetic overflow of the source's recorded count of values.
The consistent argument conditions are not sufficient to prevent the
creation of an internally inconsistent instance.  An example of such a
state would be an instance with: `count` = 2, `min` = 1,
`max` = 2, and `sum` = 0.

**Since:** 10

Throws:

- `IllegalArgumentException`: if the arguments are inconsistent

## LongSummaryStatistics.accept(int)

```java
public void accept(int value)
```

Records a new `int` value into the summary information.

Parameters:

- `value`: the input value

## LongSummaryStatistics.accept(long)

```java
public void accept(long value)
```

Records a new `long` value into the summary information.

Parameters:

- `value`: the input value

## LongSummaryStatistics.combine(LongSummaryStatistics)

```java
public void combine(LongSummaryStatistics other)
```

Combines the state of another `LongSummaryStatistics` into this
one.

Parameters:

- `other`: another `LongSummaryStatistics`

Throws:

- `NullPointerException`: if `other` is null

## LongSummaryStatistics.getCount()

```java
public final long getCount()
```

Returns the count of values recorded.

**Returns:** the count of values

## LongSummaryStatistics.getSum()

```java
public final long getSum()
```

Returns the sum of values recorded, or zero if no values have been
recorded.

**Returns:** the sum of values, or zero if none

## LongSummaryStatistics.getMin()

```java
public final long getMin()
```

Returns the minimum value recorded, or `Long.MAX_VALUE` if no
values have been recorded.

**Returns:** the minimum value, or `Long.MAX_VALUE` if none

## LongSummaryStatistics.getMax()

```java
public final long getMax()
```

Returns the maximum value recorded, or `Long.MIN_VALUE` if no
values have been recorded

**Returns:** the maximum value, or `Long.MIN_VALUE` if none

## LongSummaryStatistics.getAverage()

```java
public final double getAverage()
```

Returns the arithmetic mean of values recorded, or zero if no values have been
recorded.

**Returns:** The arithmetic mean of values, or zero if none

## LongSummaryStatistics.toString()

```java
public String toString()
```

Returns a non-empty string representation of this object suitable for
debugging. The exact presentation format is unspecified and may vary
between implementations and versions.
