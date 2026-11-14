---
title: "math --- Mathematical functions (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/math.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `math` --- Mathematical functions

Module `math`.

This module provides access to common mathematical functions and constants,
including those defined by the C standard.

These functions cannot be used with complex numbers; use the functions of the
same name from the `cmath` module if you require support for complex
numbers.  The distinction between functions which support complex numbers and
those which don't is made since most users do not want to learn quite as much
mathematics as required to understand complex numbers.  Receiving an exception
instead of a complex result allows earlier detection of the unexpected complex
number used as a parameter, so that the programmer can determine how and why it
was generated in the first place.

The following functions are provided by this module.  Except when explicitly
noted otherwise, all return values are floats.

```text
====================================================  ============================================
**Floating point arithmetic**
--------------------------------------------------------------------------------------------------
:func:`ceil(x) <ceil>`                                Ceiling of *x*, the smallest integer greater than or equal to *x*
:func:`fabs(x) <fabs>`                                Absolute value of *x*
:func:`floor(x)  <floor>`                             Floor of *x*, the largest integer less than or equal to *x*
:func:`fma(x, y, z) <fma>`                            Fused multiply-add operation: ``(x * y) + z``
:func:`fmax(x, y) <fmax>`                             Maximum of two floating-point values
:func:`fmin(x, y) <fmin>`                             Minimum of two floating-point values
:func:`fmod(x, y) <fmod>`                             Remainder of division ``x / y``
:func:`modf(x) <modf>`                                Fractional and integer parts of *x*
:func:`remainder(x, y) <remainder>`                   Remainder of *x* with respect to *y*
:func:`trunc(x) <trunc>`                              Integer part of *x*
```

## **Floating point manipulation functions**

`copysign(x, y)`                     Magnitude (absolute value) of *x* with the sign of *y*
`frexp(x)`                              Mantissa and exponent of *x*
`isclose(a, b, rel_tol, abs_tol)`     Check if the values *a* and *b* are close to each other
`isfinite(x)`                        Check if *x* is neither an infinity nor a NaN
`isnormal(x)`                        Check if *x* is a normal number
`issubnormal(x)`                  Check if *x* is a subnormal number
`isinf(x)`                              Check if *x* is a positive or negative infinity
`isnan(x)`                              Check if *x* is a NaN  (not a number)
`ldexp(x, i)`                           `x * (2**i)`, inverse of function `frexp()`
`nextafter(x, y, steps)`            Floating-point value *steps* steps after *x* towards *y*
`signbit(x)`                          Check if *x* is a negative number
`ulp(x)`                                  Value of the least significant bit of *x*

## **Power, exponential and logarithmic functions**

`cbrt(x)`                                Cube root of *x*
`exp(x)`                                  *e* raised to the power *x*
`exp2(x)`                                *2* raised to the power *x*
`expm1(x)`                              *e* raised to the power *x*, minus 1
`log(x, base)`                            Logarithm of *x* to the given base (*e* by default)
`log1p(x)`                              Natural logarithm of *1+x* (base *e*)
`log2(x)`                                Base-2 logarithm of *x*
`log10(x)`                              Base-10 logarithm of *x*
`pow(x, y)`                          *x* raised to the power *y*
`sqrt(x)`                                Square root of *x*

## **Summation and product functions**

`dist(p, q)`                             Euclidean distance between two points *p* and *q* given as an iterable of coordinates
`fsum(iterable)`                         Sum of values in the input *iterable*
`hypot(*coordinates)`                   Euclidean norm of an iterable of coordinates
`prod(iterable, start)`                  Product of elements in the input *iterable* with a *start* value
`sumprod(p, q)`                       Sum of products from two iterables *p* and *q*

## **Angular conversion**

`degrees(x)`                          Convert angle *x* from radians to degrees
`radians(x)`                          Convert angle *x* from degrees to radians

## **Trigonometric functions**

`acos(x)`                                Arc cosine of *x*
`asin(x)`                                Arc sine of *x*
`atan(x)`                                Arc tangent of *x*
`atan2(y, x)`                           `atan(y / x)`
`cos(x)`                                  Cosine of *x*
`sin(x)`                                  Sine of *x*
`tan(x)`                                  Tangent of *x*

## **Hyperbolic functions**

`acosh(x)`                              Inverse hyperbolic cosine of *x*
`asinh(x)`                              Inverse hyperbolic sine of *x*
`atanh(x)`                              Inverse hyperbolic tangent of *x*
`cosh(x)`                                Hyperbolic cosine of *x*
`sinh(x)`                                Hyperbolic sine of *x*
`tanh(x)`                                Hyperbolic tangent of *x*

## **Special functions**

`erf(x)`                                  Error function at *x*
`erfc(x)`                                Complementary error function at *x*
`gamma(x)`                              Gamma function at *x*
`lgamma(x)`                            Natural logarithm of the absolute value of the Gamma function at *x*

## **Constants**

`pi`                                            *π* = 3.141592...
`e`                                             *e* = 2.718281...
`tau`                                           *τ* = 2*π* = 6.283185...
`inf`                                           Positive infinity
`nan`                                           "Not a number" (NaN)
====================================================  ============================================

## Floating point arithmetic

### `ceil(x)`

Return the ceiling of *x*, the smallest integer greater than or equal to *x*.
If *x* is not a float, delegates to `x.__ceil__()`,
which should return an `Integral` value.

### `fabs(x)`

Return the absolute value of *x*.

### `floor(x)`

Return the floor of *x*, the largest integer less than or equal to *x*.  If
*x* is not a float, delegates to `x.__floor__()`, which
should return an `Integral` value.

### `fma(x, y, z)`

Fused multiply-add operation. Return `(x * y) + z`, computed as though with
infinite precision and range followed by a single round to the `float`
format. This operation often provides better accuracy than the direct
expression `(x * y) + z`.

This function follows the specification of the fusedMultiplyAdd operation
described in the IEEE 754 standard. The standard leaves one case
implementation-defined, namely the result of `fma(0, inf, nan)`
and `fma(inf, 0, nan)`. In these cases, `math.fma` returns a NaN,
and does not raise any exception.

> *Added in version 3.13.*

### `fmax(x, y)`

Get the larger of two floating-point values, treating NaNs as missing data.

When both operands are (signed) NaNs or zeroes, return `nan` and `0`
respectively and the sign of the result is implementation-defined, that
is, `fmax()` is not required to be sensitive to the sign of such
operands (see Annex F of the C11 standard, §F.10.0.3 and §F.10.9.2).

> *Added in version 3.15.*

### `fmin(x, y)`

Get the smaller of two floating-point values, treating NaNs as missing data.

When both operands are (signed) NaNs or zeroes, return `nan` and `0`
respectively and the sign of the result is implementation-defined, that
is, `fmin()` is not required to be sensitive to the sign of such
operands (see Annex F of the C11 standard, §F.10.0.3 and §F.10.9.3).

> *Added in version 3.15.*

### `fmod(x, y)`

Return the floating-point remainder of `x / y`,
as defined by the platform C library function `fmod(x, y)`. Note that the
Python expression `x % y` may not return the same result.  The intent of the C
standard is that `fmod(x, y)` be exactly (mathematically; to infinite
precision) equal to `x - n*y` for some integer *n* such that the result has
the same sign as *x* and magnitude less than `abs(y)`.  Python's `x % y`
returns a result with the sign of *y* instead, and may not be exactly computable
for float arguments. For example, `fmod(-1e-100, 1e100)` is `-1e-100`, but
the result of Python's `-1e-100 % 1e100` is `1e100-1e-100`, which cannot be
represented exactly as a float, and rounds to the surprising `1e100`.  For
this reason, function `fmod()` is generally preferred when working with
floats, while Python's `x % y` is preferred when working with integers.

### `modf(x)`

Return the fractional and integer parts of *x*.  Both results carry the sign
of *x* and are floats.

Note that `modf()` has a different call/return pattern
than its C equivalents: it takes a single argument and return a pair of
values, rather than returning its second return value through an 'output
parameter' (there is no such thing in Python).

### `remainder(x, y)`

Return the IEEE 754-style remainder of *x* with respect to *y*.  For
finite *x* and finite nonzero *y*, this is the difference `x - n*y`,
where `n` is the closest integer to the exact value of the quotient ``x /
y`.  If `x / y`` is exactly halfway between two consecutive integers, the
nearest *even* integer is used for `n`.  The remainder ``r = remainder(x,
y)` thus always satisfies `abs(r) <= 0.5 * abs(y)``.

Special cases follow IEEE 754: in particular, `remainder(x, math.inf)` is
*x* for any finite *x*, and `remainder(x, 0)` and
`remainder(math.inf, x)` raise `ValueError` for any non-NaN *x*.
If the result of the remainder operation is zero, that zero will have
the same sign as *x*.

On platforms using IEEE 754 binary floating point, the result of this
operation is always exactly representable: no rounding error is introduced.

> *Added in version 3.7.*

### `trunc(x)`

Return *x* with the fractional part
removed, leaving the integer part.  This rounds toward 0: `trunc()` is
equivalent to `floor()` for positive *x*, and equivalent to `ceil()`
for negative *x*. If *x* is not a float, delegates to :meth:`x.__trunc__
<object.__trunc__>`, which should return an `Integral` value.

For the `ceil()`, `floor()`, and `modf()` functions, note that *all*
floating-point numbers of sufficiently large magnitude are exact integers.
Python floats typically carry no more than 53 bits of precision (the same as the
platform C double type), in which case any float *x* with `abs(x) >= 2**52`
necessarily has no fractional bits.
