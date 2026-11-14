# std::chrono::operator+, std::chrono::operator- (std::chrono::weekday)

| Defined in header `<chrono>` |  |  |
| --- | --- | --- |
| `constexpr std::chrono::weekday operator+( const std::chrono::weekday& wd, const std::chrono::days& d ) noexcept;` | (1) | (since C++20) |
| `constexpr std::chrono::weekday operator+( const std::chrono::days& d, const std::chrono::weekday& wd ) noexcept;` | (2) | (since C++20) |
| `constexpr std::chrono::weekday operator-( const std::chrono::weekday& wd, const std::chrono::days& d ) noexcept;` | (3) | (since C++20) |
| `constexpr std::chrono::days operator-( const std::chrono::weekday& wd1, const std::chrono::weekday& wd2 ) noexcept;` | (4) | (since C++20) |

1,2) Adds `d.count()` days to `wd`. The weekday value held in the result is computed by first evaluating `static_cast<long long>(wd.c_encoding()) + d.count()` and reducing it modulo 7 to an integer in the range `[``​0​``,``6``]`.

3) Subtracts `d.count()` days from `wd`. Equivalent to `return wd + -d;`.

4) If `wd1.ok()` and `wd2.ok()` are both `true`, returns a `std::chrono::days` value `d` such that `d.count()` is in the range `[``​0​``,``6``]` and `wd2 + d == wd1`. Otherwise the returned value is unspecified.

### Return value

1-3) A `std::chrono::weekday` holding a weekday value calculated as described above.

4) A `std::chrono::days` representing the distance between `wd1` and `wd2`.

### Notes

As long as the computation doesn't overflow, (1-3) always return a valid `weekday` even if `wd.ok()` is `false`.

### Example

```cpp
#include <chrono>
#include <iostream>

int main()
{
    std::cout << std::boolalpha;

    std::chrono::weekday wd{4};
    wd = wd + std::chrono::days(2);
    std::cout << (wd == std::chrono::weekday(6)) << ' '
              << (wd == std::chrono::Saturday) << ' ';

    wd = wd - std::chrono::days(3);
    std::cout << (wd == std::chrono::weekday(3)) << ' '
              << (wd == std::chrono::Wednesday) << ' ';

    wd = std::chrono::Tuesday;
    wd = wd + std::chrono::days{8}; // (((2 + 8) == 10) % 7) == 3;
    std::cout << (wd == std::chrono::Wednesday) << ' ';

    wd = wd + (std::chrono::Sunday - std::chrono::Thursday); // (3 + 3) == 6
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
| operator+=, operator-= | adds or subtracts a number of days (public member function) |
