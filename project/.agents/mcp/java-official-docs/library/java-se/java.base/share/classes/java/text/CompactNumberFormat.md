---
title: "CompactNumberFormat class (java.text) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/CompactNumberFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompactNumberFormat class (java.text)

```java
public final class CompactNumberFormat extends NumberFormat
```

`CompactNumberFormat` is a concrete subclass of `NumberFormat`
that formats a decimal number in a localized compact form.
Compact number formatting is designed for an environment with limited space.
For example, displaying the formatted number `7M` instead of `7,000,000.00` in the US locale. The `CompactNumberFormat` class is defined by LDML's specification for

Compact Number Formats.

#### Getting a CompactNumberFormat

To get a compact number format, use one of the ways listed below.

-  Use the factory method `NumberFormat.getCompactNumberInstance()`
to obtain a format for the default locale with
SHORT style.

-  Use the factory methood Style)
to obtain a format for a different locale
and to control the Style.

-  Use one of the `CompactNumberFormat` constructors, for example, DecimalFormatSymbols, String[]) CompactNumberFormat(decimalPattern, symbols, compactPatterns), to obtain a
`CompactNumberFormat` with further customization.

If a standard compact format for a given locale and style is desired, it is recommended to use one of the
NumberFormat factory methods listed above. To use an instance method
defined by `CompactNumberFormat`, the `NumberFormat` returned by
these factory methods should be type checked before converted to `CompactNumberFormat`.
If the installed locale-sensitive service implementation does not support
the given `Locale`, the parent locale chain will be looked up, and
a `Locale` used that is supported.

#### Style

When using Style), a
compact form can be retrieved with either a SHORT or LONG style.
For example, a SHORT style compact number instance in
the US locale formats `10000` as `"10K"`. However, a LONG style instance in
the same locale formats `10000` as `"10 thousand"`.

#### Using CompactNumberFormat

The following is an example of formatting and parsing in a localized manner,

#### Formatting

The default formatting behavior returns a formatted string with no fractional
digits, however users can use the `setMinimumFractionDigits(int)`
method to include the fractional part.
The number `1000.0` or `1000` is formatted as `"1K"`
not `"1.00K"` (in the US locale). For this
reason, the patterns provided for formatting contain only the minimum
integer digits, prefix and/or suffix, but no fractional part.
For example, patterns used are `{"", "", "", 0K, 00K, ...}`. If the pattern
selected for formatting a number is `"0"` (special pattern),
either explicit or defaulted, then the general number formatting provided by
DecimalFormat
for the specified locale is used.

#### Rounding

`CompactNumberFormat` provides rounding modes defined in
`java.math.RoundingMode` for formatting.  By default, it uses
RoundingMode.HALF_EVEN.

#### Parsing

The default parsing behavior does not allow a grouping separator until
grouping used is set to `true` by using
`setGroupingUsed(boolean)`. The parsing of the fractional part
depends on the `isParseIntegerOnly()`. For example, if the
parse integer only is set to true, then the fractional part is skipped.

#### Compact Number Patterns

The `compactPatterns` in DecimalFormatSymbols, String[]) CompactNumberFormat(decimalPattern, symbols, compactPatterns) are represented
as a series of strings, where each string is a pattern that is used to format a range of numbers.

 An example of the SHORT styled compact number patterns
for the US locale is `{"", "", "", "0K", "00K", "000K", "0M", "00M", "000M", "0B", "00B", "000B", "0T", "00T", "000T"}`,
ranging from `10``0` to `10``14`.
There can be any number of patterns and they are
strictly index based starting from the range `10``0`.
For example, in the above patterns, the pattern at index 3
(`"0K"`) is used for formatting a number in the range: `1000 <= number < 10000`,
index 4 (`"00K"`) for formatting a number the range: `10000 <= number < 100000`, and so forth.

In most locales, patterns with the range
`10``0`-`10``2` are empty
strings, which implicitly means a special pattern `"0"`.
A special pattern `"0"` is used for any range which does not contain
a compact pattern. This special pattern can appear explicitly for any specific
range, or considered as a default pattern for an empty string.

#### Negative Subpatterns

A compact pattern contains a positive and negative subpattern
separated by a subpattern boundary character `';'`,
for example, `"0K;-0K"`. Each subpattern has a prefix,
minimum integer digits, and suffix. The negative subpattern
is optional, if absent, then the positive subpattern prefixed with the
minus sign `'-' (U+002D HYPHEN-MINUS)` is used as the negative
subpattern. That is, `"0K"` alone is equivalent to `"0K;-0K"`.
If there is an explicit negative subpattern, it serves only to specify
the negative prefix and suffix. The number of minimum integer digits,
and other characteristics are all the same as the positive pattern.
That means that `"0K;-00K"` produces precisely the same behavior
as `"0K;-0K"`.

#### Escaping Special Characters

Many characters in a compact pattern are taken literally, they are matched
during parsing and output unchanged during formatting.
Special characters,
on the other hand, stand for other characters, strings, or classes of
characters. These characters must be quoted using single quotes `' (U+0027)`
unless noted otherwise, if they are to appear in the prefix or suffix
as literals. For example, 0\u0915'.'.

#### Plurals

 `CompactNumberFormat` support patterns for both singular and plural
compact forms. For the plural form, the `Pattern` should consist
of `PluralPattern`(s) separated by a space ' ' (U+0020) that are enumerated
within a pair of curly brackets '{' (U+007B) and '}' (U+007D).
In this format, each `PluralPattern` consists of its `count`,
followed by a single colon `':' (U+003A)` and a `SimplePattern`.
As a space is reserved for separating subsequent `PluralPattern`s, it must
be quoted to be used literally in either the `prefix` or `suffix`.

For example, while the pattern representing millions (`10``6`
) in the US locale can be specified as the SimplePattern: `"0 Million"`, for the
German locale it can be specified as the PluralPattern:
`"{one:0' 'Million other:0' 'Millionen}"`.

A compact pattern has the following syntax, with `count`
following LDML's

Language Plural Rules:

```java
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
```

**See also:** NumberFormat.Style

**See also:** NumberFormat

**See also:** DecimalFormat

**See also:** Locale

**Since:** 12

## CompactNumberFormat.CompactNumberFormat(String, DecimalFormatSymbols, String[])

```java
public CompactNumberFormat(String decimalPattern, DecimalFormatSymbols symbols, String[] compactPatterns)
```

Creates a `CompactNumberFormat` using the given decimal pattern,
decimal format symbols and compact patterns.
To obtain the instance of `CompactNumberFormat` with the standard
compact patterns for a `Locale` and `Style`,
it is recommended to use the factory methods given by
`NumberFormat` for compact number formatting.

Below is an example of using the constructor,

Parameters:

- `decimalPattern`: a decimal pattern for general number formatting
- `symbols`: the set of symbols to be used
- `compactPatterns`: an array of compact number patterns

**See also:** DecimalFormat#DecimalFormat(java.lang.String, DecimalFormatSymbols)

**See also:** DecimalFormatSymbols

Throws:

- `NullPointerException`: if any of the given arguments is `null`
- `IllegalArgumentException`: if the given `decimalPattern` or the `compactPatterns` array contains an invalid pattern or if a `null` appears in the array of compact patterns

## CompactNumberFormat.CompactNumberFormat(String, DecimalFormatSymbols, String[], String)

```java
public CompactNumberFormat(String decimalPattern, DecimalFormatSymbols symbols, String[] compactPatterns, String pluralRules)
```

Creates a `CompactNumberFormat` using the given decimal pattern,
decimal format symbols, compact patterns, and plural rules.
To obtain the instance of `CompactNumberFormat` with the standard
compact patterns for a `Locale`, `Style`, and `pluralRules`,
it is recommended to use the factory methods given by
`NumberFormat` for compact number formatting. For example,
Style).

Parameters:

- `decimalPattern`: a decimal pattern for general number formatting
- `symbols`: the set of symbols to be used
- `compactPatterns`: an array of compact number patterns
- `pluralRules`: a String designating plural rules which associate the `Count` keyword, such as "`one`", and the actual integer number. Its syntax is defined in Unicode Consortium's  Plural rules syntax

**See also:** DecimalFormat#DecimalFormat(java.lang.String, DecimalFormatSymbols)

**See also:** DecimalFormatSymbols

**Since:** 14

Throws:

- `NullPointerException`: if any of the given arguments is `null`
- `IllegalArgumentException`: if the given `decimalPattern`, the `compactPatterns` array contains an invalid pattern, a `null` appears in the array of compact patterns, or if the given `pluralRules` contains an invalid syntax

## CompactNumberFormat.format(Object, StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object number, StringBuffer toAppendTo, FieldPosition fieldPosition)
```

Formats a number to produce a string representing its compact form.
The number can be of any subclass of `java.lang.Number`.

Parameters:

- `number`: the number to format
- `toAppendTo`: the `StringBuffer` to which the formatted text is to be appended
- `fieldPosition`: keeps track on the position of the field within the returned string. For example, for formatting a number `123456789` in the US locale, if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 3, respectively for the output string `123M`. Similarly, positions of the prefix and the suffix fields can be obtained using `NumberFormat.Field.PREFIX` and `NumberFormat.Field.SUFFIX` respectively.

**Returns:** the `StringBuffer` passed in as `toAppendTo`

**See also:** FieldPosition

Throws:

- `IllegalArgumentException`: if `number` is `null` or not an instance of `Number`
- `NullPointerException`: if `toAppendTo` or `fieldPosition` is `null`
- `ArithmeticException`: if rounding is needed with rounding mode being set to `RoundingMode.UNNECESSARY`

## CompactNumberFormat.format(double, StringBuffer, FieldPosition)

```java
public StringBuffer format(double number, StringBuffer result, FieldPosition fieldPosition)
```

Formats a double to produce a string representing its compact form.

Parameters:

- `number`: the double number to format
- `result`: where the text is to be appended
- `fieldPosition`: keeps track on the position of the field within the returned string. For example, to format a number `1234567.89` in the US locale if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 1, respectively for the output string `1M`. Similarly, positions of the prefix and the suffix fields can be obtained using `NumberFormat.Field.PREFIX` and `NumberFormat.Field.SUFFIX` respectively.

**Returns:** the `StringBuffer` passed in as `result`

**See also:** FieldPosition

Throws:

- `NullPointerException`: if `result` or `fieldPosition` is `null`
- `ArithmeticException`: if rounding is needed with rounding mode being set to `RoundingMode.UNNECESSARY`

## CompactNumberFormat.format(long, StringBuffer, FieldPosition)

```java
public StringBuffer format(long number, StringBuffer result, FieldPosition fieldPosition)
```

Formats a long to produce a string representing its compact form.

Parameters:

- `number`: the long number to format
- `result`: where the text is to be appended
- `fieldPosition`: keeps track on the position of the field within the returned string. For example, to format a number `123456789` in the US locale, if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 3, respectively for the output string `123M`. Similarly, positions of the prefix and the suffix fields can be obtained using `NumberFormat.Field.PREFIX` and `NumberFormat.Field.SUFFIX` respectively.

**Returns:** the `StringBuffer` passed in as `result`

**See also:** FieldPosition

Throws:

- `NullPointerException`: if `result` or `fieldPosition` is `null`
- `ArithmeticException`: if rounding is needed with rounding mode being set to `RoundingMode.UNNECESSARY`

## CompactNumberFormat.formatToCharacterIterator(Object)

```java
public AttributedCharacterIterator formatToCharacterIterator(Object obj)
```

Formats an Object producing an `AttributedCharacterIterator`.
The returned `AttributedCharacterIterator` can be used
to build the resulting string, as well as to determine information
about the resulting string.

Each attribute key of the `AttributedCharacterIterator` will
be of type `NumberFormat.Field`, with the attribute value
being the same as the attribute key. The prefix and the suffix
parts of the returned iterator (if present) are represented by
the attributes `NumberFormat.Field.PREFIX` and
`NumberFormat.Field.SUFFIX` respectively.

Parameters:

- `obj`: The object to format

**Returns:** an `AttributedCharacterIterator` describing the
        formatted value

Throws:

- `NullPointerException`: if obj is null
- `IllegalArgumentException`: when the Format cannot format the given object
- `ArithmeticException`: if rounding is needed with rounding mode being set to `RoundingMode.UNNECESSARY`
