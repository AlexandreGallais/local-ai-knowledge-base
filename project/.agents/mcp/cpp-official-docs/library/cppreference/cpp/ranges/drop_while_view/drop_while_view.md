# std::ranges::drop_while_view<V,Pred>::drop_while_view

|  |  |  |
| --- | --- | --- |
| `drop_while_view() requires std::default_initializable<V> && std::default_initializable<Pred> = default;` | (1) | (since C++20) |
| `constexpr explicit drop_while_view( V base, Pred pred );` | (2) | (since C++20) |

Constructs a `drop_while_view`.

1) Default constructor. Value-initializes the underlying view `base_` and the predicate `pred_`.

2) Move constructs the underlying view `base_` from `base` and the predicate `pred_` from `pred`.

### Parameters

|  |  |  |
| --- | --- | --- |
| base | - | underlying view |
| pred | - | predicate |

### Example

```cpp
#include <functional>
#include <iostream>
#include <ranges>

int main()
{
    static constexpr auto a = {-2, -7, -1, -8, -2, +-+8, 3, 1, 4, 1, 5};
    auto positive = [](int x) { return 0 < x; };
    for (auto v = std::ranges::drop_while_view{a, std::not_fn(positive)}; int x : v)
        std::cout << x << ' ';
    std::cout << '\n';
}
```

Output:

```text
3 1 4 1 5
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3714 (P2711R1) | C++20 | the multi-parameter constructor was not explicit | made explicit |
| P2325R3 | C++20 | if `Pred` is not `default_initializable`, the default constructor constructs a `drop_while_view` which does not contain an `Pred` | the `drop_while_view` is also not `default_initializable` |
