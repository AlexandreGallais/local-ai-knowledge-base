# fgetwc, getwc

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `wint_t fgetwc( FILE *stream );` | (since C95) |
| `wint_t getwc( FILE *stream );` | (since C95) |

Reads the next wide character from the given input stream. `getwc()` may be implemented as a macro and may evaluate `stream` more than once.

### Parameters

stream - to read the wide character from

### Return value

The next wide character from the stream or `WEOF` on failure.

If the failure has been caused by end-of-file condition, additionally sets the *eof* indicator (see `feof()`) on `stream`. If the failure has been caused by some other error, sets the *error* indicator (see `ferror()`) on `stream`.

If an encoding error occurred, additionally sets `errno` to `EILSEQ`.

### Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <wchar.h>
#include <errno.h>
#include <locale.h>

int main(void)
{
    setlocale(LC_ALL, "en_US.utf8");
    FILE *fp = fopen("fgetwc.dat", "w");
    if(!fp) {
        perror("Can't open file for writing");
        return EXIT_FAILURE;
    }
    fputs("кошка\n", fp);
    fclose(fp);

    fp = fopen("fgetwc.dat", "r");
    if(!fp) {
        perror("Can't open file for reading");
        return EXIT_FAILURE;
    }
    wint_t wc;
    errno = 0;
    while ((wc = fgetwc(fp)) != WEOF)
        putwchar(wc);

    if (ferror(fp)) {
        if (errno == EILSEQ)
            puts("Character encoding error while reading.");
        else
            puts("I/O error when reading");
    } else if (feof(fp))
        puts("End of file reached successfully");

    fclose(fp);
}
```

Output:

```text
кошка
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.29.3.1 The fgetwc function (p: 307-308)

- 7.29.3.6 The getwc function (p: 309)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.3.1 The fgetwc function (p: 421-422)

- 7.29.3.6 The getwc function (p: 424)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.3.1 The fgetwc function (p: 367)

- 7.24.3.6 The getwc function (p: 369)

### See also

|  |  |
| --- | --- |
| fgetc, getc | gets a character from a file stream (function) |
| fgetws (C95) | gets a wide string from a file stream (function) |
| fputwc, putwc (C95) | writes a wide character to a file stream (function) |
| ungetwc (C95) | puts a wide character back into a file stream (function) |
| C++ documentation for fgetwc |  |
