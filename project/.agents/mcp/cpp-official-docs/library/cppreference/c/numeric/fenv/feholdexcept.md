# feholdexcept

| Defined in header `<fenv.h>` |  |
| --- | --- |
| `int feholdexcept( fenv_t* envp );` | (since C99) |

First, saves the current floating-point environment to the object pointed to by `envp` (similar to `fegetenv`), then clears all floating-point status flags, and then installs the non-stop mode: future floating-point exceptions will not interrupt execution (will not trap), until the floating-point environment is restored by `feupdateenv` or `fesetenv`.

This function may be used in the beginning of a subroutine that must hide the floating-point exceptions it may raise from the caller. If only some exceptions must be suppressed, while others must be reported, the non-stop mode is usually ended with a call to `feupdateenv` after clearing the unwanted exceptions.

### Parameters

envp - pointer to the object of type `fenv_t` where the floating-point environment will be stored

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

- 7.6.4.2 The feholdexcept function (p: 213-214)

- C99 standard (ISO/IEC 9899:1999):

- 7.6.4.2 The feholdexcept function (p: 194-195)

### See also

|  |  |
| --- | --- |
| feupdateenv (C99) | restores the floating-point environment and raises the previously raise exceptions (function) |
| fegetenv, fesetenv (C99) | saves or restores the current floating-point environment (function) |
| FE_DFL_ENV (C99) | default floating-point environment (macro constant) |
| C++ documentation for feholdexcept |  |
