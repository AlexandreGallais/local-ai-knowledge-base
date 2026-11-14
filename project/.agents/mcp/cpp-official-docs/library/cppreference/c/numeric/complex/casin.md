# casinf, casin, casinl

| Defined in header `<complex.h>` |  |  |
| --- | --- | --- |
| `float complex casinf( float complex z );` | (1) | (since C99) |
| `double complex casin( double complex z );` | (2) | (since C99) |
| `long double complex casinl( long double complex z );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define asin( z )` | (4) | (since C99) |

1-3) Computes the complex arc sine of `z` with branch cuts outside the interval [−1,+1] along the real axis.

4) Type-generic macro: If `z` has type `long double complex`, `casinl` is called. if `z` has type `double complex`, `casin` is called, if `z` has type `float complex`, `casinf` is called. If `z` is real or integer, then the macro invokes the corresponding real function (`asinf`, `asin`, `asinl`). If `z` is imaginary, then the macro invokes the corresponding real version of the function `asinh`, implementing the formula \(\small \arcsin({\rm i}y) = {\rm i}{\rm arsinh}(y)\)arcsin(iy) = i arsinh(y), and the return type of the macro is imaginary.

### Parameters

z - complex argument

### Return value

If no errors occur, complex arc sine of `z` is returned, in the range of a strip unbounded along the imaginary axis and in the interval [−π/2; +π/2] along the real axis.

Errors and special cases are handled as if the operation is implemented by `-I * casinh(I*z)`

### Notes

Inverse sine (or arc sine) is a multivalued function and requires a branch cut on the complex plane. The branch cut is conventionally placed at the line segments (-∞,-1) and (1,∞) of the real axis.

The mathematical definition of the principal value of arc sine is \(\small \arcsin z = -{\rm i}\ln({\rm i}z+\sqrt{1-z^2})\)arcsin z = -*i*ln(*i*z + √1-z2 )

For any z, \(\small{ \arcsin(z) = \arccos(-z) - \frac{\pi}{2} }\)arcsin(z) = acos(-z) - π 2

### Example

```c
#include <stdio.h>
#include <math.h>
#include <complex.h>

int main(void)
{
    double complex z = casin(-2);
    printf("casin(-2+0i) = %f%+fi\n", creal(z), cimag(z));

    double complex z2 = casin(conj(-2)); // or CMPLX(-2, -0.0)
    printf("casin(-2-0i) (the other side of the cut) = %f%+fi\n", creal(z2), cimag(z2));

    // for any z, asin(z) = acos(-z) - pi/2
    double pi = acos(-1);
    double complex z3 = csin(cacos(conj(-2))-pi/2);
    printf("csin(cacos(-2-0i)-pi/2) = %f%+fi\n", creal(z3), cimag(z3));
}
```

Output:

```text
casin(-2+0i) = -1.570796+1.316958i
casin(-2-0i) (the other side of the cut) = -1.570796-1.316958i
csin(cacos(-2-0i)-pi/2) = 2.000000+0.000000i
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.3.5.2 The casin functions (p: 190)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- G.7 Type-generic math <tgmath.h> (p: 545)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.5.2 The casin functions (p: 172)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- G.7 Type-generic math <tgmath.h> (p: 480)

### See also

|  |  |
| --- | --- |
| cacos, cacosf, cacosl (C99), (C99), (C99) | computes the complex arc cosine (function) |
| catan, catanf, catanl (C99), (C99), (C99) | computes the complex arc tangent (function) |
| csin, csinf, csinl (C99), (C99), (C99) | computes the complex sine (function) |
| asin, asinf, asinl (C99), (C99) | computes arc sine (\({\small\arcsin{x} }\)arcsin(x)) (function) |
| C++ documentation for asin |  |
