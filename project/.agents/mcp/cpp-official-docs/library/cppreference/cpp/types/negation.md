# std::negation

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class B > struct negation;` | (since C++17) |

Forms the logical negation of the type trait `B`.

The type `std::negation<B>` is a UnaryTypeTrait with a base characteristic of `std::bool_constant<!bool(B::value)>`.

If the program adds specializations for `std::negation` or `std::negation_v`, the behavior is undefined.

### Template parameters

B - any type such that the expression `bool(B::value)` is a valid constant expression

### Helper variable template

`template< class B > constexpr bool negation_v = negation<B>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `B` has a member `::value` that is `false` when explicitly converted to `bool`, `false` otherwise (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator bool | converts the object to `bool`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `type` | `std::integral_constant<bool, value>` |

### Possible implementation

`template<class B> struct negation : std::bool_constant<!bool(B::value)> { };`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_logical_traits` | `201510L` | (C++17) | Logical operator type traits |

### Example

```cpp
#include <type_traits>

static_assert(
    std::is_same<
        std::bool_constant<false>,
        typename std::negation<std::bool_constant<true>>::type>::value,
    "");
static_assert(
    std::is_same<
        std::bool_constant<true>,
        typename std::negation<std::bool_constant<false>>::type>::value,
    "");

static_assert(std::negation_v<std::bool_constant<true>> == false);
static_assert(std::negation_v<std::bool_constant<false>> == true);

int main() {}
```

### See also

|  |  |
| --- | --- |
| conjunction (C++17) | variadic logical AND metafunction (class template) |
| disjunction (C++17) | variadic logical OR metafunction (class template) |
| integral_constant, bool_constant (C++11), (C++17) | compile-time constant of specified type with specified value (class template) |
