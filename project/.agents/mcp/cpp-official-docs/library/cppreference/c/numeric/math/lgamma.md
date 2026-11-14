# lgamma, lgammaf, lgammal

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float lgammaf( float arg );` | (1) | (since C99) |
| `double lgamma( double arg );` | (2) | (since C99) |
| `long double lgammal( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define lgamma( arg )` | (4) | (since C99) |

1-3) Computes the natural logarithm of the absolute value of the gamma function of `arg`.

4) Type-generic macro: If `arg` has type `long double`, `lgammal` is called. Otherwise, if `arg` has integer type or the type `double`, `lgamma` is called. Otherwise, `lgammaf` is called.

### Parameters

arg - floating-point value

### Return value

If no errors occur, the value of the logarithm of the gamma function of `arg`, that is \(\log_{e}|{\int_0^\infty t^{arg-1} e^{-t} \mathsf{d}t}|\)loge|∫∞ 0*t*arg-1 *e*-t d*t*|, is returned.

If a pole error occurs, `+HUGE_VAL`, `+HUGE_VALF`, or `+HUGE_VALL` is returned.

If a range error due to overflow occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If `arg` is zero or is an integer less than zero, a pole error may occur.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is 1, +0 is returned.
- If the argument is 2, +0 is returned.
- If the argument is ±0, +∞ is returned and `FE_DIVBYZERO` is raised.
- If the argument is a negative integer, +∞ is returned and `FE_DIVBYZERO` is raised.
- If the argument is ±∞, +∞ is returned.
- If the argument is NaN, NaN is returned.

### Notes

If `arg` is a natural number, `lgamma(arg)` is the logarithm of the factorial of `arg - 1`.

The POSIX version of `lgamma` is not thread-safe: each execution of the function stores the sign of the gamma function of `arg` in the static external variable `signgam`. Some implementations provide `lgamma_r`, which takes a pointer to user-provided storage for singgam as the second parameter, and is thread-safe.

There is a non-standard function named `gamma` in various implementations, but its definition is inconsistent. For example, glibc and 4.2BSD version of `gamma` executes `lgamma`, but 4.4BSD version of `gamma` executes `tgamma`.

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
    printf("lgamma(10) = %f, log(9!) = %f\n", lgamma(10),
                                              log(2 * 3 * 4 * 5 * 6 * 7 * 8 * 9));
    const double pi = acos(-1);
    printf("lgamma(0.5) = %f, log(sqrt(pi)) = %f\n", log(sqrt(pi)), lgamma(0.5));
    // special values
    printf("lgamma(1) = %f\n", lgamma(1));
    printf("lgamma(+Inf) = %f\n", lgamma(INFINITY));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("lgamma(0) = %f\n", lgamma(0));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_DIVBYZERO))
        puts("    FE_DIVBYZERO raised");
}
```

Possible output:

```text
lgamma(10) = 12.801827, log(9!) = 12.801827
lgamma(0.5) = 0.572365, log(sqrt(pi)) = 0.572365
lgamma(1) = 0.000000
lgamma(+Inf) = inf
lgamma(0) = inf
    errno == ERANGE: Numerical result out of range
    FE_DIVBYZERO raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.8.3 The lgamma functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.5.3 The lgamma functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.8.3 The lgamma functions (p: 182)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.5.3 The lgamma functions (p: 383)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.8.3 The lgamma functions (p: 250)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.5.3 The lgamma functions (p: 525)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.8.3 The lgamma functions (p: 231)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.5.3 The lgamma functions (p: 462)

### See also

|  |  |
| --- | --- |
| tgamma, tgammaf, tgammal (C99), (C99), (C99) | computes gamma function (function) |
| C++ documentation for lgamma |  |

### External links

Weisstein, Eric W. "Log Gamma Function." From MathWorld — A Wolfram Web Resource.
