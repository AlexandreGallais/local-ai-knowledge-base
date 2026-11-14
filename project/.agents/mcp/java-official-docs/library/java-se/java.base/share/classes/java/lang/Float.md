---
title: "Float class (java.lang) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Float.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Float class (java.lang)

```java
public final class Float extends Number implements Comparable<Float>, Constable, ConstantDesc
```

The `Float` class is the wrapper class for values of the primitive
type `float`. An object of type `Float` contains a
single field whose type is `float`.

In addition, this class provides several methods for converting a
`float` to a `String` and a
`String` to a `float`, as well as other
constants and methods useful when dealing with a
`float`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

#### Floating-point Equality, Equivalence,
and Comparison

The class `java.lang.Double` has a discussion of equality, equivalence, and comparison of floating-point values that is
equally applicable to `float` values.

#### Decimal &harr; Binary Conversion Issues

The discussion of binary to decimal conversion issues in `java.lang.Double` is also
applicable to `float` values.

**Since:** 1.0

## Float.POSITIVE_INFINITY

```java
public static final float POSITIVE_INFINITY
```

A constant holding the positive infinity of type
`float`. It is equal to the value returned by
`Float.intBitsToFloat(0x7f800000)`.

## Float.NEGATIVE_INFINITY

```java
public static final float NEGATIVE_INFINITY
```

A constant holding the negative infinity of type
`float`. It is equal to the value returned by
`Float.intBitsToFloat(0xff800000)`.

## Float.NaN

```java
public static final float NaN
```

A constant holding a Not-a-Number (NaN) value of type `float`.
It is equivalent
to the value returned by`Float.intBitsToFloat(0x7fc00000)`.

## Float.MAX_VALUE

```java
public static final float MAX_VALUE
```

A constant holding the largest positive finite value of type
`float`, (2-2-23)&middot;2127.
It is equal to the hexadecimal floating-point literal
`0x1.fffffeP+127f` and also equal to
`Float.intBitsToFloat(0x7f7fffff)`.

## Float.MIN_NORMAL

```java
public static final float MIN_NORMAL
```

A constant holding the smallest positive normal value of type
`float`, 2-126.  It is equal to the
hexadecimal floating-point literal `0x1.0p-126f` and also
equal to `Float.intBitsToFloat(0x00800000)`.

**Since:** 1.6

## Float.MIN_VALUE

```java
public static final float MIN_VALUE
```

A constant holding the smallest positive nonzero value of type
`float`, 2-149. It is equal to the
hexadecimal floating-point literal `0x0.000002P-126f`
and also equal to `Float.intBitsToFloat(0x1)`.

## Float.SIZE

```java
public static final int SIZE
```

The number of bits used to represent a `float` value,
``.

**Since:** 1.5

## Float.PRECISION

```java
public static final int PRECISION
```

The number of bits in the significand of a `float` value,
``.  This is the parameter N in section  of
*The Java Language Specification*.

**Since:** 19

## Float.MAX_EXPONENT

```java
public static final int MAX_EXPONENT
```

Maximum exponent a finite `float` variable may have,
``.  It is equal to the value returned by `Math.getExponent(Float.MAX_VALUE)`.

**Since:** 1.6

## Float.MIN_EXPONENT

```java
public static final int MIN_EXPONENT
```

Minimum exponent a normalized `float` variable may have,
``.  It is equal to the value returned by `Math.getExponent(Float.MIN_NORMAL)`.

**Since:** 1.6

## Float.BYTES

```java
public static final int BYTES
```

The number of bytes used to represent a `float` value,
``.

**Since:** 1.8

## Float.TYPE

```java
public static final Class<Float> TYPE
```

The `Class` instance representing the primitive type
`float`.

**Since:** 1.1

## Float.toString(float)

```java
public static String toString(float f)
```

Returns a string representation of the `float`
argument. All characters mentioned below are ASCII characters.

- If the argument is NaN, the result is the string
"`NaN`".

- Otherwise, the result is a string that represents the sign and
    magnitude (absolute value) of the argument. If the sign is
    negative, the first character of the result is
    '`-`' (`'\u005Cu002D'`); if the sign is
    positive, no sign character appears in the result. As for
    the magnitude *m*:

- If *m* is infinity, it is represented by the characters
    `"Infinity"`; thus, positive infinity produces
    the result `"Infinity"` and negative infinity
    produces the result `"-Infinity"`.

- If *m* is zero, it is represented by the characters
    `"0.0"`; thus, negative zero produces the result
    `"-0.0"` and positive zero produces the result
    `"0.0"`.

-  Otherwise *m* is positive and finite.
It is converted to a string in two stages:

-  *Selection of a decimal*:
A well-defined decimal *d**m*
is selected to represent *m*.
This decimal is (almost always) the *shortest* one that
rounds to *m* according to the round to nearest
rounding policy of IEEE 754 floating-point arithmetic.

-  *Formatting as a string*:
The decimal *d**m* is formatted as a string,
either in plain or in computerized scientific notation,
depending on its value.

A *decimal* is a number of the form
*s*&times;10*i*
for some (unique) integers *s* > 0 and *i* such that
*s* is not a multiple of 10.
These integers are the *significand* and
the *exponent*, respectively, of the decimal.
The *length* of the decimal is the (unique)
positive integer *n* meeting
10*n*-1 &le; *s* < 10*n*.

The decimal *d**m* for a finite positive *m*
is defined as follows:

- Let *R* be the set of all decimals that round to *m*
according to the usual *round to nearest* rounding policy of
IEEE 754 floating-point arithmetic.

- Let *p* be the minimal length over all decimals in *R*.

- When *p* &ge; 2, let *T* be the set of all decimals
in *R* with length *p*.
Otherwise, let *T* be the set of all decimals
in *R* with length 1 or 2.

- Define *d**m* as the decimal in *T*
that is closest to *m*.
Or if there are two such decimals in *T*,
select the one with the even significand.

The (uniquely) selected decimal *d**m*
is then formatted.
Let *s*, *i* and *n* be the significand, exponent and
length of *d**m*, respectively.
Further, let *e* = *n* + *i* - 1 and let
*s*1…*s**n*
be the usual decimal expansion of *s*.
Note that *s*1 &ne; 0
and *s**n* &ne; 0.
Below, the decimal point `'.'` is `'\u005Cu002E'`
and the exponent indicator `'E'` is `'\u005Cu0045'`.

- Case -3 &le; *e* < 0:
*d**m* is formatted as
`0.0`…`0`*s*1…*s**n*,
where there are exactly -(*n* + *i*) zeroes between
the decimal point and *s*1.
For example, 123 &times; 10-4 is formatted as
`0.0123`.

- Case 0 &le; *e* < 7:

- Subcase *i* &ge; 0:
*d**m* is formatted as
*s*1…*s**n*`0`…`0.0`,
where there are exactly *i* zeroes
between *s**n* and the decimal point.
For example, 123 &times; 102 is formatted as
`12300.0`.

- Subcase *i* < 0:
*d**m* is formatted as
*s*1…*s**n*+*i*`.`*s**n*+*i*+1…*s**n*,
where there are exactly -*i* digits to the right of
the decimal point.
For example, 123 &times; 10-1 is formatted as
`12.3`.

- Case *e* < -3 or *e* &ge; 7:
computerized scientific notation is used to format
*d**m*.
Here *e* is formatted as by `Integer.toString(int)`.

- Subcase *n* = 1:
*d**m* is formatted as
*s*1`.0E`*e*.
For example, 1 &times; 1023 is formatted as
`1.0E23`.

- Subcase *n* > 1:
*d**m* is formatted as
*s*1`.`*s*2…*s**n*`E`*e*.
For example, 123 &times; 10-21 is formatted as
`1.23E-19`.

To create localized string representations of a floating-point
value, use subclasses of `java.text.NumberFormat`.

Parameters:

- `f`: the `float` to be converted.

**API note:** This method corresponds to the general functionality of the
convertToDecimalCharacter operation defined in IEEE 754;
however, that operation is defined in terms of specifying the
number of significand digits used in the conversion.
Code to do such a conversion in the Java platform includes
converting the `float` to a BigDecimal exactly and then rounding the `BigDecimal` to
the desired number of digits; sample code:

**Returns:** a string representation of the argument.

## Float.toHexString(float)

```java
public static String toHexString(float f)
```

Returns a hexadecimal string representation of the
`float` argument. All characters mentioned below are
ASCII characters.

- If the argument is NaN, the result is the string
    "`NaN`".

- Otherwise, the result is a string that represents the sign and
magnitude (absolute value) of the argument. If the sign is negative,
the first character of the result is '`-`'
(`'\u005Cu002D'`); if the sign is positive, no sign character
appears in the result. As for the magnitude *m*:

- If *m* is infinity, it is represented by the string
`"Infinity"`; thus, positive infinity produces the
result `"Infinity"` and negative infinity produces
the result `"-Infinity"`.

- If *m* is zero, it is represented by the string
`"0x0.0p0"`; thus, negative zero produces the result
`"-0x0.0p0"` and positive zero produces the result
`"0x0.0p0"`.

- If *m* is a `float` value with a
normalized representation, substrings are used to represent the
significand and exponent fields.  The significand is
represented by the characters `"0x1."`
followed by a lowercase hexadecimal representation of the rest
of the significand as a fraction.  Trailing zeros in the
hexadecimal representation are removed unless all the digits
are zero, in which case a single zero is used. Next, the
exponent is represented by `"p"` followed
by a decimal string of the unbiased exponent as if produced by
a call to Integer.toString on the
exponent value.

- If *m* is a `float` value with a subnormal
representation, the significand is represented by the
characters `"0x0."` followed by a
hexadecimal representation of the rest of the significand as a
fraction.  Trailing zeros in the hexadecimal representation are
removed. Next, the exponent is represented by
`"p-126"`.  Note that there must be at
least one nonzero digit in a subnormal significand.

Examples

Floating-point ValueHexadecimal String

`1.0` `0x1.0p0`
`-1.0`        `-0x1.0p0`
`2.0` `0x1.0p1`
`3.0` `0x1.8p1`
`0.5` `0x1.0p-1`
`0.25`        `0x1.0p-2`
`Float.MAX_VALUE`
    `0x1.fffffep127`
`Minimum Normal Value`
    `0x1.0p-126`
`Maximum Subnormal Value`
    `0x0.fffffep-126`
`Float.MIN_VALUE`
    `0x0.000002p-126`

Parameters:

- `f`: the `float` to be converted.

**API note:** This method corresponds to the convertToHexCharacter operation
defined in IEEE 754.

**Returns:** a hex string representation of the argument.

**Since:** 1.5

## Float.valueOf(String)

```java
public static Float valueOf(String s) throws NumberFormatException
```

Returns a `Float` object holding the
`float` value represented by the argument string
`s`.

If `s` is `null`, then a
`NullPointerException` is thrown.

Leading and trailing whitespace characters in `s`
are ignored.  Whitespace is removed as if by the `String.trim` method; that is, both ASCII space and control
characters are removed. The rest of `s` should
constitute a *FloatValue* as described by the lexical
syntax rules:

*FloatValue:*
*Signopt* `NaN`
*Signopt* `Infinity`
*Signopt FloatingPointLiteral*
*Signopt HexFloatingPointLiteral*
*SignedInteger*

*HexFloatingPointLiteral*:
 *HexSignificand BinaryExponent FloatTypeSuffixopt*

*HexSignificand:*
*HexNumeral*
*HexNumeral* `.`
`0x` *HexDigitsopt
    *`.`* HexDigits*
`0X`* HexDigitsopt
    *`.` *HexDigits*

*BinaryExponent:*
*BinaryExponentIndicator SignedInteger*

*BinaryExponentIndicator:*
`p`
`P`

where *Sign*, *FloatingPointLiteral*,
*HexNumeral*, *HexDigits*, *SignedInteger* and
*FloatTypeSuffix* are as defined in the lexical structure
sections of
*The Java Language Specification*,
except that underscores are not accepted between digits.
If `s` does not have the form of
a *FloatValue*, then a `NumberFormatException`
is thrown. Otherwise, `s` is regarded as
representing an exact decimal value in the usual
"computerized scientific notation" or as an exact
hexadecimal value; this exact numerical value is then
conceptually converted to an "infinitely precise"
binary value that is then rounded to type `float`
by the usual round-to-nearest rule of IEEE 754 floating-point
arithmetic, which includes preserving the sign of a zero
value.

Note that the round-to-nearest rule also implies overflow and
underflow behaviour; if the exact value of `s` is large
enough in magnitude (greater than or equal to (`MAX_VALUE` + ulp(MAX_VALUE)/2),
rounding to `float` will result in an infinity and if the
exact value of `s` is small enough in magnitude (less
than or equal to `MIN_VALUE`/2), rounding to float will
result in a zero.

Finally, after rounding a `Float` object representing
this `float` value is returned.

Note that trailing format specifiers, specifiers that
determine the type of a floating-point literal
(`1.0f` is a `float` value;
`1.0d` is a `double` value), do
*not* influence the results of this method.  In other
words, the numerical value of the input string is converted
directly to the target floating-point type.  In general, the
two-step sequence of conversions, string to `double`
followed by `double` to `float`, is
*not* equivalent to converting a string directly to
`float`.  For example, if first converted to an
intermediate `double` and then to
`float`, the string

`"1.00000017881393421514957253748434595763683319091796875001d"`

results in the `float` value
`1.0000002f`; if the string is converted directly to
`float`, `1.000000**1**f` results.

To avoid calling this method on an invalid string and having
a `NumberFormatException` be thrown, the documentation
for Double.valueOf lists a regular
expression which can be used to screen the input.

Parameters:

- `s`: the string to be parsed.

**API note:** To interpret localized string representations of a
floating-point value, or string representations that have
non-ASCII digits, use `java.text.NumberFormat`. For
example,

where `l` is the desired locale, or
`java.util.Locale.ROOT` if locale insensitive.

**API note:** This method corresponds to the convertFromDecimalCharacter and
convertFromHexCharacter operations defined in IEEE 754.

**Returns:** a `Float` object holding the value
         represented by the `String` argument.

**See also:** Double##decimalToBinaryConversion Decimal &harr; Binary Conversion Issues

Throws:

- `NumberFormatException`: if the string does not contain a parsable number.

## Float.valueOf(float)

```java
public static Float valueOf(float f)
```

Returns a `Float` instance representing the specified
`float` value.
If a new `Float` instance is not required, this method
should generally be used in preference to the constructor
`Float(float)`, as this method is likely to yield
significantly better space and time performance by caching
frequently requested values.

Parameters:

- `f`: a float value.

**Returns:** a `Float` instance representing `f`.

**Since:** 1.5
