# std::experimental::filesystem::path::append, std::experimental::filesystem::path::operator/=

|  |  |  |
| --- | --- | --- |
| `path& operator/=( const path& p );` | (1) | (filesystem TS) |
| `template< class Source > path& operator/=( const Source& source );` | (2) | (filesystem TS) |
| `template< class Source > path& append( const Source& source );` | (3) | (filesystem TS) |
| `template< class InputIt > path& append( InputIt first, InputIt last );` | (4) | (filesystem TS) |

1) First, appends the preferred directory separator to `this`, except if any of the following conditions is true:

* the separator would be redundant (`*this` already ends with a separator).

* `*this` is empty, or adding it would turn a relative path to an absolute path in some other way.

* `p` is an empty path.

* `p.native()` begins with a directory separator.

Then, appends `p.native()` to the pathname maintained by `*this`.

2,3) Same as (1), but accepts any `std::basic_string`, null-terminated multicharacter string, or an input iterator pointing to a null-terminated multicharacter sequence.

4) Same as (1), but accepts any iterator pair that designates a multicharacter string.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | pathname to append |
| source | - | `std::basic_string`, null-terminated multicharacter string, or an input iterator pointing to a null-terminated multicharacter sequence, which represents a path name (either in portable or in native format) |
| first, last | - | pair of LegacyInputIterators that specify a multicharacter sequence that represents a path name |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - The value type of `InputIt` must be one of the encoded character types (`char`, `wchar_t`, `char16_t` and `char32_t`). |  |  |

### Return value

`*this`

### Exceptions

May throw `filesystem_error` on underlying OS API errors or `std::bad_alloc` if memory allocation fails.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path p1 = "C:";
    p1 /= "Users"; // does not insert a separator
                   // "C:Users" is a relative path in Windows
                   // adding directory separator would turn it to an absolute path
    std::cout << "\"C:\" / \"Users\" == " << p1 << '\n';
    p1 /= "batman"; // inserts fs::path::preferred_separator, '\' on Windows
    std::cout << "\"C:\" / \"Users\" / \"batman\" == " << p1 << '\n';
}
```

Possible output:

```text
"C:" / "Users" == "C:Users"
"C:" / "Users" / "batman" == "C:Users\batman"
```

### See also

|  |  |
| --- | --- |
| concat, operator+= | concatenates two paths without introducing a directory separator (public member function) |
| operator/ | concatenates two paths with a directory separator (function) |
