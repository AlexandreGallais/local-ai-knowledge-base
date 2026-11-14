---
title: "Instant class (java.time) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Instant.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Instant class (java.time)

```java
public final class Instant implements Temporal, TemporalAdjuster, Comparable<Instant>, Serializable
```

An instantaneous point on the time-line.

This class models a single instantaneous point on the time-line.
This might be used to record event time-stamps in the application.

The range of an instant requires the storage of a number larger than a `long`.
To achieve this, the class stores a `long` representing epoch-seconds and an
`int` representing nanosecond-of-second, which will always be between 0 and 999,999,999.
The epoch-seconds are measured from the standard Java epoch of `1970-01-01T00:00:00Z`
where instants after the epoch have positive values, and earlier instants have negative values.
For both the epoch-second and nanosecond parts, a larger value is always later on the time-line
than a smaller value.

#### Time-scale

The length of the solar day is the standard way that humans measure time.
This has traditionally been subdivided into 24 hours of 60 minutes of 60 seconds,
forming a 86400 second day.

Modern timekeeping is based on atomic clocks which precisely define an SI second
relative to the transitions of a Caesium atom. The length of an SI second was defined
to be very close to the 86400th fraction of a day.

Unfortunately, as the Earth rotates the length of the day varies.
In addition, over time the average length of the day is getting longer as the Earth slows.
As a result, the length of a solar day in 2012 is slightly longer than 86400 SI seconds.
The actual length of any given day and the amount by which the Earth is slowing
are not predictable and can only be determined by measurement.
The UT1 time-scale captures the accurate length of day, but is only available some
time after the day has completed.

The UTC time-scale is a standard approach to bundle up all the additional fractions
of a second from UT1 into whole seconds, known as *leap-seconds*.
A leap-second may be added or removed depending on the Earth's rotational changes.
As such, UTC permits a day to have 86399 SI seconds or 86401 SI seconds where
necessary in order to keep the day aligned with the Sun.

The modern UTC time-scale was introduced in 1972, introducing the concept of whole leap-seconds.
Between 1958 and 1972, the definition of UTC was complex, with minor sub-second leaps and
alterations to the length of the notional second. As of 2012, discussions are underway
to change the definition of UTC again, with the potential to remove leap seconds or
introduce other changes.

Given the complexity of accurate timekeeping described above, this Java API defines
its own time-scale, the *Java Time-Scale*.

The Java Time-Scale divides each calendar day into exactly 86400
subdivisions, known as seconds.  These seconds may differ from the
SI second.  It closely matches the de facto international civil time
scale, the definition of which changes from time to time.

The Java Time-Scale has slightly different definitions for different
segments of the time-line, each based on the consensus international
time scale that is used as the basis for civil time. Whenever the
internationally-agreed time scale is modified or replaced, a new
segment of the Java Time-Scale must be defined for it.  Each segment
must meet these requirements:

- the Java Time-Scale shall closely match the underlying international
 civil time scale;

- the Java Time-Scale shall exactly match the international civil
 time scale at noon each day;

- the Java Time-Scale shall have a precisely-defined relationship to
 the international civil time scale.

There are currently, as of 2013, two segments in the Java time-scale.

For the segment from 1972-11-03 (exact boundary discussed below) until
further notice, the consensus international time scale is UTC (with
leap seconds).  In this segment, the Java Time-Scale is identical to
UTC-SLS.
This is identical to UTC on days that do not have a leap second.
On days that do have a leap second, the leap second is spread equally
over the last 1000 seconds of the day, maintaining the appearance of
exactly 86400 seconds per day.

For the segment prior to 1972-11-03, extending back arbitrarily far,
the consensus international time scale is defined to be UT1, applied
proleptically, which is equivalent to the (mean) solar time on the
prime meridian (Greenwich). In this segment, the Java Time-Scale is
identical to the consensus international time scale. The exact
boundary between the two segments is the instant where UT1 = UTC
between 1972-11-03T00:00 and 1972-11-04T12:00.

Implementations of the Java time-scale using the JSR-310 API are not
required to provide any clock that is sub-second accurate, or that
progresses monotonically or smoothly. Implementations are therefore
not required to actually perform the UTC-SLS slew or to otherwise be
aware of leap seconds. JSR-310 does, however, require that
implementations must document the approach they use when defining a
clock representing the current instant.
See `Clock` for details on the available clocks.

The Java time-scale is used for all date-time classes.
This includes `Instant`, `LocalDate`, `LocalTime`, `OffsetDateTime`,
`ZonedDateTime` and `Duration`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## Instant.EPOCH

```java
public static final Instant EPOCH
```

Constant for the 1970-01-01T00:00:00Z epoch instant.

## Instant.MIN

```java
public static final Instant MIN
```

The minimum supported `Instant`, '-1000000000-01-01T00:00Z'.
This could be used by an application as a "far past" instant.

This is one year earlier than the minimum `LocalDateTime`.
This provides sufficient values to handle the range of `ZoneOffset`
which affect the instant in addition to the local date-time.
The value is also chosen such that the value of the year fits in
an `int`.

## Instant.MAX

```java
public static final Instant MAX
```

The maximum supported `Instant`, '1000000000-12-31T23:59:59.999999999Z'.
This could be used by an application as a "far future" instant.

This is one year later than the maximum `LocalDateTime`.
This provides sufficient values to handle the range of `ZoneOffset`
which affect the instant in addition to the local date-time.
The value is also chosen such that the value of the year fits in
an `int`.

## Instant.now()

```java
public static Instant now()
```

Obtains the current instant from the system clock.

This will query the system UTC clock to
obtain the current instant.

Using this method will prevent the ability to use an alternate time-source for
testing because the clock is effectively hard-coded.

**Returns:** the current instant using the system clock, not null

## Instant.now(Clock)

```java
public static Instant now(Clock clock)
```

Obtains the current instant from the specified clock.

This will query the specified clock to obtain the current time.

Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current instant, not null

## Instant.ofEpochSecond(long)

```java
public static Instant ofEpochSecond(long epochSecond)
```

Obtains an instance of `Instant` using seconds from the
epoch of 1970-01-01T00:00:00Z.

The nanosecond field is set to zero.

Parameters:

- `epochSecond`: the number of seconds from 1970-01-01T00:00:00Z

**Returns:** an instant, not null

Throws:

- `DateTimeException`: if the instant exceeds the maximum or minimum instant

## Instant.ofEpochSecond(long, long)

```java
public static Instant ofEpochSecond(long epochSecond, long nanoAdjustment)
```

Obtains an instance of `Instant` using seconds from the
epoch of 1970-01-01T00:00:00Z and nanosecond fraction of second.

This method allows an arbitrary number of nanoseconds to be passed in.
The factory will alter the values of the second and nanosecond in order
to ensure that the stored nanosecond is in the range 0 to 999,999,999.
For example, the following will result in exactly the same instant:

```java
 Instant.ofEpochSecond(3, 1);
 Instant.ofEpochSecond(4, -999_999_999);
 Instant.ofEpochSecond(2, 1000_000_001);
```

Parameters:

- `epochSecond`: the number of seconds from 1970-01-01T00:00:00Z
- `nanoAdjustment`: the nanosecond adjustment to the number of seconds, positive or negative

**Returns:** an instant, not null

Throws:

- `DateTimeException`: if the instant exceeds the maximum or minimum instant
- `ArithmeticException`: if numeric overflow occurs

## Instant.ofEpochMilli(long)

```java
public static Instant ofEpochMilli(long epochMilli)
```

Obtains an instance of `Instant` using milliseconds from the
epoch of 1970-01-01T00:00:00Z.

The seconds and nanoseconds are extracted from the specified milliseconds.

Parameters:

- `epochMilli`: the number of milliseconds from 1970-01-01T00:00:00Z

**Returns:** an instant, not null

## Instant.from(TemporalAccessor)

```java
public static Instant from(TemporalAccessor temporal)
```

Obtains an instance of `Instant` from a temporal object.

This obtains an instant based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `Instant`.

The conversion extracts the INSTANT_SECONDS
and NANO_OF_SECOND fields.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `Instant::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the instant, not null

Throws:

- `DateTimeException`: if unable to convert to an `Instant`

## Instant.parse(CharSequence)

```java
public static Instant parse(final CharSequence text)
```

Obtains an instance of `Instant` from a text string such as
`2007-12-03T10:15:30.00Z`.

The string must represent a valid instant in UTC and is parsed using
`DateTimeFormatter.ISO_INSTANT`.

Parameters:

- `text`: the text to parse, not null

**Returns:** the parsed instant, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed

## Instant.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this instant can be queried for the specified field.
If false, then calling the range,
get and long)
methods will throw an exception.

If the field is a `ChronoField` then the query is implemented here.
The supported fields are:

- `NANO_OF_SECOND`

- `MICRO_OF_SECOND`

- `MILLI_OF_SECOND`

- `INSTANT_SECONDS`

All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this instant, false if not

## Instant.isSupported(TemporalUnit)

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

All other `ChronoUnit` instances will return false.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)`
passing `this` as the argument.
Whether the unit is supported is determined by the unit.

Parameters:

- `unit`: the unit to check, null returns false

**Returns:** true if the unit can be added/subtracted, false if not

## Instant.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This instant is used to enhance the accuracy of the returned range.
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

## Instant.get(TemporalField)

```java
public int get(TemporalField field)
```

Gets the value of the specified field from this instant as an `int`.

This queries this instant for the value of the specified field.
The returned value will always be within the valid range of values for the field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The supported fields will return valid
values based on this date-time, except `INSTANT_SECONDS` which is too
large to fit in an `int` and throws a `DateTimeException`.
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
