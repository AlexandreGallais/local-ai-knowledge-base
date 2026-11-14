# wmemmove, wmemmove_s

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
| `wchar_t* wmemmove( wchar_t* dest, const wchar_t* src, size_t count );` | (1) | (since C95) |
| `errno_t wmemmove_s( wchar_t *dest, rsize_t destsz, const wchar_t *src, rsize_t count);` | (2) | (since C11) |

1) Copies exactly `count` successive wide characters from the wide character array pointed to by `src` to the wide character array pointed to by `dest`. If `count` is zero, the function does nothing. The arrays may overlap: copying takes place as if the wide characters were copied to a temporary wide character array and then copied from the temporary array to `dest`.

2) Same as (1), except that the following errors are detected at runtime and call the currently installed constraint handler function:

- `src` or `dest` is a null pointer
- `destsz` or `count` is greater than `RSIZE_MAX / sizeof(wchar_t)`
- `count` is greater than `destsz` (overflow would occur)

As with all bounds-checked functions, `wmemcpy_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<wchar.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the wide character array to copy to |
| src | - | pointer to the wide character array to copy from |
| destsz | - | max number of wide characters to write (the size of the destination buffer) |
| count | - | number of wide characters to copy |

### Return value

1) Returns a copy of `dest`

2) Returns zero on success, returns non-zero on error. Also, on error, fills the entire `dst` up to and not including `dst+dstsz` with null wide characters, `L'\0'` (unless `dest` is null or `destsz` is greater than `RSIZE_MAX/sizeof(wchar_t)`)

### Notes

This function is not locale-sensitive and pays no attention to the values of the `wchar_t` objects it copies: nulls as well as invalid characters are copied too.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");

    wchar_t str[] = L"αβγδεζηθικλμνξοπρστυφχψω";
    printf("%ls\n", str);
    wmemmove(str + 4, str + 3, 3); // copy from [δεζ] to [εζη]
    printf("%ls\n", str);
}
```

Output:

```text
αβγδεζηθικλμνξοπρστυφχψω
αβγδδεζθικλμνξοπρστυφχψω
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.29.4.2.4 The wmemmove function (p: TBD)

- K.3.9.2.1.4 The wmemmove_s function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.4.2.4 The wmemmove function (p: TBD)

- K.3.9.2.1.4 The wmemmove_s function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.2.4 The wmemmove function (p: 432)

- K.3.9.2.1.4 The wmemmove_s function (p: 642)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.2.4 The wmemmove function (p: 378)

### See also

|  |  |
| --- | --- |
| memmove, memmove_s (C11) | moves one buffer to another (function) |
| wmemcpy, wmemcpy_s (C95), (C11) | copies a certain amount of wide characters between two non-overlapping arrays (function) |
| C++ documentation for wmemmove |  |
