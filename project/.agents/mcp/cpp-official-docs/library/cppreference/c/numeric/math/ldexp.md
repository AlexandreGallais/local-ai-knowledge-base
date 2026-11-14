# ldexp, ldexpf, ldexpl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float ldexpf( float arg, int exp );` | (1) | (since C99) |
| `double ldexp( double arg, int exp );` | (2) |  |
| `long double ldexpl( long double arg, int exp );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define ldexp( arg, exp )` | (4) | (since C99) |

1-3) Multiplies a floating-point value `arg` by the number `2` raised to the `exp` power.

4) Type-generic macro: If `arg` has type `long double`, `ldexpl` is called. Otherwise, if `arg` has integer type or the type `double`, `ldexp` is called. Otherwise, `ldexpf` is called, respectively.

### Parameters

|  |  |  |
| --- | --- | --- |
| arg | - | floating-point value |
| exp | - | integer value |

### Return value

If no errors occur, `arg` multiplied by 2 to the power of `exp` (arg×2exp ) is returned.

If a range error due to overflow occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned.

If a range error due to underflow occurs, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- Unless a range error occurs, `FE_INEXACT` is never raised (the result is exact)
- Unless a range error occurs, the current rounding mode is ignored
- If `arg` is ±0, it is returned, unmodified
- If `arg` is ±∞, it is returned, unmodified
- If `exp` is 0, then `arg` is returned, unmodified
- If `arg` is NaN, NaN is returned.

### Notes

On binary systems (where `FLT_RADIX` is `2`), `ldexp` is equivalent to `scalbn`.

The function `ldexp` ("load exponent"), together with its dual, `frexp`, can be used to manipulate the representation of a floating-point number without direct bit manipulations.

On many implementations, `ldexp` is less efficient than multiplication or division by a power of two using arithmetic operators.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <float.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    printf("ldexp(7, -4) = %f\n", ldexp(7, -4));
    printf("ldexp(1, -1074) = %g (minimum positive subnormal double)\n",
            ldexp(1, -1074));
    printf("ldexp(nextafter(1,0), 1024) = %g (largest finite double)\n",
            ldexp(nextafter(1,0), 1024));

    // special values
    printf("ldexp(-0, 10) = %f\n", ldexp(-0.0, 10));
    printf("ldexp(-Inf, -1) = %f\n", ldexp(-INFINITY, -1));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("ldexp(1, 1024) = %f\n", ldexp(1, 1024));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
ldexp(7, -4) = 0.437500
ldexp(1, -1074) = 4.94066e-324 (minimum positive subnormal double)
ldexp(nextafter(1,0), 1024) = 1.79769e+308 (largest finite double)
ldexp(-0, 10) = -0.000000
ldexp(-Inf, -1) = -inf
ldexp(1, 1024) = inf
    errno == ERANGE: Numerical result out of range
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.6 The ldexp functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.6 The ldexp functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.6 The ldexp functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.6 The ldexp functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.6 The ldexp functions (p: 244)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.6 The ldexp functions (p: 522)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.6 The ldexp functions (p: 225)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.6 The ldexp functions (p: 459)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.4.3 The ldexp function

### See also

|  |  |
| --- | --- |
| frexp, frexpf, frexpl (C99), (C99) | breaks a number into significand and a power of 2 (function) |
| scalbn, scalbnf, scalbnl, scalbln, scalblnf, scalblnl (C99), (C99), (C99), (C99), (C99), (C99) | computes efficiently a number times `FLT_RADIX` raised to a power (function) |
| C++ documentation for ldexp |  |
