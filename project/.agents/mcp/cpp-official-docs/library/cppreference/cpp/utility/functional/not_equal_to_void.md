# std::not_equal_to<void>

| Defined in header `<functional>` |  |
| --- | --- |
| `template<> class not_equal_to<void>;` | (since C++14) |

`std::not_equal_to<void>` is a specialization of `std::not_equal_to` with parameter and return type deduced.

### Nested types

| Nested type | Definition |
| --- | --- |
| `is_transparent` | unspecified |

### Member functions

**operator()** tests if the two arguments do not compare equal (public member function)

## std::not_equal_to<void>::operator()

`template< class T, class U > constexpr auto operator()( T&& lhs, U&& rhs ) const -> decltype(std::forward<T>(lhs) != std::forward<U>(rhs));`

Returns the result of non-equality comparison between `lhs` and `rhs`.

### Parameters

lhs, rhs - values to compare

### Return value

`std::forward<T>(lhs) != std::forward<U>(rhs)`.

### Example

```cpp
#include <functional>

int main()
{
    constexpr int p = 0, q = 8;
    std::not_equal_to<> not_equal{};
    static_assert(!not_equal(p, p));
    static_assert(not_equal(p, q));
}
```
