---
title: "OffsetTime class (java.time) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/OffsetTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OffsetTime class (java.time)

```java
public final class OffsetTime implements Temporal, TemporalAdjuster, Comparable<OffsetTime>, Serializable
```

A time with an offset from UTC/Greenwich in the ISO-8601 calendar system,
such as `10:15:30+01:00`.

`OffsetTime` is an immutable date-time object that represents a time, often
viewed as hour-minute-second-offset.
This class stores all time fields, to a precision of nanoseconds,
as well as a zone offset.
For example, the value "13:45:30.123456789+02:00" can be stored
in an `OffsetTime`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## OffsetTime.MIN

```java
public static final OffsetTime MIN
```

The minimum supported `OffsetTime`, '00:00:00+18:00'.
This is the time of midnight at the start of the day in the maximum offset
(larger offsets are earlier on the time-line).
This combines `LocalTime.MIN` and `ZoneOffset.MAX`.
This could be used by an application as a "far past" date.

## OffsetTime.MAX

```java
public static final OffsetTime MAX
```

The maximum supported `OffsetTime`, '23:59:59.999999999-18:00'.
This is the time just before midnight at the end of the day in the minimum offset
(larger negative offsets are later on the time-line).
This combines `LocalTime.MAX` and `ZoneOffset.MIN`.
This could be used by an application as a "far future" date.

## OffsetTime.now()

```java
public static OffsetTime now()
```

Obtains the current time from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current time.
The offset will be calculated from the time-zone in the clock.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current time using the system clock and default time-zone, not null

## OffsetTime.now(ZoneId)

```java
public static OffsetTime now(ZoneId zone)
```

Obtains the current time from the system clock in the specified time-zone.

This will query the system clock to obtain the current time.
Specifying the time-zone avoids dependence on the default time-zone.
The offset will be calculated from the specified time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current time using the system clock, not null

## OffsetTime.now(Clock)

```java
public static OffsetTime now(Clock clock)
```

Obtains the current time from the specified clock.

This will query the specified clock to obtain the current time.
The offset will be calculated from the time-zone in the clock.

Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current time, not null

## OffsetTime.of(LocalTime, ZoneOffset)

```java
public static OffsetTime of(LocalTime time, ZoneOffset offset)
```

Obtains an instance of `OffsetTime` from a local time and an offset.

Parameters:

- `time`: the local time, not null
- `offset`: the zone offset, not null

**Returns:** the offset time, not null

## OffsetTime.of(int, int, int, int, ZoneOffset)

```java
public static OffsetTime of(int hour, int minute, int second, int nanoOfSecond, ZoneOffset offset)
```

Obtains an instance of `OffsetTime` from an hour, minute, second and nanosecond.

This creates an offset time with the four specified fields.

This method exists primarily for writing test cases.
Non test-code will typically use other methods to create an offset time.
`LocalTime` has two additional convenience variants of the
equivalent factory method taking fewer arguments.
They are not provided here to reduce the footprint of the API.

Parameters:

- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59
- `nanoOfSecond`: the nano-of-second to represent, from 0 to 999,999,999
- `offset`: the zone offset, not null

**Returns:** the offset time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range

## OffsetTime.ofInstant(Instant, ZoneId)

```java
public static OffsetTime ofInstant(Instant instant, ZoneId zone)
```

Obtains an instance of `OffsetTime` from an `Instant` and zone ID.

This creates an offset time with the same instant as that specified.
Finding the offset from UTC/Greenwich is simple as there is only one valid
offset for each instant.

The date component of the instant is dropped during the conversion.
This means that the conversion can never fail due to the instant being
out of the valid range of dates.

Parameters:

- `instant`: the instant to create the time from, not null
- `zone`: the time-zone, which may be an offset, not null

**Returns:** the offset time, not null

## OffsetTime.from(TemporalAccessor)

```java
public static OffsetTime from(TemporalAccessor temporal)
```

Obtains an instance of `OffsetTime` from a temporal object.

This obtains an offset time based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `OffsetTime`.

The conversion extracts and combines the `ZoneOffset` and the
`LocalTime` from the temporal object.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `OffsetTime::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the offset time, not null

Throws:

- `DateTimeException`: if unable to convert to an `OffsetTime`

## OffsetTime.parse(CharSequence)

```java
public static OffsetTime parse(CharSequence text)
```

Obtains an instance of `OffsetTime` from a text string such as `10:15:30+01:00`.

The string must represent a valid time and is parsed using
`java.time.format.DateTimeFormatter.ISO_OFFSET_TIME`.

Parameters:

- `text`: the text to parse such as "10:15:30+01:00", not null

**Returns:** the parsed local time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## OffsetTime.parse(CharSequence, DateTimeFormatter)

```java
public static OffsetTime parse(CharSequence text, DateTimeFormatter formatter)
```

Obtains an instance of `OffsetTime` from a text string using a specific formatter.

The text is parsed using the formatter, returning a time.

Parameters:

- `text`: the text to parse, not null
- `formatter`: the formatter to use, not null

**Returns:** the parsed offset time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## OffsetTime.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this time can be queried for the specified field.
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

- `OFFSET_SECONDS`

All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this time, false if not

## OffsetTime.isSupported(TemporalUnit)

```java
public boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to, or subtracted from, this offset-time.
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

All other `ChronoUnit` instances will return false.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)`
passing `this` as the argument.
Whether the unit is supported is determined by the unit.

Parameters:

- `unit`: the unit to check, null returns false

**Returns:** true if the unit can be added/subtracted, false if not

## OffsetTime.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This time is used to enhance the accuracy of the returned range.
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

## OffsetTime.get(TemporalField)

```java
public int get(TemporalField field)
```

Gets the value of the specified field from this time as an `int`.

This queries this time for the value of the specified field.
The returned value will always be within the valid range of values for the field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this time, except `NANO_OF_DAY` and `MICRO_OF_DAY`
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

## OffsetTime.getLong(TemporalField)

```java
public long getLong(TemporalField field)
```

Gets the value of the specified field from this time as a `long`.

This queries this time for the value of the specified field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this time.
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

## OffsetTime.getOffset()

```java
public ZoneOffset getOffset()
```

Gets the zone offset, such as '+01:00'.

This is the offset of the local time from UTC/Greenwich.

**Returns:** the zone offset, not null

## OffsetTime.withOffsetSameLocal(ZoneOffset)

```java
public OffsetTime withOffsetSameLocal(ZoneOffset offset)
```

Returns a copy of this `OffsetTime` with the specified offset ensuring
that the result has the same local time.

This method returns an object with the same `LocalTime` and the specified `ZoneOffset`.
No calculation is needed or performed.
For example, if this time represents `10:30+02:00` and the offset specified is
`+03:00`, then this method will return `10:30+03:00`.

To take into account the difference between the offsets, and adjust the time fields,
use `withOffsetSameInstant`.

This instance is immutable and unaffected by this method call.

Parameters:

- `offset`: the zone offset to change to, not null

**Returns:** an `OffsetTime` based on this time with the requested offset, not null

## OffsetTime.withOffsetSameInstant(ZoneOffset)

```java
public OffsetTime withOffsetSameInstant(ZoneOffset offset)
```

Returns a copy of this `OffsetTime` with the specified offset ensuring
that the result is at the same instant on an implied day.

This method returns an object with the specified `ZoneOffset` and a `LocalTime`
adjusted by the difference between the two offsets.
This will result in the old and new objects representing the same instant on an implied day.
This is useful for finding the local time in a different offset.
For example, if this time represents `10:30+02:00` and the offset specified is
`+03:00`, then this method will return `11:30+03:00`.

To change the offset without adjusting the local time use `withOffsetSameLocal`.

This instance is immutable and unaffected by this method call.

Parameters:

- `offset`: the zone offset to change to, not null

**Returns:** an `OffsetTime` based on this time with the requested offset, not null
