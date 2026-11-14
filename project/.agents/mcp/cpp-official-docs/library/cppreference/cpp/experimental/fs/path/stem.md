# std::experimental::filesystem::path::stem

`path stem() const;` (filesystem TS)

Returns the filename identified by the path stripped of its extension.

Returns the substring from the beginning of `filename()` up to and not including the last period (`.`) character.

If the filename is one of the special filesystem components dot or dot-dot, or if it has no periods, the function returns the entire `filename()`.

### Parameters

(none)

### Return value

The stem of the filename identified by the path.

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    std::cout << fs::path("/foo/bar.txt").stem() << '\n'
              << fs::path("/foo/.bar").stem() << '\n';

    for (fs::path p = "foo.bar.baz.tar"; !p.extension().empty(); p = p.stem())
        std::cout << p.extension() << '\n';
}
```

Output:

```text
"bar"
""
".tar"
".baz"
".bar"
```

### See also

|  |  |
| --- | --- |
| filename | returns the filename path component (public member function) |
| extension | returns the file extension path component (public member function) |
