---
title: "DecimalFormat class (java.text) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/DecimalFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DecimalFormat class (java.text) (part 3 of 3)

## DecimalFormat.isStrict()

```java
public boolean isStrict()
```

(inherited documentation)

**See also:** #setStrict(boolean)

**See also:** #parse(String, ParsePosition)

**Since:** 23

## DecimalFormat.setStrict(boolean)

```java
public void setStrict(boolean strict)
```

(inherited documentation)

**See also:** #isStrict()

**See also:** #parse(String, ParsePosition)

**Since:** 23

## DecimalFormat.isParseBigDecimal()

```java
public boolean isParseBigDecimal()
```

Returns whether the java.text.ParsePosition)
method returns `BigDecimal`. The default value is false.

**Returns:** `true` if the parse method returns BigDecimal;
        `false` otherwise

**See also:** #setParseBigDecimal

**Since:** 1.5

## DecimalFormat.setParseBigDecimal(boolean)

```java
public void setParseBigDecimal(boolean newValue)
```

Sets whether the java.text.ParsePosition)
method returns `BigDecimal`.

Parameters:

- `newValue`: `true` if the parse method returns BigDecimal; `false` otherwise

**See also:** #isParseBigDecimal

**Since:** 1.5

## DecimalFormat.clone()

```java
public Object clone()
```

Standard override; no change in semantics.

## DecimalFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `DecimalFormat` for equality.
Returns true if the object is also a `DecimalFormat` and the
two formats would format any value the same.

Parameters:

- `obj`: object to be compared for equality

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** `true` if the specified object is equal to this `DecimalFormat`

**See also:** Object#equals(Object)

## DecimalFormat.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** This method calculates the hash code value using the values returned from
`getPositivePrefix()` and `NumberFormat.hashCode()`.

**See also:** Object#hashCode()

**See also:** NumberFormat#hashCode()

## DecimalFormat.toString()

```java
public String toString()
```

## DecimalFormat.toPattern()

```java
public String toPattern()
```

Synthesizes a pattern string that represents the current state
of this Format object.

**Returns:** a pattern string

**See also:** #applyPattern

## DecimalFormat.toLocalizedPattern()

```java
public String toLocalizedPattern()
```

Synthesizes a localized pattern string that represents the current
state of this Format object.

**Returns:** a localized pattern string

**See also:** #applyPattern

## DecimalFormat.applyPattern(String)

```java
public void applyPattern(String pattern)
```

Apply the given pattern to this Format object.  A pattern is a
short-hand specification for the various formatting properties.
These properties can also be changed individually through the
various setter methods.

The number of maximum integer digits is usually not derived from the pattern.
See the note in the Patterns section for more detail.
For negative numbers, use a second pattern, separated by a semicolon

Example `"#,#00.0#"` &rarr; 1,234.56

This means a minimum of 2 integer digits, 1 fraction digit, and
a maximum of 2 fraction digits.

Example: `"#,#00.0#;(#,#00.0#)"` for negatives in
parentheses.

In negative patterns, the minimum and maximum counts are ignored;
these are presumed to be set in the positive pattern.

Parameters:

- `pattern`: a new pattern

Throws:

- `NullPointerException`: if `pattern` is null
- `IllegalArgumentException`: if the given pattern is invalid.

## DecimalFormat.applyLocalizedPattern(String)

```java
public void applyLocalizedPattern(String pattern)
```

Apply the given pattern to this Format object.  The pattern
is assumed to be in a localized notation. A pattern is a
short-hand specification for the various formatting properties.
These properties can also be changed individually through the
various setter methods.

The number of maximum integer digits is usually not derived from the pattern.
See the note in the Patterns section for more detail.
For negative numbers, use a second pattern, separated by a semicolon

Example `"#,#00.0#"` &rarr; 1,234.56

This means a minimum of 2 integer digits, 1 fraction digit, and
a maximum of 2 fraction digits.

Example: `"#,#00.0#;(#,#00.0#)"` for negatives in
parentheses.

In negative patterns, the minimum and maximum counts are ignored;
these are presumed to be set in the positive pattern.

Parameters:

- `pattern`: a new pattern

Throws:

- `NullPointerException`: if `pattern` is null
- `IllegalArgumentException`: if the given pattern is invalid.

## DecimalFormat.setMaximumIntegerDigits(int)

```java
public void setMaximumIntegerDigits(int newValue)
```

(inherited documentation)

Parameters:

- `newValue`: the maximum number of integer digits to be shown.

**See also:** #getMaximumIntegerDigits()

**See also:** ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.setMinimumIntegerDigits(int)

```java
public void setMinimumIntegerDigits(int newValue)
```

(inherited documentation)

Parameters:

- `newValue`: the minimum number of integer digits to be shown.

**See also:** #getMinimumIntegerDigits()

**See also:** ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.setMaximumFractionDigits(int)

```java
public void setMaximumFractionDigits(int newValue)
```

(inherited documentation)

Parameters:

- `newValue`: the maximum number of fraction digits to be shown.

**See also:** #getMaximumFractionDigits()

**See also:** ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.setMinimumFractionDigits(int)

```java
public void setMinimumFractionDigits(int newValue)
```

(inherited documentation)

Parameters:

- `newValue`: the minimum number of fraction digits to be shown.

**See also:** #getMinimumFractionDigits()

**See also:** ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getMaximumIntegerDigits()

```java
public int getMaximumIntegerDigits()
```

(inherited documentation)

Unlike the other digit limits, `maximumIntegerDigits` is not
updated by `DecimalFormats` created or updated with a string pattern.

**See also:** #setMaximumIntegerDigits

**See also:** ##patterns Pattern Section

**See also:** ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getMinimumIntegerDigits()

```java
public int getMinimumIntegerDigits()
```

(inherited documentation)

**See also:** #setMinimumIntegerDigits

**See also:** ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getMaximumFractionDigits()

```java
public int getMaximumFractionDigits()
```

(inherited documentation)

**See also:** #setMaximumFractionDigits

**See also:** ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getMinimumFractionDigits()

```java
public int getMinimumFractionDigits()
```

(inherited documentation)

**See also:** #setMinimumFractionDigits

**See also:** ##digit_limits Integer and Fraction Digit Limits

## DecimalFormat.getCurrency()

```java
public Currency getCurrency()
```

Gets the currency used by this decimal format when formatting
currency values.
The currency is obtained by calling
DecimalFormatSymbols.getCurrency
on this number format's symbols.

**Returns:** the currency used by this decimal format, or `null`

**Since:** 1.4

## DecimalFormat.setCurrency(Currency)

```java
public void setCurrency(Currency currency)
```

Sets the currency used by this number format when formatting
currency values. This does not update the minimum or maximum
number of fraction digits used by the number format.
The currency is set by calling
DecimalFormatSymbols.setCurrency
on this number format's symbols.

Parameters:

- `currency`: the new currency to be used by this decimal format

**Since:** 1.4

Throws:

- `NullPointerException`: if `currency` is null

## DecimalFormat.getRoundingMode()

```java
public RoundingMode getRoundingMode()
```

Gets the `java.math.RoundingMode` used in this DecimalFormat.

**Returns:** The `RoundingMode` used for this DecimalFormat.

**See also:** #setRoundingMode(RoundingMode)

**Since:** 1.6

## DecimalFormat.setRoundingMode(RoundingMode)

```java
public void setRoundingMode(RoundingMode roundingMode)
```

Sets the `java.math.RoundingMode` used in this DecimalFormat.

Parameters:

- `roundingMode`: The `RoundingMode` to be used

**See also:** #getRoundingMode()

**Since:** 1.6

Throws:

- `NullPointerException`: if `roundingMode` is null.
