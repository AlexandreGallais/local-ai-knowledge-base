# std::ranges::common_view<V>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr auto begin() requires (!__simple_view<V>);` | (1) | (since C++20) |
| `constexpr auto begin() const requires range<const V>;` | (2) | (since C++20) |

1) Returns an iterator to the first element of the `common_view`, that is:

- `ranges::begin(base_)`, if both `ranges::random_access_range<V>` and `ranges::sized_range<V>` are satisfied,
- `std::common_iterator<ranges::iterator_t<V>, ranges::sentinel_t<V>>(ranges::begin(base_))` otherwise.

Here `base_` (the name is for exposition only purposes) is the underlying view.

2) Same as (1), but `V` is const-qualified.

### Parameters

(none)

### Return value

An iterator to the beginning of the underlying view.

### Example

```cpp
#include <iostream>
#include <numeric>
#include <ranges>
#include <string_view>

int main()
{
    constexpr auto common = std::views::iota(1)
                          | std::views::take(3)
                          | std::views::common
                          ;

    for (int i{}; int e : common)
        std::cout << (i++ ? " + " : "") << e;

    std::cout << " = " << std::accumulate(common.begin(), common.end(), 0) << '\n';
}
```

Output:

```text
1 + 2 + 3 = 6
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 4012 | C++20 | non-const overload missed simple-view check | added |

### See also

|  |  |
| --- | --- |
| end | returns an iterator to the end (public member function) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
