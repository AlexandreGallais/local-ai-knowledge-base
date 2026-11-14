---
title: "DecimalFormat class (java.text) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/DecimalFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DecimalFormat class (java.text)

```java
public class DecimalFormat extends NumberFormat
```

`DecimalFormat` is a concrete subclass of
`NumberFormat` that formats decimal numbers in a localized manner.
It has a variety of features designed to make it possible to parse and format
numbers in any locale, including support for Western, Arabic, and Indic digits.
It also supports different kinds of numbers, including integers (123), fixed-point
numbers (123.4), scientific notation (1.23E4), percentages (12%), and
currency amounts ($123).

#### Getting a DecimalFormat

To obtain a standard decimal format for a specific locale, including the default locale,
it is recommended to call one of the `NumberFormat`
factory methods, such as `NumberFormat.getInstance()`.
These factory methods may not always return a `DecimalFormat`
depending on the locale-service provider implementation
installed. Thus, to use an instance method defined by `DecimalFormat`,
the `NumberFormat` returned by the factory method should be
type checked before converted to `DecimalFormat`. If the installed locale-sensitive
service implementation does not support the given `Locale`, the parent
locale chain will be looked up, and a `Locale` used that is supported.

If the factory methods are not desired, use one of the constructors such
as DecimalFormat(String pattern). See the Pattern section for more information on the `pattern` parameter.

#### Using DecimalFormat

The following is an example of formatting and parsing,

#### Formatting and Parsing

#### Rounding

When formatting, `DecimalFormat` can adjust its rounding using `setRoundingMode(RoundingMode)`. By default, it uses
RoundingMode.HALF_EVEN.

#### Digits

When formatting, `DecimalFormat` uses the ten consecutive
characters starting with the localized zero digit defined in the
`DecimalFormatSymbols` object as digits.

When parsing, these digits as well as all Unicode decimal digits, as
defined by Character.digit, are recognized.

####  Integer and Fraction Digit Limits

The integer and fraction digit limits are set by either applying a pattern or using one of the appropriate `DecimalFormat` setter methods,
for example, `setMinimumFractionDigits(int)`. These limits have no impact
on parsing behavior.

#### Special Values

-

**Not a Number** (`NaN`) is formatted as a string,
which is typically given as "NaN". This string is determined by `DecimalFormatSymbols.getNaN()`. This is the only value for which the prefixes
and suffixes are not attached.

-

**Infinity** is formatted as a string, which is typically given as
"∞" (`U+221E`), with the positive or negative prefixes and suffixes
attached. This string is determined by `DecimalFormatSymbols.getInfinity()`.

-

**Negative zero** (`"-0"`) parses to

- `BigDecimal(0)` if `isParseBigDecimal()` is
true

- `Long(0)` if `isParseBigDecimal()` is false
    and `isParseIntegerOnly()` is true

- `Double(-0.0)` if both `isParseBigDecimal()`
and `isParseIntegerOnly()` are false

#### Synchronization

Decimal formats are generally not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

#### DecimalFormat Pattern

A `DecimalFormat` comprises a *pattern* and a set of
*symbols*. The pattern may be set directly using `applyPattern()`,
or indirectly using the various API methods. The symbols are stored in a `DecimalFormatSymbols` object. When using the `NumberFormat` factory
methods, the pattern and symbols are created from the locale-sensitive service
implementation installed.

 `DecimalFormat` patterns have the following syntax:

```java
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
```

#### Special Pattern Characters

The special characters in the table below are interpreted syntactically when
used in the DecimalFormat pattern.
They must be quoted, unless noted otherwise, if they are to appear in the
prefix or suffix as literals.

 The characters in the `Symbol` column are used in non-localized
patterns. The corresponding characters in the `Localized Symbol` column are used
in localized patterns, with the characters in `Symbol` losing their
syntactical meaning. Two exceptions are the currency sign (`U+00A4`) and
quote (`U+0027`), which are not localized.

Non-localized patterns should be used when calling `applyPattern(String)`.
Localized patterns should be used when calling `applyLocalizedPattern(String)`.

Chart showing symbol, location, localized, and meaning.

         Symbol
         Localized Symbol
         Location
         Meaning

         `0`
         `DecimalFormatSymbols.getZeroDigit()`
         Number
         Digit

         `#`
         `DecimalFormatSymbols.getDigit()`
         Number
         Digit, zero shows as absent

         `.`
         `DecimalFormatSymbols.getDecimalSeparator()`
         Number
         Decimal separator or monetary decimal separator

         `- (U+002D)`
         `DecimalFormatSymbols.getMinusSign()`
         Number
         Minus sign

         `,`
         `DecimalFormatSymbols.getGroupingSeparator()`
         Number
         Grouping separator or monetary grouping separator

         `E`
         `DecimalFormatSymbols.getExponentSeparator()`
         Number
         Separates mantissa and exponent in scientific notation. This value
             is case sensistive. *Need not be quoted in prefix or suffix.*

         `;`
         `DecimalFormatSymbols.getPatternSeparator()`
         Subpattern boundary
         Separates positive and negative subpatterns

         `%`
         `DecimalFormatSymbols.getPercent()`
         Prefix or suffix
         Multiply by 100 and show as percentage

         &permil; (`U+2030`)
         `DecimalFormatSymbols.getPerMill()`
         Prefix or suffix
         Multiply by 1000 and show as per mille value

         ¤ (`U+00A4`)
          n/a (not localized)
         Prefix or suffix
         Currency sign, replaced by currency symbol.  If
             doubled, replaced by international currency symbol.
             If present in a pattern, the monetary decimal/grouping separators
             are used instead of the decimal/grouping separators.

         `' (U+0027)`
          n/a (not localized)
         Prefix or suffix
         Used to quote special characters in a prefix or suffix,
             for example, `"'#'#"` formats 123 to
             `"#123"`.  To create a single quote
             itself, use two in a row: `"# o''clock"`.

#### Maximum Digits Derivation

For any given `DecimalFormat` pattern, if the pattern is not
in scientific notation, the maximum number of integer digits will not be
derived from the pattern, and instead set to `Integer.MAX_VALUE`.
Otherwise, if the pattern is in scientific notation, the maximum number of
integer digits will be derived from the pattern. This derivation is detailed
in the Scientific Notation section. `setMaximumIntegerDigits(int)` can be used to manually adjust the maximum
integer digits.

#### Negative Subpatterns

A `DecimalFormat` pattern contains a positive and negative
subpattern, for example, `"#,##0.00;(#,##0.00)"`.  Each
subpattern has a prefix, numeric part, and suffix. The negative subpattern
is optional; if absent, then the positive subpattern prefixed with the
minus sign `'-' (U+002D HYPHEN-MINUS)` is used as the
negative subpattern. That is, `"0.00"` alone is equivalent to
`"0.00;-0.00"`.  If there is an explicit negative subpattern, it
serves only to specify the negative prefix and suffix; the number of digits,
minimal digits, and other characteristics are all the same as the positive
pattern. That means that `"#,##0.0#;(#)"` produces precisely
the same behavior as `"#,##0.0#;(#,##0.0#)"`.

The prefixes, suffixes, and various symbols used for infinity, digits,
grouping separators, decimal separators, etc. may be set to arbitrary
values, and they will appear properly during formatting.  However, care must
be taken that the symbols and strings do not conflict, or parsing will be
unreliable.  For example, either the positive and negative prefixes or the
suffixes must be distinct for `DecimalFormat.parse()` to be able
to distinguish positive from negative values.  (If they are identical, then
`DecimalFormat` will behave as if no negative subpattern was
specified.)  Another example is that the decimal separator and grouping
separator should be distinct characters, or parsing will be impossible.

#### Grouping Separator

The grouping separator is commonly used for thousands, but in some
locales it separates ten-thousands. The grouping size is a constant number
of digits between the grouping characters, such as 3 for 100,000,000 or 4 for
1,0000,0000. If you supply a pattern with multiple grouping characters, the
interval between the last one and the end of the integer is the one that is
used. For example, `"#,##,###,####"` == `"######,####"` ==
`"##,####,####"`.

#### Scientific Notation

Numbers in scientific notation are expressed as the product of a mantissa
and a power of ten, for example, 1234 can be expressed as 1.234 x 10^3.  The
mantissa is often in the range 1.0 &le; x < 10.0, but it need not
be.
`DecimalFormat` can be instructed to format and parse scientific
notation *only via a pattern*; there is currently no factory method
that creates a scientific notation format.  In a pattern, the exponent
character immediately followed by one or more digit characters indicates
scientific notation.  Example: `"0.###E0"` formats the number
1234 as `"1.234E3"`.

- The number of digit characters after the exponent character gives the
minimum exponent digit count.  There is no maximum.  Negative exponents are
formatted using the localized minus sign, *not* the prefix and suffix
from the pattern.  This allows patterns such as `"0.###E0 m/s"`.

- The *maximum integer* digits is the sum of '0's and '#'s
prior to the decimal point. The *minimum integer* digits is the
sum of the '0's prior to the decimal point. The *maximum fraction*
and *minimum fraction* digits follow the same rules, but apply to the
digits after the decimal point but before the exponent. For example, the
following pattern: `"#00.0####E0"` would have a minimum number of
integer digits = 2("00") and a maximum number of integer digits = 3("#00"). It
would have a minimum number of fraction digits = 1("0") and a maximum number of fraction
digits= 5("0####").

- The minimum and maximum number of integer digits are interpreted
together:

- If the maximum number of integer digits is greater than their minimum number
and greater than 1, it forces the exponent to be a multiple of the maximum
number of integer digits, and the minimum number of integer digits to be
interpreted as 1.  The most common use of this is to generate
*engineering notation*, in which the exponent is a multiple of three,
e.g., `"##0.#####E0"`. Using this pattern, the number 12345
formats to `"12.345E3"`, and 123456 formats to
`"123.456E3"`.

- Otherwise, the minimum number of integer digits is achieved by adjusting the
exponent.  Example: 0.00123 formatted with `"00.###E0"` yields
`"12.3E-4"`.

- For a given number, the amount of significant digits in
the mantissa can be calculated as such

```java
<i>Mantissa Digits:</i>
        min(max(Minimum Pattern Digits, Original Number Digits), Maximum Pattern Digits)
<i>Minimum pattern Digits:</i>
        <i>Minimum Integer Digits</i> + <i>Minimum Fraction Digits</i>
<i>Maximum pattern Digits:</i>
        <i>Maximum Integer Digits</i> + <i>Maximum Fraction Digits</i>
<i>Original Number Digits:</i>
        The amount of significant digits in the number to be formatted
```

This means that generally, a mantissa will have up to the combined maximum integer
and fraction digits, if the original number itself has enough significant digits. However,
if there are more minimum pattern digits than significant digits in the original number,
the mantissa will have significant digits that equals the combined
minimum integer and fraction digits. The number of significant digits
does not affect parsing.

It should be noted, that the integer portion of the mantissa will give
any excess digits to the fraction portion, whether it be for precision or
for satisfying the total amount of combined minimum digits.

This behavior can be observed in the following example,

- Exponential patterns may not contain grouping separators.

**Implementation requirements:** When formatting a `Number` other than `BigInteger` and
`BigDecimal`, `309` is used as the upper limit for integer digits,
and `340` as the upper limit for fraction digits. This occurs, even if
one of the `DecimalFormat` getter methods, for example, `getMinimumFractionDigits()`
returns a numerically greater value.

**See also:** Java Tutorial

**See also:** NumberFormat

**See also:** DecimalFormatSymbols

**See also:** ParsePosition

**See also:** Locale

**Since:** 1.1

## DecimalFormat.DecimalFormat()

```java
public DecimalFormat()
```

Creates a DecimalFormat using the default pattern and symbols
for the default FORMAT locale.
This is a convenient way to obtain a
DecimalFormat when internationalization is not the main concern.

**API note:** To obtain standard formats for a given locale, use the
`NumberFormat` factory methods such as `NumberFormat.getNumberInstance(Locale)`. These factories will return the most
appropriate subclass of NumberFormat for a given locale.

**See also:** NumberFormat#getInstance(Locale)

**See also:** NumberFormat#getNumberInstance(Locale)

**See also:** NumberFormat#getCurrencyInstance(Locale)

**See also:** NumberFormat#getPercentInstance(Locale)
