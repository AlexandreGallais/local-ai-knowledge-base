# asinh, asinhf, asinhl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float asinhf( float arg );` | (1) | (since C99) |
| `double asinh( double arg );` | (2) | (since C99) |
| `long double asinhl( long double arg );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define asinh( arg )` | (4) | (since C99) |

1-3) Computes the inverse hyperbolic sine of `arg`.

4) Type-generic macro: If the argument has type `long double`, `asinhl` is called. Otherwise, if the argument has integer type or the type `double`, `asinh` is called. Otherwise, `asinhf` is called. If the argument is complex, then the macro invokes the corresponding complex function (`casinhf`, `casinh`, `casinhl`).

### Parameters

arg - floating-point value representing the area of a hyperbolic sector

### Return value

If no errors occur, the inverse hyperbolic sine of `arg` (sinh-1 (arg), or arsinh(arg)), is returned.

If a range error occurs due to underflow, the correct result (after rounding) is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- If the argument is ±0 or ±∞, it is returned unmodified.
- If the argument is NaN, NaN is returned.

### Notes

Although the C standard names this function "arc hyperbolic sine", the inverse functions of the hyperbolic functions are the area functions. Their argument is the area of a hyperbolic sector, not an arc. The correct name is "inverse hyperbolic sine" (used by POSIX) or "area hyperbolic sine".

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("asinh(1) = %f\nasinh(-1) = %f\n", asinh(1), asinh(-1));
    // special values
    printf("asinh(+0) = %f\nasinh(-0) = %f\n", asinh(0.0), asinh(-0.0));
}
```

Output:

```text
asinh(1) = 0.881374
asinh(-1) = -0.881374
asinh(+0) = 0.000000
asinh(-0) = -0.000000
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.5.2 The asinh functions (p: 240-241)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.2 The asinh functions (p: 520)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.5.2 The asinh functions (p: 240-241)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.2 The asinh functions (p: 520)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.5.2 The asinh functions (p: 240-241)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.2.2 The asinh functions (p: 520)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.5.2 The asinh functions (p: 221)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.2.2 The asinh functions (p: 457)

### See also

|  |  |
| --- | --- |
| acosh, acoshf, acoshl (C99), (C99), (C99) | computes inverse hyperbolic cosine (\({\small\operatorname{arcosh}{x} }\)arcosh(x)) (function) |
| atanh, atanhf, atanhl (C99), (C99), (C99) | computes inverse hyperbolic tangent (\({\small\operatorname{artanh}{x} }\)artanh(x)) (function) |
| sinh, sinhf, sinhl (C99), (C99) | computes hyperbolic sine (\({\small\sinh{x} }\)sinh(x)) (function) |
| casinh, casinhf, casinhl (C99), (C99), (C99) | computes the complex arc hyperbolic sine (function) |
| C++ documentation for asinh |  |

### External links

Weisstein, Eric W. "Inverse Hyperbolic Sine." From MathWorld — A Wolfram Web Resource.
