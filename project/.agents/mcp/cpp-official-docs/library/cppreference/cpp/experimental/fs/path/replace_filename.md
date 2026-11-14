# std::experimental::filesystem::path::replace_filename

`path& replace_filename( const path& replacement );` (filesystem TS)

Replaces a single filename component with `replacement`.

Equivalent to the following:

```cpp
remove_filename();
operator/=(replacement);
```

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
    std::cout << fs::path("/foo").replace_filename("bar") << '\n'
              << fs::path("/").replace_filename("bar") << '\n';
}
```

Output:

```text
"/bar"
"bar"
```

### See also

|  |  |
| --- | --- |
| replace_extension | replaces the extension (public member function) |
| filename | returns the filename path component (public member function) |
| remove_filename | removes filename path component (public member function) |
| has_filename | checks if the corresponding path element is not empty (public member function) |
