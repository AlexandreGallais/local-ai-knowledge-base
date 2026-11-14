# towctrans

| Defined in header `<wctype.h>` |  |
| --- | --- |
| `wint_t towctrans( wint_t wc, wctrans_t desc );` | (since C95) |

Maps the wide character `wc` using the current C locale's `LC_CTYPE` mapping category identified by `desc`.

### Parameters

|  |  |  |
| --- | --- | --- |
| wc | - | the wide character to map |
| desc | - | the `LC_CTYPE` mapping, obtained from a call to `wctrans` |

### Return value

The mapped value of `wc` using the mapping identified by `desc` in `LC_CTYPE` facet of the current C locale.

### Example

```c
#include <locale.h>
#include <wctype.h>
#include <wchar.h>
#include <stdio.h>

int main(void)
{
    setlocale(LC_ALL, "ja_JP.UTF-8");
    const wchar_t kana[] = L"ヒラガナ";
    size_t sz = sizeof kana / sizeof *kana;
    wchar_t hira[sz];
    for (size_t n = 0; n < sz; ++n)
        hira[n] = towctrans(kana[n], wctrans("tojhira"));
    printf("katakana characters %ls are %ls in hiragana\n", kana, hira);
}
```

Output:

```text
katakana characters ヒラガナ are ひらがな in hiragana
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.30.3.2.1 The towctrans function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.30.3.2.1 The towctrans function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.30.3.2.1 The towctrans function (p: 454)

- C99 standard (ISO/IEC 9899:1999):

- 7.25.3.2,1 The towctrans function (p: 400)

### See also

|  |  |
| --- | --- |
| wctrans (C95) | looks up a character mapping category in the current C locale (function) |
| C++ documentation for towctrans |  |
