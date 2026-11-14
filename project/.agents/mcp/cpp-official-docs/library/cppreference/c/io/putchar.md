# putchar

Defined in header `<stdio.h>`

`int putchar( int ch );`

Writes a character `ch` to `stdout`. Internally, the character is converted to `unsigned char` just before being written.

Equivalent to `putc(ch, stdout)`.

### Parameters

ch - character to be written

### Return value

On success, returns the written character.

On failure, returns `EOF` and sets the *error* indicator (see `ferror()`) on `stdout`.

### Example

Shows `putchar` with error checking

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int ret_code = 0;
    for (char c = 'a'; (ret_code != EOF) && (c != 'z'); c++)
        ret_code = putchar(c);

    // Test whether EOF was reached.
    if (ret_code == EOF && ferror(stdout))
    {
        fprintf(stderr, "putchar() failed in file %s at line # %d\n",
                __FILE__, __LINE__ - 6);
        perror("putchar()");
        exit(EXIT_FAILURE);
    }
    putchar('\n');

    // putchar return value is not equal to the argument
    int r = 0x1070;
    printf("\n0x%x\n", r);
    r = putchar(r);
    printf("\n0x%x\n", r);
}
```

Output:

```text
abcdefghijklmnopqrstuvwxy

0x1070
p
0x70
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.7.8 The putchar function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.7.8 The putchar function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.7.8 The putchar function (p: 333)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.7.9 The putchar function (p: 299)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.7.9 The putchar function

### See also

|  |  |
| --- | --- |
| fputc, putc | writes a character to a file stream (function) |
| C++ documentation for putchar |  |
