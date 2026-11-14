---
title: "LocalDate class (java.time) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalDate class (java.time) (part 3 of 5)

## LocalDate.plus(long, TemporalUnit)

```java
public LocalDate plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this date with the specified amount added.

This returns a `LocalDate`, based on this one, with the amount
in terms of the unit added. If it is not possible to add the amount, because the
unit is not supported or for some other reason, an exception is thrown.

In some cases, adding the amount can cause the resulting date to become invalid.
For example, adding one month to 31st January would result in 31st February.
In cases like this, the unit is responsible for resolving the date.
Typically it will choose the previous valid date, which would be the last valid
day of February in this example.

If the field is a `ChronoUnit` then the addition is implemented here.
The supported fields behave as follows:

- `DAYS` -
 Returns a `LocalDate` with the specified number of days added.
 This is equivalent to `plusDays(long)`.

- `WEEKS` -
 Returns a `LocalDate` with the specified number of weeks added.
 This is equivalent to `plusWeeks(long)` and uses a 7 day week.

- `MONTHS` -
 Returns a `LocalDate` with the specified number of months added.
 This is equivalent to `plusMonths(long)`.
 The day-of-month will be unchanged unless it would be invalid for the new
 month and year. In that case, the day-of-month is adjusted to the maximum
 valid value for the new month and year.

- `YEARS` -
 Returns a `LocalDate` with the specified number of years added.
 This is equivalent to `plusYears(long)`.
 The day-of-month will be unchanged unless it would be invalid for the new
 month and year. In that case, the day-of-month is adjusted to the maximum
 valid value for the new month and year.

- `DECADES` -
 Returns a `LocalDate` with the specified number of decades added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 10.
 The day-of-month will be unchanged unless it would be invalid for the new
 month and year. In that case, the day-of-month is adjusted to the maximum
 valid value for the new month and year.

- `CENTURIES` -
 Returns a `LocalDate` with the specified number of centuries added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 100.
 The day-of-month will be unchanged unless it would be invalid for the new
 month and year. In that case, the day-of-month is adjusted to the maximum
 valid value for the new month and year.

- `MILLENNIA` -
 Returns a `LocalDate` with the specified number of millennia added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 1,000.
 The day-of-month will be unchanged unless it would be invalid for the new
 month and year. In that case, the day-of-month is adjusted to the maximum
 valid value for the new month and year.

- `ERAS` -
 Returns a `LocalDate` with the specified number of eras added.
 Only two eras are supported so the amount must be one, zero or minus one.
 If the amount is non-zero then the year is changed such that the year-of-era
 is unchanged.
 The day-of-month will be unchanged unless it would be invalid for the new
 month and year. In that case, the day-of-month is adjusted to the maximum
 valid value for the new month and year.

All other `ChronoUnit` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
passing `this` as the argument. In this case, the unit determines
whether and how to perform the addition.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount of the unit to add to the result, may be negative
- `unit`: the unit of the amount to add, not null

**Returns:** a `LocalDate` based on this date with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDate.plusYears(long)

```java
public LocalDate plusYears(long yearsToAdd)
```

Returns a copy of this `LocalDate` with the specified number of years added.

This method adds the specified amount to the years field in three steps:

- Add the input years to the year field

- Check if the resulting date would be invalid

- Adjust the day-of-month to the last valid day if necessary

For example, 2008-02-29 (leap year) plus one year would result in the
invalid date 2009-02-29 (standard year). Instead of returning an invalid
result, the last valid day of the month, 2009-02-28, is selected instead.

This instance is immutable and unaffected by this method call.

Parameters:

- `yearsToAdd`: the years to add, may be negative

**Returns:** a `LocalDate` based on this date with the years added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDate.plusMonths(long)

```java
public LocalDate plusMonths(long monthsToAdd)
```

Returns a copy of this `LocalDate` with the specified number of months added.

This method adds the specified amount to the months field in three steps:

- Add the input months to the month-of-year field

- Check if the resulting date would be invalid

- Adjust the day-of-month to the last valid day if necessary

For example, 2007-03-31 plus one month would result in the invalid date
2007-04-31. Instead of returning an invalid result, the last valid day
of the month, 2007-04-30, is selected instead.

This instance is immutable and unaffected by this method call.

Parameters:

- `monthsToAdd`: the months to add, may be negative

**Returns:** a `LocalDate` based on this date with the months added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDate.plusWeeks(long)

```java
public LocalDate plusWeeks(long weeksToAdd)
```

Returns a copy of this `LocalDate` with the specified number of weeks added.

This method adds the specified amount in weeks to the days field incrementing
the month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2008-12-31 plus one week would result in 2009-01-07.

This instance is immutable and unaffected by this method call.

Parameters:

- `weeksToAdd`: the weeks to add, may be negative

**Returns:** a `LocalDate` based on this date with the weeks added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDate.plusDays(long)

```java
public LocalDate plusDays(long daysToAdd)
```

Returns a copy of this `LocalDate` with the specified number of days added.

This method adds the specified amount to the days field incrementing the
month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2008-12-31 plus one day would result in 2009-01-01.

This instance is immutable and unaffected by this method call.

Parameters:

- `daysToAdd`: the days to add, may be negative

**Returns:** a `LocalDate` based on this date with the days added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDate.minus(TemporalAmount)

```java
public LocalDate minus(TemporalAmount amountToSubtract)
```

Returns a copy of this date with the specified amount subtracted.

This returns a `LocalDate`, based on this one, with the specified amount subtracted.
The amount is typically `Period` but may be any other type implementing
the `TemporalAmount` interface.

The calculation is delegated to the amount object by calling
`TemporalAmount.subtractFrom(Temporal)`. The amount implementation is free
to implement the subtraction in any way it wishes, however it typically
calls back to TemporalUnit). Consult the documentation
of the amount implementation to determine if it can be successfully subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount to subtract, not null

**Returns:** a `LocalDate` based on this date with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## LocalDate.minus(long, TemporalUnit)

```java
public LocalDate minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this date with the specified amount subtracted.

This returns a `LocalDate`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** a `LocalDate` based on this date with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDate.minusYears(long)

```java
public LocalDate minusYears(long yearsToSubtract)
```

Returns a copy of this `LocalDate` with the specified number of years subtracted.

This method subtracts the specified amount from the years field in three steps:

- Subtract the input years from the year field

- Check if the resulting date would be invalid

- Adjust the day-of-month to the last valid day if necessary

For example, 2008-02-29 (leap year) minus one year would result in the
invalid date 2007-02-29 (standard year). Instead of returning an invalid
result, the last valid day of the month, 2007-02-28, is selected instead.

This instance is immutable and unaffected by this method call.

Parameters:

- `yearsToSubtract`: the years to subtract, may be negative

**Returns:** a `LocalDate` based on this date with the years subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDate.minusMonths(long)

```java
public LocalDate minusMonths(long monthsToSubtract)
```

Returns a copy of this `LocalDate` with the specified number of months subtracted.

This method subtracts the specified amount from the months field in three steps:

- Subtract the input months from the month-of-year field

- Check if the resulting date would be invalid

- Adjust the day-of-month to the last valid day if necessary

For example, 2007-03-31 minus one month would result in the invalid date
2007-02-31. Instead of returning an invalid result, the last valid day
of the month, 2007-02-28, is selected instead.

This instance is immutable and unaffected by this method call.

Parameters:

- `monthsToSubtract`: the months to subtract, may be negative

**Returns:** a `LocalDate` based on this date with the months subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDate.minusWeeks(long)

```java
public LocalDate minusWeeks(long weeksToSubtract)
```

Returns a copy of this `LocalDate` with the specified number of weeks subtracted.

This method subtracts the specified amount in weeks from the days field decrementing
the month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2009-01-07 minus one week would result in 2008-12-31.

This instance is immutable and unaffected by this method call.

Parameters:

- `weeksToSubtract`: the weeks to subtract, may be negative

**Returns:** a `LocalDate` based on this date with the weeks subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDate.minusDays(long)

```java
public LocalDate minusDays(long daysToSubtract)
```

Returns a copy of this `LocalDate` with the specified number of days subtracted.

This method subtracts the specified amount from the days field decrementing the
month and year fields as necessary to ensure the result remains valid.
The result is only invalid if the maximum/minimum year is exceeded.

For example, 2009-01-01 minus one day would result in 2008-12-31.

This instance is immutable and unaffected by this method call.

Parameters:

- `daysToSubtract`: the days to subtract, may be negative

**Returns:** a `LocalDate` based on this date with the days subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported date range

## LocalDate.query(TemporalQuery<R>)

```java
public <R> R query(TemporalQuery<R> query)
```

Queries this date using the specified query.

This queries this date using the specified query strategy object.
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

## LocalDate.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have the same date as this object.

This returns a temporal object of the same observable type as the input
with the date changed to be the same as this.

The adjustment is equivalent to using long)
passing `ChronoField.EPOCH_DAY` as the field.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisLocalDate.adjustInto(temporal);
  temporal = temporal.with(thisLocalDate);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs
