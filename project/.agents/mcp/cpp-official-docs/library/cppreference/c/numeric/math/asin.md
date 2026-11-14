# asin, asinf, asinl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float asinf( float arg );` | (1) | (since C99) |
| `double asin( double arg );` | (2) |  |
| `long double asinl( long double arg );` | (3) | (since C99) |
| `_Decimal32 asind32( _Decimal32 arg );` | (4) | (since C23) |
| `_Decimal64 asind64( _Decimal64 arg );` | (5) | (since C23) |
| `_Decimal128 asind128( _Decimal128 arg );` | (6) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define asin( arg )` | (7) | (since C99) |

1-6) Computes the principal values of the arc sine of `arg`.

7) Type-generic macro: If the argument has type `long double`, (3) (`asinl`) is called. Otherwise, if the argument has integer type or the type `double`, (2) (`asin`) is called. Otherwise, (1) (`asinf`) is called. If the argument is complex, then the macro invokes the corresponding complex function (`casinf`, `casin`, `casinl`).

The functions (4-6) are declared if and only if the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating-point numbers). (since C23)

### Parameters

arg - floating-point value

### Return value

If no errors occur, the arc sine of `arg` (arcsin(arg)) in the range [- π 2 ; + π 2 ], is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error occurs if `arg` is outside the range `[-1.0; 1.0]`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- if the argument is ±0, it is returned unmodified;
- if |arg| > 1, a domain error occurs and NaN is returned;
- if the argument is NaN, NaN is returned.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

#ifndef __GNUC__
#pragma STDC FENV_ACCESS ON
#endif

int main(void)
{
    printf("asin( 1.0) = %+f, 2*asin( 1.0)=%+f\n", asin(1), 2 * asin(1));
    printf("asin(-0.5) = %+f, 6*asin(-0.5)=%+f\n", asin(-0.5), 6 * asin(-0.5));

    // special values
    printf("asin(0.0) = %1f, asin(-0.0)=%f\n", asin(+0.0), asin(-0.0));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("asin(1.1) = %f\n", asin(1.1));
    if (errno == EDOM)
        perror("    errno == EDOM");
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
asin( 1.0) = +1.570796, 2*asin( 1.0)=+3.141593
asin(-0.5) = -0.523599, 6*asin(-0.5)=-3.141593
asin(0.0) = 0.000000, asin(-0.0)=-0.000000
asin(1.1) = nan
    errno == EDOM: Numerical argument out of domain
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.4.2 The asin functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.1.2 The asin functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.4.2 The asin functions (p: 174)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.1.2 The asin functions (p: 378)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.4.2 The asin functions (p: 238)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.1.2 The asin functions (p: 518)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.4.2 The asin functions (p: 219)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.1.2 The asin functions (p: 456)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.2.2 The asin function

### See also

|  |  |
| --- | --- |
| acos, acosf, acosl (C99), (C99) | computes arc cosine (\({\small\arccos{x} }\)arccos(x)) (function) |
| atan, atanf, atanl (C99), (C99) | computes arc tangent (\({\small\arctan{x} }\)arctan(x)) (function) |
| atan2, atan2f, atan2l (C99), (C99) | computes arc tangent, using signs to determine quadrants (function) |
| sin, sinf, sinl (C99), (C99) | computes sine (\({\small\sin{x} }\)sin(x)) (function) |
| casin, casinf, casinl (C99), (C99), (C99) | computes the complex arc sine (function) |
| C++ documentation for asin |  |
