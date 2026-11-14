# wmemset

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `wchar_t* wmemset( wchar_t* dest, wchar_t ch, size_t count );` | (since C95) |

Copies the wide character `ch` into each of the first `count` wide characters of the wide character array (or integer array of compatible type) pointed to by `dest`.

If overflow occurs, the behavior is undefined.

If `count` is zero, the function does nothing.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the wide character array to fill |
| ch | - | fill wide character |
| count | - | number of wide characters to fill |

### Return value

Returns a copy of `dest`

### Notes

This function is not locale-sensitive and pays no attention to the values of the `wchar_t` objects it writes: nulls as well as invalid wide characters are written too.

### Example

```c
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

int main(void)
{
    wchar_t ar[10] = L"1234567890"; // no trailing null in the array
    wmemset(ar, L'\U0001f34c', 5); // replaces [12345] with the 🍌 bananas
    wmemset(ar + 5, L'蕉', 5); // replaces [67890] with the 蕉 bananas

    setlocale(LC_ALL, "en_US.utf8");
    for (size_t n = 0; n < sizeof ar / sizeof *ar; ++n)
        putwchar(ar[n]);
    putwchar(L'\n');
}
```

Output:

```text
🍌🍌🍌🍌🍌蕉蕉蕉蕉蕉
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.29.4.6.2 The wmemset function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.29.4.6.2 The wmemset function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.6.2 The wmemset function (p: 439)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.6.2 The wmemset function (p: 385)

### See also

|  |  |
| --- | --- |
| memset, memset_explicit, memset_s (C23), (C11) | fills a buffer with a character (function) |
| wmemcpy, wmemcpy_s (C95), (C11) | copies a certain amount of wide characters between two non-overlapping arrays (function) |
| C++ documentation for wmemset |  |
