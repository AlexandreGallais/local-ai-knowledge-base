# copysign, copysignf, copysignl

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float copysignf( float x, float y );` | (1) | (since C99) |
| `double copysign( double x, double y );` | (2) | (since C99) |
| `long double copysignl( long double x, long double y );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define copysign(x, y)` | (4) | (since C99) |

1-3) Composes a floating-point value with the magnitude of `x` and the sign of `y`.

4) Type-generic macro: If any argument has type `long double`, `copysignl` is called. Otherwise, if any argument has integer type or has type `double`, `copysign` is called. Otherwise, `copysignf` is called.

### Parameters

x, y - floating-point values

### Return value

If no errors occur, the floating-point value with the magnitude of `x` and the sign of `y` is returned.

If `x` is NaN, then NaN with the sign of `y` is returned.

If `y` is -0, the result is only negative if the implementation supports the signed zero consistently in arithmetic operations.

### Error handling

This function is not subject to any errors specified in `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- The returned value is exact (`FE_INEXACT` is never raised) and independent of the current rounding mode.

### Notes

`copysign` is the only portable way to manipulate the sign of a NaN value (to examine the sign of a NaN, `signbit` may also be used).

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("copysign(1.0,+2.0)      = %+.1f\n", copysign(1.0,+2.0));
    printf("copysign(1.0,-2.0)      = %+.1f\n", copysign(1.0,-2.0));
    printf("copysign(INFINITY,-2.0) = %f\n",    copysign(INFINITY,-2.0));
    printf("copysign(NAN,-2.0)      = %f\n",    copysign(NAN,-2.0));
}
```

Possible output:

```text
copysign(1.0,+2.0)      = +1.0
copysign(1.0,-2.0)      = -1.0
copysign(INFINITY,-2.0) = -inf
copysign(NAN,-2.0)      = -nan
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.11.1 The copysign functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.8.1 The copysign functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.11.1 The copysign functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.8.1 The copysign functions (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.11.1 The copysign functions (p: 255)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.8.1 The copysign functions (p: 529)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.11.1 The copysign functions (p: 236)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.8.1 The copysign functions (p: 465)

### See also

|  |  |
| --- | --- |
| fabs, fabsf, fabsl (C99), (C99) | computes absolute value of a floating-point value (\(\small{\|x\|}\)\|x\|) (function) |
| signbit (C99) | checks if the given number is negative (function macro) |
| C++ documentation for copysign |  |
