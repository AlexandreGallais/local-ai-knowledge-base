# std::sub_match<BidirIt>::length

`difference_type length() const;`

Returns the number of characters in the match.

### Return value

`std::distance(first, second)` if the match is valid, `​0​` otherwise.

### Complexity

Constant.

### Example

```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
    std::string sentence{"Quick red fox jumped over a lazy cow."};
    const std::regex re{"([A-z]+) ([a-z]+) ([a-z]+) ([a-z]+)"};
    std::smatch words;
    std::regex_search(sentence, words, re);
    for (const auto& m : words)
        std::cout << '[' << m << "], length = " << m.length() << '\n';
}
```

Output:

```text
[Quick red fox jumped], length = 20
[Quick], length = 5
[red], length = 3
[fox], length = 3
[jumped], length = 6
```
