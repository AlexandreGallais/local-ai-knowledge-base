# SimpleDateFormat class (java.text)

```java
public class SimpleDateFormat extends DateFormat
```

{@code SimpleDateFormat} is a concrete class for formatting and
parsing dates in a locale-sensitive manner. It allows for formatting
(date &rarr; text), parsing (text &rarr; date), and normalization.

<p>
{@code SimpleDateFormat} allows you to start by choosing
any user-defined patterns for date-time formatting. However, you
are encouraged to create a date-time formatter with either
{@code getTimeInstance}, {@code getDateInstance}, or
{@code getDateTimeInstance} in {@code DateFormat}. Each
of these class methods can return a date/time formatter initialized
with a default format pattern. You may modify the format pattern
using the {@code applyPattern} methods as desired.
For more information on using these methods, see
{@link DateFormat}.

<h2>Date and Time Patterns</h2>
<p>
Date and time formats are specified by <em>date and time pattern</em>
strings.
Within date and time pattern strings, unquoted letters from
{@code 'A'} to {@code 'Z'} and from {@code 'a'} to
{@code 'z'} are interpreted as pattern letters representing the
components of a date or time string.
Text can be quoted using single quotes ({@code '}) to avoid
interpretation.
{@code "''"} represents a single quote.
All other characters are not interpreted; they're simply copied into the
output string during formatting or matched against the input string
during parsing.
<p>
The following pattern letters are defined (all other characters from
{@code 'A'} to {@code 'Z'} and from {@code 'a'} to
{@code 'z'} not in the table below are reserved). {@link #applyPattern(String)},
{@link #applyLocalizedPattern(String)}, and the {@link #SimpleDateFormat(String)
SimpleDateFormat constructors} throw {@code IllegalArgumentException} when
passed a pattern containing an unquoted reserved character.
<blockquote>
<table class="striped">
<caption style="display:none">Chart shows pattern letters, date/time component, presentation, and examples.</caption>
<thead>
    <tr>
        <th scope="col" style="text-align:left">Letter
        <th scope="col" style="text-align:left">Date or Time Component
        <th scope="col" style="text-align:left">Presentation
        <th scope="col" style="text-align:left">Examples
</thead>
<tbody>
    <tr>
        <th scope="row">{@code G}
        <td>Era designator
        <td><a href="#text">Text</a>
        <td>{@code AD}
    <tr>
        <th scope="row">{@code y}
        <td>Year
        <td><a href="#year">Year</a>
        <td>{@code 1996}; {@code 96}
    <tr>
        <th scope="row">{@code Y}
        <td>Week year
        <td><a href="#year">Year</a>
        <td>{@code 2009}; {@code 09}
    <tr>
        <th scope="row">{@code M}
        <td>Month in year (context sensitive)
        <td><a href="#month">Month</a>
        <td>{@code July}; {@code Jul}; {@code 07}
    <tr>
        <th scope="row">{@code L}
        <td>Month in year (standalone form)
        <td><a href="#month">Month</a>
        <td>{@code July}; {@code Jul}; {@code 07}
    <tr>
        <th scope="row">{@code w}
        <td>Week in year
        <td><a href="#number">Number</a>
        <td>{@code 27}
    <tr>
        <th scope="row">{@code W}
        <td>Week in month
        <td><a href="#number">Number</a>
        <td>{@code 2}
    <tr>
        <th scope="row">{@code D}
        <td>Day in year
        <td><a href="#number">Number</a>
        <td>{@code 189}
    <tr>
        <th scope="row">{@code d}
        <td>Day in month
        <td><a href="#number">Number</a>
        <td>{@code 10}
    <tr>
        <th scope="row">{@code F}
        <td>Day of week in month
        <td><a href="#number">Number</a>
        <td>{@code 2}
    <tr>
        <th scope="row">{@code E}
        <td>Day name in week
        <td><a href="#text">Text</a>
        <td>{@code Tuesday}; {@code Tue}
    <tr>
        <th scope="row">{@code u}
        <td>Day number of week (1 = Monday, ..., 7 = Sunday)
        <td><a href="#number">Number</a>
        <td>{@code 1}
    <tr>
        <th scope="row">{@code a}
        <td>Am/pm marker
        <td><a href="#text">Text</a>
        <td>{@code PM}
    <tr>
        <th scope="row">{@code H}
        <td>Hour in day (0-23)
        <td><a href="#number">Number</a>
        <td>{@code 0}
    <tr>
        <th scope="row">{@code k}
        <td>Hour in day (1-24)
        <td><a href="#number">Number</a>
        <td>{@code 24}
    <tr>
        <th scope="row">{@code K}
        <td>Hour in am/pm (0-11)
        <td><a href="#number">Number</a>
        <td>{@code 0}
    <tr>
        <th scope="row">{@code h}
        <td>Hour in am/pm (1-12)
        <td><a href="#number">Number</a>
        <td>{@code 12}
    <tr>
        <th scope="row">{@code m}
        <td>Minute in hour
        <td><a href="#number">Number</a>
        <td>{@code 30}
    <tr>
        <th scope="row">{@code s}
        <td>Second in minute
        <td><a href="#number">Number</a>
        <td>{@code 55}
    <tr>
        <th scope="row">{@code S}
        <td>Millisecond
        <td><a href="#number">Number</a>
        <td>{@code 978}
    <tr>
        <th scope="row">{@code z}
        <td>Time zone
        <td><a href="#timezone">General time zone</a>
        <td>{@code Pacific Standard Time}; {@code PST}; {@code GMT-08:00}
    <tr>
        <th scope="row">{@code Z}
        <td>Time zone
        <td><a href="#rfc822timezone">RFC 822 time zone</a>
        <td>{@code -0800}
    <tr>
        <th scope="row">{@code X}
        <td>Time zone
        <td><a href="#iso8601timezone">ISO 8601 time zone</a>
        <td>{@code -08}; {@code -0800};  {@code -08:00}
</tbody>
</table>
</blockquote>
Pattern letters are usually repeated, as their number determines the
exact presentation:
<ul>
<li><strong><a id="text">Text:</a></strong>
    For formatting, if the number of pattern letters is 4 or more,
    the full form is used; otherwise a short or abbreviated form
    is used if available.
    For parsing, both forms are accepted, independent of the number
    of pattern letters.<br><br></li>
<li><strong><a id="number">Number:</a></strong>
    For formatting, the number of pattern letters is the minimum
    number of digits, and shorter numbers are zero-padded to this amount.
    For parsing, the number of pattern letters is ignored unless
    it's needed to separate two adjacent fields.<br><br></li>
<li><strong><a id="year">Year:</a></strong>
    If the formatter's {@link #getCalendar() Calendar} is the Gregorian
    calendar, the following rules are applied.<br>
    <ul>
    <li>For formatting, if the number of pattern letters is 2, the year
        is truncated to 2 digits; otherwise it is interpreted as a
        <a href="#number">number</a>.
    <li>For parsing, if the number of pattern letters is more than 2,
        the year is interpreted literally, regardless of the number of
        digits. So using the pattern "MM/dd/yyyy", "01/11/12" parses to
        Jan 11, 12 A.D.
    <li>For parsing with the abbreviated year pattern ("y" or "yy"),
        {@code SimpleDateFormat} must interpret the abbreviated year
        relative to some century.  It does this by adjusting dates to be
        within 80 years before and 20 years after the time the {@code SimpleDateFormat}
        instance is created. For example, using a pattern of "MM/dd/yy" and a
        {@code SimpleDateFormat} instance created on Jan 1, 1997,  the string
        "01/11/12" would be interpreted as Jan 11, 2012 while the string "05/04/64"
        would be interpreted as May 4, 1964.
        During parsing, only strings consisting of exactly two digits, as defined by
        {@link Character#isDigit(char)}, will be parsed into the default century.
        Any other numeric string, such as a one digit string, a three or more digit
        string, or a two digit string that isn't all digits (for example, "-1"), is
        interpreted literally.  So "01/02/3" or "01/02/003" are parsed, using the
        same pattern, as Jan 2, 3 AD.  Likewise, "01/02/-3" is parsed as Jan 2, 4 BC.
    </ul>
    Otherwise, calendar system specific forms are applied.
    For both formatting and parsing, if the number of pattern
    letters is 4 or more, a calendar specific {@linkplain
    Calendar#LONG long form} is used. Otherwise, a calendar
    specific {@linkplain Calendar#SHORT short or abbreviated form}
    is used.<br>
    <br>
    If week year {@code 'Y'} is specified and the {@linkplain
    #getCalendar() calendar} doesn't support any <a
    href="../util/GregorianCalendar.html#week_year"> week
    years</a>, the calendar year ({@code 'y'}) is used instead. The
    support of week years can be tested with a call to {@link
    DateFormat#getCalendar() getCalendar()}.{@link
    java.util.Calendar#isWeekDateSupported()
    isWeekDateSupported()}.<br><br></li>
<li><strong><a id="month">Month:</a></strong>
    If the number of pattern letters is 3 or more, the month is
    interpreted as <a href="#text">text</a>; otherwise,
    it is interpreted as a <a href="#number">number</a>.<br>
    <ul>
    <li>Letter <em>M</em> produces context-sensitive month names, such as the
        embedded form of names. Letter <em>M</em> is context-sensitive in the
        sense that when it is used in the standalone pattern, for example,
        "MMMM", it gives the standalone form of a month name and when it is
        used in the pattern containing other field(s), for example, "d MMMM",
        it gives the format form of a month name. For example, January in the
        Catalan language is "de gener" in the format form while it is "gener"
        in the standalone form. In this case, "MMMM" will produce "gener" and
        the month part of the "d MMMM" will produce "de gener". If a
        {@code DateFormatSymbols} has been set explicitly with constructor
        {@link #SimpleDateFormat(String,DateFormatSymbols)} or method {@link
        #setDateFormatSymbols(DateFormatSymbols)}, the month names given by
        the {@code DateFormatSymbols} are used.</li>
    <li>Letter <em>L</em> produces the standalone form of month names.</li>
    </ul>
    <br></li>
<li><strong><a id="timezone">General time zone:</a></strong>
    Time zones are interpreted as <a href="#text">text</a> if they have
    names. For time zones representing a GMT offset value, the
    following syntax is used:
    <pre>
    <a id="GMTOffsetTimeZone"><i>GMTOffsetTimeZone:</i></a>
            {@code GMT} <i>Sign</i> <i>Hours</i> {@code :} <i>Minutes</i>
    <i>Sign:</i> one of
            {@code + -}
    <i>Hours:</i>
            <i>Digit</i>
            <i>Digit</i> <i>Digit</i>
    <i>Minutes:</i>
            <i>Digit</i> <i>Digit</i>
    <i>Digit:</i> one of
            {@code 0 1 2 3 4 5 6 7 8 9}</pre>
    <i>Hours</i> must be between 0 and 23, and <i>Minutes</i> must be between
    00 and 59. The format is locale independent and digits must be taken
    from the Basic Latin block of the Unicode standard.
    <p>For parsing, <a href="#rfc822timezone">RFC 822 time zones</a> are also
    accepted.<br><br></li>
<li><strong><a id="rfc822timezone">RFC 822 time zone:</a></strong>
    For formatting, the RFC 822 4-digit time zone format is used:

    <pre>
    <i>RFC822TimeZone:</i>
            <i>Sign</i> <i>TwoDigitHours</i> <i>Minutes</i>
    <i>TwoDigitHours:</i>
            <i>Digit Digit</i></pre>
    <i>TwoDigitHours</i> must be between 00 and 23. Other definitions
    are as for <a href="#timezone">general time zones</a>.

    <p>For parsing, <a href="#timezone">general time zones</a> are also
    accepted.
<li><strong><a id="iso8601timezone">ISO 8601 Time zone:</a></strong>
    The number of pattern letters designates the format for both formatting
    and parsing as follows:
    <pre>
    <i>ISO8601TimeZone:</i>
            <i>OneLetterISO8601TimeZone</i>
            <i>TwoLetterISO8601TimeZone</i>
            <i>ThreeLetterISO8601TimeZone</i>
    <i>OneLetterISO8601TimeZone:</i>
            <i>Sign</i> <i>TwoDigitHours</i>
            {@code Z}
    <i>TwoLetterISO8601TimeZone:</i>
            <i>Sign</i> <i>TwoDigitHours</i> <i>Minutes</i>
            {@code Z}
    <i>ThreeLetterISO8601TimeZone:</i>
            <i>Sign</i> <i>TwoDigitHours</i> {@code :} <i>Minutes</i>
            {@code Z}</pre>
    Other definitions are as for <a href="#timezone">general time zones</a> or
    <a href="#rfc822timezone">RFC 822 time zones</a>.

    <p>For formatting, if the offset value from GMT is 0, {@code "Z"} is
    produced. If the number of pattern letters is 1, any fraction of an hour
    is ignored. For example, if the pattern is {@code "X"} and the time zone is
    {@code "GMT+05:30"}, {@code "+05"} is produced.

    <p>For parsing, {@code "Z"} is parsed as the UTC time zone designator.
    <a href="#timezone">General time zones</a> are <em>not</em> accepted.

    <p>If the number of pattern letters is 4 or more, {@link
    IllegalArgumentException} is thrown when constructing a {@code
    SimpleDateFormat} or {@linkplain #applyPattern(String) applying a
    pattern}.
</ul>
{@code SimpleDateFormat} also supports <em>localized date and time
pattern</em> strings. In these strings, the pattern letters described above
may be replaced with other, locale dependent, pattern letters.
{@code SimpleDateFormat} does not deal with the localization of text
other than the pattern letters; that's up to the client of the class.

<h3>Examples</h3>

The following examples show how date and time patterns are interpreted in
the U.S. locale. The given date and time are 2001-07-04 12:08:56 local time
in the U.S. Pacific Time time zone.
<blockquote>
<table class="striped">
<caption style="display:none">Examples of date and time patterns interpreted in the U.S. locale</caption>
<thead>
    <tr>
        <th scope="col" style="text-align:left">Date and Time Pattern
        <th scope="col" style="text-align:left">Result
</thead>
<tbody>
    <tr>
        <th scope="row">{@code "yyyy.MM.dd G 'at' HH:mm:ss z"}
        <td>{@code 2001.07.04 AD at 12:08:56 PDT}
    <tr>
        <th scope="row">{@code "EEE, MMM d, ''yy"}
        <td>{@code Wed, Jul 4, '01}
    <tr>
        <th scope="row">{@code "h:mm a"}
        <td>{@code 12:08 PM}
    <tr>
        <th scope="row">{@code "hh 'o''clock' a, zzzz"}
        <td>{@code 12 o'clock PM, Pacific Daylight Time}
    <tr>
        <th scope="row">{@code "K:mm a, z"}
        <td>{@code 0:08 PM, PDT}
    <tr>
        <th scope="row">{@code "yyyyy.MMMMM.dd GGG hh:mm aaa"}
        <td>{@code 02001.July.04 AD 12:08 PM}
    <tr>
        <th scope="row">{@code "EEE, d MMM yyyy HH:mm:ss Z"}
        <td>{@code Wed, 4 Jul 2001 12:08:56 -0700}
    <tr>
        <th scope="row">{@code "yyMMddHHmmssZ"}
        <td>{@code 010704120856-0700}
    <tr>
        <th scope="row">{@code "yyyy-MM-dd'T'HH:mm:ss.SSSZ"}
        <td>{@code 2001-07-04T12:08:56.235-0700}
    <tr>
        <th scope="row">{@code "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}
        <td>{@code 2001-07-04T12:08:56.235-07:00}
    <tr>
        <th scope="row">{@code "YYYY-'W'ww-u"}
        <td>{@code 2001-W27-3}
</tbody>
</table>
</blockquote>

<h3><a id="synchronization">Synchronization</a></h3>

<p>
Date formats are not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.
@apiNote Consider using {@link java.time.format.DateTimeFormatter} as an
immutable and thread-safe alternative.

@see          <a href="http://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html">Java Tutorial</a>
@see          java.util.Calendar
@see          java.util.TimeZone
@see          DateFormat
@see          DateFormatSymbols
@see          java.time.format.DateTimeFormatter
@author       Mark Davis, Chen-Lieh Huang, Alan Liu
@since 1.1

## SimpleDateFormat.SimpleDateFormat()

```java
public SimpleDateFormat()
```

Constructs a {@code SimpleDateFormat} using the default pattern and
date format symbols for the default
{@link java.util.Locale.Category#FORMAT FORMAT} locale.
<b>Note:</b> This constructor may not support all locales.
For full coverage, use the factory methods in the {@link DateFormat}
class.

## SimpleDateFormat.SimpleDateFormat(String)

```java
public SimpleDateFormat(String pattern)
```

Constructs a {@code SimpleDateFormat} using the given pattern and
the default date format symbols for the default
{@link java.util.Locale.Category#FORMAT FORMAT} locale.
<b>Note:</b> This constructor may not support all locales.
For full coverage, use the factory methods in the {@link DateFormat}
class.
<p>This is equivalent to calling
{@link #SimpleDateFormat(String, Locale)
    SimpleDateFormat(pattern, Locale.getDefault(Locale.Category.FORMAT))}.

@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@param pattern the pattern describing the date and time format
@throws    NullPointerException if the given pattern is null
@throws    IllegalArgumentException if the given pattern is invalid

## SimpleDateFormat.SimpleDateFormat(String, Locale)

```java
public SimpleDateFormat(String pattern, Locale locale)
```

Constructs a {@code SimpleDateFormat} using the given pattern and
the default date format symbols for the given locale.
<b>Note:</b> This constructor may not support all locales.
For full coverage, use the factory methods in the {@link DateFormat}
class.

@param pattern the pattern describing the date and time format
@param locale the locale whose date format symbols should be used
@throws    NullPointerException if the given pattern or locale is null
@throws    IllegalArgumentException if the given pattern is invalid

## SimpleDateFormat.SimpleDateFormat(String, DateFormatSymbols)

```java
public SimpleDateFormat(String pattern, DateFormatSymbols formatSymbols)
```

Constructs a {@code SimpleDateFormat} using the given pattern and
date format symbols.

@param pattern the pattern describing the date and time format
@param formatSymbols the date format symbols to be used for formatting
@throws    NullPointerException if the given pattern or formatSymbols is null
@throws    IllegalArgumentException if the given pattern is invalid

## SimpleDateFormat.set2DigitYearStart(Date)

```java
public void set2DigitYearStart(Date startDate)
```

Sets the 100-year period 2-digit years will be interpreted as being in
to begin on the date the user specifies.

@param startDate During parsing, two digit years will be placed in the range
{@code startDate} to {@code startDate + 100 years}.
@see #get2DigitYearStart
@throws NullPointerException if {@code startDate} is {@code null}.
@since 1.2

## SimpleDateFormat.get2DigitYearStart()

```java
public Date get2DigitYearStart()
```

Returns the beginning date of the 100-year period 2-digit years are interpreted
as being within.

@return the start of the 100-year period into which two digit years are
parsed
@see #set2DigitYearStart
@since 1.2

## SimpleDateFormat.format(Date, StringBuffer, FieldPosition)

```java
public StringBuffer format(Date date, StringBuffer toAppendTo, FieldPosition pos)
```

Formats the given {@code Date} into a date/time string and appends
the result to the given {@code StringBuffer}.

@param date the date-time value to be formatted into a date-time string.
@param toAppendTo where the new date-time text is to be appended.
@param pos keeps track on the position of the field within
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
@return the formatted date-time string.
@throws    NullPointerException if any of the parameters is {@code null}.

## SimpleDateFormat.formatToCharacterIterator(Object)

```java
public AttributedCharacterIterator formatToCharacterIterator(Object obj)
```

Formats an Object producing an {@code AttributedCharacterIterator}.
You can use the returned {@code AttributedCharacterIterator}
to build the resulting String, as well as to determine information
about the resulting String.
<p>
Each attribute key of the AttributedCharacterIterator will be of type
{@code DateFormat.Field}, with the corresponding attribute value
being the same as the attribute key.

@throws    NullPointerException if obj is null.
@throws    IllegalArgumentException if the Format cannot format the
           given object, or if the Format's pattern string is invalid.
@param obj The object to format
@return AttributedCharacterIterator describing the formatted value.
@since 1.4

## SimpleDateFormat.parse(String, ParsePosition)

```java
public Date parse(String text, ParsePosition pos)
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

<p>This parsing operation uses the {@link DateFormat#calendar
calendar} to produce a {@code Date}. All of the {@code
calendar}'s date-time fields are {@linkplain Calendar#clear()
cleared} before parsing, and the {@code calendar}'s default
values of the date-time fields are used for any missing
date-time information. For example, the year value of the
parsed {@code Date} is 1970 with {@link GregorianCalendar} if
no year value is given from the parsing operation.  The {@code
TimeZone} value may be overwritten, depending on the given
pattern and the time zone value in {@code text}. Any {@code
TimeZone} value that has previously been set by a call to
{@link #setTimeZone(java.util.TimeZone) setTimeZone} may need
to be restored for further operations.

@param text  A {@code String}, part of which should be parsed.
@param pos   A {@code ParsePosition} object with index and error
             index information as described above.
@return A {@code Date} parsed from the string. In case of
        error, returns null.
@throws    NullPointerException if {@code text} or {@code pos} is null.

## SimpleDateFormat.toPattern()

```java
public String toPattern()
```

Returns a pattern string describing this date format.

@return a pattern string describing this date format.

## SimpleDateFormat.toLocalizedPattern()

```java
public String toLocalizedPattern()
```

Returns a localized pattern string describing this date format.

@return a localized pattern string describing this date format.

## SimpleDateFormat.applyPattern(String)

```java
public void applyPattern(String pattern)
```

Applies the given pattern string to this date format.

@param pattern the new date and time pattern for this date format
@throws    NullPointerException if the given pattern is null
@throws    IllegalArgumentException if the given pattern is invalid

## SimpleDateFormat.applyLocalizedPattern(String)

```java
public void applyLocalizedPattern(String pattern)
```

Applies the given localized pattern string to this date format.

@param pattern a String to be mapped to the new date and time format
       pattern for this format
@throws    NullPointerException if the given pattern is null
@throws    IllegalArgumentException if the given pattern is invalid

## SimpleDateFormat.getDateFormatSymbols()

```java
public DateFormatSymbols getDateFormatSymbols()
```

Gets a copy of the date and time format symbols of this date format.

@return the date and time format symbols of this date format
@see #setDateFormatSymbols

## SimpleDateFormat.setDateFormatSymbols(DateFormatSymbols)

```java
public void setDateFormatSymbols(DateFormatSymbols newFormatSymbols)
```

Sets the date and time format symbols of this date format.

@param newFormatSymbols the new date and time format symbols
@throws    NullPointerException if the given newFormatSymbols is null
@see #getDateFormatSymbols

## SimpleDateFormat.clone()

```java
public Object clone()
```

Creates a copy of this {@code SimpleDateFormat}. This also
clones the format's date format symbols.

@return a clone of this {@code SimpleDateFormat}

## SimpleDateFormat.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this {@code SimpleDateFormat}}

@implSpec This method calculates the hash code value using the value returned by
{@link #toPattern()}.
@see Object#hashCode()

## SimpleDateFormat.toString()

```java
public String toString()
```

{@return a string identifying this {@code SimpleDateFormat}, for debugging}

## SimpleDateFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code SimpleDateFormat} for equality.
Returns true if the object is also a {@code SimpleDateFormat} and the
two formats would format any value the same.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param  obj object to be compared for equality
@return {@code true} if the specified object is equal to this {@code SimpleDateFormat}
@see Object#equals(Object)