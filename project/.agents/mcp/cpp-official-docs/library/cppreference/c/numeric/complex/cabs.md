# cabsf, cabs, cabsl

| Defined in header `<complex.h>` |  |  |
| --- | --- | --- |
| `float cabsf( float complex z );` | (1) | (since C99) |
| `double cabs( double complex z );` | (2) | (since C99) |
| `long double cabsl( long double complex z );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define fabs( z )` | (4) | (since C99) |

1-3) Computes the complex absolute value (also known as norm, modulus, or magnitude) of `z`.

4) Type-generic macro: if `z` has type `long double complex` or `long double imaginary`, `cabsl` is called. If `z` has type `float complex` or `float imaginary`, `cabsf` is called. If `z` has type `double complex` or `double imaginary`, `cabs` is called. For real and integer types, the corresponding version of `fabs` is called.

### Parameters

z - complex argument

### Return value

If no errors occur, returns the absolute value (norm, magnitude) of `z`.

Errors and special cases are handled as if the function is implemented as `hypot(creal(z), cimag(z))`

### Example

```c
#include <stdio.h>
#include <complex.h>

int main(void)
{
    double complex z = 1.0 + 1.0*I;
    printf("%.1f%+.1fi cartesian is rho=%f theta=%f polar\n",
           creal(z), cimag(z), cabs(z), carg(z));
}
```

Output:

```text
1.0+1.0i cartesian is rho=1.414214 theta=0.785398 polar
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.3.8.1 The cabs functions (p: 195)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- G.7 Type-generic math <tgmath.h> (p: 545)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.8.1 The cabs functions (p: 177)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- G.7 Type-generic math <tgmath.h> (p: 480)

### See also

|  |  |
| --- | --- |
| carg, cargf, cargl (C99), (C99), (C99) | computes the phase angle of a complex number (function) |
| abs, labs, llabs (C99) | computes absolute value of an integral value (\(\small{\|x\|}\)\|x\|) (function) |
| fabs, fabsf, fabsl (C99), (C99) | computes absolute value of a floating-point value (\(\small{\|x\|}\)\|x\|) (function) |
| hypot, hypotf, hypotl (C99), (C99), (C99) | computes square root of the sum of the squares of two given numbers (\(\scriptsize{\sqrt{x^2+y^2} }\)√x2 +y2 ) (function) |
| C++ documentation for abs |  |
