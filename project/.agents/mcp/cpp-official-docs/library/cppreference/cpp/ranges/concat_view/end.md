# std::ranges::concat_view<Views...>::end

|  |  |  |
| --- | --- | --- |
| `constexpr auto end() requires (!(/*simple-view*/<Views> && ...));` | (1) | (since C++26) |
| `constexpr auto end() const requires (ranges::range<const Views> && ...) && /*concatable*/<const Views...>;` | (2) | (since C++26) |

Returns an iterator or `std::default_sentinel` that compares equal to the past-the-end iterator of the `concat_view`.

1) Equivalent to `constexpr auto N = sizeof...(Views); if constexpr (ranges::common_range<Views...[N - 1]>) return iterator <false>(this, std::in_place_index<N - 1>, ranges::end(std::get<N - 1>(views_ ))); else return std::default_sentinel;`.

2) Equivalent to `constexpr auto N = sizeof...(Views); if constexpr (ranges::common_range<const Views...[N - 1]>) return iterator <true>(this, std::in_place_index<N - 1>, ranges::end(std::get<N - 1>(views_ ))); else return std::default_sentinel;`.

### Return value

As described above.

### Example

The preliminary version can be checked out on Compiler Explorer.

```cpp
#include <concepts>
#include <iterator>
#include <ranges>

int main()
{
    static constexpr int p[]{37, 42, 69};
    static constexpr auto q = {19937, 1729};
    constexpr auto cat = std::ranges::views::concat(p, q);
    static_assert(not std::same_as<std::default_sentinel_t, decltype(cat.end())>);
    static_assert(cat.end()[-1] == 1729);
}
```

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
