# MessageFormat class (java.text)

```java
public class MessageFormat extends Format
```

{@code MessageFormat} provides a means to produce concatenated
messages in a language-neutral way. Use this class to construct messages
displayed for end users.

<p>
{@code MessageFormat} takes a set of objects, formats them, then
inserts the formatted strings into the pattern at the appropriate places.

<p>
<strong>Note:</strong>
{@code MessageFormat} differs from the other {@code Format}
classes in that you create a {@code MessageFormat} object with one
of its constructors (not with a {@code getInstance} style factory
method). The factory methods aren't necessary because {@code MessageFormat}
itself doesn't implement locale specific behavior. Any locale specific
behavior is defined by the pattern that you provide as well as the
subformats used for inserted arguments.

<h2><a id="patterns">Patterns and Their Interpretation</a></h2>

{@code MessageFormat} uses patterns of the following form:
<blockquote><pre>
<i>MessageFormatPattern:</i>
        <i>String</i>
        <i>MessageFormatPattern</i> <i>FormatElement</i> <i>String</i>

<i>FormatElement:</i>
        { <i>ArgumentIndex</i> }
        { <i>ArgumentIndex</i> , <i>FormatType</i> }
        { <i>ArgumentIndex</i> , <i>FormatType</i> , <i>FormatStyle</i> }

<i>FormatType:</i>
        number
        dtf_date
        dtf_time
        dtf_datetime
        <i>pre-defined DateTimeFormatter(s)</i>
        date
        time
        choice
        list

<i>FormatStyle:</i>
        short
        medium
        long
        full
        integer
        currency
        percent
        compact_short
        compact_long
        or
        unit
        <i>SubformatPattern</i>
</pre></blockquote>

<p>
The {@code ArgumentIndex} value is a non-negative integer written
using the digits {@code '0'} through {@code '9'}, and represents an index into the
{@code arguments} array passed to the {@code format} methods
or the result array returned by the {@code parse} methods.
<p>
Any constructor or method that takes a String pattern parameter will throw an {@code IllegalArgumentException} if the
pattern contains an {@code ArgumentIndex} value that is equal to or exceeds an implementation limit.
<p>
The {@code FormatType} and {@code FormatStyle} values are used to create
a {@code Format} instance for the format element. The following
table shows how the values map to {@code Format} instances. These values
are case-insensitive when passed to {@link #applyPattern(String)}. Combinations
not shown in the table are illegal. A <i>SubformatPattern</i> must
be a valid pattern string for the {@code Format} subclass used.
@implNote In the reference implementation, the limit of {@code ArgumentIndex} is 10,000.

<table class="plain">
<caption style="display:none">Shows how FormatType and FormatStyle values map to Format instances</caption>
<thead>
   <tr>
      <th scope="col" class="TableHeadingColor">FormatType
      <th scope="col" class="TableHeadingColor">FormatStyle
      <th scope="col" class="TableHeadingColor">Subformat Created
</thead>
<tbody>
   <tr>
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>{@code null}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=7>{@code number}
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>{@link NumberFormat#getInstance(Locale) NumberFormat.getInstance}{@code (getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code integer}
      <td>{@link NumberFormat#getIntegerInstance(Locale) NumberFormat.getIntegerInstance}{@code (getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code currency}
      <td>{@link NumberFormat#getCurrencyInstance(Locale) NumberFormat.getCurrencyInstance}{@code (getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code percent}
      <td>{@link NumberFormat#getPercentInstance(Locale) NumberFormat.getPercentInstance}{@code (getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code compact_short}
      <td>{@link NumberFormat#getCompactNumberInstance(Locale, NumberFormat.Style)
      NumberFormat.getCompactNumberInstance}{@code (getLocale(),} {@link NumberFormat.Style#SHORT})
   <tr>
      <th scope="row" style="font-weight:normal">{@code compact_long}
      <td>{@link NumberFormat#getCompactNumberInstance(Locale, NumberFormat.Style)
      NumberFormat.getCompactNumberInstance}{@code (getLocale(),} {@link NumberFormat.Style#LONG})
   <tr>
      <th scope="row" style="font-weight:normal"><i>SubformatPattern</i>
      <td>{@code new} {@link DecimalFormat#DecimalFormat(String,DecimalFormatSymbols)
      DecimalFormat}{@code (subformatPattern,} {@link DecimalFormatSymbols#getInstance(Locale)
      DecimalFormatSymbols.getInstance}{@code (getLocale()))}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=6>{@code dtf_date}
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>{@link DateTimeFormatter#ofLocalizedDate(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDate(}{@link java.time.format.FormatStyle#MEDIUM}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code short}
      <td>{@link DateTimeFormatter#ofLocalizedDate(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDate(}{@link java.time.format.FormatStyle#SHORT}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code medium}
      <td>{@link DateTimeFormatter#ofLocalizedDate(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDate(}{@link java.time.format.FormatStyle#MEDIUM}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code long}
      <td>{@link DateTimeFormatter#ofLocalizedDate(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDate(}{@link java.time.format.FormatStyle#LONG}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code full}
      <td>{@link DateTimeFormatter#ofLocalizedDate(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDate(}{@link java.time.format.FormatStyle#FULL}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal"><i>SubformatPattern</i>
      <td>{@link DateTimeFormatter#ofPattern(String, Locale)
      DateTimeFormatter.ofPattern}{@code (subformatPattern, getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=6>{@code dtf_time}
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>{@link DateTimeFormatter#ofLocalizedTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedTime(}{@link java.time.format.FormatStyle#MEDIUM}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code short}
      <td>{@link DateTimeFormatter#ofLocalizedTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedTime(}{@link java.time.format.FormatStyle#SHORT}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code medium}
      <td>{@link DateTimeFormatter#ofLocalizedTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedTime(}{@link java.time.format.FormatStyle#MEDIUM}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code long}
      <td>{@link DateTimeFormatter#ofLocalizedTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedTime(}{@link java.time.format.FormatStyle#LONG}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code full}
      <td>{@link DateTimeFormatter#ofLocalizedTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedTime(}{@link java.time.format.FormatStyle#FULL}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal"><i>SubformatPattern</i>
      <td>{@link DateTimeFormatter#ofPattern(String, Locale)   DateTimeFormatter.ofPattern}{@code (subformatPattern, getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=6>{@code dtf_datetime}
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>{@link DateTimeFormatter#ofLocalizedDateTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDateTime(}{@link java.time.format.FormatStyle#MEDIUM}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code short}
      <td>{@link DateTimeFormatter#ofLocalizedDateTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDateTime(}{@link java.time.format.FormatStyle#SHORT}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code medium}
      <td>{@link DateTimeFormatter#ofLocalizedDateTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDateTime(}{@link java.time.format.FormatStyle#MEDIUM}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code long}
      <td>{@link DateTimeFormatter#ofLocalizedDateTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDateTime(}{@link java.time.format.FormatStyle#LONG}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code full}
      <td>{@link DateTimeFormatter#ofLocalizedDateTime(java.time.format.FormatStyle)
      DateTimeFormatter.ofLocalizedDateTime(}{@link java.time.format.FormatStyle#FULL}{@code ).withLocale(getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal"><i>SubformatPattern</i>
      <td>{@link DateTimeFormatter#ofPattern(String, Locale)
      DateTimeFormatter.ofPattern}{@code (subformatPattern, getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=1>{@code pre-defined DateTimeFormatter(s)}
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>The {@code pre-defined DateTimeFormatter(s)} are used as a {@code FormatType} :
      {@link DateTimeFormatter#BASIC_ISO_DATE BASIC_ISO_DATE},
      {@link DateTimeFormatter#ISO_LOCAL_DATE ISO_LOCAL_DATE},
      {@link DateTimeFormatter#ISO_OFFSET_DATE ISO_OFFSET_DATE},
      {@link DateTimeFormatter#ISO_DATE ISO_DATE},
      {@link DateTimeFormatter#ISO_LOCAL_TIME ISO_LOCAL_TIME},
      {@link DateTimeFormatter#ISO_OFFSET_TIME ISO_OFFSET_TIME},
      {@link DateTimeFormatter#ISO_TIME ISO_TIME},
      {@link DateTimeFormatter#ISO_LOCAL_DATE_TIME ISO_LOCAL_DATE_TIME},
      {@link DateTimeFormatter#ISO_OFFSET_DATE_TIME ISO_OFFSET_DATE_TIME},
      {@link DateTimeFormatter#ISO_ZONED_DATE_TIME ISO_ZONED_DATE_TIME},
      {@link DateTimeFormatter#ISO_DATE_TIME ISO_DATE_TIME},
      {@link DateTimeFormatter#ISO_ORDINAL_DATE ISO_ORDINAL_DATE},
      {@link DateTimeFormatter#ISO_WEEK_DATE ISO_WEEK_DATE},
      {@link DateTimeFormatter#ISO_INSTANT ISO_INSTANT},
      {@link DateTimeFormatter#RFC_1123_DATE_TIME RFC_1123_DATE_TIME}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=6>{@code date}
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>{@link DateFormat#getDateInstance(int,Locale)
      DateFormat.getDateInstance}{@code (}{@link DateFormat#DEFAULT}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code short}
      <td>{@link DateFormat#getDateInstance(int,Locale)
      DateFormat.getDateInstance}{@code (}{@link DateFormat#SHORT}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code medium}
      <td>{@link DateFormat#getDateInstance(int,Locale)
      DateFormat.getDateInstance}{@code (}{@link DateFormat#MEDIUM}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code long}
      <td>{@link DateFormat#getDateInstance(int,Locale)
      DateFormat.getDateInstance}{@code (}{@link DateFormat#LONG}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code full}
      <td>{@link DateFormat#getDateInstance(int,Locale)
      DateFormat.getDateInstance}{@code (}{@link DateFormat#FULL}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal"><i>SubformatPattern</i>
      <td>{@code new} {@link SimpleDateFormat#SimpleDateFormat(String,Locale)
      SimpleDateFormat}{@code (subformatPattern, getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=6>{@code time}
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>{@link DateFormat#getTimeInstance(int,Locale)
      DateFormat.getTimeInstance}{@code (}{@link DateFormat#DEFAULT}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code short}
      <td>{@link DateFormat#getTimeInstance(int,Locale)
      DateFormat.getTimeInstance}{@code (}{@link DateFormat#SHORT}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code medium}
      <td>{@link DateFormat#getTimeInstance(int,Locale)
      DateFormat.getTimeInstance}{@code (}{@link DateFormat#MEDIUM}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code long}
      <td>{@link DateFormat#getTimeInstance(int,Locale)
      DateFormat.getTimeInstance}{@code (}{@link DateFormat#LONG}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code full}
      <td>{@link DateFormat#getTimeInstance(int,Locale)
      DateFormat.getTimeInstance}{@code (}{@link DateFormat#FULL}{@code , getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal"><i>SubformatPattern</i>
      <td>{@code new} {@link SimpleDateFormat#SimpleDateFormat(String,Locale)
      SimpleDateFormat}{@code (subformatPattern, getLocale())}
   <tr>
      <th scope="row" style="font-weight:normal">{@code choice}
      <th scope="row" style="font-weight:normal"><i>SubformatPattern</i>
      <td>{@code new} {@link ChoiceFormat#ChoiceFormat(String) ChoiceFormat}{@code (subformatPattern)}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=3>{@code list}
      <th scope="row" style="font-weight:normal"><i>(none)</i>
      <td>{@link ListFormat#getInstance(Locale, ListFormat.Type, ListFormat.Style)
      ListFormat.getInstance}{@code (getLocale()}, {@link ListFormat.Type#STANDARD}, {@link ListFormat.Style#FULL}{@code )}
   <tr>
      <th scope="row" style="font-weight:normal">{@code or}
      <td>{@link ListFormat#getInstance(Locale, ListFormat.Type, ListFormat.Style)
      ListFormat.getInstance}{@code (getLocale()}, {@link ListFormat.Type#OR}, {@link ListFormat.Style#FULL}{@code )}
   <tr>
      <th scope="row" style="font-weight:normal">{@code unit}
      <td>{@link ListFormat#getInstance(Locale, ListFormat.Type, ListFormat.Style)
      ListFormat.getInstance}{@code (getLocale()}, {@link ListFormat.Type#UNIT}, {@link ListFormat.Style#FULL}{@code )}
</tbody>
</table>

<h3>Quoting Rules in Patterns</h3>

<p>Within a <i>String</i>, a pair of single quotes can be used to
quote any arbitrary characters except single quotes. For example,
pattern string <code>"'{0}'"</code> represents string
<code>"{0}"</code>, not a <i>FormatElement</i>. A single quote itself
must be represented by doubled single quotes {@code ''} throughout a
<i>String</i>.  For example, pattern string <code>"'{''}'"</code> is
interpreted as a sequence of <code>'{</code> (start of quoting and a
left curly brace), {@code ''} (a single quote), and
<code>}'</code> (a right curly brace and end of quoting),
<em>not</em> <code>'{'</code> and <code>'}'</code> (quoted left and
right curly braces): representing string <code>"{'}"</code>,
<em>not</em> <code>"{}"</code>.

<p>A <i>SubformatPattern</i> is interpreted by its corresponding
subformat, and subformat-dependent pattern rules apply. For example,
pattern string <code>"{1,number,<u>$'#',##</u>}"</code>
(<i>SubformatPattern</i> with underline) will produce a number format
with the pound-sign quoted, with a result such as: {@code
"$#31,45"}. Refer to each {@code Format} subclass documentation for
details.

<p>Any unmatched quote is treated as closed at the end of the given
pattern. For example, pattern string {@code "'{0}"} is treated as
pattern {@code "'{0}'"}.

<p>Any curly braces within an unquoted pattern must be balanced. For
example, <code>"ab {0} de"</code> and <code>"ab '}' de"</code> are
valid patterns, but <code>"ab {0'}' de"</code>, <code>"ab } de"</code>
and <code>"''{''"</code> are not.

<dl><dt><b>Warning:</b><dd>The rules for using quotes within message
format patterns unfortunately have shown to be somewhat confusing.
In particular, it isn't always obvious to localizers whether single
quotes need to be doubled or not. Make sure to inform localizers about
the rules, and tell them (for example, by using comments in resource
bundle source files) which strings will be processed by {@code MessageFormat}.
Note that localizers may need to use single quotes in translated
strings where the original version doesn't have them.
</dl>

<h2>Usage Information</h2>


The following example demonstrates a general usage of {@code MessageFormat}.
In internationalized programs, the message format pattern and other
static strings will likely be obtained from resource bundles.

{@snippet lang=java :
int planet = 7;
String event = "a disturbance in the Force";
String result = MessageFormat.format(
    "At {1,time} on {1,date}, there was {2} on planet {0,number,integer}.",
    planet, new GregorianCalendar(2053, Calendar.JULY, 3, 12, 30).getTime(), event);
}

{@code result} returns the following:
<blockquote><pre>
At 12:30:00 PM on Jul 3, 2053, there was a disturbance in the Force on planet 7.
</pre></blockquote>

<p>
For more sophisticated patterns, {@link ChoiceFormat} can be used with
{@code MessageFormat} to produce accurate forms for singular and plural:
{@snippet lang=java :
MessageFormat msgFmt = new MessageFormat("The disk \"{0}\" contains {1,choice,0#no files|1#one file|1< {1,number,integer} files}.");
Object[] args = {"MyDisk", fileCount};
String result = msgFmt.format(args);
}

{@code result} with different values for {@code fileCount}, returns the following:
<blockquote><pre>
The disk "MyDisk" contains no files.
The disk "MyDisk" contains one file.
The disk "MyDisk" contains 1,273 files.
</pre></blockquote>

<p>
<strong id="pattern_caveats">Notes:</strong> As seen in the previous snippet,
the string produced by a {@code ChoiceFormat} in {@code MessageFormat} is
treated as special; occurrences of '{' are used to indicate subformats, and
cause recursion. If a {@code FormatElement} is defined in the {@code ChoiceFormat}
pattern, it will only be formatted according to the {@code FormatType} and
{@code FormatStyle} pattern provided. The associated subformats of the
top level {@code MessageFormat} will not be applied to the {@code FormatElement}
defined in the {@code ChoiceFormat} pattern.
If you create both a {@code MessageFormat} and {@code ChoiceFormat}
programmatically (instead of using the string patterns), then be careful not to
produce a format that recurses on itself, which will cause an infinite loop.

<h2>Formatting Date and Time</h2>

MessageFormat provides patterns that support the date/time formatters in the
{@link java.time.format} and {@link java.text} packages. Consider the following three examples,
with a date of 11/16/2023:

<p>1) a <i>date</i> {@code FormatType} with a <i>full</i> {@code FormatStyle},
{@snippet lang=java :
Object[] arg = {new GregorianCalendar(2023, Calendar.NOVEMBER, 16).getTime()};
var fmt = new MessageFormat("The date was {0,date,full}");
fmt.format(arg); // returns "The date was Thursday, November 16, 2023"
}

<p>2) a <i>dtf_date</i> {@code FormatType} with a <i>full</i> {@code FormatStyle},
{@snippet lang=java :
Object[] arg = {LocalDate.of(2023, 11, 16)};
var fmt = new MessageFormat("The date was {0,dtf_date,full}");
fmt.format(arg); // returns "The date was Thursday, November 16, 2023"
}

<p>3) an <i>ISO_LOCAL_DATE</i> {@code FormatType},
{@snippet lang=java :
Object[] arg = {LocalDate.of(2023, 11, 16)};
var fmt = new MessageFormat("The date was {0,ISO_LOCAL_DATE}");
fmt.format(arg); // returns "The date was 2023-11-16"
}

<h3>Parsing</h3>
<p>
When a single argument is parsed more than once in the string, the last match
will be the final result of the parsing.  For example,
{@snippet lang=java :
MessageFormat mf = new MessageFormat("{0,number,#.##}, {0,number,#.#}");
Object[] objs = {Double.valueOf(3.1415)};
String result = mf.format( objs );
// result now equals "3.14, 3.1"
objs = mf.parse(result, new ParsePosition(0));
// objs now equals {Double.valueOf(3.1)}
}

<p>
Likewise, parsing with a {@code MessageFormat} object using patterns containing
multiple occurrences of the same argument would return the last match.  For
example,
{@snippet lang=java :
MessageFormat mf = new MessageFormat("{0}, {0}, {0}");
String forParsing = "x, y, z";
Object[] objs = mf.parse(forParsing, new ParsePosition(0));
// objs now equals {new String("z")}
}

<h3><a id="synchronization">Synchronization</a></h3>

<p>
Message formats are not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

@see          java.util.Locale
@see          Format
@see          NumberFormat
@see          DecimalFormat
@see          DecimalFormatSymbols
@see          ChoiceFormat
@see          DateFormat
@see          SimpleDateFormat
@see          DateTimeFormatter

@author       Mark Davis
@since 1.1

## MessageFormat.MessageFormat(String)

```java
public MessageFormat(String pattern)
```

Constructs a MessageFormat for the default
{@link java.util.Locale.Category#FORMAT FORMAT} locale and the
specified pattern.
The constructor first sets the locale, then parses the pattern and
creates a list of subformats for the format elements contained in it.
Patterns and their interpretation are specified in the
{@linkplain ##patterns class description}.

@param pattern the pattern for this message format
@throws    IllegalArgumentException if the pattern is invalid
@throws    NullPointerException if {@code pattern} is
           {@code null}

## MessageFormat.MessageFormat(String, Locale)

```java
public MessageFormat(String pattern, Locale locale)
```

Constructs a MessageFormat for the specified locale and
pattern.
The constructor first sets the locale, then parses the pattern and
creates a list of subformats for the format elements contained in it.
Patterns and their interpretation are specified in the
{@linkplain ##patterns class description}.

@implSpec The default implementation throws a
{@code NullPointerException} if {@code locale} is {@code null}
either during the creation of the {@code MessageFormat} object or later
when {@code format()} is called by a {@code MessageFormat}
instance with a null locale and the implementation utilizes a
locale-dependent subformat.

@param pattern the pattern for this message format
@param locale the locale for this message format
@throws    IllegalArgumentException if the pattern is invalid
@throws    NullPointerException if {@code pattern} is
           {@code null} or {@code locale} is {@code null} and the
           implementation uses a locale-dependent subformat.
@since 1.4

## MessageFormat.setLocale(Locale)

```java
public void setLocale(Locale locale)
```

Sets the locale to be used when creating or comparing subformats.
This affects subsequent calls
<ul>
<li>to the {@link #applyPattern applyPattern}
    and {@link #toPattern toPattern} methods if format elements specify
    a format type and therefore have the subformats created in the
    {@code applyPattern} method, as well as
<li>to the {@code format} and
    {@link #formatToCharacterIterator formatToCharacterIterator} methods
    if format elements do not specify a format type and therefore have
    the subformats created in the formatting methods.
</ul>
Subformats that have already been created are not affected.

@param locale the locale to be used when creating or comparing subformats

## MessageFormat.getLocale()

```java
public Locale getLocale()
```

Gets the locale that's used when creating or comparing subformats.

@return the locale used when creating or comparing subformats

## MessageFormat.applyPattern(String)

```java
public void applyPattern(String pattern)
```

Sets the pattern used by this message format.
The method parses the pattern and creates a list of subformats
for the format elements contained in it.
Patterns and their interpretation are specified in the
{@linkplain ##patterns class description}.

@param pattern the pattern for this message format
@throws    IllegalArgumentException if the pattern is invalid
@throws    NullPointerException if {@code pattern} is
           {@code null}

## MessageFormat.toPattern()

```java
public String toPattern()
```

{@return a String pattern adhering to the {@link ##patterns patterns section} that
represents the current state of this {@code MessageFormat}}

The string is constructed from internal information and therefore
does not necessarily equal the previously applied pattern. The order of
{@code FormatStyle} matching is not guaranteed. That is, a {@code
FormatStyle} produced may not be equivalent to the corresponding style passed,
in the instance that multiple styles are equivalent.

@implSpec The implementation in {@link MessageFormat} returns a
string that, when passed to a {@code MessageFormat()} constructor
or {@link #applyPattern applyPattern()}, produces an instance that
is semantically equivalent to this instance. If a subformat cannot be
converted to a String pattern, the {@code FormatType} and {@code FormatStyle}
will be omitted from the {@code FormatElement}.

## MessageFormat.setFormatsByArgumentIndex(Format[])

```java
public void setFormatsByArgumentIndex(Format[] newFormats)
```

Sets the formats to use for the values passed into
{@code format} methods or returned from {@code parse}
methods. The indices of elements in {@code newFormats}
correspond to the argument indices used in the previously set
pattern string.
The order of formats in {@code newFormats} thus corresponds to
the order of elements in the {@code arguments} array passed
to the {@code format} methods or the result array returned
by the {@code parse} methods.
<p>
If an argument index is used for more than one format element
in the pattern string, then the corresponding new format is used
for all such format elements. If an argument index is not used
for any format element in the pattern string, then the
corresponding new format is ignored. If fewer formats are provided
than needed, then only the formats for argument indices less
than {@code newFormats.length} are replaced.

@param newFormats the new formats to use
@throws    NullPointerException if {@code newFormats} is null
@since 1.4

## MessageFormat.setFormats(Format[])

```java
public void setFormats(Format[] newFormats)
```

Sets the formats to use for the format elements in the
previously set pattern string.
The order of formats in {@code newFormats} corresponds to
the order of format elements in the pattern string.
<p>
If more formats are provided than needed by the pattern string,
the remaining ones are ignored. If fewer formats are provided
than needed, then only the first {@code newFormats.length}
formats are replaced.
<p>
Since the order of format elements in a pattern string often
changes during localization, it is generally better to use the
{@link #setFormatsByArgumentIndex setFormatsByArgumentIndex}
method, which assumes an order of formats corresponding to the
order of elements in the {@code arguments} array passed to
the {@code format} methods or the result array returned by
the {@code parse} methods.

@param newFormats the new formats to use
@throws    NullPointerException if {@code newFormats} is null

## MessageFormat.setFormatByArgumentIndex(int, Format)

```java
public void setFormatByArgumentIndex(int argumentIndex, Format newFormat)
```

Sets the format to use for the format elements within the
previously set pattern string that use the given argument
index.
The argument index is part of the format element definition and
represents an index into the {@code arguments} array passed
to the {@code format} methods or the result array returned
by the {@code parse} methods.
<p>
If the argument index is used for more than one format element
in the pattern string, then the new format is used for all such
format elements. If the argument index is not used for any format
element in the pattern string, then the new format is ignored.

@param argumentIndex the argument index for which to use the new format
@param newFormat the new format to use
@since 1.4

## MessageFormat.setFormat(int, Format)

```java
public void setFormat(int formatElementIndex, Format newFormat)
```

Sets the format to use for the format element with the given
format element index within the previously set pattern string.
The format element index is the zero-based number of the format
element counting from the start of the pattern string.
<p>
Since the order of format elements in a pattern string often
changes during localization, it is generally better to use the
{@link #setFormatByArgumentIndex setFormatByArgumentIndex}
method, which accesses format elements based on the argument
index they specify.

@param formatElementIndex the index of a format element within the pattern
@param newFormat the format to use for the specified format element
@throws    ArrayIndexOutOfBoundsException if {@code formatElementIndex} is equal to or
           larger than the number of format elements in the pattern string

## MessageFormat.getFormatsByArgumentIndex()

```java
public Format[] getFormatsByArgumentIndex()
```

Gets the formats used for the values passed into
{@code format} methods or returned from {@code parse}
methods. The indices of elements in the returned array
correspond to the argument indices used in the previously set
pattern string.
The order of formats in the returned array thus corresponds to
the order of elements in the {@code arguments} array passed
to the {@code format} methods or the result array returned
by the {@code parse} methods.
<p>
If an argument index is used for more than one format element
in the pattern string, then the format used for the last such
format element is returned in the array. If an argument index
is not used for any format element in the pattern string, then
null is returned in the array.

@return the formats used for the arguments within the pattern
@since 1.4

## MessageFormat.getFormats()

```java
public Format[] getFormats()
```

Gets the formats used for the format elements in the
previously set pattern string.
The order of formats in the returned array corresponds to
the order of format elements in the pattern string.
<p>
Since the order of format elements in a pattern string often
changes during localization, it's generally better to use the
{@link #getFormatsByArgumentIndex getFormatsByArgumentIndex}
method, which assumes an order of formats corresponding to the
order of elements in the {@code arguments} array passed to
the {@code format} methods or the result array returned by
the {@code parse} methods.

@return the formats used for the format elements in the pattern

## MessageFormat.format(Object[], StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object[] arguments, StringBuffer result, FieldPosition pos)
```

Formats an array of objects and appends the {@code MessageFormat}'s
pattern, with format elements replaced by the formatted objects, to the
provided {@code StringBuffer}.
<p>
The text substituted for the individual format elements is derived from
the current subformat of the format element and the
{@code arguments} element at the format element's argument index
as indicated by the first matching line of the following table. An
argument is <i>unavailable</i> if {@code arguments} is
{@code null} or has fewer than argumentIndex+1 elements.

<table class="plain">
<caption style="display:none">Examples of subformat, argument, and formatted text</caption>
<thead>
   <tr>
      <th scope="col">Subformat
      <th scope="col">Argument
      <th scope="col">Formatted Text
</thead>
<tbody>
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=2><i>any</i>
      <th scope="row" style="font-weight:normal"><i>unavailable</i>
      <td><code>"{" + argumentIndex + "}"</code>
   <tr>
      <th scope="row" style="font-weight:normal">{@code null}
      <td>{@code "null"}
   <tr>
      <th scope="row" style="font-weight:normal">{@code instanceof ChoiceFormat}
      <th scope="row" style="font-weight:normal"><i>any</i>
      <td><code>subformat.format(argument).indexOf('{') &gt;= 0 ?<br>
          (new MessageFormat(subformat.format(argument), getLocale())).format(argument) :
          subformat.format(argument)</code>
   <tr>
      <th scope="row" style="font-weight:normal">{@code != null}
      <th scope="row" style="font-weight:normal"><i>any</i>
      <td>{@code subformat.format(argument)}
   <tr>
      <th scope="row" style="font-weight:normal" rowspan=4>{@code null}
      <th scope="row" style="font-weight:normal">{@code instanceof Number}
      <td>{@code NumberFormat.getInstance(getLocale()).format(argument)}
   <tr>
      <th scope="row" style="font-weight:normal">{@code instanceof Date}
      <td>{@code DateFormat.getDateTimeInstance(DateFormat.SHORT, DateFormat.SHORT, getLocale()).format(argument)}
   <tr>
      <th scope="row" style="font-weight:normal">{@code instanceof String}
      <td>{@code argument}
   <tr>
      <th scope="row" style="font-weight:normal"><i>any</i>
      <td>{@code argument.toString()}
</tbody>
</table>
<p>
If {@code pos} is non-null, and refers to
{@code Field.ARGUMENT}, the location of the first formatted
string will be returned.

@param arguments an array of objects to be formatted and substituted.
@param result where text is appended.
@param pos keeps track on the position of the first replaced argument
           in the output string.
@return the string buffer passed in as {@code result}, with formatted
text appended
@throws    IllegalArgumentException if an argument in the
           {@code arguments} array is not of the type
           expected by the format element(s) that use it.
@throws    NullPointerException if {@code result} is {@code null} or
           if the {@code MessageFormat} instance that calls this method
           has locale set to null, and the implementation
           uses a locale-dependent subformat.

## MessageFormat.format(String, Object ...)

```java
public static String format(String pattern, Object ... arguments)
```

Creates a MessageFormat with the given pattern and uses it
to format the given arguments.
This method returns a string that would be equal to the string returned by
<blockquote>
    <code>(new {@link #MessageFormat(String) MessageFormat}(pattern)).{@link #format(java.lang.Object[], java.lang.StringBuffer, java.text.FieldPosition) format}(arguments, new StringBuffer(), null).toString()</code>
</blockquote>

@param pattern   the pattern string
@param arguments object(s) to format
@return the formatted string
@throws    IllegalArgumentException if the pattern is invalid,
           or if an argument in the {@code arguments} array
           is not of the type expected by the format element(s)
           that use it.
@throws    NullPointerException if {@code pattern} is {@code null}

## MessageFormat.format(Object, StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object arguments, StringBuffer result, FieldPosition pos)
```

Formats an array of objects and appends the {@code MessageFormat}'s
pattern, with format elements replaced by the formatted objects, to the
provided {@code StringBuffer}.
This is equivalent to
<blockquote>
    <code>{@link #format(java.lang.Object[], java.lang.StringBuffer, java.text.FieldPosition) format}((Object[]) arguments, result, pos)</code>
</blockquote>

@param arguments an array of objects to be formatted and substituted.
@param result where text is appended.
@param pos keeps track on the position of the first replaced argument
           in the output string.
@throws    IllegalArgumentException if an argument in the
           {@code arguments} array is not of the type
           expected by the format element(s) that use it.
@throws    NullPointerException if {@code result} is {@code null} or
           if the {@code MessageFormat} instance that calls this method
           has locale set to null, and the implementation
           uses a locale-dependent subformat.

## MessageFormat.formatToCharacterIterator(Object)

```java
public AttributedCharacterIterator formatToCharacterIterator(Object arguments)
```

Formats an array of objects and inserts them into the
{@code MessageFormat}'s pattern, producing an
{@code AttributedCharacterIterator}.
You can use the returned {@code AttributedCharacterIterator}
to build the resulting String, as well as to determine information
about the resulting String.
<p>
The text of the returned {@code AttributedCharacterIterator} is
the same that would be returned by
<blockquote>
    <code>{@link #format(java.lang.Object[], java.lang.StringBuffer, java.text.FieldPosition) format}(arguments, new StringBuffer(), null).toString()</code>
</blockquote>
<p>
In addition, the {@code AttributedCharacterIterator} contains at
least attributes indicating where text was generated from an
argument in the {@code arguments} array. The keys of these attributes are of
type {@code MessageFormat.Field}, their values are
{@code Integer} objects indicating the index in the {@code arguments}
array of the argument from which the text was generated.
<p>
The attributes/value from the underlying {@code Format}
instances that {@code MessageFormat} uses will also be
placed in the resulting {@code AttributedCharacterIterator}.
This allows you to not only find where an argument is placed in the
resulting String, but also which fields it contains in turn.

@param arguments an array of objects to be formatted and substituted.
@return AttributedCharacterIterator describing the formatted value.
@throws    NullPointerException if {@code arguments} is null.
@throws    IllegalArgumentException if an argument in the
           {@code arguments} array is not of the type
           expected by the format element(s) that use it.
@since 1.4

## MessageFormat.parse(String, ParsePosition)

```java
public Object[] parse(String source, ParsePosition pos)
```

Parses the string.

<p>Caveats: The parse may fail in a number of circumstances.
For example:
<ul>
<li>If one of the arguments does not occur in the pattern.
<li>If the format of an argument loses information, such as
    with a choice format where a large number formats to "many".
<li>Does not yet handle recursion (where
    the substituted strings contain {n} references.)
<li>Will not always find a match (or the correct match)
    if some part of the parse is ambiguous.
    For example, if the pattern "{1},{2}" is used with the
    string arguments {"a,b", "c"}, it will format as "a,b,c".
    When the result is parsed, it will return {"a", "b,c"}.
<li>If a single argument is parsed more than once in the string,
    then the later parse wins.
</ul>
When the parse fails, use ParsePosition.getErrorIndex() to find out
where in the string the parsing failed.  The returned error
index is the starting offset of the sub-patterns that the string
is comparing with.  For example, if the parsing string "AAA {0} BBB"
is comparing against the pattern "AAD {0} BBB", the error index is
0. When an error occurs, the call to this method will return null.
If the source is null, return an empty array.

@param source the string to parse
@param pos    the parse position
@return an array of parsed objects
@throws    NullPointerException if {@code pos} is {@code null}
           for a non-null {@code source} string.

## MessageFormat.parse(String)

```java
public Object[] parse(String source) throws ParseException
```

Parses text from the beginning of the given string to produce an object
array.
The method may not use the entire text of the given string.
<p>
See the {@link #parse(String, ParsePosition)} method for more information
on message parsing.

@param source A {@code String} whose beginning should be parsed.
@return An {@code Object} array parsed from the string.
@throws    ParseException if the beginning of the specified string
           cannot be parsed.

## MessageFormat.parseObject(String, ParsePosition)

```java
public Object parseObject(String source, ParsePosition pos)
```

Parses text from a string to produce an object array.
<p>
The method attempts to parse text starting at the index given by
{@code pos}.
If parsing succeeds, then the index of {@code pos} is updated
to the index after the last character used (parsing does not necessarily
use all characters up to the end of the string), and the parsed
object array is returned. The updated {@code pos} can be used to
indicate the starting point for the next call to this method.
If an error occurs, then the index of {@code pos} is not
changed, the error index of {@code pos} is set to the index of
the character where the error occurred, and null is returned.
<p>
See the {@link #parse(String, ParsePosition)} method for more information
on message parsing.

@param source A {@code String}, part of which should be parsed.
@param pos A {@code ParsePosition} object with index and error
           index information as described above.
@return An {@code Object} array parsed from the string. In case of
        error, returns null.
@throws NullPointerException if {@code pos} is null.

## MessageFormat.clone()

```java
public Object clone()
```

Creates and returns a copy of this object.

@return a clone of this instance.

## MessageFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code MessageFormat} for equality.
Returns true if the object is also a {@code MessageFormat} and the
two formats would format any value the same.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param  obj object to be compared for equality
@return {@code true} if the specified object is equal to this {@code MessageFormat}
@see Object#equals(Object)

## MessageFormat.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this {@code MessageFormat}}

@implSpec This method calculates the hash code value using the value returned by
{@link #toPattern()}.
@see Object#hashCode()

## MessageFormat.toString()

```java
public String toString()
```

{@return a string identifying this {@code MessageFormat}, for debugging}

## MessageFormat.Field(String)

```java
protected Field(String name)
```

Creates a Field with the specified name.

@param name Name of the attribute

## MessageFormat.readResolve()

```java
protected Object readResolve() throws InvalidObjectException
```

Resolves instances being deserialized to the predefined constants.

@throws InvalidObjectException if the constant could not be
        resolved.
@return resolved MessageFormat.Field constant

## MessageFormat.ARGUMENT

```java
public static final Field ARGUMENT
```

Constant identifying a portion of a message that was generated
from an argument passed into {@code formatToCharacterIterator}.
The value associated with the key will be an {@code Integer}
indicating the index in the {@code arguments} array of the
argument from which the text was generated.