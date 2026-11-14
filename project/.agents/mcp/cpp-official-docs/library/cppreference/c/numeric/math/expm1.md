# expm1, expm1f, expm1l

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float expm1f( float arg );` | (1) | (since C99) |
| `double expm1( double arg );` | (2) | (since C99) |
| `long double expm1l( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define expm1( arg )` | (4) | (since C99) |

1-3) Computes the *e* (Euler's number, `2.7182818`) raised to the given power `arg`, minus `1.0`. This function is more accurate than the expression `exp(arg)-1.0` if `arg` is close to zero.

4) Type-generic macro: If `arg` has type `long double`, `expm1l` is called. Otherwise, if `arg` has integer type or the type `double`, `expm1` is called. Otherwise, `expm1f` is called.

### Parameters

arg - floating-point value

### Return value

If no errors occur earg -1 is returned.

If a range error due to overflow occurs, `+HUGE_VAL`, `+HUGE_VALF`, or `+HUGE_VALL` is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0, it is returned, unmodified
- If the argument is -∞, -1 is returned
- If the argument is +∞, +∞ is returned
- If the argument is NaN, NaN is returned

### Notes

The functions `expm1` and `log1p` are useful for financial calculations, for example, when calculating small daily interest rates: (1+x)n -1 can be expressed as `expm1(n * log1p(x))`. These functions also simplify writing accurate inverse hyperbolic functions.

For IEEE-compatible type `double`, overflow is guaranteed if 709.8 < arg.

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
    printf("expm1(1) = %f\n", expm1(1));
    printf("Interest earned in 2 days on $100, compounded daily at 1%%\n"
           " on a 30/360 calendar = %f\n",
           100*expm1(2*log1p(0.01/360)));
    printf("exp(1e-16)-1 = %g, but expm1(1e-16) = %g\n",
           exp(1e-16)-1, expm1(1e-16));
    // special values
    printf("expm1(-0) = %f\n", expm1(-0.0));
    printf("expm1(-Inf) = %f\n", expm1(-INFINITY));
    //error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("expm1(710) = %f\n", expm1(710));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
expm1(1) = 1.718282
Interest earned in 2 days on $100, compounded daily at 1%
 on a 30/360 calendar = 0.005556
exp(1e-16)-1 = 0, but expm1(1e-16) = 1e-16
expm1(-0) = -0.000000
expm1(-Inf) = -1.000000
expm1(710) = inf
    errno == ERANGE: Result too large
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.6.3 The expm1 functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.3.3 The expm1 functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.6.3 The expm1 functions (p: 177)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.3.3 The expm1 functions (p: 379)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.6.3 The expm1 functions (p: 243)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.3.3 The expm1 functions (p: 521)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.6.3 The expm1 functions (p: 223-224)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.3.3 The expm1 functions (p: 458)

### See also

|  |  |
| --- | --- |
| exp, expf, expl (C99), (C99) | computes *e* raised to the given power (\({\small e^x}\)ex) (function) |
| exp2, exp2f, exp2l (C99), (C99), (C99) | computes *2* raised to the given power (\({\small 2^x}\)2x) (function) |
| log1p, log1pf, log1pl (C99), (C99), (C99) | computes natural (base-*e*) logarithm of 1 plus the given number (\({\small \ln{(1+x)} }\)ln(1+x)) (function) |
| C++ documentation for expm1 |  |
