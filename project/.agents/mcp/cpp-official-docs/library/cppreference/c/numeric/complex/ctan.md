# ctanf, ctan, ctanl

| Defined in header `<complex.h>` |  |  |
| --- | --- | --- |
| `float complex ctanf( float complex z );` | (1) | (since C99) |
| `double complex ctan( double complex z );` | (2) | (since C99) |
| `long double complex ctanl( long double complex z );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define tan( z )` | (4) | (since C99) |

1-3) Computes the complex tangent of `z`.

4) Type-generic macro: If `z` has type `long double complex`, `ctanl` is called. if `z` has type `double complex`, `ctan` is called, if `z` has type `float complex`, `ctanf` is called. If `z` is real or integer, then the macro invokes the corresponding real function (`tanf`, `tan`, `tanl`). If `z` is imaginary, then the macro invokes the corresponding real version of the function `tanh`, implementing the formula tan(iy) = i tanh(y), and the return type is imaginary.

### Parameters

z - complex argument

### Return value

If no errors occur, the complex tangent of `z` is returned.

Errors and special cases are handled as if the operation is implemented by `-i * ctanh(i*z)`, where `i` is the imaginary unit.

### Notes

Tangent is an analytical function on the complex plain and has no branch cuts. It is periodic with respect to the real component, with period πi, and has poles of the first order along the real line, at coordinates (π(1/2 + n), 0). However no common floating-point representation is able to represent π/2 exactly, thus there is no value of the argument for which a pole error occurs.

Mathematical definition of the tangent is tan z = i(e-iz -eiz ) e-iz +eiz

### Example

```c
#include <stdio.h>
#include <math.h>
#include <complex.h>

int main(void)
{
    double complex z = ctan(1);  // behaves like real tangent along the real line
    printf("tan(1+0i) = %f%+fi ( tan(1)=%f)\n", creal(z), cimag(z), tan(1));

    double complex z2 = ctan(I); // behaves like tanh along the imaginary line
    printf("tan(0+1i) = %f%+fi (tanh(1)=%f)\n", creal(z2), cimag(z2), tanh(1));
}
```

Output:

```text
tan(1+0i) = 1.557408+0.000000i ( tan(1)=1.557408)
tan(0+1i) = 0.000000+0.761594i (tanh(1)=0.761594)
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.3.5.6 The ctan functions (p: 192)

- 7.25 Type-generic complex <tgmath.h> (p: 373-375)

- G.7 Type-generic math <tgmath.h> (p: 545)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.5.6 The ctan functions (p: 174)

- 7.22 Type-generic complex <tgcomplex.h> (p: 335-337)

- G.7 Type-generic math <tgmath.h> (p: 480)

### See also

|  |  |
| --- | --- |
| ctanh, ctanhf, ctanhl (C99), (C99), (C99) | computes the complex hyperbolic tangent (function) |
| csin, csinf, csinl (C99), (C99), (C99) | computes the complex sine (function) |
| ccos, ccosf, ccosl (C99), (C99), (C99) | computes the complex cosine (function) |
| catan, catanf, catanl (C99), (C99), (C99) | computes the complex arc tangent (function) |
| tan, tanf, tanl (C99), (C99) | computes tangent (\({\small\tan{x} }\)tan(x)) (function) |
| C++ documentation for tan |  |
