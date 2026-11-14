# roundeven, roundevenf, roundevenl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float roundevenf( float arg );` | (1) | (since C23) |
| `double roundeven( double arg );` | (2) | (since C23) |
| `long double roundevenl( long double arg );` | (3) | (since C23) |
| Defined in header `<tgmath.h>` |  |  |
| `#define roundeven( arg )` | (4) | (since C23) |

1-3) Computes the nearest integer value to `arg` (in floating-point format), rounding halfway cases to nearest even integer, regardless of the current rounding mode.

4) Type-generic macro: If `arg` has type `long double`, `roundevenl` is called. Otherwise, if `arg` has integer type or the type `double`, `roundeven` is called. Otherwise, `roundevenf` is called, respectively.

### Parameters

arg - floating-point value

### Return value

If no errors occur, the nearest integer value to `arg`, rounding halfway cases to nearest even integer, is returned.

### Error handling

This function is not subject to any of the errors specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559):

- `FE_INEXACT` is never raised.
- If `arg` is ±∞, it is returned, unmodified.
- If `arg` is ±0, it is returned, unmodified.
- If `arg` is NaN, NaN is returned.

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("roundeven(+2.4) = %+.1f\n", roundeven(2.4));
    printf("roundeven(-2.4) = %+.1f\n", roundeven(-2.4));
    printf("roundeven(+2.5) = %+.1f\n", roundeven(2.5));
    printf("roundeven(-2.5) = %+.1f\n", roundeven(-2.5));
    printf("roundeven(+2.6) = %+.1f\n", roundeven(2.6));
    printf("roundeven(-2.6) = %+.1f\n", roundeven(-2.6));
    printf("roundeven(+3.5) = %+.1f\n", roundeven(3.5));
    printf("roundeven(-3.5) = %+.1f\n", roundeven(-3.5));
    printf("roundeven(-0.0) = %+.1f\n", roundeven(-0.0));
    printf("roundeven(-Inf) = %+f\n",   roundeven(-INFINITY));
}
```

Possible output:

```text
roundeven(+2.4) = +2.0
roundeven(-2.4) = -2.0
roundeven(+2.5) = +2.0
roundeven(-2.5) = -2.0
roundeven(+2.6) = +3.0
roundeven(-2.6) = -3.0
roundeven(+3.5) = +4.0
roundeven(-3.5) = -4.0
roundeven(-0.0) = -0.0
roundeven(-Inf) = -inf
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.9.8 The roundeven functions (p: 265-266)

- 7.27 Type-generic math <tgmath.h> (p: 386-390)

- F.10.6.8 The roundeven functions (p: 532)

### See also

|  |  |
| --- | --- |
| rint, rintf, rintl, lrint, lrintf, lrintl, llrint, llrintf, llrintl (C99), (C99), (C99), (C99), (C99), (C99), (C99), (C99), (C99) | rounds to an integer using current rounding mode with exception if the result differs (function) |
| round, roundf, roundl, lround, lroundf, lroundl, llround, llroundf, llroundl (C99), (C99), (C99), (C99), (C99), (C99), (C99), (C99), (C99) | rounds to nearest integer, rounding away from zero in halfway cases (function) |
