---
title: "Math class (java.lang) (part 1 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Math.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Math class (java.lang)

```java
public final class Math
```

The class `Math` contains methods for performing basic
numeric operations such as the elementary exponential, logarithm,
square root, and trigonometric functions.

Unlike some of the numeric methods of class
StrictMath, all implementations of the equivalent
functions of class `Math` are not defined to return the
bit-for-bit same results.  This relaxation permits
better-performing implementations where strict reproducibility is
not required.

By default many of the `Math` methods simply call
the equivalent method in `StrictMath` for their
implementation.  Code generators are encouraged to use
platform-specific native libraries or microprocessor instructions,
where available, to provide higher-performance implementations of
`Math` methods.  Such higher-performance
implementations still must conform to the specification for
`Math`.

The quality of implementation specifications concern two
properties, accuracy of the returned result and monotonicity of the
method.  Accuracy of the floating-point `Math` methods is
measured in terms of ulps, .  For a given floating-point format, an
ulp of a specific real number value is
the distance between the two floating-point values bracketing that
numerical value.  When discussing the accuracy of a method as a
whole rather than at a specific argument, the number of ulps cited
is for the worst-case error at any argument.  If a method always
has an error less than 0.5 ulps, the method always returns the
floating-point number nearest the exact result; such a method is
correctly rounded.  A
method is generally the best a floating-point approximation can be;
however, it is impractical for many floating-point methods to be
correctly rounded.  Instead, for the `Math` class, a larger
error bound of 1 or 2 ulps is allowed for certain methods.
Informally, with a 1 ulp error bound, when the exact result is a
representable number, the exact result should be returned as the
computed result; otherwise, either of the two floating-point values
which bracket the exact result may be returned.  For exact results
large in magnitude, one of the endpoints of the bracket may be
infinite.  Besides accuracy at individual arguments, maintaining
proper relations between the method at different arguments is also
important.  Therefore, most methods with more than 0.5 ulp errors
are required to be : whenever
the mathematical function is non-decreasing, so is the
floating-point approximation, likewise, whenever the mathematical
function is non-increasing, so is the floating-point approximation.
Not all approximations that have 1 ulp accuracy will automatically
meet the monotonicity requirements.

The platform uses signed two's complement integer arithmetic with
`int` and `long` primitive types.  The developer should
choose the primitive type to ensure that arithmetic operations
consistently produce correct results, which in some cases means the
operations will not overflow the range of values of the
computation.  The best practice is to choose the primitive type and
algorithm to avoid overflow. In cases where the size is `int`
or `long` and overflow errors need to be detected, the
methods whose names end with `Exact` throw an `ArithmeticException` when the results overflow.

#### IEEE 754 Recommended
Operations

The 2019 revision of the IEEE 754 floating-point standard includes
a section of recommended operations and the semantics of those
operations if they are included in a programming environment. The
recommended operations present in this class include sin, cos, tan, asin, acos, atan, exp, expm1, log, log10, log1p,
sinh, cosh, tanh, hypot, and pow.  (The sqrt
operation is a required part of IEEE 754 from a different section
of the standard.) The special case behavior of the recommended
operations generally follows the guidance of the IEEE 754
standard. However, the `pow` method defines different
behavior for some arguments, as noted in its specification. The IEEE 754 standard defines its operations to be
correctly rounded, which is a more stringent quality of
implementation condition than required for most of the methods in
question that are also included in this class.

**Since:** 1.0

## Math.E

```java
public static final double E
```

The `double` value that is closer than any other to
*e*, the base of the natural logarithms.

## Math.PI

```java
public static final double PI
```

The `double` value that is closer than any other to
*pi* (&pi;), the ratio of the circumference of a circle to
its diameter.

## Math.TAU

```java
public static final double TAU
```

The `double` value that is closer than any other to
*tau* (&tau;), the ratio of the circumference of a circle
to its radius.

**API note:** The value of *pi* is one half that of *tau*; in other
words, *tau* is double *pi* .

**Since:** 19

## Math.sin(double)

```java
public static double sin(double a)
```

Returns the trigonometric sine of an angle.  Special cases:

- If the argument is NaN or an infinity, then the
result is NaN.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: an angle, in radians.

**Returns:** the sine of the argument.

## Math.cos(double)

```java
public static double cos(double a)
```

Returns the trigonometric cosine of an angle. Special cases:

- If the argument is NaN or an infinity, then the
result is NaN.

- If the argument is zero, then the result is `1.0`.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: an angle, in radians.

**Returns:** the cosine of the argument.

## Math.tan(double)

```java
public static double tan(double a)
```

Returns the trigonometric tangent of an angle.  Special cases:

- If the argument is NaN or an infinity, then the result
is NaN.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

The computed result must be within 1.25 ulps of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: an angle, in radians.

**Returns:** the tangent of the argument.

## Math.asin(double)

```java
public static double asin(double a)
```

Returns the arc sine of a value; the returned angle is in the
range &minus;*pi*/2 through *pi*/2.  Special cases:

- If the argument is NaN or its absolute value is greater
than 1, then the result is NaN.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: the value whose arc sine is to be returned.

**Returns:** the arc sine of the argument.

## Math.acos(double)

```java
public static double acos(double a)
```

Returns the arc cosine of a value; the returned angle is in the
range 0.0 through *pi*.  Special case:

- If the argument is NaN or its absolute value is greater
than 1, then the result is NaN.

- If the argument is `1.0`, the result is positive zero.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: the value whose arc cosine is to be returned.

**Returns:** the arc cosine of the argument.

## Math.atan(double)

```java
public static double atan(double a)
```

Returns the arc tangent of a value; the returned angle is in the
range &minus;*pi*/2 through *pi*/2.  Special cases:

- If the argument is NaN, then the result is NaN.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

- If the argument is infinite,
then the result is the closest value to *pi*/2 with the
same sign as the input.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: the value whose arc tangent is to be returned.

**Returns:** the arc tangent of the argument.

## Math.toRadians(double)

```java
public static double toRadians(double angdeg)
```

Converts an angle measured in degrees to an approximately
equivalent angle measured in radians.  The conversion from
degrees to radians is generally inexact.

Parameters:

- `angdeg`: an angle, in degrees

**Returns:** the measurement of the angle `angdeg`
         in radians.

**Since:** 1.2

## Math.toDegrees(double)

```java
public static double toDegrees(double angrad)
```

Converts an angle measured in radians to an approximately
equivalent angle measured in degrees.  The conversion from
radians to degrees is generally inexact; users should
*not* expect `cos(toRadians(90.0))` to exactly
equal `0.0`.

Parameters:

- `angrad`: an angle, in radians

**Returns:** the measurement of the angle `angrad`
         in degrees.

**Since:** 1.2

## Math.exp(double)

```java
public static double exp(double a)
```

Returns Euler's number *e* raised to the power of a
`double` value.  Special cases:

- If the argument is NaN, the result is NaN.

- If the argument is positive infinity, then the result is
positive infinity.

- If the argument is negative infinity, then the result is
positive zero.

- If the argument is zero, then the result is `1.0`.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: the exponent to raise *e* to.

**Returns:** the value *e*`a`,
         where *e* is the base of the natural logarithms.

## Math.log(double)

```java
public static double log(double a)
```

Returns the natural logarithm (base *e*) of a `double`
value.  Special cases:

- If the argument is NaN or less than zero, then the result
is NaN.

- If the argument is positive infinity, then the result is
positive infinity.

- If the argument is positive zero or negative zero, then the
result is negative infinity.

- If the argument is `1.0`, then the result is positive
zero.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: a value

**Returns:** the value ln `a`, the natural logarithm of
         `a`.

## Math.log10(double)

```java
public static double log10(double a)
```

Returns the base 10 logarithm of a `double` value.
Special cases:

- If the argument is NaN or less than zero, then the result
is NaN.

- If the argument is positive infinity, then the result is
positive infinity.

- If the argument is positive zero or negative zero, then the
result is negative infinity.

- If the argument is equal to 10*n* for
integer *n*, then the result is *n*. In particular,
if the argument is `1.0` (100), then the
result is positive zero.

The computed result must be within 1 ulp of the exact result.
Results must be semi-monotonic.

Parameters:

- `a`: a value

**Returns:** the base 10 logarithm of  `a`.

**Since:** 1.5

## Math.sqrt(double)

```java
public static double sqrt(double a)
```

Returns the correctly rounded positive square root of a
`double` value.
Special cases:

- If the argument is NaN or less than zero, then the result
is NaN.

- If the argument is positive infinity, then the result is positive
infinity.

- If the argument is positive zero or negative zero, then the
result is the same as the argument.
Otherwise, the result is the `double` value closest to
the true mathematical square root of the argument value.

Parameters:

- `a`: a value.

**API note:** This method corresponds to the squareRoot operation defined in
IEEE 754.

**Returns:** the positive square root of `a`.
         If the argument is NaN or less than zero, the result is NaN.

## Math.cbrt(double)

```java
public static double cbrt(double a)
```

Returns the cube root of a `double` value.  For
positive finite `x`, `cbrt(-x) == -cbrt(x)`; that is, the cube root of a negative value is
the negative of the cube root of that value's magnitude.

Special cases:

- If the argument is NaN, then the result is NaN.

- If the argument is infinite, then the result is an infinity
with the same sign as the argument.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

The computed result must be within 1 ulp of the exact result.

Parameters:

- `a`: a value.

**Returns:** the cube root of `a`.

**Since:** 1.5

## Math.IEEEremainder(double, double)

```java
public static double IEEEremainder(double f1, double f2)
```

Computes the remainder operation on two arguments as prescribed
by the IEEE 754 standard.
The remainder value is mathematically equal to
`f1 - f2` &times; *n*,
where *n* is the mathematical integer closest to the exact
mathematical value of the quotient `f1/f2`, and if two
mathematical integers are equally close to `f1/f2`,
then *n* is the integer that is even. If the remainder is
zero, its sign is the same as the sign of the first argument.
Special cases:

- If either argument is NaN, or the first argument is infinite,
or the second argument is positive zero or negative zero, then the
result is NaN.

- If the first argument is finite and the second argument is
infinite, then the result is the same as the first argument.

Parameters:

- `f1`: the dividend.
- `f2`: the divisor.

**Returns:** the remainder when `f1` is divided by
         `f2`.

## Math.ceil(double)

```java
public static double ceil(double a)
```

Returns the smallest (closest to negative infinity)
`double` value that is greater than or equal to the
argument and is equal to a mathematical integer. Special cases:

- If the argument value is already equal to a
mathematical integer, then the result is the same as the
argument.
- If the argument is NaN or an infinity or
positive zero or negative zero, then the result is the same as
the argument.
- If the argument value is less than zero but
greater than -1.0, then the result is negative zero. Note
that the value of `Math.ceil(x)` is exactly the
value of `-Math.floor(-x)`.

Parameters:

- `a`: a value.

**API note:** This method corresponds to the roundToIntegralTowardPositive
operation defined in IEEE 754.

**Returns:** the smallest (closest to negative infinity)
         floating-point value that is greater than or equal to
         the argument and is equal to a mathematical integer.

## Math.floor(double)

```java
public static double floor(double a)
```

Returns the largest (closest to positive infinity)
`double` value that is less than or equal to the
argument and is equal to a mathematical integer. Special cases:

- If the argument value is already equal to a
mathematical integer, then the result is the same as the
argument.
- If the argument is NaN or an infinity or
positive zero or negative zero, then the result is the same as
the argument.

Parameters:

- `a`: a value.

**API note:** This method corresponds to the roundToIntegralTowardNegative
operation defined in IEEE 754.

**Returns:** the largest (closest to positive infinity)
         floating-point value that less than or equal to the argument
         and is equal to a mathematical integer.
