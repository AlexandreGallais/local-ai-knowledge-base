# wcsxfrm

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `size_t wcsxfrm( wchar_t* dest, const wchar_t* src, size_t count );` | (until C99) (since C95) |
| `size_t wcsxfrm( wchar_t* restrict dest, const wchar_t* restrict src, size_t count );` | (since C99) |

Transforms the null-terminated wide string pointed to by `src` into the implementation-defined form such that comparing two transformed strings with `wcscmp` gives the same result as comparing the original strings with `wcscoll`, in the current C locale.

The first `count` characters of the transformed string are written to destination, including the terminating null character, and the length of the full transformed string is returned, excluding the terminating null character.

If `count` is `​0​`, then `dest` is allowed to be a null pointer.

### Notes

The correct length of the buffer that can receive the entire transformed string is `1+wcsxfrm(NULL, src, 0)`

This function is used when making multiple locale-dependent comparisons using the same wide string or set of wide strings, because it is more efficient to use `wcsxfrm` to transform all the strings just once, and subsequently compare the transformed wide strings with `wcscmp`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the first element of a wide null-terminated string to write the transformed string to |
| src | - | pointer to the null-terminated wide character string to transform |
| count | - | maximum number of characters to output |

### Return value

The length of the transformed wide string, not including the terminating null-character.

### Example

```c
#include <stdio.h>
#include <wchar.h>
#include <locale.h>

int main(void)
{
    setlocale(LC_ALL, "sv_SE.utf8");

    const wchar_t *in1 = L"\u00e5r";
    wchar_t out1[1+wcsxfrm(NULL, in1, 0)];
    wcsxfrm(out1, in1, sizeof out1/sizeof *out1);

    const wchar_t *in2 = L"\u00e4ngel";
    wchar_t out2[1+wcsxfrm(NULL, in2, 0)];
    wcsxfrm(out2, in2, sizeof out2/sizeof *out2);

    printf("In the Swedish locale: ");
    if(wcscmp(out1, out2) < 0)
         printf("%ls before %ls\n", in1, in2);
    else
         printf("%ls before %ls\n", in2, in1);

    printf("In lexicographical comparison: ");
    if(wcscmp(in1, in2) < 0)
         printf("%ls before %ls\n", in1, in2);
    else
         printf("%ls before %ls\n", in2, in1);
}
```

Output:

```text
In the Swedish locale: år before ängel
In lexicographical comparison: ängel before år
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.4.4 The wcsxfrm function (p: 434-435)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.4.4 The wcsxfrm function (p: 380-381)

### See also

|  |  |
| --- | --- |
| strcoll | compares two strings in accordance to the current locale (function) |
| wcscoll (C95) | compares two wide strings in accordance to the current locale (function) |
| wcscmp (C95) | compares two wide strings (function) |
| strxfrm | transform a string so that strcmp would produce the same result as strcoll (function) |
| C++ documentation for wcsxfrm |  |
