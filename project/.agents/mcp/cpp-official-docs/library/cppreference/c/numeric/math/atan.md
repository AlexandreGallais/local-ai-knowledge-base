# atan, atanf, atanl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float atanf( float arg );` | (1) | (since C99) |
| `double atan( double arg );` | (2) |  |
| `long double atanl( long double arg );` | (3) | (since C99) |
| `_Decimal32 atand32( _Decimal32 arg );` | (4) | (since C23) |
| `_Decimal64 atand64( _Decimal64 arg );` | (5) | (since C23) |
| `_Decimal128 atand128( _Decimal128 arg );` | (6) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define atan( arg )` | (7) | (since C99) |

1-6) Computes the principal value of the arc tangent of `arg`.

7) Type-generic macro: If the argument has type `long double`, (3) (`atanl`) is called. Otherwise, if the argument has integer type or the type `double`, (2) (`atan`) is called. Otherwise, (1) (`atanf`) is called. If the argument is complex, then the macro invokes the corresponding complex function (`catanf`, `catan`, `catanl`).

The functions (4-6) are declared if and only if the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating-point numbers). (since C23)

### Parameters

arg - floating-point value

### Return value

If no errors occur, the arc tangent of `arg` (arctan(arg)) in the range [- π 2 ; + π 2 ] radians, is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- if the argument is ±0, it is returned unmodified;
- if the argument is +∞, +π/2 is returned;
- if the argument is -∞, -π/2 is returned;
- if the argument is NaN, NaN is returned.

### Notes

POSIX specifies that in case of underflow, `arg` is returned unmodified, and if that is not supported, an implementation-defined value no greater than `DBL_MIN`, `FLT_MIN`, and `LDBL_MIN` is returned.

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("atan(1) = %f, 4*atan(1)=%f\n", atan(1), 4 * atan(1));
    // special values
    printf("atan(Inf) = %f, 2*atan(Inf) = %f\n", atan(INFINITY), 2 * atan(INFINITY));
    printf("atan(-0.0) = %+f, atan(+0.0) = %+f\n", atan(-0.0), atan(0));
}
```

Output:

```text
atan(1) = 0.785398, 4*atan(1)=3.141593
atan(Inf) = 1.570796, 2*atan(Inf) = 3.141593
atan(-0.0) = -0.000000, atan(+0.0) = +0.000000
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.4.3 The atan functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.1.3 The atan functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.4.3 The atan functions (p: 174)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.1.3 The atan functions (p: 378)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.4.3 The atan functions (p: 238-239)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.1.3 The atan functions (p: 519)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.4.3 The atan functions (p: 219)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.1.3 The atan functions (p: 456)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.2.3 The atan function

### See also

|  |  |
| --- | --- |
| atan2, atan2f, atan2l (C99), (C99) | computes arc tangent, using signs to determine quadrants (function) |
| asin, asinf, asinl (C99), (C99) | computes arc sine (\({\small\arcsin{x} }\)arcsin(x)) (function) |
| acos, acosf, acosl (C99), (C99) | computes arc cosine (\({\small\arccos{x} }\)arccos(x)) (function) |
| tan, tanf, tanl (C99), (C99) | computes tangent (\({\small\tan{x} }\)tan(x)) (function) |
| catan, catanf, catanl (C99), (C99), (C99) | computes the complex arc tangent (function) |
| C++ documentation for atan |  |
