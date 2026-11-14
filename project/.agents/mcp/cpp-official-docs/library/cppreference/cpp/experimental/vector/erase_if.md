# std::experimental::erase_if (std::vector)

| Defined in header `<experimental/vector>` |  |
| --- | --- |
| `template< class T, class Alloc, class Pred > void erase_if( std::vector<T, Alloc>& c, Pred pred );` | (library fundamentals TS v2) |

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
#include <experimental/vector>
#include <iostream>

template<typename Os, typename Container>
inline Os& operator<<(Os& os, Container const& container)
{
    os << "{ ";
    for (const auto& item : container)
        os << item << ' ';
    return os << '}';
}

int main()
{
    std::vector<int> data{3, 3, 4, 5, 5, 6, 6, 7, 2, 1, 0};
    std::cout << "Original:\n" << data << '\n';
    auto divisible_by_3 = [](auto const& x) { return (x % 3) == 0; };
    std::experimental::erase_if(data, divisible_by_3);
    std::cout << "Erase all items divisible by 3:\n" << data << '\n';
}
```

Output:

```text
Original:
{ 3 3 4 5 5 6 6 7 2 1 0 }
Erase all items divisible by 3:
{ 4 5 5 7 2 1 }
```

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| erase (std::vector) (library fundamentals 2 TS) | erases all elements equal to a specific value from a `std::vector` (function template) |
