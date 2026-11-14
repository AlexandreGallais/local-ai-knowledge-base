# wcscpy, wcscpy_s

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `wchar_t* wcscpy( wchar_t* dest, const wchar_t* src );` |  | (since C95) (until C99) |
| `wchar_t* wcscpy( wchar_t* restrict dest, const wchar_t* restrict src );` |  | (since C99) |
| `errno_t wcscpy_s( wchar_t* restrict dest, rsize_t destsz, const wchar_t* restrict src );` | (2) | (since C11) |

1) Copies the wide string pointed to by `src` (including the terminating null wide character) to wide character array pointed to by `dest`. The behavior is undefined if the `dest` array is not large enough. The behavior is undefined if the strings overlap.

2) Same as (1), except that it may clobber the rest of the destination array with unspecified values and that the following errors are detected at runtime and call the currently installed constraint handler function:

- `src` or `dest` is a null pointer
- `destsz` is zero or greater than `RSIZE_MAX / sizeof(wchar_t)`
- `destsz` is less or equal `wcsnlen_s(src, destsz)`, in other words, truncation would occur
- overlap would occur between the source and the destination strings

As with all bounds-checked functions, `wcscpy_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<wchar.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the wide character array to copy to |
| src | - | pointer to the null-terminated wide string to copy from |
| destsz | - | maximum number of characters to write, typically the size of the destination buffer |

### Return value

1) returns a copy of `dest`

2) returns zero on success, returns non-zero on error. Also, on error, writes `L'\0'` to `dest[0]` (unless `dest` is a null pointer or `destsz` is zero or greater than `RMAX_SIZE / sizeof(wchar_t)`).

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

int main(void)
{
    wchar_t* src = L"犬 means dog";
//  src[0] = L'狗' ; // this would be undefined behavior
    wchar_t dst[wcslen(src) + 1]; // +1 for the null terminator
    wcscpy(dst, src);
    dst[0] = L'狗'; // OK

    setlocale(LC_ALL, "en_US.utf8");
    printf("src = %ls\ndst = %ls\n", src, dst);
}
```

Output:

```text
src = 犬 means dog
dst = 狗 means dog
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.29.4.1.2 The wcscpy function (p: TBD)

- K.3.9.2.1.1 The wcscpy_s function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.4.1.2 The wcscpy function (p: TBD)

- K.3.9.2.1.1 The wcscpy_s function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.1.2 The wcscpy function (p: 430)

- K.3.9.2.1.1 The wcscpy_s function (p: 639)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.1.2 The wcscpy function (p: 376)

### See also

|  |  |
| --- | --- |
| wcsncpy, wcsncpy_s (C95), (C11) | copies a certain amount of wide characters from one string to another (function) |
| wmemcpy, wmemcpy_s (C95), (C11) | copies a certain amount of wide characters between two non-overlapping arrays (function) |
| strcpy, strcpy_s (C11) | copies one string to another (function) |
| C++ documentation for wcscpy |  |
