---
title: "ChronoZonedDateTime interface (java.time.chrono) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ChronoZonedDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChronoZonedDateTime interface (java.time.chrono)

```java
public interface ChronoZonedDateTime<D extends ChronoLocalDate> extends Temporal, Comparable<ChronoZonedDateTime<?>>
```

A date-time with a time-zone in an arbitrary chronology,
intended for advanced globalization use cases.

**Most applications should declare method signatures, fields and variables
as `ZonedDateTime`, not this interface.**

A `ChronoZonedDateTime` is the abstract representation of an offset date-time
where the `Chronology chronology`, or calendar system, is pluggable.
The date-time is defined in terms of fields expressed by `TemporalField`,
where most common implementations are defined in `ChronoField`.
The chronology defines how the calendar system operates and the meaning of
the standard fields.

#### When to use this interface

The design of the API encourages the use of `ZonedDateTime` rather than this
interface, even in the case where the application needs to deal with multiple
calendar systems. The rationale for this is explored in detail in `ChronoLocalDate`.

Ensure that the discussion in `ChronoLocalDate` has been read and understood
before using this interface.

Parameters:

- `<D>`: the concrete type for the date of this date-time

**Implementation requirements:** This interface must be implemented with care to ensure other classes operate correctly.
All implementations that can be instantiated must be final, immutable and thread-safe.
Subclasses should be Serializable wherever possible.

**Since:** 1.8

## ChronoZonedDateTime.timeLineOrder()

```java
static Comparator<ChronoZonedDateTime<?>> timeLineOrder()
```

Gets a comparator that compares `ChronoZonedDateTime` in
time-line order ignoring the chronology.

This comparator differs from the comparison in `compareTo` in that it
only compares the underlying instant and not the chronology.
This allows dates in different calendar systems to be compared based
on the position of the date-time on the instant time-line.
The underlying comparison is equivalent to comparing the epoch-second and nano-of-second.

**Returns:** a comparator that compares in time-line order ignoring the chronology

**See also:** #isAfter

**See also:** #isBefore

**See also:** #isEqual

## ChronoZonedDateTime.from(TemporalAccessor)

```java
static ChronoZonedDateTime<?> from(TemporalAccessor temporal)
```

Obtains an instance of `ChronoZonedDateTime` from a temporal object.

This creates a zoned date-time based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `ChronoZonedDateTime`.

The conversion extracts and combines the chronology, date, time and zone
from the temporal object. The behavior is equivalent to using
`Chronology.zonedDateTime(TemporalAccessor)` with the extracted chronology.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `ChronoZonedDateTime::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the date-time, not null

**See also:** Chronology#zonedDateTime(TemporalAccessor)

Throws:

- `DateTimeException`: if unable to convert to a `ChronoZonedDateTime`

## ChronoZonedDateTime.toLocalDate()

```java
default D toLocalDate()
```

Gets the local date part of this date-time.

This returns a local date with the same year, month and day
as this date-time.

**Returns:** the date part of this date-time, not null

## ChronoZonedDateTime.toLocalTime()

```java
default LocalTime toLocalTime()
```

Gets the local time part of this date-time.

This returns a local time with the same hour, minute, second and
nanosecond as this date-time.

**Returns:** the time part of this date-time, not null

## ChronoZonedDateTime.toLocalDateTime()

```java
ChronoLocalDateTime<D> toLocalDateTime()
```

Gets the local date-time part of this date-time.

This returns a local date with the same year, month and day
as this date-time.

**Returns:** the local date-time part of this date-time, not null

## ChronoZonedDateTime.getChronology()

```java
default Chronology getChronology()
```

Gets the chronology of this date-time.

The `Chronology` represents the calendar system in use.
The era and other fields in `ChronoField` are defined by the chronology.

**Returns:** the chronology, not null

## ChronoZonedDateTime.getOffset()

```java
ZoneOffset getOffset()
```

Gets the zone offset, such as '+01:00'.

This is the offset of the local date-time from UTC/Greenwich.

**Returns:** the zone offset, not null

## ChronoZonedDateTime.getZone()

```java
ZoneId getZone()
```

Gets the zone ID, such as 'Europe/Paris'.

This returns the stored time-zone id used to determine the time-zone rules.

**Returns:** the zone ID, not null

## ChronoZonedDateTime.withEarlierOffsetAtOverlap()

```java
ChronoZonedDateTime<D> withEarlierOffsetAtOverlap()
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

**Returns:** a `ChronoZonedDateTime` based on this date-time with the earlier offset, not null

Throws:

- `DateTimeException`: if no rules can be found for the zone
- `DateTimeException`: if no rules are valid for this date-time

## ChronoZonedDateTime.withLaterOffsetAtOverlap()

```java
ChronoZonedDateTime<D> withLaterOffsetAtOverlap()
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

**Returns:** a `ChronoZonedDateTime` based on this date-time with the later offset, not null

Throws:

- `DateTimeException`: if no rules can be found for the zone
- `DateTimeException`: if no rules are valid for this date-time

## ChronoZonedDateTime.withZoneSameLocal(ZoneId)

```java
ChronoZonedDateTime<D> withZoneSameLocal(ZoneId zone)
```

Returns a copy of this date-time with a different time-zone,
retaining the local date-time if possible.

This method changes the time-zone and retains the local date-time.
The local date-time is only changed if it is invalid for the new zone.

To change the zone and adjust the local date-time,
use `withZoneSameInstant(ZoneId)`.

This instance is immutable and unaffected by this method call.

Parameters:

- `zone`: the time-zone to change to, not null

**Returns:** a `ChronoZonedDateTime` based on this date-time with the requested zone, not null

## ChronoZonedDateTime.withZoneSameInstant(ZoneId)

```java
ChronoZonedDateTime<D> withZoneSameInstant(ZoneId zone)
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

**Returns:** a `ChronoZonedDateTime` based on this date-time with the requested zone, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ChronoZonedDateTime.isSupported(TemporalField)

```java
boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if the specified field can be queried on this date-time.
If false, then calling the range,
get and long)
methods will throw an exception.

The set of supported fields is defined by the chronology and normally includes
all `ChronoField` fields.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field can be queried, false if not

## ChronoZonedDateTime.isSupported(TemporalUnit)

```java
default boolean isSupported(TemporalUnit unit)
```

Checks if the specified unit is supported.

This checks if the specified unit can be added to or subtracted from this date-time.
If false, then calling the TemporalUnit) and
TemporalUnit) minus methods will throw an exception.

The set of supported units is defined by the chronology and normally includes
all `ChronoUnit` units except `FOREVER`.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.isSupportedBy(Temporal)`
passing `this` as the argument.
Whether the unit is supported is determined by the unit.

Parameters:

- `unit`: the unit to check, null returns false

**Returns:** true if the unit can be added/subtracted, false if not

## ChronoZonedDateTime.with(TemporalAdjuster)

```java
default ChronoZonedDateTime<D> with(TemporalAdjuster adjuster)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoZonedDateTime.with(TemporalField, long)

```java
ChronoZonedDateTime<D> with(TemporalField field, long newValue)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoZonedDateTime.plus(TemporalAmount)

```java
default ChronoZonedDateTime<D> plus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoZonedDateTime.plus(long, TemporalUnit)

```java
ChronoZonedDateTime<D> plus(long amountToAdd, TemporalUnit unit)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoZonedDateTime.minus(TemporalAmount)

```java
default ChronoZonedDateTime<D> minus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoZonedDateTime.minus(long, TemporalUnit)

```java
default ChronoZonedDateTime<D> minus(long amountToSubtract, TemporalUnit unit)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoZonedDateTime.query(TemporalQuery<R>)

```java
default <R> R query(TemporalQuery<R> query)
```

Queries this date-time using the specified query.

This queries this date-time using the specified query strategy object.
The `TemporalQuery` object defines the logic to be used to
obtain the result. Read the documentation of the query to understand
what the result of this method will be.

The result of this method is obtained by invoking the
`TemporalQuery.queryFrom(TemporalAccessor)` method on the
specified query passing `this` as the argument.

Parameters:

- `<R>`: the type of the result
- `query`: the query to invoke, not null

**Returns:** the query result, null may be returned (defined by the query)

Throws:

- `DateTimeException`: if unable to query (defined by the query)
- `ArithmeticException`: if numeric overflow occurs (defined by the query)

## ChronoZonedDateTime.format(DateTimeFormatter)

```java
default String format(DateTimeFormatter formatter)
```

Formats this date-time using the specified formatter.

This date-time will be passed to the formatter to produce a string.

The default implementation must behave as follows:

```java
 return formatter.format(this);
```

Parameters:

- `formatter`: the formatter to use, not null

**Returns:** the formatted date-time string, not null

Throws:

- `DateTimeException`: if an error occurs during printing

## ChronoZonedDateTime.toInstant()

```java
default Instant toInstant()
```

Converts this date-time to an `Instant`.

This returns an `Instant` representing the same point on the
time-line as this date-time. The calculation combines the
local date-time and
offset.

**Returns:** an `Instant` representing the same instant, not null

## ChronoZonedDateTime.toEpochSecond()

```java
default long toEpochSecond()
```

Converts this date-time to the number of seconds from the epoch
of 1970-01-01T00:00:00Z.

This uses the local date-time and
offset to calculate the epoch-second value,
which is the number of elapsed seconds from 1970-01-01T00:00:00Z.
Instants on the time-line after the epoch are positive, earlier are negative.

**Returns:** the number of seconds from the epoch of 1970-01-01T00:00:00Z

## ChronoZonedDateTime.compareTo(ChronoZonedDateTime<?>)

```java
default int compareTo(ChronoZonedDateTime<?> other)
```

Compares this date-time to another date-time, including the chronology.

The comparison is based first on the instant, then on the local date-time,
then on the zone ID, then on the chronology.
It is "consistent with equals", as defined by `Comparable`.

If all the date-time objects being compared are in the same chronology, then the
additional chronology stage is not required.

This default implementation performs the comparison defined above.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** the comparator value, that is the comparison of this with the `other` values for the instant,
         the local date-time, the zone ID, and the chronology, in order, returning the first non-zero result,
         and otherwise returning zero

**See also:** #isBefore

**See also:** #isAfter
