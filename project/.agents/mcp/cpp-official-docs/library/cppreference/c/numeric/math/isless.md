# isless

| Defined in header `<math.h>` |  |
| --- | --- |
| `#define isless(x, y) /* implementation defined */` | (since C99) |

Determines if the floating-point number `x` is less than the floating-point number `y`, without setting floating-point exceptions.

### Parameters

|  |  |  |
| --- | --- | --- |
| x | - | floating-point value |
| y | - | floating-point value |

### Return value

Nonzero integral value if `x < y`, `​0​` otherwise.

### Notes

The built-in `operator<` for floating-point numbers may raise `FE_INVALID` if one or both of the arguments is NaN. This function is a "quiet" version of `operator<`.

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("isless(2.0,1.0)      = %d\n", isless(2.0, 1.0));
    printf("isless(1.0,2.0)      = %d\n", isless(1.0, 2.0));
    printf("isless(INFINITY,1.0) = %d\n", isless(INFINITY, 1.0));
    printf("isless(1.0,NAN)      = %d\n", isless(1.0, NAN));

    return 0;
}
```

Possible output:

```text
isless(2.0,1.0)      = 0
isless(1.0,2.0)      = 1
isless(INFINITY,1.0) = 0
isless(1.0,NAN)      = 0
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.14.3 The isless macro (p: TBD)

- F.10.11 Comparison macros (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.14.3 The isless macro (p: TBD)

- F.10.11 Comparison macros (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.14.3 The isless macro (p: 260)

- F.10.11 Comparison macros (p: 531)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.14.3 The isless macro (p: 241)

### See also

|  |  |
| --- | --- |
| isgreater (C99) | checks if the first floating-point argument is greater than the second (function macro) |
| C++ documentation for isless |  |
