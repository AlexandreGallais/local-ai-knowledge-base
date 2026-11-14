# std::chrono::day::operator+=, std::chrono::day::operator-=

|  |  |  |
| --- | --- | --- |
| `constexpr std::chrono::day& operator+=( const std::chrono::days& d ) noexcept;` | (1) | (since C++20) |
| `constexpr std::chrono::day& operator-=( const std::chrono::days& d ) noexcept;` | (2) | (since C++20) |

Adds or subtracts `d.count()` days from the day value.

1) Equivalent to `*this = *this + d;`.

2) Equivalent to `*this = *this - d;`.

### Return value

A reference to this `day` after modification.

### Notes

If the result would be outside the range `[``​0​``,``255``]`, the actual stored value is unspecified.

### Example

```cpp
#include <cassert>
#include <chrono>

int main()
{
    std::chrono::day d{15};

    d += std::chrono::days(2);
    assert(d == std::chrono::day(17));

    d -= std::chrono::days{3};
    assert(d == std::chrono::day(14));
}
```

### See also

|  |  |
| --- | --- |
| operator++, operator++(int), operator--, operator--(int) | increments or decrements the day (public member function) |
| operator+, operator- (C++20) | adds or subtracts a number of days and a `day`, or find the difference between two `day`s (function) |
