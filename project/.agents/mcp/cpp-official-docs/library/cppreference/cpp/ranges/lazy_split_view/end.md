# std::ranges::lazy_split_view<V,Pattern>::end

|  |  |  |
| --- | --- | --- |
| `constexpr auto end() requires ranges::forward_range<V> && ranges::common_range<V>;` | (1) | (since C++20) |
| `constexpr auto end() const;` | (2) | (since C++20) |

Returns an iterator or sometimes a sentinel representing the end of the `view`. Let `base_` be the underlying view.

1) Returns an iterator. Equivalent to: `return /*outer_iterator*/</*simple_view*/<V>>{*this, ranges::end(base_)};`.

2) Returns an `outer_iterator` or a `std::default_sentinel`.

Equivalent to:

```cpp
if constexpr (ranges::forward_range<V> && ranges::forward_range<const V> &&
              ranges::common_range<const V>)
    return /*outer_iterator*/<true>{*this, ranges::end(base_)};
else
    return std::default_sentinel;
```

### Return value

An `outer_iterator` or a `std::default_sentinel` representing the end of the `view`.

### Example

```cpp
#include <iostream>
#include <ranges>
#include <string_view>

int main()
{
    constexpr std::string_view keywords{"false float for friend"};
    std::ranges::lazy_split_view kw{keywords, ' '};
    const auto count = std::ranges::distance(kw.begin(), kw.end());
    std::cout << "Words count: " << count << '\n';
}
```

Output:

```text
Words count: 4
```

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| end | returns an iterator or a sentinel to the end (public member function of `std::ranges::split_view<V,Pattern>`) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
