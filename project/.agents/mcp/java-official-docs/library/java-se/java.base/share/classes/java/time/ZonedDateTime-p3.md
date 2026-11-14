---
title: "ZonedDateTime class (java.time) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/ZonedDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZonedDateTime class (java.time) (part 3 of 5)

## ZonedDateTime.getDayOfWeek()

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

## ZonedDateTime.toLocalTime()

```java
public LocalTime toLocalTime()
```

Gets the `LocalTime` part of this date-time.

This returns a `LocalTime` with the same hour, minute, second and
nanosecond as this date-time.

**Returns:** the time part of this date-time, not null

## ZonedDateTime.getHour()

```java
public int getHour()
```

Gets the hour-of-day field.

**Returns:** the hour-of-day, from 0 to 23

## ZonedDateTime.getMinute()

```java
public int getMinute()
```

Gets the minute-of-hour field.

**Returns:** the minute-of-hour, from 0 to 59

## ZonedDateTime.getSecond()

```java
public int getSecond()
```

Gets the second-of-minute field.

**Returns:** the second-of-minute, from 0 to 59

## ZonedDateTime.getNano()

```java
public int getNano()
```

Gets the nano-of-second field.

**Returns:** the nano-of-second, from 0 to 999,999,999

## ZonedDateTime.with(TemporalAdjuster)

```java
public ZonedDateTime with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this date-time.

This returns a `ZonedDateTime`, based on this one, with the date-time adjusted.
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

 result = zonedDateTime.with(JULY).with(lastDayOfMonth());
```

The classes `LocalDate` and `LocalTime` implement `TemporalAdjuster`,
thus this method can be used to change the date, time or offset:

```java
 result = zonedDateTime.with(date);
 result = zonedDateTime.with(time);
```

`ZoneOffset` also implements `TemporalAdjuster` however using it
as an argument typically has no effect. The offset of a `ZonedDateTime` is
controlled primarily by the time-zone. As such, changing the offset does not generally
make sense, because there is only one valid offset for the local date-time and zone.
If the zoned date-time is in a daylight savings overlap, then the offset is used
to switch between the two valid offsets. In all other cases, the offset is ignored.

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** a `ZonedDateTime` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs

## ZonedDateTime.with(TemporalField, long)

```java
public ZonedDateTime with(TemporalField field, long newValue)
```

Returns a copy of this date-time with the specified field set to a new value.

This returns a `ZonedDateTime`, based on this one, with the value
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
The zone and nano-of-second are unchanged.
The result will have an offset derived from the new instant and original zone.
If the new instant value is outside the valid range then a `DateTimeException` will be thrown.

The `OFFSET_SECONDS` field will typically be ignored.
The offset of a `ZonedDateTime` is controlled primarily by the time-zone.
As such, changing the offset does not generally make sense, because there is only
one valid offset for the local date-time and zone.
If the zoned date-time is in a daylight savings overlap, then the offset is used
to switch between the two valid offsets. In all other cases, the offset is ignored.
If the new offset value is outside the valid range then a `DateTimeException` will be thrown.

The other supported fields will behave as per
the matching method on long) LocalDateTime.
The zone is not part of the calculation and will be unchanged.
When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.adjustInto(Temporal, long)`
passing `this` as the argument. In this case, the field determines
whether and how to adjust the instant.

This instance is immutable and unaffected by this method call.

Parameters:

- `field`: the field to set in the result, not null
- `newValue`: the new value of the field in the result

**Returns:** a `ZonedDateTime` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## ZonedDateTime.withYear(int)

```java
public ZonedDateTime withYear(int year)
```

Returns a copy of this `ZonedDateTime` with the year altered.

This operates on the local time-line,
changing the year of the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `year`: the year to set in the result, from MIN_YEAR to MAX_YEAR

**Returns:** a `ZonedDateTime` based on this date-time with the requested year, not null

Throws:

- `DateTimeException`: if the year value is invalid

## ZonedDateTime.withMonth(int)

```java
public ZonedDateTime withMonth(int month)
```

Returns a copy of this `ZonedDateTime` with the month-of-year altered.

This operates on the local time-line,
changing the month of the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `month`: the month-of-year to set in the result, from 1 (January) to 12 (December)

**Returns:** a `ZonedDateTime` based on this date-time with the requested month, not null

Throws:

- `DateTimeException`: if the month-of-year value is invalid

## ZonedDateTime.withDayOfMonth(int)

```java
public ZonedDateTime withDayOfMonth(int dayOfMonth)
```

Returns a copy of this `ZonedDateTime` with the day-of-month altered.

This operates on the local time-line,
changing the day-of-month of the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `dayOfMonth`: the day-of-month to set in the result, from 1 to 28-31

**Returns:** a `ZonedDateTime` based on this date-time with the requested day, not null

Throws:

- `DateTimeException`: if the day-of-month value is invalid, or if the day-of-month is invalid for the month-year

## ZonedDateTime.withDayOfYear(int)

```java
public ZonedDateTime withDayOfYear(int dayOfYear)
```

Returns a copy of this `ZonedDateTime` with the day-of-year altered.

This operates on the local time-line,
changing the day-of-year of the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `dayOfYear`: the day-of-year to set in the result, from 1 to 365-366

**Returns:** a `ZonedDateTime` based on this date with the requested day, not null

Throws:

- `DateTimeException`: if the day-of-year value is invalid, or if the day-of-year is invalid for the year

## ZonedDateTime.withHour(int)

```java
public ZonedDateTime withHour(int hour)
```

Returns a copy of this `ZonedDateTime` with the hour-of-day altered.

This operates on the local time-line,
changing the time of the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `hour`: the hour-of-day to set in the result, from 0 to 23

**Returns:** a `ZonedDateTime` based on this date-time with the requested hour, not null

Throws:

- `DateTimeException`: if the hour value is invalid

## ZonedDateTime.withMinute(int)

```java
public ZonedDateTime withMinute(int minute)
```

Returns a copy of this `ZonedDateTime` with the minute-of-hour altered.

This operates on the local time-line,
changing the time of the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `minute`: the minute-of-hour to set in the result, from 0 to 59

**Returns:** a `ZonedDateTime` based on this date-time with the requested minute, not null

Throws:

- `DateTimeException`: if the minute value is invalid

## ZonedDateTime.withSecond(int)

```java
public ZonedDateTime withSecond(int second)
```

Returns a copy of this `ZonedDateTime` with the second-of-minute altered.

This operates on the local time-line,
changing the time of the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `second`: the second-of-minute to set in the result, from 0 to 59

**Returns:** a `ZonedDateTime` based on this date-time with the requested second, not null

Throws:

- `DateTimeException`: if the second value is invalid

## ZonedDateTime.withNano(int)

```java
public ZonedDateTime withNano(int nanoOfSecond)
```

Returns a copy of this `ZonedDateTime` with the nano-of-second altered.

This operates on the local time-line,
changing the time of the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanoOfSecond`: the nano-of-second to set in the result, from 0 to 999,999,999

**Returns:** a `ZonedDateTime` based on this date-time with the requested nanosecond, not null

Throws:

- `DateTimeException`: if the nano value is invalid
