# wcscspn

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `size_t wcscspn( const wchar_t* dest, const wchar_t* src );` | (since C95) |

Returns the length of the maximum initial segment of the wide string pointed to by `dest`, that consists of only the characters *not* found in wide string pointed to by `src`.

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the null-terminated wide string to be analyzed |
| src | - | pointer to the null-terminated wide string that contains the characters to search for |

### Return value

The length of the maximum initial segment that contains only characters not found in the character string pointed to by `src`

### Example

```c
#include <locale.h>
#include <wchar.h>

int main(void)
{
    wchar_t dest[] = L"白猫 黑狗 甲虫";
    /*                      └───┐   */
    const wchar_t *src = L"甲虫,黑狗";

    const size_t len = wcscspn(dest, src);
    dest[len] = L'\0'; /* terminates the segment to print it out */

    setlocale(LC_ALL, "en_US.utf8");
    wprintf(L"The length of maximum initial segment is %td.\n"
            L"The segment is \"%ls\".\n", len, dest);
}
```

Output:

```text
The length of maximum initial segment is 3.
The segment is "白猫 ".
```

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.4.5.2 The wcscspn function (p: 435-436)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.4.5.2 The wcscspn function (p: 381-382)

### See also

|  |  |
| --- | --- |
| wcsspn (C95) | returns the length of the maximum initial segment that consists of only the wide characters found in another wide string (function) |
| wcspbrk (C95) | finds the first location of any wide character in one wide string, in another wide string (function) |
| C++ documentation for wcscspn |  |
