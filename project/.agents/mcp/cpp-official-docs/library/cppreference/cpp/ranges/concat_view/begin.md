# std::ranges::concat_view<Views...>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr /*iterator*/<false> begin() requires (!(/*simple-view*/<Views> && ...));` | (1) | (since C++26) |
| `constexpr /*iterator*/<true> begin() const requires (ranges::range<const Views> && ...) && /*concatable*/<const Views...>;` | (2) | (since C++26) |

Returns an iterator to the beginning of the `concat_view`.

1) Equivalent to `iterator <false> it(this, std::in_place_index<0>, ranges::begin(std::get<0>(views_ ))); it.template satisfy <0>(); return it;`.

2) Equivalent to `iterator <true> it(this, std::in_place_index<0>, ranges::begin(std::get<0>(views_ ))); it.template satisfy <0>(); return it;`.

### Return value

As specified above.

### Example

The preliminary version can be checked out on Compiler Explorer.

```cpp
#include <ranges>
#include <string_view>
using namespace std::literals;

int main()
{
    static constexpr auto c = {"🐱", "🐶"};
    static constexpr auto a = {"🤡"sv};
    static constexpr auto t = {"💚"sv};
    static constexpr auto cat{std::views::concat(c, a, t)};
    static_assert(*cat.begin() == "\U0001F431" and
                  cat.begin()[1] == "🐶" and
                  *(cat.begin() + 2) == "\N{CLOWN FACE}");
}
```

### See also

|  |  |
| --- | --- |
| end | returns an iterator or a sentinel to the end (public member function) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
