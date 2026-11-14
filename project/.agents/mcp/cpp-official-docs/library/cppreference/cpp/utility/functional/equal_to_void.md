# std::equal_to<void>

| Defined in header `<functional>` |  |
| --- | --- |
| `template<> class equal_to<void>;` | (since C++14) |

`std::equal_to<void>` is a specialization of `std::equal_to` with parameter and return type deduced.

### Nested types

| Nested type | Definition |
| --- | --- |
| `is_transparent` | unspecified |

### Member functions

**operator()** tests if the two arguments compare equal (public member function)

## std::equal_to<void>::operator()

`template< class T, class U > constexpr auto operator()( T&& lhs, U&& rhs ) const -> decltype(std::forward<T>(lhs) == std::forward<U>(rhs));`

Returns the result of equality comparison between `lhs` and `rhs`.

### Parameters

lhs, rhs - values to compare

### Return value

`std::forward<T>(lhs) == std::forward<U>(rhs)`.

### Example

```cpp
#include <functional>

int main()
{
    constexpr int a = 0, b = 8;
    std::equal_to<> equal{};
    static_assert(equal(a, a));
    static_assert(!equal(a, b));
}
```
