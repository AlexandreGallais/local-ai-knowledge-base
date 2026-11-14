---
title: "BigDecimal class (java.math) (part 1 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigDecimal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigDecimal class (java.math)

```java
public class BigDecimal extends Number implements Comparable<BigDecimal>
```

Immutable, arbitrary-precision signed decimal numbers.  A `BigDecimal` consists of an arbitrary precision integer
*unscaled value* and a 32-bit
integer *scale*.  If the
scale is zero or positive, the scale is the number of digits to
the right of the decimal point.  If the scale is negative, the
unscaled value of the number is multiplied by ten to the power of
the negation of the scale.  The value of the number represented by
the `BigDecimal` is therefore
`(unscaledValue &times; 10-scale)`.

The `BigDecimal` class provides operations for
arithmetic, scale manipulation, rounding, comparison, hashing, and
format conversion.  The `toString` method provides a
canonical representation of a `BigDecimal`.

The `BigDecimal` class gives its user complete control
over rounding behavior.  If no rounding mode is specified and the
exact result cannot be represented, an `ArithmeticException`
is thrown; otherwise, calculations can be carried out to a chosen
precision and rounding mode by supplying an appropriate `MathContext` object to the operation.  In either case, eight
*rounding modes* are provided for the control of rounding.
Using the integer fields in this class (such as `ROUND_HALF_UP`) to represent rounding mode is deprecated; the
enumeration values of the `RoundingMode` `enum`, (such
as `RoundingMode.HALF_UP`) should be used instead.

When a `MathContext` object is supplied with a precision
setting of 0 (for example, `MathContext.UNLIMITED`),
arithmetic operations are exact, as are the arithmetic methods
which take no `MathContext` object. As a corollary of
computing the exact result, the rounding mode setting of a `MathContext` object with a precision setting of 0 is not used and
thus irrelevant.  In the case of divide, the exact quotient could
have an infinitely long decimal expansion; for example, 1 divided
by 3.  If the quotient has a nonterminating decimal expansion and
the operation is specified to return an exact result, an `ArithmeticException` is thrown.  Otherwise, the exact result of the
division is returned, as done for other operations.

When the precision setting is not 0, the rules of `BigDecimal` arithmetic are broadly compatible with selected modes
of operation of the arithmetic defined in ANSI X3.274-1996 and ANSI
X3.274-1996/AM 1-2000 (section 7.4).  Unlike those standards,
`BigDecimal` includes many rounding modes.  Any conflicts
between these ANSI standards and the `BigDecimal`
specification are resolved in favor of `BigDecimal`.

Since the same numerical value can have different
representations (with different scales), the rules of arithmetic
and rounding must specify both the numerical result and the scale
used in the result's representation.

The different representations of the same numerical value are
called members of the same *cohort*. The natural order of `BigDecimal`
considers members of the same cohort to be equal to each other. In
contrast, the equals method requires both the
numerical value and representation to be the same for equality to
hold. The results of methods like `scale()` and `unscaledValue()` will differ for numerically equal values with
different representations.

In general the rounding modes and precision setting determine
how operations return results with a limited number of digits when
the exact result has more digits (perhaps infinitely many in the
case of division and square root) than the number of digits returned.

First, the total number of digits to return is specified by the
`MathContext`'s `precision` setting; this determines
the result's *precision*.  The digit count starts from the
leftmost nonzero digit of the exact result.  The rounding mode
determines how any discarded trailing digits affect the returned
result.

For all arithmetic operators, the operation is carried out as
though an exact intermediate result were first calculated and then
rounded to the number of digits specified by the precision setting
(if necessary), using the selected rounding mode.  If the exact
result is not returned, some digit positions of the exact result
are discarded.  When rounding increases the magnitude of the
returned result, it is possible for a new digit position to be
created by a carry propagating to a leading  digit.
For example, rounding the value 999.9 to three digits rounding up
would be numerically equal to one thousand, represented as
100&times;101.  In such cases, the new  is
the leading digit position of the returned result.

For methods and constructors with a `MathContext`
parameter, if the result is inexact but the rounding mode is UNNECESSARY, an `ArithmeticException` will be thrown.

Besides a logical exact result, each arithmetic operation has a
preferred scale for representing a result.  The preferred
scale for each operation is listed in the table below.

Preferred Scales for Results of Arithmetic Operations

OperationPreferred Scale of Result

Addmax(addend.scale(), augend.scale())
Subtractmax(minuend.scale(), subtrahend.scale())
Multiplymultiplier.scale() + multiplicand.scale()
Dividedividend.scale() - divisor.scale()
Square rootradicand.scale()/2

These scales are the ones used by the methods which return exact
arithmetic results; except that an exact divide may have to use a
larger scale since the exact result may have more digits.  For
example, `1/32` is `0.03125`.

Before rounding, the scale of the logical exact intermediate
result is the preferred scale for that operation.  If the exact
numerical result cannot be represented in `precision`
digits, rounding selects the set of digits to return and the scale
of the result is reduced from the scale of the intermediate result
to the least scale which can represent the `precision`
digits actually returned.  If the exact result can be represented
with at most `precision` digits, the representation
of the result with the scale closest to the preferred scale is
returned.  In particular, an exactly representable quotient may be
represented in fewer than `precision` digits by removing
trailing zeros and decreasing the scale.  For example, rounding to
three digits using the floor
rounding mode,

`19/100 = 0.19 // integer=19, scale=2`

but

`21/110 = 0.190 // integer=190, scale=3`

Note that for add, subtract, and multiply, the reduction in
scale will equal the number of digit positions of the exact result
which are discarded. If the rounding causes a carry propagation to
create a new high-order digit position, an additional digit of the
result is discarded than when no new digit position is created.

Other methods may have slightly different rounding semantics.
For example, the result of the `pow` method using the
MathContext) specified algorithm can
occasionally differ from the rounded mathematical result by more
than one unit in the last place, one *ulp*.

Two types of operations are provided for manipulating the scale
of a `BigDecimal`: scaling/rounding operations and decimal
point motion operations.  Scaling/rounding operations (setScale and round) return a
`BigDecimal` whose value is approximately (or exactly) equal
to that of the operand, but whose scale or precision is the
specified value; that is, they increase or decrease the precision
of the stored number with minimal effect on its value.  Decimal
point motion operations (movePointLeft and
movePointRight) return a
`BigDecimal` created from the operand by moving the decimal
point a specified distance in the specified direction.

As a 32-bit integer, the set of values for the scale is large,
but bounded. If the scale of a result would exceed the range of a
32-bit integer, either by overflow or underflow, the operation may
throw an `ArithmeticException`.

For the sake of brevity and clarity, pseudo-code is used
throughout the descriptions of `BigDecimal` methods.  The
pseudo-code expression `(i + j)` is shorthand for "a
`BigDecimal` whose value is that of the `BigDecimal`
`i` added to that of the `BigDecimal`
`j`." The pseudo-code expression `(i == j)` is
shorthand for "`true` if and only if the
`BigDecimal` `i` represents the same value as the
`BigDecimal` `j`." Other pseudo-code expressions
are interpreted similarly.  Square brackets are used to represent
the particular `BigInteger` and scale pair defining a
`BigDecimal` value; for example [19, 2] is the
`BigDecimal` numerically equal to 0.19 having a scale of 2.

All methods and constructors for this class throw
`NullPointerException` when passed a `null` object
reference for any input parameter.

**API note:** Care should be exercised if `BigDecimal` objects are
used as keys in a SortedMap or elements
in a SortedSet since `BigDecimal`'s *natural ordering* is *inconsistent with equals*.  See `Comparable`, `java.util.SortedMap` or `java.util.SortedSet` for more information.

#### Relation to IEEE 754 Decimal Arithmetic

Starting with its 2008 revision, the *IEEE 754 Standard for
Floating-point Arithmetic* has covered decimal formats and
operations. While there are broad similarities in the decimal
arithmetic defined by IEEE 754 and by this class, there are notable
differences as well. The fundamental similarity shared by `BigDecimal` and IEEE 754 decimal arithmetic is the conceptual
operation of computing the mathematical infinitely precise real
number value of an operation and then mapping that real number to a
representable decimal floating-point value under a *rounding
policy*. The rounding policy is called a rounding mode for `BigDecimal` and called a
rounding-direction attribute in IEEE 754-2019. When the exact value
is not representable, the rounding policy determines which of the
two representable decimal values bracketing the exact value is
selected as the computed result. The notion of a *preferred
scale/preferred exponent* is also shared by both systems.

For differences, IEEE 754 includes several kinds of values not
modeled by `BigDecimal` including negative zero, signed
infinities, and NaN (not-a-number). IEEE 754 defines formats, which
are parameterized by base (binary or decimal), number of digits of
precision, and exponent range. A format determines the set of
representable values. Most operations accept as input one or more
values of a given format and produce a result in the same format.
A `BigDecimal`'s scale is equivalent to
negating an IEEE 754 value's exponent. `BigDecimal` values do
not have a format in the same sense; all values have the same
possible range of scale/exponent and the unscaled value has arbitrary precision. Instead,
for the `BigDecimal` operations taking a `MathContext`
parameter, if the `MathContext` has a nonzero precision, the
set of possible representable values for the result is determined
by the precision of the `MathContext` argument. For example
in `BigDecimal`, if a nonzero three-digit number and a
nonzero four-digit number are multiplied together in the context of
a `MathContext` object having a precision of three, the
result will have three digits (assuming no overflow or underflow,
etc.).

The rounding policies implemented by `BigDecimal`
operations indicated by rounding modes
are a proper superset of the IEEE 754 rounding-direction
attributes.

`BigDecimal` arithmetic will most resemble IEEE 754
decimal arithmetic if a `MathContext` corresponding to an
IEEE 754 decimal format, such as decimal64 or decimal128 is
used to round all starting values and intermediate operations. The
numerical values computed can differ if the exponent range of the
IEEE 754 format being approximated is exceeded since a `MathContext` does not constrain the scale of `BigDecimal`
results. Operations that would generate a NaN or exact infinity,
such as dividing by zero, throw an `ArithmeticException` in
`BigDecimal` arithmetic.

#### Algorithmic Complexity

Operations on `BigDecimal` values have a range of algorithmic
complexities; in general, those complexities are a function of both
the size of the unscaled value as well as the size of the
scale. For example, an exact multiply of two `BigDecimal` values is subject to the
same complexity constraints as `BigInteger` multiply of the unscaled
values. In contrast, a `BigDecimal` value with a compact
representation like `new BigDecimal(1E-1000000000)` has a
`toPlainString` result with over one billion characters.

Operations may also allocate and compute on intermediate
results, potentially those allocations may be as large as in
proportion to the running time of the algorithm.

Users of `BigDecimal` concerned with bounding the running
time or space of operations can screen out `BigDecimal`
values with unscaled values or scales above a chosen magnitude.

**See also:** BigInteger

**See also:** MathContext

**See also:** RoundingMode

**See also:** java.util.SortedMap

**See also:** java.util.SortedSet

**Since:** 1.1

## BigDecimal.ZERO

```java
public static final BigDecimal ZERO
```

The value 0, with a scale of 0.

**Since:** 1.5

## BigDecimal.ONE

```java
public static final BigDecimal ONE
```

The value 1, with a scale of 0.

**Since:** 1.5

## BigDecimal.TWO

```java
public static final BigDecimal TWO
```

The value 2, with a scale of 0.

**Since:** 19

## BigDecimal.TEN

```java
public static final BigDecimal TEN
```

The value 10, with a scale of 0.

**Since:** 1.5

## BigDecimal.BigDecimal(char[], int, int)

```java
public BigDecimal(char[] in, int offset, int len)
```

Translates a character array representation of a
`BigDecimal` into a `BigDecimal`, accepting the
same sequence of characters as the `BigDecimal(String)`
constructor, while allowing a sub-array to be specified.

Parameters:

- `in`: `char` array that is the source of characters.
- `offset`: first character in the array to inspect.
- `len`: number of characters to consider.

**Implementation note:** If the sequence of characters is already available
within a character array, using this constructor is faster than
converting the `char` array to string and using the
`BigDecimal(String)` constructor.

**Since:** 1.5

Throws:

- `NumberFormatException`: if `in` is not a valid representation of a `BigDecimal` or the defined subarray is not wholly within `in`.
