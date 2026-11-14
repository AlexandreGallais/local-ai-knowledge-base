---
title: "Math class (java.lang) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Math.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Math class (java.lang) (part 4 of 6)

## Math.ceilDiv(int, int)

```java
public static int ceilDiv(int x, int y)
```

Returns the smallest (closest to negative infinity)
`int` value that is greater than or equal to the algebraic quotient.
There is one special case: if the dividend is
Integer.MIN_VALUE and the divisor is `-1`,
then integer overflow occurs and
the result is equal to `Integer.MIN_VALUE`.

Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
positive infinity (ceiling) rounding mode.
The ceiling rounding mode gives different results from truncation
when the exact quotient is not an integer and is positive.

- If the signs of the arguments are different, the results of
      `ceilDiv` and the `/` operator are the same.

      For example, `ceilDiv(-4, 3) == -1` and `(-4 / 3) == -1`.

- If the signs of the arguments are the same, `ceilDiv`
      returns the smallest integer greater than or equal to the quotient
      while the `/` operator returns the largest integer less
      than or equal to the quotient.
      They differ if and only if the quotient is not an integer.

      For example, `ceilDiv(4, 3) == 2`,
      whereas `(4 / 3) == 1`.

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the smallest (closest to negative infinity)
`int` value that is greater than or equal to the algebraic quotient.

**See also:** #ceilMod(int, int)

**See also:** #ceil(double)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.ceilDiv(long, int)

```java
public static long ceilDiv(long x, int y)
```

Returns the smallest (closest to negative infinity)
`long` value that is greater than or equal to the algebraic quotient.
There is one special case: if the dividend is
Long.MIN_VALUE and the divisor is `-1`,
then integer overflow occurs and
the result is equal to `Long.MIN_VALUE`.

Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
positive infinity (ceiling) rounding mode.
The ceiling rounding mode gives different results from truncation
when the exact result is not an integer and is positive.

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the smallest (closest to negative infinity)
`long` value that is greater than or equal to the algebraic quotient.

**See also:** #ceilMod(int, int)

**See also:** #ceil(double)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.ceilDiv(long, long)

```java
public static long ceilDiv(long x, long y)
```

Returns the smallest (closest to negative infinity)
`long` value that is greater than or equal to the algebraic quotient.
There is one special case: if the dividend is
Long.MIN_VALUE and the divisor is `-1`,
then integer overflow occurs and
the result is equal to `Long.MIN_VALUE`.

Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
positive infinity (ceiling) rounding mode.
The ceiling rounding mode gives different results from truncation
when the exact result is not an integer and is positive.

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the smallest (closest to negative infinity)
`long` value that is greater than or equal to the algebraic quotient.

**See also:** #ceilMod(int, int)

**See also:** #ceil(double)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.ceilMod(int, int)

```java
public static int ceilMod(int x, int y)
```

Returns the ceiling modulus of the `int` arguments.

The ceiling modulus is `r = x - (ceilDiv(x, y) * y)`,
has the opposite sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `ceilDiv` and `ceilMod` is such that:

- `ceilDiv(x, y) * y + ceilMod(x, y) == x`

The difference in values between `ceilMod` and the `%` operator
is due to the difference between `ceilDiv` and the `/`
operator, as detailed in int).

Examples:

- Regardless of the signs of the arguments, `ceilMod`(x, y)
      is zero exactly when `x % y` is zero as well.

- If neither `ceilMod`(x, y) nor `x % y` is zero,
      they differ exactly when the signs of the arguments are the same.

- `ceilMod(+4, +3) == -2`;   and `(+4 % +3) == +1`

- `ceilMod(-4, -3) == +2`;   and `(-4 % -3) == -1`

- `ceilMod(+4, -3) == +1`;   and `(+4 % -3) == +1`

- `ceilMod(-4, +3) == -1`;   and `(-4 % +3) == -1`

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the ceiling modulus `x - (ceilDiv(x, y) * y)`

**See also:** #ceilDiv(int, int)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.ceilMod(long, int)

```java
public static int ceilMod(long x, int y)
```

Returns the ceiling modulus of the `long` and `int` arguments.

The ceiling modulus is `r = x - (ceilDiv(x, y) * y)`,
has the opposite sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `ceilDiv` and `ceilMod` is such that:

- `ceilDiv(x, y) * y + ceilMod(x, y) == x`

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the ceiling modulus `x - (ceilDiv(x, y) * y)`

**See also:** #ceilDiv(long, int)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.ceilMod(long, long)

```java
public static long ceilMod(long x, long y)
```

Returns the ceiling modulus of the `long` arguments.

The ceiling modulus is `r = x - (ceilDiv(x, y) * y)`,
has the opposite sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `ceilDiv` and `ceilMod` is such that:

- `ceilDiv(x, y) * y + ceilMod(x, y) == x`

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the ceiling modulus `x - (ceilDiv(x, y) * y)`

**See also:** #ceilDiv(long, long)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.abs(int)

```java
public static int abs(int a)
```

Returns the absolute value of an `int` value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.

Note that if the argument is equal to the value of `Integer.MIN_VALUE`, the most negative representable `int`
value, the result is that same value, which is negative. In
contrast, the `Math.absExact(int)` method throws an
`ArithmeticException` for this value.

Parameters:

- `a`: the argument whose absolute value is to be determined

**Returns:** the absolute value of the argument.

**See also:** Math#absExact(int)

## Math.absExact(int)

```java
public static int absExact(int a)
```

Returns the mathematical absolute value of an `int` value
if it is exactly representable as an `int`, throwing
`ArithmeticException` if the result overflows the
positive `int` range.

Since the range of two's complement integers is asymmetric
with one additional negative value (JLS ), the
mathematical absolute value of `Integer.MIN_VALUE`
overflows the positive `int` range, so an exception is
thrown for that argument.

Parameters:

- `a`: the argument whose absolute value is to be determined

**Returns:** the absolute value of the argument, unless overflow occurs

**See also:** Math#abs(int)

**Since:** 15

Throws:

- `ArithmeticException`: if the argument is `Integer.MIN_VALUE`

## Math.abs(long)

```java
public static long abs(long a)
```

Returns the absolute value of a `long` value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.

Note that if the argument is equal to the value of `Long.MIN_VALUE`, the most negative representable `long`
value, the result is that same value, which is negative. In
contrast, the `Math.absExact(long)` method throws an
`ArithmeticException` for this value.

Parameters:

- `a`: the argument whose absolute value is to be determined

**Returns:** the absolute value of the argument.

**See also:** Math#absExact(long)

## Math.absExact(long)

```java
public static long absExact(long a)
```

Returns the mathematical absolute value of an `long` value
if it is exactly representable as an `long`, throwing
`ArithmeticException` if the result overflows the
positive `long` range.

Since the range of two's complement integers is asymmetric
with one additional negative value (JLS ), the
mathematical absolute value of `Long.MIN_VALUE` overflows
the positive `long` range, so an exception is thrown for
that argument.

Parameters:

- `a`: the argument whose absolute value is to be determined

**Returns:** the absolute value of the argument, unless overflow occurs

**See also:** Math#abs(long)

**Since:** 15

Throws:

- `ArithmeticException`: if the argument is `Long.MIN_VALUE`

## Math.abs(float)

```java
public static float abs(float a)
```

Returns the absolute value of a `float` value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.
Special cases:

- If the argument is positive zero or negative zero, the
result is positive zero.

- If the argument is infinite, the result is positive infinity.

- If the argument is NaN, the result is NaN.

Parameters:

- `a`: the argument whose absolute value is to be determined

**API note:** As implied by the above, one valid implementation of
this method is given by the expression below which computes a
`float` with the same exponent and significand as the
argument but with a guaranteed zero sign bit indicating a
positive value:

`Float.intBitsToFloat(0x7fffffff & Float.floatToRawIntBits(a))`

**Returns:** the absolute value of the argument.

## Math.abs(double)

```java
public static double abs(double a)
```

Returns the absolute value of a `double` value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.
Special cases:

- If the argument is positive zero or negative zero, the result
is positive zero.

- If the argument is infinite, the result is positive infinity.

- If the argument is NaN, the result is NaN.

Parameters:

- `a`: the argument whose absolute value is to be determined

**API note:** As implied by the above, one valid implementation of
this method is given by the expression below which computes a
`double` with the same exponent and significand as the
argument but with a guaranteed zero sign bit indicating a
positive value:

`Double.longBitsToDouble((Double.doubleToRawLongBits(a)<<1)>>>1)`

**Returns:** the absolute value of the argument.

## Math.max(int, int)

```java
public static int max(int a, int b)
```

Returns the greater of two `int` values. That is, the
result is the argument closer to the value of
`Integer.MAX_VALUE`. If the arguments have the same value,
the result is that same value.

Parameters:

- `a`: an argument.
- `b`: another argument.

**Returns:** the larger of `a` and `b`.

## Math.max(long, long)

```java
public static long max(long a, long b)
```

Returns the greater of two `long` values. That is, the
result is the argument closer to the value of
`Long.MAX_VALUE`. If the arguments have the same value,
the result is that same value.

Parameters:

- `a`: an argument.
- `b`: another argument.

**Returns:** the larger of `a` and `b`.

## Math.max(float, float)

```java
public static float max(float a, float b)
```

Returns the greater of two `float` values.  That is,
the result is the argument closer to positive infinity. If the
arguments have the same value, the result is that same
value. If either value is NaN, then the result is NaN.  Unlike
the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero. If one
argument is positive zero and the other negative zero, the
result is positive zero.

Parameters:

- `a`: an argument.
- `b`: another argument.

**API note:** This method corresponds to the maximum operation defined in
IEEE 754.

**Returns:** the larger of `a` and `b`.

## Math.max(double, double)

```java
public static double max(double a, double b)
```

Returns the greater of two `double` values.  That
is, the result is the argument closer to positive infinity. If
the arguments have the same value, the result is that same
value. If either value is NaN, then the result is NaN.  Unlike
the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero. If one
argument is positive zero and the other negative zero, the
result is positive zero.

Parameters:

- `a`: an argument.
- `b`: another argument.

**API note:** This method corresponds to the maximum operation defined in
IEEE 754.

**Returns:** the larger of `a` and `b`.

## Math.min(int, int)

```java
public static int min(int a, int b)
```

Returns the smaller of two `int` values. That is,
the result the argument closer to the value of
`Integer.MIN_VALUE`.  If the arguments have the same
value, the result is that same value.

Parameters:

- `a`: an argument.
- `b`: another argument.

**Returns:** the smaller of `a` and `b`.

## Math.min(long, long)

```java
public static long min(long a, long b)
```

Returns the smaller of two `long` values. That is,
the result is the argument closer to the value of
`Long.MIN_VALUE`. If the arguments have the same
value, the result is that same value.

Parameters:

- `a`: an argument.
- `b`: another argument.

**Returns:** the smaller of `a` and `b`.

## Math.min(float, float)

```java
public static float min(float a, float b)
```

Returns the smaller of two `float` values.  That is,
the result is the value closer to negative infinity. If the
arguments have the same value, the result is that same
value. If either value is NaN, then the result is NaN.  Unlike
the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero.  If
one argument is positive zero and the other is negative zero,
the result is negative zero.

Parameters:

- `a`: an argument.
- `b`: another argument.

**API note:** This method corresponds to the minimum operation defined in
IEEE 754.

**Returns:** the smaller of `a` and `b`.
