# wcsrtombs, wcsrtombs_s

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `size_t wcsrtombs( char *dst, const wchar_t **src, size_t len, mbstate_t* ps );` |  | (since C95) (until C99) |
| `size_t wcsrtombs( char *restrict dst, const wchar_t **restrict src, size_t len, mbstate_t *restrict ps );` |  | (since C99) |
| `errno_t wcsrtombs_s( size_t *restrict retval, char *restrict dst, rsize_t dstsz, const wchar_t **restrict src, rsize_t len, mbstate_t *restrict ps );` | (2) | (since C11) |

1) Converts a sequence of wide characters from the array whose first element is pointed to by `*src` to its narrow multibyte representation that begins in the conversion state described by `*ps`. If `dst` is not null, converted characters are stored in the successive elements of the char array pointed to by `dst`. No more than `len` bytes are written to the destination array. Each character is converted as if by a call to `wcrtomb`. The conversion stops if:

- The null character `L'\0'` was converted and stored. The bytes stored in this case are the unshift sequence (if necessary) followed by `'\0'`, `*src` is set to null pointer value and `*ps` represents the initial shift state.
- A `wchar_t` was found that does not correspond to a valid character in the current C locale. `*src` is set to point at the first unconverted wide character.
- the next multibyte character to be stored would exceed `len`. `*src` is set to point at the first unconverted wide character. This condition is not checked if `dst` is a null pointer.

2) Same as (1), except that

- the function returns its result as an out-parameter `retval`
- if the conversion stops without writing a null character, the function will store `'\0'` in the next byte in `dst`, which may be `dst[len]` or `dst[dstsz]`, whichever comes first (meaning up to len+1/dstsz+1 total bytes may be written). In this case, there may be no unshift sequence written before the terminating null.
- the function clobbers the destination array from the terminating null and until `dstsz`
- If `src` and `dst` overlap, the behavior is unspecified.
- the following errors are detected at runtime and call the currently installed constraint handler function:

- `retval`, `ps`, `src`, or `*src` is a null pointer
- `dstsz` or `len` is greater than `RSIZE_MAX` (unless `dst` is null)
- `dstsz` is not zero (unless `dst` is null)
- `len` is greater than `dstsz` and the conversion does not encounter null or encoding error in the `src` array by the time `dstsz` is reached (unless `dst` is null)

As with all bounds-checked functions, `wcsrtombs_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<wchar.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dst | - | pointer to narrow character array where the multibyte characters will be stored |
| src | - | pointer to pointer to the first element of a null-terminated wide string |
| len | - | number of bytes available in the array pointed to by dst |
| ps | - | pointer to the conversion state object |
| dstsz | - | max number of bytes that will be written (size of the `dst` array) |
| retval | - | pointer to a `size_t` object where the result will be stored |

### Return value

1) On success, returns the number of bytes (including any shift sequences, but excluding the terminating `'\0'`) written to the character array whose first element is pointed to by `dst`. If `dst` is a null pointer, returns the number of bytes that would have been written. On conversion error (if invalid wide character was encountered), returns `(size_t)-1`, stores `EILSEQ` in `errno`, and leaves `*ps` in unspecified state.

2) Returns zero on success (in which case the number of bytes excluding terminating zero that were, or would be written to `dst`, is stored in `*retval`), non-zero on error. In case of a runtime constraint violation, stores `(size_t)-1` in `*retval` (unless `retval` is null) and sets `dst[0]` to `'\0'` (unless `dst` is null or `dstmax` is zero or greater than `RSIZE_MAX`)

### Example

```c
#include <stdio.h>
#include <locale.h>
#include <string.h>
#include <wchar.h>

void print_wide(const wchar_t* wstr)
{
    mbstate_t state;
    memset(&state, 0, sizeof state);
    size_t len = 1 + wcsrtombs(NULL, &wstr, 0, &state);
    char mbstr[len];
    wcsrtombs(mbstr, &wstr, len, &state);
    printf("Multibyte string: %s\n", mbstr);
    printf("Length, including '\\0': %zu\n", len);
}

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");
    print_wide(L"z\u00df\u6c34\U0001f34c"); // or L"zß水🍌"
}
```

Output:

```text
Multibyte string: zß水🍌
Length, including '\0': 11
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.29.6.4.2 The wcsrtombs function (p: 324-325)

- K.3.9.3.2.2 The wcsrtombs_s function (p: 471-472)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.6.4.2 The wcsrtombs function (p: 446)

- K.3.9.3.2.2 The wcsrtombs_s function (p: 649-651)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.6.4.2 The wcsrtombs function (p: 392)

### See also

|  |  |
| --- | --- |
| wcstombs, wcstombs_s (C11) | converts a wide string to narrow multibyte character string (function) |
| wcrtomb, wcrtomb_s (C95), (C11) | converts a wide character to its multibyte representation, given state (function) |
| mbsrtowcs, mbsrtowcs_s (C95), (C11) | converts a narrow multibyte character string to wide string, given state (function) |
| C++ documentation for wcsrtombs |  |
