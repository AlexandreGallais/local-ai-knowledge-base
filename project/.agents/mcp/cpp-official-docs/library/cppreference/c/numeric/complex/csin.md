# csinf, csin, csinl

| Defined in header `<complex.h>` |  |  |
| --- | --- | --- |
| `float complex csinf( float complex z );` | (1) | (since C99) |
| `double complex csin( double complex z );` | (2) | (since C99) |
| `long double complex csinl( long double complex z );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define sin( z )` | (4) | (since C99) |

1-3) Computes the complex sine of `z`.

4) Type-generic macro: If `z` has type `long double complex`, `csinl` is called. if `z` has type `double complex`, `csin` is called, if `z` has type `float complex`, `csinf` is called. If `z` is real or integer, then the macro invokes the corresponding real function (`sinf`, `sin`, `sinl`). If `z` is imaginary, then the macro invokes the corresponding real version of the function `sinh`, implementing the formula sin(iy) = i ∙ sinh(y), and the return type of the macro is imaginary.

### Parameters

z - complex argument

### Return value

If no errors occur, the complex sine of `z`.

Errors and special cases are handled as if the operation is implemented by `-I * csinh(I*z)`

### Notes

The sine is an entire function on the complex plane, and has no branch cuts.

Mathematical definition of the sine is sin z = eiz -e-iz 2i

### Example

```c
#include <stdio.h>
#include <math.h>
#include <complex.h>

int main(void)
{
    double complex z = csin(1);  // behaves like real sine along the real line
    printf("sin(1+0i) = %f%+fi ( sin(1)=%f)\n", creal(z), cimag(z), sin(1));

    double complex z2 = csin(I); // behaves like sinh along the imaginary line
    printf("sin(0+1i) = %f%+fi (sinh(1)=%f)\n", creal(z2), cimag(z2), sinh(1));
}
```

Output:

```text
sin(1+0i) = 0.841471+0.000000i ( sin(1)=0.841471)
sin(0+1i) = 0.000000+1.175201i (sinh(1)=1.175201)
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.3.5.5 The csin functions (p: 138-139)

- 7.25 Type-generic math <tgmath.h> (p: 272-273)

- G.7 Type-generic math <tgmath.h> (p: 397)

- C11 standard (ISO/IEC 9899:2011):

- 7.3.5.5 The csin functions (p: 191-192)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- G.7 Type-generic math <tgmath.h> (p: 545)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.5.5 The csin functions (p: 173)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- G.7 Type-generic math <tgmath.h> (p: 480)

### See also

|  |  |
| --- | --- |
| ccos, ccosf, ccosl (C99), (C99), (C99) | computes the complex cosine (function) |
| ctan, ctanf, ctanl (C99), (C99), (C99) | computes the complex tangent (function) |
| casin, casinf, casinl (C99), (C99), (C99) | computes the complex arc sine (function) |
| sin, sinf, sinl (C99), (C99) | computes sine (\({\small\sin{x} }\)sin(x)) (function) |
| C++ documentation for sin |  |
