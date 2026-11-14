---
title: "LocalDateTime class (java.time) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalDateTime class (java.time) (part 2 of 4)

## LocalDateTime.isSupported(TemporalField)

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

All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this date-time, false if not

## LocalDateTime.isSupported(TemporalUnit)

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

## LocalDateTime.range(TemporalField)

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

## LocalDateTime.get(TemporalField)

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
`EPOCH_DAY` and `PROLEPTIC_MONTH` which are too large to fit in
an `int` and throw an `UnsupportedTemporalTypeException`.
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

## LocalDateTime.getLong(TemporalField)

```java
public long getLong(TemporalField field)
```

Gets the value of the specified field from this date-time as a `long`.

This queries this date-time for the value of the specified field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this date-time.
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

## LocalDateTime.toLocalDate()

```java
public LocalDate toLocalDate()
```

Gets the `LocalDate` part of this date-time.

This returns a `LocalDate` with the same year, month and day
as this date-time.

**Returns:** the date part of this date-time, not null

## LocalDateTime.getYear()

```java
public int getYear()
```

Gets the year field.

This method returns the primitive `int` value for the year.

The year returned by this method is proleptic as per `get(YEAR)`.
To obtain the year-of-era, use `get(YEAR_OF_ERA)`.

**Returns:** the year, from MIN_YEAR to MAX_YEAR

## LocalDateTime.getMonthValue()

```java
public int getMonthValue()
```

Gets the month-of-year field from 1 to 12.

This method returns the month as an `int` from 1 to 12.
Application code is frequently clearer if the enum `Month`
is used by calling `getMonth()`.

**Returns:** the month-of-year, from 1 to 12

**See also:** #getMonth()

## LocalDateTime.getMonth()

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

## LocalDateTime.getDayOfMonth()

```java
public int getDayOfMonth()
```

Gets the day-of-month field.

This method returns the primitive `int` value for the day-of-month.

**Returns:** the day-of-month, from 1 to 31

## LocalDateTime.getDayOfYear()

```java
public int getDayOfYear()
```

Gets the day-of-year field.

This method returns the primitive `int` value for the day-of-year.

**Returns:** the day-of-year, from 1 to 365, or 366 in a leap year

## LocalDateTime.getDayOfWeek()

```java
public DayOfWeek getDayOfWeek()
```

Gets the day-of-week field, which is an enum `DayOfWeek`.

This method returns the enum `DayOfWeek` for the day-of-week.
This avoids confusion as to what `int` values mean.
If you need access to the primitive `int` value then the enum
provides the int value.

Additional information can be obtained from the `DayOfWeek`.
This includes textual names of the values.

**Returns:** the day-of-week, not null

## LocalDateTime.toLocalTime()

```java
public LocalTime toLocalTime()
```

Gets the `LocalTime` part of this date-time.

This returns a `LocalTime` with the same hour, minute, second and
nanosecond as this date-time.

**Returns:** the time part of this date-time, not null

## LocalDateTime.getHour()

```java
public int getHour()
```

Gets the hour-of-day field.

**Returns:** the hour-of-day, from 0 to 23

## LocalDateTime.getMinute()

```java
public int getMinute()
```

Gets the minute-of-hour field.

**Returns:** the minute-of-hour, from 0 to 59

## LocalDateTime.getSecond()

```java
public int getSecond()
```

Gets the second-of-minute field.

**Returns:** the second-of-minute, from 0 to 59

## LocalDateTime.getNano()

```java
public int getNano()
```

Gets the nano-of-second field.

**Returns:** the nano-of-second, from 0 to 999,999,999

## LocalDateTime.with(TemporalAdjuster)

```java
public LocalDateTime with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this date-time.

This returns a `LocalDateTime`, based on this one, with the date-time adjusted.
The adjustment takes place using the specified adjuster strategy object.
Read the documentation of the adjuster to understand what adjustment will be made.

A simple adjuster might simply set the one of the fields, such as the year field.
A more complex adjuster might set the date to the last day of the month.

A selection of common adjustments is provided in
TemporalAdjusters.
These include finding the "last day of the month" and "next Wednesday".
Key <example-value> classes also implement the `TemporalAdjuster` interface,
such as `Month` and MonthDay.
The adjuster is responsible for handling special cases, such as the varying
lengths of month and leap years.

For example this code returns a date on the last day of July:

```java
 import static java.time.Month.*;
 import static java.time.temporal.TemporalAdjusters.*;

 result = localDateTime.with(JULY).with(lastDayOfMonth());
```

The classes `LocalDate` and `LocalTime` implement `TemporalAdjuster`,
thus this method can be used to change the date, time or offset:

```java
 result = localDateTime.with(date);
 result = localDateTime.with(time);
```

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** a `LocalDateTime` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs

## LocalDateTime.with(TemporalField, long)

```java
public LocalDateTime with(TemporalField field, long newValue)
```

Returns a copy of this date-time with the specified field set to a new value.

This returns a `LocalDateTime`, based on this one, with the value
for the specified field changed.
This can be used to change any supported field, such as the year, month or day-of-month.
If it is not possible to set the value, because the field is not supported or for
some other reason, an exception is thrown.

In some cases, changing the specified field can cause the resulting date-time to become invalid,
such as changing the month from 31st January to February would make the day-of-month invalid.
In cases like this, the field is responsible for resolving the date. Typically it will choose
the previous valid date, which would be the last valid day of February in this example.

If the field is a `ChronoField` then the adjustment is implemented here.
The supported fields will behave as per
the matching method on long) LocalDate
or long) LocalTime.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.adjustInto(Temporal, long)`
passing `this` as the argument. In this case, the field determines
whether and how to adjust the instant.

This instance is immutable and unaffected by this method call.

Parameters:

- `field`: the field to set in the result, not null
- `newValue`: the new value of the field in the result

**Returns:** a `LocalDateTime` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDateTime.withYear(int)

```java
public LocalDateTime withYear(int year)
```

Returns a copy of this `LocalDateTime` with the year altered.

The time does not affect the calculation and will be the same in the result.
If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.

This instance is immutable and unaffected by this method call.

Parameters:

- `year`: the year to set in the result, from MIN_YEAR to MAX_YEAR

**Returns:** a `LocalDateTime` based on this date-time with the requested year, not null

Throws:

- `DateTimeException`: if the year value is invalid

## LocalDateTime.withMonth(int)

```java
public LocalDateTime withMonth(int month)
```

Returns a copy of this `LocalDateTime` with the month-of-year altered.

The time does not affect the calculation and will be the same in the result.
If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.

This instance is immutable and unaffected by this method call.

Parameters:

- `month`: the month-of-year to set in the result, from 1 (January) to 12 (December)

**Returns:** a `LocalDateTime` based on this date-time with the requested month, not null

Throws:

- `DateTimeException`: if the month-of-year value is invalid

## LocalDateTime.withDayOfMonth(int)

```java
public LocalDateTime withDayOfMonth(int dayOfMonth)
```

Returns a copy of this `LocalDateTime` with the day-of-month altered.

If the resulting date-time is invalid, an exception is thrown.
The time does not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `dayOfMonth`: the day-of-month to set in the result, from 1 to 28-31

**Returns:** a `LocalDateTime` based on this date-time with the requested day, not null

Throws:

- `DateTimeException`: if the day-of-month value is invalid, or if the day-of-month is invalid for the month-year
