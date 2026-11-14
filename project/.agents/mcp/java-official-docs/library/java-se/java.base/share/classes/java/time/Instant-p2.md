---
title: "Instant class (java.time) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Instant.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Instant class (java.time) (part 2 of 3)

## Instant.getLong(TemporalField)

```java
public long getLong(TemporalField field)
```

Gets the value of the specified field from this instant as a `long`.

This queries this instant for the value of the specified field.
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

## Instant.getEpochSecond()

```java
public long getEpochSecond()
```

Gets the number of seconds from the Java epoch of 1970-01-01T00:00:00Z.

The epoch second count is a simple incrementing count of seconds where
second 0 is 1970-01-01T00:00:00Z.
The nanosecond part is returned by `getNano`.

**Returns:** the seconds from the epoch of 1970-01-01T00:00:00Z

## Instant.getNano()

```java
public int getNano()
```

Gets the number of nanoseconds, later along the time-line, from the start
of the second.

The nanosecond-of-second value measures the total number of nanoseconds from
the second returned by `getEpochSecond`.

**Returns:** the nanoseconds within the second, always positive, never exceeds 999,999,999

## Instant.with(TemporalAdjuster)

```java
public Instant with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this instant.

This returns an `Instant`, based on this one, with the instant adjusted.
The adjustment takes place using the specified adjuster strategy object.
Read the documentation of the adjuster to understand what adjustment will be made.

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** an `Instant` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs

## Instant.with(TemporalField, long)

```java
public Instant with(TemporalField field, long newValue)
```

Returns a copy of this instant with the specified field set to a new value.

This returns an `Instant`, based on this one, with the value
for the specified field changed.
If it is not possible to set the value, because the field is not supported or for
some other reason, an exception is thrown.

If the field is a `ChronoField` then the adjustment is implemented here.
The supported fields behave as follows:

- `NANO_OF_SECOND` -
 Returns an `Instant` with the specified nano-of-second.
 The epoch-second will be unchanged.

- `MICRO_OF_SECOND` -
 Returns an `Instant` with the nano-of-second replaced by the specified
 micro-of-second multiplied by 1,000. The epoch-second will be unchanged.

- `MILLI_OF_SECOND` -
 Returns an `Instant` with the nano-of-second replaced by the specified
 milli-of-second multiplied by 1,000,000. The epoch-second will be unchanged.

- `INSTANT_SECONDS` -
 Returns an `Instant` with the specified epoch-second.
 The nano-of-second will be unchanged.

In all cases, if the new value is outside the valid range of values for the field
then a `DateTimeException` will be thrown.

All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.adjustInto(Temporal, long)`
passing `this` as the argument. In this case, the field determines
whether and how to adjust the instant.

This instance is immutable and unaffected by this method call.

Parameters:

- `field`: the field to set in the result, not null
- `newValue`: the new value of the field in the result

**Returns:** an `Instant` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## Instant.truncatedTo(TemporalUnit)

```java
public Instant truncatedTo(TemporalUnit unit)
```

Returns a copy of this `Instant` truncated to the specified unit.

Truncating the instant returns a copy of the original with fields
smaller than the specified unit set to zero.
The fields are calculated on the basis of using a UTC offset as seen
in `toString`.
For example, truncating with the MINUTES unit will
round down to the nearest minute, setting the seconds and nanoseconds to zero.

The unit must have a duration
that divides into the length of a standard day without remainder.
This includes all supplied time units on `ChronoUnit` and
DAYS. Other units throw an exception.

This instance is immutable and unaffected by this method call.

Parameters:

- `unit`: the unit to truncate to, not null

**Returns:** an `Instant` based on this instant with the time truncated, not null

Throws:

- `DateTimeException`: if the unit is invalid for truncation
- `UnsupportedTemporalTypeException`: if the unit is not supported

## Instant.plus(TemporalAmount)

```java
public Instant plus(TemporalAmount amountToAdd)
```

Returns a copy of this instant with the specified amount added.

This returns an `Instant`, based on this one, with the specified amount added.
The amount is typically `Duration` but may be any other type implementing
the `TemporalAmount` interface.

The calculation is delegated to the amount object by calling
`TemporalAmount.addTo(Temporal)`. The amount implementation is free
to implement the addition in any way it wishes, however it typically
calls back to TemporalUnit). Consult the documentation
of the amount implementation to determine if it can be successfully added.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount to add, not null

**Returns:** an `Instant` based on this instant with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## Instant.plus(long, TemporalUnit)

```java
public Instant plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this instant with the specified amount added.

This returns an `Instant`, based on this one, with the amount
in terms of the unit added. If it is not possible to add the amount, because the
unit is not supported or for some other reason, an exception is thrown.

If the field is a `ChronoUnit` then the addition is implemented here.
The supported fields behave as follows:

- `NANOS` -
 Returns an `Instant` with the specified number of nanoseconds added.
 This is equivalent to `plusNanos(long)`.

- `MICROS` -
 Returns an `Instant` with the specified number of microseconds added.
 This is equivalent to `plusNanos(long)` with the amount
 multiplied by 1,000.

- `MILLIS` -
 Returns an `Instant` with the specified number of milliseconds added.
 This is equivalent to `plusNanos(long)` with the amount
 multiplied by 1,000,000.

- `SECONDS` -
 Returns an `Instant` with the specified number of seconds added.
 This is equivalent to `plusSeconds(long)`.

- `MINUTES` -
 Returns an `Instant` with the specified number of minutes added.
 This is equivalent to `plusSeconds(long)` with the amount
 multiplied by 60.

- `HOURS` -
 Returns an `Instant` with the specified number of hours added.
 This is equivalent to `plusSeconds(long)` with the amount
 multiplied by 3,600.

- `HALF_DAYS` -
 Returns an `Instant` with the specified number of half-days added.
 This is equivalent to `plusSeconds(long)` with the amount
 multiplied by 43,200 (12 hours).

- `DAYS` -
 Returns an `Instant` with the specified number of days added.
 This is equivalent to `plusSeconds(long)` with the amount
 multiplied by 86,400 (24 hours).

All other `ChronoUnit` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
passing `this` as the argument. In this case, the unit determines
whether and how to perform the addition.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount of the unit to add to the result, may be negative
- `unit`: the unit of the amount to add, not null

**Returns:** an `Instant` based on this instant with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## Instant.plusSeconds(long)

```java
public Instant plusSeconds(long secondsToAdd)
```

Returns a copy of this instant with the specified duration in seconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `secondsToAdd`: the seconds to add, positive or negative

**Returns:** an `Instant` based on this instant with the specified seconds added, not null

Throws:

- `DateTimeException`: if the result exceeds the maximum or minimum instant
- `ArithmeticException`: if numeric overflow occurs

## Instant.plusMillis(long)

```java
public Instant plusMillis(long millisToAdd)
```

Returns a copy of this instant with the specified duration in milliseconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `millisToAdd`: the milliseconds to add, positive or negative

**Returns:** an `Instant` based on this instant with the specified milliseconds added, not null

Throws:

- `DateTimeException`: if the result exceeds the maximum or minimum instant
- `ArithmeticException`: if numeric overflow occurs

## Instant.plusNanos(long)

```java
public Instant plusNanos(long nanosToAdd)
```

Returns a copy of this instant with the specified duration in nanoseconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanosToAdd`: the nanoseconds to add, positive or negative

**Returns:** an `Instant` based on this instant with the specified nanoseconds added, not null

Throws:

- `DateTimeException`: if the result exceeds the maximum or minimum instant
- `ArithmeticException`: if numeric overflow occurs

## Instant.minus(TemporalAmount)

```java
public Instant minus(TemporalAmount amountToSubtract)
```

Returns a copy of this instant with the specified amount subtracted.

This returns an `Instant`, based on this one, with the specified amount subtracted.
The amount is typically `Duration` but may be any other type implementing
the `TemporalAmount` interface.

The calculation is delegated to the amount object by calling
`TemporalAmount.subtractFrom(Temporal)`. The amount implementation is free
to implement the subtraction in any way it wishes, however it typically
calls back to TemporalUnit). Consult the documentation
of the amount implementation to determine if it can be successfully subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount to subtract, not null

**Returns:** an `Instant` based on this instant with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## Instant.minus(long, TemporalUnit)

```java
public Instant minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this instant with the specified amount subtracted.

This returns an `Instant`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** an `Instant` based on this instant with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## Instant.minusSeconds(long)

```java
public Instant minusSeconds(long secondsToSubtract)
```

Returns a copy of this instant with the specified duration in seconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `secondsToSubtract`: the seconds to subtract, positive or negative

**Returns:** an `Instant` based on this instant with the specified seconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the maximum or minimum instant
- `ArithmeticException`: if numeric overflow occurs

## Instant.minusMillis(long)

```java
public Instant minusMillis(long millisToSubtract)
```

Returns a copy of this instant with the specified duration in milliseconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `millisToSubtract`: the milliseconds to subtract, positive or negative

**Returns:** an `Instant` based on this instant with the specified milliseconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the maximum or minimum instant
- `ArithmeticException`: if numeric overflow occurs

## Instant.minusNanos(long)

```java
public Instant minusNanos(long nanosToSubtract)
```

Returns a copy of this instant with the specified duration in nanoseconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanosToSubtract`: the nanoseconds to subtract, positive or negative

**Returns:** an `Instant` based on this instant with the specified nanoseconds subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the maximum or minimum instant
- `ArithmeticException`: if numeric overflow occurs
