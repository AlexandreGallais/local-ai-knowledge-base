# mbstate_t

| Defined in header `<uchar.h>` | (since C11) |
| --- | --- |
| Defined in header `<wchar.h>` |  |
| `struct mbstate_t;` | (since C95) |

The type `mbstate_t` is a trivial non-array type that can represent any of the conversion states that can occur in an implementation-defined set of supported multibyte character encoding rules. Zero-initialized value of `mbstate_t` represents the initial conversion state, although other values of `mbstate_t` may exist that also represent the initial conversion state.

Possible implementation of `mbstate_t` is a struct type holding an array representing the incomplete multibyte character, an integer counter indicating the number of bytes in the array that have been processed, and a representation of the current shift state.

The following functions should not be called from multiple threads without synchronization with the `mbstate_t*` argument of a null pointer due to possible data races: `mbrlen`, `mbrtowc`, `mbsrtowcs`, `mbtowc`, `wcrtomb`, `wcsrtombs`, `wctomb`.

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.1/2 Introduction (p: 402)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.1/2 Introduction (p: 348)

### See also

|  |  |
| --- | --- |
| mbsinit (C95) | checks if the mbstate_t object represents initial shift state (function) |
| C++ documentation for mbstate_t |  |
