---
title: "LocalDate class (java.time) (part 2 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/LocalDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalDate class (java.time) (part 2 of 5)

## LocalDate.getEra()

```java
public IsoEra getEra()
```

Gets the era applicable at this date.

The official ISO-8601 standard does not define eras, however `IsoChronology` does.
It defines two eras, 'CE' from year one onwards and 'BCE' from year zero backwards.
Since dates before the Julian-Gregorian cutover are not in line with history,
the cutover between 'BCE' and 'CE' is also not aligned with the commonly used
eras, often referred to using 'BC' and 'AD'.

Users of this class should typically ignore this method as it exists primarily
to fulfill the `ChronoLocalDate` contract where it is necessary to support
the Japanese calendar system.

**Returns:** the IsoEra applicable at this date, not null

## LocalDate.getYear()

```java
public int getYear()
```

Gets the year field.

This method returns the primitive `int` value for the year.

The year returned by this method is proleptic as per `get(YEAR)`.
To obtain the year-of-era, use `get(YEAR_OF_ERA)`.

**Returns:** the year, from MIN_YEAR to MAX_YEAR

## LocalDate.getMonthValue()

```java
public int getMonthValue()
```

Gets the month-of-year field from 1 to 12.

This method returns the month as an `int` from 1 to 12.
Application code is frequently clearer if the enum `Month`
is used by calling `getMonth()`.

**Returns:** the month-of-year, from 1 to 12

**See also:** #getMonth()

## LocalDate.getMonth()

```java
public Month getMonth()
```

Gets the month-of-year field using the `Month` enum.

This method returns the enum `Month` for the month.
This avoids confusion as to what `int` values mean.
If you need access to the primitive `int` value then the enum
provides the int value.

**Returns:** the month-of-year, not null

**See also:** #getMonthValue()

## LocalDate.getDayOfMonth()

```java
public int getDayOfMonth()
```

Gets the day-of-month field.

This method returns the primitive `int` value for the day-of-month.

**Returns:** the day-of-month, from 1 to 31

## LocalDate.getDayOfYear()

```java
public int getDayOfYear()
```

Gets the day-of-year field.

This method returns the primitive `int` value for the day-of-year.

**Returns:** the day-of-year, from 1 to 365, or 366 in a leap year

## LocalDate.getDayOfWeek()

```java
public DayOfWeek getDayOfWeek()
```

Gets the day-of-week field, which is an enum `DayOfWeek`.

This method returns the enum `DayOfWeek` for the day-of-week.
This avoids confusion as to what `int` values mean.
If you need access to the primitive `int` value then the enum
provides the int value.

Additional information can be obtained from the `DayOfWeek`.
This includes textual names of the values.

**Returns:** the day-of-week, not null

## LocalDate.isLeapYear()

```java
public boolean isLeapYear()
```

Checks if the year is a leap year, according to the ISO proleptic
calendar system rules.

This method applies the current rules for leap years across the whole time-line.
In general, a year is a leap year if it is divisible by four without
remainder. However, years divisible by 100, are not leap years, with
the exception of years divisible by 400 which are.

For example, 1904 is a leap year it is divisible by 4.
1900 was not a leap year as it is divisible by 100, however 2000 was a
leap year as it is divisible by 400.

The calculation is proleptic - applying the same rules into the far future and far past.
This is historically inaccurate, but is correct for the ISO-8601 standard.

**Returns:** true if the year is leap, false otherwise

## LocalDate.lengthOfMonth()

```java
public int lengthOfMonth()
```

Returns the length of the month represented by this date.

This returns the length of the month in days.
For example, a date in January would return 31.

**Returns:** the length of the month in days

## LocalDate.lengthOfYear()

```java
public int lengthOfYear()
```

Returns the length of the year represented by this date.

This returns the length of the year in days, either 365 or 366.

**Returns:** 366 if the year is leap, 365 otherwise

## LocalDate.with(TemporalAdjuster)

```java
public LocalDate with(TemporalAdjuster adjuster)
```

Returns an adjusted copy of this date.

This returns a `LocalDate`, based on this one, with the date adjusted.
The adjustment takes place using the specified adjuster strategy object.
Read the documentation of the adjuster to understand what adjustment will be made.

A simple adjuster might simply set the one of the fields, such as the year field.
A more complex adjuster might set the date to the last day of the month.

A selection of common adjustments is provided in
TemporalAdjusters.
These include finding the "last day of the month" and "next Wednesday".
Key <example-value> classes also implement the `TemporalAdjuster` interface,
such as `Month` and MonthDay.
The adjuster is responsible for handling special cases, such as the varying
lengths of month and leap years.

For example this code returns a date on the last day of July:

```java
 import static java.time.Month.*;
 import static java.time.temporal.TemporalAdjusters.*;

 result = localDate.with(JULY).with(lastDayOfMonth());
```

The result of this method is obtained by invoking the
`TemporalAdjuster.adjustInto(Temporal)` method on the
specified adjuster passing `this` as the argument.

This instance is immutable and unaffected by this method call.

Parameters:

- `adjuster`: the adjuster to use, not null

**Returns:** a `LocalDate` based on `this` with the adjustment made, not null

Throws:

- `DateTimeException`: if the adjustment cannot be made
- `ArithmeticException`: if numeric overflow occurs

## LocalDate.with(TemporalField, long)

```java
public LocalDate with(TemporalField field, long newValue)
```

Returns a copy of this date with the specified field set to a new value.

This returns a `LocalDate`, based on this one, with the value
for the specified field changed.
This can be used to change any supported field, such as the year, month or day-of-month.
If it is not possible to set the value, because the field is not supported or for
some other reason, an exception is thrown.

In some cases, changing the specified field can cause the resulting date to become invalid,
such as changing the month from 31st January to February would make the day-of-month invalid.
In cases like this, the field is responsible for resolving the date. Typically it will choose
the previous valid date, which would be the last valid day of February in this example.

If the field is a `ChronoField` then the adjustment is implemented here.
The supported fields behave as follows:

- `DAY_OF_WEEK` -
 Returns a `LocalDate` with the specified day-of-week.
 The date is adjusted up to 6 days forward or backward within the boundary
 of a Monday to Sunday week.

- `ALIGNED_DAY_OF_WEEK_IN_MONTH` -
 Returns a `LocalDate` with the specified aligned-day-of-week.
 The date is adjusted to the specified month-based aligned-day-of-week.
 Aligned weeks are counted such that the first week of a given month starts
 on the first day of that month.
 This may cause the date to be moved up to 6 days into the following month.

- `ALIGNED_DAY_OF_WEEK_IN_YEAR` -
 Returns a `LocalDate` with the specified aligned-day-of-week.
 The date is adjusted to the specified year-based aligned-day-of-week.
 Aligned weeks are counted such that the first week of a given year starts
 on the first day of that year.
 This may cause the date to be moved up to 6 days into the following year.

- `DAY_OF_MONTH` -
 Returns a `LocalDate` with the specified day-of-month.
 The month and year will be unchanged. If the day-of-month is invalid for the
 year and month, then a `DateTimeException` is thrown.

- `DAY_OF_YEAR` -
 Returns a `LocalDate` with the specified day-of-year.
 The year will be unchanged. If the day-of-year is invalid for the
 year, then a `DateTimeException` is thrown.

- `EPOCH_DAY` -
 Returns a `LocalDate` with the specified epoch-day.
 This completely replaces the date and is equivalent to `ofEpochDay(long)`.

- `ALIGNED_WEEK_OF_MONTH` -
 Returns a `LocalDate` with the specified aligned-week-of-month.
 Aligned weeks are counted such that the first week of a given month starts
 on the first day of that month.
 This adjustment moves the date in whole week chunks to match the specified week.
 The result will have the same day-of-week as this date.
 This may cause the date to be moved into the following month.

- `ALIGNED_WEEK_OF_YEAR` -
 Returns a `LocalDate` with the specified aligned-week-of-year.
 Aligned weeks are counted such that the first week of a given year starts
 on the first day of that year.
 This adjustment moves the date in whole week chunks to match the specified week.
 The result will have the same day-of-week as this date.
 This may cause the date to be moved into the following year.

- `MONTH_OF_YEAR` -
 Returns a `LocalDate` with the specified month-of-year.
 The year will be unchanged. The day-of-month will also be unchanged,
 unless it would be invalid for the new month and year. In that case, the
 day-of-month is adjusted to the maximum valid value for the new month and year.

- `PROLEPTIC_MONTH` -
 Returns a `LocalDate` with the specified proleptic-month.
 The day-of-month will be unchanged, unless it would be invalid for the new month
 and year. In that case, the day-of-month is adjusted to the maximum valid value
 for the new month and year.

- `YEAR_OF_ERA` -
 Returns a `LocalDate` with the specified year-of-era.
 The era and month will be unchanged. The day-of-month will also be unchanged,
 unless it would be invalid for the new month and year. In that case, the
 day-of-month is adjusted to the maximum valid value for the new month and year.

- `YEAR` -
 Returns a `LocalDate` with the specified year.
 The month will be unchanged. The day-of-month will also be unchanged,
 unless it would be invalid for the new month and year. In that case, the
 day-of-month is adjusted to the maximum valid value for the new month and year.

- `ERA` -
 Returns a `LocalDate` with the specified era.
 The year-of-era and month will be unchanged. The day-of-month will also be unchanged,
 unless it would be invalid for the new month and year. In that case, the
 day-of-month is adjusted to the maximum valid value for the new month and year.

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

**Returns:** a `LocalDate` based on `this` with the specified field set, not null

Throws:

- `DateTimeException`: if the field cannot be set
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## LocalDate.withYear(int)

```java
public LocalDate withYear(int year)
```

Returns a copy of this `LocalDate` with the year altered.

If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.

This instance is immutable and unaffected by this method call.

Parameters:

- `year`: the year to set in the result, from MIN_YEAR to MAX_YEAR

**Returns:** a `LocalDate` based on this date with the requested year, not null

Throws:

- `DateTimeException`: if the year value is invalid

## LocalDate.withMonth(int)

```java
public LocalDate withMonth(int month)
```

Returns a copy of this `LocalDate` with the month-of-year altered.

If the day-of-month is invalid for the year, it will be changed to the last valid day of the month.

This instance is immutable and unaffected by this method call.

Parameters:

- `month`: the month-of-year to set in the result, from 1 (January) to 12 (December)

**Returns:** a `LocalDate` based on this date with the requested month, not null

Throws:

- `DateTimeException`: if the month-of-year value is invalid

## LocalDate.withDayOfMonth(int)

```java
public LocalDate withDayOfMonth(int dayOfMonth)
```

Returns a copy of this `LocalDate` with the day-of-month altered.

If the resulting date is invalid, an exception is thrown.

This instance is immutable and unaffected by this method call.

Parameters:

- `dayOfMonth`: the day-of-month to set in the result, from 1 to 28-31

**Returns:** a `LocalDate` based on this date with the requested day, not null

Throws:

- `DateTimeException`: if the day-of-month value is invalid, or if the day-of-month is invalid for the month-year

## LocalDate.withDayOfYear(int)

```java
public LocalDate withDayOfYear(int dayOfYear)
```

Returns a copy of this `LocalDate` with the day-of-year altered.

If the resulting date is invalid, an exception is thrown.

This instance is immutable and unaffected by this method call.

Parameters:

- `dayOfYear`: the day-of-year to set in the result, from 1 to 365-366

**Returns:** a `LocalDate` based on this date with the requested day, not null

Throws:

- `DateTimeException`: if the day-of-year value is invalid, or if the day-of-year is invalid for the year

## LocalDate.plus(TemporalAmount)

```java
public LocalDate plus(TemporalAmount amountToAdd)
```

Returns a copy of this date with the specified amount added.

This returns a `LocalDate`, based on this one, with the specified amount added.
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

**Returns:** a `LocalDate` based on this date with the addition made, not null

Throws:

- `DateTimeException`: if the addition cannot be made
- `ArithmeticException`: if numeric overflow occurs
