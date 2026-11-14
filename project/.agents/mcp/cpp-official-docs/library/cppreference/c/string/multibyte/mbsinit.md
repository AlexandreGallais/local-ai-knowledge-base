# mbsinit

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `int mbsinit( const mbstate_t* ps);` | (since C95) |

If `ps` is not a null pointer, the `mbsinit` function determines whether the pointed-to `mbstate_t` object describes the initial conversion state.

### Notes

Although a zero-initialized `mbstate_t` always represents the initial conversion state, there may be other values of `mbstate_t` that also represent the initial conversion state.

### Parameters

ps - pointer to the mbstate_t object to examine

### Return value

`​0​` if `ps` is not a null pointer and does not represent the initial conversion state, nonzero value otherwise.

### Example

```c
#include <locale.h>
#include <string.h>
#include <stdio.h>
#include <wchar.h>

int main(void)
{
    // allow mbrlen() to work with UTF-8 multibyte encoding
    setlocale(LC_ALL, "en_US.utf8");
    // UTF-8 narrow multibyte encoding
    const char* str = u8"水"; // or u8"\u6c34" or "\xe6\xb0\xb4"
    static mbstate_t mb; // zero-initialize
    (void)mbrlen(&str[0], 1, &mb);
    if (!mbsinit(&mb)) {
        printf("After processing the first 1 byte of %s,\n"
               "the conversion state is not initial\n\n", str);
    }

    (void)mbrlen(&str[1], strlen(str), &mb);
    if (mbsinit(&mb)) {
        printf("After processing the remaining 2 bytes of %s,\n"
               "the conversion state is initial conversion state\n", str);
    }
}
```

Output:

```text
After processing the first 1 byte of 水,
the conversion state is not initial

After processing the remaining 2 bytes of 水,
the conversion state is initial conversion state
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.29.6.2.1 The mbsinit function (p: 322)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.6.2.1 The mbsinit function (p: 441-442)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.6.2.1 The mbsinit function (p: 387-388)

### See also

|  |  |
| --- | --- |
| mbstate_t (C95) | conversion state information necessary to iterate multibyte character strings (class) |
| C++ documentation for mbsinit |  |
