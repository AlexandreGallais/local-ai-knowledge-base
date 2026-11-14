# size_t

| Defined in header `<stddef.h>` |  |
| --- | --- |
| Defined in header `<stdio.h>` |  |
| Defined in header `<stdlib.h>` |  |
| Defined in header `<string.h>` |  |
| Defined in header `<time.h>` |  |
| Defined in header `<uchar.h>` | (since C11) |
| Defined in header `<wchar.h>` | (since C95) |
| `typedef /*implementation-defined*/ size_t;` |  |

`size_t` is the unsigned integer type of the result of `sizeof`, `offsetof` and `_Alignof`(until C23)`alignof`(since C23), depending on the data model.

The bit width of `size_t` is not less than 16. (since C99)

### Notes

`size_t` can store the maximum size of a theoretically possible object of any type (including array).

`size_t` is commonly used for array indexing and loop counting. Programs that use other types, such as `unsigned int`, for array indexing may fail on, e.g. 64-bit systems when the index exceeds `UINT_MAX` or if it relies on 32-bit modular arithmetic.

### Possible implementation

`typedef typeof(sizeof(0)) size_t; // valid since C23`

### Example

```c
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

int main(void)
{
    const size_t N = 101;
    int numbers[N];
    size_t sum = 0;
    for (size_t ndx = 0; ndx < N; ++ndx)
        sum += numbers[ndx] = ndx;
    size_t size = sizeof numbers;
    printf("sum = %zu\n", sum);
    printf("size = %zu\n", size);
    printf("SIZE_MAX = %zu\n", SIZE_MAX);
}
```

Possible output:

```text
sum = 5050
size = 404
SIZE_MAX = 18446744073709551615
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
| ptrdiff_t | signed integer type returned when subtracting two pointers (typedef) |
| offsetof | byte offset from the beginning of a struct type to specified member (function macro) |
| C++ documentation for size_t |  |
