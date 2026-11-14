# sinh, sinhf, sinhl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float sinhf( float arg );` | (1) | (since C99) |
| `double sinh( double arg );` | (2) |  |
| `long double sinhl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define sinh( arg )` | (4) | (since C99) |

1-3) Computes hyperbolic sine of `arg`.

4) Type-generic macro: If the argument has type `long double`, `sinhl` is called. Otherwise, if the argument has integer type or the type `double`, `sinh` is called. Otherwise, `sinhf` is called. If the argument is complex, then the macro invokes the corresponding complex function (`csinhf`, `csinh`, `csinhl`).

### Parameters

arg - floating-point value representing a hyperbolic angle

### Return value

If no errors occur, the hyperbolic sine of `arg` (sinh(arg), or earg -e-arg 2 ) is returned.

If a range error due to overflow occurs, `±HUGE_VAL`, `±HUGE_VALF`, or `±HUGE_VALL` is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- if the argument is ±0 or ±∞, it is returned unmodified,
- if the argument is NaN, NaN is returned.

### Notes

POSIX specifies that in case of underflow, `arg` is returned unmodified, and if that is not supported, an implementation-defined value no greater than `DBL_MIN`, `FLT_MIN`, and `LDBL_MIN` is returned.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    printf("sinh(1) = %f\nsinh(-1)=%f\n", sinh(1), sinh(-1));
    printf("log(sinh(1) + cosh(1))=%f\n", log(sinh(1) + cosh(1)));

    // special values
    printf("sinh(+0) = %f\nsinh(-0)=%f\n", sinh(0.0), sinh(-0.0));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("sinh(710.5) = %f\n", sinh(710.5));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
sinh(1) = 1.175201
sinh(-1)=-1.175201
log(sinh(1) + cosh(1))=1.000000
sinh(+0) = 0.000000
sinh(-0)=-0.000000
sinh(710.5) = inf
    errno == ERANGE: Numerical result out of range
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.5.5 The sinh functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.2.5 The sinh functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.5.5 The sinh functions (p: 176)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.2.5 The sinh functions (p: 379)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.5.5 The sinh functions (p: 241-242)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.5 The sinh functions (p: 520)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.5.5 The sinh functions (p: 222)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.2.5 The sinh functions (p: 457)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.3.2 The sinh function

### See also

|  |  |
| --- | --- |
| cosh, coshf, coshl (C99), (C99) | computes hyperbolic cosine (\({\small\cosh{x} }\)cosh(x)) (function) |
| tanh, tanhf, tanhl (C99), (C99) | computes hyperbolic tangent (\({\small\tanh{x} }\)tanh(x)) (function) |
| asinh, asinhf, asinhl (C99), (C99), (C99) | computes inverse hyperbolic sine (\({\small\operatorname{arsinh}{x} }\)arsinh(x)) (function) |
| csinh, csinhf, csinhl (C99), (C99), (C99) | computes the complex hyperbolic sine (function) |
| C++ documentation for sinh |  |
