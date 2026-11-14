---
title: "LocalTime class (java.time) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalTime class (java.time)

```java
public final class LocalTime implements Temporal, TemporalAdjuster, Comparable<LocalTime>, Serializable
```

A time without a time-zone in the ISO-8601 calendar system,
such as `10:15:30`.

`LocalTime` is an immutable date-time object that represents a time,
often viewed as hour-minute-second.
Time is represented to nanosecond precision.
For example, the value "13:45.30.123456789" can be stored in a `LocalTime`.

This class does not store or represent a date or time-zone.
Instead, it is a description of the local time as seen on a wall clock.
It cannot represent an instant on the time-line without additional information
such as an offset or time-zone.

The ISO-8601 calendar system is the modern civil calendar system used today
in most of the world. This API assumes that all calendar systems use the same
representation, this class, for time-of-day.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## LocalTime.MIN

```java
public static final LocalTime MIN
```

The minimum supported `LocalTime`, '00:00'.
This is the time of midnight at the start of the day.

## LocalTime.MAX

```java
public static final LocalTime MAX
```

The maximum supported `LocalTime`, '23:59:59.999999999'.
This is the time just before midnight at the end of the day.

## LocalTime.MIDNIGHT

```java
public static final LocalTime MIDNIGHT
```

The time of midnight at the start of the day, '00:00'.

## LocalTime.NOON

```java
public static final LocalTime NOON
```

The time of noon in the middle of the day, '12:00'.

## LocalTime.now()

```java
public static LocalTime now()
```

Obtains the current time from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current time.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current time using the system clock and default time-zone, not null

## LocalTime.now(ZoneId)

```java
public static LocalTime now(ZoneId zone)
```

Obtains the current time from the system clock in the specified time-zone.

This will query the system clock to obtain the current time.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current time using the system clock, not null

## LocalTime.now(Clock)

```java
public static LocalTime now(Clock clock)
```

Obtains the current time from the specified clock.

This will query the specified clock to obtain the current time.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current time, not null

## LocalTime.of(int, int)

```java
public static LocalTime of(int hour, int minute)
```

Obtains an instance of `LocalTime` from an hour and minute.

This returns a `LocalTime` with the specified hour and minute.
The second and nanosecond fields will be set to zero.

Parameters:

- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59

**Returns:** the local time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range

## LocalTime.of(int, int, int)

```java
public static LocalTime of(int hour, int minute, int second)
```

Obtains an instance of `LocalTime` from an hour, minute and second.

This returns a `LocalTime` with the specified hour, minute and second.
The nanosecond field will be set to zero.

Parameters:

- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59

**Returns:** the local time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range

## LocalTime.of(int, int, int, int)

```java
public static LocalTime of(int hour, int minute, int second, int nanoOfSecond)
```

Obtains an instance of `LocalTime` from an hour, minute, second and nanosecond.

This returns a `LocalTime` with the specified hour, minute, second and nanosecond.

Parameters:

- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59
- `nanoOfSecond`: the nano-of-second to represent, from 0 to 999,999,999

**Returns:** the local time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range

## LocalTime.ofInstant(Instant, ZoneId)

```java
public static LocalTime ofInstant(Instant instant, ZoneId zone)
```

Obtains an instance of `LocalTime` from an `Instant` and zone ID.

This creates a local time based on the specified instant.
First, the offset from UTC/Greenwich is obtained using the zone ID and instant,
which is simple as there is only one valid offset for each instant.
Then, the instant and offset are used to calculate the local time.

Parameters:

- `instant`: the instant to create the time from, not null
- `zone`: the time-zone, which may be an offset, not null

**Returns:** the local time, not null

**Since:** 9

## LocalTime.ofSecondOfDay(long)

```java
public static LocalTime ofSecondOfDay(long secondOfDay)
```

Obtains an instance of `LocalTime` from a second-of-day value.

This returns a `LocalTime` with the specified second-of-day.
The nanosecond field will be set to zero.

Parameters:

- `secondOfDay`: the second-of-day, from `0` to `24 * 60 * 60 - 1`

**Returns:** the local time, not null

Throws:

- `DateTimeException`: if the second-of-day value is invalid

## LocalTime.ofNanoOfDay(long)

```java
public static LocalTime ofNanoOfDay(long nanoOfDay)
```

Obtains an instance of `LocalTime` from a nanos-of-day value.

This returns a `LocalTime` with the specified nanosecond-of-day.

Parameters:

- `nanoOfDay`: the nano of day, from `0` to `24 * 60 * 60 * 1,000,000,000 - 1`

**Returns:** the local time, not null

Throws:

- `DateTimeException`: if the nanos of day value is invalid

## LocalTime.from(TemporalAccessor)

```java
public static LocalTime from(TemporalAccessor temporal)
```

Obtains an instance of `LocalTime` from a temporal object.

This obtains a local time based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `LocalTime`.

The conversion uses the `TemporalQueries.localTime()` query, which relies
on extracting the NANO_OF_DAY field.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `LocalTime::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the local time, not null

Throws:

- `DateTimeException`: if unable to convert to a `LocalTime`

## LocalTime.parse(CharSequence)

```java
public static LocalTime parse(CharSequence text)
```

Obtains an instance of `LocalTime` from a text string such as `10:15`.

The string must represent a valid time and is parsed using
`java.time.format.DateTimeFormatter.ISO_LOCAL_TIME`.

Parameters:

- `text`: the text to parse such as "10:15:30", not null

**Returns:** the parsed local time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## LocalTime.parse(CharSequence, DateTimeFormatter)

```java
public static LocalTime parse(CharSequence text, DateTimeFormatter formatter)
```

Obtains an instance of `LocalTime` from a text string using a specific formatter.

The text is parsed using the formatter, returning a time.

Parameters:

- `text`: the text to parse, not null
- `formatter`: the formatter to use, not null

**Returns:** the parsed local time, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## LocalTime.isSupported(TemporalField)

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

All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this time, false if not

## LocalTime.isSupported(TemporalUnit)

```java
public boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to, or subtracted from, this time.
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

## LocalTime.range(TemporalField)

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

## LocalTime.get(TemporalField)

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

## LocalTime.getLong(TemporalField)

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

## LocalTime.getHour()

```java
public int getHour()
```

Gets the hour-of-day field.

**Returns:** the hour-of-day, from 0 to 23

## LocalTime.getMinute()

```java
public int getMinute()
```

Gets the minute-of-hour field.

**Returns:** the minute-of-hour, from 0 to 59

## LocalTime.getSecond()

```java
public int getSecond()
```

Gets the second-of-minute field.

**Returns:** the second-of-minute, from 0 to 59

## LocalTime.getNano()

```java
public int getNano()
```

Gets the nano-of-second field.

**Returns:** the nano-of-second, from 0 to 999,999,999
