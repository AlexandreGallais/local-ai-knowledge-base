# std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::rbegin, std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::crbegin

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rbegin() noexcept;` | (1) | (since C++23) |
| `const_reverse_iterator rbegin() const noexcept;` | (2) | (since C++23) |
| `const_reverse_iterator crbegin() const noexcept;` | (3) | (since C++23) |

Returns a reverse iterator to the first element of the reversed `flat_map`. It corresponds to the last element of the non-reversed `flat_map`. If the `flat_map` is empty, the returned iterator is equal to `rend()`.

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
#include <iomanip>
#include <iostream>
#include <string_view>
#include <flat_map>

int main()
{
    const std::flat_map<int, std::string_view> coins
    {
        {10, "dime"},
        {100, "dollar"},
        {50, "half dollar"},
        {5, "nickel"},
        {1, "penny"},
        {25, "quarter"}
    }; // initializer entries in name alphabetical order

    std::cout << "US coins in circulation, largest to smallest denomination:\n";
    for (auto it = coins.crbegin(); it != coins.crend(); ++it)
        std::cout << std::setw(11) << it->second << " = ¢" << it->first << '\n';
}
```

Output:

```text
US coins in circulation, largest to smallest denomination:
     dollar = ¢100
half dollar = ¢50
    quarter = ¢25
       dime = ¢10
     nickel = ¢5
      penny = ¢1
```

### See also

|  |  |
| --- | --- |
| rend, crend | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
