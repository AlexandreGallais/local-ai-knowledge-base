---
title: "decimal --- Decimal fixed-point and floating-point arithmetic (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/decimal.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# decimal --- Decimal fixed-point and floating-point arithmetic (part 2 of 6)

## Decimal objects

### class `Decimal(value="0", context=None)`

Construct a new `Decimal` object based from *value*.

*value* can be an integer, string, tuple, `float`, or another `Decimal`
object. If no *value* is given, returns `Decimal('0')`.  If *value* is a
string, it should conform to the decimal numeric string syntax after leading
and trailing whitespace characters, as well as underscores throughout, are removed:

```
sign           ::=  '+' | '-'
digit          ::=  '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
indicator      ::=  'e' | 'E'
digits         ::=  digit [digit]...
decimal-part   ::=  digits '.' [digits] | ['.'] digits
exponent-part  ::=  indicator [sign] digits
infinity       ::=  'Infinity' | 'Inf'
nan            ::=  'NaN' [digits] | 'sNaN' [digits]
numeric-value  ::=  decimal-part [exponent-part] | infinity
numeric-string ::=  [sign] numeric-value | [sign] nan
```

Other Unicode decimal digits are also permitted where `digit`
appears above.  These include decimal digits from various other
alphabets (for example, Arabic-Indic and Devanāgarī digits) along
with the fullwidth digits `'\uff10'` through `'\uff19'`.
Case is not significant, so, for example, `inf`, `Inf`, `INFINITY`,
and `iNfINity` are all acceptable spellings for positive infinity.

If *value* is a `tuple`, it should have three components, a sign
(`0` for positive or `1` for negative), a `tuple` of
digits, and an integer exponent. For example, `Decimal((0, (1, 4, 1, 4), -3))`
returns `Decimal('1.414')`.

If *value* is a `float`, the binary floating-point value is losslessly
converted to its exact decimal equivalent.  This conversion can often require
53 or more digits of precision.  For example, `Decimal(float('1.1'))`
converts to
`Decimal('1.100000000000000088817841970012523233890533447265625')`.

The *context* precision does not affect how many digits are stored. That is
determined exclusively by the number of digits in *value*. For example,
`Decimal('3.00000')` records all five zeros even if the context precision is
only three.

The purpose of the *context* argument is determining what to do if *value* is a
malformed string.  If the context traps `InvalidOperation`, an exception
is raised; otherwise, the constructor returns a new Decimal with the value of
`NaN`.

Once constructed, `Decimal` objects are immutable.

> *Changed in version 3.2.*
> The argument to the constructor is now permitted to be a `float`
> instance.

> *Changed in version 3.3.*
> `float` arguments raise an exception if the `FloatOperation`
> trap is set. By default the trap is off.

> *Changed in version 3.6.*
> Underscores are allowed for grouping, as with integral and floating-point
> literals in code.

Decimal floating-point objects share many properties with the other built-in
numeric types such as `float` and `int`.  All of the usual math
operations and special methods apply.  Likewise, decimal objects can be
copied, pickled, printed, used as dictionary keys, used as set elements,
compared, sorted, and coerced to another type (such as `float` or
`int`).

There are some small differences between arithmetic on Decimal objects and
arithmetic on integers and floats.  When the remainder operator `%` is
applied to Decimal objects, the sign of the result is the sign of the
*dividend* rather than the sign of the divisor:

```
>>> (-7) % 4
1
>>> Decimal(-7) % Decimal(4)
Decimal('-3')
```

The integer division operator `//` behaves analogously, returning the
integer part of the true quotient (truncating towards zero) rather than its
floor, so as to preserve the usual identity `x == (x // y) * y + x % y`:

```
>>> -7 // 4
-2
>>> Decimal(-7) // Decimal(4)
Decimal('-1')
```

The `%` and `//` operators implement the `remainder` and
`divide-integer` operations (respectively) as described in the
specification.

Decimal objects cannot generally be combined with floats or
instances of `fractions.Fraction` in arithmetic operations:
an attempt to add a `Decimal` to a `float`, for
example, will raise a `TypeError`.  However, it is possible to
use Python's comparison operators to compare a `Decimal`
instance `x` with another number `y`.  This avoids confusing results
when doing equality comparisons between numbers of different types.

> *Changed in version 3.2.*
> Mixed-type comparisons between `Decimal` instances and other
> numeric types are now fully supported.

In addition to the standard numeric properties, decimal floating-point
objects also have a number of specialized methods:

### `adjusted()`

Return the adjusted exponent after shifting out the coefficient's
rightmost digits until only the lead digit remains:
`Decimal('321e+5').adjusted()` returns seven.  Used for determining the
position of the most significant digit with respect to the decimal point.

### `as_integer_ratio()`

Return a pair `(n, d)` of integers that represent the given
`Decimal` instance as a fraction, in lowest terms and
with a positive denominator:

```
>>> Decimal('-3.14').as_integer_ratio()
(-157, 50)
```

The conversion is exact.  Raise OverflowError on infinities and ValueError
on NaNs.

> *Added in version 3.6.*

### `as_tuple()`

Return a named tuple representation of the number:
`DecimalTuple(sign, digits, exponent)`.

### `canonical()`

Return the canonical encoding of the argument.  Currently, the encoding of
a `Decimal` instance is always canonical, so this operation returns
its argument unchanged.

### `compare(other, context=None)`

Compare the values of two Decimal instances.  `compare()` returns a
Decimal instance, and if either operand is a NaN then the result is a
NaN:

```
a or b is a NaN  ==> Decimal('NaN')
a < b            ==> Decimal('-1')
a == b           ==> Decimal('0')
a > b            ==> Decimal('1')
```

### `compare_signal(other, context=None)`

This operation is identical to the `compare()` method, except that all
NaNs signal.  That is, if neither operand is a signaling NaN then any
quiet NaN operand is treated as though it were a signaling NaN.

### `compare_total(other, context=None)`

Compare two operands using their abstract representation rather than their
numerical value.  Similar to the `compare()` method, but the result
gives a total ordering on `Decimal` instances.  Two
`Decimal` instances with the same numeric value but different
representations compare unequal in this ordering:

```python
>>> Decimal('12.0').compare_total(Decimal('12'))
Decimal('-1')
```

Quiet and signaling NaNs are also included in the total ordering.  The
result of this function is `Decimal('0')` if both operands have the same
representation, `Decimal('-1')` if the first operand is lower in the
total order than the second, and `Decimal('1')` if the first operand is
higher in the total order than the second operand.  See the specification
for details of the total order.

This operation is unaffected by context and is quiet: no flags are changed
and no rounding is performed.  As an exception, the C version may raise
InvalidOperation if the second operand cannot be converted exactly.

### `compare_total_mag(other, context=None)`

Compare two operands using their abstract representation rather than their
value as in `compare_total()`, but ignoring the sign of each operand.
`x.compare_total_mag(y)` is equivalent to
`x.copy_abs().compare_total(y.copy_abs())`.

This operation is unaffected by context and is quiet: no flags are changed
and no rounding is performed.  As an exception, the C version may raise
InvalidOperation if the second operand cannot be converted exactly.

### `conjugate()`

Just returns self, this method is only to comply with the Decimal
Specification.

### `copy_abs()`

Return the absolute value of the argument.  This operation is unaffected
by the context and is quiet: no flags are changed and no rounding is
performed.

### `copy_negate()`

Return the negation of the argument.  This operation is unaffected by the
context and is quiet: no flags are changed and no rounding is performed.

### `copy_sign(other, context=None)`

Return a copy of the first operand with the sign set to be the same as the
sign of the second operand.  For example:

```python
>>> Decimal('2.3').copy_sign(Decimal('-1.5'))
Decimal('-2.3')
```

This operation is unaffected by context and is quiet: no flags are changed
and no rounding is performed.  As an exception, the C version may raise
InvalidOperation if the second operand cannot be converted exactly.

### `exp(context=None)`

Return the value of the (natural) exponential function `e**x` at the
given number.  The result is correctly rounded using the
`ROUND_HALF_EVEN` rounding mode.

```python
>>> Decimal(1).exp()
Decimal('2.718281828459045235360287471')
>>> Decimal(321).exp()
Decimal('2.561702493119680037517373933E+139')
```

### classmethod `from_float(f, /)`

Alternative constructor that only accepts instances of `float` or
`int`.

Note `Decimal.from_float(0.1)` is not the same as `Decimal('0.1')`.
Since 0.1 is not exactly representable in binary floating point, the
value is stored as the nearest representable value which is
`0x1.999999999999ap-4`.  That equivalent value in decimal is
`0.1000000000000000055511151231257827021181583404541015625`.

> **Note:** From Python 3.2 onwards, a `Decimal` instance
> can also be constructed directly from a `float`.

```python

>>> Decimal.from_float(0.1)
Decimal('0.1000000000000000055511151231257827021181583404541015625')
>>> Decimal.from_float(float('nan'))
Decimal('NaN')
>>> Decimal.from_float(float('inf'))
Decimal('Infinity')
>>> Decimal.from_float(float('-inf'))
Decimal('-Infinity')
```

> *Added in version 3.1.*

### classmethod `from_number(number, /)`

Alternative constructor that only accepts instances of
`float`, `int` or `Decimal`, but not strings
or tuples.

```python

>>> Decimal.from_number(314)
Decimal('314')
>>> Decimal.from_number(0.1)
Decimal('0.1000000000000000055511151231257827021181583404541015625')
>>> Decimal.from_number(Decimal('3.14'))
Decimal('3.14')
```

> *Added in version 3.14.*

### `fma(other, third, context=None)`

Fused multiply-add.  Return self*other+third with no rounding of the
intermediate product self*other.

```python
>>> Decimal(2).fma(3, 5)
Decimal('11')
```

### `is_canonical()`

Return `True` if the argument is canonical and `False`
otherwise.  Currently, a `Decimal` instance is always canonical, so
this operation always returns `True`.

### `is_finite()`

Return `True` if the argument is a finite number, and
`False` if the argument is an infinity or a NaN.

### `is_infinite()`

Return `True` if the argument is either positive or negative
infinity and `False` otherwise.

### `is_nan()`

Return `True` if the argument is a (quiet or signaling) NaN and
`False` otherwise.

### `is_normal(context=None)`

Return `True` if the argument is a *normal* finite number.  Return
`False` if the argument is zero, subnormal, infinite or a NaN.

### `is_qnan()`

Return `True` if the argument is a quiet NaN, and
`False` otherwise.

### `is_signed()`

Return `True` if the argument has a negative sign and
`False` otherwise.  Note that zeros and NaNs can both carry signs.

### `is_snan()`

Return `True` if the argument is a signaling NaN and `False`
otherwise.

### `is_subnormal(context=None)`

Return `True` if the argument is subnormal, and `False`
otherwise.

### `is_zero()`

Return `True` if the argument is a (positive or negative) zero and
`False` otherwise.

### `ln(context=None)`

Return the natural (base e) logarithm of the operand.  The result is
correctly rounded using the `ROUND_HALF_EVEN` rounding mode.

### `log10(context=None)`

Return the base ten logarithm of the operand.  The result is correctly
rounded using the `ROUND_HALF_EVEN` rounding mode.

### `logb(context=None)`

For a nonzero number, return the adjusted exponent of its operand as a
`Decimal` instance.  If the operand is a zero then
`Decimal('-Infinity')` is returned and the `DivisionByZero` flag
is raised.  If the operand is an infinity then `Decimal('Infinity')` is
returned.

### `logical_and(other, context=None)`

`logical_and()` is a logical operation which takes two *logical
operands* (see logical_operands_label).  The result is the
digit-wise `and` of the two operands.

### `logical_invert(context=None)`

`logical_invert()` is a logical operation.  The
result is the digit-wise inversion of the operand.

### `logical_or(other, context=None)`

`logical_or()` is a logical operation which takes two *logical
operands* (see logical_operands_label).  The result is the
digit-wise `or` of the two operands.

### `logical_xor(other, context=None)`

`logical_xor()` is a logical operation which takes two *logical
operands* (see logical_operands_label).  The result is the
digit-wise exclusive or of the two operands.

### `max(other, context=None)`

Like `max(self, other)` except that the context rounding rule is applied
before returning and that `NaN` values are either signaled or
ignored (depending on the context and whether they are signaling or
quiet).

### `max_mag(other, context=None)`

Similar to the `.max()` method, but the comparison is done using the
absolute values of the operands.

### `min(other, context=None)`

Like `min(self, other)` except that the context rounding rule is applied
before returning and that `NaN` values are either signaled or
ignored (depending on the context and whether they are signaling or
quiet).

### `min_mag(other, context=None)`

Similar to the `.min()` method, but the comparison is done using the
absolute values of the operands.

### `next_minus(context=None)`

Return the largest number representable in the given context (or in the
current thread's context if no context is given) that is smaller than the
given operand.

### `next_plus(context=None)`

Return the smallest number representable in the given context (or in the
current thread's context if no context is given) that is larger than the
given operand.

### `next_toward(other, context=None)`

If the two operands are unequal, return the number closest to the first
operand in the direction of the second operand.  If both operands are
numerically equal, return a copy of the first operand with the sign set to
be the same as the sign of the second operand.
