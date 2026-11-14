---
title: "LocalDate class (java.time) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalDate class (java.time) (part 4 of 5)

## LocalDate.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another date in terms of the specified unit.

This calculates the amount of time between two `LocalDate`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified date.
The result will be negative if the end is before the start.
The `Temporal` passed to this method is converted to a
`LocalDate` using `from(TemporalAccessor)`.
For example, the amount in days between two dates can be calculated
using `startDate.until(endDate, DAYS)`.

The calculation returns a whole number, representing the number of
complete units between the two dates.
For example, the amount in months between 2012-06-15 and 2012-08-14
will only be one month as it is one day short of two months.

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
The units `DAYS`, `WEEKS`, `MONTHS`, `YEARS`,
`DECADES`, `CENTURIES`, `MILLENNIA` and `ERAS`
are supported. Other `ChronoUnit` values will throw an exception.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
passing `this` as the first argument and the converted input temporal
as the second argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end date, exclusive, which is converted to a `LocalDate`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this date and the end date

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to a `LocalDate`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDate.until(ChronoLocalDate)

```java
public Period until(ChronoLocalDate endDateExclusive)
```

Calculates the period between this date and another date as a `Period`.

This calculates the period between two dates in terms of years, months and days.
The start and end points are `this` and the specified date.
The result will be negative if the end is before the start.
The negative sign will be the same in each of year, month and day.

The calculation is performed using the ISO calendar system.
If necessary, the input date will be converted to ISO.

The start date is included, but the end date is not.
The period is calculated by removing complete months, then calculating
the remaining number of days, adjusting to ensure that both have the same sign.
The number of months is then normalized into years and months based on a 12 month year.
A month is considered to be complete if the end day-of-month is greater
than or equal to the start day-of-month.
For example, from `2010-01-15` to `2011-03-18` is "1 year, 2 months and 3 days".

There are two equivalent ways of using this method.
The first is to invoke this method.
The second is to use LocalDate):

```java
  // these two lines are equivalent
  period = start.until(end);
  period = Period.between(start, end);
```

The choice should be made based on which makes the code more readable.

Parameters:

- `endDateExclusive`: the end date, exclusive, which may be in any chronology, not null

**Returns:** the period between this date and the end date, not null

## LocalDate.datesUntil(LocalDate)

```java
public Stream<LocalDate> datesUntil(LocalDate endExclusive)
```

Returns a sequential ordered stream of dates. The returned stream starts from this date
(inclusive) and goes to `endExclusive` (exclusive) by an incremental step of 1 day.

This method is equivalent to `datesUntil(endExclusive, Period.ofDays(1))`.

Parameters:

- `endExclusive`: the end date, exclusive, not null

**Returns:** a sequential `Stream` for the range of `LocalDate` values

**Since:** 9

Throws:

- `IllegalArgumentException`: if end date is before this date

## LocalDate.datesUntil(LocalDate, Period)

```java
public Stream<LocalDate> datesUntil(LocalDate endExclusive, Period step)
```

Returns a sequential ordered stream of dates by given incremental step. The returned stream
starts from this date (inclusive) and goes to `endExclusive` (exclusive).

The n-th date which appears in the stream is equal to `this.plus(step.multipliedBy(n))`
(but the result of step multiplication never overflows). For example, if this date is
`2015-01-31`, the end date is `2015-05-01` and the step is 1 month, then the
stream contains `2015-01-31`, `2015-02-28`, `2015-03-31`, and
`2015-04-30`.

Parameters:

- `endExclusive`: the end date, exclusive, not null
- `step`: the non-zero, non-negative `Period` which represents the step.

**Returns:** a sequential `Stream` for the range of `LocalDate` values

**Since:** 9

Throws:

- `IllegalArgumentException`: if step is zero, or `step.getDays()` and `step.toTotalMonths()` have opposite sign, or end date is before this date and step is positive, or end date is after this date and step is negative

## LocalDate.format(DateTimeFormatter)

```java
public String format(DateTimeFormatter formatter)
```

Formats this date using the specified formatter.

This date will be passed to the formatter to produce a string.

Parameters:

- `formatter`: the formatter to use, not null

**Returns:** the formatted date string, not null

Throws:

- `DateTimeException`: if an error occurs during printing

## LocalDate.atTime(LocalTime)

```java
public LocalDateTime atTime(LocalTime time)
```

Combines this date with a time to create a `LocalDateTime`.

This returns a `LocalDateTime` formed from this date at the specified time.
All possible combinations of date and time are valid.

Parameters:

- `time`: the time to combine with, not null

**Returns:** the local date-time formed from this date and the specified time, not null

## LocalDate.atTime(int, int)

```java
public LocalDateTime atTime(int hour, int minute)
```

Combines this date with a time to create a `LocalDateTime`.

This returns a `LocalDateTime` formed from this date at the
specified hour and minute.
The seconds and nanosecond fields will be set to zero.
The individual time fields must be within their valid range.
All possible combinations of date and time are valid.

Parameters:

- `hour`: the hour-of-day to use, from 0 to 23
- `minute`: the minute-of-hour to use, from 0 to 59

**Returns:** the local date-time formed from this date and the specified time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range

## LocalDate.atTime(int, int, int)

```java
public LocalDateTime atTime(int hour, int minute, int second)
```

Combines this date with a time to create a `LocalDateTime`.

This returns a `LocalDateTime` formed from this date at the
specified hour, minute and second.
The nanosecond field will be set to zero.
The individual time fields must be within their valid range.
All possible combinations of date and time are valid.

Parameters:

- `hour`: the hour-of-day to use, from 0 to 23
- `minute`: the minute-of-hour to use, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59

**Returns:** the local date-time formed from this date and the specified time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range

## LocalDate.atTime(int, int, int, int)

```java
public LocalDateTime atTime(int hour, int minute, int second, int nanoOfSecond)
```

Combines this date with a time to create a `LocalDateTime`.

This returns a `LocalDateTime` formed from this date at the
specified hour, minute, second and nanosecond.
The individual time fields must be within their valid range.
All possible combinations of date and time are valid.

Parameters:

- `hour`: the hour-of-day to use, from 0 to 23
- `minute`: the minute-of-hour to use, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59
- `nanoOfSecond`: the nano-of-second to represent, from 0 to 999,999,999

**Returns:** the local date-time formed from this date and the specified time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range

## LocalDate.atTime(OffsetTime)

```java
public OffsetDateTime atTime(OffsetTime time)
```

Combines this date with an offset time to create an `OffsetDateTime`.

This returns an `OffsetDateTime` formed from this date at the specified time.
All possible combinations of date and time are valid.

Parameters:

- `time`: the time to combine with, not null

**Returns:** the offset date-time formed from this date and the specified time, not null

## LocalDate.atStartOfDay()

```java
public LocalDateTime atStartOfDay()
```

Combines this date with the time of midnight to create a `LocalDateTime`
at the start of this date.

This returns a `LocalDateTime` formed from this date at the time of
midnight, 00:00, at the start of this date.

**Returns:** the local date-time of midnight at the start of this date, not null

## LocalDate.atStartOfDay(ZoneId)

```java
public ZonedDateTime atStartOfDay(ZoneId zone)
```

Returns a zoned date-time from this date at the earliest valid time according
to the rules in the time-zone.

Time-zone rules, such as daylight savings, mean that not every local date-time
is valid for the specified zone, thus the local date-time may not be midnight.

In most cases, there is only one valid offset for a local date-time.
In the case of an overlap, there are two valid offsets, and the earlier one is used,
corresponding to the first occurrence of midnight on the date.
In the case of a gap, the zoned date-time will represent the instant just after the gap.

If the zone ID is a `ZoneOffset`, then the result always has a time of midnight.

To convert to a specific time in a given time-zone call `atTime(LocalTime)`
followed by `LocalDateTime.atZone(ZoneId)`.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the zoned date-time formed from this date and the earliest valid time for the zone, not null

## LocalDate.toEpochSecond(LocalTime, ZoneOffset)

```java
public long toEpochSecond(LocalTime time, ZoneOffset offset)
```

Converts this `LocalDate` to the number of seconds since the epoch
of 1970-01-01T00:00:00Z.

This combines this local date with the specified time and
offset to calculate the epoch-second value, which is the
number of elapsed seconds from 1970-01-01T00:00:00Z.
Instants on the time-line after the epoch are positive, earlier
are negative.

Parameters:

- `time`: the local time, not null
- `offset`: the zone offset, not null

**Returns:** the number of seconds since the epoch of 1970-01-01T00:00:00Z, may be negative

**Since:** 9

## LocalDate.compareTo(ChronoLocalDate)

```java
public int compareTo(ChronoLocalDate other)
```

Compares this date to another date.

The comparison is primarily based on the date, from earliest to latest.
It is "consistent with equals", as defined by `Comparable`.

If all the dates being compared are instances of `LocalDate`,
then the comparison will be entirely based on the date.
If some dates being compared are in different chronologies, then the
chronology is also considered, see `java.time.chrono.ChronoLocalDate.compareTo`.

Parameters:

- `other`: the other date to compare to, not null

**Returns:** the comparator value, that is the comparison of this local date with
         the `other` local date and this chronology with the `other` chronology,
         in order, returning the first non-zero result, and otherwise returning zero

**See also:** #isBefore

**See also:** #isAfter

## LocalDate.isAfter(ChronoLocalDate)

```java
public boolean isAfter(ChronoLocalDate other)
```

Checks if this date is after the specified date.

This checks to see if this date represents a point on the
local time-line after the other date.

```java
  LocalDate a = LocalDate.of(2012, 6, 30);
  LocalDate b = LocalDate.of(2012, 7, 1);
  a.isAfter(b) == false
  a.isAfter(a) == false
  b.isAfter(a) == true
```

This method only considers the position of the two dates on the local time-line.
It does not take into account the chronology, or calendar system.
This is different from the comparison in `compareTo(ChronoLocalDate)`,
but is the same approach as `ChronoLocalDate.timeLineOrder()`.

Parameters:

- `other`: the other date to compare to, not null

**Returns:** true if this date is after the specified date

## LocalDate.isBefore(ChronoLocalDate)

```java
public boolean isBefore(ChronoLocalDate other)
```

Checks if this date is before the specified date.

This checks to see if this date represents a point on the
local time-line before the other date.

```java
  LocalDate a = LocalDate.of(2012, 6, 30);
  LocalDate b = LocalDate.of(2012, 7, 1);
  a.isBefore(b) == true
  a.isBefore(a) == false
  b.isBefore(a) == false
```

This method only considers the position of the two dates on the local time-line.
It does not take into account the chronology, or calendar system.
This is different from the comparison in `compareTo(ChronoLocalDate)`,
but is the same approach as `ChronoLocalDate.timeLineOrder()`.

Parameters:

- `other`: the other date to compare to, not null

**Returns:** true if this date is before the specified date

## LocalDate.isEqual(ChronoLocalDate)

```java
public boolean isEqual(ChronoLocalDate other)
```

Checks if this date is equal to the specified date.

This checks to see if this date represents the same point on the
local time-line as the other date.

```java
  LocalDate a = LocalDate.of(2012, 6, 30);
  LocalDate b = LocalDate.of(2012, 7, 1);
  a.isEqual(b) == false
  a.isEqual(a) == true
  b.isEqual(a) == false
```

This method only considers the position of the two dates on the local time-line.
It does not take into account the chronology, or calendar system.
This is different from the comparison in `compareTo(ChronoLocalDate)`
but is the same approach as `ChronoLocalDate.timeLineOrder()`.

Parameters:

- `other`: the other date to compare to, not null

**Returns:** true if this date is equal to the specified date

## LocalDate.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this date is equal to another date.

Compares this `LocalDate` with another ensuring that the date is the same.

Only objects of type `LocalDate` are compared, other types return false.
To compare the dates of two `TemporalAccessor` instances, including dates
in two different chronologies, use `ChronoField.EPOCH_DAY` as a comparator.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date
