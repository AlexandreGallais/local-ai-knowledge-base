# wctrans

| Defined in header `<wctype.h>` |  |
| --- | --- |
| `wctrans_t wctrans( const char* str );` | (since C95) |

Constructs a value of type `wctrans_t` that describes a `LC_CTYPE` category of wide character mapping. It may be one of the standard mappings, or a locale-specific mapping, such as `"tojhira"` or `"tojkata"`.

### Parameters

str - C string holding the name of the desired mapping. The following values of `str` are supported in all C locales: Value of `str` Effect `"toupper"` identifies the mapping used by `towupper` `"tolower"` identifies the mapping used by `towlower`

### Return value

`wctrans_t` object suitable for use with `towctrans` to map wide characters according to the named mapping of the current C locale or zero if `str` does not name a mapping supported by the current C locale.

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.30.3.2.2 The wctrans function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.30.3.2.2 The wctrans function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.30.3.2.2 The wctrans function (p: 454)

- C99 standard (ISO/IEC 9899:1999):

- 7.25.3.2,2 The wctrans function (p: 400)

### See also

|  |  |
| --- | --- |
| towctrans (C95) | performs character mapping according to the specified LC_CTYPE mapping category (function) |
| C++ documentation for wctrans |  |
