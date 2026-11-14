# std::inplace_vector<T,N>::swap

`constexpr void swap( inplace_vector& other ) noexcept(/* see below */);` (since C++26)

Exchanges the contents of the container with those of `other`. Does not cause iterators and references to associate with the other container.

### Parameters

other - container to exchange the contents with

### Return value

(none)

### Exceptions

`noexcept` specification:

`noexcept(N == 0 || (std::is_nothrow_swappable_v<T> && std::is_nothrow_move_constructible_v<T>))`

### Complexity

Linear in size of the container.

### Example

```cpp
#include <inplace_vector>
#include <print>

int main()
{
    std::inplace_vector<int, 3> a1{1, 2, 3}, a2{4, 5, 6};

    auto i1 = a1.begin();
    auto i2 = a2.begin();
    int& r1 = a1[1];
    int& r2 = a2[1];

    auto print_them_all = [&](auto rem)
    {
        std::println("{}a1 = {}, a2 = {}, *i1 = {}, *i2 = {}, r1 = {}, r2 = {}",
                     rem, a1, a2, *i1, *i2, r1, r2);
    };

    print_them_all("Before swap:\n");
    a1.swap(a2);
    print_them_all("After swap:\n");

    // Note that after swap() iterators and references stay associated with their
    // original sites, e.g., i1 points to element a1[0], r1 refers to a1[1].
}
```

Output:

```text
Before swap:
a1 = [1, 2, 3], a2 = [4, 5, 6], *i1 = 1, *i2 = 4, r1 = 2, r2 = 5
After swap:
a1 = [4, 5, 6], a2 = [1, 2, 3], *i1 = 4, *i2 = 1, r1 = 5, r2 = 2
```

### See also

std::swap(std::inplace_vector) (C++26) specializes the `std::swap` algorithm (function template)
