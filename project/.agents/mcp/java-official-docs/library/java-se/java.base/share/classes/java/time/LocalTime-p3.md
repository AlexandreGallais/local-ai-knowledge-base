---
title: "LocalTime class (java.time) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalTime class (java.time) (part 3 of 3)

## LocalTime.minusHours(long)

```java
public LocalTime minusHours(long hoursToSubtract)
```

Returns a copy of this `LocalTime` with the specified number of hours subtracted.

This subtracts the specified number of hours from this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `hoursToSubtract`: the hours to subtract, may be negative

**Returns:** a `LocalTime` based on this time with the hours subtracted, not null

## LocalTime.minusMinutes(long)

```java
public LocalTime minusMinutes(long minutesToSubtract)
```

Returns a copy of this `LocalTime` with the specified number of minutes subtracted.

This subtracts the specified number of minutes from this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutesToSubtract`: the minutes to subtract, may be negative

**Returns:** a `LocalTime` based on this time with the minutes subtracted, not null

## LocalTime.minusSeconds(long)

```java
public LocalTime minusSeconds(long secondsToSubtract)
```

Returns a copy of this `LocalTime` with the specified number of seconds subtracted.

This subtracts the specified number of seconds from this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `secondsToSubtract`: the seconds to subtract, may be negative

**Returns:** a `LocalTime` based on this time with the seconds subtracted, not null

## LocalTime.minusNanos(long)

```java
public LocalTime minusNanos(long nanosToSubtract)
```

Returns a copy of this `LocalTime` with the specified number of nanoseconds subtracted.

This subtracts the specified number of nanoseconds from this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanosToSubtract`: the nanos to subtract, may be negative

**Returns:** a `LocalTime` based on this time with the nanoseconds subtracted, not null

## LocalTime.query(TemporalQuery<R>)

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

## LocalTime.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have the same time as this object.

This returns a temporal object of the same observable type as the input
with the time changed to be the same as this.

The adjustment is equivalent to using long)
passing `ChronoField.NANO_OF_DAY` as the field.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisLocalTime.adjustInto(temporal);
  temporal = temporal.with(thisLocalTime);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## LocalTime.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another time in terms of the specified unit.

This calculates the amount of time between two `LocalTime`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified time.
The result will be negative if the end is before the start.
The `Temporal` passed to this method is converted to a
`LocalTime` using `from(TemporalAccessor)`.
For example, the amount in hours between two times can be calculated
using `startTime.until(endTime, HOURS)`.

The calculation returns a whole number, representing the number of
complete units between the two times.
For example, the amount in hours between 11:30 and 13:29 will only
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

- `endExclusive`: the end time, exclusive, which is converted to a `LocalTime`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this time and the end time

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to a `LocalTime`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalTime.format(DateTimeFormatter)

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

## LocalTime.atDate(LocalDate)

```java
public LocalDateTime atDate(LocalDate date)
```

Combines this time with a date to create a `LocalDateTime`.

This returns a `LocalDateTime` formed from this time at the specified date.
All possible combinations of date and time are valid.

Parameters:

- `date`: the date to combine with, not null

**Returns:** the local date-time formed from this time and the specified date, not null

## LocalTime.atOffset(ZoneOffset)

```java
public OffsetTime atOffset(ZoneOffset offset)
```

Combines this time with an offset to create an `OffsetTime`.

This returns an `OffsetTime` formed from this time at the specified offset.
All possible combinations of time and offset are valid.

Parameters:

- `offset`: the offset to combine with, not null

**Returns:** the offset time formed from this time and the specified offset, not null

## LocalTime.toSecondOfDay()

```java
public int toSecondOfDay()
```

Extracts the time as seconds of day,
from `0` to `24 * 60 * 60 - 1`.

**Returns:** the second-of-day equivalent to this time

## LocalTime.toNanoOfDay()

```java
public long toNanoOfDay()
```

Extracts the time as nanos of day,
from `0` to `24 * 60 * 60 * 1,000,000,000 - 1`.

**Returns:** the nano of day equivalent to this time

## LocalTime.toEpochSecond(LocalDate, ZoneOffset)

```java
public long toEpochSecond(LocalDate date, ZoneOffset offset)
```

Converts this `LocalTime` to the number of seconds since the epoch
of 1970-01-01T00:00:00Z.

This combines this local time with the specified date and
offset to calculate the epoch-second value, which is the
number of elapsed seconds from 1970-01-01T00:00:00Z.
Instants on the time-line after the epoch are positive, earlier
are negative.

Parameters:

- `date`: the local date, not null
- `offset`: the zone offset, not null

**Returns:** the number of seconds since the epoch of 1970-01-01T00:00:00Z, may be negative

**Since:** 9

## LocalTime.compareTo(LocalTime)

```java
public int compareTo(LocalTime other)
```

Compares this time to another time.

The comparison is based on the time-line position of the local times within a day.
It is "consistent with equals", as defined by `Comparable`.

Parameters:

- `other`: the other time to compare to, not null

**Returns:** the comparator value, that is less than zero if this is before `other`,
         zero if they are equal, or greater than zero if this is after `other`

**See also:** #isBefore

**See also:** #isAfter

## LocalTime.isAfter(LocalTime)

```java
public boolean isAfter(LocalTime other)
```

Checks if this time is after the specified time.

The comparison is based on the time-line position of the time within a day.

Parameters:

- `other`: the other time to compare to, not null

**Returns:** true if this is after the specified time

## LocalTime.isBefore(LocalTime)

```java
public boolean isBefore(LocalTime other)
```

Checks if this time is before the specified time.

The comparison is based on the time-line position of the time within a day.

Parameters:

- `other`: the other time to compare to, not null

**Returns:** true if this point is before the specified time

## LocalTime.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this time is equal to another time.

The comparison is based on the time-line position of the time within a day.

Only objects of type `LocalTime` are compared, other types return false.
To compare the date of two `TemporalAccessor` instances, use
`ChronoField.NANO_OF_DAY` as a comparator.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other time

## LocalTime.hashCode()

```java
public int hashCode()
```

A hash code for this time.

**Returns:** a suitable hash code

## LocalTime.toString()

```java
public String toString()
```

Outputs this time as a `String`, such as `10:15`.

The output will be one of the following ISO-8601 formats:

- `HH:mm`

- `HH:mm:ss`

- `HH:mm:ss.SSS`

- `HH:mm:ss.SSSSSS`

- `HH:mm:ss.SSSSSSSSS`

The format used will be the shortest that outputs the full value of
the time where the omitted parts are implied to be zero.

**Returns:** a string representation of this time, not null
