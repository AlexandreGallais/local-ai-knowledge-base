# getchar

Defined in header `<stdio.h>`

`int getchar( void );`

Reads the next character from `stdin`.

Equivalent to `getc(stdin)`.

### Parameters

(none)

### Return value

The obtained character on success or `EOF` on failure.

If the failure has been caused by end-of-file condition, additionally sets the *eof* indicator (see `feof()`) on `stdin`. If the failure has been caused by some other error, sets the *error* indicator (see `ferror()`) on `stdin`.

### Example

Demonstrates `getchar` with error checking

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    for (int ch; (ch = getchar()) != EOF;) // read/print "abcde" from stdin
        printf("%c", ch);

    // Test reason for reaching EOF.
    if (feof(stdin)) // if failure caused by end-of-file condition
        puts("End of file reached");
    else if (ferror(stdin)) // if failure caused by some other error
    {
        perror("getchar()");
        fprintf(stderr, "getchar() failed in file %s at line # %d\n",
                __FILE__, __LINE__ - 9);
        exit(EXIT_FAILURE);
    }

    return EXIT_SUCCESS;
}
```

Possible output:

```text
abcde
End of file reached
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.7.6 The getchar function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.7.6 The getchar function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.7.6 The getchar function (p: 332)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.7.6 The getchar function (p: 298)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.7.6 The getchar function

### See also

|  |  |
| --- | --- |
| fgetc, getc | gets a character from a file stream (function) |
| C++ documentation for getchar |  |
