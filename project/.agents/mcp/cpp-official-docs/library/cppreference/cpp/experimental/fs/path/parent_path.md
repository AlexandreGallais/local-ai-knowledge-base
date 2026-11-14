# std::experimental::filesystem::path::parent_path

`path parent_path() const;` (filesystem TS)

Returns the path to the parent directory. Returns empty path if `empty()` or there's only a single element in the path (`begin() == --end()`).

The resulting path is constructed by appending all elements in a range `[``begin()``,``--end()``)` to an empty path.

### Parameters

(none)

### Return value

The path to the parent directory.

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    for (fs::path p : {"/var/tmp/example.txt", "/", "/var/tmp/."})
        std::cout << "The parent path of " << p
                  << " is " << p.parent_path() << '\n';
}
```

Possible output:

```text
The parent path of "/var/tmp/example.txt" is "/var/tmp"
The parent path of "/" is ""
The parent path of "/var/tmp/." is "/var/tmp"
```

### See also
