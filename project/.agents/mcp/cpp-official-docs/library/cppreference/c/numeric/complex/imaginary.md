# imaginary

| Defined in header `<complex.h>` |  |
| --- | --- |
| `#define imaginary _Imaginary` | (since C99) |

This macro expands to the keyword `_Imaginary`.

This is a convenience macro that makes it possible to use `float imaginary`, `double imaginary`, and `long double imaginary` as an alternative way to write the three pure imaginary C types `float _Imaginary`, `double _Imaginary`, and `long double _Imaginary`

As with any pure imaginary number support in C, this macro is only defined if the imaginary numbers are supported.

|  |  |
| --- | --- |
| A compiler that defines `__STDC_IEC_559_COMPLEX__` is not required to support imaginary numbers. POSIX recommends checking if the macro `_Imaginary_I` is defined to identify imaginary number support. | (since C99) (until C11) |
| Imaginary numbers are supported if `__STDC_IEC_559_COMPLEX__` is defined. | (since C11) |

### Notes

Programs are allowed to undefine and perhaps redefine the `imaginary` macro.

To date, only Oracle C compiler is known to have implemented imaginary types.

### Example

```c
#include <stdio.h>
#include <complex.h>

int main(void)
{
    double imaginary i = -2.0*I; // pure imaginary
    double f = 1.0; // pure real
    double complex z = f + i; // complex number
    printf("z = %.1f%+.1fi\n", creal(z), cimag(z));
}
```

Output:

```text
z = 1.0-2.0i
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.3.1/5 imaginary (p: 136)

- G.6/1 imaginary (p: 391-392)

- C11 standard (ISO/IEC 9899:2011):

- 7.3.1/5 imaginary (p: 188)

- G.6/1 imaginary (p: 537)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.1/3 imaginary (p: 170)

- G.6/1 imaginary (p: 472)

### See also

complex (C99) complex type macro (keyword macro)
