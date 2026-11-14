---
title: "Period class (java.time) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Period.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Period class (java.time)

```java
public final class Period implements ChronoPeriod, Serializable
```

A date-based amount of time in the ISO-8601 calendar system,
such as '2 years, 3 months and 4 days'.

This class models a quantity or amount of time in terms of years, months and days.
See `Duration` for the time-based equivalent to this class.

Durations and periods differ in their treatment of daylight savings time
when added to `ZonedDateTime`. A `Duration` will add an exact
number of seconds, thus a duration of one day is always exactly 24 hours.
By contrast, a `Period` will add a conceptual day, trying to maintain
the local time.

For example, consider adding a period of one day and a duration of one day to
18:00 on the evening before a daylight savings gap. The `Period` will add
the conceptual day and result in a `ZonedDateTime` at 18:00 the following day.
By contrast, the `Duration` will add exactly 24 hours, resulting in a
`ZonedDateTime` at 19:00 the following day (assuming a one hour DST gap).

The supported units of a period are YEARS,
MONTHS and DAYS.
All three fields are always present, but may be set to zero.

The ISO-8601 calendar system is the modern civil calendar system used today
in most of the world. It is equivalent to the proleptic Gregorian calendar
system, in which today's rules for leap years are applied for all time.

The period is modeled as a directed amount of time, meaning that individual parts of the
period may be negative.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## Period.ZERO

```java
public static final Period ZERO
```

A constant for a period of zero.

## Period.ofYears(int)

```java
public static Period ofYears(int years)
```

Obtains a `Period` representing a number of years.

The resulting period will have the specified years.
The months and days units will be zero.

Parameters:

- `years`: the number of years, positive or negative

**Returns:** the period of years, not null

## Period.ofMonths(int)

```java
public static Period ofMonths(int months)
```

Obtains a `Period` representing a number of months.

The resulting period will have the specified months.
The years and days units will be zero.

Parameters:

- `months`: the number of months, positive or negative

**Returns:** the period of months, not null

## Period.ofWeeks(int)

```java
public static Period ofWeeks(int weeks)
```

Obtains a `Period` representing a number of weeks.

The resulting period will be day-based, with the amount of days
equal to the number of weeks multiplied by 7.
The years and months units will be zero.

Parameters:

- `weeks`: the number of weeks, positive or negative

**Returns:** the period, with the input weeks converted to days, not null

## Period.ofDays(int)

```java
public static Period ofDays(int days)
```

Obtains a `Period` representing a number of days.

The resulting period will have the specified days.
The years and months units will be zero.

Parameters:

- `days`: the number of days, positive or negative

**Returns:** the period of days, not null

## Period.of(int, int, int)

```java
public static Period of(int years, int months, int days)
```

Obtains a `Period` representing a number of years, months and days.

This creates an instance based on years, months and days.

Parameters:

- `years`: the amount of years, may be negative
- `months`: the amount of months, may be negative
- `days`: the amount of days, may be negative

**Returns:** the period of years, months and days, not null

## Period.from(TemporalAmount)

```java
public static Period from(TemporalAmount amount)
```

Obtains an instance of `Period` from a temporal amount.

This obtains a period based on the specified amount.
A `TemporalAmount` represents an  amount of time, which may be
date-based or time-based, which this factory extracts to a `Period`.

The conversion loops around the set of units from the amount and uses
the YEARS, MONTHS
and DAYS units to create a period.
If any other units are found then an exception is thrown.

If the amount is a `ChronoPeriod` then it must use the ISO chronology.

Parameters:

- `amount`: the temporal amount to convert, not null

**Returns:** the equivalent period, not null

Throws:

- `DateTimeException`: if unable to convert to a `Period`
- `ArithmeticException`: if the amount of years, months or days exceeds an int

## Period.parse(CharSequence)

```java
public static Period parse(CharSequence text)
```

Obtains a `Period` from a text string such as `PnYnMnD`.

This will parse the string produced by `toString()` which is
based on the ISO-8601 period formats `PnYnMnD` and `PnW`.

The string starts with an optional sign, denoted by the ASCII negative
or positive symbol. If negative, the whole period is negated.
The ASCII letter "P" is next in upper or lower case.
There are then four sections, each consisting of a number and a suffix.
At least one of the four sections must be present.
The sections have suffixes in ASCII of "Y", "M", "W" and "D" for
years, months, weeks and days, accepted in upper or lower case.
The suffixes must occur in order.
The number part of each section must consist of ASCII digits.
The number may be prefixed by the ASCII negative or positive symbol.
The number must parse to an `int`.

The leading plus/minus sign, and negative values for other units are
not part of the ISO-8601 standard. In addition, ISO-8601 does not
permit mixing between the `PnYnMnD` and `PnW` formats.
Any week-based input is multiplied by 7 and treated as a number of days.

For example, the following are valid inputs:

```java
  "P2Y"             -- Period.ofYears(2)
  "P3M"             -- Period.ofMonths(3)
  "P4W"             -- Period.ofWeeks(4)
  "P5D"             -- Period.ofDays(5)
  "P1Y2M3D"         -- Period.of(1, 2, 3)
  "P1Y2M3W4D"       -- Period.of(1, 2, 25)
  "P-1Y2M"          -- Period.of(-1, 2, 0)
  "-P1Y2M"          -- Period.of(-1, -2, 0)
```

Parameters:

- `text`: the text to parse, not null

**Returns:** the parsed period, not null

Throws:

- `DateTimeParseException`: if the text cannot be parsed to a period

## Period.between(LocalDate, LocalDate)

```java
public static Period between(LocalDate startDateInclusive, LocalDate endDateExclusive)
```

Obtains a `Period` consisting of the number of years, months,
and days between two dates.

The start date is included, but the end date is not.
The period is calculated by removing complete months, then calculating
the remaining number of days, adjusting to ensure that both have the same sign.
The number of months is then split into years and months based on a 12 month year.
A month is considered if the end day-of-month is greater than or equal to the start day-of-month.
For example, from `2010-01-15` to `2011-03-18` is one year, two months and three days.

The result of this method can be a negative period if the end is before the start.
The negative sign will be the same in each of year, month and day.

Parameters:

- `startDateInclusive`: the start date, inclusive, not null
- `endDateExclusive`: the end date, exclusive, not null

**Returns:** the period between this date and the end date, not null

**See also:** ChronoLocalDate#until(ChronoLocalDate)

## Period.get(TemporalUnit)

```java
public long get(TemporalUnit unit)
```

Gets the value of the requested unit.

This returns a value for each of the three supported units,
YEARS, MONTHS and
DAYS.
All other units throw an exception.

Parameters:

- `unit`: the `TemporalUnit` for which to return the value

**Returns:** the long value of the unit

Throws:

- `DateTimeException`: if the unit is not supported
- `UnsupportedTemporalTypeException`: if the unit is not supported

## Period.getUnits()

```java
public List<TemporalUnit> getUnits()
```

Gets the set of units supported by this period.

The supported units are YEARS,
MONTHS and DAYS.
They are returned in the order years, months, days.

This set can be used in conjunction with `get(TemporalUnit)`
to access the entire state of the period.

**Returns:** a list containing the years, months and days units, not null

## Period.getChronology()

```java
public IsoChronology getChronology()
```

Gets the chronology of this period, which is the ISO calendar system.

The `Chronology` represents the calendar system in use.
The ISO-8601 calendar system is the modern civil calendar system used today
in most of the world. It is equivalent to the proleptic Gregorian calendar
system, in which today's rules for leap years are applied for all time.

**Returns:** the ISO chronology, not null

## Period.isZero()

```java
public boolean isZero()
```

Checks if all three units of this period are zero.

A zero period has the value zero for the years, months and days units.

**Returns:** true if this period is zero-length

## Period.isNegative()

```java
public boolean isNegative()
```

Checks if any of the three units of this period are negative.

This checks whether the years, months or days units are less than zero.

**Returns:** true if any unit of this period is negative

## Period.getYears()

```java
public int getYears()
```

Gets the amount of years of this period.

This returns the years unit.

The months unit is not automatically normalized with the years unit.
This means that a period of "15 months" is different to a period
of "1 year and 3 months".

**Returns:** the amount of years of this period, may be negative

## Period.getMonths()

```java
public int getMonths()
```

Gets the amount of months of this period.

This returns the months unit.

The months unit is not automatically normalized with the years unit.
This means that a period of "15 months" is different to a period
of "1 year and 3 months".

**Returns:** the amount of months of this period, may be negative

## Period.getDays()

```java
public int getDays()
```

Gets the amount of days of this period.

This returns the days unit.

**Returns:** the amount of days of this period, may be negative

## Period.withYears(int)

```java
public Period withYears(int years)
```

Returns a copy of this period with the specified amount of years.

This sets the amount of the years unit in a copy of this period.
The months and days units are unaffected.

The months unit is not automatically normalized with the years unit.
This means that a period of "15 months" is different to a period
of "1 year and 3 months".

This instance is immutable and unaffected by this method call.

Parameters:

- `years`: the years to represent, may be negative

**Returns:** a `Period` based on this period with the requested years, not null

## Period.withMonths(int)

```java
public Period withMonths(int months)
```

Returns a copy of this period with the specified amount of months.

This sets the amount of the months unit in a copy of this period.
The years and days units are unaffected.

The months unit is not automatically normalized with the years unit.
This means that a period of "15 months" is different to a period
of "1 year and 3 months".

This instance is immutable and unaffected by this method call.

Parameters:

- `months`: the months to represent, may be negative

**Returns:** a `Period` based on this period with the requested months, not null

## Period.withDays(int)

```java
public Period withDays(int days)
```

Returns a copy of this period with the specified amount of days.

This sets the amount of the days unit in a copy of this period.
The years and months units are unaffected.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to represent, may be negative

**Returns:** a `Period` based on this period with the requested days, not null

## Period.plus(TemporalAmount)

```java
public Period plus(TemporalAmount amountToAdd)
```

Returns a copy of this period with the specified period added.

This operates separately on the years, months and days.
No normalization is performed.

For example, "1 year, 6 months and 3 days" plus "2 years, 2 months and 2 days"
returns "3 years, 8 months and 5 days".

The specified amount is typically an instance of `Period`.
Other types are interpreted using `Period.from(TemporalAmount)`.

This instance is immutable and unaffected by this method call.

Parameters:

- `amountToAdd`: the amount to add, not null

**Returns:** a `Period` based on this period with the requested period added, not null

Throws:

- `DateTimeException`: if the specified amount has a non-ISO chronology or contains an invalid unit
- `ArithmeticException`: if numeric overflow occurs

## Period.plusYears(long)

```java
public Period plusYears(long yearsToAdd)
```

Returns a copy of this period with the specified years added.

This adds the amount to the years unit in a copy of this period.
The months and days units are unaffected.
For example, "1 year, 6 months and 3 days" plus 2 years returns "3 years, 6 months and 3 days".

This instance is immutable and unaffected by this method call.

Parameters:

- `yearsToAdd`: the years to add, positive or negative

**Returns:** a `Period` based on this period with the specified years added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Period.plusMonths(long)

```java
public Period plusMonths(long monthsToAdd)
```

Returns a copy of this period with the specified months added.

This adds the amount to the months unit in a copy of this period.
The years and days units are unaffected.
For example, "1 year, 6 months and 3 days" plus 2 months returns "1 year, 8 months and 3 days".

This instance is immutable and unaffected by this method call.

Parameters:

- `monthsToAdd`: the months to add, positive or negative

**Returns:** a `Period` based on this period with the specified months added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Period.plusDays(long)

```java
public Period plusDays(long daysToAdd)
```

Returns a copy of this period with the specified days added.

This adds the amount to the days unit in a copy of this period.
The years and months units are unaffected.
For example, "1 year, 6 months and 3 days" plus 2 days returns "1 year, 6 months and 5 days".

This instance is immutable and unaffected by this method call.

Parameters:

- `daysToAdd`: the days to add, positive or negative

**Returns:** a `Period` based on this period with the specified days added, not null

Throws:

- `ArithmeticException`: if numeric overflow occurs
