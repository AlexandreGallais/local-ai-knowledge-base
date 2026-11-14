# char16_t

| Defined in header `<uchar.h>` |  |
| --- | --- |
| `typedef uint_least16_t char16_t;` | (since C11) |

`char16_t` is an unsigned integer type used for 16-bit wide characters and is the same type as `uint_least16_t`.

### Notes

On any given platform, by the definition of `uint_least16_t`, the width of type `char16_t` can be greater than 16 bits, but the actual values stored in an object of type `char16_t` will always have a width of 16 bits.

### Example

```c
#include <stdio.h>
#include <uchar.h>

int main(void)
{
    const char16_t wcs[] = u"zß水🍌"; // or "z\u00df\u6c34\U0001f34c"
    const size_t wcs_sz = sizeof wcs / sizeof *wcs;
    printf("%zu UTF-16 code units: [ ", wcs_sz);
    for (size_t n = 0; n < wcs_sz; ++n)
        printf("%#x ", wcs[n]);
    printf("]\n");
}
```

Possible output:

```text
6 UTF-16 code units: [ 0x7a 0xdf 0x6c34 0xd83c 0xdf4c 0 ]
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
