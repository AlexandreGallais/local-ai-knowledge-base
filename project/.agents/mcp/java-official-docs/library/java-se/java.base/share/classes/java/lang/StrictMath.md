---
title: "StrictMath class (java.lang) (part 1 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StrictMath.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StrictMath class (java.lang)

```java
public final class StrictMath
```

The class `StrictMath` contains methods for performing basic
numeric operations such as the elementary exponential, logarithm,
square root, and trigonometric functions.

To help ensure portability of Java programs, the definitions of
some of the numeric functions in this package require that they
produce the same results as certain published algorithms. These
algorithms are available from the well-known network library
`netlib` as the package "Freely Distributable Math
Library," `fdlibm`. These
algorithms, which are written in the C programming language, are
then to be understood to be transliterated into Java and executed
with all floating-point and integer operations following the rules
of Java arithmetic. The following transformations are used in the
transliteration:

- Extraction and setting of the high and low halves of a 64-bit
`double` in C is expressed using Java platform methods that
perform bit-wise conversions from {@code double} to {@code long} and {@code long} to {@code double}.

- Unsigned `int` values in C are mapped to signed `int` values in Java with updates to operations to replicate
unsigned semantics where the results on the same textual operation
would differ. For example, `>>` shifts on unsigned C values
are replaced with `>>>` shifts on signed Java values. Sized
comparisons on unsigned C values (`<`, `<=`, `>`,
`>=`) are replaced with semantically equivalent calls to
int) compareUnsigned.

The Java math library is defined with respect to
`fdlibm` version 5.3. Where `fdlibm` provides
more than one definition for a function (such as
`acos`), use the "IEEE 754 core function" version
(residing in a file whose name begins with the letter
`e`).  The methods which require `fdlibm`
semantics are `sin`, `cos`, `tan`,
`asin`, `acos`, `atan`,
`exp`, `log`, `log10`,
`cbrt`, `atan2`, `pow`,
`sinh`, `cosh`, `tanh`,
`hypot`, `expm1`, and `log1p`.

The platform uses signed two's complement integer arithmetic with
int and long primitive types.  The developer should choose
the primitive type to ensure that arithmetic operations consistently
produce correct results, which in some cases means the operations
will not overflow the range of values of the computation.
The best practice is to choose the primitive type and algorithm to avoid
overflow. In cases where the size is `int` or `long` and
overflow errors need to be detected, the methods whose names end with
`Exact` throw an `ArithmeticException` when the results overflow.

#### IEEE 754 Recommended
Operations

The Math class discusses how the shared
quality of implementation criteria for selected `Math` and
`StrictMath` methods relate to the IEEE 754
recommended operations.

**Since:** 1.3

## StrictMath.E

```java
public static final double E
```

The `double` value that is closer than any other to
*e*, the base of the natural logarithms.

## StrictMath.PI

```java
public static final double PI
```

The `double` value that is closer than any other to
*pi* (&pi;), the ratio of the circumference of a circle to its
diameter.

## StrictMath.TAU

```java
public static final double TAU
```

The `double` value that is closer than any other to
*tau* (&tau;), the ratio of the circumference of a circle
to its radius.

**API note:** The value of *pi* is one half that of *tau*; in other
words, *tau* is double *pi* .

**Since:** 19

## StrictMath.sin(double)

```java
public static double sin(double a)
```

Returns the trigonometric sine of an angle. Special cases:

- If the argument is NaN or an infinity, then the
result is NaN.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

Parameters:

- `a`: an angle, in radians.

**Returns:** the sine of the argument.

## StrictMath.cos(double)

```java
public static double cos(double a)
```

Returns the trigonometric cosine of an angle. Special cases:

- If the argument is NaN or an infinity, then the
result is NaN.

- If the argument is zero, then the result is `1.0`.

Parameters:

- `a`: an angle, in radians.

**Returns:** the cosine of the argument.

## StrictMath.tan(double)

```java
public static double tan(double a)
```

Returns the trigonometric tangent of an angle. Special cases:

- If the argument is NaN or an infinity, then the result
is NaN.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

Parameters:

- `a`: an angle, in radians.

**Returns:** the tangent of the argument.

## StrictMath.asin(double)

```java
public static double asin(double a)
```

Returns the arc sine of a value; the returned angle is in the
range &minus;*pi*/2 through *pi*/2.  Special cases:

- If the argument is NaN or its absolute value is greater
than 1, then the result is NaN.

- If the argument is zero, then the result is a zero with the
same sign as the argument.

Parameters:

- `a`: the value whose arc sine is to be returned.

**Returns:** the arc sine of the argument.

## StrictMath.acos(double)

```java
public static double acos(double a)
```

Returns the arc cosine of a value; the returned angle is in the
range 0.0 through *pi*.  Special case:

- If the argument is NaN or its absolute value is greater
than 1, then the result is NaN.

- If the argument is `1.0`, the result is positive zero.

Parameters:

- `a`: the value whose arc cosine is to be returned.

**Returns:** the arc cosine of the argument.

## StrictMath.atan(double)

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

Parameters:

- `a`: the value whose arc tangent is to be returned.

**Returns:** the arc tangent of the argument.

## StrictMath.toRadians(double)

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

## StrictMath.toDegrees(double)

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

## StrictMath.exp(double)

```java
public static double exp(double a)
```

Returns Euler's number *e* raised to the power of a
`double` value. Special cases:

- If the argument is NaN, the result is NaN.

- If the argument is positive infinity, then the result is
positive infinity.

- If the argument is negative infinity, then the result is
positive zero.

- If the argument is zero, then the result is `1.0`.

Parameters:

- `a`: the exponent to raise *e* to.

**Returns:** the value *e*`a`,
         where *e* is the base of the natural logarithms.

## StrictMath.log(double)

```java
public static double log(double a)
```

Returns the natural logarithm (base *e*) of a `double`
value. Special cases:

- If the argument is NaN or less than zero, then the result
is NaN.

- If the argument is positive infinity, then the result is
positive infinity.

- If the argument is positive zero or negative zero, then the
result is negative infinity.

- If the argument is `1.0`, then the result is positive
zero.

Parameters:

- `a`: a value

**Returns:** the value ln `a`, the natural logarithm of
         `a`.

## StrictMath.log10(double)

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

Parameters:

- `a`: a value

**Returns:** the base 10 logarithm of  `a`.

**Since:** 1.5

## StrictMath.sqrt(double)

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

**Returns:** the positive square root of `a`.

## StrictMath.cbrt(double)

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

Parameters:

- `a`: a value.

**Returns:** the cube root of `a`.

**Since:** 1.5

## StrictMath.IEEEremainder(double, double)

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

## StrictMath.ceil(double)

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
that the value of `StrictMath.ceil(x)` is exactly the
value of `-StrictMath.floor(-x)`.

Parameters:

- `a`: a value.

**Returns:** the smallest (closest to negative infinity)
         floating-point value that is greater than or equal to
         the argument and is equal to a mathematical integer.

## StrictMath.floor(double)

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

**Returns:** the largest (closest to positive infinity)
         floating-point value that less than or equal to the argument
         and is equal to a mathematical integer.

## StrictMath.rint(double)

```java
public static double rint(double a)
```

Returns the `double` value that is closest in value
to the argument and is equal to a mathematical integer. If two
`double` values that are mathematical integers are
equally close to the value of the argument, the result is the
integer value that is even. Special cases:

- If the argument value is already equal to a mathematical
integer, then the result is the same as the argument.

- If the argument is NaN or an infinity or positive zero or negative
zero, then the result is the same as the argument.

Parameters:

- `a`: a value.

**Returns:** the closest floating-point value to `a` that is
         equal to a mathematical integer.
