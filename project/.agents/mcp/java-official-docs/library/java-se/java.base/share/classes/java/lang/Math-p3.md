---
title: "Math class (java.lang) (part 3 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Math.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Math class (java.lang) (part 3 of 6)

## Math.floorDivExact(int, int)

```java
public static int floorDivExact(int x, int y)
```

Returns the largest (closest to positive infinity)
`int` value that is less than or equal to the algebraic quotient.
This method is identical to `floorDiv(int,int)` except that it
throws an `ArithmeticException` when the dividend is
Integer.MIN_VALUE and the divisor is
`-1` instead of ignoring the integer overflow and returning
`Integer.MIN_VALUE`.

The floor modulus method `floorMod(int,int)` is a suitable
counterpart both for this method and for the `floorDiv(int,int)`
method.

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the largest (closest to positive infinity)
`int` value that is less than or equal to the algebraic quotient.

**See also:** #floorDiv(int, int)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero, or the dividend `x` is `Integer.MIN_VALUE` and the divisor `y` is `-1`.

## Math.floorDivExact(long, long)

```java
public static long floorDivExact(long x, long y)
```

Returns the largest (closest to positive infinity)
`long` value that is less than or equal to the algebraic quotient.
This method is identical to `floorDiv(long,long)` except that it
throws an `ArithmeticException` when the dividend is
Long.MIN_VALUE and the divisor is
`-1` instead of ignoring the integer overflow and returning
`Long.MIN_VALUE`.

The floor modulus method `floorMod(long,long)` is a suitable
counterpart both for this method and for the `floorDiv(long,long)`
method.

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the largest (closest to positive infinity)
`long` value that is less than or equal to the algebraic quotient.

**See also:** #floorDiv(long,long)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero, or the dividend `x` is `Long.MIN_VALUE` and the divisor `y` is `-1`.

## Math.ceilDivExact(int, int)

```java
public static int ceilDivExact(int x, int y)
```

Returns the smallest (closest to negative infinity)
`int` value that is greater than or equal to the algebraic quotient.
This method is identical to `ceilDiv(int,int)` except that it
throws an `ArithmeticException` when the dividend is
Integer.MIN_VALUE and the divisor is
`-1` instead of ignoring the integer overflow and returning
`Integer.MIN_VALUE`.

The ceil modulus method `ceilMod(int,int)` is a suitable
counterpart both for this method and for the `ceilDiv(int,int)`
method.

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the smallest (closest to negative infinity)
`int` value that is greater than or equal to the algebraic quotient.

**See also:** #ceilDiv(int, int)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero, or the dividend `x` is `Integer.MIN_VALUE` and the divisor `y` is `-1`.

## Math.ceilDivExact(long, long)

```java
public static long ceilDivExact(long x, long y)
```

Returns the smallest (closest to negative infinity)
`long` value that is greater than or equal to the algebraic quotient.
This method is identical to `ceilDiv(long,long)` except that it
throws an `ArithmeticException` when the dividend is
Long.MIN_VALUE and the divisor is
`-1` instead of ignoring the integer overflow and returning
`Long.MIN_VALUE`.

The ceil modulus method `ceilMod(long,long)` is a suitable
counterpart both for this method and for the `ceilDiv(long,long)`
method.

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the smallest (closest to negative infinity)
`long` value that is greater than or equal to the algebraic quotient.

**See also:** #ceilDiv(long,long)

**Since:** 18

Throws:

- `ArithmeticException`: if the divisor `y` is zero, or the dividend `x` is `Long.MIN_VALUE` and the divisor `y` is `-1`.

## Math.incrementExact(int)

```java
public static int incrementExact(int a)
```

Returns the argument incremented by one, throwing an exception if the
result overflows an `int`.
The overflow only occurs for the maximum value.

Parameters:

- `a`: the value to increment

**Returns:** the result

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows an int

## Math.incrementExact(long)

```java
public static long incrementExact(long a)
```

Returns the argument incremented by one, throwing an exception if the
result overflows a `long`.
The overflow only occurs for the maximum value.

Parameters:

- `a`: the value to increment

**Returns:** the result

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows a long

## Math.decrementExact(int)

```java
public static int decrementExact(int a)
```

Returns the argument decremented by one, throwing an exception if the
result overflows an `int`.
The overflow only occurs for the minimum value.

Parameters:

- `a`: the value to decrement

**Returns:** the result

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows an int

## Math.decrementExact(long)

```java
public static long decrementExact(long a)
```

Returns the argument decremented by one, throwing an exception if the
result overflows a `long`.
The overflow only occurs for the minimum value.

Parameters:

- `a`: the value to decrement

**Returns:** the result

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows a long

## Math.negateExact(int)

```java
public static int negateExact(int a)
```

Returns the negation of the argument, throwing an exception if the
result overflows an `int`.
The overflow only occurs for the minimum value.

Parameters:

- `a`: the value to negate

**Returns:** the result

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows an int

## Math.negateExact(long)

```java
public static long negateExact(long a)
```

Returns the negation of the argument, throwing an exception if the
result overflows a `long`.
The overflow only occurs for the minimum value.

Parameters:

- `a`: the value to negate

**Returns:** the result

**Since:** 1.8

Throws:

- `ArithmeticException`: if the result overflows a long

## Math.toIntExact(long)

```java
public static int toIntExact(long value)
```

Returns the value of the `long` argument,
throwing an exception if the value overflows an `int`.

Parameters:

- `value`: the long value

**Returns:** the argument as an int

**Since:** 1.8

Throws:

- `ArithmeticException`: if the `argument` overflows an int

## Math.multiplyFull(int, int)

```java
public static long multiplyFull(int x, int y)
```

Returns the exact mathematical product of the arguments.

Parameters:

- `x`: the first value
- `y`: the second value

**Returns:** the result

**Since:** 9

## Math.multiplyHigh(long, long)

```java
public static long multiplyHigh(long x, long y)
```

Returns as a `long` the most significant 64 bits of the 128-bit
product of two 64-bit factors.

Parameters:

- `x`: the first value
- `y`: the second value

**Returns:** the result

**See also:** #unsignedMultiplyHigh

**Since:** 9

## Math.unsignedMultiplyHigh(long, long)

```java
public static long unsignedMultiplyHigh(long x, long y)
```

Returns as a `long` the most significant 64 bits of the unsigned
128-bit product of two unsigned 64-bit factors.

Parameters:

- `x`: the first value
- `y`: the second value

**Returns:** the result

**See also:** #multiplyHigh

**Since:** 18

## Math.floorDiv(int, int)

```java
public static int floorDiv(int x, int y)
```

Returns the largest (closest to positive infinity)
`int` value that is less than or equal to the algebraic quotient.
There is one special case: if the dividend is
Integer.MIN_VALUE and the divisor is `-1`,
then integer overflow occurs and
the result is equal to `Integer.MIN_VALUE`.

Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
negative infinity (floor) rounding mode.
The floor rounding mode gives different results from truncation
when the exact quotient is not an integer and is negative.

- If the signs of the arguments are the same, the results of
      `floorDiv` and the `/` operator are the same.

      For example, `floorDiv(4, 3) == 1` and `(4 / 3) == 1`.

- If the signs of the arguments are different, `floorDiv`
      returns the largest integer less than or equal to the quotient
      while the `/` operator returns the smallest integer greater
      than or equal to the quotient.
      They differ if and only if the quotient is not an integer.

      For example, `floorDiv(-4, 3) == -2`,
      whereas `(-4 / 3) == -1`.

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the largest (closest to positive infinity)
`int` value that is less than or equal to the algebraic quotient.

**See also:** #floorMod(int, int)

**See also:** #floor(double)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.floorDiv(long, int)

```java
public static long floorDiv(long x, int y)
```

Returns the largest (closest to positive infinity)
`long` value that is less than or equal to the algebraic quotient.
There is one special case: if the dividend is
Long.MIN_VALUE and the divisor is `-1`,
then integer overflow occurs and
the result is equal to `Long.MIN_VALUE`.

Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
negative infinity (floor) rounding mode.
The floor rounding mode gives different results from truncation
when the exact result is not an integer and is negative.

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the largest (closest to positive infinity)
`long` value that is less than or equal to the algebraic quotient.

**See also:** #floorMod(long, int)

**See also:** #floor(double)

**Since:** 9

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.floorDiv(long, long)

```java
public static long floorDiv(long x, long y)
```

Returns the largest (closest to positive infinity)
`long` value that is less than or equal to the algebraic quotient.
There is one special case: if the dividend is
Long.MIN_VALUE and the divisor is `-1`,
then integer overflow occurs and
the result is equal to `Long.MIN_VALUE`.

Normal integer division operates under the round to zero rounding mode
(truncation).  This operation instead acts under the round toward
negative infinity (floor) rounding mode.
The floor rounding mode gives different results from truncation
when the exact result is not an integer and is negative.

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the largest (closest to positive infinity)
`long` value that is less than or equal to the algebraic quotient.

**See also:** #floorMod(long, long)

**See also:** #floor(double)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.floorMod(int, int)

```java
public static int floorMod(int x, int y)
```

Returns the floor modulus of the `int` arguments.

The floor modulus is `r = x - (floorDiv(x, y) * y)`,
has the same sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `floorDiv` and `floorMod` is such that:

- `floorDiv(x, y) * y + floorMod(x, y) == x`

The difference in values between `floorMod` and the `%` operator
is due to the difference between `floorDiv` and the `/`
operator, as detailed in int).

Examples:

- Regardless of the signs of the arguments, `floorMod`(x, y)
      is zero exactly when `x % y` is zero as well.

- If neither `floorMod`(x, y) nor `x % y` is zero,
      they differ exactly when the signs of the arguments differ.

- `floorMod(+4, +3) == +1`;   and `(+4 % +3) == +1`

- `floorMod(-4, -3) == -1`;   and `(-4 % -3) == -1`

- `floorMod(+4, -3) == -2`;   and `(+4 % -3) == +1`

- `floorMod(-4, +3) == +2`;   and `(-4 % +3) == -1`

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the floor modulus `x - (floorDiv(x, y) * y)`

**See also:** #floorDiv(int, int)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.floorMod(long, int)

```java
public static int floorMod(long x, int y)
```

Returns the floor modulus of the `long` and `int` arguments.

The floor modulus is `r = x - (floorDiv(x, y) * y)`,
has the same sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `floorDiv` and `floorMod` is such that:

- `floorDiv(x, y) * y + floorMod(x, y) == x`

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the floor modulus `x - (floorDiv(x, y) * y)`

**See also:** #floorDiv(long, int)

**Since:** 9

Throws:

- `ArithmeticException`: if the divisor `y` is zero

## Math.floorMod(long, long)

```java
public static long floorMod(long x, long y)
```

Returns the floor modulus of the `long` arguments.

The floor modulus is `r = x - (floorDiv(x, y) * y)`,
has the same sign as the divisor `y` or is zero, and
is in the range of `-abs(y) < r < +abs(y)`.

The relationship between `floorDiv` and `floorMod` is such that:

- `floorDiv(x, y) * y + floorMod(x, y) == x`

For examples, see int).

Parameters:

- `x`: the dividend
- `y`: the divisor

**Returns:** the floor modulus `x - (floorDiv(x, y) * y)`

**See also:** #floorDiv(long, long)

**Since:** 1.8

Throws:

- `ArithmeticException`: if the divisor `y` is zero
