# std::swap(std::variant)

| Defined in header `<variant>` |  |
| --- | --- |
| `template< class... Types > void swap( std::variant<Types...>& lhs, std::variant<Types...>& rhs ) noexcept(/* see below */);` | (since C++17) (constexpr since C++20) |

Overloads the `std::swap` algorithm for `std::variant`. Effectively calls `lhs.swap(rhs)`.

This overload participates in overload resolution only if `std::is_move_constructible_v<T_i>` and `std::is_swappable_v<T_i>` are both `true` for all `T_i` in `Types...`.

### Parameters

lhs, rhs - `variant` objects whose values to swap

### Return value

(none)

### Exceptions

`noexcept` specification:

`noexcept(noexcept(lhs.swap(rhs)))`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_variant` | `202106L` | (C++20) (DR) | Fully `constexpr` `std::variant` |

### Example

```cpp
#include <iostream>
#include <string>
#include <variant>

void print(auto const& v, char term = '\n')
{
    std::visit([](auto&& o) { std::cout << o; }, v);
    std::cout << term;
}

int main()
{
    std::variant<int, std::string> v1{123}, v2{"XYZ"};
    print(v1, ' ');
    print(v2);

    std::swap(v1, v2);
    print(v1, ' ');
    print(v2);

    std::variant<double, std::string> v3{3.14};
    // std::swap(v1, v3); // ERROR: ~ inconsistent parameter packs
}
```

Output:

```text
123 XYZ
XYZ 123
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2231R1 | C++20 | `swap` was not `constexpr` while the required operations can be `constexpr` in C++20 | made `constexpr` |

### See also

swap swaps with another `variant` (public member function)
