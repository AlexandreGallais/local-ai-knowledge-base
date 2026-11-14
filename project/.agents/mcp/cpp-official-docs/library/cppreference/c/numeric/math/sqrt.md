# sqrt, sqrtf, sqrtl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float sqrtf( float arg );` | (1) | (since C99) |
| `double sqrt( double arg );` | (2) |  |
| `long double sqrtl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define sqrt( arg )` | (4) | (since C99) |

1-3) Computes square root of `arg`.

4) Type-generic macro: If `arg` has type `long double`, `sqrtl` is called. Otherwise, if `arg` has integer type or the type `double`, `sqrt` is called. Otherwise, `sqrtf` is called. If `arg` is complex or imaginary, then the macro invokes the corresponding complex function (`csqrtf`, `csqrt`, `csqrtl`).

### Parameters

arg - floating-point value

### Return value

If no errors occur, square root of `arg` (\({\small \sqrt{arg} }\)√arg), is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error occurs if `arg` is less than zero.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is less than -0, `FE_INVALID` is raised and NaN is returned.
- If the argument is +∞ or ±0, it is returned, unmodified.
- If the argument is NaN, NaN is returned.

### Notes

`sqrt` is required by the IEEE standard to be correctly rounded from the infinitely precise result. In particular, the exact result is produced if it can be represented in the floating-point type. The only other operations which require this are the arithmetic operators and the function `fma`. Other functions, including `pow`, are not so constrained.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    // normal use
    printf("sqrt(100) = %f\n", sqrt(100));
    printf("sqrt(2) = %f\n", sqrt(2));
    printf("golden ratio = %f\n", (1 + sqrt(5)) / 2);

    // special values
    printf("sqrt(-0) = %f\n", sqrt(-0.0));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("sqrt(-1.0) = %f\n", sqrt(-1));
    if (errno == EDOM)
        perror("    errno == EDOM");
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID was raised");
}
```

Possible output:

```text
sqrt(100) = 10.000000
sqrt(2) = 1.414214
golden ratio = 1.618034
sqrt(-0) = -0.000000
sqrt(-1.0) = -nan
    errno = EDOM: Numerical argument out of domain
    FE_INVALID was raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.7.5 The sqrt functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.4.5 The sqrt functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.7.5 The sqrt functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.4.5 The sqrt functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.7.5 The sqrt functions (p: 249)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.4.5 The sqrt functions (p: 525)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.7.5 The sqrt functions (p: 229-230)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.4.5 The sqrt functions (p: 462)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.5.2 The sqrt function

### See also

|  |  |
| --- | --- |
| pow, powf, powl (C99), (C99) | computes a number raised to the given power (\(\small{x^y}\)xy) (function) |
| cbrt, cbrtf, cbrtl (C99), (C99), (C99) | computes cube root (\(\small{\sqrt[3]{x} }\)3√x) (function) |
| hypot, hypotf, hypotl (C99), (C99), (C99) | computes square root of the sum of the squares of two given numbers (\(\scriptsize{\sqrt{x^2+y^2} }\)√x2 +y2 ) (function) |
| csqrt, csqrtf, csqrtl (C99), (C99), (C99) | computes the complex square root (function) |
| C++ documentation for sqrt |  |
