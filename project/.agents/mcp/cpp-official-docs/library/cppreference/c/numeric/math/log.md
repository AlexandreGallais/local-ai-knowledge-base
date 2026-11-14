# log, logf, logl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float logf( float arg );` | (1) | (since C99) |
| `double log( double arg );` | (2) |  |
| `long double logl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define log( arg )` | (4) | (since C99) |

1-3) Computes the natural (base *e*) logarithm of `arg`.

4) Type-generic macro: If `arg` has type `long double`, `logl` is called. Otherwise, if `arg` has integer type or the type `double`, `log` is called. Otherwise, `logf` is called. If `arg` is complex or imaginary, then the macro invokes the corresponding complex function (`clogf`, `clog`, `clogl`).

### Parameters

arg - floating-point value

### Return value

If no errors occur, the natural (base-*e*) logarithm of `arg` (ln(arg) or loge(arg)) is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a pole error occurs, `-HUGE_VAL`, `-HUGE_VALF`, or `-HUGE_VALL` is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error occurs if `arg` is less than zero.

Pole error may occur if `arg` is zero.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, -∞ is returned and `FE_DIVBYZERO` is raised.
- If the argument is 1, +0 is returned
- If the argument is negative, NaN is returned and `FE_INVALID` is raised.
- If the argument is +∞, +∞ is returned
- If the argument is NaN, NaN is returned.

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
    printf("log(1) = %f\n", log(1));
    printf("base-5 logarithm of 125 = %f\n", log(125) / log(5));

    // special values
    printf("log(1) = %f\n", log(1));
    printf("log(+Inf) = %f\n", log(INFINITY));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("log(0) = %f\n", log(0));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_DIVBYZERO))
        puts("    FE_DIVBYZERO raised");
}
```

Output:

```text
log(1) = 0.000000
base-5 logarithm of 125 = 3.000000
log(1) = 0.000000
log(+Inf) = inf
log(0) = -inf
    errno == ERANGE: Numerical result out of range
    FE_DIVBYZERO raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.7 The log functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.7 The log functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.7 The log functions (p: 178-179)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.3.7 The log functions (p: 380)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.7 The log functions (p: 244-245)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.7 The log functions (p: 522)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.7 The log functions (p: 225)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.7 The log functions (p: 459)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.4.4 The log function

### See also

|  |  |
| --- | --- |
| log10, log10f, log10l (C99), (C99) | computes common (base-*10*) logarithm (\({\small \log_{10}{x} }\)log10(x)) (function) |
| log2, log2f, log2l (C99), (C99), (C99) | computes base-2 logarithm (\({\small \log_{2}{x} }\)log2(x)) (function) |
| log1p, log1pf, log1pl (C99), (C99), (C99) | computes natural (base-*e*) logarithm of 1 plus the given number (\({\small \ln{(1+x)} }\)ln(1+x)) (function) |
| exp, expf, expl (C99), (C99) | computes *e* raised to the given power (\({\small e^x}\)ex) (function) |
| clog, clogf, clogl (C99), (C99), (C99) | computes the complex natural logarithm (function) |
| C++ documentation for log |  |
