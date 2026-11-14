---
title: "IntSummaryStatistics class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/IntSummaryStatistics.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IntSummaryStatistics class (java.util)

```java
public class IntSummaryStatistics implements IntConsumer
```

A state object for collecting statistics such as count, min, max, sum, and
average.

This class is designed to work with (though does not require)
streams. For example, you can compute
summary statistics on a stream of ints with:

```java
IntSummaryStatistics stats = intStream.collect(IntSummaryStatistics::new,
                                               IntSummaryStatistics::accept,
                                               IntSummaryStatistics::combine);
```

`IntSummaryStatistics` can be used as a
reduction
target for a stream. For example:

```java
IntSummaryStatistics stats = people.stream()
                                   .collect(Collectors.summarizingInt(Person::getDependents));
```

This computes, in a single pass, the count of people, as well as the minimum,
maximum, sum, and average of their number of dependents.

**Implementation note:** This implementation is not thread safe. However, it is safe to use
Collectors.summarizingInt() on a parallel stream, because the parallel
implementation of Stream.collect()
provides the necessary partitioning, isolation, and merging of results for
safe and efficient parallel execution.

This implementation does not check for overflow of the count or the sum.

**Since:** 1.8

## IntSummaryStatistics.IntSummaryStatistics()

```java
public IntSummaryStatistics()
```

Constructs an empty instance with zero count, zero sum,
`Integer.MAX_VALUE` min, `Integer.MIN_VALUE` max and zero
average.

## IntSummaryStatistics.IntSummaryStatistics(long, int, int, long)

```java
public IntSummaryStatistics(long count, int min, int max, long sum) throws IllegalArgumentException
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
recorded values obtained from a `IntSummaryStatistics` source
instance may not be a legal set of arguments for this constructor due to
arithmetic overflow of the source's recorded count of values.
The consistent argument conditions are not sufficient to prevent the
creation of an internally inconsistent instance.  An example of such a
state would be an instance with: `count` = 2, `min` = 1,
`max` = 2, and `sum` = 0.

**Since:** 10

Throws:

- `IllegalArgumentException`: if the arguments are inconsistent

## IntSummaryStatistics.accept(int)

```java
public void accept(int value)
```

Records a new value into the summary information

Parameters:

- `value`: the input value

## IntSummaryStatistics.combine(IntSummaryStatistics)

```java
public void combine(IntSummaryStatistics other)
```

Combines the state of another `IntSummaryStatistics` into this one.

Parameters:

- `other`: another `IntSummaryStatistics`

Throws:

- `NullPointerException`: if `other` is null

## IntSummaryStatistics.getCount()

```java
public final long getCount()
```

Returns the count of values recorded.

**Returns:** the count of values

## IntSummaryStatistics.getSum()

```java
public final long getSum()
```

Returns the sum of values recorded, or zero if no values have been
recorded.

**Returns:** the sum of values, or zero if none

## IntSummaryStatistics.getMin()

```java
public final int getMin()
```

Returns the minimum value recorded, or `Integer.MAX_VALUE` if no
values have been recorded.

**Returns:** the minimum value, or `Integer.MAX_VALUE` if none

## IntSummaryStatistics.getMax()

```java
public final int getMax()
```

Returns the maximum value recorded, or `Integer.MIN_VALUE` if no
values have been recorded.

**Returns:** the maximum value, or `Integer.MIN_VALUE` if none

## IntSummaryStatistics.getAverage()

```java
public final double getAverage()
```

Returns the arithmetic mean of values recorded, or zero if no values have been
recorded.

**Returns:** the arithmetic mean of values, or zero if none

## IntSummaryStatistics.toString()

```java
public String toString()
```

Returns a non-empty string representation of this object suitable for
debugging. The exact presentation format is unspecified and may vary
between implementations and versions.
