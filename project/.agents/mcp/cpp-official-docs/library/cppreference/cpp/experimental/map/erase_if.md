# std::experimental::erase_if (std::map)

| Defined in header `<experimental/map>` |  |
| --- | --- |
| `template< class Key, class T, class Compare, class Alloc, class Pred > void erase_if( std::map<Key, T, Compare, Alloc>& c, Pred pred );` | (library fundamentals TS v2) |

Erases all elements that satisfy the predicate `pred` from the container. Equivalent to

```cpp
for (auto i = c.begin(), last = c.end(); i != last;)
{
    if (pred(*i))
        i = c.erase(i);
    else
        ++i;
}
```

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | container from which to erase |
| pred | - | predicate that determines which elements should be erased |

### Complexity

Linear.

### Example

```cpp
#include <experimental/map>
#include <iostream>

template<typename Os, typename Container>
inline Os& operator<<(Os& os, Container const& cont)
{
    os << '{';
    for (const auto& item : cont)
        os << '{' << item.first << ", " << item.second << '}';
    return os << '}';
}

int main()
{
    std::map<int, char> data{{1, 'a'},{2, 'b'},{3, 'c'},{4, 'd'},
                             {5, 'e'},{4, 'f'},{5, 'g'},{5, 'g'}};
    std::cout << "Original:\n" << data << '\n';
    std::experimental::erase_if(data, [](const auto& item)
    {
        return (item.first & 1) == 1;
    });
    std::cout << "Erase items with odd keys:\n" << data << '\n';
}
```

Output:

```text
Original:
{{1, a}{2, b}{3, c}{4, d}{5, e}}
Erase items with odd keys:
{{2, b}{4, d}}
```

### See also

remove, remove_if removes elements satisfying specific criteria (function template)
