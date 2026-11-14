---
title: "ZonedDateTime class (java.time) (part 2 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/ZonedDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZonedDateTime class (java.time) (part 2 of 5)

## ZonedDateTime.from(TemporalAccessor)

```java
public static ZonedDateTime from(TemporalAccessor temporal)
```

Obtains an instance of `ZonedDateTime` from a temporal object.

This obtains a zoned date-time based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `ZonedDateTime`.

The conversion will first obtain a `ZoneId` from the temporal object,
falling back to a `ZoneOffset` if necessary. It will then try to obtain
an `Instant`, falling back to a `LocalDateTime` if necessary.
The result will be either the combination of `ZoneId` or `ZoneOffset`
with `Instant` or `LocalDateTime`.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `ZonedDateTime::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the zoned date-time, not null

Throws:

- `DateTimeException`: if unable to convert to an `ZonedDateTime`

## ZonedDateTime.parse(CharSequence)

```java
public static ZonedDateTime parse(CharSequence text)
```

Obtains an instance of `ZonedDateTime` from a text string such as
`2007-12-03T10:15:30+01:00[Europe/Paris]`.

The string must represent a valid date-time and is parsed using
`java.time.format.DateTimeFormatter.ISO_ZONED_DATE_TIME`.

Parameters:

- `text`: the text to parse such as "2007-12-03T10:15:30+01:00[Europe/Paris]", not null

**Returns:** the parsed zoned date-time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## ZonedDateTime.parse(CharSequence, DateTimeFormatter)

```java
public static ZonedDateTime parse(CharSequence text, DateTimeFormatter formatter)
```

Obtains an instance of `ZonedDateTime` from a text string using a specific formatter.

The text is parsed using the formatter, returning a date-time.

Parameters:

- `text`: the text to parse, not null
- `formatter`: the formatter to use, not null

**Returns:** the parsed zoned date-time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## ZonedDateTime.isSupported(TemporalField)

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

## ZonedDateTime.isSupported(TemporalUnit)

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

## ZonedDateTime.range(TemporalField)

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

## ZonedDateTime.get(TemporalField)

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

## ZonedDateTime.getLong(TemporalField)

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

## ZonedDateTime.getOffset()

```java
public ZoneOffset getOffset()
```

Gets the zone offset, such as '+01:00'.

This is the offset of the local date-time from UTC/Greenwich.

**Returns:** the zone offset, not null

## ZonedDateTime.withEarlierOffsetAtOverlap()

```java
public ZonedDateTime withEarlierOffsetAtOverlap()
```

Returns a copy of this date-time changing the zone offset to the
earlier of the two valid offsets at a local time-line overlap.

This method only has any effect when the local time-line overlaps, such as
at an autumn daylight savings cutover. In this scenario, there are two
valid offsets for the local date-time. Calling this method will return
a zoned date-time with the earlier of the two selected.

If this method is called when it is not an overlap, `this`
is returned.

This instance is immutable and unaffected by this method call.

**Returns:** a `ZonedDateTime` based on this date-time with the earlier offset, not null

## ZonedDateTime.withLaterOffsetAtOverlap()

```java
public ZonedDateTime withLaterOffsetAtOverlap()
```

Returns a copy of this date-time changing the zone offset to the
later of the two valid offsets at a local time-line overlap.

This method only has any effect when the local time-line overlaps, such as
at an autumn daylight savings cutover. In this scenario, there are two
valid offsets for the local date-time. Calling this method will return
a zoned date-time with the later of the two selected.

If this method is called when it is not an overlap, `this`
is returned.

This instance is immutable and unaffected by this method call.

**Returns:** a `ZonedDateTime` based on this date-time with the later offset, not null

## ZonedDateTime.getZone()

```java
public ZoneId getZone()
```

Gets the time-zone, such as 'Europe/Paris'.

This returns the zone ID. This identifies the time-zone rules
that determine when and how the offset from UTC/Greenwich changes.

The zone ID may be same as the offset.
If this is true, then any future calculations, such as addition or subtraction,
have no complex edge cases due to time-zone rules.
See also `withFixedOffsetZone()`.

**Returns:** the time-zone, not null

## ZonedDateTime.withZoneSameLocal(ZoneId)

```java
public ZonedDateTime withZoneSameLocal(ZoneId zone)
```

Returns a copy of this date-time with a different time-zone,
retaining the local date-time if possible.

This method changes the time-zone and retains the local date-time.
The local date-time is only changed if it is invalid for the new zone,
determined using the same approach as
ZoneId, ZoneOffset).

To change the zone and adjust the local date-time,
use `withZoneSameInstant(ZoneId)`.

This instance is immutable and unaffected by this method call.

Parameters:

- `zone`: the time-zone to change to, not null

**Returns:** a `ZonedDateTime` based on this date-time with the requested zone, not null

## ZonedDateTime.withZoneSameInstant(ZoneId)

```java
public ZonedDateTime withZoneSameInstant(ZoneId zone)
```

Returns a copy of this date-time with a different time-zone,
retaining the instant.

This method changes the time-zone and retains the instant.
This normally results in a change to the local date-time.

This method is based on retaining the same instant, thus gaps and overlaps
in the local time-line have no effect on the result.

To change the offset while keeping the local time,
use `withZoneSameLocal(ZoneId)`.

Parameters:

- `zone`: the time-zone to change to, not null

**Returns:** a `ZonedDateTime` based on this date-time with the requested zone, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.withFixedOffsetZone()

```java
public ZonedDateTime withFixedOffsetZone()
```

Returns a copy of this date-time with the zone ID set to the offset.

This returns a zoned date-time where the zone ID is the same as `getOffset()`.
The local date-time, offset and instant of the result will be the same as in this date-time.

Setting the date-time to a fixed single offset means that any future
calculations, such as addition or subtraction, have no complex edge cases
due to time-zone rules.
This might also be useful when sending a zoned date-time across a network,
as most protocols, such as ISO-8601, only handle offsets,
and not region-based zone IDs.

This is equivalent to `ZonedDateTime.of(zdt.toLocalDateTime(), zdt.getOffset())`.

**Returns:** a `ZonedDateTime` with the zone ID set to the offset, not null

## ZonedDateTime.toLocalDateTime()

```java
public LocalDateTime toLocalDateTime()
```

Gets the `LocalDateTime` part of this date-time.

This returns a `LocalDateTime` with the same year, month, day and time
as this date-time.

**Returns:** the local date-time part of this date-time, not null

## ZonedDateTime.toLocalDate()

```java
public LocalDate toLocalDate()
```

Gets the `LocalDate` part of this date-time.

This returns a `LocalDate` with the same year, month and day
as this date-time.

**Returns:** the date part of this date-time, not null

## ZonedDateTime.getYear()

```java
public int getYear()
```

Gets the year field.

This method returns the primitive `int` value for the year.

The year returned by this method is proleptic as per `get(YEAR)`.
To obtain the year-of-era, use `get(YEAR_OF_ERA)`.

**Returns:** the year, from MIN_YEAR to MAX_YEAR

## ZonedDateTime.getMonthValue()

```java
public int getMonthValue()
```

Gets the month-of-year field from 1 to 12.

This method returns the month as an `int` from 1 to 12.
Application code is frequently clearer if the enum `Month`
is used by calling `getMonth()`.

**Returns:** the month-of-year, from 1 to 12

**See also:** #getMonth()

## ZonedDateTime.getMonth()

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

## ZonedDateTime.getDayOfMonth()

```java
public int getDayOfMonth()
```

Gets the day-of-month field.

This method returns the primitive `int` value for the day-of-month.

**Returns:** the day-of-month, from 1 to 31

## ZonedDateTime.getDayOfYear()

```java
public int getDayOfYear()
```

Gets the day-of-year field.

This method returns the primitive `int` value for the day-of-year.

**Returns:** the day-of-year, from 1 to 365, or 366 in a leap year
