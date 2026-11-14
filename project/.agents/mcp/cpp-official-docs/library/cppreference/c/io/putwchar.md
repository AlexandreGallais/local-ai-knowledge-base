# putwchar

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `wint_t putwchar( wchar_t ch );` | (since C95) |

Writes a wide character `ch` to `stdout`.

### Parameters

ch - wide character to be written

### Return value

`ch` on success, `WEOF` on failure.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <stdlib.h>
#include <wchar.h>

int main()
{
    setlocale(LC_ALL, "en_US.utf8");

    const wchar_t data[] =
    {
        L'\u2200', // Unicode name: "FOR ALL"
        L'∀',
        L'\n',
    };

    for (size_t t = 0; t != (sizeof data / sizeof(wchar_t)); ++t)
    {
        if (putwchar(data[t]) == WEOF)
        {
            puts("I/O error in putwchar");
            return EXIT_FAILURE;
        }
    }

    return EXIT_SUCCESS;
}
```

Possible output:

```text
∀∀
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.31.3.9 The putwchar function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.3.9 The putwchar function (p: 310)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.3.9 The putwchar function (p: 425)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.3.9 The putwchar function (p: 370)

### See also

|  |  |
| --- | --- |
| putchar | writes a character to `stdout` (function) |
| fputwc, putwc (C95) | writes a wide character to a file stream (function) |
| C++ documentation for putwchar |  |
