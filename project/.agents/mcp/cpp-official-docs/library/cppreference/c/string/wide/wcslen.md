# wcslen, wcsnlen_s

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
| `size_t wcslen( const wchar_t *str );` | (1) | (since C95) |
| `size_t wcsnlen_s(const wchar_t *str, size_t strsz);` | (2) | (since C11) |

1) Returns the length of a wide string, that is the number of non-null wide characters that precede the terminating null wide character.

2) Same as (1), except that the function returns zero if `str` is a null pointer and returns `strsz` if the null wide character was not found in the first `strsz` wide characters of `src`

As with all bounds-checked functions, `wcslen_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<stdio.h>`..

### Parameters

|  |  |  |
| --- | --- | --- |
| str | - | pointer to the null-terminated wide string to be examined |
| strsz | - | maximum number of wide characters to examine |

### Return value

1) The length of the null-terminated wide string `str`.

2) The length of the null-terminated wide string `str` on success, zero if `str` is a null pointer, `strsz` if the null wide character was not found.

### Notes

`strnlen_s` and `wcsnlen_s` are the only bounds-checked functions that do not invoke the runtime constraints handler. They are pure utility functions used to provide limited support for non-null terminated strings.

### Example

```c
#include <wchar.h>
#include <stdio.h>

int main(void)
{
    wchar_t str[] = L"How many wide characters does this string contain?";

    printf("without null character: %zu\n", wcslen(str));
    printf("with null character: %zu\n", sizeof str / sizeof *str);
}
```

Output:

```text
without null character: 50
with null character: 51
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.6.1 The wcslen function (p: 439)

- K.3.9.2.4.1 The wcsnlen_s function (p: 646-647)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.6.1 The wcslen function (p: 385)

### See also

|  |  |
| --- | --- |
| strlen, strnlen_s (C11) | returns the length of a given string (function) |
| C++ documentation for wcslen |  |
