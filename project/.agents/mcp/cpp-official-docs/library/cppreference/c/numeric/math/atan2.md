# atan2, atan2f, atan2l

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float atan2f( float y, float x );` | (1) | (since C99) |
| `double atan2( double y, double x );` | (2) |  |
| `long double atan2l( long double y, long double x );` | (3) | (since C99) |
| `_Decimal32 atan2d32( _Decimal32 y, _Decimal32 x );` | (4) | (since C23) |
| `_Decimal64 atan2d64( _Decimal64 y, _Decimal64 x );` | (5) | (since C23) |
| `_Decimal128 atan2d128( _Decimal128 y, _Decimal128 x );` | (6) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define atan2( y, x )` | (7) | (since C99) |

1-6) Computes the arc tangent of `y / x` using the signs of arguments to determine the correct quadrant.

7) Type-generic macro: If any argument has type `long double`, (3) (`atan2l`) is called. Otherwise, if any argument has integer type or has type `double`, (2) (`atan2`) is called. Otherwise, (1) (`atan2f`) is called.

The functions (4-6) are declared if and only if the implementation predefines `__STDC_IEC_60559_DFP__` (i.e. the implementation supports decimal floating-point numbers). (since C23)

### Parameters

x, y - floating-point value

### Return value

If no errors occur, the arc tangent of `y / x` (arctan( y x )) in the range [-π ; +π] radians, is returned.

Y argument

Return value

X argument

If a domain error occurs, an implementation-defined value is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error may occur if `x` and `y` are both zero.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- If `x` and `y` are both zero, domain error *does not* occur;
- If `x` and `y` are both zero, range error does not occur either;
- If `y` is zero, pole error does not occur;
- If `y` is `±0` and `x` is negative or `-0`, `±π` is returned;
- If `y` is `±0` and `x` is positive or `+0`, `±0` is returned;
- If `y` is `±∞` and `x` is finite, `±π/2` is returned;
- If `y` is `±∞` and `x` is `-∞`, `±3π/4` is returned;
- If `y` is `±∞` and `x` is `+∞`, `±π/4` is returned;
- If `x` is `±0` and `y` is negative, `-π/2` is returned;
- If `x` is `±0` and `y` is positive, `+π/2` is returned;
- If `x` is `-∞` and `y` is finite and positive, `+π` is returned;
- If `x` is `-∞` and `y` is finite and negative, `-π` is returned;
- If `x` is `+∞` and `y` is finite and positive, `+0` is returned;
- If `x` is `+∞` and `y` is finite and negative, `-0` is returned;
- If either `x` is NaN or `y` is NaN, NaN is returned.

### Notes

`atan2(y, x)` is equivalent to `carg(x + I*y)`.

POSIX specifies that in case of underflow, `y / x` is the value returned, and if that is not supported, an implementation-defined value no greater than `DBL_MIN`, `FLT_MIN`, and `LDBL_MIN` is returned.

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    // normal usage: the signs of the two arguments determine the quadrant
    // atan2(1,1) = +pi/4, Quad I
    printf("(+1,+1) cartesian is (%f,%f) polar\n", hypot( 1, 1), atan2( 1, 1));
    // atan2(1, -1) = +3pi/4, Quad II
    printf("(+1,-1) cartesian is (%f,%f) polar\n", hypot( 1,-1), atan2( 1,-1));
    // atan2(-1,-1) = -3pi/4, Quad III
    printf("(-1,-1) cartesian is (%f,%f) polar\n", hypot(-1,-1), atan2(-1,-1));
    // atan2(-1,-1) = -pi/4, Quad IV
    printf("(-1,+1) cartesian is (%f,%f) polar\n", hypot(-1, 1), atan2(-1, 1));

    // special values
    printf("atan2(0, 0) = %f atan2(0, -0)=%f\n", atan2(0,0), atan2(0,-0.0));
    printf("atan2(7, 0) = %f atan2(7, -0)=%f\n", atan2(7,0), atan2(7,-0.0));
}
```

Output:

```text
(+1,+1) cartesian is (1.414214,0.785398) polar
(+1,-1) cartesian is (1.414214,2.356194) polar
(-1,-1) cartesian is (1.414214,-2.356194) polar
(-1,+1) cartesian is (1.414214,-0.785398) polar
atan2(0, 0) = 0.000000 atan2(0, -0)=3.141593
atan2(7, 0) = 1.570796 atan2(7, -0)=1.570796
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.4.4 The atan2 functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.1.4 The atan2 functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.4.4 The atan2 functions (p: 174)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.1.4 The atan2 functions (p: 378)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.4.4 The atan2 functions (p: 239)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.1.4 The atan2 functions (p: 519)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.4.4 The atan2 functions (p: 219)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.1.4 The atan2 functions (p: 456)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.2.4 The atan2 function

### See also

|  |  |
| --- | --- |
| asin, asinf, asinl (C99), (C99) | computes arc sine (\({\small\arcsin{x} }\)arcsin(x)) (function) |
| acos, acosf, acosl (C99), (C99) | computes arc cosine (\({\small\arccos{x} }\)arccos(x)) (function) |
| atan, atanf, atanl (C99), (C99) | computes arc tangent (\({\small\arctan{x} }\)arctan(x)) (function) |
| carg, cargf, cargl (C99), (C99), (C99) | computes the phase angle of a complex number (function) |
| C++ documentation for atan2 |  |
