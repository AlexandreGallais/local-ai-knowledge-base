# std::experimental::filesystem::path::extension

`path extension() const;` (filesystem TS)

Returns the extension of the filename component of the path `*this`.

If the `filename()` component of the path contains a period (`.`), and is not one of the special filesystem elements dot or dot-dot, then the *extension* is the substring beginning at the rightmost period (including the period) and until the end of the pathname.

If the pathname is either `.` or `..`, or if `filename()` does not contain the `.` character, then empty path is returned.

Additional behavior may be defined by the implementations for file systems which append additional elements (such as alternate data streams or partitioned dataset names) to extensions.

### Parameters

(none)

### Return value

The extension of the current pathname or an empty path if there's no extension.

### Exceptions

May throw implementation-defined exceptions.

### Notes

The extension as returned by this function includes a period to make it possible to distinguish the file that ends with a period (function returns `"."`) from a file with no extension (function returns `""`).

For any path `p`, `p.stem()+p.extension() == p.filename()`.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    std::cout << fs::path("/foo/bar.txt").extension() << '\n'
              << fs::path("/foo/bar.").extension() << '\n'
              << fs::path("/foo/bar").extension() << '\n'
              << fs::path("/foo/bar.txt/bar.cc").extension() << '\n'
              << fs::path("/foo/bar.txt/bar.").extension() << '\n'
              << fs::path("/foo/bar.txt/bar").extension() << '\n'
              << fs::path("/foo/.").extension() << '\n'
              << fs::path("/foo/..").extension() << '\n'
              << fs::path("/foo/.hidden").extension() << '\n';
}
```

Output:

```text
".txt"
"."
""
".cc"
"."
""
""
""
".hidden"
```

### See also

|  |  |
| --- | --- |
| filename | returns the filename path component (public member function) |
| stem | returns the stem path component (public member function) |
| replace_extension | replaces the extension (public member function) |
| has_extension | checks if the corresponding path element is not empty (public member function) |
