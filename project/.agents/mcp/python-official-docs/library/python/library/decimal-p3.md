---
title: "decimal --- Decimal fixed-point and floating-point arithmetic (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/decimal.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# decimal --- Decimal fixed-point and floating-point arithmetic (part 3 of 6)

### `normalize(context=None)`

Used for producing canonical values of an equivalence
class within either the current context or the specified context.

This has the same semantics as the unary plus operation, except that if
the final result is finite it is reduced to its simplest form, with all
trailing zeros removed and its sign preserved. That is, while the
coefficient is non-zero and a multiple of ten the coefficient is divided
by ten and the exponent is incremented by 1. Otherwise (the coefficient is
zero) the exponent is set to 0. In all cases the sign is unchanged.

For example, `Decimal('32.100')` and `Decimal('0.321000e+2')` both
normalize to the equivalent value `Decimal('32.1')`.

Note that rounding is applied *before* reducing to simplest form.

In the latest versions of the specification, this operation is also known
as `reduce`.

### `number_class(context=None)`

Return a string describing the *class* of the operand.  The returned value
is one of the following ten strings.

- `"-Infinity"`, indicating that the operand is negative infinity.
- `"-Normal"`, indicating that the operand is a negative normal number.
- `"-Subnormal"`, indicating that the operand is negative and subnormal.
- `"-Zero"`, indicating that the operand is a negative zero.
- `"+Zero"`, indicating that the operand is a positive zero.
- `"+Subnormal"`, indicating that the operand is positive and subnormal.
- `"+Normal"`, indicating that the operand is a positive normal number.
- `"+Infinity"`, indicating that the operand is positive infinity.
- `"NaN"`, indicating that the operand is a quiet NaN (Not a Number).
- `"sNaN"`, indicating that the operand is a signaling NaN.

### `quantize(exp, rounding=None, context=None)`

Return a value equal to the first operand after rounding and having the
exponent of the second operand.

```python
>>> Decimal('1.41421356').quantize(Decimal('1.000'))
Decimal('1.414')
```

Unlike other operations, if the length of the coefficient after the
quantize operation would be greater than precision, then an
`InvalidOperation` is signaled. This guarantees that, unless there
is an error condition, the quantized exponent is always equal to that of
the right-hand operand.

Also unlike other operations, quantize never signals Underflow, even if
the result is subnormal and inexact.

If the exponent of the second operand is larger than that of the first
then rounding may be necessary.  In this case, the rounding mode is
determined by the `rounding` argument if given, else by the given
`context` argument; if neither argument is given the rounding mode of
the current thread's context is used.

An error is returned whenever the resulting exponent is greater than
`Emax` or less than `Etiny()`.

### `radix()`

Return `Decimal(10)`, the radix (base) in which the `Decimal`
class does all its arithmetic.  Included for compatibility with the
specification.

### `remainder_near(other, context=None)`

Return the remainder from dividing *self* by *other*.  This differs from
`self % other` in that the sign of the remainder is chosen so as to
minimize its absolute value.  More precisely, the return value is
`self - n * other` where `n` is the integer nearest to the exact
value of `self / other`, and if two integers are equally near then the
even one is chosen.

If the result is zero then its sign will be the sign of *self*.

```python
>>> Decimal(18).remainder_near(Decimal(10))
Decimal('-2')
>>> Decimal(25).remainder_near(Decimal(10))
Decimal('5')
>>> Decimal(35).remainder_near(Decimal(10))
Decimal('-5')
```

### `rotate(other, context=None)`

Return the result of rotating the digits of the first operand by an amount
specified by the second operand.  The second operand must be an integer in
the range -precision through precision.  The absolute value of the second
operand gives the number of places to rotate.  If the second operand is
positive then rotation is to the left; otherwise rotation is to the right.
The coefficient of the first operand is padded on the left with zeros to
length precision if necessary.  The sign and exponent of the first operand
are unchanged.

### `same_quantum(other, context=None)`

Test whether self and other have the same exponent or whether both are
`NaN`.

This operation is unaffected by context and is quiet: no flags are changed
and no rounding is performed.  As an exception, the C version may raise
InvalidOperation if the second operand cannot be converted exactly.

### `scaleb(other, context=None)`

Return the first operand with exponent adjusted by the second.
Equivalently, return the first operand multiplied by `10**other`.  The
second operand must be an integer.

### `shift(other, context=None)`

Return the result of shifting the digits of the first operand by an amount
specified by the second operand.  The second operand must be an integer in
the range -precision through precision.  The absolute value of the second
operand gives the number of places to shift.  If the second operand is
positive then the shift is to the left; otherwise the shift is to the
right.  Digits shifted into the coefficient are zeros.  The sign and
exponent of the first operand are unchanged.

### `sqrt(context=None)`

Return the square root of the argument to full precision.

### `to_eng_string(context=None)`

Convert to a string, using engineering notation if an exponent is needed.

Engineering notation has an exponent which is a multiple of 3.  This
can leave up to 3 digits to the left of the decimal place and may
require the addition of either one or two trailing zeros.

For example, this converts `Decimal('123E+1')` to `Decimal('1.23E+3')`.

### `to_integral(rounding=None, context=None)`

Identical to the `to_integral_value()` method.  The `to_integral`
name has been kept for compatibility with older versions.

### `to_integral_exact(rounding=None, context=None)`

Round to the nearest integer, signaling `Inexact` or
`Rounded` as appropriate if rounding occurs.  The rounding mode is
determined by the `rounding` parameter if given, else by the given
`context`.  If neither parameter is given then the rounding mode of the
current context is used.

### `to_integral_value(rounding=None, context=None)`

Round to the nearest integer without signaling `Inexact` or
`Rounded`.  If given, applies *rounding*; otherwise, uses the
rounding method in either the supplied *context* or the current context.

Decimal numbers can be rounded using the `.round()` function:

### `round(number, ndigits)`

If *ndigits* is not given or `None`,
returns the nearest `int` to *number*,
rounding ties to even, and ignoring the rounding mode of the
`Decimal` context.  Raises `OverflowError` if *number* is an
infinity or `ValueError` if it is a (quiet or signaling) NaN.

If *ndigits* is an `int`, the context's rounding mode is respected
and a `Decimal` representing *number* rounded to the nearest
multiple of `Decimal('1E-ndigits')` is returned; in this case,
`round(number, ndigits)` is equivalent to
`self.quantize(Decimal('1E-ndigits'))`.  Returns `Decimal('NaN')` if
*number* is a quiet NaN.  Raises `InvalidOperation` if *number*
is an infinity, a signaling NaN, or if the length of the coefficient after
the quantize operation would be greater than the current context's
precision.  In other words, for the non-corner cases:

- if *ndigits* is positive, return *number* rounded to *ndigits* decimal
places;
- if *ndigits* is zero, return *number* rounded to the nearest integer;
- if *ndigits* is negative, return *number* rounded to the nearest
multiple of `10**abs(ndigits)`.

For example:

```
>>> from decimal import Decimal, getcontext, ROUND_DOWN
>>> getcontext().rounding = ROUND_DOWN
>>> round(Decimal('3.75'))     # context rounding ignored
4
>>> round(Decimal('3.5'))      # round-ties-to-even
4
>>> round(Decimal('3.75'), 0)  # uses the context rounding
Decimal('3')
>>> round(Decimal('3.75'), 1)
Decimal('3.7')
>>> round(Decimal('3.75'), -1)
Decimal('0E+1')
```

### Logical operands

The `logical_and()`, `logical_invert()`, `logical_or()`,
and `logical_xor()` methods expect their arguments to be *logical
operands*.  A *logical operand* is a `Decimal` instance whose
exponent and sign are both zero, and whose digits are all either
`0` or `1`.
