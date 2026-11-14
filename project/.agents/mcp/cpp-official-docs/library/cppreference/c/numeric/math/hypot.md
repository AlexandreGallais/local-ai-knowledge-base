# hypot, hypotf, hypotl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float hypotf( float x, float y );` | (1) | (since C99) |
| `double hypot( double x, double y );` | (2) | (since C99) |
| `long double hypotl( long double x, long double y );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define hypot( x, y )` | (4) | (since C99) |

1-3) Computes the square root of the sum of the squares of `x` and `y`, without undue overflow or underflow at intermediate stages of the computation.

4) Type-generic macro: If any argument has type `long double`, the long double version of the function is called. Otherwise, if any argument has integer type or has type `double`, the double version of the function is called. Otherwise, the `float` version of the function is called.

The value computed by this function is the length of the hypotenuse of a right-angled triangle with sides of length `x` and `y`, or the distance of the point `(x, y)` from the origin `(0, 0)`, or the magnitude of a complex number `x+iy`.

### Parameters

|  |  |  |
| --- | --- | --- |
| x | - | floating-point value |
| y | - | floating-point value |

### Return value

If no errors occur, the hypotenuse of a right-angled triangle, \(\scriptsize{\sqrt{x^2+y^2} }\)√x2 +y2 , is returned.

If a range error due to overflow occurs, `+HUGE_VAL`, `+HUGE_VALF`, or `+HUGE_VALL` is returned.

If a range error due to underflow occurs, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- `hypot(x, y)`, `hypot(y, x)`, and `hypot(x, -y)` are equivalent
- if one of the arguments is ±0, `hypot` is equivalent to `fabs` called with the non-zero argument
- if one of the arguments is ±∞, `hypot` returns +∞ even if the other argument is NaN
- otherwise, if any of the arguments is NaN, NaN is returned.

### Notes

Implementations usually guarantee precision of less than 1 ulp (units in the last place): GNU, BSD.

`hypot(x, y)` is equivalent to `cabs(x + I*y)`.

POSIX specifies that underflow may only occur when both arguments are subnormal and the correct result is also subnormal (this forbids naive implementations).

`hypot(INFINITY, NAN)` returns +∞, but `sqrt(INFINITY * INFINITY + NAN * NAN)` returns NaN.

### Example

```c
#include <errno.h>
#include <fenv.h>
#include <float.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    // typical usage
    printf("(1,1) cartesian is (%f,%f) polar\n", hypot(1,1), atan2(1, 1));

    // special values
    printf("hypot(NAN,INFINITY) = %f\n", hypot(NAN, INFINITY));

    // error handling
    errno = 0;
    feclearexcept(FE_ALL_EXCEPT);
    printf("hypot(DBL_MAX,DBL_MAX) = %f\n", hypot(DBL_MAX, DBL_MAX));
    if (errno == ERANGE)
        perror("    errno == ERANGE");
    if (fetestexcept(FE_OVERFLOW))
        puts("    FE_OVERFLOW raised");
}
```

Possible output:

```text
(1,1) cartesian is (1.414214,0.785398) polar
hypot(NAN,INFINITY) = inf
hypot(DBL_MAX,DBL_MAX) = inf
    errno == ERANGE: Numerical result out of range
    FE_OVERFLOW raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.7.3 The hypot functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.4.3 The hypot functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.7.3 The hypot functions (p: 181)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.4.3 The hypot functions (p: 382)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.7.3 The hypot functions (p: 248)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.4.3 The hypot functions (p: 524)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.7.3 The hypot functions (p: 229)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.4.3 The hypot functions (p: 461)

### See also

|  |  |
| --- | --- |
| pow, powf, powl (C99), (C99) | computes a number raised to the given power (\(\small{x^y}\)xy) (function) |
| sqrt, sqrtf, sqrtl (C99), (C99) | computes square root (\(\small{\sqrt{x} }\)√x) (function) |
| cbrt, cbrtf, cbrtl (C99), (C99), (C99) | computes cube root (\(\small{\sqrt[3]{x} }\)3√x) (function) |
| cabs, cabsf, cabsl (C99), (C99), (C99) | computes the magnitude of a complex number (function) |
| C++ documentation for hypot |  |
