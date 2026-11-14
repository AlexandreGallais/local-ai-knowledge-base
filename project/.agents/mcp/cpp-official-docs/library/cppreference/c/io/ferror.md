# ferror

Defined in header `<stdio.h>`

`int ferror( FILE *stream );`

Checks the given stream for errors.

### Parameters

stream - the file stream to check

### Return value

Nonzero value if the file stream has errors occurred, `​0​` otherwise

### Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
#include <wchar.h>

int main(void)
{
    char* fname = tmpnam(NULL);
    FILE* f = fopen(fname, "wb");
    fputs("\xff\xff\n", f); // not a valid UTF-8 character sequence
    fclose(f);

    setlocale(LC_ALL, "en_US.utf8");
    f = fopen(fname, "rb");
    wint_t ch;
    while ((ch=fgetwc(f)) != WEOF) // attempt to read as UTF-8 fails
          printf("%#x ", ch);

    if (feof(f))
        puts("EOF indicator set");
    if (ferror(f))
        puts("Error indicator set");
}
```

Output:

```text
Error indicator set
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.21.10.3 The ferror function (p: 339)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.10.3 The ferror function (p: 305)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.10.3 The ferror function

### See also

|  |  |
| --- | --- |
| clearerr | clears errors (function) |
| feof | checks for the end-of-file (function) |
| C++ documentation for ferror |  |
