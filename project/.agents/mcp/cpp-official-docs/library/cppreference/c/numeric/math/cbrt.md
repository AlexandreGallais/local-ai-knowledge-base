# cbrt, cbrtf, cbrtl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float cbrtf( float arg );` | (1) | (since C99) |
| `double cbrt( double arg );` | (2) | (since C99) |
| `long double cbrtl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define cbrt( arg )` | (4) | (since C99) |

1-3) Computes the cube root of `arg`.

4) Type-generic macro: If `arg` has type `long double`, `cbrtl` is called. Otherwise, if `arg` has integer type or the type `double`, `cbrt` is called. Otherwise, `cbrtf` is called.

### Parameters

arg - floating-point value

### Return value

If no errors occur, the cube root of `arg` (\(\small{\sqrt[3]{arg} }\)3√arg), is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- if the argument is ±0 or ±∞, it is returned, unchanged
- if the argument is NaN, NaN is returned.

### Notes

`cbrt(arg)` is not equivalent to `pow(arg, 1.0/3)` because the rational number \(\small{\frac1{3} }\) 1 3 is typically not equal to `1.0/3` and `std::pow` cannot raise a negative base to a fractional exponent. Moreover, `cbrt(arg)` usually gives more accurate results than `pow(arg, 1.0/3)` (see example).

### Example

```c
#include <float.h>
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("Normal use:\n"
           "cbrt(729)      = %f\n", cbrt(729));
    printf("cbrt(-0.125)   = %f\n", cbrt(-0.125));
    printf("Special values:\n"
           "cbrt(-0)       = %f\n", cbrt(-0.0));
    printf("cbrt(+inf)     = %f\n", cbrt(INFINITY));
    printf("Accuracy:\n"
           "cbrt(343)      = %.*f\n", DBL_DECIMAL_DIG, cbrt(343));
    printf("pow(343,1.0/3) = %.*f\n", DBL_DECIMAL_DIG, pow(343, 1.0/3));
}
```

Possible output:

```text
Normal use:
cbrt(729)      = 9.000000
cbrt(-0.125)   = -0.500000
Special values:
cbrt(-0)       = -0.000000
cbrt(+inf)     = inf
Accuracy:
cbrt(343)      = 7.00000000000000000
pow(343,1.0/3) = 6.99999999999999911
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.7.1 The cbrt functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.4.1 The cbrt functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.7.1 The cbrt functions (p: 180-181)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.4.1 The cbrt functions (p: 381-)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.7.1 The cbrt functions (p: 247)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.4.1 The cbrt functions (p: 524)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.7.1 The cbrt functions (p: 228)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.4.1 The cbrt functions (p: 460)

### See also

|  |  |
| --- | --- |
| pow, powf, powl (C99), (C99) | computes a number raised to the given power (\(\small{x^y}\)xy) (function) |
| sqrt, sqrtf, sqrtl (C99), (C99) | computes square root (\(\small{\sqrt{x} }\)√x) (function) |
| hypot, hypotf, hypotl (C99), (C99), (C99) | computes square root of the sum of the squares of two given numbers (\(\scriptsize{\sqrt{x^2+y^2} }\)√x2 +y2 ) (function) |
| C++ documentation for cbrt |  |
