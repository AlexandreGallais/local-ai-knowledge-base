# std::ranges::iota_view<W, Bound>::empty

`constexpr bool empty() const;` (since C++20)

Checks whether the range is empty (i.e. whether the beginning value is the same as the sentinel value).

### Return value

`value_ == bound_`

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    auto a = std::ranges::iota_view<int, int>();
    assert(a.empty());

    auto b = std::ranges::iota_view(4);
    assert(!b.empty());

    auto c = std::ranges::iota_view(4, 8);
    assert(!c.empty());
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 4001 | C++20 | the inherited member `empty` function was not always valid | `empty` is always provided |

### See also

size returns the number of elements. Provided only if the underlying (adapted) range satisfies `sized_range`. (public member function)
