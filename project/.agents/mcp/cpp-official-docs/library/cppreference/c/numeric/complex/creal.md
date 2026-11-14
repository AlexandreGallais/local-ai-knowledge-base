# crealf, creal, creall

| Defined in header `<complex.h>` |  |  |
| --- | --- | --- |
| `float crealf( float complex z );` | (1) | (since C99) |
| `double creal( double complex z );` | (2) | (since C99) |
| `long double creall( long double complex z );` | (3) | (since C99) |
| Defined in header `<tgmath.h>` |  |  |
| `#define creal( z )` | (4) | (since C99) |

1-3) Returns the real part of `z`.

4) Type-generic macro: if `z` has type `long double complex`, `long double imaginary`, or `long double`, `creall` is called. If `z` has type `float complex`, `float imaginary`, or `float`, `crealf` is called. If `z` has type `double complex`, `double imaginary`, `double`, or any integer type, `creal` is called.

### Parameters

z - complex argument

### Return value

The real part of `z`.

This function is fully specified for all possible inputs and is not subject to any errors described in math_errhandling

### Notes

For any complex variable `z`, `z == creal(z) + I*cimag(z)`.

### Example

```c
#include <stdio.h>
#include <complex.h>

int main(void)
{
    double complex z = 1.0 + 2.0*I;
    printf("%f%+fi\n", creal(z), cimag(z));
}
```

Output:

```text
1.000000+2.000000i
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.3.9.6 The creal functions (p: 198-199)

- 7.25 Type-generic math <tgmath.h> (p: 373-375)

- G.7 Type-generic math <tgmath.h> (p: 545)

- C99 standard (ISO/IEC 9899:1999):

- 7.3.9.5 The creal functions (p: 180)

- 7.22 Type-generic math <tgmath.h> (p: 335-337)

- G.7 Type-generic math <tgmath.h> (p: 480)

### See also

|  |  |
| --- | --- |
| cimag, cimagf, cimagl (C99), (C99), (C99) | computes the imaginary part a complex number (function) |
| C++ documentation for real |  |
