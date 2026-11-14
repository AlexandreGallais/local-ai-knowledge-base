# std::chrono::year::max

`static constexpr year max() noexcept;` (since C++20)

Returns the largest possible `year`, that is, `std::chrono::year(32767)`.

### Return value

`std::chrono::year(32767)`

### Example

```cpp
#include <chrono>
#include <iostream>

int main()
{
    std::cout << "The maximum year is: " << (int)std::chrono::year::max() << '\n';
}
```

Output:

```text
The maximum year is: 32767
```
