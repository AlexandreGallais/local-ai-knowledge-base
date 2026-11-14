# std::ranges::concat_view<Views...>::size

|  |  |  |
| --- | --- | --- |
| `constexpr auto size() requires(sized_range<Views> && ...);` | (1) | (since C++26) |
| `constexpr auto size() const requires(sized_range<const Views> && ...);` | (2) | (since C++26) |

Returns the number of elements.

Equivalent to `return std::apply ( [](auto... sizes) { using CT = ranges::common_type_t<decltype(sizes)...>; return (make-unsigned-like-t <CT>(sizes) + ...); }, tuple-transform (ranges::size, views_ ) );`.

### Return value

As described above.

### Complexity

Constant.

### Notes

The complexity of `concat_view` is constant time (even though in some cases it is a linear function of the number of ranges it concatenates which is a statically known parameter of this view) because time complexity as required by the ranges concepts are formally expressed with respect to the total number of elements (the size) of a given range, and not to the statically known parameters of that range.

### Example

The preliminary version can be checked out on Compiler Explorer.

```cpp
#include <cassert>
#include <forward_list>
#include <list>
#include <ranges>

int main()
{
    constexpr static auto a = {1, 2};
    constexpr static auto b = {1, 2, 3};
    constexpr static auto c = {1, 2, 3, 4};

    constexpr auto con{std::views::concat(a, b, c)};
    static_assert(std::ranges::sized_range<decltype(con)>);
    static_assert(con.size() == 2 + 3 + 4);

    std::forward_list d = b;
    static_assert(not std::ranges::sized_range<std::forward_list<int>>);
    const auto cat{std::views::concat(b, c, d)};
    static_assert(not std::ranges::sized_range<decltype(cat)>);
//  auto x = cat.size(); // error: cat is not sized_range because of d

    std::list e = c;
    const auto dog{std::views::concat(a, b, e)};
    static_assert(std::ranges::sized_range<decltype(dog)>);
    assert(dog.size() == 2 + 3 + 4);
}
```

### See also

|  |  |
| --- | --- |
| ranges::size (C++20) | returns an integer equal to the size of a range (customization point object) |
| ranges::ssize (C++20) | returns a signed integer equal to the size of a range (customization point object) |
