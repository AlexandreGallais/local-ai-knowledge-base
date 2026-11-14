---
title: "ChronoLocalDateTime interface (java.time.chrono) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ChronoLocalDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChronoLocalDateTime interface (java.time.chrono)

```java
public interface ChronoLocalDateTime<D extends ChronoLocalDate> extends Temporal, TemporalAdjuster, Comparable<ChronoLocalDateTime<?>>
```

A date-time without a time-zone in an arbitrary chronology, intended
for advanced globalization use cases.

**Most applications should declare method signatures, fields and variables
as `LocalDateTime`, not this interface.**

A `ChronoLocalDateTime` is the abstract representation of a local date-time
where the `Chronology chronology`, or calendar system, is pluggable.
The date-time is defined in terms of fields expressed by `TemporalField`,
where most common implementations are defined in `ChronoField`.
The chronology defines how the calendar system operates and the meaning of
the standard fields.

#### When to use this interface

The design of the API encourages the use of `LocalDateTime` rather than this
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

## ChronoLocalDateTime.timeLineOrder()

```java
static Comparator<ChronoLocalDateTime<?>> timeLineOrder()
```

Gets a comparator that compares `ChronoLocalDateTime` in
time-line order ignoring the chronology.

This comparator differs from the comparison in `compareTo` in that it
only compares the underlying date-time and not the chronology.
This allows dates in different calendar systems to be compared based
on the position of the date-time on the local time-line.
The underlying comparison is equivalent to comparing the epoch-day and nano-of-day.

**Returns:** a comparator that compares in time-line order ignoring the chronology

**See also:** #isAfter

**See also:** #isBefore

**See also:** #isEqual

## ChronoLocalDateTime.from(TemporalAccessor)

```java
static ChronoLocalDateTime<?> from(TemporalAccessor temporal)
```

Obtains an instance of `ChronoLocalDateTime` from a temporal object.

This obtains a local date-time based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `ChronoLocalDateTime`.

The conversion extracts and combines the chronology and the date-time
from the temporal object. The behavior is equivalent to using
`Chronology.localDateTime(TemporalAccessor)` with the extracted chronology.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `ChronoLocalDateTime::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the date-time, not null

**See also:** Chronology#localDateTime(TemporalAccessor)

Throws:

- `DateTimeException`: if unable to convert to a `ChronoLocalDateTime`

## ChronoLocalDateTime.getChronology()

```java
default Chronology getChronology()
```

Gets the chronology of this date-time.

The `Chronology` represents the calendar system in use.
The era and other fields in `ChronoField` are defined by the chronology.

**Returns:** the chronology, not null

## ChronoLocalDateTime.toLocalDate()

```java
D toLocalDate()
```

Gets the local date part of this date-time.

This returns a local date with the same year, month and day
as this date-time.

**Returns:** the date part of this date-time, not null

## ChronoLocalDateTime.toLocalTime()

```java
LocalTime toLocalTime()
```

Gets the local time part of this date-time.

This returns a local time with the same hour, minute, second and
nanosecond as this date-time.

**Returns:** the time part of this date-time, not null

## ChronoLocalDateTime.isSupported(TemporalField)

```java
boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if the specified field can be queried on this date-time.
If false, then calling the range,
get and long)
methods will throw an exception.

The set of supported fields is defined by the chronology and normally includes
all `ChronoField` date and time fields.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field can be queried, false if not

## ChronoLocalDateTime.isSupported(TemporalUnit)

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

## ChronoLocalDateTime.with(TemporalAdjuster)

```java
default ChronoLocalDateTime<D> with(TemporalAdjuster adjuster)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDateTime.with(TemporalField, long)

```java
ChronoLocalDateTime<D> with(TemporalField field, long newValue)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDateTime.plus(TemporalAmount)

```java
default ChronoLocalDateTime<D> plus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDateTime.plus(long, TemporalUnit)

```java
ChronoLocalDateTime<D> plus(long amountToAdd, TemporalUnit unit)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDateTime.minus(TemporalAmount)

```java
default ChronoLocalDateTime<D> minus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDateTime.minus(long, TemporalUnit)

```java
default ChronoLocalDateTime<D> minus(long amountToSubtract, TemporalUnit unit)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ChronoLocalDateTime.query(TemporalQuery<R>)

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

## ChronoLocalDateTime.adjustInto(Temporal)

```java
default Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have the same date and time as this object.

This returns a temporal object of the same observable type as the input
with the date and time changed to be the same as this.

The adjustment is equivalent to using long)
twice, passing `ChronoField.EPOCH_DAY` and
`ChronoField.NANO_OF_DAY` as the fields.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisLocalDateTime.adjustInto(temporal);
  temporal = temporal.with(thisLocalDateTime);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## ChronoLocalDateTime.format(DateTimeFormatter)

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

## ChronoLocalDateTime.atZone(ZoneId)

```java
ChronoZonedDateTime<D> atZone(ZoneId zone)
```

Combines this time with a time-zone to create a `ChronoZonedDateTime`.

This returns a `ChronoZonedDateTime` formed from this date-time at the
specified time-zone. The result will match this date-time as closely as possible.
Time-zone rules, such as daylight savings, mean that not every local date-time
is valid for the specified zone, thus the local date-time may be adjusted.

The local date-time is resolved to a single instant on the time-line.
This is achieved by finding a valid offset from UTC/Greenwich for the local
date-time as defined by the rules of the zone ID.

In most cases, there is only one valid offset for a local date-time.
In the case of an overlap, where clocks are set back, there are two valid offsets.
This method uses the earlier offset typically corresponding to "summer".

In the case of a gap, where clocks jump forward, there is no valid offset.
Instead, the local date-time is adjusted to be later by the length of the gap.
For a typical one hour daylight savings change, the local date-time will be
moved one hour later into the offset typically corresponding to "summer".

To obtain the later offset during an overlap, call
`ChronoZonedDateTime.withLaterOffsetAtOverlap()` on the result of this method.

Parameters:

- `zone`: the time-zone to use, not null

**Returns:** the zoned date-time formed from this date-time, not null

## ChronoLocalDateTime.toInstant(ZoneOffset)

```java
default Instant toInstant(ZoneOffset offset)
```

Converts this date-time to an `Instant`.

This combines this local date-time and the specified offset to form
an `Instant`.

This default implementation calculates from the epoch-day of the date and the
second-of-day of the time.

Parameters:

- `offset`: the offset to use for the conversion, not null

**Returns:** an `Instant` representing the same instant, not null

## ChronoLocalDateTime.toEpochSecond(ZoneOffset)

```java
default long toEpochSecond(ZoneOffset offset)
```

Converts this date-time to the number of seconds from the epoch
of 1970-01-01T00:00:00Z.

This combines this local date-time and the specified offset to calculate the
epoch-second value, which is the number of elapsed seconds from 1970-01-01T00:00:00Z.
Instants on the time-line after the epoch are positive, earlier are negative.

This default implementation calculates from the epoch-day of the date and the
second-of-day of the time.

Parameters:

- `offset`: the offset to use for the conversion, not null

**Returns:** the number of seconds from the epoch of 1970-01-01T00:00:00Z

## ChronoLocalDateTime.compareTo(ChronoLocalDateTime<?>)

```java
default int compareTo(ChronoLocalDateTime<?> other)
```

Compares this date-time to another date-time, including the chronology.

The comparison is based first on the underlying time-line date-time, then
on the chronology.
It is "consistent with equals", as defined by `Comparable`.

For example, the following is the comparator order:

- `2012-12-03T12:00 (ISO)`

- `2012-12-04T12:00 (ISO)`

- `2555-12-04T12:00 (ThaiBuddhist)`

- `2012-12-05T12:00 (ISO)`

Values #2 and #3 represent the same date-time on the time-line.
When two values represent the same date-time, the chronology ID is compared to distinguish them.
This step is needed to make the ordering "consistent with equals".

If all the date-time objects being compared are in the same chronology, then the
additional chronology stage is not required and only the local date-time is used.

This default implementation performs the comparison defined above.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** the comparator value, that is the comparison of this local date-time with
         the `other` local date-time and this chronology with the `other` chronology,
         in order, returning the first non-zero result, and otherwise returning zero

**See also:** #isBefore

**See also:** #isAfter

## ChronoLocalDateTime.isAfter(ChronoLocalDateTime<?>)

```java
default boolean isAfter(ChronoLocalDateTime<?> other)
```

Checks if this date-time is after the specified date-time ignoring the chronology.

This method differs from the comparison in `compareTo` in that it
only compares the underlying date-time and not the chronology.
This allows dates in different calendar systems to be compared based
on the time-line position.

This default implementation performs the comparison based on the epoch-day
and nano-of-day.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this is after the specified date-time
