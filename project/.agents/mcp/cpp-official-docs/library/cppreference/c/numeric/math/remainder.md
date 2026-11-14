# remainder, remainderf, remainderl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float remainderf( float x, float y );` | (1) | (since C99) |
| `double remainder( double x, double y );` | (2) | (since C99) |
| `long double remainderl( long double x, long double y );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define remainder( x, y )` | (4) | (since C99) |

1-3) Computes the IEEE remainder of the floating-point division operation `x/y`.

4) Type-generic macro: If any argument has type `long double`, `remainderl` is called. Otherwise, if any argument has integer type or has type `double`, `remainder` is called. Otherwise, `remainderf` is called.

The IEEE floating-point remainder of the division operation `x/y` calculated by this function is exactly the value `x - n * y`, where the value `n` is the integral value nearest the exact value `x/y`. When |n-x/y| = ½, the value `n` is chosen to be even.

In contrast to `fmod()`, the returned value is not guaranteed to have the same sign as `x`.

If the returned value is `​0​`, it will have the same sign as `x`.

### Parameters

x, y - floating-point values

### Return value

If successful, returns the IEEE floating-point remainder of the division `x/y` as defined above.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a range error occurs due to underflow, the correct result is returned.

If `y` is zero, but the domain error does not occur, zero is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error may occur if `y` is zero.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- The current rounding mode has no effect.
- `FE_INEXACT` is never raised, the result is always exact.
- If `x` is ±∞ and `y` is not NaN, NaN is returned and `FE_INVALID` is raised.
- If `y` is ±0 and `x` is not NaN, NaN is returned and `FE_INVALID` is raised.
- If either argument is NaN, NaN is returned.

### Notes

POSIX requires that a domain error occurs if `x` is infinite or `y` is zero.

`fmod`, but not `remainder` is useful for doing silent wrapping of floating-point types to unsigned integer types: `(0.0 <= (y = fmod(rint(x), 65536.0)) ? y : 65536.0 + y)` is in the range `[``-0.0``,``65535.0``]`, which corresponds to `unsigned short`, but `remainder(rint(x), 65536.0)` is in the range `[``-32767.0``,``+32768.0``]`, which is outside of the range of `signed short`.

### Example

```c
#include <fenv.h>
#include <math.h>
#include <stdio.h>
// #pragma STDC FENV_ACCESS ON

int main(void)
{
    printf("remainder(+5.1, +3.0) = %.1f\n", remainder(5.1, 3));
    printf("remainder(-5.1, +3.0) = %.1f\n", remainder(-5.1, 3));
    printf("remainder(+5.1, -3.0) = %.1f\n", remainder(5.1, -3));
    printf("remainder(-5.1, -3.0) = %.1f\n", remainder(-5.1, -3));

    // special values
    printf("remainder(-0.0, 1.0) = %.1f\n", remainder(-0.0, 1));
    printf("remainder(+5.1, Inf) = %.1f\n", remainder(5.1, INFINITY));

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    printf("remainder(+5.1, 0) = %.1f\n", remainder(5.1, 0));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Output:

```text
remainder(+5.1, +3.0) = -0.9
remainder(-5.1, +3.0) = 0.9
remainder(+5.1, -3.0) = -0.9
remainder(-5.1, -3.0) = 0.9
remainder(+0.0, 1.0) = 0.0
remainder(-0.0, 1.0) = -0.0
remainder(+5.1, Inf) = 5.1
remainder(+5.1, 0) = -nan
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.10.2 The remainder functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.7.2 The remainder functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.10.2 The remainder functions (p: 185-186)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.7.2 The remainder functions (p: 385)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.10.2 The remainder functions (p: 254-255)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.7.2 The remainder functions (p: 529)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.10.2 The remainder functions (p: 235)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.7.2 The remainder functions (p: 465)

### See also

|  |  |
| --- | --- |
| div, ldiv, lldiv (C99) | computes quotient and remainder of integer division (function) |
| fmod, fmodf, fmodl (C99), (C99) | computes remainder of the floating-point division operation (function) |
| remquo, remquof, remquol (C99), (C99), (C99) | computes signed remainder as well as the three last bits of the division operation (function) |
| C++ documentation for remainder |  |
