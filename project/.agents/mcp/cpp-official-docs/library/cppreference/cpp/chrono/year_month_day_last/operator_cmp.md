# std::chrono::operator==,<=>(std::chrono::year_month_day_last)

| Defined in header `<chrono>` |  |  |
| --- | --- | --- |
| `constexpr bool operator==( const std::chrono::year_month_day_last& x, const std::chrono::year_month_day_last& y ) noexcept;` | (1) | (since C++20) |
| `constexpr std::strong_ordering operator<=>( const std::chrono::year_month_day_last& x, const std::chrono::year_month_day_last& y ) noexcept;` | (2) | (since C++20) |

Compares the two `year_month_day_last` values `x` and `y`. This is a lexicographical comparison: the `year()` is compared first, then `month()`.

The `<`, `<=`, `>`, `>=`, and `!=` operators are synthesized from `operator<=>` and `operator==` respectively.

### Return value

1) `x.year() == y.year() && x.month() == y.month()`

2) `x.year() <=> y.year() != 0 ? x.year() <=> y.year() : x.month() <=> y.month()`

### Notes

If both `x` and `y` represent valid dates (`x.ok() && y.ok() == true`), the result of the lexicographical comparison is consistent with the calendar order.

### Example

```cpp
#include <cassert>
#include <chrono>
#include <iostream>

int main()
{
    auto ymdl1{11/std::chrono::last/2020};
    auto mdl{std::chrono::last/std::chrono::November};
    auto ymdl2{mdl/2020};
    assert(ymdl1 == ymdl2);

    ymdl1 -= std::chrono::months{2};
    ymdl2 -= std::chrono::months{1};
    assert(ymdl1 < ymdl2);
}
```
