# operator<<(std::sub_match)

`template< class CharT, class Traits, class BidirIt > std::basic_ostream<CharT,Traits>& operator<<( std::basic_ostream<CharT,Traits>& os, const sub_match<BidirIt>& m );` (since C++11)

Writes the representation of the matched subsequence `m` to the output stream `os`. Equivalent to `os << m.str()`.

### Parameters

|  |  |  |
| --- | --- | --- |
| os | - | output stream to write the representation to |
| m | - | a sub-match object to output |

### Return value

`os`

### Example

```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
    std::string sentence{"Quick red fox jumped over a lazy hare."};
    const std::regex re{"([A-z]+) ([a-z]+) ([a-z]+)"};
    std::smatch words;
    std::regex_search(sentence, words, re);
    for (const auto& m : words)
        // m has type `const std::sub_match<std::string::const_iterator>&`
        std::cout << '[' << m << "] ";
    std::cout << '\n';
}
```

Output:

```text
[Quick red fox] [Quick] [red] [fox]
```
