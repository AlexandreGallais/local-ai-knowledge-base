# feraiseexcept

| Defined in header `<fenv.h>` |  |
| --- | --- |
| `int feraiseexcept( int excepts );` | (since C99) |

Attempts to raise all floating-point exceptions listed in `excepts` (a bitwise OR of the floating-point exception macros). If one of the exceptions is `FE_OVERFLOW` or `FE_UNDERFLOW`, this function may additionally raise `FE_INEXACT`. The order in which the exceptions are raised is unspecified, except that `FE_OVERFLOW` and `FE_UNDERFLOW` are always raised before `FE_INEXACT`.

### Parameters

excepts - bitmask listing the exception flags to raise

### Return value

`​0​` if all listed exceptions were raised, non-zero value otherwise.

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
    feclearexcept(FE_ALL_EXCEPT);
    printf("\n");
}

double some_computation(void)
{
    /* Computation reaches a state that causes overflow. */
    int r = feraiseexcept(FE_OVERFLOW | FE_INEXACT);
    printf("feraiseexcept() %s\n", (r?"fails":"succeeds"));
    return 0.0;
}

int main(void)
{
    some_computation();
    show_fe_exceptions();

    return 0;
}
```

Output:

```text
feraiseexcept() succeeds
current exceptions raised:  FE_INEXACT FE_OVERFLOW
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.6.2.3 The feraiseexcept function (p: 210)

- C99 standard (ISO/IEC 9899:1999):

- 7.6.2.3 The feraiseexcept function (p: 191)

### See also

|  |  |
| --- | --- |
| feclearexcept (C99) | clears the specified floating-point status flags (function) |
| fetestexcept (C99) | determines which of the specified floating-point status flags are set (function) |
| C++ documentation for feraiseexcept |  |
