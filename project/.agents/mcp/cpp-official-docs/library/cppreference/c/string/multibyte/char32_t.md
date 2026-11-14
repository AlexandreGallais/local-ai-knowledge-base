# char32_t

| Defined in header `<uchar.h>` |  |
| --- | --- |
| `typedef uint_least32_t char32_t;` | (since C11) |

`char32_t` is an unsigned integer type used for 32-bit wide characters and is the same type as `uint_least32_t`.

### Notes

On any given platform, by the definition of `uint_least32_t`, the width of type `char32_t` can be greater than 32 bits, but the actual values stored in an object of type `char32_t` will always have a width of 32 bits.

### Example

```c
#include <stdio.h>
#include <uchar.h>

int main(void)
{
    const char32_t wc[] = U"zß水🍌"; // or "z\u00df\u6c34\U0001f34c"
    const size_t wc_sz = sizeof wc / sizeof *wc;
    printf("%zu UTF-32 code units: [ ", wc_sz);
    for (size_t n = 0; n < wc_sz; ++n)
        printf("%#x ", wc[n]);
    printf("]\n");
}
```

Possible output:

```text
5 UTF-32 code units: [ 0x7a 0xdf 0x6c34 0x1f34c 0 ]
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.28 Unicode utilities <uchar.h> (p: 292)

- 7.20.1.2 Minimum-width integer types (p: 212-213)

- C11 standard (ISO/IEC 9899:2011):

- 7.28 Unicode utilities <uchar.h> (p: 398)

- 7.20.1.2 Minimum-width integer types (p: 290)

- C99 standard (ISO/IEC 9899:1999):

- 7.18.1.2 Minimum-width integer types (p: 256)

### See also

C++ documentation for Fundamental types
