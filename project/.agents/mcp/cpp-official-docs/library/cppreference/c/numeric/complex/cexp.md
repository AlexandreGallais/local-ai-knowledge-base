# cexpf, cexp, cexpl

| Defined in header `<complex.h>` |  |  |
| --- | --- | --- |
| `float complex cexpf( float complex z );` | (1) | (since C99) |
| `double complex cexp( double complex z );` | (2) | (since C99) |
| `long double complex cexpl( long double complex z );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define exp( z )` | (4) | (since C99) |

1-3) Computes the complex base-*e* exponential of `z`.

4) Type-generic macro: If `z` has type `long double complex`, `cexpl` is called. if `z` has type `double complex`, `cexp` is called, if `z` has type `float complex`, `cexpf` is called. If `z` is real or integer, then the macro invokes the corresponding real function (`expf`, `exp`, `expl`). If `z` is imaginary, the corresponding complex argument version is called.

### Parameters

z - complex argument

### Return value

If no errors occur, *e* raised to the power of `z`, \(\small e^z\)ez is returned.

### Error handling and special values

Errors are reported consistent with `math_errhandling`.

If the implementation supports IEEE floating-point arithmetic,

- `cexp(conj(z)) == conj(cexp(z))`
- If `z` is `±0+0i`, the result is `1+0i`
- If `z` is `x+∞i` (for any finite x), the result is `NaN+NaNi` and `FE_INVALID` is raised.
- If `z` is `x+NaNi` (for any finite x), the result is `NaN+NaNi` and `FE_INVALID` may be raised.
- If `z` is `+∞+0i`, the result is `+∞+0i`
- If `z` is `-∞+yi` (for any finite y), the result is `+0cis(y)`
- If `z` is `+∞+yi` (for any finite nonzero y), the result is `+∞cis(y)`
- If `z` is `-∞+∞i`, the result is `±0±0i` (signs are unspecified)
- If `z` is `+∞+∞i`, the result is `±∞+NaNi` and `FE_INVALID` is raised (the sign of the real part is unspecified)
- If `z` is `-∞+NaNi`, the result is `±0±0i` (signs are unspecified)
- If `z` is `+∞+NaNi`, the result is `±∞+NaNi` (the sign of the real part is unspecified)
- If `z` is `NaN+0i`, the result is `NaN+0i`
- If `z` is `NaN+yi` (for any nonzero y), the result is `NaN+NaNi` and `FE_INVALID` may be raised
- If `z` is `NaN+NaNi`, the result is `NaN+NaNi`

where \(\small{\rm cis}(y)\)cis(y) is \(\small \cos(y)+{\rm i}\sin(y)\)cos(y) + i sin(y)

### Notes

The complex exponential function \(\small e^z\)ez for \(\small z = x + {\rm i}y\)z = x+iy equals \(\small e^x {\rm cis}(y)\)ex cis(y), or, \(\small e^x (\cos(y)+{\rm i}\sin(y))\)ex (cos(y) + i sin(y))

The exponential function is an *entire function* in the complex plane and has no branch cuts.

### Example

```c
#include <stdio.h>
#include <math.h>
#include <complex.h>

int main(void)
{
    double PI = acos(-1);
    double complex z = cexp(I * PI); // Euler's formula
    printf("exp(i*pi) = %.1f%+.1fi\n", creal(z), cimag(z));

}
```

Output:

```text
exp(i*pi) = -1.0+0.0i
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.3.7.1 The cexp functions (p: 194)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- G.6.3.1 The cexp functions (p: 543)

- G.7 Type-generic math <tgmath.h> (p: 545)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.7.1 The cexp functions (p: 176)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- G.6.3.1 The cexp functions (p: 478)

- G.7 Type-generic math <tgmath.h> (p: 480)

### See also

|  |  |
| --- | --- |
| clog, clogf, clogl (C99), (C99), (C99) | computes the complex natural logarithm (function) |
| exp, expf, expl (C99), (C99) | computes *e* raised to the given power (\({\small e^x}\)ex) (function) |
| C++ documentation for exp |  |
