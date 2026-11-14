# isunordered

| Defined in header `<math.h>` |  |
| --- | --- |
| `#define isunordered(x, y) /* implementation defined */` | (since C99) |

Determines if the floating point numbers `x` and `y` are unordered, that is, one or both are NaN and thus cannot be meaningfully compared with each other.

### Parameters

|  |  |  |
| --- | --- | --- |
| x | - | floating point value |
| y | - | floating point value |

### Return value

Nonzero integral value if either `x` or `y` is NaN, `​0​` otherwise.

### Example

```c
#include <math.h>
#include <stdio.h>

int main(void)
{
    printf("isunordered(NAN,1.0) = %d\n", isunordered(NAN, 1.0));
    printf("isunordered(1.0,NAN) = %d\n", isunordered(1.0, NAN));
    printf("isunordered(NAN,NAN) = %d\n", isunordered(NAN, NAN));
    printf("isunordered(1.0,0.0) = %d\n", isunordered(1.0, 0.0));

    return 0;
}
```

Possible output:

```text
isunordered(NAN,1.0) = 1
isunordered(1.0,NAN) = 1
isunordered(NAN,NAN) = 1
isunordered(1.0,0.0) = 0
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.12.14.6 The isunordered macro (p: TBD)

- F.10.11 Comparison macros (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.12.14.6 The isunordered macro (p: TBD)

- F.10.11 Comparison macros (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.12.14.6 The isunordered macro (p: 261)

- F.10.11 Comparison macros (p: 531)

- C99 standard (ISO/IEC 9899:1999):

- 7.12.14.6 The isunordered macro (p: 242)

### See also

|  |  |
| --- | --- |
| fpclassify (C99) | classifies the given floating-point value (function macro) |
| isnan (C99) | checks if the given number is NaN (function macro) |
| C++ documentation for isunordered |  |
