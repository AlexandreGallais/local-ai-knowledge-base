# std::match_results<BidirIt,Alloc>::prefix

`const_reference prefix() const;` (since C++11)

Obtains a reference to the `std::sub_match` object representing the target sequence between the start of the beginning of the target sequence and the start of the entire match of the regular expression.

`ready()` must be `true`. Otherwise, the behavior is undefined.

### Return value

Reference to the unmatched prefix.

### Example

```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
    std::regex re("a(a)*b");
    std::string target("baaaby");
    std::smatch sm;

    std::regex_search(target, sm, re);
    std::cout << sm.prefix().str() << '\n';
}
```

Output:

```text
b
```

### See also

suffix returns sub-sequence between the end of the full match and the end of the target sequence (public member function)
