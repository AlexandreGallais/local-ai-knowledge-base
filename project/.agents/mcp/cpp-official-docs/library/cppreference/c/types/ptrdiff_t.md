# ptrdiff_t

Defined in header `<stddef.h>`

`typedef /*implementation-defined*/ ptrdiff_t;`

`ptrdiff_t` is the signed integer type of the result of subtracting two pointers.

|  |  |
| --- | --- |
| The bit width of `ptrdiff_t` is not less than 17. | (since C99) (until C23) |
| The bit width of `ptrdiff_t` is not less than 16. | (since C23) |

### Notes

`ptrdiff_t` is used for pointer arithmetic and array indexing, if negative values are possible. Programs that use other types, such as `int`, may fail on, e.g. 64-bit systems when the index exceeds `INT_MAX` or if it relies on 32-bit modular arithmetic.

Only pointers to elements of the same array (including the pointer one past the end of the array) may be subtracted from each other.

If an array is so large (greater than `PTRDIFF_MAX` elements, but equal to or less than `SIZE_MAX` bytes), that the difference between two pointers may not be representable as `ptrdiff_t`, the result of subtracting two such pointers is undefined.

For char arrays shorter than `PTRDIFF_MAX`, `ptrdiff_t` acts as the signed counterpart of `size_t`: it can store the size of the array of any type and is, on most platforms, synonymous with `intptr_t`).

### Possible implementation

`typedef typeof((int*)nullptr - (int*)nullptr) ptrdiff_t; // valid since C23`

### Example

```c
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

int main(void)
{
    const size_t N = 100;
    int numbers[N];

    printf("PTRDIFF_MAX = %ld\n", PTRDIFF_MAX);
    int *p1 = &numbers[18], *p2 = &numbers[23];
    ptrdiff_t diff = p2 - p1;
    printf("p2-p1 = %td\n", diff);
}
```

Possible output:

```text
PTRDIFF_MAX = 9223372036854775807
p2-p1 = 5
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.19 Common definitions <stddef.h> (p: TBD)

- 7.20.3 Limits of other integer types (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.19 Common definitions <stddef.h> (p: 211)

- 7.20.3 Limits of other integer types (p: 215)

- C11 standard (ISO/IEC 9899:2011):

- 7.19 Common definitions <stddef.h> (p: 288)

- 7.20.3 Limits of other integer types (p: 293)

- C99 standard (ISO/IEC 9899:1999):

- 7.17 Common definitions <stddef.h> (p: 253)

- 7.18.3 Limits of other integer types (p: 258)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.1.6 Common definitions <stddef.h>

### See also

|  |  |
| --- | --- |
| size_t | unsigned integer type returned by the `sizeof` operator (typedef) |
| offsetof | byte offset from the beginning of a struct type to specified member (function macro) |
| C++ documentation for ptrdiff_t |  |
