# abs, labs, llabs, imaxabs

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| `int abs( int n );` |  |
| `long labs( long n );` |  |
| `long long llabs( long long n );` | (since C99) |
| Defined in header `<inttypes.h>` |  |
| `intmax_t imaxabs( intmax_t n );` | (since C99) |

Computes the absolute value of an integer number. The behavior is undefined if the result cannot be represented by the return type.

### Parameters

n - integer value

### Return value

The absolute value of `n` (i.e. `|n|`), if it is representable.

### Notes

In 2's complement systems, the absolute value of the most-negative value is out of range, e.g. for 32-bit 2's complement type `int`, `INT_MIN` is `-2147483648`, but the would-be result `2147483648` is greater than `INT_MAX`, which is `2147483647`.

### Example

```c
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    printf("abs(+3) = %d\n", abs(+3));
    printf("abs(-3) = %d\n", abs(-3));

//  printf("%+d\n", abs(INT_MIN)); // undefined behavior on 2's complement systems
}
```

Output:

```text
abs(+3) = 3
abs(-3) = 3
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.8.2.1 The imaxabs function (p: TBD)

- 7.22.6.1 The abs, labs and llabs functions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.8.2.1 The imaxabs function (p: 159)

- 7.22.6.1 The abs, labs and llabs functions (p: 259)

- C11 standard (ISO/IEC 9899:2011):

- 7.8.2.1 The imaxabs function (p: 218)

- 7.22.6.1 The abs, labs and llabs functions (p: 356)

- C99 standard (ISO/IEC 9899:1999):

- 7.8.2.1 The imaxabs function (p: 199-200)

- 7.20.6.1 The abs, labs and llabs functions (p: 320)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.10.6.1 The abs function

- 4.10.6.3 The labs function

### See also

|  |  |
| --- | --- |
| fabs, fabsf, fabsl (C99), (C99) | computes absolute value of a floating-point value (\(\small{\|x\|}\)\|x\|) (function) |
| cabs, cabsf, cabsl (C99), (C99), (C99) | computes the magnitude of a complex number (function) |
| C++ documentation for abs |  |
