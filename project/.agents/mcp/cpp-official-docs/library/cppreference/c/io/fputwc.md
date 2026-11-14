# fputwc, putwc

| Defined in header `<wchar.h>` |  |  |
| --- | --- | --- |
| `wint_t fputwc( wchar_t ch, FILE* stream );` | (1) | (since C95) |
| `wint_t putwc( wchar_t ch, FILE* stream );` | (2) | (since C95) |

Writes a wide character `ch` to the given output stream `stream`.

2) May be implemented as a macro and may evaluate `stream` more than once.

### Parameters

|  |  |  |
| --- | --- | --- |
| ch | - | wide character to be written |
| stream | - | the output stream |

### Return value

Returns a copy of `ch` on success.

On failure, returns `WEOF` and sets the *error* indicator (see `ferror()`) on `stream`.

If an encoding error occurred, additionally sets `errno` to `EILSEQ`.

### Example

```c
#include <errno.h>
#include <locale.h>
#include <stdio.h>
#include <stdlib.h>
#include <wchar.h>

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");

    errno = 0;
    if (fputwc(L'🍌', stdout) == WEOF)
    {
        if (errno == EILSEQ)
            puts("Encoding error in fputwc.");
        else
            puts("I/O error in fputwc.");
        return EXIT_FAILURE;
    }
}
```

Possible output:

```text
🍌
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.31.3.3 The fputwc function (p: 430)

- 7.31.3.8 The putwc function (p: 431-432)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.3.3 The fputwc function (p: 308)

- 7.29.3.8 The putwc function (p: 310)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.3.3 The fputwc function (p: 422-423)

- 7.29.3.8 The putwc function (p: 424)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.3.3 The fputwc function (p: 368)

- 7.24.3.8 The putwc function (p: 370)

### See also

|  |  |
| --- | --- |
| fputc, putc | writes a character to a file stream (function) |
| fputws (C95) | writes a wide string to a file stream (function) |
| fgetwc, getwc (C95) | gets a wide character from a file stream (function) |
| C++ documentation for fputwc |  |
