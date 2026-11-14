# std::experimental::filesystem::path::filename

`path filename() const;` (filesystem TS)

Returns the filename component of the path.

Equivalent to `empty() ? path() : *--end()`.

### Parameters

(none)

### Return value

The filename identified by the path.

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    std::cout << fs::path("/foo/bar.txt").filename() << '\n'
              << fs::path("/foo/.bar").filename() << '\n'
              << fs::path("/foo/bar/").filename() << '\n'
              << fs::path("/foo/.").filename() << '\n'
              << fs::path("/foo/..").filename() << '\n'
              << fs::path(".").filename() << '\n'
              << fs::path("..").filename() << '\n'
              << fs::path("/").filename() << '\n';
}
```

Output:

```text
"bar.txt"
".bar"
"."
"."
".."
"."
".."
"/"
```

### See also

|  |  |
| --- | --- |
| extension | returns the file extension path component (public member function) |
| stem | returns the stem path component (public member function) |
| replace_filename | replaces the last path component with another path (public member function) |
| has_filename | checks if the corresponding path element is not empty (public member function) |
