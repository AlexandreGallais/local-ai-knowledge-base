---
title: "LocalDate class (java.time) (part 1 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalDate class (java.time)

```java
public final class LocalDate implements Temporal, TemporalAdjuster, ChronoLocalDate, Serializable
```

A date without a time-zone in the ISO-8601 calendar system,
such as `2007-12-03`.

`LocalDate` is an immutable date-time object that represents a date,
often viewed as year-month-day. Other date fields, such as day-of-year,
day-of-week and week-of-year, can also be accessed.
For example, the value "2nd October 2007" can be stored in a `LocalDate`.

This class does not store or represent a time or time-zone.
Instead, it is a description of the date, as used for birthdays.
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

## LocalDate.MIN

```java
public static final LocalDate MIN
```

The minimum supported `LocalDate`, '-999999999-01-01'.
This could be used by an application as a "far past" date.

## LocalDate.MAX

```java
public static final LocalDate MAX
```

The maximum supported `LocalDate`, '<example-phone>-12-31'.
This could be used by an application as a "far future" date.

## LocalDate.EPOCH

```java
public static final LocalDate EPOCH
```

The epoch year `LocalDate`, '1970-01-01'.

**Since:** 9

## LocalDate.now()

```java
public static LocalDate now()
```

Obtains the current date from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current date using the system clock and default time-zone, not null

## LocalDate.now(ZoneId)

```java
public static LocalDate now(ZoneId zone)
```

Obtains the current date from the system clock in the specified time-zone.

This will query the system clock to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current date using the system clock, not null

## LocalDate.now(Clock)

```java
public static LocalDate now(Clock clock)
```

Obtains the current date from the specified clock.

This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current date, not null

## LocalDate.of(int, Month, int)

```java
public static LocalDate of(int year, Month month, int dayOfMonth)
```

Obtains an instance of `LocalDate` from a year, month and day.

This returns a `LocalDate` with the specified year, month and day-of-month.
The day must be valid for the year and month, otherwise an exception will be thrown.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, not null
- `dayOfMonth`: the day-of-month to represent, from 1 to 31

**Returns:** the local date, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## LocalDate.of(int, int, int)

```java
public static LocalDate of(int year, int month, int dayOfMonth)
```

Obtains an instance of `LocalDate` from a year, month and day.

This returns a `LocalDate` with the specified year, month and day-of-month.
The day must be valid for the year and month, otherwise an exception will be thrown.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, from 1 (January) to 12 (December)
- `dayOfMonth`: the day-of-month to represent, from 1 to 31

**Returns:** the local date, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## LocalDate.ofYearDay(int, int)

```java
public static LocalDate ofYearDay(int year, int dayOfYear)
```

Obtains an instance of `LocalDate` from a year and day-of-year.

This returns a `LocalDate` with the specified year and day-of-year.
The day-of-year must be valid for the year, otherwise an exception will be thrown.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `dayOfYear`: the day-of-year to represent, from 1 to 366

**Returns:** the local date, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-year is invalid for the year

## LocalDate.ofInstant(Instant, ZoneId)

```java
public static LocalDate ofInstant(Instant instant, ZoneId zone)
```

Obtains an instance of `LocalDate` from an `Instant` and zone ID.

This creates a local date based on the specified instant.
First, the offset from UTC/Greenwich is obtained using the zone ID and instant,
which is simple as there is only one valid offset for each instant.
Then, the instant and offset are used to calculate the local date.

Parameters:

- `instant`: the instant to create the date from, not null
- `zone`: the time-zone, which may be an offset, not null

**Returns:** the local date, not null

**Since:** 9

Throws:

- `DateTimeException`: if the result exceeds the supported range

## LocalDate.ofEpochDay(long)

```java
public static LocalDate ofEpochDay(long epochDay)
```

Obtains an instance of `LocalDate` from the epoch day count.

This returns a `LocalDate` with the specified epoch-day.
The EPOCH_DAY is a simple incrementing count
of days where day 0 is 1970-01-01. Negative numbers represent earlier days.

Parameters:

- `epochDay`: the Epoch Day to convert, based on the epoch 1970-01-01

**Returns:** the local date, not null

Throws:

- `DateTimeException`: if the epoch day exceeds the supported date range

## LocalDate.from(TemporalAccessor)

```java
public static LocalDate from(TemporalAccessor temporal)
```

Obtains an instance of `LocalDate` from a temporal object.

This obtains a local date based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `LocalDate`.

The conversion uses the `TemporalQueries.localDate()` query, which relies
on extracting the EPOCH_DAY field.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `LocalDate::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the local date, not null

Throws:

- `DateTimeException`: if unable to convert to a `LocalDate`

## LocalDate.parse(CharSequence)

```java
public static LocalDate parse(CharSequence text)
```

Obtains an instance of `LocalDate` from a text string such as `2007-12-03`.

The string must represent a valid date and is parsed using
`java.time.format.DateTimeFormatter.ISO_LOCAL_DATE`.

Parameters:

- `text`: the text to parse such as "2007-12-03", not null

**Returns:** the parsed local date, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## LocalDate.parse(CharSequence, DateTimeFormatter)

```java
public static LocalDate parse(CharSequence text, DateTimeFormatter formatter)
```

Obtains an instance of `LocalDate` from a text string using a specific formatter.

The text is parsed using the formatter, returning a date.

Parameters:

- `text`: the text to parse, not null
- `formatter`: the formatter to use, not null

**Returns:** the parsed local date, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## LocalDate.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this date can be queried for the specified field.
If false, then calling the range,
get and long)
methods will throw an exception.

If the field is a `ChronoField` then the query is implemented here.
The supported fields are:

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

All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this date, false if not

## LocalDate.isSupported(TemporalUnit)

```java
public boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to, or subtracted from, this date.
If false, then calling the TemporalUnit) and
TemporalUnit) minus methods will throw an exception.

If the unit is a `ChronoUnit` then the query is implemented here.
The supported units are:

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

## LocalDate.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This date is used to enhance the accuracy of the returned range.
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

## LocalDate.get(TemporalField)

```java
public int get(TemporalField field)
```

Gets the value of the specified field from this date as an `int`.

This queries this date for the value of the specified field.
The returned value will always be within the valid range of values for the field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this date, except `EPOCH_DAY` and `PROLEPTIC_MONTH`
which are too large to fit in an `int` and throw an `UnsupportedTemporalTypeException`.
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

## LocalDate.getLong(TemporalField)

```java
public long getLong(TemporalField field)
```

Gets the value of the specified field from this date as a `long`.

This queries this date for the value of the specified field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this date.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
passing `this` as the argument. Whether the value can be obtained,
and what the value represents, is determined by the field.

Parameters:

- `field`: the field to get, not null

**Returns:** the value for the field

Throws:

- `DateTimeException`: if a value for the field cannot be obtained
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDate.getChronology()

```java
public IsoChronology getChronology()
```

Gets the chronology of this date, which is the ISO calendar system.

The `Chronology` represents the calendar system in use.
The ISO-8601 calendar system is the modern civil calendar system used today
in most of the world. It is equivalent to the proleptic Gregorian calendar
system, in which today's rules for leap years are applied for all time.

**Returns:** the ISO chronology, not null
