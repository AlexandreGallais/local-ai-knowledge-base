---
title: "OffsetDateTime class (java.time) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/OffsetDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OffsetDateTime class (java.time) (part 4 of 4)

## OffsetDateTime.minusDays(long)

```java
public OffsetDateTime minusDays(long days)
```

Returns a copy of this `OffsetDateTime` with the specified number of days subtracted.

This method subtracts the specified amount from the days field decrementing the
month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2009-01-01 minus one day would result in 2008-12-31.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to subtract, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the days subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.minusHours(long)

```java
public OffsetDateTime minusHours(long hours)
```

Returns a copy of this `OffsetDateTime` with the specified number of hours subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `hours`: the hours to subtract, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the hours subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.minusMinutes(long)

```java
public OffsetDateTime minusMinutes(long minutes)
```

Returns a copy of this `OffsetDateTime` with the specified number of minutes subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutes`: the minutes to subtract, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the minutes subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.minusSeconds(long)

```java
public OffsetDateTime minusSeconds(long seconds)
```

Returns a copy of this `OffsetDateTime` with the specified number of seconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to subtract, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the seconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.minusNanos(long)

```java
public OffsetDateTime minusNanos(long nanos)
```

Returns a copy of this `OffsetDateTime` with the specified number of nanoseconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanos`: the nanos to subtract, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the nanoseconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.query(TemporalQuery<R>)

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

## OffsetDateTime.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have the same offset, date
and time as this object.

This returns a temporal object of the same observable type as the input
with the offset, date and time changed to be the same as this.

The adjustment is equivalent to using long)
three times, passing `ChronoField.EPOCH_DAY`,
`ChronoField.NANO_OF_DAY` and `ChronoField.OFFSET_SECONDS` as the fields.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisOffsetDateTime.adjustInto(temporal);
  temporal = temporal.with(thisOffsetDateTime);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## OffsetDateTime.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another date-time in terms of the specified unit.

This calculates the amount of time between two `OffsetDateTime`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified date-time.
The result will be negative if the end is before the start.
For example, the amount in days between two date-times can be calculated
using `startDateTime.until(endDateTime, DAYS)`.

The `Temporal` passed to this method is converted to a
`OffsetDateTime` using `from(TemporalAccessor)`.
If the offset differs between the two date-times, the specified
end date-time is normalized to have the same offset as this date-time.

The calculation returns a whole number, representing the number of
complete units between the two date-times.
For example, the amount in months between 2012-06-15T00:00Z and 2012-08-14T23:59Z
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

- `endExclusive`: the end date, exclusive, which is converted to an `OffsetDateTime`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this date-time and the end date-time

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to an `OffsetDateTime`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## OffsetDateTime.format(DateTimeFormatter)

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

## OffsetDateTime.atZoneSameInstant(ZoneId)

```java
public ZonedDateTime atZoneSameInstant(ZoneId zone)
```

Combines this date-time with a time-zone to create a `ZonedDateTime`
ensuring that the result has the same instant.

This returns a `ZonedDateTime` formed from this date-time and the specified time-zone.
This conversion will ignore the visible local date-time and use the underlying instant instead.
This avoids any problems with local time-line gaps or overlaps.
The result might have different values for fields such as hour, minute an even day.

To attempt to retain the values of the fields, use `atZoneSimilarLocal(ZoneId)`.
To use the offset as the zone ID, use `toZonedDateTime()`.

Parameters:

- `zone`: the time-zone to use, not null

**Returns:** the zoned date-time formed from this date-time, not null

## OffsetDateTime.atZoneSimilarLocal(ZoneId)

```java
public ZonedDateTime atZoneSimilarLocal(ZoneId zone)
```

Combines this date-time with a time-zone to create a `ZonedDateTime`
trying to keep the same local date and time.

This returns a `ZonedDateTime` formed from this date-time and the specified time-zone.
Where possible, the result will have the same local date-time as this object.

Time-zone rules, such as daylight savings, mean that not every time on the
local time-line exists. If the local date-time is in a gap or overlap according to
the rules then a resolver is used to determine the resultant local time and offset.
This method uses ZoneId, ZoneOffset)
to retain the offset from this instance if possible.

Finer control over gaps and overlaps is available in two ways.
If you simply want to use the later offset at overlaps then call
`ZonedDateTime.withLaterOffsetAtOverlap()` immediately after this method.

To create a zoned date-time at the same instant irrespective of the local time-line,
use `atZoneSameInstant(ZoneId)`.
To use the offset as the zone ID, use `toZonedDateTime()`.

Parameters:

- `zone`: the time-zone to use, not null

**Returns:** the zoned date-time formed from this date and the earliest valid time for the zone, not null

## OffsetDateTime.toOffsetTime()

```java
public OffsetTime toOffsetTime()
```

Converts this date-time to an `OffsetTime`.

This returns an offset time with the same local time and offset.

**Returns:** an OffsetTime representing the time and offset, not null

## OffsetDateTime.toZonedDateTime()

```java
public ZonedDateTime toZonedDateTime()
```

Converts this date-time to a `ZonedDateTime` using the offset as the zone ID.

This creates the simplest possible `ZonedDateTime` using the offset
as the zone ID.

To control the time-zone used, see `atZoneSameInstant(ZoneId)` and
`atZoneSimilarLocal(ZoneId)`.

**Returns:** a zoned date-time representing the same local date-time and offset, not null

## OffsetDateTime.toInstant()

```java
public Instant toInstant()
```

Converts this date-time to an `Instant`.

This returns an `Instant` representing the same point on the
time-line as this date-time.

**Returns:** an `Instant` representing the same instant, not null

## OffsetDateTime.toEpochSecond()

```java
public long toEpochSecond()
```

Converts this date-time to the number of seconds from the epoch of 1970-01-01T00:00:00Z.

This allows this date-time to be converted to a value of the
epoch-seconds field. This is primarily
intended for low-level conversions rather than general application usage.

**Returns:** the number of seconds from the epoch of 1970-01-01T00:00:00Z

## OffsetDateTime.compareTo(OffsetDateTime)

```java
public int compareTo(OffsetDateTime other)
```

Compares this date-time to another date-time.

The comparison is based on the instant then on the local date-time.
It is "consistent with equals", as defined by `Comparable`.

For example, the following is the comparator order:

- `2008-12-03T10:30+01:00`

- `2008-12-03T11:00+01:00`

- `2008-12-03T12:00+02:00`

- `2008-12-03T11:30+01:00`

- `2008-12-03T12:00+01:00`

- `2008-12-03T12:30+01:00`

Values #2 and #3 represent the same instant on the time-line.
When two values represent the same instant, the local date-time is compared
to distinguish them. This step is needed to make the ordering
consistent with `equals()`.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** the comparator value, that is the comparison with the `other`'s instant, if they are not equal;
         and if equal to the `other`'s instant, the comparison of the `other`'s local date-time

**See also:** #isBefore

**See also:** #isAfter

## OffsetDateTime.isAfter(OffsetDateTime)

```java
public boolean isAfter(OffsetDateTime other)
```

Checks if the instant of this date-time is after that of the specified date-time.

This method differs from the comparison in `compareTo` and `equals` in that it
only compares the instant of the date-time. This is equivalent to using
`dateTime1.toInstant().isAfter(dateTime2.toInstant());`.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this is after the instant of the specified date-time

## OffsetDateTime.isBefore(OffsetDateTime)

```java
public boolean isBefore(OffsetDateTime other)
```

Checks if the instant of this date-time is before that of the specified date-time.

This method differs from the comparison in `compareTo` in that it
only compares the instant of the date-time. This is equivalent to using
`dateTime1.toInstant().isBefore(dateTime2.toInstant());`.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this is before the instant of the specified date-time

## OffsetDateTime.isEqual(OffsetDateTime)

```java
public boolean isEqual(OffsetDateTime other)
```

Checks if the instant of this date-time is equal to that of the specified date-time.

This method differs from the comparison in `compareTo` and `equals`
in that it only compares the instant of the date-time. This is equivalent to using
`dateTime1.toInstant().equals(dateTime2.toInstant());`.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if the instant equals the instant of the specified date-time

## OffsetDateTime.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this date-time is equal to another date-time.

The comparison is based on the local date-time and the offset.
To compare for the same instant on the time-line, use `isEqual`.
Only objects of type `OffsetDateTime` are compared, other types return false.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date-time

## OffsetDateTime.hashCode()

```java
public int hashCode()
```

A hash code for this date-time.

**Returns:** a suitable hash code

## OffsetDateTime.toString()

```java
public String toString()
```

Outputs this date-time as a `String`, such as `2007-12-03T10:15:30+01:00`.

The output will be one of the following formats:

- `uuuu-MM-dd'T'HH:mmXXXXX`

- `uuuu-MM-dd'T'HH:mm:ssXXXXX`

- `uuuu-MM-dd'T'HH:mm:ss.SSSXXXXX`

- `uuuu-MM-dd'T'HH:mm:ss.SSSSSSXXXXX`

- `uuuu-MM-dd'T'HH:mm:ss.SSSSSSSSSXXXXX`

The format used will be the shortest that outputs the full value of
the time where the omitted parts are implied to be zero. The output
is compatible with ISO 8601 if the seconds in the offset are zero.

**Returns:** a string representation of this date-time, not null
