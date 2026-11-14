# wcrtomb, wcrtomb_s

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `size_t wcrtomb( char *s, wchar_t wc, mbstate_t *ps);` |  | (since C95) |
| `size_t wcrtomb( char *restrict s, wchar_t wc, mbstate_t *restrict ps);` |  | (since C99) |
| `errno_t wcrtomb_s(size_t *restrict retval, char *restrict s, rsize_t ssz, wchar_t wc, mbstate_t *restrict ps);` | (2) | (since C11) |

Converts a wide character to its narrow multibyte representation.

1) If `s` is not a null pointer, the function determines the number of bytes necessary to store the multibyte character representation of `wc` (including any shift sequences, and taking into account the current multibyte conversion state `*ps`), and stores the multibyte character representation in the character array whose first element is pointed to by `s`, updating `*ps` as necessary. At most `MB_CUR_MAX` bytes can be written by this function.

If `s` is a null pointer, the call is equivalent to `wcrtomb(buf, L'\0', ps)` for some internal buffer `buf`.

If wc is the null wide character `L'\0'`, a null byte is stored, preceded by any shift sequence necessary to restore the initial shift state and the conversion state parameter `*ps` is updated to represent the initial shift state.

If the environment macro `__STDC_ISO_10646__` is defined, the values of type `wchar_t` are the same as the short identifiers of the characters in the Unicode required set (typically UTF-32 encoding); otherwise, it is implementation-defined. In any case, the multibyte character encoding used by this function is specified by the currently active C locale.

2) Same as (1), except that

if `s` is a null pointer, the call is equivalent to `wcrtomb_s(&retval, buf, sizeof buf, L'\0', ps)` with internal variables `retval` and `buf` (whose size is greater than `MB_CUR_MAX`)

the result is returned in the out-parameter `retval`

the following errors are detected at runtime and call the currently installed constraint handler function:

- `retval` or `ps` is a null pointer.
- `ssz` is zero or greater than `RSIZE_MAX` (unless `s` is null)
- `ssz` is less than the number of bytes that would be written (unless `s` is null)
- `s` is a null pointer but `ssz` is not zero

As with all bounds-checked functions, `wcrtomb_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<wchar.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| s | - | pointer to narrow character array where the multibyte character will be stored |
| wc | - | the wide character to convert |
| ps | - | pointer to the conversion state object used when interpreting the multibyte string |
| ssz | - | max number of bytes to write (the size of the buffer `s`) |
| retval | - | pointer to an out-parameter where the result (number of bytes in the multibyte string including any shift sequences) will be stored |

### Return value

1) On success, returns the number of bytes (including any shift sequences) written to the character array whose first element is pointed to by `s`.

On failure (if `wc` is not a valid wide character), returns `(size_t)-1`, stores `EILSEQ` in `errno`, and leaves `*ps` in unspecified state.

2) Returns zero on success and non-zero on failure, in which case, `s[0]` is set to `'\0'` (unless `s` is null or `ssz` is zero or greater than `RSIZE_MAX`) and `*retval` is set to `(size_t)-1` (unless `retval` is null)

### Example

```c
#include <stdio.h>
#include <locale.h>
#include <string.h>
#include <wchar.h>
#include <stdlib.h>

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");
    mbstate_t state;
    memset(&state, 0, sizeof state);
    wchar_t in[] = L"zß水🍌"; // or "z\u00df\u6c34\U0001F34C"
    size_t in_sz = sizeof in / sizeof *in;

    printf("Processing %zu wchar_t units: [ ", in_sz);
    for(size_t n = 0; n < in_sz; ++n) printf("%#x ", (unsigned int)in[n]);
    puts("]");

    char out[MB_CUR_MAX * in_sz];
    char *p = out;
    for(size_t n = 0; n < in_sz; ++n) {
        int rc = wcrtomb(p, in[n], &state);
        if(rc == -1) break;
        p += rc;
    }

    size_t out_sz = p - out;
    printf("into %zu UTF-8 code units: [ ", out_sz);
    for(size_t x = 0; x < out_sz; ++x) printf("%#x ", +(unsigned char)out[x]);
    puts("]");
}
```

Output:

```text
Processing 5 wchar_t units: [ 0x7a 0xdf 0x6c34 0x1f34c 0 ]
into 11 UTF-8 code units: [ 0x7a 0xc3 0x9f 0xe6 0xb0 0xb4 0xf0 0x9f 0x8d 0x8c 0 ]
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.6.3.3 The wcrtomb function (p: 444)

- K.3.9.3.1.1 The wcrtomb_s function (p: 647-648)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.6.3.3 The wcrtomb function (p: 390)

### See also

|  |  |
| --- | --- |
| wctomb, wctomb_s (C11) | converts a wide character to its multibyte representation (function) |
| mbrtowc (C95) | converts the next multibyte character to wide character, given state (function) |
| C++ documentation for wcrtomb |  |
