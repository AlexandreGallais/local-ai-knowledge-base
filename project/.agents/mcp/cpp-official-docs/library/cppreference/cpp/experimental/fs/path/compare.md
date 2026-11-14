# std::experimental::filesystem::path::compare

|  |  |  |
| --- | --- | --- |
| `int compare( const path& p ) const noexcept;` | (1) | (filesystem TS) |
| `int compare( const string_type& str ) const;` | (2) | (filesystem TS) |
| `int compare( const value_type* s ) const;` | (3) | (filesystem TS) |

Compares the lexical representations of the path and another path.

1) Returns a value less than, equal to or greater than 0 if the native representation of the path (native()) is respectively lexicographically less than, equal to or greater than the native representation of `p` (`p.native()`). Comparison is performed element-wise, as if by iterating both paths from begin() to end().

2) Equivalent to `compare(path(str))`.

3) Equivalent to `compare(path(s))`.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | a path to compare to |
| str | - | a string representing path to compare to |
| s | - | a null-terminated string representing path to compare to |

### Return value

A value less than 0 if the path is lexicographically less than the given path.

A value equal to 0 if the path is lexicographically equal to the given path.

A value greater than 0 if the path is lexicographically greater than the given path.

### Exceptions

2,3) May throw implementation-defined exceptions.

### Notes

For two-way comparisons, binary operators may be more suitable.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

void demo(int rc, fs::path p1, fs::path p2)
{
    if (rc < 0)
        std::cout << p1 << " < " << p2 << '\n';
    else if (rc > 0)
        std::cout << p1 << " > " << p2 << '\n';
    else if (rc == 0)
        std::cout << p1 << " = " << p2 << '\n';
}

int main()
{
    fs::path p1 = "/a/b/"; // as if "a/b/." for lexicographical iteration
    fs::path p2 = "/a/b/#";
    demo(p1.compare(p2), p1, p2);
    demo(p1.compare("a/b/_"), p1, "a/b/_");
}
```

Output:

```text
"/a/b/" > "/a/b/#"
"/a/b/" < "a/b/_"
```

### See also

operator==, operator!=, operator<, operator<=, operator>, operator>= lexicographically compares two paths (function)
