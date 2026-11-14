# std::chrono::hh_mm_ss<Duration>::hh_mm_ss

|  |  |
| --- | --- |
| `constexpr hh_mm_ss() noexcept : hh_mm_ss{Duration::zero()} {}` | (1) |
| `constexpr explicit hh_mm_ss( Duration d );` | (2) |

Constructs a `hh_mm_ss` object.

1) Constructs a `hh_mm_ss` object corresponding to `Duration::zero()`.

2) Constructs a `hh_mm_ss` object corresponding to `d`:

- `is_negative()` returns `d < Duration::zero()`.
- `hours()` returns `std::chrono::duration_cast<std::chrono::hours>(abs(d))`.
- `minutes()` returns `std::chrono::duration_cast<std::chrono::minutes>(abs(d) - hours())`.
- `seconds()` returns `std::chrono::duration_cast<std::chrono::seconds>(abs(d) - hours() - minutes())`.
- `subseconds()` returns `abs(d) - hours() - minutes() - seconds()` if `std::chrono::treat_as_floating_point_v<precision::rep>` is `true`; otherwise it returns `std::chrono::duration_cast<precision>(abs(d) - hours() - minutes() - seconds())`.

### Parameters

d - the duration to be broken down

### Example

```cpp
#include <chrono>
#include <print>

int main()
{
    std::println("Default constructor: {}", std::chrono::hh_mm_ss<std::chrono::minutes>{});

    std::chrono::time_point now = std::chrono::system_clock::now();
    std::chrono::hh_mm_ss time_of_day{now - std::chrono::floor<std::chrono::days>(now)};
    std::println("The time of day is: {}", time_of_day);
}
```

Possible output:

```text
Default constructor: 00:00:00
The time of day is: 12:13:14.151617189
```
