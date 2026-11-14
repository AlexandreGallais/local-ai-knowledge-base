---
title: "OffsetDateTime class (java.time) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/OffsetDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OffsetDateTime class (java.time) (part 3 of 4)

## OffsetDateTime.withSecond(int)

```java
public OffsetDateTime withSecond(int second)
```

Returns a copy of this `OffsetDateTime` with the second-of-minute altered.

The date and offset do not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `second`: the second-of-minute to set in the result, from 0 to 59

**Returns:** an `OffsetDateTime` based on this date-time with the requested second, not null

Throws:

- `DateTimeException`: if the second value is invalid

## OffsetDateTime.withNano(int)

```java
public OffsetDateTime withNano(int nanoOfSecond)
```

Returns a copy of this `OffsetDateTime` with the nano-of-second altered.

The date and offset do not affect the calculation and will be the same in the result.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanoOfSecond`: the nano-of-second to set in the result, from 0 to 999,999,999

**Returns:** an `OffsetDateTime` based on this date-time with the requested nanosecond, not null

Throws:

- `DateTimeException`: if the nano value is invalid

## OffsetDateTime.truncatedTo(TemporalUnit)

```java
public OffsetDateTime truncatedTo(TemporalUnit unit)
```

Returns a copy of this `OffsetDateTime` with the time truncated.

Truncation returns a copy of the original date-time with fields
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

**Returns:** an `OffsetDateTime` based on this date-time with the time truncated, not null

Throws:

- `DateTimeException`: if unable to truncate
- `UnsupportedTemporalTypeException`: if the unit is not supported

## OffsetDateTime.plus(TemporalAmount)

```java
public OffsetDateTime plus(TemporalAmount amountToAdd)
```

Returns a copy of this date-time with the specified amount added.

This returns an `OffsetDateTime`, based on this one, with the specified amount added.
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

**Returns:** an `OffsetDateTime` based on this date-time with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## OffsetDateTime.plus(long, TemporalUnit)

```java
public OffsetDateTime plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this date-time with the specified amount added.

This returns an `OffsetDateTime`, based on this one, with the amount
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

**Returns:** an `OffsetDateTime` based on this date-time with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## OffsetDateTime.plusYears(long)

```java
public OffsetDateTime plusYears(long years)
```

Returns a copy of this `OffsetDateTime` with the specified number of years added.

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

**Returns:** an `OffsetDateTime` based on this date-time with the years added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.plusMonths(long)

```java
public OffsetDateTime plusMonths(long months)
```

Returns a copy of this `OffsetDateTime` with the specified number of months added.

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

**Returns:** an `OffsetDateTime` based on this date-time with the months added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.plusWeeks(long)

```java
public OffsetDateTime plusWeeks(long weeks)
```

Returns a copy of this OffsetDateTime with the specified number of weeks added.

This method adds the specified amount in weeks to the days field incrementing
the month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2008-12-31 plus one week would result in 2009-01-07.

This instance is immutable and unaffected by this method call.

Parameters:

- `weeks`: the weeks to add, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the weeks added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.plusDays(long)

```java
public OffsetDateTime plusDays(long days)
```

Returns a copy of this OffsetDateTime with the specified number of days added.

This method adds the specified amount to the days field incrementing the
month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2008-12-31 plus one day would result in 2009-01-01.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to add, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the days added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.plusHours(long)

```java
public OffsetDateTime plusHours(long hours)
```

Returns a copy of this `OffsetDateTime` with the specified number of hours added.

This instance is immutable and unaffected by this method call.

Parameters:

- `hours`: the hours to add, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the hours added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.plusMinutes(long)

```java
public OffsetDateTime plusMinutes(long minutes)
```

Returns a copy of this `OffsetDateTime` with the specified number of minutes added.

This instance is immutable and unaffected by this method call.

Parameters:

- `minutes`: the minutes to add, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the minutes added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.plusSeconds(long)

```java
public OffsetDateTime plusSeconds(long seconds)
```

Returns a copy of this `OffsetDateTime` with the specified number of seconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `seconds`: the seconds to add, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the seconds added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.plusNanos(long)

```java
public OffsetDateTime plusNanos(long nanos)
```

Returns a copy of this `OffsetDateTime` with the specified number of nanoseconds added.

This instance is immutable and unaffected by this method call.

Parameters:

- `nanos`: the nanos to add, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the nanoseconds added, not null

Throws:

- `DateTimeException`: if the unit cannot be added to this type

## OffsetDateTime.minus(TemporalAmount)

```java
public OffsetDateTime minus(TemporalAmount amountToSubtract)
```

Returns a copy of this date-time with the specified amount subtracted.

This returns an `OffsetDateTime`, based on this one, with the specified amount subtracted.
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

**Returns:** an `OffsetDateTime` based on this date-time with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## OffsetDateTime.minus(long, TemporalUnit)

```java
public OffsetDateTime minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this date-time with the specified amount subtracted.

This returns an `OffsetDateTime`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** an `OffsetDateTime` based on this date-time with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## OffsetDateTime.minusYears(long)

```java
public OffsetDateTime minusYears(long years)
```

Returns a copy of this `OffsetDateTime` with the specified number of years subtracted.

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

**Returns:** an `OffsetDateTime` based on this date-time with the years subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.minusMonths(long)

```java
public OffsetDateTime minusMonths(long months)
```

Returns a copy of this `OffsetDateTime` with the specified number of months subtracted.

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

**Returns:** an `OffsetDateTime` based on this date-time with the months subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## OffsetDateTime.minusWeeks(long)

```java
public OffsetDateTime minusWeeks(long weeks)
```

Returns a copy of this `OffsetDateTime` with the specified number of weeks subtracted.

This method subtracts the specified amount in weeks from the days field decrementing
the month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2009-01-07 minus one week would result in 2008-12-31.

This instance is immutable and unaffected by this method call.

Parameters:

- `weeks`: the weeks to subtract, may be negative

**Returns:** an `OffsetDateTime` based on this date-time with the weeks subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range
