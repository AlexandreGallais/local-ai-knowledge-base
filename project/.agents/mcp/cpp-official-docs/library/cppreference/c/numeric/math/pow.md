# pow, powf, powl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float powf( float base, float exponent );` | (1) | (since C99) |
| `double pow( double base, double exponent );` | (2) |  |
| `long double powl( long double base, long double exponent );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define pow( base, exponent )` | (4) | (since C99) |

1-3) Computes the value of `base` raised to the power `exponent`.

4) Type-generic macro: If any argument has type `long double`, `powl` is called. Otherwise, if any argument has integer type or has type `double`, `pow` is called. Otherwise, `powf` is called. If at least one argument is complex or imaginary, then the macro invokes the corresponding complex function (`cpowf`, `cpow`, `cpowl`).

### Parameters

|  |  |  |
| --- | --- | --- |
| base | - | base as floating-point value |
| exponent | - | exponent as floating-point value |

### Return value

If no errors occur, `base` raised to the power of `exponent` (baseexponent ) is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a pole error or a range error due to overflow occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If `base` is finite and negative and `exponent` is finite and non-integer, a domain error occurs and a range error may occur.

If `base` is zero and `exponent` is zero, a domain error may occur.

If `base` is zero and `exponent` is negative, a domain error or a pole error may occur.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- `pow(+0, exponent)`, where `exponent` is a negative odd integer, returns `+∞` and raises `FE_DIVBYZERO`
- `pow(-0, exponent)`, where `exponent` is a negative odd integer, returns `-∞` and raises `FE_DIVBYZERO`
- `pow(±0, exponent)`, where `exponent` is negative, finite, and is an even integer or a non-integer, returns +∞ and raises `FE_DIVBYZERO`
- `pow(±0, -∞)` returns +∞ and may raise `FE_DIVBYZERO`(until C23)
- `pow(+0, exponent)`, where `exponent` is a positive odd integer, returns +0
- `pow(-0, exponent)`, where `exponent` is a positive odd integer, returns -0
- `pow(±0, exponent)`, where `exponent` is positive non-integer or a positive even integer, returns +0
- `pow(-1, ±∞)` returns `1`
- `pow(+1, exponent)` returns `1` for any `exponent`, even when `exponent` is `NaN`
- `pow(base, ±0)` returns `1` for any `base`, even when `base` is `NaN`
- `pow(base, exponent)` returns `NaN` and raises `FE_INVALID` if `base` is finite and negative and `exponent` is finite and non-integer.
- `pow(base, -∞)` returns +∞ for any `|base|<1`
- `pow(base, -∞)` returns +0 for any `|base|>1`
- `pow(base, +∞)` returns +0 for any `|base|<1`
- `pow(base, +∞)` returns +∞ for any `|base|>1`
- `pow(-∞, exponent)` returns -0 if `exponent` is a negative odd integer
- `pow(-∞, exponent)` returns +0 if `exponent` is a negative non-integer or negative even integer
- `pow(-∞, exponent)` returns -∞ if `exponent` is a positive odd integer
- `pow(-∞, exponent)` returns +∞ if `exponent` is a positive non-integer or positive even integer
- `pow(+∞, exponent)` returns +0 for any negative `exponent`
- `pow(+∞, exponent)` returns +∞ for any positive `exponent`
- except where specified above, if any argument is NaN, NaN is returned.

### Notes

Although `pow` cannot be used to obtain a root of a negative number, `cbrt` is provided for the common case where `exponent` is `1 / 3`.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    // typical usage
    printf("pow(2, 10) = %f\n", pow(2, 10));
    printf("pow(2, 0.5) = %f\n", pow(2, 0.5));
    printf("pow(-2, -3) = %f\n", pow(-2, -3));

    // special values
    printf("pow(-1, NAN) = %f\n", pow(-1, NAN));
    printf("pow(+1, NAN) = %f\n", pow(+1, NAN));
    printf("pow(INFINITY, 2) = %f\n", pow(INFINITY, 2));
    printf("pow(INFINITY, -1) = %f\n", pow(INFINITY, -1));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("pow(-1, 1/3) = %f\n", pow(-1, 1.0 / 3));
    if (errno == EDOM)
        perror("    errno == EDOM");
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");

    feclearexcept(FE_ALL_EXCEPT);
    printf("pow(-0, -3) = %f\n", pow(-0.0, -3));
    if (fetestexcept(FE_DIVBYZERO))
        puts("    FE_DIVBYZERO raised");
}
```

Possible output:

```text
pow(2, 10) = 1024.000000
pow(2, 0.5) = 1.414214
pow(-2, -3) = -0.125000
pow(-1, NAN) = nan
pow(+1, NAN) = 1.000000
pow(INFINITY, 2) = inf
pow(INFINITY, -1) = 0.000000
pow(-1, 1/3) = -nan
    errno == EDOM: Numerical argument out of domain
    FE_INVALID raised
pow(-0, -3) = -inf
    FE_DIVBYZERO raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.7.5 The pow functions

- 7.27 Type-generic math <tgmath.h>

- F.10.4.5 The pow functions (p: 524-525)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.7.4 The pow functions (p: 248-249)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.4.4 The pow functions (p: 524-525)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.7.4 The pow functions (p: 248-249)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.4.4 The pow functions (p: 524-525)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.7.4 The pow functions (p: 229)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.4.4 The pow functions (p: 461)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.5.1 The pow function

### See also

|  |  |
| --- | --- |
| sqrt, sqrtf, sqrtl (C99), (C99) | computes square root (\(\small{\sqrt{x} }\)√x) (function) |
| cbrt, cbrtf, cbrtl (C99), (C99), (C99) | computes cube root (\(\small{\sqrt[3]{x} }\)3√x) (function) |
| hypot, hypotf, hypotl (C99), (C99), (C99) | computes square root of the sum of the squares of two given numbers (\(\scriptsize{\sqrt{x^2+y^2} }\)√x2 +y2 ) (function) |
| cpow, cpowf, cpowl (C99), (C99), (C99) | computes the complex power function (function) |
| C++ documentation for pow |  |
