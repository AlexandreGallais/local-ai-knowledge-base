# fputc, putc

Defined in header `<stdio.h>`

`int fputc( int ch, FILE* stream );`

`int putc( int ch, FILE* stream );`

Writes a character `ch` to the given output stream `stream`. `putc()` may be implemented as a macro and evaluate `stream` more than once, so the corresponding argument should never be an expression with side effects.

Internally, the character is converted to `unsigned char` just before being written.

### Parameters

|  |  |  |
| --- | --- | --- |
| ch | - | character to be written |
| stream | - | output stream |

### Return value

On success, returns the written character.

On failure, returns `EOF` and sets the *error* indicator (see `ferror()`) on `stream`.

### Example

Shows `putc` with error checking

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int ret_code = 0;
    for (char c = 'a'; (ret_code != EOF) && (c != 'z'); c++)
        ret_code = putc(c, stdout);

    // Test whether EOF was reached.
    if (ret_code == EOF && ferror(stdout))
    {
        perror("putc()");
        fprintf(stderr, "putc() failed in file %s at line # %d\n",
                __FILE__, __LINE__ - 7);
        exit(EXIT_FAILURE);
    }
    putc('\n', stdout);

    return EXIT_SUCCESS;
}
```

Output:

```text
abcdefghijklmnopqrstuvwxy
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.7.3 The fputc function (p: TBD)

- 7.21.7.7 The putc function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.7.3 The fputc function (p: TBD)

- 7.21.7.7 The putc function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.7.3 The fputc function (p: 331)

- 7.21.7.7 The putc function (p: 333)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.7.3 The fputc function (p: 297)

- 7.19.7.8 The putc function (p: 299)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.7.3 The fputc function

- 4.9.7.8 The putc function

### See also

|  |  |
| --- | --- |
| putchar | writes a character to `stdout` (function) |
| C++ documentation for fputc, putc |  |
