# remove

Defined in header `<stdio.h>`

`int remove( const char* pathname );`

Deletes the file identified by the character string pointed to by `pathname`.

If the file is currently open by any process, the behavior of this function is implementation-defined. POSIX systems unlink the file name (directory entry), but the filesystem space used by the file is not reclaimed while it is open in any process and while other hard links to the file exist. Windows does not allow the file to be deleted in such cases.

### Parameters

pathname - pointer to a null-terminated string containing the path identifying the file to delete

### Return value

`​0​` upon success or non-zero value on error.

### Notes

POSIX specifies many additional details for the behavior of this function.

### Example

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    FILE* fp = fopen("file1.txt", "w"); // create file
    if (!fp)
    {
        perror("file1.txt");
        return EXIT_FAILURE;
    }
    puts("Created file1.txt");
    fclose(fp);

    int rc = remove("file1.txt");
    if (rc)
    {
        perror("remove");
        return EXIT_FAILURE;
    }
    puts("Removed file1.txt");

    fp = fopen("file1.txt", "r"); // Failure: file does not exist
    if (!fp)
        perror("Opening removed file failed");

    rc = remove("file1.txt"); // Failure: file does not exist
    if (rc)
        perror("Double-remove failed");

    return EXIT_SUCCESS;
}
```

Possible output:

```text
Created file1.txt
Removed file1.txt
Opening removed file failed: No such file or directory
Double-remove failed: No such file or directory
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.4.1 The remove function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.4.1 The remove function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.4.1 The remove function (p: 302)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.4.1 The remove function (p: 268)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.4.1 The remove function

### See also

|  |  |
| --- | --- |
| rename | renames a file (function) |
| C++ documentation for remove |  |
