---
title: "ZonedDateTime class (java.time) (part 1 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/ZonedDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZonedDateTime class (java.time)

```java
public final class ZonedDateTime implements Temporal, ChronoZonedDateTime<LocalDate>, Serializable
```

A date-time with a time-zone in the ISO-8601 calendar system,
such as `2007-12-03T10:15:30+01:00 Europe/Paris`.

`ZonedDateTime` is an immutable representation of a date-time with a time-zone.
This class stores all date and time fields, to a precision of nanoseconds,
and a time-zone, with a zone offset used to handle ambiguous local date-times.
For example, the value
"2nd October 2007 at 13:45.30.123456789 +02:00 in the Europe/Paris time-zone"
can be stored in a `ZonedDateTime`.

This class handles conversion from the local time-line of `LocalDateTime`
to the instant time-line of `Instant`.
The difference between the two time-lines is the offset from UTC/Greenwich,
represented by a `ZoneOffset`.

Converting between the two time-lines involves calculating the offset using the
rules accessed from the `ZoneId`.
Obtaining the offset for an instant is simple, as there is exactly one valid
offset for each instant. By contrast, obtaining the offset for a local date-time
is not straightforward. There are three cases:

- Normal, with one valid offset. For the vast majority of the year, the normal
 case applies, where there is a single valid offset for the local date-time.

- Gap, with zero valid offsets. This is when clocks jump forward typically
 due to the spring daylight savings change from "winter" to "summer".
 In a gap there are local date-time values with no valid offset.

- Overlap, with two valid offsets. This is when clocks are set back typically
 due to the autumn daylight savings change from "summer" to "winter".
 In an overlap there are local date-time values with two valid offsets.

Any method that converts directly or implicitly from a local date-time to an
instant by obtaining the offset has the potential to be complicated.

For Gaps, the general strategy is that if the local date-time falls in the
middle of a Gap, then the resulting zoned date-time will have a local date-time
shifted forwards by the length of the Gap, resulting in a date-time in the later
offset, typically "summer" time.

For Overlaps, the general strategy is that if the local date-time falls in the
middle of an Overlap, then the previous offset will be retained. If there is no
previous offset, or the previous offset is invalid, then the earlier offset is
used, typically "summer" time.. Two additional methods,
`withEarlierOffsetAtOverlap()` and `withLaterOffsetAtOverlap()`,
help manage the case of an overlap.

In terms of design, this class should be viewed primarily as the combination
of a `LocalDateTime` and a `ZoneId`. The `ZoneOffset` is
a vital, but secondary, piece of information, used to ensure that the class
represents an instant, especially during a daylight savings overlap.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** A `ZonedDateTime` holds state equivalent to three separate objects,
a `LocalDateTime`, a `ZoneId` and the resolved `ZoneOffset`.
The offset and local date-time are used to define an instant when necessary.
The zone ID is used to obtain the rules for how and when the offset changes.
The offset cannot be freely set, as the zone controls which offsets are valid.

This class is immutable and thread-safe.

**Since:** 1.8

## ZonedDateTime.now()

```java
public static ZonedDateTime now()
```

Obtains the current date-time from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date-time.
The zone and offset will be set based on the time-zone in the clock.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current date-time using the system clock, not null

## ZonedDateTime.now(ZoneId)

```java
public static ZonedDateTime now(ZoneId zone)
```

Obtains the current date-time from the system clock in the specified time-zone.

This will query the system clock to obtain the current date-time.
Specifying the time-zone avoids dependence on the default time-zone.
The offset will be calculated from the specified time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current date-time using the system clock, not null

## ZonedDateTime.now(Clock)

```java
public static ZonedDateTime now(Clock clock)
```

Obtains the current date-time from the specified clock.

This will query the specified clock to obtain the current date-time.
The zone and offset will be set based on the time-zone in the clock.

Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current date-time, not null

## ZonedDateTime.of(LocalDate, LocalTime, ZoneId)

```java
public static ZonedDateTime of(LocalDate date, LocalTime time, ZoneId zone)
```

Obtains an instance of `ZonedDateTime` from a local date and time.

This creates a zoned date-time matching the input local date and time as closely as possible.
Time-zone rules, such as daylight savings, mean that not every local date-time
is valid for the specified zone, thus the local date-time may be adjusted.

The local date time and first combined to form a local date-time.
The local date-time is then resolved to a single instant on the time-line.
This is achieved by finding a valid offset from UTC/Greenwich for the local
date-time as defined by the rules of the zone ID.

In most cases, there is only one valid offset for a local date-time.
In the case of an overlap, when clocks are set back, there are two valid offsets.
This method uses the earlier offset typically corresponding to "summer".

In the case of a gap, when clocks jump forward, there is no valid offset.
Instead, the local date-time is adjusted to be later by the length of the gap.
For a typical one hour daylight savings change, the local date-time will be
moved one hour later into the offset typically corresponding to "summer".

Parameters:

- `date`: the local date, not null
- `time`: the local time, not null
- `zone`: the time-zone, not null

**Returns:** the offset date-time, not null

## ZonedDateTime.of(LocalDateTime, ZoneId)

```java
public static ZonedDateTime of(LocalDateTime localDateTime, ZoneId zone)
```

Obtains an instance of `ZonedDateTime` from a local date-time.

This creates a zoned date-time matching the input local date-time as closely as possible.
Time-zone rules, such as daylight savings, mean that not every local date-time
is valid for the specified zone, thus the local date-time may be adjusted.

The local date-time is resolved to a single instant on the time-line.
This is achieved by finding a valid offset from UTC/Greenwich for the local
date-time as defined by the rules of the zone ID.

In most cases, there is only one valid offset for a local date-time.
In the case of an overlap, when clocks are set back, there are two valid offsets.
This method uses the earlier offset typically corresponding to "summer".

In the case of a gap, when clocks jump forward, there is no valid offset.
Instead, the local date-time is adjusted to be later by the length of the gap.
For a typical one hour daylight savings change, the local date-time will be
moved one hour later into the offset typically corresponding to "summer".

Parameters:

- `localDateTime`: the local date-time, not null
- `zone`: the time-zone, not null

**Returns:** the zoned date-time, not null

## ZonedDateTime.of(int, int, int, int, int, int, int, ZoneId)

```java
public static ZonedDateTime of( int year, int month, int dayOfMonth, int hour, int minute, int second, int nanoOfSecond, ZoneId zone)
```

Obtains an instance of `ZonedDateTime` from a year, month, day,
hour, minute, second, nanosecond and time-zone.

This creates a zoned date-time matching the local date-time of the seven
specified fields as closely as possible.
Time-zone rules, such as daylight savings, mean that not every local date-time
is valid for the specified zone, thus the local date-time may be adjusted.

The local date-time is resolved to a single instant on the time-line.
This is achieved by finding a valid offset from UTC/Greenwich for the local
date-time as defined by the rules of the zone ID.

In most cases, there is only one valid offset for a local date-time.
In the case of an overlap, when clocks are set back, there are two valid offsets.
This method uses the earlier offset typically corresponding to "summer".

In the case of a gap, when clocks jump forward, there is no valid offset.
Instead, the local date-time is adjusted to be later by the length of the gap.
For a typical one hour daylight savings change, the local date-time will be
moved one hour later into the offset typically corresponding to "summer".

This method exists primarily for writing test cases.
Non test-code will typically use other methods to create an offset time.
`LocalDateTime` has five additional convenience variants of the
equivalent factory method taking fewer arguments.
They are not provided here to reduce the footprint of the API.

Parameters:

- `year`: the year to represent, from MIN_YEAR to MAX_YEAR
- `month`: the month-of-year to represent, from 1 (January) to 12 (December)
- `dayOfMonth`: the day-of-month to represent, from 1 to 31
- `hour`: the hour-of-day to represent, from 0 to 23
- `minute`: the minute-of-hour to represent, from 0 to 59
- `second`: the second-of-minute to represent, from 0 to 59
- `nanoOfSecond`: the nano-of-second to represent, from 0 to 999,999,999
- `zone`: the time-zone, not null

**Returns:** the offset date-time, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## ZonedDateTime.ofLocal(LocalDateTime, ZoneId, ZoneOffset)

```java
public static ZonedDateTime ofLocal(LocalDateTime localDateTime, ZoneId zone, ZoneOffset preferredOffset)
```

Obtains an instance of `ZonedDateTime` from a local date-time
using the preferred offset if possible.

The local date-time is resolved to a single instant on the time-line.
This is achieved by finding a valid offset from UTC/Greenwich for the local
date-time as defined by the rules of the zone ID.

In most cases, there is only one valid offset for a local date-time.
In the case of an overlap, where clocks are set back, there are two valid offsets.
If the preferred offset is one of the valid offsets then it is used.
Otherwise the earlier valid offset is used, typically corresponding to "summer".

In the case of a gap, where clocks jump forward, there is no valid offset.
Instead, the local date-time is adjusted to be later by the length of the gap.
For a typical one hour daylight savings change, the local date-time will be
moved one hour later into the offset typically corresponding to "summer".

Parameters:

- `localDateTime`: the local date-time, not null
- `zone`: the time-zone, not null
- `preferredOffset`: the zone offset, null if no preference

**Returns:** the zoned date-time, not null

## ZonedDateTime.ofInstant(Instant, ZoneId)

```java
public static ZonedDateTime ofInstant(Instant instant, ZoneId zone)
```

Obtains an instance of `ZonedDateTime` from an `Instant`.

This creates a zoned date-time with the same instant as that specified.
Calling `toInstant()` will return an instant equal to the one used here.

Converting an instant to a zoned date-time is simple as there is only one valid
offset for each instant.

Parameters:

- `instant`: the instant to create the date-time from, not null
- `zone`: the time-zone, not null

**Returns:** the zoned date-time, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## ZonedDateTime.ofInstant(LocalDateTime, ZoneOffset, ZoneId)

```java
public static ZonedDateTime ofInstant(LocalDateTime localDateTime, ZoneOffset offset, ZoneId zone)
```

Obtains an instance of `ZonedDateTime` from the instant formed by combining
the local date-time and offset.

This creates a zoned date-time by combining
the `LocalDateTime` and `ZoneOffset`.
This combination uniquely specifies an instant without ambiguity.

Converting an instant to a zoned date-time is simple as there is only one valid
offset for each instant. If the valid offset is different to the offset specified,
then the date-time and offset of the zoned date-time will differ from those specified.

If the `ZoneId` to be used is a `ZoneOffset`, this method is equivalent
to ZoneId).

Parameters:

- `localDateTime`: the local date-time, not null
- `offset`: the zone offset, not null
- `zone`: the time-zone, not null

**Returns:** the zoned date-time, not null

## ZonedDateTime.ofStrict(LocalDateTime, ZoneOffset, ZoneId)

```java
public static ZonedDateTime ofStrict(LocalDateTime localDateTime, ZoneOffset offset, ZoneId zone)
```

Obtains an instance of `ZonedDateTime` strictly validating the
combination of local date-time, offset and zone ID.

This creates a zoned date-time ensuring that the offset is valid for the
local date-time according to the rules of the specified zone.
If the offset is invalid, an exception is thrown.

Parameters:

- `localDateTime`: the local date-time, not null
- `offset`: the zone offset, not null
- `zone`: the time-zone, not null

**Returns:** the zoned date-time, not null

Throws:

- `DateTimeException`: if the combination of arguments is invalid
