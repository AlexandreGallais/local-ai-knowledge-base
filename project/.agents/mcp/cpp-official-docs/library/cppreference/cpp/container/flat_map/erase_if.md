# std::erase_if (std::flat_map)

| Defined in header `<flat_map>` |  |
| --- | --- |
| `template< class Key, class T, class Compare, class KeyContainer, class MappedContainer, class Pred > std::flat_map<Key, T, Compare, KeyContainer, MappedContainer>::size_type erase_if( std::flat_map<Key, T, Compare, KeyContainer, MappedContainer>& c, Pred pred );` | (since C++23) |

Erases all elements that satisfy the predicate `pred` from `c`.

The predicate `pred` is satisfied if the expression `bool(pred(std::pair<const Key&, const T&>(e)))` is `true`, where `e` is some element in `c`.

`Key` and `T` must be MoveAssignable. Otherwise, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | container adaptor from which to erase |
| pred | - | predicate that returns `true` if the element should be erased |

### Return value

The number of erased elements.

### Complexity

Exactly `c.size()` applications of the predicate `pred`.

### Exceptions

If `erase_if` throws, `c` remains in valid but unspecified (maybe empty) state.

### Notes

The algorithm is *stable*, that is, the order of elements that are not deleted remains unchanged.

### Example

```cpp
#include <iostream>
#include <flat_map>

void println(auto rem, auto const& container)
{
    std::cout << rem << '{';
    for (char sep[]{0, ' ', 0}; const auto& [key, value] : container)
        std::cout << sep << '{' << key << ", " << value << '}', *sep = ',';
    std::cout << "}\n";
}

int main()
{
    std::flat_map<int, char> data
    {
        {1, 'a'}, {2, 'b'}, {3, 'c'}, {4, 'd'},
        {5, 'e'}, {4, 'f'}, {5, 'g'}, {5, 'g'},
    };
    println("Original:\n", data);

    const auto count = std::erase_if(data, [](const auto& item)
    {
        auto const& [key, value] = item;
        return (key & 1) == 1;
    });

    println("Erase items with odd keys:\n", data);
    std::cout << count << " items removed.\n";
}
```

Output:

```text
Original:
{{1, a}, {2, b}, {3, c}, {4, d}, {5, e}}
Erase items with odd keys:
{{2, b}, {4, d}}
3 items removed.
```

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| ranges::remove, ranges::remove_if (C++20), (C++20) | removes elements satisfying specific criteria (algorithm function object) |
