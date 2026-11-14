# scalbn, scalbnf, scalbnl, scalbln, scalblnf, scalblnl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float scalbnf( float arg, int exp );` | (1) | (since C99) |
| `double scalbn( double arg, int exp );` | (2) | (since C99) |
| `long double scalbnl( long double arg, int exp );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define scalbn( arg, exp )` | (4) | (since C99) |
| Defined in header `<math.h>` |  |  |
| `float scalblnf( float arg, long exp );` | (5) | (since C99) |
| `double scalbln( double arg, long exp );` | (6) | (since C99) |
| `long double scalblnl( long double arg, long exp );` | (7) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define scalbln( arg, exp )` | (8) | (since C99) |

1-3,5-7) Multiplies a floating-point value `arg` by `FLT_RADIX` raised to power `exp`.

4,8) Type-generic macros: If `arg` has type `long double`, `scalbnl` or `scalblnl` is called. Otherwise, if `arg` has integer type or the type `double`, `scalbn` or `scalbln` is called. Otherwise, `scalbnf` or `scalblnf` is called, respectively.

### Parameters

|  |  |  |
| --- | --- | --- |
| arg | - | floating-point value |
| exp | - | integer value |

### Return value

If no errors occur, `arg` multiplied by `FLT_RADIX` to the power of `exp` (arg×FLT_RADIXexp ) is returned.

If a range error due to overflow occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned.

If a range error due to underflow occurs, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- Unless a range error occurs, `FE_INEXACT` is never raised (the result is exact).
- Unless a range error occurs, the current rounding mode is ignored.
- If `arg` is ±0, it is returned, unmodified.
- If `arg` is ±∞, it is returned, unmodified.
- If `exp` is 0, then `arg` is returned, unmodified.
- If `arg` is NaN, NaN is returned.

### Notes

On binary systems (where `FLT_RADIX` is `2`), `scalbn` is equivalent to `ldexp`.

Although `scalbn` and `scalbln` are specified to perform the operation efficiently, on many implementations they are less efficient than multiplication or division by a power of two using arithmetic operators.

The `scalbln` function is provided because the factor required to scale from the smallest positive floating-point value to the largest finite one may be greater than `32767`, the standard-guaranteed `INT_MAX`. In particular, for the 80-bit `long double`, the factor is `32828`.

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
    printf("scalbn(7, -4) = %f\n", scalbn(7, -4));
    printf("scalbn(1, -1074) = %g (minimum positive subnormal double)\n",
            scalbn(1, -1074));
    printf("scalbn(nextafter(1,0), 1024) = %g (largest finite double)\n",
            scalbn(nextafter(1,0), 1024));

    // special values
    printf("scalbn(-0, 10) = %f\n", scalbn(-0.0, 10));
    printf("scalbn(-Inf, -1) = %f\n", scalbn(-INFINITY, -1));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("scalbn(1, 1024) = %f\n", scalbn(1, 1024));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
scalbn(7, -4) = 0.437500
scalbn(1, -1074) = 4.94066e-324 (minimum positive subnormal double)
scalbn(nextafter(1,0), 1024) = 1.79769e+308 (largest finite double)
scalbn(-0, 10) = -0.000000
scalbn(-Inf, -1) = -inf
scalbn(1, 1024) = inf
    errno == ERANGE: Numerical result out of range
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.13 The scalbn functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.13 The scalbn functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.13 The scalbn functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.13 The scalbn functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.13 The scalbn functions (p: 247)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.13 The scalbn functions (p: 523)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.13 The scalbn functions (p: 228)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.13 The scalbn functions (p: 460)

### See also

|  |  |
| --- | --- |
| frexp, frexpf, frexpl (C99), (C99) | breaks a number into significand and a power of 2 (function) |
| ldexp, ldexpf, ldexpl (C99), (C99) | multiplies a number by 2 raised to a power (function) |
| C++ documentation for scalbn |  |
