---
title: "BigDecimal class (java.math) (part 3 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigDecimal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigDecimal class (java.math) (part 3 of 6)

## BigDecimal.multiply(BigDecimal, MathContext)

```java
public BigDecimal multiply(BigDecimal multiplicand, MathContext mc)
```

Returns a `BigDecimal` whose value is `(this &times;
multiplicand)`, with rounding according to the context settings.

Parameters:

- `multiplicand`: value to be multiplied by this `BigDecimal`.
- `mc`: the context to use.

**Returns:** `this * multiplicand`, rounded as necessary.

**Since:** 1.5

## BigDecimal.divide(BigDecimal, int, int)

```java
public BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)
```

Returns a `BigDecimal` whose value is `(this / divisor)`, and whose scale is as specified.  If rounding must
be performed to generate a result with the specified scale, the
specified rounding mode is applied.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.
- `scale`: scale of the `BigDecimal` quotient to be returned.
- `roundingMode`: rounding mode to apply.

**Deprecated:** The method int, RoundingMode)
should be used in preference to this legacy method.

**Returns:** `this / divisor`

**See also:** #ROUND_UP

**See also:** #ROUND_DOWN

**See also:** #ROUND_CEILING

**See also:** #ROUND_FLOOR

**See also:** #ROUND_HALF_UP

**See also:** #ROUND_HALF_DOWN

**See also:** #ROUND_HALF_EVEN

**See also:** #ROUND_UNNECESSARY

Throws:

- `ArithmeticException`: if `divisor` is zero, `roundingMode==ROUND_UNNECESSARY` and the specified scale is insufficient to represent the result of the division exactly.
- `IllegalArgumentException`: if `roundingMode` does not represent a valid rounding mode.

## BigDecimal.divide(BigDecimal, int, RoundingMode)

```java
public BigDecimal divide(BigDecimal divisor, int scale, RoundingMode roundingMode)
```

Returns a `BigDecimal` whose value is `(this / divisor)`, and whose scale is as specified.  If rounding must
be performed to generate a result with the specified scale, the
specified rounding mode is applied.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.
- `scale`: scale of the `BigDecimal` quotient to be returned.
- `roundingMode`: rounding mode to apply.

**Returns:** `this / divisor`

**Since:** 1.5

Throws:

- `ArithmeticException`: if `divisor` is zero, `roundingMode==RoundingMode.UNNECESSARY` and the specified scale is insufficient to represent the result of the division exactly.

## BigDecimal.divide(BigDecimal, int)

```java
public BigDecimal divide(BigDecimal divisor, int roundingMode)
```

Returns a `BigDecimal` whose value is `(this / divisor)`, and whose scale is `this.scale()`.  If
rounding must be performed to generate a result with the given
scale, the specified rounding mode is applied.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.
- `roundingMode`: rounding mode to apply.

**Deprecated:** The method RoundingMode)
should be used in preference to this legacy method.

**Returns:** `this / divisor`

**See also:** #ROUND_UP

**See also:** #ROUND_DOWN

**See also:** #ROUND_CEILING

**See also:** #ROUND_FLOOR

**See also:** #ROUND_HALF_UP

**See also:** #ROUND_HALF_DOWN

**See also:** #ROUND_HALF_EVEN

**See also:** #ROUND_UNNECESSARY

Throws:

- `ArithmeticException`: if `divisor==0`, or `roundingMode==ROUND_UNNECESSARY` and `this.scale()` is insufficient to represent the result of the division exactly.
- `IllegalArgumentException`: if `roundingMode` does not represent a valid rounding mode.

## BigDecimal.divide(BigDecimal, RoundingMode)

```java
public BigDecimal divide(BigDecimal divisor, RoundingMode roundingMode)
```

Returns a `BigDecimal` whose value is `(this / divisor)`, and whose scale is `this.scale()`.  If
rounding must be performed to generate a result with the given
scale, the specified rounding mode is applied.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.
- `roundingMode`: rounding mode to apply.

**Returns:** `this / divisor`

**Since:** 1.5

Throws:

- `ArithmeticException`: if `divisor==0`, or `roundingMode==RoundingMode.UNNECESSARY` and `this.scale()` is insufficient to represent the result of the division exactly.

## BigDecimal.divide(BigDecimal)

```java
public BigDecimal divide(BigDecimal divisor)
```

Returns a `BigDecimal` whose value is `(this / divisor)`, and whose preferred scale is `(this.scale() - divisor.scale())`; if the exact quotient cannot be
represented (because it has a non-terminating decimal
expansion) an `ArithmeticException` is thrown.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.

**Returns:** `this / divisor`

**Since:** 1.5

Throws:

- `ArithmeticException`: if the exact quotient does not have a terminating decimal expansion, including dividing by zero

## BigDecimal.divide(BigDecimal, MathContext)

```java
public BigDecimal divide(BigDecimal divisor, MathContext mc)
```

Returns a `BigDecimal` whose value is `(this / divisor)`, with rounding according to the context settings.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.
- `mc`: the context to use.

**Returns:** `this / divisor`, rounded as necessary.

**Since:** 1.5

Throws:

- `ArithmeticException`: if the result is inexact but the rounding mode is `UNNECESSARY` or `mc.precision == 0` and the quotient has a non-terminating decimal expansion, including dividing by zero

## BigDecimal.divideToIntegralValue(BigDecimal)

```java
public BigDecimal divideToIntegralValue(BigDecimal divisor)
```

Returns a `BigDecimal` whose value is the integer part
of the quotient `(this / divisor)` rounded down.  The
preferred scale of the result is `(this.scale() - divisor.scale())`.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.

**Returns:** The integer part of `this / divisor`.

**Since:** 1.5

Throws:

- `ArithmeticException`: if `divisor==0`

## BigDecimal.divideToIntegralValue(BigDecimal, MathContext)

```java
public BigDecimal divideToIntegralValue(BigDecimal divisor, MathContext mc)
```

Returns a `BigDecimal` whose value is the integer part
of `(this / divisor)`.  Since the integer part of the
exact quotient does not depend on the rounding mode, the
rounding mode does not affect the values returned by this
method.  The preferred scale of the result is
`(this.scale() - divisor.scale())`.  An
`ArithmeticException` is thrown if the integer part of
the exact quotient needs more than `mc.precision`
digits.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.
- `mc`: the context to use.

**Returns:** The integer part of `this / divisor`.

**Since:** 1.5

Throws:

- `ArithmeticException`: if `divisor==0`
- `ArithmeticException`: if `mc.precision` > 0 and the result requires a precision of more than `mc.precision` digits.

## BigDecimal.remainder(BigDecimal)

```java
public BigDecimal remainder(BigDecimal divisor)
```

Returns a `BigDecimal` whose value is `(this % divisor)`.

The remainder is given by
`this.subtract(this.divideToIntegralValue(divisor).multiply(divisor))`.
Note that this is *not* the modulo operation (the result can be
negative).

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.

**Returns:** `this % divisor`.

**Since:** 1.5

Throws:

- `ArithmeticException`: if `divisor==0`

## BigDecimal.remainder(BigDecimal, MathContext)

```java
public BigDecimal remainder(BigDecimal divisor, MathContext mc)
```

Returns a `BigDecimal` whose value is `(this % divisor)`, with rounding according to the context settings.
The `MathContext` settings affect the implicit divide
used to compute the remainder.  The remainder computation
itself is by definition exact.  Therefore, the remainder may
contain more than `mc.getPrecision()` digits.

The remainder is given by
`this.subtract(this.divideToIntegralValue(divisor, mc).multiply(divisor))`.  Note that this is not the modulo
operation (the result can be negative).

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided.
- `mc`: the context to use.

**Returns:** `this % divisor`, rounded as necessary.

**See also:** #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)

**Since:** 1.5

Throws:

- `ArithmeticException`: if `divisor==0`
- `ArithmeticException`: if the result is inexact but the rounding mode is `UNNECESSARY`, or `mc.precision` > 0 and the result of `this.divideToIntegralValue(divisor)` would require a precision of more than `mc.precision` digits.

## BigDecimal.divideAndRemainder(BigDecimal)

```java
public BigDecimal[] divideAndRemainder(BigDecimal divisor)
```

Returns a two-element `BigDecimal` array containing the
result of `divideToIntegralValue` followed by the result of
`remainder` on the two operands.

Note that if both the integer quotient and remainder are
needed, this method is faster than using the
`divideToIntegralValue` and `remainder` methods
separately because the division need only be carried out once.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided, and the remainder computed.

**Returns:** a two element `BigDecimal` array: the quotient
        (the result of `divideToIntegralValue`) is the initial element
        and the remainder is the final element.

**See also:** #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)

**See also:** #remainder(java.math.BigDecimal, java.math.MathContext)

**Since:** 1.5

Throws:

- `ArithmeticException`: if `divisor==0`

## BigDecimal.divideAndRemainder(BigDecimal, MathContext)

```java
public BigDecimal[] divideAndRemainder(BigDecimal divisor, MathContext mc)
```

Returns a two-element `BigDecimal` array containing the
result of `divideToIntegralValue` followed by the result of
`remainder` on the two operands calculated with rounding
according to the context settings.

Note that if both the integer quotient and remainder are
needed, this method is faster than using the
`divideToIntegralValue` and `remainder` methods
separately because the division need only be carried out once.

Parameters:

- `divisor`: value by which this `BigDecimal` is to be divided, and the remainder computed.
- `mc`: the context to use.

**Returns:** a two element `BigDecimal` array: the quotient
        (the result of `divideToIntegralValue`) is the
        initial element and the remainder is the final element.

**See also:** #divideToIntegralValue(java.math.BigDecimal, java.math.MathContext)

**See also:** #remainder(java.math.BigDecimal, java.math.MathContext)

**Since:** 1.5

Throws:

- `ArithmeticException`: if `divisor==0`
- `ArithmeticException`: if the result is inexact but the rounding mode is `UNNECESSARY`, or `mc.precision` > 0 and the result of `this.divideToIntegralValue(divisor)` would require a precision of more than `mc.precision` digits.

## BigDecimal.sqrt(MathContext)

```java
public BigDecimal sqrt(MathContext mc)
```

Returns an approximation to the square root of `this`
with rounding according to the context settings.

The preferred scale of the returned result is equal to
`this.scale()/2`. The value of the returned result is
always within one ulp of the exact decimal value for the
precision in question.  If the rounding mode is HALF_UP, HALF_DOWN, or HALF_EVEN, the
result is within one half an ulp of the exact decimal value.

Special case:

-  The square root of a number numerically equal to `ZERO` is numerically equal to `ZERO` with a preferred
scale according to the general rule above. In particular, for
`ZERO`, `ZERO.sqrt(mc).equals(ZERO)` is true with
any `MathContext` as an argument.

Parameters:

- `mc`: the context to use.

**Returns:** the square root of `this`.

**See also:** BigInteger#sqrt()

**Since:** 9

Throws:

- `ArithmeticException`: if `this` is less than zero.
- `ArithmeticException`: if an exact result is requested (`mc.getPrecision()==0`) and there is no finite decimal expansion of the exact result
- `ArithmeticException`: if `(mc.getRoundingMode()==RoundingMode.UNNECESSARY`) and the exact result cannot fit in `mc.getPrecision()` digits.

## BigDecimal.pow(int)

```java
public BigDecimal pow(int n)
```

Returns a `BigDecimal` whose value is
`(thisn)`, The power is computed exactly, to
unlimited precision.

The parameter `n` must be in the range 0 through
999999999, inclusive.  `ZERO.pow(0)` returns `ONE`.

Note that future releases may expand the allowable exponent
range of this method.

Parameters:

- `n`: power to raise this `BigDecimal` to.

**Returns:** `thisn`

**Since:** 1.5

Throws:

- `ArithmeticException`: if `n` is out of range.

## BigDecimal.pow(int, MathContext)

```java
public BigDecimal pow(int n, MathContext mc)
```

Returns a `BigDecimal` whose value is
`(thisn)`.  The current implementation uses
the core algorithm defined in ANSI standard X3.274-1996 with
rounding according to the context settings.  In general, the
returned numerical value is within two ulps of the exact
numerical value for the chosen precision.  Note that future
releases may use a different algorithm with a decreased
allowable error bound and increased allowable exponent range.

The X3.274-1996 algorithm is:

-  An `ArithmeticException` exception is thrown if

- `abs(n) > 999999999`

- `mc.precision == 0` and `n < 0`

- `mc.precision > 0` and `n` has more than
   `mc.precision` decimal digits

-  if `n` is zero, `ONE` is returned even if
`this` is zero, otherwise

-  if `n` is positive, the result is calculated via
  the repeated squaring technique into a single accumulator.
  The individual multiplications with the accumulator use the
  same math context settings as in `mc` except for a
  precision increased to `mc.precision + elength + 1`
  where `elength` is the number of decimal digits in
  `n`.

-  if `n` is negative, the result is calculated as if
  `n` were positive; this value is then divided into one
  using the working precision specified above.

-  The final value from either the positive or negative case
  is then rounded to the destination precision.

Parameters:

- `n`: power to raise this `BigDecimal` to.
- `mc`: the context to use.

**Returns:** `thisn` using the ANSI standard X3.274-1996
        algorithm

**Since:** 1.5

Throws:

- `ArithmeticException`: if the result is inexact but the rounding mode is `UNNECESSARY`, or `n` is out of range.

## BigDecimal.abs()

```java
public BigDecimal abs()
```

Returns a `BigDecimal` whose value is the absolute value
of this `BigDecimal`, and whose scale is
`this.scale()`.

**Returns:** `abs(this)`

## BigDecimal.abs(MathContext)

```java
public BigDecimal abs(MathContext mc)
```

Returns a `BigDecimal` whose value is the absolute value
of this `BigDecimal`, with rounding according to the
context settings.

Parameters:

- `mc`: the context to use.

**Returns:** `abs(this)`, rounded as necessary.

**Since:** 1.5

## BigDecimal.negate()

```java
public BigDecimal negate()
```

Returns a `BigDecimal` whose value is `(-this)`,
and whose scale is `this.scale()`.

**Returns:** `-this`.
