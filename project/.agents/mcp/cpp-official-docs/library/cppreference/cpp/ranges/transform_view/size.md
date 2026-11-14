# std::ranges::transform_view<V,F>::size

|  |  |
| --- | --- |
| `constexpr auto size() requires ranges::sized_range<V>;` | (since C++20) |
| `constexpr auto size() const requires ranges::sized_range<const V>;` | (since C++20) |

Returns the number of elements.

Returns `ranges::size(base_)`, where `base_` is the underlying view.

### Parameters

(none)

### Return value

The number of elements.

### Notes

If `V` does not model `forward_range`, `size()` might not be well-defined after a call to `begin()`.

### Example

```cpp
#include <cassert>
#include <cctype>
#include <iostream>
#include <ranges>
#include <string>

int main()
{
    std::string s{"The length of this string is 42 characters"};
    auto to_upper = [](unsigned char c) -> char { return std::toupper(c); };
    auto tv = std::ranges::transform_view{s, to_upper};
    assert(tv.size() == 42);
    for (auto x : tv)
        std::cout << x;
}
```

Output:

```text
THE LENGTH OF THIS STRING IS 42 CHARACTERS
```

### See also

|  |  |
| --- | --- |
| ranges::size (C++20) | returns an integer equal to the size of a range (customization point object) |
| ranges::ssize (C++20) | returns a signed integer equal to the size of a range (customization point object) |
