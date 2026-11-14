# std::chrono::year::operator+, std::chrono::year::operator-

|  |  |  |
| --- | --- | --- |
| `constexpr std::chrono::year operator+() noexcept;` | (1) | (since C++20) |
| `constexpr std::chrono::year operator-() noexcept;` | (2) | (since C++20) |

Applies the unary operators to the year value.

1) Returns a copy of `*this`.

2) Returns a `year` whose year value is the negation of that of `*this`.

### Return value

1) `*this`

2) `std::chrono::year(-int(*this))`

### Example

```cpp
#include <chrono>
#include <iostream>

int main()
{
    constexpr std::chrono::year y{2020};
    constexpr auto ny = -y;
    std::cout << "The year " << (int)y << " negated is " << (int)ny << '\n';
}
```

Output:

```text
The year 2020 negated is -2020
```
