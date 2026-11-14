---
title: "BigDecimal class (java.math) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigDecimal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigDecimal class (java.math) (part 4 of 6)

## BigDecimal.negate(MathContext)

```java
public BigDecimal negate(MathContext mc)
```

Returns a `BigDecimal` whose value is `(-this)`,
with rounding according to the context settings.

Parameters:

- `mc`: the context to use.

**Returns:** `-this`, rounded as necessary.

**Since:** 1.5

## BigDecimal.plus()

```java
public BigDecimal plus()
```

Returns a `BigDecimal` whose value is `(+this)`, and whose
scale is `this.scale()`.

This method, which simply returns this `BigDecimal`
is included for symmetry with the unary minus method `negate()`.

**Returns:** `this`.

**See also:** #negate()

**Since:** 1.5

## BigDecimal.plus(MathContext)

```java
public BigDecimal plus(MathContext mc)
```

Returns a `BigDecimal` whose value is `(+this)`,
with rounding according to the context settings.

The effect of this method is identical to that of the `round(MathContext)` method.

Parameters:

- `mc`: the context to use.

**Returns:** `this`, rounded as necessary.  A zero result will
        have a scale of 0.

**See also:** #round(MathContext)

**Since:** 1.5

## BigDecimal.signum()

```java
public int signum()
```

Returns the signum function of this `BigDecimal`.

**Returns:** -1, 0, or 1 as the value of this `BigDecimal`
        is negative, zero, or positive.

## BigDecimal.scale()

```java
public int scale()
```

Returns the *scale* of this `BigDecimal`.  If zero
or positive, the scale is the number of digits to the right of
the decimal point.  If negative, the unscaled value of the
number is multiplied by ten to the power of the negation of the
scale.  For example, a scale of `-3` means the unscaled
value is multiplied by 1000.

**Returns:** the scale of this `BigDecimal`.

## BigDecimal.precision()

```java
public int precision()
```

Returns the *precision* of this `BigDecimal`.  (The
precision is the number of digits in the unscaled value.)

The precision of a zero value is 1.

**Returns:** the precision of this `BigDecimal`.

**Since:** 1.5

## BigDecimal.unscaledValue()

```java
public BigInteger unscaledValue()
```

Returns a `BigInteger` whose value is the *unscaled
value* of this `BigDecimal`.  (Computes `(this *
10this.scale())`.)

**Returns:** the unscaled value of this `BigDecimal`.

**Since:** 1.2

## BigDecimal.ROUND_UP

```java
public static final int ROUND_UP
```

Rounding mode to round away from zero.  Always increments the
digit prior to a nonzero discarded fraction.  Note that this rounding
mode never decreases the magnitude of the calculated value.

**Deprecated:** Use `RoundingMode.UP` instead.

## BigDecimal.ROUND_DOWN

```java
public static final int ROUND_DOWN
```

Rounding mode to round towards zero.  Never increments the digit
prior to a discarded fraction (i.e., truncates).  Note that this
rounding mode never increases the magnitude of the calculated value.

**Deprecated:** Use `RoundingMode.DOWN` instead.

## BigDecimal.ROUND_CEILING

```java
public static final int ROUND_CEILING
```

Rounding mode to round towards positive infinity.  If the
`BigDecimal` is positive, behaves as for
`ROUND_UP`; if negative, behaves as for
`ROUND_DOWN`.  Note that this rounding mode never
decreases the calculated value.

**Deprecated:** Use `RoundingMode.CEILING` instead.

## BigDecimal.ROUND_FLOOR

```java
public static final int ROUND_FLOOR
```

Rounding mode to round towards negative infinity.  If the
`BigDecimal` is positive, behave as for
`ROUND_DOWN`; if negative, behave as for
`ROUND_UP`.  Note that this rounding mode never
increases the calculated value.

**Deprecated:** Use `RoundingMode.FLOOR` instead.

## BigDecimal.ROUND_HALF_UP

```java
public static final int ROUND_HALF_UP
```

Rounding mode to round towards
unless both neighbors are equidistant, in which case round up.
Behaves as for `ROUND_UP` if the discarded fraction is
&ge; 0.5; otherwise, behaves as for `ROUND_DOWN`.  Note
that this is the rounding mode that most of us were taught in
grade school.

**Deprecated:** Use `RoundingMode.HALF_UP` instead.

## BigDecimal.ROUND_HALF_DOWN

```java
public static final int ROUND_HALF_DOWN
```

Rounding mode to round towards
unless both neighbors are equidistant, in which case round
down.  Behaves as for `ROUND_UP` if the discarded
fraction is > 0.5; otherwise, behaves as for
`ROUND_DOWN`.

**Deprecated:** Use `RoundingMode.HALF_DOWN` instead.

## BigDecimal.ROUND_HALF_EVEN

```java
public static final int ROUND_HALF_EVEN
```

Rounding mode to round towards the
unless both neighbors are equidistant, in which case, round
towards the even neighbor.  Behaves as for
`ROUND_HALF_UP` if the digit to the left of the
discarded fraction is odd; behaves as for
`ROUND_HALF_DOWN` if it's even.  Note that this is the
rounding mode that minimizes cumulative error when applied
repeatedly over a sequence of calculations.

**Deprecated:** Use `RoundingMode.HALF_EVEN` instead.

## BigDecimal.ROUND_UNNECESSARY

```java
public static final int ROUND_UNNECESSARY
```

Rounding mode to assert that the requested operation has an exact
result, hence no rounding is necessary.  If this rounding mode is
specified on an operation that yields an inexact result, an
`ArithmeticException` is thrown.

**Deprecated:** Use `RoundingMode.UNNECESSARY` instead.

## BigDecimal.round(MathContext)

```java
public BigDecimal round(MathContext mc)
```

Returns a `BigDecimal` rounded according to the
`MathContext` settings.  If the precision setting is 0 then
no rounding takes place.

The effect of this method is identical to that of the
`plus(MathContext)` method.

Parameters:

- `mc`: the context to use.

**Returns:** a `BigDecimal` rounded according to the
        `MathContext` settings.

**See also:** #plus(MathContext)

**Since:** 1.5

## BigDecimal.setScale(int, RoundingMode)

```java
public BigDecimal setScale(int newScale, RoundingMode roundingMode)
```

Returns a `BigDecimal` whose scale is the specified
value, and whose unscaled value is determined by multiplying or
dividing this `BigDecimal`'s unscaled value by the
appropriate power of ten to maintain its overall value.  If the
scale is reduced by the operation, the unscaled value must be
divided (rather than multiplied), and the value may be changed;
in this case, the specified rounding mode is applied to the
division.

Parameters:

- `newScale`: scale of the `BigDecimal` value to be returned.
- `roundingMode`: The rounding mode to apply.

**API note:** Since BigDecimal objects are immutable, calls of
this method do *not* result in the original object being
modified, contrary to the usual convention of having methods
named `set*X*` mutate field *`X`*.
Instead, `setScale` returns an object with the proper
scale; the returned object may or may not be newly allocated.

**Returns:** a `BigDecimal` whose scale is the specified value,
        and whose unscaled value is determined by multiplying or
        dividing this `BigDecimal`'s unscaled value by the
        appropriate power of ten to maintain its overall value.

**See also:** RoundingMode

**Since:** 1.5

Throws:

- `ArithmeticException`: if `roundingMode==UNNECESSARY` and the specified scaling operation would require rounding.

## BigDecimal.setScale(int, int)

```java
public BigDecimal setScale(int newScale, int roundingMode)
```

Returns a `BigDecimal` whose scale is the specified
value, and whose unscaled value is determined by multiplying or
dividing this `BigDecimal`'s unscaled value by the
appropriate power of ten to maintain its overall value.  If the
scale is reduced by the operation, the unscaled value must be
divided (rather than multiplied), and the value may be changed;
in this case, the specified rounding mode is applied to the
division.

Parameters:

- `newScale`: scale of the `BigDecimal` value to be returned.
- `roundingMode`: The rounding mode to apply.

**API note:** Since BigDecimal objects are immutable, calls of
this method do *not* result in the original object being
modified, contrary to the usual convention of having methods
named `set*X*` mutate field *`X`*.
Instead, `setScale` returns an object with the proper
scale; the returned object may or may not be newly allocated.

**Deprecated:** The method RoundingMode) should
be used in preference to this legacy method.

**Returns:** a `BigDecimal` whose scale is the specified value,
        and whose unscaled value is determined by multiplying or
        dividing this `BigDecimal`'s unscaled value by the
        appropriate power of ten to maintain its overall value.

**See also:** #ROUND_UP

**See also:** #ROUND_DOWN

**See also:** #ROUND_CEILING

**See also:** #ROUND_FLOOR

**See also:** #ROUND_HALF_UP

**See also:** #ROUND_HALF_DOWN

**See also:** #ROUND_HALF_EVEN

**See also:** #ROUND_UNNECESSARY

Throws:

- `ArithmeticException`: if `roundingMode==ROUND_UNNECESSARY` and the specified scaling operation would require rounding.
- `IllegalArgumentException`: if `roundingMode` does not represent a valid rounding mode.

## BigDecimal.setScale(int)

```java
public BigDecimal setScale(int newScale)
```

Returns a `BigDecimal` whose scale is the specified
value, and whose value is numerically equal to this
`BigDecimal`'s.  Throws an `ArithmeticException`
if this is not possible.

This call is typically used to increase the scale, in which
case it is guaranteed that there exists a `BigDecimal`
of the specified scale and the correct value.  The call can
also be used to reduce the scale if the caller knows that the
`BigDecimal` has sufficiently many zeros at the end of
its fractional part (i.e., factors of ten in its integer value)
to allow for the rescaling without changing its value.

This method returns the same result as the two-argument
versions of `setScale`, but saves the caller the trouble
of specifying a rounding mode in cases where it is irrelevant.

Parameters:

- `newScale`: scale of the `BigDecimal` value to be returned.

**API note:** Since `BigDecimal` objects are immutable,
calls of this method do *not* result in the original
object being modified, contrary to the usual convention of
having methods named `set*X*` mutate field
*`X`*.  Instead, `setScale` returns an
object with the proper scale; the returned object may or may
not be newly allocated.

**Returns:** a `BigDecimal` whose scale is the specified value, and
        whose unscaled value is determined by multiplying or dividing
        this `BigDecimal`'s unscaled value by the appropriate
        power of ten to maintain its overall value.

**See also:** #setScale(int, int)

**See also:** #setScale(int, RoundingMode)

Throws:

- `ArithmeticException`: if the specified scaling operation would require rounding.

## BigDecimal.movePointLeft(int)

```java
public BigDecimal movePointLeft(int n)
```

Returns a `BigDecimal` which is equivalent to this one
with the decimal point moved `n` places to the left.  If
`n` is non-negative, the call merely adds `n` to
the scale.  If `n` is negative, the call is equivalent
to `movePointRight(-n)`.  The `BigDecimal`
returned by this call has value `(this &times;
10-n)` and scale `max(this.scale()+n, 0)`.

Parameters:

- `n`: number of places to move the decimal point to the left.

**Returns:** a `BigDecimal` which is equivalent to this one with the
        decimal point moved `n` places to the left.

Throws:

- `ArithmeticException`: if scale overflows.

## BigDecimal.movePointRight(int)

```java
public BigDecimal movePointRight(int n)
```

Returns a `BigDecimal` which is equivalent to this one
with the decimal point moved `n` places to the right.
If `n` is non-negative, the call merely subtracts
`n` from the scale.  If `n` is negative, the call
is equivalent to `movePointLeft(-n)`.  The
`BigDecimal` returned by this call has value `(this
&times; 10n)` and scale `max(this.scale()-n, 0)`.

Parameters:

- `n`: number of places to move the decimal point to the right.

**Returns:** a `BigDecimal` which is equivalent to this one
        with the decimal point moved `n` places to the right.

Throws:

- `ArithmeticException`: if scale overflows.

## BigDecimal.scaleByPowerOfTen(int)

```java
public BigDecimal scaleByPowerOfTen(int n)
```

Returns a BigDecimal whose numerical value is equal to
(`this` * 10n).  The scale of
the result is `(this.scale() - n)`.

Parameters:

- `n`: the exponent power of ten to scale by

**Returns:** a BigDecimal whose numerical value is equal to
(`this` * 10n)

**Since:** 1.5

Throws:

- `ArithmeticException`: if the scale would be outside the range of a 32-bit integer.

## BigDecimal.stripTrailingZeros()

```java
public BigDecimal stripTrailingZeros()
```

Returns a `BigDecimal` which is numerically equal to
this one but with any trailing zeros removed from the
representation.  For example, stripping the trailing zeros from
the `BigDecimal` value `600.0`, which has
[`BigInteger`, `scale`] components equal to
[6000, 1], yields `6E2` with [`BigInteger`,
`scale`] components equal to [6, -2].  If
this BigDecimal is numerically equal to zero, then
`BigDecimal.ZERO` is returned.

**Returns:** a numerically equal `BigDecimal` with any
trailing zeros removed.

**Since:** 1.5

Throws:

- `ArithmeticException`: if scale overflows.

## BigDecimal.compareTo(BigDecimal)

```java
public int compareTo(BigDecimal val)
```

Compares this `BigDecimal` numerically with the specified
`BigDecimal`.  Two `BigDecimal` objects that are
equal in value but have a different scale (like 2.0 and 2.00)
are considered equal by this method. Such values are in the
same *cohort*.

This method is provided in preference to individual methods for
each of the six boolean comparison operators (<, ==,
>, >=, !=, <=).  The suggested
idiom for performing these comparisons is: `(x.compareTo(y)` <*op*> `0)`, where
<*op*> is one of the six comparison operators.

Parameters:

- `val`: `BigDecimal` to which this `BigDecimal` is to be compared.

**API note:** Note: this class has a natural ordering that is inconsistent with equals.
The behavior of comparing the result of this method for
equality to 0 is analogous to checking the numerical equality of `double` values.

**Returns:** -1, 0, or 1 as this `BigDecimal` is numerically
         less than, equal to, or greater than `val`.
