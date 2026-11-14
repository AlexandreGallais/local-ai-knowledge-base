# std::chrono::year_month_weekday::operator sys_days, std::chrono::year_month_weekday::operator local_days

|  |  |  |
| --- | --- | --- |
| `constexpr operator std::chrono::sys_days() const noexcept;` | (1) | (since C++20) |
| `constexpr explicit operator std::chrono::local_days() const noexcept;` | (2) | (since C++20) |

Converts `*this` to a `std::chrono::time_point` representing the same date as this `year_month_weekday`.

1) If `year().ok() && month().ok() && weekday().ok()`:

- If `index() == 0`, returns a `sys_days` that represents the date 7 days prior to the first `weekday()` of the year and month.
- Else, returns a `sys_days` that represents the date `(index() - 1) * 7` days after the first `weekday()` of the year and month.

Otherwise, the returned value is unspecified.

2) Same as (1), but returns `local_days` instead of `sys_days`. Equivalent to `local_days(sys_days(*this).time_since_epoch())`.

### Example

```cpp
#include <chrono>
#include <iostream>
using namespace std::chrono;

int main()
{
    constexpr auto ymwd{Tuesday[2]/11/2021};
    std::cout << ymwd << '\n';
    // convert from field-based to serial-based to add hours
    constexpr auto sd = sys_days{ymwd} + 24h;
    std::cout << sd << '\n';
    constexpr auto ymd = floor<days>(sd);
    static_assert(ymd == November/10/2021);
}
```

Output:

```text
2021/Nov/Tue[2]
2021-11-10 00:00:00
```
