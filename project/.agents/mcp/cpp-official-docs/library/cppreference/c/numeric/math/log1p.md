# log1p, log1pf, log1pl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float log1pf( float arg );` | (1) | (since C99) |
| `double log1p( double arg );` | (2) | (since C99) |
| `long double log1pl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define log1p( arg )` | (4) | (since C99) |

1-3) Computes the natural (base `e`) logarithm of `1 + arg`. This function is more precise than the expression `log(1 + arg)` if `arg` is close to zero.

4) Type-generic macro: If `arg` has type `long double`, `log1pl` is called. Otherwise, if `arg` has integer type or the type `double`, `log1p` is called. Otherwise, `log1pf` is called.

### Parameters

arg - floating-point value

### Return value

If no errors occur ln(1 + arg) is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a pole error occurs, `-HUGE_VAL`, `-HUGE_VALF`, or `-HUGE_VALL` is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in math_errhandling.

Domain error occurs if `arg` is less than -1.

Pole error may occur if `arg` is -1.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, it is returned unmodified.
- If the argument is -1, -∞ is returned and `FE_DIVBYZERO` is raised.
- If the argument is less than -1, NaN is returned and `FE_INVALID` is raised.
- If the argument is +∞, +∞ is returned.
- If the argument is NaN, NaN is returned.

### Notes

The functions `expm1` and `log1p` are useful for financial calculations, for example, when calculating small daily interest rates: (1+x)n -1 can be expressed as `expm1(n * log1p(x))`. These functions also simplify writing accurate inverse hyperbolic functions.

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
    printf("log1p(0) = %f\n", log1p(0));
    printf("Interest earned in 2 days on $100, compounded daily at 1%%\n"
           " on a 30/360 calendar = %f\n",
           100*expm1(2*log1p(0.01/360)));
    printf("log(1+1e-16) = %g, but log1p(1e-16) = %g\n",
           log(1+1e-16), log1p(1e-16));

    // special values
    printf("log1p(-0) = %f\n", log1p(-0.0));
    printf("log1p(+Inf) = %f\n", log1p(INFINITY));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("log1p(-1) = %f\n", log1p(-1));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_DIVBYZERO))
        puts("    FE_DIVBYZERO raised");
}
```

Possible output:

```text
log1p(0) = 0.000000
Interest earned in 2 days on $100, compounded daily at 1%
 on a 30/360 calendar = 0.005556
log(1+1e-16) = 0, but log1p(1e-16) = 1e-16
log1p(-0) = -0.000000
log1p(+Inf) = Inf
log1p(-1) = -Inf
    errno == ERANGE: Result too large
    FE_DIVBYZERO raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.9 The log1p functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.9 The log1p functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.9 The log1p functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.9 The log1p functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.9 The log1p functions (p: 245)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.9 The log1p functions (p: 522)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.9 The log1p functions (p: 226)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.9 The log1p functions (p: 459)

### See also

|  |  |
| --- | --- |
| log, logf, logl (C99), (C99) | computes natural (base-*e*) logarithm (\({\small \ln{x} }\)ln(x)) (function) |
| log10, log10f, log10l (C99), (C99) | computes common (base-*10*) logarithm (\({\small \log_{10}{x} }\)log10(x)) (function) |
| log2, log2f, log2l (C99), (C99), (C99) | computes base-2 logarithm (\({\small \log_{2}{x} }\)log2(x)) (function) |
| expm1, expm1f, expm1l (C99), (C99), (C99) | computes *e* raised to the given power, minus one (\({\small e^x-1}\)ex-1) (function) |
| C++ documentation for log1p |  |
