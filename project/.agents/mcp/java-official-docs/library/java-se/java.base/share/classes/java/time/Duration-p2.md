---
title: "Duration class (java.time) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Duration.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Duration class (java.time) (part 2 of 3)

## Duration.plus(Duration)

```java
public Duration plus(Duration duration)
```

Returns a copy of this duration with the specified duration added.

This instance is immutable and unaffected by this method call.

Parameters:

- `duration`: the duration to add, positive or negative, not null

**Returns:** a `Duration` based on this duration with the specified duration added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.plus(long, TemporalUnit)

```java
public Duration plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this duration with the specified duration added.

The duration amount is measured in terms of the specified unit.
Only a subset of units are accepted by this method.
The unit must either have an exact duration or
be `ChronoUnit.DAYS` which is treated as 24 hours. Other units throw an exception.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount to add, measured in terms of the unit, positive or negative
- `unit`: the unit that the amount is measured in, must have an exact duration, not null

**Returns:** a `Duration` based on this duration with the specified duration added, not null

Throws:

- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## Duration.plusDays(long)

```java
public Duration plusDays(long daysToAdd)
```

Returns a copy of this duration with the specified duration in standard 24 hour days added.

The number of days is multiplied by 86400 to obtain the number of seconds to add.
This is based on the standard definition of a day as 24 hours.

This instance is immutable and unaffected by this method call.

Parameters:

- `daysToAdd`: the days to add, positive or negative

**Returns:** a `Duration` based on this duration with the specified days added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.plusHours(long)

```java
public Duration plusHours(long hoursToAdd)
```

Returns a copy of this duration with the specified duration in hours added.

This instance is immutable and unaffected by this method call.

Parameters:

- `hoursToAdd`: the hours to add, positive or negative

**Returns:** a `Duration` based on this duration with the specified hours added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.plusMinutes(long)

```java
public Duration plusMinutes(long minutesToAdd)
```

Returns a copy of this duration with the specified duration in minutes added.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutesToAdd`: the minutes to add, positive or negative

**Returns:** a `Duration` based on this duration with the specified minutes added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.plusSeconds(long)

```java
public Duration plusSeconds(long secondsToAdd)
```

Returns a copy of this duration with the specified duration in seconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `secondsToAdd`: the seconds to add, positive or negative

**Returns:** a `Duration` based on this duration with the specified seconds added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.plusMillis(long)

```java
public Duration plusMillis(long millisToAdd)
```

Returns a copy of this duration with the specified duration in milliseconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `millisToAdd`: the milliseconds to add, positive or negative

**Returns:** a `Duration` based on this duration with the specified milliseconds added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.plusNanos(long)

```java
public Duration plusNanos(long nanosToAdd)
```

Returns a copy of this duration with the specified duration in nanoseconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanosToAdd`: the nanoseconds to add, positive or negative

**Returns:** a `Duration` based on this duration with the specified nanoseconds added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.minus(Duration)

```java
public Duration minus(Duration duration)
```

Returns a copy of this duration with the specified duration subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `duration`: the duration to subtract, positive or negative, not null

**Returns:** a `Duration` based on this duration with the specified duration subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.minus(long, TemporalUnit)

```java
public Duration minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this duration with the specified duration subtracted.

The duration amount is measured in terms of the specified unit.
Only a subset of units are accepted by this method.
The unit must either have an exact duration or
be `ChronoUnit.DAYS` which is treated as 24 hours. Other units throw an exception.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount to subtract, measured in terms of the unit, positive or negative
- `unit`: the unit that the amount is measured in, must have an exact duration, not null

**Returns:** a `Duration` based on this duration with the specified duration subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.minusDays(long)

```java
public Duration minusDays(long daysToSubtract)
```

Returns a copy of this duration with the specified duration in standard 24 hour days subtracted.

The number of days is multiplied by 86400 to obtain the number of seconds to subtract.
This is based on the standard definition of a day as 24 hours.

This instance is immutable and unaffected by this method call.

Parameters:

- `daysToSubtract`: the days to subtract, positive or negative

**Returns:** a `Duration` based on this duration with the specified days subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.minusHours(long)

```java
public Duration minusHours(long hoursToSubtract)
```

Returns a copy of this duration with the specified duration in hours subtracted.

The number of hours is multiplied by 3600 to obtain the number of seconds to subtract.

This instance is immutable and unaffected by this method call.

Parameters:

- `hoursToSubtract`: the hours to subtract, positive or negative

**Returns:** a `Duration` based on this duration with the specified hours subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.minusMinutes(long)

```java
public Duration minusMinutes(long minutesToSubtract)
```

Returns a copy of this duration with the specified duration in minutes subtracted.

The number of hours is multiplied by 60 to obtain the number of seconds to subtract.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutesToSubtract`: the minutes to subtract, positive or negative

**Returns:** a `Duration` based on this duration with the specified minutes subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.minusSeconds(long)

```java
public Duration minusSeconds(long secondsToSubtract)
```

Returns a copy of this duration with the specified duration in seconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `secondsToSubtract`: the seconds to subtract, positive or negative

**Returns:** a `Duration` based on this duration with the specified seconds subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.minusMillis(long)

```java
public Duration minusMillis(long millisToSubtract)
```

Returns a copy of this duration with the specified duration in milliseconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `millisToSubtract`: the milliseconds to subtract, positive or negative

**Returns:** a `Duration` based on this duration with the specified milliseconds subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.minusNanos(long)

```java
public Duration minusNanos(long nanosToSubtract)
```

Returns a copy of this duration with the specified duration in nanoseconds subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanosToSubtract`: the nanoseconds to subtract, positive or negative

**Returns:** a `Duration` based on this duration with the specified nanoseconds subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.multipliedBy(long)

```java
public Duration multipliedBy(long multiplicand)
```

Returns a copy of this duration multiplied by the scalar.

This instance is immutable and unaffected by this method call.

Parameters:

- `multiplicand`: the value to multiply the duration by, positive or negative

**Returns:** a `Duration` based on this duration multiplied by the specified scalar, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.dividedBy(long)

```java
public Duration dividedBy(long divisor)
```

Returns a copy of this duration divided by the specified value.

This instance is immutable and unaffected by this method call.

Parameters:

- `divisor`: the value to divide the duration by, positive or negative, not zero

**Returns:** a `Duration` based on this duration divided by the specified divisor, not null

Throws:

- `ArithmeticException`: if the divisor is zero or if numeric overflow occurs

## Duration.dividedBy(Duration)

```java
public long dividedBy(Duration divisor)
```

Returns number of whole times a specified Duration occurs within this Duration.

This instance is immutable and unaffected by this method call.

Parameters:

- `divisor`: the value to divide the duration by, positive or negative, not null

**Returns:** number of whole times, rounded toward zero, a specified
        `Duration` occurs within this Duration, may be negative

**Since:** 9

Throws:

- `ArithmeticException`: if the divisor is zero, or if numeric overflow occurs

## Duration.negated()

```java
public Duration negated()
```

Returns a copy of this duration with the length negated.

This method swaps the sign of the total length of this duration.
For example, `PT1.3S` will be returned as `PT-1.3S`.

This instance is immutable and unaffected by this method call.

**Returns:** a `Duration` based on this duration with the amount negated, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.abs()

```java
public Duration abs()
```

Returns a copy of this duration with a positive length.

This method returns a positive duration by effectively removing the sign from any negative total length.
For example, `PT-1.3S` will be returned as `PT1.3S`.

This instance is immutable and unaffected by this method call.

**Returns:** a `Duration` based on this duration with an absolute length, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.addTo(Temporal)

```java
public Temporal addTo(Temporal temporal)
```

Adds this duration to the specified temporal object.

This returns a temporal object of the same observable type as the input
with this duration added.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.plus(TemporalAmount)`.

```java
  // these two lines are equivalent, but the second approach is recommended
  dateTime = thisDuration.addTo(dateTime);
  dateTime = dateTime.plus(thisDuration);
```

The calculation will add the seconds, then nanos.
Only non-zero amounts will be added.

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the temporal object to adjust, not null

**Returns:** an object of the same type with the adjustment made, not null

Throws:

- `DateTimeException`: if unable to add
- `ArithmeticException`: if numeric overflow occurs

## Duration.subtractFrom(Temporal)

```java
public Temporal subtractFrom(Temporal temporal)
```

Subtracts this duration from the specified temporal object.

This returns a temporal object of the same observable type as the input
with this duration subtracted.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.minus(TemporalAmount)`.

```java
  // these two lines are equivalent, but the second approach is recommended
  dateTime = thisDuration.subtractFrom(dateTime);
  dateTime = dateTime.minus(thisDuration);
```

The calculation will subtract the seconds, then nanos.
Only non-zero amounts will be added.

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the temporal object to adjust, not null

**Returns:** an object of the same type with the adjustment made, not null

Throws:

- `DateTimeException`: if unable to subtract
- `ArithmeticException`: if numeric overflow occurs

## Duration.toDays()

```java
public long toDays()
```

Gets the number of days in this duration.

This returns the total number of days in the duration by dividing the
number of seconds by 86400.
This is based on the standard definition of a day as 24 hours.

This instance is immutable and unaffected by this method call.

**Returns:** the number of days in the duration, may be negative

## Duration.toHours()

```java
public long toHours()
```

Gets the number of hours in this duration.

This returns the total number of hours in the duration by dividing the
number of seconds by 3600.

This instance is immutable and unaffected by this method call.

**Returns:** the number of hours in the duration, may be negative

## Duration.toMinutes()

```java
public long toMinutes()
```

Gets the number of minutes in this duration.

This returns the total number of minutes in the duration by dividing the
number of seconds by 60.

This instance is immutable and unaffected by this method call.

**Returns:** the number of minutes in the duration, may be negative

## Duration.toSeconds()

```java
public long toSeconds()
```

Gets the number of seconds in this duration.

This returns the total number of whole seconds in the duration.

This instance is immutable and unaffected by this method call.

**Returns:** the whole seconds part of the length of the duration, positive or negative

**Since:** 9
