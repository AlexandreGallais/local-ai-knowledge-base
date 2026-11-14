---
title: "OffsetTime class (java.time) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/OffsetTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OffsetTime class (java.time) (part 2 of 3)

## OffsetTime.toLocalTime()

```java
public LocalTime toLocalTime()
```

Gets the `LocalTime` part of this date-time.

This returns a `LocalTime` with the same hour, minute, second and
nanosecond as this date-time.

**Returns:** the time part of this date-time, not null

## OffsetTime.getHour()

```java
public int getHour()
```

Gets the hour-of-day field.

**Returns:** the hour-of-day, from 0 to 23

## OffsetTime.getMinute()

```java
public int getMinute()
```

Gets the minute-of-hour field.

**Returns:** the minute-of-hour, from 0 to 59

## OffsetTime.getSecond()

```java
public int getSecond()
```

Gets the second-of-minute field.

**Returns:** the second-of-minute, from 0 to 59

## OffsetTime.getNano()

```java
public int getNano()
```

Gets the nano-of-second field.

**Returns:** the nano-of-second, from 0 to 999,999,999

## OffsetTime.with(TemporalAdjuster)

```java
public OffsetTime with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this time.

This returns an `OffsetTime`, based on this one, with the time adjusted.
The adjustment takes place using the specified adjuster strategy object.
Read the documentation of the adjuster to understand what adjustment will be made.

A simple adjuster might simply set the one of the fields, such as the hour field.
A more complex adjuster might set the time to the last hour of the day.

The classes `LocalTime` and `ZoneOffset` implement `TemporalAdjuster`,
thus this method can be used to change the time or offset:

```java
 result = offsetTime.with(time);
 result = offsetTime.with(offset);
```

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** an `OffsetTime` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs

## OffsetTime.with(TemporalField, long)

```java
public OffsetTime with(TemporalField field, long newValue)
```

Returns a copy of this time with the specified field set to a new value.

This returns an `OffsetTime`, based on this one, with the value
for the specified field changed.
This can be used to change any supported field, such as the hour, minute or second.
If it is not possible to set the value, because the field is not supported or for
some other reason, an exception is thrown.

If the field is a `ChronoField` then the adjustment is implemented here.

The `OFFSET_SECONDS` field will return a time with the specified offset.
The local time is unaltered. If the new offset value is outside the valid range
then a `DateTimeException` will be thrown.

The other supported fields will behave as per
the matching method on long) LocalTime}.
In this case, the offset is not part of the calculation and will be unchanged.

All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.adjustInto(Temporal, long)`
passing `this` as the argument. In this case, the field determines
whether and how to adjust the instant.

This instance is immutable and unaffected by this method call.

Parameters:

- `field`: the field to set in the result, not null
- `newValue`: the new value of the field in the result

**Returns:** an `OffsetTime` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## OffsetTime.withHour(int)

```java
public OffsetTime withHour(int hour)
```

Returns a copy of this `OffsetTime` with the hour-of-day altered.

The offset does not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `hour`: the hour-of-day to set in the result, from 0 to 23

**Returns:** an `OffsetTime` based on this time with the requested hour, not null

Throws:

- `DateTimeException`: if the hour value is invalid

## OffsetTime.withMinute(int)

```java
public OffsetTime withMinute(int minute)
```

Returns a copy of this `OffsetTime` with the minute-of-hour altered.

The offset does not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `minute`: the minute-of-hour to set in the result, from 0 to 59

**Returns:** an `OffsetTime` based on this time with the requested minute, not null

Throws:

- `DateTimeException`: if the minute value is invalid

## OffsetTime.withSecond(int)

```java
public OffsetTime withSecond(int second)
```

Returns a copy of this `OffsetTime` with the second-of-minute altered.

The offset does not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `second`: the second-of-minute to set in the result, from 0 to 59

**Returns:** an `OffsetTime` based on this time with the requested second, not null

Throws:

- `DateTimeException`: if the second value is invalid

## OffsetTime.withNano(int)

```java
public OffsetTime withNano(int nanoOfSecond)
```

Returns a copy of this `OffsetTime` with the nano-of-second altered.

The offset does not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanoOfSecond`: the nano-of-second to set in the result, from 0 to 999,999,999

**Returns:** an `OffsetTime` based on this time with the requested nanosecond, not null

Throws:

- `DateTimeException`: if the nanos value is invalid

## OffsetTime.truncatedTo(TemporalUnit)

```java
public OffsetTime truncatedTo(TemporalUnit unit)
```

Returns a copy of this `OffsetTime` with the time truncated.

Truncation returns a copy of the original time with fields
smaller than the specified unit set to zero.
For example, truncating with the minutes unit
will set the second-of-minute and nano-of-second field to zero.

The unit must have a duration
that divides into the length of a standard day without remainder.
This includes all supplied time units on `ChronoUnit` and
DAYS. Other units throw an exception.

The offset does not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `unit`: the unit to truncate to, not null

**Returns:** an `OffsetTime` based on this time with the time truncated, not null

Throws:

- `DateTimeException`: if unable to truncate
- `UnsupportedTemporalTypeException`: if the unit is not supported

## OffsetTime.plus(TemporalAmount)

```java
public OffsetTime plus(TemporalAmount amountToAdd)
```

Returns a copy of this time with the specified amount added.

This returns an `OffsetTime`, based on this one, with the specified amount added.
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

**Returns:** an `OffsetTime` based on this time with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## OffsetTime.plus(long, TemporalUnit)

```java
public OffsetTime plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this time with the specified amount added.

This returns an `OffsetTime`, based on this one, with the amount
in terms of the unit added. If it is not possible to add the amount, because the
unit is not supported or for some other reason, an exception is thrown.

If the field is a `ChronoUnit` then the addition is implemented by
TemporalUnit).
The offset is not part of the calculation and will be unchanged in the result.

If the field is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
passing `this` as the argument. In this case, the unit determines
whether and how to perform the addition.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount of the unit to add to the result, may be negative
- `unit`: the unit of the amount to add, not null

**Returns:** an `OffsetTime` based on this time with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## OffsetTime.plusHours(long)

```java
public OffsetTime plusHours(long hours)
```

Returns a copy of this `OffsetTime` with the specified number of hours added.

This adds the specified number of hours to this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `hours`: the hours to add, may be negative

**Returns:** an `OffsetTime` based on this time with the hours added, not null

## OffsetTime.plusMinutes(long)

```java
public OffsetTime plusMinutes(long minutes)
```

Returns a copy of this `OffsetTime` with the specified number of minutes added.

This adds the specified number of minutes to this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutes`: the minutes to add, may be negative

**Returns:** an `OffsetTime` based on this time with the minutes added, not null

## OffsetTime.plusSeconds(long)

```java
public OffsetTime plusSeconds(long seconds)
```

Returns a copy of this `OffsetTime` with the specified number of seconds added.

This adds the specified number of seconds to this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to add, may be negative

**Returns:** an `OffsetTime` based on this time with the seconds added, not null

## OffsetTime.plusNanos(long)

```java
public OffsetTime plusNanos(long nanos)
```

Returns a copy of this `OffsetTime` with the specified number of nanoseconds added.

This adds the specified number of nanoseconds to this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanos`: the nanos to add, may be negative

**Returns:** an `OffsetTime` based on this time with the nanoseconds added, not null

## OffsetTime.minus(TemporalAmount)

```java
public OffsetTime minus(TemporalAmount amountToSubtract)
```

Returns a copy of this time with the specified amount subtracted.

This returns an `OffsetTime`, based on this one, with the specified amount subtracted.
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

**Returns:** an `OffsetTime` based on this time with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## OffsetTime.minus(long, TemporalUnit)

```java
public OffsetTime minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this time with the specified amount subtracted.

This returns an `OffsetTime`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** an `OffsetTime` based on this time with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## OffsetTime.minusHours(long)

```java
public OffsetTime minusHours(long hours)
```

Returns a copy of this `OffsetTime` with the specified number of hours subtracted.

This subtracts the specified number of hours from this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `hours`: the hours to subtract, may be negative

**Returns:** an `OffsetTime` based on this time with the hours subtracted, not null

## OffsetTime.minusMinutes(long)

```java
public OffsetTime minusMinutes(long minutes)
```

Returns a copy of this `OffsetTime` with the specified number of minutes subtracted.

This subtracts the specified number of minutes from this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutes`: the minutes to subtract, may be negative

**Returns:** an `OffsetTime` based on this time with the minutes subtracted, not null

## OffsetTime.minusSeconds(long)

```java
public OffsetTime minusSeconds(long seconds)
```

Returns a copy of this `OffsetTime` with the specified number of seconds subtracted.

This subtracts the specified number of seconds from this time, returning a new time.
The calculation wraps around midnight.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to subtract, may be negative

**Returns:** an `OffsetTime` based on this time with the seconds subtracted, not null
