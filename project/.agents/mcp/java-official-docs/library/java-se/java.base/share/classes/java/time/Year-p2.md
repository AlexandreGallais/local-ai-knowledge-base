---
title: "Year class (java.time) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Year.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Year class (java.time) (part 2 of 3)

## Year.with(TemporalField, long)

```java
public Year with(TemporalField field, long newValue)
```

Returns a copy of this year with the specified field set to a new value.

This returns a `Year`, based on this one, with the value
for the specified field changed.
If it is not possible to set the value, because the field is not supported or for
some other reason, an exception is thrown.

If the field is a `ChronoField` then the adjustment is implemented here.
The supported fields behave as follows:

- `YEAR_OF_ERA` -
 Returns a `Year` with the specified year-of-era
 The era will be unchanged.

- `YEAR` -
 Returns a `Year` with the specified year.
 This completely replaces the date and is equivalent to `of(int)`.

- `ERA` -
 Returns a `Year` with the specified era.
 The year-of-era will be unchanged.

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

**Returns:** a `Year` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## Year.plus(TemporalAmount)

```java
public Year plus(TemporalAmount amountToAdd)
```

Returns a copy of this year with the specified amount added.

This returns a `Year`, based on this one, with the specified amount added.
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

**Returns:** a `Year` based on this year with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs

## Year.plus(long, TemporalUnit)

```java
public Year plus(long amountToAdd, TemporalUnit unit)
```

Returns a copy of this year with the specified amount added.

This returns a `Year`, based on this one, with the amount
in terms of the unit added. If it is not possible to add the amount, because the
unit is not supported or for some other reason, an exception is thrown.

If the field is a `ChronoUnit` then the addition is implemented here.
The supported fields behave as follows:

- `YEARS` -
 Returns a `Year` with the specified number of years added.
 This is equivalent to `plusYears(long)`.

- `DECADES` -
 Returns a `Year` with the specified number of decades added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 10.

- `CENTURIES` -
 Returns a `Year` with the specified number of centuries added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 100.

- `MILLENNIA` -
 Returns a `Year` with the specified number of millennia added.
 This is equivalent to calling `plusYears(long)` with the amount
 multiplied by 1,000.

- `ERAS` -
 Returns a `Year` with the specified number of eras added.
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

**Returns:** a `Year` based on this year with the specified amount added, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## Year.plusYears(long)

```java
public Year plusYears(long yearsToAdd)
```

Returns a copy of this `Year` with the specified number of years added.

This instance is immutable and unaffected by this method call.

Parameters:

- `yearsToAdd`: the years to add, may be negative

**Returns:** a `Year` based on this year with the years added, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## Year.minus(TemporalAmount)

```java
public Year minus(TemporalAmount amountToSubtract)
```

Returns a copy of this year with the specified amount subtracted.

This returns a `Year`, based on this one, with the specified amount subtracted.
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

**Returns:** a `Year` based on this year with the subtraction made, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `ArithmeticException`: if numeric overflow occurs

## Year.minus(long, TemporalUnit)

```java
public Year minus(long amountToSubtract, TemporalUnit unit)
```

Returns a copy of this year with the specified amount subtracted.

This returns a `Year`, based on this one, with the amount
in terms of the unit subtracted. If it is not possible to subtract the amount,
because the unit is not supported or for some other reason, an exception is thrown.

This method is equivalent to TemporalUnit) with the amount negated.
See that method for a full description of how addition, and thus subtraction, works.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount of the unit to subtract from the result, may be negative
- `unit`: the unit of the amount to subtract, not null

**Returns:** a `Year` based on this year with the specified amount subtracted, not null

Throws:

- `DateTimeException`: if the subtraction cannot be made
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## Year.minusYears(long)

```java
public Year minusYears(long yearsToSubtract)
```

Returns a copy of this `Year` with the specified number of years subtracted.

This instance is immutable and unaffected by this method call.

Parameters:

- `yearsToSubtract`: the years to subtract, may be negative

**Returns:** a `Year` based on this year with the year subtracted, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## Year.query(TemporalQuery<R>)

```java
public <R> R query(TemporalQuery<R> query)
```

Queries this year using the specified query.

This queries this year using the specified query strategy object.
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

## Year.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have this year.

This returns a temporal object of the same observable type as the input
with the year changed to be the same as this.

The adjustment is equivalent to using long)
passing `ChronoField.YEAR` as the field.
If the specified temporal object does not use the ISO calendar system then
a `DateTimeException` is thrown.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisYear.adjustInto(temporal);
  temporal = temporal.with(thisYear);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## Year.until(Temporal, TemporalUnit)

```java
public long until(Temporal endExclusive, TemporalUnit unit)
```

Calculates the amount of time until another year in terms of the specified unit.

This calculates the amount of time between two `Year`
objects in terms of a single `TemporalUnit`.
The start and end points are `this` and the specified year.
The result will be negative if the end is before the start.
The `Temporal` passed to this method is converted to a
`Year` using `from(TemporalAccessor)`.
For example, the amount in decades between two year can be calculated
using `startYear.until(endYear, DECADES)`.

The calculation returns a whole number, representing the number of
complete units between the two years.
For example, the amount in decades between 2012 and 2031
will only be one decade as it is one year short of two decades.

There are two equivalent ways of using this method.
The first is to invoke this method.
The second is to use Temporal):

```java
  // these two lines are equivalent
  amount = start.until(end, YEARS);
  amount = YEARS.between(start, end);
```

The choice should be made based on which makes the code more readable.

The calculation is implemented in this method for `ChronoUnit`.
The units `YEARS`, `DECADES`, `CENTURIES`,
`MILLENNIA` and `ERAS` are supported.
Other `ChronoUnit` values will throw an exception.

If the unit is not a `ChronoUnit`, then the result of this method
is obtained by invoking `TemporalUnit.between(Temporal, Temporal)`
passing `this` as the first argument and the converted input temporal
as the second argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `endExclusive`: the end date, exclusive, which is converted to a `Year`, not null
- `unit`: the unit to measure the amount in, not null

**Returns:** the amount of time between this year and the end year

Throws:

- `DateTimeException`: if the amount cannot be calculated, or the end temporal cannot be converted to a `Year`
- `UnsupportedTemporalTypeException`: if the unit is not supported
- `ArithmeticException`: if numeric overflow occurs

## Year.format(DateTimeFormatter)

```java
public String format(DateTimeFormatter formatter)
```

Formats this year using the specified formatter.

This year will be passed to the formatter to produce a string.

Parameters:

- `formatter`: the formatter to use, not null

**Returns:** the formatted year string, not null

Throws:

- `DateTimeException`: if an error occurs during printing

## Year.atDay(int)

```java
public LocalDate atDay(int dayOfYear)
```

Combines this year with a day-of-year to create a `LocalDate`.

This returns a `LocalDate` formed from this year and the specified day-of-year.

The day-of-year value 366 is only valid in a leap year.

Parameters:

- `dayOfYear`: the day-of-year to use, from 1 to 365-366

**Returns:** the local date formed from this year and the specified date of year, not null

Throws:

- `DateTimeException`: if the day of year is zero or less, 366 or greater or equal to 366 and this is not a leap year

## Year.atMonth(Month)

```java
public YearMonth atMonth(Month month)
```

Combines this year with a month to create a `YearMonth`.

This returns a `YearMonth` formed from this year and the specified month.
All possible combinations of year and month are valid.

This method can be used as part of a chain to produce a date:

```java
 LocalDate date = year.atMonth(month).atDay(day);
```

Parameters:

- `month`: the month-of-year to use, not null

**Returns:** the year-month formed from this year and the specified month, not null

## Year.atMonth(int)

```java
public YearMonth atMonth(int month)
```

Combines this year with a month to create a `YearMonth`.

This returns a `YearMonth` formed from this year and the specified month.
All possible combinations of year and month are valid.

This method can be used as part of a chain to produce a date:

```java
 LocalDate date = year.atMonth(month).atDay(day);
```

Parameters:

- `month`: the month-of-year to use, from 1 (January) to 12 (December)

**Returns:** the year-month formed from this year and the specified month, not null

Throws:

- `DateTimeException`: if the month is invalid

## Year.atMonthDay(MonthDay)

```java
public LocalDate atMonthDay(MonthDay monthDay)
```

Combines this year with a month-day to create a `LocalDate`.

This returns a `LocalDate` formed from this year and the specified month-day.

A month-day of February 29th will be adjusted to February 28th in the resulting
date if the year is not a leap year.

Parameters:

- `monthDay`: the month-day to use, not null

**Returns:** the local date formed from this year and the specified month-day, not null

## Year.compareTo(Year)

```java
public int compareTo(Year other)
```

Compares this year to another year.

The comparison is based on the value of the year.
It is "consistent with equals", as defined by `Comparable`.

Parameters:

- `other`: the other year to compare to, not null

**Returns:** the comparator value, that is less than zero if this is before `other`,
         zero if they are equal, or greater than zero if this is after `other`

**See also:** #isBefore

**See also:** #isAfter
