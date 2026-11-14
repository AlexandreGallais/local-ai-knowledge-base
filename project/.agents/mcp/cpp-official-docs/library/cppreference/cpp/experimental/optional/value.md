# std::experimental::optional<T>::value

|  |  |  |
| --- | --- | --- |
| `constexpr T& value() &; constexpr const T & value() const &;` | (1) | (library fundamentals TS) |
| `constexpr T&& value() &&; constexpr const T&& value() const &&;` | (2) | (library fundamentals TS) |

Returns the contained value.

1) Equivalent to `return bool(*this) ? *val : throw bad_optional_access();`.

2) Equivalent to `return bool(*this) ? std::move(*val) : throw bad_optional_access();`.

### Parameters

(none)

### Return value

A reference to the contained value.

### Exceptions

`std::experimental::bad_optional_access` if `*this` does not contain a value.

### Notes

The dereference operator `operator*()` does not check if this optional contains a value, which may be more efficient than `value()`.

### Example

```cpp
#include <experimental/optional>
#include <iostream>

int main()
{
    std::experimental::optional<int> opt = {};

    try
    {
        int n = opt.value();
    }
    catch (const std::logic_error& e)
    {
        std::cout << e.what() << '\n';
    }
}
```

Possible output:

```text
optional<T>::value: not engaged
```

### See also

|  |  |
| --- | --- |
| value_or | returns the contained value if available, another value otherwise (public member function) |
| operator->, operator* | accesses the contained value (public member function) |
| bad_optional_access (library fundamentals TS) | exception indicating checked access to an optional that doesn't contain a value (class) |
