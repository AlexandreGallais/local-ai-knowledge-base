# std::swap(std::array)

| Defined in header `<array>` |  |
| --- | --- |
| `template< class T, std::size_t N > void swap( std::array<T, N>& lhs, std::array<T, N>& rhs );` | (since C++11) (until C++17) |
| `template< class T, std::size_t N > void swap( std::array<T, N>& lhs, std::array<T, N>& rhs ) noexcept(/* see below */);` | (since C++17) (constexpr since C++20) |

Specializes the `std::swap` algorithm for `std::array`. Swaps the contents of `lhs` and `rhs`. Calls `lhs.swap(rhs)`.

This overload participates in overload resolution only if `N == 0` or `std::is_swappable_v<T>` is `true`. (since C++17)

### Parameters

lhs, rhs - containers whose contents to swap

### Return value

(none)

### Complexity

Linear in size of the containers.

### Exceptions

`noexcept` specification: `noexcept(noexcept(lhs.swap(rhs)))` (since C++17)

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <array>

int main()
{
    std::array<int, 3> alice{1, 2, 3};
    std::array<int, 3> bob{7, 8, 9};

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
Bobby: 7 8 9
-- SWAP
Alice: 7 8 9
Bobby: 1 2 3
```

### See also

swap swaps the contents (public member function)
