# FE_DOWNWARD, FE_TONEAREST, FE_TOWARDZERO, FE_UPWARD

| Defined in header `<fenv.h>` |  |
| --- | --- |
| `#define FE_DOWNWARD /*implementation defined*/` | (since C99) |
| `#define FE_TONEAREST /*implementation defined*/` | (since C99) |
| `#define FE_TOWARDZERO /*implementation defined*/` | (since C99) |
| `#define FE_UPWARD /*implementation defined*/` | (since C99) |

Each of these macro constants expands to a nonnegative integer constant expression, which can be used with `fesetround` and `fegetround` to indicate one of the supported floating-point rounding modes. The implementation may define additional rounding mode constants in `<fenv.h>`, which should all begin with `FE_` followed by at least one uppercase letter. Each macro is only defined if it is supported.

| Constant | Explanation |
| --- | --- |
| `FE_DOWNWARD` | rounding towards negative infinity |
| `FE_TONEAREST` | rounding towards nearest representable value |
| `FE_TOWARDZERO` | rounding towards zero |
| `FE_UPWARD` | rounding towards positive infinity |

Additional rounding modes may be supported by an implementation.

The current rounding mode affects the following:

- results of floating-point arithmetic operators outside of constant expressions

```c
double x = 1;
x / 10; // 0.09999999999999999167332731531132594682276248931884765625 or
        // 0.1000000000000000055511151231257827021181583404541015625
```

- results of standard library mathematical functions

```c
sqrt(2); // 1.41421356237309492343001693370752036571502685546875 or
         // 1.4142135623730951454746218587388284504413604736328125
```

- floating-point to floating-point implicit conversion and casts

```c
double d = 1 + DBL_EPSILON;
float f = d; // 1.00000000000000000000000 or
             // 1.00000011920928955078125
```

- string conversions such as `strtod` or `printf`

```c
strtof("0.1", NULL); // 0.0999999940395355224609375 or
                     // 0.100000001490116119384765625
```

- the library rounding functions `nearbyint`, `rint`, `lrint`

```c
lrint(2.1); // 2 or 3
```

The current rounding mode does NOT affect the following:

- floating-point to integer implicit conversion and casts (always towards zero)
- results of floating-point arithmetic operators in constant expressions executed at compile time (always to nearest)
- the library functions `round`, `lround`, `llround`, `ceil`, `floor`, `trunc`

As with any floating-point environment functionality, rounding is only guaranteed if `#pragma STDC FENV_ACCESS ON` is set.

Compilers that do not support the pragma may offer their own ways to support current rounding mode. For example Clang and GCC have the option `-frounding-math` intended to disable optimizations that would change the meaning of rounding-sensitive code.

### Example

```c
#include <fenv.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

// #pragma STDC FENV_ACCESS ON

int main()
{
    fesetround(FE_DOWNWARD);
    puts("rounding down: ");
    printf("           pi = %.22f\n", acosf(-1));
    printf("strtof(\"1.1\") = %.22f\n", strtof("1.1", NULL));
    printf("    rint(2.1) = %.22f\n\n", rintf(2.1));
    fesetround(FE_UPWARD);
    puts("rounding up: ");
    printf("           pi = %.22f\n", acosf(-1));
    printf("strtof(\"1.1\") = %.22f\n", strtof("1.1", NULL));
    printf("    rint(2.1) = %.22f\n", rintf(2.1));
}
```

Output:

```text
rounding down:
           pi = 3.1415925025939941406250
strtof("1.1") = 1.0999999046325683593750
    rint(2.1) = 2.0000000000000000000000

rounding up:
           pi = 3.1415927410125732421875
strtof("1.1") = 1.1000000238418579101563
    rint(2.1) = 3.0000000000000000000000
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.6/8 Floating-point environment <fenv.h> (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.6/8 Floating-point environment <fenv.h> (p: 151)

- C11 standard (ISO/IEC 9899:2011):

- 7.6/8 Floating-point environment <fenv.h> (p: 207)

- C99 standard (ISO/IEC 9899:1999):

- 7.6/7 Floating-point environment <fenv.h> (p: 188)

### See also

|  |  |
| --- | --- |
| fegetround, fesetround (C99), (C99) | gets or sets rounding direction (function) |
| C++ documentation for floating-point rounding macros |  |
