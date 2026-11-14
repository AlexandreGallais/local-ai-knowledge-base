---
title: "Math class (java.lang) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Math.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Math class (java.lang) (part 6 of 6)

## Math.copySign(double, double)

```java
public static double copySign(double magnitude, double sign)
```

Returns the first floating-point argument with the sign of the
second floating-point argument.  Note that unlike the double) StrictMath.copySign
method, this method does not require NaN `sign`
arguments to be treated as positive values; implementations are
permitted to treat some NaN arguments as positive and other NaN
arguments as negative to allow greater performance.

Parameters:

- `magnitude`: the parameter providing the magnitude of the result
- `sign`: the parameter providing the sign of the result

**API note:** This method corresponds to the copySign operation defined in
IEEE 754.

**Returns:** a value with the magnitude of `magnitude`
and the sign of `sign`.

**Since:** 1.6

## Math.copySign(float, float)

```java
public static float copySign(float magnitude, float sign)
```

Returns the first floating-point argument with the sign of the
second floating-point argument.  Note that unlike the float) StrictMath.copySign
method, this method does not require NaN `sign`
arguments to be treated as positive values; implementations are
permitted to treat some NaN arguments as positive and other NaN
arguments as negative to allow greater performance.

Parameters:

- `magnitude`: the parameter providing the magnitude of the result
- `sign`: the parameter providing the sign of the result

**API note:** This method corresponds to the copySign operation defined in
IEEE 754.

**Returns:** a value with the magnitude of `magnitude`
and the sign of `sign`.

**Since:** 1.6

## Math.getExponent(float)

```java
public static int getExponent(float f)
```

Returns the unbiased exponent used in the representation of a
`float`.  Special cases:

- If the argument is NaN or infinite, then the result is
`Float.MAX_EXPONENT` + 1.

- If the argument is zero or subnormal, then the result is
`Float.MIN_EXPONENT` - 1.

Parameters:

- `f`: a `float` value

**API note:** This method is analogous to the logB operation defined in IEEE
754, but returns a different value on subnormal arguments.

**Returns:** the unbiased exponent of the argument

**Since:** 1.6

## Math.getExponent(double)

```java
public static int getExponent(double d)
```

Returns the unbiased exponent used in the representation of a
`double`.  Special cases:

- If the argument is NaN or infinite, then the result is
`Double.MAX_EXPONENT` + 1.

- If the argument is zero or subnormal, then the result is
`Double.MIN_EXPONENT` - 1.

Parameters:

- `d`: a `double` value

**API note:** This method is analogous to the logB operation defined in IEEE
754, but returns a different value on subnormal arguments.

**Returns:** the unbiased exponent of the argument

**Since:** 1.6

## Math.nextAfter(double, double)

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

## Math.nextAfter(float, double)

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

## Math.nextUp(double)

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

**API note:** This method corresponds to the nextUp
operation defined in IEEE 754.

**Returns:** The adjacent floating-point value closer to positive
infinity.

**Since:** 1.6

## Math.nextUp(float)

```java
public static float nextUp(float f)
```

Returns the floating-point value adjacent to `f` in
the direction of positive infinity.  This method is
semantically equivalent to `nextAfter(f, Float.POSITIVE_INFINITY)`; however, a `nextUp`
implementation may run faster than its equivalent
`nextAfter` call.

Special Cases:

-  If the argument is NaN, the result is NaN.

-  If the argument is positive infinity, the result is
positive infinity.

-  If the argument is zero, the result is
`Float.MIN_VALUE`

Parameters:

- `f`: starting floating-point value

**API note:** This method corresponds to the nextUp
operation defined in IEEE 754.

**Returns:** The adjacent floating-point value closer to positive
infinity.

**Since:** 1.6

## Math.nextDown(double)

```java
public static double nextDown(double d)
```

Returns the floating-point value adjacent to `d` in
the direction of negative infinity.  This method is
semantically equivalent to `nextAfter(d, Double.NEGATIVE_INFINITY)`; however, a
`nextDown` implementation may run faster than its
equivalent `nextAfter` call.

Special Cases:

-  If the argument is NaN, the result is NaN.

-  If the argument is negative infinity, the result is
negative infinity.

-  If the argument is zero, the result is
`-Double.MIN_VALUE`

Parameters:

- `d`: starting floating-point value

**API note:** This method corresponds to the nextDown
operation defined in IEEE 754.

**Returns:** The adjacent floating-point value closer to negative
infinity.

**Since:** 1.8

## Math.nextDown(float)

```java
public static float nextDown(float f)
```

Returns the floating-point value adjacent to `f` in
the direction of negative infinity.  This method is
semantically equivalent to `nextAfter(f, Float.NEGATIVE_INFINITY)`; however, a
`nextDown` implementation may run faster than its
equivalent `nextAfter` call.

Special Cases:

-  If the argument is NaN, the result is NaN.

-  If the argument is negative infinity, the result is
negative infinity.

-  If the argument is zero, the result is
`-Float.MIN_VALUE`

Parameters:

- `f`: starting floating-point value

**API note:** This method corresponds to the nextDown
operation defined in IEEE 754.

**Returns:** The adjacent floating-point value closer to negative
infinity.

**Since:** 1.8

## Math.scalb(double, int)

```java
public static double scalb(double d, int scaleFactor)
```

Returns `d` &times; 2`scaleFactor`
rounded as if performed by a single correctly rounded
floating-point multiply.  If the exponent of the result is
between `Double.MIN_EXPONENT` and `Double.MAX_EXPONENT`, the answer is calculated exactly.  If the
exponent of the result would be larger than `Double.MAX_EXPONENT`, an infinity is returned.  Note that if
the result is subnormal, precision may be lost; that is, when
`scalb(x, n)` is subnormal, `scalb(scalb(x, n), -n)` may not equal *x*.  When the result is non-NaN, the
result has the same sign as `d`.

Special cases:

-  If the first argument is NaN, NaN is returned.

-  If the first argument is infinite, then an infinity of the
same sign is returned.

-  If the first argument is zero, then a zero of the same
sign is returned.

Parameters:

- `d`: number to be scaled by a power of two.
- `scaleFactor`: power of 2 used to scale `d`

**API note:** This method corresponds to the scaleB operation
defined in IEEE 754.

**Returns:** `d` &times; 2`scaleFactor`

**Since:** 1.6

## Math.scalb(float, int)

```java
public static float scalb(float f, int scaleFactor)
```

Returns `f` &times; 2`scaleFactor`
rounded as if performed by a single correctly rounded
floating-point multiply.  If the exponent of the result is
between `Float.MIN_EXPONENT` and `Float.MAX_EXPONENT`, the answer is calculated exactly.  If the
exponent of the result would be larger than `Float.MAX_EXPONENT`, an infinity is returned.  Note that if the
result is subnormal, precision may be lost; that is, when
`scalb(x, n)` is subnormal, `scalb(scalb(x, n), -n)` may not equal *x*.  When the result is non-NaN, the
result has the same sign as `f`.

Special cases:

-  If the first argument is NaN, NaN is returned.

-  If the first argument is infinite, then an infinity of the
same sign is returned.

-  If the first argument is zero, then a zero of the same
sign is returned.

Parameters:

- `f`: number to be scaled by a power of two.
- `scaleFactor`: power of 2 used to scale `f`

**API note:** This method corresponds to the scaleB operation
defined in IEEE 754.

**Returns:** `f` &times; 2`scaleFactor`

**Since:** 1.6

## Math.unsignedMultiplyExact(int, int)

```java
public static int unsignedMultiplyExact(int x, int y)
```

Returns the product of the unsigned arguments,
throwing an exception if the result overflows an unsigned `int`.

Parameters:

- `x`: the first unsigned value
- `y`: the second unsigned value

**Returns:** the result

**Since:** 25

Throws:

- `ArithmeticException`: if the result overflows an unsigned int

## Math.unsignedMultiplyExact(long, int)

```java
public static long unsignedMultiplyExact(long x, int y)
```

Returns the product of the unsigned arguments,
throwing an exception if the result overflows an unsigned `long`.

Parameters:

- `x`: the first unsigned value
- `y`: the second unsigned value

**Returns:** the result

**Since:** 25

Throws:

- `ArithmeticException`: if the result overflows an unsigned long

## Math.unsignedMultiplyExact(long, long)

```java
public static long unsignedMultiplyExact(long x, long y)
```

Returns the product of the unsigned arguments,
throwing an exception if the result overflows an unsigned `long`.

Parameters:

- `x`: the first unsigned value
- `y`: the second unsigned value

**Returns:** the result

**Since:** 25

Throws:

- `ArithmeticException`: if the result overflows an unsigned long

## Math.powExact(int, int)

```java
public static int powExact(int x, int n)
```

Returns `x` raised to the power of `n`,
throwing an exception if the result overflows an `int`.
When `n` is 0, the returned value is 1.

Parameters:

- `x`: the base.
- `n`: the exponent.

**Returns:** `x` raised to the power of `n`.

**Since:** 25

Throws:

- `ArithmeticException`: when `n` is negative, or when the result overflows an int.

## Math.unsignedPowExact(int, int)

```java
public static int unsignedPowExact(int x, int n)
```

Returns unsigned `x` raised to the power of `n`,
throwing an exception if the result overflows an unsigned `int`.
When `n` is 0, the returned value is 1.

Parameters:

- `x`: the unsigned base.
- `n`: the exponent.

**Returns:** `x` raised to the power of `n`.

**Since:** 25

Throws:

- `ArithmeticException`: when `n` is negative, or when the result overflows an unsigned int.

## Math.powExact(long, int)

```java
public static long powExact(long x, int n)
```

Returns `x` raised to the power of `n`,
throwing an exception if the result overflows a `long`.
When `n` is 0, the returned value is 1.

Parameters:

- `x`: the base.
- `n`: the exponent.

**Returns:** `x` raised to the power of `n`.

**Since:** 25

Throws:

- `ArithmeticException`: when `n` is negative, or when the result overflows a long.

## Math.unsignedPowExact(long, int)

```java
public static long unsignedPowExact(long x, int n)
```

Returns unsigned `x` raised to the power of `n`,
throwing an exception if the result overflows an unsigned `long`.
When `n` is 0, the returned value is 1.

Parameters:

- `x`: the unsigned base.
- `n`: the exponent.

**Returns:** `x` raised to the power of `n`.

**Since:** 25

Throws:

- `ArithmeticException`: when `n` is negative, or when the result overflows an unsigned long.
