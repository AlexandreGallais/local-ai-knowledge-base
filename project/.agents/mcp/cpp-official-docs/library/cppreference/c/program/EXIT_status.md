# EXIT_SUCCESS, EXIT_FAILURE

Defined in header `<stdlib.h>`

`#define EXIT_SUCCESS /*implementation defined*/`

`#define EXIT_FAILURE /*implementation defined*/`

The `EXIT_SUCCESS` and `EXIT_FAILURE` macros expand into integral constant expressions that can be used as arguments to the `exit` function (and, therefore, as the values to return from the main function), and indicate program execution status.

| Constant | Description |
| --- | --- |
| `EXIT_SUCCESS` | successful execution of a program |
| `EXIT_FAILURE` | unsuccessful execution of a program |

### Notes

Both `EXIT_SUCCESS` and the value zero indicate successful program execution status (see `exit`), although it is not required that `EXIT_SUCCESS` equals zero.

### Example

```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    FILE* fp = fopen("data.txt", "r");
    if (fp == NULL)
    {
       fprintf(stderr, "fopen() failed in file %s at line #%d", __FILE__, __LINE__);
       exit(EXIT_FAILURE);
    }

    /* Normal processing continues here. */
    fclose(fp);
    printf("Normal Return\n");

    return EXIT_SUCCESS;
}
```

Output:

```text
fopen() failed in file main.cpp at line #9
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.22/3 General utilities <stdlib.h> (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.22/3 General utilities <stdlib.h> (p: 248)

- C11 standard (ISO/IEC 9899:2011):

- 7.22/3 General utilities <stdlib.h> (p: 340)

- C99 standard (ISO/IEC 9899:1999):

- 7.20/3 General utilities <stdlib.h> (p: 306)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.10 General utilities <stdlib.h>

### See also

C++ documentation for EXIT_SUCCESS, EXIT_FAILURE
