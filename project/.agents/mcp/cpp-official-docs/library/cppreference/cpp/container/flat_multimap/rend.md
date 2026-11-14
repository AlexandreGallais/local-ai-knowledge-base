# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::rend, std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::crend

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rend() noexcept;` | (1) | (since C++23) |
| `const_reverse_iterator rend() const noexcept;` | (2) | (since C++23) |
| `const_reverse_iterator crend() const noexcept;` | (3) | (since C++23) |

Returns a reverse iterator to the element following the last element of the reversed `flat_multimap`. It corresponds to the element preceding the first element of the non-reversed `flat_multimap`. This element acts as a placeholder, attempting to access it results in undefined behavior.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the element following the last element.

### Complexity

Constant.

### Example

```cpp
#include <chrono>
#include <iomanip>
#include <iostream>
#include <string_view>
#include <flat_map>

using namespace std::chrono;

int main()
{
    const std::flat_multimap<year_month_day, int> messages
    {
        {February/17/2023, 10},
        {February/17/2023, 20},
        {February/16/2022, 30},
        {October/22/2022, 40},
        {June/14/2022, 50},
        {November/23/2021, 60},
        {December/10/2022, 55},
        {December/12/2021, 45},
        {April/1/2020, 42},
        {April/1/2020, 24}
    };

    std::cout << "Messages received (date order is reversed):\n";
    for (auto it = messages.crbegin(); it != messages.crend(); ++it)
        std::cout << it->first << " : " << it->second << '\n';
}
```

Possible output:

```text
Messages received (date order is reversed):
2023-02-17 : 20
2023-02-17 : 10
2022-12-10 : 55
2022-10-22 : 40
2022-06-14 : 50
2022-02-16 : 30
2021-12-12 : 45
2021-11-23 : 60
2020-04-01 : 24
2020-04-01 : 42
```

### See also

|  |  |
| --- | --- |
| rbegin, crbegin | returns a reverse iterator to the beginning (public member function) |
| rend, crend (C++14) | returns a reverse end iterator for a container or array (function template) |
