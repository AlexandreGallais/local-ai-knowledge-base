# std::greater_equal<void>

| Defined in header `<functional>` |  |
| --- | --- |
| `template<> class greater_equal<void>;` | (since C++14) |

`std::greater_equal<void>` is a specialization of `std::greater_equal` with parameter and return type deduced.

### Nested types

| Nested type | Definition |
| --- | --- |
| `is_transparent` | unspecified |

### Member functions

**operator()** tests if `lhs` compares greater or equal than `rhs` (public member function)

## std::greater_equal<void>::operator()

`template< class T, class U > constexpr auto operator()( T&& lhs, U&& rhs ) const -> decltype(std::forward<T>(lhs) >= std::forward<U>(rhs));`

Returns the result of `std::forward<T>(lhs) >= std::forward<U>(rhs)`.

### Parameters

lhs, rhs - values to compare

### Return value

`std::forward<T>(lhs) >= std::forward<U>(rhs)`.

If a built-in operator comparing pointers is called, the result is consistent with the implementation-defined strict total order over pointers.

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <algorithm>
#include <functional>
#include <initializer_list>

constexpr bool strictly_not_negative(int lhs)
{
    return std::greater_equal<>()(lhs, 0);
}

int main()
{
    constexpr int low = 0, high = 8;
    std::greater_equal<> greater_equal{};
    static_assert(greater_equal(high, low));
    static_assert(greater_equal(low, low));

    static constexpr auto arr = {-1, 0, 1, 2, 3, 4};
    static_assert(!std::all_of(arr.begin(), arr.end(), strictly_not_negative));
    static_assert(std::all_of(arr.begin() + 1, arr.end(), strictly_not_negative));
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2562 | C++98 | the pointer total order might be inconsistent | guaranteed to be consistent |
