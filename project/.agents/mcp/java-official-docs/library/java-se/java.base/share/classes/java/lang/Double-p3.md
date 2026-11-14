---
title: "Double class (java.lang) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Double.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Double class (java.lang) (part 3 of 3)

## Double.toString()

```java
public String toString()
```

Returns a string representation of this `Double` object.
The primitive `double` value represented by this
object is converted to a string exactly as if by the method
`toString` of one argument.

**Returns:** a `String` representation of this object.

**See also:** java.lang.Double#toString(double)

## Double.byteValue()

```java
public byte byteValue()
```

Returns the value of this `Double` as a `byte`
after a narrowing primitive conversion.

**Returns:** the `double` value represented by this object
         converted to type `byte`

**JLS:** 5.1.3 Narrowing Primitive Conversion

**Since:** 1.1

## Double.shortValue()

```java
public short shortValue()
```

Returns the value of this `Double` as a `short`
after a narrowing primitive conversion.

**Returns:** the `double` value represented by this object
         converted to type `short`

**JLS:** 5.1.3 Narrowing Primitive Conversion

**Since:** 1.1

## Double.intValue()

```java
public int intValue()
```

Returns the value of this `Double` as an `int`
after a narrowing primitive conversion.

**JLS:** 5.1.3 Narrowing Primitive Conversion

**API note:** This method corresponds to the convertToIntegerTowardZero
operation defined in IEEE 754.

**Returns:** the `double` value represented by this object
         converted to type `int`

## Double.longValue()

```java
public long longValue()
```

Returns the value of this `Double` as a `long`
after a narrowing primitive conversion.

**API note:** This method corresponds to the convertToIntegerTowardZero
operation defined in IEEE 754.

**Returns:** the `double` value represented by this object
         converted to type `long`

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Double.floatValue()

```java
public float floatValue()
```

Returns the value of this `Double` as a `float`
after a narrowing primitive conversion.

**API note:** This method corresponds to the convertFormat operation defined
in IEEE 754.

**Returns:** the `double` value represented by this object
         converted to type `float`

**JLS:** 5.1.3 Narrowing Primitive Conversion

**Since:** 1.0

## Double.doubleValue()

```java
public double doubleValue()
```

Returns the `double` value of this `Double` object.

**Returns:** the `double` value represented by this object

## Double.hashCode()

```java
public int hashCode()
```

Returns a hash code for this `Double` object. The
result is the exclusive OR of the two halves of the
`long` integer bit representation, exactly as
produced by the method `doubleToLongBits(double)`, of
the primitive `double` value represented by this
`Double` object. That is, the hash code is the value
of the expression:

 `(int)(v^(v>>>32))`

where `v` is defined by:

 `long v = Double.doubleToLongBits(this.doubleValue());`

**Returns:** a `hash code` value for this object.

## Double.hashCode(double)

```java
public static int hashCode(double value)
```

Returns a hash code for a `double` value; compatible with
`Double.hashCode()`.

Parameters:

- `value`: the value to hash

**Returns:** a hash code value for a `double` value.

**Since:** 1.8

## Double.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object against the specified object.  The result
is `true` if and only if the argument is not
`null` and is a `Double` object that
represents a `double` that has the same value as the
`double` represented by this object. For this
purpose, two `double` values are considered to be
the same if and only if the method `doubleToLongBits(double)` returns the identical
`long` value when applied to each.

**API note:** This method is defined in terms of `doubleToLongBits(double)` rather than the `==` operator
on `double` values since the `==` operator does
*not* define an equivalence relation and to satisfy the
equals contract an equivalence
relation must be implemented; see this discussion for details of floating-point equality and equivalence.

**See also:** java.lang.Double#doubleToLongBits(double)

**JLS:** 15.21.1 Numerical Equality Operators == and !=

## Double.doubleToLongBits(double)

```java
public static long doubleToLongBits(double value)
```

Returns a representation of the specified floating-point value
according to the IEEE 754 floating-point "double
format" bit layout.

Bit 63 (the bit that is selected by the mask
`0x8000000000000000L`) represents the sign of the
floating-point number. Bits
62-52 (the bits that are selected by the mask
`0x7ff0000000000000L`) represent the exponent. Bits 51-0
(the bits that are selected by the mask
`0x000fffffffffffffL`) represent the significand
(sometimes called the mantissa) of the floating-point number.

If the argument is positive infinity, the result is
`0x7ff0000000000000L`.

If the argument is negative infinity, the result is
`0xfff0000000000000L`.

If the argument is NaN, the result is
`0x7ff8000000000000L`.

In all cases, the result is a `long` integer that, when
given to the `longBitsToDouble(long)` method, will produce a
floating-point value the same as the argument to
`doubleToLongBits` (except all NaN values are
collapsed to a single "canonical" NaN value).

Parameters:

- `value`: a `double` precision floating-point number.

**Returns:** the bits that represent the floating-point number.

## Double.doubleToRawLongBits(double)

```java
public static native long doubleToRawLongBits(double value)
```

Returns a representation of the specified floating-point value
according to the IEEE 754 floating-point "double
format" bit layout, preserving Not-a-Number (NaN) values.

Bit 63 (the bit that is selected by the mask
`0x8000000000000000L`) represents the sign of the
floating-point number. Bits
62-52 (the bits that are selected by the mask
`0x7ff0000000000000L`) represent the exponent. Bits 51-0
(the bits that are selected by the mask
`0x000fffffffffffffL`) represent the significand
(sometimes called the mantissa) of the floating-point number.

If the argument is positive infinity, the result is
`0x7ff0000000000000L`.

If the argument is negative infinity, the result is
`0xfff0000000000000L`.

If the argument is NaN, the result is the `long`
integer representing the actual NaN value.  Unlike the
`doubleToLongBits` method,
`doubleToRawLongBits` does not collapse all the bit
patterns encoding a NaN to a single "canonical" NaN
value.

In all cases, the result is a `long` integer that,
when given to the `longBitsToDouble(long)` method, will
produce a floating-point value the same as the argument to
`doubleToRawLongBits`.

Parameters:

- `value`: a `double` precision floating-point number.

**Returns:** the bits that represent the floating-point number.

**Since:** 1.3

## Double.longBitsToDouble(long)

```java
public static native double longBitsToDouble(long bits)
```

Returns the `double` value corresponding to a given
bit representation.
The argument is considered to be a representation of a
floating-point value according to the IEEE 754 floating-point
"double format" bit layout.

If the argument is `0x7ff0000000000000L`, the result
is positive infinity.

If the argument is `0xfff0000000000000L`, the result
is negative infinity.

If the argument is any value in the range
`0x7ff0000000000001L` through
`0x7fffffffffffffffL` or in the range
`0xfff0000000000001L` through
`0xffffffffffffffffL`, the result is a NaN.  No IEEE
754 floating-point operation provided by Java can distinguish
between two NaN values of the same type with different bit
patterns.  Distinct values of NaN are only distinguishable by
use of the `Double.doubleToRawLongBits` method.

In all other cases, let *s*, *e*, and *m* be three
values that can be computed from the argument:

Then the floating-point result equals the value of the mathematical
expression *s*&middot;*m*&middot;2*e*-1075.

Note that this method may not be able to return a
`double` NaN with exactly same bit pattern as the
`long` argument.  IEEE 754 distinguishes between two
kinds of NaNs, quiet NaNs and *signaling NaNs*.  The
differences between the two kinds of NaN are generally not
visible in Java.  Arithmetic operations on signaling NaNs turn
them into quiet NaNs with a different, but often similar, bit
pattern.  However, on some processors merely copying a
signaling NaN also performs that conversion.  In particular,
copying a signaling NaN to return it to the calling method
may perform this conversion.  So `longBitsToDouble`
may not be able to return a `double` with a
signaling NaN bit pattern.  Consequently, for some
`long` values,
`doubleToRawLongBits(longBitsToDouble(start))` may
*not* equal `start`.  Moreover, which
particular bit patterns represent signaling NaNs is platform
dependent; although all NaN bit patterns, quiet or signaling,
must be in the NaN range identified above.

Parameters:

- `bits`: any `long` integer.

**Returns:** the `double` floating-point value with the same
         bit pattern.

## Double.compareTo(Double)

```java
public int compareTo(Double anotherDouble)
```

Compares two `Double` objects numerically.

This method imposes a total order on `Double` objects
with two differences compared to the incomplete order defined by
the Java language numerical comparison operators (`<, <=, ==, >=, >`) on `double` values.

-  A NaN is *unordered* with respect to other
         values and unequal to itself under the comparison
         operators.  This method chooses to define `Double.NaN` to be equal to itself and greater than all
         other `double` values (including `Double.POSITIVE_INFINITY`).

-  Positive zero and negative zero compare equal
     numerically, but are distinct and distinguishable values.
     This method chooses to define positive zero (`+0.0d`),
     to be greater than negative zero (`-0.0d`).

This ensures that the *natural ordering* of `Double`
objects imposed by this method is *consistent with
equals*; see this discussion for details of floating-point comparison and ordering.

Parameters:

- `anotherDouble`: the `Double` to be compared.

**Returns:** the value `0` if `anotherDouble` is
         numerically equal to this `Double`; a value
         less than `0` if this `Double`
         is numerically less than `anotherDouble`;
         and a value greater than `0` if this
         `Double` is numerically greater than
         `anotherDouble`.

**JLS:** 15.20.1 Numerical Comparison Operators `<`, `<=`, `>`, and `>=`

**Since:** 1.2

## Double.compare(double, double)

```java
public static int compare(double d1, double d2)
```

Compares the two specified `double` values. The sign
of the integer value returned is the same as that of the
integer that would be returned by the call:

```java
   Double.valueOf(d1).compareTo(Double.valueOf(d2))
```

Parameters:

- `d1`: the first `double` to compare
- `d2`: the second `double` to compare

**Returns:** the value `0` if `d1` is
         numerically equal to `d2`; a value less than
         `0` if `d1` is numerically less than
         `d2`; and a value greater than `0`
         if `d1` is numerically greater than
         `d2`.

**Since:** 1.4

## Double.sum(double, double)

```java
public static double sum(double a, double b)
```

Adds two `double` values together as per the + operator.

Parameters:

- `a`: the first operand
- `b`: the second operand

**API note:** This method corresponds to the addition operation
defined in IEEE 754.

**Returns:** the sum of `a` and `b`

**JLS:** 4.2.4 Floating-Point Operations

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Double.max(double, double)

```java
public static double max(double a, double b)
```

Returns the greater of two `double` values
as if by calling double) Math.max.

Parameters:

- `a`: the first operand
- `b`: the second operand

**API note:** This method corresponds to the maximum operation defined in
IEEE 754.

**Returns:** the greater of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Double.min(double, double)

```java
public static double min(double a, double b)
```

Returns the smaller of two `double` values
as if by calling double) Math.min.

Parameters:

- `a`: the first operand
- `b`: the second operand

**API note:** This method corresponds to the minimum operation defined in
IEEE 754.

**Returns:** the smaller of `a` and `b`.

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Double.describeConstable()

```java
public Optional<Double> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance, which is the instance itself.

**Returns:** an `Optional` describing the `Double` instance

**Since:** 12

## Double.resolveConstantDesc(MethodHandles.Lookup)

```java
public Double resolveConstantDesc(MethodHandles.Lookup lookup)
```

Resolves this instance as a `ConstantDesc`, the result of which is
the instance itself.

Parameters:

- `lookup`: ignored

**Returns:** the `Double` instance

**Since:** 12
