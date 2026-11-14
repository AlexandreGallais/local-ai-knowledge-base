---
title: "StrictMath class (java.lang) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StrictMath.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StrictMath class (java.lang) (part 6 of 6)

## StrictMath.nextUp(float)

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

**Returns:** The adjacent floating-point value closer to positive
infinity.

**Since:** 1.6

## StrictMath.nextDown(double)

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

**Returns:** The adjacent floating-point value closer to negative
infinity.

**Since:** 1.8

## StrictMath.nextDown(float)

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

**Returns:** The adjacent floating-point value closer to negative
infinity.

**Since:** 1.8

## StrictMath.scalb(double, int)

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

**Returns:** `d` &times; 2`scaleFactor`

**Since:** 1.6

## StrictMath.scalb(float, int)

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

**Returns:** `f` &times; 2`scaleFactor`

**Since:** 1.6

## StrictMath.unsignedMultiplyExact(int, int)

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

## StrictMath.unsignedMultiplyExact(long, int)

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

## StrictMath.unsignedMultiplyExact(long, long)

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

## StrictMath.powExact(int, int)

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

## StrictMath.unsignedPowExact(int, int)

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

## StrictMath.powExact(long, int)

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

## StrictMath.unsignedPowExact(long, int)

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
