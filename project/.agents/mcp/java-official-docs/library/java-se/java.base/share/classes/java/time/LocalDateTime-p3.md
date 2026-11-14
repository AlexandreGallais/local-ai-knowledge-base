---
title: "LocalDateTime class (java.time) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalDateTime class (java.time) (part 3 of 4)

## LocalDateTime.withDayOfYear(int)

```java
public LocalDateTime withDayOfYear(int dayOfYear)
```

Returns a copy of this `LocalDateTime` with the day-of-year altered.

If the resulting date-time is invalid, an exception is thrown.

This instance is immutable and unaffected by this method call.

Parameters:

- `dayOfYear`: the day-of-year to set in the result, from 1 to 365-366

**Returns:** a `LocalDateTime` based on this date with the requested day, not null

Throws:

- `DateTimeException`: if the day-of-year value is invalid, or if the day-of-year is invalid for the year

## LocalDateTime.withHour(int)

```java
public LocalDateTime withHour(int hour)
```

Returns a copy of this `LocalDateTime` with the hour-of-day altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `hour`: the hour-of-day to set in the result, from 0 to 23

**Returns:** a `LocalDateTime` based on this date-time with the requested hour, not null

Throws:

- `DateTimeException`: if the hour value is invalid

## LocalDateTime.withMinute(int)

```java
public LocalDateTime withMinute(int minute)
```

Returns a copy of this `LocalDateTime` with the minute-of-hour altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `minute`: the minute-of-hour to set in the result, from 0 to 59

**Returns:** a `LocalDateTime` based on this date-time with the requested minute, not null

Throws:

- `DateTimeException`: if the minute value is invalid

## LocalDateTime.withSecond(int)

```java
public LocalDateTime withSecond(int second)
```

Returns a copy of this `LocalDateTime` with the second-of-minute altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `second`: the second-of-minute to set in the result, from 0 to 59

**Returns:** a `LocalDateTime` based on this date-time with the requested second, not null

Throws:

- `DateTimeException`: if the second value is invalid

## LocalDateTime.withNano(int)

```java
public LocalDateTime withNano(int nanoOfSecond)
```

Returns a copy of this `LocalDateTime` with the nano-of-second altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanoOfSecond`: the nano-of-second to set in the result, from 0 to 999,999,999

**Returns:** a `LocalDateTime` based on this date-time with the requested nanosecond, not null

Throws:

- `DateTimeException`: if the nano value is invalid

## LocalDateTime.truncatedTo(TemporalUnit)

```java
public LocalDateTime truncatedTo(TemporalUnit unit)
```

Returns a copy of this `LocalDateTime` with the time truncated.

Truncation returns a copy of the original date-time with fields
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

**Returns:** a `LocalDateTime` based on this date-time with the time truncated, not null

Throws:

- `DateTimeException`: if unable to truncate
- `UnsupportedTemporalTypeException`: if the unit is not supported

## LocalDateTime.plus(TemporalAmount)

```java
public LocalDateTime plus(TemporalAmount amountToAdd)
```

Returns a copy of this date-time with the specified amount added.

This returns a `LocalDateTime`, based on this one, with the specified amount added.
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

**Returns:** a `LocalDateTime` based on this date-time with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## LocalDateTime.plus(long, TemporalUnit)

```java
public LocalDateTime plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this date-time with the specified amount added.

This returns a `LocalDateTime`, based on this one, with the amount
in terms of the unit added. If it is not possible to add the amount, because the
unit is not supported or for some other reason, an exception is thrown.

If the field is a `ChronoUnit` then the addition is implemented here.
Date units are added as per TemporalUnit).
Time units are added as per TemporalUnit) with
any overflow in days added equivalent to using `plusDays(long)`.

If the field is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
passing `this` as the argument. In this case, the unit determines
whether and how to perform the addition.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount of the unit to add to the result, may be negative
- `unit`: the unit of the amount to add, not null

**Returns:** a `LocalDateTime` based on this date-time with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDateTime.plusYears(long)

```java
public LocalDateTime plusYears(long years)
```

Returns a copy of this `LocalDateTime` with the specified number of years added.

This method adds the specified amount to the years field in three steps:

- Add the input years to the year field

- Check if the resulting date would be invalid

- Adjust the day-of-month to the last valid day if necessary

For example, 2008-02-29 (leap year) plus one year would result in the
invalid date 2009-02-29 (standard year). Instead of returning an invalid
result, the last valid day of the month, 2009-02-28, is selected instead.

This instance is immutable and unaffected by this method call.

Parameters:

- `years`: the years to add, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the years added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.plusMonths(long)

```java
public LocalDateTime plusMonths(long months)
```

Returns a copy of this `LocalDateTime` with the specified number of months added.

This method adds the specified amount to the months field in three steps:

- Add the input months to the month-of-year field

- Check if the resulting date would be invalid

- Adjust the day-of-month to the last valid day if necessary

For example, 2007-03-31 plus one month would result in the invalid date
2007-04-31. Instead of returning an invalid result, the last valid day
of the month, 2007-04-30, is selected instead.

This instance is immutable and unaffected by this method call.

Parameters:

- `months`: the months to add, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the months added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.plusWeeks(long)

```java
public LocalDateTime plusWeeks(long weeks)
```

Returns a copy of this `LocalDateTime` with the specified number of weeks added.

This method adds the specified amount in weeks to the days field incrementing
the month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2008-12-31 plus one week would result in 2009-01-07.

This instance is immutable and unaffected by this method call.

Parameters:

- `weeks`: the weeks to add, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the weeks added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.plusDays(long)

```java
public LocalDateTime plusDays(long days)
```

Returns a copy of this `LocalDateTime` with the specified number of days added.

This method adds the specified amount to the days field incrementing the
month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2008-12-31 plus one day would result in 2009-01-01.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to add, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the days added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.plusHours(long)

```java
public LocalDateTime plusHours(long hours)
```

Returns a copy of this `LocalDateTime` with the specified number of hours added.

This instance is immutable and unaffected by this method call.

Parameters:

- `hours`: the hours to add, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the hours added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.plusMinutes(long)

```java
public LocalDateTime plusMinutes(long minutes)
```

Returns a copy of this `LocalDateTime` with the specified number of minutes added.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutes`: the minutes to add, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the minutes added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.plusSeconds(long)

```java
public LocalDateTime plusSeconds(long seconds)
```

Returns a copy of this `LocalDateTime` with the specified number of seconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to add, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the seconds added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.plusNanos(long)

```java
public LocalDateTime plusNanos(long nanos)
```

Returns a copy of this `LocalDateTime` with the specified number of nanoseconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanos`: the nanos to add, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the nanoseconds added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.minus(TemporalAmount)

```java
public LocalDateTime minus(TemporalAmount amountToSubtract)
```

Returns a copy of this date-time with the specified amount subtracted.

This returns a `LocalDateTime`, based on this one, with the specified amount subtracted.
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

**Returns:** a `LocalDateTime` based on this date-time with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## LocalDateTime.minus(long, TemporalUnit)

```java
public LocalDateTime minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this date-time with the specified amount subtracted.

This returns a `LocalDateTime`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** a `LocalDateTime` based on this date-time with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDateTime.minusYears(long)

```java
public LocalDateTime minusYears(long years)
```

Returns a copy of this `LocalDateTime` with the specified number of years subtracted.

This method subtracts the specified amount from the years field in three steps:

- Subtract the input years from the year field

- Check if the resulting date would be invalid

- Adjust the day-of-month to the last valid day if necessary

For example, 2008-02-29 (leap year) minus one year would result in the
invalid date 2007-02-29 (standard year). Instead of returning an invalid
result, the last valid day of the month, 2007-02-28, is selected instead.

This instance is immutable and unaffected by this method call.

Parameters:

- `years`: the years to subtract, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the years subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDateTime.minusMonths(long)

```java
public LocalDateTime minusMonths(long months)
```

Returns a copy of this `LocalDateTime` with the specified number of months subtracted.

This method subtracts the specified amount from the months field in three steps:

- Subtract the input months from the month-of-year field

- Check if the resulting date would be invalid

- Adjust the day-of-month to the last valid day if necessary

For example, 2007-03-31 minus one month would result in the invalid date
2007-02-31. Instead of returning an invalid result, the last valid day
of the month, 2007-02-28, is selected instead.

This instance is immutable and unaffected by this method call.

Parameters:

- `months`: the months to subtract, may be negative

**Returns:** a `LocalDateTime` based on this date-time with the months subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range
