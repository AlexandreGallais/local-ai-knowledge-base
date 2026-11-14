# fopen, fopen_s

| Defined in header `<stdio.h>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `FILE *fopen( const char *filename, const char *mode );` |  | (until C99) |
| `FILE *fopen( const char *restrict filename, const char *restrict mode );` |  | (since C99) |
| `errno_t fopen_s( FILE *restrict *restrict streamptr, const char *restrict filename, const char *restrict mode );` | (2) | (since C11) |

1) Opens a file indicated by `filename` and returns a pointer to the file stream associated with that file. `mode` is used to determine the file access mode.

2) Same as (1), except that the pointer to the file stream is written to `streamptr` and the following errors are detected at runtime and call the currently installed constraint handler function:

- `streamptr` is a null pointer
- `filename` is a null pointer
- `mode` is a null pointer

As with all bounds-checked functions, `fopen_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<stdio.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| filename | - | file name to associate the file stream to |
| mode | - | null-terminated character string determining file access mode |
| streamptr | - | pointer to a pointer where the function stores the result (an out-parameter) |

### File access flags

| File access mode string | Meaning | Explanation | Action if file already exists | Action if file does not exist |
| --- | --- | --- | --- | --- |
| `"r"` | read | Open a file for reading | read from start | failure to open |
| `"w"` | write | Create a file for writing | destroy contents | create new |
| `"a"` | append | Append to a file | write to end | create new |
| `"r+"` | read extended | Open a file for read/write | read from start | error |
| `"w+"` | write extended | Create a file for read/write | destroy contents | create new |
| `"a+"` | append extended | Open a file for read/write | write to end | create new |
| File access mode flag `"b"` can optionally be specified to open a file in binary mode. This flag has no effect on POSIX systems, but on Windows it disables special handling of `'\n'` and `'\x1A'`. On the append file access modes, data is written to the end of the file regardless of the current position of the file position indicator. |  |  |  |  |
| The behavior is undefined if the mode is not one of the strings listed above. Some implementations define additional supported modes (e.g. Windows). |  |  |  |  |
| In update mode (`'+'`), both input and output may be performed, but output cannot be followed by input without an intervening call to `fflush`, `fseek`, `fsetpos` or `rewind`, and input cannot be followed by output without an intervening call to `fseek`, `fsetpos` or `rewind`, unless the input operation encountered end of file. In update mode, implementations are permitted to use binary mode even when text mode is specified. |  |  |  |  |
| File access mode flag `"x"` can optionally be appended to `"w"` or `"w+"` specifiers. This flag forces the function to fail if the file exists, instead of overwriting it. (C11) |  |  |  |  |
| When using `fopen_s` or `freopen_s`, file access permissions for any file created with `"w"` or `"a"` prevents other users from accessing it. File access mode flag `"u"` can optionally be prepended to any specifier that begins with `"w"` or `"a"`, to enable the default `fopen` permissions. (C11) |  |  |  |  |

### Return value

1) If successful, returns a pointer to the new file stream. The stream is fully buffered unless `filename` refers to an interactive device. On error, returns a null pointer. POSIX requires that `errno` be set in this case.

2) If successful, returns zero and a pointer to the new file stream is written to `*streamptr`. On error, returns a non-zero error code and writes the null pointer to `*streamptr` (unless `streamptr` is a null pointer itself).

### Notes

The format of `filename` is implementation-defined, and does not necessarily refer to a file (e.g. it may be the console or another device accessible though filesystem API). On platforms that support them, `filename` may include absolute or relative filesystem path.

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

- C17 standard (ISO/IEC 9899:2018):

- 7.21.5.3 The fopen function (p: 223-224)

- K.3.5.2.1 The fopen_s function (p: 428-429)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.5.3 The fopen function (p: 305-306)

- K.3.5.2.1 The fopen_s function (p: 588-590)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.5.3 The fopen function (p: 271-272)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.5.3 The fopen function

### See also

|  |  |
| --- | --- |
| fclose | closes a file (function) |
| fflush | synchronizes an output stream with the actual file (function) |
| freopen, freopen_s (C11) | open an existing stream with a different name (function) |
| C++ documentation for fopen |  |
