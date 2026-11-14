# nearbyint, nearbyintf, nearbyintl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float nearbyintf( float arg );` | (1) | (since C99) |
| `double nearbyint( double arg );` | (2) | (since C99) |
| `long double nearbyintl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define nearbyint( arg )` | (4) | (since C99) |

1-3) Rounds the floating-point argument `arg` to an integer value in floating-point format, using the current rounding mode.

4) Type-generic macro: If `arg` has type `long double`, `nearbyintl` is called. Otherwise, if `arg` has integer type or the type `double`, `nearbyint` is called. Otherwise, `nearbyintf` is called, respectively.

### Parameters

arg - floating-point value

### Return value

The nearest integer value to `arg`, according to the current rounding mode, is returned.

### Error handling

This function is not subject to any of the errors specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- `FE_INEXACT` is never raised.
- If `arg` is ±∞, it is returned, unmodified.
- If `arg` is ±0, it is returned, unmodified.
- If `arg` is NaN, NaN is returned.

### Notes

The only difference between `nearbyint` and `rint` is that `nearbyint` never raises `FE_INEXACT`.

The largest representable floating-point values are exact integers in all standard floating-point formats, so `nearbyint` never overflows on its own; however the result may overflow any integer type (including `intmax_t`), when stored in an integer variable.

If the current rounding mode is `FE_TONEAREST`, this function rounds to even in halfway cases (like `rint`, but unlike `round`).

### Example

```c
#include <fenv.h>
#include <math.h>
#include <stdio.h>

int main(void)
{
// #pragma STDC FENV_ACCESS ON
    fesetround(FE_TONEAREST);
    printf("rounding to nearest:\nnearbyint(+2.3) = %+.1f  ", nearbyint(2.3));
    printf("nearbyint(+2.5) = %+.1f  ", nearbyint(2.5));
    printf("nearbyint(+3.5) = %+.1f\n", nearbyint(3.5));
    printf("nearbyint(-2.3) = %+.1f  ", nearbyint(-2.3));
    printf("nearbyint(-2.5) = %+.1f  ", nearbyint(-2.5));
    printf("nearbyint(-3.5) = %+.1f\n", nearbyint(-3.5));

    fesetround(FE_DOWNWARD);
    printf("rounding down: \nnearbyint(+2.3) = %+.1f  ", nearbyint(2.3));
    printf("nearbyint(+2.5) = %+.1f  ", nearbyint(2.5));
    printf("nearbyint(+3.5) = %+.1f\n", nearbyint(3.5));
    printf("nearbyint(-2.3) = %+.1f  ", nearbyint(-2.3));
    printf("nearbyint(-2.5) = %+.1f  ", nearbyint(-2.5));
    printf("nearbyint(-3.5) = %+.1f\n", nearbyint(-3.5));

    printf("nearbyint(-0.0) = %+.1f\n", nearbyint(-0.0));
    printf("nearbyint(-Inf) = %+.1f\n", nearbyint(-INFINITY));
}
```

Output:

```text
rounding to nearest:
nearbyint(+2.3) = +2.0  nearbyint(+2.5) = +2.0  nearbyint(+3.5) = +4.0
nearbyint(-2.3) = -2.0  nearbyint(-2.5) = -2.0  nearbyint(-3.5) = -4.0
rounding down:
nearbyint(+2.3) = +2.0  nearbyint(+2.5) = +2.0  nearbyint(+3.5) = +3.0
nearbyint(-2.3) = -3.0  nearbyint(-2.5) = -3.0  nearbyint(-3.5) = -4.0
nearbyint(-0.0) = -0.0
nearbyint(-Inf) = -inf
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.9.3 The nearbyint functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.6.3 The nearbyint functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.9.3 The nearbyint functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.6.3 The nearbyint functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.9.3 The nearbyint functions (p: 251-252)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.6.3 The nearbyint functions (p: 526)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.9.3 The nearbyint functions (p: 232)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.6.3 The nearbyint functions (p: 463)

### See also

|  |  |
| --- | --- |
| rint, rintf, rintl, lrint, lrintf, lrintl, llrint, llrintf, llrintl (C99), (C99), (C99), (C99), (C99), (C99), (C99), (C99), (C99) | rounds to an integer using current rounding mode with exception if the result differs (function) |
| round, roundf, roundl, lround, lroundf, lroundl, llround, llroundf, llroundl (C99), (C99), (C99), (C99), (C99), (C99), (C99), (C99), (C99) | rounds to nearest integer, rounding away from zero in halfway cases (function) |
| fegetround, fesetround (C99), (C99) | gets or sets rounding direction (function) |
| C++ documentation for nearbyint |  |
