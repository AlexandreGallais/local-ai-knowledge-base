---
title: "BigDecimal class (java.math) (part 2 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigDecimal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigDecimal class (java.math) (part 2 of 6)

## BigDecimal.BigDecimal(char[], int, int, MathContext)

```java
public BigDecimal(char[] in, int offset, int len, MathContext mc)
```

Translates a character array representation of a
`BigDecimal` into a `BigDecimal`, accepting the
same sequence of characters as the `BigDecimal(String)`
constructor, while allowing a sub-array to be specified and
with rounding according to the context settings.

Parameters:

- `in`: `char` array that is the source of characters.
- `offset`: first character in the array to inspect.
- `len`: number of characters to consider.
- `mc`: the context to use.

**Implementation note:** If the sequence of characters is already available
within a character array, using this constructor is faster than
converting the `char` array to string and using the
`BigDecimal(String)` constructor.

**Since:** 1.5

Throws:

- `NumberFormatException`: if `in` is not a valid representation of a `BigDecimal` or the defined subarray is not wholly within `in`.

## BigDecimal.BigDecimal(char[])

```java
public BigDecimal(char[] in)
```

Translates a character array representation of a
`BigDecimal` into a `BigDecimal`, accepting the
same sequence of characters as the `BigDecimal(String)`
constructor.

Parameters:

- `in`: `char` array that is the source of characters.

**Implementation note:** If the sequence of characters is already available
as a character array, using this constructor is faster than
converting the `char` array to string and using the
`BigDecimal(String)` constructor.

**Since:** 1.5

Throws:

- `NumberFormatException`: if `in` is not a valid representation of a `BigDecimal`.

## BigDecimal.BigDecimal(char[], MathContext)

```java
public BigDecimal(char[] in, MathContext mc)
```

Translates a character array representation of a
`BigDecimal` into a `BigDecimal`, accepting the
same sequence of characters as the `BigDecimal(String)`
constructor and with rounding according to the context
settings.

Parameters:

- `in`: `char` array that is the source of characters.
- `mc`: the context to use.

**Implementation note:** If the sequence of characters is already available
as a character array, using this constructor is faster than
converting the `char` array to string and using the
`BigDecimal(String)` constructor.

**Since:** 1.5

Throws:

- `NumberFormatException`: if `in` is not a valid representation of a `BigDecimal`.

## BigDecimal.BigDecimal(String)

```java
public BigDecimal(String val)
```

Translates the string representation of a `BigDecimal`
into a `BigDecimal`.  The string representation consists
of an optional sign, `'+'` (` '\u002B'`) or
`'-'` (`'\u002D'`), followed by a sequence of
zero or more decimal digits ("the integer"), optionally
followed by a fraction, optionally followed by an exponent.

The fraction consists of a decimal point followed by zero
or more decimal digits.  The string must contain at least one
digit in either the integer or the fraction.  The number formed
by the sign, the integer and the fraction is referred to as the
*significand*.

The exponent consists of the character `'e'`
(`'\u0065'`) or `'E'` (`'\u0045'`)
followed by one or more decimal digits.

More formally, the strings this constructor accepts are
described by the following grammar:

*BigDecimalString:*
*Signopt Significand Exponentopt*
*Sign:*
`+`
`-`
*Significand:*
*IntegerPart* `.` *FractionPartopt*
`.` *FractionPart*
*IntegerPart*
*IntegerPart:*
*Digits*
*FractionPart:*
*Digits*
*Exponent:*
*ExponentIndicator SignedInteger*
*ExponentIndicator:*
`e`
`E`
*SignedInteger:*
*Signopt Digits*
*Digits:*
*Digit*
*Digits Digit*
*Digit:*
any character for which `Character.isDigit`
returns `true`, including 0, 1, 2 ...

The scale of the returned `BigDecimal` will be the
number of digits in the fraction, or zero if the string
contains no decimal point, subject to adjustment for any
exponent; if the string contains an exponent, the exponent is
subtracted from the scale.  The value of the resulting scale
must lie between `Integer.MIN_VALUE` and
`Integer.MAX_VALUE`, inclusive.

The character-to-digit mapping is provided by `java.lang.Character.digit` set to convert to radix 10.  The
String may not contain any extraneous characters (whitespace,
for example).

**Examples:**

The value of the returned `BigDecimal` is equal to
*significand* &times; 10 *exponent*.
For each string on the left, the resulting representation
[`BigInteger`, `scale`] is shown on the right.

```java
"0"            [0,0]
"0.00"         [0,2]
"123"          [123,0]
"-123"         [-123,0]
"1.23E3"       [123,-1]
"1.23E+3"      [123,-1]
"12.3E+7"      [123,-6]
"12.0"         [120,1]
"12.3"         [123,1]
"0.00123"      [123,5]
"-1.23E-12"    [-123,14]
"1234.5E-4"    [12345,5]
"0E+7"         [0,-7]
"-0"           [0,0]
```

Parameters:

- `val`: String representation of `BigDecimal`.

**API note:** For values other than `float` and
`double` NaN and &plusmn;Infinity, this constructor is
compatible with the values returned by `Float.toString`
and `Double.toString`.  This is generally the preferred
way to convert a `float` or `double` into a
BigDecimal, as it doesn't suffer from the unpredictability of
the `BigDecimal(double)` constructor.

Throws:

- `NumberFormatException`: if `val` is not a valid representation of a `BigDecimal`.

## BigDecimal.BigDecimal(String, MathContext)

```java
public BigDecimal(String val, MathContext mc)
```

Translates the string representation of a `BigDecimal`
into a `BigDecimal`, accepting the same strings as the
`BigDecimal(String)` constructor, with rounding
according to the context settings.

Parameters:

- `val`: string representation of a `BigDecimal`.
- `mc`: the context to use.

**Since:** 1.5

Throws:

- `NumberFormatException`: if `val` is not a valid representation of a BigDecimal.

## BigDecimal.BigDecimal(double)

```java
public BigDecimal(double val)
```

Translates a `double` into a `BigDecimal` which
is the exact decimal representation of the `double`'s
binary floating-point value.  The scale of the returned
`BigDecimal` is the smallest value such that
`(10scale &times; val)` is an integer.

**Notes:**

-
The results of this constructor can be somewhat unpredictable.
One might assume that writing `new BigDecimal(0.1)` in
Java creates a `BigDecimal` which is exactly equal to
0.1 (an unscaled value of 1, with a scale of 1), but it is
actually equal to
0.1000000000000000055511151231257827021181583404541015625.
This is because 0.1 cannot be represented exactly as a
`double` (or, for that matter, as a binary fraction of
any finite length).  Thus, the value that is being passed
*in* to the constructor is not exactly equal to 0.1,
appearances notwithstanding.

-
The `String` constructor, on the other hand, is
perfectly predictable: writing `new BigDecimal("0.1")`
creates a `BigDecimal` which is *exactly* equal to
0.1, as one would expect.  Therefore, it is generally
recommended that the String constructor be used in preference to this one.

-
When a `double` must be used as a source for a
`BigDecimal`, note that this constructor provides an
exact conversion; it does not give the same result as
converting the `double` to a `String` using the
`Double.toString(double)` method and then using the
`BigDecimal(String)` constructor.  To get that result,
use the `static` `valueOf(double)` method.

Parameters:

- `val`: `double` value to be converted to `BigDecimal`.

Throws:

- `NumberFormatException`: if `val` is infinite or NaN.

## BigDecimal.BigDecimal(double, MathContext)

```java
public BigDecimal(double val, MathContext mc)
```

Translates a `double` into a `BigDecimal`, with
rounding according to the context settings.  The scale of the
`BigDecimal` is the smallest value such that
`(10scale &times; val)` is an integer.

The results of this constructor can be somewhat unpredictable
and its use is generally not recommended; see the notes under
the `BigDecimal(double)` constructor.

Parameters:

- `val`: `double` value to be converted to `BigDecimal`.
- `mc`: the context to use.

**Since:** 1.5

Throws:

- `NumberFormatException`: if `val` is infinite or NaN.

## BigDecimal.BigDecimal(BigInteger)

```java
public BigDecimal(BigInteger val)
```

Translates a `BigInteger` into a `BigDecimal`.
The scale of the `BigDecimal` is zero.

Parameters:

- `val`: `BigInteger` value to be converted to `BigDecimal`.

## BigDecimal.BigDecimal(BigInteger, MathContext)

```java
public BigDecimal(BigInteger val, MathContext mc)
```

Translates a `BigInteger` into a `BigDecimal`
rounding according to the context settings.  The scale of the
`BigDecimal` is zero.

Parameters:

- `val`: `BigInteger` value to be converted to `BigDecimal`.
- `mc`: the context to use.

**Since:** 1.5

## BigDecimal.BigDecimal(BigInteger, int)

```java
public BigDecimal(BigInteger unscaledVal, int scale)
```

Translates a `BigInteger` unscaled value and an
`int` scale into a `BigDecimal`.  The value of
the `BigDecimal` is
`(unscaledVal &times; 10-scale)`.

Parameters:

- `unscaledVal`: unscaled value of the `BigDecimal`.
- `scale`: scale of the `BigDecimal`.

## BigDecimal.BigDecimal(BigInteger, int, MathContext)

```java
public BigDecimal(BigInteger unscaledVal, int scale, MathContext mc)
```

Translates a `BigInteger` unscaled value and an
`int` scale into a `BigDecimal`, with rounding
according to the context settings.  The value of the
`BigDecimal` is `(unscaledVal &times;
10-scale)`, rounded according to the
`precision` and rounding mode settings.

Parameters:

- `unscaledVal`: unscaled value of the `BigDecimal`.
- `scale`: scale of the `BigDecimal`.
- `mc`: the context to use.

**Since:** 1.5

## BigDecimal.BigDecimal(int)

```java
public BigDecimal(int val)
```

Translates an `int` into a `BigDecimal`.  The
scale of the `BigDecimal` is zero.

Parameters:

- `val`: `int` value to be converted to `BigDecimal`.

**Since:** 1.5

## BigDecimal.BigDecimal(int, MathContext)

```java
public BigDecimal(int val, MathContext mc)
```

Translates an `int` into a `BigDecimal`, with
rounding according to the context settings.  The scale of the
`BigDecimal`, before any rounding, is zero.

Parameters:

- `val`: `int` value to be converted to `BigDecimal`.
- `mc`: the context to use.

**Since:** 1.5

## BigDecimal.BigDecimal(long)

```java
public BigDecimal(long val)
```

Translates a `long` into a `BigDecimal`.  The
scale of the `BigDecimal` is zero.

Parameters:

- `val`: `long` value to be converted to `BigDecimal`.

**Since:** 1.5

## BigDecimal.BigDecimal(long, MathContext)

```java
public BigDecimal(long val, MathContext mc)
```

Translates a `long` into a `BigDecimal`, with
rounding according to the context settings.  The scale of the
`BigDecimal`, before any rounding, is zero.

Parameters:

- `val`: `long` value to be converted to `BigDecimal`.
- `mc`: the context to use.

**Since:** 1.5

## BigDecimal.valueOf(long, int)

```java
public static BigDecimal valueOf(long unscaledVal, int scale)
```

Translates a `long` unscaled value and an
`int` scale into a `BigDecimal`.

Parameters:

- `unscaledVal`: unscaled value of the `BigDecimal`.
- `scale`: scale of the `BigDecimal`.

**API note:** This static factory method is provided in preference
to a (`long`, `int`) constructor because it allows
for reuse of frequently used `BigDecimal` values.

**Returns:** a `BigDecimal` whose value is
        `(unscaledVal &times; 10-scale)`.

## BigDecimal.valueOf(long)

```java
public static BigDecimal valueOf(long val)
```

Translates a `long` value into a `BigDecimal`
with a scale of zero.

Parameters:

- `val`: value of the `BigDecimal`.

**API note:** This static factory method is provided in preference
to a (`long`) constructor because it allows for reuse of
frequently used `BigDecimal` values.

**Returns:** a `BigDecimal` whose value is `val`.

## BigDecimal.valueOf(double)

```java
public static BigDecimal valueOf(double val)
```

Translates a `double` into a `BigDecimal`, using
the `double`'s canonical string representation provided
by the `Double.toString(double)` method.

Parameters:

- `val`: `double` to convert to a `BigDecimal`.

**API note:** This is generally the preferred way to convert a
`double` (or `float`) into a `BigDecimal`, as
the value returned is equal to that resulting from constructing
a `BigDecimal` from the result of using `Double.toString(double)`.

**Returns:** a `BigDecimal` whose value is equal to or approximately
        equal to the value of `val`.

**Since:** 1.5

Throws:

- `NumberFormatException`: if `val` is infinite or NaN.

## BigDecimal.add(BigDecimal)

```java
public BigDecimal add(BigDecimal augend)
```

Returns a `BigDecimal` whose value is `(this + augend)`, and whose scale is `max(this.scale(), augend.scale())`.

Parameters:

- `augend`: value to be added to this `BigDecimal`.

**Returns:** `this + augend`

## BigDecimal.add(BigDecimal, MathContext)

```java
public BigDecimal add(BigDecimal augend, MathContext mc)
```

Returns a `BigDecimal` whose value is `(this + augend)`,
with rounding according to the context settings.

If either number is zero and the precision setting is nonzero then
the other number, rounded if necessary, is used as the result.

Parameters:

- `augend`: value to be added to this `BigDecimal`.
- `mc`: the context to use.

**Returns:** `this + augend`, rounded as necessary.

**Since:** 1.5

## BigDecimal.subtract(BigDecimal)

```java
public BigDecimal subtract(BigDecimal subtrahend)
```

Returns a `BigDecimal` whose value is `(this - subtrahend)`, and whose scale is `max(this.scale(), subtrahend.scale())`.

Parameters:

- `subtrahend`: value to be subtracted from this `BigDecimal`.

**Returns:** `this - subtrahend`

## BigDecimal.subtract(BigDecimal, MathContext)

```java
public BigDecimal subtract(BigDecimal subtrahend, MathContext mc)
```

Returns a `BigDecimal` whose value is `(this - subtrahend)`,
with rounding according to the context settings.

If `subtrahend` is zero then this, rounded if necessary, is used as the
result.  If this is zero then the result is `subtrahend.negate(mc)`.

Parameters:

- `subtrahend`: value to be subtracted from this `BigDecimal`.
- `mc`: the context to use.

**Returns:** `this - subtrahend`, rounded as necessary.

**Since:** 1.5

## BigDecimal.multiply(BigDecimal)

```java
public BigDecimal multiply(BigDecimal multiplicand)
```

Returns a `BigDecimal` whose value is `(this &times;
multiplicand)`, and whose scale is `(this.scale() + multiplicand.scale())`.

Parameters:

- `multiplicand`: value to be multiplied by this `BigDecimal`.

**Returns:** `this * multiplicand`
