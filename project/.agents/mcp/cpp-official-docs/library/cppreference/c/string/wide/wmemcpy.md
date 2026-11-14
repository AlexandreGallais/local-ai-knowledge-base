# wmemcpy, wmemcpy_s

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `wchar_t* wmemcpy( wchar_t* dest, const wchar_t* src, size_t count );` |  | (since C95) (until C99) |
| `wchar_t *wmemcpy(wchar_t *restrict dest, const wchar_t *restrict src, size_t count );` |  | (since C99) |
| `errno_t wmemcpy_s( wchar_t *restrict dest, rsize_t destsz, const wchar_t *restrict src, rsize_t count );` | (2) | (since C11) |

1) Copies exactly `count` successive wide characters from the wide character array pointed to by `src` to the wide character array pointed to by `dest`. If the objects overlap, the behavior is undefined. If `count` is zero, the function does nothing.

2) Same as (1), except that the following errors are detected at runtime and call the currently installed constraint handler function:

- `src` or `dest` is a null pointer
- `destsz` or `count` is greater than `RSIZE_MAX/sizeof(wchar_t)`
- `count` is greater than `destsz` (overflow would occur)
- overlap would occur between the source and the destination arrays

As with all bounds-checked functions, `wmemcpy_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<wchar.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the wide character array to copy to |
| src | - | pointer to the wide character array to copy from |
| count | - | number of wide characters to copy |
| destsz | - | max number of wide characters to write (the size of the destination buffer) |

### Return value

1) returns a copy of `dest`

2) returns zero on success, returns non-zero on error. Also, on error, fills the entire `dst` up to and not including `dst+dstsz` with null wide characters, `L'\0'` (unless `dest` is null or `destsz` is greater than `RSIZE_MAX/sizeof(wchar_t)`)

### Notes

This function's analog for byte strings is `strncpy`, not `strcpy`.

This function is not locale-sensitive and pays no attention to the values of the `wchar_t` objects it copies: nulls as well as invalid characters are copied too.

### Example

```c
#include <stdio.h>
#include <wchar.h>
#include <locale.h>

int main(void)
{
    wchar_t from1[] = L"नमस्ते";
    size_t sz1 = sizeof from1 / sizeof *from1;
    wchar_t from2[] = L"Բարև";
    size_t sz2 = sizeof from2 / sizeof *from2;
    wchar_t to[sz1 + sz2];
    wmemcpy(to, from1, sz1); // copy from1, along with its null terminator
    wmemcpy(to + sz1, from2, sz2); // append from2, along with its null terminator

    setlocale(LC_ALL, "en_US.utf8");
    printf("Wide array contains: ");
    for(size_t n = 0; n < sizeof to / sizeof *to; ++n)
        if(to[n])
            printf("%lc", to[n]);
        else
            printf("\\0");
    printf("\n");
}
```

Possible output:

```text
Wide array contains: नमस्ते\0Բարև\0
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.2.3 The wmemcpy function (p: 431)

- K.3.9.2.1.3 The wmemcpy_s function (p: 641)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.2.3 The wmemcpy function (p: 377)

### See also

|  |  |
| --- | --- |
| wmemmove, wmemmove_s (C95), (C11) | copies a certain amount of wide characters between two, possibly overlapping, arrays (function) |
| strncpy, strncpy_s (C11) | copies a certain amount of characters from one string to another (function) |
| C++ documentation for wmemcpy |  |
