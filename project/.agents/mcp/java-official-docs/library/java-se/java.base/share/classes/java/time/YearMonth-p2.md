---
title: "YearMonth class (java.time) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/YearMonth.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# YearMonth class (java.time) (part 2 of 3)

## YearMonth.with(TemporalField, long)

```java
public YearMonth with(TemporalField field, long newValue)
```

Returns a copy of this year-month with the specified field set to a new value.

This returns a `YearMonth`, based on this one, with the value
for the specified field changed.
This can be used to change any supported field, such as the year or month.
If it is not possible to set the value, because the field is not supported or for
some other reason, an exception is thrown.

If the field is a `ChronoField` then the adjustment is implemented here.
The supported fields behave as follows:

- `MONTH_OF_YEAR` -
 Returns a `YearMonth` with the specified month-of-year.
 The year will be unchanged.

- `PROLEPTIC_MONTH` -
 Returns a `YearMonth` with the specified proleptic-month.
 This completely replaces the year and month of this object.

- `YEAR_OF_ERA` -
 Returns a `YearMonth` with the specified year-of-era
 The month and era will be unchanged.

- `YEAR` -
 Returns a `YearMonth` with the specified year.
 The month will be unchanged.

- `ERA` -
 Returns a `YearMonth` with the specified era.
 The month and year-of-era will be unchanged.

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

**Returns:** a `YearMonth` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## YearMonth.withYear(int)

```java
public YearMonth withYear(int year)
```

Returns a copy of this `YearMonth` with the year altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `year`: the year to set in the returned year-month, from MIN_YEAR to MAX_YEAR

**Returns:** a `YearMonth` based on this year-month with the requested year, not null

Throws:

- `DateTimeException`: if the year value is invalid

## YearMonth.withMonth(int)

```java
public YearMonth withMonth(int month)
```

Returns a copy of this `YearMonth` with the month-of-year altered.

This instance is immutable and unaffected by this method call.

Parameters:

- `month`: the month-of-year to set in the returned year-month, from 1 (January) to 12 (December)

**Returns:** a `YearMonth` based on this year-month with the requested month, not null

Throws:

- `DateTimeException`: if the month-of-year value is invalid

## YearMonth.plus(TemporalAmount)

```java
public YearMonth plus(TemporalAmount amountToAdd)
```

Returns a copy of this year-month with the specified amount added.

This returns a `YearMonth`, based on this one, with the specified amount added.
The amount is typically `Period` but may be any other type implementing
the `TemporalAmount` interface.

The calculation is delegated to the amount object by calling
`TemporalAmount.addTo(Temporal)`. The amount implementation is free
to implement the addition in any way it wishes, however it typically
calls back to TemporalUnit). Consult the documentation
of the amount implementation to determine if it can be successfully added.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount to add, not null

**Returns:** a `YearMonth` based on this year-month with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## YearMonth.plus(long, TemporalUnit)

```java
public YearMonth plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this year-month with the specified amount added.

This returns a `YearMonth`, based on this one, with the amount
in terms of the unit added. If it is not possible to add the amount, because the
unit is not supported or for some other reason, an exception is thrown.

If the field is a `ChronoUnit` then the addition is implemented here.
The supported fields behave as follows:

- `MONTHS` -
 Returns a `YearMonth` with the specified number of months added.
 This is equivalent to `plusMonths(long)`.

- `YEARS` -
 Returns a `YearMonth` with the specified number of years added.
 This is equivalent to `plusYears(long)`.

- `DECADES` -
 Returns a `YearMonth` with the specified number of decades added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 10.

- `CENTURIES` -
 Returns a `YearMonth` with the specified number of centuries added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 100.

- `MILLENNIA` -
 Returns a `YearMonth` with the specified number of millennia added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 1,000.

- `ERAS` -
 Returns a `YearMonth` with the specified number of eras added.
 Only two eras are supported so the amount must be one, zero or minus one.
 If the amount is non-zero then the year is changed such that the year-of-era
 is unchanged.

All other `ChronoUnit` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.addTo(Temporal, long)`
passing `this` as the argument. In this case, the unit determines
whether and how to perform the addition.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount of the unit to add to the result, may be negative
- `unit`: the unit of the amount to add, not null

**Returns:** a `YearMonth` based on this year-month with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## YearMonth.plusYears(long)

```java
public YearMonth plusYears(long yearsToAdd)
```

Returns a copy of this `YearMonth` with the specified number of years added.

This instance is immutable and unaffected by this method call.

Parameters:

- `yearsToAdd`: the years to add, may be negative

**Returns:** a `YearMonth` based on this year-month with the years added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## YearMonth.plusMonths(long)

```java
public YearMonth plusMonths(long monthsToAdd)
```

Returns a copy of this `YearMonth` with the specified number of months added.

This instance is immutable and unaffected by this method call.

Parameters:

- `monthsToAdd`: the months to add, may be negative

**Returns:** a `YearMonth` based on this year-month with the months added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## YearMonth.minus(TemporalAmount)

```java
public YearMonth minus(TemporalAmount amountToSubtract)
```

Returns a copy of this year-month with the specified amount subtracted.

This returns a `YearMonth`, based on this one, with the specified amount subtracted.
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

**Returns:** a `YearMonth` based on this year-month with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## YearMonth.minus(long, TemporalUnit)

```java
public YearMonth minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this year-month with the specified amount subtracted.

This returns a `YearMonth`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** a `YearMonth` based on this year-month with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## YearMonth.minusYears(long)

```java
public YearMonth minusYears(long yearsToSubtract)
```

Returns a copy of this `YearMonth` with the specified number of years subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `yearsToSubtract`: the years to subtract, may be negative

**Returns:** a `YearMonth` based on this year-month with the years subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## YearMonth.minusMonths(long)

```java
public YearMonth minusMonths(long monthsToSubtract)
```

Returns a copy of this `YearMonth` with the specified number of months subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `monthsToSubtract`: the months to subtract, may be negative

**Returns:** a `YearMonth` based on this year-month with the months subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## YearMonth.query(TemporalQuery<R>)

```java
public <R> R query(TemporalQuery<R> query)
```

Queries this year-month using the specified query.

This queries this year-month using the specified query strategy object.
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

## YearMonth.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have this year-month.

This returns a temporal object of the same observable type as the input
with the year and month changed to be the same as this.

The adjustment is equivalent to using long)
passing `ChronoField.PROLEPTIC_MONTH` as the field.
If the specified temporal object does not use the ISO calendar system then
a `DateTimeException` is thrown.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisYearMonth.adjustInto(temporal);
  temporal = temporal.with(thisYearMonth);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## YearMonth.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another year-month in terms of the specified unit.

This calculates the amount of time between two `YearMonth`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified year-month.
The result will be negative if the end is before the start.
The `Temporal` passed to this method is converted to a
`YearMonth` using `from(TemporalAccessor)`.
For example, the amount in years between two year-months can be calculated
using `startYearMonth.until(endYearMonth, YEARS)`.

The calculation returns a whole number, representing the number of
complete units between the two year-months.
For example, the amount in decades between 2012-06 and 2032-05
will only be one decade as it is one month short of two decades.

There are two equivalent ways of using this method.
The first is to invoke this method.
The second is to use Temporal):

```java
  // these two lines are equivalent
  amount = start.until(end, MONTHS);
  amount = MONTHS.between(start, end);
```

The choice should be made based on which makes the code more readable.

The calculation is implemented in this method for `ChronoUnit`.
The units `MONTHS`, `YEARS`, `DECADES`,
`CENTURIES`, `MILLENNIA` and `ERAS` are supported.
Other `ChronoUnit` values will throw an exception.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
passing `this` as the first argument and the converted input temporal
as the second argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end date, exclusive, which is converted to a `YearMonth`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this year-month and the end year-month

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to a `YearMonth`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## YearMonth.format(DateTimeFormatter)

```java
public String format(DateTimeFormatter formatter)
```

Formats this year-month using the specified formatter.

This year-month will be passed to the formatter to produce a string.

Parameters:

- `formatter`: the formatter to use, not null

**Returns:** the formatted year-month string, not null

Throws:

- `DateTimeException`: if an error occurs during printing
