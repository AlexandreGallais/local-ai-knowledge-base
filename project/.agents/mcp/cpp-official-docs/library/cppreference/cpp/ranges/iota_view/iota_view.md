# std::ranges::iota_view<W, Bound>::iota_view

|  |  |  |
| --- | --- | --- |
| `iota_view() requires std::default_initializable<W> = default;` | (1) | (since C++20) |
| `constexpr explicit iota_view( W value );` | (2) | (since C++20) |
| `constexpr explicit iota_view( std::type_identity_t<W> value, std::type_identity_t<Bound> bound );` | (3) | (since C++20) |
| `constexpr explicit iota_view( /*iterator*/ first, /* see below */ last );` | (4) | (since C++20) |

Constructs an `iota_view`.

| Overload | Data members |  |
| --- | --- | --- |
| `value_` | `bound_` |  |
| (1) | value-initialized | value-initialized |
| (2) | initialized with `value` |  |
| (3) | initialized with `bound` |  |
| (4) | initialized with `first.value_` | see below |

2,3) If any of the following conditions is satisfied, the behavior is undefined:

- `Bound()` is unreachable from `value`, unless `Bound` denotes `std::unreachable_sentinel_t`.
- `W` and `Bound` model `totally_ordered_with`, and `bool(value <= bound)` is `false`.

4) If any of the following conditions is satisfied, the behavior is undefined:

- `Bound()` is unreachable from `value`, unless `Bound` denotes `std::unreachable_sentinel_t`.
- `W` and `Bound` model `totally_ordered_with`, and `bool(first.value_ <= bound)` is `false`.

The type of `last` and the method of initializing `bound_` are determined by the type `Bound` denotes:

| The type `Bound` denotes | The type of `last` | `bound_` |
| --- | --- | --- |
| `W` | `iterator` | initialized with `last.value_` |
| `std::unreachable_sentinel_t` | `Bound` | initialized with `last` |
| any other type | `sentinel` | initialized with `last.bound_` |

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | the starting value |
| bound | - | the bound |
| first | - | the iterator denoting the starting value |
| last | - | the iterator or sentinel denoting the bound |

### Example

```cpp
#include <cassert>
#include <iostream>
#include <iterator>
#include <ranges>

int main()
{
    const auto l = {1, 2, 3, 4};

    auto i1 = std::ranges::iota_view<int, int>(); // overload (1)
    assert(i1.empty() and i1.size() == 0);

    auto i2 = std::ranges::iota_view(1); // overload (2)
    assert(not i2.empty() and i2.front() == 1);
    for (std::cout << "1) "; auto e : i2 | std::views::take(3))
        std::cout << e << ' ';
    std::cout << '\n';

    auto i3 = std::ranges::iota_view(std::begin(l)); // overload (2)
    assert(not i3.empty() and i3.front() == l.begin());
    for (std::cout << "2) "; auto e : i3 | std::views::take(4))
        std::cout << *e << ' ';
    std::cout << '\n';

    auto i4 = std::ranges::iota_view(1, 8); // overload (3)
    assert(not i4.empty() and i4.front() == 1 and i4.back() == 7);
    for (std::cout << "3) "; auto e : i4)
        std::cout << e << ' ';
    std::cout << '\n';

    auto i5 = std::ranges::iota_view(l.begin(), l.end()); // overload (4)
    for (std::cout << "4) "; auto e : i5)
        std::cout << *e << ' ';
    std::cout << '\n';

    auto i6 = std::ranges::iota_view(l.begin(), std::unreachable_sentinel); // (4)
    for (std::cout << "5) "; auto e : i6 | std::views::take(3))
        std::cout << *e << ' ';
    std::cout << '\n';
}
```

Output:

```text
1) 1 2 3
2) 1 2 3 4
3) 1 2 3 4 5 6 7
4) 1 2 3 4
5) 1 2 3
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3523 | C++20 | overload (4) might use wrong sentinel type | corrected |
| P2711R1 | C++20 | overloads (3,4) were not explicit | made explicit |
