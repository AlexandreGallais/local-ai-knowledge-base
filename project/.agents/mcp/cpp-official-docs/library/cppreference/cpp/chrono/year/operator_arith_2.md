# std::chrono::operator+, std::chrono::operator- (std::chrono::year)

|  |  |  |
| --- | --- | --- |
| `constexpr std::chrono::year operator+( const std::chrono::year& y, const std::chrono::years& ys ) noexcept;` | (1) | (since C++20) |
| `constexpr std::chrono::year operator+( const std::chrono::years& ys, const std::chrono::year& y ) noexcept;` | (2) | (since C++20) |
| `constexpr std::chrono::year operator-( const std::chrono::year& y, const std::chrono::years& ys ) noexcept;` | (3) | (since C++20) |
| `constexpr std::chrono::years operator-( const std::chrono::year& y1, const std::chrono::year& y2 ) noexcept;` | (4) | (since C++20) |

1,2) Adds `ys.count()` years to `y`.

3) Subtracts `ys.count()` years from `y`.

4) Returns the difference in years between `y1` and `y2`.

### Return value

1,2) `std::chrono::year(int(y) + ys.count())`

3) `std::chrono::year(int(y) - ys.count())`

4) `std::chrono::years(int(y1) - int(y2))`

### Notes

If the resulting year value for (1-3) is outside the range `[``-32767``,``32767``]`, the actual value stored is unspecified.

The result of subtracting two `year` values is a duration of type `std::chrono::years`. This duration unit represents the length of the average Gregorian year, and the resulting duration bears no relationship to the number of days in the particular years represented by the operands. For example, the result of `2018y - 2017y` is `std::chrono::years(1)`, which represents 365.2425 days, not 365 days.

### Example

```cpp
#include <cassert>
#include <chrono>

int main()
{
    std::chrono::year y{2020};

    y = std::chrono::years(12) + y; // overload (2): duration + time point
    assert(y == std::chrono::year(2032));

    y = y - std::chrono::years(33); // overload (3): time point - duration
    assert(y == std::chrono::year(1999));

    // y = std::chrono::years(33) - y; // not supported: duration - time point

    using namespace std::chrono;
    constexpr std::chrono::years ys = 2025y - 2020y; // overload (4)
    static_assert(ys == std::chrono::years(5));
}
```

### See also

|  |  |
| --- | --- |
| operator++, operator++(int), operator--, operator--(int) | increments or decrements the month (public member function of `std::chrono::month`) |
| operator+=, operator-= | adds or subtracts a number of months (public member function of `std::chrono::month`) |
