# std::swap(std::deque)

| Defined in header `<deque>` |  |
| --- | --- |
| `template< class T, class Alloc > void swap( std::deque<T, Alloc>& lhs, std::deque<T, Alloc>& rhs );` | (until C++17) |
| `template< class T, class Alloc > void swap( std::deque<T, Alloc>& lhs, std::deque<T, Alloc>& rhs ) noexcept(/* see below */);` | (since C++17) |

Specializes the `std::swap` algorithm for `std::deque`. Swaps the contents of `lhs` and `rhs`. Calls `lhs.swap(rhs)`.

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
#include <deque>

int main()
{
    std::deque<int> alice{1, 2, 3};
    std::deque<int> bob{7, 8, 9, 10};

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

Output:

```text
Alice: 1 2 3
Bobby: 7 8 9 10
-- SWAP
Alice: 7 8 9 10
Bobby: 1 2 3
```

### See also

swap swaps the contents (public member function)
