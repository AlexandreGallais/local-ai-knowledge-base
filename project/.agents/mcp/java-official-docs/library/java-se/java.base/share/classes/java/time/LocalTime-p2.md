---
title: "LocalTime class (java.time) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalTime class (java.time) (part 2 of 3)

## LocalTime.with(TemporalAdjuster)

```java
public LocalTime with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this time.

This returns a `LocalTime`, based on this one, with the time adjusted.
The adjustment takes place using the specified adjuster strategy object.
Read the documentation of the adjuster to understand what adjustment will be made.

A simple adjuster might simply set the one of the fields, such as the hour field.
A more complex adjuster might set the time to the last hour of the day.

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** a `LocalTime` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs

## LocalTime.with(TemporalField, long)

```java
public LocalTime with(TemporalField field, long newValue)
```

Returns a copy of this time with the specified field set to a new value.

This returns a `LocalTime`, based on this one, with the value
for the specified field changed.
This can be used to change any supported field, such as the hour, minute or second.
If it is not possible to set the value, because the field is not supported or for
some other reason, an exception is thrown.

If the field is a `ChronoField` then the adjustment is implemented here.
The supported fields behave as follows:

- `NANO_OF_SECOND` -
 Returns a `LocalTime` with the specified nano-of-second.
 The hour, minute and second will be unchanged.

- `NANO_OF_DAY` -
 Returns a `LocalTime` with the specified nano-of-day.
 This completely replaces the time and is equivalent to `ofNanoOfDay(long)`.

- `MICRO_OF_SECOND` -
 Returns a `LocalTime` with the nano-of-second replaced by the specified
 micro-of-second multiplied by 1,000.
 The hour, minute and second will be unchanged.

- `MICRO_OF_DAY` -
 Returns a `LocalTime` with the specified micro-of-day.
 This completely replaces the time and is equivalent to using `ofNanoOfDay(long)`
 with the micro-of-day multiplied by 1,000.

- `MILLI_OF_SECOND` -
 Returns a `LocalTime` with the nano-of-second replaced by the specified
 milli-of-second multiplied by 1,000,000.
 The hour, minute and second will be unchanged.

- `MILLI_OF_DAY` -
 Returns a `LocalTime` with the specified milli-of-day.
 This completely replaces the time and is equivalent to using `ofNanoOfDay(long)`
 with the milli-of-day multiplied by 1,000,000.

- `SECOND_OF_MINUTE` -
 Returns a `LocalTime` with the specified second-of-minute.
 The hour, minute and nano-of-second will be unchanged.

- `SECOND_OF_DAY` -
 Returns a `LocalTime` with the specified second-of-day.
 The nano-of-second will be unchanged.

- `MINUTE_OF_HOUR` -
 Returns a `LocalTime` with the specified minute-of-hour.
 The hour, second-of-minute and nano-of-second will be unchanged.

- `MINUTE_OF_DAY` -
 Returns a `LocalTime` with the specified minute-of-day.
 The second-of-minute and nano-of-second will be unchanged.

- `HOUR_OF_AMPM` -
 Returns a `LocalTime` with the specified hour-of-am-pm.
 The AM/PM, minute-of-hour, second-of-minute and nano-of-second will be unchanged.

- `CLOCK_HOUR_OF_AMPM` -
 Returns a `LocalTime` with the specified clock-hour-of-am-pm.
 The AM/PM, minute-of-hour, second-of-minute and nano-of-second will be unchanged.

- `HOUR_OF_DAY` -
 Returns a `LocalTime` with the specified hour-of-day.
 The minute-of-hour, second-of-minute and nano-of-second will be unchanged.

- `CLOCK_HOUR_OF_DAY` -
 Returns a `LocalTime` with the specified clock-hour-of-day.
 The minute-of-hour, second-of-minute and nano-of-second will be unchanged.

- `AMPM_OF_DAY` -
 Returns a `LocalTime` with the specified AM/PM.
 The hour-of-am-pm, minute-of-hour, second-of-minute and nano-of-second will be unchanged.

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

**Returns:** a `LocalTime` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalTime.withHour(int)

```java
public LocalTime withHour(int hour)
```

Returns a copy of this `LocalTime` with the hour-of-day altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `hour`: the hour-of-day to set in the result, from 0 to 23

**Returns:** a `LocalTime` based on this time with the requested hour, not null

Throws:

- `DateTimeException`: if the hour value is invalid

## LocalTime.withMinute(int)

```java
public LocalTime withMinute(int minute)
```

Returns a copy of this `LocalTime` with the minute-of-hour altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `minute`: the minute-of-hour to set in the result, from 0 to 59

**Returns:** a `LocalTime` based on this time with the requested minute, not null

Throws:

- `DateTimeException`: if the minute value is invalid

## LocalTime.withSecond(int)

```java
public LocalTime withSecond(int second)
```

Returns a copy of this `LocalTime` with the second-of-minute altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `second`: the second-of-minute to set in the result, from 0 to 59

**Returns:** a `LocalTime` based on this time with the requested second, not null

Throws:

- `DateTimeException`: if the second value is invalid

## LocalTime.withNano(int)

```java
public LocalTime withNano(int nanoOfSecond)
```

Returns a copy of this `LocalTime` with the nano-of-second altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanoOfSecond`: the nano-of-second to set in the result, from 0 to 999,999,999

**Returns:** a `LocalTime` based on this time with the requested nanosecond, not null

Throws:

- `DateTimeException`: if the nanos value is invalid

## LocalTime.truncatedTo(TemporalUnit)

```java
public LocalTime truncatedTo(TemporalUnit unit)
```

Returns a copy of this `LocalTime` with the time truncated.

Truncation returns a copy of the original time with fields
smaller than the specified unit set to zero.
For example, truncating with the minutes unit
will set the second-of-minute and nano-of-second field to zero.

The unit must have a duration
that divides into the length of a standard day without remainder.
This includes all supplied time units on `ChronoUnit` and
DAYS. Other units throw an exception.

This instance is immutable and unaffected by this method call.

Parameters:

- `unit`: the unit to truncate to, not null

**Returns:** a `LocalTime` based on this time with the time truncated, not null

Throws:

- `DateTimeException`: if unable to truncate
- `UnsupportedTemporalTypeException`: if the unit is not supported

## LocalTime.plus(TemporalAmount)

```java
public LocalTime plus(TemporalAmount amountToAdd)
```

Returns a copy of this time with the specified amount added.

This returns a `LocalTime`, based on this one, with the specified amount added.
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

**Returns:** a `LocalTime` based on this time with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## LocalTime.plus(long, TemporalUnit)

```java
public LocalTime plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this time with the specified amount added.

This returns a `LocalTime`, based on this one, with the amount
in terms of the unit added. If it is not possible to add the amount, because the
unit is not supported or for some other reason, an exception is thrown.

If the field is a `ChronoUnit` then the addition is implemented here.
The supported fields behave as follows:

- `NANOS` -
 Returns a `LocalTime` with the specified number of nanoseconds added.
 This is equivalent to `plusNanos(long)`.

- `MICROS` -
 Returns a `LocalTime` with the specified number of microseconds added.
 This is equivalent to `plusNanos(long)` with the amount
 multiplied by 1,000.

- `MILLIS` -
 Returns a `LocalTime` with the specified number of milliseconds added.
 This is equivalent to `plusNanos(long)` with the amount
 multiplied by 1,000,000.

- `SECONDS` -
 Returns a `LocalTime` with the specified number of seconds added.
 This is equivalent to `plusSeconds(long)`.

- `MINUTES` -
 Returns a `LocalTime` with the specified number of minutes added.
 This is equivalent to `plusMinutes(long)`.

- `HOURS` -
 Returns a `LocalTime` with the specified number of hours added.
 This is equivalent to `plusHours(long)`.

- `HALF_DAYS` -
 Returns a `LocalTime` with the specified number of half-days added.
 This is equivalent to `plusHours(long)` with the amount
 multiplied by 12.

All other `ChronoUnit` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
passing `this` as the argument. In this case, the unit determines
whether and how to perform the addition.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount of the unit to add to the result, may be negative
- `unit`: the unit of the amount to add, not null

**Returns:** a `LocalTime` based on this time with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalTime.plusHours(long)

```java
public LocalTime plusHours(long hoursToAdd)
```

Returns a copy of this `LocalTime` with the specified number of hours added.

This adds the specified number of hours to this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `hoursToAdd`: the hours to add, may be negative

**Returns:** a `LocalTime` based on this time with the hours added, not null

## LocalTime.plusMinutes(long)

```java
public LocalTime plusMinutes(long minutesToAdd)
```

Returns a copy of this `LocalTime` with the specified number of minutes added.

This adds the specified number of minutes to this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutesToAdd`: the minutes to add, may be negative

**Returns:** a `LocalTime` based on this time with the minutes added, not null

## LocalTime.plusSeconds(long)

```java
public LocalTime plusSeconds(long secondstoAdd)
```

Returns a copy of this `LocalTime` with the specified number of seconds added.

This adds the specified number of seconds to this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `secondstoAdd`: the seconds to add, may be negative

**Returns:** a `LocalTime` based on this time with the seconds added, not null

## LocalTime.plusNanos(long)

```java
public LocalTime plusNanos(long nanosToAdd)
```

Returns a copy of this `LocalTime` with the specified number of nanoseconds added.

This adds the specified number of nanoseconds to this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanosToAdd`: the nanos to add, may be negative

**Returns:** a `LocalTime` based on this time with the nanoseconds added, not null

## LocalTime.minus(TemporalAmount)

```java
public LocalTime minus(TemporalAmount amountToSubtract)
```

Returns a copy of this time with the specified amount subtracted.

This returns a `LocalTime`, based on this one, with the specified amount subtracted.
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

**Returns:** a `LocalTime` based on this time with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## LocalTime.minus(long, TemporalUnit)

```java
public LocalTime minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this time with the specified amount subtracted.

This returns a `LocalTime`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** a `LocalTime` based on this time with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs
