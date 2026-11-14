# std::ranges::cartesian_product_view<First, Vs...>::end

|  |  |  |
| --- | --- | --- |
| `constexpr iterator<false> end() requires ((!/*simple-view*/<First> \|\| ... \|\| !/*simple-view*/<Vs>) && /*cartesian-product-is-common*/<First, Vs...>);` | (1) | (since C++23) |
| `constexpr iterator<true> end() const requires /*cartesian-product-is-common*/<const First, const Vs...>;` | (2) | (since C++23) |
| `constexpr std::default_sentinel_t end() const noexcept;` | (3) | (since C++23) |

Returns an iterator or a sentinel representing the end of the `cartesian_product_view`.

Let `bases_` be the underlying tuple of views.

1,2) Equivalent to

`auto check = [](auto& rng) { return __begin_or_first_end(rng); }; return iterator<__is_const>(/*tuple-transform*/(check, bases_));`,

where:

- `__is_const` is `true` for the *const-qualified* overload, and `false` otherwise.
- `__is_empty` is `true` if the expression `ranges::empty(rng)` is `true` for any `rng` among the underlying ranges except the first one and `false` otherwise.
- `__begin_or_first_end(rng)` is expression-equivalent to `__is_empty ? ranges::begin(rng) : /*cartesian-common-arg-end*/(rng)` if `rng` is the first underlying range and `ranges::begin(rng)` otherwise.

3) Equivalent to: `return std::default_sentinel;`.

### Parameters

(none)

### Return value

An iterator to the element following the last element, or a sentinel which compares equal to the end iterator.

### Example

```cpp
#include <array>
#include <format>
#include <iostream>
#include <ranges>
#include <string_view>
#include <tuple>
using namespace std::literals;

int main()
{
    constexpr auto a = std::array{ "bool"sv, "goto"sv, "extern"sv, "long"sv }; /*
                                       ^         ^           ^         ^        */
    constexpr auto v = std::ranges::cartesian_product_view(a[0], a[1], a[2], a[3]);

    constexpr std::tuple<char const&,
                         char const&,
                         char const&,
                         char const&> last{*(v.end() - 1)};

    std::cout << std::format("{}{}{}{}{}",
                             std::get<0>(last),
                             std::get<1>(last),
                             std::get<2>(last),
                             std::get<3>(last), '\n');
}
```

Output:

```text
long
```

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
