---
title: "OffsetDateTime class (java.time) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/OffsetDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OffsetDateTime class (java.time) (part 2 of 4)

## OffsetDateTime.getLong(TemporalField)

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

## OffsetDateTime.getOffset()

```java
public ZoneOffset getOffset()
```

Gets the zone offset, such as '+01:00'.

This is the offset of the local date-time from UTC/Greenwich.

**Returns:** the zone offset, not null

## OffsetDateTime.withOffsetSameLocal(ZoneOffset)

```java
public OffsetDateTime withOffsetSameLocal(ZoneOffset offset)
```

Returns a copy of this `OffsetDateTime` with the specified offset ensuring
that the result has the same local date-time.

This method returns an object with the same `LocalDateTime` and the specified `ZoneOffset`.
No calculation is needed or performed.
For example, if this time represents `2007-12-03T10:30+02:00` and the offset specified is
`+03:00`, then this method will return `2007-12-03T10:30+03:00`.

To take into account the difference between the offsets, and adjust the time fields,
use `withOffsetSameInstant`.

This instance is immutable and unaffected by this method call.

Parameters:

- `offset`: the zone offset to change to, not null

**Returns:** an `OffsetDateTime` based on this date-time with the requested offset, not null

## OffsetDateTime.withOffsetSameInstant(ZoneOffset)

```java
public OffsetDateTime withOffsetSameInstant(ZoneOffset offset)
```

Returns a copy of this `OffsetDateTime` with the specified offset ensuring
that the result is at the same instant.

This method returns an object with the specified `ZoneOffset` and a `LocalDateTime`
adjusted by the difference between the two offsets.
This will result in the old and new objects representing the same instant.
This is useful for finding the local time in a different offset.
For example, if this time represents `2007-12-03T10:30+02:00` and the offset specified is
`+03:00`, then this method will return `2007-12-03T11:30+03:00`.

To change the offset without adjusting the local time use `withOffsetSameLocal`.

This instance is immutable and unaffected by this method call.

Parameters:

- `offset`: the zone offset to change to, not null

**Returns:** an `OffsetDateTime` based on this date-time with the requested offset, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.toLocalDateTime()

```java
public LocalDateTime toLocalDateTime()
```

Gets the `LocalDateTime` part of this date-time.

This returns a `LocalDateTime` with the same year, month, day and time
as this date-time.

**Returns:** the local date-time part of this date-time, not null

## OffsetDateTime.toLocalDate()

```java
public LocalDate toLocalDate()
```

Gets the `LocalDate` part of this date-time.

This returns a `LocalDate` with the same year, month and day
as this date-time.

**Returns:** the date part of this date-time, not null

## OffsetDateTime.getYear()

```java
public int getYear()
```

Gets the year field.

This method returns the primitive `int` value for the year.

The year returned by this method is proleptic as per `get(YEAR)`.
To obtain the year-of-era, use `get(YEAR_OF_ERA)`.

**Returns:** the year, from MIN_YEAR to MAX_YEAR

## OffsetDateTime.getMonthValue()

```java
public int getMonthValue()
```

Gets the month-of-year field from 1 to 12.

This method returns the month as an `int` from 1 to 12.
Application code is frequently clearer if the enum `Month`
is used by calling `getMonth()`.

**Returns:** the month-of-year, from 1 to 12

**See also:** #getMonth()

## OffsetDateTime.getMonth()

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

## OffsetDateTime.getDayOfMonth()

```java
public int getDayOfMonth()
```

Gets the day-of-month field.

This method returns the primitive `int` value for the day-of-month.

**Returns:** the day-of-month, from 1 to 31

## OffsetDateTime.getDayOfYear()

```java
public int getDayOfYear()
```

Gets the day-of-year field.

This method returns the primitive `int` value for the day-of-year.

**Returns:** the day-of-year, from 1 to 365, or 366 in a leap year

## OffsetDateTime.getDayOfWeek()

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

## OffsetDateTime.toLocalTime()

```java
public LocalTime toLocalTime()
```

Gets the `LocalTime` part of this date-time.

This returns a `LocalTime` with the same hour, minute, second and
nanosecond as this date-time.

**Returns:** the time part of this date-time, not null

## OffsetDateTime.getHour()

```java
public int getHour()
```

Gets the hour-of-day field.

**Returns:** the hour-of-day, from 0 to 23

## OffsetDateTime.getMinute()

```java
public int getMinute()
```

Gets the minute-of-hour field.

**Returns:** the minute-of-hour, from 0 to 59

## OffsetDateTime.getSecond()

```java
public int getSecond()
```

Gets the second-of-minute field.

**Returns:** the second-of-minute, from 0 to 59

## OffsetDateTime.getNano()

```java
public int getNano()
```

Gets the nano-of-second field.

**Returns:** the nano-of-second, from 0 to 999,999,999

## OffsetDateTime.with(TemporalAdjuster)

```java
public OffsetDateTime with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this date-time.

This returns an `OffsetDateTime`, based on this one, with the date-time adjusted.
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

 result = offsetDateTime.with(JULY).with(lastDayOfMonth());
```

The classes `LocalDate`, `LocalTime` and `ZoneOffset` implement
`TemporalAdjuster`, thus this method can be used to change the date, time or offset:

```java
 result = offsetDateTime.with(date);
 result = offsetDateTime.with(time);
 result = offsetDateTime.with(offset);
```

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** an `OffsetDateTime` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs

## OffsetDateTime.with(TemporalField, long)

```java
public OffsetDateTime with(TemporalField field, long newValue)
```

Returns a copy of this date-time with the specified field set to a new value.

This returns an `OffsetDateTime`, based on this one, with the value
for the specified field changed.
This can be used to change any supported field, such as the year, month or day-of-month.
If it is not possible to set the value, because the field is not supported or for
some other reason, an exception is thrown.

In some cases, changing the specified field can cause the resulting date-time to become invalid,
such as changing the month from 31st January to February would make the day-of-month invalid.
In cases like this, the field is responsible for resolving the date. Typically it will choose
the previous valid date, which would be the last valid day of February in this example.

If the field is a `ChronoField` then the adjustment is implemented here.

The `INSTANT_SECONDS` field will return a date-time with the specified instant.
The offset and nano-of-second are unchanged.
If the new instant value is outside the valid range then a `DateTimeException` will be thrown.

The `OFFSET_SECONDS` field will return a date-time with the specified offset.
The local date-time is unaltered. If the new offset value is outside the valid range
then a `DateTimeException` will be thrown.

The other supported fields will behave as per
the matching method on long) LocalDateTime.
In this case, the offset is not part of the calculation and will be unchanged.

All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.adjustInto(Temporal, long)`
passing `this` as the argument. In this case, the field determines
whether and how to adjust the instant.

This instance is immutable and unaffected by this method call.

Parameters:

- `field`: the field to set in the result, not null
- `newValue`: the new value of the field in the result

**Returns:** an `OffsetDateTime` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## OffsetDateTime.withYear(int)

```java
public OffsetDateTime withYear(int year)
```

Returns a copy of this `OffsetDateTime` with the year altered.

The time and offset do not affect the calculation and will be the same in the result.
If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.

This instance is immutable and unaffected by this method call.

Parameters:

- `year`: the year to set in the result, from MIN_YEAR to MAX_YEAR

**Returns:** an `OffsetDateTime` based on this date-time with the requested year, not null

Throws:

- `DateTimeException`: if the year value is invalid

## OffsetDateTime.withMonth(int)

```java
public OffsetDateTime withMonth(int month)
```

Returns a copy of this `OffsetDateTime` with the month-of-year altered.

The time and offset do not affect the calculation and will be the same in the result.
If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.

This instance is immutable and unaffected by this method call.

Parameters:

- `month`: the month-of-year to set in the result, from 1 (January) to 12 (December)

**Returns:** an `OffsetDateTime` based on this date-time with the requested month, not null

Throws:

- `DateTimeException`: if the month-of-year value is invalid

## OffsetDateTime.withDayOfMonth(int)

```java
public OffsetDateTime withDayOfMonth(int dayOfMonth)
```

Returns a copy of this `OffsetDateTime` with the day-of-month altered.

If the resulting `OffsetDateTime` is invalid, an exception is thrown.
The time and offset do not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `dayOfMonth`: the day-of-month to set in the result, from 1 to 28-31

**Returns:** an `OffsetDateTime` based on this date-time with the requested day, not null

Throws:

- `DateTimeException`: if the day-of-month value is invalid, or if the day-of-month is invalid for the month-year

## OffsetDateTime.withDayOfYear(int)

```java
public OffsetDateTime withDayOfYear(int dayOfYear)
```

Returns a copy of this `OffsetDateTime` with the day-of-year altered.

The time and offset do not affect the calculation and will be the same in the result.
If the resulting `OffsetDateTime` is invalid, an exception is thrown.

This instance is immutable and unaffected by this method call.

Parameters:

- `dayOfYear`: the day-of-year to set in the result, from 1 to 365-366

**Returns:** an `OffsetDateTime` based on this date with the requested day, not null

Throws:

- `DateTimeException`: if the day-of-year value is invalid, or if the day-of-year is invalid for the year

## OffsetDateTime.withHour(int)

```java
public OffsetDateTime withHour(int hour)
```

Returns a copy of this `OffsetDateTime` with the hour-of-day altered.

The date and offset do not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `hour`: the hour-of-day to set in the result, from 0 to 23

**Returns:** an `OffsetDateTime` based on this date-time with the requested hour, not null

Throws:

- `DateTimeException`: if the hour value is invalid

## OffsetDateTime.withMinute(int)

```java
public OffsetDateTime withMinute(int minute)
```

Returns a copy of this `OffsetDateTime` with the minute-of-hour altered.

The date and offset do not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `minute`: the minute-of-hour to set in the result, from 0 to 59

**Returns:** an `OffsetDateTime` based on this date-time with the requested minute, not null

Throws:

- `DateTimeException`: if the minute value is invalid
