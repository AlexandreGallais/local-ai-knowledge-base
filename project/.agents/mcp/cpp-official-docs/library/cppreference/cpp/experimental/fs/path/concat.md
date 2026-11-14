# std::experimental::filesystem::path::concat, std::experimental::filesystem::path::operator+=

|  |  |  |
| --- | --- | --- |
| `path& operator+=( const path& p );` | (1) | (filesystem TS) |
| `path& operator+=( const string_type& str );` | (2) | (filesystem TS) |
| `path& operator+=( const value_type* ptr );` | (3) | (filesystem TS) |
| `path& operator+=( value_type x );` | (4) | (filesystem TS) |
| `template< class Source > path& operator+=( const Source& source );` | (5) | (filesystem TS) |
| `template< class CharT > path& operator+=( CharT x );` | (6) | (filesystem TS) |
| `template< class Source > path& concat( const Source& source );` | (7) | (filesystem TS) |
| `template< class InputIt > path& concat( InputIterator first, InputIterator last );` | (8) | (filesystem TS) |

Concatenates the current path and the argument.

1) Concatenates `*this` and `p` in such a way that native() of the result is exactly original native() concatenated with `p.native()`.

2) Same as (1), except the resulting native() is a concatenation of the original native() and the string `str`.

3) Same as (1), except the resulting native() is a concatenation of the original native() and the null-terminated string whose first character is pointed to by `ptr`.

4) Same as (1), except the resulting native() is a concatenation of the original native() and the single character `x`.

5) Same as (1), except the resulting native() is a concatenation of the original native() and the sequence (which may be in portable or native format) represented by `source`, which may be `std::basic_string`, null-terminated multicharacter string, or an input iterator pointing to a null-terminated multicharacter sequence.

6) Same as (4), except that character conversion may be performed.

7) Same as (5).

8) Same as (5), except that the sequence is represented by any iterator pair that designates a multicharacter string.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | path to append |
| str | - | string to append |
| ptr | - | pointer to the beginning of a null-terminated string to append |
| x | - | single character to append |
| source | - | `std::basic_string`, null-terminated multicharacter string, or an input iterator pointing to a null-terminated multicharacter sequence, which represents a path name (either in portable or in native format) |
| first, last | - | pair of LegacyInputIterators that specify a multicharacter sequence that represents a path name |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - The value type of `InputIt` must be one of the encoded character types (`char`, `wchar_t`, `char16_t` and `char32_t`). |  |  |
| - `CharT` must be one of the encoded character types (`char`, `wchar_t`, `char16_t` and `char32_t`). |  |  |

### Return value

`*this`

### Exceptions

May throw `filesystem_error` on underlying OS API errors or `std::bad_alloc` if memory allocation fails.

### Notes

Unlike with `append()` or `operator/=`, additional directory separators are never introduced.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path p1; // empty path
    p1 += "var"; // does not insert a separator
    std::cout << "\"\" + \"var\" == " << p1 << '\n';
    p1 += "lib"; // does not insert a separator
    std::cout << "\"\" + \"var\" + \"lib\" == " << p1 << '\n';
}
```

Output:

```text
"" + "var" == "var"
"" + "var" + "lib" == "varlib"
```

### See also

|  |  |
| --- | --- |
| append, operator/= | appends elements to the path (public member function) |
| operator/ | concatenates two paths with a directory separator (function) |
