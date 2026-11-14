# std::experimental::filesystem::path::root_name

`path root_name() const;` (filesystem TS)

Returns the root name of the path. If the path does not include root name, returns `path()`.

### Parameters

(none)

### Return value

The root name of the path.

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    std::cout << "Current root name is: " << fs::current_path().root_name() << '\n';
}
```

Possible output:

```text
Current root name is: "C:"
```

### See also

|  |  |
| --- | --- |
| root_directory | returns the root directory of the path, if present (public member function) |
| root_path | returns the root path of the path, if present (public member function) |
