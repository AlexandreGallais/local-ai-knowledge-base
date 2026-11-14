# std::experimental::erase (std::basic_string)

| Defined in header `<experimental/string>` |  |
| --- | --- |
| `template< class CharT, class Traits, class A, class U > void erase( std::basic_string<CharT, Traits, A>& c, const U& value );` | (library fundamentals TS v2) |

Erases all elements that compare equal to `value` from the container. Equivalent to `c.erase(std::remove(c.begin(), c.end(), value), c.end());`.

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | container from which to erase |
| value | - | value to be removed |

### Complexity

Linear.

### Example

```cpp
#include <experimental/string>
#include <iostream>

int main()
{
    std::string data{"$$P$A$S$S$$W$O$R$$D$"};
    std::cout << data << '\n';
    auto crack{'$'};
    std::experimental::erase(data, crack);
    std::cout << data << '\n';
}
```

Output:

```text
$$P$A$S$S$$W$O$R$$D$
PASSWORD
```

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| erase_if (std::basic_string) (library fundamentals 2 TS) | erases all elements satisfying a predicate from a `std::basic_string` (function template) |
