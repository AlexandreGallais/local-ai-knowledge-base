# cos, cosf, cosl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float cosf( float arg );` | (1) | (since C99) |
| `double cos( double arg );` | (2) |  |
| `long double cosl( long double arg );` | (3) | (since C99) |
| `_Decimal32 cosd32( _Decimal32 arg );` | (4) | (since C23) |
| `_Decimal64 cosd64( _Decimal64 arg );` | (5) | (since C23) |
| `_Decimal128 cosd128( _Decimal128 arg );` | (6) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define cos( arg )` | (7) | (since C99) |

1-6) Computes the cosine of `arg` (measured in radians).

7) Type-generic macro: If the argument has type `long double`, (3) (`cosl`) is called. Otherwise, if the argument has integer type or the type `double`, (2) (`cos`) is called. Otherwise, (1) (`cosf`) is called. If the argument is complex, then the macro invokes the corresponding complex function (`ccosf`, `ccos`, `ccosl`).

The functions (4-6) are declared if and only if the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating-point numbers). (since C23)

### Parameters

arg - floating-point value representing angle in radians

### Return value

If no errors occur, the cosine of `arg` (cos(arg)) in the range [-1 ; +1], is returned.

The result may have little or no significance if the magnitude of `arg` is large. (until C99)

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- if the argument is ±0, the result is `1.0`;
- if the argument is ±∞, NaN is returned and `FE_INVALID` is raised;
- if the argument is NaN, NaN is returned.

### Notes

The case where the argument is infinite is not specified to be a domain error in C, but it is defined as a domain error in POSIX.

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
    printf("cos(pi/3) = %f\n", cos(pi / 3));
    printf("cos(pi/2) = %f\n", cos(pi / 2));
    printf("cos(-3*pi/4) = %f\n", cos(-3 * pi / 4));

    // special values
    printf("cos(+0) = %f\n", cos(0.0));
    printf("cos(-0) = %f\n", cos(-0.0));

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("cos(INFINITY) = %f\n", cos(INFINITY));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
cos(pi/3) = 0.500000
cos(pi/2) = 0.000000
cos(-3*pi/4) = -0.707107
cos(+0) = 1.000000
cos(-0) = 1.000000
cos(INFINITY) = -nan
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.4.5 The cos functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.1.5 The cos functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.4.5 The cos functions (p: 174)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.1.5 The cos functions (p: 378)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.4.5 The cos functions (p: 239)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.1.5 The cos functions (p: 519)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.4.5 The cos functions (p: 220)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.1.5 The cos functions (p: 456)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.2.5 The cos function

### See also

|  |  |
| --- | --- |
| sin, sinf, sinl (C99), (C99) | computes sine (\({\small\sin{x} }\)sin(x)) (function) |
| tan, tanf, tanl (C99), (C99) | computes tangent (\({\small\tan{x} }\)tan(x)) (function) |
| acos, acosf, acosl (C99), (C99) | computes arc cosine (\({\small\arccos{x} }\)arccos(x)) (function) |
| ccos, ccosf, ccosl (C99), (C99), (C99) | computes the complex cosine (function) |
| C++ documentation for cos |  |
