# wcsncpy, wcsncpy_s

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `wchar_t* wcsncpy( wchar_t* dest, const wchar_t* src, size_t count );` |  | (since C95) (until C99) |
| `wchar_t *wcsncpy( wchar_t *restrict dest, const wchar_t *restrict src, size_t count );` |  | (since C99) |
| `errno_t wcsncpy_s( wchar_t *restrict dest, rsize_t destsz, const wchar_t *restrict src, rsize_t count);` | (2) | (since C11) |

1) Copies at most `count` characters of the wide string pointed to by `src` (including the terminating null wide character) to wide character array pointed to by `dest`.

If `count` is reached before the entire string `src` was copied, the resulting wide character array is not null-terminated.

If, after copying the terminating null wide character from `src`, `count` is not reached, additional null wide characters are written to `dest` until the total of `count` characters have been written.

If the strings overlap, the behavior is undefined.

2) Same as (1), except that the function does not continue writing zeroes into the destination array to pad up to `count`, it stops after writing the terminating null character (if there was no null in the source, it writes one at `dest[count]` and then stops). Also, the following errors are detected at runtime and call the currently installed constraint handler function:

- `src` or `dest` is a null pointer
- `destsz` or `count` is zero or greater than `RSIZE_MAX/sizeof(wchar_t)`
- `count` is greater or equal `destsz`, but `destsz` is less or equal `wcsnlen_s(src, count)`, in other words, truncation would occur
- overlap would occur between the source and the destination strings

As with all bounds-checked functions, `wcsncpy_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<wchar.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the wide character array to copy to |
| src | - | pointer to the wide string to copy from |
| count | - | maximum number of wide characters to copy |
| destsz | - | the size of the destination buffer |

### Return value

1) returns a copy of `dest`

2) returns zero on success, returns non-zero on error. Also, on error, writes `L'\0'` to `dest[0]` (unless `dest` is a null pointer or `destsz` is zero or greater than `RSIZE_MAX/sizeof(wchar_t)`) and may clobber the rest of the destination array with unspecified values.

### Notes

In typical usage, `count` is the number of elements in the destination array.

Although truncation to fit the destination buffer is a security risk and therefore a runtime constraints violation for `wcsncpy_s`, it is possible to get the truncating behavior by specifying `count` equal to the size of the destination array minus one: it will copy the first `count` wide characters and append the null wide terminator as always: `wcsncpy_s(dst, sizeof dst / sizeof *dst, src, (sizeof dst / sizeof *dst)-1);`

### Example

```c
#include <stdio.h>
#include <wchar.h>
#include <locale.h>

int main(void)
{
    const wchar_t src[] = L"わゐ";
    wchar_t dest[6] = {L'あ', L'い', L'う', L'え', L'お'};

    wcsncpy(dest, src, 4); // this will copy わゐ and repeat L'\0' two times

    puts("The contents of dest are: ");
    setlocale(LC_ALL, "en_US.utf8");

    const long dest_size = sizeof dest / sizeof *dest;
    for(wchar_t* p = dest; p-dest != dest_size; ++p) {
        *p ? printf("%lc ", *p)
           : printf("\\0 ");
    }
}
```

Possible output:

```text
The contents of dest are:
わ ゐ \0 \0 お \0
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.29.4.2.2 The wcsncpy function (p: 314)

- K.3.9.2.1.2 The wcsncpy_s function (p: 464)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.2.2 The wcsncpy function (p: 431)

- K.3.9.2.1.2 The wcsncpy_s function (p: 640-641)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.2.2 The wcsncpy function (p: 377)

### See also

|  |  |
| --- | --- |
| wcscpy, wcscpy_s (C95), (C11) | copies one wide string to another (function) |
| wmemcpy, wmemcpy_s (C95), (C11) | copies a certain amount of wide characters between two non-overlapping arrays (function) |
| strncpy, strncpy_s (C11) | copies a certain amount of characters from one string to another (function) |
| C++ documentation for wcsncpy |  |
