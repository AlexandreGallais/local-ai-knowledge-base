# NumberFormat class (java.text)

```java
public abstract class NumberFormat extends Format
```

{@code NumberFormat} is the abstract base class for all number
formats. This class provides the interface for formatting and parsing
numbers in a localized manner. This enables code that can be completely
independent of the locale conventions for decimal points, thousands-separators,
the particular decimal digits used, or whether the number format is even
decimal. For example, this class could be used within an application to
produce a number in a currency format according to the conventions of the desired
locale.

<h2 id="factory_methods">Getting a NumberFormat</h2>
To get a {@code NumberFormat} for the default Locale, use one of the static
factory methods that return a concrete subclass of {@code NumberFormat}.
The following formats all provide an example of formatting the {@code Number}
"2000.50" with the {@link java.util.Locale#US US} locale as the default locale.
<ul>
<li> Use {@link #getInstance()} or {@link #getNumberInstance()} to get
a decimal format. For example, {@code "2,000.5"}.
<li> Use {@link #getIntegerInstance()} to get an integer number format.
For example, {@code "2,000"}.
<li> Use {@link #getCurrencyInstance} to get a currency number format.
For example, {@code "$2,000.50"}.
<li> Use {@link #getCompactNumberInstance} to get a compact number format.
For example, {@code "2K"}.
<li> Use {@link #getPercentInstance} to get a format for displaying percentages.
For example, {@code "200,050%"}.
</ul>

Alternatively, if a {@code NumberFormat} for a different locale is required, use
one of the overloaded factory methods that take {@code Locale} as a parameter,
for example, {@link #getIntegerInstance(Locale)}. If the installed locale-sensitive
service implementation does not support the given {@code Locale}, the parent
locale chain will be looked up, and a {@code Locale} used that is supported.

<h3>Locale Extensions</h3>
Formatting behavior can be changed when using a locale that contains any of the following
<a href="../util/Locale.html#def_locale_extension">Unicode extensions</a>,
<ul>
<li> "nu"
(<a href="https://unicode.org/reports/tr35/#UnicodeNumberSystemIdentifier">
Numbering System</a>) - Overrides the decimal digits used
<li> "rg"
(<a href="https://unicode.org/reports/tr35/#RegionOverride">
Region Override</a>) - Overrides the country used
<li> "cf"
(<a href="https://www.unicode.org/reports/tr35/tr35.html#UnicodeCurrencyFormatIdentifier">
Currency Format style</a>) - Overrides the Currency Format style used
</ul>
<p>
If both "nu" and "rg" are specified, the decimal digits from the "nu"
extension supersedes the implicit one from the "rg" extension.
Although <a href="../util/Locale.html#def_locale_extension">Unicode extensions</a>
defines various keys and values, actual locale-sensitive service implementations
in a Java Runtime Environment might not support any particular Unicode locale
attributes or key/type pairs.
<p>Below is an example of a "US" locale currency format with accounting style,
<blockquote>{@code NumberFormat.getCurrencyInstance(Locale.forLanguageTag("en-US-u-cf-account"));}</blockquote>
With this style, a negative value is formatted enclosed in parentheses, instead
of being prepended with a minus sign.

<h2>Using NumberFormat</h2>
The following is an example of formatting and parsing in a localized fashion,
{@snippet lang=java :
NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);
currencyFormat.format(100000); // returns "$100,000.00"
currencyFormat.parse("$100,000.00"); // returns 100000
}

<h2>Customizing NumberFormat</h2>
{@code NumberFormat} provides API to customize formatting and parsing behavior,
<ul>
<li> {@link #setParseIntegerOnly(boolean)}; when {@code true}, will only return the
integer portion of the number parsed from the String.
<li> {@link #setMinimumFractionDigits(int)}; Use to adjust the expected digits
when formatting. Use any of the other minimum/maximum or fraction/integer
setter methods in the same manner. These methods have no impact on parsing behavior.
<li> {@link #setGroupingUsed(boolean)}; when {@code true}, formatted numbers will be displayed
with grouping separators. Additionally, when {@code false}, parsing will not expect
grouping separators in the parsed String.
<li> {@link #setStrict(boolean)}; when {@code true}, parsing will be done strictly.
The behavior of strict parsing should be referred to in the implementing
{@code NumberFormat} subclass.
</ul>

<p>
To provide more control over formatting or parsing behavior, type checking can
be done to safely convert to an implementing subclass of {@code NumberFormat}; this
provides additional methods defined by the subclass.
For example,
{@snippet lang=java :
NumberFormat nFmt = NumberFormat.getInstance(Locale.US);
if (nFmt instanceof DecimalFormat dFmt) {
    dFmt.setDecimalSeparatorAlwaysShown(true);
    dFmt.format(100); // returns "100."
}
}
The {@code NumberFormat} subclass returned by the factory methods is dependent
on the locale-service provider implementation installed, and may not always
be {@link DecimalFormat} or {@link CompactNumberFormat}.

<p>
You can also use forms of the {@code parse} and {@code format}
methods with {@code ParsePosition} and {@code FieldPosition} to
allow you to:
<ul>
<li> Progressively parse through pieces of a string
<li> Align the decimal point and other areas
</ul>
For example, you can align numbers in two ways:
<ol>
<li> If you are using a monospaced font with spacing for alignment,
     you can pass the {@code FieldPosition} in your format call, with
     {@code field} = {@code INTEGER_FIELD}. On output,
     {@code getEndIndex} will be set to the offset between the
     last character of the integer and the decimal. Add
     (desiredSpaceCount - getEndIndex) spaces at the front of the string.

<li> If you are using proportional fonts,
     instead of padding with spaces, measure the width
     of the string in pixels from the start to {@code getEndIndex}.
     Then move the pen by
     (desiredPixelWidth - widthToAlignmentPoint) before drawing the text.
     It also works where there is no decimal, but possibly additional
     characters at the end, e.g., with parentheses in negative
     numbers: "(12)" for -12.
</ol>

<h2><a id="leniency">Leniency</a></h2>
{@code NumberFormat} by default, parses leniently. Subclasses may consider
implementing strict parsing and as such, overriding and providing
implementations for the optional {@link #isStrict()} and {@link
#setStrict(boolean)} methods.
<p>
Lenient parsing should be used when attempting to parse a number
out of a String that contains non-numerical or non-format related values.
For example, using a {@link Locale#US} currency format to parse the number
{@code 1000} out of the String "$1,000.00 was paid".
<p>
Strict parsing should be used when attempting to ensure a String adheres exactly
to a locale's conventions, and can thus serve to validate input. For example, successfully
parsing the number {@code 1000.55} out of the String "1.000,55" confirms the String
exactly adhered to the {@link Locale#GERMANY} numerical conventions.

<h2><a id="synchronization">Synchronization</a></h2>
Number formats are generally not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

@implSpec
Null Parameter Handling
<ul>
<li> The {@link #format(double, StringBuffer, FieldPosition)},
{@link #format(long, StringBuffer, FieldPosition)} and
{@link #parse(String, ParsePosition)} methods may throw
{@code NullPointerException}, if any of their parameter is {@code null}.
The subclass may provide its own implementation and specification about
{@code NullPointerException}.
</ul>

Default RoundingMode
<ul>
<li> The default implementation provides rounding modes defined
in {@link java.math.RoundingMode} for formatting numbers. It
uses the {@linkplain java.math.RoundingMode#HALF_EVEN
round half-even algorithm}. To change the rounding mode use
{@link #setRoundingMode(java.math.RoundingMode) setRoundingMode}.
The {@code NumberFormat} returned by the static factory methods is
configured to round floating point numbers using half-even
rounding (see {@link java.math.RoundingMode#HALF_EVEN
RoundingMode.HALF_EVEN}) for formatting.
</ul>

@spec         https://www.unicode.org/reports/tr35
              Unicode Locale Data Markup Language (LDML)
@see          DecimalFormat
@see          ChoiceFormat
@see          CompactNumberFormat
@see          Locale
@author       Mark Davis
@author       Helena Shih
@since 1.1

## NumberFormat.INTEGER_FIELD

```java
public static final int INTEGER_FIELD
```

Field constant used to construct a FieldPosition object. Signifies that
the position of the integer part of a formatted number should be returned.
@see java.text.FieldPosition

## NumberFormat.FRACTION_FIELD

```java
public static final int FRACTION_FIELD
```

Field constant used to construct a FieldPosition object. Signifies that
the position of the fraction part of a formatted number should be returned.
@see java.text.FieldPosition

## NumberFormat.NumberFormat()

```java
protected NumberFormat()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## NumberFormat.format(Object, StringBuffer, FieldPosition)

```java
public StringBuffer format(Object number, StringBuffer toAppendTo, FieldPosition pos)
```

Formats a number and appends the resulting text to the given string
buffer.
The number can be of any subclass of {@link java.lang.Number}.
<p>
This implementation extracts the number's value using
{@link java.lang.Number#longValue()} for all integral type values that
can be converted to {@code long} without loss of information,
including {@code BigInteger} values with a
{@link java.math.BigInteger#bitLength() bit length} of less than 64,
and {@link java.lang.Number#doubleValue()} for all other types. It
then calls
{@link #format(long,java.lang.StringBuffer,java.text.FieldPosition)}
or {@link #format(double,java.lang.StringBuffer,java.text.FieldPosition)}.
This may result in loss of magnitude information and precision for
{@code BigInteger} and {@code BigDecimal} values.
@param number     the number to format
@param toAppendTo the {@code StringBuffer} to which the formatted
                  text is to be appended
@param pos        keeps track on the position of the field within the
                  returned string. For example, for formatting a number
                  {@code 1234567.89} in {@code Locale.US} locale,
                  if the given {@code fieldPosition} is
                  {@link NumberFormat#INTEGER_FIELD}, the begin index
                  and end index of {@code fieldPosition} will be set
                  to 0 and 9, respectively for the output string
                  {@code 1,234,567.89}.
@return           the value passed in as {@code toAppendTo}
@throws           IllegalArgumentException if {@code number} is
                  null or not an instance of {@code Number}.
@throws           NullPointerException if {@code toAppendTo} or
                  {@code pos} is null
@throws           ArithmeticException if rounding is needed with rounding
                  mode being set to RoundingMode.UNNECESSARY
@see              java.text.FieldPosition

## NumberFormat.parseObject(String, ParsePosition)

```java
public final Object parseObject(String source, ParsePosition pos)
```

{@inheritDoc Format}

@implSpec This implementation is equivalent to calling {@code parse(source,
          pos)}.
@param source the {@code String} to parse
@param pos A {@code ParsePosition} object with index and error
           index information as described above.
@return A {@code Number} parsed from the string. In case of
        error, returns null.
@throws NullPointerException if {@code source} or {@code pos} is null.

## NumberFormat.format(double)

```java
public final String format(double number)
```

Specialization of format.

@param number the double number to format
@return the formatted String
@throws           ArithmeticException if rounding is needed with rounding
                  mode being set to RoundingMode.UNNECESSARY
@see java.text.Format#format

## NumberFormat.format(long)

```java
public final String format(long number)
```

Specialization of format.

@param number the long number to format
@return the formatted String
@throws           ArithmeticException if rounding is needed with rounding
                  mode being set to RoundingMode.UNNECESSARY
@see java.text.Format#format

## NumberFormat.format(double, StringBuffer, FieldPosition)

```java
public abstract StringBuffer format(double number, StringBuffer toAppendTo, FieldPosition pos)
```

Specialization of format.

@param number     the double number to format
@param toAppendTo the StringBuffer to which the formatted text is to be
                  appended
@param pos        keeps track on the position of the field within the
                  returned string. For example, for formatting a number
                  {@code 1234567.89} in {@code Locale.US} locale,
                  if the given {@code fieldPosition} is
                  {@link NumberFormat#INTEGER_FIELD}, the begin index
                  and end index of {@code fieldPosition} will be set
                  to 0 and 9, respectively for the output string
                  {@code 1,234,567.89}.
@return the formatted StringBuffer
@throws           ArithmeticException if rounding is needed with rounding
                  mode being set to RoundingMode.UNNECESSARY
@see java.text.Format#format

## NumberFormat.format(long, StringBuffer, FieldPosition)

```java
public abstract StringBuffer format(long number, StringBuffer toAppendTo, FieldPosition pos)
```

Specialization of format.

@param number     the long number to format
@param toAppendTo the StringBuffer to which the formatted text is to be
                  appended
@param pos        keeps track on the position of the field within the
                  returned string. For example, for formatting a number
                  {@code 123456789} in {@code Locale.US} locale,
                  if the given {@code fieldPosition} is
                  {@link NumberFormat#INTEGER_FIELD}, the begin index
                  and end index of {@code fieldPosition} will be set
                  to 0 and 11, respectively for the output string
                  {@code 123,456,789}.
@return the formatted StringBuffer
@throws           ArithmeticException if rounding is needed with rounding
                  mode being set to RoundingMode.UNNECESSARY
@see java.text.Format#format

## NumberFormat.parse(String, ParsePosition)

```java
public abstract Number parse(String source, ParsePosition parsePosition)
```

Parses text from the beginning of the given string to produce a {@code Number}.
<p>
This method attempts to parse text starting at the index given by the
{@code ParsePosition}. If parsing succeeds, then the index of the {@code
ParsePosition} is updated to the index after the last character used
(parsing does not necessarily use all characters up to the end of the
string), and the parsed number is returned. The updated {@code
ParsePosition} can be used to indicate the starting
point for the next call to this method. If an error occurs, then the
index of the {@code ParsePosition} is not changed, the error index of the
{@code ParsePosition} is set to the index of the character where the error
occurred, and {@code null} is returned.
<p>
This method will return a Long if possible (e.g., within the range [Long.MIN_VALUE,
Long.MAX_VALUE] and with no decimals), otherwise a Double.

@param source the {@code String} to parse
@param parsePosition A {@code ParsePosition} object with index and error
           index information as described above.
@return A {@code Number} parsed from the string. In case of
        failure, returns {@code null}.
@throws NullPointerException if {@code source} or {@code ParsePosition}
        is {@code null}.
@see #isStrict()

## NumberFormat.parse(String)

```java
public Number parse(String source) throws ParseException
```

Parses text from the beginning of the given string to produce a {@code Number}.
<p>
This method will return a Long if possible (e.g., within the range [Long.MIN_VALUE,
Long.MAX_VALUE] and with no decimals), otherwise a Double.

@param source A {@code String}, to be parsed from the beginning.
@return A {@code Number} parsed from the string.
@throws ParseException if parsing fails
@throws NullPointerException if {@code source} is {@code null}.
@see #isStrict()

## NumberFormat.isParseIntegerOnly()

```java
public boolean isParseIntegerOnly()
```

Returns {@code true} if this format will parse numbers as integers only.
The {@code ParsePosition} index will be set to the position of the decimal
symbol. The exact format accepted by the parse operation is locale dependent.
For example in the English locale, with ParseIntegerOnly true, the
string "123.45" would be parsed as the integer value 123.

@return {@code true} if numbers should be parsed as integers only;
        {@code false} otherwise

## NumberFormat.setParseIntegerOnly(boolean)

```java
public void setParseIntegerOnly(boolean value)
```

Sets whether or not numbers should be parsed as integers only.

@param value {@code true} if numbers should be parsed as integers only;
             {@code false} otherwise
@see #isParseIntegerOnly

## NumberFormat.isStrict()

```java
public boolean isStrict()
```

{@return {@code true} if this format will parse numbers strictly;
{@code false} otherwise}

@implSpec The default implementation always throws {@code
UnsupportedOperationException}. Subclasses should override this method
when implementing strict parsing.
@throws    UnsupportedOperationException if the implementation of this
           method does not support this operation
@see ##leniency Leniency Section
@see #setStrict(boolean)
@since 23

## NumberFormat.setStrict(boolean)

```java
public void setStrict(boolean strict)
```

Change the leniency value for parsing. Parsing can either be strict or lenient,
by default it is lenient.

@implSpec The default implementation always throws {@code
UnsupportedOperationException}. Subclasses should override this method
when implementing strict parsing.
@param strict {@code true} if parsing should be done strictly;
              {@code false} otherwise
@throws    UnsupportedOperationException if the implementation of this
           method does not support this operation
@see ##leniency Leniency Section
@see #isStrict()
@since 23

## NumberFormat.getInstance()

```java
public static final NumberFormat getInstance()
```

Returns a general-purpose number format for the current default
{@link java.util.Locale.Category#FORMAT FORMAT} locale.
This is the same as calling
{@link #getNumberInstance() getNumberInstance()}.

@return the {@code NumberFormat} instance for general-purpose number
formatting

## NumberFormat.getInstance(Locale)

```java
public static NumberFormat getInstance(Locale inLocale)
```

Returns a general-purpose number format for the specified locale.
This is the same as calling
{@link #getNumberInstance(java.util.Locale) getNumberInstance(inLocale)}.

@param inLocale the desired locale
@return the {@code NumberFormat} instance for general-purpose number
formatting

## NumberFormat.getNumberInstance()

```java
public static final NumberFormat getNumberInstance()
```

Returns a general-purpose number format for the current default
{@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getNumberInstance(Locale)
    getNumberInstance(Locale.getDefault(Locale.Category.FORMAT))}.

@return the {@code NumberFormat} instance for general-purpose number
formatting
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT

## NumberFormat.getNumberInstance(Locale)

```java
public static NumberFormat getNumberInstance(Locale inLocale)
```

Returns a general-purpose number format for the specified locale.

@param inLocale the desired locale
@return the {@code NumberFormat} instance for general-purpose number
formatting

## NumberFormat.getIntegerInstance()

```java
public static final NumberFormat getIntegerInstance()
```

Returns an integer number format for the current default
{@link java.util.Locale.Category#FORMAT FORMAT} locale. The
returned number format is configured to round floating point numbers
to the nearest integer using half-even rounding (see {@link
java.math.RoundingMode#HALF_EVEN RoundingMode.HALF_EVEN}) for formatting,
and to parse only the integer part of an input string (see {@link
#isParseIntegerOnly isParseIntegerOnly}).
<p>This is equivalent to calling
{@link #getIntegerInstance(Locale)
    getIntegerInstance(Locale.getDefault(Locale.Category.FORMAT))}.

@see #getRoundingMode()
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@return a number format for integer values
@since 1.4

## NumberFormat.getIntegerInstance(Locale)

```java
public static NumberFormat getIntegerInstance(Locale inLocale)
```

Returns an integer number format for the specified locale. The
returned number format is configured to round floating point numbers
to the nearest integer using half-even rounding (see {@link
java.math.RoundingMode#HALF_EVEN RoundingMode.HALF_EVEN}) for formatting,
and to parse only the integer part of an input string (see {@link
#isParseIntegerOnly isParseIntegerOnly}).

@param inLocale the desired locale
@see #getRoundingMode()
@return a number format for integer values
@since 1.4

## NumberFormat.getCurrencyInstance()

```java
public static final NumberFormat getCurrencyInstance()
```

Returns a currency format for the current default
{@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getCurrencyInstance(Locale)
    getCurrencyInstance(Locale.getDefault(Locale.Category.FORMAT))}.

@return the {@code NumberFormat} instance for currency formatting
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT

## NumberFormat.getCurrencyInstance(Locale)

```java
public static NumberFormat getCurrencyInstance(Locale inLocale)
```

Returns a currency format for the specified locale.

<p>If the specified locale contains the "{@code cf}" (
<a href="https://www.unicode.org/reports/tr35/tr35.html#UnicodeCurrencyFormatIdentifier">
currency format style</a>)
<a href="../util/Locale.html#def_locale_extension">Unicode extension</a>,
the returned currency format uses the style if it is available.
Otherwise, the style uses the default "{@code standard}" currency format.
For example, if the style designates "{@code account}", negative
currency amounts use a pair of parentheses in some locales.

@param inLocale the desired locale
@return the {@code NumberFormat} instance for currency formatting

@spec https://www.unicode.org/reports/tr35 Unicode Locale Data Markup Language (LDML)

## NumberFormat.getPercentInstance()

```java
public static final NumberFormat getPercentInstance()
```

Returns a percentage format for the current default
{@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>This is equivalent to calling
{@link #getPercentInstance(Locale)
    getPercentInstance(Locale.getDefault(Locale.Category.FORMAT))}.

@return the {@code NumberFormat} instance for percentage formatting
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT

## NumberFormat.getPercentInstance(Locale)

```java
public static NumberFormat getPercentInstance(Locale inLocale)
```

Returns a percentage format for the specified locale.

@param inLocale the desired locale
@return the {@code NumberFormat} instance for percentage formatting

## NumberFormat.getScientificInstance()

```java
/*public*/ static final NumberFormat getScientificInstance()
```

Returns a scientific format for the current default locale.

## NumberFormat.getScientificInstance(Locale)

```java
/*public*/ static NumberFormat getScientificInstance(Locale inLocale)
```

Returns a scientific format for the specified locale.

@param inLocale the desired locale

## NumberFormat.getCompactNumberInstance()

```java
public static NumberFormat getCompactNumberInstance()
```

Returns a compact number format for the default
{@link java.util.Locale.Category#FORMAT FORMAT} locale with
{@link NumberFormat.Style#SHORT "SHORT"} format style.

@return A {@code NumberFormat} instance for compact number
        formatting

@see CompactNumberFormat
@see NumberFormat.Style
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@since 12

## NumberFormat.getCompactNumberInstance(Locale, NumberFormat.Style)

```java
public static NumberFormat getCompactNumberInstance(Locale locale, NumberFormat.Style formatStyle)
```

Returns a compact number format for the specified {@link java.util.Locale locale}
and {@link NumberFormat.Style formatStyle}.

@param locale the desired locale
@param formatStyle the style for formatting a number
@return A {@code NumberFormat} instance for compact number
        formatting
@throws NullPointerException if {@code locale} or {@code formatStyle}
                             is {@code null}

@see CompactNumberFormat
@see NumberFormat.Style
@see java.util.Locale
@since 12

## NumberFormat.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
{@code get*Instance} methods of this class can return
localized instances.
The returned array represents the union of locales supported by the Java
runtime and by installed
{@link java.text.spi.NumberFormatProvider NumberFormatProvider} implementations.
At a minimum, the returned array must contain a {@code Locale} instance equal to
{@link Locale#ROOT Locale.ROOT} and a {@code Locale} instance equal to
{@link Locale#US Locale.US}.

@return An array of locales for which localized
        {@code NumberFormat} instances are available.

## NumberFormat.hashCode()

```java
public int hashCode()
```

{@return the hash code for this {@code NumberFormat}}

@implSpec This method calculates the hash code value using the values returned by
{@link #getMaximumIntegerDigits()} and {@link #getMaximumFractionDigits()}.
@see Object#hashCode()

## NumberFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code NumberFormat} for equality.
Returns true if the object is also a {@code NumberFormat} and the
two formats would format any value the same.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param  obj object to be compared for equality
@return {@code true} if the specified object is equal to this {@code NumberFormat}
@see Object#equals(Object)

## NumberFormat.clone()

```java
public Object clone()
```

Overrides Cloneable.

## NumberFormat.isGroupingUsed()

```java
public boolean isGroupingUsed()
```

Returns true if grouping is used in this format. This applies to both
formatting and parsing. The grouping separator as well as the size of each
group is locale dependent and is determined by sub-classes of NumberFormat.
For example, consider a {@code NumberFormat} that expects a "{@code ,}"
grouping separator symbol with a grouping size of 3.
<ul>
  <li> Formatting {@code 1234567} with grouping on returns {@code "1,234,567"}
  <li> Parsing {@code "1,234,567"} with grouping off returns {@code 1}
  <li> Parsing {@code "1,234,567"} with grouping off when {@link #isStrict()}
       returns {@code true} throws {@code ParseException}
</ul>

@return {@code true} if grouping is used;
        {@code false} otherwise
@see #setGroupingUsed
@see ##leniency Leniency Section

## NumberFormat.setGroupingUsed(boolean)

```java
public void setGroupingUsed(boolean newValue)
```

Set whether or not grouping will be used in this format.
This applies to both formatting and parsing.

@param newValue {@code true} if grouping is used;
                {@code false} otherwise
@see #isGroupingUsed

## NumberFormat.getMaximumIntegerDigits()

```java
public int getMaximumIntegerDigits()
```

Returns the maximum number of digits allowed in the integer portion of a
number during formatting.

@return the maximum number of digits
@see #setMaximumIntegerDigits

## NumberFormat.setMaximumIntegerDigits(int)

```java
public void setMaximumIntegerDigits(int newValue)
```

Sets the maximum number of digits allowed in the integer portion of a
number during formatting. {@code maximumIntegerDigits} must be &ge;
{@code minimumIntegerDigits}. If the new value for {@code
maximumIntegerDigits} is less than the current value of
{@code minimumIntegerDigits}, then {@code minimumIntegerDigits} will
also be set to the new value. Negative input values are replaced with 0.

@param newValue the maximum number of integer digits to be shown. The
concrete subclass may enforce an upper limit to this value appropriate to
the numeric type being formatted.
@see #getMaximumIntegerDigits

## NumberFormat.getMinimumIntegerDigits()

```java
public int getMinimumIntegerDigits()
```

Returns the minimum number of digits allowed in the integer portion of a
number during formatting.

@return the minimum number of digits
@see #setMinimumIntegerDigits

## NumberFormat.setMinimumIntegerDigits(int)

```java
public void setMinimumIntegerDigits(int newValue)
```

Sets the minimum number of digits allowed in the integer portion of a
number during formatting. {@code minimumIntegerDigits} must be &le;
{@code maximumIntegerDigits}. If the new value for {@code minimumIntegerDigits}
exceeds the current value of {@code maximumIntegerDigits}, then {@code
maximumIntegerDigits} will also be set to the new value. Negative input
values are replaced with 0.

@param newValue the minimum number of integer digits to be shown. The
concrete subclass may enforce an upper limit to this value appropriate to
the numeric type being formatted.
@see #getMinimumIntegerDigits

## NumberFormat.getMaximumFractionDigits()

```java
public int getMaximumFractionDigits()
```

Returns the maximum number of digits allowed in the fraction portion of a
number during formatting.

@return the maximum number of digits.
@see #setMaximumFractionDigits

## NumberFormat.setMaximumFractionDigits(int)

```java
public void setMaximumFractionDigits(int newValue)
```

Sets the maximum number of digits allowed in the fraction portion of a
number during formatting. {@code maximumFractionDigits} must be &ge;
{@code minimumFractionDigits}. If the new value for {@code maximumFractionDigits}
is less than the current value of {@code minimumFractionDigits}, then
{@code minimumFractionDigits} will also be set to the new value. Negative
input values are replaced with 0.

@param newValue the maximum number of fraction digits to be shown. The
concrete subclass may enforce an upper limit to this value appropriate to
the numeric type being formatted.
@see #getMaximumFractionDigits

## NumberFormat.getMinimumFractionDigits()

```java
public int getMinimumFractionDigits()
```

Returns the minimum number of digits allowed in the fraction portion of a
number during formatting.

@return the minimum number of digits
@see #setMinimumFractionDigits

## NumberFormat.setMinimumFractionDigits(int)

```java
public void setMinimumFractionDigits(int newValue)
```

Sets the minimum number of digits allowed in the fraction portion of a
number during formatting. {@code minimumFractionDigits} must be &le;
{@code maximumFractionDigits}. If the new value for {@code
minimumFractionDigits} exceeds the current value of {@code
maximumFractionDigits}, then {@code maximumFractionDigits} will also be
set to the new value. Negative input values are replaced with 0.

@param newValue the minimum number of fraction digits to be shown. The
concrete subclass may enforce an upper limit to this value appropriate to
the numeric type being formatted.
@see #getMinimumFractionDigits

## NumberFormat.getCurrency()

```java
public Currency getCurrency()
```

Gets the currency used by this number format when formatting
currency values. The initial value is derived in a locale dependent
way. The returned value may be {@code null} if no valid
currency could be determined and no currency has been set using
{@link #setCurrency(Currency)}.

@implSpec The default implementation always throws {@code
UnsupportedOperationException}. Subclasses should override this method
if currency formatting is desired.
@return the currency used by this number format, or {@code null}
@throws    UnsupportedOperationException if the implementation of this
           method does not support this operation
@since 1.4

## NumberFormat.setCurrency(Currency)

```java
public void setCurrency(Currency currency)
```

Sets the currency used by this number format when formatting
currency values. This does not update the minimum or maximum
number of fraction digits used by the number format.

@implSpec The default implementation always throws {@code
UnsupportedOperationException}. Subclasses should override this method
if currency formatting is desired.
@param currency the new currency to be used by this number format
@throws    NullPointerException if {@code currency} is {@code null}
@throws    UnsupportedOperationException if the implementation of this
           method does not support this operation
@since 1.4

## NumberFormat.getRoundingMode()

```java
public RoundingMode getRoundingMode()
```

Gets the {@link java.math.RoundingMode} used in this NumberFormat.

@implSpec The default implementation always throws {@code
UnsupportedOperationException}. Subclasses which handle different
rounding modes should override this method.
@return The {@code RoundingMode} used for this NumberFormat.
@throws    UnsupportedOperationException if the implementation of this
           method does not support this operation
@see #setRoundingMode(RoundingMode)
@since 1.6

## NumberFormat.setRoundingMode(RoundingMode)

```java
public void setRoundingMode(RoundingMode roundingMode)
```

Sets the {@link java.math.RoundingMode} used in this NumberFormat.

@implSpec The default implementation always throws {@code
UnsupportedOperationException}. Subclasses which handle different
rounding modes should override this method.
@throws    NullPointerException if {@code roundingMode} is {@code null}
@throws    UnsupportedOperationException if the implementation of this
           method does not support this operation
@param roundingMode The {@code RoundingMode} to be used
@see #getRoundingMode()
@since 1.6

## NumberFormat.Field(String)

```java
protected Field(String name)
```

Creates a Field instance with the specified
name.

@param name Name of the attribute

## NumberFormat.readResolve()

```java
protected Object readResolve() throws InvalidObjectException
```

Resolves instances being deserialized to the predefined constants.

@throws InvalidObjectException if the constant could not be resolved.
@return resolved NumberFormat.Field constant

## NumberFormat.INTEGER

```java
public static final Field INTEGER
```

Constant identifying the integer field.

## NumberFormat.FRACTION

```java
public static final Field FRACTION
```

Constant identifying the fraction field.

## NumberFormat.EXPONENT

```java
public static final Field EXPONENT
```

Constant identifying the exponent field.

## NumberFormat.DECIMAL_SEPARATOR

```java
public static final Field DECIMAL_SEPARATOR
```

Constant identifying the decimal separator field.

## NumberFormat.SIGN

```java
public static final Field SIGN
```

Constant identifying the sign field.

## NumberFormat.GROUPING_SEPARATOR

```java
public static final Field GROUPING_SEPARATOR
```

Constant identifying the grouping separator field.

## NumberFormat.EXPONENT_SYMBOL

```java
public static final Field EXPONENT_SYMBOL
```

Constant identifying the exponent symbol field.

## NumberFormat.PERCENT

```java
public static final Field PERCENT
```

Constant identifying the percent field.

## NumberFormat.PERMILLE

```java
public static final Field PERMILLE
```

Constant identifying the permille field.

## NumberFormat.CURRENCY

```java
public static final Field CURRENCY
```

Constant identifying the currency field.

## NumberFormat.EXPONENT_SIGN

```java
public static final Field EXPONENT_SIGN
```

Constant identifying the exponent sign field.

## NumberFormat.PREFIX

```java
public static final Field PREFIX
```

Constant identifying the prefix field.

@since 12

## NumberFormat.SUFFIX

```java
public static final Field SUFFIX
```

Constant identifying the suffix field.

@since 12