---
title: "math --- Mathematical functions (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/math.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# math --- Mathematical functions (part 2 of 3)

## Floating point manipulation functions

### `copysign(x, y)`

Return a float with the magnitude (absolute value) of *x* but the sign of
*y*.  On platforms that support signed zeros, `copysign(1.0, -0.0)`
returns *-1.0*.

### `frexp(x)`

Return the mantissa and exponent of *x* as the pair `(m, e)`.
If *x* is a finite nonzero number, then *m* is a float with
`0.5 <= abs(m) < 1.0` and an integer *e* is such that
`x == m * 2**e` exactly.  Else, return `(x, 0)`.
This is used to "pick apart" the internal representation of
a float in a portable way.

Note that `frexp()` has a different call/return pattern
than its C equivalents: it takes a single argument and return a pair of
values, rather than returning its second return value through an 'output
parameter' (there is no such thing in Python).

### `isclose(a, b, *, rel_tol=1e-09, abs_tol=0.0)`

Return `True` if the values *a* and *b* are close to each other and
`False` otherwise.

Whether or not two values are considered close is determined according to
given absolute and relative tolerances.  If no errors occur, the result will
be: `abs(a-b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)`.

*rel_tol* is the relative tolerance -- it is the maximum allowed difference
between *a* and *b*, relative to the larger absolute value of *a* or *b*.
For example, to set a tolerance of 5%, pass `rel_tol=0.05`.  The default
tolerance is `1e-09`, which assures that the two values are the same
within about 9 decimal digits.  *rel_tol* must be nonnegative and less
than `1.0`.

*abs_tol* is the absolute tolerance; it defaults to `0.0` and it must be
nonnegative.  When comparing `x` to `0.0`, `isclose(x, 0)` is computed
as `abs(x) <= rel_tol  * abs(x)`, which is `False` for any nonzero `x` and
*rel_tol* less than `1.0`.  So add an appropriate positive *abs_tol* argument
to the call.

The IEEE 754 special values of `NaN`, `inf`, and `-inf` will be
handled according to IEEE rules.  Specifically, `NaN` is not considered
close to any other value, including `NaN`.  `inf` and `-inf` are only
considered close to themselves.

> *Added in version 3.5.*

> **See also:** PEP 485 -- A function for testing approximate equality

### `isfinite(x)`

Return `True` if *x* is neither an infinity nor a NaN, and
`False` otherwise.  (Note that `0.0` *is* considered finite.)

> *Added in version 3.2.*

### `isnormal(x)`

Return `True` if *x* is a normal number, that is a finite
nonzero number that is not a subnormal (see `issubnormal()`).
Return `False` otherwise.

> *Added in version 3.15.*

### `issubnormal(x)`

Return `True` if *x* is a subnormal number, that is a finite
nonzero number with a magnitude smaller than `sys.float_info.min`.
Return `False` otherwise.

> *Added in version 3.15.*

### `isinf(x)`

Return `True` if *x* is a positive or negative infinity, and
`False` otherwise.

### `isnan(x)`

Return `True` if *x* is a NaN (not a number), and `False` otherwise.

### `ldexp(x, i)`

Return `x * (2**i)`.  This is essentially the inverse of function
`frexp()`.

### `nextafter(x, y, steps=1)`

Return the floating-point value *steps* steps after *x* towards *y*.

If *x* is equal to *y*, return *y*, unless *steps* is zero.

Examples:

- `math.nextafter(x, math.inf)` goes up: towards positive infinity.
- `math.nextafter(x, -math.inf)` goes down: towards minus infinity.
- `math.nextafter(x, 0.0)` goes towards zero.
- `math.nextafter(x, math.copysign(math.inf, x))` goes away from zero.

See also `math.ulp()`.

> *Added in version 3.9.*

> *Changed in version 3.12.*
> Added the *steps* argument.

### `signbit(x)`

Return `True` if the sign of *x* is negative and `False` otherwise.

This is useful to detect the sign bit of zeroes, infinities and NaNs.

> *Added in version 3.15.*

### `ulp(x)`

Return the value of the least significant bit of the float *x*:

- If *x* is a NaN (not a number), return *x*.
- If *x* is negative, return `ulp(-x)`.
- If *x* is a positive infinity, return *x*.
- If *x* is equal to zero, return the smallest positive
*denormalized* representable float (smaller than the minimum positive
*normalized* float, `sys.float_info.min`).
- If *x* is equal to the largest positive representable float,
return the value of the least significant bit of *x*, such that the first
float smaller than *x* is `x - ulp(x)`.
- Otherwise (*x* is a positive finite number), return the value of the least
significant bit of *x*, such that the first float bigger than *x*
is `x + ulp(x)`.

ULP stands for "Unit in the Last Place".

See also `math.nextafter()` and :data:`sys.float_info.epsilon
<sys.float_info>`.

> *Added in version 3.9.*

## Power, exponential and logarithmic functions

### `cbrt(x)`

Return the cube root of *x*.

> *Added in version 3.11.*

### `exp(x)`

Return *e* raised to the power *x*, where *e* = 2.718281... is the base
of natural logarithms.  This is usually more accurate than `math.e ** x`
or `pow(math.e, x)`.

### `exp2(x)`

Return *2* raised to the power *x*.

> *Added in version 3.11.*

### `expm1(x)`

Return *e* raised to the power *x*, minus 1.  Here *e* is the base of natural
logarithms.  For small floats *x*, the subtraction in `exp(x) - 1`
can result in a `significant loss of precision
<https://en.wikipedia.org/wiki/Loss_of_significance>`_\; the `expm1()`
function provides a way to compute this quantity to full precision:

```python
>>> from math import exp, expm1
>>> exp(1e-5) - 1  # gives result accurate to 11 places
1.0000050000069649e-05
>>> expm1(1e-5)    # result accurate to full precision
1.0000050000166668e-05
```

> *Added in version 3.2.*

### `log(x[, base])`

With one argument, return the natural logarithm of *x* (to base *e*).

With two arguments, return the logarithm of *x* to the given *base*,
calculated as `log(x)/log(base)`.

### `log1p(x)`

Return the natural logarithm of *1+x* (base *e*). The
result is calculated in a way which is accurate for *x* near zero.

### `log2(x)`

Return the base-2 logarithm of *x*. This is usually more accurate than
`log(x, 2)`.

> *Added in version 3.3.*

> **See also:** `int.bit_length()` returns the number of bits necessary to represent
> an integer in binary, excluding the sign and leading zeros.

### `log10(x)`

Return the base-10 logarithm of *x*.  This is usually more accurate
than `log(x, 10)`.

### `pow(x, y)`

Return *x* raised to the power *y*.  Exceptional cases follow
the IEEE 754 standard as far as possible.  In particular,
`pow(1.0, x)` and `pow(x, 0.0)` always return `1.0`, even
when *x* is a zero or a NaN.  If both *x* and *y* are finite,
*x* is negative, and *y* is not an integer then `pow(x, y)`
is undefined, and raises `ValueError`.

Unlike the built-in `**` operator, `math.pow()` converts both
its arguments to type `float`.  Use `**` or the built-in
`pow()` function for computing exact integer powers.

> *Changed in version 3.11.*
> The special cases `pow(0.0, -inf)` and `pow(-0.0, -inf)` were
> changed to return `inf` instead of raising `ValueError`,
> for consistency with IEEE 754.

### `sqrt(x)`

Return the square root of *x*.

## Summation and product functions

### `dist(p, q)`

Return the Euclidean distance between two points *p* and *q*, each
given as a sequence (or iterable) of coordinates.  The two points
must have the same dimension.

Roughly equivalent to:

```
sqrt(sum((px - qx) ** 2.0 for px, qx in zip(p, q, strict=True)))
```

> *Added in version 3.8.*

### `fsum(iterable)`

Return an accurate floating-point sum of values in the iterable.  Avoids
loss of precision by tracking multiple intermediate partial sums.

The algorithm's accuracy depends on IEEE-754 arithmetic guarantees and the
typical case where the rounding mode is half-even.  On some non-Windows
builds, the underlying C library uses extended precision addition and may
occasionally double-round an intermediate sum causing it to be off in its
least significant bit.

For further discussion and two alternative approaches, see the `ASPN cookbook
recipes for accurate floating-point summation
<https://code.activestate.com/recipes/393090-binary-floating-point-summation-accurate-to-full-p/>`_\.

### `hypot(*coordinates)`

Return the Euclidean norm, `sqrt(sum(x**2 for x in coordinates))`.
This is the length of the vector from the origin to the point
given by the coordinates.

For a two dimensional point `(x, y)`, this is equivalent to computing
the hypotenuse of a right triangle using the Pythagorean theorem,
`sqrt(x*x + y*y)`.

> *Changed in version 3.8.*
> Added support for n-dimensional points. Formerly, only the two
> dimensional case was supported.

> *Changed in version 3.10.*
> Improved the algorithm's accuracy so that the maximum error is
> under 1 ulp (unit in the last place).  More typically, the result
> is almost always correctly rounded to within 1/2 ulp.

### `prod(iterable, *, start=1)`

Calculate the product of all the elements in the input *iterable*.
The default *start* value for the product is `1`.

When the iterable is empty, return the start value.  This function is
intended specifically for use with numeric values and may reject
non-numeric types.

> *Added in version 3.8.*

### `sumprod(p, q)`

Return the sum of products of values from two iterables *p* and *q*.

Raises `ValueError` if the inputs do not have the same length.

Roughly equivalent to:

```
sum(map(operator.mul, p, q, strict=True))
```

For float and mixed int/float inputs, the intermediate products
and sums are computed with extended precision.

> *Added in version 3.12.*

## Angular conversion

### `degrees(x)`

Convert angle *x* from radians to degrees.

### `radians(x)`

Convert angle *x* from degrees to radians.

## Trigonometric functions

### `acos(x)`

Return the arc cosine of *x*, in radians. The result is between `0` and
`pi`.

### `asin(x)`

Return the arc sine of *x*, in radians. The result is between `-pi/2` and
`pi/2`.

### `atan(x)`

Return the arc tangent of *x*, in radians. The result is between `-pi/2` and
`pi/2`.

### `atan2(y, x)`

Return `atan(y / x)`, in radians. The result is between `-pi` and `pi`.
The vector in the plane from the origin to point `(x, y)` makes this angle
with the positive X axis. The point of `atan2()` is that the signs of both
inputs are known to it, so it can compute the correct quadrant for the angle.
For example, `atan(1)` and `atan2(1, 1)` are both `pi/4`, but ``atan2(-1,
-1)` is `-3*pi/4``.

### `cos(x)`

Return the cosine of *x* radians.

### `sin(x)`

Return the sine of *x* radians.

### `tan(x)`

Return the tangent of *x* radians.

## Hyperbolic functions

Hyperbolic functions
are analogs of trigonometric functions that are based on hyperbolas
instead of circles.

### `acosh(x)`

Return the inverse hyperbolic cosine of *x*.

### `asinh(x)`

Return the inverse hyperbolic sine of *x*.

### `atanh(x)`

Return the inverse hyperbolic tangent of *x*.

### `cosh(x)`

Return the hyperbolic cosine of *x*.

### `sinh(x)`

Return the hyperbolic sine of *x*.

### `tanh(x)`

Return the hyperbolic tangent of *x*.

## Special functions

### `erf(x)`

Return the error function at
*x*.

The `erf()` function can be used to compute traditional statistical
functions such as the `cumulative standard normal distribution
<https://en.wikipedia.org/wiki/Cumulative_distribution_function>`_:

```
def phi(x):
    'Cumulative distribution function for the standard normal distribution'
    return (1.0 + erf(x / sqrt(2.0))) / 2.0
```

> *Added in version 3.2.*

### `erfc(x)`

Return the complementary error function at *x*.  The `complementary error
function <https://en.wikipedia.org/wiki/Error_function>`_ is defined as
`1.0 - erf(x)`.  It is used for large values of *x* where a subtraction
from one would cause a `loss of significance
<https://en.wikipedia.org/wiki/Loss_of_significance>`_\.

> *Added in version 3.2.*

### `gamma(x)`

Return the Gamma function at
*x*.

> *Added in version 3.2.*

### `lgamma(x)`

Return the natural logarithm of the absolute value of the Gamma
function at *x*.

> *Added in version 3.2.*

## Number-theoretic functions

For backward compatibility, the `math` module provides also aliases of
the following functions from the `math.integer` module:

- - .. function:: comb(n, k)
:no-typesetting:

`comb(n, k)`
- Number of ways to choose *k* items from *n* items without repetition
and without order

- - .. function:: factorial(n)
:no-typesetting:

`factorial(n)`
- *n* factorial

- - .. function:: gcd(*integers)
:no-typesetting:

`gcd(*integers)`
- Greatest common divisor of the integer arguments

- - .. function:: isqrt(n)
:no-typesetting:

`isqrt(n)`
- Integer square root of a nonnegative integer *n*

- - .. function:: lcm(*integers)
:no-typesetting:

`lcm(*integers)`
- Least common multiple of the integer arguments

- - .. function:: perm(n, k)
:no-typesetting:

`perm(n, k)`
- Number of ways to choose *k* items from *n* items without repetition
and with order

> *Added in version 3.5.*
> The `gcd()` function.

> *Added in version 3.8.*
> The `comb()`, `perm()` and `isqrt()` functions.

> *Added in version 3.9.*
> The `lcm()` function.

> *Changed in version 3.9.*
> Added support for an arbitrary number of arguments in the `gcd()`
> function.
> Formerly, only two arguments were supported.

> *Changed in version 3.10.*
> Floats with integral values (like `5.0`) are no longer accepted in the
> `factorial()` function.

3.15
Use the `math.integer` functions instead of these aliases.
