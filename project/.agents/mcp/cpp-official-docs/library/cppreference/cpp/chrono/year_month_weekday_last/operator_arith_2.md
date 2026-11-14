# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month_weekday_last)

|  |  |
| --- | --- |
| `constexpr std::chrono::year_month_weekday_last operator+( const std::chrono::year_month_weekday_last& ymwdl, const std::chrono::months& dm ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_weekday_last operator+( const std::chrono::months& dm, const std::chrono::year_month_weekday_last& ymwdl ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_weekday_last operator+( const std::chrono::year_month_weekday_last& ymwdl, const std::chrono::years& dy ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_weekday_last operator+( const std::chrono::years& dy, const std::chrono::year_month_weekday_last& ymwdl ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_weekday_last operator-( const std::chrono::year_month_weekday_last& ymwdl, const std::chrono::months& dm ) noexcept;` | (since C++20) |
| `constexpr std::chrono::year_month_weekday_last operator-( const std::chrono::year_month_weekday_last& ymwdl, const std::chrono::years& dy ) noexcept;` | (since C++20) |

1,2) Adds `dm.count()` months to the date represented by `ymwdl`. The result has the same `year()` and `month()` as `std::chrono::year_month(ymwdl.year(), ymwdl.month()) + dm` and the same `weekday()` as `ymwdl`.

3,4) Adds `dy.count()` years to the date represented by `ymwdl`. The result is equivalent to `std::chrono::year_month_weekday_last(ymwdl.year() + dy, ymwdl.month(), ymwd.weekday_last())`.

5) Subtracts `dm.count()` months from the date represented by `ymwdl`. Equivalent to `ymwdl + -dm`.

6) Subtracts `dy.count()` years from the date represented by `ymwdl`. Equivalent to `ymwdl + -dy`.

For durations that are convertible to both `std::chrono::years` and `std::chrono::months`, the `years` overloads (3,4,6) are preferred if the call would otherwise be ambiguous.

### Example

```cpp
#include <cassert>
#include <chrono>
using namespace std::chrono;

int main()
{
    constexpr auto ymwdl1{Tuesday[last]/11/2021};
    auto ymwdl2 = ymwdl1;
    ymwdl2 = std::chrono::months(12) + ymwdl2;
    ymwdl2 = ymwdl2 - std::chrono::years(1);
    assert(ymwdl1 == ymwdl2);
}
```
