---
title: "CompactNumberFormat class (java.text) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/CompactNumberFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompactNumberFormat class (java.text) (part 2 of 2)

## CompactNumberFormat.parse(String, ParsePosition)

```java
public Number parse(String text, ParsePosition pos)
```

(inherited documentation)

The returned value is the numeric part in the given text multiplied
by the numeric equivalent of the affix attached
(For example, "K" = 1000 in US locale).

A `CompactNumberFormat` can match
the default prefix/suffix to a compact prefix/suffix interchangeably.

Parsing can be done in either a strict or lenient manner, by default it is lenient.

Parsing fails when **lenient**, if the prefix and/or suffix are non-empty
and cannot be found due to parsing ending early, or the first character
after the prefix cannot be parsed.

Parsing fails when **strict**, if in `text`,

-  The default or a compact prefix is not found. For example, the `Locale.US` currency format prefix: "`$`"

-  The default or a compact suffix is not found. For example, a `Locale.US`
  `NumberFormat.Style.SHORT` compact suffix: "`K`"

-  `isGroupingUsed()` returns `false`, and the grouping
  symbol is found

-  `isGroupingUsed()` returns `true`, and `getGroupingSize()` is not adhered to

-  `isParseIntegerOnly()` returns `true`, and the decimal
  separator is found

-  `isGroupingUsed()` returns `true` and `isParseIntegerOnly()` returns `false`, and the grouping
  symbol occurs after the decimal separator

-  Any other characters are found, that are not the expected symbols,
  and are not digits that occur within the numerical portion

The subclass returned depends on the value of
`isParseBigDecimal`.

- If `isParseBigDecimal()` is false (the default),
    most integer values are returned as `Long`
    objects, no matter how they are written: `"17K"` and
    `"17.000K"` both parse to `Long.valueOf(17000)`.
    If the value cannot fit into `Long`, then the result is
    returned as `Double`. This includes values with a
    fractional part, infinite values, `NaN`,
    and the value -0.0.

    Callers may use the `Number` methods `doubleValue`,
    `longValue`, etc., to obtain the type they want.

- If `isParseBigDecimal()` is true, values are returned
    as `BigDecimal` objects. The special cases negative
    and positive infinity and NaN are returned as `Double`
    instances holding the values of the corresponding
    `Double` constants.

`CompactNumberFormat` parses all Unicode characters that represent
decimal digits, as defined by `Character.digit()`. In
addition, `CompactNumberFormat` also recognizes as digits the ten
consecutive characters starting with the localized zero digit defined in
the `DecimalFormatSymbols` object.

`CompactNumberFormat` parse does not allow parsing scientific
notations. For example, parsing a string `"1.05E4K"` in
US locale breaks at character 'E'
and returns 1.05.

Parameters:

- `text`: the string to be parsed
- `pos`: a `ParsePosition` object with index and error index information as described above

**Returns:** the parsed value, or `null` if the parse fails

Throws:

- `NullPointerException`: if `text` or `pos` is null

## CompactNumberFormat.setMaximumIntegerDigits(int)

```java
public void setMaximumIntegerDigits(int newValue)
```

(inherited documentation)

The maximum allowed integer range is 309, if the `newValue` >
309, then the maximum integer digits count is set to 309.

Parameters:

- `newValue`: the maximum number of integer digits to be shown.

## CompactNumberFormat.setMinimumIntegerDigits(int)

```java
public void setMinimumIntegerDigits(int newValue)
```

(inherited documentation)

The maximum allowed integer range is 309, if the `newValue` >
309, then the minimum integer digits count is set to 309.

Parameters:

- `newValue`: the minimum number of integer digits to be shown.

## CompactNumberFormat.setMinimumFractionDigits(int)

```java
public void setMinimumFractionDigits(int newValue)
```

(inherited documentation)

The maximum allowed fraction range is 340, if the `newValue` >
340, then the minimum fraction digits count is set to 340.

Parameters:

- `newValue`: the minimum number of fraction digits to be shown.

## CompactNumberFormat.setMaximumFractionDigits(int)

```java
public void setMaximumFractionDigits(int newValue)
```

(inherited documentation)

The maximum allowed fraction range is 340, if the `newValue` >
340, then the maximum fraction digits count is set to 340.

Parameters:

- `newValue`: the maximum number of fraction digits to be shown.

## CompactNumberFormat.getRoundingMode()

```java
public RoundingMode getRoundingMode()
```

Gets the `java.math.RoundingMode` used in this
`CompactNumberFormat`.

**Returns:** the `RoundingMode` used for this
        `CompactNumberFormat`

**See also:** #setRoundingMode(RoundingMode)

## CompactNumberFormat.setRoundingMode(RoundingMode)

```java
public void setRoundingMode(RoundingMode roundingMode)
```

Sets the `java.math.RoundingMode` used in this
`CompactNumberFormat`.

Parameters:

- `roundingMode`: the `RoundingMode` to be used

**See also:** #getRoundingMode()

Throws:

- `NullPointerException`: if `roundingMode` is `null`

## CompactNumberFormat.getGroupingSize()

```java
public int getGroupingSize()
```

Returns the grouping size. Grouping size is the number of digits between
grouping separators in the integer portion of a number. For example,
in the compact number `"12,347 trillion"` for the
US locale, the grouping size is 3.

**Returns:** the grouping size

**See also:** #setGroupingSize

**See also:** java.text.NumberFormat#isGroupingUsed

**See also:** java.text.DecimalFormatSymbols#getGroupingSeparator

## CompactNumberFormat.setGroupingSize(int)

```java
public void setGroupingSize(int newValue)
```

Sets the grouping size. Grouping size is the number of digits between
grouping separators in the integer portion of a number. For example,
in the compact number `"12,347 trillion"` for the
US locale, the grouping size is 3. The grouping
size must be greater than or equal to zero and less than or equal to 127.

Parameters:

- `newValue`: the new grouping size

**See also:** #getGroupingSize

**See also:** java.text.NumberFormat#setGroupingUsed

**See also:** java.text.DecimalFormatSymbols#setGroupingSeparator

Throws:

- `IllegalArgumentException`: if `newValue` is negative or larger than 127

## CompactNumberFormat.isGroupingUsed()

```java
public boolean isGroupingUsed()
```

Returns true if grouping is used in this format. For example, with
grouping on and grouping size set to 3, the number `12346567890987654`
can be formatted as `"12,347 trillion"` in the
US locale.
The grouping separator is locale dependent.

**Returns:** `true` if grouping is used;
        `false` otherwise

**See also:** #setGroupingUsed

## CompactNumberFormat.setGroupingUsed(boolean)

```java
public void setGroupingUsed(boolean newValue)
```

Sets whether or not grouping will be used in this format.

Parameters:

- `newValue`: `true` if grouping is used; `false` otherwise

**See also:** #isGroupingUsed

## CompactNumberFormat.isParseIntegerOnly()

```java
public boolean isParseIntegerOnly()
```

Returns true if this format parses only an integer from the number
component of a compact number.
Parsing an integer means that only an integer is considered from the
number component, prefix/suffix is still considered to compute the
resulting output.
For example, in the US locale, if this method
returns `true`, the string `"1234.78 thousand"` would be
parsed as the value `1234000` (1234 (integer part) * 1000
(thousand)) and the fractional part would be skipped.
The exact format accepted by the parse operation is locale dependent.

**Implementation requirements:** This implementation does not set the `ParsePosition` index
to the position of the decimal symbol, but rather the end of the string.

**Returns:** `true` if compact numbers should be parsed as integers
        only; `false` otherwise

## CompactNumberFormat.setParseIntegerOnly(boolean)

```java
public void setParseIntegerOnly(boolean value)
```

Sets whether or not this format parses only an integer from the number
component of a compact number.

Parameters:

- `value`: `true` if compact numbers should be parsed as integers only; `false` otherwise

**See also:** #isParseIntegerOnly

## CompactNumberFormat.isStrict()

```java
public boolean isStrict()
```

(inherited documentation)

**See also:** #setStrict(boolean)

**See also:** #parse(String, ParsePosition)

**Since:** 23

## CompactNumberFormat.setStrict(boolean)

```java
public void setStrict(boolean strict)
```

(inherited documentation)

**See also:** #isStrict()

**See also:** #parse(String, ParsePosition)

**Since:** 23

## CompactNumberFormat.isParseBigDecimal()

```java
public boolean isParseBigDecimal()
```

Returns whether the ParsePosition)
method returns `BigDecimal`. The default value is false.

**Returns:** `true` if the parse method returns BigDecimal;
        `false` otherwise

**See also:** #setParseBigDecimal

## CompactNumberFormat.setParseBigDecimal(boolean)

```java
public void setParseBigDecimal(boolean newValue)
```

Sets whether the ParsePosition)
method returns `BigDecimal`.

Parameters:

- `newValue`: `true` if the parse method returns BigDecimal; `false` otherwise

**See also:** #isParseBigDecimal

## CompactNumberFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `CompactNumberFormat` for equality.
Returns true if the object is also a `CompactNumberFormat` and the
two formats would format any value the same.

Parameters:

- `obj`: the object to compare with

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** true if this is equal to the other `CompactNumberFormat`

**See also:** Object#hashCode()

## CompactNumberFormat.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** Non-transient instance fields of this class are used to calculate
a hash code value which adheres to the contract defined in `Objects.hashCode`

**See also:** Object#hashCode()

## CompactNumberFormat.toString()

```java
public String toString()
```

## CompactNumberFormat.clone()

```java
public CompactNumberFormat clone()
```

Creates and returns a copy of this `CompactNumberFormat`
instance.

**Returns:** a clone of this instance
