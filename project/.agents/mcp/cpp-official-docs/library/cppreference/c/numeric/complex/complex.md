# complex

| Defined in header `<complex.h>` |  |
| --- | --- |
| `#define complex _Complex` | (since C99) |

This macro expands to a type specifier used to identify complex types.

A program may undefine and perhaps then redefine the `complex` macro.

### Example

```c
#include <complex.h>
#include <math.h>
#include <stdio.h>

void print_complex(const char* note, complex z)
{
    printf("%s %f%+f*i\n", note, creal(z), cimag(z));
}

int main(void)
{
    double complex z = -1.0 + 2.0*I;
    print_complex("z  =", z);
    print_complex("z\u00B2 =", z * z);
    double complex z2 = ccos(2.0 * carg(z)) + csin(2.0 * carg(z))*I;
    print_complex("z\u00B2 =", cabs(z) * cabs(z) * z2);
}
```

Output:

```text
z  = -1.000000+2.000000*i
z² = -3.000000-4.000000*i
z² = -3.000000-4.000000*i
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.3.1/4 complex (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.3.1/4 complex (p: 136)

- C11 standard (ISO/IEC 9899:2011):

- 7.3.1/4 complex (p: 188)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.1/2 complex (p: 170)

### See also

imaginary (C99) imaginary type macro (keyword macro)
