# std::erase_if (std::flat_multiset)

| Defined in header `<flat_set>` |  |
| --- | --- |
| `template< class Key, class Compare, class KeyContainer, class Pred > std::flat_multiset<Key, Compare, KeyContainer>::size_type erase_if( std::flat_multiset<Key, Compare, KeyContainer>& c, Pred pred );` | (since C++23) |

Erases all elements that satisfy the predicate `pred` from `c`.

The predicate `pred` is satisfied if the expression `bool(pred(std::as_const(e)))` is `true`, where `e` is some element in `c`.

`Key` must be MoveAssignable. Otherwise, the behavior is undefined.

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
#include <flat_set>

void println(auto rem, auto const& container)
{
    std::cout << rem << '{';
    for (char sep[]{0, ' ', 0}; const auto& item : container)
        std::cout << sep << item, *sep = ',';
    std::cout << "}\n";
}

int main()
{
    std::flat_multiset data{3, 3, 4, 5, 5, 6, 6, 7, 2, 1, 0};
    println("Original:\n", data);

    auto divisible_by_3 = [](auto const& x) { return (x % 3) == 0; };

    const auto count = std::erase_if(data, divisible_by_3);

    println("Erase all items divisible by 3:\n", data);
    std::cout << count << " items erased.\n";
}
```

Output:

```text
Original:
{0, 1, 2, 3, 3, 4, 5, 5, 6, 6, 7}
Erase all items divisible by 3:
{1, 2, 4, 5, 5, 7}
5 items erased.
```

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| ranges::remove, ranges::remove_if (C++20), (C++20) | removes elements satisfying specific criteria (algorithm function object) |
