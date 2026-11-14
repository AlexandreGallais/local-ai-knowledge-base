# _Imaginary_I

| Defined in header `<complex.h>` |  |
| --- | --- |
| `#define _Imaginary_I /* unspecified */` | (since C99) |

The `_Imaginary_I` macro expands to a value of type `const float _Imaginary` with the value of the imaginary unit.

As with any pure imaginary number support in C, this macro is only defined if the imaginary numbers are supported.

|  |  |
| --- | --- |
| A compiler that defines `__STDC_IEC_559_COMPLEX__` is not required to support imaginary numbers. POSIX recommends checking if the macro `_Imaginary_I` is defined to identify imaginary number support. | (since C99) (until C11) |
| Imaginary numbers are supported if `__STDC_IEC_559_COMPLEX__` is defined. | (since C11) |

### Notes

This macro allows for the precise way to assemble a complex number from its real and imaginary components, e.g. with `(double complex)((double)x + _Imaginary_I * (double)y)`. This pattern was standardized in C11 as the macro `CMPLX`. Note that if `_Complex_I` is used instead, this expression is allowed to convert negative zero to positive zero in the imaginary position.

### Example

```c
#include <stdio.h>
#include <complex.h>
#include <math.h>

int main(void)
{
    double complex z1 = 0.0 + INFINITY * _Imaginary_I;
    printf("z1 = %.1f%+.1fi\n", creal(z1), cimag(z1));

    double complex z2 = 0.0 + INFINITY * _Complex_I;
    printf("z2 = %.1f%+.1fi\n", creal(z2), cimag(z2));
}
```

Output:

```text
z1 = 0.0+Infi
z2 = NaN+Infi
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.3.1/5 _Imaginary_I (p: 188)

- G.6/1 _Imaginary_I (p: 537)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.1/3 _Imaginary_I (p: 170)

- G.6/1 _Imaginary_I (p: 472)

### See also

|  |  |
| --- | --- |
| _Complex_I (C99) | the complex unit constant i (macro constant) |
| I (C99) | the complex or imaginary unit constant i (macro constant) |
