# tgamma, tgammaf, tgammal

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float tgammaf( float arg );` | (1) | (since C99) |
| `double tgamma( double arg );` | (2) | (since C99) |
| `long double tgammal( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define tgamma( arg )` | (4) | (since C99) |

1-3) Computes the gamma function of `arg`.

4) Type-generic macro: If `arg` has type `long double`, `tgammal` is called. Otherwise, if `arg` has integer type or the type `double`, `tgamma` is called. Otherwise, `tgammaf` is called.

### Parameters

arg - floating-point value

### Return value

If no errors occur, the value of the gamma function of `arg`, that is \(\Gamma(\mathtt{arg}) = \displaystyle\int_0^\infty\!\! t^{\mathtt{arg}-1} e^{-t}\, dt\)∫∞ 0*t*arg-1 *e*-t d*t*, is returned.

If a domain error occurs, an implementation-defined value (NaN where supported) is returned.

If a pole error occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned.

If a range error due to overflow occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned.

If a range error due to underflow occurs, the correct value (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If `arg` is zero or is an integer less than zero, a pole error or a domain error may occur.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- If the argument is ±0, ±∞ is returned and `FE_DIVBYZERO` is raised.
- If the argument is a negative integer, NaN is returned and `FE_INVALID` is raised.
- If the argument is -∞, NaN is returned and `FE_INVALID` is raised.
- If the argument is +∞, +∞ is returned.
- If the argument is NaN, NaN is returned.

### Notes

If `arg` is a natural number, `tgamma(arg)` is the factorial of `arg - 1`. Many implementations calculate the exact integer-domain factorial if the argument is a sufficiently small integer.

For IEEE-compatible type `double`, overflow happens if `0 < x < 1/DBL_MAX` or if `x > 171.7`.

POSIX requires that a pole error occurs if the argument is zero, but a domain error occurs when the argument is a negative integer. It also specifies that in future, domain errors may be replaced by pole errors for negative integer arguments (in which case the return value in those cases would change from NaN to ±∞).

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
    printf("tgamma(10) = %f, 9!=%f\n", tgamma(10), 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9.0);
    printf("tgamma(0.5) = %f, sqrt(pi) = %f\n", tgamma(0.5), sqrt(acos(-1)));

    // special values
    printf("tgamma(+Inf) = %f\n", tgamma(INFINITY));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("tgamma(-1) = %f\n", tgamma(-1));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    else
        if (errno == EDOM)   perror("    errno == EDOM");
    if (fetestexcept(FE_DIVBYZERO))
        puts("    FE_DIVBYZERO raised");
    else if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
tgamma(10) = 362880.000000, 9!=362880.000000
tgamma(0.5) = 1.772454, sqrt(pi) = 1.772454
tgamma(+Inf) = inf
tgamma(-1) = nan
    errno == EDOM: Numerical argument out of domain
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.8.4 The tgamma functions (p: 250)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.5.4 The tgamma functions (p: 525)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.8.4 The tgamma functions (p: 250)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.5.4 The tgamma functions (p: 525)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.8.4 The tgamma functions (p: 250)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.5.4 The tgamma functions (p: 525)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.8.4 The tgamma functions (p: 231)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.5.4 The tgamma functions (p: 462)

### See also

|  |  |
| --- | --- |
| lgamma, lgammaf, lgammal (C99), (C99), (C99) | computes natural (base-*e*) logarithm of the gamma function (function) |
| C++ documentation for tgamma |  |

### External links

Weisstein, Eric W. "Gamma Function." From MathWorld — A Wolfram Web Resource.
