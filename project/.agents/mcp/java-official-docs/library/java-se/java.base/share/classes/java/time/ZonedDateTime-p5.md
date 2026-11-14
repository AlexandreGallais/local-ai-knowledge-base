---
title: "ZonedDateTime class (java.time) (part 5 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/ZonedDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZonedDateTime class (java.time) (part 5 of 5)

## ZonedDateTime.minusMonths(long)

```java
public ZonedDateTime minusMonths(long months)
```

Returns a copy of this `ZonedDateTime` with the specified number of months subtracted.

This operates on the local time-line,
subtracting months to the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `months`: the months to subtract, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the months subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.minusWeeks(long)

```java
public ZonedDateTime minusWeeks(long weeks)
```

Returns a copy of this `ZonedDateTime` with the specified number of weeks subtracted.

This operates on the local time-line,
subtracting weeks to the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `weeks`: the weeks to subtract, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the weeks subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.minusDays(long)

```java
public ZonedDateTime minusDays(long days)
```

Returns a copy of this `ZonedDateTime` with the specified number of days subtracted.

This operates on the local time-line,
subtracting days to the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to subtract, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the days subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.minusHours(long)

```java
public ZonedDateTime minusHours(long hours)
```

Returns a copy of this `ZonedDateTime` with the specified number of hours subtracted.

This operates on the instant time-line, such that subtracting one hour will
always be a duration of one hour earlier.
This may cause the local date-time to change by an amount other than one hour.
Note that this is a different approach to that used by days, months and years,
thus subtracting one day is not the same as adding 24 hours.

For example, consider a time-zone, such as 'Europe/Paris', where the
Autumn DST cutover means that the local times 02:00 to 02:59 occur twice
changing from offset +02:00 in summer to +01:00 in winter.

- Subtracting one hour from 03:30+01:00 will result in 02:30+01:00
    (both in winter time)

- Subtracting one hour from 02:30+01:00 will result in 02:30+02:00
    (moving from winter to summer time)

- Subtracting one hour from 02:30+02:00 will result in 01:30+02:00
    (both in summer time)

- Subtracting three hours from 03:30+01:00 will result in 01:30+02:00
    (moving from winter to summer time)

This instance is immutable and unaffected by this method call.

Parameters:

- `hours`: the hours to subtract, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the hours subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.minusMinutes(long)

```java
public ZonedDateTime minusMinutes(long minutes)
```

Returns a copy of this `ZonedDateTime` with the specified number of minutes subtracted.

This operates on the instant time-line, such that subtracting one minute will
always be a duration of one minute earlier.
This may cause the local date-time to change by an amount other than one minute.
Note that this is a different approach to that used by days, months and years.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutes`: the minutes to subtract, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the minutes subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.minusSeconds(long)

```java
public ZonedDateTime minusSeconds(long seconds)
```

Returns a copy of this `ZonedDateTime` with the specified number of seconds subtracted.

This operates on the instant time-line, such that subtracting one second will
always be a duration of one second earlier.
This may cause the local date-time to change by an amount other than one second.
Note that this is a different approach to that used by days, months and years.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to subtract, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the seconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.minusNanos(long)

```java
public ZonedDateTime minusNanos(long nanos)
```

Returns a copy of this `ZonedDateTime` with the specified number of nanoseconds subtracted.

This operates on the instant time-line, such that subtracting one nano will
always be a duration of one nano earlier.
This may cause the local date-time to change by an amount other than one nano.
Note that this is a different approach to that used by days, months and years.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanos`: the nanos to subtract, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the nanoseconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.query(TemporalQuery<R>)

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

## ZonedDateTime.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another date-time in terms of the specified unit.

This calculates the amount of time between two `ZonedDateTime`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified date-time.
The result will be negative if the end is before the start.
For example, the amount in days between two date-times can be calculated
using `startDateTime.until(endDateTime, DAYS)`.

The `Temporal` passed to this method is converted to a
`ZonedDateTime` using `from(TemporalAccessor)`.
If the time-zone differs between the two zoned date-times, the specified
end date-time is normalized to have the same zone as this date-time.

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

The calculation for date and time units differ.

Date units operate on the local time-line, using the local date-time.
For example, the period from noon on day 1 to noon the following day
in days will always be counted as exactly one day, irrespective of whether
there was a daylight savings change or not.

Time units operate on the instant time-line.
The calculation effectively converts both zoned date-times to instants
and then calculates the period between the instants.
For example, the period from noon on day 1 to noon the following day
in hours may be 23, 24 or 25 hours (or some other amount) depending on
whether there was a daylight savings change or not.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
passing `this` as the first argument and the converted input temporal
as the second argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end date, exclusive, which is converted to a `ZonedDateTime`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this date-time and the end date-time

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to a `ZonedDateTime`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## ZonedDateTime.format(DateTimeFormatter)

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

## ZonedDateTime.toOffsetDateTime()

```java
public OffsetDateTime toOffsetDateTime()
```

Converts this date-time to an `OffsetDateTime`.

This creates an offset date-time using the local date-time and offset.
The zone ID is ignored.

**Returns:** an offset date-time representing the same local date-time and offset, not null

## ZonedDateTime.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this date-time is equal to another date-time.

The comparison is based on the offset date-time and the zone.
Only objects of type `ZonedDateTime` are compared, other types return false.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date-time

## ZonedDateTime.hashCode()

```java
public int hashCode()
```

A hash code for this date-time.

**Returns:** a suitable hash code

## ZonedDateTime.toString()

```java
public String toString()
```

Outputs this date-time as a `String`, such as
`2007-12-03T10:15:30+01:00[Europe/Paris]`.

The format consists of the `LocalDateTime` followed by the `ZoneOffset`.
If the `ZoneId` is not the same as the offset, then the ID is output.
The output is compatible with ISO-8601 if the offset and ID are the same,
and the seconds in the offset are zero.

**Returns:** a string representation of this date-time, not null
