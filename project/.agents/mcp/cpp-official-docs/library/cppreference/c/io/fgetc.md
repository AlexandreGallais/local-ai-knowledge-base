# fgetc, getc

| Defined in header `<stdio.h>` |  |
| --- | --- |
| `int fgetc( FILE* stream );` | (1) |
| `int getc( FILE* stream );` | (2) |

1) Reads the next character from the given input stream.

2) Same as `fgetc`, except that if `getc` is implemented as a macro, it may evaluate stream more than once, so the corresponding argument should never be an expression with side effects.

### Parameters

stream - to read the character from

### Return value

On success, returns the obtained character as an `unsigned char` converted to an `int`. On failure, returns `EOF`.

If the failure has been caused by end-of-file condition, additionally sets the *eof* indicator (see `feof()`) on `stream`. If the failure has been caused by some other error, sets the *error* indicator (see `ferror()`) on `stream`.

### Example

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    const char* fname = "/tmp/unique_name.txt"; // or tmpnam(NULL);
    int is_ok = EXIT_FAILURE;

    FILE* fp = fopen(fname, "w+");
    if (!fp)
    {
        perror("File opening failed");
        return is_ok;
    }
    fputs("Hello, world!\n", fp);
    rewind(fp);

    int c; // note: int, not char, required to handle EOF
    while ((c = fgetc(fp)) != EOF) // standard C I/O file reading loop
        putchar(c);

    if (ferror(fp))
        puts("I/O error when reading");
    else if (feof(fp))
    {
        puts("End of file is reached successfully");
        is_ok = EXIT_SUCCESS;
    }

    fclose(fp);
    remove(fname);
    return is_ok;
}
```

Possible output:

```text
Hello, world!
End of file is reached successfully
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.7.1 The fgetc function (p: TBD)

- 7.21.7.5 The getc function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.7.1 The fgetc function (p: 240-241)

- 7.21.7.5 The getc function (p: 242)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.7.1 The fgetc function (p: 330)

- 7.21.7.5 The getc function (p: 332)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.7.1 The fgetc function (p: 296)

- 7.19.7.5 The getc function (p: 297-298)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.7.1 The fgetc function

- 4.9.7.5 The getc function

### See also

|  |  |
| --- | --- |
| getchar | reads a character from `stdin` (function) |
| gets, gets_s (removed in C11), (C11) | reads a character string from `stdin` (function) |
| fputc, putc | writes a character to a file stream (function) |
| ungetc | puts a character back into a file stream (function) |
| C++ documentation for fgetc, getc |  |
