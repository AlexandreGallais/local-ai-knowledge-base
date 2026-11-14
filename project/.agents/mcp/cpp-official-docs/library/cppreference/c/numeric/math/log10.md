# log10, log10f, log10l

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float log10f( float arg );` | (1) | (since C99) |
| `double log10( double arg );` | (2) |  |
| `long double log10l( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define log10( arg )` | (4) | (since C99) |

1-3) Computes the common (base-*10*) logarithm of `arg`.

4) Type-generic macro: If `arg` has type `long double`, `log10l` is called. Otherwise, if `arg` has integer type or the type `double`, `log10` is called. Otherwise, `log10f` is called.

### Parameters

arg - floating-point value

### Return value

If no errors occur, the common (base-*10*) logarithm of `arg` (log10(arg) or lg(arg)) is returned.

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
    printf("log10(1000) = %f\n", log10(1000));
    printf("log10(0.001) = %f\n", log10(0.001));
    printf("base-5 logarithm of 125 = %f\n", log10(125) / log10(5));

    // special values
    printf("log10(1) = %f\n", log10(1));
    printf("log10(+Inf) = %f\n", log10(INFINITY));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("log10(0) = %f\n", log10(0));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_DIVBYZERO))
        puts("    FE_DIVBYZERO raised");
}
```

Possible output:

```text
log10(1000) = 3.000000
log10(0.001) = -3.000000
base-5 logarithm of 125 = 3.000000
log10(1) = 0.000000
log10(+Inf) = inf
log10(0) = -inf
    errno == ERANGE: Numerical result out of range
    FE_DIVBYZERO raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.8 The log10 functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.8 The log10 functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.8 The log10 functions (p: 179)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.3.8 The log10 functions (p: 380)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.8 The log10 functions (p: 245)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.8 The log10 functions (p: 522)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.8 The log10 functions (p: 225-226)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.8 The log10 functions (p: 459)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.4.5 The log10 function

### See also

|  |  |
| --- | --- |
| log, logf, logl (C99), (C99) | computes natural (base-*e*) logarithm (\({\small \ln{x} }\)ln(x)) (function) |
| log2, log2f, log2l (C99), (C99), (C99) | computes base-2 logarithm (\({\small \log_{2}{x} }\)log2(x)) (function) |
| log1p, log1pf, log1pl (C99), (C99), (C99) | computes natural (base-*e*) logarithm of 1 plus the given number (\({\small \ln{(1+x)} }\)ln(1+x)) (function) |
| C++ documentation for log10 |  |
