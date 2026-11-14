# std::chrono::operator+, std::chrono::operator- (std::chrono::year_month)

|  |  |  |
| --- | --- | --- |
| `constexpr std::chrono::year_month operator+( const std::chrono::year_month& ym, const std::chrono::years& dy ) noexcept;` | (1) | (since C++20) |
| `constexpr std::chrono::year_month operator+( const std::chrono::years& dy, const std::chrono::year_month& ym ) noexcept;` | (2) | (since C++20) |
| `constexpr std::chrono::year_month operator+( const std::chrono::year_month& ym, const std::chrono::months& dm ) noexcept;` | (3) | (since C++20) |
| `constexpr std::chrono::year_month operator+( const std::chrono::months& dm, const std::chrono::year_month& ym ) noexcept;` | (4) | (since C++20) |
| `constexpr std::chrono::year_month operator-( const std::chrono::year_month& ym, const std::chrono::years& dy ) noexcept;` | (5) | (since C++20) |
| `constexpr std::chrono::year_month operator-( const std::chrono::year_month& ym, const std::chrono::months& dm ) noexcept;` | (6) | (since C++20) |
| `constexpr std::chrono::months operator-( const std::chrono::year_month& ym1, const std::chrono::year_month& ym2 ) noexcept;` | (7) | (since C++20) |

1,2) Adds `dy.count()` years to `ym`.

3,4) Adds `dm.count()` months to `ym`.

5) Subtracts `dy.count()` years from `ym`.

6) Subtracts `dm.count()` months from `ym`.

7) Returns the difference in months between the two time points represented by `ym1` and `ym2`.

For durations that are convertible to both `std::chrono::years` and `std::chrono::months`, the `years` overloads (1,2,5) are preferred if the call would otherwise be ambiguous.

### Return value

1,2) `std::chrono::year_month(ym.year() + dy, ym.month())`

3,4) A `year_month` value `z` such that `z - ym == dm` and `z.ok() == true`.

5) `ym + -dy`

6) `ym + -dm`

7) `ym1.year() - ym2.year() + std::chrono::months(int(unsigned(ym1.month())) - int(unsigned(ym2.month())))`

### Notes

The result of subtracting two `year_month` values is a duration of type `std::chrono::months`. This duration unit represents the length of the average Gregorian month (30.436875 days), and the resulting duration bears no relationship to the actual number of days in the time period at issue. For example, the result of `2017y/3 - 2017y/2` is `std::chrono::months(1)`, even though February 2017 only contains 28 days.

### Example

```cpp
#include <cassert>
#include <chrono>

int main()
{
    auto ym{std::chrono::year(2021)/std::chrono::July};

    ym = ym + std::chrono::months(14);
    assert(ym.month() == std::chrono::September);
    assert(ym.year() == std::chrono::year(2022));

    ym = ym - std::chrono::years(3);
    assert(ym.month() == std::chrono::month(9));
    assert(ym.year() == std::chrono::year(2019));

    ym = ym + (std::chrono::September - std::chrono::month(2));
    assert(ym.month() == std::chrono::April);
    assert(ym.year() == std::chrono::year(2020));
}
```

### See also

operator+=, operator-= modifies the `year_month` by some number of months or years (public member function)
