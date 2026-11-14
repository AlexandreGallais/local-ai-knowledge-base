# std::chrono::month_weekday_last::ok

`constexpr bool ok() const noexcept;` (since C++20)

Checks if the contained `month` and `weekday_last` objects are valid.

### Return value

`month().ok() && weekday_last().ok()`

### Example

```cpp
#include <chrono>
#include <iostream>

int main()
{
    std::cout << std::boolalpha;

    auto mwdl{std::chrono::March/std::chrono::Wednesday[std::chrono::last]};
    std::cout << (mwdl.ok()) << ' ';
    mwdl = {std::chrono::month(3)/std::chrono::weekday(42)[std::chrono::last]};
    std::cout << (mwdl.ok()) << '\n';
}
```

Output:

```text
true false
```
