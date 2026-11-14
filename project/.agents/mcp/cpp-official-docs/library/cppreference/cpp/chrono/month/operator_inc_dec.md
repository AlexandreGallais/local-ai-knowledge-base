# std::chrono::month::operator++, std::chrono::month::operator--

|  |  |  |
| --- | --- | --- |
| `constexpr std::chrono::month& operator++() noexcept;` | (1) | (since C++20) |
| `constexpr std::chrono::month operator++( int ) noexcept;` | (2) | (since C++20) |
| `constexpr std::chrono::month& operator--() noexcept;` | (3) | (since C++20) |
| `constexpr std::chrono::month operator--( int ) noexcept;` | (4) | (since C++20) |

Adds or subtracts 1 from the month value, reducing the result modulo 12 to an integer in the range `[``1``,``12``]`.

1,2) Performs `*this += std::chrono::months{1};`.

3,4) Performs `*this -= std::chrono::months{1};`.

### Parameters

(none)

### Return value

1,3) A reference to this `month` after modification.

2,4) A copy of the `month` made before modification.

### Notes

After a call to one of these functions, `ok()` is always `true`.

### Example

```cpp
#include <cassert>
#include <chrono>
#include <iostream>

int main()
{
    std::chrono::month m{6};

    ++m;
    assert(m == std::chrono::month(7));

    --m;
    assert(m == std::chrono::month(6));

    m = std::chrono::December;
    m++; // rounds up to January
    assert(m.ok());
    std::cout << unsigned(m) << '\n';

    m = std::chrono::January;
    m--; // rounds down to December
    assert(m.ok());
    std::cout << unsigned(m) << '\n';
}
```

Output:

```text
1
12
```

### See also

|  |  |
| --- | --- |
| operator+=, operator-= | adds or subtracts a number of months (public member function) |
| operator+, operator- (C++20) | performs arithmetic on `month`s (function) |
