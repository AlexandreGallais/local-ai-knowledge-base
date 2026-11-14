---
title: "LocalDateTime class (java.time) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalDateTime class (java.time)

```java
public final class LocalDateTime implements Temporal, TemporalAdjuster, ChronoLocalDateTime<LocalDate>, Serializable
```

A date-time without a time-zone in the ISO-8601 calendar system,
such as `2007-12-03T10:15:30`.

`LocalDateTime` is an immutable date-time object that represents a date-time,
often viewed as year-month-day-hour-minute-second. Other date and time fields,
such as day-of-year, day-of-week and week-of-year, can also be accessed.
Time is represented to nanosecond precision.
For example, the value "2nd October 2007 at 13:45.30.123456789" can be
stored in a `LocalDateTime`.

This class does not store or represent a time-zone.
Instead, it is a description of the date, as used for birthdays, combined with
the local time as seen on a wall clock.
It cannot represent an instant on the time-line without additional information
such as an offset or time-zone.

The ISO-8601 calendar system is the modern civil calendar system used today
in most of the world. It is equivalent to the proleptic Gregorian calendar
system, in which today's rules for leap years are applied for all time.
For most applications written today, the ISO-8601 rules are entirely suitable.
However, any application that makes use of historical dates, and requires them
to be accurate will find the ISO-8601 approach unsuitable.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## LocalDateTime.MIN

```java
public static final LocalDateTime MIN
```

The minimum supported `LocalDateTime`, '-999999999-01-01T00:00:00'.
This is the local date-time of midnight at the start of the minimum date.
This combines `LocalDate.MIN` and `LocalTime.MIN`.
This could be used by an application as a "far past" date-time.

## LocalDateTime.MAX

```java
public static final LocalDateTime MAX
```

The maximum supported `LocalDateTime`, '<example-phone>-12-31T23:59:59.999999999'.
This is the local date-time just before midnight at the end of the maximum date.
This combines `LocalDate.MAX` and `LocalTime.MAX`.
This could be used by an application as a "far future" date-time.

## LocalDateTime.now()

```java
public static LocalDateTime now()
```

Obtains the current date-time from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date-time.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current date-time using the system clock and default time-zone, not null

## LocalDateTime.now(ZoneId)

```java
public static LocalDateTime now(ZoneId zone)
```

Obtains the current date-time from the system clock in the specified time-zone.

This will query the system clock to obtain the current date-time.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current date-time using the system clock, not null

## LocalDateTime.now(Clock)

```java
public static LocalDateTime now(Clock clock)
```

Obtains the current date-time from the specified clock.

This will query the specified clock to obtain the current date-time.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current date-time, not null

## LocalDateTime.of(int, Month, int, int, int)

```java
public static LocalDateTime of(int year, Month month, int dayOfMonth, int hour, int minute)
```

Obtains an instance of `LocalDateTime` from year, month,
day, hour and minute, setting the second and nanosecond to zero.

This returns a `LocalDateTime` with the specified year, month,
day-of-month, hour and minute.
The day must be valid for the year and month, otherwise an exception will be thrown.
The second and nanosecond fields will be set to zero.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, not null
- `dayOfMonth`: the day-of-month to represent, from 1 to 31
- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## LocalDateTime.of(int, Month, int, int, int, int)

```java
public static LocalDateTime of(int year, Month month, int dayOfMonth, int hour, int minute, int second)
```

Obtains an instance of `LocalDateTime` from year, month,
day, hour, minute and second, setting the nanosecond to zero.

This returns a `LocalDateTime` with the specified year, month,
day-of-month, hour, minute and second.
The day must be valid for the year and month, otherwise an exception will be thrown.
The nanosecond field will be set to zero.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, not null
- `dayOfMonth`: the day-of-month to represent, from 1 to 31
- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## LocalDateTime.of(int, Month, int, int, int, int, int)

```java
public static LocalDateTime of(int year, Month month, int dayOfMonth, int hour, int minute, int second, int nanoOfSecond)
```

Obtains an instance of `LocalDateTime` from year, month,
day, hour, minute, second and nanosecond.

This returns a `LocalDateTime` with the specified year, month,
day-of-month, hour, minute, second and nanosecond.
The day must be valid for the year and month, otherwise an exception will be thrown.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, not null
- `dayOfMonth`: the day-of-month to represent, from 1 to 31
- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59
- `nanoOfSecond`: the nano-of-second to represent, from 0 to 999,999,999

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## LocalDateTime.of(int, int, int, int, int)

```java
public static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute)
```

Obtains an instance of `LocalDateTime` from year, month,
day, hour and minute, setting the second and nanosecond to zero.

This returns a `LocalDateTime` with the specified year, month,
day-of-month, hour and minute.
The day must be valid for the year and month, otherwise an exception will be thrown.
The second and nanosecond fields will be set to zero.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, from 1 (January) to 12 (December)
- `dayOfMonth`: the day-of-month to represent, from 1 to 31
- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## LocalDateTime.of(int, int, int, int, int, int)

```java
public static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute, int second)
```

Obtains an instance of `LocalDateTime` from year, month,
day, hour, minute and second, setting the nanosecond to zero.

This returns a `LocalDateTime` with the specified year, month,
day-of-month, hour, minute and second.
The day must be valid for the year and month, otherwise an exception will be thrown.
The nanosecond field will be set to zero.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, from 1 (January) to 12 (December)
- `dayOfMonth`: the day-of-month to represent, from 1 to 31
- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## LocalDateTime.of(int, int, int, int, int, int, int)

```java
public static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute, int second, int nanoOfSecond)
```

Obtains an instance of `LocalDateTime` from year, month,
day, hour, minute, second and nanosecond.

This returns a `LocalDateTime` with the specified year, month,
day-of-month, hour, minute, second and nanosecond.
The day must be valid for the year and month, otherwise an exception will be thrown.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, from 1 (January) to 12 (December)
- `dayOfMonth`: the day-of-month to represent, from 1 to 31
- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59
- `nanoOfSecond`: the nano-of-second to represent, from 0 to 999,999,999

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## LocalDateTime.of(LocalDate, LocalTime)

```java
public static LocalDateTime of(LocalDate date, LocalTime time)
```

Obtains an instance of `LocalDateTime` from a date and time.

Parameters:

- `date`: the local date, not null
- `time`: the local time, not null

**Returns:** the local date-time, not null

## LocalDateTime.ofInstant(Instant, ZoneId)

```java
public static LocalDateTime ofInstant(Instant instant, ZoneId zone)
```

Obtains an instance of `LocalDateTime` from an `Instant` and zone ID.

This creates a local date-time based on the specified instant.
First, the offset from UTC/Greenwich is obtained using the zone ID and instant,
which is simple as there is only one valid offset for each instant.
Then, the instant and offset are used to calculate the local date-time.

Parameters:

- `instant`: the instant to create the date-time from, not null
- `zone`: the time-zone, which may be an offset, not null

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## LocalDateTime.ofEpochSecond(long, int, ZoneOffset)

```java
public static LocalDateTime ofEpochSecond(long epochSecond, int nanoOfSecond, ZoneOffset offset)
```

Obtains an instance of `LocalDateTime` using seconds from the
epoch of 1970-01-01T00:00:00Z.

This allows the epoch-second field
to be converted to a local date-time. This is primarily intended for
low-level conversions rather than general application usage.

Parameters:

- `epochSecond`: the number of seconds from the epoch of 1970-01-01T00:00:00Z
- `nanoOfSecond`: the nanosecond within the second, from 0 to 999,999,999
- `offset`: the zone offset, not null

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range, or if the nano-of-second is invalid

## LocalDateTime.from(TemporalAccessor)

```java
public static LocalDateTime from(TemporalAccessor temporal)
```

Obtains an instance of `LocalDateTime` from a temporal object.

This obtains a local date-time based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `LocalDateTime`.

The conversion extracts and combines the `LocalDate` and the
`LocalTime` from the temporal object.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `LocalDateTime::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the local date-time, not null

Throws:

- `DateTimeException`: if unable to convert to a `LocalDateTime`

## LocalDateTime.parse(CharSequence)

```java
public static LocalDateTime parse(CharSequence text)
```

Obtains an instance of `LocalDateTime` from a text string such as `2007-12-03T10:15:30`.

The string must represent a valid date-time and is parsed using
`java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME`.

Parameters:

- `text`: the text to parse such as "2007-12-03T10:15:30", not null

**Returns:** the parsed local date-time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## LocalDateTime.parse(CharSequence, DateTimeFormatter)

```java
public static LocalDateTime parse(CharSequence text, DateTimeFormatter formatter)
```

Obtains an instance of `LocalDateTime` from a text string using a specific formatter.

The text is parsed using the formatter, returning a date-time.

Parameters:

- `text`: the text to parse, not null
- `formatter`: the formatter to use, not null

**Returns:** the parsed local date-time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed
