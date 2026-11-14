---
title: "Math class (java.lang) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Math.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Math class (java.lang) (part 5 of 6)

## Math.min(double, double)

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

**API note:** This method corresponds to the minimum operation defined in
IEEE 754.

**Returns:** the smaller of `a` and `b`.

## Math.clamp(long, int, int)

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

## Math.clamp(long, long, long)

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

## Math.clamp(double, double, double)

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

## Math.clamp(float, float, float)

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

## Math.fma(double, double, double)

```java
public static double fma(double a, double b, double c)
```

Returns the fused multiply add of the three arguments; that is,
returns the exact product of the first two arguments summed
with the third argument and then rounded once to the nearest
`double`.

The rounding is done using the round to nearest even rounding mode.

In contrast, if `a * b + c` is evaluated as a regular
floating-point expression, two rounding errors are involved,
the first for the multiply operation, the second for the
addition operation.

Special cases:

-  If any argument is NaN, the result is NaN.

-  If one of the first two arguments is infinite and the
other is zero, the result is NaN.

-  If the exact product of the first two arguments is infinite
(in other words, at least one of the arguments is infinite and
the other is neither zero nor NaN) and the third argument is an
infinity of the opposite sign, the result is NaN.

Note that `fma(a, 1.0, c)` returns the same
result as (`a + c`).  However,
`fma(a, b, +0.0)` does *not* always return the
same result as (`a * b`) since
`fma(-0.0, +0.0, +0.0)` is `+0.0` while
(`-0.0 * +0.0`) is `-0.0`; `fma(a, b, -0.0)` is
equivalent to (`a * b`) however.

Parameters:

- `a`: a value
- `b`: a value
- `c`: a value

**API note:** This method corresponds to the fusedMultiplyAdd
operation defined in IEEE 754.

**Returns:** (*a* &times; *b* + *c*)
computed, as if with unlimited range and precision, and rounded
once to the nearest `double` value

**Since:** 9

## Math.fma(float, float, float)

```java
public static float fma(float a, float b, float c)
```

Returns the fused multiply add of the three arguments; that is,
returns the exact product of the first two arguments summed
with the third argument and then rounded once to the nearest
`float`.

The rounding is done using the round to nearest even rounding mode.

In contrast, if `a * b + c` is evaluated as a regular
floating-point expression, two rounding errors are involved,
the first for the multiply operation, the second for the
addition operation.

Special cases:

-  If any argument is NaN, the result is NaN.

-  If one of the first two arguments is infinite and the
other is zero, the result is NaN.

-  If the exact product of the first two arguments is infinite
(in other words, at least one of the arguments is infinite and
the other is neither zero nor NaN) and the third argument is an
infinity of the opposite sign, the result is NaN.

Note that `fma(a, 1.0f, c)` returns the same
result as (`a + c`).  However,
`fma(a, b, +0.0f)` does *not* always return the
same result as (`a * b`) since
`fma(-0.0f, +0.0f, +0.0f)` is `+0.0f` while
(`-0.0f * +0.0f`) is `-0.0f`; `fma(a, b, -0.0f)` is
equivalent to (`a * b`) however.

Parameters:

- `a`: a value
- `b`: a value
- `c`: a value

**API note:** This method corresponds to the fusedMultiplyAdd
operation defined in IEEE 754.

**Returns:** (*a* &times; *b* + *c*)
computed, as if with unlimited range and precision, and rounded
once to the nearest `float` value

**Since:** 9

## Math.ulp(double)

```java
public static double ulp(double d)
```

Returns the size of an ulp of the argument.  An ulp, unit in
the last place, of a `double` value is the positive
distance between this floating-point value and the `double` value next larger in magnitude.  Note that for non-NaN
*x*, `ulp(-*x*) == ulp(*x*)`.

Special Cases:

-  If the argument is NaN, then the result is NaN.

-  If the argument is positive or negative infinity, then the
result is positive infinity.

-  If the argument is positive or negative zero, then the result is
`Double.MIN_VALUE`.

-  If the argument is &plusmn;`Double.MAX_VALUE`, then
the result is equal to 2971.

Parameters:

- `d`: the floating-point value whose ulp is to be returned

**Returns:** the size of an ulp of the argument

**Since:** 1.5

## Math.ulp(float)

```java
public static float ulp(float f)
```

Returns the size of an ulp of the argument.  An ulp, unit in
the last place, of a `float` value is the positive
distance between this floating-point value and the `float` value next larger in magnitude.  Note that for non-NaN
*x*, `ulp(-*x*) == ulp(*x*)`.

Special Cases:

-  If the argument is NaN, then the result is NaN.

-  If the argument is positive or negative infinity, then the
result is positive infinity.

-  If the argument is positive or negative zero, then the result is
`Float.MIN_VALUE`.

-  If the argument is &plusmn;`Float.MAX_VALUE`, then
the result is equal to 2104.

Parameters:

- `f`: the floating-point value whose ulp is to be returned

**Returns:** the size of an ulp of the argument

**Since:** 1.5

## Math.signum(double)

```java
public static double signum(double d)
```

Returns the signum function of the argument; zero if the argument
is zero, 1.0 if the argument is greater than zero, -1.0 if the
argument is less than zero.

Special Cases:

-  If the argument is NaN, then the result is NaN.

-  If the argument is positive zero or negative zero, then the
     result is the same as the argument.

Parameters:

- `d`: the floating-point value whose signum is to be returned

**Returns:** the signum function of the argument

**Since:** 1.5

## Math.signum(float)

```java
public static float signum(float f)
```

Returns the signum function of the argument; zero if the argument
is zero, 1.0f if the argument is greater than zero, -1.0f if the
argument is less than zero.

Special Cases:

-  If the argument is NaN, then the result is NaN.

-  If the argument is positive zero or negative zero, then the
     result is the same as the argument.

Parameters:

- `f`: the floating-point value whose signum is to be returned

**Returns:** the signum function of the argument

**Since:** 1.5

## Math.sinh(double)

```java
public static double sinh(double x)
```

Returns the hyperbolic sine of a `double` value.
The hyperbolic sine of *x* is defined to be
(*ex &minus; e&minus;x*)/2
where *e* is Euler's number.

Special cases:

- If the argument is NaN, then the result is NaN.

- If the argument is infinite, then the result is an infinity
with the same sign as the argument.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

The computed result must be within 2.5 ulps of the exact result.

Parameters:

- `x`: The number whose hyperbolic sine is to be returned.

**Returns:** The hyperbolic sine of `x`.

**Since:** 1.5

## Math.cosh(double)

```java
public static double cosh(double x)
```

Returns the hyperbolic cosine of a `double` value.
The hyperbolic cosine of *x* is defined to be
(*ex + e&minus;x*)/2
where *e* is Euler's number.

Special cases:

- If the argument is NaN, then the result is NaN.

- If the argument is infinite, then the result is positive
infinity.

- If the argument is zero, then the result is `1.0`.

The computed result must be within 2.5 ulps of the exact result.

Parameters:

- `x`: The number whose hyperbolic cosine is to be returned.

**Returns:** The hyperbolic cosine of `x`.

**Since:** 1.5

## Math.tanh(double)

```java
public static double tanh(double x)
```

Returns the hyperbolic tangent of a `double` value.
The hyperbolic tangent of *x* is defined to be
(*ex &minus; e&minus;x*)/(*ex + e&minus;x*),
in other words, sinh(*x*)/cosh(*x*).  Note
that the absolute value of the exact tanh is always less than
1.

Special cases:

- If the argument is NaN, then the result is NaN.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

- If the argument is positive infinity, then the result is
`+1.0`.

- If the argument is negative infinity, then the result is
`-1.0`.

The computed result must be within 2.5 ulps of the exact result.
The result of `tanh` for any finite input must have
an absolute value less than or equal to 1.  Note that once the
exact result of tanh is within 1/2 of an ulp of the limit value
of &plusmn;1, correctly signed &plusmn;`1.0` should
be returned.

Parameters:

- `x`: The number whose hyperbolic tangent is to be returned.

**Returns:** The hyperbolic tangent of `x`.

**Since:** 1.5

## Math.hypot(double, double)

```java
public static double hypot(double x, double y)
```

Returns sqrt(*x*2 +*y*2)
without intermediate overflow or underflow.

Special cases:

-  If either argument is infinite, then the result
is positive infinity.

-  If either argument is NaN and neither argument is infinite,
then the result is NaN.

-  If both arguments are zero, the result is positive zero.

The computed result must be within 1.5 ulps of the exact
result.  If one parameter is held constant, the results must be
semi-monotonic in the other parameter.

Parameters:

- `x`: a value
- `y`: a value

**Returns:** sqrt(*x*2 +*y*2)
without intermediate overflow or underflow

**Since:** 1.5

## Math.expm1(double)

```java
public static double expm1(double x)
```

Returns *e*x &minus;1.  Note that for values of
*x* near 0, the exact sum of
`expm1(x)` + 1 is much closer to the true
result of *e*x than `exp(x)`.

Special cases:

- If the argument is NaN, the result is NaN.

- If the argument is positive infinity, then the result is
positive infinity.

- If the argument is negative infinity, then the result is
-1.0.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.  The result of
`expm1` for any finite input must be greater than or
equal to `-1.0`.  Note that once the exact result of
*e*`x` - 1 is within 1/2
ulp of the limit value -1, `-1.0` should be
returned.

Parameters:

- `x`: the exponent to raise *e* to in the computation of *e*`x` &minus;1.

**Returns:** the value *e*`x` - 1.

**Since:** 1.5

## Math.log1p(double)

```java
public static double log1p(double x)
```

Returns the natural logarithm of the sum of the argument and 1.
Note that for small values `x`, the result of
`log1p(x)` is much closer to the true result of ln(1
+ `x`) than the floating-point evaluation of
`log(1.0+x)`.

Special cases:

- If the argument is NaN or less than -1, then the result is
NaN.

- If the argument is positive infinity, then the result is
positive infinity.

- If the argument is negative one, then the result is
negative infinity.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `x`: a value

**Returns:** the value ln(`x` + 1), the natural
log of `x` + 1

**Since:** 1.5
