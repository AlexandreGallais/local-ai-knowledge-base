# std::ranges::drop_while_view<V,Pred>::end

`constexpr auto end();` (since C++20)

Returns a sentinel or an iterator representing the end of the `drop_while_view`.

Effectively returns `ranges::end(base_)`, where `base_` is the underlying view.

### Parameters

(none)

### Return value

A sentinel or an iterator representing the end of the view.

### Example

```cpp
#include <cassert>
#include <iostream>
#include <ranges>

int main()
{
    static constexpr auto data = {0, -1, -2, 3, 1, 4, 1, 5};
    auto view = std::ranges::drop_while_view{data, [](int x) { return x <= 0; }};
    assert(view.end()[-1] == 5);
}
```

### See also

begin returns an iterator to the beginning (public member function)
