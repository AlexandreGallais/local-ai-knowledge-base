# std::swap(std::inplace_vector)

| Defined in header `<inplace_vector>` |  |
| --- | --- |
| `constexpr friend void swap( std::inplace_vector& lhs, std::inplace_vector& rhs ) noexcept(/* see below */);` | (since C++26) |

Specializes the `std::swap` algorithm for `std::inplace_vector`. Swaps the contents of `lhs` and `rhs`. Calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - containers whose contents to swap

### Return value

(none)

### Complexity

Linear in size of the containers.

### Exceptions

`noexcept` specification:

`noexcept(N == 0 || (std::is_nothrow_swappable_v<T> && std::is_nothrow_move_constructible_v<T>))`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <inplace_vector>

int main()
{
    std::inplace_vector<int, 4> alice{1, 2, 3};
    std::inplace_vector<int, 4> bob{7, 8, 9, 10};

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
