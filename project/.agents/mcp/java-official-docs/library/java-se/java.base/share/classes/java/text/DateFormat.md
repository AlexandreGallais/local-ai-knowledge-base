---
title: "DateFormat class (java.text) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/DateFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateFormat class (java.text)

```java
public abstract class DateFormat extends Format
```

`DateFormat` is an abstract class for date/time formatting subclasses which
formats and parses dates or time in a language-independent manner.
The date/time formatting subclass, such as `SimpleDateFormat`, allows for
formatting (i.e., date &rarr; text), parsing (text &rarr; date), and
normalization.  The date is represented as a `Date` object or
as the milliseconds since January 1, 1970, 00:00:00 GMT.

`DateFormat` provides static factory methods for obtaining default date/time
formatters based on the default or a given locale and a number of formatting
styles. The formatting styles include `FULL`, `LONG`, `MEDIUM`, and `SHORT`.
For any of the factory methods with the parameter *style*, an `IllegalArgumentException` will be thrown if *style* is not equal to any
of the defined formatting styles. More detail and examples of using these styles are provided in the method
descriptions.

`DateFormat` helps you to format and parse dates for any locale.
Your code can be completely independent of the locale conventions for
months, days of the week, or even the calendar format: lunar vs. solar.

To format a date for the current Locale, use one of the
static factory methods:

If you are formatting multiple dates, it is
more efficient to get the format and use it multiple times so that
the system doesn't have to fetch the information about the local
language and country conventions multiple times.

To format a date for a different Locale, specify it in the
call to Locale) getDateInstance().

If the specified locale contains "ca" (calendar), "rg" (region override),
and/or "tz" (timezone) Unicode
extensions, the calendar, the country and/or the time zone for formatting
are overridden. If both "ca" and "rg" are specified, the calendar from the "ca"
extension supersedes the implicit one from the "rg" extension.

You can use a DateFormat to parse also.

Use `getDateInstance` to get the normal date format for that country.
There are other static factory methods available.
Use `getTimeInstance` to get the time format for that country.
Use `getDateTimeInstance` to get a date and time format. You can pass in
different options to these factory methods to control the length of the
result; from `SHORT` to `MEDIUM` to `LONG` to `FULL`. The exact result depends
on the locale, but generally:

- `SHORT` is the shortest and mainly numeric, such as `12.13.52` or `3:30pm`

- `MEDIUM` is longer, such as `Jan 12, 1952`

- `LONG` is even longer, such as `January 12, 1952` or `3:30:32pm`

- `FULL` is the longest, such as
`Tuesday, April 12, 1952 AD or 3:30:42pm PST`.

For those fields with text, typically abbreviated text form is used with `MEDIUM` option,
and full text form is used with `LONG` and `FULL` options.

You can also set the time zone on the format if you wish.
If you want even more control over the format or parsing,
(or want to give your users more control),
you can try casting the `DateFormat` you get from the factory methods
to a `SimpleDateFormat`. This will work for the majority
of countries; just remember to put it in a `try` block in case you
encounter an unusual one.

You can also use forms of the parse and format methods with
`ParsePosition` and `FieldPosition` to
allow you to

- progressively parse through pieces of a string.

- align any particular field, or find out where it is for selection
on the screen.

#### Synchronization

Date formats are not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

**API note:** Consider using `java.time.format.DateTimeFormatter` as an
immutable and thread-safe alternative.

**Implementation requirements:** - The StringBuffer, FieldPosition) and
ParsePosition) methods may throw
`NullPointerException`, if any of their parameter is `null`.
The subclass may provide its own implementation and specification about
`NullPointerException`.

- The `setCalendar(Calendar)`, `setNumberFormat(NumberFormat)` and `setTimeZone(TimeZone)` methods
do not throw `NullPointerException` when their parameter is
`null`, but any subsequent operations on the same instance may throw
`NullPointerException`.

- The `getCalendar()`, `getNumberFormat()` and
`getTimeZone()` methods may return `null`, if the respective
values of this instance is set to `null` through the corresponding
setter methods. For Example: `getTimeZone()` may return `null`,
if the `TimeZone` value of this instance is set as
setTimeZone(null).

**See also:** Format

**See also:** NumberFormat

**See also:** SimpleDateFormat

**See also:** java.util.Calendar

**See also:** java.util.GregorianCalendar

**See also:** java.util.TimeZone

**See also:** java.time.format.DateTimeFormatter

**Since:** 1.1

## DateFormat.calendar

```java
protected Calendar calendar
```

The `Calendar` instance used for calculating the date-time fields
and the instant of time. This field is used for both formatting and
parsing.

Subclasses should initialize this field to a `Calendar`
appropriate for the `Locale` associated with this
`DateFormat`.

## DateFormat.numberFormat

```java
protected NumberFormat numberFormat
```

The number formatter that `DateFormat` uses to format numbers
in dates and times.  Subclasses should initialize this to a number format
appropriate for the locale associated with this `DateFormat`.

## DateFormat.ERA_FIELD

```java
public static final int ERA_FIELD
```

Useful constant for ERA field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.YEAR_FIELD

```java
public static final int YEAR_FIELD
```

Useful constant for YEAR field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.MONTH_FIELD

```java
public static final int MONTH_FIELD
```

Useful constant for MONTH field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.DATE_FIELD

```java
public static final int DATE_FIELD
```

Useful constant for DATE field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.HOUR_OF_DAY1_FIELD

```java
public static final int HOUR_OF_DAY1_FIELD
```

Useful constant for one-based HOUR_OF_DAY field alignment.
Used in FieldPosition of date/time formatting.
HOUR_OF_DAY1_FIELD is used for the one-based 24-hour clock.
For example, 23:59 + 01:00 results in 24:59.

## DateFormat.HOUR_OF_DAY0_FIELD

```java
public static final int HOUR_OF_DAY0_FIELD
```

Useful constant for zero-based HOUR_OF_DAY field alignment.
Used in FieldPosition of date/time formatting.
HOUR_OF_DAY0_FIELD is used for the zero-based 24-hour clock.
For example, 23:59 + 01:00 results in 00:59.

## DateFormat.MINUTE_FIELD

```java
public static final int MINUTE_FIELD
```

Useful constant for MINUTE field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.SECOND_FIELD

```java
public static final int SECOND_FIELD
```

Useful constant for SECOND field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.MILLISECOND_FIELD

```java
public static final int MILLISECOND_FIELD
```

Useful constant for MILLISECOND field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.DAY_OF_WEEK_FIELD

```java
public static final int DAY_OF_WEEK_FIELD
```

Useful constant for DAY_OF_WEEK field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.DAY_OF_YEAR_FIELD

```java
public static final int DAY_OF_YEAR_FIELD
```

Useful constant for DAY_OF_YEAR field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.DAY_OF_WEEK_IN_MONTH_FIELD

```java
public static final int DAY_OF_WEEK_IN_MONTH_FIELD
```

Useful constant for DAY_OF_WEEK_IN_MONTH field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.WEEK_OF_YEAR_FIELD

```java
public static final int WEEK_OF_YEAR_FIELD
```

Useful constant for WEEK_OF_YEAR field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.WEEK_OF_MONTH_FIELD

```java
public static final int WEEK_OF_MONTH_FIELD
```

Useful constant for WEEK_OF_MONTH field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.AM_PM_FIELD

```java
public static final int AM_PM_FIELD
```

Useful constant for AM_PM field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.HOUR1_FIELD

```java
public static final int HOUR1_FIELD
```

Useful constant for one-based HOUR field alignment.
Used in FieldPosition of date/time formatting.
HOUR1_FIELD is used for the one-based 12-hour clock.
For example, 11:30 PM + 1 hour results in 12:30 AM.

## DateFormat.HOUR0_FIELD

```java
public static final int HOUR0_FIELD
```

Useful constant for zero-based HOUR field alignment.
Used in FieldPosition of date/time formatting.
HOUR0_FIELD is used for the zero-based 12-hour clock.
For example, 11:30 PM + 1 hour results in 00:30 AM.

## DateFormat.TIMEZONE_FIELD

```java
public static final int TIMEZONE_FIELD
```

Useful constant for TIMEZONE field alignment.
Used in FieldPosition of date/time formatting.

## DateFormat.format(Object, StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object obj, StringBuffer toAppendTo, FieldPosition fieldPosition)
```

Formats the given `Object` into a date-time string. The formatted
string is appended to the given `StringBuffer`.

Parameters:

- `obj`: Must be a `Date` or a `Number` representing a millisecond offset from the Epoch.
- `toAppendTo`: The string buffer for the returning date-time string.
- `fieldPosition`: keeps track on the position of the field within the returned string. For example, given a date-time text `"1996.07.10 AD at 15:08:56 PDT"`, if the given `fieldPosition` is `DateFormat.YEAR_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 4, respectively. Notice that if the same date-time field appears more than once in a pattern, the `fieldPosition` will be set for the first occurrence of that date-time field. For instance, formatting a `Date` to the date-time string `"1 PM PDT (Pacific Daylight Time)"` using the pattern `"h a z (zzzz)"` and the alignment field `DateFormat.TIMEZONE_FIELD`, the begin index and end index of `fieldPosition` will be set to 5 and 8, respectively, for the first occurrence of the timezone pattern character `'z'`.

**Returns:** the string buffer passed in as `toAppendTo`,
        with formatted text appended.

**See also:** java.text.Format

Throws:

- `IllegalArgumentException`: if the `Format` cannot format the given `obj`.

## DateFormat.format(Date, StringBuffer, FieldPosition)

```java
public abstract StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition fieldPosition)
```

Formats a `Date` into a date-time string. The formatted
string is appended to the given `StringBuffer`.

Parameters:

- `date`: a Date to be formatted into a date-time string.
- `toAppendTo`: the string buffer for the returning date-time string.
- `fieldPosition`: keeps track on the position of the field within the returned string. For example, given a date-time text `"1996.07.10 AD at 15:08:56 PDT"`, if the given `fieldPosition` is `DateFormat.YEAR_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 4, respectively. Notice that if the same date-time field appears more than once in a pattern, the `fieldPosition` will be set for the first occurrence of that date-time field. For instance, formatting a `Date` to the date-time string `"1 PM PDT (Pacific Daylight Time)"` using the pattern `"h a z (zzzz)"` and the alignment field `DateFormat.TIMEZONE_FIELD`, the begin index and end index of `fieldPosition` will be set to 5 and 8, respectively, for the first occurrence of the timezone pattern character `'z'`.

**Returns:** the string buffer passed in as `toAppendTo`, with formatted
text appended.

## DateFormat.format(Date)

```java
public final String format(Date date)
```

Formats a `Date` into a date-time string.

Parameters:

- `date`: the time value to be formatted into a date-time string.

**Returns:** the formatted date-time string.

## DateFormat.parse(String)

```java
public Date parse(String source) throws ParseException
```

Parses text from the beginning of the given string to produce a date.
The method may not use the entire text of the given string.

See the ParsePosition) method for more information
on date parsing.

Parameters:

- `source`: A `String` whose beginning should be parsed.

**Returns:** A `Date` parsed from the string.

Throws:

- `ParseException`: if the beginning of the specified string cannot be parsed.

## DateFormat.parse(String, ParsePosition)

```java
public abstract Date parse(String source, ParsePosition pos)
```

Parse a date/time string according to the given parse position.  For
example, if `this` has the pattern `"M/d/yy h:m a, z"`,
then a time text `"07/10/96 4:5 PM, PDT"` will be parsed into a `Date`
that is equivalent to `Date(837039900000L)`.

 By default, parsing is lenient: If the input is not in the form used
by this object's format method but can still be parsed as a date, then
the parse succeeds.  Clients may insist on strict adherence to the
format by calling setLenient(false).

This parsing operation uses the `calendar` to produce
a `Date`. As a result, the `calendar`'s date-time
fields and the `TimeZone` value may have been
overwritten, depending on subclass implementations. Any `TimeZone` value that has previously been set by a call to
setTimeZone may need
to be restored for further operations.

Parameters:

- `source`: The date/time string to be parsed
- `pos`: On input, the position at which to start parsing; on output, the position at which parsing terminated, or the start position if the parse failed.

**Returns:** A `Date`, or `null` if the input could not be parsed

## DateFormat.parseObject(String, ParsePosition)

```java
public Object parseObject(String source, ParsePosition pos)
```

Parses text from a string to produce a `Date`.

The method attempts to parse text starting at the index given by
`pos`.
If parsing succeeds, then the index of `pos` is updated
to the index after the last character used (parsing does not necessarily
use all characters up to the end of the string), and the parsed
date is returned. The updated `pos` can be used to
indicate the starting point for the next call to this method.
If an error occurs, then the index of `pos` is not
changed, the error index of `pos` is set to the index of
the character where the error occurred, and null is returned.

See the ParsePosition) method for more information
on date parsing.

Parameters:

- `source`: A `String`, part of which should be parsed.
- `pos`: A `ParsePosition` object with index and error index information as described above.

**Returns:** A `Date` parsed from the string. In case of
        error, returns null.

Throws:

- `NullPointerException`: if `source` or `pos` is null.
