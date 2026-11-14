# cospi, cospif, cospil, cospid32, cospid64, cospid128

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float cospif( float arg );` | (1) | (since C23) |
| `double cospi( double arg );` | (2) | (since C23) |
| `long double cospil( long double arg );` | (3) | (since C23) |
| `_Decimal32 cospid32( _Decimal32 arg );` | (4) | (since C23) |
| `_Decimal64 cospid64( _Decimal64 arg );` | (5) | (since C23) |
| `_Decimal128 cospid128( _Decimal128 arg );` | (6) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define cospi( arg )` | (7) | (since C23) |

1-6) Computes the cosine of `π·arg` measured in radians, thus regarding `arg` as a measurement in half-revolutions.

7) Type-generic macro: calls the correct function based on the type of `arg`. If the argument has integer type, (2) (`cospi`) is called.

The functions (4-6) are declared if and only if the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating-point numbers). (since C23)

### Parameters

arg - floating-point value whose product with `π` represents an angle in radians

### Return value

If no errors occur, the cosine of `π·arg` (cos(π×arg)) in the range [-1, +1], is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- if the argument is ±0, the result is `1.0`;
- if the argument is ±∞, NaN is returned and `FE_INVALID` is raised;
- if the argument is NaN, NaN is returned.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <math.h>
#include <stdio.h>

#ifndef __GNUC__
#pragma STDC FENV_ACCESS ON
#endif

#if __STDC_VERSION__ < 202311L
// A naive implementation of a subset of cospi family
double cospi(double arg)
{
    return cos(arg * (double)3.1415926535897932384626433);
}
#endif

int main(void)
{
    const double pi = acos(-1);

    // typical usage
    printf("cospi(1) = %f, cos(pi) = %f\n", cospi(1), cos(pi));
    printf("cospi(0.5) = %f, cos(pi/2) = %f\n", cospi(0.5), cos(pi / 2));
    printf("cospi(-0.75) = %f, cos(-3*pi/4) = %f\n", cospi(-0.75), cos(-3 * pi / 4));

    // special values
    printf("cospi(+0) = %f\n", cospi(0.0));
    printf("cospi(-0) = %f\n", cospi(-0.0));

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("cospi(INFINITY) = %f\n", cospi(INFINITY));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
cospi(1) = -1.000000, cos(pi) = -1.000000
cospi(0.5) = 0.000000, cos(pi/2) = 0.000000
cospi(-0.75) = -0.707107, cos(-3*pi/4) = -0.707107
cospi(+0) = 1.000000
cospi(-0) = 1.000000
cospi(INFINITY) = -nan
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.4.12 The cospi functions (p: 247)

- 7.27 Type generic math <tgmath.h> (p: 387)

### See also

cos, cosf, cosl (C99), (C99) computes cosine (\({\small\cos{x} }\)cos(x)) (function)
