# exp, expf, expl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float expf( float arg );` | (1) | (since C99) |
| `double exp( double arg );` | (2) |  |
| `long double expl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define exp( arg )` | (4) | (since C99) |

1-3) Computes e (Euler's number, `2.7182818...`) raised to the given power `arg`.

4) Type-generic macro: If `arg` has type `long double`, `expl` is called. Otherwise, if `arg` has integer type or the type `double`, `exp` is called. Otherwise, `expf` is called. If `arg` is complex or imaginary, then the macro invokes the corresponding complex function (`cexpf`, `cexp`, `cexpl`).

### Parameters

arg - floating-point value

### Return value

If no errors occur, the base-*e* exponential of `arg` (earg ) is returned.

If a range error occurs due to overflow, `+HUGE_VAL`, `+HUGE_VALF`, or `+HUGE_VALL` is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, 1 is returned
- If the argument is -∞, +0 is returned
- If the argument is +∞, +∞ is returned
- If the argument is NaN, NaN is returned

### Notes

For IEEE-compatible type `double`, overflow is guaranteed if 709.8 < arg, and underflow is guaranteed if arg < -708.4.

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
    printf("exp(1) = %f\n", exp(1));
    printf("FV of $100, continuously compounded at 3%% for 1 year = %f\n",
            100*exp(0.03));
    // special values
    printf("exp(-0) = %f\n", exp(-0.0));
    printf("exp(-Inf) = %f\n", exp(-INFINITY));
    //error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("exp(710) = %f\n", exp(710));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
exp(1) = 2.718282
FV of $100, continuously compounded at 3% for 1 year = 103.045453
exp(-0) = 1.000000
exp(-Inf) = 0.000000
exp(710) = inf
    errno == ERANGE: Numerical result out of range
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.1 The exp functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.1 The exp functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.1 The exp functions (p: 175)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.3.1 The exp functions (p: 379)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.1 The exp functions (p: 242)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.1 The exp functions (p: 520)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.1 The exp functions (p: 223)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.1 The exp functions (p: 458)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.4.1 The exp function

### See also

|  |  |
| --- | --- |
| exp2, exp2f, exp2l (C99), (C99), (C99) | computes *2* raised to the given power (\({\small 2^x}\)2x) (function) |
| expm1, expm1f, expm1l (C99), (C99), (C99) | computes *e* raised to the given power, minus one (\({\small e^x-1}\)ex-1) (function) |
| log, logf, logl (C99), (C99) | computes natural (base-*e*) logarithm (\({\small \ln{x} }\)ln(x)) (function) |
| cexp, cexpf, cexpl (C99), (C99), (C99) | computes the complex base-e exponential (function) |
| C++ documentation for exp |  |
