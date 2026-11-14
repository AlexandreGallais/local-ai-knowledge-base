# std::hash <std::experimental::optional>

| Defined in header `<experimental/optional>` |  |
| --- | --- |
| `template< class T > struct hash<std::experimental::optional<T>>;` | (library fundamentals TS) |

The template specialization of `std::hash` for the `std::experimental::optional` class allows users to obtain hashes of the values contained in `optional` objects.

### Template parameters

T - the type of the value contained in `optional` object. The specialization `std::hash<T>` must meet the requirements of class template `hash`.

### Example

```cpp
#include <experimental/optional>
#include <iostream>
#include <string>
#include <unordered_set>
using namespace std::literals;

int main()
{
    // hash<optional> makes it possible to use unordered_set
    std::unordered_set<std::experimental::optional<std::string>> s = {
        "abc"s, std::experimental::nullopt, "def"s
    };

    for (const auto& o : s)
        std::cout << o.value_or("(null)") << ' ';
    std::cout << '\n';
}
```

Possible output:

```text
def abc (null)
```

### See also

hash (C++11) hash function object (class template)
