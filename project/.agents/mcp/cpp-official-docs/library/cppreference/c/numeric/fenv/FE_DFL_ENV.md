# FE_DFL_ENV

| Defined in header `<fenv.h>` |  |
| --- | --- |
| `#define FE_DFL_ENV /*implementation defined*/` | (since C99) |

The macro constant `FE_DFL_ENV` expands to an expression of type `const fenv_t*`, which points to a full copy of the default floating-point environment, that is, the environment as loaded at program startup.

Additional macros that begin with `FE_` followed by uppercase letters, and have the type `const fenv_t*`, may be supported by an implementation.

### Example

```c
#include <stdio.h>
#include <fenv.h>

#pragma STDC FENV_ACCESS ON

void show_fe_exceptions(void)
{
    printf("current exceptions raised: ");
    if(fetestexcept(FE_DIVBYZERO))     printf(" FE_DIVBYZERO");
    if(fetestexcept(FE_INEXACT))       printf(" FE_INEXACT");
    if(fetestexcept(FE_INVALID))       printf(" FE_INVALID");
    if(fetestexcept(FE_OVERFLOW))      printf(" FE_OVERFLOW");
    if(fetestexcept(FE_UNDERFLOW))     printf(" FE_UNDERFLOW");
    if(fetestexcept(FE_ALL_EXCEPT)==0) printf(" none");
    printf("\n");
}

void show_fe_rounding_method(void)
{
    printf("current rounding method:    ");
    switch (fegetround()) {
           case FE_TONEAREST:  printf ("FE_TONEAREST");  break;
           case FE_DOWNWARD:   printf ("FE_DOWNWARD");   break;
           case FE_UPWARD:     printf ("FE_UPWARD");     break;
           case FE_TOWARDZERO: printf ("FE_TOWARDZERO"); break;
           default:            printf ("unknown");
    };
    printf("\n");
}

void show_fe_environment(void)
{
    show_fe_exceptions();
    show_fe_rounding_method();
}

int main()
{
    printf("On startup:\n");
    show_fe_environment();

    // Change environment
    fesetround(FE_DOWNWARD);     // change rounding mode
    feraiseexcept(FE_INVALID);   // raise exception
    printf("\nBefore restoration:\n");
    show_fe_environment();

    fesetenv(FE_DFL_ENV);    // restore
    printf("\nAfter restoring default environment:\n");
    show_fe_environment();
}
```

Output:

```text
On startup:
current exceptions raised:  none
current rounding method:    FE_TONEAREST

Before restoration:
current exceptions raised:  FE_INVALID
current rounding method:    FE_DOWNWARD

After restoring default environment:
current exceptions raised:  none
current rounding method:    FE_TONEAREST
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.6/9 Floating-point environment <fenv.h> (p: 208)

- C99 standard (ISO/IEC 9899:1999):

- 7.6/8 Floating-point environment <fenv.h> (p: 188-189)

### See also

|  |  |
| --- | --- |
| fegetenv, fesetenv (C99) | saves or restores the current floating-point environment (function) |
| feupdateenv (C99) | restores the floating-point environment and raises the previously raise exceptions (function) |
| C++ documentation for FE_DFL_ENV |  |
