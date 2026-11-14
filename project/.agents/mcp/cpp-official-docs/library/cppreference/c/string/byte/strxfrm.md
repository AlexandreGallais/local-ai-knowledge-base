# strxfrm

| Defined in header `<string.h>` |  |
| --- | --- |
| `size_t strxfrm( char *dest, const char *src, size_t count );` | (until C99) |
| `size_t strxfrm( char *restrict dest, const char *restrict src, size_t count );` | (since C99) |

Transforms the null-terminated byte string pointed to by `src` into the implementation-defined form such that comparing two transformed strings with `strcmp` gives the same result as comparing the original strings with `strcoll`, in the current C locale.

The first `count` characters of the transformed string are written to destination, including the terminating null character, and the length of the full transformed string is returned, excluding the terminating null character.

The behavior is undefined if the `dest` array is not large enough. The behavior is undefined if `dest` and `src` overlap.

If `count` is `​0​`, then `dest` is allowed to be a null pointer.

### Notes

The correct length of the buffer that can receive the entire transformed string is `1+strxfrm(NULL, src, 0)`

This function is used when making multiple locale-dependent comparisons using the same string or set of strings, because it is more efficient to use `strxfrm` to transform all the strings just once, and subsequently compare the transformed strings with `strcmp`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the first element of the array where the transformed string will be written |
| src | - | pointer to the first character of a null-terminated byte string to transform |
| count | - | maximum number of characters to be written |

### Return value

The length of the transformed string, not including the terminating null-character.

### Example

```c
#include <stdio.h>
#include <string.h>
#include <locale.h>

int main(void)
{
    setlocale(LC_COLLATE, "cs_CZ.iso88592");

    const char *in1 = "hrnec";
    char out1[1+strxfrm(NULL, in1, 0)];
    strxfrm(out1, in1, sizeof out1);

    const char *in2 = "chrt";
    char out2[1+strxfrm(NULL, in2, 0)];
    strxfrm(out2, in2, sizeof out2);

    printf("In the Czech locale: ");
    if(strcmp(out1, out2) < 0)
         printf("%s before %s\n",in1, in2);
    else
         printf("%s before %s\n",in2, in1);

    printf("In lexicographical comparison: ");
    if(strcmp(in1, in2)<0)
         printf("%s before %s\n",in1, in2);
    else
         printf("%s before %s\n",in2, in1);

}
```

Possible output:

```text
In the Czech locale: hrnec before chrt
In lexicographical comparison: chrt before hrnec
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.24.4.5 The strxfrm function (p: 267)

- C11 standard (ISO/IEC 9899:2011):

- 7.24.4.5 The strxfrm function (p: 366-367)

- C99 standard (ISO/IEC 9899:1999):

- 7.21.4.5 The strxfrm function (p: 329-330)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.11.4.5 The strxfrm function

### See also

|  |  |
| --- | --- |
| strcoll | compares two strings in accordance to the current locale (function) |
| wcscoll (C95) | compares two wide strings in accordance to the current locale (function) |
| strcmp | compares two strings (function) |
| wcsxfrm (C95) | transform a wide string so that wcscmp would produce the same result as wcscoll (function) |
| C++ documentation for strxfrm |  |
