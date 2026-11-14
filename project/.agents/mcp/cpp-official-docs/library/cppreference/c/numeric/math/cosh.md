# cosh, coshf, coshl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float coshf( float arg );` | (1) | (since C99) |
| `double cosh( double arg );` | (2) |  |
| `long double coshl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define cosh( arg )` | (4) | (since C99) |

1-3) Computes the hyperbolic cosine of `arg`.

4) Type-generic macro: If the argument has type `long double`, `coshl` is called. Otherwise, if the argument has integer type or the type `double`, `cosh` is called. Otherwise, `coshf` is called. If the argument is complex, then the macro invokes the corresponding complex function (`ccoshf`, `ccosh`, `ccoshl`).

### Parameters

arg - floating-point value representing a hyperbolic angle

### Return value

If no errors occur, the hyperbolic cosine of `arg` (cosh(arg), or earg +e-arg 2 ) is returned.

If a range error due to overflow occurs, `+HUGE_VAL`, `+HUGE_VALF`, or `+HUGE_VALL` is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- if the argument is ±0, 1 is returned
- If the argument is ±∞, +∞ is returned
- if the argument is NaN, NaN is returned

### Notes

For the IEEE-compatible type `double`, if |arg| > 710.5, then `cosh(arg)` overflows.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <math.h>
#include <stdio.h>

// #pragma STDC FENV_ACCESS ON
int main(void)
{
    printf("cosh(1) = %f\ncosh(-1)= %f\n", cosh(1), cosh(-1));
    printf("log(sinh(1) + cosh(1))=%f\n", log(sinh(1) + cosh(1)));
    // special values
    printf("cosh(+0) = %f\ncosh(-0) = %f\n", cosh(0.0), cosh(-0.0));
    // error handling
    errno = 0;
    feclearexcept(FE_ALL_EXCEPT);
    printf("cosh(710.5) = %f\n", cosh(710.5));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
cosh(1) = 1.543081
cosh(-1)= 1.543081
log(sinh(1) + cosh(1))=1.000000
cosh(+0) = 1.000000
cosh(-0) = 1.000000
cosh(710.5) = inf
    errno == ERANGE: Numerical result out of range
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.5.4 The cosh functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.2.4 The cosh functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.5.4 The cosh functions (p: 176)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.2.4 The cosh functions (p: 379)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.5.4 The cosh functions (p: 241)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.4 The cosh functions (p: 520)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.5.4 The cosh functions (p: 222)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.2.4 The cosh functions (p: 457)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.3.1 The cosh function

### See also

|  |  |
| --- | --- |
| sinh, sinhf, sinhl (C99), (C99) | computes hyperbolic sine (\({\small\sinh{x} }\)sinh(x)) (function) |
| tanh, tanhf, tanhl (C99), (C99) | computes hyperbolic tangent (\({\small\tanh{x} }\)tanh(x)) (function) |
| acosh, acoshf, acoshl (C99), (C99), (C99) | computes inverse hyperbolic cosine (\({\small\operatorname{arcosh}{x} }\)arcosh(x)) (function) |
| ccosh, ccoshf, ccoshl (C99), (C99), (C99) | computes the complex hyperbolic cosine (function) |
| C++ documentation for cosh |  |
