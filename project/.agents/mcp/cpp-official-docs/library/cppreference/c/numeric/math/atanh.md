# atanh, atanhf, atanhl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float atanhf( float arg );` | (1) | (since C99) |
| `double atanh( double arg );` | (2) | (since C99) |
| `long double atanhl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define atanh( arg )` | (4) | (since C99) |

1-3) Computes the inverse hyperbolic tangent of `arg`.

4) Type-generic macro: If the argument has type `long double`, `atanhl` is called. Otherwise, if the argument has integer type or the type `double`, `atanh` is called. Otherwise, `atanhf` is called. If the argument is complex, then the macro invokes the corresponding complex function (`catanhf`, `catanh`, `catanhl`).

### Parameters

arg - floating_point value representing the area of a hyperbolic sector

### Return value

If no errors occur, the inverse hyperbolic tangent of `arg` (tanh-1 (arg), or artanh(arg)), is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a pole error occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned (with the correct sign).

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the argument is not on the interval `[``-1``,``+1``]`, a range error occurs.

If the argument is ±1, a pole error occurs.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, it is returned unmodified.
- If the argument is ±1, ±∞ is returned and `FE_DIVBYZERO` is raised.
- If |arg|>1, NaN is returned and `FE_INVALID` is raised.
- If the argument is NaN, NaN is returned.

### Notes

Although the C standard names this function "arc hyperbolic tangent", the inverse functions of the hyperbolic functions are the area functions. Their argument is the area of a hyperbolic sector, not an arc. The correct name is "inverse hyperbolic tangent" (used by POSIX) or "area hyperbolic tangent".

POSIX specifies that in case of underflow, `arg` is returned unmodified, and if that is not supported, an implementation-defined value no greater than `DBL_MIN`, `FLT_MIN`, and `LDBL_MIN` is returned.

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
    printf("atanh(0) = %f\natanh(-0) = %f\n", atanh(0), atanh(-0.0));
    printf("atanh(0.9) = %f\n", atanh(0.9));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("atanh(-1) = %f\n", atanh(-1));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_DIVBYZERO))
        puts("    FE_DIVBYZERO raised");
}
```

Possible output:

```text
atanh(0) = 0.000000
atanh(-0) = -0.000000
atanh(0.9) = 1.472219
atanh(-1) = -inf
    errno == ERANGE: Numerical result out of range
    FE_DIVBYZERO raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.5.3 The atanh functions (p: 241)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.3 The atanh functions (p: 520)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.5.3 The atanh functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.2.3 The atanh functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.5.3 The atanh functions (p: 241)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.3 The atanh functions (p: 520)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.5.3 The atanh functions (p: 221-222)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.2.3 The atanh functions (p: 457)

### See also

|  |  |
| --- | --- |
| asinh, asinhf, asinhl (C99), (C99), (C99) | computes inverse hyperbolic sine (\({\small\operatorname{arsinh}{x} }\)arsinh(x)) (function) |
| acosh, acoshf, acoshl (C99), (C99), (C99) | computes inverse hyperbolic cosine (\({\small\operatorname{arcosh}{x} }\)arcosh(x)) (function) |
| tanh, tanhf, tanhl (C99), (C99) | computes hyperbolic tangent (\({\small\tanh{x} }\)tanh(x)) (function) |
| catanh, catanhf, catanhl (C99), (C99), (C99) | computes the complex arc hyperbolic tangent (function) |
| C++ documentation for atanh |  |

### External links

Weisstein, Eric W. "Inverse Hyperbolic Tangent." From MathWorld — A Wolfram Web Resource.
