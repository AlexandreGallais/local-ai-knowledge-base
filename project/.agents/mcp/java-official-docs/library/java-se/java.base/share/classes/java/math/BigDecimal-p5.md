---
title: "BigDecimal class (java.math) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigDecimal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigDecimal class (java.math) (part 5 of 6)

## BigDecimal.equals(Object)

```java
public boolean equals(Object x)
```

Compares this `BigDecimal` with the specified `Object` for equality.  Unlike compareTo, this method considers two `BigDecimal`
objects equal only if they are equal in value and
scale. Therefore 2.0 is not equal to 2.00 when compared by this
method since the former has [`BigInteger`, `scale`]
components equal to [20, 1] while the latter has components
equal to [200, 2].

Parameters:

- `x`: `Object` to which this `BigDecimal` is to be compared.

**API note:** One example that shows how 2.0 and 2.00 are *not*
substitutable for each other under some arithmetic operations
are the two expressions:

`new BigDecimal("2.0" ).divide(BigDecimal.valueOf(3), HALF_UP)` which evaluates to 0.7 and

`new BigDecimal("2.00").divide(BigDecimal.valueOf(3), HALF_UP)` which evaluates to 0.67.
The behavior of this method is analogous to checking the
representation equivalence
of `double` values.

**Returns:** `true` if and only if the specified `Object` is a
        `BigDecimal` whose value and scale are equal to this
        `BigDecimal`'s.

**See also:** #compareTo(java.math.BigDecimal)

**See also:** #hashCode

## BigDecimal.min(BigDecimal)

```java
public BigDecimal min(BigDecimal val)
```

Returns the minimum of this `BigDecimal` and
`val`.

Parameters:

- `val`: value with which the minimum is to be computed.

**Returns:** the `BigDecimal` whose value is the lesser of this
        `BigDecimal` and `val`.  If they are equal,
        as defined by the compareTo
        method, `this` is returned.

**See also:** #compareTo(java.math.BigDecimal)

## BigDecimal.max(BigDecimal)

```java
public BigDecimal max(BigDecimal val)
```

Returns the maximum of this `BigDecimal` and `val`.

Parameters:

- `val`: value with which the maximum is to be computed.

**Returns:** the `BigDecimal` whose value is the greater of this
        `BigDecimal` and `val`.  If they are equal,
        as defined by the compareTo
        method, `this` is returned.

**See also:** #compareTo(java.math.BigDecimal)

## BigDecimal.hashCode()

```java
public int hashCode()
```

Returns the hash code for this `BigDecimal`.
The hash code is computed as a function of the unscaled value and the scale of this `BigDecimal`.

**API note:** Two `BigDecimal` objects that are numerically equal but
differ in scale (like 2.0 and 2.00) will generally *not*
have the same hash code.

**Returns:** hash code for this `BigDecimal`.

**See also:** #equals(Object)

## BigDecimal.toString()

```java
public String toString()
```

Returns the string representation of this `BigDecimal`,
using scientific notation if an exponent is needed.

A standard canonical string form of the `BigDecimal`
is created as though by the following steps: first, the
absolute value of the unscaled value of the `BigDecimal`
is converted to a string in base ten using the characters
`'0'` through `'9'` with no leading zeros (except
if its value is zero, in which case a single `'0'`
character is used).

Next, an *adjusted exponent* is calculated; this is the
negated scale, plus the number of characters in the converted
unscaled value, less one.  That is,
`-scale+(ulength-1)`, where `ulength` is the
length of the absolute value of the unscaled value in decimal
digits (its *precision*).

If the scale is greater than or equal to zero and the
adjusted exponent is greater than or equal to `-6`, the
number will be converted to a character form without using
exponential notation.  In this case, if the scale is zero then
no decimal point is added and if the scale is positive a
decimal point will be inserted with the scale specifying the
number of characters to the right of the decimal point.
`'0'` characters are added to the left of the converted
unscaled value as necessary.  If no character precedes the
decimal point after this insertion then a conventional
`'0'` character is prefixed.

Otherwise (that is, if the scale is negative, or the
adjusted exponent is less than `-6`), the number will be
converted to a character form using exponential notation.  In
this case, if the converted `BigInteger` has more than
one digit a decimal point is inserted after the first digit.
An exponent in character form is then suffixed to the converted
unscaled value (perhaps with inserted decimal point); this
comprises the letter `'E'` followed immediately by the
adjusted exponent converted to a character form.  The latter is
in base ten, using the characters `'0'` through
`'9'` with no leading zeros, and is always prefixed by a
sign character `'-'` (`'\u002D'`) if the
adjusted exponent is negative, `'+'`
(`'\u002B'`) otherwise).

Finally, the entire string is prefixed by a minus sign
character `'-'` (`'\u002D'`) if the unscaled
value is less than zero.  No sign character is prefixed if the
unscaled value is zero or positive.

**Examples:**

For each representation [*unscaled value*, *scale*]
on the left, the resulting string is shown on the right.

```java
[123,0]      "123"
[-123,0]     "-123"
[123,-1]     "1.23E+3"
[123,-3]     "1.23E+5"
[123,1]      "12.3"
[123,5]      "0.00123"
[123,10]     "1.23E-8"
[-123,12]    "-1.23E-10"
```

**Notes:**

- There is a one-to-one mapping between the distinguishable
`BigDecimal` values and the result of this conversion.
That is, every distinguishable `BigDecimal` value
(unscaled value and scale) has a unique string representation
as a result of using `toString`.  If that string
representation is converted back to a `BigDecimal` using
the `BigDecimal(String)` constructor, then the original
value will be recovered.

- The string produced for a given number is always the same;
it is not affected by locale.  This means that it can be used
as a canonical string representation for exchanging decimal
data, or as a key for a Hashtable, etc.  Locale-sensitive
number formatting and parsing is handled by the `java.text.NumberFormat` class and its subclasses.

- The `toEngineeringString` method may be used for
presenting numbers with exponents in engineering notation, and the
setScale method may be used for
rounding a `BigDecimal` so it has a known number of digits after
the decimal point.

- The digit-to-character mapping provided by
`Character.forDigit` is used.

**Returns:** string representation of this `BigDecimal`.

**See also:** Character#forDigit

**See also:** #BigDecimal(java.lang.String)

## BigDecimal.toEngineeringString()

```java
public String toEngineeringString()
```

Returns a string representation of this `BigDecimal`,
using engineering notation if an exponent is needed.

Returns a string that represents the `BigDecimal` as
described in the `toString()` method, except that if
exponential notation is used, the power of ten is adjusted to
be a multiple of three (engineering notation) such that the
integer part of nonzero values will be in the range 1 through
999.  If exponential notation is used for zero values, a
decimal point and one or two fractional zero digits are used so
that the scale of the zero value is preserved.  Note that
unlike the output of `toString()`, the output of this
method is *not* guaranteed to recover the same [integer,
scale] pair of this `BigDecimal` if the output string is
converting back to a `BigDecimal` using the string constructor.  The result of this method meets
the weaker constraint of always producing a numerically equal
result from applying the string constructor to the method's output.

**Returns:** string representation of this `BigDecimal`, using
        engineering notation if an exponent is needed.

**Since:** 1.5

## BigDecimal.toPlainString()

```java
public String toPlainString()
```

Returns a string representation of this `BigDecimal`
without an exponent field.  For values with a positive scale,
the number of digits to the right of the decimal point is used
to indicate scale.  For values with a zero or negative scale,
the resulting string is generated as if the value were
converted to a numerically equal value with zero scale and as
if all the trailing zeros of the zero scale value were present
in the result.

The entire string is prefixed by a minus sign character '-'
(`'\u002D'`) if the unscaled value is less than
zero. No sign character is prefixed if the unscaled value is
zero or positive.

Note that if the result of this method is passed to the
string constructor, only the
numerical value of this `BigDecimal` will necessarily be
recovered; the representation of the new `BigDecimal`
may have a different scale.  In particular, if this
`BigDecimal` has a negative scale, the string resulting
from this method will have a scale of zero when processed by
the string constructor.

(This method behaves analogously to the `toString`
method in 1.4 and earlier releases.)

**Returns:** a string representation of this `BigDecimal`
without an exponent field.

**Since:** 1.5

**See also:** #toString()

**See also:** #toEngineeringString()

## BigDecimal.toBigInteger()

```java
public BigInteger toBigInteger()
```

Converts this `BigDecimal` to a `BigInteger`.
This conversion is analogous to the
*narrowing primitive conversion* from `double` to
`long` as defined in
*The Java Language Specification*:
any fractional part of this
`BigDecimal` will be discarded.  Note that this
conversion can lose information about the precision of the
`BigDecimal` value.

To have an exception thrown if the conversion is inexact (in
other words if a nonzero fractional part is discarded), use the
`toBigIntegerExact()` method.

**Returns:** this `BigDecimal` converted to a `BigInteger`.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## BigDecimal.toBigIntegerExact()

```java
public BigInteger toBigIntegerExact()
```

Converts this `BigDecimal` to a `BigInteger`,
checking for lost information.  An exception is thrown if this
`BigDecimal` has a nonzero fractional part.

**Returns:** this `BigDecimal` converted to a `BigInteger`.

**Since:** 1.5

Throws:

- `ArithmeticException`: if `this` has a nonzero fractional part.

## BigDecimal.longValue()

```java
public long longValue()
```

Converts this `BigDecimal` to a `long`.
This conversion is analogous to the
*narrowing primitive conversion* from `double` to
`short` as defined in
*The Java Language Specification*:
any fractional part of this
`BigDecimal` will be discarded, and if the resulting
"`BigInteger`" is too big to fit in a
`long`, only the low-order 64 bits are returned.
Note that this conversion can lose information about the
overall magnitude and precision of this `BigDecimal` value as well
as return a result with the opposite sign.

**Returns:** this `BigDecimal` converted to a `long`.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## BigDecimal.longValueExact()

```java
public long longValueExact()
```

Converts this `BigDecimal` to a `long`, checking
for lost information.  If this `BigDecimal` has a
nonzero fractional part or is out of the possible range for a
`long` result then an `ArithmeticException` is
thrown.

**Returns:** this `BigDecimal` converted to a `long`.

**Since:** 1.5

Throws:

- `ArithmeticException`: if `this` has a nonzero fractional part, or will not fit in a `long`.

## BigDecimal.intValue()

```java
public int intValue()
```

Converts this `BigDecimal` to an `int`.
This conversion is analogous to the
*narrowing primitive conversion* from `double` to
`short` as defined in
*The Java Language Specification*:
any fractional part of this
`BigDecimal` will be discarded, and if the resulting
"`BigInteger`" is too big to fit in an
`int`, only the low-order 32 bits are returned.
Note that this conversion can lose information about the
overall magnitude and precision of this `BigDecimal`
value as well as return a result with the opposite sign.

**Returns:** this `BigDecimal` converted to an `int`.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## BigDecimal.intValueExact()

```java
public int intValueExact()
```

Converts this `BigDecimal` to an `int`, checking
for lost information.  If this `BigDecimal` has a
nonzero fractional part or is out of the possible range for an
`int` result then an `ArithmeticException` is
thrown.

**Returns:** this `BigDecimal` converted to an `int`.

**Since:** 1.5

Throws:

- `ArithmeticException`: if `this` has a nonzero fractional part, or will not fit in an `int`.

## BigDecimal.shortValueExact()

```java
public short shortValueExact()
```

Converts this `BigDecimal` to a `short`, checking
for lost information.  If this `BigDecimal` has a
nonzero fractional part or is out of the possible range for a
`short` result then an `ArithmeticException` is
thrown.

**Returns:** this `BigDecimal` converted to a `short`.

**Since:** 1.5

Throws:

- `ArithmeticException`: if `this` has a nonzero fractional part, or will not fit in a `short`.

## BigDecimal.byteValueExact()

```java
public byte byteValueExact()
```

Converts this `BigDecimal` to a `byte`, checking
for lost information.  If this `BigDecimal` has a
nonzero fractional part or is out of the possible range for a
`byte` result then an `ArithmeticException` is
thrown.

**Returns:** this `BigDecimal` converted to a `byte`.

**Since:** 1.5

Throws:

- `ArithmeticException`: if `this` has a nonzero fractional part, or will not fit in a `byte`.

## BigDecimal.floatValue()

```java
public float floatValue()
```

Converts this `BigDecimal` to a `float`.
This conversion is similar to the
*narrowing primitive conversion* from `double` to
`float` as defined in
*The Java Language Specification*:
if this `BigDecimal` has too great a
magnitude to represent as a `float`, it will be
converted to `Float.NEGATIVE_INFINITY` or `Float.POSITIVE_INFINITY` as appropriate.  Note that even when
the return value is finite, this conversion can lose
information about the precision of the `BigDecimal`
value.

**Returns:** this `BigDecimal` converted to a `float`.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## BigDecimal.doubleValue()

```java
public double doubleValue()
```

Converts this `BigDecimal` to a `double`.
This conversion is similar to the
*narrowing primitive conversion* from `double` to
`float` as defined in
*The Java Language Specification*:
if this `BigDecimal` has too great a
magnitude represent as a `double`, it will be
converted to `Double.NEGATIVE_INFINITY` or `Double.POSITIVE_INFINITY` as appropriate.  Note that even when
the return value is finite, this conversion can lose
information about the precision of the `BigDecimal`
value.

**Returns:** this `BigDecimal` converted to a `double`.

**JLS:** 5.1.3 Narrowing Primitive Conversion
