---
title: "Year class (java.time) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Year.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Year class (java.time)

```java
public final class Year implements Temporal, TemporalAdjuster, Comparable<Year>, Serializable
```

A year in the ISO-8601 calendar system, such as `2007`.

`Year` is an immutable date-time object that represents a year.
Any field that can be derived from a year can be obtained.

**Note that years in the ISO chronology only align with years in the
Gregorian-Julian system for modern years. Parts of Russia did not switch to the
modern Gregorian/ISO rules until 1920.
As such, historical years must be treated with caution.**

This class does not store or represent a month, day, time or time-zone.
For example, the value "2007" can be stored in a `Year`.

Years represented by this class follow the ISO-8601 standard and use
the proleptic numbering system. Year 1 is preceded by year 0, then by year -1.

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

## Year.MIN_VALUE

```java
public static final int MIN_VALUE
```

The minimum supported year, '-999,999,999'.

## Year.MAX_VALUE

```java
public static final int MAX_VALUE
```

The maximum supported year, '+999,999,999'.

## Year.now()

```java
public static Year now()
```

Obtains the current year from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current year.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current year using the system clock and default time-zone, not null

## Year.now(ZoneId)

```java
public static Year now(ZoneId zone)
```

Obtains the current year from the system clock in the specified time-zone.

This will query the system clock to obtain the current year.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current year using the system clock, not null

## Year.now(Clock)

```java
public static Year now(Clock clock)
```

Obtains the current year from the specified clock.

This will query the specified clock to obtain the current year.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current year, not null

## Year.of(int)

```java
public static Year of(int isoYear)
```

Obtains an instance of `Year`.

This method accepts a year value from the proleptic ISO calendar system.

The year 2AD/CE is represented by 2.

The year 1AD/CE is represented by 1.

The year 1BC/BCE is represented by 0.

The year 2BC/BCE is represented by -1.

Parameters:

- `isoYear`: the ISO proleptic year to represent, from `MIN_VALUE` to `MAX_VALUE`

**Returns:** the year, not null

Throws:

- `DateTimeException`: if the field is invalid

## Year.from(TemporalAccessor)

```java
public static Year from(TemporalAccessor temporal)
```

Obtains an instance of `Year` from a temporal object.

This obtains a year based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `Year`.

The conversion extracts the year field.
The extraction is only permitted if the temporal object has an ISO
chronology, or can be converted to a `LocalDate`.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `Year::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the year, not null

Throws:

- `DateTimeException`: if unable to convert to a `Year`

## Year.parse(CharSequence)

```java
public static Year parse(CharSequence text)
```

Obtains an instance of `Year` from a text string such as `2007`.

The string must represent a valid year.

Parameters:

- `text`: the text to parse such as "2007", not null

**Returns:** the parsed year, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## Year.parse(CharSequence, DateTimeFormatter)

```java
public static Year parse(CharSequence text, DateTimeFormatter formatter)
```

Obtains an instance of `Year` from a text string using a specific formatter.

The text is parsed using the formatter, returning a year.

Parameters:

- `text`: the text to parse, not null
- `formatter`: the formatter to use, not null

**Returns:** the parsed year, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## Year.isLeap(long)

```java
public static boolean isLeap(long year)
```

Checks if the year is a leap year, according to the ISO proleptic
calendar system rules.

This method applies the current rules for leap years across the whole time-line.
In general, a year is a leap year if it is divisible by four without
remainder. However, years divisible by 100, are not leap years, with
the exception of years divisible by 400 which are.

For example, 1904 is a leap year it is divisible by 4.
1900 was not a leap year as it is divisible by 100, however 2000 was a
leap year as it is divisible by 400.

The calculation is proleptic - applying the same rules into the far future and far past.
This is historically inaccurate, but is correct for the ISO-8601 standard.

Parameters:

- `year`: the year to check

**Returns:** true if the year is leap, false otherwise

## Year.getValue()

```java
public int getValue()
```

Gets the year value.

The year returned by this method is proleptic as per `get(YEAR)`.

**Returns:** the year, `MIN_VALUE` to `MAX_VALUE`

## Year.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this year can be queried for the specified field.
If false, then calling the range,
get and long)
methods will throw an exception.

If the field is a `ChronoField` then the query is implemented here.
The supported fields are:

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

**Returns:** true if the field is supported on this year, false if not

## Year.isSupported(TemporalUnit)

```java
public boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to, or subtracted from, this year.
If false, then calling the TemporalUnit) and
TemporalUnit) minus methods will throw an exception.

If the unit is a `ChronoUnit` then the query is implemented here.
The supported units are:

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

## Year.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This year is used to enhance the accuracy of the returned range.
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

## Year.get(TemporalField)

```java
public int get(TemporalField field)
```

Gets the value of the specified field from this year as an `int`.

This queries this year for the value of the specified field.
The returned value will always be within the valid range of values for the field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this year.
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

## Year.getLong(TemporalField)

```java
public long getLong(TemporalField field)
```

Gets the value of the specified field from this year as a `long`.

This queries this year for the value of the specified field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this year.
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

## Year.isLeap()

```java
public boolean isLeap()
```

Checks if the year is a leap year, according to the ISO proleptic
calendar system rules.

This method applies the current rules for leap years across the whole time-line.
In general, a year is a leap year if it is divisible by four without
remainder. However, years divisible by 100, are not leap years, with
the exception of years divisible by 400 which are.

For example, 1904 is a leap year it is divisible by 4.
1900 was not a leap year as it is divisible by 100, however 2000 was a
leap year as it is divisible by 400.

The calculation is proleptic - applying the same rules into the far future and far past.
This is historically inaccurate, but is correct for the ISO-8601 standard.

**Returns:** true if the year is leap, false otherwise

## Year.isValidMonthDay(MonthDay)

```java
public boolean isValidMonthDay(MonthDay monthDay)
```

Checks if the month-day is valid for this year.

This method checks whether this year and the input month and day form
a valid date.

Parameters:

- `monthDay`: the month-day to validate, null returns false

**Returns:** true if the month and day are valid for this year

## Year.length()

```java
public int length()
```

Gets the length of this year in days.

**Returns:** the length of this year in days, 365 or 366

## Year.with(TemporalAdjuster)

```java
public Year with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this year.

This returns a `Year`, based on this one, with the year adjusted.
The adjustment takes place using the specified adjuster strategy object.
Read the documentation of the adjuster to understand what adjustment will be made.

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** a `Year` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs
