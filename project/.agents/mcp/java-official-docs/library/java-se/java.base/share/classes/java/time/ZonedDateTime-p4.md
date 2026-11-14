---
title: "ZonedDateTime class (java.time) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/ZonedDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZonedDateTime class (java.time) (part 4 of 5)

## ZonedDateTime.truncatedTo(TemporalUnit)

```java
public ZonedDateTime truncatedTo(TemporalUnit unit)
```

Returns a copy of this `ZonedDateTime` with the time truncated.

Truncation returns a copy of the original date-time with fields
smaller than the specified unit set to zero.
For example, truncating with the minutes unit
will set the second-of-minute and nano-of-second field to zero.

The unit must have a duration
that divides into the length of a standard day without remainder.
This includes all supplied time units on `ChronoUnit` and
DAYS. Other units throw an exception.

This operates on the local time-line,
truncating
the underlying local date-time. This is then converted back to a
`ZonedDateTime`, using the zone ID to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `unit`: the unit to truncate to, not null

**Returns:** a `ZonedDateTime` based on this date-time with the time truncated, not null

Throws:

- `DateTimeException`: if unable to truncate
- `UnsupportedTemporalTypeException`: if the unit is not supported

## ZonedDateTime.plus(TemporalAmount)

```java
public ZonedDateTime plus(TemporalAmount amountToAdd)
```

Returns a copy of this date-time with the specified amount added.

This returns a `ZonedDateTime`, based on this one, with the specified amount added.
The amount is typically `Period` or `Duration` but may be
any other type implementing the `TemporalAmount` interface.

The calculation is delegated to the amount object by calling
`TemporalAmount.addTo(Temporal)`. The amount implementation is free
to implement the addition in any way it wishes, however it typically
calls back to TemporalUnit). Consult the documentation
of the amount implementation to determine if it can be successfully added.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount to add, not null

**Returns:** a `ZonedDateTime` based on this date-time with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## ZonedDateTime.plus(long, TemporalUnit)

```java
public ZonedDateTime plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this date-time with the specified amount added.

This returns a `ZonedDateTime`, based on this one, with the amount
in terms of the unit added. If it is not possible to add the amount, because the
unit is not supported or for some other reason, an exception is thrown.

If the field is a `ChronoUnit` then the addition is implemented here.
The zone is not part of the calculation and will be unchanged in the result.
The calculation for date and time units differ.

Date units operate on the local time-line.
The period is first added to the local date-time, then converted back
to a zoned date-time using the zone ID.
The conversion uses ZoneId, ZoneOffset)
with the offset before the addition.

Time units operate on the instant time-line.
The period is first added to the local date-time, then converted back to
a zoned date-time using the zone ID.
The conversion uses ZoneOffset, ZoneId)
with the offset before the addition.

If the field is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
passing `this` as the argument. In this case, the unit determines
whether and how to perform the addition.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount of the unit to add to the result, may be negative
- `unit`: the unit of the amount to add, not null

**Returns:** a `ZonedDateTime` based on this date-time with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## ZonedDateTime.plusYears(long)

```java
public ZonedDateTime plusYears(long years)
```

Returns a copy of this `ZonedDateTime` with the specified number of years added.

This operates on the local time-line,
adding years to the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `years`: the years to add, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the years added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.plusMonths(long)

```java
public ZonedDateTime plusMonths(long months)
```

Returns a copy of this `ZonedDateTime` with the specified number of months added.

This operates on the local time-line,
adding months to the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `months`: the months to add, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the months added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.plusWeeks(long)

```java
public ZonedDateTime plusWeeks(long weeks)
```

Returns a copy of this `ZonedDateTime` with the specified number of weeks added.

This operates on the local time-line,
adding weeks to the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `weeks`: the weeks to add, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the weeks added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.plusDays(long)

```java
public ZonedDateTime plusDays(long days)
```

Returns a copy of this `ZonedDateTime` with the specified number of days added.

This operates on the local time-line,
adding days to the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to add, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the days added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.plusHours(long)

```java
public ZonedDateTime plusHours(long hours)
```

Returns a copy of this `ZonedDateTime` with the specified number of hours added.

This operates on the instant time-line, such that adding one hour will
always be a duration of one hour later.
This may cause the local date-time to change by an amount other than one hour.
Note that this is a different approach to that used by days, months and years,
thus adding one day is not the same as adding 24 hours.

For example, consider a time-zone, such as 'Europe/Paris', where the
Autumn DST cutover means that the local times 02:00 to 02:59 occur twice
changing from offset +02:00 in summer to +01:00 in winter.

- Adding one hour to 01:30+02:00 will result in 02:30+02:00
    (both in summer time)

- Adding one hour to 02:30+02:00 will result in 02:30+01:00
    (moving from summer to winter time)

- Adding one hour to 02:30+01:00 will result in 03:30+01:00
    (both in winter time)

- Adding three hours to 01:30+02:00 will result in 03:30+01:00
    (moving from summer to winter time)

This instance is immutable and unaffected by this method call.

Parameters:

- `hours`: the hours to add, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the hours added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.plusMinutes(long)

```java
public ZonedDateTime plusMinutes(long minutes)
```

Returns a copy of this `ZonedDateTime` with the specified number of minutes added.

This operates on the instant time-line, such that adding one minute will
always be a duration of one minute later.
This may cause the local date-time to change by an amount other than one minute.
Note that this is a different approach to that used by days, months and years.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutes`: the minutes to add, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the minutes added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.plusSeconds(long)

```java
public ZonedDateTime plusSeconds(long seconds)
```

Returns a copy of this `ZonedDateTime` with the specified number of seconds added.

This operates on the instant time-line, such that adding one second will
always be a duration of one second later.
This may cause the local date-time to change by an amount other than one second.
Note that this is a different approach to that used by days, months and years.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to add, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the seconds added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.plusNanos(long)

```java
public ZonedDateTime plusNanos(long nanos)
```

Returns a copy of this `ZonedDateTime` with the specified number of nanoseconds added.

This operates on the instant time-line, such that adding one nano will
always be a duration of one nano later.
This may cause the local date-time to change by an amount other than one nano.
Note that this is a different approach to that used by days, months and years.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanos`: the nanos to add, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the nanoseconds added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## ZonedDateTime.minus(TemporalAmount)

```java
public ZonedDateTime minus(TemporalAmount amountToSubtract)
```

Returns a copy of this date-time with the specified amount subtracted.

This returns a `ZonedDateTime`, based on this one, with the specified amount subtracted.
The amount is typically `Period` or `Duration` but may be
any other type implementing the `TemporalAmount` interface.

The calculation is delegated to the amount object by calling
`TemporalAmount.subtractFrom(Temporal)`. The amount implementation is free
to implement the subtraction in any way it wishes, however it typically
calls back to TemporalUnit). Consult the documentation
of the amount implementation to determine if it can be successfully subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount to subtract, not null

**Returns:** a `ZonedDateTime` based on this date-time with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## ZonedDateTime.minus(long, TemporalUnit)

```java
public ZonedDateTime minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this date-time with the specified amount subtracted.

This returns a `ZonedDateTime`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

The calculation for date and time units differ.

Date units operate on the local time-line.
The period is first subtracted from the local date-time, then converted back
to a zoned date-time using the zone ID.
The conversion uses ZoneId, ZoneOffset)
with the offset before the subtraction.

Time units operate on the instant time-line.
The period is first subtracted from the local date-time, then converted back to
a zoned date-time using the zone ID.
The conversion uses ZoneOffset, ZoneId)
with the offset before the subtraction.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** a `ZonedDateTime` based on this date-time with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## ZonedDateTime.minusYears(long)

```java
public ZonedDateTime minusYears(long years)
```

Returns a copy of this `ZonedDateTime` with the specified number of years subtracted.

This operates on the local time-line,
subtracting years to the local date-time.
This is then converted back to a `ZonedDateTime`, using the zone ID
to obtain the offset.

When converting back to `ZonedDateTime`, if the local date-time is in an overlap,
then the offset will be retained if possible, otherwise the earlier offset will be used.
If in a gap, the local date-time will be adjusted forward by the length of the gap.

This instance is immutable and unaffected by this method call.

Parameters:

- `years`: the years to subtract, may be negative

**Returns:** a `ZonedDateTime` based on this date-time with the years subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range
