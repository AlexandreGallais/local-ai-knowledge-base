# rename

Defined in header `<stdio.h>`

`int rename( const char* old_filename, const char* new_filename );`

Changes the filename of a file. The file is identified by character string pointed to by `old_filename`. The new filename is identified by character string pointed to by `new_filename`.

If `new_filename` exists, the behavior is implementation-defined.

### Parameters

|  |  |  |
| --- | --- | --- |
| old_filename | - | pointer to a null-terminated string containing the path identifying the file to rename |
| new_filename | - | pointer to a null-terminated string containing the new path of the file |

### Return value

`​0​` upon success or non-zero value on error.

### Notes

POSIX specifies many additional details on the semantics of this function.

### Example

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    FILE* fp = fopen("from.txt", "w"); // create file "from.txt"
    if (!fp)
    {
        perror("from.txt");
        return EXIT_FAILURE;
    }
    fputc('a', fp); // write to "from.txt"
    fclose(fp);

    int rc = rename("from.txt", "to.txt");
    if (rc)
    {
        perror("rename");
        return EXIT_FAILURE;
    }

    fp = fopen("to.txt", "r");
    if(!fp)
    {
        perror("to.txt");
        return EXIT_FAILURE;
    }
    printf("%c\n", fgetc(fp)); // read from "to.txt"
    fclose(fp);

    return EXIT_SUCCESS;
}
```

Possible output:

```text
a
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.4.2 The rename function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.4.2 The rename function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.4.2 The rename function (p: 302-303)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.4.2 The rename function (p: 268-269)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.4.2 The rename function

### See also

|  |  |
| --- | --- |
| remove | erases a file (function) |
| C++ documentation for rename |  |
