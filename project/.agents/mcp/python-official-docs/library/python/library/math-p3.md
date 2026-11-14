---
title: "math --- Mathematical functions (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/math.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# math --- Mathematical functions (part 3 of 3)

## Constants

### `pi`

The mathematical constant *π* = 3.141592..., to available precision.

### `e`

The mathematical constant *e* = 2.718281..., to available precision.

### `tau`

The mathematical constant *τ* = 6.283185..., to available precision.
Tau is a circle constant equal to 2*π*, the ratio of a circle's circumference to
its radius. To learn more about Tau, check out Vi Hart's video `Pi is (still)
Wrong <https://vimeo.com/147792667>`_, and start celebrating
Tau day by eating twice as much pie!

> *Added in version 3.6.*

### `inf`

A floating-point positive infinity.  (For negative infinity, use
`-math.inf`.)  Equivalent to the output of `float('inf')`.

> *Added in version 3.5.*

### `nan`

A floating-point "not a number" (NaN) value. Equivalent to the output of
`float('nan')`. Due to the requirements of the `IEEE-754 standard
<https://en.wikipedia.org/wiki/IEEE_754>`_, `math.nan` and `float('nan')` are
not considered to equal to any other numeric value, including themselves. To check
whether a number is a NaN, use the `isnan()` function to test
for NaNs instead of `is` or `==`.
Example:

```python
>>> import math
>>> math.nan == math.nan
False
>>> float('nan') == float('nan')
False
>>> math.isnan(math.nan)
True
>>> math.isnan(float('nan'))
True
```

> *Added in version 3.5.*

> *Changed in version 3.11.*
> It is now always available.

> **CPython implementation detail:** The `math` module consists mostly of thin wrappers around the platform C
> math library functions.  Behavior in exceptional cases follows Annex F of
> the C99 standard where appropriate.  The current implementation will raise
> `ValueError` for invalid operations like `sqrt(-1.0)` or `log(0.0)`
> (where C99 Annex F recommends signaling invalid operation or divide-by-zero),
> and `OverflowError` for results that overflow (for example,
> `exp(1000.0)`).  A NaN will not be returned from any of the functions
> above unless one or more of the input arguments was a NaN; in that case,
> most functions will return a NaN, but (again following C99 Annex F) there
> are some exceptions to this rule, for example `pow(float('nan'), 0.0)` or
> `hypot(float('nan'), float('inf'))`.
>
> Note that Python makes no effort to distinguish signaling NaNs from
> quiet NaNs, and behavior for signaling NaNs remains unspecified.
> Typical behavior is to treat all NaNs as though they were quiet.

> **See also:** Module `cmath`
> Complex number versions of many of these functions.
>
> Module `math.integer`
> Integer-specific mathematics functions.
