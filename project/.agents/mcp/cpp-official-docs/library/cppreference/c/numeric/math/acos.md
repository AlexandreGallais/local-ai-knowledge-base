# acos, acosf, acosl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float acosf( float arg );` | (1) | (since C99) |
| `double acos( double arg );` | (2) |  |
| `long double acosl( long double arg );` | (3) | (since C99) |
| `_Decimal32 acosd32( _Decimal32 arg );` | (4) | (since C23) |
| `_Decimal64 acosd64( _Decimal64 arg );` | (5) | (since C23) |
| `_Decimal128 acosd128( _Decimal128 arg );` | (6) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define acos( arg )` | (7) | (since C99) |

1-6) Computes the principal value of the arc cosine of `arg`.

7) Type-generic macro: If the argument has type `long double`, (3) (`acosl`) is called. Otherwise, if the argument has integer type or the type `double`, (2) (`acos`) is called. Otherwise, (1) (`acosf`) is called. If the argument is complex, then the macro invokes the corresponding complex function (`cacosf`, `cacos`, `cacosl`).

The functions (4-6) are declared if and only if the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating-point numbers). (since C23)

### Parameters

arg - floating-point value

### Return value

If no errors occur, the arc cosine of `arg` (arccos(arg)) in the range [0 ; π], is returned.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error occurs if `arg` is outside the range `[-1.0; 1.0]`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- If the argument is +1, the value `+0` is returned;
- If |arg| > 1, a domain error occurs and NaN is returned;
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
    printf("acos(-1) = %f\n", acos(-1));
    printf("acos(0.0) = %f 2*acos(0.0) = %f\n", acos(0), 2 * acos(0));
    printf("acos(0.5) = %f 3*acos(0.5) = %f\n", acos(0.5), 3 * acos(0.5));
    printf("acos(1) = %f\n", acos(1));

    // error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("acos(1.1) = %f\n", acos(1.1));
    if (errno == EDOM)
        perror("    errno == EDOM");
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
acos(-1) = 3.141593
acos(0.0) = 1.570796 2*acos(0.0) = 3.141593
acos(0.5) = 1.047198 3*acos(0.5) = 3.141593
acos(1) = 0.000000
acos(1.1) = nan
    errno == EDOM: Numerical argument out of domain
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.4.1 The acos functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.1.1 The acos functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.4.1 The acos functions (p: 173)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.1.1 The acos functions (p: 378)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.4.1 The acos functions (p: 238)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.1.1 The acos functions (p: 518)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.4.1 The acos functions (p: 218)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.1.1 The acos functions (p: 455)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.2.1 The acos function

### See also

|  |  |
| --- | --- |
| asin, asinf, asinl (C99), (C99) | computes arc sine (\({\small\arcsin{x} }\)arcsin(x)) (function) |
| atan, atanf, atanl (C99), (C99) | computes arc tangent (\({\small\arctan{x} }\)arctan(x)) (function) |
| atan2, atan2f, atan2l (C99), (C99) | computes arc tangent, using signs to determine quadrants (function) |
| cos, cosf, cosl (C99), (C99) | computes cosine (\({\small\cos{x} }\)cos(x)) (function) |
| cacos, cacosf, cacosl (C99), (C99), (C99) | computes the complex arc cosine (function) |
| C++ documentation for acos |  |
