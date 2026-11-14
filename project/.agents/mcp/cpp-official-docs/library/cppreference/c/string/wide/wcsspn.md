# wcsspn

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `size_t wcsspn( const wchar_t* dest, const wchar_t* src );` | (since C95) |

Returns the length of the maximum initial segment of the wide string pointed to by `dest`, that consists of only the characters found in wide string pointed to by `src`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the null-terminated wide string to be analyzed |
| src | - | pointer to the null-terminated wide string that contains the characters to search for |

### Return value

The length of the maximum initial segment that contains only characters from wide string pointed to by `src`

### Example

```c
#include <locale.h>
#include <wchar.h>

int main(void)
{
    wchar_t dest[] = L"白猫 黑狗 甲虫";
    const wchar_t src[] = L" 狗猫 白黑 ";
    const size_t len = wcsspn(dest, src);
    dest[len] = L'\0'; /* terminates the segment to print it out */

    setlocale(LC_ALL, "en_US.utf8");
    wprintf(L"The length of maximum initial segment is %td.\n"
            L"The segment is \"%ls\".\n", len, dest);
}
```

Output:

```text
The length of maximum initial segment is 6.
The segment is "白猫 黑狗 ".
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.5.5 The wcsspn function (p: 436)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.5.5 The wcsspn function (p: 382)

### See also

|  |  |
| --- | --- |
| wcscspn (C95) | returns the length of the maximum initial segment that consists of only the wide chars *not* found in another wide string (function) |
| wcspbrk (C95) | finds the first location of any wide character in one wide string, in another wide string (function) |
| C++ documentation for wcsspn |  |
