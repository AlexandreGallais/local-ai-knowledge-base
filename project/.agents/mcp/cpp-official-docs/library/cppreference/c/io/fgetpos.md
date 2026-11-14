# fgetpos

| Defined in header `<stdio.h>` |  |
| --- | --- |
| `int fgetpos( FILE* stream, fpos_t* pos );` | (until C99) |
| `int fgetpos( FILE* restrict stream, fpos_t* restrict pos );` | (since C99) |

Obtains the file position indicator and the current parse state (if any) for the file stream `stream` and stores them in the object pointed to by `pos`. The value stored is only meaningful as the input to `fsetpos`.

### Parameters

|  |  |  |
| --- | --- | --- |
| stream | - | file stream to examine |
| pos | - | pointer to a `fpos_t` object to store the file position indicator to |

### Return value

`​0​` upon success, nonzero value otherwise.

### Example

```c
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    // prepare a file holding 4 values of type double
    enum {SIZE = 4};
    FILE* fp = fopen("test.bin", "wb");
    assert(fp);
    int rc = fwrite((double[SIZE]){1.1, 2.2, 3.3, 4.4}, sizeof(double), SIZE, fp);
    assert(rc == SIZE);
    fclose(fp);

    // demo using fsetpos to return to the beginning of a file
    fp = fopen("test.bin", "rb");
    fpos_t pos;
    fgetpos(fp, &pos);               // store start of file in pos
    double d;
    rc = fread(&d, sizeof d, 1, fp); // read the first double
    assert(rc == 1);
    printf("First value in the file: %.1f\n", d);
    fsetpos(fp,&pos);                // move file position back to the start of the file
    rc = fread(&d, sizeof d, 1, fp); // read the first double again
    assert(rc == 1);
    printf("First value in the file again: %.1f\n", d);
    fclose(fp);

    // demo error handling
    rc = fsetpos(stdin, &pos);
    if (rc)
        perror("could not fsetpos stdin");
}
```

Output:

```text
First value in the file: 1.1
First value in the file again: 1.1
could not fsetpos stdin: Illegal seek
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.9.1 The fgetpos function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.9.1 The fgetpos function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.9.1 The fgetpos function (p: 336)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.9.1 The fgetpos function (p: 302)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.9.1 The fgetpos function

### See also

|  |  |
| --- | --- |
| ftell | returns the current file position indicator (function) |
| fseek | moves the file position indicator to a specific location in a file (function) |
| fsetpos | moves the file position indicator to a specific location in a file (function) |
| C++ documentation for fgetpos |  |
