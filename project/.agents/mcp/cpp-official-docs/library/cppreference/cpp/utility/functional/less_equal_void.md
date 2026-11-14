# std::less_equal<void>

| Defined in header `<functional>` |  |
| --- | --- |
| `template<> class less_equal<void>;` | (since C++14) |

`std::less_equal<void>` is a specialization of `std::less_equal` with parameter and return type deduced.

### Nested types

| Nested type | Definition |
| --- | --- |
| `is_transparent` | unspecified |

### Member functions

**operator()** tests if `lhs` compares less or equal than `rhs` (public member function)

## std::less_equal<void>::operator()

`template< class T, class U > constexpr auto operator()( T&& lhs, U&& rhs ) const -> decltype(std::forward<T>(lhs) <= std::forward<U>(rhs));`

Returns the result of `std::forward<T>(lhs) <= std::forward<U>(rhs)`.

### Parameters

lhs, rhs - values to compare

### Return value

`std::forward<T>(lhs) <= std::forward<U>(rhs)`.

If a built-in operator comparing pointers is called, the result is consistent with the implementation-defined strict total order over pointers.

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <algorithm>
#include <functional>
#include <initializer_list>

constexpr bool strictly_not_positive(int lhs)
{
    return std::less_equal<>()(lhs, 0);
}

int main()
{
    constexpr int low = 0, high = 8;
    std::less_equal<> less_equal{};
    static_assert(less_equal(low, high));
    static_assert(less_equal(low, low));

    static constexpr auto arr = {1, 0, -1, -2, -3, -4};
    static_assert(!std::all_of(arr.begin(), arr.end(), strictly_not_positive));
    static_assert(std::all_of(arr.begin() + 1, arr.end(), strictly_not_positive));
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2562 | C++98 | the pointer total order might be inconsistent | guaranteed to be consistent |
