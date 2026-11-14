# acosh, acoshf, acoshl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float acoshf( float arg );` | (1) | (since C99) |
| `double acosh( double arg );` | (2) | (since C99) |
| `long double acoshl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define acosh( arg )` | (4) | (since C99) |

1-3) Computes the inverse hyperbolic cosine of `arg`.

4) Type-generic macro: If the argument has type `long double`, `acoshl` is called. Otherwise, if the argument has integer type or the type `double`, `acosh` is called. Otherwise, `acoshf` is called. If the argument is complex, then the macro invokes the corresponding complex function (`cacoshf`, `cacosh`, `cacoshl`).

### Parameters

arg - floating-point value representing the area of a hyperbolic sector

### Return value

If no errors occur, the inverse hyperbolic cosine of `arg` (cosh-1 (arg), or arcosh(arg)) on the interval [0, +∞], is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

### Error handling

Errors are reported as specified in `math_errhandling`.

If the argument is less than `1`, a domain error occurs.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is less than 1, `FE_INVALID` is raised an NaN is returned.
- If the argument is 1, +0 is returned.
- If the argument is +∞, +∞ is returned.
- If the argument is NaN, NaN is returned.

### Notes

Although the C standard names this function "arc hyperbolic cosine", the inverse functions of the hyperbolic functions are the area functions. Their argument is the area of a hyperbolic sector, not an arc. The correct name is "inverse hyperbolic cosine" (used by POSIX) or "area hyperbolic cosine".

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
    printf("acosh(1) = %f\nacosh(10) = %f\n", acosh(1), acosh(10));
    printf("acosh(DBL_MAX) = %f\nacosh(Inf) = %f\n", acosh(DBL_MAX), acosh(INFINITY));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("acosh(0.5) = %f\n", acosh(0.5));
    if (errno == EDOM)
        perror("    errno == EDOM");
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
acosh(1) = 0.000000
acosh(10) = 2.993223
acosh(DBL_MAX) = 710.475860
acosh(Inf) = inf
acosh(0.5) = -nan
    errno == EDOM: Numerical argument out of domain
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.5.1 The acosh functions (p: TBD)

- 7.27 Type-generic math <tgmath.h> (p: TBD)

- F.10.2.1 The acosh functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.5.1 The acosh functions (p: 175)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.2.1 The acosh functions (p: 379)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.5.1 The acosh functions (p: 240)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.1 The acosh functions (p: 520)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.5.1 The acosh functions (p: 221)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.2.1 The acosh functions (p: 457)

### See also

|  |  |
| --- | --- |
| asinh, asinhf, asinhl (C99), (C99), (C99) | computes inverse hyperbolic sine (\({\small\operatorname{arsinh}{x} }\)arsinh(x)) (function) |
| atanh, atanhf, atanhl (C99), (C99), (C99) | computes inverse hyperbolic tangent (\({\small\operatorname{artanh}{x} }\)artanh(x)) (function) |
| cosh, coshf, coshl (C99), (C99) | computes hyperbolic cosine (\({\small\cosh{x} }\)cosh(x)) (function) |
| cacosh, cacoshf, cacoshl (C99), (C99), (C99) | computes the complex arc hyperbolic cosine (function) |
| C++ documentation for acosh |  |

### External links

Weisstein, Eric W. "Inverse Hyperbolic Cosine." From MathWorld — A Wolfram Web Resource.
