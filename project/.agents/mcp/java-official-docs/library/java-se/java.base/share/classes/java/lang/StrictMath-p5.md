---
title: "StrictMath class (java.lang) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StrictMath.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StrictMath class (java.lang) (part 5 of 6)

## StrictMath.fma(double, double, double)

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

Note that `fusedMac(a, 1.0, c)` returns the same
result as (`a + c`).  However,
`fusedMac(a, b, +0.0)` does *not* always return the
same result as (`a * b`) since
`fusedMac(-0.0, +0.0, +0.0)` is `+0.0` while
(`-0.0 * +0.0`) is `-0.0`; `fusedMac(a, b, -0.0)` is
equivalent to (`a * b`) however.

Parameters:

- `a`: a value
- `b`: a value
- `c`: a value

**API note:** This method corresponds to the fusedMultiplyAdd
operation defined in IEEE 754-2008.

**Returns:** (*a* &times; *b* + *c*)
computed, as if with unlimited range and precision, and rounded
once to the nearest `double` value

**Since:** 9

## StrictMath.fma(float, float, float)

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
operation defined in IEEE 754-2008.

**Returns:** (*a* &times; *b* + *c*)
computed, as if with unlimited range and precision, and rounded
once to the nearest `float` value

**Since:** 9

## StrictMath.ulp(double)

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

## StrictMath.ulp(float)

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

## StrictMath.signum(double)

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

## StrictMath.signum(float)

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

## StrictMath.sinh(double)

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

Parameters:

- `x`: The number whose hyperbolic sine is to be returned.

**Returns:** The hyperbolic sine of `x`.

**Since:** 1.5

## StrictMath.cosh(double)

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

Parameters:

- `x`: The number whose hyperbolic cosine is to be returned.

**Returns:** The hyperbolic cosine of `x`.

**Since:** 1.5

## StrictMath.tanh(double)

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

Parameters:

- `x`: The number whose hyperbolic tangent is to be returned.

**Returns:** The hyperbolic tangent of `x`.

**Since:** 1.5

## StrictMath.hypot(double, double)

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

Parameters:

- `x`: a value
- `y`: a value

**Returns:** sqrt(*x*2 +*y*2)
without intermediate overflow or underflow

**Since:** 1.5

## StrictMath.expm1(double)

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

Parameters:

- `x`: the exponent to raise *e* to in the computation of *e*`x` &minus;1.

**Returns:** the value *e*`x` - 1.

**Since:** 1.5

## StrictMath.log1p(double)

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

Parameters:

- `x`: a value

**Returns:** the value ln(`x` + 1), the natural
log of `x` + 1

**Since:** 1.5

## StrictMath.copySign(double, double)

```java
public static double copySign(double magnitude, double sign)
```

Returns the first floating-point argument with the sign of the
second floating-point argument.  For this method, a NaN
`sign` argument is always treated as if it were
positive.

Parameters:

- `magnitude`: the parameter providing the magnitude of the result
- `sign`: the parameter providing the sign of the result

**Returns:** a value with the magnitude of `magnitude`
and the sign of `sign`.

**Since:** 1.6

## StrictMath.copySign(float, float)

```java
public static float copySign(float magnitude, float sign)
```

Returns the first floating-point argument with the sign of the
second floating-point argument.  For this method, a NaN
`sign` argument is always treated as if it were
positive.

Parameters:

- `magnitude`: the parameter providing the magnitude of the result
- `sign`: the parameter providing the sign of the result

**Returns:** a value with the magnitude of `magnitude`
and the sign of `sign`.

**Since:** 1.6

## StrictMath.getExponent(float)

```java
public static int getExponent(float f)
```

Returns the unbiased exponent used in the representation of a
`float`.  Special cases:

- If the argument is NaN or infinite, then the result is
`Float.MAX_EXPONENT` + 1.

- If the argument is zero or subnormal, then the result is
`Float.MIN_EXPONENT` -1.

Parameters:

- `f`: a `float` value

**Returns:** the unbiased exponent of the argument

**Since:** 1.6

## StrictMath.getExponent(double)

```java
public static int getExponent(double d)
```

Returns the unbiased exponent used in the representation of a
`double`.  Special cases:

- If the argument is NaN or infinite, then the result is
`Double.MAX_EXPONENT` + 1.

- If the argument is zero or subnormal, then the result is
`Double.MIN_EXPONENT` -1.

Parameters:

- `d`: a `double` value

**Returns:** the unbiased exponent of the argument

**Since:** 1.6

## StrictMath.nextAfter(double, double)

```java
public static double nextAfter(double start, double direction)
```

Returns the floating-point number adjacent to the first
argument in the direction of the second argument.  If both
arguments compare as equal the second argument is returned.

Special cases:

-  If either argument is a NaN, then NaN is returned.

-  If both arguments are signed zeros, `direction`
is returned unchanged (as implied by the requirement of
returning the second argument if the arguments compare as
equal).

-  If `start` is
&plusmn;`Double.MIN_VALUE` and `direction`
has a value such that the result should have a smaller
magnitude, then a zero with the same sign as `start`
is returned.

-  If `start` is infinite and
`direction` has a value such that the result should
have a smaller magnitude, `Double.MAX_VALUE` with the
same sign as `start` is returned.

-  If `start` is equal to &plusmn;
`Double.MAX_VALUE` and `direction` has a
value such that the result should have a larger magnitude, an
infinity with same sign as `start` is returned.

Parameters:

- `start`: starting floating-point value
- `direction`: value indicating which of `start`'s neighbors or `start` should be returned

**Returns:** The floating-point number adjacent to `start` in the
direction of `direction`.

**Since:** 1.6

## StrictMath.nextAfter(float, double)

```java
public static float nextAfter(float start, double direction)
```

Returns the floating-point number adjacent to the first
argument in the direction of the second argument.  If both
arguments compare as equal a value equivalent to the second argument
is returned.

Special cases:

-  If either argument is a NaN, then NaN is returned.

-  If both arguments are signed zeros, a value equivalent
to `direction` is returned.

-  If `start` is
&plusmn;`Float.MIN_VALUE` and `direction`
has a value such that the result should have a smaller
magnitude, then a zero with the same sign as `start`
is returned.

-  If `start` is infinite and
`direction` has a value such that the result should
have a smaller magnitude, `Float.MAX_VALUE` with the
same sign as `start` is returned.

-  If `start` is equal to &plusmn;
`Float.MAX_VALUE` and `direction` has a
value such that the result should have a larger magnitude, an
infinity with same sign as `start` is returned.

Parameters:

- `start`: starting floating-point value
- `direction`: value indicating which of `start`'s neighbors or `start` should be returned

**Returns:** The floating-point number adjacent to `start` in the
direction of `direction`.

**Since:** 1.6

## StrictMath.nextUp(double)

```java
public static double nextUp(double d)
```

Returns the floating-point value adjacent to `d` in
the direction of positive infinity.  This method is
semantically equivalent to `nextAfter(d, Double.POSITIVE_INFINITY)`; however, a `nextUp`
implementation may run faster than its equivalent
`nextAfter` call.

Special Cases:

-  If the argument is NaN, the result is NaN.

-  If the argument is positive infinity, the result is
positive infinity.

-  If the argument is zero, the result is
`Double.MIN_VALUE`

Parameters:

- `d`: starting floating-point value

**Returns:** The adjacent floating-point value closer to positive
infinity.

**Since:** 1.6
