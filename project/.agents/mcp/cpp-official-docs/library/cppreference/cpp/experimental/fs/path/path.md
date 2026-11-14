# std::experimental::filesystem::path::path

|  |  |  |
| --- | --- | --- |
| `path();` | (1) | (filesystem TS) |
| `path( const path& p );` | (2) | (filesystem TS) |
| `path( path&& p );` | (3) | (filesystem TS) |
| `template< class Source > path( const Source& source );` | (4) | (filesystem TS) |
| `template< class InputIt > path( InputIt first, InputIt last );` | (5) | (filesystem TS) |
| `template< class Source > path( const Source& source, const std::locale& loc );` | (6) | (filesystem TS) |
| `template< class InputIt > path( InputIt first, InputIt last, const std::locale& loc );` | (7) | (filesystem TS) |

Constructs a new `path` object.

1) Constructs an empty path.

2) Copy constructor. Constructs a copy of `p`.

3) Move constructor. Constructs a copy of `p`, `p` is left in valid but unspecified state.

4,5) Constructs the path from a character sequence provided by `source` (4), which is a pointer or an input iterator to a null-terminated character/wide character sequence or an `std::basic_string`, or represented as a pair of input iterators [`first`, `last`) (5). Any of the four character types `char`, `char16_t`, `char32_t`, `wchar_t` is allowed, and the method of conversion to the native character set depends on the character type used by `source`.

- If the source character type is `char`, the encoding of the source is assumed to be the native narrow encoding (so no conversion takes place on POSIX systems).
- If the source character type is `char16_t`, conversion from UTF-16 to native filesystem encoding is used.
- If the source character type is `char32_t`, conversion from UTF-32 to native filesystem encoding is used.
- If the source character type is `wchar_t`, the input is assumed to be the native wide encoding (so no conversion takes places on Windows).

6,7) Constructs the path from a character sequence provided by `source` (6), which is a pointer or an input iterator to a null-terminated character sequence or an `std::string`, or represented as a pair of input iterators [`first`, `last`) (7). The only character type allowed is `char`. Uses `loc` to perform the character encoding conversion. If `value_type` is `wchar_t`, converts from to wide using the `std::codecvt<wchar_t, char, std::mbstate_t>` facet of `loc`. Otherwise, first converts to wide using the `std::codecvt<wchar_t, char, std::mbstate_t>` facet and then converts to filesystem native character type using `std::codecvt<wchar_t, value_type>` facet of `loc`.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | a path to copy |
| source | - | a `std::basic_string`, pointer to a null-terminated character string, or an input iterator with a character value type that points to a null-terminated character sequence (the character type must be `char` for overload (6) |
| first, last | - | pair of LegacyInputIterators that specify a UTF-8 encoded character sequence |
| loc | - | locale that defines encoding conversion to use |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - The value type of `InputIt` must be one of the four character types `char`, `wchar_t`, `char16_t` and `char32_t` to use the overload (5). |  |  |
| - The value type of `InputIt` must be `char` to use the overload (7). |  |  |

### Exceptions

1,2) (none)

3)

`noexcept` specification:

`noexcept`

4-7) (none)

### Notes

For portable pathname generation from Unicode strings, see u8path.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path p1 = "/usr/lib/sendmail.cf"; // portable format
    fs::path p2 = "C:\\users\\abcdef\\AppData\\Local\\Temp\\"; // native format
    fs::path p3 = L"D:/猫.txt"; // wide string

    std::cout << "p1 = " << p1 << '\n'
              << "p2 = " << p2 << '\n'
              << "p3 = " << p3 << '\n';
}
```

Output:

```text
p1 = "/usr/lib/sendmail.cf"
p2 = "C:\users\abcdef\AppData\Local\Temp\"
p3 = "D:/猫.txt"
```

### See also

u8path creates a `path` from a UTF-8 encoded source (function)
