# std::ranges::take_while_view<V,Pred>::base

|  |  |  |
| --- | --- | --- |
| `constexpr V base() const& requires std::copy_constructible<V>;` | (1) | (since C++20) |
| `constexpr V base() &&;` | (2) | (since C++20) |

Returns a copy of the underlying view.

1) Copy constructs the result from the underlying view `base_`.

2) Move constructs the result from the underlying view `base_`.

### Parameters

(none)

### Return value

A copy of the underlying view.

### Example

```cpp
#include <iostream>
#include <ranges>

namespace stq {
void println(auto, const auto& v)
{
    for (const auto& e : v)
        std::cout << e << ' ';
    std::cout << '\n';
}
}

int main()
{
    static constexpr int a[]{1, 2, 3, 4, 5};
    constexpr auto view = a | std::views::take_while([](int x){ return x < 4; });
    stq::println("{}", view);
    const auto base = view.base();
    stq::println("{}", base);
}
```

Output:

```text
1 2 3
1 2 3 4 5
```

### See also

pred returns a reference to the stored predicate (public member function)
