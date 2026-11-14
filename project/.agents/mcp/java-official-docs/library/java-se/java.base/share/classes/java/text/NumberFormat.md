---
title: "NumberFormat class (java.text) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/NumberFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NumberFormat class (java.text)

```java
public abstract class NumberFormat extends Format
```

`NumberFormat` is the abstract base class for all number
formats. This class provides the interface for formatting and parsing
numbers in a localized manner. This enables code that can be completely
independent of the locale conventions for decimal points, thousands-separators,
the particular decimal digits used, or whether the number format is even
decimal. For example, this class could be used within an application to
produce a number in a currency format according to the conventions of the desired
locale.

#### Getting a NumberFormat

To get a `NumberFormat` for the default Locale, use one of the static
factory methods that return a concrete subclass of `NumberFormat`.
The following formats all provide an example of formatting the `Number`
"2000.50" with the US locale as the default locale.

-  Use `getInstance()` or `getNumberInstance()` to get
a decimal format. For example, `"2,000.5"`.

-  Use `getIntegerInstance()` to get an integer number format.
For example, `"2,000"`.

-  Use `getCurrencyInstance` to get a currency number format.
For example, `"$2,000.50"`.

-  Use `getCompactNumberInstance` to get a compact number format.
For example, `"2K"`.

-  Use `getPercentInstance` to get a format for displaying percentages.
For example, `"200,050%"`.

Alternatively, if a `NumberFormat` for a different locale is required, use
one of the overloaded factory methods that take `Locale` as a parameter,
for example, `getIntegerInstance(Locale)`. If the installed locale-sensitive
service implementation does not support the given `Locale`, the parent
locale chain will be looked up, and a `Locale` used that is supported.

#### Locale Extensions

Formatting behavior can be changed when using a locale that contains any of the following
Unicode extensions,

-  "nu"
(
Numbering System) - Overrides the decimal digits used

-  "rg"
(
Region Override) - Overrides the country used

-  "cf"
(
Currency Format style) - Overrides the Currency Format style used

If both "nu" and "rg" are specified, the decimal digits from the "nu"
extension supersedes the implicit one from the "rg" extension.
Although Unicode extensions
defines various keys and values, actual locale-sensitive service implementations
in a Java Runtime Environment might not support any particular Unicode locale
attributes or key/type pairs.

Below is an example of a "US" locale currency format with accounting style,
`NumberFormat.getCurrencyInstance(Locale.forLanguageTag("en-US-u-cf-account"));`
With this style, a negative value is formatted enclosed in parentheses, instead
of being prepended with a minus sign.

#### Using NumberFormat

The following is an example of formatting and parsing in a localized fashion,

#### Customizing NumberFormat

`NumberFormat` provides API to customize formatting and parsing behavior,

-  `setParseIntegerOnly(boolean)`; when `true`, will only return the
integer portion of the number parsed from the String.

-  `setMinimumFractionDigits(int)`; Use to adjust the expected digits
when formatting. Use any of the other minimum/maximum or fraction/integer
setter methods in the same manner. These methods have no impact on parsing behavior.

-  `setGroupingUsed(boolean)`; when `true`, formatted numbers will be displayed
with grouping separators. Additionally, when `false`, parsing will not expect
grouping separators in the parsed String.

-  `setStrict(boolean)`; when `true`, parsing will be done strictly.
The behavior of strict parsing should be referred to in the implementing
`NumberFormat` subclass.

To provide more control over formatting or parsing behavior, type checking can
be done to safely convert to an implementing subclass of `NumberFormat`; this
provides additional methods defined by the subclass.
For example,

The `NumberFormat` subclass returned by the factory methods is dependent
on the locale-service provider implementation installed, and may not always
be `DecimalFormat` or `CompactNumberFormat`.

You can also use forms of the `parse` and `format`
methods with `ParsePosition` and `FieldPosition` to
allow you to:

-  Progressively parse through pieces of a string

-  Align the decimal point and other areas

For example, you can align numbers in two ways:

-  If you are using a monospaced font with spacing for alignment,
     you can pass the `FieldPosition` in your format call, with
     `field` = `INTEGER_FIELD`. On output,
     `getEndIndex` will be set to the offset between the
     last character of the integer and the decimal. Add
     (desiredSpaceCount - getEndIndex) spaces at the front of the string.

-  If you are using proportional fonts,
     instead of padding with spaces, measure the width
     of the string in pixels from the start to `getEndIndex`.
     Then move the pen by
     (desiredPixelWidth - widthToAlignmentPoint) before drawing the text.
     It also works where there is no decimal, but possibly additional
     characters at the end, e.g., with parentheses in negative
     numbers: "(12)" for -12.

#### Leniency

`NumberFormat` by default, parses leniently. Subclasses may consider
implementing strict parsing and as such, overriding and providing
implementations for the optional `isStrict()` and `setStrict(boolean)` methods.

Lenient parsing should be used when attempting to parse a number
out of a String that contains non-numerical or non-format related values.
For example, using a `Locale.US` currency format to parse the number
`1000` out of the String "$1,000.00 was paid".

Strict parsing should be used when attempting to ensure a String adheres exactly
to a locale's conventions, and can thus serve to validate input. For example, successfully
parsing the number `1000.55` out of the String "1.000,55" confirms the String
exactly adhered to the `Locale.GERMANY` numerical conventions.

#### Synchronization

Number formats are generally not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

**Implementation requirements:** Null Parameter Handling

-  The StringBuffer, FieldPosition),
StringBuffer, FieldPosition) and
ParsePosition) methods may throw
`NullPointerException`, if any of their parameter is `null`.
The subclass may provide its own implementation and specification about
`NullPointerException`.

Default RoundingMode

-  The default implementation provides rounding modes defined
in `java.math.RoundingMode` for formatting numbers. It
uses the round half-even algorithm. To change the rounding mode use
setRoundingMode.
The `NumberFormat` returned by the static factory methods is
configured to round floating point numbers using half-even
rounding (see RoundingMode.HALF_EVEN) for formatting.

**See also:** DecimalFormat

**See also:** ChoiceFormat

**See also:** CompactNumberFormat

**See also:** Locale

**Since:** 1.1

## NumberFormat.INTEGER_FIELD

```java
public static final int INTEGER_FIELD
```

Field constant used to construct a FieldPosition object. Signifies that
the position of the integer part of a formatted number should be returned.

**See also:** java.text.FieldPosition

## NumberFormat.FRACTION_FIELD

```java
public static final int FRACTION_FIELD
```

Field constant used to construct a FieldPosition object. Signifies that
the position of the fraction part of a formatted number should be returned.

**See also:** java.text.FieldPosition

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
The number can be of any subclass of `java.lang.Number`.

This implementation extracts the number's value using
`java.lang.Number.longValue()` for all integral type values that
can be converted to `long` without loss of information,
including `BigInteger` values with a
bit length of less than 64,
and `java.lang.Number.doubleValue()` for all other types. It
then calls
`format(long,java.lang.StringBuffer,java.text.FieldPosition)`
or `format(double,java.lang.StringBuffer,java.text.FieldPosition)`.
This may result in loss of magnitude information and precision for
`BigInteger` and `BigDecimal` values.

Parameters:

- `number`: the number to format
- `toAppendTo`: the `StringBuffer` to which the formatted text is to be appended
- `pos`: keeps track on the position of the field within the returned string. For example, for formatting a number `1234567.89` in `Locale.US` locale, if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 9, respectively for the output string `1,234,567.89`.

**Returns:** the value passed in as `toAppendTo`

**See also:** java.text.FieldPosition

Throws:

- `IllegalArgumentException`: if `number` is null or not an instance of `Number`.
- `NullPointerException`: if `toAppendTo` or `pos` is null
- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## NumberFormat.parseObject(String, ParsePosition)

```java
public final Object parseObject(String source, ParsePosition pos)
```

(inherited documentation)

Parameters:

- `source`: the `String` to parse
- `pos`: A `ParsePosition` object with index and error index information as described above.

**Implementation requirements:** This implementation is equivalent to calling `parse(source, pos)`.

**Returns:** A `Number` parsed from the string. In case of
        error, returns null.

Throws:

- `NullPointerException`: if `source` or `pos` is null.

## NumberFormat.format(double)

```java
public final String format(double number)
```

Specialization of format.

Parameters:

- `number`: the double number to format

**Returns:** the formatted String

**See also:** java.text.Format#format

Throws:

- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## NumberFormat.format(long)

```java
public final String format(long number)
```

Specialization of format.

Parameters:

- `number`: the long number to format

**Returns:** the formatted String

**See also:** java.text.Format#format

Throws:

- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## NumberFormat.format(double, StringBuffer, FieldPosition)

```java
public abstract StringBuffer format(double number, StringBuffer toAppendTo, FieldPosition pos)
```

Specialization of format.

Parameters:

- `number`: the double number to format
- `toAppendTo`: the StringBuffer to which the formatted text is to be appended
- `pos`: keeps track on the position of the field within the returned string. For example, for formatting a number `1234567.89` in `Locale.US` locale, if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 9, respectively for the output string `1,234,567.89`.

**Returns:** the formatted StringBuffer

**See also:** java.text.Format#format

Throws:

- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## NumberFormat.format(long, StringBuffer, FieldPosition)

```java
public abstract StringBuffer format(long number, StringBuffer toAppendTo, FieldPosition pos)
```

Specialization of format.

Parameters:

- `number`: the long number to format
- `toAppendTo`: the StringBuffer to which the formatted text is to be appended
- `pos`: keeps track on the position of the field within the returned string. For example, for formatting a number `123456789` in `Locale.US` locale, if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 11, respectively for the output string `123,456,789`.

**Returns:** the formatted StringBuffer

**See also:** java.text.Format#format

Throws:

- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## NumberFormat.parse(String, ParsePosition)

```java
public abstract Number parse(String source, ParsePosition parsePosition)
```

Parses text from the beginning of the given string to produce a `Number`.

This method attempts to parse text starting at the index given by the
`ParsePosition`. If parsing succeeds, then the index of the `ParsePosition` is updated to the index after the last character used
(parsing does not necessarily use all characters up to the end of the
string), and the parsed number is returned. The updated `ParsePosition` can be used to indicate the starting
point for the next call to this method. If an error occurs, then the
index of the `ParsePosition` is not changed, the error index of the
`ParsePosition` is set to the index of the character where the error
occurred, and `null` is returned.

This method will return a Long if possible (e.g., within the range [Long.MIN_VALUE,
Long.MAX_VALUE] and with no decimals), otherwise a Double.

Parameters:

- `source`: the `String` to parse
- `parsePosition`: A `ParsePosition` object with index and error index information as described above.

**Returns:** A `Number` parsed from the string. In case of
        failure, returns `null`.

**See also:** #isStrict()

Throws:

- `NullPointerException`: if `source` or `ParsePosition` is `null`.

## NumberFormat.parse(String)

```java
public Number parse(String source) throws ParseException
```

Parses text from the beginning of the given string to produce a `Number`.

This method will return a Long if possible (e.g., within the range [Long.MIN_VALUE,
Long.MAX_VALUE] and with no decimals), otherwise a Double.

Parameters:

- `source`: A `String`, to be parsed from the beginning.

**Returns:** A `Number` parsed from the string.

**See also:** #isStrict()

Throws:

- `ParseException`: if parsing fails
- `NullPointerException`: if `source` is `null`.

## NumberFormat.isParseIntegerOnly()

```java
public boolean isParseIntegerOnly()
```

Returns `true` if this format will parse numbers as integers only.
The `ParsePosition` index will be set to the position of the decimal
symbol. The exact format accepted by the parse operation is locale dependent.
For example in the English locale, with ParseIntegerOnly true, the
string "123.45" would be parsed as the integer value 123.

**Returns:** `true` if numbers should be parsed as integers only;
        `false` otherwise

## NumberFormat.setParseIntegerOnly(boolean)

```java
public void setParseIntegerOnly(boolean value)
```

Sets whether or not numbers should be parsed as integers only.

Parameters:

- `value`: `true` if numbers should be parsed as integers only; `false` otherwise

**See also:** #isParseIntegerOnly
