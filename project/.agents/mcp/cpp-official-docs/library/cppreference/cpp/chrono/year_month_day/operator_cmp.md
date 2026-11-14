# std::chrono::operator==,<=>(std::chrono::year_month_day)

| Defined in header `<chrono>` |  |  |
| --- | --- | --- |
| `constexpr bool operator==( const std::chrono::year_month_day& x, const std::chrono::year_month_day& y ) noexcept;` | (1) | (since C++20) |
| `constexpr std::strong_ordering operator<=>( const std::chrono::year_month_day& x, const std::chrono::year_month_day& y ) noexcept;` | (2) | (since C++20) |

Compares the two `year_month_day` values `x` and `y`. This is a lexicographical comparison: the `year()` is compared first, then `month()`, then `day()`.

The `<`, `<=`, `>`, `>=`, and `!=` operators are synthesized from `operator<=>` and `operator==` respectively.

### Return value

1) `x.year() == y.year() && x.month() == y.month() && x.day() == y.day()`

2) If `x.year() <=> y.year != 0`, `x.year() <=> y.year`; otherwise if `x.month() <=> y.month() != 0`, `x.month() <=> y.month()`; otherwise `x.day() <=> y.day()`.

### Notes

If both `x` and `y` represent valid dates (`x.ok() && y.ok() == true`), the result of the lexicographical comparison is consistent with the calendar order.

### Example

```cpp
#include <chrono>

int main()
{
    constexpr auto ymd1{std::chrono::day(13)/7/1337};
    constexpr auto ymd2{std::chrono::year(1337)/7/13};
    static_assert(ymd1 == ymd2);
    static_assert(ymd1 <= ymd2);
    static_assert(ymd1 >= ymd2);
    static_assert(ymd1 <=> ymd2 == 0);
}
```
