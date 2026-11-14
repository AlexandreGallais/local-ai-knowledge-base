---
title: "StrictMath class (java.lang) (part 2 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StrictMath.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StrictMath class (java.lang) (part 2 of 6)

## StrictMath.atan2(double, double)

```java
public static double atan2(double y, double x)
```

Returns the angle *theta* from the conversion of rectangular
coordinates (`x`, `y`) to polar
coordinates (r, *theta*).
This method computes the phase *theta* by computing an arc tangent
of `y/x` in the range of &minus;*pi* to *pi*. Special
cases:

- If either argument is NaN, then the result is NaN.

- If the first argument is positive zero and the second argument
is positive, or the first argument is positive and finite and the
second argument is positive infinity, then the result is positive
zero.

- If the first argument is negative zero and the second argument
is positive, or the first argument is negative and finite and the
second argument is positive infinity, then the result is negative zero.

- If the first argument is positive zero and the second argument
is negative, or the first argument is positive and finite and the
second argument is negative infinity, then the result is the
`double` value closest to *pi*.

- If the first argument is negative zero and the second argument
is negative, or the first argument is negative and finite and the
second argument is negative infinity, then the result is the
`double` value closest to -*pi*.

- If the first argument is positive and the second argument is
positive zero or negative zero, or the first argument is positive
infinity and the second argument is finite, then the result is the
`double` value closest to *pi*/2.

- If the first argument is negative and the second argument is
positive zero or negative zero, or the first argument is negative
infinity and the second argument is finite, then the result is the
`double` value closest to -*pi*/2.

- If both arguments are positive infinity, then the result is the
`double` value closest to *pi*/4.

- If the first argument is positive infinity and the second argument
is negative infinity, then the result is the `double`
value closest to 3**pi*/4.

- If the first argument is negative infinity and the second argument
is positive infinity, then the result is the `double` value
closest to -*pi*/4.

- If both arguments are negative infinity, then the result is the
`double` value closest to -3**pi*/4.

Parameters:

- `y`: the ordinate coordinate
- `x`: the abscissa coordinate

**API note:** For *y* with a positive sign and finite nonzero
*x*, the exact mathematical value of `atan2` is
equal to:

- If *x* > 0, atan(abs(*y*/*x*))

- If *x* < 0, &pi; - atan(abs(*y*/*x*))

**Returns:** the *theta* component of the point
         (*r*, *theta*)
         in polar coordinates that corresponds to the point
         (*x*, *y*) in Cartesian coordinates.

## StrictMath.pow(double, double)

```java
public static double pow(double a, double b)
```

Returns the value of the first argument raised to the power of the
second argument. Special cases:

- If the second argument is positive or negative zero, then the
result is 1.0.

- If the second argument is 1.0, then the result is the same as the
first argument.

- If the second argument is NaN, then the result is NaN.

- If the first argument is NaN and the second argument is nonzero,
then the result is NaN.

- If

- the absolute value of the first argument is greater than 1
and the second argument is positive infinity, or

- the absolute value of the first argument is less than 1 and
the second argument is negative infinity,

then the result is positive infinity.

- If

- the absolute value of the first argument is greater than 1 and
the second argument is negative infinity, or

- the absolute value of the
first argument is less than 1 and the second argument is positive
infinity,

then the result is positive zero.

- If the absolute value of the first argument equals 1 and the
second argument is infinite, then the result is NaN.

- If

- the first argument is positive zero and the second argument
is greater than zero, or

- the first argument is positive infinity and the second
argument is less than zero,

then the result is positive zero.

- If

- the first argument is positive zero and the second argument
is less than zero, or

- the first argument is positive infinity and the second
argument is greater than zero,

then the result is positive infinity.

- If

- the first argument is negative zero and the second argument
is greater than zero but not a finite odd integer, or

- the first argument is negative infinity and the second
argument is less than zero but not a finite odd integer,

then the result is positive zero.

- If

- the first argument is negative zero and the second argument
is a positive finite odd integer, or

- the first argument is negative infinity and the second
argument is a negative finite odd integer,

then the result is negative zero.

- If

- the first argument is negative zero and the second argument
is less than zero but not a finite odd integer, or

- the first argument is negative infinity and the second
argument is greater than zero but not a finite odd integer,

then the result is positive infinity.

- If

- the first argument is negative zero and the second argument
is a negative finite odd integer, or

- the first argument is negative infinity and the second
argument is a positive finite odd integer,

then the result is negative infinity.

- If the first argument is finite and less than zero

-  if the second argument is a finite even integer, the
result is equal to the result of raising the absolute value of
the first argument to the power of the second argument

- if the second argument is a finite odd integer, the result
is equal to the negative of the result of raising the absolute
value of the first argument to the power of the second
argument

- if the second argument is finite and not an integer, then
the result is NaN.

- If both arguments are integers, then the result is exactly equal
to the mathematical result of raising the first argument to the power
of the second argument if that result can in fact be represented
exactly as a `double` value.

(In the foregoing descriptions, a floating-point value is
considered to be an integer if and only if it is finite and a
fixed point of the method ceil or,
equivalently, a fixed point of the method floor. A value is a fixed point of a one-argument
method if and only if the result of applying the method to the
value is equal to the value.)

Parameters:

- `a`: base.
- `b`: the exponent.

**API note:** The special cases definitions of this method differ from the
special case definitions of the IEEE 754 recommended `pow` operation for &plusmn;`1.0` raised to an infinite
power. This method treats such cases as indeterminate and
specifies a NaN is returned. The IEEE 754 specification treats
the infinite power as a large integer (large-magnitude
floating-point numbers are numerically integers, specifically
even integers) and therefore specifies `1.0` be returned.

**Returns:** the value `a``b`.

## StrictMath.round(float)

```java
public static int round(float a)
```

Returns the closest `int` to the argument, with ties
rounding to positive infinity.

Special cases:

- If the argument is NaN, the result is 0.

- If the argument is negative infinity or any value less than or
equal to the value of `Integer.MIN_VALUE`, the result is
equal to the value of `Integer.MIN_VALUE`.

- If the argument is positive infinity or any value greater than or
equal to the value of `Integer.MAX_VALUE`, the result is
equal to the value of `Integer.MAX_VALUE`.

Parameters:

- `a`: a floating-point value to be rounded to an integer.

**Returns:** the value of the argument rounded to the nearest
         `int` value.

**See also:** java.lang.Integer#MAX_VALUE

**See also:** java.lang.Integer#MIN_VALUE

## StrictMath.round(double)

```java
public static long round(double a)
```

Returns the closest `long` to the argument, with ties
rounding to positive infinity.

Special cases:

- If the argument is NaN, the result is 0.

- If the argument is negative infinity or any value less than or
equal to the value of `Long.MIN_VALUE`, the result is
equal to the value of `Long.MIN_VALUE`.

- If the argument is positive infinity or any value greater than or
equal to the value of `Long.MAX_VALUE`, the result is
equal to the value of `Long.MAX_VALUE`.

Parameters:

- `a`: a floating-point value to be rounded to a `long`.

**Returns:** the value of the argument rounded to the nearest
         `long` value.

**See also:** java.lang.Long#MAX_VALUE

**See also:** java.lang.Long#MIN_VALUE

## StrictMath.random()

```java
public static double random()
```

Returns a `double` value with a positive sign, greater
than or equal to `0.0` and less than `1.0`.
Returned values are chosen pseudorandomly with (approximately)
uniform distribution from that range.

When this method is first called, it creates a single new
pseudorandom-number generator, exactly as if by the expression

`new java.util.Random()`

This new pseudorandom-number generator is used thereafter for
all calls to this method and is used nowhere else.

This method is properly synchronized to allow correct use by
more than one thread. However, if many threads need to generate
pseudorandom numbers at a great rate, it may reduce contention
for each thread to have its own pseudorandom-number generator.

**Returns:** a pseudorandom `double` greater than or equal
to `0.0` and less than `1.0`.

**See also:** Random#nextDouble()

## StrictMath.addExact(int, int)

```java
public static int addExact(int x, int y)
```

Returns the sum of its arguments,
throwing an exception if the result overflows an `int`.

Parameters:

- `x`: the first value
- `y`: the second value

**Returns:** the result

**See also:** Math#addExact(int,int)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows an int

## StrictMath.addExact(long, long)

```java
public static long addExact(long x, long y)
```

Returns the sum of its arguments,
throwing an exception if the result overflows a `long`.

Parameters:

- `x`: the first value
- `y`: the second value

**Returns:** the result

**See also:** Math#addExact(long,long)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows a long

## StrictMath.subtractExact(int, int)

```java
public static int subtractExact(int x, int y)
```

Returns the difference of the arguments,
throwing an exception if the result overflows an `int`.

Parameters:

- `x`: the first value
- `y`: the second value to subtract from the first

**Returns:** the result

**See also:** Math#subtractExact(int,int)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows an int

## StrictMath.subtractExact(long, long)

```java
public static long subtractExact(long x, long y)
```

Returns the difference of the arguments,
throwing an exception if the result overflows a `long`.

Parameters:

- `x`: the first value
- `y`: the second value to subtract from the first

**Returns:** the result

**See also:** Math#subtractExact(long,long)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows a long

## StrictMath.multiplyExact(int, int)

```java
public static int multiplyExact(int x, int y)
```

Returns the product of the arguments,
throwing an exception if the result overflows an `int`.

Parameters:

- `x`: the first value
- `y`: the second value

**Returns:** the result

**See also:** Math#multiplyExact(int,int)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows an int

## StrictMath.multiplyExact(long, int)

```java
public static long multiplyExact(long x, int y)
```

Returns the product of the arguments, throwing an exception if the result
overflows a `long`.

Parameters:

- `x`: the first value
- `y`: the second value

**Returns:** the result

**See also:** Math#multiplyExact(long,int)

**Since:** 9

Throws:

- `ArithmeticException`: if the result overflows a long

## StrictMath.multiplyExact(long, long)

```java
public static long multiplyExact(long x, long y)
```

Returns the product of the arguments,
throwing an exception if the result overflows a `long`.

Parameters:

- `x`: the first value
- `y`: the second value

**Returns:** the result

**See also:** Math#multiplyExact(long,long)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows a long

## StrictMath.divideExact(int, int)

```java
public static int divideExact(int x, int y)
```

Returns the quotient of the arguments, throwing an exception if the
result overflows an `int`.  Such overflow occurs in this method if
`x` is `Integer.MIN_VALUE` and `y` is `-1`.
In contrast, if `Integer.MIN_VALUE / -1` were evaluated directly,
the result would be `Integer.MIN_VALUE` and no exception would be
thrown.

If `y` is zero, an `ArithmeticException` is thrown
(JLS ).

The built-in remainder operator "`%`" is a suitable counterpart
both for this method and for the built-in division operator "`/`".

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the quotient `x / y`

**JLS:** 15.17.2 Division Operator /

**See also:** Math#divideExact(int,int)

**Since:** 18

Throws:

- `ArithmeticException`: if `y` is zero or the quotient overflows an int

## StrictMath.divideExact(long, long)

```java
public static long divideExact(long x, long y)
```

Returns the quotient of the arguments, throwing an exception if the
result overflows a `long`.  Such overflow occurs in this method if
`x` is `Long.MIN_VALUE` and `y` is `-1`.
In contrast, if `Long.MIN_VALUE / -1` were evaluated directly,
the result would be `Long.MIN_VALUE` and no exception would be
thrown.

If `y` is zero, an `ArithmeticException` is thrown
(JLS ).

The built-in remainder operator "`%`" is a suitable counterpart
both for this method and for the built-in division operator "`/`".

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the quotient `x / y`

**JLS:** 15.17.2 Division Operator /

**See also:** Math#divideExact(long,long)

**Since:** 18

Throws:

- `ArithmeticException`: if `y` is zero or the quotient overflows a long
