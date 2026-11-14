# feof

Defined in header `<stdio.h>`

`int feof( FILE *stream );`

Checks if the end of the given file stream has been reached.

### Parameters

stream - the file stream to check

### Return value

nonzero value if the end of the stream has been reached, otherwise `​0​`

### Notes

This function only reports the stream state as reported by the most recent I/O operation, it does not examine the associated data source. For example, if the most recent I/O was a `fgetc`, which returned the last byte of a file, `feof` returns zero. The next `fgetc` fails and changes the stream state to *end-of-file*. Only then `feof` returns non-zero.

In typical usage, input stream processing stops on any error; `feof` and `ferror` are then used to distinguish between different error conditions.

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

- C11 standard (ISO/IEC 9899:2011):

- 7.21.10.2 The feof function (p: 339)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.10.2 The feof function (p: 305)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.10.2 The feof function

### See also

|  |  |
| --- | --- |
| clearerr | clears errors (function) |
| perror | displays a character string corresponding of the current error to `stderr` (function) |
| ferror | checks for a file error (function) |
| C++ documentation for feof |  |
