# DecimalFormat class (java.text)

```java
public class DecimalFormat extends NumberFormat
```

{@code DecimalFormat} is a concrete subclass of
{@code NumberFormat} that formats decimal numbers in a localized manner.
It has a variety of features designed to make it possible to parse and format
numbers in any locale, including support for Western, Arabic, and Indic digits.
It also supports different kinds of numbers, including integers (123), fixed-point
numbers (123.4), scientific notation (1.23E4), percentages (12%), and
currency amounts ($123).

<h2>Getting a DecimalFormat</h2>

To obtain a standard decimal format for a specific locale, including the default locale,
it is recommended to call one of the {@code NumberFormat}
{@link NumberFormat##factory_methods factory methods}, such as {@link NumberFormat#getInstance()}.
These factory methods may not always return a {@code DecimalFormat}
depending on the locale-service provider implementation
installed. Thus, to use an instance method defined by {@code DecimalFormat},
the {@code NumberFormat} returned by the factory method should be
type checked before converted to {@code DecimalFormat}. If the installed locale-sensitive
service implementation does not support the given {@code Locale}, the parent
locale chain will be looked up, and a {@code Locale} used that is supported.

<p>If the factory methods are not desired, use one of the constructors such
as {@link #DecimalFormat(String) DecimalFormat(String pattern)}. See the {@link
##patterns Pattern} section for more information on the {@code pattern} parameter.

<h2>Using DecimalFormat</h2>
The following is an example of formatting and parsing,
{@snippet lang=java :
NumberFormat nFmt = NumberFormat.getCurrencyInstance(Locale.US);
if (nFmt instanceof DecimalFormat dFmt) {
    // pattern match to DecimalFormat to use setPositiveSuffix(String)
    dFmt.setPositiveSuffix(" dollars");
    dFmt.format(100000); // returns "$100,000.00 dollars"
    dFmt.parse("$100,000.00 dollars"); // returns 100000
}
}


<h2 id="formatting">Formatting and Parsing</h2>
<h3 id="rounding">Rounding</h3>

When formatting, {@code DecimalFormat} can adjust its rounding using {@link
#setRoundingMode(RoundingMode)}. By default, it uses
{@link java.math.RoundingMode#HALF_EVEN RoundingMode.HALF_EVEN}.

<h3>Digits</h3>

When formatting, {@code DecimalFormat} uses the ten consecutive
characters starting with the localized zero digit defined in the
{@code DecimalFormatSymbols} object as digits.
<p>When parsing, these digits as well as all Unicode decimal digits, as
defined by {@link Character#digit Character.digit}, are recognized.

<h3 id="digit_limits"> Integer and Fraction Digit Limits </h3>
The integer and fraction digit limits are set by either applying a {@link ##patterns
pattern} or using one of the appropriate {@code DecimalFormat} setter methods,
for example, {@link #setMinimumFractionDigits(int)}. These limits have no impact
on parsing behavior.

<h3>Special Values</h3>
<ul>
<li><p><b>Not a Number</b> ({@code NaN}) is formatted as a string,
which is typically given as "NaN". This string is determined by {@link
DecimalFormatSymbols#getNaN()}. This is the only value for which the prefixes
and suffixes are not attached.

<li><p><b>Infinity</b> is formatted as a string, which is typically given as
"&#8734;" ({@code U+221E}), with the positive or negative prefixes and suffixes
attached. This string is determined by {@link DecimalFormatSymbols#getInfinity()}.

<li><p><b>Negative zero</b> ({@code "-0"}) parses to
<ul>
<li>{@code BigDecimal(0)} if {@code isParseBigDecimal()} is
true
<li>{@code Long(0)} if {@code isParseBigDecimal()} is false
    and {@code isParseIntegerOnly()} is true
<li>{@code Double(-0.0)} if both {@code isParseBigDecimal()}
and {@code isParseIntegerOnly()} are false
</ul>
</ul>

<h2><a id="synchronization">Synchronization</a></h2>

<p>
Decimal formats are generally not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

<h2 id="patterns">DecimalFormat Pattern</h2>

A {@code DecimalFormat} comprises a <em>pattern</em> and a set of
<em>symbols</em>. The pattern may be set directly using {@code applyPattern()},
or indirectly using the various API methods. The symbols are stored in a {@code
DecimalFormatSymbols} object. When using the {@code NumberFormat} factory
methods, the pattern and symbols are created from the locale-sensitive service
implementation installed.

<p> {@code DecimalFormat} patterns have the following syntax:
<blockquote><pre>
<i>Pattern:</i>
        <i>PositivePattern</i>
        <i>PositivePattern</i> ; <i>NegativePattern</i>
<i>PositivePattern:</i>
        <i>Prefix<sub>opt</sub></i> <i>Number</i> <i>Suffix<sub>opt</sub></i>
<i>NegativePattern:</i>
        <i>Prefix<sub>opt</sub></i> <i>Number</i> <i>Suffix<sub>opt</sub></i>
<i>Prefix:</i>
        Any characters except the {@linkplain ##special_pattern_character
        special pattern characters}
<i>Suffix:</i>
        Any characters except the {@linkplain ##special_pattern_character
        special pattern characters}
<i>Number:</i>
        <i>Integer</i> <i>Exponent<sub>opt</sub></i>
        <i>Integer</i> . <i>Fraction</i> <i>Exponent<sub>opt</sub></i>
<i>Integer:</i>
        <i>MinimumInteger</i>
        #
        # <i>Integer</i>
        # , <i>Integer</i>
<i>MinimumInteger:</i>
        0
        0 <i>MinimumInteger</i>
        0 , <i>MinimumInteger</i>
<i>Fraction:</i>
        <i>MinimumFraction<sub>opt</sub></i> <i>OptionalFraction<sub>opt</sub></i>
<i>MinimumFraction:</i>
        0 <i>MinimumFraction<sub>opt</sub></i>
<i>OptionalFraction:</i>
        # <i>OptionalFraction<sub>opt</sub></i>
<i>Exponent:</i>
        E <i>MinimumExponent</i>
<i>MinimumExponent:</i>
        0 <i>MinimumExponent<sub>opt</sub></i>
</pre></blockquote>

<h3><a id="special_pattern_character">Special Pattern Characters</a></h3>

<p>The special characters in the table below are interpreted syntactically when
used in the DecimalFormat pattern.
They must be quoted, unless noted otherwise, if they are to appear in the
prefix or suffix as literals.

<p> The characters in the {@code Symbol} column are used in non-localized
patterns. The corresponding characters in the {@code Localized Symbol} column are used
in localized patterns, with the characters in {@code Symbol} losing their
syntactical meaning. Two exceptions are the currency sign ({@code U+00A4}) and
quote ({@code U+0027}), which are not localized.
<p>
Non-localized patterns should be used when calling {@link #applyPattern(String)}.
Localized patterns should be used when calling {@link #applyLocalizedPattern(String)}.

<blockquote>
<table class="striped">
<caption style="display:none">Chart showing symbol, location, localized, and meaning.</caption>
<thead>
    <tr>
         <th scope="col" style="text-align:left">Symbol
         <th scope="col" style="text-align:left">Localized Symbol
         <th scope="col" style="text-align:left">Location
         <th scope="col" style="text-align:left;width:50%">Meaning
</thead>
<tbody>
    <tr>
         <th scope="row">{@code 0}
         <td>{@link DecimalFormatSymbols#getZeroDigit()}
         <td>Number
         <td>Digit
    <tr>
         <th scope="row">{@code #}
         <td>{@link DecimalFormatSymbols#getDigit()}
         <td>Number
         <td>Digit, zero shows as absent
    <tr>
         <th scope="row">{@code .}
         <td>{@link DecimalFormatSymbols#getDecimalSeparator()}
         <td>Number
         <td>Decimal separator or monetary decimal separator
    <tr>
         <th scope="row">{@code - (U+002D)}
         <td>{@link DecimalFormatSymbols#getMinusSign()}
         <td>Number
         <td>Minus sign
    <tr>
         <th scope="row">{@code ,}
         <td>{@link DecimalFormatSymbols#getGroupingSeparator()}
         <td>Number
         <td>Grouping separator or monetary grouping separator
    <tr>
         <th scope="row">{@code E}
         <td>{@link DecimalFormatSymbols#getExponentSeparator()}
         <td>Number
         <td>Separates mantissa and exponent in scientific notation. This value
             is case sensistive. <em>Need not be quoted in prefix or suffix.</em>
    <tr>
         <th scope="row">{@code ;}
         <td>{@link DecimalFormatSymbols#getPatternSeparator()}
         <td>Subpattern boundary
         <td>Separates positive and negative subpatterns
    <tr>
         <th scope="row">{@code %}
         <td>{@link DecimalFormatSymbols#getPercent()}
         <td>Prefix or suffix
         <td>Multiply by 100 and show as percentage
    <tr>
         <th scope="row">&permil; ({@code U+2030})
         <td>{@link DecimalFormatSymbols#getPerMill()}
         <td>Prefix or suffix
         <td>Multiply by 1000 and show as per mille value
    <tr>
         <th scope="row">&#164; ({@code U+00A4})
         <td> n/a (not localized)
         <td>Prefix or suffix
         <td>Currency sign, replaced by currency symbol.  If
             doubled, replaced by international currency symbol.
             If present in a pattern, the monetary decimal/grouping separators
             are used instead of the decimal/grouping separators.
    <tr>
         <th scope="row">{@code ' (U+0027)}
         <td> n/a (not localized)
         <td>Prefix or suffix
         <td>Used to quote special characters in a prefix or suffix,
             for example, {@code "'#'#"} formats 123 to
             {@code "#123"}.  To create a single quote
             itself, use two in a row: {@code "# o''clock"}.
</tbody>
</table>
</blockquote>

<h3>Maximum Digits Derivation</h3>
For any given {@code DecimalFormat} pattern, if the pattern is not
in scientific notation, the maximum number of integer digits will not be
derived from the pattern, and instead set to {@link Integer#MAX_VALUE}.
Otherwise, if the pattern is in scientific notation, the maximum number of
integer digits will be derived from the pattern. This derivation is detailed
in the {@link ##scientific_notation Scientific Notation} section. {@link
#setMaximumIntegerDigits(int)} can be used to manually adjust the maximum
integer digits.

<h3>Negative Subpatterns</h3>
A {@code DecimalFormat} pattern contains a positive and negative
subpattern, for example, {@code "#,##0.00;(#,##0.00)"}.  Each
subpattern has a prefix, numeric part, and suffix. The negative subpattern
is optional; if absent, then the positive subpattern prefixed with the
minus sign {@code '-' (U+002D HYPHEN-MINUS)} is used as the
negative subpattern. That is, {@code "0.00"} alone is equivalent to
{@code "0.00;-0.00"}.  If there is an explicit negative subpattern, it
serves only to specify the negative prefix and suffix; the number of digits,
minimal digits, and other characteristics are all the same as the positive
pattern. That means that {@code "#,##0.0#;(#)"} produces precisely
the same behavior as {@code "#,##0.0#;(#,##0.0#)"}.

<p>The prefixes, suffixes, and various symbols used for infinity, digits,
grouping separators, decimal separators, etc. may be set to arbitrary
values, and they will appear properly during formatting.  However, care must
be taken that the symbols and strings do not conflict, or parsing will be
unreliable.  For example, either the positive and negative prefixes or the
suffixes must be distinct for {@code DecimalFormat.parse()} to be able
to distinguish positive from negative values.  (If they are identical, then
{@code DecimalFormat} will behave as if no negative subpattern was
specified.)  Another example is that the decimal separator and grouping
separator should be distinct characters, or parsing will be impossible.

<h3>Grouping Separator</h3>
<p>The grouping separator is commonly used for thousands, but in some
locales it separates ten-thousands. The grouping size is a constant number
of digits between the grouping characters, such as 3 for 100,000,000 or 4 for
1,0000,0000. If you supply a pattern with multiple grouping characters, the
interval between the last one and the end of the integer is the one that is
used. For example, {@code "#,##,###,####"} == {@code "######,####"} ==
{@code "##,####,####"}.

<h3 id="scientific_notation">Scientific Notation</h3>

<p>Numbers in scientific notation are expressed as the product of a mantissa
and a power of ten, for example, 1234 can be expressed as 1.234 x 10^3.  The
mantissa is often in the range 1.0 &le; x {@literal <} 10.0, but it need not
be.
{@code DecimalFormat} can be instructed to format and parse scientific
notation <em>only via a pattern</em>; there is currently no factory method
that creates a scientific notation format.  In a pattern, the exponent
character immediately followed by one or more digit characters indicates
scientific notation.  Example: {@code "0.###E0"} formats the number
1234 as {@code "1.234E3"}.

<ul>
<li>The number of digit characters after the exponent character gives the
minimum exponent digit count.  There is no maximum.  Negative exponents are
formatted using the localized minus sign, <em>not</em> the prefix and suffix
from the pattern.  This allows patterns such as {@code "0.###E0 m/s"}.

<li>The <em>maximum integer</em> digits is the sum of '0's and '#'s
prior to the decimal point. The <em>minimum integer</em> digits is the
sum of the '0's prior to the decimal point. The <em>maximum fraction</em>
and <em>minimum fraction</em> digits follow the same rules, but apply to the
digits after the decimal point but before the exponent. For example, the
following pattern: {@code "#00.0####E0"} would have a minimum number of
integer digits = 2("00") and a maximum number of integer digits = 3("#00"). It
would have a minimum number of fraction digits = 1("0") and a maximum number of fraction
digits= 5("0####").

<li>The minimum and maximum number of integer digits are interpreted
together:

<ul>
<li>If the maximum number of integer digits is greater than their minimum number
and greater than 1, it forces the exponent to be a multiple of the maximum
number of integer digits, and the minimum number of integer digits to be
interpreted as 1.  The most common use of this is to generate
<em>engineering notation</em>, in which the exponent is a multiple of three,
e.g., {@code "##0.#####E0"}. Using this pattern, the number 12345
formats to {@code "12.345E3"}, and 123456 formats to
{@code "123.456E3"}.

<li>Otherwise, the minimum number of integer digits is achieved by adjusting the
exponent.  Example: 0.00123 formatted with {@code "00.###E0"} yields
{@code "12.3E-4"}.
</ul>

<li>For a given number, the amount of significant digits in
the mantissa can be calculated as such

<blockquote><pre>
<i>Mantissa Digits:</i>
        min(max(Minimum Pattern Digits, Original Number Digits), Maximum Pattern Digits)
<i>Minimum pattern Digits:</i>
        <i>Minimum Integer Digits</i> + <i>Minimum Fraction Digits</i>
<i>Maximum pattern Digits:</i>
        <i>Maximum Integer Digits</i> + <i>Maximum Fraction Digits</i>
<i>Original Number Digits:</i>
        The amount of significant digits in the number to be formatted
</pre></blockquote>

This means that generally, a mantissa will have up to the combined maximum integer
and fraction digits, if the original number itself has enough significant digits. However,
if there are more minimum pattern digits than significant digits in the original number,
the mantissa will have significant digits that equals the combined
minimum integer and fraction digits. The number of significant digits
does not affect parsing.

<p>It should be noted, that the integer portion of the mantissa will give
any excess digits to the fraction portion, whether it be for precision or
for satisfying the total amount of combined minimum digits.

<p>This behavior can be observed in the following example,
{@snippet lang=java :
    DecimalFormat df = new DecimalFormat("#000.000##E0");
    df.format(12); // returns "12.0000E0"
    df.format(123456789) // returns "1.23456789E8"
}

<li>Exponential patterns may not contain grouping separators.
</ul>

@implSpec
When formatting a {@code Number} other than {@code BigInteger} and
{@code BigDecimal}, {@code 309} is used as the upper limit for integer digits,
and {@code 340} as the upper limit for fraction digits. This occurs, even if
one of the {@code DecimalFormat} getter methods, for example, {@link #getMinimumFractionDigits()}
returns a numerically greater value.

@spec         https://www.unicode.org/reports/tr35
              Unicode Locale Data Markup Language (LDML)
@see          <a href="http://docs.oracle.com/javase/tutorial/i18n/format/decimalFormat.html">Java Tutorial</a>
@see          NumberFormat
@see          DecimalFormatSymbols
@see          ParsePosition
@see          Locale
@author       Mark Davis
@author       Alan Liu
@since 1.1

## DecimalFormat.DecimalFormat()

```java
public DecimalFormat()
```

Creates a DecimalFormat using the default pattern and symbols
for the default {@link java.util.Locale.Category#FORMAT FORMAT} locale.
This is a convenient way to obtain a
DecimalFormat when internationalization is not the main concern.

@apiNote To obtain standard formats for a given locale, use the
{@code NumberFormat} factory methods such as {@link
NumberFormat#getNumberInstance(Locale)}. These factories will return the most
appropriate subclass of NumberFormat for a given locale.
@see NumberFormat#getInstance(Locale)
@see NumberFormat#getNumberInstance(Locale)
@see NumberFormat#getCurrencyInstance(Locale)
@see NumberFormat#getPercentInstance(Locale)

## DecimalFormat.DecimalFormat(String)

```java
public DecimalFormat(String pattern)
```

Creates a DecimalFormat using the given pattern and the symbols
for the default {@link java.util.Locale.Category#FORMAT FORMAT} locale.
This is a convenient way to obtain a
DecimalFormat when internationalization is not the main concern.
The number of maximum integer digits is usually not derived from the pattern.
See the note in the {@link ##patterns Patterns} section for more detail.

@apiNote To obtain standard formats for a given locale, use the
{@code NumberFormat} factory methods such as {@link
NumberFormat#getNumberInstance(Locale)}. These factories will return the most
appropriate subclass of NumberFormat for a given locale.
@param pattern a non-localized pattern string.
@throws    NullPointerException if {@code pattern} is null
@throws    IllegalArgumentException if the given pattern is invalid.
@see NumberFormat#getInstance(Locale)
@see NumberFormat#getNumberInstance(Locale)
@see NumberFormat#getCurrencyInstance(Locale)
@see NumberFormat#getPercentInstance(Locale)

## DecimalFormat.DecimalFormat(String, DecimalFormatSymbols)

```java
public DecimalFormat (String pattern, DecimalFormatSymbols symbols)
```

Creates a DecimalFormat using the given pattern and symbols.
Use this constructor when you need to completely customize the
behavior of the format.
The number of maximum integer digits is usually not derived from the pattern.
See the note in the {@link ##patterns Patterns} section for more detail.

@apiNote To obtain standard formats for a given locale, use the
{@code NumberFormat} factory methods such as {@link
NumberFormat#getInstance(Locale)} or {@link NumberFormat#getCurrencyInstance(Locale)}.
If you need only minor adjustments to a standard format, you can modify
the format returned by a NumberFormat factory method.
@param pattern a non-localized pattern string
@param symbols the set of symbols to be used
@throws    NullPointerException if any of the given arguments is null
@throws    IllegalArgumentException if the given pattern is invalid
@see NumberFormat#getInstance(Locale)
@see NumberFormat#getNumberInstance(Locale)
@see NumberFormat#getCurrencyInstance(Locale)
@see NumberFormat#getPercentInstance(Locale)
@see java.text.DecimalFormatSymbols

## DecimalFormat.format(Object, StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object number, StringBuffer toAppendTo, FieldPosition pos)
```

Formats a number and appends the resulting text to the given string
buffer.
The number can be of any subclass of {@link java.lang.Number}.

@implSpec This implementation uses the maximum precision permitted.
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

## DecimalFormat.format(double, StringBuffer, FieldPosition)

```java
public StringBuffer format(double number, StringBuffer result, FieldPosition fieldPosition)
```

Formats a double to produce a string.
@param number    The double to format
@param result    where the text is to be appended
@param fieldPosition    keeps track on the position of the field within
                        the returned string. For example, for formatting
                        a number {@code 1234567.89} in {@code Locale.US}
                        locale, if the given {@code fieldPosition} is
                        {@link NumberFormat#INTEGER_FIELD}, the begin index
                        and end index of {@code fieldPosition} will be set
                        to 0 and 9, respectively for the output string
                        {@code 1,234,567.89}.
@throws    NullPointerException if {@code result} or
           {@code fieldPosition} is {@code null}
@throws    ArithmeticException if rounding is needed with rounding
           mode being set to RoundingMode.UNNECESSARY
@return The formatted number string
@see java.text.FieldPosition

## DecimalFormat.format(long, StringBuffer, FieldPosition)

```java
public StringBuffer format(long number, StringBuffer result, FieldPosition fieldPosition)
```

Format a long to produce a string.
@param number    The long to format
@param result    where the text is to be appended
@param fieldPosition    keeps track on the position of the field within
                        the returned string. For example, for formatting
                        a number {@code 123456789} in {@code Locale.US}
                        locale, if the given {@code fieldPosition} is
                        {@link NumberFormat#INTEGER_FIELD}, the begin index
                        and end index of {@code fieldPosition} will be set
                        to 0 and 11, respectively for the output string
                        {@code 123,456,789}.
@throws          NullPointerException if {@code result} or
                 {@code fieldPosition} is {@code null}
@throws          ArithmeticException if rounding is needed with rounding
                 mode being set to RoundingMode.UNNECESSARY
@return The formatted number string
@see java.text.FieldPosition

## DecimalFormat.formatToCharacterIterator(Object)

```java
public AttributedCharacterIterator formatToCharacterIterator(Object obj)
```

Formats an Object producing an {@code AttributedCharacterIterator}.
You can use the returned {@code AttributedCharacterIterator}
to build the resulting String, as well as to determine information
about the resulting String.
<p>
Each attribute key of the AttributedCharacterIterator will be of type
{@code NumberFormat.Field}, with the attribute value being the
same as the attribute key.

@throws    NullPointerException if obj is null.
@throws    IllegalArgumentException when the Format cannot format the
           given object.
@throws           ArithmeticException if rounding is needed with rounding
                  mode being set to RoundingMode.UNNECESSARY
@param obj The object to format
@return AttributedCharacterIterator describing the formatted value.
@since 1.4

## DecimalFormat.parse(String, ParsePosition)

```java
public Number parse(String text, ParsePosition pos)
```

{@inheritDoc NumberFormat}
<p>
Parsing can be done in either a strict or lenient manner, by default it is lenient.
<p>
Parsing fails when <b>lenient</b>, if the prefix and/or suffix are non-empty
and cannot be found due to parsing ending early, or the first character
after the prefix cannot be parsed.
<p>
Parsing fails when <b>strict</b>, if in {@code text},
<ul>
  <li> The prefix is not found. For example, a {@code Locale.US} currency
  format prefix: "{@code $}"
  <li> The suffix is not found. For example, a {@code Locale.US} percent
  format suffix: "{@code %}"
  <li> {@link #isGroupingUsed()} returns {@code true}, and {@link
  #getGroupingSize()} is not adhered to
  <li> {@link #isGroupingUsed()} returns {@code false}, and the grouping
  symbol is found
  <li> {@link #isGroupingUsed()} returns {@code true} and the grouping
  symbol occurs after the decimal separator
  <li> Any other characters are found, that are not the expected symbols,
  and are not digits that occur within the numerical portion
</ul>
<p>
The subclass returned depends on the value of {@link #isParseBigDecimal}
as well as on the string being parsed.
<ul>
  <li>If {@code isParseBigDecimal()} is false (the default),
      most integer values are returned as {@code Long}
      objects, no matter how they are written: {@code "17"} and
      {@code "17.000"} both parse to {@code Long(17)}.
      Values that cannot fit into a {@code Long} are returned as
      {@code Double}s. This includes values with a fractional part,
      infinite values, {@code NaN}, and the value -0.0.
      {@code DecimalFormat} does <em>not</em> decide whether to
      return a {@code Double} or a {@code Long} based on the
      presence of a decimal separator in the source string. Doing so
      would prevent integers that overflow the mantissa of a double,
      such as {@code "-9,223,372,036,854,775,808.00"}, from being
      parsed accurately.
      <p>
      Callers may use the {@code Number} methods
      {@code doubleValue}, {@code longValue}, etc., to obtain
      the type they want.
  <li>If {@code isParseBigDecimal()} is true, values are returned
      as {@code BigDecimal} objects. The values are the ones
      constructed by {@link java.math.BigDecimal#BigDecimal(String)}
      for corresponding strings in locale-independent format. The
      special cases negative and positive infinity and NaN are returned
      as {@code Double} instances holding the values of the
      corresponding {@code Double} constants.
</ul>
<p>
{@code DecimalFormat} parses all Unicode characters that represent
decimal digits, as defined by {@code Character.digit()}. In
addition, {@code DecimalFormat} also recognizes as digits the ten
consecutive characters starting with the localized zero digit defined in
the {@code DecimalFormatSymbols} object.

@param text the string to be parsed
@param pos  A {@code ParsePosition} object with index and error
            index information as described above.
@return     the parsed value, or {@code null} if the parse fails
@throws     NullPointerException if {@code text} or
            {@code pos} is null.

## DecimalFormat.getDecimalFormatSymbols()

```java
public DecimalFormatSymbols getDecimalFormatSymbols()
```

Returns a copy of the decimal format symbols, which is generally not
changed by the programmer or user.
@return a copy of the desired DecimalFormatSymbols
@see java.text.DecimalFormatSymbols

## DecimalFormat.setDecimalFormatSymbols(DecimalFormatSymbols)

```java
public void setDecimalFormatSymbols(DecimalFormatSymbols newSymbols)
```

Sets the decimal format symbols, which is generally not changed
by the programmer or user.
@param newSymbols desired DecimalFormatSymbols
@see java.text.DecimalFormatSymbols

## DecimalFormat.getPositivePrefix()

```java
public String getPositivePrefix ()
```

Get the positive prefix.
<P>Examples: +123, $123, sFr123

@return the positive prefix

## DecimalFormat.setPositivePrefix(String)

```java
public void setPositivePrefix (String newValue)
```

Set the positive prefix.
<P>Examples: +123, $123, sFr123

@param newValue the new positive prefix. Non-null.
@throws NullPointerException if {@code newValue} is {@code null}

## DecimalFormat.getNegativePrefix()

```java
public String getNegativePrefix ()
```

Get the negative prefix.
<P>Examples: -123, ($123) (with negative suffix), sFr-123

@return the negative prefix

## DecimalFormat.setNegativePrefix(String)

```java
public void setNegativePrefix (String newValue)
```

Set the negative prefix.
<P>Examples: -123, ($123) (with negative suffix), sFr-123

@param newValue the new negative prefix. Non-null.
@throws NullPointerException if {@code newValue} is {@code null}

## DecimalFormat.getPositiveSuffix()

```java
public String getPositiveSuffix ()
```

Get the positive suffix.
<P>Example: 123%

@return the positive suffix

## DecimalFormat.setPositiveSuffix(String)

```java
public void setPositiveSuffix (String newValue)
```

Set the positive suffix.
<P>Example: 123%

@param newValue the new positive suffix. Non-null.
@throws NullPointerException if {@code newValue} is {@code null}

## DecimalFormat.getNegativeSuffix()

```java
public String getNegativeSuffix ()
```

Get the negative suffix.
<P>Examples: -123%, ($123) (with positive suffixes)

@return the negative suffix

## DecimalFormat.setNegativeSuffix(String)

```java
public void setNegativeSuffix (String newValue)
```

Set the negative suffix.
<P>Examples: 123%

@param newValue the new negative suffix. Non-null.
@throws NullPointerException if {@code newValue} is {@code null}

## DecimalFormat.getMultiplier()

```java
public int getMultiplier ()
```

Gets the multiplier for use in percent, per mille, and similar
formats.

@return the multiplier
@see #setMultiplier(int)

## DecimalFormat.setMultiplier(int)

```java
public void setMultiplier (int newValue)
```

Sets the multiplier for use in percent, per mille, and similar
formats.
For a percent format, set the multiplier to 100 and the suffixes to
have '%' (for Arabic, use the Arabic percent sign).
For a per mille format, set the multiplier to 1000 and the suffixes to
have '{@code U+2030}'.

<P>Example: with multiplier 100, 1.23 is formatted as "123", and
"123" is parsed into 1.23. If {@code isParseIntegerOnly()} returns {@code true},
"123" is parsed into 1.

@param newValue the new multiplier
@see #getMultiplier

## DecimalFormat.setGroupingUsed(boolean)

```java
public void setGroupingUsed(boolean newValue)
```

{@inheritDoc}

## DecimalFormat.getGroupingSize()

```java
public int getGroupingSize ()
```

Return the grouping size. Grouping size is the number of digits between
grouping separators in the integer portion of a number.  For example,
in the number "123,456.78", the grouping size is 3. Grouping size of
zero designates that grouping is not used, which provides the same
formatting as if calling {@link #setGroupingUsed(boolean)
setGroupingUsed(false)}.

@return the grouping size
@see #setGroupingSize
@see java.text.NumberFormat#isGroupingUsed
@see java.text.DecimalFormatSymbols#getGroupingSeparator

## DecimalFormat.setGroupingSize(int)

```java
public void setGroupingSize (int newValue)
```

Set the grouping size. Grouping size is the number of digits between
grouping separators in the integer portion of a number.  For example,
in the number "123,456.78", the grouping size is 3. Grouping size of
zero designates that grouping is not used, which provides the same
formatting as if calling {@link #setGroupingUsed(boolean)
setGroupingUsed(false)}.
<p>
The value passed in is converted to a byte, which may lose information.
Values that are negative or greater than
{@link java.lang.Byte#MAX_VALUE Byte.MAX_VALUE}, will throw an
{@code IllegalArgumentException}.

@param newValue the new grouping size
@see #getGroupingSize
@see java.text.NumberFormat#setGroupingUsed
@see java.text.DecimalFormatSymbols#setGroupingSeparator
@throws IllegalArgumentException if {@code newValue} is negative or
         greater than {@link java.lang.Byte#MAX_VALUE Byte.MAX_VALUE}

## DecimalFormat.isDecimalSeparatorAlwaysShown()

```java
public boolean isDecimalSeparatorAlwaysShown()
```

Allows you to get the behavior of the decimal separator with integers.
(The decimal separator will always appear with decimals.)
<P>Example: Decimal ON: 12345 &rarr; 12345.; OFF: 12345 &rarr; 12345

@return {@code true} if the decimal separator is always shown;
        {@code false} otherwise

## DecimalFormat.setDecimalSeparatorAlwaysShown(boolean)

```java
public void setDecimalSeparatorAlwaysShown(boolean newValue)
```

Allows you to set the behavior of the decimal separator with integers.
(The decimal separator will always appear with decimals.)
<P>Example: Decimal ON: 12345 &rarr; 12345.; OFF: 12345 &rarr; 12345

@param newValue {@code true} if the decimal separator is always shown;
                {@code false} otherwise

## DecimalFormat.isStrict()

```java
public boolean isStrict()
```

{@inheritDoc NumberFormat}

@see #setStrict(boolean)
@see #parse(String, ParsePosition)
@since 23

## DecimalFormat.setStrict(boolean)

```java
public void setStrict(boolean strict)
```

{@inheritDoc NumberFormat}

@see #isStrict()
@see #parse(String, ParsePosition)
@since 23

## DecimalFormat.isParseBigDecimal()

```java
public boolean isParseBigDecimal()
```

Returns whether the {@link #parse(java.lang.String, java.text.ParsePosition)}
method returns {@code BigDecimal}. The default value is false.

@return {@code true} if the parse method returns BigDecimal;
        {@code false} otherwise
@see #setParseBigDecimal
@since 1.5

## DecimalFormat.setParseBigDecimal(boolean)

```java
public void setParseBigDecimal(boolean newValue)
```

Sets whether the {@link #parse(java.lang.String, java.text.ParsePosition)}
method returns {@code BigDecimal}.

@param newValue {@code true} if the parse method returns BigDecimal;
                {@code false} otherwise
@see #isParseBigDecimal
@since 1.5

## DecimalFormat.clone()

```java
public Object clone()
```

Standard override; no change in semantics.

## DecimalFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code DecimalFormat} for equality.
Returns true if the object is also a {@code DecimalFormat} and the
two formats would format any value the same.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param  obj object to be compared for equality
@return {@code true} if the specified object is equal to this {@code DecimalFormat}
@see Object#equals(Object)

## DecimalFormat.hashCode()

```java
public int hashCode()
```

{@return the hash code for this {@code DecimalFormat}}

@implSpec This method calculates the hash code value using the values returned from
{@link #getPositivePrefix()} and {@link NumberFormat#hashCode()}.
@see Object#hashCode()
@see NumberFormat#hashCode()

## DecimalFormat.toString()

```java
public String toString()
```

{@return a string identifying this {@code DecimalFormat}, for debugging}

## DecimalFormat.toPattern()

```java
public String toPattern()
```

Synthesizes a pattern string that represents the current state
of this Format object.

@return a pattern string
@see #applyPattern

## DecimalFormat.toLocalizedPattern()

```java
public String toLocalizedPattern()
```

Synthesizes a localized pattern string that represents the current
state of this Format object.

@return a localized pattern string
@see #applyPattern

## DecimalFormat.applyPattern(String)

```java
public void applyPattern(String pattern)
```

Apply the given pattern to this Format object.  A pattern is a
short-hand specification for the various formatting properties.
These properties can also be changed individually through the
various setter methods.
<p>
The number of maximum integer digits is usually not derived from the pattern.
See the note in the {@link ##patterns Patterns} section for more detail.
For negative numbers, use a second pattern, separated by a semicolon
<P>Example {@code "#,#00.0#"} &rarr; 1,234.56
<P>This means a minimum of 2 integer digits, 1 fraction digit, and
a maximum of 2 fraction digits.
<p>Example: {@code "#,#00.0#;(#,#00.0#)"} for negatives in
parentheses.
<p>In negative patterns, the minimum and maximum counts are ignored;
these are presumed to be set in the positive pattern.

@param pattern a new pattern
@throws    NullPointerException if {@code pattern} is null
@throws    IllegalArgumentException if the given pattern is invalid.

## DecimalFormat.applyLocalizedPattern(String)

```java
public void applyLocalizedPattern(String pattern)
```

Apply the given pattern to this Format object.  The pattern
is assumed to be in a localized notation. A pattern is a
short-hand specification for the various formatting properties.
These properties can also be changed individually through the
various setter methods.
<p>
The number of maximum integer digits is usually not derived from the pattern.
See the note in the {@link ##patterns Patterns} section for more detail.
For negative numbers, use a second pattern, separated by a semicolon
<P>Example {@code "#,#00.0#"} &rarr; 1,234.56
<P>This means a minimum of 2 integer digits, 1 fraction digit, and
a maximum of 2 fraction digits.
<p>Example: {@code "#,#00.0#;(#,#00.0#)"} for negatives in
parentheses.
<p>In negative patterns, the minimum and maximum counts are ignored;
these are presumed to be set in the positive pattern.

@param pattern a new pattern
@throws    NullPointerException if {@code pattern} is null
@throws    IllegalArgumentException if the given pattern is invalid.

## DecimalFormat.setMaximumIntegerDigits(int)

```java
public void setMaximumIntegerDigits(int newValue)
```

{@inheritDoc NumberFormat}
@param newValue the maximum number of integer digits to be shown.
@see #getMaximumIntegerDigits()
@see ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.setMinimumIntegerDigits(int)

```java
public void setMinimumIntegerDigits(int newValue)
```

{@inheritDoc NumberFormat}
@param newValue the minimum number of integer digits to be shown.
@see #getMinimumIntegerDigits()
@see ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.setMaximumFractionDigits(int)

```java
public void setMaximumFractionDigits(int newValue)
```

{@inheritDoc NumberFormat}
@param newValue the maximum number of fraction digits to be shown.
@see #getMaximumFractionDigits()
@see ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.setMinimumFractionDigits(int)

```java
public void setMinimumFractionDigits(int newValue)
```

{@inheritDoc NumberFormat}
@param newValue the minimum number of fraction digits to be shown.
@see #getMinimumFractionDigits()
@see ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getMaximumIntegerDigits()

```java
public int getMaximumIntegerDigits()
```

{@inheritDoc NumberFormat}
<p>Unlike the other digit limits, {@code maximumIntegerDigits} is not
updated by {@code DecimalFormats} created or updated with a string pattern.
@see #setMaximumIntegerDigits
@see ##patterns Pattern Section
@see ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getMinimumIntegerDigits()

```java
public int getMinimumIntegerDigits()
```

{@inheritDoc NumberFormat}
@see #setMinimumIntegerDigits
@see ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getMaximumFractionDigits()

```java
public int getMaximumFractionDigits()
```

{@inheritDoc NumberFormat}
@see #setMaximumFractionDigits
@see ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getMinimumFractionDigits()

```java
public int getMinimumFractionDigits()
```

{@inheritDoc NumberFormat}
@see #setMinimumFractionDigits
@see ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getCurrency()

```java
public Currency getCurrency()
```

Gets the currency used by this decimal format when formatting
currency values.
The currency is obtained by calling
{@link DecimalFormatSymbols#getCurrency DecimalFormatSymbols.getCurrency}
on this number format's symbols.

@return the currency used by this decimal format, or {@code null}
@since 1.4

## DecimalFormat.setCurrency(Currency)

```java
public void setCurrency(Currency currency)
```

Sets the currency used by this number format when formatting
currency values. This does not update the minimum or maximum
number of fraction digits used by the number format.
The currency is set by calling
{@link DecimalFormatSymbols#setCurrency DecimalFormatSymbols.setCurrency}
on this number format's symbols.

@param currency the new currency to be used by this decimal format
@throws    NullPointerException if {@code currency} is null
@since 1.4

## DecimalFormat.getRoundingMode()

```java
public RoundingMode getRoundingMode()
```

Gets the {@link java.math.RoundingMode} used in this DecimalFormat.

@return The {@code RoundingMode} used for this DecimalFormat.
@see #setRoundingMode(RoundingMode)
@since 1.6

## DecimalFormat.setRoundingMode(RoundingMode)

```java
public void setRoundingMode(RoundingMode roundingMode)
```

Sets the {@link java.math.RoundingMode} used in this DecimalFormat.

@param roundingMode The {@code RoundingMode} to be used
@see #getRoundingMode()
@throws    NullPointerException if {@code roundingMode} is null.
@since 1.6