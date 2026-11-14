# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month_weekday)

|  |  |  |
| --- | --- | --- |
| `constexpr std::chrono::year_month_weekday operator+( const std::chrono::year_month_weekday& ymwd, const std::chrono::months& dm ) noexcept;` | (1) | (since C++20) |
| `constexpr std::chrono::year_month_weekday operator+( const std::chrono::months& dm, const std::chrono::year_month_weekday& ymwd ) noexcept;` | (2) | (since C++20) |
| `constexpr std::chrono::year_month_weekday operator+( const std::chrono::year_month_weekday& ymwd, const std::chrono::years& dy ) noexcept;` | (3) | (since C++20) |
| `constexpr std::chrono::year_month_weekday operator+( const std::chrono::years& dy, const std::chrono::year_month_weekday& ymwd ) noexcept;` | (4) | (since C++20) |
| `constexpr std::chrono::year_month_weekday operator-( const std::chrono::year_month_weekday& ymwd, const std::chrono::months& dm ) noexcept;` | (5) | (since C++20) |
| `constexpr std::chrono::year_month_weekday operator-( const std::chrono::year_month_weekday& ymwd, const std::chrono::years& dy ) noexcept;` | (6) | (since C++20) |

1,2) Adds `dm.count()` months to the date represented by `ymwd`. The result has the same `year()` and `month()` as `std::chrono::year_month(ymwd.year(), ymwd.month()) + dm` and the same `weekday()` and `index()` as `ymwd`.

3,4) Adds `dy.count()` years to the date represented by `ymwd`. The result is equivalent to `std::chrono::year_month_weekday(ymwd.year() + dy, ymwd.month(), ymwd.weekday_indexed())`.

5) Subtracts `dm.count()` months from the date represented by `ymwd`. Equivalent to `ymwd + -dm`.

6) Subtracts `dy.count()` years from the date represented by `ymwd`. Equivalent to `ymwd + -dy`.

For durations that are convertible to both `std::chrono::years` and `std::chrono::months`, the `years` overloads (3,4,6) are preferred if the call would otherwise be ambiguous.

### Notes

Even if `ymwd.ok()` is `true`, the resulting `year_month_weekday` may not represent a valid date if `ymwd.index()` is `5`.

### Example

```cpp
#include <cassert>
#include <chrono>
#include <iostream>

int main()
{
    auto ymwdi{1/std::chrono::Wednesday[1]/2021};
    std::cout << ymwdi << '\n';

    ymwdi = std::chrono::years(5) + ymwdi;
    // First Wednesday in January, 2026
    std::cout << ymwdi << '\n';
    assert(static_cast<std::chrono::year_month_day>(ymwdi) ==
           std::chrono::January/7/2026);

    ymwdi = ymwdi - std::chrono::months(6);
    // First Wednesday in July, 2025
    std::cout << ymwdi << '\n';
    assert(static_cast<std::chrono::year_month_day>(ymwdi) ==
           std::chrono::July/2/2025);
}
```

Output:

```text
2021/Jan/Wed[1]
2026/Jan/Wed[1]
2025/Jul/Wed[1]
```
