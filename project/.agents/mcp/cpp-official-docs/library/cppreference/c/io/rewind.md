# rewind

Defined in header `<stdio.h>`

`void rewind( FILE *stream );`

Moves the file position indicator to the beginning of the given file stream.

The function is equivalent to `fseek(stream, 0, SEEK_SET);`, except that end-of-file and error indicators are cleared.

The function drops any effects from previous calls to `ungetc`.

### Parameters

stream - file stream to modify

### Return value

(none)

### Example

This example shows how to read a file twice

```c
#include <stdio.h>

char str[20];

int main(void)
{
    FILE *f;
    char ch;

    f = fopen("file.txt", "w");
    for (ch = '0'; ch <= '9'; ch++) {
        fputc(ch, f);
    }
    fclose(f);

    f = fopen("file.txt", "r");
    fread(str, 1, 10, f);
    puts(str);

    rewind(f);
    fread(str, 1, 10, f);
    puts(str);
    fclose(f);

    return 0;
}
```

Output:

```text
0123456789
0123456789
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.21.9.5 The rewind function (p: 338)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.9.5 The rewind function (p: 304)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.9.5 The rewind function

### See also

|  |  |
| --- | --- |
| fseek | moves the file position indicator to a specific location in a file (function) |
| C++ documentation for rewind |  |
