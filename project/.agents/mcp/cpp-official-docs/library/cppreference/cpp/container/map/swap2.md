# std::swap(std::map)

| Defined in header `<map>` |  |
| --- | --- |
| `template< class Key, class T, class Compare, class Alloc > void swap( std::map<Key, T, Compare, Alloc>& lhs, std::map<Key, T, Compare, Alloc>& rhs );` | (until C++17) |
| `template< class Key, class T, class Compare, class Alloc > void swap( std::map<Key, T, Compare, Alloc>& lhs, std::map<Key, T, Compare, Alloc>& rhs ) noexcept(/* see below */);` | (since C++17) |

Specializes the `std::swap` algorithm for `std::map`. Swaps the contents of `lhs` and `rhs`. Calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - containers whose contents to swap

### Return value

(none)

### Complexity

Constant.

### Exceptions

`noexcept` specification: `noexcept(noexcept(lhs.swap(rhs)))` (since C++17)

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <map>

int main()
{
    std::map<int, char> alice{{1, 'a'}, {2, 'b'}, {3, 'c'}};
    std::map<int, char> bob{{7, 'Z'}, {8, 'Y'}, {9, 'X'}, {10, 'W'}};

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
