# std::sub_match<BidirIt>::operator string_type, std::sub_match<BidirIt>::str

|  |  |
| --- | --- |
| `operator string_type() const;` | (1) |
| `string_type str() const;` | (2) |

Converts to an object of the underlying `std::basic_string` type.

1) An implicit conversion.

2) An explicit conversion.

### Return value

The matched character sequence as an object of the underlying `std::basic_string` type. If the `matched` member is `false`, then returns the empty string.

### Complexity

Linear in the length of the underlying character sequence.

### Example

```cpp
#include <cassert>
#include <iostream>
#include <regex>
#include <string>

int main()
{
    const std::string html{R"("<a href="https://cppreference.com/">)"};
    const std::regex re{"(http|https|ftp)://([a-z]+)\\.([a-z]{3})"};
    std::smatch parts;
    std::regex_search(html, parts, re);
    for (std::ssub_match const& sub : parts)
    {
        const std::string s = sub; // (1) implicit conversion
        assert(s == sub.str());    // (2)
        std::cout << s << '\n';
    }
}
```

Output:

```text
https://cppreference.com
https
cppreference
com
```
