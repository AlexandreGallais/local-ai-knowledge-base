# _Complex_I

| Defined in header `<complex.h>` |  |
| --- | --- |
| `#define _Complex_I /* unspecified */` | (since C99) |

The `_Complex_I` macro expands to a value of type `const float _Complex` with the value of the imaginary unit.

### Notes

This macro may be used when `I` is not available, such as when it has been undefined by the application.

Unlike `_Imaginary_I` and `CMPLX`, use of this macro to construct a complex number may lose the sign of zero on the imaginary part.

### Example

```c
#include <stdio.h>
#include <complex.h>

#undef I
#define J _Complex_I // can be used to redefine I

int main(void)
{
    // can be used to construct a complex number
    double complex z = 1.0 + 2.0 * _Complex_I;
    printf("1.0 + 2.0 * _Complex_I = %.1f%+.1fi\n", creal(z), cimag(z));

    // sign of zero may not be preserved
    double complex z2 = 0.0 + -0.0 * _Complex_I;
    printf("0.0 + -0.0 * _Complex_I = %.1f%+.1fi\n", creal(z2), cimag(z2));
}
```

Possible output:

```text
1.0 + 2.0 * _Complex_I = 1.0+2.0i
0.0 + -0.0 * _Complex_I = 0.0+0.0i
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.3.1/4 _Complex_I (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.3.1/4 _Complex_I (p: 136)

- C11 standard (ISO/IEC 9899:2011):

- 7.3.1/4 _Complex_I (p: 188)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.1/2 _Complex_I (p: 170)

### See also

|  |  |
| --- | --- |
| _Imaginary_I (C99) | the imaginary unit constant i (macro constant) |
| I (C99) | the complex or imaginary unit constant i (macro constant) |
