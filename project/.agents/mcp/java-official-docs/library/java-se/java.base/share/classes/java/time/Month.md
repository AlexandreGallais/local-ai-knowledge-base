---
title: "Month enum (java.time)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Month.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Month enum (java.time)

```java
public enum Month implements TemporalAccessor, TemporalAdjuster
```

A month-of-year, such as 'July'.

`Month` is an enum representing the 12 months of the year -
January, February, March, April, May, June, July, August, September, October,
November and December.

In addition to the textual enum name, each month-of-year has an `int` value.
The `int` value follows normal usage and the ISO-8601 standard,
from 1 (January) to 12 (December). It is recommended that applications use the enum
rather than the `int` value to ensure code clarity.

**Do not use `ordinal()` to obtain the numeric representation of `Month`.
Use `getValue()` instead.**

This enum represents a common concept that is found in many calendar systems.
As such, this enum may be used by any calendar system that has the month-of-year
concept defined exactly equivalent to the ISO-8601 calendar system.

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8

## Month.of(int)

```java
public static Month of(int month)
```

Obtains an instance of `Month` from an `int` value.

`Month` is an enum representing the 12 months of the year.
This factory allows the enum to be obtained from the `int` value.
The `int` value follows the ISO-8601 standard, from 1 (January) to 12 (December).

Parameters:

- `month`: the month-of-year to represent, from 1 (January) to 12 (December)

**Returns:** the month-of-year, not null

Throws:

- `DateTimeException`: if the month-of-year is invalid

## Month.from(TemporalAccessor)

```java
public static Month from(TemporalAccessor temporal)
```

Obtains an instance of `Month` from a temporal object.

This obtains a month based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `Month`.

The conversion extracts the MONTH_OF_YEAR field.
The extraction is only permitted if the temporal object has an ISO
chronology, or can be converted to a `LocalDate`.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `Month::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the month-of-year, not null

Throws:

- `DateTimeException`: if unable to convert to a `Month`

## Month.getValue()

```java
public int getValue()
```

Gets the month-of-year `int` value.

The values are numbered following the ISO-8601 standard,
from 1 (January) to 12 (December).

**Returns:** the month-of-year, from 1 (January) to 12 (December)

## Month.getDisplayName(TextStyle, Locale)

```java
public String getDisplayName(TextStyle style, Locale locale)
```

Gets the textual representation, such as 'Jan' or 'December'.

This returns the textual name used to identify the month-of-year,
suitable for presentation to the user.
The parameters control the style of the returned text and the locale.

If no textual mapping is found then the numeric value is returned.

Parameters:

- `style`: the length of the text required, not null
- `locale`: the locale to use, not null

**Returns:** the text value of the month-of-year, not null

## Month.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this month-of-year can be queried for the specified field.
If false, then calling the range and
get methods will throw an exception.

If the field is MONTH_OF_YEAR then
this method returns true.
All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this month-of-year, false if not

## Month.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This month is used to enhance the accuracy of the returned range.
If it is not possible to return the range, because the field is not supported
or for some other reason, an exception is thrown.

If the field is MONTH_OF_YEAR then the
range of the month-of-year, from 1 to 12, will be returned.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.rangeRefinedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the range can be obtained is determined by the field.

Parameters:

- `field`: the field to query the range for, not null

**Returns:** the range of valid values for the field, not null

Throws:

- `DateTimeException`: if the range for the field cannot be obtained
- `UnsupportedTemporalTypeException`: if the field is not supported

## Month.get(TemporalField)

```java
public int get(TemporalField field)
```

Gets the value of the specified field from this month-of-year as an `int`.

This queries this month for the value of the specified field.
The returned value will always be within the valid range of values for the field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is MONTH_OF_YEAR then the
value of the month-of-year, from 1 to 12, will be returned.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
passing `this` as the argument. Whether the value can be obtained,
and what the value represents, is determined by the field.

Parameters:

- `field`: the field to get, not null

**Returns:** the value for the field, within the valid range of values

Throws:

- `DateTimeException`: if a value for the field cannot be obtained or the value is outside the range of valid values for the field
- `UnsupportedTemporalTypeException`: if the field is not supported or the range of values exceeds an `int`
- `ArithmeticException`: if numeric overflow occurs

## Month.getLong(TemporalField)

```java
public long getLong(TemporalField field)
```

Gets the value of the specified field from this month-of-year as a `long`.

This queries this month for the value of the specified field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is MONTH_OF_YEAR then the
value of the month-of-year, from 1 to 12, will be returned.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.getFrom(TemporalAccessor)`
passing `this` as the argument. Whether the value can be obtained,
and what the value represents, is determined by the field.

Parameters:

- `field`: the field to get, not null

**Returns:** the value for the field

Throws:

- `DateTimeException`: if a value for the field cannot be obtained
- `UnsupportedTemporalTypeException`: if the field is not supported
- `ArithmeticException`: if numeric overflow occurs

## Month.plus(long)

```java
public Month plus(long months)
```

Returns the month-of-year that is the specified number of months after this one.

The calculation rolls around the end of the year from December to January.
The specified period may be negative.

This instance is immutable and unaffected by this method call.

Parameters:

- `months`: the months to add, positive or negative

**Returns:** the resulting month, not null

## Month.minus(long)

```java
public Month minus(long months)
```

Returns the month-of-year that is the specified number of months before this one.

The calculation rolls around the start of the year from January to December.
The specified period may be negative.

This instance is immutable and unaffected by this method call.

Parameters:

- `months`: the months to subtract, positive or negative

**Returns:** the resulting month, not null

## Month.length(boolean)

```java
public int length(boolean leapYear)
```

Gets the length of this month in days.

This takes a flag to determine whether to return the length for a leap year or not.

February has 28 days in a standard year and 29 days in a leap year.
April, June, September and November have 30 days.
All other months have 31 days.

Parameters:

- `leapYear`: true if the length is required for a leap year

**Returns:** the length of this month in days, from 28 to 31

## Month.minLength()

```java
public int minLength()
```

Gets the minimum length of this month in days.

February has a minimum length of 28 days.
April, June, September and November have 30 days.
All other months have 31 days.

**Returns:** the minimum length of this month in days, from 28 to 31

## Month.maxLength()

```java
public int maxLength()
```

Gets the maximum length of this month in days.

February has a maximum length of 29 days.
April, June, September and November have 30 days.
All other months have 31 days.

**Returns:** the maximum length of this month in days, from 29 to 31

## Month.firstDayOfYear(boolean)

```java
public int firstDayOfYear(boolean leapYear)
```

Gets the day-of-year corresponding to the first day of this month.

This returns the day-of-year that this month begins on, using the leap
year flag to determine the length of February.

Parameters:

- `leapYear`: true if the length is required for a leap year

**Returns:** the day of year corresponding to the first day of this month, from 1 to 336

## Month.firstMonthOfQuarter()

```java
public Month firstMonthOfQuarter()
```

Gets the month corresponding to the first month of this quarter.

The year can be divided into four quarters.
This method returns the first month of the quarter for the base month.
January, February and March return January.
April, May and June return April.
July, August and September return July.
October, November and December return October.

**Returns:** the first month of the quarter corresponding to this month, not null

## Month.query(TemporalQuery<R>)

```java
public <R> R query(TemporalQuery<R> query)
```

Queries this month-of-year using the specified query.

This queries this month-of-year using the specified query strategy object.
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

## Month.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have this month-of-year.

This returns a temporal object of the same observable type as the input
with the month-of-year changed to be the same as this.

The adjustment is equivalent to using long)
passing `ChronoField.MONTH_OF_YEAR` as the field.
If the specified temporal object does not use the ISO calendar system then
a `DateTimeException` is thrown.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisMonth.adjustInto(temporal);
  temporal = temporal.with(thisMonth);
```

For example, given a date in May, the following are output:

```java
  dateInMay.with(JANUARY);    // four months earlier
  dateInMay.with(APRIL);      // one months earlier
  dateInMay.with(MAY);        // same date
  dateInMay.with(JUNE);       // one month later
  dateInMay.with(DECEMBER);   // seven months later
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs
