---
title: "ChoiceFormat class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/ChoiceFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChoiceFormat class (java.text)

```java
public class ChoiceFormat extends NumberFormat
```

`ChoiceFormat` is a concrete subclass of `NumberFormat` that
allows you to attach a format to a range of numbers.
It is generally used in a `MessageFormat` for handling plurals.
The choice is specified with an ascending list of doubles, where each item
specifies a half-open interval up to the next item:

```java
X matches j if and only if limit[j] &le; X < limit[j+1]
```

If there is no match, then either the first or last index is used, depending
on whether the number (X) is too low or too high.  If the limit array is not
in ascending order, the results of formatting will be incorrect.  ChoiceFormat
also accepts `\u221E` as equivalent to infinity(INF).

**Note:**
`ChoiceFormat` differs from the other `Format`
classes in that you create a `ChoiceFormat` object with a
constructor (not with a `getInstance` style factory
method). The factory methods aren't necessary because `ChoiceFormat`
doesn't require any complex setup for a given locale. In fact,
`ChoiceFormat` doesn't implement any locale specific behavior.

#### Patterns

A `ChoiceFormat` pattern has the following syntax:

*Pattern:*
SubPattern *("|" SubPattern)

*SubPattern:*
Limit Relation Format
Note: Each additional SubPattern must have an ascending Limit-Relation interval

*Limit:*
Number / "&infin;" / "-&infin;"

*Number:*
["-"] *(Digit) 1*(Decimal / Digit) *(Digit) [Exponent]

*Decimal:*
1*(Digit ".") / 1*("." Digit)

*Digit:*
0 - 9

*Exponent:*
*(Digit) Digit ExponentSymbol Digit *(Digit)

*ExponentSymbol:*
"e" / "E"

*Relation:*
"#" / "<" / "&le;"

*Format:*
Any characters except the special pattern character '|'

*Note:The relation &le; is not equivalent to <&equals;*

 To use a reserved special pattern character within a *Format* pattern,
it must be single quoted. For example, `new ChoiceFormat("1#'|'foo'|'").format(1)`
returns `"|foo|"`.
Use two single quotes in a row to produce a literal single quote. For example,
`new ChoiceFormat("1# ''one'' ").format(1)` returns `" 'one' "`.

#### Usage Information

A `ChoiceFormat` can be constructed using either an array of formats
and an array of limits or a string pattern. When constructing with
format and limit arrays, the length of these arrays must be the same.

For example,

-
    *limits* = {1,2,3,4,5,6,7}

    *formats* = {"Sun","Mon","Tue","Wed","Thur","Fri","Sat"}

-
    *limits* = {0, 1, ChoiceFormat.nextDouble(1)}

    *formats* = {"no files", "one file", "many files"}

    (`nextDouble` can be used to get the next higher double, to
    make the half-open interval.)

Below is an example of constructing a ChoiceFormat with arrays to format
and parse values:

Below is an example of constructing a ChoiceFormat with a String pattern:

For more sophisticated patterns, `ChoiceFormat` can be used with
`MessageFormat` to produce accurate forms for singular and plural:

The output with different values for `fileCount`:

```java
The disk "MyDisk" contains no files.
The disk "MyDisk" contains one file.
The disk "MyDisk" contains 1,273 files.
```

See MessageFormat for caveats regarding
`MessageFormat` patterns within a `ChoiceFormat` pattern.

#### Synchronization

Choice formats are not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

**API note:** A subclass could perform more consistent pattern validation by
throwing an `IllegalArgumentException` for all incorrect cases.
See the `Implementation Note` for this implementation's behavior regarding
incorrect patterns.

This class inherits instance methods from `NumberFormat` it does
not utilize; a subclass could override and throw `UnsupportedOperationException` for such methods.

**Implementation note:** Given an incorrect pattern, this implementation may either
throw an exception or succeed and discard the incorrect portion. A `NumberFormatException` is thrown if a `limit` can not be
parsed as a numeric value and an `IllegalArgumentException` is thrown
if a `SubPattern` is missing, or the intervals are not ascending.
Discarding the incorrect portion may result in a ChoiceFormat with
empty `limits` and `formats`.

**See also:** DecimalFormat

**See also:** MessageFormat

**Since:** 1.1

## ChoiceFormat.applyPattern(String)

```java
public void applyPattern(String newPattern)
```

Apply the given pattern to this ChoiceFormat object. The syntax and error
related caveats for the ChoiceFormat pattern can be found in the
Patterns section. Unlike String[]), this method will throw an `IllegalArgumentException` if
the `limits` are not in ascending order.

Parameters:

- `newPattern`: a pattern string

**See also:** #ChoiceFormat(String)

Throws:

- `NullPointerException`: if `newPattern` is `null`
- `IllegalArgumentException`: if `newPattern` violates the pattern syntax

## ChoiceFormat.toPattern()

```java
public String toPattern()
```

The `string` returned is not guaranteed to be the same input
`string` passed to either `applyPattern(String)` or
`ChoiceFormat(String)`.

**See also:** #applyPattern(String)

## ChoiceFormat.ChoiceFormat(String)

```java
public ChoiceFormat(String newPattern)
```

Constructs a ChoiceFormat with limits and corresponding formats
based on the pattern. The syntax and error related caveats for the
ChoiceFormat pattern can be found in the Patterns
section. Unlike String[]), this constructor will
throw an `IllegalArgumentException` if the `limits` are not
in ascending order.

Parameters:

- `newPattern`: the new pattern string

**See also:** #applyPattern

Throws:

- `NullPointerException`: if `newPattern` is `null`
- `IllegalArgumentException`: if `newPattern` violates the pattern syntax

## ChoiceFormat.ChoiceFormat(double[], String[])

```java
public ChoiceFormat(double[] limits, String[] formats)
```

Constructs with the limits and the corresponding formats.

Parameters:

- `limits`: limits in ascending order
- `formats`: corresponding format strings

**See also:** #setChoices

Throws:

- `NullPointerException`: if `limits` or `formats` is `null`
- `IllegalArgumentException`: if the length of `limits` and `formats` are not equal

## ChoiceFormat.setChoices(double[], String[])

```java
public void setChoices(double[] limits, String[] formats)
```

Set the choices to be used in formatting.

Parameters:

- `limits`: contains the top value that you want parsed with that format, and should be in ascending sorted order. When formatting X, the choice will be the i, where limit[i] &le; X < limit[i+1]. If the limit array is not in ascending order, the results of formatting will be incorrect.
- `formats`: are the formats you want to use for each limit.

Throws:

- `NullPointerException`: if `limits` or `formats` is `null`
- `IllegalArgumentException`: if the length of `limits` and `formats` are not equal

## ChoiceFormat.getLimits()

```java
public double[] getLimits()
```

## ChoiceFormat.getFormats()

```java
public Object[] getFormats()
```

## ChoiceFormat.format(long, StringBuffer, FieldPosition)

```java
public StringBuffer format(long number, StringBuffer toAppendTo, FieldPosition status)
```

Specialization of format. This method really calls
StringBuffer, FieldPosition).
Thus, the range of longs that are supported is only equal to
the range that can be stored by double. This will never be
a practical limitation.

Parameters:

- `number`: number to be formatted and substituted.
- `toAppendTo`: where text is appended.
- `status`: ignore no useful status is returned.

Throws:

- `ArrayIndexOutOfBoundsException`: if either the `limits` or `formats` of this ChoiceFormat are empty
- `NullPointerException`: if `toAppendTo` is `null`

## ChoiceFormat.format(double, StringBuffer, FieldPosition)

```java
public StringBuffer format(double number, StringBuffer toAppendTo, FieldPosition status)
```

Returns pattern with formatted double.

Parameters:

- `number`: number to be formatted and substituted.
- `toAppendTo`: where text is appended.
- `status`: ignore no useful status is returned.

Throws:

- `ArrayIndexOutOfBoundsException`: if either the `limits` or `formats` of this ChoiceFormat are empty
- `NullPointerException`: if `toAppendTo` is `null`

## ChoiceFormat.parse(String, ParsePosition)

```java
public Number parse(String text, ParsePosition status)
```

Parses the input text starting at the index given by the `ParsePosition`
as a `Double`. The value returned is the `limit` corresponding
to the `format` that is the longest substring of the input text.
Matching is done in ascending order, when multiple `format`s match
the text equivalently in strength, the first matching `limit` is
returned. If there is no match, `Double.NaN` is returned.

For example,

Parameters:

- `text`: the source text.
- `status`: an input-output parameter. On input, the status.index field indicates the first character of the source text that should be parsed. On exit, if no error occurred, status.index is set to the first unparsed character in the source text. On exit, if an error did occur, status.index is unchanged and status.errorIndex is set to the first index of the character that caused the parse to fail.

**Returns:** A Number which represents the `limit` corresponding to the
`format` parsed, or `Double.NaN` if the parse fails.

Throws:

- `NullPointerException`: if `status` is `null` or if `text` is `null` and the list of choice strings is not empty.

## ChoiceFormat.isStrict()

```java
public boolean isStrict()
```

**Since:** 23

## ChoiceFormat.setStrict(boolean)

```java
public void setStrict(boolean strict)
```

**Since:** 23

## ChoiceFormat.nextDouble(double)

```java
public static final double nextDouble (double d)
```

Finds the least double greater than `d`.
If `NaN`, returns same value.

Used to make half-open intervals.

Parameters:

- `d`: the reference value

**Implementation note:** This is equivalent to calling
Math.nextUp(d)

**Returns:** the least double value greater than `d`

**See also:** #previousDouble

## ChoiceFormat.nextDouble(double, boolean)

```java
public static double nextDouble (double d, boolean positive)
```

Finds the least double greater than `d` (if `positive` is
`true`), or the greatest double less than `d` (if
`positive` is `false`).
If `NaN`, returns same value.

Parameters:

- `d`: the reference value
- `positive`: `true` if the least double is desired; `false` otherwise

**Implementation note:** This is equivalent to calling
`positive ? Math.nextUp(d) : Math.nextDown(d)`

**Returns:** the least or greater double value

## ChoiceFormat.previousDouble(double)

```java
public static final double previousDouble (double d)
```

Finds the greatest double less than `d`.
If `NaN`, returns same value.

Parameters:

- `d`: the reference value

**Implementation note:** This is equivalent to calling
Math.nextDown(d)

**Returns:** the greatest double value less than `d`

**See also:** #nextDouble

## ChoiceFormat.clone()

```java
public Object clone()
```

Overrides Cloneable

## ChoiceFormat.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** This method calculates the hash code value using the values returned by
`getFormats()` and `getLimits()`.

**See also:** Object#hashCode()

## ChoiceFormat.toString()

```java
public String toString()
```

## ChoiceFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `ChoiceFormat` for equality.
Returns true if the object is also a `ChoiceFormat` and the
two formats would format any value the same.

Parameters:

- `obj`: object to be compared for equality

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** `true` if the specified object is equal to this `ChoiceFormat`

**See also:** Object#equals(Object)
