# std::chrono::operator==(std::chrono::weekday_last)

| Defined in header `<chrono>` |  |
| --- | --- |
| `constexpr bool operator==( const std::chrono::weekday_last& x, const std::chrono::weekday_last& y ) noexcept;` | (since C++20) |

Compares the two `weekday_last` values `x` and `y`.

The `!=` operator is synthesized from `operator==`.

### Return value

`x.weekday() == y.weekday()`

### Example

```cpp
#include <chrono>
#include <iostream>

int main()
{
    constexpr auto wdl1{std::chrono::Tuesday[std::chrono::last]};
    constexpr std::chrono::weekday_last wdl2{std::chrono::weekday(2)};
    std::cout << std::boolalpha
              << (wdl1 == wdl2) << ' '
              << (wdl1 == std::chrono::Wednesday[std::chrono::last]) << '\n';
}
```

Output:

```text
true false
```
