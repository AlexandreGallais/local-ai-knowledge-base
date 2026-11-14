# std::erase_if (std::unordered_set)

| Defined in header `<unordered_set>` |  |
| --- | --- |
| `template< class Key, class Hash, class KeyEqual, class Alloc, class Pred > std::unordered_set<Key, Hash, KeyEqual, Alloc>::size_type erase_if( std::unordered_set<Key, Hash, KeyEqual, Alloc>& c, Pred pred );` | (since C++20) |

Erases all elements that satisfy the predicate `pred` from `c`.

Equivalent to

```cpp
auto old_size = c.size();
for (auto first = c.begin(), last = c.end(); first != last;)
{
    if (pred(*first))
        first = c.erase(first);
    else
        ++first;
}
return old_size - c.size();
```

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | container from which to erase |
| pred | - | predicate that returns `true` if the element should be erased |

### Return value

The number of erased elements.

### Complexity

Linear.

### Example

```cpp
#include <iostream>
#include <unordered_set>

void println(auto rem, auto const& container)
{
    std::cout << rem << '{';
    for (char sep[]{0, ' ', 0}; const auto& item : container)
        std::cout << sep << item, *sep = ',';
    std::cout << "}\n";
}

int main()
{
    std::unordered_set data{3, 3, 4, 5, 5, 6, 6, 7, 2, 1, 0};
    println("Original:\n", data);

    auto divisible_by_3 = [](auto const& x) { return (x % 3) == 0; };

    const auto count = std::erase_if(data, divisible_by_3);

    println("Erase all items divisible by 3:\n", data);
    std::cout << count << " items erased.\n";
}
```

Possible output:

```text
Original:
{0, 1, 2, 7, 6, 5, 4, 3}
Erase all items divisible by 3:
{1, 2, 7, 5, 4}
3 items erased.
```

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| ranges::remove, ranges::remove_if (C++20), (C++20) | removes elements satisfying specific criteria (algorithm function object) |
