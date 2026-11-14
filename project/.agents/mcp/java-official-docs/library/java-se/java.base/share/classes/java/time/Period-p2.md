---
title: "Period class (java.time) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Period.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Period class (java.time) (part 2 of 2)

## Period.minus(TemporalAmount)

```java
public Period minus(TemporalAmount amountToSubtract)
```

Returns a copy of this period with the specified period subtracted.

This operates separately on the years, months and days.
No normalization is performed.

For example, "1 year, 6 months and 3 days" minus "2 years, 2 months and 2 days"
returns "-1 years, 4 months and 1 day".

The specified amount is typically an instance of `Period`.
Other types are interpreted using `Period.from(TemporalAmount)`.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToSubtract`: the amount to subtract, not null

**Returns:** a `Period` based on this period with the requested period subtracted, not null

Throws:

- `DateTimeException`: if the specified amount has a non-ISO chronology or contains an invalid unit
- `ArithmeticException`: if numeric overflow occurs

## Period.minusYears(long)

```java
public Period minusYears(long yearsToSubtract)
```

Returns a copy of this period with the specified years subtracted.

This subtracts the amount from the years unit in a copy of this period.
The months and days units are unaffected.
For example, "1 year, 6 months and 3 days" minus 2 years returns "-1 years, 6 months and 3 days".

This instance is immutable and unaffected by this method call.

Parameters:

- `yearsToSubtract`: the years to subtract, positive or negative

**Returns:** a `Period` based on this period with the specified years subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Period.minusMonths(long)

```java
public Period minusMonths(long monthsToSubtract)
```

Returns a copy of this period with the specified months subtracted.

This subtracts the amount from the months unit in a copy of this period.
The years and days units are unaffected.
For example, "1 year, 6 months and 3 days" minus 2 months returns "1 year, 4 months and 3 days".

This instance is immutable and unaffected by this method call.

Parameters:

- `monthsToSubtract`: the years to subtract, positive or negative

**Returns:** a `Period` based on this period with the specified months subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Period.minusDays(long)

```java
public Period minusDays(long daysToSubtract)
```

Returns a copy of this period with the specified days subtracted.

This subtracts the amount from the days unit in a copy of this period.
The years and months units are unaffected.
For example, "1 year, 6 months and 3 days" minus 2 days returns "1 year, 6 months and 1 day".

This instance is immutable and unaffected by this method call.

Parameters:

- `daysToSubtract`: the months to subtract, positive or negative

**Returns:** a `Period` based on this period with the specified days subtracted, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Period.multipliedBy(int)

```java
public Period multipliedBy(int scalar)
```

Returns a new instance with each element in this period multiplied
by the specified scalar.

This returns a period with each of the years, months and days units
individually multiplied.
For example, a period of "2 years, -3 months and 4 days" multiplied by
3 will return "6 years, -9 months and 12 days".
No normalization is performed.

Parameters:

- `scalar`: the scalar to multiply by, not null

**Returns:** a `Period` based on this period with the amounts multiplied by the scalar, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Period.negated()

```java
public Period negated()
```

Returns a new instance with each amount in this period negated.

This returns a period with each of the years, months and days units
individually negated.
For example, a period of "2 years, -3 months and 4 days" will be
negated to "-2 years, 3 months and -4 days".
No normalization is performed.

**Returns:** a `Period` based on this period with the amounts negated, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs, which only happens if one of the units has the value `Integer.MIN_VALUE`

## Period.normalized()

```java
public Period normalized()
```

Returns a copy of this period with the years and months normalized.

This normalizes the years and months units, leaving the days unit unchanged.
The months unit is adjusted to have an absolute value less than 12,
with the years unit being adjusted to compensate. For example, a period of
"1 Year and 15 months" will be normalized to "2 years and 3 months".

The sign of the years and months units will be the same after normalization.
For example, a period of "1 year and -25 months" will be normalized to
"-1 year and -1 month".

This instance is immutable and unaffected by this method call.

**Returns:** a `Period` based on this period with excess months normalized to years, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Period.toTotalMonths()

```java
public long toTotalMonths()
```

Gets the total number of months in this period.

This returns the total number of months in the period by multiplying the
number of years by 12 and adding the number of months.

This instance is immutable and unaffected by this method call.

**Returns:** the total number of months in the period, may be negative

## Period.addTo(Temporal)

```java
public Temporal addTo(Temporal temporal)
```

Adds this period to the specified temporal object.

This returns a temporal object of the same observable type as the input
with this period added.
If the temporal has a chronology, it must be the ISO chronology.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.plus(TemporalAmount)`.

```java
  // these two lines are equivalent, but the second approach is recommended
  dateTime = thisPeriod.addTo(dateTime);
  dateTime = dateTime.plus(thisPeriod);
```

The calculation operates as follows.
First, the chronology of the temporal is checked to ensure it is ISO chronology or null.
Second, if the months are zero, the years are added if non-zero, otherwise
the combination of years and months is added if non-zero.
Finally, any days are added.

This approach ensures that a partial period can be added to a partial date.
For example, a period of years and/or months can be added to a `YearMonth`,
but a period including days cannot.
The approach also adds years and months together when necessary, which ensures
correct behaviour at the end of the month.

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the temporal object to adjust, not null

**Returns:** an object of the same type with the adjustment made, not null

Throws:

- `DateTimeException`: if unable to add
- `ArithmeticException`: if numeric overflow occurs

## Period.subtractFrom(Temporal)

```java
public Temporal subtractFrom(Temporal temporal)
```

Subtracts this period from the specified temporal object.

This returns a temporal object of the same observable type as the input
with this period subtracted.
If the temporal has a chronology, it must be the ISO chronology.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.minus(TemporalAmount)`.

```java
  // these two lines are equivalent, but the second approach is recommended
  dateTime = thisPeriod.subtractFrom(dateTime);
  dateTime = dateTime.minus(thisPeriod);
```

The calculation operates as follows.
First, the chronology of the temporal is checked to ensure it is ISO chronology or null.
Second, if the months are zero, the years are subtracted if non-zero, otherwise
the combination of years and months is subtracted if non-zero.
Finally, any days are subtracted.

This approach ensures that a partial period can be subtracted from a partial date.
For example, a period of years and/or months can be subtracted from a `YearMonth`,
but a period including days cannot.
The approach also subtracts years and months together when necessary, which ensures
correct behaviour at the end of the month.

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the temporal object to adjust, not null

**Returns:** an object of the same type with the adjustment made, not null

Throws:

- `DateTimeException`: if unable to subtract
- `ArithmeticException`: if numeric overflow occurs

## Period.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this period is equal to another period.

The comparison is based on the type `Period` and each of the three amounts.
To be equal, the years, months and days units must be individually equal.
Note that this means that a period of "15 Months" is not equal to a period
of "1 Year and 3 Months".

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other period

## Period.hashCode()

```java
public int hashCode()
```

A hash code for this period.

**Returns:** a suitable hash code

## Period.toString()

```java
public String toString()
```

Outputs this period as a `String`, such as `P6Y3M1D`.

The output will be in the ISO-8601 period format.
A zero period will be represented as zero days, 'P0D'.

**Returns:** a string representation of this period, not null
