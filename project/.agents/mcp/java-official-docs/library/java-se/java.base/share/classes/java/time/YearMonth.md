---
title: "YearMonth class (java.time) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/YearMonth.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# YearMonth class (java.time)

```java
public final class YearMonth implements Temporal, TemporalAdjuster, Comparable<YearMonth>, Serializable
```

A year-month in the ISO-8601 calendar system, such as `2007-12`.

`YearMonth` is an immutable date-time object that represents the combination
of a year and month. Any field that can be derived from a year and month, such as
quarter-of-year, can be obtained.

This class does not store or represent a day, time or time-zone.
For example, the value "October 2007" can be stored in a `YearMonth`.

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

## YearMonth.now()

```java
public static YearMonth now()
```

Obtains the current year-month from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current year-month.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current year-month using the system clock and default time-zone, not null

## YearMonth.now(ZoneId)

```java
public static YearMonth now(ZoneId zone)
```

Obtains the current year-month from the system clock in the specified time-zone.

This will query the system clock to obtain the current year-month.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current year-month using the system clock, not null

## YearMonth.now(Clock)

```java
public static YearMonth now(Clock clock)
```

Obtains the current year-month from the specified clock.

This will query the specified clock to obtain the current year-month.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current year-month, not null

## YearMonth.of(int, Month)

```java
public static YearMonth of(int year, Month month)
```

Obtains an instance of `YearMonth` from a year and month.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, not null

**Returns:** the year-month, not null

Throws:

- `DateTimeException`: if the year value is invalid

## YearMonth.of(int, int)

```java
public static YearMonth of(int year, int month)
```

Obtains an instance of `YearMonth` from a year and month.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, from 1 (January) to 12 (December)

**Returns:** the year-month, not null

Throws:

- `DateTimeException`: if either field value is invalid

## YearMonth.from(TemporalAccessor)

```java
public static YearMonth from(TemporalAccessor temporal)
```

Obtains an instance of `YearMonth` from a temporal object.

This obtains a year-month based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `YearMonth`.

The conversion extracts the YEAR and
MONTH_OF_YEAR fields.
The extraction is only permitted if the temporal object has an ISO
chronology, or can be converted to a `LocalDate`.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `YearMonth::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the year-month, not null

Throws:

- `DateTimeException`: if unable to convert to a `YearMonth`

## YearMonth.parse(CharSequence)

```java
public static YearMonth parse(CharSequence text)
```

Obtains an instance of `YearMonth` from a text string such as `2007-12`.

The string must represent a valid year-month.
The format must be `uuuu-MM`.
Years outside the range 0000 to 9999 must be prefixed by the plus or minus symbol.

Parameters:

- `text`: the text to parse such as "2007-12", not null

**Returns:** the parsed year-month, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## YearMonth.parse(CharSequence, DateTimeFormatter)

```java
public static YearMonth parse(CharSequence text, DateTimeFormatter formatter)
```

Obtains an instance of `YearMonth` from a text string using a specific formatter.

The text is parsed using the formatter, returning a year-month.

Parameters:

- `text`: the text to parse, not null
- `formatter`: the formatter to use, not null

**Returns:** the parsed year-month, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## YearMonth.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this year-month can be queried for the specified field.
If false, then calling the range,
get and long)
methods will throw an exception.

If the field is a `ChronoField` then the query is implemented here.
The supported fields are:

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

**Returns:** true if the field is supported on this year-month, false if not

## YearMonth.isSupported(TemporalUnit)

```java
public boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to, or subtracted from, this year-month.
If false, then calling the TemporalUnit) and
TemporalUnit) minus methods will throw an exception.

If the unit is a `ChronoUnit` then the query is implemented here.
The supported units are:

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

## YearMonth.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This year-month is used to enhance the accuracy of the returned range.
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

## YearMonth.get(TemporalField)

```java
public int get(TemporalField field)
```

Gets the value of the specified field from this year-month as an `int`.

This queries this year-month for the value of the specified field.
The returned value will always be within the valid range of values for the field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this year-month, except `PROLEPTIC_MONTH` which is too
large to fit in an `int` and throw a `DateTimeException`.
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

## YearMonth.getLong(TemporalField)

```java
public long getLong(TemporalField field)
```

Gets the value of the specified field from this year-month as a `long`.

This queries this year-month for the value of the specified field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this year-month.
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

## YearMonth.getYear()

```java
public int getYear()
```

Gets the year field.

This method returns the primitive `int` value for the year.

The year returned by this method is proleptic as per `get(YEAR)`.

**Returns:** the year, from MIN_YEAR to MAX_YEAR

## YearMonth.getMonthValue()

```java
public int getMonthValue()
```

Gets the month-of-year field from 1 to 12.

This method returns the month as an `int` from 1 to 12.
Application code is frequently clearer if the enum `Month`
is used by calling `getMonth()`.

**Returns:** the month-of-year, from 1 to 12

**See also:** #getMonth()

## YearMonth.getMonth()

```java
public Month getMonth()
```

Gets the month-of-year field using the `Month` enum.

This method returns the enum `Month` for the month.
This avoids confusion as to what `int` values mean.
If you need access to the primitive `int` value then the enum
provides the int value.

**Returns:** the month-of-year, not null

**See also:** #getMonthValue()

## YearMonth.isLeapYear()

```java
public boolean isLeapYear()
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

## YearMonth.isValidDay(int)

```java
public boolean isValidDay(int dayOfMonth)
```

Checks if the day-of-month is valid for this year-month.

This method checks whether this year and month and the input day form
a valid date.

Parameters:

- `dayOfMonth`: the day-of-month to validate, from 1 to 31, invalid value returns false

**Returns:** true if the day is valid for this year-month

## YearMonth.lengthOfMonth()

```java
public int lengthOfMonth()
```

Returns the length of the month, taking account of the year.

This returns the length of the month in days.
For example, a date in January would return 31.

**Returns:** the length of the month in days, from 28 to 31

## YearMonth.lengthOfYear()

```java
public int lengthOfYear()
```

Returns the length of the year.

This returns the length of the year in days, either 365 or 366.

**Returns:** 366 if the year is leap, 365 otherwise

## YearMonth.with(TemporalAdjuster)

```java
public YearMonth with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this year-month.

This returns a `YearMonth`, based on this one, with the year-month adjusted.
The adjustment takes place using the specified adjuster strategy object.
Read the documentation of the adjuster to understand what adjustment will be made.

A simple adjuster might simply set the one of the fields, such as the year field.
A more complex adjuster might set the year-month to the next month that
Halley's comet will pass the Earth.

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** a `YearMonth` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs
