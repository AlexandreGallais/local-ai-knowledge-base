# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::rbegin, std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::crbegin

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rbegin() noexcept;` | (1) | (since C++23) |
| `const_reverse_iterator rbegin() const noexcept;` | (2) | (since C++23) |
| `const_reverse_iterator crbegin() const noexcept;` | (3) | (since C++23) |

Returns a reverse iterator to the first element of the reversed `flat_multimap`. It corresponds to the last element of the non-reversed `flat_multimap`. If the `flat_multimap` is empty, the returned iterator is equal to `rend()`.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the first element.

### Complexity

Constant.

### Notes

The underlying iterator of the returned reverse iterator is the end iterator. Hence the returned iterator is invalidated if and when the end iterator is invalidated.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <flat_map>

int main()
{
    std::flat_multimap<std::string, int> map
    {
        {"█", 1},
        {"▒", 5},
        {"░", 3},
        {"▓", 7},
        {"▓", 8},
        {"░", 4},
        {"▒", 6},
        {"█", 2}
    };

    std::cout << "Print out in reverse order using const reverse iterators:\n";
    std::for_each(map.crbegin(), map.crend(),
        [](std::pair<const std::string, int> const& e)
        {
            std::cout << "{ \"" << e.first << "\", " << e.second << " };\n";
        });

    map.rbegin()->second = 42; // OK: non-const value is modifiable
//  map.crbegin()->second = 42; // Error: cannot modify the const value
}
```

Possible output:

```text
Print out in reverse order using const reverse iterators:
{ "▓", 8 };
{ "▓", 7 };
{ "▒", 6 };
{ "▒", 5 };
{ "░", 4 };
{ "░", 3 };
{ "█", 2 };
{ "█", 1 };
```

### See also

|  |  |
| --- | --- |
| rend, crend | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
