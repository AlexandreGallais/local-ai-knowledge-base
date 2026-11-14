# fmod, fmodf, fmodl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float fmodf( float x, float y );` | (1) | (since C99) |
| `double fmod( double x, double y );` | (2) |  |
| `long double fmodl( long double x, long double y );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define fmod( x, y )` | (4) | (since C99) |

1-3) Computes the floating-point remainder of the division operation `x / y`.

4) Type-generic macro: If any argument has type `long double`, `fmodl` is called. Otherwise, if any argument has integer type or has type `double`, `fmod` is called. Otherwise, `fmodf` is called.

The floating-point remainder of the division operation `x / y` calculated by this function is exactly the value `x - n * y`, where `n` is `x / y` with its fractional part truncated.

The returned value has the same sign as `x` and is less or equal to `y` in magnitude.

### Parameters

x, y - floating-point values

### Return value

If successful, returns the floating-point remainder of the division `x / y` as defined above.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error may occur if `y` is zero.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- If `x` is ±0 and `y` is not zero, ±0 is returned.
- If `x` is ±∞ and `y` is not NaN, NaN is returned and `FE_INVALID` is raised.
- If `y` is ±0 and `x` is not NaN, NaN is returned and `FE_INVALID` is raised.
- If `y` is ±∞ and `x` is finite, `x` is returned.
- If either argument is NaN, NaN is returned.

### Notes

POSIX requires that a domain error occurs if `x` is infinite or `y` is zero.

`fmod`, but not `remainder` is useful for doing silent wrapping of floating-point types to unsigned integer types: `(0.0 <= (y = fmod(rint(x), 65536.0 )) ? y : 65536.0 + y)` is in the range `[``-0.0``,``65535.0``]`, which corresponds to `unsigned short`, but `remainder(rint(x), 65536.0)` is in the range `[``-32767.0``,``+32768.0``]`, which is outside of the range of `signed short`.

The `double` version of `fmod` behaves as if implemented as follows:

```c
double fmod(double x, double y)
{
#pragma STDC FENV_ACCESS ON
    double result = remainder(fabs(x), (y = fabs(y)));
    if (signbit(result))
        result += y;
    return copysign(result, x);
}
```

### Example

```c
#include <fenv.h>
#include <math.h>
#include <stdio.h>

// #pragma STDC FENV_ACCESS ON

int main(void)
{
    printf("fmod(+5.1, +3.0) = %.1f\n", fmod(5.1, 3));
    printf("fmod(-5.1, +3.0) = %.1f\n", fmod(-5.1, 3));
    printf("fmod(+5.1, -3.0) = %.1f\n", fmod(5.1, -3));
    printf("fmod(-5.1, -3.0) = %.1f\n", fmod(-5.1, -3));

    // special values
    printf("fmod(+0.0, 1.0) = %.1f\n", fmod(0, 1));
    printf("fmod(-0.0, 1.0) = %.1f\n", fmod(-0.0, 1));
    printf("fmod(+5.1, Inf) = %.1f\n", fmod(5.1, INFINITY));

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("fmod(+5.1, 0) = %.1f\n", fmod(5.1, 0));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
fmod(+5.1, +3.0) = 2.1
fmod(-5.1, +3.0) = -2.1
fmod(+5.1, -3.0) = 2.1
fmod(-5.1, -3.0) = -2.1
fmod(+0.0, 1.0) = 0.0
fmod(-0.0, 1.0) = -0.0
fmod(+5.1, Inf) = 5.1
fmod(+5.1, 0) = nan
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.10.1 The fmod functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.7.1 The fmod functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.10.1 The fmod functions (p: 185)

- 7.25 Type-generic math <tgmath.h> (p: 274-275)

- F.10.7.1 The fmod functions (p: 385)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.10.1 The fmod functions (p: 254)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.7.1 The fmod functions (p: 528)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.10.1 The fmod functions (p: 235)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.7.1 The fmod functions (p: 465)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.5.6.4 The fmod function

### See also

|  |  |
| --- | --- |
| div, ldiv, lldiv (C99) | computes quotient and remainder of integer division (function) |
| remainder, remainderf, remainderl (C99), (C99), (C99) | computes signed remainder of the floating-point division operation (function) |
| remquo, remquof, remquol (C99), (C99), (C99) | computes signed remainder as well as the three last bits of the division operation (function) |
| C++ documentation for fmod |  |
