# CompactNumberFormat class (java.text)

```java
public final class CompactNumberFormat extends NumberFormat
```

<p>
{@code CompactNumberFormat} is a concrete subclass of {@code NumberFormat}
that formats a decimal number in a localized compact form.
Compact number formatting is designed for an environment with limited space.
For example, displaying the formatted number {@code 7M} instead of {@code
7,000,000.00} in the {@link java.util.Locale#US US locale}. The {@code
CompactNumberFormat} class is defined by LDML's specification for
<a href = "http://unicode.org/reports/tr35/tr35-numbers.html#Compact_Number_Formats">
Compact Number Formats</a>.

<h2>Getting a CompactNumberFormat</h2>
To get a compact number format, use one of the ways listed below.
<ul>
<li> Use the factory method {@link NumberFormat#getCompactNumberInstance()}
to obtain a format for the default locale with
{@link NumberFormat.Style#SHORT SHORT} style.
<li> Use the factory methood {@link NumberFormat#getCompactNumberInstance(Locale, Style)}
to obtain a format for a different locale
and to control the {@linkplain ##compact_number_style Style}.
<li> Use one of the {@code CompactNumberFormat} constructors, for example, {@link
CompactNumberFormat#CompactNumberFormat(String, DecimalFormatSymbols, String[])
CompactNumberFormat(decimalPattern, symbols, compactPatterns)}, to obtain a
{@code CompactNumberFormat} with further customization.
</ul>
<p>If a standard compact format for a given locale and {@link
##compact_number_style style} is desired, it is recommended to use one of the
NumberFormat factory methods listed above. To use an instance method
defined by {@code CompactNumberFormat}, the {@code NumberFormat} returned by
these factory methods should be type checked before converted to {@code CompactNumberFormat}.
If the installed locale-sensitive service implementation does not support
the given {@code Locale}, the parent locale chain will be looked up, and
a {@code Locale} used that is supported.

<h2><a id="compact_number_style">Style</a></h2>
When using {@link NumberFormat#getCompactNumberInstance(Locale, Style)}, a
compact form can be retrieved with either a {@link NumberFormat.Style#SHORT
SHORT} or {@link NumberFormat.Style#LONG LONG} style.
For example, a {@link NumberFormat.Style#SHORT SHORT} style compact number instance in
the {@link java.util.Locale#US US locale} formats {@code 10000} as {@code
"10K"}. However, a {@link NumberFormat.Style#LONG LONG} style instance in
the same locale formats {@code 10000} as {@code "10 thousand"}.

<h2>Using CompactNumberFormat</h2>
The following is an example of formatting and parsing in a localized manner,

{@snippet lang=java :
NumberFormat compactFormat = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
compactFormat.format(1000); // returns "1K"
compactFormat.parse("1K"); // returns 1000
}

<h2 id="formatting">Formatting</h2>
The default formatting behavior returns a formatted string with no fractional
digits, however users can use the {@link #setMinimumFractionDigits(int)}
method to include the fractional part.
The number {@code 1000.0} or {@code 1000} is formatted as {@code "1K"}
not {@code "1.00K"} (in the {@link java.util.Locale#US US locale}). For this
reason, the patterns provided for formatting contain only the minimum
integer digits, prefix and/or suffix, but no fractional part.
For example, patterns used are {@code {"", "", "", 0K, 00K, ...}}. If the pattern
selected for formatting a number is {@code "0"} (special pattern),
either explicit or defaulted, then the general number formatting provided by
{@link java.text.DecimalFormat DecimalFormat}
for the specified locale is used.

<h3>Rounding</h3>
{@code CompactNumberFormat} provides rounding modes defined in
{@link java.math.RoundingMode} for formatting.  By default, it uses
{@link java.math.RoundingMode#HALF_EVEN RoundingMode.HALF_EVEN}.

<h2>Parsing</h2>
The default parsing behavior does not allow a grouping separator until
grouping used is set to {@code true} by using
{@link #setGroupingUsed(boolean)}. The parsing of the fractional part
depends on the {@link #isParseIntegerOnly()}. For example, if the
parse integer only is set to true, then the fractional part is skipped.

<h2><a id="compact_number_patterns">Compact Number Patterns</a></h2>
<p>
The {@code compactPatterns} in {@link
CompactNumberFormat#CompactNumberFormat(String, DecimalFormatSymbols, String[])
CompactNumberFormat(decimalPattern, symbols, compactPatterns)} are represented
as a series of strings, where each string is a {@link ##compact_number_syntax
pattern} that is used to format a range of numbers.

<p> An example of the {@link NumberFormat.Style#SHORT SHORT} styled compact number patterns
for the {@link java.util.Locale#US US locale} is {@code {"", "", "", "0K",
"00K", "000K", "0M", "00M", "000M", "0B", "00B", "000B", "0T", "00T", "000T"}},
ranging from {@code 10}<sup>{@code 0}</sup> to {@code 10}<sup>{@code 14}</sup>.
There can be any number of patterns and they are
strictly index based starting from the range {@code 10}<sup>{@code 0}</sup>.
For example, in the above patterns, the pattern at index 3
({@code "0K"}) is used for formatting a number in the range: {@code 1000 <= number < 10000},
index 4 ({@code "00K"}) for formatting a number the range: {@code 10000 <=
number < 100000}, and so forth.
<p>In most locales, patterns with the range
{@code 10}<sup>{@code 0}</sup>-{@code 10}<sup>{@code 2}</sup> are empty
strings, which implicitly means a special pattern {@code "0"}.
A special pattern {@code "0"} is used for any range which does not contain
a compact pattern. This special pattern can appear explicitly for any specific
range, or considered as a default pattern for an empty string.

<h3>Negative Subpatterns</h3>
A compact pattern contains a positive and negative subpattern
separated by a subpattern boundary character {@code ';'},
for example, {@code "0K;-0K"}. Each subpattern has a prefix,
minimum integer digits, and suffix. The negative subpattern
is optional, if absent, then the positive subpattern prefixed with the
minus sign {@code '-' (U+002D HYPHEN-MINUS)} is used as the negative
subpattern. That is, {@code "0K"} alone is equivalent to {@code "0K;-0K"}.
If there is an explicit negative subpattern, it serves only to specify
the negative prefix and suffix. The number of minimum integer digits,
and other characteristics are all the same as the positive pattern.
That means that {@code "0K;-00K"} produces precisely the same behavior
as {@code "0K;-0K"}.

<h4>Escaping Special Characters</h4>
Many characters in a compact pattern are taken literally, they are matched
during parsing and output unchanged during formatting.
{@linkplain DecimalFormat##special_pattern_character Special characters},
on the other hand, stand for other characters, strings, or classes of
characters. These characters must be quoted using single quotes {@code ' (U+0027)}
unless noted otherwise, if they are to appear in the prefix or suffix
as literals. For example, 0\u0915'.'.

<h3>Plurals</h3>
<p> {@code CompactNumberFormat} support patterns for both singular and plural
compact forms. For the plural form, the {@code Pattern} should consist
of {@code PluralPattern}(s) separated by a space ' ' (U+0020) that are enumerated
within a pair of curly brackets '{' (U+007B) and '}' (U+007D).
In this format, each {@code PluralPattern} consists of its {@code count},
followed by a single colon {@code ':' (U+003A)} and a {@code SimplePattern}.
As a space is reserved for separating subsequent {@code PluralPattern}s, it must
be quoted to be used literally in either the {@code prefix} or {@code suffix}.
<p>
For example, while the pattern representing millions ({@code 10}<sup>{@code 6}
</sup>) in the US locale can be specified as the SimplePattern: {@code "0 Million"}, for the
German locale it can be specified as the PluralPattern:
{@code "{one:0' 'Million other:0' 'Millionen}"}.

<p>
<a id="compact_number_syntax">A compact pattern has the following syntax, with {@code count}</a>
following LDML's
<a href="https://unicode.org/reports/tr35/tr35-numbers.html#Language_Plural_Rules">
Language Plural Rules</a>:
<blockquote><pre>
<i>Pattern:</i>
        <i>SimplePattern</i>
        '{' <i>PluralPattern</i> <i>[' ' PluralPattern]<sub>optional</sub></i> '}'
<i>SimplePattern:</i>
        <i>PositivePattern</i>
        <i>PositivePattern</i> <i>[; NegativePattern]<sub>optional</sub></i>
<i>PluralPattern:</i>
        <i>Count</i>:<i>SimplePattern</i>
<i>Count:</i>
        "zero" / "one" / "two" / "few" / "many" / "other"
<i>PositivePattern:</i>
        <i>Prefix<sub>optional</sub></i> <i>MinimumInteger</i> <i>Suffix<sub>optional</sub></i>
<i>NegativePattern:</i>
       <i>Prefix<sub>optional</sub></i> <i>MinimumInteger</i> <i>Suffix<sub>optional</sub></i>
<i>Prefix:</i>
     Any characters except the {@linkplain
     DecimalFormat##special_pattern_character special pattern characters}
<i>Suffix:</i>
     Any characters except the {@linkplain
     DecimalFormat##special_pattern_character special pattern characters}
<i>MinimumInteger:</i>
     0
     0 <i>MinimumInteger</i>
</pre></blockquote>

@spec https://www.unicode.org/reports/tr35
     Unicode Locale Data Markup Language (LDML)
@see NumberFormat.Style
@see NumberFormat
@see DecimalFormat
@see Locale
@since 12

## CompactNumberFormat.CompactNumberFormat(String, DecimalFormatSymbols, String[])

```java
public CompactNumberFormat(String decimalPattern, DecimalFormatSymbols symbols, String[] compactPatterns)
```

Creates a {@code CompactNumberFormat} using the given decimal pattern,
decimal format symbols and compact patterns.
To obtain the instance of {@code CompactNumberFormat} with the standard
compact patterns for a {@code Locale} and {@code Style},
it is recommended to use the factory methods given by
{@code NumberFormat} for compact number formatting.

<p>Below is an example of using the constructor,

{@snippet lang=java :
String[] compactPatterns = {"", "", "", "a lot"};
NumberFormat fmt = new CompactNumberFormat("00", DecimalFormatSymbols.getInstance(Locale.US), compactPatterns);
fmt.format(1); // returns "01"
fmt.format(1000); // returns "a lot"
}

@param decimalPattern a {@linkplain DecimalFormat##patterns decimal pattern}
                      for general number formatting
@param symbols the set of symbols to be used
@param compactPatterns an array of
       {@linkplain ##compact_number_patterns compact number patterns}
@throws NullPointerException if any of the given arguments is
      {@code null}
@throws IllegalArgumentException if the given {@code decimalPattern} or the
      {@code compactPatterns} array contains an invalid pattern
      or if a {@code null} appears in the array of compact
      patterns
@see DecimalFormat#DecimalFormat(java.lang.String, DecimalFormatSymbols)
@see DecimalFormatSymbols

## CompactNumberFormat.CompactNumberFormat(String, DecimalFormatSymbols, String[], String)

```java
public CompactNumberFormat(String decimalPattern, DecimalFormatSymbols symbols, String[] compactPatterns, String pluralRules)
```

Creates a {@code CompactNumberFormat} using the given decimal pattern,
decimal format symbols, compact patterns, and plural rules.
To obtain the instance of {@code CompactNumberFormat} with the standard
compact patterns for a {@code Locale}, {@code Style}, and {@code pluralRules},
it is recommended to use the factory methods given by
{@code NumberFormat} for compact number formatting. For example,
{@link NumberFormat#getCompactNumberInstance(Locale, Style)}.

@param decimalPattern a {@linkplain DecimalFormat##patterns decimal pattern}
                     for general number formatting
@param symbols the set of symbols to be used
@param compactPatterns an array of
       {@linkplain ##compact_number_patterns compact number patterns}
@param pluralRules a String designating plural rules which associate
       the {@code Count} keyword, such as "{@code one}", and the
       actual integer number. Its syntax is defined in Unicode Consortium's
       <a href = "http://unicode.org/reports/tr35/tr35-numbers.html#Plural_rules_syntax">
       Plural rules syntax</a>
@throws NullPointerException if any of the given arguments is
       {@code null}
@throws IllegalArgumentException if the given {@code decimalPattern},
       the {@code compactPatterns} array contains an invalid pattern,
       a {@code null} appears in the array of compact patterns,
       or if the given {@code pluralRules} contains an invalid syntax

@spec https://www.unicode.org/reports/tr35
     Unicode Locale Data Markup Language (LDML)
@see DecimalFormat#DecimalFormat(java.lang.String, DecimalFormatSymbols)
@see DecimalFormatSymbols
@since 14

## CompactNumberFormat.format(Object, StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object number, StringBuffer toAppendTo, FieldPosition fieldPosition)
```

Formats a number to produce a string representing its compact form.
The number can be of any subclass of {@link java.lang.Number}.
@param number     the number to format
@param toAppendTo the {@code StringBuffer} to which the formatted
                  text is to be appended
@param fieldPosition    keeps track on the position of the field within
                        the returned string. For example, for formatting
                        a number {@code 123456789} in the
                        {@link java.util.Locale#US US locale},
                        if the given {@code fieldPosition} is
                        {@link NumberFormat#INTEGER_FIELD}, the begin
                        index and end index of {@code fieldPosition}
                        will be set to 0 and 3, respectively for the
                        output string {@code 123M}. Similarly, positions
                        of the prefix and the suffix fields can be
                        obtained using {@link NumberFormat.Field#PREFIX}
                        and {@link NumberFormat.Field#SUFFIX} respectively.
@return           the {@code StringBuffer} passed in as {@code toAppendTo}
@throws           IllegalArgumentException if {@code number} is
                  {@code null} or not an instance of {@code Number}
@throws           NullPointerException if {@code toAppendTo} or
                  {@code fieldPosition} is {@code null}
@throws           ArithmeticException if rounding is needed with rounding
                  mode being set to {@code RoundingMode.UNNECESSARY}
@see              FieldPosition

## CompactNumberFormat.format(double, StringBuffer, FieldPosition)

```java
public StringBuffer format(double number, StringBuffer result, FieldPosition fieldPosition)
```

Formats a double to produce a string representing its compact form.
@param number    the double number to format
@param result    where the text is to be appended
@param fieldPosition    keeps track on the position of the field within
                        the returned string. For example, to format
                        a number {@code 1234567.89} in the
                        {@link java.util.Locale#US US locale}
                        if the given {@code fieldPosition} is
                        {@link NumberFormat#INTEGER_FIELD}, the begin
                        index and end index of {@code fieldPosition}
                        will be set to 0 and 1, respectively for the
                        output string {@code 1M}. Similarly, positions
                        of the prefix and the suffix fields can be
                        obtained using {@link NumberFormat.Field#PREFIX}
                        and {@link NumberFormat.Field#SUFFIX} respectively.
@return    the {@code StringBuffer} passed in as {@code result}
@throws NullPointerException if {@code result} or
           {@code fieldPosition} is {@code null}
@throws ArithmeticException if rounding is needed with rounding
           mode being set to {@code RoundingMode.UNNECESSARY}
@see FieldPosition

## CompactNumberFormat.format(long, StringBuffer, FieldPosition)

```java
public StringBuffer format(long number, StringBuffer result, FieldPosition fieldPosition)
```

Formats a long to produce a string representing its compact form.
@param number    the long number to format
@param result    where the text is to be appended
@param fieldPosition    keeps track on the position of the field within
                        the returned string. For example, to format
                        a number {@code 123456789} in the
                        {@link java.util.Locale#US US locale},
                        if the given {@code fieldPosition} is
                        {@link NumberFormat#INTEGER_FIELD}, the begin
                        index and end index of {@code fieldPosition}
                        will be set to 0 and 3, respectively for the
                        output string {@code 123M}. Similarly, positions
                        of the prefix and the suffix fields can be
                        obtained using {@link NumberFormat.Field#PREFIX}
                        and {@link NumberFormat.Field#SUFFIX} respectively.
@return       the {@code StringBuffer} passed in as {@code result}
@throws       NullPointerException if {@code result} or
              {@code fieldPosition} is {@code null}
@throws       ArithmeticException if rounding is needed with rounding
              mode being set to {@code RoundingMode.UNNECESSARY}
@see FieldPosition

## CompactNumberFormat.formatToCharacterIterator(Object)

```java
public AttributedCharacterIterator formatToCharacterIterator(Object obj)
```

Formats an Object producing an {@code AttributedCharacterIterator}.
The returned {@code AttributedCharacterIterator} can be used
to build the resulting string, as well as to determine information
about the resulting string.
<p>
Each attribute key of the {@code AttributedCharacterIterator} will
be of type {@code NumberFormat.Field}, with the attribute value
being the same as the attribute key. The prefix and the suffix
parts of the returned iterator (if present) are represented by
the attributes {@link NumberFormat.Field#PREFIX} and
{@link NumberFormat.Field#SUFFIX} respectively.


@throws NullPointerException if obj is null
@throws IllegalArgumentException when the Format cannot format the
        given object
@throws ArithmeticException if rounding is needed with rounding
        mode being set to {@code RoundingMode.UNNECESSARY}
@param obj The object to format
@return an {@code AttributedCharacterIterator} describing the
        formatted value

## CompactNumberFormat.parse(String, ParsePosition)

```java
public Number parse(String text, ParsePosition pos)
```

{@inheritDoc NumberFormat}
<p>
The returned value is the numeric part in the given text multiplied
by the numeric equivalent of the affix attached
(For example, "K" = 1000 in {@link java.util.Locale#US US locale}).
<p>
A {@code CompactNumberFormat} can match
the default prefix/suffix to a compact prefix/suffix interchangeably.
<p>
Parsing can be done in either a strict or lenient manner, by default it is lenient.
<p>
Parsing fails when <b>lenient</b>, if the prefix and/or suffix are non-empty
and cannot be found due to parsing ending early, or the first character
after the prefix cannot be parsed.
<p>
Parsing fails when <b>strict</b>, if in {@code text},
<ul>
  <li> The default or a compact prefix is not found. For example, the {@code
  Locale.US} currency format prefix: "{@code $}"
  <li> The default or a compact suffix is not found. For example, a {@code Locale.US}
  {@link NumberFormat.Style#SHORT} compact suffix: "{@code K}"
  <li> {@link #isGroupingUsed()} returns {@code false}, and the grouping
  symbol is found
  <li> {@link #isGroupingUsed()} returns {@code true}, and {@link
  #getGroupingSize()} is not adhered to
  <li> {@link #isParseIntegerOnly()} returns {@code true}, and the decimal
  separator is found
  <li> {@link #isGroupingUsed()} returns {@code true} and {@link
  #isParseIntegerOnly()} returns {@code false}, and the grouping
  symbol occurs after the decimal separator
  <li> Any other characters are found, that are not the expected symbols,
  and are not digits that occur within the numerical portion
</ul>
<p>
The subclass returned depends on the value of
{@link #isParseBigDecimal}.
<ul>
<li>If {@link #isParseBigDecimal()} is false (the default),
    most integer values are returned as {@code Long}
    objects, no matter how they are written: {@code "17K"} and
    {@code "17.000K"} both parse to {@code Long.valueOf(17000)}.
    If the value cannot fit into {@code Long}, then the result is
    returned as {@code Double}. This includes values with a
    fractional part, infinite values, {@code NaN},
    and the value -0.0.
    <p>
    Callers may use the {@code Number} methods {@code doubleValue},
    {@code longValue}, etc., to obtain the type they want.

<li>If {@link #isParseBigDecimal()} is true, values are returned
    as {@code BigDecimal} objects. The special cases negative
    and positive infinity and NaN are returned as {@code Double}
    instances holding the values of the corresponding
    {@code Double} constants.
</ul>
<p>
{@code CompactNumberFormat} parses all Unicode characters that represent
decimal digits, as defined by {@code Character.digit()}. In
addition, {@code CompactNumberFormat} also recognizes as digits the ten
consecutive characters starting with the localized zero digit defined in
the {@code DecimalFormatSymbols} object.
<p>
{@code CompactNumberFormat} parse does not allow parsing scientific
notations. For example, parsing a string {@code "1.05E4K"} in
{@link java.util.Locale#US US locale} breaks at character 'E'
and returns 1.05.

@param text the string to be parsed
@param pos  a {@code ParsePosition} object with index and error
            index information as described above
@return the parsed value, or {@code null} if the parse fails
@throws     NullPointerException if {@code text} or
            {@code pos} is null

## CompactNumberFormat.setMaximumIntegerDigits(int)

```java
public void setMaximumIntegerDigits(int newValue)
```

{@inheritDoc NumberFormat}
<p>The maximum allowed integer range is 309, if the {@code newValue} &gt;
309, then the maximum integer digits count is set to 309.
@param newValue the maximum number of integer digits to be shown.

## CompactNumberFormat.setMinimumIntegerDigits(int)

```java
public void setMinimumIntegerDigits(int newValue)
```

{@inheritDoc NumberFormat}
<p>The maximum allowed integer range is 309, if the {@code newValue} &gt;
309, then the minimum integer digits count is set to 309.
@param newValue the minimum number of integer digits to be shown.

## CompactNumberFormat.setMinimumFractionDigits(int)

```java
public void setMinimumFractionDigits(int newValue)
```

{@inheritDoc NumberFormat}
<p>The maximum allowed fraction range is 340, if the {@code newValue} &gt;
340, then the minimum fraction digits count is set to 340.
@param newValue the minimum number of fraction digits to be shown.

## CompactNumberFormat.setMaximumFractionDigits(int)

```java
public void setMaximumFractionDigits(int newValue)
```

{@inheritDoc NumberFormat}
<p>The maximum allowed fraction range is 340, if the {@code newValue} &gt;
340, then the maximum fraction digits count is set to 340.
@param newValue the maximum number of fraction digits to be shown.

## CompactNumberFormat.getRoundingMode()

```java
public RoundingMode getRoundingMode()
```

Gets the {@link java.math.RoundingMode} used in this
{@code CompactNumberFormat}.

@return the {@code RoundingMode} used for this
        {@code CompactNumberFormat}
@see #setRoundingMode(RoundingMode)

## CompactNumberFormat.setRoundingMode(RoundingMode)

```java
public void setRoundingMode(RoundingMode roundingMode)
```

Sets the {@link java.math.RoundingMode} used in this
{@code CompactNumberFormat}.

@param roundingMode the {@code RoundingMode} to be used
@see #getRoundingMode()
@throws NullPointerException if {@code roundingMode} is {@code null}

## CompactNumberFormat.getGroupingSize()

```java
public int getGroupingSize()
```

Returns the grouping size. Grouping size is the number of digits between
grouping separators in the integer portion of a number. For example,
in the compact number {@code "12,347 trillion"} for the
{@link java.util.Locale#US US locale}, the grouping size is 3.

@return the grouping size
@see #setGroupingSize
@see java.text.NumberFormat#isGroupingUsed
@see java.text.DecimalFormatSymbols#getGroupingSeparator

## CompactNumberFormat.setGroupingSize(int)

```java
public void setGroupingSize(int newValue)
```

Sets the grouping size. Grouping size is the number of digits between
grouping separators in the integer portion of a number. For example,
in the compact number {@code "12,347 trillion"} for the
{@link java.util.Locale#US US locale}, the grouping size is 3. The grouping
size must be greater than or equal to zero and less than or equal to 127.

@param newValue the new grouping size
@see #getGroupingSize
@see java.text.NumberFormat#setGroupingUsed
@see java.text.DecimalFormatSymbols#setGroupingSeparator
@throws IllegalArgumentException if {@code newValue} is negative or
larger than 127

## CompactNumberFormat.isGroupingUsed()

```java
public boolean isGroupingUsed()
```

Returns true if grouping is used in this format. For example, with
grouping on and grouping size set to 3, the number {@code 12346567890987654}
can be formatted as {@code "12,347 trillion"} in the
{@link java.util.Locale#US US locale}.
The grouping separator is locale dependent.

@return {@code true} if grouping is used;
        {@code false} otherwise
@see #setGroupingUsed

## CompactNumberFormat.setGroupingUsed(boolean)

```java
public void setGroupingUsed(boolean newValue)
```

Sets whether or not grouping will be used in this format.

@param newValue {@code true} if grouping is used;
                {@code false} otherwise
@see #isGroupingUsed

## CompactNumberFormat.isParseIntegerOnly()

```java
public boolean isParseIntegerOnly()
```

Returns true if this format parses only an integer from the number
component of a compact number.
Parsing an integer means that only an integer is considered from the
number component, prefix/suffix is still considered to compute the
resulting output.
For example, in the {@link java.util.Locale#US US locale}, if this method
returns {@code true}, the string {@code "1234.78 thousand"} would be
parsed as the value {@code 1234000} (1234 (integer part) * 1000
(thousand)) and the fractional part would be skipped.
The exact format accepted by the parse operation is locale dependent.
@implSpec This implementation does not set the {@code ParsePosition} index
to the position of the decimal symbol, but rather the end of the string.

@return {@code true} if compact numbers should be parsed as integers
        only; {@code false} otherwise

## CompactNumberFormat.setParseIntegerOnly(boolean)

```java
public void setParseIntegerOnly(boolean value)
```

Sets whether or not this format parses only an integer from the number
component of a compact number.

@param value {@code true} if compact numbers should be parsed as
             integers only; {@code false} otherwise
@see #isParseIntegerOnly

## CompactNumberFormat.isStrict()

```java
public boolean isStrict()
```

{@inheritDoc NumberFormat}

@see #setStrict(boolean)
@see #parse(String, ParsePosition)
@since 23

## CompactNumberFormat.setStrict(boolean)

```java
public void setStrict(boolean strict)
```

{@inheritDoc NumberFormat}

@see #isStrict()
@see #parse(String, ParsePosition)
@since 23

## CompactNumberFormat.isParseBigDecimal()

```java
public boolean isParseBigDecimal()
```

Returns whether the {@link #parse(String, ParsePosition)}
method returns {@code BigDecimal}. The default value is false.

@return {@code true} if the parse method returns BigDecimal;
        {@code false} otherwise
@see #setParseBigDecimal

## CompactNumberFormat.setParseBigDecimal(boolean)

```java
public void setParseBigDecimal(boolean newValue)
```

Sets whether the {@link #parse(String, ParsePosition)}
method returns {@code BigDecimal}.

@param newValue {@code true} if the parse method returns BigDecimal;
                {@code false} otherwise
@see #isParseBigDecimal

## CompactNumberFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code CompactNumberFormat} for equality.
Returns true if the object is also a {@code CompactNumberFormat} and the
two formats would format any value the same.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param obj the object to compare with
@return true if this is equal to the other {@code CompactNumberFormat}
@see Object#hashCode()

## CompactNumberFormat.hashCode()

```java
public int hashCode()
```

{@return the hash code for this {@code CompactNumberFormat}}

@implSpec Non-transient instance fields of this class are used to calculate
a hash code value which adheres to the contract defined in {@link Objects#hashCode}
@see Object#hashCode()

## CompactNumberFormat.toString()

```java
public String toString()
```

{@return a string identifying this {@code CompactNumberFormat}, for debugging}

## CompactNumberFormat.clone()

```java
public CompactNumberFormat clone()
```

Creates and returns a copy of this {@code CompactNumberFormat}
instance.

@return a clone of this instance