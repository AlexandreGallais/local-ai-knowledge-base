---
title: "DayOfWeek enum (java.time)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/DayOfWeek.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DayOfWeek enum (java.time)

```java
public enum DayOfWeek implements TemporalAccessor, TemporalAdjuster
```

A day-of-week, such as 'Tuesday'.

`DayOfWeek` is an enum representing the 7 days of the week -
Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday.

In addition to the textual enum name, each day-of-week has an `int` value.
The `int` value follows the ISO-8601 standard, from 1 (Monday) to 7 (Sunday).
It is recommended that applications use the enum rather than the `int` value
to ensure code clarity.

This enum provides access to the localized textual form of the day-of-week.
Some locales also assign different numeric values to the days, declaring
Sunday to have the value 1, however this class provides no support for this.
See `WeekFields` for localized week-numbering.

**Do not use `ordinal()` to obtain the numeric representation of `DayOfWeek`.
Use `getValue()` instead.**

This enum represents a common concept that is found in many calendar systems.
As such, this enum may be used by any calendar system that has the day-of-week
concept defined exactly equivalent to the ISO calendar system.

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8

## DayOfWeek.of(int)

```java
public static DayOfWeek of(int dayOfWeek)
```

Obtains an instance of `DayOfWeek` from an `int` value.

`DayOfWeek` is an enum representing the 7 days of the week.
This factory allows the enum to be obtained from the `int` value.
The `int` value follows the ISO-8601 standard, from 1 (Monday) to 7 (Sunday).

Parameters:

- `dayOfWeek`: the day-of-week to represent, from 1 (Monday) to 7 (Sunday)

**Returns:** the day-of-week singleton, not null

Throws:

- `DateTimeException`: if the day-of-week is invalid

## DayOfWeek.from(TemporalAccessor)

```java
public static DayOfWeek from(TemporalAccessor temporal)
```

Obtains an instance of `DayOfWeek` from a temporal object.

This obtains a day-of-week based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `DayOfWeek`.

The conversion extracts the DAY_OF_WEEK field.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `DayOfWeek::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the day-of-week, not null

Throws:

- `DateTimeException`: if unable to convert to a `DayOfWeek`

## DayOfWeek.getValue()

```java
public int getValue()
```

Gets the day-of-week `int` value.

The values are numbered following the ISO-8601 standard, from 1 (Monday) to 7 (Sunday).
See `java.time.temporal.WeekFields.dayOfWeek()` for localized week-numbering.

**Returns:** the day-of-week, from 1 (Monday) to 7 (Sunday)

## DayOfWeek.getDisplayName(TextStyle, Locale)

```java
public String getDisplayName(TextStyle style, Locale locale)
```

Gets the textual representation, such as 'Mon' or 'Friday'.

This returns the textual name used to identify the day-of-week,
suitable for presentation to the user.
The parameters control the style of the returned text and the locale.

If no textual mapping is found then the numeric value is returned.

Parameters:

- `style`: the length of the text required, not null
- `locale`: the locale to use, not null

**Returns:** the text value of the day-of-week, not null

## DayOfWeek.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this day-of-week can be queried for the specified field.
If false, then calling the range and
get methods will throw an exception.

If the field is DAY_OF_WEEK then
this method returns true.
All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this day-of-week, false if not

## DayOfWeek.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This day-of-week is used to enhance the accuracy of the returned range.
If it is not possible to return the range, because the field is not supported
or for some other reason, an exception is thrown.

If the field is DAY_OF_WEEK then the
range of the day-of-week, from 1 to 7, will be returned.
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

## DayOfWeek.get(TemporalField)

```java
public int get(TemporalField field)
```

Gets the value of the specified field from this day-of-week as an `int`.

This queries this day-of-week for the value of the specified field.
The returned value will always be within the valid range of values for the field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is DAY_OF_WEEK then the
value of the day-of-week, from 1 to 7, will be returned.
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

## DayOfWeek.getLong(TemporalField)

```java
public long getLong(TemporalField field)
```

Gets the value of the specified field from this day-of-week as a `long`.

This queries this day-of-week for the value of the specified field.
If it is not possible to return the value, because the field is not supported
or for some other reason, an exception is thrown.

If the field is DAY_OF_WEEK then the
value of the day-of-week, from 1 to 7, will be returned.
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

## DayOfWeek.plus(long)

```java
public DayOfWeek plus(long days)
```

Returns the day-of-week that is the specified number of days after this one.

The calculation rolls around the end of the week from Sunday to Monday.
The specified period may be negative.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to add, positive or negative

**Returns:** the resulting day-of-week, not null

## DayOfWeek.minus(long)

```java
public DayOfWeek minus(long days)
```

Returns the day-of-week that is the specified number of days before this one.

The calculation rolls around the start of the week from Monday to Sunday.
The specified period may be negative.

This instance is immutable and unaffected by this method call.

Parameters:

- `days`: the days to subtract, positive or negative

**Returns:** the resulting day-of-week, not null

## DayOfWeek.query(TemporalQuery<R>)

```java
public <R> R query(TemporalQuery<R> query)
```

Queries this day-of-week using the specified query.

This queries this day-of-week using the specified query strategy object.
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

## DayOfWeek.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have this day-of-week.

This returns a temporal object of the same observable type as the input
with the day-of-week changed to be the same as this.

The adjustment is equivalent to using long)
passing `ChronoField.DAY_OF_WEEK` as the field.
Note that this adjusts forwards or backwards within a Monday to Sunday week.
See `java.time.temporal.WeekFields.dayOfWeek()` for localized week start days.
See `TemporalAdjuster` for other adjusters with more control,
such as `next(MONDAY)`.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisDayOfWeek.adjustInto(temporal);
  temporal = temporal.with(thisDayOfWeek);
```

For example, given a date that is a Wednesday, the following are output:

```java
  dateOnWed.with(MONDAY);     // two days earlier
  dateOnWed.with(TUESDAY);    // one day earlier
  dateOnWed.with(WEDNESDAY);  // same date
  dateOnWed.with(THURSDAY);   // one day later
  dateOnWed.with(FRIDAY);     // two days later
  dateOnWed.with(SATURDAY);   // three days later
  dateOnWed.with(SUNDAY);     // four days later
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs
