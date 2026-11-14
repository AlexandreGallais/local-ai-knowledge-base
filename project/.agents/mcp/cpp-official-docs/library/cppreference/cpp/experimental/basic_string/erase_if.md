# std::experimental::erase_if (std::basic_string)

| Defined in header `<experimental/string>` |  |
| --- | --- |
| `template< class CharT, class Traits, class Alloc, class Pred > void erase_if( std::basic_string<CharT, Traits, Alloc>& c, Pred pred );` | (library fundamentals TS v2) |

Erases all elements that satisfy the predicate `pred` from the container. Equivalent to `c.erase(std::remove_if(c.begin(), c.end(), pred), c.end());`.

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | container from which to erase |
| pred | - | predicate that determines which elements should be erased |

### Complexity

Linear.

### Example

```cpp
#include <experimental/string>
#include <iomanip>
#include <iostream>

int main()
{
    std::string data{"1337!p_C00L_<a-_HACKER_!@s_(!s#@_w^o%r*d#42"};
    std::cout << "Original string: " << std::quoted(data) << '\n';
    auto crack = [](auto O) { return '`' ^ ('`' & O); };
    std::experimental::erase_if(data, crack);
    std::cout << "After erase_if:  " << std::quoted(data) << '\n';
}
```

Output:

```text
Original string: "1337!p_C00L_<a-_HACKER_!@s_{!s#@_w^o%r*d#42"
After erase_if:  "password"
```

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| erase (std::basic_string) (library fundamentals 2 TS) | erases all elements equal to a specific value from a `std::basic_string` (function template) |
