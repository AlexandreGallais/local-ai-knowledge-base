# std::chrono::month_day_last::ok

`constexpr bool ok() const noexcept;` (since C++20)

Checks if the `month` object stored in `*this` is valid.

### Return value

`month().ok()`

### Example

```cpp
#include <cassert>
#include <chrono>

int main()
{
    auto mdl{std::chrono::February/std::chrono::last};
    assert(mdl.ok());
    mdl = {std::chrono::month(42)/std::chrono::last};
    assert(!mdl.ok());
}
```
