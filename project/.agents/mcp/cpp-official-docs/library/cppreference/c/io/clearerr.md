# clearerr

Defined in header `<stdio.h>`

`void clearerr( FILE *stream );`

Resets the error flags and the `EOF` indicator for the given file stream.

### Parameters

stream - the file to reset the error flags for

### Return value

(none)

### Example

```c
#include <stdio.h>
#include <assert.h>

int main(void)
{
    FILE* tmpf = tmpfile();
    fputs("cppreference.com\n", tmpf);
    rewind(tmpf);

    for (int ch; (ch = fgetc(tmpf)) != EOF; putchar(ch)) { }

    assert(feof(tmpf)); // the loop is expected to terminate by EOF
    puts("End of file reached");

    clearerr(tmpf); // clear EOF

    puts(feof(tmpf) ? "EOF indicator set"
                    : "EOF indicator cleared");
}
```

Output:

```text
cppreference.com
End of file reached
EOF indicator cleared
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.21.10.1 The clearerr function (p: 246)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.10.1 The clearerr function (p: 338)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.10.1 The clearerr function (p: 304)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.10.1 The clearerr function

### See also

|  |  |
| --- | --- |
| feof | checks for the end-of-file (function) |
| perror | displays a character string corresponding of the current error to `stderr` (function) |
| ferror | checks for a file error (function) |
| C++ documentation for clearerr |  |
