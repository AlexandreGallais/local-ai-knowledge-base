---
title: "DateFormat class (java.text) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/DateFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateFormat class (java.text) (part 2 of 2)

## DateFormat.FULL

```java
public static final int FULL
```

Constant for full style pattern.

## DateFormat.LONG

```java
public static final int LONG
```

Constant for long style pattern.

## DateFormat.MEDIUM

```java
public static final int MEDIUM
```

Constant for medium style pattern.

## DateFormat.SHORT

```java
public static final int SHORT
```

Constant for short style pattern.

## DateFormat.DEFAULT

```java
public static final int DEFAULT
```

Constant for default style pattern.  Its value is MEDIUM.

## DateFormat.getTimeInstance()

```java
public static final DateFormat getTimeInstance()
```

Gets the time formatter with the default formatting style
for the default FORMAT locale.

This is equivalent to calling
Locale) getTimeInstance(DEFAULT, Locale.getDefault(Locale.Category.FORMAT)).

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a time formatter.

## DateFormat.getTimeInstance(int)

```java
public static final DateFormat getTimeInstance(int style)
```

Gets the time formatter with the given formatting style
for the default FORMAT locale.

This is equivalent to calling
Locale) getTimeInstance(style, Locale.getDefault(Locale.Category.FORMAT)).

Parameters:

- `style`: the given formatting style. For example, SHORT for "h:mm a" in the US locale.

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a time formatter.

## DateFormat.getTimeInstance(int, Locale)

```java
public static final DateFormat getTimeInstance(int style, Locale aLocale)
```

Gets the time formatter with the given formatting style
for the given locale.

Parameters:

- `style`: the given formatting style. For example, SHORT for "h:mm a" in the US locale.
- `aLocale`: the given locale.

**Returns:** a time formatter.

## DateFormat.getDateInstance()

```java
public static final DateFormat getDateInstance()
```

Gets the date formatter with the default formatting style
for the default FORMAT locale.

This is equivalent to calling
Locale) getDateInstance(DEFAULT, Locale.getDefault(Locale.Category.FORMAT)).

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a date formatter.

## DateFormat.getDateInstance(int)

```java
public static final DateFormat getDateInstance(int style)
```

Gets the date formatter with the given formatting style
for the default FORMAT locale.

This is equivalent to calling
Locale) getDateInstance(style, Locale.getDefault(Locale.Category.FORMAT)).

Parameters:

- `style`: the given formatting style. For example, SHORT for "M/d/yy" in the US locale.

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a date formatter.

## DateFormat.getDateInstance(int, Locale)

```java
public static final DateFormat getDateInstance(int style, Locale aLocale)
```

Gets the date formatter with the given formatting style
for the given locale.

Parameters:

- `style`: the given formatting style. For example, SHORT for "M/d/yy" in the US locale.
- `aLocale`: the given locale.

**Returns:** a date formatter.

## DateFormat.getDateTimeInstance()

```java
public static final DateFormat getDateTimeInstance()
```

Gets the date/time formatter with the default formatting style
for the default FORMAT locale.

This is equivalent to calling
int, Locale) getDateTimeInstance(DEFAULT, DEFAULT, Locale.getDefault(Locale.Category.FORMAT)).

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a date/time formatter.

## DateFormat.getDateTimeInstance(int, int)

```java
public static final DateFormat getDateTimeInstance(int dateStyle, int timeStyle)
```

Gets the date/time formatter with the given date and time
formatting styles for the default FORMAT locale.

This is equivalent to calling
int, Locale) getDateTimeInstance(dateStyle, timeStyle, Locale.getDefault(Locale.Category.FORMAT)).

Parameters:

- `dateStyle`: the given date formatting style. For example, SHORT for "M/d/yy" in the US locale.
- `timeStyle`: the given time formatting style. For example, SHORT for "h:mm a" in the US locale.

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a date/time formatter.

## DateFormat.getDateTimeInstance(int, int, Locale)

```java
public static final DateFormat getDateTimeInstance(int dateStyle, int timeStyle, Locale aLocale)
```

Gets the date/time formatter with the given formatting styles
for the given locale.

Parameters:

- `dateStyle`: the given date formatting style.
- `timeStyle`: the given time formatting style.
- `aLocale`: the given locale.

**Returns:** a date/time formatter.

## DateFormat.getInstance()

```java
public static final DateFormat getInstance()
```

Get a default date/time formatter that uses the SHORT style for both the
date and the time.

**Returns:** a date/time formatter

## DateFormat.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
`get*Instance` methods of this class can return
localized instances.
The returned array represents the union of locales supported by the Java
runtime and by installed
DateFormatProvider implementations.
At a minimum, the returned array must contain a `Locale` instance equal to
Locale.ROOT and a `Locale` instance equal to
Locale.US.

**Returns:** An array of locales for which localized
        `DateFormat` instances are available.

## DateFormat.setCalendar(Calendar)

```java
public void setCalendar(Calendar newCalendar)
```

Set the calendar to be used by this date format.  Initially, the default
calendar for the specified or default locale is used.

Any TimeZone and leniency values that have previously been set are
overwritten by `newCalendar`'s values.

Parameters:

- `newCalendar`: the new `Calendar` to be used by the date format

## DateFormat.getCalendar()

```java
public Calendar getCalendar()
```

Gets the calendar associated with this date/time formatter.

**Returns:** the calendar associated with this date/time formatter.

## DateFormat.setNumberFormat(NumberFormat)

```java
public void setNumberFormat(NumberFormat newNumberFormat)
```

Allows you to set the number formatter.

Parameters:

- `newNumberFormat`: the given new NumberFormat.

## DateFormat.getNumberFormat()

```java
public NumberFormat getNumberFormat()
```

Gets the number formatter which this date/time formatter uses to
format and parse a time.

**Returns:** the number formatter which this date/time formatter uses.

## DateFormat.setTimeZone(TimeZone)

```java
public void setTimeZone(TimeZone zone)
```

Sets the time zone for the calendar of this `DateFormat` object.
This method is equivalent to the following call.

The `TimeZone` set by this method is overwritten by a
setCalendar call.

The `TimeZone` set by this method may be overwritten as
a result of a call to the parse method.

Parameters:

- `zone`: the given new time zone.

## DateFormat.getTimeZone()

```java
public TimeZone getTimeZone()
```

Gets the time zone.
This method is equivalent to the following call.

**Returns:** the time zone associated with the calendar of DateFormat.

## DateFormat.setLenient(boolean)

```java
public void setLenient(boolean lenient)
```

Specify whether or not date/time parsing is to be lenient.  With
lenient parsing, the parser may use heuristics to interpret inputs that
do not precisely match this object's format.  With strict parsing,
inputs must match this object's format.

This method is equivalent to the following call.

This leniency value is overwritten by a call to setCalendar().

Parameters:

- `lenient`: when `true`, parsing is lenient

**Implementation requirements:** A SPACE_SEPARATOR in the input
text will match any other SPACE_SEPARATORs
in the pattern with lenient parsing; otherwise, it will not match.

**See also:** java.util.Calendar#setLenient(boolean)

## DateFormat.isLenient()

```java
public boolean isLenient()
```

Tell whether date/time parsing is to be lenient.
This method is equivalent to the following call.

**Returns:** `true` if the `calendar` is lenient;
        `false` otherwise.

**See also:** java.util.Calendar#isLenient()

## DateFormat.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** This method calculates the hash code value using the value returned by
`getNumberFormat()`.

**See also:** Object#hashCode()

## DateFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `DateFormat` for equality.
Returns true if the object is also a `DateFormat` and the
two formats would format any value the same.

Parameters:

- `obj`: object to be compared for equality

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** `true` if the specified object is equal to this `DateFormat`

**See also:** Object#equals(Object)

## DateFormat.clone()

```java
public Object clone()
```

Overrides Cloneable

## DateFormat.DateFormat()

```java
protected DateFormat()
```

Create a new date format.

## DateFormat.ofCalendarField(int)

```java
public static Field ofCalendarField(int calendarField)
```

Returns the `Field` constant that corresponds to
the `Calendar` constant `calendarField`.
If there is no direct mapping between the `Calendar`
constant and a `Field`, null is returned.

Parameters:

- `calendarField`: Calendar field constant

**Returns:** Field instance representing calendarField.

**See also:** java.util.Calendar

Throws:

- `IllegalArgumentException`: if `calendarField` is not the value of a `Calendar` field constant.

## DateFormat.Field(String, int)

```java
protected Field(String name, int calendarField)
```

Creates a `Field`.

Parameters:

- `name`: the name of the `Field`
- `calendarField`: the `Calendar` constant this `Field` corresponds to; any value, even one outside the range of legal `Calendar` values may be used, but `-1` should be used for values that don't correspond to legal `Calendar` values

## DateFormat.getCalendarField()

```java
public int getCalendarField()
```

Returns the `Calendar` field associated with this
attribute. For example, if this represents the hours field of
a `Calendar`, this method would return `Calendar.HOUR`.
The return value of `-1` guarantees that this field does not
represent any corresponding constant in `Calendar`.

**Implementation requirements:** The default implementation always returns `-1` if it does
not represent any corresponding constant in `Calendar`.

**Returns:** Calendar constant for this field

**See also:** java.util.Calendar

## DateFormat.readResolve()

```java
protected Object readResolve() throws InvalidObjectException
```

Resolves instances being deserialized to the predefined constants.

**Returns:** resolved DateFormat.Field constant

Throws:

- `InvalidObjectException`: if the constant could not be resolved.

## DateFormat.ERA

```java
public static final Field ERA
```

Constant identifying the era field.

## DateFormat.YEAR

```java
public static final Field YEAR
```

Constant identifying the year field.

## DateFormat.MONTH

```java
public static final Field MONTH
```

Constant identifying the month field.

## DateFormat.DAY_OF_MONTH

```java
public static final Field DAY_OF_MONTH
```

Constant identifying the day of month field.

## DateFormat.HOUR_OF_DAY1

```java
public static final Field HOUR_OF_DAY1
```

Constant identifying the hour of day field, where the legal values
are 1 to 24.

## DateFormat.HOUR_OF_DAY0

```java
public static final Field HOUR_OF_DAY0
```

Constant identifying the hour of day field, where the legal values
are 0 to 23.

## DateFormat.MINUTE

```java
public static final Field MINUTE
```

Constant identifying the minute field.

## DateFormat.SECOND

```java
public static final Field SECOND
```

Constant identifying the second field.

## DateFormat.MILLISECOND

```java
public static final Field MILLISECOND
```

Constant identifying the millisecond field.

## DateFormat.DAY_OF_WEEK

```java
public static final Field DAY_OF_WEEK
```

Constant identifying the day of week field.

## DateFormat.DAY_OF_YEAR

```java
public static final Field DAY_OF_YEAR
```

Constant identifying the day of year field.

## DateFormat.DAY_OF_WEEK_IN_MONTH

```java
public static final Field DAY_OF_WEEK_IN_MONTH
```

Constant identifying the day of week field.

## DateFormat.WEEK_OF_YEAR

```java
public static final Field WEEK_OF_YEAR
```

Constant identifying the week of year field.

## DateFormat.WEEK_OF_MONTH

```java
public static final Field WEEK_OF_MONTH
```

Constant identifying the week of month field.

## DateFormat.AM_PM

```java
public static final Field AM_PM
```

Constant identifying the time of day indicator
(e.g. "a.m." or "p.m.") field.

## DateFormat.HOUR1

```java
public static final Field HOUR1
```

Constant identifying the hour field, where the legal values are
1 to 12.

## DateFormat.HOUR0

```java
public static final Field HOUR0
```

Constant identifying the hour field, where the legal values are
0 to 11.

## DateFormat.TIME_ZONE

```java
public static final Field TIME_ZONE
```

Constant identifying the time zone field.
