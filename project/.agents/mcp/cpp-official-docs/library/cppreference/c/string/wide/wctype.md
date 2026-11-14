# wctype

| Defined in header `<wctype.h>` |  |
| --- | --- |
| `wctype_t wctype( const char* str );` | (since C95) |

Constructs a value of type `wctype_t` that describes a `LC_CTYPE` category of wide character classification. It may be one of the standard classification categories, or a locale-specific category, such as `"jkanji"`.

### Parameters

str - C string holding the name of the desired category

The following values of `str` are supported in all C locales:

| value of `str` | effect |
| --- | --- |
| `"alnum"` | identifies the category used by `iswalnum` |
| `"alpha"` | identifies the category used by `iswalpha` |
| `"blank"` | identifies the category used by `iswblank` (C99) |
| `"cntrl"` | identifies the category used by `iswcntrl` |
| `"digit"` | identifies the category used by `iswdigit` |
| `"graph"` | identifies the category used by `iswgraph` |
| `"lower"` | identifies the category used by `iswlower` |
| `"print"` | identifies the category used by `iswprint` |
| `"space"` | identifies the category used by `iswspace` |
| `"upper"` | identifies the category used by `iswupper` |
| `"xdigit"` | identifies the category used by `iswxdigit` |

### Return value

`wctype_t` object suitable for use with `iswctype` to classify wide characters according to the named category of the current C locale or zero if `str` does not name a category supported by the current C locale.

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.30.2.2.2 The wctype function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.30.2.2.2 The wctype function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.30.2.2.2 The wctype function (p: 452)

- C99 standard (ISO/IEC 9899:1999):

- 7.25.2.2.2 The wctype function (p: 398)

### See also

|  |  |
| --- | --- |
| iswctype (C95) | classifies a wide character according to the specified `LC_CTYPE` category (function) |
| C++ documentation for wctype |  |
