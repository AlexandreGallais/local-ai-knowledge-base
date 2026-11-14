# DateFormat class (java.text)

```java
public abstract class DateFormat extends Format
```

{@code DateFormat} is an abstract class for date/time formatting subclasses which
formats and parses dates or time in a language-independent manner.
The date/time formatting subclass, such as {@link SimpleDateFormat}, allows for
formatting (i.e., date &rarr; text), parsing (text &rarr; date), and
normalization.  The date is represented as a {@code Date} object or
as the milliseconds since January 1, 1970, 00:00:00 GMT.

<p>{@code DateFormat} provides static factory methods for obtaining default date/time
formatters based on the default or a given locale and a number of formatting
styles. The formatting styles include {@link #FULL}, {@link #LONG}, {@link #MEDIUM}, and {@link #SHORT}.
For any of the factory methods with the parameter <i>style</i>, an {@code
IllegalArgumentException} will be thrown if <i>style</i> is not equal to any
of the defined formatting styles. More detail and examples of using these styles are provided in the method
descriptions.

<p>{@code DateFormat} helps you to format and parse dates for any locale.
Your code can be completely independent of the locale conventions for
months, days of the week, or even the calendar format: lunar vs. solar.

<p>To format a date for the current Locale, use one of the
static factory methods:
<blockquote>
{@snippet lang=java :
myString = DateFormat.getDateInstance().format(myDate);
}
</blockquote>
<p>If you are formatting multiple dates, it is
more efficient to get the format and use it multiple times so that
the system doesn't have to fetch the information about the local
language and country conventions multiple times.
<blockquote>
{@snippet lang=java :
DateFormat df = DateFormat.getDateInstance();
for (Date myDate : dates) {
    output.println(df.format(myDate) + "; ");
}
}
</blockquote>
<p>To format a date for a different Locale, specify it in the
call to {@link #getDateInstance(int, Locale) getDateInstance()}.
<blockquote>
{@snippet lang=java :
DateFormat df = DateFormat.getDateInstance(DateFormat.LONG, Locale.FRANCE);
}
</blockquote>

<p>If the specified locale contains "ca" (calendar), "rg" (region override),
and/or "tz" (timezone) <a href="../util/Locale.html#def_locale_extension">Unicode
extensions</a>, the calendar, the country and/or the time zone for formatting
are overridden. If both "ca" and "rg" are specified, the calendar from the "ca"
extension supersedes the implicit one from the "rg" extension.

<p>You can use a DateFormat to parse also.
<blockquote>
{@snippet lang=java :
myDate = df.parse(myString);
}
</blockquote>
<p>Use {@code getDateInstance} to get the normal date format for that country.
There are other static factory methods available.
Use {@code getTimeInstance} to get the time format for that country.
Use {@code getDateTimeInstance} to get a date and time format. You can pass in
different options to these factory methods to control the length of the
result; from {@link #SHORT} to {@link #MEDIUM} to {@link #LONG} to {@link #FULL}. The exact result depends
on the locale, but generally:
<ul><li>{@link #SHORT} is the shortest and mainly numeric, such as {@code 12.13.52} or {@code 3:30pm}
<li>{@link #MEDIUM} is longer, such as {@code Jan 12, 1952}
<li>{@link #LONG} is even longer, such as {@code January 12, 1952} or {@code 3:30:32pm}
<li>{@link #FULL} is the longest, such as
{@code Tuesday, April 12, 1952 AD or 3:30:42pm PST}.
</ul>
For those fields with text, typically abbreviated text form is used with {@link #MEDIUM} option,
and full text form is used with {@link #LONG} and {@link #FULL} options.

<p>You can also set the time zone on the format if you wish.
If you want even more control over the format or parsing,
(or want to give your users more control),
you can try casting the {@code DateFormat} you get from the factory methods
to a {@link SimpleDateFormat}. This will work for the majority
of countries; just remember to put it in a {@code try} block in case you
encounter an unusual one.

<p>You can also use forms of the parse and format methods with
{@link ParsePosition} and {@link FieldPosition} to
allow you to
<ul><li>progressively parse through pieces of a string.
<li>align any particular field, or find out where it is for selection
on the screen.
</ul>

<h2><a id="synchronization">Synchronization</a></h2>

<p>
Date formats are not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.
@apiNote Consider using {@link java.time.format.DateTimeFormatter} as an
immutable and thread-safe alternative.

@implSpec
<ul><li>The {@link #format(Date, StringBuffer, FieldPosition)} and
{@link #parse(String, ParsePosition)} methods may throw
{@code NullPointerException}, if any of their parameter is {@code null}.
The subclass may provide its own implementation and specification about
{@code NullPointerException}.</li>
<li>The {@link #setCalendar(Calendar)}, {@link
#setNumberFormat(NumberFormat)} and {@link #setTimeZone(TimeZone)} methods
do not throw {@code NullPointerException} when their parameter is
{@code null}, but any subsequent operations on the same instance may throw
{@code NullPointerException}.</li>
<li>The {@link #getCalendar()}, {@link #getNumberFormat()} and
{@link #getTimeZone()} methods may return {@code null}, if the respective
values of this instance is set to {@code null} through the corresponding
setter methods. For Example: {@link #getTimeZone()} may return {@code null},
if the {@code TimeZone} value of this instance is set as
{@link #setTimeZone(java.util.TimeZone) setTimeZone(null)}.</li>
</ul>

@see          Format
@see          NumberFormat
@see          SimpleDateFormat
@see          java.util.Calendar
@see          java.util.GregorianCalendar
@see          java.util.TimeZone
@see          java.time.format.DateTimeFormatter
@author       Mark Davis, Chen-Lieh Huang, Alan Liu
@since 1.1

## DateFormat.calendar

```java
protected Calendar calendar
```

The {@link Calendar} instance used for calculating the date-time fields
and the instant of time. This field is used for both formatting and
parsing.

<p>Subclasses should initialize this field to a {@link Calendar}
appropriate for the {@link Locale} associated with this
{@code DateFormat}.
@serial

## DateFormat.numberFormat

```java
protected NumberFormat numberFormat
```

The number formatter that {@code DateFormat} uses to format numbers
in dates and times.  Subclasses should initialize this to a number format
appropriate for the locale associated with this {@code DateFormat}.
@serial

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

Formats the given {@code Object} into a date-time string. The formatted
string is appended to the given {@code StringBuffer}.

@param obj Must be a {@code Date} or a {@code Number} representing a
millisecond offset from the <a href="../util/Calendar.html#Epoch">Epoch</a>.
@param toAppendTo The string buffer for the returning date-time string.
@param fieldPosition keeps track on the position of the field within
the returned string. For example, given a date-time text
{@code "1996.07.10 AD at 15:08:56 PDT"}, if the given {@code fieldPosition}
is {@link DateFormat#YEAR_FIELD}, the begin index and end index of
{@code fieldPosition} will be set to 0 and 4, respectively.
Notice that if the same date-time field appears more than once in a
pattern, the {@code fieldPosition} will be set for the first occurrence
of that date-time field. For instance, formatting a {@code Date} to the
date-time string {@code "1 PM PDT (Pacific Daylight Time)"} using the
pattern {@code "h a z (zzzz)"} and the alignment field
{@link DateFormat#TIMEZONE_FIELD}, the begin index and end index of
{@code fieldPosition} will be set to 5 and 8, respectively, for the
first occurrence of the timezone pattern character {@code 'z'}.
@return the string buffer passed in as {@code toAppendTo},
        with formatted text appended.
@throws    IllegalArgumentException if the {@code Format} cannot format
           the given {@code obj}.
@see java.text.Format

## DateFormat.format(Date, StringBuffer, FieldPosition)

```java
public abstract StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition fieldPosition)
```

Formats a {@link Date} into a date-time string. The formatted
string is appended to the given {@code StringBuffer}.

@param date a Date to be formatted into a date-time string.
@param toAppendTo the string buffer for the returning date-time string.
@param fieldPosition keeps track on the position of the field within
the returned string. For example, given a date-time text
{@code "1996.07.10 AD at 15:08:56 PDT"}, if the given {@code fieldPosition}
is {@link DateFormat#YEAR_FIELD}, the begin index and end index of
{@code fieldPosition} will be set to 0 and 4, respectively.
Notice that if the same date-time field appears more than once in a
pattern, the {@code fieldPosition} will be set for the first occurrence
of that date-time field. For instance, formatting a {@code Date} to the
date-time string {@code "1 PM PDT (Pacific Daylight Time)"} using the
pattern {@code "h a z (zzzz)"} and the alignment field
{@link DateFormat#TIMEZONE_FIELD}, the begin index and end index of
{@code fieldPosition} will be set to 5 and 8, respectively, for the
first occurrence of the timezone pattern character {@code 'z'}.
@return the string buffer passed in as {@code toAppendTo}, with formatted
text appended.

## DateFormat.format(Date)

```java
public final String format(Date date)
```

Formats a {@link Date} into a date-time string.

@param date the time value to be formatted into a date-time string.
@return the formatted date-time string.

## DateFormat.parse(String)

```java
public Date parse(String source) throws ParseException
```

Parses text from the beginning of the given string to produce a date.
The method may not use the entire text of the given string.
<p>
See the {@link #parse(String, ParsePosition)} method for more information
on date parsing.

@param source A {@code String} whose beginning should be parsed.
@return A {@code Date} parsed from the string.
@throws    ParseException if the beginning of the specified string
           cannot be parsed.

## DateFormat.parse(String, ParsePosition)

```java
public abstract Date parse(String source, ParsePosition pos)
```

Parse a date/time string according to the given parse position.  For
example, if {@code this} has the pattern {@code "M/d/yy h:m a, z"},
then a time text {@code "07/10/96 4:5 PM, PDT"} will be parsed into a {@code Date}
that is equivalent to {@code Date(837039900000L)}.

<p> By default, parsing is lenient: If the input is not in the form used
by this object's format method but can still be parsed as a date, then
the parse succeeds.  Clients may insist on strict adherence to the
format by calling {@link #setLenient(boolean) setLenient(false)}.

<p>This parsing operation uses the {@link #calendar} to produce
a {@code Date}. As a result, the {@code calendar}'s date-time
fields and the {@code TimeZone} value may have been
overwritten, depending on subclass implementations. Any {@code
TimeZone} value that has previously been set by a call to
{@link #setTimeZone(java.util.TimeZone) setTimeZone} may need
to be restored for further operations.

@param source  The date/time string to be parsed

@param pos   On input, the position at which to start parsing; on
             output, the position at which parsing terminated, or the
             start position if the parse failed.

@return      A {@code Date}, or {@code null} if the input could not be parsed

## DateFormat.parseObject(String, ParsePosition)

```java
public Object parseObject(String source, ParsePosition pos)
```

Parses text from a string to produce a {@code Date}.
<p>
The method attempts to parse text starting at the index given by
{@code pos}.
If parsing succeeds, then the index of {@code pos} is updated
to the index after the last character used (parsing does not necessarily
use all characters up to the end of the string), and the parsed
date is returned. The updated {@code pos} can be used to
indicate the starting point for the next call to this method.
If an error occurs, then the index of {@code pos} is not
changed, the error index of {@code pos} is set to the index of
the character where the error occurred, and null is returned.
<p>
See the {@link #parse(String, ParsePosition)} method for more information
on date parsing.

@param source A {@code String}, part of which should be parsed.
@param pos A {@code ParsePosition} object with index and error
           index information as described above.
@return A {@code Date} parsed from the string. In case of
        error, returns null.
@throws NullPointerException if {@code source} or {@code pos} is null.

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
for the default {@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getTimeInstance(int, Locale) getTimeInstance(DEFAULT,
    Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@return a time formatter.

## DateFormat.getTimeInstance(int)

```java
public static final DateFormat getTimeInstance(int style)
```

Gets the time formatter with the given formatting style
for the default {@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getTimeInstance(int, Locale) getTimeInstance(style,
    Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@param style the given formatting style. For example,
SHORT for "h:mm a" in the US locale.
@return a time formatter.

## DateFormat.getTimeInstance(int, Locale)

```java
public static final DateFormat getTimeInstance(int style, Locale aLocale)
```

Gets the time formatter with the given formatting style
for the given locale.
@param style the given formatting style. For example,
SHORT for "h:mm a" in the US locale.
@param aLocale the given locale.
@return a time formatter.

## DateFormat.getDateInstance()

```java
public static final DateFormat getDateInstance()
```

Gets the date formatter with the default formatting style
for the default {@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getDateInstance(int, Locale) getDateInstance(DEFAULT,
    Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@return a date formatter.

## DateFormat.getDateInstance(int)

```java
public static final DateFormat getDateInstance(int style)
```

Gets the date formatter with the given formatting style
for the default {@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getDateInstance(int, Locale) getDateInstance(style,
    Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@param style the given formatting style. For example,
SHORT for "M/d/yy" in the US locale.
@return a date formatter.

## DateFormat.getDateInstance(int, Locale)

```java
public static final DateFormat getDateInstance(int style, Locale aLocale)
```

Gets the date formatter with the given formatting style
for the given locale.
@param style the given formatting style. For example,
SHORT for "M/d/yy" in the US locale.
@param aLocale the given locale.
@return a date formatter.

## DateFormat.getDateTimeInstance()

```java
public static final DateFormat getDateTimeInstance()
```

Gets the date/time formatter with the default formatting style
for the default {@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getDateTimeInstance(int, int, Locale) getDateTimeInstance(DEFAULT,
    DEFAULT, Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@return a date/time formatter.

## DateFormat.getDateTimeInstance(int, int)

```java
public static final DateFormat getDateTimeInstance(int dateStyle, int timeStyle)
```

Gets the date/time formatter with the given date and time
formatting styles for the default {@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getDateTimeInstance(int, int, Locale) getDateTimeInstance(dateStyle,
    timeStyle, Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@param dateStyle the given date formatting style. For example,
SHORT for "M/d/yy" in the US locale.
@param timeStyle the given time formatting style. For example,
SHORT for "h:mm a" in the US locale.
@return a date/time formatter.

## DateFormat.getDateTimeInstance(int, int, Locale)

```java
public static final DateFormat getDateTimeInstance(int dateStyle, int timeStyle, Locale aLocale)
```

Gets the date/time formatter with the given formatting styles
for the given locale.
@param dateStyle the given date formatting style.
@param timeStyle the given time formatting style.
@param aLocale the given locale.
@return a date/time formatter.

## DateFormat.getInstance()

```java
public static final DateFormat getInstance()
```

Get a default date/time formatter that uses the SHORT style for both the
date and the time.

@return a date/time formatter

## DateFormat.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
{@code get*Instance} methods of this class can return
localized instances.
The returned array represents the union of locales supported by the Java
runtime and by installed
{@link java.text.spi.DateFormatProvider DateFormatProvider} implementations.
At a minimum, the returned array must contain a {@code Locale} instance equal to
{@link Locale#ROOT Locale.ROOT} and a {@code Locale} instance equal to
{@link Locale#US Locale.US}.

@return An array of locales for which localized
        {@code DateFormat} instances are available.

## DateFormat.setCalendar(Calendar)

```java
public void setCalendar(Calendar newCalendar)
```

Set the calendar to be used by this date format.  Initially, the default
calendar for the specified or default locale is used.

<p>Any {@link java.util.TimeZone TimeZone} and {@linkplain
#isLenient() leniency} values that have previously been set are
overwritten by {@code newCalendar}'s values.

@param newCalendar the new {@code Calendar} to be used by the date format

## DateFormat.getCalendar()

```java
public Calendar getCalendar()
```

Gets the calendar associated with this date/time formatter.

@return the calendar associated with this date/time formatter.

## DateFormat.setNumberFormat(NumberFormat)

```java
public void setNumberFormat(NumberFormat newNumberFormat)
```

Allows you to set the number formatter.
@param newNumberFormat the given new NumberFormat.

## DateFormat.getNumberFormat()

```java
public NumberFormat getNumberFormat()
```

Gets the number formatter which this date/time formatter uses to
format and parse a time.
@return the number formatter which this date/time formatter uses.

## DateFormat.setTimeZone(TimeZone)

```java
public void setTimeZone(TimeZone zone)
```

Sets the time zone for the calendar of this {@code DateFormat} object.
This method is equivalent to the following call.
<blockquote>{@snippet lang=java :
getCalendar().setTimeZone(zone);
}</blockquote>

<p>The {@code TimeZone} set by this method is overwritten by a
{@link #setCalendar(java.util.Calendar) setCalendar} call.

<p>The {@code TimeZone} set by this method may be overwritten as
a result of a call to the parse method.

@param zone the given new time zone.

## DateFormat.getTimeZone()

```java
public TimeZone getTimeZone()
```

Gets the time zone.
This method is equivalent to the following call.
<blockquote>{@snippet lang=java :
getCalendar().getTimeZone();
}</blockquote>

@return the time zone associated with the calendar of DateFormat.

## DateFormat.setLenient(boolean)

```java
public void setLenient(boolean lenient)
```

Specify whether or not date/time parsing is to be lenient.  With
lenient parsing, the parser may use heuristics to interpret inputs that
do not precisely match this object's format.  With strict parsing,
inputs must match this object's format.

<p>This method is equivalent to the following call.
<blockquote>{@snippet lang=java :
getCalendar().setLenient(lenient);
}</blockquote>

<p>This leniency value is overwritten by a call to {@link
#setCalendar(java.util.Calendar) setCalendar()}.

@implSpec A {@link Character#SPACE_SEPARATOR SPACE_SEPARATOR} in the input
text will match any other {@link Character#SPACE_SEPARATOR SPACE_SEPARATOR}s
in the pattern with lenient parsing; otherwise, it will not match.

@param lenient when {@code true}, parsing is lenient
@see java.util.Calendar#setLenient(boolean)

## DateFormat.isLenient()

```java
public boolean isLenient()
```

Tell whether date/time parsing is to be lenient.
This method is equivalent to the following call.
<blockquote>{@snippet lang=java :
getCalendar().isLenient();
}</blockquote>

@return {@code true} if the {@link #calendar} is lenient;
        {@code false} otherwise.
@see java.util.Calendar#isLenient()

## DateFormat.hashCode()

```java
public int hashCode()
```

{@return the hash code for this {@code DateFormat}}

@implSpec This method calculates the hash code value using the value returned by
{@link #getNumberFormat()}.
@see Object#hashCode()

## DateFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code DateFormat} for equality.
Returns true if the object is also a {@code DateFormat} and the
two formats would format any value the same.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param  obj object to be compared for equality
@return {@code true} if the specified object is equal to this {@code DateFormat}
@see Object#equals(Object)

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

Returns the {@code Field} constant that corresponds to
the {@code Calendar} constant {@code calendarField}.
If there is no direct mapping between the {@code Calendar}
constant and a {@code Field}, null is returned.

@throws IllegalArgumentException if {@code calendarField} is
        not the value of a {@code Calendar} field constant.
@param calendarField Calendar field constant
@return Field instance representing calendarField.
@see java.util.Calendar

## DateFormat.Field(String, int)

```java
protected Field(String name, int calendarField)
```

Creates a {@code Field}.

@param name the name of the {@code Field}
@param calendarField the {@code Calendar} constant this
       {@code Field} corresponds to; any value, even one
       outside the range of legal {@code Calendar} values may
       be used, but {@code -1} should be used for values
       that don't correspond to legal {@code Calendar} values

## DateFormat.getCalendarField()

```java
public int getCalendarField()
```

Returns the {@code Calendar} field associated with this
attribute. For example, if this represents the hours field of
a {@code Calendar}, this method would return {@code Calendar.HOUR}.
The return value of {@code -1} guarantees that this field does not
represent any corresponding constant in {@code Calendar}.

@implSpec The default implementation always returns {@code -1} if it does
not represent any corresponding constant in {@code Calendar}.

@return Calendar constant for this field
@see java.util.Calendar

## DateFormat.readResolve()

```java
protected Object readResolve() throws InvalidObjectException
```

Resolves instances being deserialized to the predefined constants.

@throws InvalidObjectException if the constant could not be
        resolved.
@return resolved DateFormat.Field constant

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
({@literal e.g.} "a.m." or "p.m.") field.

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