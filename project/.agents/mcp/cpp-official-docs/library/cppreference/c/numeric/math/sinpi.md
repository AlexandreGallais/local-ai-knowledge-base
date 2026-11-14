# sinpi, sinpif, sinpil, sinpid32, sinpid64, sinpid128

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float sinpif( float arg );` | (1) | (since C23) |
| `double sinpi( double arg );` | (2) | (since C23) |
| `long double sinpil( long double arg );` | (3) | (since C23) |
| `_Decimal32 sinpid32( _Decimal32 arg );` | (4) | (since C23) |
| `_Decimal64 sinpid64( _Decimal64 arg );` | (5) | (since C23) |
| `_Decimal128 sinpid128( _Decimal128 arg );` | (6) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define sinpi( arg )` | (7) | (since C23) |

1-6) Computes the sine of `π·arg` measured in radians, thus regarding `arg` as a measurement in half-revolutions.

7) Type-generic macro: calls the correct function based on the type of `arg`. If the argument has integer type, (2) is called.

The functions (4-6) are declared if and only if the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating-point numbers). (since C23)

### Parameters

arg - floating-point value whose product with `π` represents an angle in radians

### Return value

If no errors occur, the sine of `π·arg` (sin(π×arg)) in the range [-1, +1], is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- if the argument is ±0, it is returned unmodified;
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
// A naive implementation of a subset of sinpi family
double sinpi(double arg)
{
    return sin(arg * (double)3.1415926535897932384626433);
}
#endif

int main(void)
{
    const double pi = acos(-1);

    // typical usage
    printf("sinpi(1) = %f, sin(pi) = %f\n", sinpi(1), sin(pi));
    printf("sinpi(0.5) = %f, sin(pi/2) = %f\n", sinpi(0.5), sin(pi / 2));
    printf("sinpi(-0.75) = %f, sin(-3*pi/4) = %f\n", sinpi(-0.75), sin(-3 * pi / 4));

    // special values
    printf("sinpi(+0) = %f\n", sinpi(0.0));
    printf("sinpi(-0) = %f\n", sinpi(-0.0));

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("sinpi(INFINITY) = %f\n", sinpi(INFINITY));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
sinpi(1) = 0.000000, sin(pi) = 0.000000
sinpi(0.5) = 1.000000, sin(pi/2) = 1.000000
sinpi(-0.75) = -0.707107, sin(-3*pi/4) = -0.707107
sinpi(+0) = 0.000000
sinpi(-0) = -0.000000
sinpi(INFINITY) = -nan
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.4.13 The sinpi functions (p: 247-248)

- 7.27 Type generic math <tgmath.h> (p: 387)

### See also

sin, sinf, sinl (C99), (C99) computes sine (\({\small\sin{x} }\)sin(x)) (function)
