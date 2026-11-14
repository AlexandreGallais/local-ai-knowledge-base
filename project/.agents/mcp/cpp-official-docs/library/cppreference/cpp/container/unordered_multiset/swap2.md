# std::swap(std::unordered_multiset)

| Defined in header `<unordered_set>` |  |
| --- | --- |
| `template< class Key, class Hash, class KeyEqual, class Alloc > void swap( std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& lhs, std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& rhs );` | (since C++11) (until C++17) |
| `template< class Key, class Hash, class KeyEqual, class Alloc > void swap( std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& lhs, std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& rhs ) noexcept(/* see below */);` | (since C++17) |

Specializes the `std::swap` algorithm for `std::unordered_multiset`. Swaps the contents of `lhs` and `rhs`. Calls `lhs.swap(rhs)`.

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
#include <unordered_set>

int main()
{
    std::unordered_multiset<int> alice{1, 2, 3};
    std::unordered_multiset<int> bob{7, 8, 9, 10};

    auto print = [](const int& n) { std::cout << ' ' << n; };

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

Possible output:

```text
Alice: 1 2 3
Bobby: 7 8 9 10
-- SWAP
Alice: 7 8 9 10
Bobby: 1 2 3
```

### See also

swap swaps the contents (public member function)
