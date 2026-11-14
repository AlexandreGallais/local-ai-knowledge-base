# std::swap(std::flat_multimap)

| Defined in header `<flat_map>` |  |
| --- | --- |
| `friend void swap( std::flat_multimap& lhs, std::flat_multimap& rhs ) noexcept;` | (since C++23) |

Specializes the `std::swap` algorithm for `std::flat_multimap`. Swaps the contents of `lhs` and `rhs`. Calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - containers whose contents to swap

### Return value

(none)

### Complexity

Same as swapping the underlying containers.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <flat_map>

int main()
{
    std::flat_multimap<int, char> alice{{1, 'a'}, {2, 'b'}, {3, 'c'}};
    std::flat_multimap<int, char> bob{{7, 'Z'}, {8, 'Y'}, {9, 'X'}, {10, 'W'}};

    auto print = [](std::pair<const int, char>& n)
    {
        std::cout << ' ' << n.first << ':' << n.second;
    };

    // Print state before swap
    std::cout << "Alice:";
    std::for_each(alice.begin(), alice.end(), print);
    std::cout << "\nBobby:";
    std::for_each(bob.begin(), bob.end(), print);
    std::cout << '\n';

    std::cout << "-- SWAP\n";
    std::swap(alice, bob);

    // Print state after swap
    std::cout << "Alice:";
    std::for_each(alice.begin(), alice.end(), print);
    std::cout << "\nBobby:";
    std::for_each(bob.begin(), bob.end(), print);
    std::cout << '\n';
}
```

Output:

```text
Alice: 1:a 2:b 3:c
Bobby: 7:Z 8:Y 9:X 10:W
-- SWAP
Alice: 7:Z 8:Y 9:X 10:W
Bobby: 1:a 2:b 3:c
```

### See also

swap swaps the contents (public member function)
