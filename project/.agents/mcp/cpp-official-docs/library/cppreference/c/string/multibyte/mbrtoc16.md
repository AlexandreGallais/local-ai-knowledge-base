# mbrtoc16

| Defined in header `<uchar.h>` |  |
| --- | --- |
| `size_t mbrtoc16( char16_t* restrict pc16, const char* restrict s, size_t n, mbstate_t* restrict ps );` | (since C11) |

Converts a single code point from its narrow multibyte character representation to its variable-length 16-bit wide character representation (typically, UTF-16).

If `s` is not a null pointer, inspects at most `n` bytes of the multibyte character string, beginning with the byte pointed to by `s` to determine the number of bytes necessary to complete the next multibyte character (including any shift sequences, and taking into account the current multibyte conversion state `*ps`). If the function determines that the next multibyte character in `s` is complete and valid, converts it to the corresponding 16-bit wide character and stores it in `*pc16` (if `pc16` is not null).

If the multibyte character in `*s` corresponds to a multi-char16_t sequence (e.g. a surrogate pair in UTF-16), then after the first call to this function, `*ps` is updated in such a way that the next call to `mbrtoc16` will write out the additional `char16_t`, without considering `*s`.

If `s` is a null pointer, the values of `n` and `pc16` are ignored and the call is equivalent to `mbrtoc16(NULL, "", 1, ps)`.

If the wide character produced is the null character, the conversion state `*ps` represents the initial shift state.

If the macro `__STDC_UTF_16__` is defined, the 16-bit encoding used by this function is UTF-16; otherwise, it is implementation-defined. The macro is always defined and the encoding is always UTF-16.(since C23) In any case, the multibyte character encoding used by this function is specified by the currently active C locale.

### Parameters

|  |  |  |
| --- | --- | --- |
| pc16 | - | pointer to the location where the resulting 16-bit wide character will be written |
| s | - | pointer to the multibyte character string used as input |
| n | - | limit on the number of bytes in s that can be examined |
| ps | - | pointer to the conversion state object used when interpreting the multibyte string |

### Return value

The first of the following that applies:

- `​0​` if the character converted from `s` (and stored in `*pc16` if non-null) was the null character
- the number of bytes `[1...n]` of the multibyte character successfully converted from `s`
- `(size_t)-3` if the next `char16_t` from a multi-`char16_t` character (e.g. a surrogate pair) has now been written to `*pc16`. No bytes are processed from the input in this case.
- `(size_t)-2` if the next `n` bytes constitute an incomplete, but so far valid, multibyte character. Nothing is written to `*pc16`.
- `(size_t)-1` if encoding error occurs. Nothing is written to `*pc16`, the value `EILSEQ` is stored in `errno` and the value of `*ps` is unspecified.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <uchar.h>

mbstate_t state;

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");
    const char in[] = u8"zß水🍌"; // or "z\u00df\u6c34\U0001F34C"
    const size_t in_sz = sizeof in / sizeof *in;

    printf("Processing %zu UTF-8 code units: [ ", in_sz);
    for (size_t n = 0; n < in_sz; ++n)
        printf("%#x ", (unsigned char)in[n]);
    puts("]");

    char16_t out[in_sz];
    const char *p_in = in, *end = in + in_sz;
    char16_t *p_out = out;
    for (size_t rc; (rc = mbrtoc16(p_out, p_in, end - p_in, &state));)
    {
        if (rc == (size_t)-1)     // invalid input
            break;
        else if(rc == (size_t)-2) // truncated input
            break;
        else if(rc == (size_t)-3) // UTF-16 high surrogate
            p_out += 1;
        else
        {
            p_in += rc;
            p_out += 1;
        };
    }

    const size_t out_sz = p_out - out + 1;
    printf("into %zu UTF-16 code units: [ ", out_sz);
    for (size_t x = 0; x < out_sz; ++x)
        printf("%#x ", out[x]);
    puts("]");
}
```

Output:

```text
Processing 11 UTF-8 code units: [ 0x7a 0xc3 0x9f 0xe6 0xb0 0xb4 0xf0 0x9f 0x8d 0x8c 0 ]
into 6 UTF-16 code units: [ 0x7a 0xdf 0x6c34 0xd83c 0xdf4c 0 ]
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.30.1.3 The mbrtoc16 function (p: 408-409)

- C11 standard (ISO/IEC 9899:2011):

- 7.28.1.1 The mbrtoc16 function (p: 398-399)

### See also

|  |  |
| --- | --- |
| c16rtomb (C11) | converts a UTF-16 character to narrow multibyte encoding (function) |
| C++ documentation for mbrtoc16 |  |
