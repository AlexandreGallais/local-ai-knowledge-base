# btowc

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `wint_t btowc( int c );` | (since C95) |

Widens a single-byte character `c` (reinterpreted as `unsigned char`) to its wide character equivalent.

Most multibyte character encodings use single-byte codes to represent the characters from the ASCII character set. This function may be used to convert such characters to `wchar_t`.

### Parameters

c - single-byte character to widen

### Return value

`WEOF` if `c` is `EOF`

wide character representation of `c` if `(unsigned char)c` is a valid single-byte character in the initial shift state, `WEOF` otherwise.

### Example

```c
#include <stdio.h>
#include <wchar.h>
#include <locale.h>
#include <assert.h>

void try_widen(unsigned char c)
{
    wint_t w = btowc(c);
    if(w != WEOF)
        printf("The single-byte character %#x widens to %#x\n", c, w);
    else
        printf("The single-byte character %#x failed to widen\n", c);
}

int main(void)
{
    char *loc = setlocale(LC_ALL, "lt_LT.iso88594");
    assert(loc);
    printf("In Lithuanian ISO-8859-4 locale:\n");
    try_widen('A');
    try_widen('\xdf'); // German letter ß (U+00df) in ISO-8859-4
    try_widen('\xf9'); // Lithuanian letter ų (U+0173) in ISO-8859-4

    setlocale(LC_ALL, "lt_LT.utf8");
    printf("In Lithuanian UTF-8 locale:\n");
    try_widen('A');
    try_widen('\xdf');
    try_widen('\xf9');
}
```

Possible output:

```text
In Lithuanian ISO-8859-4 locale:
The single-byte character 0x41 widens to 0x41
The single-byte character 0xdf widens to 0xdf
The single-byte character 0xf9 widens to 0x173
In Lithuanian UTF-8 locale:
The single-byte character 0x41 widens to 0x41
The single-byte character 0xdf failed to widen
The single-byte character 0xf9 failed to widen
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.6.1.1 The btowc function (p: 441)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.6.1.1 The btowc function (p: 387)

### See also

|  |  |
| --- | --- |
| wctob (C95) | narrows a wide character to a single-byte narrow character, if possible (function) |
| C++ documentation for btowc |  |
