# std::multimap<Key,T,Compare,Allocator>::rbegin, std::multimap<Key,T,Compare,Allocator>::crbegin

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rbegin();` | (1) | (noexcept since C++11) |
| `const_reverse_iterator rbegin() const;` | (2) | (noexcept since C++11) |
| `const_reverse_iterator crbegin() const noexcept;` | (3) | (since C++11) |

Returns a reverse iterator to the first element of the reversed `multimap`. It corresponds to the last element of the non-reversed `multimap`. If the `multimap` is empty, the returned iterator is equal to `rend()`.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the first element.

### Complexity

Constant.

### Notes

The underlying iterator of the returned reverse iterator is the end iterator. Hence the returned iterator is invalidated if and when the end iterator is invalidated.

libc++ backports `crbegin()` to C++98 mode.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <map>

int main()
{
    std::multimap<std::string, int> map
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
| rend, crend (C++11) | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
