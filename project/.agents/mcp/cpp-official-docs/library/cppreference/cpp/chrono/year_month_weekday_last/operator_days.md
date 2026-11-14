# std::chrono::year_month_weekday_last::operator sys_days, std::chrono::year_month_weekday_last::operator local_days

|  |  |  |
| --- | --- | --- |
| `constexpr operator std::chrono::sys_days() const noexcept;` | (1) | (since C++20) |
| `constexpr explicit operator std::chrono::local_days() const noexcept;` | (2) | (since C++20) |

Converts `*this` to a `std::chrono::time_point` representing the same date as this `year_month_weekday_last`.

1) If `ok()` is `true`, returns a `sys_days` that represents the last `weekday()` of the `year()` and `month()`. Otherwise, the returned value is unspecified.

2) Same as (1), but returns `local_days` instead of `sys_days`. Equivalent to `local_days(sys_days(*this).time_since_epoch())`.

### Example

```cpp
#include <chrono>
#include <iostream>
using namespace std::chrono;

int main()
{
    constexpr auto ymwdl{Tuesday[last]/11/2021};
    static_assert(static_cast<local_days>(ymwdl) ==
                  static_cast<local_days>(November/30/2021));
    // convert from field-based to serial-based to add days
    constexpr auto sd = static_cast<sys_days>(ymwdl);
    constexpr year_month_day ymd{sd + days(42)};
    std::cout << ymd << '\n';
}
```

Output:

```text
2022-01-11
```
