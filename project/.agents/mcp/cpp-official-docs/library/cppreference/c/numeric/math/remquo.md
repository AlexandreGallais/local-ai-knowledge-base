# remquo, remquof, remquol

| Defined in header `<math.h>` |  |  |
| --- | --- | --- |
| `float remquof( float x, float y, int *quo );` | (1) | (since C99) |
| `double remquo( double x, double y, int *quo );` | (2) | (since C99) |
| `long double remquol( long double x, long double y, int *quo );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define remquo( x, y, quo )` | (4) | (since C99) |

1-3) Computes the floating-point remainder of the division operation `x/y` as the `remainder()` function does. Additionally, the sign and at least the three of the last bits of `x/y` will be stored in `quo`, sufficient to determine the octant of the result within a period.

4) Type-generic macro: If any non-pointer argument has type `long double`, `remquol` is called. Otherwise, if any non-pointer argument has integer type or has type `double`, `remquo` is called. Otherwise, `remquof` is called.

### Parameters

|  |  |  |
| --- | --- | --- |
| x, y | - | floating-point values |
| quo | - | pointer to an integer value to store the sign and some bits of `x/y` |

### Return value

If successful, returns the floating-point remainder of the division `x/y` as defined in `remainder`, and stores, in `*quo`, the sign and at least three of the least significant bits of `x/y` (formally, stores a value whose sign is the sign of `x/y` and whose magnitude is congruent modulo 2n to the magnitude of the integral quotient of `x/y`, where n is an implementation-defined integer greater than or equal to 3).

If `y` is zero, the value stored in `*quo` is unspecified.

If a domain error occurs, an implementation-defined value is returned (NaN where supported).

If a range error occurs due to underflow, the correct result is returned if subnormals are supported.

If `y` is zero, but the domain error does not occur, zero is returned.

### Error handling

Errors are reported as specified in `math_errhandling`.

Domain error may occur if `y` is zero.

If the implementation supports IEEE floating-point arithmetic (IEC 60559),

- The current rounding mode has no effect.
- `FE_INEXACT` is never raised
- If `x` is ±∞ and `y` is not NaN, NaN is returned and `FE_INVALID` is raised
- If `y` is ±0 and `x` is not NaN, NaN is returned and `FE_INVALID` is raised
- If either `x` or `y` is NaN, NaN is returned

### Notes

POSIX requires that a domain error occurs if `x` is infinite or `y` is zero.

This function is useful when implementing periodic functions with the period exactly representable as a floating-point value: when calculating sin(πx) for a very large `x`, calling `sin` directly may result in a large error, but if the function argument is first reduced with `remquo`, the low-order bits of the quotient may be used to determine the sign and the octant of the result within the period, while the remainder may be used to calculate the value with high precision.

On some platforms this operation is supported by hardware (and, for example, on Intel CPU, `FPREM1` leaves exactly 3 bits of precision in the quotient).

### Example

```c
#include <fenv.h>
#include <math.h>
#include <stdio.h>

#ifndef __GNUC__
#pragma STDC FENV_ACCESS ON
#endif

double cos_pi_x_naive(double x)
{
    const double pi = acos(-1);
    return cos(pi * x);
}

// the period is 2, values are (0;0.5) positive, (0.5;1.5) negative, (1.5,2) positive
double cos_pi_x_smart(double x)
{
    const double pi = acos(-1);
    int extremum;
    double rem = remquo(x, 1, &extremum);
    extremum = (unsigned)extremum % 2; // keep 1 bit to determine nearest extremum
    return extremum ? -cos(pi * rem) : cos(pi * rem);
}

int main(void)
{
    printf("cos(pi * 0.25) = %f\n", cos_pi_x_naive(0.25));
    printf("cos(pi * 1.25) = %f\n", cos_pi_x_naive(1.25));
    printf("cos(pi * 1000000000000.25) = %f\n", cos_pi_x_naive(1000000000000.25));
    printf("cos(pi * 1000000000001.25) = %f\n", cos_pi_x_naive(1000000000001.25));
    printf("cos(pi * 1000000000000.25) = %f\n", cos_pi_x_smart(1000000000000.25));
    printf("cos(pi * 1000000000001.25) = %f\n", cos_pi_x_smart(1000000000001.25));

    // error handling
    feclearexcept(FE_ALL_EXCEPT);
    int quo;
    printf("remquo(+Inf, 1) = %.1f\n", remquo(INFINITY, 1, &quo));
    if (fetestexcept(FE_INVALID))
        puts("    FE_INVALID raised");
}
```

Possible output:

```text
cos(pi * 0.25) = 0.707107
cos(pi * 1.25) = -0.707107
cos(pi * 1000000000000.25) = 0.707123
cos(pi * 1000000000001.25) = -0.707117
cos(pi * 1000000000000.25) = 0.707107
cos(pi * 1000000000001.25) = -0.707107
remquo(+Inf, 1) = -nan
    FE_INVALID raised
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.10.3 The remquo functions (p: TBD)

- 7.25 Type-generic math <tgmath.h> (p: TBD)

- F.10.7.3 The remquo functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.10.3 The remquo functions (p: 186)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- F.10.7.3 The remquo functions (p: 385)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.10.3 The remquo functions (p: 255)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- F.10.7.3 The remquo functions (p: 529)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.10.3 The remquo functions (p: 236)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- F.9.7.3 The remquo functions (p: 465)

### See also

|  |  |
| --- | --- |
| div, ldiv, lldiv (C99) | computes quotient and remainder of integer division (function) |
| fmod, fmodf, fmodl (C99), (C99) | computes remainder of the floating-point division operation (function) |
| remainder, remainderf, remainderl (C99), (C99), (C99) | computes signed remainder of the floating-point division operation (function) |
| C++ documentation for remquo |  |
