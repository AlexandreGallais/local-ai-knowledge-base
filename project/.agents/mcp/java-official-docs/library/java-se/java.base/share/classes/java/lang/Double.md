---
title: "Double class (java.lang) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Double.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Double class (java.lang)

```java
public final class Double extends Number implements Comparable<Double>, Constable, ConstantDesc
```

The `Double` class is the wrapper class for values of the primitive
type `double`. An object of type `Double` contains a
single field whose type is `double`.

In addition, this class provides several methods for converting a
`double` to a `String` and a
`String` to a `double`, as well as other
constants and methods useful when dealing with a
`double`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

#### Floating-point Equality, Equivalence,
and Comparison

IEEE 754 floating-point values include finite nonzero values,
signed zeros (`+0.0` and `-0.0`), signed infinities
(positive infinity and
negative infinity), and
NaN (not-a-number).

An *equivalence relation* on a set of values is a boolean
relation on pairs of values that is reflexive, symmetric, and
transitive. For more discussion of equivalence relations and object
equality, see the Object.equals
specification. An equivalence relation partitions the values it
operates over into sets called *equivalence classes*.  All the
members of the equivalence class are equal to each other under the
relation. An equivalence class may contain only a single member. At
least for some purposes, all the members of an equivalence class
are substitutable for each other.  In particular, in a numeric
expression equivalent values can be *substituted* for one
another without changing the result of the expression, meaning
changing the equivalence class of the result of the expression.

Notably, the built-in `==` operation on floating-point
values is *not* an equivalence relation. Despite not
defining an equivalence relation, the semantics of the IEEE 754
`==` operator were deliberately designed to meet other needs
of numerical computation. There are two exceptions where the
properties of an equivalence relation are not satisfied by `==` on floating-point values:

- If `v1` and `v2` are both NaN, then `v1 == v2` has the value `false`. Therefore, for two NaN
arguments the *reflexive* property of an equivalence
relation is *not* satisfied by the `==` operator.

- If `v1` represents `+0.0` while `v2`
represents `-0.0`, or vice versa, then `v1 == v2` has
the value `true` even though `+0.0` and `-0.0`
are distinguishable under various floating-point operations. For
example, `1.0/+0.0` evaluates to positive infinity while
`1.0/-0.0` evaluates to *negative* infinity and
positive infinity and negative infinity are neither equal to each
other nor equivalent to each other. Thus, while a signed zero input
most commonly determines the sign of a zero result, because of
dividing by zero, `+0.0` and `-0.0` may not be
substituted for each other in general. The sign of a zero input
also has a non-substitutable effect on the result of some math
library methods.

For ordered comparisons using the built-in comparison operators
(`<`, `<=`, etc.), NaN values have another anomalous
situation: a NaN is neither less than, nor greater than, nor equal
to any value, including itself. This means the *trichotomy of
comparison* does *not* hold.

To provide the appropriate semantics for `equals` and
`compareTo` methods, those methods cannot simply be wrappers
around `==` or ordered comparison operations. Instead, equals uses representation equivalence, defining NaN arguments to be equal to each other,
restoring reflexivity, and defining `+0.0` to *not* be
equal to `-0.0`. For comparisons, compareTo defines a total order where `-0.0` is less than
`+0.0` and where a NaN is equal to itself and considered
greater than positive infinity.

The operational semantics of `equals` and `compareTo` are expressed in terms of bit-wise converting the floating-point values to integral values.

The *natural ordering* implemented by compareTo is consistent with equals. That
is, two objects are reported as equal by `equals` if and only
if `compareTo` on those objects returns zero.

The adjusted behaviors defined for `equals` and `compareTo` allow instances of wrapper classes to work properly with
conventional data structures. For example, defining NaN
values to be `equals` to one another allows NaN to be used as
an element of a HashSet or as the key of
a HashMap. Similarly, defining `compareTo` as a total ordering, including `+0.0`, `-0.0`, and NaN, allows instances of wrapper classes to be used as
elements of a SortedSet or as keys of a
SortedMap.

Comparing numerical equality to various useful equivalence
relations that can be defined over floating-point values:

 (`==`
operator): (*Not* an equivalence relation)
Two floating-point values represent the same extended real
number. The extended real numbers are the real numbers augmented
with positive infinity and negative infinity. Under numerical
equality, `+0.0` and `-0.0` are equal since they both
map to the same real value, 0. A NaN does not map to any real
number and is not equal to any value, including itself.

:
The bits of the two floating-point values are the same. This
equivalence relation for `double` values `a` and `b` is implemented by the expression

`Double.doubleTo``**Raw**``LongBits(a) == Double.doubleTo``**Raw**``LongBits(b)`

Under this relation, `+0.0` and `-0.0` are
distinguished from each other and every bit pattern encoding a NaN
is distinguished from every other bit pattern encoding a NaN.

:
The two floating-point values represent the same IEEE 754
*datum*. In particular, for finite values, the sign, exponent, and significand components of the floating-point values
are the same. Under this relation:

-  `+0.0` and `-0.0` are distinguished from each other.

-  every bit pattern encoding a NaN is considered equivalent to each other

-  positive infinity is equivalent to positive infinity; negative
     infinity is equivalent to negative infinity.

Expressions implementing this equivalence relation include:

- `Double.doubleToLongBits(a) == Double.doubleToLongBits(b)`

- `Double.valueOf(a).equals(Double.valueOf(b))`

- `Double.compare(a, b) == 0`

Note that representation equivalence is often an appropriate notion
of equivalence to test the behavior of math libraries.

For two binary floating-point values `a` and `b`, if
neither of `a` and `b` is zero or NaN, then the three
relations numerical equality, bit-wise equivalence, and
representation equivalence of `a` and `b` have the same
`true`/`false` value. In other words, for binary
floating-point values, the three relations only differ if at least
one argument is zero or NaN.

#### Decimal &harr; Binary Conversion Issues

Many surprising results of binary floating-point arithmetic trace
back to aspects of decimal to binary conversion and binary to
decimal conversion. While integer values can be exactly represented
in any base, which fractional values can be exactly represented in
a base is a function of the base. For example, in base 10, 1/3 is a
repeating fraction (0.33333....); but in base 3, 1/3 is exactly
0.1(3), that is 1 &times; 3-1.
Similarly, in base 10, 1/10 is exactly representable as 0.1
(1 &times; 10-1), but in base 2, it is a
repeating fraction (0.0001100110011...(2)).

Values of the `float` type have `Float#PRECISION`
bits of precision and values of the `double` type have
`Double#PRECISION` bits of precision. Therefore, since 0.1
is a repeating fraction in base 2 with a four-bit repeat, `0.1f` != `0.1d`. In more detail, including hexadecimal
floating-point literals:

- The exact numerical value of `0.1f` (`0x1.99999a0000000p-4f`) is
    0.100000001490116119384765625.

- The exact numerical value of `0.1d` (`0x1.999999999999ap-4d`) is
    0.1000000000000000055511151231257827021181583404541015625.

These are the closest `float` and `double` values,
respectively, to the numerical value of 0.1.  These results are
consistent with a `float` value having the equivalent of 6 to
9 digits of decimal precision and a `double` value having the
equivalent of 15 to 17 digits of decimal precision. (The
equivalent precision varies according to the different relative
densities of binary and decimal values at different points along the
real number line.)

This representation hazard of decimal fractions is one reason to
use caution when storing monetary values as `float` or `double`. Alternatives include:

- using BigDecimal to store decimal
fractional values exactly

- scaling up so the monetary value is an integer — for
example, multiplying by 100 if the value is denominated in cents or
multiplying by 1000 if the value is denominated in mills —
and then storing that scaled value in an integer type

For each finite floating-point value and a given floating-point
type, there is a contiguous region of the real number line which
maps to that value. Under the default round to nearest rounding
policy (JLS ), this contiguous region for a value is
typically one ulp (unit in the last place)
wide and centered around the exactly representable value. (At
exponent boundaries, the region is asymmetrical and larger on the
side with the larger exponent.) For example, for `0.1f`, the
region can be computed as follows:

// Numeric values listed are exact values

oneTenthApproxAsFloat = 0.100000001490116119384765625;

ulpOfoneTenthApproxAsFloat = Math.ulp(0.1f) = 7.450580596923828125E-9;

// Numeric range that is converted to the float closest to 0.1, _excludes_ endpoints

(oneTenthApproxAsFloat - &frac12;ulpOfoneTenthApproxAsFloat, oneTenthApproxAsFloat + &frac12;ulpOfoneTenthApproxAsFloat) =

(0.0999999977648258209228515625, 0.1000000052154064178466796875)

In particular, a correctly rounded decimal to binary conversion
of any string representing a number in this range, say by `Float.parseFloat(String)`, will be converted to the same value:

Similarly, an analogous range can be constructed  for the `double` type based on the exact value of `double`
approximation to `0.1d` and the numerical value of `Math.ulp(0.1d)` and likewise for other particular numerical values
in the `float` and `double` types.

As seen in the above conversions, compared to the exact
numerical value the operation would have without rounding, the same
floating-point value as a result can be:

- greater than the exact result

- equal to the exact result

- less than the exact result

A floating-point value doesn't "know" whether it was the result of
rounding up, or rounding down, or an exact operation; it contains
no history of how it was computed. Consequently, the sum of

or

should *not* be expected to be exactly equal to 1.0, but
only to be close to 1.0. Consequently, the following code is an
infinite loop:

Instead, use an integer loop count for counted loops:

or test against a floating-point limit using ordered comparisons
(`<`, `<=`, `>`, `>=`):

While floating-point arithmetic may have surprising results, IEEE
754 floating-point arithmetic follows a principled design and its
behavior is predictable on the Java platform.

**JLS:** 4.2.3 Floating-Point Types and Values

**JLS:** 4.2.4 Floating-Point Operations

**JLS:** 15.21.1 Numerical Equality Operators == and !=

**JLS:** 15.20.1 Numerical Comparison Operators `<`, `<=`, `>`, and `>=`

**Since:** 1.0

## Double.POSITIVE_INFINITY

```java
public static final double POSITIVE_INFINITY
```

A constant holding the positive infinity of type
`double`. It is equal to the value returned by
`Double.longBitsToDouble(0x7ff0000000000000L)`.

## Double.NEGATIVE_INFINITY

```java
public static final double NEGATIVE_INFINITY
```

A constant holding the negative infinity of type
`double`. It is equal to the value returned by
`Double.longBitsToDouble(0xfff0000000000000L)`.

## Double.NaN

```java
public static final double NaN
```

A constant holding a Not-a-Number (NaN) value of type `double`.
It is equivalent to the
value returned by `Double.longBitsToDouble(0x7ff8000000000000L)`.

## Double.MAX_VALUE

```java
public static final double MAX_VALUE
```

A constant holding the largest positive finite value of type
`double`,
(2-2-52)&middot;21023.  It is equal to
the hexadecimal floating-point literal
`0x1.fffffffffffffP+1023` and also equal to
`Double.longBitsToDouble(0x7fefffffffffffffL)`.

## Double.MIN_NORMAL

```java
public static final double MIN_NORMAL
```

A constant holding the smallest positive normal value of type
`double`, 2-1022.  It is equal to the
hexadecimal floating-point literal `0x1.0p-1022` and also
equal to `Double.longBitsToDouble(0x0010000000000000L)`.

**Since:** 1.6

## Double.MIN_VALUE

```java
public static final double MIN_VALUE
```

A constant holding the smallest positive nonzero value of type
`double`, 2-1074. It is equal to the
hexadecimal floating-point literal
`0x0.0000000000001P-1022` and also equal to
`Double.longBitsToDouble(0x1L)`.

## Double.SIZE

```java
public static final int SIZE
```

The number of bits used to represent a `double` value,
``.

**Since:** 1.5

## Double.PRECISION

```java
public static final int PRECISION
```

The number of bits in the significand of a `double`
value, ``.  This is the parameter N in section  of *The Java Language Specification*.

**Since:** 19

## Double.MAX_EXPONENT

```java
public static final int MAX_EXPONENT
```

Maximum exponent a finite `double` variable may have,
``.  It is equal to the value returned by `Math.getExponent(Double.MAX_VALUE)`.

**Since:** 1.6

## Double.MIN_EXPONENT

```java
public static final int MIN_EXPONENT
```

Minimum exponent a normalized `double` variable may have,
``.  It is equal to the value returned by `Math.getExponent(Double.MIN_NORMAL)`.

**Since:** 1.6

## Double.BYTES

```java
public static final int BYTES
```

The number of bytes used to represent a `double` value,
``.

**Since:** 1.8

## Double.TYPE

```java
public static final Class<Double> TYPE
```

The `Class` instance representing the primitive type
`double`.

**Since:** 1.1
