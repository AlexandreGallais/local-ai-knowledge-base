# FE_DIVBYZERO, FE_INEXACT, FE_INVALID, FE_OVERFLOW, FE_UNDERFLOW, FE_ALL_EXCEPT

| Defined in header `<fenv.h>` |  |
| --- | --- |
| `#define FE_DIVBYZERO /*implementation defined power of 2*/` | (since C99) |
| `#define FE_INEXACT /*implementation defined power of 2*/` | (since C99) |
| `#define FE_INVALID /*implementation defined power of 2*/` | (since C99) |
| `#define FE_OVERFLOW /*implementation defined power of 2*/` | (since C99) |
| `#define FE_UNDERFLOW /*implementation defined power of 2*/` | (since C99) |
| `#define FE_ALL_EXCEPT FE_DIVBYZERO \| FE_INEXACT \| \ FE_INVALID \| FE_OVERFLOW \| \ FE_UNDERFLOW` | (since C99) |

All these macro constants (except `FE_ALL_EXCEPT`) expand to integer constant expressions that are distinct powers of 2, which uniquely identify all supported floating-point exceptions. Each macro is only defined if it is supported.

The macro constant `FE_ALL_EXCEPT`, which expands to the bitwise OR of all other `FE_*`, is always defined and is zero if floating-point exceptions are not supported by the implementation.

| Constant | Explanation |
| --- | --- |
| `FE_DIVBYZERO` | pole error occurred in an earlier floating-point operation |
| `FE_INEXACT` | inexact result: rounding was necessary to store the result of an earlier floating-point operation |
| `FE_INVALID` | domain error occurred in an earlier floating-point operation |
| `FE_OVERFLOW` | the result of an earlier floating-point operation was too large to be representable |
| `FE_UNDERFLOW` | the result of an earlier floating-point operation was subnormal with a loss of precision |
| `FE_ALL_EXCEPT` | bitwise OR of all supported floating-point exceptions |

The implementation may define additional macro constants in `<fenv.h>` to identify additional floating-point exceptions. All such constants begin with `FE_` followed by at least one uppercase letter.

See math_errhandling for further details.

### Example

```c
#include <stdio.h>
#include <math.h>
#include <float.h>
#include <fenv.h>

#pragma STDC FENV_ACCESS ON
void show_fe_exceptions(void)
{
    printf("exceptions raised:");
    if(fetestexcept(FE_DIVBYZERO)) printf(" FE_DIVBYZERO");
    if(fetestexcept(FE_INEXACT))   printf(" FE_INEXACT");
    if(fetestexcept(FE_INVALID))   printf(" FE_INVALID");
    if(fetestexcept(FE_OVERFLOW))  printf(" FE_OVERFLOW");
    if(fetestexcept(FE_UNDERFLOW)) printf(" FE_UNDERFLOW");
    feclearexcept(FE_ALL_EXCEPT);
    printf("\n");
}

int main(void)
{
    printf("MATH_ERREXCEPT is %s\n",
           math_errhandling & MATH_ERREXCEPT ? "set" : "not set");

    printf("0.0/0.0 = %f\n", 0.0/0.0);
    show_fe_exceptions();

    printf("1.0/0.0 = %f\n", 1.0/0.0);
    show_fe_exceptions();

    printf("1.0/10.0 = %f\n", 1.0/10.0);
    show_fe_exceptions();

    printf("sqrt(-1) = %f\n", sqrt(-1));
    show_fe_exceptions();

    printf("DBL_MAX*2.0 = %f\n", DBL_MAX*2.0);
    show_fe_exceptions();

    printf("nextafter(DBL_MIN/pow(2.0,52),0.0) = %.1f\n",
                      nextafter(DBL_MIN/pow(2.0,52),0.0));
    show_fe_exceptions();
}
```

Possible output:

```text
MATH_ERREXCEPT is set
0.0/0.0 = nan
exceptions raised: FE_INVALID
1.0/0.0 = inf
exceptions raised: FE_DIVBYZERO
1.0/10.0 = 0.100000
exceptions raised: FE_INEXACT
sqrt(-1) = -nan
exceptions raised: FE_INVALID
DBL_MAX*2.0 = inf
exceptions raised: FE_INEXACT FE_OVERFLOW
nextafter(DBL_MIN/pow(2.0,52),0.0) = 0.0
exceptions raised: FE_INEXACT FE_UNDERFLOW
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.6/6 Floating-point environment <fenv.h> (p: 207)

- C99 standard (ISO/IEC 9899:1999):

- 7.6/5 Floating-point environment <fenv.h> (p: 188)

### See also

|  |  |
| --- | --- |
| math_errhandling, MATH_ERRNO, MATH_ERREXCEPT (C99), (C99), (C99) | defines the error handling mechanism used by the common mathematical functions (macro constant) |
| C++ documentation for floating-point exception macros |  |
