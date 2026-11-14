---
title: "StrictMath class (java.lang) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StrictMath.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StrictMath class (java.lang) (part 4 of 6)

## StrictMath.ceilDiv(long, long)

```java
public static long ceilDiv(long x, long y)
```

Returns the smallest (closest to negative infinity)
`long` value that is greater than or equal to the algebraic quotient.
There is one special case: if the dividend is
Long.MIN_VALUE and the divisor is `-1`,
then integer overflow occurs and
the result is equal to `Long.MIN_VALUE`.

See int) Math.ceilDiv for examples and
a comparison to the integer division `/` operator.

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the smallest (closest to negative infinity)
`long` value that is greater than or equal to the algebraic quotient.

**See also:** Math#ceilDiv(long, long)

**See also:** Math#ceil(double)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## StrictMath.ceilMod(int, int)

```java
public static int ceilMod(int x, int y)
```

Returns the ceiling modulus of the `int` arguments.

The ceiling modulus is `r = x - (ceilDiv(x, y) * y)`,
has the opposite sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `ceilDiv` and `ceilMod` is such that:

- `ceilDiv(x, y) * y + ceilMod(x, y) == x`

See int) Math.ceilMod for examples and
a comparison to the `%` operator.

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the ceiling modulus `x - (ceilDiv(x, y) * y)`

**See also:** Math#ceilMod(int, int)

**See also:** StrictMath#ceilDiv(int, int)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## StrictMath.ceilMod(long, int)

```java
public static int ceilMod(long x, int y)
```

Returns the ceiling modulus of the `long` and `int` arguments.

The ceiling modulus is `r = x - (ceilDiv(x, y) * y)`,
has the opposite sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `ceilDiv` and `ceilMod` is such that:

- `ceilDiv(x, y) * y + ceilMod(x, y) == x`

See int) Math.ceilMod for examples and
a comparison to the `%` operator.

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the ceiling modulus `x - (ceilDiv(x, y) * y)`

**See also:** Math#ceilMod(long, int)

**See also:** StrictMath#ceilDiv(long, int)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## StrictMath.ceilMod(long, long)

```java
public static long ceilMod(long x, long y)
```

Returns the ceiling modulus of the `long` arguments.

The ceiling modulus is `r = x - (ceilDiv(x, y) * y)`,
has the opposite sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `ceilDiv` and `ceilMod` is such that:

- `ceilDiv(x, y) * y + ceilMod(x, y) == x`

See int) Math.ceilMod for examples and
a comparison to the `%` operator.

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the ceiling modulus `x - (ceilDiv(x, y) * y)`

**See also:** Math#ceilMod(long, long)

**See also:** StrictMath#ceilDiv(long, long)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## StrictMath.abs(int)

```java
public static int abs(int a)
```

Returns the absolute value of an `int` value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.

Note that if the argument is equal to the value of `Integer.MIN_VALUE`, the most negative representable `int`
value, the result is that same value, which is negative. In
contrast, the `StrictMath.absExact(int)` method throws an
`ArithmeticException` for this value.

Parameters:

- `a`: the argument whose absolute value is to be determined.

**Returns:** the absolute value of the argument.

**See also:** Math#absExact(int)

## StrictMath.absExact(int)

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

**See also:** Math#absExact(int)

**Since:** 15

Throws:

- `ArithmeticException`: if the argument is `Integer.MIN_VALUE`

## StrictMath.abs(long)

```java
public static long abs(long a)
```

Returns the absolute value of a `long` value.
If the argument is not negative, the argument is returned.
If the argument is negative, the negation of the argument is returned.

Note that if the argument is equal to the value of `Long.MIN_VALUE`, the most negative representable `long`
value, the result is that same value, which is negative. In
contrast, the `StrictMath.absExact(long)` method throws
an `ArithmeticException` for this value.

Parameters:

- `a`: the argument whose absolute value is to be determined.

**Returns:** the absolute value of the argument.

**See also:** Math#absExact(long)

## StrictMath.absExact(long)

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

**See also:** Math#absExact(long)

**Since:** 15

Throws:

- `ArithmeticException`: if the argument is `Long.MIN_VALUE`

## StrictMath.abs(float)

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

## StrictMath.abs(double)

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

## StrictMath.max(int, int)

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

## StrictMath.max(long, long)

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

## StrictMath.max(float, float)

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

**Returns:** the larger of `a` and `b`.

## StrictMath.max(double, double)

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

**Returns:** the larger of `a` and `b`.

## StrictMath.min(int, int)

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

## StrictMath.min(long, long)

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

## StrictMath.min(float, float)

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

**Returns:** the smaller of `a` and `b.`

## StrictMath.min(double, double)

```java
public static double min(double a, double b)
```

Returns the smaller of two `double` values.  That
is, the result is the value closer to negative infinity. If the
arguments have the same value, the result is that same
value. If either value is NaN, then the result is NaN.  Unlike
the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero. If one
argument is positive zero and the other is negative zero, the
result is negative zero.

Parameters:

- `a`: an argument.
- `b`: another argument.

**Returns:** the smaller of `a` and `b`.

## StrictMath.clamp(long, int, int)

```java
public static int clamp(long value, int min, int max)
```

Clamps the value to fit between min and max. If the value is less
than `min`, then `min` is returned. If the value is greater
than `max`, then `max` is returned. Otherwise, the original
value is returned.

While the original value of type long may not fit into the int type,
the bounds have the int type, so the result always fits the int type.
This allows to use method to safely cast long value to int with
saturation.

Parameters:

- `value`: value to clamp
- `min`: minimal allowed value
- `max`: maximal allowed value

**Returns:** a clamped value that fits into `min..max` interval

**Since:** 21

Throws:

- `IllegalArgumentException`: if `min > max`

## StrictMath.clamp(long, long, long)

```java
public static long clamp(long value, long min, long max)
```

Clamps the value to fit between min and max. If the value is less
than `min`, then `min` is returned. If the value is greater
than `max`, then `max` is returned. Otherwise, the original
value is returned.

Parameters:

- `value`: value to clamp
- `min`: minimal allowed value
- `max`: maximal allowed value

**Returns:** a clamped value that fits into `min..max` interval

**Since:** 21

Throws:

- `IllegalArgumentException`: if `min > max`

## StrictMath.clamp(double, double, double)

```java
public static double clamp(double value, double min, double max)
```

Clamps the value to fit between min and max. If the value is less
than `min`, then `min` is returned. If the value is greater
than `max`, then `max` is returned. Otherwise, the original
value is returned. If value is NaN, the result is also NaN.

Unlike the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero.
E.g., `clamp(-0.0, 0.0, 1.0)` returns 0.0.

Parameters:

- `value`: value to clamp
- `min`: minimal allowed value
- `max`: maximal allowed value

**Returns:** a clamped value that fits into `min..max` interval

**Since:** 21

Throws:

- `IllegalArgumentException`: if either of `min` and `max` arguments is NaN, or `min > max`, or `min` is +0.0, and `max` is -0.0.

## StrictMath.clamp(float, float, float)

```java
public static float clamp(float value, float min, float max)
```

Clamps the value to fit between min and max. If the value is less
than `min`, then `min` is returned. If the value is greater
than `max`, then `max` is returned. Otherwise, the original
value is returned. If value is NaN, the result is also NaN.

Unlike the numerical comparison operators, this method considers
negative zero to be strictly smaller than positive zero.
E.g., `clamp(-0.0f, 0.0f, 1.0f)` returns 0.0f.

Parameters:

- `value`: value to clamp
- `min`: minimal allowed value
- `max`: maximal allowed value

**Returns:** a clamped value that fits into `min..max` interval

**Since:** 21

Throws:

- `IllegalArgumentException`: if either of `min` and `max` arguments is NaN, or `min > max`, or `min` is +0.0f, and `max` is -0.0f.
