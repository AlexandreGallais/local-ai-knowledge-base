# char8_t

| Defined in header `<uchar.h>` |  |
| --- | --- |
| `typedef unsigned char char8_t;` | (since C23) |

`char8_t` is an unsigned integer type used for UTF-8 and is the same type as `unsigned char`.

### Example

```c
#include <stdio.h>
#include <uchar.h>

int main(void)
{
    char8_t str[] = u8"zß水🍌"; // or "z\u00df\u6c34\U0001f34c"
    size_t str_sz = sizeof str; // sizeof *str == 1 by definition
    printf("%zu UTF-8 code units: [ ", str_sz);
    for (size_t n = 0; n < str_sz; ++n)
        printf("%02X ", str[n]);
    printf("]\n");
}
```

Possible output:

```text
11 UTF-8 code units: [ 7A C3 9F E6 B0 B4 F0 9F 8D 8C 00 ]
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.30 Unicode utilities <uchar.h> (p: 410)

### See also

C++ documentation for Fundamental types
