---
title: "Float class (java.lang) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Float.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Float class (java.lang) (part 2 of 3)

## Float.parseFloat(String)

```java
public static float parseFloat(String s) throws NumberFormatException
```

Returns a new `float` initialized to the value
represented by the specified `String`, as performed
by the `valueOf` method of class `Float`.

Parameters:

- `s`: the string to be parsed.

**Returns:** the `float` value represented by the string
        argument.

**See also:** java.lang.Float#valueOf(String)

**See also:** Double##decimalToBinaryConversion Decimal &harr; Binary Conversion Issues

**Since:** 1.2

Throws:

- `NullPointerException`: if the string is null
- `NumberFormatException`: if the string does not contain a parsable `float`.

## Float.isNaN(float)

```java
public static boolean isNaN(float v)
```

Returns `true` if the specified number is a
Not-a-Number (NaN) value, `false` otherwise.

Parameters:

- `v`: the value to be tested.

**API note:** This method corresponds to the isNaN operation defined in IEEE
754.

**Returns:** `true` if the argument is NaN;
         `false` otherwise.

## Float.isInfinite(float)

```java
public static boolean isInfinite(float v)
```

Returns `true` if the specified number is infinitely
large in magnitude, `false` otherwise.

Parameters:

- `v`: the value to be tested.

**API note:** This method corresponds to the isInfinite operation defined in
IEEE 754.

**Returns:** `true` if the argument is positive infinity or
         negative infinity; `false` otherwise.

## Float.isFinite(float)

```java
public static boolean isFinite(float f)
```

Returns `true` if the argument is a finite floating-point
value; returns `false` otherwise (for NaN and infinity
arguments).

Parameters:

- `f`: the `float` value to be tested

**API note:** This method corresponds to the isFinite operation defined in
IEEE 754.

**Returns:** `true` if the argument is a finite
floating-point value, `false` otherwise.

**Since:** 1.8

## Float.Float(float)

```java
public Float(float value)
```

Constructs a newly allocated `Float` object that
represents the primitive `float` argument.

Parameters:

- `value`: the value to be represented by the `Float`.

**Deprecated:** It is rarely appropriate to use this constructor. The static factory
`valueOf(float)` is generally a better choice, as it is
likely to yield significantly better space and time performance.

## Float.Float(double)

```java
public Float(double value)
```

Constructs a newly allocated `Float` object that
represents the argument converted to type `float`.

Parameters:

- `value`: the value to be represented by the `Float`.

**Deprecated:** It is rarely appropriate to use this constructor. Instead, use the
static factory method `valueOf(float)` method as follows:
`Float.valueOf((float)value)`.

## Float.Float(String)

```java
public Float(String s) throws NumberFormatException
```

Constructs a newly allocated `Float` object that
represents the floating-point value of type `float`
represented by the string. The string is converted to a
`float` value as if by the `valueOf` method.

Parameters:

- `s`: a string to be converted to a `Float`.

**Deprecated:** It is rarely appropriate to use this constructor.
Use `parseFloat(String)` to convert a string to a
`float` primitive, or use `valueOf(String)`
to convert a string to a `Float` object.

Throws:

- `NumberFormatException`: if the string does not contain a parsable number.

## Float.isNaN()

```java
public boolean isNaN()
```

Returns `true` if this `Float` value is a
Not-a-Number (NaN), `false` otherwise.

**Returns:** `true` if the value represented by this object is
         NaN; `false` otherwise.

## Float.isInfinite()

```java
public boolean isInfinite()
```

Returns `true` if this `Float` value is
infinitely large in magnitude, `false` otherwise.

**Returns:** `true` if the value represented by this object is
         positive infinity or negative infinity;
         `false` otherwise.

## Float.toString()

```java
public String toString()
```

Returns a string representation of this `Float` object.
The primitive `float` value represented by this object
is converted to a `String` exactly as if by the method
`toString` of one argument.

**Returns:** a `String` representation of this object.

**See also:** java.lang.Float#toString(float)

## Float.byteValue()

```java
public byte byteValue()
```

Returns the value of this `Float` as a `byte` after
a narrowing primitive conversion.

**Returns:** the `float` value represented by this object
         converted to type `byte`

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Float.shortValue()

```java
public short shortValue()
```

Returns the value of this `Float` as a `short`
after a narrowing primitive conversion.

**Returns:** the `float` value represented by this object
         converted to type `short`

**JLS:** 5.1.3 Narrowing Primitive Conversion

**Since:** 1.1

## Float.intValue()

```java
public int intValue()
```

Returns the value of this `Float` as an `int` after
a narrowing primitive conversion.

**API note:** This method corresponds to the convertToIntegerTowardZero
operation defined in IEEE 754.

**Returns:** the `float` value represented by this object
         converted to type `int`

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Float.longValue()

```java
public long longValue()
```

Returns value of this `Float` as a `long` after a
narrowing primitive conversion.

**API note:** This method corresponds to the convertToIntegerTowardZero
operation defined in IEEE 754.

**Returns:** the `float` value represented by this object
         converted to type `long`

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Float.floatValue()

```java
public float floatValue()
```

Returns the `float` value of this `Float` object.

**Returns:** the `float` value represented by this object

## Float.doubleValue()

```java
public double doubleValue()
```

Returns the value of this `Float` as a `double`
after a widening primitive conversion.

**API note:** This method corresponds to the convertFormat operation defined
in IEEE 754.

**Returns:** the `float` value represented by this
        object converted to type `double`

**JLS:** 5.1.2 Widening Primitive Conversion

## Float.hashCode()

```java
public int hashCode()
```

Returns a hash code for this `Float` object. The
result is the integer bit representation, exactly as produced
by the method `floatToIntBits(float)`, of the primitive
`float` value represented by this `Float`
object.

**Returns:** a hash code value for this object.

## Float.hashCode(float)

```java
public static int hashCode(float value)
```

Returns a hash code for a `float` value; compatible with
`Float.hashCode()`.

Parameters:

- `value`: the value to hash

**Returns:** a hash code value for a `float` value.

**Since:** 1.8

## Float.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object against the specified object.  The result
is `true` if and only if the argument is not
`null` and is a `Float` object that
represents a `float` with the same value as the
`float` represented by this object. For this
purpose, two `float` values are considered to be the
same if and only if the method `floatToIntBits(float)`
returns the identical `int` value when applied to
each.

Parameters:

- `obj`: the object to be compared

**API note:** This method is defined in terms of `floatToIntBits(float)` rather than the `==` operator on
`float` values since the `==` operator does
*not* define an equivalence relation and to satisfy the
equals contract an equivalence
relation must be implemented; see this discussion for details of floating-point equality and equivalence.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

**See also:** java.lang.Float#floatToIntBits(float)

**JLS:** 15.21.1 Numerical Equality Operators == and !=

## Float.floatToIntBits(float)

```java
public static int floatToIntBits(float value)
```

Returns a representation of the specified floating-point value
according to the IEEE 754 floating-point "single format" bit
layout.

Bit 31 (the bit that is selected by the mask
`0x80000000`) represents the sign of the floating-point
number.
Bits 30-23 (the bits that are selected by the mask
`0x7f800000`) represent the exponent.
Bits 22-0 (the bits that are selected by the mask
`0x007fffff`) represent the significand (sometimes called
the mantissa) of the floating-point number.

If the argument is positive infinity, the result is
`0x7f800000`.

If the argument is negative infinity, the result is
`0xff800000`.

If the argument is NaN, the result is `0x7fc00000`.

In all cases, the result is an integer that, when given to the
`intBitsToFloat(int)` method, will produce a floating-point
value the same as the argument to `floatToIntBits`
(except all NaN values are collapsed to a single
"canonical" NaN value).

Parameters:

- `value`: a floating-point number.

**Returns:** the bits that represent the floating-point number.

## Float.floatToRawIntBits(float)

```java
public static native int floatToRawIntBits(float value)
```

Returns a representation of the specified floating-point value
according to the IEEE 754 floating-point "single format" bit
layout, preserving Not-a-Number (NaN) values.

Bit 31 (the bit that is selected by the mask
`0x80000000`) represents the sign of the floating-point
number.
Bits 30-23 (the bits that are selected by the mask
`0x7f800000`) represent the exponent.
Bits 22-0 (the bits that are selected by the mask
`0x007fffff`) represent the significand (sometimes called
the mantissa) of the floating-point number.

If the argument is positive infinity, the result is
`0x7f800000`.

If the argument is negative infinity, the result is
`0xff800000`.

If the argument is NaN, the result is the integer representing
the actual NaN value.  Unlike the `floatToIntBits`
method, `floatToRawIntBits` does not collapse all the
bit patterns encoding a NaN to a single "canonical"
NaN value.

In all cases, the result is an integer that, when given to the
`intBitsToFloat(int)` method, will produce a
floating-point value the same as the argument to
`floatToRawIntBits`.

Parameters:

- `value`: a floating-point number.

**Returns:** the bits that represent the floating-point number.

**Since:** 1.3

## Float.intBitsToFloat(int)

```java
public static native float intBitsToFloat(int bits)
```

Returns the `float` value corresponding to a given
bit representation.
The argument is considered to be a representation of a
floating-point value according to the IEEE 754 floating-point
"single format" bit layout.

If the argument is `0x7f800000`, the result is positive
infinity.

If the argument is `0xff800000`, the result is negative
infinity.

If the argument is any value in the range
`0x7f800001` through `0x7fffffff` or in
the range `0xff800001` through
`0xffffffff`, the result is a NaN.  No IEEE 754
floating-point operation provided by Java can distinguish
between two NaN values of the same type with different bit
patterns.  Distinct values of NaN are only distinguishable by
use of the `Float.floatToRawIntBits` method.

In all other cases, let *s*, *e*, and *m* be three
values that can be computed from the argument:

Then the floating-point result equals the value of the mathematical
expression *s*&middot;*m*&middot;2*e*-150.

Note that this method may not be able to return a
`float` NaN with exactly same bit pattern as the
`int` argument.  IEEE 754 distinguishes between two
kinds of NaNs, quiet NaNs and *signaling NaNs*.  The
differences between the two kinds of NaN are generally not
visible in Java.  Arithmetic operations on signaling NaNs turn
them into quiet NaNs with a different, but often similar, bit
pattern.  However, on some processors merely copying a
signaling NaN also performs that conversion.  In particular,
copying a signaling NaN to return it to the calling method may
perform this conversion.  So `intBitsToFloat` may
not be able to return a `float` with a signaling NaN
bit pattern.  Consequently, for some `int` values,
`floatToRawIntBits(intBitsToFloat(start))` may
*not* equal `start`.  Moreover, which
particular bit patterns represent signaling NaNs is platform
dependent; although all NaN bit patterns, quiet or signaling,
must be in the NaN range identified above.

Parameters:

- `bits`: an integer.

**Returns:** the `float` floating-point value with the same bit
         pattern.

## Float.float16ToFloat(short)

```java
public static float float16ToFloat(short floatBinary16)
```

The conversion is exact; all binary16 values can
be exactly represented in `float`.

Special cases:

-  If the argument is zero, the result is a zero with the
same sign as the argument.

-  If the argument is infinite, the result is an infinity
with the same sign as the argument.

-  If the argument is a NaN, the result is a NaN.

#### IEEE 754 binary16 format

The IEEE 754 standard defines binary16 as a 16-bit format, along
with the 32-bit binary32 format (corresponding to the `float` type) and the 64-bit binary64 format (corresponding to
the `double` type). The binary16 format is similar to the
other IEEE 754 formats, except smaller, having all the usual
IEEE 754 values such as NaN, signed infinities, signed zeros,
and subnormals. The parameters (JLS ) for the
binary16 format are N = 11 precision bits, K = 5 exponent bits,
*E**max* = 15, and
*E**min* = -14.

Parameters:

- `floatBinary16`: the binary16 value to convert to `float`

**API note:** This method corresponds to the convertFormat operation defined
in IEEE 754 from the binary16 format to the binary32 format.
The operation of this method is analogous to a primitive
widening conversion (JLS ).

**Since:** 20

## Float.floatToFloat16(float)

```java
public static short floatToFloat16(float f)
```

The conversion is computed under the round to nearest even rounding mode.

Special cases:

-  If the argument is zero, the result is a zero with the
same sign as the argument.

-  If the argument is infinite, the result is an infinity
with the same sign as the argument.

-  If the argument is a NaN, the result is a NaN.

The binary16 format is discussed in
more detail in the `float16ToFloat` method.

Parameters:

- `f`: the `float` value to convert to binary16

**API note:** This method corresponds to the convertFormat operation defined
in IEEE 754 from the binary32 format to the binary16 format.
The operation of this method is analogous to a primitive
narrowing conversion (JLS ).

**Since:** 20
