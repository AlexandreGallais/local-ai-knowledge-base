# std::experimental::filesystem::path::remove_filename

`path& remove_filename()` (1) (filesystem TS)

Removes a single filename component.

The behavior is undefined if the path has no filename component (`has_filename` returns `false`).

### Parameters

(none)

### Return value

`*this`

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    std::cout << fs::path("/foo").remove_filename() << '\n'
              << fs::path("/").remove_filename() << '\n';
}
```

Output:

```text
"/"
""
```

### See also

|  |  |
| --- | --- |
| filename | returns the filename path component (public member function) |
| replace_filename | replaces the last path component with another path (public member function) |
| has_filename | checks if the corresponding path element is not empty (public member function) |
