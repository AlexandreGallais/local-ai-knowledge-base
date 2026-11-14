# std::ranges::chunk_by_view<V,Pred>::pred

`constexpr const Pred& pred() const;` (since C++23)

Returns a reference to the contained `Pred` object. Equivalent to `return *pred_;`.

The behavior is undefined if `pred_` does not contain a value.

### Parameters

(none)

### Return value

A reference to the contained `Pred` object.

### Example

```cpp
#include <cassert>
#include <concepts>
#include <functional>
#include <initializer_list>
#include <ranges>

int main()
{
    const auto v = {1, 1, 2, 2, 1, 1, 1};
    auto chunks = v | std::views::chunk_by(std::equal_to{});
    auto pred = chunks.pred();
    static_assert(std::same_as<decltype(pred), std::equal_to<>>);
    assert(pred(v.begin()[0], 1));
}
```
