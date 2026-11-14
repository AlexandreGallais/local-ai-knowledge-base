# std::ranges::split_view<V,Pattern>::end

`constexpr auto end() const;` (since C++20)

Returns an iterator or a sentinel representing the end of the resulting subrange. Equivalent to:

`constexpr auto end() { if constexpr (ranges::common_range<V>) return iterator{*this, ranges::end(base_), {}}; else return sentinel{*this}; }`

### Return value

An iterator or a sentinel.

### Example

```cpp
#include <cassert>
#include <ranges>
#include <string_view>

int main()
{
    constexpr std::string_view keywords{"bitand bitor bool break"};
    std::ranges::split_view kw{keywords, ' '};
    assert(4 == std::ranges::distance(kw.begin(), kw.end()));
}
```

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| end | returns an iterator or a sentinel to the end (public member function of `std::ranges::lazy_split_view<V,Pattern>`) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
