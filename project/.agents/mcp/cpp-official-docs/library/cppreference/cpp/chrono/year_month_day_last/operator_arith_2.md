# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month_day_last)

| Defined in header `<chrono>` |  |
| --- | --- |
| `constexpr std::chrono::year_month_day_last operator+( const std::chrono::year_month_day_last& ymdl, const std::chrono::months& dm ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_day_last operator+( const std::chrono::months& dm, const std::chrono::year_month_day_last& ymdl ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_day_last operator+( const std::chrono::year_month_day_last& ymdl, const std::chrono::years& dy ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_day_last operator+( const std::chrono::years& dy, const std::chrono::year_month_day_last& ymdl ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_day_last operator-( const std::chrono::year_month_day_last& ymdl, const std::chrono::months& dm ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_day_last operator-( const std::chrono::year_month_day_last& ymdl, const std::chrono::years& dy ) noexcept;` | (since C++20) |

1,2) Adds `dm.count()` months to the date represented by `ymdl`. The result has the same `year()` and `month()` as `std::chrono::year_month(ymdl.year(), ymdl.month()) + dm`.

3,4) Adds `dy.count()` years to the date represented by `ymdl`. The result is equivalent to `std::chrono::year_month_day_last(ymdl.year() + dy, ymdl.month_day_last())`.

5) Subtracts `dm.count()` months from the date represented by `ymdl`. Equivalent to `ymdl + -dm`.

6) Subtracts `dy.count()` years from the date represented by `ymdl`. Equivalent to `ymdl + -dy`.

For durations that are convertible to both `std::chrono::years` and `std::chrono::months`, the `years` overloads (3,4,6) are preferred if the call would otherwise be ambiguous.

### Example

```cpp
#include <cassert>
#include <chrono>
#include <iostream>

int main()
{
    auto ymdl{11/std::chrono::last/2020};
    std::cout << ymdl << '\n';

    ymdl = std::chrono::years(10) + ymdl;
    std::cout << ymdl << '\n';
    assert(ymdl == std::chrono::day(30)/
                   std::chrono::November/
                   std::chrono::year(2030));

    ymdl = ymdl - std::chrono::months(6);
    std::cout << ymdl << '\n';
    assert(ymdl == std::chrono::day(31)/
                   std::chrono::May/
                   std::chrono::year(2030));
}
```

Output:

```text
2020/Nov/last
2030/Nov/last
2030/May/last
```
