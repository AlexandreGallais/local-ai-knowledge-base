---
title: "Instant class (java.time) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Instant.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Instant class (java.time) (part 3 of 3)

## Instant.query(TemporalQuery<R>)

```java
public <R> R query(TemporalQuery<R> query)
```

Queries this instant using the specified query.

This queries this instant using the specified query strategy object.
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

## Instant.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have this instant.

This returns a temporal object of the same observable type as the input
with the instant changed to be the same as this.

The adjustment is equivalent to using long)
twice, passing `ChronoField.INSTANT_SECONDS` and
`ChronoField.NANO_OF_SECOND` as the fields.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisInstant.adjustInto(temporal);
  temporal = temporal.with(thisInstant);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## Instant.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another instant in terms of the specified unit.

This calculates the amount of time between two `Instant`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified instant.
The result will be negative if the end is before the start.
The calculation returns a whole number, representing the number of
complete units between the two instants.
The `Temporal` passed to this method is converted to a
`Instant` using `from(TemporalAccessor)`.
For example, the amount in seconds between two dates can be calculated
using `startInstant.until(endInstant, SECONDS)`.

There are two equivalent ways of using this method.
The first is to invoke this method.
The second is to use Temporal):

```java
  // these two lines are equivalent
  amount = start.until(end, SECONDS);
  amount = SECONDS.between(start, end);
```

The choice should be made based on which makes the code more readable.

The calculation is implemented in this method for `ChronoUnit`.
The units `NANOS`, `MICROS`, `MILLIS`, `SECONDS`,
`MINUTES`, `HOURS`, `HALF_DAYS` and `DAYS`
are supported. Other `ChronoUnit` values will throw an exception.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
passing `this` as the first argument and the converted input temporal
as the second argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end date, exclusive, which is converted to an `Instant`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this instant and the end instant

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to an `Instant`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## Instant.until(Instant)

```java
public Duration until(Instant endExclusive)
```

Calculates the `Duration` until another `Instant`.

The start and end points are `this` and the specified instant.
The result will be negative if the end is before the start. Calling
this method is equivalent to
Temporal) Duration.between(this, endExclusive).

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end `Instant`, exclusive, not null

**Returns:** the `Duration` from this `Instant` until the
     specified `endExclusive` `Instant`

**See also:** Duration#between(Temporal, Temporal)

**Since:** 23

## Instant.atOffset(ZoneOffset)

```java
public OffsetDateTime atOffset(ZoneOffset offset)
```

Combines this instant with an offset to create an `OffsetDateTime`.

This returns an `OffsetDateTime` formed from this instant at the
specified offset from UTC/Greenwich. An exception will be thrown if the
instant is too large to fit into an offset date-time.

This method is equivalent to
ZoneId) OffsetDateTime.ofInstant(this, offset).

Parameters:

- `offset`: the offset to combine with, not null

**Returns:** the offset date-time formed from this instant and the specified offset, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## Instant.atZone(ZoneId)

```java
public ZonedDateTime atZone(ZoneId zone)
```

Combines this instant with a time-zone to create a `ZonedDateTime`.

This returns an `ZonedDateTime` formed from this instant at the
specified time-zone. An exception will be thrown if the instant is too
large to fit into a zoned date-time.

This method is equivalent to
ZoneId) ZonedDateTime.ofInstant(this, zone).

Parameters:

- `zone`: the zone to combine with, not null

**Returns:** the zoned date-time formed from this instant and the specified zone, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## Instant.toEpochMilli()

```java
public long toEpochMilli()
```

Converts this instant to the number of milliseconds from the epoch
of 1970-01-01T00:00:00Z.

If this instant represents a point on the time-line too far in the future
or past to fit in a `long` milliseconds, then an exception is thrown.

If this instant has greater than millisecond precision, then the conversion
will drop any excess precision information as though the amount in nanoseconds
was subject to integer division by one million.

**Returns:** the number of milliseconds since the epoch of 1970-01-01T00:00:00Z

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Instant.compareTo(Instant)

```java
public int compareTo(Instant otherInstant)
```

Compares this instant to the specified instant.

The comparison is based on the time-line position of the instants.
It is "consistent with equals", as defined by `Comparable`.

Parameters:

- `otherInstant`: the other instant to compare to, not null

**Returns:** the comparator value, that is less than zero if this instant is before `otherInstant`,
         zero if they are equal, or greater than zero if this instant is after `otherInstant`

**See also:** #isBefore

**See also:** #isAfter

Throws:

- `NullPointerException`: if otherInstant is null

## Instant.isAfter(Instant)

```java
public boolean isAfter(Instant otherInstant)
```

Checks if this instant is after the specified instant.

The comparison is based on the time-line position of the instants.

Parameters:

- `otherInstant`: the other instant to compare to, not null

**Returns:** true if this instant is after the specified instant

Throws:

- `NullPointerException`: if otherInstant is null

## Instant.isBefore(Instant)

```java
public boolean isBefore(Instant otherInstant)
```

Checks if this instant is before the specified instant.

The comparison is based on the time-line position of the instants.

Parameters:

- `otherInstant`: the other instant to compare to, not null

**Returns:** true if this instant is before the specified instant

Throws:

- `NullPointerException`: if otherInstant is null

## Instant.equals(Object)

```java
public boolean equals(Object other)
```

Checks if this instant is equal to the specified instant.

The comparison is based on the time-line position of the instants.

Parameters:

- `other`: the other instant, null returns false

**Returns:** true if the other instant is equal to this one

## Instant.hashCode()

```java
public int hashCode()
```

Returns a hash code for this instant.

**Returns:** a suitable hash code

## Instant.toString()

```java
public String toString()
```

A string representation of this instant using ISO-8601 representation.

The format used is the same as `DateTimeFormatter.ISO_INSTANT`.

**Returns:** an ISO-8601 representation of this instant, not null
