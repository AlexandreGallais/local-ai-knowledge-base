# std::experimental::filesystem::path::replace_extension

`path& replace_extension( const path& replacement = path() );` (1) (filesystem TS)

Replaces the extension with `replacement` or removes it when the default value of `replacement` is used.

Firstly, if this path has an `extension()`, it is removed.

Then, a dot character is appended if `replacement` is not empty or does not begin with a dot character.

Then `replacement` is appended to the path.

### Parameters

replacement - the extension to replace with

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
    fs::path p = "/foo/bar.jpeg";
    std::cout << "Was: " << p << '\n';
    p.replace_extension(".jpg");
    std::cout << "Now: " << p << '\n';
}
```

Output:

```text
Was: "/foo/bar.jpeg"
Now: "/foo/bar.jpg"
```

### See also

|  |  |
| --- | --- |
| extension | returns the file extension path component (public member function) |
| filename | returns the filename path component (public member function) |
| stem | returns the stem path component (public member function) |
| has_extension | checks if the corresponding path element is not empty (public member function) |
