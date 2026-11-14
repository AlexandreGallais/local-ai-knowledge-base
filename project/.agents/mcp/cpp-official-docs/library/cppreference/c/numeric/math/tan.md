# tan, tanf, tanl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float tanf( float arg );` | (1) | (since C99) |
| `double tan( double arg );` | (2) |  |
| `long double tanl( long double arg );` | (3) | (since C99) |
| `_Decimal32 tand32( _Decimal32 arg );` | (4) | (since C23) |
| `_Decimal64 tand64( _Decimal64 arg );` | (5) | (since C23) |
| `_Decimal128 tand128( _Decimal128 arg );` | (6) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define tan( arg )` | (7) | (since C99) |

1-6) Computes the tangent of `arg` (measured in radians).

7) Type-generic macro: If the argument has type `long double`, (3) (`tanl`) is called. Otherwise, if the argument has integer type or the type `double`, (2) (`tan`) is called. Otherwise, (1) (`tanf`) is called. If the argument is complex, then the macro invokes the corresponding complex function (`ctanf`, `ctan`, `ctanl`).

The functions (4-6) are declared if and only if the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating-point numbers). (since C23)

### Parameters

arg - floating-point value representing angle in radians

### Return value

If no errors occur, the tangent of `arg` (tan(arg)) is returned.

The result may have little or no significance if the magnitude of `arg` is large. (until C99)

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- if the argument is ±0, it is returned unmodified;
- if the argument is ±∞, NaN is returned and `FE_INVALID` is raised;
- if the argument is NaN, NaN is returned.

### Notes

The case where the argument is infinite is not specified to be a domain error in C, but it is defined as a domain error in POSIX.

The function has mathematical poles at π(1/2 + n); however no common floating-point representation is able to represent `π/2` exactly, thus there is no value of the argument for which a pole error occurs.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <math.h>
#include <stdio.h>

#ifndef __GNUC__
#pragma STDC FENV_ACCESS ON
#endif

int main(void)
{
    const double pi = acos(-1);

    // typical usage
    printf("tan(pi*1/4) = %+f\n", tan(pi * 1 / 4)); //   45 deg
    printf("tan(pi*3/4) = %+f\n", tan(pi * 3 / 4)); //  135 deg
    printf("tan(pi*5/4) = %+f\n", tan(pi * 5 / 4)); // -135 deg
    printf("tan(pi*7/4) = %+f\n", tan(pi * 7 / 4)); //  -45 deg

    // special values
    printf("tan(+0) = %f\n", tan(0.0));
    printf("tan(-0) = %f\n", tan(-0.0));

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("tan(INFINITY) = %f\n", tan(INFINITY));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
tan(pi*1/4) = +1.000000
tan(pi*3/4) = -1.000000
tan(pi*5/4) = +1.000000
tan(pi*7/4) = -1.000000
tan(+0) = 0.000000
tan(-0) = -0.000000
tan(INFINITY) = -nan
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.4.7 The tan functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.1.7 The tan functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.4.7 The tan functions (p: 175)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.1.7 The tan functions (p: 378)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.4.7 The tan functions (p: 240)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.1.7 The tan functions (p: 519)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.4.7 The tan functions (p: 220)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.1.7 The tan functions (p: 457)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.2.7 The tan function

### See also

|  |  |
| --- | --- |
| sin, sinf, sinl (C99), (C99) | computes sine (\({\small\sin{x} }\)sin(x)) (function) |
| cos, cosf, cosl (C99), (C99) | computes cosine (\({\small\cos{x} }\)cos(x)) (function) |
| atan, atanf, atanl (C99), (C99) | computes arc tangent (\({\small\arctan{x} }\)arctan(x)) (function) |
| ctan, ctanf, ctanl (C99), (C99), (C99) | computes the complex tangent (function) |
| C++ documentation for tan |  |
