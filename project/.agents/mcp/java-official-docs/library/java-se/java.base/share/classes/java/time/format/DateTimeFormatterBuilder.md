# DateTimeFormatterBuilder class (java.time.format)

```java
public final class DateTimeFormatterBuilder
```

Builder to create date-time formatters.
<p>
This allows a {@code DateTimeFormatter} to be created.
All date-time formatters are created ultimately using this builder.
<p>
The basic elements of date-time can all be added:
<ul>
<li>Value - a numeric value</li>
<li>Fraction - a fractional value including the decimal place. Always use this when
outputting fractions to ensure that the fraction is parsed correctly</li>
<li>Text - the textual equivalent for the value</li>
<li>OffsetId/Offset - the {@linkplain ZoneOffset zone offset}</li>
<li>ZoneId - the {@linkplain ZoneId time-zone} id</li>
<li>ZoneText - the name of the time-zone</li>
<li>ChronologyId - the {@linkplain Chronology chronology} id</li>
<li>ChronologyText - the name of the chronology</li>
<li>Literal - a text literal</li>
<li>Nested and Optional - formats can be nested or made optional</li>
</ul>
In addition, any of the elements may be decorated by padding, either with spaces or any other character.
<p>
Finally, a shorthand pattern, mostly compatible with {@code java.text.SimpleDateFormat SimpleDateFormat}
can be used, see {@link #appendPattern(String)}.
In practice, this simply parses the pattern and calls other methods on the builder.

@implSpec
This class is a mutable builder intended for use from a single thread.

@since 1.8

## DateTimeFormatterBuilder.getLocalizedDateTimePattern(FormatStyle, FormatStyle, Chronology, Locale)

```java
public static String getLocalizedDateTimePattern(FormatStyle dateStyle, FormatStyle timeStyle, Chronology chrono, Locale locale)
```

Gets the formatting pattern for date and time styles for a locale and chronology.
The locale and chronology are used to lookup the locale specific format
for the requested dateStyle and/or timeStyle.
<p>
If the locale contains the "rg" (region override)
<a href="../../util/Locale.html#def_locale_extension">Unicode extensions</a>,
the formatting pattern is overridden with the one appropriate for the region.

@param dateStyle  the FormatStyle for the date, null for time-only pattern
@param timeStyle  the FormatStyle for the time, null for date-only pattern
@param chrono  the Chronology, non-null
@param locale  the locale, non-null
@return the locale and Chronology specific formatting pattern
@throws IllegalArgumentException if both dateStyle and timeStyle are null

## DateTimeFormatterBuilder.getLocalizedDateTimePattern(String, Chronology, Locale)

```java
public static String getLocalizedDateTimePattern(String requestedTemplate, Chronology chrono, Locale locale)
```

Returns the formatting pattern for the requested template for a locale and chronology.
The locale and chronology are used to lookup the locale specific format
for the requested template.
<p>
If the locale contains the "rg" (region override)
<a href="../../util/Locale.html#def_locale_extension">Unicode extensions</a>,
the formatting pattern is overridden with the one appropriate for the region.
<p>
Refer to {@link #appendLocalized(String)} for the detail of {@code requestedTemplate}
argument.

@param requestedTemplate the requested template, not null
@param chrono  the Chronology, non-null
@param locale  the locale, non-null
@return the locale and Chronology specific formatting pattern
@throws IllegalArgumentException if {@code requestedTemplate} does not match
     the regular expression syntax described in {@link #appendLocalized(String)}.
@throws DateTimeException if a match for the localized pattern for
     {@code requestedTemplate} is not available
@see #appendLocalized(String)
@since 19

## DateTimeFormatterBuilder.DateTimeFormatterBuilder()

```java
public DateTimeFormatterBuilder()
```

Constructs a new instance of the builder.

## DateTimeFormatterBuilder.parseCaseSensitive()

```java
public DateTimeFormatterBuilder parseCaseSensitive()
```

Changes the parse style to be case sensitive for the remainder of the formatter.
<p>
Parsing can be case sensitive or insensitive - by default it is case sensitive.
This method allows the case sensitivity setting of parsing to be changed.
<p>
Calling this method changes the state of the builder such that all
subsequent builder method calls will parse text in case sensitive mode.
See {@link #parseCaseInsensitive} for the opposite setting.
The parse case sensitive/insensitive methods may be called at any point
in the builder, thus the parser can swap between case parsing modes
multiple times during the parse.
<p>
Since the default is case sensitive, this method should only be used after
a previous call to {@code #parseCaseInsensitive}.

@return this, for chaining, not null

## DateTimeFormatterBuilder.parseCaseInsensitive()

```java
public DateTimeFormatterBuilder parseCaseInsensitive()
```

Changes the parse style to be case insensitive for the remainder of the formatter.
<p>
Parsing can be case sensitive or insensitive - by default it is case sensitive.
This method allows the case sensitivity setting of parsing to be changed.
<p>
Calling this method changes the state of the builder such that all
subsequent builder method calls will parse text in case insensitive mode.
See {@link #parseCaseSensitive()} for the opposite setting.
The parse case sensitive/insensitive methods may be called at any point
in the builder, thus the parser can swap between case parsing modes
multiple times during the parse.

@return this, for chaining, not null

## DateTimeFormatterBuilder.parseStrict()

```java
public DateTimeFormatterBuilder parseStrict()
```

Changes the parse style to be strict for the remainder of the formatter.
<p>
Parsing can be strict or lenient - by default it is strict.
This controls the degree of flexibility in matching the text and sign styles.
<p>
When used, this method changes the parsing to be strict from this point onwards.
As strict is the default, this is normally only needed after calling {@link #parseLenient()}.
The change will remain in force until the end of the formatter that is eventually
constructed or until {@code parseLenient} is called.

@implSpec A {@link Character#SPACE_SEPARATOR SPACE_SEPARATOR} in the input
text will not match any other {@link Character#SPACE_SEPARATOR SPACE_SEPARATOR}s
in the pattern with the strict parse style.

@return this, for chaining, not null

## DateTimeFormatterBuilder.parseLenient()

```java
public DateTimeFormatterBuilder parseLenient()
```

Changes the parse style to be lenient for the remainder of the formatter.
Note that case sensitivity is set separately to this method.
<p>
Parsing can be strict or lenient - by default it is strict.
This controls the degree of flexibility in matching the text and sign styles.
Applications calling this method should typically also call {@link #parseCaseInsensitive()}.
<p>
When used, this method changes the parsing to be lenient from this point onwards.
The change will remain in force until the end of the formatter that is eventually
constructed or until {@code parseStrict} is called.

@implSpec A {@link Character#SPACE_SEPARATOR SPACE_SEPARATOR} in the input
text will match any other {@link Character#SPACE_SEPARATOR SPACE_SEPARATOR}s
in the pattern with the lenient parse style.

@return this, for chaining, not null

## DateTimeFormatterBuilder.parseDefaulting(TemporalField, long)

```java
public DateTimeFormatterBuilder parseDefaulting(TemporalField field, long value)
```

Appends a default value for a field to the formatter for use in parsing.
<p>
This appends an instruction to the builder to inject a default value
into the parsed result. This is especially useful in conjunction with
optional parts of the formatter.
<p>
For example, consider a formatter that parses the year, followed by
an optional month, with a further optional day-of-month. Using such a
formatter would require the calling code to check whether a full date,
year-month or just a year had been parsed. This method can be used to
default the month and day-of-month to a sensible value, such as the
first of the month, allowing the calling code to always get a date.
<p>
During formatting, this method has no effect.
<p>
During parsing, the current state of the parse is inspected.
If the specified field has no associated value, because it has not been
parsed successfully at that point, then the specified value is injected
into the parse result. Injection is immediate, thus the field-value pair
will be visible to any subsequent elements in the formatter.
As such, this method is normally called at the end of the builder.

@param field  the field to default the value of, not null
@param value  the value to default the field to
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendValue(TemporalField)

```java
public DateTimeFormatterBuilder appendValue(TemporalField field)
```

Appends the value of a date-time field to the formatter using a normal
output style.
<p>
The value of the field will be output during a format.
If the value cannot be obtained then an exception will be thrown.
<p>
The value will be printed as per the normal format of an integer value.
Only negative numbers will be signed. No padding will be added.
<p>
The parser for a variable width value such as this normally behaves greedily,
requiring one digit, but accepting as many digits as possible.
This behavior can be affected by 'adjacent value parsing'.
See {@link #appendValue(java.time.temporal.TemporalField, int)} for full details.

@param field  the field to append, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendValue(TemporalField, int)

```java
public DateTimeFormatterBuilder appendValue(TemporalField field, int width)
```

Appends the value of a date-time field to the formatter using a fixed
width, zero-padded approach.
<p>
The value of the field will be output during a format.
If the value cannot be obtained then an exception will be thrown.
<p>
The value will be zero-padded on the left. If the size of the value
means that it cannot be printed within the width then an exception is thrown.
If the value of the field is negative then an exception is thrown during formatting.
<p>
This method supports a special technique of parsing known as 'adjacent value parsing'.
This technique solves the problem where a value, variable or fixed width, is followed by one or more
fixed length values. The standard parser is greedy, and thus it would normally
steal the digits that are needed by the fixed width value parsers that follow the
variable width one.
<p>
No action is required to initiate 'adjacent value parsing'.
When a call to {@code appendValue} is made, the builder
enters adjacent value parsing setup mode. If the immediately subsequent method
call or calls on the same builder are for a fixed width value, then the parser will reserve
space so that the fixed width values can be parsed.
<p>
For example, consider {@code builder.appendValue(YEAR).appendValue(MONTH_OF_YEAR, 2);}
The year is a variable width parse of between 1 and 19 digits.
The month is a fixed width parse of 2 digits.
Because these were appended to the same builder immediately after one another,
the year parser will reserve two digits for the month to parse.
Thus, the text '201106' will correctly parse to a year of 2011 and a month of 6.
Without adjacent value parsing, the year would greedily parse all six digits and leave
nothing for the month.
<p>
Adjacent value parsing applies to each set of fixed width not-negative values in the parser
that immediately follow any kind of value, variable or fixed width.
Calling any other append method will end the setup of adjacent value parsing.
Thus, in the unlikely event that you need to avoid adjacent value parsing behavior,
simply add the {@code appendValue} to another {@code DateTimeFormatterBuilder}
and add that to this builder.
<p>
If adjacent parsing is active, then parsing must match exactly the specified
number of digits in both strict and lenient modes.
In addition, no positive or negative sign is permitted.

@param field  the field to append, not null
@param width  the width of the printed field, from 1 to 19
@return this, for chaining, not null
@throws IllegalArgumentException if the width is invalid

## DateTimeFormatterBuilder.appendValue(TemporalField, int, int, SignStyle)

```java
public DateTimeFormatterBuilder appendValue( TemporalField field, int minWidth, int maxWidth, SignStyle signStyle)
```

Appends the value of a date-time field to the formatter providing full
control over formatting.
<p>
The value of the field will be output during a format.
If the value cannot be obtained then an exception will be thrown.
<p>
This method provides full control of the numeric formatting, including
zero-padding and the positive/negative sign.
<p>
The parser for a variable width value such as this normally behaves greedily,
accepting as many digits as possible.
This behavior can be affected by 'adjacent value parsing'.
See {@link #appendValue(java.time.temporal.TemporalField, int)} for full details.
<p>
In strict parsing mode, the minimum number of parsed digits is {@code minWidth}
and the maximum is {@code maxWidth}.
In lenient parsing mode, the minimum number of parsed digits is one
and the maximum is 19 (except as limited by adjacent value parsing).
<p>
If this method is invoked with equal minimum and maximum widths and a sign style of
{@code NOT_NEGATIVE} then it delegates to {@code appendValue(TemporalField,int)}.
In this scenario, the formatting and parsing behavior described there occur.

@param field  the field to append, not null
@param minWidth  the minimum field width of the printed field, from 1 to 19
@param maxWidth  the maximum field width of the printed field, from 1 to 19
@param signStyle  the positive/negative output style, not null
@return this, for chaining, not null
@throws IllegalArgumentException if the widths are invalid

## DateTimeFormatterBuilder.appendValueReduced(TemporalField, int, int, int)

```java
public DateTimeFormatterBuilder appendValueReduced(TemporalField field, int width, int maxWidth, int baseValue)
```

Appends the reduced value of a date-time field to the formatter.
<p>
Since fields such as year vary by chronology, it is recommended to use the
{@link #appendValueReduced(TemporalField, int, int, ChronoLocalDate)} date}
variant of this method in most cases. This variant is suitable for
simple fields or working with only the ISO chronology.
<p>
For formatting, the {@code width} and {@code maxWidth} are used to
determine the number of characters to format.
If they are equal then the format is fixed width.
If the value of the field is within the range of the {@code baseValue} using
{@code width} characters then the reduced value is formatted otherwise the value is
truncated to fit {@code maxWidth}.
The rightmost characters are output to match the width, left padding with zero.
<p>
For strict parsing, the number of characters allowed by {@code width} to {@code maxWidth} are parsed.
For lenient parsing, the number of characters must be at least 1 and less than 10.
If the number of digits parsed is equal to {@code width} and the value is positive,
the value of the field is computed to be the first number greater than
or equal to the {@code baseValue} with the same least significant characters,
otherwise the value parsed is the field value.
This allows a reduced value to be entered for values in range of the baseValue
and width and absolute values can be entered for values outside the range.
<p>
For example, a base value of {@code 1980} and a width of {@code 2} will have
valid values from {@code 1980} to {@code 2079}.
During parsing, the text {@code "12"} will result in the value {@code 2012} as that
is the value within the range where the last two characters are "12".
By contrast, parsing the text {@code "1915"} will result in the value {@code 1915}.

@param field  the field to append, not null
@param width  the field width of the printed and parsed field, from 1 to 10
@param maxWidth  the maximum field width of the printed field, from 1 to 10
@param baseValue  the base value of the range of valid values
@return this, for chaining, not null
@throws IllegalArgumentException if the width or base value is invalid

## DateTimeFormatterBuilder.appendValueReduced(TemporalField, int, int, ChronoLocalDate)

```java
public DateTimeFormatterBuilder appendValueReduced( TemporalField field, int width, int maxWidth, ChronoLocalDate baseDate)
```

Appends the reduced value of a date-time field to the formatter.
<p>
This is typically used for formatting and parsing a two digit year.
<p>
The base date is used to calculate the full value during parsing.
For example, if the base date is 1950-01-01 then parsed values for
a two digit year parse will be in the range 1950-01-01 to 2049-12-31.
Only the year would be extracted from the date, thus a base date of
1950-08-25 would also parse to the range 1950-01-01 to 2049-12-31.
This behavior is necessary to support fields such as week-based-year
or other calendar systems where the parsed value does not align with
standard ISO years.
<p>
The exact behavior is as follows. Parse the full set of fields and
determine the effective chronology using the last chronology if
it appears more than once. Then convert the base date to the
effective chronology. Then extract the specified field from the
chronology-specific base date and use it to determine the
{@code baseValue} used below.
<p>
For formatting, the {@code width} and {@code maxWidth} are used to
determine the number of characters to format.
If they are equal then the format is fixed width.
If the value of the field is within the range of the {@code baseValue} using
{@code width} characters then the reduced value is formatted otherwise the value is
truncated to fit {@code maxWidth}.
The rightmost characters are output to match the width, left padding with zero.
<p>
For strict parsing, the number of characters allowed by {@code width} to {@code maxWidth} are parsed.
For lenient parsing, the number of characters must be at least 1 and less than 10.
If the number of digits parsed is equal to {@code width} and the value is positive,
the value of the field is computed to be the first number greater than
or equal to the {@code baseValue} with the same least significant characters,
otherwise the value parsed is the field value.
This allows a reduced value to be entered for values in range of the baseValue
and width and absolute values can be entered for values outside the range.
<p>
For example, a base value of {@code 1980} and a width of {@code 2} will have
valid values from {@code 1980} to {@code 2079}.
During parsing, the text {@code "12"} will result in the value {@code 2012} as that
is the value within the range where the last two characters are "12".
By contrast, parsing the text {@code "1915"} will result in the value {@code 1915}.

@param field  the field to append, not null
@param width  the field width of the printed and parsed field, from 1 to 10
@param maxWidth  the maximum field width of the printed field, from 1 to 10
@param baseDate  the base date used to calculate the base value for the range
 of valid values in the parsed chronology, not null
@return this, for chaining, not null
@throws IllegalArgumentException if the width or base value is invalid

## DateTimeFormatterBuilder.appendFraction(TemporalField, int, int, boolean)

```java
public DateTimeFormatterBuilder appendFraction( TemporalField field, int minWidth, int maxWidth, boolean decimalPoint)
```

Appends the fractional value of a date-time field to the formatter.
<p>
The fractional value of the field will be output including the
preceding decimal point. The preceding value is not output.
For example, the second-of-minute value of 15 would be output as {@code .25}.
<p>
The width of the printed fraction can be controlled. Setting the
minimum width to zero will cause no output to be generated.
The printed fraction will have the minimum width necessary between
the minimum and maximum widths - trailing zeroes are omitted.
No rounding occurs due to the maximum width - digits are simply dropped.
<p>
When parsing in strict mode, the number of parsed digits must be between
the minimum and maximum width. In strict mode, if the minimum and maximum widths
are equal and there is no decimal point then the parser will
participate in adjacent value parsing, see
{@link #appendValue(java.time.temporal.TemporalField, int)}. When parsing in lenient mode,
the minimum width is considered to be zero and the maximum is nine.
<p>
If the value cannot be obtained then an exception will be thrown.
If the value is negative an exception will be thrown.
If the field does not have a fixed set of valid values then an
exception will be thrown.
If the field value in the date-time to be printed is outside the
range of valid values then an exception will be thrown.

@param field  the field to append, not null
@param minWidth  the minimum width of the field excluding the decimal point, from 0 to 9
@param maxWidth  the maximum width of the field excluding the decimal point, from 1 to 9
@param decimalPoint  whether to output the localized decimal point symbol
@return this, for chaining, not null
@throws IllegalArgumentException if the field has a variable set of valid values or
 either width is invalid

## DateTimeFormatterBuilder.appendText(TemporalField)

```java
public DateTimeFormatterBuilder appendText(TemporalField field)
```

Appends the text of a date-time field to the formatter using the full
text style.
<p>
The text of the field will be output during a format.
The value must be within the valid range of the field.
If the value cannot be obtained then an exception will be thrown.
If the field has no textual representation, then the numeric value will be used.
<p>
The value will be printed as per the normal format of an integer value.
Only negative numbers will be signed. No padding will be added.

@param field  the field to append, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendText(TemporalField, TextStyle)

```java
public DateTimeFormatterBuilder appendText(TemporalField field, TextStyle textStyle)
```

Appends the text of a date-time field to the formatter.
<p>
The text of the field will be output during a format.
The value must be within the valid range of the field.
If the value cannot be obtained then an exception will be thrown.
If the field has no textual representation, then the numeric value will be used.
<p>
The value will be printed as per the normal format of an integer value.
Only negative numbers will be signed. No padding will be added.

@param field  the field to append, not null
@param textStyle  the text style to use, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendText(TemporalField, Map<Long, String>)

```java
public DateTimeFormatterBuilder appendText(TemporalField field, Map<Long, String> textLookup)
```

Appends the text of a date-time field to the formatter using the specified
map to supply the text.
<p>
The standard text outputting methods use the localized text in the JDK.
This method allows that text to be specified directly.
The supplied map is not validated by the builder to ensure that formatting or
parsing is possible, thus an invalid map may throw an error during later use.
<p>
Supplying the map of text provides considerable flexibility in formatting and parsing.
For example, a legacy application might require or supply the months of the
year as "JNY", "FBY", "MCH" etc. These do not match the standard set of text
for localized month names. Using this method, a map can be created which
defines the connection between each value and the text:
<pre>
Map&lt;Long, String&gt; map = new HashMap&lt;&gt;();
map.put(1L, "JNY");
map.put(2L, "FBY");
map.put(3L, "MCH");
...
builder.appendText(MONTH_OF_YEAR, map);
</pre>
<p>
Other uses might be to output the value with a suffix, such as "1st", "2nd", "3rd",
or as Roman numerals "I", "II", "III", "IV".
<p>
During formatting, the value is obtained and checked that it is in the valid range.
If text is not available for the value then it is output as a number.
During parsing, the parser will match against the map of text and numeric values.

@param field  the field to append, not null
@param textLookup  the map from the value to the text
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendInstant()

```java
public DateTimeFormatterBuilder appendInstant()
```

Appends an instant using ISO-8601 to the formatter, formatting fractional
digits in groups of three.
<p>
Instants have a fixed output format.
They are converted to a date-time with a zone-offset of UTC and formatted
using the standard ISO-8601 format.
With this method, formatting nano-of-second outputs zero, three, six
or nine digits as necessary.
The localized decimal style is not used.
<p>
The instant is obtained using {@link ChronoField#INSTANT_SECONDS INSTANT_SECONDS}
and optionally {@code NANO_OF_SECOND}. The value of {@code INSTANT_SECONDS}
may be outside the maximum range of {@code LocalDateTime}.
<p>
The {@linkplain ResolverStyle resolver style} has no effect on instant parsing.
The end-of-day time of '24:00' is handled as midnight at the start of the following day.
The leap-second time of '23:59:59' is handled to some degree, see
{@link DateTimeFormatter#parsedLeapSecond()} for full details.
<p>
When formatting, the instant will always be suffixed by 'Z' to indicate UTC.
When parsing, the behaviour of {@link DateTimeFormatterBuilder#appendOffsetId()}
will be used to parse the offset, converting the instant to UTC as necessary.
<p>
An alternative to this method is to format/parse the instant as a single
epoch-seconds value. That is achieved using {@code appendValue(INSTANT_SECONDS)}.

@return this, for chaining, not null

## DateTimeFormatterBuilder.appendInstant(int)

```java
public DateTimeFormatterBuilder appendInstant(int fractionalDigits)
```

Appends an instant using ISO-8601 to the formatter with control over
the number of fractional digits.
<p>
Instants have a fixed output format, although this method provides some
control over the fractional digits. They are converted to a date-time
with a zone-offset of UTC and printed using the standard ISO-8601 format.
The localized decimal style is not used.
<p>
The {@code fractionalDigits} parameter allows the output of the fractional
second to be controlled. Specifying zero will cause no fractional digits
to be output. From 1 to 9 will output an increasing number of digits, using
zero right-padding if necessary. The special value -1 is used to output as
many digits as necessary to avoid any trailing zeroes.
<p>
When parsing in strict mode, the number of parsed digits must match the
fractional digits. When parsing in lenient mode, any number of fractional
digits from zero to nine are accepted.
<p>
The instant is obtained using {@link ChronoField#INSTANT_SECONDS INSTANT_SECONDS}
and optionally {@code NANO_OF_SECOND}. The value of {@code INSTANT_SECONDS}
may be outside the maximum range of {@code LocalDateTime}.
<p>
The {@linkplain ResolverStyle resolver style} has no effect on instant parsing.
The end-of-day time of '24:00' is handled as midnight at the start of the following day.
The leap-second time of '23:59:60' is handled to some degree, see
{@link DateTimeFormatter#parsedLeapSecond()} for full details.
<p>
An alternative to this method is to format/parse the instant as a single
epoch-seconds value. That is achieved using {@code appendValue(INSTANT_SECONDS)}.

@param fractionalDigits  the number of fractional second digits to format with,
 from 0 to 9, or -1 to use as many digits as necessary
@return this, for chaining, not null
@throws IllegalArgumentException if the number of fractional digits is invalid

## DateTimeFormatterBuilder.appendOffsetId()

```java
public DateTimeFormatterBuilder appendOffsetId()
```

Appends the zone offset, such as '+01:00', to the formatter.
<p>
This appends an instruction to format/parse the offset ID to the builder.
This is equivalent to calling {@code appendOffset("+HH:mm:ss", "Z")}.
See {@link #appendOffset(String, String)} for details on formatting
and parsing.

@return this, for chaining, not null

## DateTimeFormatterBuilder.appendOffset(String, String)

```java
public DateTimeFormatterBuilder appendOffset(String pattern, String noOffsetText)
```

Appends the zone offset, such as '+01:00', to the formatter.
<p>
This appends an instruction to format/parse the offset ID to the builder.
<p>
During formatting, the offset is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#offset()}.
It will be printed using the format defined below.
If the offset cannot be obtained then an exception is thrown unless the
section of the formatter is optional.
<p>
When parsing in strict mode, the input must contain the mandatory
and optional elements are defined by the specified pattern.
If the offset cannot be parsed then an exception is thrown unless
the section of the formatter is optional.
<p>
When parsing in lenient mode, only the hours are mandatory - minutes
and seconds are optional. The colons are required if the specified
pattern contains a colon. If the specified pattern is "+HH", the
presence of colons is determined by whether the character after the
hour digits is a colon or not.
If the offset cannot be parsed then an exception is thrown unless
the section of the formatter is optional.
<p>
The format of the offset is controlled by a pattern which must be one
of the following:
<ul>
<li>{@code +HH} - hour only, ignoring minute and second
<li>{@code +HHmm} - hour, with minute if non-zero, ignoring second, no colon
<li>{@code +HH:mm} - hour, with minute if non-zero, ignoring second, with colon
<li>{@code +HHMM} - hour and minute, ignoring second, no colon
<li>{@code +HH:MM} - hour and minute, ignoring second, with colon
<li>{@code +HHMMss} - hour and minute, with second if non-zero, no colon
<li>{@code +HH:MM:ss} - hour and minute, with second if non-zero, with colon
<li>{@code +HHMMSS} - hour, minute and second, no colon
<li>{@code +HH:MM:SS} - hour, minute and second, with colon
<li>{@code +HHmmss} - hour, with minute if non-zero or with minute and
second if non-zero, no colon
<li>{@code +HH:mm:ss} - hour, with minute if non-zero or with minute and
second if non-zero, with colon
<li>{@code +H} - hour only, ignoring minute and second
<li>{@code +Hmm} - hour, with minute if non-zero, ignoring second, no colon
<li>{@code +H:mm} - hour, with minute if non-zero, ignoring second, with colon
<li>{@code +HMM} - hour and minute, ignoring second, no colon
<li>{@code +H:MM} - hour and minute, ignoring second, with colon
<li>{@code +HMMss} - hour and minute, with second if non-zero, no colon
<li>{@code +H:MM:ss} - hour and minute, with second if non-zero, with colon
<li>{@code +HMMSS} - hour, minute and second, no colon
<li>{@code +H:MM:SS} - hour, minute and second, with colon
<li>{@code +Hmmss} - hour, with minute if non-zero or with minute and
second if non-zero, no colon
<li>{@code +H:mm:ss} - hour, with minute if non-zero or with minute and
second if non-zero, with colon
</ul>
Patterns containing "HH" will format and parse a two digit hour,
zero-padded if necessary. Patterns containing "H" will format with no
zero-padding, and parse either one or two digits.
In lenient mode, the parser will be greedy and parse the maximum digits possible.
The "no offset" text controls what text is printed when the total amount of
the offset fields to be output is zero.
Example values would be 'Z', '+00:00', 'UTC' or 'GMT'.
Three formats are accepted for parsing UTC - the "no offset" text, and the
plus and minus versions of zero defined by the pattern.

@param pattern  the pattern to use, not null
@param noOffsetText  the text to use when the offset is zero, not null
@return this, for chaining, not null
@throws IllegalArgumentException if the pattern is invalid

## DateTimeFormatterBuilder.appendLocalizedOffset(TextStyle)

```java
public DateTimeFormatterBuilder appendLocalizedOffset(TextStyle style)
```

Appends the localized zone offset, such as 'GMT+01:00', to the formatter.
<p>
This appends a localized zone offset to the builder, the format of the
localized offset is controlled by the specified {@link FormatStyle style}
to this method:
<ul>
<li>{@link TextStyle#FULL full} - formats with localized offset text, such
as 'GMT, 2-digit hour and minute field, optional second field if non-zero,
and colon.
<li>{@link TextStyle#SHORT short} - formats with localized offset text,
such as 'GMT, hour without leading zero, optional 2-digit minute and
second if non-zero, and colon.
</ul>
<p>
During formatting, the offset is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#offset()}.
If the offset cannot be obtained then an exception is thrown unless the
section of the formatter is optional.
<p>
During parsing, the offset is parsed using the format defined above.
If the offset cannot be parsed then an exception is thrown unless the
section of the formatter is optional.

@param style  the format style to use, not null
@return this, for chaining, not null
@throws IllegalArgumentException if style is neither {@link TextStyle#FULL
full} nor {@link TextStyle#SHORT short}

## DateTimeFormatterBuilder.appendZoneId()

```java
public DateTimeFormatterBuilder appendZoneId()
```

Appends the time-zone ID, such as 'Europe/Paris' or '+02:00', to the formatter.
<p>
This appends an instruction to format/parse the zone ID to the builder.
The zone ID is obtained in a strict manner suitable for {@code ZonedDateTime}.
By contrast, {@code OffsetDateTime} does not have a zone ID suitable
for use with this method, see {@link #appendZoneOrOffsetId()}.
<p>
During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#zoneId()}.
It will be printed using the result of {@link ZoneId#getId()}.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.
<p>
During parsing, the text must match a known zone or offset.
There are two types of zone ID, offset-based, such as '+01:30' and
region-based, such as 'Europe/London'. These are parsed differently.
If the parse starts with '+' or '-', then the parser expects an
offset-based zone and will not match region-based zones. The offset
ID parsing is equivalent to using {@link #appendOffset(String, String)}
using the arguments 'HH:MM:ss' and the no offset string '0'.
If the parse starts with 'UT', 'UTC' or 'GMT', and the parser can
match a following offset, then a region-based zone with the parsed
offset will be returned, or else if the parser cannot match a following
offset, then {@link ZoneOffset#UTC} is selected.
In all other cases, the list of known region-based zones is used to
find the longest available match. If no match is found, and the parse
starts with 'Z', then {@code ZoneOffset.UTC} is selected.
The parser uses the {@linkplain #parseCaseInsensitive() case sensitive} setting.
<p>
For example, the following will parse:
<pre>
  "Europe/London"           -- ZoneId.of("Europe/London")
  "Z"                       -- ZoneOffset.UTC
  "UT"                      -- ZoneId.of("UT")
  "UTC"                     -- ZoneId.of("UTC")
  "GMT"                     -- ZoneId.of("GMT")
  "+01:30"                  -- ZoneOffset.of("+01:30")
  "UT+01:30"                -- ZoneId.of("UT+01:30")
  "UTC+01:30"               -- ZoneId.of("UTC+01:30")
  "GMT+01:30"               -- ZoneId.of("GMT+01:30")
</pre>

@return this, for chaining, not null
@see #appendZoneRegionId()

## DateTimeFormatterBuilder.appendZoneRegionId()

```java
public DateTimeFormatterBuilder appendZoneRegionId()
```

Appends the time-zone region ID, such as 'Europe/Paris', to the formatter,
rejecting the zone ID if it is a {@code ZoneOffset}.
<p>
This appends an instruction to format only region-based zone IDs to the builder.
<p>
During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#zoneId()}.
If the zone is a {@code ZoneOffset} or it cannot be obtained then
an exception is thrown unless the section of the formatter is optional.
If the zone is not an offset, then the zone will be printed using
the zone ID from {@link ZoneId#getId()}.
<p>
During parsing, the text must match a known zone or offset.
There are two types of zone ID, offset-based, such as '+01:30' and
region-based, such as 'Europe/London'. These are parsed differently.
If the parse starts with '+' or '-', then the parser expects an
offset-based zone and will not match region-based zones. The offset
ID parsing is equivalent to using {@link #appendOffset(String, String)}
using the arguments 'HH:MM:ss' and the no offset string '0'.
If the parse starts with 'UT', 'UTC' or 'GMT', and the parser can
match a following offset, then a region-based zone with the parsed
offset will be returned, or else if the parser cannot match a following
offset, then {@link ZoneOffset#UTC} is selected.
In all other cases, the list of known region-based zones is used to
find the longest available match. If no match is found, and the parse
starts with 'Z', then {@code ZoneOffset.UTC} is selected.
The parser uses the {@linkplain #parseCaseInsensitive() case sensitive} setting.
<p>
For example, the following will parse:
<pre>
  "Europe/London"           -- ZoneId.of("Europe/London")
  "Z"                       -- ZoneOffset.UTC
  "UT"                      -- ZoneId.of("UT")
  "UTC"                     -- ZoneId.of("UTC")
  "GMT"                     -- ZoneId.of("GMT")
  "+01:30"                  -- ZoneOffset.of("+01:30")
  "UT+01:30"                -- ZoneId.of("UT+01:30")
  "UTC+01:30"               -- ZoneId.of("UTC+01:30")
  "GMT+01:30"               -- ZoneId.of("GMT+01:30")
</pre>
<p>
Note that this method is identical to {@code appendZoneId()} except
in the mechanism used to obtain the zone.
Note also that parsing accepts offsets, whereas formatting will never
produce one.

@return this, for chaining, not null
@see #appendZoneId()

## DateTimeFormatterBuilder.appendZoneOrOffsetId()

```java
public DateTimeFormatterBuilder appendZoneOrOffsetId()
```

Appends the time-zone ID, such as 'Europe/Paris' or '+02:00', to
the formatter, using the best available zone ID.
<p>
This appends an instruction to format/parse the best available
zone or offset ID to the builder.
The zone ID is obtained in a lenient manner that first attempts to
find a true zone ID, such as that on {@code ZonedDateTime}, and
then attempts to find an offset, such as that on {@code OffsetDateTime}.
<p>
During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#zone()}.
It will be printed using the result of {@link ZoneId#getId()}.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.
<p>
During parsing, the text must match a known zone or offset.
There are two types of zone ID, offset-based, such as '+01:30' and
region-based, such as 'Europe/London'. These are parsed differently.
If the parse starts with '+' or '-', then the parser expects an
offset-based zone and will not match region-based zones. The offset
ID parsing is equivalent to using {@link #appendOffset(String, String)}
using the arguments 'HH:MM:ss' and the no offset string '0'.
If the parse starts with 'UT', 'UTC' or 'GMT', and the parser can
match a following offset, then a region-based zone with the parsed
offset will be returned, or else if the parser cannot match a following
offset, then {@link ZoneOffset#UTC} is selected.
In all other cases, the list of known region-based zones is used to
find the longest available match. If no match is found, and the parse
starts with 'Z', then {@code ZoneOffset.UTC} is selected.
The parser uses the {@linkplain #parseCaseInsensitive() case sensitive} setting.
<p>
For example, the following will parse:
<pre>
  "Europe/London"           -- ZoneId.of("Europe/London")
  "Z"                       -- ZoneOffset.UTC
  "UT"                      -- ZoneId.of("UT")
  "UTC"                     -- ZoneId.of("UTC")
  "GMT"                     -- ZoneId.of("GMT")
  "+01:30"                  -- ZoneOffset.of("+01:30")
  "UT+01:30"                -- ZoneId.of("UT+01:30")
  "UTC+01:30"               -- ZoneId.of("UTC+01:30")
  "GMT+01:30"               -- ZoneId.of("GMT+01:30")
</pre>
<p>
Note that this method is identical to {@code appendZoneId()} except
in the mechanism used to obtain the zone.

@return this, for chaining, not null
@see #appendZoneId()

## DateTimeFormatterBuilder.appendZoneText(TextStyle)

```java
public DateTimeFormatterBuilder appendZoneText(TextStyle textStyle)
```

Appends the time-zone name, such as 'British Summer Time', to the formatter.
<p>
This appends an instruction to format/parse the textual name of the zone to
the builder.
<p>
During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#zoneId()}.
If the zone is a {@code ZoneOffset} it will be printed using the
result of {@link ZoneOffset#getId()}.
If the zone is not an offset, the textual name will be looked up
for the locale set in the {@link DateTimeFormatter}.
If the temporal object being printed represents an instant, or if it is a
local date-time that is not in a daylight saving gap or overlap then
the text will be the summer or winter time text as appropriate.
If the lookup for text does not find any suitable result, then the
{@link ZoneId#getId() ID} will be printed.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.
<p>
During parsing, either the textual zone name, the zone ID or the offset
is accepted. Many textual zone names are not unique, such as CST can be
for both "Central Standard Time" and "China Standard Time". In this
situation, the zone id will be determined by the region information from
formatter's  {@link DateTimeFormatter#getLocale() locale} and the standard
zone id for that area, for example, America/New_York for the America Eastern
zone. The {@link #appendZoneText(TextStyle, Set)} may be used
to specify a set of preferred {@link ZoneId} in this situation.

@param textStyle  the text style to use, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendZoneText(TextStyle, Set<ZoneId>)

```java
public DateTimeFormatterBuilder appendZoneText(TextStyle textStyle, Set<ZoneId> preferredZones)
```

Appends the time-zone name, such as 'British Summer Time', to the formatter.
<p>
This appends an instruction to format/parse the textual name of the zone to
the builder.
<p>
During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#zoneId()}.
If the zone is a {@code ZoneOffset} it will be printed using the
result of {@link ZoneOffset#getId()}.
If the zone is not an offset, the textual name will be looked up
for the locale set in the {@link DateTimeFormatter}.
If the temporal object being printed represents an instant, or if it is a
local date-time that is not in a daylight saving gap or overlap, then the text
will be the summer or winter time text as appropriate.
If the lookup for text does not find any suitable result, then the
{@link ZoneId#getId() ID} will be printed.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.
<p>
During parsing, either the textual zone name, the zone ID or the offset
is accepted. Many textual zone names are not unique, such as CST can be
for both "Central Standard Time" and "China Standard Time". In this
situation, the zone id will be determined by the region information from
formatter's  {@link DateTimeFormatter#getLocale() locale} and the standard
zone id for that area, for example, America/New_York for the America Eastern
zone. This method also allows a set of preferred {@link ZoneId} to be
specified for parsing. The matched preferred zone id will be used if the
textural zone name being parsed is not unique.
<p>
If the zone cannot be parsed then an exception is thrown unless the
section of the formatter is optional.

@param textStyle  the text style to use, not null
@param preferredZones  the set of preferred zone ids, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendGenericZoneText(TextStyle)

```java
public DateTimeFormatterBuilder appendGenericZoneText(TextStyle textStyle)
```

Appends the generic time-zone name, such as 'Pacific Time', to the formatter.
<p>
This appends an instruction to format/parse the generic textual
name of the zone to the builder. The generic name is the same throughout the whole
year, ignoring any daylight saving changes. For example, 'Pacific Time' is the
generic name, whereas 'Pacific Standard Time' and 'Pacific Daylight Time' are the
specific names, see {@link #appendZoneText(TextStyle)}.
<p>
During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#zoneId()}.
If the zone is a {@code ZoneOffset} it will be printed using the
result of {@link ZoneOffset#getId()}.
If the zone is not an offset, the textual name will be looked up
for the locale set in the {@link DateTimeFormatter}.
If the lookup for text does not find any suitable result, then the
{@link ZoneId#getId() ID} will be printed.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.
<p>
During parsing, either the textual zone name, the zone ID or the offset
is accepted. Many textual zone names are not unique, such as CST can be
for both "Central Standard Time" and "China Standard Time". In this
situation, the zone id will be determined by the region information from
formatter's  {@link DateTimeFormatter#getLocale() locale} and the standard
zone id for that area, for example, America/New_York for the America Eastern zone.
The {@link #appendGenericZoneText(TextStyle, Set)} may be used
to specify a set of preferred {@link ZoneId} in this situation.

@param textStyle  the text style to use, not null
@return this, for chaining, not null
@since 9

## DateTimeFormatterBuilder.appendGenericZoneText(TextStyle, Set<ZoneId>)

```java
public DateTimeFormatterBuilder appendGenericZoneText(TextStyle textStyle, Set<ZoneId> preferredZones)
```

Appends the generic time-zone name, such as 'Pacific Time', to the formatter.
<p>
This appends an instruction to format/parse the generic textual
name of the zone to the builder. The generic name is the same throughout the whole
year, ignoring any daylight saving changes. For example, 'Pacific Time' is the
generic name, whereas 'Pacific Standard Time' and 'Pacific Daylight Time' are the
specific names, see {@link #appendZoneText(TextStyle)}.
<p>
This method also allows a set of preferred {@link ZoneId} to be
specified for parsing. The matched preferred zone id will be used if the
textural zone name being parsed is not unique.
<p>
See {@link #appendGenericZoneText(TextStyle)} for details about
formatting and parsing.

@param textStyle  the text style to use, not null
@param preferredZones  the set of preferred zone ids, not null
@return this, for chaining, not null
@since 9

## DateTimeFormatterBuilder.appendChronologyId()

```java
public DateTimeFormatterBuilder appendChronologyId()
```

Appends the chronology ID, such as 'ISO' or 'ThaiBuddhist', to the formatter.
<p>
This appends an instruction to format/parse the chronology ID to the builder.
<p>
During formatting, the chronology is obtained using a mechanism equivalent
to querying the temporal with {@link TemporalQueries#chronology()}.
It will be printed using the result of {@link Chronology#getId()}.
If the chronology cannot be obtained then an exception is thrown unless the
section of the formatter is optional.
<p>
During parsing, the chronology is parsed and must match one of the chronologies
in {@link Chronology#getAvailableChronologies()}.
If the chronology cannot be parsed then an exception is thrown unless the
section of the formatter is optional.
The parser uses the {@linkplain #parseCaseInsensitive() case sensitive} setting.

@return this, for chaining, not null

## DateTimeFormatterBuilder.appendChronologyText(TextStyle)

```java
public DateTimeFormatterBuilder appendChronologyText(TextStyle textStyle)
```

Appends the chronology name to the formatter.
<p>
The calendar system name will be output during a format.
If the chronology cannot be obtained then an exception will be thrown.

@param textStyle  the text style to use, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendLocalized(FormatStyle, FormatStyle)

```java
public DateTimeFormatterBuilder appendLocalized(FormatStyle dateStyle, FormatStyle timeStyle)
```

Appends a localized date-time pattern to the formatter.
<p>
This appends a localized section to the builder, suitable for outputting
a date, time or date-time combination. The format of the localized
section is lazily looked up based on four items:
<ul>
<li>the {@code dateStyle} specified to this method
<li>the {@code timeStyle} specified to this method
<li>the {@code Locale} of the {@code DateTimeFormatter}
<li>the {@code Chronology}, selecting the best available
</ul>
During formatting, the chronology is obtained from the temporal object
being formatted, which may have been overridden by
{@link DateTimeFormatter#withChronology(Chronology)}.
The {@code FULL} and {@code LONG} styles typically require a time-zone.
When formatting using these styles, a {@code ZoneId} must be available,
either by using {@code ZonedDateTime} or {@link DateTimeFormatter#withZone}.
<p>
During parsing, if a chronology has already been parsed, then it is used.
Otherwise the default from {@code DateTimeFormatter.withChronology(Chronology)}
is used, with {@code IsoChronology} as the fallback.
<p>
Note that this method provides similar functionality to methods on
{@code DateFormat} such as {@link java.text.DateFormat#getDateTimeInstance(int, int)}.

@param dateStyle  the date style to use, null means no date required
@param timeStyle  the time style to use, null means no time required
@return this, for chaining, not null
@throws IllegalArgumentException if both the date and time styles are null

## DateTimeFormatterBuilder.appendLocalized(String)

```java
public DateTimeFormatterBuilder appendLocalized(String requestedTemplate)
```

Appends a localized pattern to the formatter using the requested template.
<p>
This appends a localized section to the builder, suitable for outputting
a date, time or date-time combination. The format of the localized
section is lazily looked up based on three items:
<ul>
<li>the {@code requestedTemplate} specified to this method
<li>the {@code Locale} of the {@code DateTimeFormatter}
<li>the {@code Chronology} of the {@code DateTimeFormatter} unless overridden
</ul>
During formatting, the chronology is obtained from the temporal object
being formatted, which may have been overridden by
{@link DateTimeFormatter#withChronology(Chronology)}.
<p>
During parsing, if a chronology has already been parsed, then it is used.
Otherwise the default from {@code DateTimeFormatter.withChronology(Chronology)}
is used, with {@code IsoChronology} as the fallback.
<p>
The requested template is a series of typical pattern
symbols in canonical order from the largest date or time unit to the smallest,
which can be expressed with the following regular expression:
{@snippet :
     "G{0,5}" +        // Era
     "y*" +            // Year
     "Q{0,5}" +        // Quarter
     "M{0,5}" +        // Month
     "w*" +            // Week of Week Based Year
     "E{0,5}" +        // Day of Week
     "d{0,2}" +        // Day of Month
     "B{0,5}" +        // Period/AmPm of Day
     "[hHjC]{0,2}" +   // Hour of Day/AmPm (refer to LDML for 'j' and 'C')
     "m{0,2}" +        // Minute of Hour
     "s{0,2}" +        // Second of Minute
     "[vz]{0,4}"       // Zone
}
All pattern symbols are optional, and each pattern symbol represents a field,
for example, 'M' represents the Month field. The number of the pattern symbol letters follows the
same presentation, such as "number" or "text" as in the
<a href="./DateTimeFormatter.html#patterns">Patterns for Formatting and Parsing</a> section.
Other pattern symbols in the requested template are invalid.
<p>
The mapping of the requested template to the closest of the available localized formats
is defined by the
<a href="https://www.unicode.org/reports/tr35/tr35-dates.html#availableFormats_appendItems">
Unicode LDML specification</a>. For example, the formatter created from the requested template
{@code yMMM} will format the date '2020-06-16' to 'Jun 2020' in the {@link Locale#US US locale}.

@param requestedTemplate the requested template to use, not null
@return this, for chaining, not null
@throws IllegalArgumentException if {@code requestedTemplate} is invalid

@spec https://www.unicode.org/reports/tr35 Unicode Locale Data Markup Language (LDML)
@see #appendPattern(String)
@since 19

## DateTimeFormatterBuilder.appendLiteral(char)

```java
public DateTimeFormatterBuilder appendLiteral(char literal)
```

Appends a character literal to the formatter.
<p>
This character will be output during a format.

@param literal  the literal to append, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendLiteral(String)

```java
public DateTimeFormatterBuilder appendLiteral(String literal)
```

Appends a string literal to the formatter.
<p>
This string will be output during a format.
<p>
If the literal is empty, nothing is added to the formatter.

@param literal  the literal to append, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendDayPeriodText(TextStyle)

```java
public DateTimeFormatterBuilder appendDayPeriodText(TextStyle style)
```

Appends the day period text to the formatter.
<p>
This appends an instruction to format/parse the textual name of the day period
to the builder. Day periods are defined in LDML's
<a href="https://unicode.org/reports/tr35/tr35-dates.html#dayPeriods">"day periods"
</a> element.
<p>
During formatting, the day period is obtained from {@code HOUR_OF_DAY}, and
optionally {@code MINUTE_OF_HOUR} if exist. It will be mapped to a day period
type defined in LDML, such as "morning1" and then it will be translated into
text. Mapping to a day period type and its translation both depend on the
locale in the formatter.
<p>
During parsing, the text will be parsed into a day period type first. Then
the parsed day period is combined with other fields to make a {@code LocalTime} in
the resolving phase. If the {@code HOUR_OF_AMPM} field is present, it is combined
with the day period to make {@code HOUR_OF_DAY} taking into account any
{@code MINUTE_OF_HOUR} value. If {@code HOUR_OF_DAY} is present, it is validated
against the day period taking into account any {@code MINUTE_OF_HOUR} value. If a
day period is present without {@code HOUR_OF_DAY}, {@code MINUTE_OF_HOUR},
{@code SECOND_OF_MINUTE} and {@code NANO_OF_SECOND} then the midpoint of the
day period is set as the time in {@code SMART} and {@code LENIENT} mode.
For example, if the parsed day period type is "night1" and the period defined
for it in the formatter locale is from 21:00 to 06:00, then it results in
the {@code LocalTime} of 01:30.
If the resolved time conflicts with the day period, {@code DateTimeException} is
thrown in {@code STRICT} and {@code SMART} mode. In {@code LENIENT} mode, no
exception is thrown and the parsed day period is ignored.
<p>
The "midnight" type allows both "00:00" as the start-of-day and "24:00" as the
end-of-day, as long as they are valid with the resolved hour field.

@param style the text style to use, not null
@return this, for chaining, not null

@spec https://www.unicode.org/reports/tr35 Unicode Locale Data Markup Language (LDML)
@since 16

## DateTimeFormatterBuilder.append(DateTimeFormatter)

```java
public DateTimeFormatterBuilder append(DateTimeFormatter formatter)
```

Appends all the elements of a formatter to the builder.
<p>
This method has the same effect as appending each of the constituent
parts of the formatter directly to this builder.

@param formatter  the formatter to add, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendOptional(DateTimeFormatter)

```java
public DateTimeFormatterBuilder appendOptional(DateTimeFormatter formatter)
```

Appends a formatter to the builder which will optionally format/parse.
<p>
This method has the same effect as appending each of the constituent
parts directly to this builder surrounded by an {@link #optionalStart()} and
{@link #optionalEnd()}.
<p>
The formatter will format if data is available for all the fields contained within it.
The formatter will parse if the string matches, otherwise no error is returned.

@param formatter  the formatter to add, not null
@return this, for chaining, not null

## DateTimeFormatterBuilder.appendPattern(String)

```java
public DateTimeFormatterBuilder appendPattern(String pattern)
```

Appends the elements defined by the specified pattern to the builder.
<p>
All letters 'A' to 'Z' and 'a' to 'z' are reserved as pattern letters.
The characters '#', '{' and '}' are reserved for future use.
The characters '[' and ']' indicate optional patterns.
The following pattern letters are defined:
<pre>
 Symbol  Meaning                     Presentation      Examples
 ------  -------                     ------------      -------
  G       era                         text              AD; Anno Domini; A
  u       year                        year              2004; 04
  y       year-of-era                 year              2004; 04
  D       day-of-year                 number            189
  M/L     month-of-year               number/text       7; 07; Jul; July; J
  d       day-of-month                number            10
  g       modified-julian-day         number            2451334

  Q/q     quarter-of-year             number/text       3; 03; Q3; 3rd quarter
  Y       week-based-year             year              1996; 96
  w       week-of-week-based-year     number            27
  W       week-of-month               number            4
  E       day-of-week                 text              Tue; Tuesday; T
  e/c     localized day-of-week       number/text       2; 02; Tue; Tuesday; T
  F       day-of-week-in-month        number            3

  a       am-pm-of-day                text              PM
  B       period-of-day               text              in the morning
  h       clock-hour-of-am-pm (1-12)  number            12
  K       hour-of-am-pm (0-11)        number            0
  k       clock-hour-of-day (1-24)    number            24

  H       hour-of-day (0-23)          number            0
  m       minute-of-hour              number            30
  s       second-of-minute            number            55
  S       fraction-of-second          fraction          978
  A       milli-of-day                number            1234
  n       nano-of-second              number            987654321
  N       nano-of-day                 number            1234000000

  V       time-zone ID                zone-id           America/Los_Angeles; Z; -08:30
  v       generic time-zone name      zone-name         PT, Pacific Time
  z       time-zone name              zone-name         Pacific Standard Time; PST
  O       localized zone-offset       offset-O          GMT+8; GMT+08:00; UTC-08:00;
  X       zone-offset 'Z' for zero    offset-X          Z; -08; -0830; -08:30; -083015; -08:30:15
  x       zone-offset                 offset-x          +0000; -08; -0830; -08:30; -083015; -08:30:15
  Z       zone-offset                 offset-Z          +0000; -0800; -08:00

  p       pad next                    pad modifier      1

  '       escape for text             delimiter
  ''      single quote                literal           '
  [       optional section start
  ]       optional section end
  #       reserved for future use
  {       reserved for future use
  }       reserved for future use
</pre>
<p>
The count of pattern letters determine the format.
See <a href="DateTimeFormatter.html#patterns">DateTimeFormatter</a> for a user-focused description of the patterns.
The following tables define how the pattern letters map to the builder.
<p>
<b>Date fields</b>: Pattern letters to output a date.
<pre>
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   G       1      appendText(ChronoField.ERA, TextStyle.SHORT)
   GG      2      appendText(ChronoField.ERA, TextStyle.SHORT)
   GGG     3      appendText(ChronoField.ERA, TextStyle.SHORT)
   GGGG    4      appendText(ChronoField.ERA, TextStyle.FULL)
   GGGGG   5      appendText(ChronoField.ERA, TextStyle.NARROW)

   u       1      appendValue(ChronoField.YEAR, 1, 19, SignStyle.NORMAL)
   uu      2      appendValueReduced(ChronoField.YEAR, 2, 2, 2000)
   uuu     3      appendValue(ChronoField.YEAR, 3, 19, SignStyle.NORMAL)
   u..u    4..n   appendValue(ChronoField.YEAR, n, 19, SignStyle.EXCEEDS_PAD)
   y       1      appendValue(ChronoField.YEAR_OF_ERA, 1, 19, SignStyle.NORMAL)
   yy      2      appendValueReduced(ChronoField.YEAR_OF_ERA, 2, 2, 2000)
   yyy     3      appendValue(ChronoField.YEAR_OF_ERA, 3, 19, SignStyle.NORMAL)
   y..y    4..n   appendValue(ChronoField.YEAR_OF_ERA, n, 19, SignStyle.EXCEEDS_PAD)
   Y       1      append special localized WeekFields element for numeric week-based-year
   YY      2      append special localized WeekFields element for reduced numeric week-based-year 2 digits
   YYY     3      append special localized WeekFields element for numeric week-based-year (3, 19, SignStyle.NORMAL)
   Y..Y    4..n   append special localized WeekFields element for numeric week-based-year (n, 19, SignStyle.EXCEEDS_PAD)

   Q       1      appendValue(IsoFields.QUARTER_OF_YEAR)
   QQ      2      appendValue(IsoFields.QUARTER_OF_YEAR, 2)
   QQQ     3      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT)
   QQQQ    4      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.FULL)
   QQQQQ   5      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW)
   q       1      appendValue(IsoFields.QUARTER_OF_YEAR)
   qq      2      appendValue(IsoFields.QUARTER_OF_YEAR, 2)
   qqq     3      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.SHORT_STANDALONE)
   qqqq    4      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.FULL_STANDALONE)
   qqqqq   5      appendText(IsoFields.QUARTER_OF_YEAR, TextStyle.NARROW_STANDALONE)

   M       1      appendValue(ChronoField.MONTH_OF_YEAR)
   MM      2      appendValue(ChronoField.MONTH_OF_YEAR, 2)
   MMM     3      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT)
   MMMM    4      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.FULL)
   MMMMM   5      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.NARROW)
   L       1      appendValue(ChronoField.MONTH_OF_YEAR)
   LL      2      appendValue(ChronoField.MONTH_OF_YEAR, 2)
   LLL     3      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.SHORT_STANDALONE)
   LLLL    4      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.FULL_STANDALONE)
   LLLLL   5      appendText(ChronoField.MONTH_OF_YEAR, TextStyle.NARROW_STANDALONE)

   w       1      append special localized WeekFields element for numeric week-of-year
   ww      2      append special localized WeekFields element for numeric week-of-year, zero-padded
   W       1      append special localized WeekFields element for numeric week-of-month
   d       1      appendValue(ChronoField.DAY_OF_MONTH)
   dd      2      appendValue(ChronoField.DAY_OF_MONTH, 2)
   D       1      appendValue(ChronoField.DAY_OF_YEAR)
   DD      2      appendValue(ChronoField.DAY_OF_YEAR, 2, 3, SignStyle.NOT_NEGATIVE)
   DDD     3      appendValue(ChronoField.DAY_OF_YEAR, 3)
   F       1      appendValue(ChronoField.ALIGNED_WEEK_OF_MONTH)
   g..g    1..n   appendValue(JulianFields.MODIFIED_JULIAN_DAY, n, 19, SignStyle.NORMAL)
   E       1      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
   EE      2      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
   EEE     3      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
   EEEE    4      appendText(ChronoField.DAY_OF_WEEK, TextStyle.FULL)
   EEEEE   5      appendText(ChronoField.DAY_OF_WEEK, TextStyle.NARROW)
   e       1      append special localized WeekFields element for numeric day-of-week
   ee      2      append special localized WeekFields element for numeric day-of-week, zero-padded
   eee     3      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT)
   eeee    4      appendText(ChronoField.DAY_OF_WEEK, TextStyle.FULL)
   eeeee   5      appendText(ChronoField.DAY_OF_WEEK, TextStyle.NARROW)
   c       1      append special localized WeekFields element for numeric day-of-week
   ccc     3      appendText(ChronoField.DAY_OF_WEEK, TextStyle.SHORT_STANDALONE)
   cccc    4      appendText(ChronoField.DAY_OF_WEEK, TextStyle.FULL_STANDALONE)
   ccccc   5      appendText(ChronoField.DAY_OF_WEEK, TextStyle.NARROW_STANDALONE)
</pre>
<p>
<b>Time fields</b>: Pattern letters to output a time.
<pre>
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   a       1      appendText(ChronoField.AMPM_OF_DAY, TextStyle.SHORT)
   h       1      appendValue(ChronoField.CLOCK_HOUR_OF_AMPM)
   hh      2      appendValue(ChronoField.CLOCK_HOUR_OF_AMPM, 2)
   H       1      appendValue(ChronoField.HOUR_OF_DAY)
   HH      2      appendValue(ChronoField.HOUR_OF_DAY, 2)
   k       1      appendValue(ChronoField.CLOCK_HOUR_OF_DAY)
   kk      2      appendValue(ChronoField.CLOCK_HOUR_OF_DAY, 2)
   K       1      appendValue(ChronoField.HOUR_OF_AMPM)
   KK      2      appendValue(ChronoField.HOUR_OF_AMPM, 2)
   m       1      appendValue(ChronoField.MINUTE_OF_HOUR)
   mm      2      appendValue(ChronoField.MINUTE_OF_HOUR, 2)
   s       1      appendValue(ChronoField.SECOND_OF_MINUTE)
   ss      2      appendValue(ChronoField.SECOND_OF_MINUTE, 2)

   S..S    1..n   appendFraction(ChronoField.NANO_OF_SECOND, n, n, false)
   A..A    1..n   appendValue(ChronoField.MILLI_OF_DAY, n, 19, SignStyle.NOT_NEGATIVE)
   n..n    1..n   appendValue(ChronoField.NANO_OF_SECOND, n, 19, SignStyle.NOT_NEGATIVE)
   N..N    1..n   appendValue(ChronoField.NANO_OF_DAY, n, 19, SignStyle.NOT_NEGATIVE)
</pre>
<p>
<b>Day periods</b>: Pattern letters to output a day period.
<pre>
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   B       1      appendDayPeriodText(TextStyle.SHORT)
   BBBB    4      appendDayPeriodText(TextStyle.FULL)
   BBBBB   5      appendDayPeriodText(TextStyle.NARROW)
</pre>
<p>
<b>Zone ID</b>: Pattern letters to output {@code ZoneId}.
<pre>
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   VV      2      appendZoneId()
   v       1      appendGenericZoneText(TextStyle.SHORT)
   vvvv    4      appendGenericZoneText(TextStyle.FULL)
   z       1      appendZoneText(TextStyle.SHORT)
   zz      2      appendZoneText(TextStyle.SHORT)
   zzz     3      appendZoneText(TextStyle.SHORT)
   zzzz    4      appendZoneText(TextStyle.FULL)
</pre>
<p>
<b>Zone offset</b>: Pattern letters to output {@code ZoneOffset}.
<pre>
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   O       1      appendLocalizedOffset(TextStyle.SHORT)
   OOOO    4      appendLocalizedOffset(TextStyle.FULL)
   X       1      appendOffset("+HHmm","Z")
   XX      2      appendOffset("+HHMM","Z")
   XXX     3      appendOffset("+HH:MM","Z")
   XXXX    4      appendOffset("+HHMMss","Z")
   XXXXX   5      appendOffset("+HH:MM:ss","Z")
   x       1      appendOffset("+HHmm","+00")
   xx      2      appendOffset("+HHMM","+0000")
   xxx     3      appendOffset("+HH:MM","+00:00")
   xxxx    4      appendOffset("+HHMMss","+0000")
   xxxxx   5      appendOffset("+HH:MM:ss","+00:00")
   Z       1      appendOffset("+HHMM","+0000")
   ZZ      2      appendOffset("+HHMM","+0000")
   ZZZ     3      appendOffset("+HHMM","+0000")
   ZZZZ    4      appendLocalizedOffset(TextStyle.FULL)
   ZZZZZ   5      appendOffset("+HH:MM:ss","Z")
</pre>
<p>
<b>Modifiers</b>: Pattern letters that modify the rest of the pattern:
<pre>
 Pattern  Count  Equivalent builder methods
 -------  -----  --------------------------
   [       1      optionalStart()
   ]       1      optionalEnd()
   p..p    1..n   padNext(n)
</pre>
<p>
Any sequence of letters not specified above, unrecognized letter or
reserved character will throw an exception.
Future versions may add to the set of patterns.
It is recommended to use single quotes around all characters that you want
to output directly to ensure that future changes do not break your application.
<p>
Note that the pattern string is similar, but not identical, to
{@link java.text.SimpleDateFormat SimpleDateFormat}.
The pattern string is also similar, but not identical, to that defined by the
Unicode Common Locale Data Repository (CLDR/LDML).
Pattern letters 'X' and 'u' are aligned with Unicode CLDR/LDML.
By contrast, {@code SimpleDateFormat} uses 'u' for the numeric day of week.
Pattern letters 'y' and 'Y' parse years of two digits and more than 4 digits differently.
Pattern letters 'n', 'A', 'N', and 'p' are added.
Number types will reject large numbers.

@param pattern  the pattern to add, not null
@return this, for chaining, not null
@throws IllegalArgumentException if the pattern is invalid

## DateTimeFormatterBuilder.padNext(int)

```java
public DateTimeFormatterBuilder padNext(int padWidth)
```

Causes the next added printer/parser to pad to a fixed width using a space.
<p>
This padding will pad to a fixed width using spaces.
<p>
During formatting, the decorated element will be output and then padded
to the specified width. An exception will be thrown during formatting if
the pad width is exceeded.
<p>
During parsing, the padding and decorated element are parsed.
If parsing is lenient, then the pad width is treated as a maximum.
The padding is parsed greedily. Thus, if the decorated element starts with
the pad character, it will not be parsed.

@param padWidth  the pad width, 1 or greater
@return this, for chaining, not null
@throws IllegalArgumentException if pad width is too small

## DateTimeFormatterBuilder.padNext(int, char)

```java
public DateTimeFormatterBuilder padNext(int padWidth, char padChar)
```

Causes the next added printer/parser to pad to a fixed width.
<p>
This padding is intended for padding other than zero-padding.
Zero-padding should be achieved using the appendValue methods.
<p>
During formatting, the decorated element will be output and then padded
to the specified width. An exception will be thrown during formatting if
the pad width is exceeded.
<p>
During parsing, the padding and decorated element are parsed.
If parsing is lenient, then the pad width is treated as a maximum.
If parsing is case insensitive, then the pad character is matched ignoring case.
The padding is parsed greedily. Thus, if the decorated element starts with
the pad character, it will not be parsed.

@param padWidth  the pad width, 1 or greater
@param padChar  the pad character
@return this, for chaining, not null
@throws IllegalArgumentException if pad width is too small

## DateTimeFormatterBuilder.optionalStart()

```java
public DateTimeFormatterBuilder optionalStart()
```

Mark the start of an optional section.
<p>
The output of formatting can include optional sections, which may be nested.
An optional section is started by calling this method and ended by calling
{@link #optionalEnd()} or by ending the build process.
<p>
All elements in the optional section are treated as optional.
During formatting, the section is only output if data is available in the
{@code TemporalAccessor} for all the elements in the section.
During parsing, the whole section may be missing from the parsed string.
<p>
For example, consider a builder setup as
{@code builder.appendValue(HOUR_OF_DAY,2).optionalStart().appendValue(MINUTE_OF_HOUR,2)}.
The optional section ends automatically at the end of the builder.
During formatting, the minute will only be output if its value can be obtained from the date-time.
During parsing, the input will be successfully parsed whether the minute is present or not.

@return this, for chaining, not null

## DateTimeFormatterBuilder.optionalEnd()

```java
public DateTimeFormatterBuilder optionalEnd()
```

Ends an optional section.
<p>
The output of formatting can include optional sections, which may be nested.
An optional section is started by calling {@link #optionalStart()} and ended
using this method (or at the end of the builder).
<p>
Calling this method without having previously called {@code optionalStart}
will throw an exception.
Calling this method immediately after calling {@code optionalStart} has no effect
on the formatter other than ending the (empty) optional section.
<p>
All elements in the optional section are treated as optional.
During formatting, the section is only output if data is available in the
{@code TemporalAccessor} for all the elements in the section.
During parsing, the whole section may be missing from the parsed string.
<p>
For example, consider a builder setup as
{@code builder.appendValue(HOUR_OF_DAY,2).optionalStart().appendValue(MINUTE_OF_HOUR,2).optionalEnd()}.
During formatting, the minute will only be output if its value can be obtained from the date-time.
During parsing, the input will be successfully parsed whether the minute is present or not.

@return this, for chaining, not null
@throws IllegalStateException if there was no previous call to {@code optionalStart}

## DateTimeFormatterBuilder.toFormatter()

```java
public DateTimeFormatter toFormatter()
```

Completes this builder by creating the {@code DateTimeFormatter}
using the default locale.
<p>
This will create a formatter with the {@linkplain Locale#getDefault(Locale.Category) default FORMAT locale}.
Numbers will be printed and parsed using the standard DecimalStyle.
The resolver style will be {@link ResolverStyle#SMART SMART}.
<p>
Calling this method will end any open optional sections by repeatedly
calling {@link #optionalEnd()} before creating the formatter.
<p>
This builder can still be used after creating the formatter if desired,
although the state may have been changed by calls to {@code optionalEnd}.

@return the created formatter, not null

## DateTimeFormatterBuilder.toFormatter(Locale)

```java
public DateTimeFormatter toFormatter(Locale locale)
```

Completes this builder by creating the {@code DateTimeFormatter}
using the specified locale.
<p>
This will create a formatter with the specified locale.
Numbers will be printed and parsed using the standard DecimalStyle.
The resolver style will be {@link ResolverStyle#SMART SMART}.
<p>
Calling this method will end any open optional sections by repeatedly
calling {@link #optionalEnd()} before creating the formatter.
<p>
This builder can still be used after creating the formatter if desired,
although the state may have been changed by calls to {@code optionalEnd}.

@param locale  the locale to use for formatting, not null
@return the created formatter, not null

## DateTimeFormatterBuilder.withOptional(boolean)

```java
public CompositePrinterParser withOptional(boolean optional)
```

Returns a copy of this printer-parser with the optional flag changed.

@param optional  the optional flag to set in the copy
@return the new printer-parser, not null

## DateTimeFormatterBuilder.NumberPrinterParser(TemporalField, int, int, SignStyle, int)

```java
protected NumberPrinterParser(TemporalField field, int minWidth, int maxWidth, SignStyle signStyle, int subsequentWidth)
```

Constructor.

@param field  the field to format, not null
@param minWidth  the minimum field width, from 1 to 19
@param maxWidth  the maximum field width, from minWidth to 19
@param signStyle  the positive/negative sign style, not null
@param subsequentWidth  the width of subsequent non-negative numbers, 0 or greater,
 -1 if fixed width due to active adjacent parsing

## DateTimeFormatterBuilder.parse(DateTimeParseContext, CharSequence, int)

```java
public int parse(DateTimeParseContext context, CharSequence text, int position)
```

This implementation looks for the longest matching string.
For example, parsing Etc/GMT-2 will return Etc/GMC-2 rather than just
Etc/GMC although both are valid.

## DateTimeFormatterBuilder.newTree(DateTimeParseContext)

```java
public static PrefixTree newTree(DateTimeParseContext context)
```

Creates a new prefix parsing tree based on parse context.

@param context  the parse context
@return the tree, not null

## DateTimeFormatterBuilder.newTree(Set<String>, DateTimeParseContext)

```java
public static PrefixTree newTree(Set<String> keys, DateTimeParseContext context)
```

Creates a new prefix parsing tree.

@param keys  a set of strings to build the prefix parsing tree, not null
@param context  the parse context
@return the tree, not null

## DateTimeFormatterBuilder.copyTree()

```java
public PrefixTree copyTree()
```

Clone a copy of this tree

## DateTimeFormatterBuilder.add(String, String, int)

```java
public boolean add(String k, String v, int t)
```

Adds a pair of {key, value} into the prefix tree.

@param k  the key, not null
@param v  the value, not null
@return  true if the pair is added successfully

## DateTimeFormatterBuilder.match(CharSequence, int, int)

```java
public PrefixTree match(CharSequence text, int off, int end)
```

Match text with the prefix tree.

@param text  the input text to parse, not null
@param off  the offset position to start parsing at
@param end  the end position to stop parsing
@return the resulting tree, or null if no match found.

## DateTimeFormatterBuilder.match(CharSequence, ParsePosition)

```java
public PrefixTree match(CharSequence text, ParsePosition pos)
```

Match text with the prefix tree.

@param text  the input text to parse, not null
@param pos  the position to start parsing at, from 0 to the text
 length. Upon return, position will be updated to the new parse
 position, or unchanged, if no match found.
@return the resulting tree, or null if no match found.