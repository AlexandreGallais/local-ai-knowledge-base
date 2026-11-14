# std::expected<T,E>::operator->, std::expected<T,E>::operator*

|  |  |  |
| --- | --- | --- |
| Primary template |  |  |
| `constexpr const T* operator->() const noexcept;` | (1) | (since C++23) |
| `constexpr T* operator->() noexcept;` | (2) | (since C++23) |
| `constexpr const T& operator*() const& noexcept;` | (3) | (since C++23) |
| `constexpr T& operator*() & noexcept;` | (4) | (since C++23) |
| `constexpr const T&& operator*() const&& noexcept;` | (5) | (since C++23) |
| `constexpr T&& operator*() && noexcept;` | (6) | (since C++23) |
| `void` partial specialization |  |  |
| `constexpr void operator*() const noexcept;` | (7) | (since C++23) |

Accesses the expected value contained in `*this`.

1,2) Returns a pointer to the expected value.

3-6) Returns a reference to the expected value.

7) Returns nothing.

If `has_value()` is `false`, the behavior is undefined.

### Return value

1,2) `std::addressof(val)`

3,4) `val`

5,6) `std::move(val)`

### Notes

These operators do not check whether the optional represents an expected value! You can do so manually by using `has_value()` or simply `operator bool()`. Alternatively, if checked access is needed, `value()` or `value_or()` may be used.

### Example

```cpp
#include <cassert>
#include <expected>
#include <iomanip>
#include <iostream>
#include <string>

int main()
{
    using namespace std::string_literals;

    std::expected<int, std::string> ex1 = 6;
    assert(*ex1 == 6);

    *ex1 = 9;
    assert(*ex1 == 9);

    // *ex1 = "error"s; // error, ex1 contains an expected value of type int
    ex1 = std::unexpected("error"s);
    // *ex1 = 13; // UB, ex1 contains an unexpected value
    assert(ex1.value_or(42) == 42);

    std::expected<std::string, bool> ex2 = "Moon"s;
    std::cout << "ex2: " << std::quoted(*ex2) << ", size: " << ex2->size() << '\n';

    // You can "take" the expected value by calling operator* on an std::expected rvalue

    auto taken = *std::move(ex2);
    std::cout << "taken " << std::quoted(taken) << "\n"
                 "ex2: " << std::quoted(*ex2) << ", size: " << ex2->size() << '\n';
}
```

Possible output:

```text
ex2: "Moon", size: 4
taken "Moon"
ex2: "", size: 0
```

### See also

|  |  |
| --- | --- |
| value | returns the expected value (public member function) |
| value_or | returns the expected value if present, another value otherwise (public member function) |
| operator bool, has_value | checks whether the object contains an expected value (public member function) |
| error | returns the unexpected value (public member function) |
