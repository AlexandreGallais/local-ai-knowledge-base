---
title: "OffsetDateTime class (java.time) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/OffsetDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OffsetDateTime class (java.time)

```java
public final class OffsetDateTime implements Temporal, TemporalAdjuster, Comparable<OffsetDateTime>, Serializable
```

A date-time with an offset from UTC/Greenwich in the ISO-8601 calendar system,
such as `2007-12-03T10:15:30+01:00`.

`OffsetDateTime` is an immutable representation of a date-time with an offset.
This class stores all date and time fields, to a precision of nanoseconds,
as well as the offset from UTC/Greenwich. For example, the value
"2nd October 2007 at 13:45:30.123456789 +02:00" can be stored in an `OffsetDateTime`.

`OffsetDateTime`, `java.time.ZonedDateTime` and `java.time.Instant` all store an instant
on the time-line to nanosecond precision.
`Instant` is the simplest, simply representing the instant.
`OffsetDateTime` adds to the instant the offset from UTC/Greenwich, which allows
the local date-time to be obtained.
`ZonedDateTime` adds full time-zone rules.

It is intended that `ZonedDateTime` or `Instant` is used to model data
in simpler applications. This class may be used when modeling date-time concepts in
more detail, or when communicating to a database or in a network protocol.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## OffsetDateTime.MIN

```java
public static final OffsetDateTime MIN
```

The minimum supported `OffsetDateTime`, '-999999999-01-01T00:00:00+18:00'.
This is the local date-time of midnight at the start of the minimum date
in the maximum offset (larger offsets are earlier on the time-line).
This combines `LocalDateTime.MIN` and `ZoneOffset.MAX`.
This could be used by an application as a "far past" date-time.

## OffsetDateTime.MAX

```java
public static final OffsetDateTime MAX
```

The maximum supported `OffsetDateTime`, '<example-phone>-12-31T23:59:59.999999999-18:00'.
This is the local date-time just before midnight at the end of the maximum date
in the minimum offset (larger negative offsets are later on the time-line).
This combines `LocalDateTime.MAX` and `ZoneOffset.MIN`.
This could be used by an application as a "far future" date-time.

## OffsetDateTime.timeLineOrder()

```java
public static Comparator<OffsetDateTime> timeLineOrder()
```

Gets a comparator that compares two `OffsetDateTime` instances
based solely on the instant.

This method differs from the comparison in `compareTo` in that it
only compares the underlying instant.

**Returns:** a comparator that compares in time-line order

**See also:** #isAfter

**See also:** #isBefore

**See also:** #isEqual

## OffsetDateTime.now()

```java
public static OffsetDateTime now()
```

Obtains the current date-time from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date-time.
The offset will be calculated from the time-zone in the clock.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current date-time using the system clock, not null

## OffsetDateTime.now(ZoneId)

```java
public static OffsetDateTime now(ZoneId zone)
```

Obtains the current date-time from the system clock in the specified time-zone.

This will query the system clock to obtain the current date-time.
Specifying the time-zone avoids dependence on the default time-zone.
The offset will be calculated from the specified time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current date-time using the system clock, not null

## OffsetDateTime.now(Clock)

```java
public static OffsetDateTime now(Clock clock)
```

Obtains the current date-time from the specified clock.

This will query the specified clock to obtain the current date-time.
The offset will be calculated from the time-zone in the clock.

Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current date-time, not null

## OffsetDateTime.of(LocalDate, LocalTime, ZoneOffset)

```java
public static OffsetDateTime of(LocalDate date, LocalTime time, ZoneOffset offset)
```

Obtains an instance of `OffsetDateTime` from a date, time and offset.

This creates an offset date-time with the specified local date, time and offset.

Parameters:

- `date`: the local date, not null
- `time`: the local time, not null
- `offset`: the zone offset, not null

**Returns:** the offset date-time, not null

## OffsetDateTime.of(LocalDateTime, ZoneOffset)

```java
public static OffsetDateTime of(LocalDateTime dateTime, ZoneOffset offset)
```

Obtains an instance of `OffsetDateTime` from a date-time and offset.

This creates an offset date-time with the specified local date-time and offset.

Parameters:

- `dateTime`: the local date-time, not null
- `offset`: the zone offset, not null

**Returns:** the offset date-time, not null

## OffsetDateTime.of(int, int, int, int, int, int, int, ZoneOffset)

```java
public static OffsetDateTime of( int year, int month, int dayOfMonth, int hour, int minute, int second, int nanoOfSecond, ZoneOffset offset)
```

Obtains an instance of `OffsetDateTime` from a year, month, day,
hour, minute, second, nanosecond and offset.

This creates an offset date-time with the seven specified fields.

This method exists primarily for writing test cases.
Non test-code will typically use other methods to create an offset time.
`LocalDateTime` has five additional convenience variants of the
equivalent factory method taking fewer arguments.
They are not provided here to reduce the footprint of the API.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, from 1 (January) to 12 (December)
- `dayOfMonth`: the day-of-month to represent, from 1 to 31
- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59
- `nanoOfSecond`: the nano-of-second to represent, from 0 to 999,999,999
- `offset`: the zone offset, not null

**Returns:** the offset date-time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## OffsetDateTime.ofInstant(Instant, ZoneId)

```java
public static OffsetDateTime ofInstant(Instant instant, ZoneId zone)
```

Obtains an instance of `OffsetDateTime` from an `Instant` and zone ID.

This creates an offset date-time with the same instant as that specified.
Finding the offset from UTC/Greenwich is simple as there is only one valid
offset for each instant.

Parameters:

- `instant`: the instant to create the date-time from, not null
- `zone`: the time-zone, which may be an offset, not null

**Returns:** the offset date-time, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## OffsetDateTime.from(TemporalAccessor)

```java
public static OffsetDateTime from(TemporalAccessor temporal)
```

Obtains an instance of `OffsetDateTime` from a temporal object.

This obtains an offset date-time based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `OffsetDateTime`.

The conversion will first obtain a `ZoneOffset` from the temporal object.
It will then try to obtain a `LocalDateTime`, falling back to an `Instant` if necessary.
The result will be the combination of `ZoneOffset` with either
with `LocalDateTime` or `Instant`.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `OffsetDateTime::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the offset date-time, not null

Throws:

- `DateTimeException`: if unable to convert to an `OffsetDateTime`

## OffsetDateTime.parse(CharSequence)

```java
public static OffsetDateTime parse(CharSequence text)
```

Obtains an instance of `OffsetDateTime` from a text string
such as `2007-12-03T10:15:30+01:00`.

The string must represent a valid date-time and is parsed using
`java.time.format.DateTimeFormatter.ISO_OFFSET_DATE_TIME`.

Parameters:

- `text`: the text to parse such as "2007-12-03T10:15:30+01:00", not null

**Returns:** the parsed offset date-time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## OffsetDateTime.parse(CharSequence, DateTimeFormatter)

```java
public static OffsetDateTime parse(CharSequence text, DateTimeFormatter formatter)
```

Obtains an instance of `OffsetDateTime` from a text string using a specific formatter.

The text is parsed using the formatter, returning a date-time.

Parameters:

- `text`: the text to parse, not null
- `formatter`: the formatter to use, not null

**Returns:** the parsed offset date-time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## OffsetDateTime.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this date-time can be queried for the specified field.
If false, then calling the range,
get and long)
methods will throw an exception.

If the field is a `ChronoField` then the query is implemented here.
The supported fields are:

- `NANO_OF_SECOND`

- `NANO_OF_DAY`

- `MICRO_OF_SECOND`

- `MICRO_OF_DAY`

- `MILLI_OF_SECOND`

- `MILLI_OF_DAY`

- `SECOND_OF_MINUTE`

- `SECOND_OF_DAY`

- `MINUTE_OF_HOUR`

- `MINUTE_OF_DAY`

- `HOUR_OF_AMPM`

- `CLOCK_HOUR_OF_AMPM`

- `HOUR_OF_DAY`

- `CLOCK_HOUR_OF_DAY`

- `AMPM_OF_DAY`

- `DAY_OF_WEEK`

- `ALIGNED_DAY_OF_WEEK_IN_MONTH`

- `ALIGNED_DAY_OF_WEEK_IN_YEAR`

- `DAY_OF_MONTH`

- `DAY_OF_YEAR`

- `EPOCH_DAY`

- `ALIGNED_WEEK_OF_MONTH`

- `ALIGNED_WEEK_OF_YEAR`

- `MONTH_OF_YEAR`

- `PROLEPTIC_MONTH`

- `YEAR_OF_ERA`

- `YEAR`

- `ERA`

- `INSTANT_SECONDS`

- `OFFSET_SECONDS`

All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this date-time, false if not

## OffsetDateTime.isSupported(TemporalUnit)

```java
public boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to, or subtracted from, this date-time.
If false, then calling the TemporalUnit) and
TemporalUnit) minus methods will throw an exception.

If the unit is a `ChronoUnit` then the query is implemented here.
The supported units are:

- `NANOS`

- `MICROS`

- `MILLIS`

- `SECONDS`

- `MINUTES`

- `HOURS`

- `HALF_DAYS`

- `DAYS`

- `WEEKS`

- `MONTHS`

- `YEARS`

- `DECADES`

- `CENTURIES`

- `MILLENNIA`

- `ERAS`

All other `ChronoUnit` instances will return false.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)`
passing `this` as the argument.
Whether the unit is supported is determined by the unit.

Parameters:

- `unit`: the unit to check, null returns false

**Returns:** true if the unit can be added/subtracted, false if not

## OffsetDateTime.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This date-time is used to enhance the accuracy of the returned range.
If it is not possible to return the range, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return
appropriate range instances.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.rangeRefinedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the range can be obtained is determined by the field.

Parameters:

- `field`: the field to query the range for, not null

**Returns:** the range of valid values for the field, not null

Throws:

- `DateTimeException`: if the range for the field cannot be obtained
- `UnsupportedTemporalTypeException`: if the field is not supported

## OffsetDateTime.get(TemporalField)

```java
public int get(TemporalField field)
```

Gets the value of the specified field from this date-time as an `int`.

This queries this date-time for the value of the specified field.
The returned value will always be within the valid range of values for the field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this date-time, except `NANO_OF_DAY`, `MICRO_OF_DAY`,
`EPOCH_DAY`, `PROLEPTIC_MONTH` and `INSTANT_SECONDS` which are too
large to fit in an `int` and throw an `UnsupportedTemporalTypeException`.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
passing `this` as the argument. Whether the value can be obtained,
and what the value represents, is determined by the field.

Parameters:

- `field`: the field to get, not null

**Returns:** the value for the field

Throws:

- `DateTimeException`: if a value for the field cannot be obtained or the value is outside the range of valid values for the field
- `UnsupportedTemporalTypeException`: if the field is not supported or the range of values exceeds an `int`
- `ArithmeticException`: if numeric overflow occurs
