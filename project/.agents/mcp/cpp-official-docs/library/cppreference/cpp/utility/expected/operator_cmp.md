# operator==(std::expected)

|  |  |  |
| --- | --- | --- |
| Primary template |  |  |
| `template< class T2, class E2 > requires (!std::is_void_v<T2>) friend constexpr bool operator==( const expected& lhs, const std::expected<T2, E2>& rhs );` | (1) | (since C++23) |
| `template< class E2 > friend constexpr bool operator==( const expected& lhs, const std::unexpected<E2>& unex );` | (2) | (since C++23) |
| `template< class T2 > friend constexpr bool operator==( const expected& lhs, const T2& val );` | (3) | (since C++23) |
| `void` partial specialization |  |  |
| `template< class T2, class E2 > requires std::is_void_v<T2> friend constexpr bool operator==( const expected& lhs, const std::expected<T2, E2>& rhs );` | (4) | (since C++23) |
| `template< class E2 > friend constexpr bool operator==( const expected& lhs, const std::unexpected<E2>& unex );` | (5) | (since C++23) |

Performs comparison operations on `std::expected` objects.

1) Compares two `std::expected` objects. The objects compare equal if and only if both `lhs` and `rhs` contain expected values that are equal, or both contain unexpected values that are equal.

|  |  |
| --- | --- |
| If any of the following expressions is ill-formed, or its result is not convertible to `bool`, the program is ill-formed: | (until C++26) |
| This overload participates in overload resolution only if all following expressions is well-formed, and their results are convertible to `bool`: | (since C++26) |

- `*lhs == *rhs`
- `lhs.error() == rhs.error()`

2) Compares `std::expected` object with an `std::unexpected` object. The objects compare equal if and only if `lhs` contains an unexpected value that is equal to `unex.error()`.

|  |  |
| --- | --- |
| If the expression `lhs.error() == unex.error()` is ill-formed, or its result is not convertible to `bool`, the program is ill-formed. | (until C++26) |
| This overload participates in overload resolution only if the expression `lhs.error() == unex.error()` is well-formed, and its result is convertible to `bool`. | (since C++26) |

3) Compares `std::expected` object with an expected value. The objects compare equal if and only if `lhs` contains an expected value that is equal to `val`.

|  |  |
| --- | --- |
| If the expression `*lhs == val` is ill-formed, or its result is not convertible to `bool`, the program is ill-formed. | (until C++26) |
| This overload participates in overload resolution only if all following conditions are satisfied: `T2` is not a specialization of `std::expected`. The expression `*lhs == val` is well-formed, and its result is convertible to `bool`. | (since C++26) |

4) Compares two `std::expected` objects. The objects compare equal if and only if `lhs` and `rhs` both represent expected values, or both contain unexpected values that are equal.

|  |  |
| --- | --- |
| If the expression `lhs.error() == rhs.error()` is ill-formed, or its result is not convertible to `bool`, the program is ill-formed. | (until C++26) |
| This overload participates in overload resolution only if the expression `lhs.error() == rhs.error()` is well-formed, and its result is convertible to `bool`. | (since C++26) |

5) Compares `std::expected` object with an `std::unexpected` object. The objects compare equal if and only if `lhs` contains an unexpected value that is equal to `unex.error()`.

|  |  |
| --- | --- |
| If the expression `lhs.error() == unex.error()` is ill-formed, or its result is not convertible to `bool`, the program is ill-formed. | (until C++26) |
| This overload participates in overload resolution only if the expression `lhs.error() == unex.error()` is well-formed, and its result is convertible to `bool`. | (since C++26) |

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::expected<T, E>` is an associated class of the arguments.

The `!=` operator is synthesized from `operator==`.

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | `std::expected` object(s) to compare |
| unex | - | `std::unexpected` value to compare to `lhs` |
| val | - | value to compare to the expected value contained in `lhs` |

### Return value

1) `lhs.has_value() != rhs.has_value() ? false : (lhs.has_value() ? *lhs == *rhs : lhs.error() == rhs.error())`

2) `!lhs.has_value() && static_cast<bool>(lhs.error() == unex.error())`

3) `lhs.has_value() && static_cast<bool>(*lhs == val)`

4) `lhs.has_value() != rhs.has_value() ? false : lhs.has_value() || static_cast<bool>(lhs.error() == rhs.error())`

5) `!lhs.has_value() && static_cast<bool>(lhs.error() == unex.error())`

### Exceptions

Throws when and what the comparison throws.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_constrained_equality` | `202411L` | (C++26) | constrained comparison operators for `std::expected` |

### Example

```cpp
#include <expected>
#include <iostream>
#include <string_view>

using namespace std::string_view_literals;

int main()
{
    auto x1{"\N{GREEN HEART}"sv};
    auto x2{"\N{CROSS MARK}"sv};
    std::expected<std::string_view, int> e1{x1}, e2{x1}, e3{x2};
    std::unexpected u1{13};

    std::cout << "Overload (1):\n"
              << e1.value() << (e1 == e2 ? " == " : " != ") << *e2 << '\n'
              << e1.value() << (e1 != e3 ? " != " : " == ") << *e3 << "\n\n";

    std::cout << "Overload (2):\n"
              << e1.value() << (e1 == u1 ? " == " : " != ") << u1.error() << '\n';
    e1 = std::unexpected{13};
    std::cout << e1.error() << (e1 == u1 ? " == " : " != ") << u1.error() << '\n';
    e1 = std::unexpected{31};
    std::cout << e1.error() << (e1 != u1 ? " != " : " == ") << u1.error() << '\n';

    std::cout << "Overload (3):\n"
              << *e1 << (e1 == x1 ? " == " : " != ") << x1 << '\n'
              << *e1 << (e1 != x2 ? " != " : " == ") << x2 << "\n\n";
}
```

Output:

```text
Overload (1):
💚 == 💚
💚 != ❌

Overload (2):
💚 != 13
13 == 13
31 != 13

Overload (3):
💚 == 💚
💚 != ❌
```

### See also

unexpected (C++23) represented as an unexpected value (class template)
