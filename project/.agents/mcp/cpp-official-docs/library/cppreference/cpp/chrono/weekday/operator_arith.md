# std::chrono::weekday::operator+=, std::chrono::weekday::operator-=

|  |  |  |
| --- | --- | --- |
| `constexpr std::chrono::weekday& operator+=( const std::chrono::days& d ) noexcept;` | (1) | (since C++20) |
| `constexpr std::chrono::weekday& operator-=( const std::chrono::days& d ) noexcept;` | (2) | (since C++20) |

Adds or subtracts `d.count()` from the weekday value, reducing the result modulo 7 to an integer in the range `[``​0​``,``6``]`.

1) Performs `*this = *this + d;`.

2) Performs `*this = *this - d;`.

### Return value

A reference to this `weekday` after modification.

### Notes

After a call to one of these functions, `ok()` is always true if no overflow occurred during the operation.

### Example

```cpp
#include <chrono>
#include <iostream>

int main()
{
    std::cout << std::boolalpha;

    std::chrono::weekday wd{5}; // Friday is 5
    wd += std::chrono::days(2);
    std::cout << (wd == std::chrono::weekday(0)) << ' '
              << (wd == std::chrono::Sunday) << ' ';

    wd -= std::chrono::days(3);
    std::cout << (wd == std::chrono::weekday(4)) << ' '
              << (wd == std::chrono::Thursday) << ' ';

    wd = std::chrono::Wednesday;
    wd += std::chrono::days{8}; // ((3 += 8 == 11) % 7) == 4;
    std::cout << (wd == std::chrono::Thursday) << ' ';

    wd -= (std::chrono::Sunday - std::chrono::Tuesday); // -= -2
    // (4 -= -2) == 6
    std::cout << (wd == std::chrono::Saturday) << '\n';
}
```

Output:

```text
true true true true true true
```

### See also

|  |  |
| --- | --- |
| operator++, operator++(int), operator--, operator--(int) | increments or decrements the weekday (public member function) |
| operator+, operator- (C++20) | performs arithmetic on `weekday`s (function) |
