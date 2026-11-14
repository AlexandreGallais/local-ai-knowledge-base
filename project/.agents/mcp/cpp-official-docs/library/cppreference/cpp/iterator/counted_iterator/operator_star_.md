# std::counted_iterator<I>::operator*,->

|  |  |  |
| --- | --- | --- |
| `constexpr decltype(auto) operator*();` | (1) | (since C++20) |
| `constexpr decltype(auto) operator*() const requires /*dereferenceable*/<const I>;` | (2) | (since C++20) |
| `constexpr auto operator->() const noexcept requires std::contiguous_iterator<I>;` | (3) | (since C++20) |

1,2) Returns a reference to the current element. The behavior is undefined if `this->count() <= 0`. The function's body is equivalent to `return *current;`.

3) Returns a pointer to the current element. The function's body is equivalent to `return std::to_address(current);`.

### Parameters

(none)

### Return value

Reference or pointer to the current element.

### Example

```cpp
#include <complex>
#include <iostream>
#include <iterator>
using std::operator""i;

int main()
{
    const auto il = {1.i, 2.i, 3.i, 4.i, 5.i};

    for (std::counted_iterator i{il.begin() + 1, 3}; i != std::default_sentinel; ++i)
        std::cout << *i << ' ';
    std::cout << '\n';

    for (std::counted_iterator i{il.begin() + 1, 3}; i != std::default_sentinel; ++i)
        std::cout << i->imag() << ' ';
    std::cout << '\n';
}
```

Output:

```text
(0,2) (0,3) (0,4)
2 3 4
```

### See also

operator[] (C++20) accesses an element by index (public member function)
