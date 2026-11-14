# CMPLXF, CMPLX, CMPLXL

| Defined in header `<complex.h>` |  |
| --- | --- |
| `float complex CMPLXF( float real, float imag );` | (since C11) |
| `double complex CMPLX( double real, double imag );` | (since C11) |
| `long double complex CMPLXL( long double real, long double imag );` | (since C11) |

Each of these macros expands to an expression that evaluates to the value of the specified complex type, with the real part having the value of `real` (converted to the specified argument type) and the imaginary part having the value of `imag` (converted to the specified argument type)

The expressions are suitable for use as initializers for objects with static or thread storage duration, as long as the expressions `real` and `imag` are also suitable.

### Parameters

|  |  |  |
| --- | --- | --- |
| real | - | the real part of the complex number to return |
| imag | - | the imaginary part of the complex number to return |

### Return value

A complex number composed of `real` and `imag` as the real and imaginary parts.

### Notes

These macros are implemented as if the imaginary types are supported (even if they are otherwise not supported and `_Imaginary_I` is actually undefined) and as if defined as follows:

```c
#define CMPLX(x, y) ((double complex)((double)(x) + _Imaginary_I * (double)(y)))
#define CMPLXF(x, y) ((float complex)((float)(x) + _Imaginary_I * (float)(y)))
#define CMPLXL(x, y) ((long double complex)((long double)(x) + \
                      _Imaginary_I * (long double)(y)))
```

### Example

```c
#include <stdio.h>
#include <complex.h>

int main(void)
{
    double complex z = CMPLX(0.0, -0.0);
    printf("z = %.1f%+.1fi\n", creal(z), cimag(z));
}
```

Output:

```text
z = 0.0-0.0i
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.3.9.3 The CMPLX macros (p: 197)

### See also

|  |  |
| --- | --- |
| _Imaginary_I (C99) | the imaginary unit constant i (macro constant) |
| C++ documentation for complex |  |
