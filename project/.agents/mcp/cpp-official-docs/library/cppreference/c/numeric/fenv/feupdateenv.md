# feupdateenv

| Defined in header `<fenv.h>` |  |
| --- | --- |
| `int feupdateenv( const fenv_t* envp );` | (since C99) |

First, remembers the currently raised floating-point exceptions, then restores the floating-point environment from the object pointed to by `envp` (similar to `fesetenv`), then raises the floating-point exceptions that were saved.

This function may be used to end the non-stop mode established by an earlier call to `feholdexcept`.

### Parameters

envp - pointer to the object of type `fenv_t` set by an earlier call to `feholdexcept` or `fegetenv` or equal to `FE_DFL_ENV`

### Return value

`​0​` on success, non-zero otherwise.

### Example

```c
#include <stdio.h>
#include <fenv.h>
#include <float.h>

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

double x2 (double x)   /* times two */
{
    fenv_t curr_excepts;

    /* Save and clear current f-p environment. */
    feholdexcept(&curr_excepts);

    /* Raise inexact and overflow exceptions. */
    printf("In x2():  x = %f\n", x=x*2.0);
    show_fe_exceptions();
    feclearexcept(FE_INEXACT);   /* hide inexact exception from caller */

    /* Merge caller's exceptions (FE_INVALID)        */
    /* with remaining x2's exceptions (FE_OVERFLOW). */
    feupdateenv(&curr_excepts);
    return x;
}

int main(void)
{
    feclearexcept(FE_ALL_EXCEPT);
    feraiseexcept(FE_INVALID);   /* some computation with invalid argument */
    show_fe_exceptions();
    printf("x2(DBL_MAX) = %f\n", x2(DBL_MAX));
    show_fe_exceptions();

    return 0;
}
```

Output:

```text
current exceptions raised:  FE_INVALID
In x2():  x = inf
current exceptions raised:  FE_INEXACT FE_OVERFLOW
x2(DBL_MAX) = inf
current exceptions raised:  FE_INVALID FE_OVERFLOW
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.6.4.4 The feupdateenv function (p: 214-215)

- C99 standard (ISO/IEC 9899:1999):

- 7.6.4.4 The feupdateenv function (p: 195-196)

### See also

|  |  |
| --- | --- |
| feholdexcept (C99) | saves the environment, clears all status flags and ignores all future errors (function) |
| fegetenv, fesetenv (C99) | saves or restores the current floating-point environment (function) |
| FE_DFL_ENV (C99) | default floating-point environment (macro constant) |
| C++ documentation for feupdateenv |  |
