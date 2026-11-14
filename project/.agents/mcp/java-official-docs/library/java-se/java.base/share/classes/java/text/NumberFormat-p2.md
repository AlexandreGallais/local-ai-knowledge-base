---
title: "NumberFormat class (java.text) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/NumberFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NumberFormat class (java.text) (part 2 of 3)

## NumberFormat.isStrict()

```java
public boolean isStrict()
```

**Implementation requirements:** The default implementation always throws `UnsupportedOperationException`. Subclasses should override this method
when implementing strict parsing.

**See also:** ##leniency Leniency Section

**See also:** #setStrict(boolean)

**Since:** 23

Throws:

- `UnsupportedOperationException`: if the implementation of this method does not support this operation

## NumberFormat.setStrict(boolean)

```java
public void setStrict(boolean strict)
```

Change the leniency value for parsing. Parsing can either be strict or lenient,
by default it is lenient.

Parameters:

- `strict`: `true` if parsing should be done strictly; `false` otherwise

**Implementation requirements:** The default implementation always throws `UnsupportedOperationException`. Subclasses should override this method
when implementing strict parsing.

**See also:** ##leniency Leniency Section

**See also:** #isStrict()

**Since:** 23

Throws:

- `UnsupportedOperationException`: if the implementation of this method does not support this operation

## NumberFormat.getInstance()

```java
public static final NumberFormat getInstance()
```

Returns a general-purpose number format for the current default
FORMAT locale.
This is the same as calling
getNumberInstance().

**Returns:** the `NumberFormat` instance for general-purpose number
formatting

## NumberFormat.getInstance(Locale)

```java
public static NumberFormat getInstance(Locale inLocale)
```

Returns a general-purpose number format for the specified locale.
This is the same as calling
getNumberInstance(inLocale).

Parameters:

- `inLocale`: the desired locale

**Returns:** the `NumberFormat` instance for general-purpose number
formatting

## NumberFormat.getNumberInstance()

```java
public static final NumberFormat getNumberInstance()
```

Returns a general-purpose number format for the current default
FORMAT locale.

This is equivalent to calling
getNumberInstance(Locale.getDefault(Locale.Category.FORMAT)).

**Returns:** the `NumberFormat` instance for general-purpose number
formatting

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

## NumberFormat.getNumberInstance(Locale)

```java
public static NumberFormat getNumberInstance(Locale inLocale)
```

Returns a general-purpose number format for the specified locale.

Parameters:

- `inLocale`: the desired locale

**Returns:** the `NumberFormat` instance for general-purpose number
formatting

## NumberFormat.getIntegerInstance()

```java
public static final NumberFormat getIntegerInstance()
```

Returns an integer number format for the current default
FORMAT locale. The
returned number format is configured to round floating point numbers
to the nearest integer using half-even rounding (see RoundingMode.HALF_EVEN) for formatting,
and to parse only the integer part of an input string (see isParseIntegerOnly).

This is equivalent to calling
getIntegerInstance(Locale.getDefault(Locale.Category.FORMAT)).

**See also:** #getRoundingMode()

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a number format for integer values

**Since:** 1.4

## NumberFormat.getIntegerInstance(Locale)

```java
public static NumberFormat getIntegerInstance(Locale inLocale)
```

Returns an integer number format for the specified locale. The
returned number format is configured to round floating point numbers
to the nearest integer using half-even rounding (see RoundingMode.HALF_EVEN) for formatting,
and to parse only the integer part of an input string (see isParseIntegerOnly).

Parameters:

- `inLocale`: the desired locale

**See also:** #getRoundingMode()

**Returns:** a number format for integer values

**Since:** 1.4

## NumberFormat.getCurrencyInstance()

```java
public static final NumberFormat getCurrencyInstance()
```

Returns a currency format for the current default
FORMAT locale.

This is equivalent to calling
getCurrencyInstance(Locale.getDefault(Locale.Category.FORMAT)).

**Returns:** the `NumberFormat` instance for currency formatting

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

## NumberFormat.getCurrencyInstance(Locale)

```java
public static NumberFormat getCurrencyInstance(Locale inLocale)
```

Returns a currency format for the specified locale.

If the specified locale contains the "`cf`" (

currency format style)
Unicode extension,
the returned currency format uses the style if it is available.
Otherwise, the style uses the default "`standard`" currency format.
For example, if the style designates "`account`", negative
currency amounts use a pair of parentheses in some locales.

Parameters:

- `inLocale`: the desired locale

**Returns:** the `NumberFormat` instance for currency formatting

## NumberFormat.getPercentInstance()

```java
public static final NumberFormat getPercentInstance()
```

Returns a percentage format for the current default
FORMAT locale.

This is equivalent to calling
getPercentInstance(Locale.getDefault(Locale.Category.FORMAT)).

**Returns:** the `NumberFormat` instance for percentage formatting

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

## NumberFormat.getPercentInstance(Locale)

```java
public static NumberFormat getPercentInstance(Locale inLocale)
```

Returns a percentage format for the specified locale.

Parameters:

- `inLocale`: the desired locale

**Returns:** the `NumberFormat` instance for percentage formatting

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

Parameters:

- `inLocale`: the desired locale

## NumberFormat.getCompactNumberInstance()

```java
public static NumberFormat getCompactNumberInstance()
```

Returns a compact number format for the default
FORMAT locale with
"SHORT" format style.

**Returns:** A `NumberFormat` instance for compact number
        formatting

**See also:** CompactNumberFormat

**See also:** NumberFormat.Style

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Since:** 12

## NumberFormat.getCompactNumberInstance(Locale, NumberFormat.Style)

```java
public static NumberFormat getCompactNumberInstance(Locale locale, NumberFormat.Style formatStyle)
```

Returns a compact number format for the specified locale
and formatStyle.

Parameters:

- `locale`: the desired locale
- `formatStyle`: the style for formatting a number

**Returns:** A `NumberFormat` instance for compact number
        formatting

**See also:** CompactNumberFormat

**See also:** NumberFormat.Style

**See also:** java.util.Locale

**Since:** 12

Throws:

- `NullPointerException`: if `locale` or `formatStyle` is `null`

## NumberFormat.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
`get*Instance` methods of this class can return
localized instances.
The returned array represents the union of locales supported by the Java
runtime and by installed
NumberFormatProvider implementations.
At a minimum, the returned array must contain a `Locale` instance equal to
Locale.ROOT and a `Locale` instance equal to
Locale.US.

**Returns:** An array of locales for which localized
        `NumberFormat` instances are available.

## NumberFormat.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** This method calculates the hash code value using the values returned by
`getMaximumIntegerDigits()` and `getMaximumFractionDigits()`.

**See also:** Object#hashCode()

## NumberFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `NumberFormat` for equality.
Returns true if the object is also a `NumberFormat` and the
two formats would format any value the same.

Parameters:

- `obj`: object to be compared for equality

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** `true` if the specified object is equal to this `NumberFormat`

**See also:** Object#equals(Object)

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
For example, consider a `NumberFormat` that expects a "`,`"
grouping separator symbol with a grouping size of 3.

-  Formatting `1234567` with grouping on returns `"1,234,567"`

-  Parsing `"1,234,567"` with grouping off returns `1`

-  Parsing `"1,234,567"` with grouping off when `isStrict()`
       returns `true` throws `ParseException`

**Returns:** `true` if grouping is used;
        `false` otherwise

**See also:** #setGroupingUsed

**See also:** ##leniency Leniency Section

## NumberFormat.setGroupingUsed(boolean)

```java
public void setGroupingUsed(boolean newValue)
```

Set whether or not grouping will be used in this format.
This applies to both formatting and parsing.

Parameters:

- `newValue`: `true` if grouping is used; `false` otherwise

**See also:** #isGroupingUsed

## NumberFormat.getMaximumIntegerDigits()

```java
public int getMaximumIntegerDigits()
```

Returns the maximum number of digits allowed in the integer portion of a
number during formatting.

**Returns:** the maximum number of digits

**See also:** #setMaximumIntegerDigits

## NumberFormat.setMaximumIntegerDigits(int)

```java
public void setMaximumIntegerDigits(int newValue)
```

Sets the maximum number of digits allowed in the integer portion of a
number during formatting. `maximumIntegerDigits` must be &ge;
`minimumIntegerDigits`. If the new value for `maximumIntegerDigits` is less than the current value of
`minimumIntegerDigits`, then `minimumIntegerDigits` will
also be set to the new value. Negative input values are replaced with 0.

Parameters:

- `newValue`: the maximum number of integer digits to be shown. The concrete subclass may enforce an upper limit to this value appropriate to the numeric type being formatted.

**See also:** #getMaximumIntegerDigits

## NumberFormat.getMinimumIntegerDigits()

```java
public int getMinimumIntegerDigits()
```

Returns the minimum number of digits allowed in the integer portion of a
number during formatting.

**Returns:** the minimum number of digits

**See also:** #setMinimumIntegerDigits

## NumberFormat.setMinimumIntegerDigits(int)

```java
public void setMinimumIntegerDigits(int newValue)
```

Sets the minimum number of digits allowed in the integer portion of a
number during formatting. `minimumIntegerDigits` must be &le;
`maximumIntegerDigits`. If the new value for `minimumIntegerDigits`
exceeds the current value of `maximumIntegerDigits`, then `maximumIntegerDigits` will also be set to the new value. Negative input
values are replaced with 0.

Parameters:

- `newValue`: the minimum number of integer digits to be shown. The concrete subclass may enforce an upper limit to this value appropriate to the numeric type being formatted.

**See also:** #getMinimumIntegerDigits

## NumberFormat.getMaximumFractionDigits()

```java
public int getMaximumFractionDigits()
```

Returns the maximum number of digits allowed in the fraction portion of a
number during formatting.

**Returns:** the maximum number of digits.

**See also:** #setMaximumFractionDigits

## NumberFormat.setMaximumFractionDigits(int)

```java
public void setMaximumFractionDigits(int newValue)
```

Sets the maximum number of digits allowed in the fraction portion of a
number during formatting. `maximumFractionDigits` must be &ge;
`minimumFractionDigits`. If the new value for `maximumFractionDigits`
is less than the current value of `minimumFractionDigits`, then
`minimumFractionDigits` will also be set to the new value. Negative
input values are replaced with 0.

Parameters:

- `newValue`: the maximum number of fraction digits to be shown. The concrete subclass may enforce an upper limit to this value appropriate to the numeric type being formatted.

**See also:** #getMaximumFractionDigits

## NumberFormat.getMinimumFractionDigits()

```java
public int getMinimumFractionDigits()
```

Returns the minimum number of digits allowed in the fraction portion of a
number during formatting.

**Returns:** the minimum number of digits

**See also:** #setMinimumFractionDigits

## NumberFormat.setMinimumFractionDigits(int)

```java
public void setMinimumFractionDigits(int newValue)
```

Sets the minimum number of digits allowed in the fraction portion of a
number during formatting. `minimumFractionDigits` must be &le;
`maximumFractionDigits`. If the new value for `minimumFractionDigits` exceeds the current value of `maximumFractionDigits`, then `maximumFractionDigits` will also be
set to the new value. Negative input values are replaced with 0.

Parameters:

- `newValue`: the minimum number of fraction digits to be shown. The concrete subclass may enforce an upper limit to this value appropriate to the numeric type being formatted.

**See also:** #getMinimumFractionDigits

## NumberFormat.getCurrency()

```java
public Currency getCurrency()
```

Gets the currency used by this number format when formatting
currency values. The initial value is derived in a locale dependent
way. The returned value may be `null` if no valid
currency could be determined and no currency has been set using
`setCurrency(Currency)`.

**Implementation requirements:** The default implementation always throws `UnsupportedOperationException`. Subclasses should override this method
if currency formatting is desired.

**Returns:** the currency used by this number format, or `null`

**Since:** 1.4

Throws:

- `UnsupportedOperationException`: if the implementation of this method does not support this operation
