# std::experimental::filesystem::operator/(std::experimental::filesystem::path)

| Defined in header `<experimental/filesystem>` |  |
| --- | --- |
| `path operator/( const path& lhs, const path& rhs );` | (filesystem TS) |

Concatenates two paths. Effectively returns `path(lhs) /= rhs`.

### Parameters

lhs, rhs - paths to concatenate

### Return value

The result of path concatenation.

### Exceptions

`noexcept` specification:

`noexcept`

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path p1 = "C:Users";
    std::cout << "\"C:\" / \"Users\" == " << p1 << '\n';
    fs::path p2 = "batman";
    fs::path p3 = p1 / p2; // inserts fs::path::preferred_separator, '\' on Windows
    std::cout << "\"C:\" / \"Users\" / \"batman\" == " << p3 << '\n';
}
```

Output:

```text
"C:" / "Users" == "C:Users"
"C:" / "Users" / "batman" == "C:Users\batman"
```

### See also

append, operator/= appends elements to the path (public member function)
