# std::experimental::optional<T>::operator->, std::experimental::optional<T>::operator*

|  |  |  |
| --- | --- | --- |
| `constexpr const T* operator->() const;` | (1) | (library fundamentals TS) |
| `constexpr T* operator->();` | (1) | (library fundamentals TS) |
| `constexpr const T& operator*() const&;` | (2) | (library fundamentals TS) |
| `constexpr T& operator*() &;` | (2) | (library fundamentals TS) |
| `constexpr const T&& operator*() const&&;` | (2) | (library fundamentals TS) |
| `constexpr T&& operator*() &&;` | (2) | (library fundamentals TS) |

Accesses the contained value.

1) Returns a pointer to the contained value.

2) Returns a reference to the contained value.

The behavior is undefined if `*this` *does not contain a value*.

### Parameters

(none)

### Return value

Pointer or reference to the contained value.

### Exceptions

Throws nothing.

### Notes

This operator does not check whether the optional contains a value. If checked access is needed, `value()` or `value_or()` may be used.

### Example

```cpp
#include <experimental/optional>
#include <iostream>
#include <string>
using namespace std::literals;

int main()
{
    std::experimental::optional<int> opt1 = 1;
    std::cout << *opt1 << '\n';

    std::experimental::optional<std::string> opt2 = "abc"s;
    std::cout << opt2->size() << '\n';
}
```

Output:

```text
1
3
```

### See also

|  |  |
| --- | --- |
| value | returns the contained value (public member function) |
| value_or | returns the contained value if available, another value otherwise (public member function) |
