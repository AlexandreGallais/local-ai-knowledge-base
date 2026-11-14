# mbrtowc

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `size_t mbrtowc( wchar_t* pwc, const char* s, size_t n, mbstate_t* ps );` | (since C95) |
| `size_t mbrtowc( wchar_t *restrict pwc, const char *restrict s, size_t n, mbstate_t *restrict ps );` | (since C99) |

Converts a narrow multibyte character to its wide character representation.

If `s` is not a null pointer, inspects at most `n` bytes of the multibyte character string, beginning with the byte pointed to by `s` to determine the number of bytes necessary to complete the next multibyte character (including any shift sequences, and taking into account the current multibyte conversion state `*ps`). If the function determines that the next multibyte character in `s` is complete and valid, converts it to the corresponding wide character and stores it in `*pwc` (if `pwc` is not null).

If `s` is a null pointer, the values of `n` and `pwc` are ignored and call is equivalent to `mbrtowc(NULL, "", 1, ps)`.

If the wide character produced is the null character, the conversion state stored in `*ps` is the initial shift state.

If the environment macro `__STDC_ISO_10646__` is defined, the values of type `wchar_t` are the same as the short identifiers of the characters in the Unicode required set (typically UTF-32 encoding); otherwise, it is implementation-defined. In any case, the multibyte character encoding used by this function is specified by the currently active C locale.

### Parameters

|  |  |  |
| --- | --- | --- |
| pwc | - | pointer to the location where the resulting wide character will be written |
| s | - | pointer to the multibyte character string used as input |
| n | - | limit on the number of bytes in s that can be examined |
| ps | - | pointer to the conversion state used when interpreting the multibyte character string |

### Return value

The first of the following that applies:

- `​0​` if the character converted from `s` (and stored in `pwc` if non-null) was the null character
- the number of bytes `[1...n]` of the multibyte character successfully converted from `s`
- `(size_t)-2` if the next `n` bytes constitute an incomplete, but so far valid, multibyte character. Nothing is written to `*pwc`.
- `(size_t)-1` if encoding error occurs. Nothing is written to `*pwc`, the value `EILSEQ` is stored in `errno` and the value of `*ps` is left unspecified.

### Example

```c
#include <stdio.h>
#include <locale.h>
#include <string.h>
#include <wchar.h>

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");
    mbstate_t state;
    memset(&state, 0, sizeof state);
    char in[] = u8"z\u00df\u6c34\U0001F34C"; // or u8"zß水🍌"
    size_t in_sz = sizeof in / sizeof *in;

    printf("Processing %zu UTF-8 code units: [ ", in_sz);
    for(size_t n = 0; n < in_sz; ++n) printf("%#x ", (unsigned char)in[n]);
    puts("]");

    wchar_t out[in_sz];
    char *p_in = in, *end = in + in_sz;
    wchar_t *p_out = out;
    int rc;
    while((rc = mbrtowc(p_out, p_in, end - p_in, &state)) > 0)
    {
        p_in += rc;
        p_out += 1;
    }

    size_t out_sz = p_out - out + 1;
    printf("into %zu wchar_t units: [ ", out_sz);
    for(size_t x = 0; x < out_sz; ++x) printf("%#x ", out[x]);
    puts("]");
}
```

Output:

```text
Processing 11 UTF-8 code units: [ 0x7a 0xc3 0x9f 0xe6 0xb0 0xb4 0xf0 0x9f 0x8d 0x8c 0 ]
into 5 wchar_t units: [ 0x7a 0xdf 0x6c34 0x1f34c 0 ]
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.6.3.2 The mbrtowc function (p: 443)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.6.3.2 The mbrtowc function (p: 389)

### See also

|  |  |
| --- | --- |
| mbtowc | converts the next multibyte character to wide character (function) |
| wcrtomb, wcrtomb_s (C95), (C11) | converts a wide character to its multibyte representation, given state (function) |
| C++ documentation for mbrtowc |  |
