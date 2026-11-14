# std::regex_iterator<BidirIt,CharT,Traits>::operator*,operator->

|  |  |  |
| --- | --- | --- |
| `const value_type& operator*() const;` | (1) | (since C++11) |
| `const value_type* operator->() const;` | (2) | (since C++11) |

Extracts the current `std::match_results` from a `regex_iterator`.

### Return value

1) Returns a reference to the current `std::match_results`.

2) Returns a pointer to the current `std::match_results`.

### Example

```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
    std::string hay{"1.1a2b3cjk34"};
    std::regex needle("[1234]");
    using Ri = std::regex_iterator<std::string::iterator>;
    for (Ri it{hay.begin(), hay.end(), needle}, last{}; it != last; ++it)
        std::cout << it->str();
    std::cout << '\n';
}
```

Output:

```text
112334
```
