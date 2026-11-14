# std::experimental::filesystem::path::operator=

|  |  |  |
| --- | --- | --- |
| `path& operator=( const path& p );` | (1) | (filesystem TS) |
| `path& operator=( path&& p );` | (2) | (filesystem TS) |
| `template< class Source > path& operator=( const Source& source );` | (3) | (filesystem TS) |

1) Replaces the contents of `*this` with a copy of the contents of `p`.

2) Replaces the contents of `*this` with `p`, possibly using move semantics: `p` is left in valid, but unspecified state.

3) Replaces the contents of `*this` with a new path value constructed from `source` as if by overload (4) of the path constructor. Equivalent to `assign(source)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | a path to assign |
| source | - | a `std::basic_string`, pointer to a null-terminated character/wide character string, or an input iterator that points to a null-terminated character/wide character sequence. The character type must be one of `char`, `char16_t`, `char32_t`, `wchar_t` |

### Return value

`*this`

### Exceptions

1) (none)

2)

`noexcept` specification:

`noexcept`

3) (none)

### Example

```cpp
#include <experimental/filesystem>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path p = "C:/users/abcdef/AppData/Local";
    p = p / "Temp"; // move assignment
    const wchar_t* wstr = L"D:/猫.txt";
    p = wstr; // assignment from a source
}
```

### See also

|  |  |
| --- | --- |
| assign | assigns contents (public member function) |
| (constructor) | constructs a `path` (public member function) |
