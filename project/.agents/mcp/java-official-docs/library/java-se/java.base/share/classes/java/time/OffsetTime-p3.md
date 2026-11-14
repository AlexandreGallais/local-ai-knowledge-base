---
title: "OffsetTime class (java.time) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/OffsetTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OffsetTime class (java.time) (part 3 of 3)

## OffsetTime.minusNanos(long)

```java
public OffsetTime minusNanos(long nanos)
```

Returns a copy of this `OffsetTime` with the specified number of nanoseconds subtracted.

This subtracts the specified number of nanoseconds from this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanos`: the nanos to subtract, may be negative

**Returns:** an `OffsetTime` based on this time with the nanoseconds subtracted, not null

## OffsetTime.query(TemporalQuery<R>)

```java
public <R> R query(TemporalQuery<R> query)
```

Queries this time using the specified query.

This queries this time using the specified query strategy object.
The `TemporalQuery` object defines the logic to be used to
obtain the result. Read the documentation of the query to understand
what the result of this method will be.

The result of this method is obtained by invoking the
`TemporalQuery.queryFrom(TemporalAccessor)` method on the
specified query passing `this` as the argument.

Parameters:

- `<R>`: the type of the result
- `query`: the query to invoke, not null

**Returns:** the query result, null may be returned (defined by the query)

Throws:

- `DateTimeException`: if unable to query (defined by the query)
- `ArithmeticException`: if numeric overflow occurs (defined by the query)

## OffsetTime.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have the same offset and time
as this object.

This returns a temporal object of the same observable type as the input
with the offset and time changed to be the same as this.

The adjustment is equivalent to using long)
twice, passing `ChronoField.NANO_OF_DAY` and
`ChronoField.OFFSET_SECONDS` as the fields.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisOffsetTime.adjustInto(temporal);
  temporal = temporal.with(thisOffsetTime);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## OffsetTime.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another time in terms of the specified unit.

This calculates the amount of time between two `OffsetTime`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified time.
The result will be negative if the end is before the start.
For example, the amount in hours between two times can be calculated
using `startTime.until(endTime, HOURS)`.

The `Temporal` passed to this method is converted to a
`OffsetTime` using `from(TemporalAccessor)`.
If the offset differs between the two times, then the specified
end time is normalized to have the same offset as this time.

The calculation returns a whole number, representing the number of
complete units between the two times.
For example, the amount in hours between 11:30Z and 13:29Z will only
be one hour as it is one minute short of two hours.

There are two equivalent ways of using this method.
The first is to invoke this method.
The second is to use Temporal):

```java
  // these two lines are equivalent
  amount = start.until(end, MINUTES);
  amount = MINUTES.between(start, end);
```

The choice should be made based on which makes the code more readable.

The calculation is implemented in this method for `ChronoUnit`.
The units `NANOS`, `MICROS`, `MILLIS`, `SECONDS`,
`MINUTES`, `HOURS` and `HALF_DAYS` are supported.
Other `ChronoUnit` values will throw an exception.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
passing `this` as the first argument and the converted input temporal
as the second argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end time, exclusive, which is converted to an `OffsetTime`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this time and the end time

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to an `OffsetTime`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## OffsetTime.format(DateTimeFormatter)

```java
public String format(DateTimeFormatter formatter)
```

Formats this time using the specified formatter.

This time will be passed to the formatter to produce a string.

Parameters:

- `formatter`: the formatter to use, not null

**Returns:** the formatted time string, not null

Throws:

- `DateTimeException`: if an error occurs during printing

## OffsetTime.atDate(LocalDate)

```java
public OffsetDateTime atDate(LocalDate date)
```

Combines this time with a date to create an `OffsetDateTime`.

This returns an `OffsetDateTime` formed from this time and the specified date.
All possible combinations of date and time are valid.

Parameters:

- `date`: the date to combine with, not null

**Returns:** the offset date-time formed from this time and the specified date, not null

## OffsetTime.toEpochSecond(LocalDate)

```java
public long toEpochSecond(LocalDate date)
```

Converts this `OffsetTime` to the number of seconds since the epoch
of 1970-01-01T00:00:00Z.

This combines this offset time with the specified date to calculate the
epoch-second value, which is the number of elapsed seconds from
1970-01-01T00:00:00Z.
Instants on the time-line after the epoch are positive, earlier
are negative.

Parameters:

- `date`: the localdate, not null

**Returns:** the number of seconds since the epoch of 1970-01-01T00:00:00Z, may be negative

**Since:** 9

## OffsetTime.compareTo(OffsetTime)

```java
public int compareTo(OffsetTime other)
```

Compares this `OffsetTime` to another time.

The comparison is based first on the UTC equivalent instant, then on the local time.
It is "consistent with equals", as defined by `Comparable`.

For example, the following is the comparator order:

- `10:30+01:00`

- `11:00+01:00`

- `12:00+02:00`

- `11:30+01:00`

- `12:00+01:00`

- `12:30+01:00`

Values #2 and #3 represent the same instant on the time-line.
When two values represent the same instant, the local time is compared
to distinguish them. This step is needed to make the ordering
consistent with `equals()`.

To compare the underlying local time of two `TemporalAccessor` instances,
use `ChronoField.NANO_OF_DAY` as a comparator.

Parameters:

- `other`: the other time to compare to, not null

**Returns:** the comparator value, that is the comparison of the UTC equivalent `other` instant,
         if they are not equal, and if the UTC equivalent `other` instant is equal,
         the comparison of this local time with `other` local time

**See also:** #isBefore

**See also:** #isAfter

## OffsetTime.isAfter(OffsetTime)

```java
public boolean isAfter(OffsetTime other)
```

Checks if the instant of this `OffsetTime` is after that of the
specified time applying both times to a common date.

This method differs from the comparison in `compareTo` in that it
only compares the instant of the time. This is equivalent to converting both
times to an instant using the same date and comparing the instants.

Parameters:

- `other`: the other time to compare to, not null

**Returns:** true if this is after the instant of the specified time

## OffsetTime.isBefore(OffsetTime)

```java
public boolean isBefore(OffsetTime other)
```

Checks if the instant of this `OffsetTime` is before that of the
specified time applying both times to a common date.

This method differs from the comparison in `compareTo` in that it
only compares the instant of the time. This is equivalent to converting both
times to an instant using the same date and comparing the instants.

Parameters:

- `other`: the other time to compare to, not null

**Returns:** true if this is before the instant of the specified time

## OffsetTime.isEqual(OffsetTime)

```java
public boolean isEqual(OffsetTime other)
```

Checks if the instant of this `OffsetTime` is equal to that of the
specified time applying both times to a common date.

This method differs from the comparison in `compareTo` and `equals`
in that it only compares the instant of the time. This is equivalent to converting both
times to an instant using the same date and comparing the instants.

Parameters:

- `other`: the other time to compare to, not null

**Returns:** true if this is equal to the instant of the specified time

## OffsetTime.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this time is equal to another time.

The comparison is based on the local-time and the offset.
To compare for the same instant on the time-line, use `isEqual(OffsetTime)`.

Only objects of type `OffsetTime` are compared, other types return false.
To compare the underlying local time of two `TemporalAccessor` instances,
use `ChronoField.NANO_OF_DAY` as a comparator.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other time

## OffsetTime.hashCode()

```java
public int hashCode()
```

A hash code for this time.

**Returns:** a suitable hash code

## OffsetTime.toString()

```java
public String toString()
```

Outputs this time as a `String`, such as `10:15:30+01:00`.

The output will be one of the following ISO-8601 formats:

- `HH:mmXXXXX`

- `HH:mm:ssXXXXX`

- `HH:mm:ss.SSSXXXXX`

- `HH:mm:ss.SSSSSSXXXXX`

- `HH:mm:ss.SSSSSSSSSXXXXX`

The format used will be the shortest that outputs the full value of
the time where the omitted parts are implied to be zero.

**Returns:** a string representation of this time, not null
