---
title: "LocalDateTime class (java.time) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalDateTime class (java.time) (part 4 of 4)

## LocalDateTime.minusWeeks(long)

```java
public LocalDateTime minusWeeks(long weeks)
```

Returns a copy of this `LocalDateTime` with the specified number of weeks subtracted.

This method subtracts the specified amount in weeks from the days field decrementing
the month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2009-01-07 minus one week would result in 2008-12-31.

This instance is immutable and unaffected by this method call.

Parameters:

- `weeks`: the weeks to subtract, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the weeks subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.minusDays(long)

```java
public LocalDateTime minusDays(long days)
```

Returns a copy of this `LocalDateTime` with the specified number of days subtracted.

This method subtracts the specified amount from the days field decrementing the
month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2009-01-01 minus one day would result in 2008-12-31.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to subtract, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the days subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.minusHours(long)

```java
public LocalDateTime minusHours(long hours)
```

Returns a copy of this `LocalDateTime` with the specified number of hours subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `hours`: the hours to subtract, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the hours subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.minusMinutes(long)

```java
public LocalDateTime minusMinutes(long minutes)
```

Returns a copy of this `LocalDateTime` with the specified number of minutes subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutes`: the minutes to subtract, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the minutes subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.minusSeconds(long)

```java
public LocalDateTime minusSeconds(long seconds)
```

Returns a copy of this `LocalDateTime` with the specified number of seconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to subtract, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the seconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.minusNanos(long)

```java
public LocalDateTime minusNanos(long nanos)
```

Returns a copy of this `LocalDateTime` with the specified number of nanoseconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanos`: the nanos to subtract, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the nanoseconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.query(TemporalQuery<R>)

```java
public <R> R query(TemporalQuery<R> query)
```

Queries this date-time using the specified query.

This queries this date-time using the specified query strategy object.
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

## LocalDateTime.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have the same date and time as this object.

This returns a temporal object of the same observable type as the input
with the date and time changed to be the same as this.

The adjustment is equivalent to using long)
twice, passing `ChronoField.EPOCH_DAY` and
`ChronoField.NANO_OF_DAY` as the fields.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisLocalDateTime.adjustInto(temporal);
  temporal = temporal.with(thisLocalDateTime);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## LocalDateTime.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another date-time in terms of the specified unit.

This calculates the amount of time between two `LocalDateTime`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified date-time.
The result will be negative if the end is before the start.
The `Temporal` passed to this method is converted to a
`LocalDateTime` using `from(TemporalAccessor)`.
For example, the amount in days between two date-times can be calculated
using `startDateTime.until(endDateTime, DAYS)`.

The calculation returns a whole number, representing the number of
complete units between the two date-times.
For example, the amount in months between 2012-06-15T00:00 and 2012-08-14T23:59
will only be one month as it is one minute short of two months.

There are two equivalent ways of using this method.
The first is to invoke this method.
The second is to use Temporal):

```java
  // these two lines are equivalent
  amount = start.until(end, MONTHS);
  amount = MONTHS.between(start, end);
```

The choice should be made based on which makes the code more readable.

The calculation is implemented in this method for `ChronoUnit`.
The units `NANOS`, `MICROS`, `MILLIS`, `SECONDS`,
`MINUTES`, `HOURS` and `HALF_DAYS`, `DAYS`,
`WEEKS`, `MONTHS`, `YEARS`, `DECADES`,
`CENTURIES`, `MILLENNIA` and `ERAS` are supported.
Other `ChronoUnit` values will throw an exception.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
passing `this` as the first argument and the converted input temporal
as the second argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end date, exclusive, which is converted to a `LocalDateTime`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this date-time and the end date-time

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to a `LocalDateTime`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDateTime.format(DateTimeFormatter)

```java
public String format(DateTimeFormatter formatter)
```

Formats this date-time using the specified formatter.

This date-time will be passed to the formatter to produce a string.

Parameters:

- `formatter`: the formatter to use, not null

**Returns:** the formatted date-time string, not null

Throws:

- `DateTimeException`: if an error occurs during printing

## LocalDateTime.atOffset(ZoneOffset)

```java
public OffsetDateTime atOffset(ZoneOffset offset)
```

Combines this date-time with an offset to create an `OffsetDateTime`.

This returns an `OffsetDateTime` formed from this date-time at the specified offset.
All possible combinations of date-time and offset are valid.

Parameters:

- `offset`: the offset to combine with, not null

**Returns:** the offset date-time formed from this date-time and the specified offset, not null

## LocalDateTime.atZone(ZoneId)

```java
public ZonedDateTime atZone(ZoneId zone)
```

Combines this date-time with a time-zone to create a `ZonedDateTime`.

This returns a `ZonedDateTime` formed from this date-time at the
specified time-zone. The result will match this date-time as closely as possible.
Time-zone rules, such as daylight savings, mean that not every local date-time
is valid for the specified zone, thus the local date-time may be adjusted.

The local date-time is resolved to a single instant on the time-line.
This is achieved by finding a valid offset from UTC/Greenwich for the local
date-time as defined by the rules of the zone ID.

In most cases, there is only one valid offset for a local date-time.
In the case of an overlap, where clocks are set back, there are two valid offsets.
This method uses the earlier offset typically corresponding to "summer".

In the case of a gap, where clocks jump forward, there is no valid offset.
Instead, the local date-time is adjusted to be later by the length of the gap.
For a typical one hour daylight savings change, the local date-time will be
moved one hour later into the offset typically corresponding to "summer".

To obtain the later offset during an overlap, call
`ZonedDateTime.withLaterOffsetAtOverlap()` on the result of this method.
To throw an exception when there is a gap or overlap, use
ZoneOffset, ZoneId).

Parameters:

- `zone`: the time-zone to use, not null

**Returns:** the zoned date-time formed from this date-time, not null

## LocalDateTime.compareTo(ChronoLocalDateTime<?>)

```java
public int compareTo(ChronoLocalDateTime<?> other)
```

Compares this date-time to another date-time.

The comparison is primarily based on the date-time, from earliest to latest.
It is "consistent with equals", as defined by `Comparable`.

If all the date-times being compared are instances of `LocalDateTime`,
then the comparison will be entirely based on the date-time.
If some dates being compared are in different chronologies, then the
chronology is also considered, see `ChronoLocalDateTime.compareTo`.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** the comparator value, that is the comparison of this local date-time with
         the `other` local date-time and this chronology with the `other` chronology,
         in order, returning the first non-zero result, and otherwise returning zero

**See also:** #isBefore

**See also:** #isAfter

## LocalDateTime.isAfter(ChronoLocalDateTime<?>)

```java
public boolean isAfter(ChronoLocalDateTime<?> other)
```

Checks if this date-time is after the specified date-time.

This checks to see if this date-time represents a point on the
local time-line after the other date-time.

```java
  LocalDate a = LocalDateTime.of(2012, 6, 30, 12, 00);
  LocalDate b = LocalDateTime.of(2012, 7, 1, 12, 00);
  a.isAfter(b) == false
  a.isAfter(a) == false
  b.isAfter(a) == true
```

This method only considers the position of the two date-times on the local time-line.
It does not take into account the chronology, or calendar system.
This is different from the comparison in `compareTo(ChronoLocalDateTime)`,
but is the same approach as `ChronoLocalDateTime.timeLineOrder()`.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this date-time is after the specified date-time

## LocalDateTime.isBefore(ChronoLocalDateTime<?>)

```java
public boolean isBefore(ChronoLocalDateTime<?> other)
```

Checks if this date-time is before the specified date-time.

This checks to see if this date-time represents a point on the
local time-line before the other date-time.

```java
  LocalDate a = LocalDateTime.of(2012, 6, 30, 12, 00);
  LocalDate b = LocalDateTime.of(2012, 7, 1, 12, 00);
  a.isBefore(b) == true
  a.isBefore(a) == false
  b.isBefore(a) == false
```

This method only considers the position of the two date-times on the local time-line.
It does not take into account the chronology, or calendar system.
This is different from the comparison in `compareTo(ChronoLocalDateTime)`,
but is the same approach as `ChronoLocalDateTime.timeLineOrder()`.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this date-time is before the specified date-time

## LocalDateTime.isEqual(ChronoLocalDateTime<?>)

```java
public boolean isEqual(ChronoLocalDateTime<?> other)
```

Checks if this date-time is equal to the specified date-time.

This checks to see if this date-time represents the same point on the
local time-line as the other date-time.

```java
  LocalDate a = LocalDateTime.of(2012, 6, 30, 12, 00);
  LocalDate b = LocalDateTime.of(2012, 7, 1, 12, 00);
  a.isEqual(b) == false
  a.isEqual(a) == true
  b.isEqual(a) == false
```

This method only considers the position of the two date-times on the local time-line.
It does not take into account the chronology, or calendar system.
This is different from the comparison in `compareTo(ChronoLocalDateTime)`,
but is the same approach as `ChronoLocalDateTime.timeLineOrder()`.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this date-time is equal to the specified date-time

## LocalDateTime.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this date-time is equal to another date-time.

Compares this `LocalDateTime` with another ensuring that the date-time is the same.
Only objects of type `LocalDateTime` are compared, other types return false.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date-time

## LocalDateTime.hashCode()

```java
public int hashCode()
```

A hash code for this date-time.

**Returns:** a suitable hash code

## LocalDateTime.toString()

```java
public String toString()
```

Outputs this date-time as a `String`, such as `2007-12-03T10:15:30`.

The output will be one of the following ISO-8601 formats:

- `uuuu-MM-dd'T'HH:mm`

- `uuuu-MM-dd'T'HH:mm:ss`

- `uuuu-MM-dd'T'HH:mm:ss.SSS`

- `uuuu-MM-dd'T'HH:mm:ss.SSSSSS`

- `uuuu-MM-dd'T'HH:mm:ss.SSSSSSSSS`

The format used will be the shortest that outputs the full value of
the time where the omitted parts are implied to be zero.

**Returns:** a string representation of this date-time, not null
