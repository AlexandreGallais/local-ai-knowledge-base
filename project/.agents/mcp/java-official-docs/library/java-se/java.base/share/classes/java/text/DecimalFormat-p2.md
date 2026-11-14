---
title: "DecimalFormat class (java.text) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/DecimalFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DecimalFormat class (java.text) (part 2 of 3)

## DecimalFormat.DecimalFormat(String)

```java
public DecimalFormat(String pattern)
```

Creates a DecimalFormat using the given pattern and the symbols
for the default FORMAT locale.
This is a convenient way to obtain a
DecimalFormat when internationalization is not the main concern.
The number of maximum integer digits is usually not derived from the pattern.
See the note in the Patterns section for more detail.

Parameters:

- `pattern`: a non-localized pattern string.

**API note:** To obtain standard formats for a given locale, use the
`NumberFormat` factory methods such as `NumberFormat.getNumberInstance(Locale)`. These factories will return the most
appropriate subclass of NumberFormat for a given locale.

**See also:** NumberFormat#getInstance(Locale)

**See also:** NumberFormat#getNumberInstance(Locale)

**See also:** NumberFormat#getCurrencyInstance(Locale)

**See also:** NumberFormat#getPercentInstance(Locale)

Throws:

- `NullPointerException`: if `pattern` is null
- `IllegalArgumentException`: if the given pattern is invalid.

## DecimalFormat.DecimalFormat(String, DecimalFormatSymbols)

```java
public DecimalFormat (String pattern, DecimalFormatSymbols symbols)
```

Creates a DecimalFormat using the given pattern and symbols.
Use this constructor when you need to completely customize the
behavior of the format.
The number of maximum integer digits is usually not derived from the pattern.
See the note in the Patterns section for more detail.

Parameters:

- `pattern`: a non-localized pattern string
- `symbols`: the set of symbols to be used

**API note:** To obtain standard formats for a given locale, use the
`NumberFormat` factory methods such as `NumberFormat.getInstance(Locale)` or `NumberFormat.getCurrencyInstance(Locale)`.
If you need only minor adjustments to a standard format, you can modify
the format returned by a NumberFormat factory method.

**See also:** NumberFormat#getInstance(Locale)

**See also:** NumberFormat#getNumberInstance(Locale)

**See also:** NumberFormat#getCurrencyInstance(Locale)

**See also:** NumberFormat#getPercentInstance(Locale)

**See also:** java.text.DecimalFormatSymbols

Throws:

- `NullPointerException`: if any of the given arguments is null
- `IllegalArgumentException`: if the given pattern is invalid

## DecimalFormat.format(Object, StringBuffer, FieldPosition)

```java
public final StringBuffer format(Object number, StringBuffer toAppendTo, FieldPosition pos)
```

Formats a number and appends the resulting text to the given string
buffer.
The number can be of any subclass of `java.lang.Number`.

Parameters:

- `number`: the number to format
- `toAppendTo`: the `StringBuffer` to which the formatted text is to be appended
- `pos`: keeps track on the position of the field within the returned string. For example, for formatting a number `1234567.89` in `Locale.US` locale, if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 9, respectively for the output string `1,234,567.89`.

**Implementation requirements:** This implementation uses the maximum precision permitted.

**Returns:** the value passed in as `toAppendTo`

**See also:** java.text.FieldPosition

Throws:

- `IllegalArgumentException`: if `number` is null or not an instance of `Number`.
- `NullPointerException`: if `toAppendTo` or `pos` is null
- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## DecimalFormat.format(double, StringBuffer, FieldPosition)

```java
public StringBuffer format(double number, StringBuffer result, FieldPosition fieldPosition)
```

Formats a double to produce a string.

Parameters:

- `number`: The double to format
- `result`: where the text is to be appended
- `fieldPosition`: keeps track on the position of the field within the returned string. For example, for formatting a number `1234567.89` in `Locale.US` locale, if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 9, respectively for the output string `1,234,567.89`.

**Returns:** The formatted number string

**See also:** java.text.FieldPosition

Throws:

- `NullPointerException`: if `result` or `fieldPosition` is `null`
- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## DecimalFormat.format(long, StringBuffer, FieldPosition)

```java
public StringBuffer format(long number, StringBuffer result, FieldPosition fieldPosition)
```

Format a long to produce a string.

Parameters:

- `number`: The long to format
- `result`: where the text is to be appended
- `fieldPosition`: keeps track on the position of the field within the returned string. For example, for formatting a number `123456789` in `Locale.US` locale, if the given `fieldPosition` is `NumberFormat.INTEGER_FIELD`, the begin index and end index of `fieldPosition` will be set to 0 and 11, respectively for the output string `123,456,789`.

**Returns:** The formatted number string

**See also:** java.text.FieldPosition

Throws:

- `NullPointerException`: if `result` or `fieldPosition` is `null`
- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## DecimalFormat.formatToCharacterIterator(Object)

```java
public AttributedCharacterIterator formatToCharacterIterator(Object obj)
```

Formats an Object producing an `AttributedCharacterIterator`.
You can use the returned `AttributedCharacterIterator`
to build the resulting String, as well as to determine information
about the resulting String.

Each attribute key of the AttributedCharacterIterator will be of type
`NumberFormat.Field`, with the attribute value being the
same as the attribute key.

Parameters:

- `obj`: The object to format

**Returns:** AttributedCharacterIterator describing the formatted value.

**Since:** 1.4

Throws:

- `NullPointerException`: if obj is null.
- `IllegalArgumentException`: when the Format cannot format the given object.
- `ArithmeticException`: if rounding is needed with rounding mode being set to RoundingMode.UNNECESSARY

## DecimalFormat.parse(String, ParsePosition)

```java
public Number parse(String text, ParsePosition pos)
```

(inherited documentation)

Parsing can be done in either a strict or lenient manner, by default it is lenient.

Parsing fails when **lenient**, if the prefix and/or suffix are non-empty
and cannot be found due to parsing ending early, or the first character
after the prefix cannot be parsed.

Parsing fails when **strict**, if in `text`,

-  The prefix is not found. For example, a `Locale.US` currency
  format prefix: "`$`"

-  The suffix is not found. For example, a `Locale.US` percent
  format suffix: "`%`"

-  `isGroupingUsed()` returns `true`, and `getGroupingSize()` is not adhered to

-  `isGroupingUsed()` returns `false`, and the grouping
  symbol is found

-  `isGroupingUsed()` returns `true` and the grouping
  symbol occurs after the decimal separator

-  Any other characters are found, that are not the expected symbols,
  and are not digits that occur within the numerical portion

The subclass returned depends on the value of `isParseBigDecimal`
as well as on the string being parsed.

- If `isParseBigDecimal()` is false (the default),
      most integer values are returned as `Long`
      objects, no matter how they are written: `"17"` and
      `"17.000"` both parse to `Long(17)`.
      Values that cannot fit into a `Long` are returned as
      `Double`s. This includes values with a fractional part,
      infinite values, `NaN`, and the value -0.0.
      `DecimalFormat` does *not* decide whether to
      return a `Double` or a `Long` based on the
      presence of a decimal separator in the source string. Doing so
      would prevent integers that overflow the mantissa of a double,
      such as `"-9,223,372,036,854,775,808.00"`, from being
      parsed accurately.

      Callers may use the `Number` methods
      `doubleValue`, `longValue`, etc., to obtain
      the type they want.

- If `isParseBigDecimal()` is true, values are returned
      as `BigDecimal` objects. The values are the ones
      constructed by `java.math.BigDecimal.BigDecimal(String)`
      for corresponding strings in locale-independent format. The
      special cases negative and positive infinity and NaN are returned
      as `Double` instances holding the values of the
      corresponding `Double` constants.

`DecimalFormat` parses all Unicode characters that represent
decimal digits, as defined by `Character.digit()`. In
addition, `DecimalFormat` also recognizes as digits the ten
consecutive characters starting with the localized zero digit defined in
the `DecimalFormatSymbols` object.

Parameters:

- `text`: the string to be parsed
- `pos`: A `ParsePosition` object with index and error index information as described above.

**Returns:** the parsed value, or `null` if the parse fails

Throws:

- `NullPointerException`: if `text` or `pos` is null.

## DecimalFormat.getDecimalFormatSymbols()

```java
public DecimalFormatSymbols getDecimalFormatSymbols()
```

Returns a copy of the decimal format symbols, which is generally not
changed by the programmer or user.

**Returns:** a copy of the desired DecimalFormatSymbols

**See also:** java.text.DecimalFormatSymbols

## DecimalFormat.setDecimalFormatSymbols(DecimalFormatSymbols)

```java
public void setDecimalFormatSymbols(DecimalFormatSymbols newSymbols)
```

Sets the decimal format symbols, which is generally not changed
by the programmer or user.

Parameters:

- `newSymbols`: desired DecimalFormatSymbols

**See also:** java.text.DecimalFormatSymbols

## DecimalFormat.getPositivePrefix()

```java
public String getPositivePrefix ()
```

Get the positive prefix.

Examples: +123, $123, sFr123

**Returns:** the positive prefix

## DecimalFormat.setPositivePrefix(String)

```java
public void setPositivePrefix (String newValue)
```

Set the positive prefix.

Examples: +123, $123, sFr123

Parameters:

- `newValue`: the new positive prefix. Non-null.

Throws:

- `NullPointerException`: if `newValue` is `null`

## DecimalFormat.getNegativePrefix()

```java
public String getNegativePrefix ()
```

Get the negative prefix.

Examples: -123, ($123) (with negative suffix), sFr-123

**Returns:** the negative prefix

## DecimalFormat.setNegativePrefix(String)

```java
public void setNegativePrefix (String newValue)
```

Set the negative prefix.

Examples: -123, ($123) (with negative suffix), sFr-123

Parameters:

- `newValue`: the new negative prefix. Non-null.

Throws:

- `NullPointerException`: if `newValue` is `null`

## DecimalFormat.getPositiveSuffix()

```java
public String getPositiveSuffix ()
```

Get the positive suffix.

Example: 123%

**Returns:** the positive suffix

## DecimalFormat.setPositiveSuffix(String)

```java
public void setPositiveSuffix (String newValue)
```

Set the positive suffix.

Example: 123%

Parameters:

- `newValue`: the new positive suffix. Non-null.

Throws:

- `NullPointerException`: if `newValue` is `null`

## DecimalFormat.getNegativeSuffix()

```java
public String getNegativeSuffix ()
```

Get the negative suffix.

Examples: -123%, ($123) (with positive suffixes)

**Returns:** the negative suffix

## DecimalFormat.setNegativeSuffix(String)

```java
public void setNegativeSuffix (String newValue)
```

Set the negative suffix.

Examples: 123%

Parameters:

- `newValue`: the new negative suffix. Non-null.

Throws:

- `NullPointerException`: if `newValue` is `null`

## DecimalFormat.getMultiplier()

```java
public int getMultiplier ()
```

Gets the multiplier for use in percent, per mille, and similar
formats.

**Returns:** the multiplier

**See also:** #setMultiplier(int)

## DecimalFormat.setMultiplier(int)

```java
public void setMultiplier (int newValue)
```

Sets the multiplier for use in percent, per mille, and similar
formats.
For a percent format, set the multiplier to 100 and the suffixes to
have '%' (for Arabic, use the Arabic percent sign).
For a per mille format, set the multiplier to 1000 and the suffixes to
have '`U+2030`'.

Example: with multiplier 100, 1.23 is formatted as "123", and
"123" is parsed into 1.23. If `isParseIntegerOnly()` returns `true`,
"123" is parsed into 1.

Parameters:

- `newValue`: the new multiplier

**See also:** #getMultiplier

## DecimalFormat.setGroupingUsed(boolean)

```java
public void setGroupingUsed(boolean newValue)
```

(inherited documentation)

## DecimalFormat.getGroupingSize()

```java
public int getGroupingSize ()
```

Return the grouping size. Grouping size is the number of digits between
grouping separators in the integer portion of a number.  For example,
in the number "123,456.78", the grouping size is 3. Grouping size of
zero designates that grouping is not used, which provides the same
formatting as if calling setGroupingUsed(false).

**Returns:** the grouping size

**See also:** #setGroupingSize

**See also:** java.text.NumberFormat#isGroupingUsed

**See also:** java.text.DecimalFormatSymbols#getGroupingSeparator

## DecimalFormat.setGroupingSize(int)

```java
public void setGroupingSize (int newValue)
```

Set the grouping size. Grouping size is the number of digits between
grouping separators in the integer portion of a number.  For example,
in the number "123,456.78", the grouping size is 3. Grouping size of
zero designates that grouping is not used, which provides the same
formatting as if calling setGroupingUsed(false).

The value passed in is converted to a byte, which may lose information.
Values that are negative or greater than
Byte.MAX_VALUE, will throw an
`IllegalArgumentException`.

Parameters:

- `newValue`: the new grouping size

**See also:** #getGroupingSize

**See also:** java.text.NumberFormat#setGroupingUsed

**See also:** java.text.DecimalFormatSymbols#setGroupingSeparator

Throws:

- `IllegalArgumentException`: if `newValue` is negative or greater than Byte.MAX_VALUE

## DecimalFormat.isDecimalSeparatorAlwaysShown()

```java
public boolean isDecimalSeparatorAlwaysShown()
```

Allows you to get the behavior of the decimal separator with integers.
(The decimal separator will always appear with decimals.)

Example: Decimal ON: 12345 &rarr; 12345.; OFF: 12345 &rarr; 12345

**Returns:** `true` if the decimal separator is always shown;
        `false` otherwise

## DecimalFormat.setDecimalSeparatorAlwaysShown(boolean)

```java
public void setDecimalSeparatorAlwaysShown(boolean newValue)
```

Allows you to set the behavior of the decimal separator with integers.
(The decimal separator will always appear with decimals.)

Example: Decimal ON: 12345 &rarr; 12345.; OFF: 12345 &rarr; 12345

Parameters:

- `newValue`: `true` if the decimal separator is always shown; `false` otherwise
